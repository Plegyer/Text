import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {freshSave} from '../src/core/engine.ts';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS
} from '../src/core/school.ts';

type SchoolTrackState={
  trackId:string;
  counters:{
    lessons_completed:number;
    night_study_sessions:number;
    projects_completed:number;
    exam_attempts:number;
  };
  facts:string[];
  milestones:string[];
  certificates:string[];
  choices:Record<string,string>;
};

type Fixture={
  formatVersion:number;
  id:string;
  courseTrackMap:Array<{courseId:string;trackId:string}>;
  defaultSchoolProgression:{
    tracks:Record<string,SchoolTrackState>;
  };
  compatibility:{
    missingSchoolProgression:string;
    preserveOtherProgressionDomains:string[];
    authoringOpen:string[];
  };
};

const fixture=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
) as Fixture;

function defaultMissingSchoolProgression<T extends {
  schemaVersion:number;
  run:{progression:Record<string,unknown>};
}>(input:T):T{
  const out=structuredClone(input);
  if(!Object.prototype.hasOwnProperty.call(out.run.progression,'school')){
    out.run.progression.school=structuredClone(fixture.defaultSchoolProgression);
  }
  return out;
}

test('older schema-4-shaped save can default missing School progression without altering other progression domains',()=>{
  const older=JSON.parse(JSON.stringify(freshSave())) as {
    schemaVersion:number;
    run:{progression:Record<string,unknown>};
  };

  older.run.progression.careers={
    'fixture.career':{
      stage:'active',
      shifts:2,
      counters:{worked:2},
      choices:{},
      facts:['fixture.fact']
    }
  };
  older.run.progression.quests={
    'fixture.quest':{
      stage:'open',
      counters:{steps:1},
      choices:{},
      facts:[]
    }
  };
  older.run.progression.relationships={
    'fixture.relationship':{
      stage:'known',
      counters:{meetings:1},
      choices:{},
      facts:[]
    }
  };
  older.run.progression.worldFacts=['fixture.public_fact'];

  const before={
    careers:structuredClone(older.run.progression.careers),
    quests:structuredClone(older.run.progression.quests),
    relationships:structuredClone(older.run.progression.relationships),
    worldFacts:structuredClone(older.run.progression.worldFacts)
  };

  assert.equal(older.schemaVersion,4);
  assert.equal('school' in older.run.progression,false);

  const upgraded=defaultMissingSchoolProgression(older);

  assert.deepEqual(upgraded.run.progression.school,fixture.defaultSchoolProgression);
  assert.deepEqual(upgraded.run.progression.careers,before.careers);
  assert.deepEqual(upgraded.run.progression.quests,before.quests);
  assert.deepEqual(upgraded.run.progression.relationships,before.relationships);
  assert.deepEqual(upgraded.run.progression.worldFacts,before.worldFacts);
  assert.equal('school' in older.run.progression,false);
});

test('all eight gameplay course IDs map to the current stable School track IDs',()=>{
  assert.equal(fixture.courseTrackMap.length,8);
  assert.deepEqual(
    fixture.courseTrackMap.map(entry=>entry.courseId),
    [...SCHOOL_COURSE_IDS]
  );
  assert.deepEqual(
    fixture.courseTrackMap,
    SCHOOL_COURSES.map(course=>({
      courseId:course.id,
      trackId:course.trackId
    }))
  );

  for(const entry of fixture.courseTrackMap){
    const track=fixture.defaultSchoolProgression.tracks[entry.trackId];
    assert.ok(track,entry.trackId);
    assert.equal(track.trackId,entry.trackId);
  }
});

test('paid lesson and Night-study counters remain separate School-owned values',()=>{
  const arcana=structuredClone(
    fixture.defaultSchoolProgression.tracks['school.track.arcana']
  );

  assert.deepEqual(arcana.counters,{
    lessons_completed:0,
    night_study_sessions:0,
    projects_completed:0,
    exam_attempts:0
  });

  const afterPaidLesson=structuredClone(arcana);
  afterPaidLesson.counters.lessons_completed+=1;

  assert.equal(afterPaidLesson.counters.lessons_completed,1);
  assert.equal(afterPaidLesson.counters.night_study_sessions,0);

  const afterNightStudy=structuredClone(arcana);
  afterNightStudy.counters.night_study_sessions+=1;

  assert.equal(afterNightStudy.counters.lessons_completed,0);
  assert.equal(afterNightStudy.counters.night_study_sessions,1);
});

test('compatibility fixture encodes no final milestone or certificate thresholds',()=>{
  assert.deepEqual(fixture.compatibility.authoringOpen,[
    'milestone thresholds',
    'certificate thresholds',
    'certificate names',
    'certificate effects'
  ]);

  for(const track of Object.values(fixture.defaultSchoolProgression.tracks)){
    assert.deepEqual(track.milestones,[]);
    assert.deepEqual(track.certificates,[]);
    assert.deepEqual(track.facts,[]);
    assert.deepEqual(track.choices,{});
  }

  const keys:string[]=[];
  const visit=(value:unknown)=>{
    if(Array.isArray(value)){for(const item of value)visit(item);return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value as Record<string,unknown>)){
        keys.push(key);
        visit(child);
      }
    }
  };
  visit(fixture.defaultSchoolProgression);
  assert.equal(keys.some(key=>/threshold/i.test(key)),false);
});
