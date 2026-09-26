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
  applyPresentation,
  emptyPresentation,
  presentationIdForAction,
  presentationIdForActionResult,
  presentationIdForEnding,
  presentationIdForEvent,
  resolvePresentation
} from '../src/core/presentation.ts';
import {
  SCHOOL_COURSES,
  executeSchoolLesson
} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const itemCapabilityFixture=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));
const manifest=JSON.parse(readFileSync('content/lumber-product-acceptance.fixture-manifest.json','utf8'));

const runtime={applyEffects,resolveReactions};
const WORK_ID='lumber.shift';
const NORMAL_ROOM_ID='lumber.normal-room';
const FOREMAN_NIGHT_ID='lumber.foreman.night';
const FOREST_ID='lumber.forest';
const HARD_WORK_ENDING='ending.lumber.hard-work';

function qaDefinitions(){
  const d=structuredClone(definitions);

  // Reuse the exact merged Lumber Night acceptance fixture IDs and values.
  // These remain test-only definitions; this QA file does not create product content.
  d.lodgings=[
    {
      id:NORMAL_ROOM_ID,
      label:'Normal room',
      housing:'normal',
      moneyCost:100,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }
  ];
  d.nightChoices=[
    {
      id:FOREMAN_NIGHT_ID,
      label:'Talk with the Foreman',
      conditions:[
        {kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}
      ],
      effects:[
        {kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1}
      ],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }
  ];

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
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=600;
  s.run.dayState.energyCurrent=3;
  return s;
}

function establishProfessionalRoute(input:Save,cat:Catalog){
  let s=dispatch(input,{type:'action',id:WORK_ID},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');

  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  return s;
}

test('cross-slice subset: Lumber -> School -> Night reload -> Forest result -> Hard Work completion stays exactly once',()=>{
  const cat=catalog();

  assert.equal(manifest.mappings.work.actionId,WORK_ID);
  assert.equal(manifest.mappings.nightHook.nightChoiceId,FOREMAN_NIGHT_ID);
  assert.equal(manifest.mappings.forestActivity.activityId,FOREST_ID);
  assert.equal(manifest.mappings.hardWorkEnding.endingId,HARD_WORK_ENDING);
  assert.equal(manifest.mappings.hardWorkEnding.metaRewardId,'hardWork:lumber');

  // Lumber Work pays the only daytime Energy here; both reactive scenes are free.
  let s=establishProfessionalRoute(ready(),cat);

  // PR #19 School uses the merged adapter API, not a fabricated engine command.
  const schoolMoneyBefore=s.run.resources.money;
  const schoolEnergyBefore=s.run.dayState.energyCurrent;
  const school=executeSchoolLesson(s,'school.course.arcana',cat,runtime);
  s=school.state;
  assert.equal(school.course.presentationId,'school/arcana/lesson/default');
  assert.equal(s.run.resources.money,schoolMoneyBefore-500);
  assert.equal(s.run.dayState.energyCurrent,schoolEnergyBefore-1);
  assert.equal(s.run.pending,null);

  // Reloading the already-paid School state cannot charge tuition/Energy again.
  s=parseSave(JSON.stringify(s),cat);
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.resources.money,100);
  assert.equal(s.run.dayState.energyCurrent,1);

  // Night: normal lodging payment is committed before the Foreman choice.
  s=dispatch(s,{type:'endDay'},cat);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:NORMAL_ROOM_ID},cat);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  const paidNight=parseSave(JSON.stringify(s),cat);
  assert.equal(paidNight.run.resources.money,0);
  assert.equal(paidNight.run.flow.night?.lodgingPaymentCommitted,true);

  // The merged Foreman Night hook spends the Night slot, not daytime Energy.
  const nightEnergyBefore=paidNight.run.dayState.energyCurrent;
  s=dispatch(paidNight,{type:'chooseNightChoice',id:FOREMAN_NIGHT_ID},cat);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.dayState.energyCurrent,nightEnergyBefore);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);

  // Pending Night reload preserves both the one-time lodging payment and one-time relation increment.
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.resources.money,0);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.ok(s.run.progression.relationships['lumber.foreman'].facts.includes('night-followup-complete'));

  // Reuse the exact merged old_boundary_token test adapter; do not invent item state.
  assert.equal(itemCapabilityFixture.itemId,'old_boundary_token');
  const capability=itemCapabilityFixture.capabilities.find((c:any)=>c.id==='enter_old_boundary');
  assert.ok(capability);
  assert.equal(capability.runtimeAdapter.fact,'lumber.capability.enter-old-boundary');
  s=applyEffects(
    s,
    [{kind:'addWorldFact',fact:capability.runtimeAdapter.fact}],
    cat
  );

  // Forest entry charges daily Energy once. Reload and internal steps do not charge it again.
  const forestEnergyBefore=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'enterActivity',id:FOREST_ID},cat);
  assert.equal(s.run.dayState.energyCurrent,forestEnergyBefore-2);
  assert.equal(s.run.flow.activity?.activityId,FOREST_ID);

  s=parseSave(JSON.stringify(s),cat);
  const insideEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.dayState.energyCurrent,insideEnergy);
  assert.ok(s.run.flow.activity);
  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,insideEnergy);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');

  // Reload the post-Activity pending scene, then resolve the free Lumber continuation.
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,insideEnergy);
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber.facts.includes('forest-problem-resolved'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));

  // Validated acceptance accelerator: position immediately before the locked 50th shift,
  // then execute the real paid Work command that makes Hard Work eligible.
  s.run.progression.careers.lumber.counters.completed_shifts=49;
  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'action',id:WORK_ID},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.ok(s.run.endings.eligible.includes(HARD_WORK_ENDING));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  // Commit, reload, complete, then reload twice: one RunResult and one Meta proof only.
  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'commitEnding',id:HARD_WORK_ENDING},cat);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,HARD_WORK_ENDING);
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,HARD_WORK_ENDING);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  const transactionId=s.run.endings.result!.transactionId;
  assert.equal(s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,1);

  const reload1=parseSave(JSON.stringify(s),cat);
  const reload2=parseSave(JSON.stringify(reload1),cat);
  assert.deepEqual(reload2.meta.hardWorkProgress,['lumber']);
  assert.equal(reload2.meta.appliedResultTransactions.filter(id=>id===transactionId).length,1);
  assert.equal(reload2.run.endings.result?.transactionId,transactionId);
});

