import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'merchant.career.first-shift':'continue',
  'merchant.career.networked':'continue',
  'merchant.career.seasonal-breadth':'record',
  'merchant.career.veteran-ready':'record',
  'merchant.career.choose-route':'defer',
  'merchant.career.choose-patron':'defer',
  'merchant.career.outcome-ready':'continue',
  'merchant.trade.appraisal':'compare-notes',
  'merchant.trade.records':'write-plain-terms',
  'merchant.trade.delivery':'confirm-window',
  'merchant.trade.shortage':'accept-risk',
  'merchant.crisis.delivery-pressure':'accept-narrow-risk',
  'merchant.relationship.intro':'professional',
  'merchant.relationship.trust':'continue',
  'merchant.relationship.conflict-open':'open',
  'merchant.relationship.conflict-resolve':'cooperate',
  'merchant.relationship.utility':'accept',
  'merchant.items.appraisal-scales':'take',
  'merchant.items.manifest-case':'take',
  'merchant.items.sample-kit':'take',
  'merchant.poverty.liquidity-response':'commission-only',
  'merchant.routes.house-ready':'record',
  'merchant.routes.speculator-ready':'record',
  'merchant.routes.patron-ready':'record'
};

function choose(event:any,s:Save,overrides:Record<string,string>={}){
  const wanted=overrides[event.id]??preferred[event.id];
  return (wanted?event.choices.find((c:any)=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
    ??event.choices.find((c:any)=>eligible(c.conditions,s,catalog));
}

function settlePending(state:Save,overrides:Record<string,string>={}){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>300)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=choose(event,s,overrides);
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save,overrides:Record<string,string>={}){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>300)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s,overrides);
      continue;
    }
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function merchantWorkDay(state:Save,seasons:Set<string>,overrides:Record<string,string>={}){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'merchant.shift'},catalog);
  s=settlePending(s,overrides);
  return finishNight(s,overrides);
}

test('clean Merchant run reaches advanced readiness and Hard Work without forced route commitment',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='merchant.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,2);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-2 fallback must unlock Merchant naturally');

  const seenSeasons=new Set<string>();

  // The first real shift creates one blocking career milestone and survives save/reload while pending.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'merchant.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'merchant.career.first-shift');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'merchant.career.first-shift');
  s=settlePending(s);
  assert.equal(s.run.progression.careers.merchant.stage,'independent-trader');
  s=finishNight(s);

  // The first-shift milestone is exactly-once.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'merchant.shift'},catalog);
  assert.notEqual(s.run.pending?.eventId,'merchant.career.first-shift');
  s=settlePending(s);
  s=finishNight(s);

  while((s.run.progression.careers.merchant?.counters.completed_shifts??0)<50){
    s=merchantWorkDay(s,seenSeasons);
    if(s.run.progression.careers.merchant?.counters.completed_shifts===10){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  assert.equal(s.run.progression.careers.merchant.counters.completed_shifts,50);
  assert.equal(s.run.progression.careers.merchant.stage,'networked-merchant',
    'readiness must not force a late Merchant branch while route selection is deferred');

  for(const fact of [
    'seasonal-breadth-ready',
    'veteran-ready',
    'appraisal-recorded',
    'manifest-verified',
    'delivery-recorded',
    'shortage-handled',
    'risk-accepted',
    'supplier-trust-ready',
    'relationship-conflict-resolved',
    'crisis-resolved',
    'speculator-route-ready',
    'poverty-response-recorded'
  ]){
    assert.ok(s.run.progression.careers.merchant.facts.includes(fact),fact);
  }

  const supplier=s.run.progression.relationships['merchant.supplier'];
  assert.ok(supplier);
  assert.equal(supplier.stage,'route-resolved');
  assert.equal(supplier.choices['conflict-response'],'cooperate');
  assert.equal(supplier.choices['utility-response'],'accepted');

  assert.equal(s.run.resources.inventory.merchant_appraisal_scales,1);
  assert.equal(s.run.resources.inventory.merchant_manifest_case,1);
  assert.equal(s.run.resources.inventory.merchant_sample_kit,1);

  assert.ok(s.run.endings.eligible.includes('ending.merchant.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.hardWorkProgress.includes('merchant'),false,
    'route readiness and ending eligibility must not mutate Meta');

  s=dispatch(s,{type:'commitEnding',id:'ending.merchant.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('merchant'),false,
    'commit alone must not apply Merchant Hard Work Meta');

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.merchant.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('merchant'));

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.merchant,undefined);
  assert.equal(s.run.progression.relationships['merchant.supplier'],undefined);
  assert.ok(s.meta.completedEndings.includes('ending.merchant.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('merchant'));
});

test('declining the recurring supplier route preserves ordinary Merchant progression',()=>{
  let s=started();
  s.run.character.stats.wits=20;
  s.run.character.stats.reason=20;
  s.run.character.stats.sociability=15;

  let guard=0;
  while(s.run.progression.relationships['merchant.supplier']?.stage!=='route-resolved'){
    if(++guard>20)throw new Error('Merchant supplier refusal did not resolve naturally');
    s=dispatch(s,{type:'action',id:'merchant.shift'},catalog);
    s=settlePending(s,{'merchant.relationship.conflict-resolve':'decline'});
    if(s.run.progression.relationships['merchant.supplier']?.stage!=='route-resolved'){
      s=finishNight(s,{'merchant.relationship.conflict-resolve':'decline'});
    }
  }

  const supplier=s.run.progression.relationships['merchant.supplier'];
  assert.ok(supplier);
  assert.equal(supplier.stage,'route-resolved');
  assert.equal(supplier.choices['conflict-response'],'declined');
  assert.ok(supplier.facts.includes('refusal-respected'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  const action=catalog.definitions.actions.find(a=>a.id==='merchant.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
  const before=s.run.progression.careers.merchant.counters.completed_shifts;
  s=dispatch(s,{type:'action',id:'merchant.shift'},catalog);
  assert.equal(s.run.progression.careers.merchant.counters.completed_shifts,before+1);
});
