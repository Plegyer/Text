import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-old-save-defaults.fixture.json','utf8')
);
const compat=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);

function normalizeProgression(progression:any,schoolValue:any){
  const out=structuredClone(progression);
  const defaults=structuredClone(compat.defaultSchoolProgression);

  if(schoolValue===null||schoolValue===undefined){
    out.school=defaults;
    return out;
  }

  out.school=structuredClone(schoolValue);
  if(!out.school.tracks)out.school.tracks={};

  for(const [trackId,track] of Object.entries(defaults.tracks)){
    if(!out.school.tracks[trackId]){
      out.school.tracks[trackId]=structuredClone(track);
    }
  }
  return out;
}

test('schema4 save with no progression.school defaults all eight empty School tracks',()=>{
  const normalized=normalizeProgression(
    fixture.unrelatedProgression,
    null
  );

  assert.equal(Object.keys(normalized.school.tracks).length,8);
  for(const course of SCHOOL_COURSES){
    const track=normalized.school.tracks[course.trackId];
    assert.ok(track,course.trackId);
    assert.deepEqual(track.counters,{
      lessons_completed:0,
      night_study_sessions:0,
      projects_completed:0,
      exam_attempts:0
    });
    assert.deepEqual(track.facts,[]);
    assert.deepEqual(track.milestones,[]);
    assert.deepEqual(track.certificates,[]);
    assert.deepEqual(track.choices,{});
  }
});

test('empty School tracks are filled safely without inventing progress',()=>{
  const normalized=normalizeProgression(
    fixture.unrelatedProgression,
    {tracks:{}}
  );

  assert.equal(Object.keys(normalized.school.tracks).length,8);
  for(const track of Object.values(normalized.school.tracks) as any[]){
    assert.equal(track.counters.lessons_completed,0);
    assert.equal(track.counters.night_study_sessions,0);
    assert.deepEqual(track.facts,[]);
    assert.deepEqual(track.milestones,[]);
    assert.deepEqual(track.certificates,[]);
  }
});

test('unrelated career quest relationship and worldFacts remain exactly preserved',()=>{
  for(const item of fixture.cases){
    const before=structuredClone(fixture.unrelatedProgression);
    const normalized=normalizeProgression(
      fixture.unrelatedProgression,
      item.school
    );

    for(const domain of fixture.expected.preserveDomains){
      assert.deepEqual(
        normalized[domain],
        before[domain],
        item.id+' / '+domain
      );
    }
  }
});

test('pending non-School scene, pending School presentation, and active NightFlow snapshots remain unchanged by School defaulting',()=>{
  for(const id of [
    'pending-non-school-scene',
    'pending-school-presentation',
    'nightflow-active'
  ]){
    const item=fixture.cases.find((entry:any)=>entry.id===id);
    assert.ok(item,id);
    const flow=structuredClone(fixture.flowSnapshots[item.flow]);
    const before=structuredClone(flow);

    normalizeProgression(
      fixture.unrelatedProgression,
      item.school
    );

    assert.deepEqual(flow,before,id);
  }

  assert.equal(
    fixture.flowSnapshots['pending-school-presentation']
      .pendingScene.presentationId,
    'school/arcana/lesson/default'
  );
});

test('defaulting creates no phantom School lessons certificates milestones or public facts',()=>{
  for(const item of fixture.cases){
    const normalized=normalizeProgression(
      fixture.unrelatedProgression,
      item.school
    );

    for(const track of Object.values(normalized.school.tracks) as any[]){
      assert.equal(track.counters.lessons_completed,0,item.id);
      assert.equal(track.counters.night_study_sessions,0,item.id);
      assert.deepEqual(track.certificates,[],item.id);
      assert.deepEqual(track.milestones,[],item.id);
      assert.deepEqual(track.facts,[],item.id);
    }

    assert.deepEqual(
      normalized.worldFacts,
      fixture.unrelatedProgression.worldFacts,
      item.id
    );
  }

  assert.deepEqual(fixture.expected,{
    preserveDomains:['careers','quests','relationships','worldFacts'],
    phantomLessons:false,
    phantomCertificates:false,
    phantomMilestones:false,
    phantomSchoolPublicFacts:false
  });
});
