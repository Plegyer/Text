import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {
  SCHOOL_ACTION_ID,
  SCHOOL_COURSES,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  schoolNightStudyChoice,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import {stats,type Catalog,type Save,type Stat} from '../src/core/schema.ts';

const runtime={applyEffects,resolveReactions};

function observerId(courseId:string){
  return `school-reload-matrix.${courseId.slice('school.course.'.length)}`;
}

function observerPack(){
  return {
    schemaVersion:1,
    id:'school-reload-matrix',
    reads:[],
    writes:[],
    capabilities:{
      reads:{stats:[...stats]},
      writes:{}
    },
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Reload matrix room'
    }],
    events:SCHOOL_COURSES.map(course=>({
      id:observerId(course.id),
      title:`School reload observer: ${course.label}`,
      reactionTriggers:[{kind:'actionCompleted',action:SCHOOL_ACTION_ID}],
      priorityClass:'normal_progression',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:course.statEffects.map(effect=>({
        kind:'stat',
        stat:effect.stat,
        op:'gte',
        value:1+effect.amount
      })),
      variants:[{
        id:'default',
        text:`The complete ${course.label} stat package is visible to the Resolver.`,
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'Continue after the complete School package observation.',
        conditions:[],
        effects:[]
      }]
    }))
  };
}

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Fixture action referenced by the persisted post-Night lastAction.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.reload.room',
      label:'School reload room',
      housing:'normal',
      moneyCost:0,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[observerPack()]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.flags['story.arrived']=true;
  state.run.resources.money=2_000;
  state.run.dayState.energyCurrent=3;
  return state;
}

test('full paid School reload matrix commits every tuition/Energy charge exactly once and persists the full Resolver-visible package without Lust mutation',()=>{
  const cat=catalog();

  for(const course of SCHOOL_COURSES){
    const input=ready();
    const beforeMoney=input.run.resources.money;
    const beforeEnergy=input.run.dayState.energyCurrent;
    const beforeLust=input.run.character.lust;
    const beforeStats=structuredClone(input.run.character.stats);

    const result=executeSchoolLesson(input,course.id,cat,runtime);
    const paid=result.state;

    assert.equal(input.run.resources.money,beforeMoney,course.id);
    assert.equal(input.run.dayState.energyCurrent,beforeEnergy,course.id);
    assert.equal(input.run.character.lust,beforeLust,course.id);

    assert.equal(paid.run.resources.money,beforeMoney-course.tuition,course.id);
    assert.equal(paid.run.dayState.energyCurrent,beforeEnergy-1,course.id);
    assert.equal(paid.run.character.lust,beforeLust,course.id);
    assert.equal(paid.run.flow.pendingScene?.eventId,observerId(course.id),course.id);

    assert.deepEqual(
      result.reactionFacts
        .filter(fact=>fact.kind==='statChanged')
        .map(fact=>fact.stat)
        .sort(),
      course.statEffects.map(effect=>effect.stat).sort(),
      course.id
    );

    for(const effect of course.statEffects){
      assert.equal(
        paid.run.character.stats[effect.stat],
        beforeStats[effect.stat]+effect.amount,
        `${course.id} / ${effect.stat}`
      );
    }

    const reload1=parseSave(JSON.stringify(paid),cat);
    const reload2=parseSave(JSON.stringify(reload1),cat);

    for(const reloaded of [reload1,reload2]){
      assert.equal(reloaded.run.resources.money,beforeMoney-course.tuition,course.id);
      assert.equal(reloaded.run.dayState.energyCurrent,beforeEnergy-1,course.id);
      assert.equal(reloaded.run.character.lust,beforeLust,course.id);
      assert.equal(reloaded.run.flow.pendingScene?.eventId,observerId(course.id),course.id);
      for(const effect of course.statEffects){
        assert.equal(
          reloaded.run.character.stats[effect.stat],
          beforeStats[effect.stat]+effect.amount,
          `${course.id} / ${effect.stat}`
        );
      }
    }
  }
});

