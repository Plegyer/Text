import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {freshSave,parseSave,type Command} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import type {SchoolCourseId} from '../src/core/school.ts';

type FixtureKey =
  | 'lumberWorkAction'
  | 'schoolAction'
  | 'lumberMilestoneEvent'
  | 'foremanRelationshipEvent'
  | 'normalLodging'
  | 'foremanNightChoice'
  | 'forestActivity'
  | 'forestAdvanceAction'
  | 'forestEscapeAction'
  | 'itemCapabilityAction'
  | 'lumberContinuationEvent'
  | 'hardWorkEnding'
  | 'complexLumberEnding';

type ApiName =
  | 'finishCreation'
  | 'action'
  | 'schoolLesson'
  | 'choice'
  | 'implicitResolver'
  | 'endDay'
  | 'chooseLodging'
  | 'chooseNightChoice'
  | 'enterActivity'
  | 'activityAction'
  | 'commitEnding'
  | 'completeEnding'
  | 'newLife'
  | 'saveReload';

type AssertionDomain =
  | 'state'
  | 'energy'
  | 'money'
  | 'calendar'
  | 'resolver'
  | 'presentation'
  | 'inventory'
  | 'activity'
  | 'ending'
  | 'meta';

type HarnessStep={
  id:string;
  label:string;
  apis:ApiName[];
  requires:FixtureKey[];
  assertions:AssertionDomain[];
  checkpoint?:string;
};

