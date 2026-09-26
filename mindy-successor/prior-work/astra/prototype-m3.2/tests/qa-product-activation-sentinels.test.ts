import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';

import {
  SCHOOL_COURSES,
  SCHOOL_LESSON_ENERGY_COST,
  schoolLessonEffects
} from '../src/core/school.ts';
import {actionSchema} from '../src/core/schema.ts';
import {presentationSchema} from '../src/core/presentation.ts';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));

test('Hard Work sentinel keeps exactly one completed-shifts >= 50 condition and exact hardWork:lumber reward',()=>{
  const definitions=json('content/lumber-target-definitions.fixture.json');
  const manifest=json('content/lumber-product-acceptance.fixture-manifest.json');
  const ending=definitions.endings.find((item:any)=>item.id==='ending.lumber.hard-work');

  assert.ok(ending);
  assert.deepEqual(ending.conditions,[
    {
      kind:'careerCounter',
      career:'lumber',
      counter:'completed_shifts',
      op:'gte',
      value:50
    }
  ]);
  assert.equal(ending.conditions.length,1);
  assert.deepEqual(ending.metaRewards,[
    {
      kind:'hardWork',
      rewardId:'hardWork:lumber',
      career:'lumber'
    }
  ]);

  assert.equal(
    manifest.lockedConstraints.hardWorkEligibilityOnlyFiftyCompletedLumberShifts,
    true
  );
  assert.equal(manifest.lockedConstraints.hardWorkMetaRewardId,'hardWork:lumber');
  assert.deepEqual(
    manifest.mappings.hardWorkEnding.eligibility,
    ending.conditions[0]
  );
  assert.equal(manifest.mappings.hardWorkEnding.metaRewardId,'hardWork:lumber');
});

test('School sentinel keeps exactly eight locked paid courses with tuition plus one current-day Energy transaction',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  assert.equal(new Set(SCHOOL_COURSES.map(course=>course.id)).size,8);
  assert.equal(SCHOOL_LESSON_ENERGY_COST,1);

  for(const course of SCHOOL_COURSES){
    assert.equal(course.energyCost,1,course.id);

    const effects=schoolLessonEffects(course.id);
    const money=effects.filter(effect=>effect.kind==='modifyResource');
    const energy=effects.filter(effect=>effect.kind==='modifyEnergy');

    assert.deepEqual(
      money,
      [{kind:'modifyResource',resource:'money',delta:-course.tuition}],
      course.id
    );
    assert.deepEqual(
      energy,
      [{kind:'modifyEnergy',delta:-1}],
      course.id
    );

    const statEffects=effects.filter(effect=>effect.kind==='modifyStat');
    assert.deepEqual(
      statEffects,
      course.statEffects.map(effect=>({
        kind:'modifyStat',
        stat:effect.stat,
        delta:effect.amount
      })),
      course.id
    );
  }
});

test('School progression contract keeps paid-lesson and Night-study counters as distinct concepts',()=>{
  const contract=readFileSync(
    '../../../docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md',
    'utf8'
  );

  assert.match(contract,/lessons_completed/);
  assert.match(contract,/night_study_sessions/);
  assert.match(
    contract,
    /night_study_sessions is kept separate from lessons_completed/
  );

  const lessonSection=contract.slice(
    contract.indexOf('## 5. Repeatable lessons and progression coexistence'),
    contract.indexOf('## 6. Night study relationship to track progression')
  );
  const nightSection=contract.slice(
    contract.indexOf('## 6. Night study relationship to track progression'),
    contract.indexOf('## 7. Teacher placeholders')
  );

  assert.match(lessonSection,/increments? lessons_completed|increment lessons_completed/);
  assert.doesNotMatch(lessonSection,/increment night_study_sessions/);
  assert.match(nightSection,/night_study_sessions/);
});

test('semantic presentation IDs accept slash taxonomy while ordinary gameplay IDs remain slash-free',()=>{
  const semantic='job/lumber/event/lumber-career-first-shift/default';

  const presentation=presentationSchema.safeParse({
    version:1,
    texts:{},
    media:{},
    slots:{
      [semantic]:{}
    }
  });
  assert.equal(presentation.success,true);

  const gameplayAction=actionSchema.safeParse({
    id:semantic,
    label:'Invalid slash gameplay action',
    description:'This object is valid except for its gameplay id.',
    cost:{money:0,energy:0},
    conditions:[],
    effects:[],
    mode:'normal'
  });

  assert.equal(gameplayAction.success,false);
  if(gameplayAction.success)return;
  assert.ok(
    gameplayAction.error.issues.some(issue=>issue.path.join('.')==='id'),
    gameplayAction.error.toString()
  );
});

test('synthetic school.lumber-management is never an allowed production activation action when an allowlist fixture exists',()=>{
  const synthetic='school.lumber-management';
  const isolated=json('content/lumber-target-definitions.fixture.json');

  assert.ok(
    isolated.actions.some((action:any)=>action.id===synthetic),
    'sentinel assumes the synthetic action remains visible in the isolated fixture'
  );

  const activationFixture='content/lumber-production-activation.fixture.json';
  if(!existsSync(activationFixture))return;

  const activation=json(activationFixture);
  const allowed=activation.productionCandidates?.actions;
  assert.ok(Array.isArray(allowed),'activation fixture must expose productionCandidates.actions');
  assert.equal(allowed.includes(synthetic),false);
});

test('target Lumber nested pack set is explicit and limited to the accepted three fixture packs',()=>{
  const manifest=json('content/lumber-product-acceptance.fixture-manifest.json');

  const referenced=new Set<string>();
  const visit=(value:unknown)=>{
    if(Array.isArray(value)){
      for(const item of value)visit(item);
      return;
    }
    if(value&&typeof value==='object'){
      for(const child of Object.values(value as Record<string,unknown>))visit(child);
      return;
    }
    if(
      typeof value==='string'&&
      value.startsWith('content/packs/lumber-target/')&&
      value.endsWith('.json')
    ){
      referenced.add(value.slice('content/packs/lumber-target/'.length));
    }
  };
  visit(manifest.mappings);

  const expected=[
    'lumber-cross-system.pack.json',
    'lumber-night-acceptance.pack.json',
    'lumber-production.pack.json'
  ];

  assert.deepEqual([...referenced].sort(),expected);

  const actual=readdirSync('content/packs/lumber-target')
    .filter(name=>name.endsWith('.json'))
    .sort();

  assert.deepEqual(actual,expected);

  const build=readFileSync('scripts/build.mjs','utf8');
  const validate=readFileSync('scripts/validate.ts','utf8');
  assert.doesNotMatch(build,/recursive\s*:\s*true/);
  assert.doesNotMatch(validate,/recursive\s*:\s*true/);
});
