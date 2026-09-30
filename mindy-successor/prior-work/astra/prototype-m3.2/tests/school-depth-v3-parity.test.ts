import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const rhetoric=read('content/school-rhetoric-and-social-depth-v1.fixture.json');
const etiquette=read('content/school-etiquette-and-presentation-depth-v1.fixture.json');
const fieldCraft=read('content/school-field-craft-depth-v1.fixture.json');
const physical=read('content/school-physical-training-depth-v1.fixture.json');
const arts=read('content/school-arts-and-performance-depth-v1.fixture.json');
const body=read('content/school-body-confidence-depth-v1.fixture.json');
const satyr=read('content/school-satyr-maid-mapping-v1.fixture.json');
const farm=read('content/school-undead-farm-mapping-v1.fixture.json');
const definitions=read('content/definitions.json');

const depthFixtures=[rhetoric,etiquette,fieldCraft,physical,arts,body];

function referencedKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)referencedKeys(item,out);
    return out;
  }
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'&&!Array.isArray(item)){
      for(const ref of Object.values(item))if(typeof ref==='string')out.push(ref);
    }else referencedKeys(item,out);
  }
  return out;
}

test('C5-24 six School depth fixtures have complete RU EN parity and stable unique keys',()=>{
  const seen=new Set<string>();

  for(const fixture of depthFixtures){
    assert.equal(fixture.formatVersion,1,fixture.id);
    assert.equal(fixture.status,'CONTENT_PREP_ONLY',fixture.id);
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(fixture.sourceCourseId),fixture.sourceCourseId);
    assert.equal(fixture.selectedMilestoneId,null,fixture.id);
    assert.equal(fixture.selectedThreshold,null,fixture.id);

    const refs=[...new Set(referencedKeys(fixture))].sort();
    const keys=Object.keys(fixture.strings).sort();
    assert.deepEqual(refs,keys,fixture.id);

    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.match(key,/^school\.depth\.[a-z0-9_.]+$/,key);
      assert.ok(pair.ru.trim().length>0,`${key}: RU`);
      assert.ok(pair.en.trim().length>0,`${key}: EN`);
      assert.equal(seen.has(key),false,`duplicate key ${key}`);
      seen.add(key);
    }
  }

  assert.equal(seen.size,48);
});

test('C5-24 depth fixtures stay on the six assigned existing course and teacher identities',()=>{
  assert.deepEqual(
    depthFixtures.map(f=>[f.sourceCourseId,f.sourceTrackId,f.teacherContentId]),
    [
      ['school.course.rhetoric_and_social','school.track.rhetoric_and_social','school.teacher.cassian-reed'],
      ['school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school.teacher.eliane-marrow'],
      ['school.course.field_craft','school.track.field_craft','school.teacher.rowan-pike'],
      ['school.course.physical_training','school.track.physical_training','school.teacher.tovan-kest'],
      ['school.course.arts_and_performance','school.track.arts_and_performance','school.teacher.nessa-lark'],
      ['school.course.body_confidence','school.track.body_confidence','school.teacher.sera-vey']
    ]
  );

  for(const f of depthFixtures){
    assert.deepEqual(f.mechanics.effects,[],f.id);
    assert.deepEqual(f.mechanics.publishesWorldFacts,[],f.id);
  }
  assert.deepEqual(body.mechanics.lustEffects,[]);
  assert.deepEqual(body.mechanics.lustRoutingChanges,[]);
  assert.deepEqual(fieldCraft.mechanics.activityWrites,[]);
  assert.deepEqual(fieldCraft.mechanics.routeUnlocks,[]);
});

test('C5-24 Satyr Maid and Undead Farm mappings target shipped careers/actions without thresholds or facts',()=>{
  const careerIds=new Set(definitions.careers.map((x:any)=>x.id));
  const actionIds=new Set(definitions.actions.map((x:any)=>x.id));

  assert.equal(satyr.targetCareerId,'satyr-maid');
  assert.equal(satyr.targetActionId,'satyr-maid.shift');
  assert.equal(farm.targetCareerId,'undead-farm');
  assert.equal(farm.targetActionId,'undead-farm.shift');

  assert.ok(careerIds.has(satyr.targetCareerId));
  assert.ok(careerIds.has(farm.targetCareerId));
  assert.ok(actionIds.has(satyr.targetActionId));
  assert.ok(actionIds.has(farm.targetActionId));

  for(const mapping of [...satyr.mappings,...farm.mappings]){
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(mapping.sourceCourseId));
    assert.equal(mapping.selectedThreshold,null);
    assert.equal(mapping.selectedPublicFactId,null);
  }

  assert.equal(satyr.constraints.createsCareerState,false);
  assert.equal(satyr.constraints.createsThreshold,false);
  assert.equal(satyr.constraints.createsPublicFact,false);
  assert.equal(satyr.constraints.changesShiftMechanics,false);
  assert.equal(satyr.constraints.equatesSexualityWithLust,false);

  assert.equal(farm.constraints.createsCareerState,false);
  assert.equal(farm.constraints.createsThreshold,false);
  assert.equal(farm.constraints.createsPublicFact,false);
  assert.equal(farm.constraints.changesShiftMechanics,false);
  assert.equal(farm.constraints.createsResearchResult,false);
  assert.equal(farm.constraints.createsActivityRoute,false);
});
