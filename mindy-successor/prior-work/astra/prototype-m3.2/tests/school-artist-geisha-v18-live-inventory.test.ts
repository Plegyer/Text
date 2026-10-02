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

test('C5-203/C5-204 final natural acceptance: paid lessons and Night-study persist without manufacturing frozen Artist School facts or reactions',()=>{
  let s=started();
  const artistAction=catalog.definitions.actions.find(a=>a.id==='artist-geisha.shift');
  assert.ok(artistAction);
  assert.equal(actionAvailable(artistAction,s,catalog),false);

  while(s.run.resources.money<20_000)s=work(s,'lumber.shift');

  // Reach the shipped stat-based Artist unlock using only existing paid School mechanics.
  let guard=0;
  while(!actionAvailable(artistAction,s,catalog)){
    if(++guard>40)throw new Error('Artist School unlock prep did not converge');
    const creativity=s.run.character.stats.creativity;
    const manners=s.run.character.stats.manners;
    const grooming=s.run.character.stats.grooming;
    const course:SchoolCourseId=creativity<35
      ?'school.course.arts_and_performance'
      :(manners<25||grooming<30)
        ?'school.course.etiquette_and_presentation'
        :'school.course.arts_and_performance';
    s=paidLesson(s,course);
    const consumers=authority.hooks.map((x:any)=>x.consumerEventId);
    assert.equal(consumers.includes(s.run.pending?.eventId),false,'unlock prep must not trigger Artist consumer');
    s=settlePending(s);
  }
  assert.equal(actionAvailable(artistAction,s,catalog),true);

  for(const hook of authority.hooks){
    assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' before Artist work');
  }

  s=work(s,'artist-geisha.shift');
  assert.ok(s.run.progression.careers['artist-geisha']);
  const artistShifts=s.run.progression.careers['artist-geisha'].counters.completed_shifts;
  const consumerIds=authority.hooks.map((x:any)=>x.consumerEventId);

  for(const hook of authority.hooks){
    const before=s.run.progression.school.tracks[hook.trackId]?.counters.lessons_completed??0;
    for(let i=0;i<3;i++){
      s=paidLesson(s,hook.courseId as SchoolCourseId);
      assert.equal(consumerIds.includes(s.run.pending?.eventId),false,hook.trackId+' paid lesson consumer');
      assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' paid lesson fact');
      s=settlePending(s);
      s=parseSave(JSON.stringify(s),catalog);
      assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' reload fact');
    }
    const after=s.run.progression.school.tracks[hook.trackId]?.counters.lessons_completed??0;
    assert.equal(after,before+3,hook.trackId+' paid lesson exactly-once persistence');
  }

  for(const hook of authority.hooks){
    const mapping=inventory.mappings.find((x:any)=>x.trackId===hook.trackId);
    assert.ok(mapping,hook.trackId);
    const before=s.run.progression.school.tracks[hook.trackId]?.counters.night_study_sessions??0;
    const choiceId=mapping.nightChoiceIds[0];
    for(let i=0;i<3;i++){
      s=studyNight(s,choiceId);
      assert.equal(consumerIds.includes(s.run.pending?.eventId),false,hook.trackId+' Night-study consumer');
      assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' Night-study fact');
      s=parseSave(JSON.stringify(s),catalog);
      assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' Night-study reload fact');
    }
    const after=s.run.progression.school.tracks[hook.trackId]?.counters.night_study_sessions??0;
    assert.equal(after,before+3,hook.trackId+' Night-study exactly-once persistence');
  }

  assert.equal(s.run.progression.careers['artist-geisha'].counters.completed_shifts,artistShifts,
    'School prep must not require or manufacture a dummy artist-geisha.shift');
  for(const hook of authority.hooks){
    assert.equal(artistFacts(s).includes(hook.artistFactId),false,hook.trackId+' final fact');
    assert.equal(hook.producerThreshold,null,hook.trackId);
    assert.equal(hook.selectedPublicFactId,null,hook.trackId);
  }
});
