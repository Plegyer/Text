import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'guard.career.first-shift':'continue',
  'guard.career.senior':'continue',
  'guard.career.duty-breadth':'record',
  'guard.career.veteran-ready':'record',
  'guard.career.choose-route':'defer',
  'guard.career.choose-major-case':'defer',
  'guard.career.outcome-ready':'continue',
  'guard.city.dispute':'record-both-sides',
  'guard.city.crowd-pressure':'open-lane',
  'guard.city.suspicious-pass':'record-discrepancy',
  'guard.city.poverty-response':'route-to-shelter',
  'guard.city.formal-report':'write-report',
  'guard.relationship.intro':'professional',
  'guard.relationship.trust':'continue',
  'guard.relationship.conflict-open':'open',
  'guard.relationship.conflict-resolve':'cooperate',
  'guard.relationship.case-support':'accept',
  'guard.access.badge':'take-badge',
  'guard.access.sealed-pass':'take-pass',
  'guard.access.evidence-ledger':'link',
  'guard.routes.reform-ready':'record',
  'guard.routes.network-ready':'record',
  'guard.routes.officer-ready':'record',
  'guard.routes.major-case-ready':'record',
  'guard.cross.tavern-receipt':'record'
};

function choose(event:any,s:Save,overrides:Record<string,string>={}){
  if(event.id==='guard.crisis.market-gate-pressure'){
    const reform=event.choices.find((c:any)=>c.id==='deescalate-crowd'&&eligible(c.conditions,s,catalog));
    return reform??event.choices.find((c:any)=>c.id==='defer'&&eligible(c.conditions,s,catalog));
  }
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

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>300)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s);
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

function guardWorkDay(state:Save,seasons:Set<string>){
  seasons.add(calendar(state.run.day).season);
  let s=dispatch(state,{type:'action',id:'guard.shift'},catalog);
  s=settlePending(s);
  return finishNight(s);
}

test('clean Guard run reaches Reform and Major Case readiness plus Hard Work without forced commitment',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='guard.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(calendar(s.run.day).year,2);
  assert.equal(actionAvailable(action,s,catalog),true,'Year-2 fallback must unlock Guard naturally');

  const seenSeasons=new Set<string>();

  // First real shift: reload while the blocking Guard milestone is pending.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'guard.shift'},catalog);
  assert.equal(s.run.pending?.eventId,'guard.career.first-shift');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'guard.career.first-shift');
  s=settlePending(s);
  assert.equal(s.run.progression.careers.guard.stage,'trusted-guard');
  assert.equal(s.run.resources.inventory.guard_badge,1);
  s=finishNight(s);

  // First milestone is one-shot: the next real shift must not replay it.
  seenSeasons.add(calendar(s.run.day).season);
  s=dispatch(s,{type:'action',id:'guard.shift'},catalog);
  assert.notEqual(s.run.pending?.eventId,'guard.career.first-shift');
  s=settlePending(s);
  s=finishNight(s);

  while((s.run.progression.careers.guard?.counters.completed_shifts??0)<50){
    s=guardWorkDay(s,seenSeasons);
    if(s.run.progression.careers.guard?.counters.completed_shifts===10){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  assert.deepEqual([...seenSeasons].sort(),['autumn','spring','summer','winter']);
  assert.equal(s.run.progression.careers.guard.counters.completed_shifts,50);
  assert.equal(s.run.progression.careers.guard.stage,'senior-guard',
    'route readiness must not force a late branch while selector is deferred');

  for(const fact of [
    'duty-breadth-ready',
    'veteran-ready',
    'official-access-issued',
    'cargo-pass-evidence',
    'sealed-pass-issued',
    'duty-report-evidence',
    'poverty-response-recorded',
    'poverty-relief-choice',
    'relationship-trust-ready',
    'relationship-conflict-resolved',
    'partner-case-support',
    'crisis-resolved',
    'crisis-reform',
    'reform-route-ready',
    'major-case-thread-ready',
    'major-case-ready'
  ]){
    assert.ok(s.run.progression.careers.guard.facts.includes(fact),fact);
  }

  const partner=s.run.progression.relationships['guard.partner'];
  assert.ok(partner);
  assert.equal(partner.stage,'route-resolved');
  assert.equal(partner.choices['conflict-response'],'cooperate');
  assert.equal(partner.choices['cooperation-response'],'accepted');

  assert.ok(s.run.endings.eligible.includes('ending.guard.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.meta.hardWorkProgress.includes('guard'),false,
    'route readiness and ending eligibility must not mutate Meta');

  s=dispatch(s,{type:'commitEnding',id:'ending.guard.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('guard'),false,
    'commit alone must not apply Hard Work Meta');

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.ok(s.meta.completedEndings.includes('ending.guard.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('guard'));

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.progression.careers.guard,undefined);
  assert.ok(s.meta.completedEndings.includes('ending.guard.hard-work'));
  assert.ok(s.meta.hardWorkProgress.includes('guard'));
});

test('declining the Guard partner conflict route preserves ordinary Guard progression',()=>{
  let s=started();
  s.run.character.stats.strength=30;
  s.run.character.stats.endurance=30;
  s.run.character.stats.manners=20;

  let guard=0;
  while(s.run.progression.relationships['guard.partner']?.stage!=='route-resolved'){
    if(++guard>20)throw new Error('Guard refusal relationship did not resolve naturally');
    s=dispatch(s,{type:'action',id:'guard.shift'},catalog);
    s=settlePending(s,{'guard.relationship.conflict-resolve':'decline'});
    if(s.run.progression.relationships['guard.partner']?.stage!=='route-resolved')s=finishNight(s);
  }

  const partner=s.run.progression.relationships['guard.partner'];
  assert.ok(partner);
  assert.equal(partner.stage,'route-resolved');
  assert.equal(partner.choices['conflict-response'],'declined');
  assert.ok(partner.facts.includes('refusal-respected'));

  if(s.run.dayState.energyCurrent<1)s=finishNight(s);
  const action=catalog.definitions.actions.find(a=>a.id==='guard.shift');
  assert.ok(action);
  assert.equal(actionAvailable(action,s,catalog),true);
  const before=s.run.progression.careers.guard.counters.completed_shifts;
  s=dispatch(s,{type:'action',id:'guard.shift'},catalog);
  assert.equal(s.run.progression.careers.guard.counters.completed_shifts,before+1);
});