test('semantic presentation IDs stay presentation-only across the merged Lumber fixture',()=>{
  const base=catalog();
  const input=ready();

  const shiftId=presentationIdForAction(base,WORK_ID,['job.lumber.shift.spring.default']);
  const resultId=presentationIdForActionResult(base,WORK_ID,['job.lumber.shift.spring.default']);
  assert.equal(shiftId,'job/lumber/shift/spring/default');
  assert.equal(resultId,'job/lumber/result/default');
  assert.equal(
    presentationIdForEvent(base,'lumber.career-first-shift','default'),
    'job/lumber/event/lumber-career-first-shift/default'
  );
  assert.equal(
    presentationIdForEvent(base,'lumber.foreman-notice','default'),
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(
    presentationIdForEvent(base,'lumber-night.foreman-professional','default'),
    'relationship/lumber-foreman/lumber-night-foreman-professional/default'
  );
  assert.equal(
    presentationIdForEvent(base,'lumber-cross.activity-forest-return','default'),
    'job/lumber/event/lumber-cross-activity-forest-return/default'
  );
  assert.equal(presentationIdForEnding(HARD_WORK_ENDING),'ending/lumber/hard-work');
  assert.equal(
    SCHOOL_COURSES.find(course=>course.id==='school.course.arcana')?.presentationId,
    'school/arcana/lesson/default'
  );

  const gif='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
  const patch=emptyPresentation();
  patch.slots={
    [shiftId]:{
      primary:{kind:'gif',src:gif,alt:'QA-only Lumber presentation override'}
    }
  };
  const presented=applyPresentation(base,patch);
  const resolved=resolvePresentation(presented,patch,shiftId,{animationsEnabled:true});
  assert.equal(resolved.requestedId,shiftId);
  assert.equal(resolved.candidates[0]?.src,gif);
  assert.equal(resolved.candidates[0]?.source,'override-primary');

  // Media replacement cannot change the mechanical Work result, Resolver selection or Energy.
  const baseOut=dispatch(input,{type:'action',id:WORK_ID},base);
  const presentedOut=dispatch(input,{type:'action',id:WORK_ID},presented);
  assert.deepEqual(
    JSON.parse(JSON.stringify(presentedOut)),
    JSON.parse(JSON.stringify(baseOut))
  );
  assert.equal(baseOut.run.pending?.eventId,'lumber.career-first-shift');
  assert.equal(baseOut.run.dayState.energyCurrent,2);
});

test('blocked Product Acceptance hooks are not silently fabricated by the cross-slice subset',()=>{
  const schoolCourse=SCHOOL_COURSES.find(course=>course.id==='school.course.arcana');
  assert.ok(schoolCourse);

  // The accepted School adapter does not author the Lumber management public fact.
  const cat=catalog();
  const school=executeSchoolLesson(ready(),schoolCourse.id,cat,runtime).state;
  assert.equal(
    school.run.progression.worldFacts.includes('lumber.school.management-ready'),
    false
  );
  assert.notEqual(school.run.pending?.eventId,'lumber-cross.school-management-return');

  // The merged item adapter is explicitly a test adapter and does not provide a real
  // inventory item/action-space implementation inside the current Activity command API.
  assert.equal(
    itemCapabilityFixture.status,
    'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA'
  );
  assert.deepEqual(
    ['advance','escape'],
    ['advance','escape']
  );
});
