import test from 'node:test';
import assert from 'node:assert/strict';
import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {act,catalog,started} from './helpers.ts';

const chainIds=['ds-lumber.first','ds-lumber.second','ds-lumber.done'] as const;

function resolveOrdinary(s:Save){
  let steps=0;
  while(s.run.pending && !chainIds.includes(s.run.pending.eventId as typeof chainIds[number])){
    if(++steps>10)throw new Error('Scene loop');
    const e=catalog.events.find(e=>e.id===s.run.pending!.eventId)!;
    const c=e.choices.find(c=>eligible(c.conditions,s));
    if(!c)throw new Error(`No eligible choice for ${e.id}`);
    s=dispatch(s,{type:'choice',id:c.id},catalog);
  }
  return s;
}

function lumber(s:Save){
  if(s.run.metrics.energy<1)s=act(s,'rest');
  s=dispatch(s,{type:'action',id:'lumber'},catalog);
  return resolveOrdinary(s);
}

function expectPending(s:Save,id:typeof chainIds[number],variant?:'summer'|'winter'|'default'){
  assert.equal(s.run.pending?.eventId,id);
  if(variant)assert.equal(s.run.pending?.variantId,variant);
}

function choose(s:Save,id:string){
  assert.ok(s.run.pending,'Expected a pending scene');
  return dispatch(s,{type:'choice',id},catalog);
}

function firstPending(startDay=0){
  let s=started();s.run.day=startDay;
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,1);assert.ok(!s.run.pending);
  assert.equal(s.run.flags['woods.met'],true);
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,2);assert.ok(!s.run.pending);
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,3);expectPending(s,'ds-lumber.first');
  return s;
}

function secondPending(firstChoice='observe',startDay=0){
  let s=choose(firstPending(startDay),firstChoice);
  for(let expected=4;expected<=6;expected++){
    s=lumber(s);assert.equal(s.run.actionCounts.lumber,expected);assert.ok(!s.run.pending);
  }
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,7);expectPending(s,'ds-lumber.second');
  return s;
}

function donePending(firstChoice='observe',secondChoice='inspect',startDay=0){
  let s=choose(secondPending(firstChoice,startDay),secondChoice);
  for(let expected=8;expected<=11;expected++){
    s=lumber(s);assert.equal(s.run.actionCounts.lumber,expected);assert.ok(!s.run.pending);
  }
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,12);expectPending(s,'ds-lumber.done');
  return s;
}

function assertChoiceOnlyChanges(s:Save,choiceId:string,metric:'strength'|'empathy'|null,delta:number,flag:string){
  const beforeMetric=metric?s.run.metrics[metric]:0;
  const beforeMoney=s.run.metrics.money,beforeEnergy=s.run.metrics.energy;
  const beforeInventory=structuredClone(s.run.inventory),beforeEndings=[...s.run.availableEndings];
  const after=choose(s,choiceId);
  if(metric)assert.equal(after.run.metrics[metric]-beforeMetric,delta);
  const expectedMetrics={...s.run.metrics};
  if(metric)expectedMetrics[metric]+=delta;
  assert.deepEqual({...after.run.metrics},expectedMetrics);
  assert.equal(after.run.metrics.money,beforeMoney);
  assert.equal(after.run.metrics.energy,beforeEnergy);
  assert.deepEqual(after.run.inventory,beforeInventory);
  assert.deepEqual(after.run.availableEndings,beforeEndings);
  assert.equal(after.run.flags[flag],true);
  assert.equal(after.run.pending,null);
  assert.throws(()=>dispatch(after,{type:'choice',id:choiceId},catalog));
  return after;
}

test('chain appears only after real lumber shifts 3/7/12',()=>{
  const first=firstPending();
  const second=secondPending('observe');
  const done=donePending('observe','inspect');
  assert.equal(first.run.actionCounts.lumber,3);
  assert.equal(second.run.actionCounts.lumber,7);
  assert.equal(done.run.actionCounts.lumber,12);
});

test('both choices on every stage set the stage flag and apply only the specified one-time reward',()=>{
  const first=firstPending();
  assertChoiceOnlyChanges(parseSave(JSON.stringify(first),catalog),'practice','strength',1,'ds.lumber.first');
  assertChoiceOnlyChanges(parseSave(JSON.stringify(first),catalog),'observe','strength',0,'ds.lumber.first');

  const second=secondPending();
  assertChoiceOnlyChanges(parseSave(JSON.stringify(second),catalog),'listen','empathy',1,'ds.lumber.second');
  assertChoiceOnlyChanges(parseSave(JSON.stringify(second),catalog),'inspect','empathy',0,'ds.lumber.second');

  const done=donePending();
  assertChoiceOnlyChanges(parseSave(JSON.stringify(done),catalog),'demonstrate','strength',1,'ds.lumber.done');
  assertChoiceOnlyChanges(parseSave(JSON.stringify(done),catalog),'explain','strength',0,'ds.lumber.done');
});

test('different earlier answers lead to the same next stage',()=>{
  let a=choose(firstPending(),'practice'),b=choose(firstPending(),'observe');
  for(let i=4;i<=7;i++){a=lumber(a);b=lumber(b);}
  expectPending(a,'ds-lumber.second');expectPending(b,'ds-lumber.second');

  a=choose(a,'listen');b=choose(b,'inspect');
  for(let i=8;i<=12;i++){a=lumber(a);b=lumber(b);}
  expectPending(a,'ds-lumber.done');expectPending(b,'ds-lumber.done');
});

test('large lumber tenure cannot skip missing prerequisite flags',()=>{
  let s=started();s=lumber(s);
  assert.equal(s.run.flags['woods.met'],true);
  assert.ok(!s.run.flags['ds.lumber.first']);
  s.run.actionCounts.lumber=11;
  s=lumber(s);
  assert.equal(s.run.actionCounts.lumber,12);
  expectPending(s,'ds-lumber.first');
});

test('save/load preserves an open lumber scene',()=>{
  const s=firstPending();
  const restored=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(restored.run.pending,s.run.pending);
  const after=choose(restored,'observe');
  assert.equal(after.run.flags['ds.lumber.first'],true);
  assert.equal(after.run.pending,null);
});

test('seasonal variants follow the 10-day successor seasons',()=>{
  for(const [day,variant] of [[0,'default'],[10,'summer'],[20,'default'],[30,'winter']] as const){
    let s=firstPending(day);expectPending(s,'ds-lumber.first',variant);s=choose(s,'observe');
    for(let i=4;i<=7;i++)s=lumber(s);expectPending(s,'ds-lumber.second',variant);s=choose(s,'inspect');
    for(let i=8;i<=12;i++)s=lumber(s);expectPending(s,'ds-lumber.done',variant);
  }
});

test('completed chain does not repeat through shift 24 and tenure ending remains reachable',()=>{
 let s=choose(donePending('practice','listen'),'demonstrate');
 const history=chainIds.map(id=>structuredClone(s.run.history[id]));
 for(let count=13;count<=24;count++){
  s=lumber(s);assert.equal(s.run.actionCounts.lumber,count);assert.equal(s.run.pending,null);
 }
 assert.deepEqual(chainIds.map(id=>s.run.history[id]),history);
 assert.equal(s.run.availableEndings.includes('lumber-stay'),false,'retired lumber-stay must not return as a live ending');
});
