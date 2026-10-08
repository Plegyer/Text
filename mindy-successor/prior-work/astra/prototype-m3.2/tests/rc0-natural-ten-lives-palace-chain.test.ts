import test from 'node:test';
import assert from 'node:assert/strict';
import {
  actionAvailable,
  calendar,
  dispatch,
  eligible,
  parseSave
} from '../src/core/engine.ts';
import {palaceDutyDefinitions,PALACE_DUTY_COUNTER,PALACE_ACCESS_FACT} from '../src/core/palace.ts';
import {ordinaryHardWorkCareers,type Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

// No direct mutation of a Save's day, stats, resources, progress, Meta,
// RNG, flags, career stages, court invitation, outcomes or item inventory.
// Every one of ten earned Hard Work bonuses comes from actual shift commands,
// actual calendar-day advances and explicit completed ending transactions.
const reload=(s:Save)=>parseSave(JSON.stringify(s),catalog);
const preferred:Record<string,string>={
  'secret-debt.lender-encounter':'refuse',
  'lumber.career-first-shift':'continue',
  'lumber.foreman-notice':'professional',
  'palace.invitation.day1-arrival':'open',
  'palace.invitation.reveal':'accept',
  'palace.progression.milestone-02-working-rhythm':'continue',
  'palace.progression.milestone-05-trusted-service':'continue',
  'palace.progression.milestone-08-palace-network':'continue',
  'palace.progression.milestone-12-crossroads':'continue',
  'palace.progression.milestone-15-outcome-ready':'continue',
  'palace.outcome-finalize.service-life':'finalize',
  'palace.outcome-finalize.court-power':'finalize',
  'palace.outcome-finalize.inner-truth':'finalize'
};

function settle(input:Save):Save{
  let s=input,steps=0;
  while(s.run.pending){
    if(++steps>250)throw new Error('10-life pending loop at '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,'published event '+s.run.pending!.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choices=event.choices.filter(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    const want=preferred[event.id]??(event.id.startsWith('palace.outcome-finalize.')?'finalize':undefined);
    const choice=choices.find(c=>c.id===want)
      ??choices.find(c=>c.id==='continue')
      ??choices.find(c=>c.id==='record')
      ??choices.find(c=>c.id==='professional')
      ??choices[0];
    assert.ok(choice,'eligible choice in '+event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function nightToNextDay(input:Save):Save{
  const day=input.run.calendar.elapsedDays;
  let s=settle(dispatch(input,{type:'endDay'},catalog)),steps=0;
  while(s.run.flow.night||s.run.pending){
    if(++steps>250)throw new Error('10-life Night loop day '+day);
    if(s.run.pending){s=settle(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=settle(dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog));
    }else if(phase==='VoluntaryNightChoice'){
      s=settle(dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog));
    }else throw new Error('10-life unexpected Night phase: '+phase);
  }
  assert.equal(s.run.calendar.elapsedDays,day+1,'one ordinary Night = exactly one real day');
  assert.equal(s.run.status,'active');
  return s;
}

function createFollowingLife(input:Save):Save{
  let s=dispatch(input,{type:'newLife'},catalog);
  assert.equal(s.run.creation.complete,false);
  assert.equal(s.run.day,0);
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
  s=dispatch(s,{type:'finishCreation'},catalog);
  assert.equal(s.run.creation.complete,true);
  assert.equal(s.run.pending,null,'Palace must remain locked before ten distinct Hard Works');
  s=settle(dispatch(s,{type:'action',id:'arrival'},catalog));
  assert.equal(s.run.flags['story.arrived'],true);
  return reload(s);
}

test('RC0 real ten distinct earned Hard Works in ten actual lives grant Day-1 Palace, 15 duties, service-life ending and next NG+',()=>{
  const all=[...ordinaryHardWorkCareers];
  assert.equal(all.length,10,'exact ten ordinary careers, not Secret Debt or Palace');
  let s=started();
  const evidence:{career:string;shifts:number;lastDay:number;metaAfter:string[]}[]=[];

  for(let index=0;index<all.length;index++){
    const career=all[index]!;
    const action=catalog.definitions.actions.find(a=>a.id===career+'.shift');
    const endingId='ending.'+career+'.hard-work';
    assert.ok(action,'real authored work action '+career);
    assert.equal(s.run.status,'active');
    assert.equal(s.run.creation.complete,true);
    assert.ok(!s.meta.hardWorkProgress.includes(career));
    assert.equal(s.run.endings.eligible.includes(endingId),false);

    const seenShiftDays:number[]=[];
    let guard=0;
    while((s.run.progression.careers[career]?.counters.completed_shifts??0)<50){
      if(++guard>159)throw new Error('Career '+career+' cannot reach 50 natural shifts within 160 days');
      s=settle(s);
      if(actionAvailable(action,s,catalog)){
        const day=s.run.calendar.elapsedDays;
        assert.ok(s.run.dayState.energyCurrent>=1,'natural shift energy for '+career);
        const before=s.run.progression.careers[career]?.counters.completed_shifts??0;
        s=settle(dispatch(s,{type:'action',id:action.id},catalog));
        assert.equal(s.run.progression.careers[career]?.counters.completed_shifts,before+1,
          career+' one work action = one shift');
        assert.equal(s.run.calendar.elapsedDays,day,'work must not skip days');
        assert.ok(!seenShiftDays.includes(day),'one shift per calendar day');
        seenShiftDays.push(day);
      }
      if((s.run.progression.careers[career]?.counters.completed_shifts??0)<50){
        s=nightToNextDay(s);
        if(s.run.day%20===0)s=reload(s);
      }
    }
    assert.equal(seenShiftDays.length,50,career+' performed fifty separate real shifts');
    assert.equal(new Set(seenShiftDays).size,50);
    assert.ok(s.run.endings.eligible.includes(endingId),career+' hard work must be eligible');
    assert.equal(s.run.status,'active');
    assert.deepEqual(s.meta.hardWorkProgress,all.slice(0,index));
    s=dispatch(reload(s),{type:'commitEnding',id:endingId},catalog);
    assert.equal(s.run.status,'ending_committed');
    s=dispatch(reload(s),{type:'completeEnding'},catalog);
    assert.equal(s.run.status,'ended');
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:'+career]);
    assert.deepEqual(s.meta.hardWorkProgress,all.slice(0,index+1));
    evidence.push({
      career,
      shifts:50,
      lastDay:s.run.day,
      metaAfter:[...s.meta.hardWorkProgress]
    });

    if(index<all.length-1){
      s=createFollowingLife(s);
      assert.deepEqual(s.meta.hardWorkProgress,all.slice(0,index+1),'earned Meta survives real New Life');
    }
  }

  assert.equal(evidence.length,10);
  assert.equal(evidence.reduce((n,e)=>n+e.shifts,0),500,'500 actual shift commands');
  assert.ok(evidence.every(e=>e.lastDay<160),'all ten professions complete within one natural lifespan each');
  assert.equal(new Set(s.meta.hardWorkProgress).size,10);
  assert.equal(s.meta.runsCompleted,10);
  assert.equal(s.meta.completedEndings.filter(e=>e.endsWith('.hard-work')).length,10);

  // Earned, NOT injected, ten career packages. Palace must remain unavailable
  // until ten are actively selected in the new life's real creation UI commands.
  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.day,0);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,[]);
  for(const career of all){
    s=dispatch(s,{type:'setHardWorkPackageActive',career,active:true},catalog);
  }
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
  s=dispatch(s,{type:'finishCreation'},catalog);
  assert.equal(s.run.creation.hardWorkPackagesApplied,true);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,all);
  assert.equal(s.run.pending?.eventId,'palace.invitation.day1-arrival');
  assert.equal(s.run.day,0,'Day-1 court invite after all ten earned careers');

  s=reload(s);
  s=settle(s);
  assert.equal(s.run.pending,null);
  assert.ok(s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT));
  assert.equal(s.run.progression.palace.stage,'entered-service');
  assert.equal(s.run.day,0);

  // Invitation itself does not replace the real story-arrival player action.
  s=settle(dispatch(s,{type:'action',id:'arrival'},catalog));
  assert.equal(s.run.flags['story.arrived'],true);

  // Fifteen real Palace duties on fifteen different calendar days, not the
  // familiar seeded test's manual '+1 day' and forced Energy/state operations.
  for(let ordinal=1;ordinal<=15;ordinal++){
    if(ordinal>1)s=nightToNextDay(s);
    const duty=palaceDutyDefinitions[ordinal-1];
    assert.ok(duty);
    assert.ok(actionAvailable(catalog.definitions.actions.find(a=>a.id===duty.id)!,s,catalog));
    const day=s.run.day;
    s=settle(dispatch(s,{type:'action',id:duty.id},catalog));
    assert.equal(s.run.progression.palace.counters[PALACE_DUTY_COUNTER],ordinal);
    assert.equal(s.run.day,day);
    if(ordinal===5){
      s=settle(dispatch(s,{type:'action',id:'palace.outcome-prep.service-life.01-continuity'},catalog));
    }
    if(ordinal===6){
      s=settle(dispatch(s,{type:'action',id:'palace.outcome-prep.service-life.02-boundaries'},catalog));
    }
    if(ordinal%5===0)s=reload(s);
  }

  assert.equal(s.run.progression.palace.stage,'outcome-ready');
  assert.ok(s.run.progression.worldFacts.includes('palace.progression-complete'));
  assert.ok(s.run.endings.eligible.includes('ending.palace.service-life'));
  assert.equal(s.run.status,'active');
  const beforeRewards=[...s.meta.hardWorkProgress];
  s=dispatch(reload(s),{type:'commitEnding',id:'ending.palace.service-life'},catalog);
  s=dispatch(reload(s),{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.meta.runsCompleted,11);
  assert.deepEqual(s.meta.hardWorkProgress,beforeRewards);
  assert.ok(s.meta.completedEndings.includes('ending.palace.service-life'));
  s=reload(dispatch(s,{type:'newLife'},catalog));
  assert.equal(s.run.day,0);
  assert.equal(s.run.status,'active');
  assert.deepEqual(s.meta.hardWorkProgress,all);
  assert.ok(s.meta.completedEndings.includes('ending.palace.service-life'));
  assert.equal(s.run.creation.activeHardWorkPackages.length,0,'Palace access does not persist automatically');
});
