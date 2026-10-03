import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';
import {actionAvailable,calendar,dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const inventory=JSON.parse(readFileSync('content/school-guard-v16-live-inventory.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));

test('C5-169 exact five Guard-facing live School tracks and courses are current',()=>{
  assert.deepEqual(inventory.hooks.map((x:any)=>[x.role,x.courseId,x.trackId]),[
    ['reports_evidence','school.course.literacy_and_numbers','school.track.literacy_and_numbers'],
    ['deescalation_questioning','school.course.rhetoric_and_social','school.track.rhetoric_and_social'],
    ['formal_high_status','school.course.etiquette_and_presentation','school.track.etiquette_and_presentation'],
    ['controlled_duty_movement','school.course.physical_training','school.track.physical_training'],
    ['anomaly_observation','school.course.arcana','school.track.arcana']
  ]);
  for(const hook of inventory.hooks){
    const course=SCHOOL_COURSES.find(x=>x.id===hook.courseId);
    assert.ok(course,hook.courseId);
    assert.equal(course.trackId,hook.trackId);
  }
});

test('C5-169/C5-177 existing Guard-facing teacher media is reused exactly',()=>{
  assert.deepEqual(inventory.hooks.map((x:any)=>x.teacherContentId),[
    'school.teacher.mara-fen',
    'school.teacher.cassian-reed',
    'school.teacher.eliane-marrow',
    'school.teacher.tovan-kest',
    'school.teacher.ilyra-venn'
  ]);
  for(const hook of inventory.hooks){
    assert.ok(teachers.media.some((x:any)=>x.id===hook.teacherMediaId),hook.teacherMediaId);
  }
});

test('C5-169/C5-176 every recorded Guard Night-study choice is an existing typed School choice',()=>{
  const live=new Set(schoolNightStudyChoices().map(x=>x.id));
  for(const hook of inventory.hooks){
    assert.ok(hook.nightChoiceIds.length>=2,hook.role);
    for(const id of hook.nightChoiceIds)assert.ok(live.has(id),id);
  }
});

test('C5-169/C5-175/C5-176 C1D-152 binds fact-only Guard School authority with no live consumers',()=>{
  assert.equal(inventory.status,'C1D_152_FACT_ONLY_NO_LIVE_CONSUMERS');
  assert.equal(inventory.runtimeContract.head,'89030816f07be16ab5071ebb9af859fc3c756115');
  assert.equal(inventory.runtimeContract.blob,'03b332944e9c8cc0ef27193a1c06b5102f872451');
  assert.equal(inventory.productionAudit.currentGuardSchoolPack,null);
  assert.equal(inventory.localHookPolicy.threshold,null);
  assert.equal(inventory.localHookPolicy.thresholdAuthority,'C1D_152_EXPLICITLY_NULL');
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
  assert.equal(inventory.localHookPolicy.nightParityAuthority,'BLOCKED_NO_LIVE_CONSUMER_C1D_152');
  assert.equal(inventory.localHookPolicy.gameplayEventIds,'BLOCKED_NO_LIVE_CONSUMER_C1D_152');
  assert.equal(inventory.localHookPolicy.careerFactIds,'C1D_145_BOUND');
  assert.deepEqual(inventory.hooks.map((x:any)=>[x.careerFact,x.reactionEvent,x.threshold,x.immediateResolverStatus,x.nightParityStatus]),[
    ['school-literacy-ready','BLOCKED_NO_LIVE_CONSUMER_C1D_152',null,'BLOCKED_NO_LIVE_CONSUMER','BLOCKED_NO_LIVE_CONSUMER'],
    ['school-rhetoric-ready','BLOCKED_NO_LIVE_CONSUMER_C1D_152',null,'BLOCKED_NO_LIVE_CONSUMER','BLOCKED_NO_LIVE_CONSUMER'],
    ['school-etiquette-ready','BLOCKED_NO_LIVE_CONSUMER_C1D_152',null,'BLOCKED_NO_LIVE_CONSUMER','BLOCKED_NO_LIVE_CONSUMER'],
    ['school-physical-ready','BLOCKED_NO_LIVE_CONSUMER_C1D_152',null,'BLOCKED_NO_LIVE_CONSUMER','BLOCKED_NO_LIVE_CONSUMER'],
    ['school-arcana-ready','BLOCKED_NO_LIVE_CONSUMER_C1D_152',null,'BLOCKED_NO_LIVE_CONSUMER','BLOCKED_NO_LIVE_CONSUMER']
  ]);
});


function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>180)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>220)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}
    if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function ensureEnergy(s:Save){return s.run.dayState.energyCurrent>0?s:finishNight(s);}

function work(s:Save,id:string){
  s=ensureEnergy(s);
  return settlePending(dispatch(s,{type:'action',id},catalog));
}

function studyNight(state:Save,choiceId:string){
  let s=dispatch(state,{type:'endDay'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  return dispatch(s,{type:'chooseNightChoice',id:choiceId},catalog);
}

test('D40 Guard School publishers create only literacy and etiquette readiness at the exact three-session threshold',()=>{
  let s=started();
  while(s.run.resources.money<20_000)s=work(s,'lumber.shift');
  while(calendar(s.run.day).year<2)s=finishNight(s);
  s=work(s,'guard.shift');
  assert.ok(s.run.progression.careers.guard);
  for(const [courseId,fact] of [
    ['school.course.literacy_and_numbers','school-literacy-ready'],
    ['school.course.etiquette_and_presentation','school-etiquette-ready']
  ] as const){
    for(let i=0;i<3;i++){
      s=ensureEnergy(s);
      s=dispatch(s,{type:'schoolLesson',id:courseId},catalog);
      s=settlePending(s);
    }
    s=finishNight(s);
    assert.ok(s.run.progression.careers.guard.facts.includes(fact),fact);
  }
  for(const fact of ['school-rhetoric-ready','school-physical-ready','school-arcana-ready']){
    assert.equal(s.run.progression.careers.guard.facts.includes(fact),false,fact+' remains outside D40 publisher scope');
  }
  let night=started();
  while(night.run.resources.money<20_000)night=work(night,'lumber.shift');
  while(calendar(night.run.day).year<2)night=finishNight(night);
  night=work(night,'guard.shift');
  const literacy=inventory.hooks.find((x:any)=>x.careerFact==='school-literacy-ready');assert.ok(literacy);
  for(let i=0;i<3;i++)night=settlePending(studyNight(night,literacy.nightChoiceIds[0]));
  assert.ok(night.run.progression.careers.guard.facts.includes('school-literacy-ready'),'Night Study remains an alternative threshold path');
});
