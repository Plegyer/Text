import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ORDINARY_SHIFT_WAGE_CAP,
  dispatch,
  freshSave,
  ordinaryShiftWage,
  parseSave
} from '../src/core/engine.ts';
import {
  SCHOOL_BODY_CONFIDENCE_LUST_GAIN,
  SCHOOL_COURSES,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN
} from '../src/core/school.ts';
import {ordinaryHardWorkCareers,type Action,type Save} from '../src/core/schema.ts';
import {catalog,definitions} from './helpers.ts';

const expectedWeights:Record<string,readonly {stat:string;factor:number}[]>={
  lumber:[{stat:'strength',factor:0.5},{stat:'endurance',factor:0.25}],
  'satyr-maid':[{stat:'charm',factor:0.35},{stat:'sexuality',factor:0.25}],
  'undead-farm':[{stat:'endurance',factor:0.3},{stat:'magic',factor:0.3},{stat:'reason',factor:0.2}],
  tavern:[{stat:'charm',factor:0.3},{stat:'wits',factor:0.3},{stat:'manners',factor:0.2}],
  hunter:[{stat:'dexterity',factor:0.35},{stat:'endurance',factor:0.3},{stat:'wits',factor:0.2}],
  guard:[{stat:'endurance',factor:0.3},{stat:'manners',factor:0.25},{stat:'strength',factor:0.2},{stat:'reason',factor:0.15}],
  merchant:[{stat:'wits',factor:0.35},{stat:'charm',factor:0.25},{stat:'manners',factor:0.2},{stat:'reason',factor:0.15}],
  'artist-geisha':[{stat:'manners',factor:0.3},{stat:'charm',factor:0.3},{stat:'sexuality',factor:0.15},{stat:'dexterity',factor:0.15}],
  assassin:[{stat:'dexterity',factor:0.35},{stat:'wits',factor:0.3},{stat:'reason',factor:0.2},{stat:'manners',factor:0.1}],
  prostitute:[{stat:'sexuality',factor:0.35},{stat:'charm',factor:0.3},{stat:'manners',factor:0.2},{stat:'endurance',factor:0.15}]
};

const expectedSchool=[
  {id:'school.course.literacy_and_numbers',tuition:300,statEffects:[{stat:'reason',amount:4},{stat:'wits',amount:2}],lustGain:undefined},
  {id:'school.course.arcana',tuition:500,statEffects:[{stat:'magic',amount:4},{stat:'reason',amount:4},{stat:'creativity',amount:2}],lustGain:undefined},
  {id:'school.course.rhetoric_and_social',tuition:300,statEffects:[{stat:'charm',amount:3},{stat:'sociability',amount:3},{stat:'wits',amount:2}],lustGain:undefined},
  {id:'school.course.etiquette_and_presentation',tuition:400,statEffects:[{stat:'manners',amount:3},{stat:'grooming',amount:3},{stat:'charm',amount:2}],lustGain:undefined},
  {id:'school.course.field_craft',tuition:400,statEffects:[{stat:'dexterity',amount:3},{stat:'wits',amount:3},{stat:'creativity',amount:2}],lustGain:undefined},
  {id:'school.course.physical_training',tuition:400,statEffects:[{stat:'strength',amount:3},{stat:'endurance',amount:3},{stat:'dexterity',amount:2}],lustGain:undefined},
  {id:'school.course.arts_and_performance',tuition:500,statEffects:[{stat:'creativity',amount:3},{stat:'charm',amount:3},{stat:'sociability',amount:2},{stat:'dexterity',amount:2}],lustGain:undefined},
  {id:'school.course.body_confidence',tuition:400,statEffects:[{stat:'sexuality',amount:3},{stat:'grooming',amount:3},{stat:'endurance',amount:2}],lustGain:2}
] as const;

function action(id:string):Action{
  const found=catalog.definitions.actions.find(item=>item.id===id);
  assert.ok(found,id);
  return found;
}

function readyAllOne():Save{
  let s=freshSave();
  s.run.character.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},catalog);
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

test('D46 fresh life starts at Lust 5 while starting money 600 and base Energy 3 stay unchanged',()=>{
  const s=freshSave();
  assert.equal(s.run.character.lust,5);
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(Object.values(s.run.character.stats).every(value=>value===1),true);
});

