import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const baseDefinitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const targetDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

type DefinitionNode={id:string;[key:string]:unknown};
type DefinitionsRecord=Record<string,unknown>;

function mergeUnique<T extends DefinitionNode>(base:T[]|undefined, additions:T[], kind:string):T[]{
  const result=structuredClone(base??[]);
  const ids=new Set(result.map(entry=>entry.id));
  for(const entry of additions){
    if(ids.has(entry.id))throw new Error(`duplicate ${kind} id: ${entry.id}`);
    result.push(structuredClone(entry));
    ids.add(entry.id);
  }
  return result;
}

function productionLumberSubset(target:any){
  return {
    actions:target.actions.filter((entry:any)=>entry.id==='lumber.shift'),
    careers:target.careers.filter((entry:any)=>entry.id==='lumber'),
    relationships:target.relationships.filter((entry:any)=>entry.id==='lumber.foreman'),
    activities:target.activities.filter((entry:any)=>entry.id==='lumber.forest'),
    endings:target.endings.filter((entry:any)=>entry.id.startsWith('ending.lumber.'))
  };
}

function mergeProductionLumber(base:any,target:any){
  const subset=productionLumberSubset(target);
  return {
    ...structuredClone(base),
    actions:mergeUnique(base.actions,subset.actions,'action'),
    careers:mergeUnique(base.careers,subset.careers,'career'),
    relationships:mergeUnique(base.relationships,subset.relationships,'relationship'),
    activities:mergeUnique(base.activities,subset.activities,'activity'),
    endings:mergeUnique(base.endings,subset.endings,'ending')
  };
}

function ids(entries:any[]|undefined){
  return (entries??[]).map(entry=>entry.id);
}

function assertUnique(entries:any[]|undefined,kind:string){
  const list=ids(entries);
  assert.equal(new Set(list).size,list.length,`duplicate IDs in ${kind}`);
}

test('pure data merge adds production Lumber definitions without duplicate IDs and excludes synthetic School action',()=>{
  const merged=mergeProductionLumber(baseDefinitions,targetDefinitions);

  assert.ok(ids(merged.actions).includes('lumber.shift'));
  assert.ok(ids(merged.actions).includes('lumber'));
  assert.ok(!ids(merged.actions).includes('school.lumber-management'));

  assert.ok(ids(merged.careers).includes('lumber'));
  assert.ok(ids(merged.relationships).includes('lumber.foreman'));
  assert.ok(ids(merged.activities).includes('lumber.forest'));
  assert.ok(ids(merged.endings).includes('ending.lumber.hard-work'));
  assert.ok(ids(merged.endings).includes('ending.lumber.forewoman'));
  assert.ok(ids(merged.endings).includes('ending.lumber.forest'));

  assertUnique(merged.actions,'actions');
  assertUnique(merged.careers,'careers');
  assertUnique(merged.relationships,'relationships');
  assertUnique(merged.activities,'activities');
  assertUnique(merged.endings,'endings');
});

test('legacy lumber action collision is detected instead of silently overwritten',()=>{
  const legacy=baseDefinitions.actions.find((entry:any)=>entry.id==='lumber');
  const targetShift=targetDefinitions.actions.find((entry:any)=>entry.id==='lumber.shift');
  assert.ok(legacy);
  assert.ok(targetShift);

  const collidingTarget={...structuredClone(targetShift),id:'lumber'};
  assert.throws(
    ()=>mergeUnique(baseDefinitions.actions,[collidingTarget],'action'),
    /duplicate action id: lumber/
  );

  const untouched=baseDefinitions.actions.find((entry:any)=>entry.id==='lumber');
  assert.deepEqual(untouched,legacy);
});

test('Hard Work condition and meta reward survive byte-for-meaning equality through the merge',()=>{
  const merged=mergeProductionLumber(baseDefinitions,targetDefinitions);
  const source=targetDefinitions.endings.find((entry:any)=>entry.id==='ending.lumber.hard-work');
  const result=merged.endings.find((entry:any)=>entry.id==='ending.lumber.hard-work');

  assert.ok(source);
  assert.ok(result);

  assert.equal(
    JSON.stringify(result.conditions),
    JSON.stringify(source.conditions)
  );
  assert.equal(
    JSON.stringify(result.metaRewards),
    JSON.stringify(source.metaRewards)
  );

  assert.deepEqual(result.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(result.conditions.length,1);
  assert.deepEqual(result.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('existing unrelated definitions remain byte-for-meaning unchanged after Lumber merge',()=>{
  const merged=mergeProductionLumber(baseDefinitions,targetDefinitions);

  const added={
    actions:new Set(['lumber.shift']),
    careers:new Set(['lumber']),
    relationships:new Set(['lumber.foreman']),
    activities:new Set(['lumber.forest']),
    endings:new Set(['ending.lumber.hard-work','ending.lumber.forewoman','ending.lumber.forest'])
  };

  for(const kind of ['actions','careers','relationships','activities','endings'] as const){
    const before=baseDefinitions[kind]??[];
    const after=merged[kind]??[];
    for(const original of before){
      assert.ok(!added[kind].has(original.id),`base unexpectedly contains added ${kind} id ${original.id}`);
      const preserved=after.find((entry:any)=>entry.id===original.id);
      assert.ok(preserved,`missing original ${kind} id ${original.id}`);
      assert.equal(JSON.stringify(preserved),JSON.stringify(original),`changed original ${kind} id ${original.id}`);
    }
  }

  for(const [key,value] of Object.entries(baseDefinitions as DefinitionsRecord)){
    if(['actions','careers','relationships','activities','endings'].includes(key))continue;
    assert.equal(JSON.stringify(merged[key]),JSON.stringify(value),`changed unrelated top-level field ${key}`);
  }
});

test('merge helper selects only the Lumber production subset and never promotes synthetic School management',()=>{
  const subset=productionLumberSubset(targetDefinitions);
  assert.deepEqual(ids(subset.actions),['lumber.shift']);
  assert.ok(!ids(subset.actions).includes('school.lumber-management'));

  const synthetic=targetDefinitions.actions.find((entry:any)=>entry.id==='school.lumber-management');
  assert.ok(synthetic,'fixture should still expose the synthetic action for tests');
  assert.equal(
    JSON.stringify(subset).includes('school.lumber-management'),
    false
  );
});
