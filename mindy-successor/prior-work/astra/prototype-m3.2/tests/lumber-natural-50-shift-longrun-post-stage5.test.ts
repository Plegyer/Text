import test from 'node:test';
import assert from 'node:assert/strict';
import {calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

// No direct mutations of day, money, career counters/stages, unlocks, or inventory:
// every gameplay transition below is a real engine command.
const reload=(state:Save)=>parseSave(JSON.stringify(state),catalog);
const preferredChoices:Record<string,string>={
  'lumber.career-first-shift':'continue',
  'lumber.foreman-notice':'professional',
  'secret-debt.lender-encounter':'refuse'
};

function settlePending(state:Save):Save{
  let s=state,steps=0;
  while(s.run.pending){
    if(++steps>120)throw new Error('Lumber natural run: pending loop at '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,'published event '+s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const candidates=event.choices.filter(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    const wanted=preferredChoices[event.id];
    const choice=candidates.find(c=>c.id===wanted)??candidates.find(c=>c.id==='continue')??candidates[0];
    assert.ok(choice,'eligible choice for '+event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishDay(state:Save):Save{
  let s=settlePending(dispatch(state,{type:'endDay'},catalog)),steps=0;
  while(s.run.flow.night||s.run.pending){
    if(++steps>120)throw new Error('Lumber natural run: Night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      // A zero-cost real lodging option; no money/state injection across 50 days.
      s=settlePending(dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog));
    }else if(phase==='VoluntaryNightChoice'){
      s=settlePending(dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog));
    }else throw new Error('Unexpected Night phase '+phase);
  }
  return s;
}

test('clean Lumber life naturally earns 50 Hard Work shifts over calendar days, then New Life Meta once',()=>{
  let s=started();
  const shiftDays:number[]=[];
  const seasons=new Set<string>();
  const startingYear=calendar(s.run.day).year;
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.equal(s.run.endings.eligible.includes('ending.lumber.hard-work'),false);

  while((s.run.progression.careers.lumber?.counters.completed_shifts??0)<50){
    s=settlePending(s);
    const before=s.run.progression.careers.lumber?.counters.completed_shifts??0;
    const date=s.run.calendar.elapsedDays;
    if(shiftDays.length)assert.ok(date>shiftDays.at(-1)!,'one Lumber shift per calendar day');
    seasons.add(calendar(s.run.day).season);
    assert.ok(s.run.dayState.energyCurrent>0,'natural Energy to work on day '+date);
    s=settlePending(dispatch(s,{type:'action',id:'lumber.shift'},catalog));
    assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,before+1);
    assert.equal(s.run.calendar.elapsedDays,date,'shift does not advance global day');
    shiftDays.push(date);
    if(before+1<50){
      s=finishDay(s);
      if((before+1)%10===0)s=reload(s);
    }
  }

  assert.equal(shiftDays.length,50);
  assert.equal(new Set(shiftDays).size,50);
  assert.ok(s.run.calendar.elapsedDays>=49,'at least 50 distinct calendar days elapsed');
  assert.ok(calendar(s.run.day).year>startingYear,'year rollover exercised');
  assert.deepEqual([...seasons].sort(),['autumn','spring','summer','winter']);
  assert.equal(s.run.endings.eligible.includes('ending.lumber.hard-work'),true);
  assert.equal(s.run.status,'active','eligibility is nonterminal');
  assert.equal(s.run.endings.committed,null);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  s=reload(s);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  const snapshot=JSON.stringify(s);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(JSON.stringify(s),snapshot,'completion retry is idempotent');

  s=dispatch(s,{type:'newLife'},catalog);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,[],'no automatic Hard Work package selection');
  assert.equal(s.run.creation.hardWorkPackagesApplied,false);
  assert.deepEqual(reload(s).meta.hardWorkProgress,['lumber']);
});
