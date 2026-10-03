import test from 'node:test';
import assert from 'node:assert/strict';

import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';
import {
  SCHOOL_BODY_CONFIDENCE_LUST_GAIN,
  executeSchoolLesson,
  schoolLessonEffects,
  schoolNightStudyChoice
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const runtime={applyEffects,resolveReactions};

function catalog():Catalog{
  return loadCatalog({
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[],
    nightChoices:[],
    activities:[]
  },[]);
}

function ready():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.character.creation.hardWorkPackagesApplied=true;
  s.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  s.run.flags['story.arrived']=true;
  s.run.resources.money=2_000;
  s.run.dayState.energyCurrent=3;
  return s;
}

test('D20 Body Confidence adds Lust +2 inside the same paid School transaction',()=>{
  const effects=schoolLessonEffects('school.course.body_confidence');
  assert.ok(effects.some(effect=>effect.kind==='metric'&&effect.key==='lust'&&effect.delta===SCHOOL_BODY_CONFIDENCE_LUST_GAIN));

  const input=ready();
  input.run.character.lust=20;
  input.run.character.stats.sexuality=10;
  const before=JSON.stringify(input);
  const out=executeSchoolLesson(input,'school.course.body_confidence',catalog(),runtime).state;

  assert.equal(JSON.stringify(input),before,'School transaction must not mutate the caller');
  assert.equal(out.run.character.lust,22);
  assert.equal(out.run.character.stats.sexuality,13);
  assert.equal(out.run.character.stats.grooming,4);
  assert.equal(out.run.character.stats.endurance,3);
  assert.equal(out.run.resources.money,1_600);
  assert.equal(out.run.dayState.energyCurrent,2);
  assert.equal(out.run.progression.school.tracks['school.track.body_confidence']?.counters.lessons_completed,1);
  assert.equal(out.run.flow.lastAction?.deltas.lust,2);
});

test('D20 Lust gain persists across repeated save reload without duplication',()=>{
  const input=ready();
  input.run.character.lust=31;
  const paid=executeSchoolLesson(input,'school.course.body_confidence',catalog(),runtime).state;
  assert.equal(paid.run.character.lust,33);

  const reload1=parseSave(JSON.stringify(paid),catalog());
  const reload2=parseSave(JSON.stringify(reload1),catalog());
  assert.equal(reload1.run.character.lust,33);
  assert.equal(reload2.run.character.lust,33);
  assert.equal(reload2.run.resources.money,1_600);
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.progression.school.tracks['school.track.body_confidence']?.counters.lessons_completed,1);
});

test('D20 respects the existing Lust cap without changing the progression-stat package',()=>{
  const input=ready();
  input.run.character.lust=99;
  input.run.character.stats.sexuality=97;
  const out=executeSchoolLesson(input,'school.course.body_confidence',catalog(),runtime).state;
  assert.equal(out.run.character.lust,100);
  assert.equal(out.run.character.stats.sexuality,100);
  assert.equal(out.run.character.stats.grooming,4);
  assert.equal(out.run.character.stats.endurance,3);
});

test('D20 does not add Lust to other paid courses or any Body Confidence Night study choice',()=>{
  const arcana=schoolLessonEffects('school.course.arcana');
  assert.equal(arcana.some(effect=>effect.kind==='metric'&&effect.key==='lust'),false);

  for(const stat of ['sexuality','grooming','endurance'] as const){
    const night=schoolNightStudyChoice('school.course.body_confidence',stat);
    assert.equal(night.effects.some(effect=>effect.kind==='metric'&&effect.key==='lust'),false,stat);
  }
});
