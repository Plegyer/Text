import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  executeSchoolLesson,
  SCHOOL_BODY_CONFIDENCE_LUST_GAIN,
  type SchoolCourseId
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/school-target-definitions.fixture.json','utf8'));
const pack=JSON.parse(readFileSync('content/packs/school-target/school-production.pack.json','utf8'));
const runtime={applyEffects,resolveReactions};

function catalog():Catalog{
  return loadCatalog(structuredClone(definitions),[structuredClone(pack)]);
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

const expected=[
  {
    id:'school.course.literacy_and_numbers',
    tuition:300,
    energyCost:1,
    statEffects:[{stat:'reason',amount:4},{stat:'wits',amount:2}],
    presentationId:'school/literacy-and-numbers/lesson/default'
  },
  {
    id:'school.course.arcana',
    tuition:500,
    energyCost:1,
    statEffects:[{stat:'magic',amount:4},{stat:'reason',amount:4},{stat:'creativity',amount:2}],
    presentationId:'school/arcana/lesson/default'
  },
  {
    id:'school.course.rhetoric_and_social',
    tuition:300,
    energyCost:1,
    statEffects:[{stat:'charm',amount:3},{stat:'sociability',amount:3},{stat:'wits',amount:2}],
    presentationId:'school/rhetoric-and-social/lesson/default'
  },
  {
    id:'school.course.etiquette_and_presentation',
    tuition:400,
    energyCost:1,
    statEffects:[{stat:'manners',amount:3},{stat:'grooming',amount:3},{stat:'charm',amount:2}],
    presentationId:'school/etiquette-and-presentation/lesson/default'
  },
  {
    id:'school.course.field_craft',
    tuition:400,
    energyCost:1,
    statEffects:[{stat:'dexterity',amount:3},{stat:'wits',amount:3},{stat:'creativity',amount:2}],
    presentationId:'school/field-craft/lesson/default'
  },
  {
    id:'school.course.physical_training',
    tuition:400,
    energyCost:1,
    statEffects:[{stat:'strength',amount:3},{stat:'endurance',amount:3},{stat:'dexterity',amount:2}],
    presentationId:'school/physical-training/lesson/default'
  },
  {
    id:'school.course.arts_and_performance',
    tuition:500,
    energyCost:1,
    statEffects:[{stat:'creativity',amount:3},{stat:'charm',amount:3},{stat:'sociability',amount:2},{stat:'dexterity',amount:2}],
    presentationId:'school/arts-and-performance/lesson/default'
  },
  {
    id:'school.course.body_confidence',
    tuition:400,
    energyCost:1,
    statEffects:[{stat:'sexuality',amount:3},{stat:'grooming',amount:3},{stat:'endurance',amount:2}],
    presentationId:'school/body-confidence/lesson/default'
  }
] as const;

test('engine adapter fixture exposes exactly the eight locked School packages and semantic presentation ids',()=>{
  assert.deepEqual([...SCHOOL_COURSE_IDS],expected.map(item=>item.id));
  assert.equal(SCHOOL_COURSES.length,8);
  assert.deepEqual(
    SCHOOL_COURSES.map(course=>({
      id:course.id,
      tuition:course.tuition,
      energyCost:course.energyCost,
      statEffects:course.statEffects,
      presentationId:course.presentationId
    })),
    expected
  );
  for(const course of SCHOOL_COURSES){
    assert.match(course.presentationId,/^school\/[a-z0-9-]+\/lesson\/default$/);
    assert.equal(/\.(gif|png|webp|svg)$/i.test(course.presentationId),false);
    assert.equal(course.statEffects.some(effect=>(effect.stat as string)==='lust'),false);
  }
});

test('engine adapter rejects insufficient money or Energy without mutating the input transaction',()=>{
  const cat=catalog();

  const poor=ready();
  poor.run.resources.money=499;
  const poorBefore=JSON.stringify(poor);
  assert.throws(
    ()=>executeSchoolLesson(poor,'school.course.arcana',cat,runtime),
    /money/
  );
  assert.equal(JSON.stringify(poor),poorBefore);

  const tired=ready();
  tired.run.dayState.energyCurrent=0;
  const tiredBefore=JSON.stringify(tired);
  assert.throws(
    ()=>executeSchoolLesson(tired,'school.course.arcana',cat,runtime),
    /Energy/
  );
  assert.equal(JSON.stringify(tired),tiredBefore);
});

test('each locked paid lesson preserves its tuition/Energy/stat package and only Body Confidence adds Lust',()=>{
  const cat=catalog();

  for(const locked of expected){
    const input=ready();
    const moneyBefore=input.run.resources.money;
    const energyBefore=input.run.dayState.energyCurrent;
    const lustBefore=input.run.character.lust;
    const statsBefore=structuredClone(input.run.character.stats);

    const result=executeSchoolLesson(input,locked.id as SchoolCourseId,cat,runtime);
    const out=result.state;

    assert.equal(input.run.resources.money,moneyBefore,locked.id);
    assert.equal(input.run.dayState.energyCurrent,energyBefore,locked.id);
    assert.equal(out.run.resources.money,moneyBefore-locked.tuition,locked.id);
    assert.equal(out.run.dayState.energyCurrent,energyBefore-1,locked.id);
    const expectedLustDelta=locked.id==='school.course.body_confidence'
      ?SCHOOL_BODY_CONFIDENCE_LUST_GAIN
      :0;
    assert.equal(out.run.character.lust,Math.min(100,lustBefore+expectedLustDelta),locked.id);

    for(const effect of locked.statEffects){
      assert.equal(
        out.run.character.stats[effect.stat],
        Math.min(100,statsBefore[effect.stat]+effect.amount),
        `${locked.id} / ${effect.stat}`
      );
    }
  }
});

test('Resolver observes the complete Arcana stat package after the paid lesson batch',()=>{
  const cat=catalog();
  const input=ready();
  input.run.character.stats.magic=1;
  input.run.character.stats.reason=1;
  input.run.character.stats.creativity=1;

  const result=executeSchoolLesson(input,'school.course.arcana',cat,runtime);

  assert.equal(result.state.run.character.stats.magic,5);
  assert.equal(result.state.run.character.stats.reason,5);
  assert.equal(result.state.run.character.stats.creativity,3);
  assert.deepEqual(
    result.reactionFacts
      .filter(fact=>fact.kind==='statChanged')
      .map(fact=>fact.stat)
      .sort(),
    ['creativity','magic','reason']
  );
  assert.equal(
    result.state.run.flow.pendingScene?.eventId,
    'school-production.arcana-package-observer'
  );
});

test('save/reload after a paid lesson preserves the committed charge and semantic presentation identity',()=>{
  const cat=catalog();
  const input=ready();
  const result=executeSchoolLesson(input,'school.course.literacy_and_numbers',cat,runtime);
  const paid=result.state;

  assert.equal(result.course.presentationId,'school/literacy-and-numbers/lesson/default');
  assert.equal(paid.run.resources.money,1_700);
  assert.equal(paid.run.dayState.energyCurrent,2);

  const reload1=parseSave(JSON.stringify(paid),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload1.run.resources.money,1_700);
  assert.equal(reload1.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.resources.money,1_700);
  assert.equal(reload2.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.character.stats.reason,paid.run.character.stats.reason);
  assert.equal(reload2.run.character.stats.wits,paid.run.character.stats.wits);
});
