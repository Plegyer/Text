import test from 'node:test';
import assert from 'node:assert/strict';

import {
  availableActivityActions,
  calendar,
  dispatch,
  eligible,
  parseSave
} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

// Release-candidate actual-command witness. No mutation to Save day, stats,
// money, flags, inventory, career progress, endings, RNG or Meta.
const reload=(s:Save)=>parseSave(JSON.stringify(s),catalog);
const preferred:Record<string,string>={
  'lumber.career-first-shift':'continue',
  'lumber.foreman-notice':'professional',
  'lumber-cross.activity-forest-return':'continue',
  'base.school':'listen',
  'lumber-night.foreman-professional':'continue',
  'secret-debt.lender-encounter':'refuse'
};

function settle(input:Save):Save{
  let s=input,steps=0;
  while(s.run.pending){
    if(++steps>150)throw new Error('160-day run pending loop at '+s.run.pending.eventId);
    const e=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(e,'published event '+s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??e.choices.map(c=>c.id);
    const choices=e.choices.filter(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    const wanted=preferred[e.id];
    const choice=choices.find(c=>c.id===wanted)??choices.find(c=>c.id==='continue')??choices[0];
    assert.ok(choice,'eligible answer for '+e.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function endAndResolveNight(input:Save,preferForeman=false):{state:Save;paid:boolean;foreman:boolean}{
  let s=settle(dispatch(input,{type:'endDay'},catalog));
  let guard=0,paid=false,foreman=false;
  while(s.run.flow.night||s.run.pending){
    if(++guard>150)throw new Error('160-day Night stuck on day '+s.run.day);
    if(s.run.pending){s=settle(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      // Real money earned from play. Mix real normal-room and street choices.
      const useNormal=s.run.resources.money>=100&&(preferForeman||s.run.day%11===0);
      s=settle(dispatch(s,{type:'chooseLodging',id:useNormal?'lodging.normal':'lodging.street'},catalog));
      if(useNormal)paid=true;
    }else if(phase==='VoluntaryNightChoice'){
      const foremanNight=catalog.definitions.nightChoices.find(n=>n.id==='lumber.foreman.night');
      const useForeman=preferForeman&&!!foremanNight&&eligible(foremanNight.conditions,s,catalog);
      const id=useForeman?'lumber.foreman.night':'night.sleep';
      s=settle(dispatch(s,{type:'chooseNightChoice',id},catalog));
      if(useForeman)foreman=true;
    }else throw new Error('Unexpected Night phase '+phase);
  }
  return {state:s,paid,foreman};
}

test('RC0 clean 160-day life: Lumber + School + Forest + four years, then explicit expired fate/NG+ (no Save injection)',()=>{
  let s=started();
  const openingDate=s.run.day;
  const startingMoney=s.run.resources.money;
  const seasons=new Set<string>();
  const visitedDays:number[]=[];
  let paidNights=0,foremanNights=0;
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.equal(s.run.status,'active');

  // Year-1 ordinary authored career and an actual paid School lesson.
  s=settle(dispatch(s,{type:'action',id:'lumber.shift'},catalog));
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  s=settle(dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog));
  assert.equal(s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,1);
  assert.ok(s.run.resources.money<startingMoney+37,'School money was actually spent');
  s=settle(dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog));
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);
  seasons.add(calendar(s.run.day).season);
  visitedDays.push(s.run.day);

  let overnight=endAndResolveNight(s,true);
  s=overnight.state;
  paidNights+=Number(overnight.paid);
  foremanNights+=Number(overnight.foreman);
  assert.equal(s.run.day,openingDate+1);
  assert.ok(paidNights>0,'first normal room was really paid');
  assert.ok(foremanNights>0,'Foreman Night was really visited');

  // Forest activity from the city: no manufactured inventory or career facts.
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.flow.activity?.activityId,'lumber.forest');
  const forestActions=[
    'forest.route.logging-road',
    'forest.challenge.logging-navigation',
    'forest.challenge.logging-spring-mud',
    'forest.challenge.logging-preserve-sample',
    'advance',
    'advance'
  ];
  for(const id of forestActions){
    assert.ok(availableActivityActions(s,catalog).some(a=>a.id===id),'real Forest option '+id);
    s=reload(dispatch(s,{type:'activityAction',id},catalog));
  }
  assert.equal(s.run.flow.activity,null);
  s=settle(s);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  // Continue the SAME real Save; each workday is a real action and each day a
  // normal night transition. After 50 shifts, continue living until Year 4 ends.
  while(s.run.day<159){
    const day=s.run.day;
    seasons.add(calendar(day).season);
    visitedDays.push(day);
    const shifts=s.run.progression.careers.lumber?.counters.completed_shifts??0;
    if(shifts<50){
      assert.ok(s.run.dayState.energyCurrent>=1,'Energy to work on day '+day);
      s=settle(dispatch(s,{type:'action',id:'lumber.shift'},catalog));
      assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,shifts+1);
      assert.equal(s.run.day,day,'shift does not consume a calendar day');
    }
    overnight=endAndResolveNight(s);
    s=overnight.state;
    paidNights+=Number(overnight.paid);
    foremanNights+=Number(overnight.foreman);
    assert.equal(s.run.day,day+1,'each Night advances exactly one day');
    assert.equal(s.run.status,'active');
    assert.ok(s.run.dayState.energyCurrent>=1,'valid next-day Energy');
    if(s.run.day%10===0)s=reload(s);
  }

  seasons.add(calendar(s.run.day).season);
  visitedDays.push(s.run.day);
  assert.equal(s.run.day,159);
  assert.equal(s.run.calendar.elapsedDays,159);
  assert.equal(visitedDays.length,160);
  assert.equal(new Set(visitedDays).size,160);
  assert.equal(calendar(s.run.day).year,4);
  assert.deepEqual([...seasons].sort(),['autumn','spring','summer','winter']);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active','fate remains player-controlled before time limit');
  assert.equal(s.run.endings.committed,null);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.ok(paidNights>=1);
  assert.ok(foremanNights>=1);

  // At end of the 160th day expiry must NOT grant any reward by itself.
  let expired=dispatch(reload(s),{type:'endDay'},catalog);
  assert.equal(expired.run.status,'expired');
  assert.equal(expired.run.calendar.elapsedDays,159,'no phantom 161st day');
  assert.equal(expired.run.flow.night,null);
  assert.equal(expired.run.endings.committed,null);
  assert.deepEqual(expired.meta.hardWorkProgress,[]);
  assert.ok(expired.run.endings.eligible.includes('ending.lumber.hard-work'));
  expired=reload(expired);

  // Player can explicitly start a new life without accepting a fate.
  const skipFate=reload(dispatch(expired,{type:'newLife'},catalog));
  assert.equal(skipFate.run.status,'active');
  assert.deepEqual(skipFate.meta.hardWorkProgress,[],'expiry is not a free Hard Work reward');

  // OR accept the previously earned fate during the expired choice window.
  let accepted=dispatch(expired,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(accepted.run.status,'ending_committed');
  assert.deepEqual(accepted.meta.hardWorkProgress,[]);
  accepted=dispatch(reload(accepted),{type:'completeEnding'},catalog);
  assert.equal(accepted.run.status,'ended');
  assert.deepEqual(accepted.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(accepted.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  const once=JSON.stringify(accepted);
  accepted=dispatch(reload(accepted),{type:'completeEnding'},catalog);
  assert.equal(JSON.stringify(accepted),once,'completion retry must not duplicate a reward');
  const newLife=reload(dispatch(accepted,{type:'newLife'},catalog));
  assert.deepEqual(newLife.meta.hardWorkProgress,['lumber']);
  assert.equal(newLife.run.status,'active');
  assert.equal(newLife.run.day,0);
});
