import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-schema4-compat.fixture.json','utf8')
);

function defaultSchoolIfMissing(progression:any,defaultSchool:any){
  const out=structuredClone(progression);
  if(!Object.prototype.hasOwnProperty.call(out,'school')){
    out.school=structuredClone(defaultSchool);
  }
  return out;
}

test('old schema-4-shaped progression defaults missing School state without altering other domains',()=>{
  const old=fixture.oldSchema4;
  const defaultSchool=fixture.newSchema4.progression.school;
  const before=structuredClone(old.progression);

  assert.equal(old.schemaVersion,4);
  assert.equal(old.schoolPresent,false);
  assert.equal('school' in old.progression,false);

  const upgraded=defaultSchoolIfMissing(old.progression,defaultSchool);

  assert.deepEqual(upgraded.careers,before.careers);
  assert.deepEqual(upgraded.quests,before.quests);
  assert.deepEqual(upgraded.relationships,before.relationships);
  assert.deepEqual(upgraded.worldFacts,before.worldFacts);
  assert.deepEqual(upgraded.school,defaultSchool);
  assert.equal('school' in old.progression,false);
});

test('new schema-4-shaped fixture preserves existing School track state instead of re-defaulting it',()=>{
  const current=structuredClone(fixture.newSchema4.progression);
  current.school.tracks['school.track.arcana'].counters.lessons_completed=3;
  current.school.tracks['school.track.arcana'].counters.night_study_sessions=2;
  current.school.tracks['school.track.arcana'].facts.push('school.fact.fixture');

  const after=defaultSchoolIfMissing(
    current,
    fixture.newSchema4.progression.school
  );

  assert.deepEqual(after,current);
  assert.equal(
    after.school.tracks['school.track.arcana'].counters.lessons_completed,
    3
  );
  assert.equal(
    after.school.tracks['school.track.arcana'].counters.night_study_sessions,
    2
  );
  assert.deepEqual(
    after.school.tracks['school.track.arcana'].facts,
    ['school.fact.fixture']
  );
});

test('new fixture School progression contains stable state for all eight tracks',()=>{
  const tracks=fixture.newSchema4.progression.school.tracks;
  assert.equal(Object.keys(tracks).length,8);

  for(const course of SCHOOL_COURSES){
    const track=tracks[course.trackId];
    assert.ok(track,course.trackId);
    assert.equal(track.trackId,course.trackId);
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

test('old and new compatibility fixtures preserve identical non-School progression domains',()=>{
  for(const domain of fixture.compatibilityRule.preserveOtherDomains){
    assert.deepEqual(
      fixture.oldSchema4.progression[domain],
      fixture.newSchema4.progression[domain],
      domain
    );
  }
  assert.deepEqual(fixture.compatibilityRule,{
    missingSchool:'default-empty-school-progression',
    existingSchool:'preserve',
    preserveOtherDomains:[
      'careers','quests','relationships','worldFacts'
    ]
  });
});
