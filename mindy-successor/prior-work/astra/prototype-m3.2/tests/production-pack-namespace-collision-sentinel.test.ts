import test from 'node:test';
import assert from 'node:assert/strict';

import {loadCatalog} from '../src/core/content.ts';
import {definitions,rawPacks} from './helpers.ts';

function clonedPacks(){
  return structuredClone(rawPacks);
}

function firstTwoEventPackIndexes(packs:typeof rawPacks){
  const indexes=packs
    .map((pack,index)=>pack.events.length?index:-1)
    .filter(index=>index>=0);
  assert.ok(indexes.length>=2,'need at least two production packs with events');
  return [indexes[0],indexes[1]] as const;
}

function namespaceProbe(packId:string,foreignEventId:string){
  const packs=clonedPacks();
  const index=packs.findIndex(pack=>pack.events.length>0);
  assert.ok(index>=0,'need a production pack with events');

  packs[index].id=packId;
  packs[index].events=packs[index].events.map((event,eventIndex)=>({
    ...event,
    id:`${packId}.qa-probe-${eventIndex}`
  }));
  packs[index].events[0].id=foreignEventId;
  return packs;
}

test('production pack and event IDs remain globally unique and namespace-owned',()=>{
  const packIds=rawPacks.map(pack=>pack.id);
  assert.equal(new Set(packIds).size,packIds.length);

  const eventIds=rawPacks.flatMap(pack=>pack.events.map(event=>event.id));
  assert.equal(new Set(eventIds).size,eventIds.length);

  for(const pack of rawPacks){
    for(const event of pack.events){
      assert.ok(
        event.id.startsWith(pack.id+'.'),
        `${event.id} must remain inside ${pack.id} namespace`
      );
    }
  }
});

test('catalog rejects duplicate production pack IDs and duplicate event IDs',()=>{
  const duplicatePack=clonedPacks();
  assert.ok(duplicatePack.length>=2);
  duplicatePack[1].id=duplicatePack[0].id;
  assert.throws(
    ()=>loadCatalog(definitions,duplicatePack),
    /Повтор ID: пакеты/
  );

  const duplicateEvent=clonedPacks();
  const [first,second]=firstTwoEventPackIndexes(duplicateEvent);
  duplicateEvent[second].events[0].id=duplicateEvent[first].events[0].id;
  assert.throws(
    ()=>loadCatalog(definitions,duplicateEvent),
    /Повтор ID: события/
  );
});

test('ordinary poverty and Secret Debt event namespaces cannot bleed into each other',()=>{
  assert.throws(
    ()=>loadCatalog(
      definitions,
      namespaceProbe('ordinary-poverty','secret-debt.qa-poverty-collision')
    ),
    /Событие вне namespace пакета/
  );

  assert.throws(
    ()=>loadCatalog(
      definitions,
      namespaceProbe('secret-debt','ordinary-poverty.qa-debt-collision')
    ),
    /Событие вне namespace пакета/
  );
});

test('future poverty events cannot hijack current School or Lumber production pack namespaces',()=>{
  const schoolOwner=rawPacks.find(pack=>
    pack.events.some(event=>event.id==='base.school')
  );
  assert.ok(schoolOwner,'base.school production event must remain catalogued');

  const lumberOwner=rawPacks.find(pack=>pack.id==='lumber-production');
  assert.ok(lumberOwner,'lumber-production pack must remain catalogued');

  for(const foreignNamespace of [schoolOwner.id,lumberOwner.id]){
    assert.throws(
      ()=>loadCatalog(
        definitions,
        namespaceProbe(
          'ordinary-poverty',
          `${foreignNamespace}.qa-poverty-collision`
        )
      ),
      /Событие вне namespace пакета/
    );
  }
});
