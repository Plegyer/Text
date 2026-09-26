import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {eligible,freshSave,parseSave} from '../src/core/engine.ts';
import {presentationIdForAction} from '../src/core/presentation.ts';
import type {Catalog} from '../src/core/schema.ts';

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

function coexistenceDefinitions(){
  return {
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
}

function catalog():Catalog{
  return loadCatalog(coexistenceDefinitions(),[]);
}

test('legacy lumber and target lumber.shift coexist as distinct action IDs without overwrite',()=>{
  const cat=catalog();
  const legacy=cat.definitions.actions.find(action=>action.id==='lumber');
  const target=cat.definitions.actions.find(action=>action.id==='lumber.shift');

  assert.ok(legacy);
  assert.ok(target);
  assert.notEqual(legacy.id,target.id);
  assert.equal(cat.definitions.actions.filter(action=>action.id==='lumber').length,1);
  assert.equal(cat.definitions.actions.filter(action=>action.id==='lumber.shift').length,1);

  const sourceLegacy=legacyDefinitions.actions.find((action:any)=>action.id==='lumber');
  assert.equal(JSON.stringify(legacy),JSON.stringify(sourceLegacy));
});

test('schema-4 save with legacy actionCounts.lumber remains parseable when target lumber.shift is present',()=>{
  const cat=catalog();
  const save=freshSave();
  save.run.actionCounts.lumber=37;

  const restored=parseSave(JSON.stringify(save),cat);
  assert.equal(restored.schemaVersion,4);
  assert.equal(restored.run.actionCounts.lumber,37);
  assert.equal(restored.run.actionCounts['lumber.shift']??0,0);
  assert.equal(restored.run.progression.careers.lumber,undefined);
});

test('legacy Lumber action count is never inferred into target completed_shifts or Hard Work eligibility',()=>{
  const cat=catalog();
  const save=freshSave();
  save.run.actionCounts.lumber=50;

  const restored=parseSave(JSON.stringify(save),cat);
  const hardWork=cat.definitions.endings.find(ending=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);

  assert.equal(restored.run.progression.careers.lumber,undefined);
  assert.equal(restored.run.actionCounts.lumber,50);
  assert.equal(eligible(hardWork.conditions,restored,cat),false);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('target Lumber shift semantic presentation remains job/lumber/shift/<season>/default',()=>{
  const cat=catalog();
  const shift=cat.definitions.actions.find(action=>action.id==='lumber.shift');
  assert.ok(shift);

  const expected={
    'spring.default':'job/lumber/shift/spring/default',
    'summer.default':'job/lumber/shift/summer/default',
    'autumn.default':'job/lumber/shift/autumn/default',
    'winter.default':'job/lumber/shift/winter/default'
  } as const;

  for(const scene of shift.scenes??[]){
    assert.equal(
      presentationIdForAction(cat,'lumber.shift',scene.media),
      expected[scene.id as keyof typeof expected]
    );
  }
});

test('Hard Work contract contains no legacy visits/action-count prerequisite',()=>{
  const cat=catalog();
  const hardWork=cat.definitions.endings.find(ending=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);

  const encoded=JSON.stringify(hardWork.conditions);
  assert.equal(encoded.includes('"visits"'),false);
  assert.equal(encoded.includes('"actionCounts"'),false);
  assert.equal(encoded.includes('"lumber.shift"'),false);
  assert.equal(encoded.includes('"lumber"'),true);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
});
