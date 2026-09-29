import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const audit=read('content/school-late-career-mapping-audit-v1.fixture.json');
const preparations=[
  read('content/school-tavern-preparation-v1.fixture.json'),
  read('content/school-hunter-preparation-v1.fixture.json'),
  read('content/school-guard-preparation-v1.fixture.json'),
  read('content/school-merchant-preparation-v1.fixture.json'),
  read('content/school-artist-geisha-preparation-v1.fixture.json'),
  read('content/school-assassin-preparation-v1.fixture.json'),
  read('content/school-prostitute-preparation-v1.fixture.json')
];
const teachers=read('content/school-late-career-teacher-reactions-v1.fixture.json');
const night=read('content/school-night-study-late-career-depth-v1.fixture.json');
const definitions=read('content/definitions.json');
const localization=read('content/localization.json');

const expectedCareers=[
  ['tavern','tavern.shift'],
  ['hunter','hunter.shift'],
  ['guard','guard.shift'],
  ['merchant','merchant.shift'],
  ['artist-geisha','artist-geisha.shift'],
  ['assassin','assassin.shift'],
  ['prostitute','prostitute.shift']
];

function referencedKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)referencedKeys(item,out);
    return out;
  }
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'&&!Array.isArray(item)){
      for(const ref of Object.values(item))if(typeof ref==='string')out.push(ref);
    } else if(key!=='strings'){
      referencedKeys(item,out);
    }
  }
  return out;
}

test('C5-35 late-career audit maps exactly the seven shipped non-starter careers',()=>{
  const careerIds=new Set(definitions.careers.map((x:any)=>x.id));
  const actionIds=new Set(definitions.actions.map((x:any)=>x.id));

  assert.deepEqual(
    audit.careers.map((x:any)=>[x.careerId,x.actionId]),
    expectedCareers
  );

  for(const entry of audit.careers){
    assert.ok(careerIds.has(entry.careerId),entry.careerId);
    assert.ok(actionIds.has(entry.actionId),entry.actionId);
    for(const courseId of entry.courses){
      assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(courseId),courseId);
    }
  }

  assert.deepEqual(audit.constraints,{
    createsProducerFacts:false,
    createsThresholds:false,
    createsCareerState:false,
    createsCurriculum:false,
    changesRuntime:false
  });
});

test('C5-35 seven career preparation fixtures have full RU EN parity and no localization collisions',()=>{
  const seen=new Set<string>();

  assert.deepEqual(
    preparations.map((x:any)=>[x.targetCareerId,x.targetActionId]),
    expectedCareers
  );

  for(const fixture of preparations){
    assert.equal(fixture.formatVersion,1,fixture.id);
    assert.equal(fixture.status,'CONTENT_PREP_ONLY',fixture.id);
    assert.equal(fixture.selectedThreshold,null,fixture.id);
    assert.equal(fixture.selectedPublicFactId,null,fixture.id);

    for(const mapping of fixture.mappings){
      assert.ok(
        (SCHOOL_COURSE_IDS as readonly string[]).includes(mapping.courseId),
        mapping.courseId
      );
    }

    const refs=[...new Set(referencedKeys(fixture))].sort();
    const keys=Object.keys(fixture.strings).sort();
    assert.deepEqual(refs,keys,fixture.id);

    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.match(key,/^school\.prep\.[a-z0-9_.]+$/,key);
      assert.ok(pair.ru.trim().length>0,`${key}: RU`);
      assert.ok(pair.en.trim().length>0,`${key}: EN`);
      assert.equal(seen.has(key),false,`duplicate key ${key}`);
      assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
      seen.add(key);
    }

    assert.deepEqual(fixture.mechanics.effects,[],fixture.id);
    assert.deepEqual(fixture.mechanics.careerWrites,[],fixture.id);
    assert.deepEqual(fixture.mechanics.publishesWorldFacts,[],fixture.id);
  }

  assert.ok(seen.size>0);
});

test('C5-35 teacher transfer variants preserve all eight existing teacher/course identities',()=>{
  const expected=[
    ['school.teacher.mara-fen','school.course.literacy_and_numbers'],
    ['school.teacher.ilyra-venn','school.course.arcana'],
    ['school.teacher.cassian-reed','school.course.rhetoric_and_social'],
    ['school.teacher.eliane-marrow','school.course.etiquette_and_presentation'],
    ['school.teacher.rowan-pike','school.course.field_craft'],
    ['school.teacher.tovan-kest','school.course.physical_training'],
    ['school.teacher.nessa-lark','school.course.arts_and_performance'],
    ['school.teacher.sera-vey','school.course.body_confidence']
  ];

  assert.deepEqual(
    teachers.variants.map((x:any)=>[x.teacherContentId,x.sourceCourseId]),
    expected
  );

  const refs=[...new Set(referencedKeys(teachers))].sort();
  assert.deepEqual(refs,Object.keys(teachers.strings).sort());

  for(const [key,pair] of Object.entries(teachers.strings) as Array<[string,{ru:string;en:string}]>){
    assert.ok(pair.ru.trim().length>0,key);
    assert.ok(pair.en.trim().length>0,key);
    assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
  }

  assert.deepEqual(teachers.mechanics.effects,[]);
  assert.deepEqual(teachers.mechanics.relationshipWrites,[]);
  assert.deepEqual(teachers.mechanics.careerWrites,[]);
  assert.deepEqual(teachers.mechanics.publishesWorldFacts,[]);
});

test('C5-35 late-career Night-study depth uses only exact current choices and preserves mechanics',()=>{
  const nightIds=new Set(definitions.nightChoices.map((x:any)=>x.id));
  assert.equal(night.entries.length,8);

  for(const entry of night.entries){
    assert.ok(nightIds.has(entry.choiceId),entry.choiceId);
  }

  const refs=[...new Set(referencedKeys(night))].sort();
  assert.deepEqual(refs,Object.keys(night.strings).sort());

  for(const [key,pair] of Object.entries(night.strings) as Array<[string,{ru:string;en:string}]>){
    assert.ok(pair.ru.trim().length>0,key);
    assert.ok(pair.en.trim().length>0,key);
    assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
  }

  assert.deepEqual(night.invariants,{
    changesNightFlow:false,
    tuitionDelta:0,
    currentDayEnergyDelta:0,
    nextDayEnergyDelta:-1,
    statGain:2,
    additionalProgressEffects:[]
  });
  assert.deepEqual(night.mechanics.effects,[]);
  assert.deepEqual(night.mechanics.careerWrites,[]);
  assert.deepEqual(night.mechanics.nightFlowChanges,[]);
  assert.deepEqual(night.mechanics.publishesWorldFacts,[]);
});

test('C5-35 voluntary Prostitute School preparation remains non-explicit and mechanics-neutral',()=>{
  const fixture=preparations.find((x:any)=>x.targetCareerId==='prostitute');
  assert.ok(fixture);
  assert.equal(fixture.contentSafety,'NON_EXPLICIT');
  assert.deepEqual(fixture.mechanics.lustEffects,[]);
  assert.deepEqual(fixture.mechanics.consentRuleChanges,[]);
  assert.deepEqual(fixture.mechanics.nightFlowChanges,[]);
});