test('Night-study reload matrix covers every course and every supported stat with zero tuition, +2 selected stat, and next-day Energy -1 exactly once',()=>{
  const cat=catalog();

  for(const course of SCHOOL_COURSES){
    for(const effect of course.statEffects){
      const choice=schoolNightStudyChoice(course.id,effect.stat);
      let state=ready();
      state.run.resources.money=777;
      state.run.dayState.energyCurrent=1;
      state.run.character.stats[effect.stat]=10;

      assert.deepEqual(
        choice.effects,
        [{kind:'modifyStat',stat:effect.stat,delta:SCHOOL_NIGHT_STUDY_STAT_GAIN}],
        choice.id
      );
      assert.equal(choice.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,choice.id);
      assert.deepEqual(choice.nextDayEffects,[],choice.id);
      assert.equal(choice.effects.some(item=>item.kind==='modifyResource'),false,choice.id);
      assert.equal(choice.effects.some(item=>item.kind==='modifyEnergy'),false,choice.id);

      const immediate=applyEffects(state,choice.effects,cat);
      assert.equal(immediate.run.resources.money,777,choice.id);
      assert.equal(immediate.run.dayState.energyCurrent,1,choice.id);
      assert.equal(immediate.run.character.stats[effect.stat],12,choice.id);
      assert.equal(state.run.character.stats[effect.stat],10,choice.id);

      state=dispatch(state,{type:'endDay'},cat);
      assert.ok(state.run.flow.night,choice.id);
      assert.equal(state.run.resources.money,777,choice.id);
      assert.equal(state.run.dayState.energyCurrent,1,choice.id);

      state=dispatch(state,{type:'chooseLodging',id:'school.reload.room'},cat);
      assert.equal(state.run.resources.money,777,choice.id);
      assert.equal(state.run.dayState.energyCurrent,1,choice.id);

      state=parseSave(JSON.stringify(state),cat);
      assert.equal(state.run.character.stats[effect.stat],10,choice.id);

      state=dispatch(state,{type:'chooseNightChoice',id:choice.id},cat);

      assert.equal(state.run.calendar.elapsedDays,1,choice.id);
      assert.equal(state.run.flow.night,null,choice.id);
      assert.equal(state.run.resources.money,777,choice.id);
      assert.equal(state.run.character.stats[effect.stat],12,choice.id);
      assert.equal(state.run.dayState.energyCurrent,2,choice.id);
      assert.deepEqual(
        state.run.dayState.nextDayModifiers,
        {energyDelta:0,statEffects:[],tags:[]},
        choice.id
      );
      assert.equal(state.run.flow.lastAction?.id,'rest',choice.id);
      assert.deepEqual(state.run.flow.lastAction?.media,['stage.room'],choice.id);

      const reload1=parseSave(JSON.stringify(state),cat);
      const reload2=parseSave(JSON.stringify(reload1),cat);

      for(const reloaded of [reload1,reload2]){
        assert.equal(reloaded.run.calendar.elapsedDays,1,choice.id);
        assert.equal(reloaded.run.resources.money,777,choice.id);
        assert.equal(reloaded.run.character.stats[effect.stat],12,choice.id);
        assert.equal(reloaded.run.dayState.energyCurrent,2,choice.id);
        assert.equal(reloaded.run.flow.lastAction?.id,'rest',choice.id);
        assert.deepEqual(reloaded.run.flow.lastAction?.media,['stage.room'],choice.id);
      }
    }
  }
});

test('unsupported School Night-study course/stat combinations reject atomically',()=>{
  for(const course of SCHOOL_COURSES){
    const supported=new Set(course.statEffects.map(effect=>effect.stat));
    const unsupported=stats.find(stat=>!supported.has(stat));
    assert.ok(unsupported,`expected unsupported stat for ${course.id}`);

    const state=ready();
    const before=JSON.stringify(state);

    assert.throws(
      ()=>schoolNightStudyChoice(course.id,unsupported as Stat),
      /not supported/,
      course.id
    );
    assert.equal(JSON.stringify(state),before,course.id);
  }
});
