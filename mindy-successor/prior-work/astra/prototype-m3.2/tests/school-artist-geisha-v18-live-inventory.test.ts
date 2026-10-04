import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';
import type {SchoolCourseId} from '../src/core/school.ts';
import {actionAvailable,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const inventory=JSON.parse(readFileSync('content/school-artist-geisha-v18-live-inventory.fixture.json','utf8'));
const authority=JSON.parse(readFileSync('content/school-artist-geisha-v18-runtime-authority.fixture.json','utf8'));
const preparation=JSON.parse(readFileSync('content/school-artist-geisha-preparation-v1.fixture.json','utf8'));
const reactive=JSON.parse(readFileSync('content/school-artist-geisha-reactive-depth-v1.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>300)throw new Error('pending loop: '+s.run.pending.eventId);
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
    if(++guard>300)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}
    if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function ensureEnergy(s:Save){return s.run.dayState.energyCurrent>0?s:finishNight(s);}

function work(state:Save,id:string){
  let s=ensureEnergy(state);
  s=dispatch(s,{type:'action',id},catalog);
  return settlePending(s);
}

function paidLesson(state:Save,courseId:SchoolCourseId){
  let s=ensureEnergy(state);
  return dispatch(s,{type:'schoolLesson',id:courseId},catalog);
}

function studyNight(state:Save,choiceId:string){
  let s=dispatch(state,{type:'endDay'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=dispatch(s,{type:'chooseNightChoice',id:choiceId},catalog);
  return settlePending(s);
}

function artistFacts(s:Save){
  return s.run.progression.careers['artist-geisha']?.facts??[];
}

test('C5-193 exact five-track Artist inventory reuses current courses teachers media and Night-study choices',()=>{
  assert.deepEqual(inventory.mappings.map((x:any)=>[
    x.role,x.courseId,x.trackId,x.teacherContentId,x.teacherMediaId
  ]),[
    ['performance_repertoire','school.course.arts_and_performance','school.track.arts_and_performance','school.teacher.nessa-lark','school.teacher.arts-and-performance.classroom'],
    ['formal_event_guest_facing','school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school.teacher.eliane-marrow','school.teacher.etiquette-and-presentation.classroom'],
    ['conversation_patron_rival_method','school.course.rhetoric_and_social','school.track.rhetoric_and_social','school.teacher.cassian-reed','school.teacher.rhetoric-and-social.classroom'],
    ['performance_presence_boundaries','school.course.body_confidence','school.track.body_confidence','school.teacher.sera-vey','school.teacher.body-confidence.classroom'],
    ['repertoire_records_history_adjacent','school.course.literacy_and_numbers','school.track.literacy_and_numbers','school.teacher.mara-fen','school.teacher.literacy-and-numbers.classroom']
  ]);

  assert.equal(preparation.selectedThreshold,null);
  assert.equal(preparation.selectedPublicFactId,null);
  assert.equal(reactive.selectedThreshold,null);
  assert.equal(reactive.selectedPublicFactId,null);
  assert.equal(inventory.activationBase.head,'8067539a606714fad8400ccbba30fd7ccf4a9158');
  assert.equal(inventory.runtimeAuthority.contractHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(inventory.runtimeAuthority.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791');
  assert.equal(inventory.runtimeAuthority.schoolAuthorityBlob,'87f9d6dd039bcf9579dd4e832071ab1db1de8440');
  assert.equal(inventory.runtimeAuthority.contractStatus,'C1D_180_FROZEN_GREEN');
  assert.equal(inventory.runtimeAuthority.workflow.runNumber,978);
  assert.equal(inventory.runtimeAuthority.workflow.result,'SUCCESS');

  const nightChoices=new Set(schoolNightStudyChoices().map(x=>x.id));
  for(const mapping of inventory.mappings){
    const course=SCHOOL_COURSES.find(x=>x.id===mapping.courseId);
    assert.ok(course,mapping.courseId);
    assert.equal(course.trackId,mapping.trackId,mapping.courseId);
    assert.ok(teachers.media.some((x:any)=>x.id===mapping.teacherMediaId),mapping.teacherMediaId);
    for(const id of mapping.nightChoiceIds)assert.ok(nightChoices.has(id),id);
    assert.equal(mapping.selectedPublicFactId,null,mapping.role);
    assert.equal(mapping.threshold,null,mapping.role);
    assert.ok([
      'LIVE_EVENT_SCHOOL_CONDITION_PRODUCER_BLOCKED',
      'LIVE_EVENT_NO_SCHOOL_CONDITION_PRODUCER_BLOCKED'
    ].includes(mapping.bindingStatus),mapping.role);
  }
});

test('D40 Artist School publishers create only the four approved readiness facts and persist them across reload',()=>{
  let s=started();
  while(s.run.resources.money<20_000)s=work(s,'lumber.shift');
  const hooks=[
    ['school.course.arts_and_performance','school.track.arts_and_performance','school-arts-ready'],
    ['school.course.literacy_and_numbers','school.track.literacy_and_numbers','school-literacy-ready'],
    ['school.course.rhetoric_and_social','school.track.rhetoric_and_social','school-rhetoric-ready'],
    ['school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school-etiquette-ready']
  ] as const;
  for(const [courseId,trackId,fact] of hooks){
    while((s.run.progression.school.tracks[trackId]?.counters.lessons_completed??0)<3){
      s=paidLesson(s,courseId);
      s=settlePending(s);
    }
    s=parseSave(JSON.stringify(s),catalog);
    assert.ok(artistFacts(s).includes(fact),fact+' persisted readiness');
  }
  const body=authority.hooks.find((x:any)=>x.trackId==='school.track.body_confidence');assert.ok(body);
  assert.equal(artistFacts(s).includes(body.artistFactId),false,'body-confidence stays outside D40 publisher scope');
});
