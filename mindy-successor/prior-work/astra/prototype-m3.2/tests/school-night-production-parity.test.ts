import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Catalog,Save,Stat} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-night-production-parity.fixture.json','utf8')
);
const accepted=JSON.parse(
  readFileSync('content/school-night-choice-catalog.fixture.json','utf8')
);
const reachability=JSON.parse(
  readFileSync('content/school-nightflow-reachability.fixture.json','utf8')
);

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[{
      id:'rest',
      label:'Rest',
      description:'Night production parity post-Night action.',
      cost:{money:0,energy:0},
      conditions:[],
      effects:[],
      mode:'normal'
    }],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[
      {
        id:'school.parity.normal',
        label:'Normal',
        housing:'normal',
        moneyCost:0,
        conditions:[],
        effects:[],
        nextDayEffects:[],
        nextDayEnergyDelta:0
      },
      {
        id:'school.parity.cheap',
        label:'Cheap',
        housing:'cheap',
        moneyCost:0,
        conditions:[],
        effects:[],
        nextDayEffects:[],
        nextDayEnergyDelta:0
      }
    ],
    nightChoices:schoolNightStudyChoices(),
    activities:[]
  };
}

function pack(){
  return {
    schemaVersion:1,
    id:'school-night-production-parity',
    reads:[],
    writes:[],
    capabilities:{reads:{},writes:{}},
    media:[{
      id:'stage.room',
      kind:'image',
      src:'assets/room.svg',
      alt:'Night parity room'
    }],
    events:[]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[pack()]);
}

function ready():Save{
  const state=freshSave();
  state.run.character.creation.remaining=0;
  state.run.character.creation.allocated={};
  state.run.character.creation.complete=true;
  state.run.flags['story.arrived']=true;
  state.run.resources.money=777;
  state.run.dayState.energyCurrent=1;
  return state;
}

test('production parity matrix covers exactly the accepted 24 School Night choices',()=>{
  const generated=schoolNightStudyChoices();
  assert.equal(fixture.choices.length,24);
  assert.equal(accepted.choices.length,24);
  assert.equal(generated.length,24);
  assert.deepEqual(
    fixture.choices.map((choice:any)=>choice.choiceId),
    accepted.choices.map((choice:any)=>choice.choiceId)
  );
  assert.deepEqual(
    fixture.choices.map((choice:any)=>choice.choiceId),
    generated.map(choice=>choice.id)
  );
});

test('normal/cheap availability and street restriction match the accepted Night reachability contract',()=>{
  assert.deepEqual(fixture.housingPolicy,{
    normal:'available',
    cheap:'available',
    street:'restricted',
    enforcement:'production-availability-contract'
  });

  for(const choice of fixture.choices){
    assert.deepEqual(choice.allowedHousing,['normal','cheap']);
    assert.deepEqual(choice.deniedHousing,['street']);
  }

  for(const choice of reachability.choices){
    assert.deepEqual(choice.allowedHousing,['normal','cheap']);
    assert.deepEqual(choice.deniedHousing,['street']);
  }
});

test('all 24 choices retain zero tuition/current-day Energy, +2 supported stat, next-day Energy -1 and typed Night counter',()=>{
  for(const choice of fixture.choices){
    assert.equal(choice.tuition,0,choice.choiceId);
    assert.equal(choice.currentDayEnergyCost,0,choice.choiceId);
    assert.equal(choice.statGain,SCHOOL_NIGHT_STUDY_STAT_GAIN,choice.choiceId);
    assert.equal(
      choice.nextDayEnergyDelta,
      SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
      choice.choiceId
    );
    assert.deepEqual(choice.typedCounterDelta,{
      counter:'night_study_sessions',
      delta:1
    });
    assert.equal(choice.reloadExactlyOnce,true);
  }

  assert.deepEqual(fixture.semantics,{
    tuition:0,
    currentDayEnergyCost:0,
    selectedSupportedStatGain:SCHOOL_NIGHT_STUDY_STAT_GAIN,
    nextDayEnergyDelta:SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
    consumesNightSlot:true,
    typedCounter:{
      counter:'night_study_sessions',
      delta:1
    },
    reloadPolicy:'exactly-once'
  });
});

test('every accepted choice executes once under normal and cheap lodging and consumes the Night slot',()=>{
  const cat=catalog();

  for(const housing of ['normal','cheap'] as const){
    for(const entry of fixture.choices){
      let state=ready();
      const stat=entry.stat as Stat;
      state.run.character.stats[stat]=10;
      const moneyBefore=state.run.resources.money;

      state=dispatch(state,{type:'endDay'},cat);
      state=dispatch(
        state,
        {
          type:'chooseLodging',
          id:housing==='normal'
            ? 'school.parity.normal'
            : 'school.parity.cheap'
        },
        cat
      );
      const beforeChoice=parseSave(JSON.stringify(state),cat);

      state=dispatch(
        beforeChoice,
        {type:'chooseNightChoice',id:entry.choiceId},
        cat
      );

      assert.equal(state.run.flow.night,null,entry.choiceId);
      assert.equal(state.run.calendar.elapsedDays,1,entry.choiceId);
      assert.equal(state.run.resources.money,moneyBefore,entry.choiceId);
      assert.equal(
        state.run.character.stats[stat],
        10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
        entry.choiceId
      );
      assert.equal(state.run.dayState.energyCurrent,2,entry.choiceId);

      const reload1=parseSave(JSON.stringify(state),cat);
      const reload2=parseSave(JSON.stringify(reload1),cat);
      assert.equal(reload2.run.calendar.elapsedDays,1,entry.choiceId);
      assert.equal(reload2.run.resources.money,moneyBefore,entry.choiceId);
      assert.equal(
        reload2.run.character.stats[stat],
        10+SCHOOL_NIGHT_STUDY_STAT_GAIN,
        entry.choiceId
      );
      assert.equal(reload2.run.dayState.energyCurrent,2,entry.choiceId);
    }
  }
});

test('street restriction is an availability contract and this parity suite does not patch NightFlow or UI',()=>{
  assert.equal(
    fixture.housingPolicy.enforcement,
    'production-availability-contract'
  );
  assert.equal(
    fixture.choices.every((choice:any)=>
      choice.deniedHousing.includes('street')
    ),
    true
  );
});
