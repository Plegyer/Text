import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES} from '../src/core/school.ts';

const map=JSON.parse(readFileSync('content/school-satyr-v12-track-map.fixture.json','utf8'));

test('C5-121 maps every exact live School course and track once',()=>{
  assert.equal(map.id,'school.satyr-maid.v12.track-map');
  assert.equal(map.careerId,'satyr-maid');
  assert.deepEqual(
    map.tracks.map((x:any)=>[x.courseId,x.trackId]),
    SCHOOL_COURSES.map(course=>[course.id,course.trackId])
  );
});

test('C5-121 keeps the Satyr local threshold narrow and explicit',()=>{
  assert.deepEqual(map.localMinorHookPolicy,{
    counter:'lessons_completed',
    threshold:3,
    scope:'satyr-maid-only',
    globalCertificateRule:false,
    globalProjectRule:false
  });
  assert.deepEqual(
    map.tracks.filter((x:any)=>x.minorHookRelevant).map((x:any)=>x.satyrRole).sort(),
    ['accounting_management','body_confidence_boundary','rhetoric_social']
  );
});

test('C5-121 does not relabel unrelated School tracks as Satyr gates',()=>{
  const byRole=new Map(map.tracks.map((x:any)=>[x.satyrRole,x]));
  assert.equal(map.tracks.filter((x:any)=>x.minorHookRelevant).length,3);
  assert.equal(map.tracks.find((x:any)=>x.courseId==='school.course.arcana').minorHookRelevant,false);
  assert.equal(map.tracks.find((x:any)=>x.courseId==='school.course.field_craft').minorHookRelevant,false);
  assert.equal(map.tracks.find((x:any)=>x.courseId==='school.course.physical_training').minorHookRelevant,false);
  assert.ok(byRole.has('festival_performance_support'));
  assert.ok(byRole.has('formal_service_support'));
});
