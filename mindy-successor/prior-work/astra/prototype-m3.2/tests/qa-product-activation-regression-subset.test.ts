import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {
  applyEffects,
  dispatch,
  freshSave,
  parseSave,
  resolveReactions
} from '../src/core/engine.ts';
import {
  presentationIdForAction,
  presentationIdForActionResult,
  presentationIdForEnding,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import {executeSchoolLesson} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const capabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

const runtime={applyEffects,resolveReactions};

function qaDefinitions(){
  const d=structuredClone(definitions);
  d.lodgings=[{
    id:'lumber.normal-room',
    label:'Normal room',
    housing:'normal',
    moneyCost:100,
    conditions:[],
    effects:[],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  d.nightChoices=[{
    id:'lumber.foreman.night',
    label:'Talk with the Foreman',
    conditions:[
      {kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}
    ],
    effects:[
      {kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1}
    ],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  return d;
}

function catalog():Catalog{
  return loadCatalog(
    qaDefinitions(),
    [structuredClone(productionPack),structuredClone(crossPack),structuredClone(nightPack)]
  );
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.resources.money=1_200;
  s.run.dayState.energyCurrent=3;
  return s;
}

function professionalRoute(input:Save,cat:Catalog){
  let s=dispatch(input,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(s.run.dayState.energyCurrent,2);

  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  return s;
}

test('activation regression subset spans Lumber, School, Night, Forest, presentation and Hard Work exactly-once boundaries',()=>{
  const cat=catalog();
  let s=professionalRoute(ready(),cat);

  assert.equal(
    presentationIdForAction(cat,'lumber.shift',['job.lumber.shift.spring.default']),
    'job/lumber/shift/spring/default'
  );
  assert.equal(
    presentationIdForActionResult(cat,'lumber.shift',['job.lumber.shift.spring.default']),
    'job/lumber/result/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber.career-first-shift','default'),
    'job/lumber/event/lumber-career-first-shift/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber.foreman-notice','default'),
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber-night.foreman-professional','default'),
    'relationship/lumber-foreman/lumber-night-foreman-professional/default'
  );
  assert.equal(
    presentationIdForEvent(cat,'lumber-cross.activity-forest-return','default'),
    'job/lumber/event/lumber-cross-activity-forest-return/default'
  );
  assert.equal(presentationIdForEnding('ending.lumber.hard-work'),'ending/lumber/hard-work');

  const moneyBeforeSchool=s.run.resources.money;
  const energyBeforeSchool=s.run.dayState.energyCurrent;
  const arcana=executeSchoolLesson(s,'school.course.arcana',cat,runtime);
  s=arcana.state;

  assert.equal(arcana.course.presentationId,'school/arcana/lesson/default');
  assert.equal(s.run.resources.money,moneyBeforeSchool-500);
  assert.equal(s.run.dayState.energyCurrent,energyBeforeSchool-1);

  const paidMoney=s.run.resources.money;
  const paidEnergy=s.run.dayState.energyCurrent;
  const paidStats=structuredClone(s.run.character.stats);
  s=parseSave(JSON.stringify(s),cat);
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.resources.money,paidMoney);
  assert.equal(s.run.dayState.energyCurrent,paidEnergy);
  assert.deepEqual(s.run.character.stats,paidStats);

  s=dispatch(s,{type:'endDay'},cat);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.resources.money,paidMoney-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  const afterLodging=parseSave(JSON.stringify(s),cat);
  assert.equal(afterLodging.run.resources.money,paidMoney-100);
  assert.equal(afterLodging.run.flow.night?.lodgingPaymentCommitted,true);

  const nightEnergy=afterLodging.run.dayState.energyCurrent;
  s=dispatch(afterLodging,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.dayState.energyCurrent,nightEnergy);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.dayState.energyCurrent,3);

  assert.equal(capabilityFixture.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');
  const capability=capabilityFixture.capabilities.find((item:any)=>item.id==='enter_old_boundary');
  assert.ok(capability);
  assert.equal(capability.runtimeAdapter.fact,'lumber.capability.enter-old-boundary');

  s=applyEffects(
    s,
    [{kind:'addWorldFact',fact:capability.runtimeAdapter.fact}],
    cat
  );

  const forestEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  assert.equal(s.run.dayState.energyCurrent,forestEnergy-2);
  assert.equal(s.run.flow.activity?.activityId,'lumber.forest');

  s=parseSave(JSON.stringify(s),cat);
  const insideEnergy=s.run.dayState.energyCurrent;
  const insideRng=s.run.flow.activity?.rngState;
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.dayState.energyCurrent,insideEnergy);
  assert.equal(s.run.flow.activity?.rngState,insideRng);

  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.dayState.energyCurrent,insideEnergy);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  s=dispatch(s,{type:'choice',id:'continue'},cat);

  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-problem-resolved'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));

  // QA accelerator: prepare the exact 49/50 boundary, then use one real paid Lumber shift.
  s.run.progression.careers.lumber.counters.completed_shifts=49;
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.endings.eligible.includes('ending.lumber.hard-work'),false);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const transactionId=s.run.endings.result!.transactionId;
  const reload1=parseSave(JSON.stringify(s),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);

  assert.deepEqual(reload2.meta.hardWorkProgress,['lumber']);
  assert.equal(
    reload2.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );
  assert.equal(reload2.run.endings.result?.transactionId,transactionId);
});