export const productAcceptanceSteps:HarnessStep[]=[
  {id:'PA00',label:'fresh run and HUD baseline',apis:['saveReload'],requires:[],assertions:['state','energy','money','calendar','presentation'],checkpoint:'fresh'},
  {id:'PA01',label:'finish character creation',apis:['finishCreation'],requires:[],assertions:['state','energy','money','calendar']},
  {id:'PA02',label:'enter Lumber career context',apis:['action','choice','implicitResolver'],requires:['lumberWorkAction'],assertions:['state','resolver']},
  {id:'PA03',label:'ordinary Lumber shift',apis:['action','saveReload'],requires:['lumberWorkAction'],assertions:['state','energy','money','calendar','presentation'],checkpoint:'after-shift'},
  {id:'PA04',label:'seasonal/repeatable Lumber variant',apis:['action','saveReload'],requires:['lumberWorkAction'],assertions:['state','energy','presentation'],checkpoint:'repeatable-variant'},
  {id:'PA05',label:'career milestone appears reactively',apis:['action','implicitResolver','saveReload'],requires:['lumberWorkAction','lumberMilestoneEvent'],assertions:['state','energy','resolver','presentation'],checkpoint:'pending-milestone'},
  {id:'PA06',label:'resolve milestone and Foreman opening',apis:['choice','implicitResolver','saveReload'],requires:['lumberMilestoneEvent','foremanRelationshipEvent'],assertions:['state','resolver','presentation'],checkpoint:'foreman-open'},
  {id:'PA07',label:'School lesson produces progress/public fact',apis:['schoolLesson','saveReload'],requires:['schoolAction'],assertions:['state','energy','money','resolver','presentation'],checkpoint:'school-result'},
  {id:'PA08',label:'School result triggers Lumber/relationship continuation',apis:['implicitResolver','saveReload'],requires:['lumberMilestoneEvent','foremanRelationshipEvent'],assertions:['state','resolver'],checkpoint:'pending-school-continuation'},
  {id:'PA09',label:'obtain meaningful item capability',apis:['choice','saveReload'],requires:['foremanRelationshipEvent'],assertions:['state','inventory','resolver'],checkpoint:'item-capability'},
  {id:'PA10',label:'begin NightFlow',apis:['endDay'],requires:[],assertions:['state','calendar','resolver']},
  {id:'PA11',label:'pay normal lodging exactly once',apis:['chooseLodging','saveReload'],requires:['normalLodging'],assertions:['state','money','calendar'],checkpoint:'paid-lodging'},
  {id:'PA12',label:'optional Foreman night beat',apis:['chooseNightChoice','choice','saveReload'],requires:['foremanNightChoice','foremanRelationshipEvent'],assertions:['state','energy','resolver','presentation'],checkpoint:'pending-night-relationship'},
  {id:'PA13',label:'finish night and start next day',apis:['choice','implicitResolver','saveReload'],requires:[],assertions:['state','energy','money','calendar'],checkpoint:'next-day'},
  {id:'PA14',label:'enter Forest Activity for 2 Energy',apis:['enterActivity','saveReload'],requires:['forestActivity'],assertions:['state','energy','activity','presentation'],checkpoint:'inside-activity-entry'},
  {id:'PA15',label:'reload/resume inside Forest Activity',apis:['saveReload'],requires:['forestActivity'],assertions:['state','energy','activity'],checkpoint:'inside-activity-resume'},
  {id:'PA16',label:'traverse Forest route/challenges',apis:['activityAction','saveReload'],requires:['forestActivity','forestAdvanceAction'],assertions:['state','energy','activity','presentation'],checkpoint:'activity-internal'},
  {id:'PA17',label:'use item capability to change available action',apis:['activityAction','saveReload'],requires:['itemCapabilityAction'],assertions:['state','inventory','activity'],checkpoint:'before-item-use'},
  {id:'PA18',label:'successful Forest result triggers Lumber continuation',apis:['activityAction','implicitResolver','saveReload'],requires:['forestActivity','forestAdvanceAction','lumberContinuationEvent'],assertions:['state','energy','activity','resolver'],checkpoint:'pending-post-activity'},
  {id:'PA19',label:'escape branch produces distinct result',apis:['activityAction','implicitResolver','saveReload'],requires:['forestActivity','forestEscapeAction'],assertions:['state','energy','activity','resolver'],checkpoint:'activity-escape'},
  {id:'PA20',label:'resolve post-Activity Lumber continuation',apis:['choice','implicitResolver','saveReload'],requires:['lumberContinuationEvent'],assertions:['state','energy','resolver'],checkpoint:'post-activity-continuation'},
  {id:'PA21',label:'two Lumber endings eligible without commitment',apis:['implicitResolver','saveReload'],requires:['hardWorkEnding','complexLumberEnding'],assertions:['state','ending','meta'],checkpoint:'eligible-not-committed'},
  {id:'PA22',label:'ordinary play remains available while endings are eligible',apis:['action','saveReload'],requires:['lumberWorkAction'],assertions:['state','energy','ending','meta'],checkpoint:'eligible-after-normal-action'},
  {id:'PA23',label:'explicit ending commitment',apis:['commitEnding','saveReload'],requires:['hardWorkEnding','complexLumberEnding'],assertions:['state','ending','meta','resolver'],checkpoint:'committed-before-completion'},
  {id:'PA24',label:'central completion creates RunResult once',apis:['completeEnding','saveReload'],requires:[],assertions:['state','ending','meta'],checkpoint:'completed'},
  {id:'PA25',label:'reward remains exactly once before New Run',apis:['saveReload'],requires:[],assertions:['state','ending','meta'],checkpoint:'reward-before-new-run'},
  {id:'PA26',label:'New Run preserves Meta and resets run-local start state',apis:['newLife','saveReload'],requires:[],assertions:['state','energy','money','calendar','meta'],checkpoint:'new-run'}
];

export interface ProductAcceptanceFixture {
  catalog:Catalog;
  initial:()=>Save;
  ids:Record<FixtureKey,string>;
  // Accelerator hooks may place a validated generated fixture immediately before
  // repetition-heavy product thresholds. They must not bypass the command under test.
  reachMilestone?:(state:Save)=>Save;
  reachTwoEndings?:(state:Save)=>Save;
}

export function saveReloadCheckpoint(state:Save,catalog:Catalog):Save{
  return parseSave(JSON.stringify(state),catalog);
}

