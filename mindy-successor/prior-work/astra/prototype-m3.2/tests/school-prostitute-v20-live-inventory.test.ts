import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';
import type {SchoolCourseId} from '../src/core/school.ts';
import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const inventory=JSON.parse(readFileSync('content/school-prostitute-v20-live-inventory.fixture.json','utf8'));
const authority=JSON.parse(readFileSync('content/school-prostitute-v20-authority.fixture.json','utf8'));

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

test('C5-217 exact five voluntary-Prostitute capability mappings reuse current School identities and typed Night-study choices',()=>{
  assert.deepEqual(inventory.mappings.map((x:any)=>[
    x.role,x.courseId,x.trackId,x.teacherContentId,x.teacherMediaId
  ]),[
    ['negotiation_terms_boundaries','school.course.rhetoric_and_social','school.track.rhetoric_and_social','school.teacher.cassian-reed','school.teacher.rhetoric-and-social.classroom'],
    ['records_contracts_business_notes','school.course.literacy_and_numbers','school.track.literacy_and_numbers','school.teacher.mara-fen','school.teacher.literacy-and-numbers.classroom'],
    ['professional_presentation_context_fit','school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school.teacher.eliane-marrow','school.teacher.etiquette-and-presentation.classroom'],
    ['improvisation_performance_confidence','school.course.arts_and_performance','school.track.arts_and_performance','school.teacher.nessa-lark','school.teacher.arts-and-performance.classroom'],
    ['body_confidence_boundary_awareness','school.course.body_confidence','school.track.body_confidence','school.teacher.sera-vey','school.teacher.body-confidence.classroom']
  ]);
  const night=new Set(schoolNightStudyChoices().map(x=>x.id));
  for(const mapping of inventory.mappings){
    const course=SCHOOL_COURSES.find(x=>x.id===mapping.courseId);
    assert.ok(course,mapping.courseId);
    assert.equal(course.trackId,mapping.trackId);
    for(const id of mapping.nightChoiceIds)assert.ok(night.has(id),id);
    assert.equal(mapping.futureConsumer,'PENDING_RUNTIME_ID');
    assert.equal(mapping.threshold,null);
    assert.equal(mapping.publicFactId,null);
  }
});

test('C5-227 save reload exactly-once design advances only existing School counters and does not create voluntary Prostitute career state',()=>{
  let s=started();
  while(s.run.resources.money<20_000)s=work(s,'lumber.shift');

  assert.equal(s.run.progression.careers.prostitute,undefined);

  for(const mapping of inventory.mappings){
    const before=s.run.progression.school.tracks[mapping.trackId]?.counters.lessons_completed??0;
    s=paidLesson(s,mapping.courseId as SchoolCourseId);
    s=settlePending(s);
    s=parseSave(JSON.stringify(s),catalog);
    const after=s.run.progression.school.tracks[mapping.trackId]?.counters.lessons_completed??0;
    assert.equal(after,before+1,mapping.trackId+' paid lesson exactly once');
    assert.equal(s.run.progression.careers.prostitute,undefined,mapping.trackId+' must not create Prostitute career');
  }

  for(const mapping of inventory.mappings){
    const before=s.run.progression.school.tracks[mapping.trackId]?.counters.night_study_sessions??0;
    s=studyNight(s,mapping.nightChoiceIds[0]);
    s=parseSave(JSON.stringify(s),catalog);
    const after=s.run.progression.school.tracks[mapping.trackId]?.counters.night_study_sessions??0;
    assert.equal(after,before+1,mapping.trackId+' Night-study exactly once');
    assert.equal(s.run.progression.careers.prostitute,undefined,mapping.trackId+' Night-study must not create Prostitute career');
  }

  for(const mapping of authority.mappings){
    assert.equal(mapping.futureConsumerStatus,'PENDING_RUNTIME_ID',mapping.trackId);
    assert.equal(mapping.threshold,null,mapping.trackId);
    assert.equal(mapping.publicFactId,null,mapping.trackId);
  }
});
