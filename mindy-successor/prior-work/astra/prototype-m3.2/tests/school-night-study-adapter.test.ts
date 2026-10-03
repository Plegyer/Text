import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoice
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const rawFixture=JSON.parse(readFileSync('content/school-night-study.fixture.json','utf8'));
const nightChoice=schoolNightStudyChoice('school.course.arcana','reason');

function catalog():Catalog{
  const definitions=structuredClone(rawFixture);
  definitions.nightChoices=[structuredClone(nightChoice)];
  return loadCatalog(definitions,[{
    schemaVersion:1,
    id:'school-night-fixture-media',
    reads:[],
    writes:[],
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Synthetic room media required by persisted NightFlow lastAction.'
    }],
    events:[]
  }]);
}

function ready():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.character.creation.hardWorkPackagesApplied=true;
  s.run.resources.money=600;
  s.run.dayState.energyCurrent=1;
  s.run.character.stats.reason=10;
  return s;
}

test('School Night-study fixture locks zero-tuition study mechanics to a supported track stat',()=>{
  assert.equal(nightChoice.id,'school.night_study.arcana.reason');
  assert.deepEqual(
    nightChoice.effects,
    [
      {kind:'modifyStat',stat:'reason',delta:SCHOOL_NIGHT_STUDY_STAT_GAIN},
      {kind:'incrementSchoolCounter',track:'school.track.arcana',counter:'night_study_sessions',amount:1}
    ]
  );
  assert.equal(SCHOOL_NIGHT_STUDY_STAT_GAIN,2);
  assert.equal(nightChoice.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA);
  assert.equal(SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,-1);
  assert.deepEqual(nightChoice.nextDayEffects,[]);
  assert.equal(nightChoice.effects.some(effect=>effect.kind==='modifyResource'),false);
  assert.equal(nightChoice.effects.some(effect=>effect.kind==='modifyEnergy'),false);
  assert.throws(
    ()=>schoolNightStudyChoice('school.course.physical_training','reason'),
    /not supported/
  );
});

test('Night-study immediate effect spends no daytime Energy or money while granting +2 to the selected stat',()=>{
  const cat=catalog();
  const input=ready();
  const moneyBefore=input.run.resources.money;
  const energyBefore=input.run.dayState.energyCurrent;
  const reasonBefore=input.run.character.stats.reason;

  const immediate=applyEffects(input,nightChoice.effects,cat);

  assert.equal(immediate.run.resources.money,moneyBefore);
  assert.equal(immediate.run.dayState.energyCurrent,energyBefore);
  assert.equal(immediate.run.character.stats.reason,reasonBefore+2);
  assert.equal(immediate.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,1);
  assert.equal(immediate.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0,0);
  assert.equal(input.run.character.stats.reason,reasonBefore);
});

test('Night study consumes the Night slot and applies +2 / next-day Energy -1 exactly once across save/reload',()=>{
  const cat=catalog();
  let state=ready();
  state.run.flags['story.arrived']=true;
  const moneyBefore=state.run.resources.money;

  state=dispatch(state,{type:'endDay'},cat);
  assert.equal(state.run.calendar.elapsedDays,0);
  assert.ok(state.run.flow.night);

  state=dispatch(state,{type:'chooseLodging',id:'school-night-fixture.room'},cat);
  assert.equal(state.run.resources.money,moneyBefore);
  assert.equal(state.run.dayState.energyCurrent,1);

  state=parseSave(JSON.stringify(state),cat);
  const reasonBeforeStudy=state.run.character.stats.reason;

  state=dispatch(state,{type:'chooseNightChoice',id:nightChoice.id},cat);

  assert.equal(state.run.calendar.elapsedDays,1);
  assert.equal(state.run.flow.night,null);
  assert.equal(state.run.character.stats.reason,reasonBeforeStudy+2);
  assert.equal(state.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,1);
  assert.equal(state.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0,0);
  assert.equal(state.run.resources.money,moneyBefore);
  assert.equal(state.run.dayState.energyCurrent,2);
  assert.deepEqual(state.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});

  const reload1=parseSave(JSON.stringify(state),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.equal(reload1.run.calendar.elapsedDays,1);
  assert.equal(reload2.run.calendar.elapsedDays,1);
  assert.equal(reload1.run.character.stats.reason,reasonBeforeStudy+2);
  assert.equal(reload2.run.character.stats.reason,reasonBeforeStudy+2);
  assert.equal(reload1.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,1);
  assert.equal(reload2.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,1);
  assert.equal(reload1.run.resources.money,moneyBefore);
  assert.equal(reload2.run.resources.money,moneyBefore);
  assert.equal(reload1.run.dayState.energyCurrent,2);
  assert.equal(reload2.run.dayState.energyCurrent,2);
});
