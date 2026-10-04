import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';
import type {SchoolCourseId} from '../src/core/school.ts';
import {actionAvailable,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const inventory=JSON.parse(readFileSync('content/school-merchant-v17-live-inventory.fixture.json','utf8'));
const authority=JSON.parse(readFileSync('content/school-merchant-v17-runtime-authority.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const preparation=JSON.parse(readFileSync('content/school-merchant-preparation-v1.fixture.json','utf8'));
const reactive=JSON.parse(readFileSync('content/school-guard-merchant-reactive-depth-v1.fixture.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');

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
  s=dispatch(s,{type:'schoolLesson',id:courseId},catalog);
  return s;
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

function merchantFacts(s:Save){
  return s.run.progression.careers.merchant?.facts??[];
}

test('C5-181 frozen inventory reuses exact four current School mappings and records final consumer-only authority',()=>{
  assert.deepEqual(inventory.mappings.map((x:any)=>[
    x.role,x.courseId,x.trackId,x.teacherContentId,x.teacherMediaId
  ]),[
    ['accounting_records_manifests','school.course.literacy_and_numbers','school.track.literacy_and_numbers','school.teacher.mara-fen','school.teacher.literacy-and-numbers.classroom'],
    ['negotiation','school.course.rhetoric_and_social','school.track.rhetoric_and_social','school.teacher.cassian-reed','school.teacher.rhetoric-and-social.classroom'],
    ['formal_terms_customers','school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school.teacher.eliane-marrow','school.teacher.etiquette-and-presentation.classroom'],
    ['cautious_arcane_appraisal','school.course.arcana','school.track.arcana','school.teacher.ilyra-venn','school.teacher.arcana.classroom']
  ]);

  assert.equal(inventory.frozenRuntime.head,'88422257f618c7182dd6d1f3eca7596c9972eb0a');
  assert.equal(inventory.frozenRuntime.contractBlob,'31e353c0284700ff29d658fff9c1032193c0e563');
  assert.equal(inventory.frozenRuntime.schoolAuthorityBlob,'0d19348e952717b04f12eff9a95c2d82c750983c');
  assert.equal(inventory.frozenRuntime.workflow.runNumber,898);
  assert.equal(inventory.frozenRuntime.workflow.result,'SUCCESS');

  const nightChoices=new Set(schoolNightStudyChoices().map(x=>x.id));
  for(const mapping of inventory.mappings){
    const course=SCHOOL_COURSES.find(x=>x.id===mapping.courseId);
    assert.ok(course,mapping.courseId);
    assert.equal(course.trackId,mapping.trackId,mapping.courseId);
    assert.ok(teachers.media.some((x:any)=>x.id===mapping.teacherMediaId),mapping.teacherMediaId);
    for(const id of mapping.nightChoiceIds)assert.ok(nightChoices.has(id),id);
  }
});

test('C5-181/C5-186 frozen authority preserves null School producer threshold and public fact',()=>{
  assert.equal(preparation.selectedThreshold,null);
  assert.equal(preparation.selectedPublicFactId,null);
  const reactiveMerchant=reactive.careers.find((x:any)=>x.careerId==='merchant');
  assert.ok(reactiveMerchant);
  assert.equal(reactiveMerchant.selectedThreshold,null);
  assert.equal(reactiveMerchant.selectedPublicFactId,null);

  assert.equal(inventory.productionAudit.currentMerchantSchoolPack,null);
  assert.equal(inventory.localHookPolicy.threshold,null);
  assert.equal(inventory.localHookPolicy.publicFactId,null);
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
  assert.deepEqual(inventory.mappings.map((x:any)=>x.currentConsumer),[
    'merchant.routes.house-ready','merchant.relationship.trust',null,'merchant.trade.appraisal'
  ]);
  for(const mapping of inventory.mappings){
    assert.equal(mapping.selectedPublicFactId,null,mapping.role);
    assert.equal(mapping.threshold,null,mapping.role);
  }
  assert.equal(schoolSource.includes('merchant.school.'),false);
});

test('D40 Merchant School publisher creates literacy readiness at three sessions and persists it before and after career entry',()=>{
  let s=started();
  while(s.run.resources.money<20_000)s=work(s,'lumber.shift');
  for(let i=0;i<3;i++){s=paidLesson(s,'school.course.literacy_and_numbers');s=settlePending(s);}
  assert.ok(merchantFacts(s).includes('school-literacy-ready'),'D40 readiness is published on the exact third session through normal resolver cascade before first Merchant shift');
  assert.ok(s.run.progression.careers.guard?.facts.includes('school-literacy-ready'),'simultaneous Guard literacy readiness drains in the same resolver cascade');
  assert.ok(s.run.progression.careers['artist-geisha']?.facts.includes('school-literacy-ready'),'simultaneous Artist literacy readiness drains in the same resolver cascade');
  s=parseSave(JSON.stringify(s),catalog);
  assert.ok(merchantFacts(s).includes('school-literacy-ready'),'readiness survives reload');
  for(let i=0;i<5;i++){s=paidLesson(s,'school.course.rhetoric_and_social');s=settlePending(s);}
  const merchantAction=catalog.definitions.actions.find(a=>a.id==='merchant.shift');assert.ok(merchantAction);
  while(!actionAvailable(merchantAction,s,catalog)){s=paidLesson(s,'school.course.literacy_and_numbers');s=settlePending(s);}
  s=work(s,'merchant.shift');
  assert.ok(s.run.progression.careers.merchant);
  assert.ok(merchantFacts(s).includes('school-literacy-ready'));
  for(const fact of ['school-rhetoric-ready','school-etiquette-ready','school-arcana-ready']){
    assert.equal(merchantFacts(s).includes(fact),false,fact+' remains outside D40 Merchant publisher scope');
  }
});