export function currentCommandAdapters(ids:Record<FixtureKey,string>):Record<Exclude<ApiName,'implicitResolver'|'saveReload'>,Command>{
  return {
    finishCreation:{type:'finishCreation'},
    action:{type:'action',id:ids.lumberWorkAction},
    schoolLesson:{type:'schoolLesson',id:ids.schoolAction as SchoolCourseId},
    choice:{type:'choice',id:'fixture-choice'},
    endDay:{type:'endDay'},
    chooseLodging:{type:'chooseLodging',id:ids.normalLodging},
    chooseNightChoice:{type:'chooseNightChoice',id:ids.foremanNightChoice},
    enterActivity:{type:'enterActivity',id:ids.forestActivity},
    activityAction:{type:'activityAction',id:'advance'},
    commitEnding:{type:'commitEnding',id:ids.hardWorkEnding},
    completeEnding:{type:'completeEnding'},
    newLife:{type:'newLife'}
  };
}

test('Product Acceptance harness has one ordered row for every PA00-PA26 step',()=>{
  assert.equal(productAcceptanceSteps.length,27);
  assert.deepEqual(productAcceptanceSteps.map((s,i)=>s.id),Array.from({length:27},(_,i)=>`PA${String(i).padStart(2,'0')}`));
  assert.equal(new Set(productAcceptanceSteps.map(s=>s.id)).size,27);
  for(const step of productAcceptanceSteps){
    assert.ok(step.apis.length>0,`${step.id} must map to at least one current API`);
    assert.ok(step.assertions.length>0,`${step.id} must define observable assertions`);
  }
});

test('mandatory product save/reload checkpoints are explicit in the harness table',()=>{
  const required=['PA00','PA03','PA05','PA07','PA08','PA11','PA12','PA13','PA14','PA15','PA18','PA21','PA23','PA24','PA25','PA26'];
  for(const id of required){
    const step=productAcceptanceSteps.find(x=>x.id===id)!;
    assert.ok(step.apis.includes('saveReload'),`${id} must execute a save/reload checkpoint`);
    assert.ok(step.checkpoint,`${id} must name the checkpoint`);
  }
});

test('harness command adapters are typed against the current engine Command API',()=>{
  const ids=Object.fromEntries([
    'lumberWorkAction','schoolAction','lumberMilestoneEvent','foremanRelationshipEvent','normalLodging','foremanNightChoice',
    'forestActivity','forestAdvanceAction','forestEscapeAction','itemCapabilityAction','lumberContinuationEvent','hardWorkEnding','complexLumberEnding'
  ].map(k=>[k,`fixture.${k}`])) as Record<FixtureKey,string>;
  const commands=currentCommandAdapters(ids);
  assert.deepEqual(Object.keys(commands).sort(),[
    'action','activityAction','choice','chooseLodging','chooseNightChoice','commitEnding','completeEnding','endDay','enterActivity','finishCreation','newLife','schoolLesson'
  ]);
  assert.equal(commands.enterActivity.type,'enterActivity');
  assert.equal(commands.completeEnding.type,'completeEnding');
  assert.equal(commands.newLife.type,'newLife');
});

test('save/reload checkpoint helper uses the real parser and preserves normalized fixture state',()=>{
  const catalog=loadCatalog({version:'0.1.0',flags:[],actions:[],endings:[]},[]);
  const s=freshSave();
  const restored=saveReloadCheckpoint(s,catalog);
  assert.deepEqual(JSON.parse(JSON.stringify(restored)),JSON.parse(JSON.stringify(s)));
});

/*
Actual product execution is intentionally not claimed here.

The next integration fixture must supply real integrated catalog IDs through
ProductAcceptanceFixture and execute productAcceptanceSteps in order. This
skeleton deliberately does not invent Lumber/Foreman/Forest/School production
IDs, thresholds, wages, item rewards, or ending conditions.
*/