test('D46 schema-5 migration preserves stored Lust instead of applying the new fresh-life default',()=>{
  const raw=JSON.parse(JSON.stringify(freshSave()));
  raw.schemaVersion=5;
  raw.run.character.lust=17;
  delete raw.meta.strongMeta;
  delete raw.run.strongMetaSnapshot;
  delete raw.run.strongMetaRuntime;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.schemaVersion,6);
  assert.equal(migrated.run.character.lust,17);
});

test('D46 ordinary bases are exactly 35/37 and all pre-D46 wage stat weights are unchanged',()=>{
  for(const career of ordinaryHardWorkCareers){
    const shift=action(`${career}.shift`);
    assert.ok(shift.wage,career);
    assert.equal(shift.wage.base,career==='lumber'?35:37,career);
    assert.deepEqual(shift.wage.weights,expectedWeights[career],career);
  }
});

test('D46 all-1 starter anchors are 36/38/38 and gross 112',()=>{
  const s=readyAllOne();
  const lumber=ordinaryShiftWage(action('lumber.shift'),s);
  const satyr=ordinaryShiftWage(action('satyr-maid.shift'),s);
  const undead=ordinaryShiftWage(action('undead-farm.shift'),s);

  assert.equal(lumber,36);
  assert.equal(satyr,38);
  assert.equal(undead,38);
  assert.equal((lumber??0)+(satyr??0)+(undead??0),112);
});

test('D46 runtime pays the exact pre-shift starter wage before seasonal stat effects alter the character',()=>{
  for(const [id,expected] of [
    ['lumber.shift',36],
    ['satyr-maid.shift',38],
    ['undead-farm.shift',38]
  ] as const){
    const input=readyAllOne();
    const moneyBefore=input.run.resources.money;
    const out=dispatch(input,{type:'action',id},catalog);
    assert.equal(out.run.resources.money-moneyBefore,expected,id);
  }
});

test('D24 cap-200 can never raise an ordinary shift above the D46 cap 120',()=>{
  assert.equal(ORDINARY_SHIFT_WAGE_CAP,120);
  for(const career of ordinaryHardWorkCareers){
    const s=readyAllOne();
    s.run.character.progressionStatCap=200;
    for(const weight of action(`${career}.shift`).wage?.weights??[]){
      s.run.character.stats[weight.stat as keyof typeof s.run.character.stats]=200;
    }
    assert.equal(ordinaryShiftWage(action(`${career}.shift`),s),120,career);
  }
});

test('D46 cap is isolated to the ten ordinary shift identities',()=>{
  const s=readyAllOne();
  const hunt=action('hunt');
  assert.ok(hunt.wage);
  assert.equal(ordinaryShiftWage(hunt,s),null);

  const ordinaryTemplate=action('lumber.shift');
  const secretDebtLike={...ordinaryTemplate,id:'secret-debt.hidden-work'} as Action;
  const palaceLike={...ordinaryTemplate,id:'palace.structural-duty'} as Action;
  assert.equal(ordinaryShiftWage(secretDebtLike,s),null);
  assert.equal(ordinaryShiftWage(palaceLike,s),null);
});

test('D35 lodging remains fixed at 100/50/0 across all four 40-day years with no escalation field',()=>{
  const expected={
    'lodging.normal':100,
    'lodging.cheap':50,
    'lodging.street':0
  } as const;

  for(const day of [0,40,80,120]){
    const s=freshSave();
    s.run.calendar.elapsedDays=day;
    for(const [id,cost] of Object.entries(expected)){
      const lodging=definitions.lodgings.find((item:{id:string})=>item.id===id);
      assert.ok(lodging,id);
      assert.equal(lodging.moneyCost,cost,`${id} day ${day+1}`);
      assert.equal(Object.prototype.hasOwnProperty.call(lodging,'yearMultiplier'),false,id);
      assert.equal(Object.prototype.hasOwnProperty.call(lodging,'yearCosts'),false,id);
    }
  }
});

test('D46 leaves every paid School tuition/gain package and Body Confidence Lust +2 unchanged',()=>{
  assert.deepEqual(
    SCHOOL_COURSES.map(course=>({
      id:course.id,
      tuition:course.tuition,
      statEffects:course.statEffects,
      lustGain:course.lustGain
    })),
    expectedSchool
  );
  assert.equal(SCHOOL_BODY_CONFIDENCE_LUST_GAIN,2);
});

test('D46 leaves School Night Study +2 / next-day Energy -1 unchanged',()=>{
  assert.equal(SCHOOL_NIGHT_STUDY_STAT_GAIN,2);
  assert.equal(SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,-1);
});
