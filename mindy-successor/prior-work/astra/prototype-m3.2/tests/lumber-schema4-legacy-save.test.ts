import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {eligible,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const fixture=JSON.parse(readFileSync('content/lumber-schema4-legacy-save.fixture.json','utf8'));
const legacyDefinitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const targetDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

function appendUnique(base:any[]|undefined, additions:any[], kind:string){
  const result=structuredClone(base??[]);
  const ids=new Set(result.map(entry=>entry.id));
  for(const entry of additions){
    if(ids.has(entry.id))throw new Error(`duplicate ${kind} id: ${entry.id}`);
    result.push(structuredClone(entry));
    ids.add(entry.id);
  }
  return result;
}

function catalog():Catalog{
  const definitions={
    ...structuredClone(legacyDefinitions),
    actions:appendUnique(
      legacyDefinitions.actions,
      targetDefinitions.actions.filter((entry:any)=>entry.id==='lumber.shift'),
      'action'
    ),
    careers:appendUnique(legacyDefinitions.careers,targetDefinitions.careers,'career'),
    relationships:appendUnique(legacyDefinitions.relationships,targetDefinitions.relationships,'relationship'),
    activities:appendUnique(legacyDefinitions.activities,targetDefinitions.activities,'activity'),
    endings:appendUnique(legacyDefinitions.endings,targetDefinitions.endings,'ending')
  };
  return loadCatalog(definitions,[]);
}

function legacySave():Save{
  const s=freshSave();
  s.run.actionCounts.lumber=fixture.legacyState.actionCounts.lumber;
  s.run.actionCounts.tavern=fixture.legacyState.actionCounts.tavern;
  s.run.resources.money=fixture.legacyState.unrelated.money;
  return s;
}

function hardWork(cat:Catalog){
  const ending=cat.definitions.endings.find(entry=>entry.id==='ending.lumber.hard-work');
  assert.ok(ending);
  return ending;
}

test('schema-4 legacy save fixture preserves legacy lumber actionCount under coexistence catalog',()=>{
  const cat=catalog();
  const restored=parseSave(JSON.stringify(legacySave()),cat);

  assert.equal(restored.schemaVersion,4);
  assert.equal(restored.run.actionCounts.lumber,fixture.expectations.legacyLumberActionCount);
  assert.equal(restored.run.actionCounts.tavern,fixture.expectations.unrelatedTavernActionCount);
  assert.equal(restored.run.resources.money,fixture.expectations.unrelatedMoney);
  assert.equal(restored.run.actionCounts['lumber.shift']??0,fixture.expectations.targetActionCount);
});

test('legacy actionCount does not implicitly create target Lumber career or completed_shifts',()=>{
  const cat=catalog();
  const restored=parseSave(JSON.stringify(legacySave()),cat);

  assert.equal(fixture.targetState.implicitConversionAllowed,false);
  assert.equal(restored.run.progression.careers.lumber,undefined);
  assert.equal(fixture.expectations.completedShiftsWhenAbsent,null);
  assert.equal(eligible(hardWork(cat).conditions,restored,cat),false);
  assert.equal(fixture.expectations.hardWorkEligibleFromLegacyCountAlone,false);
});

test('legacy actionCount and explicit target completed_shifts remain independent when both exist',()=>{
  const cat=catalog();
  const source=legacySave();
  source.run.progression.careers.lumber={
    stage:'newcomer',
    shifts:0,
    counters:{completed_shifts:fixture.targetState.exampleSeparateCompletedShifts},
    choices:{},
    facts:[]
  };

  const restored=parseSave(JSON.stringify(source),cat);
  assert.equal(restored.run.actionCounts.lumber,50);
  assert.equal(restored.run.progression.careers.lumber.counters.completed_shifts,7);
  assert.equal(eligible(hardWork(cat).conditions,restored,cat),false);
});

test('old unrelated progression/state remains unchanged while target Lumber support is present',()=>{
  const cat=catalog();
  const source=legacySave();
  const snapshot={
    tavern:source.run.actionCounts.tavern,
    money:source.run.resources.money
  };

  const restored=parseSave(JSON.stringify(source),cat);
  assert.deepEqual(
    {tavern:restored.run.actionCounts.tavern,money:restored.run.resources.money},
    snapshot
  );
});

test('Hard Work remains only target completed_shifts >= 50 with exact hardWork:lumber',()=>{
  const cat=catalog();
  const ending=hardWork(cat);

  assert.deepEqual(ending.conditions,fixture.lockedHardWork.conditions);
  assert.equal(ending.conditions.length,1);
  assert.deepEqual(ending.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(ending.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(fixture.lockedHardWork.rewardId,'hardWork:lumber');
});
