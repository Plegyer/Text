import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/prostitute-authored-v21-inventory.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const school=JSON.parse(readFileSync('content/school-prostitute-preparation-v1.fixture.json','utf8'));

const action=definitions.actions.find((x:any)=>x.id==='prostitute.shift');
const career=definitions.careers.find((x:any)=>x.id==='prostitute');
const ending=definitions.endings.find((x:any)=>x.id==='ending.prostitute.hard-work');

test('C3-229 exact shipped Prostitute action authority is narrow and unchanged',()=>{
  assert.equal(inventory.status,'SAFE_PREP_ONLY_SHIPPED_AUTHORITY_NARROW');
  assert.equal(inventory.activation.branchStart,'a1e2061f93b24d063c182236edc53bf9502c2d75');
  assert.ok(action);
  assert.equal(action.cost.energy,inventory.shipped.action.energyCost);
  assert.deepEqual(action.conditions,[{
    kind:'any',
    conditions:[
      {kind:'all',conditions:[
        {kind:'stat',stat:'sexuality',op:'gte',value:55},
        {kind:'stat',stat:'charm',op:'gte',value:40},
        {kind:'stat',stat:'sociability',op:'gte',value:35},
      ]},
      {kind:'calendarYear',op:'gte',value:3},
    ],
  }]);
  assert.deepEqual(action.effects,[{kind:'incrementCareerCounter',career:'prostitute',counter:'completed_shifts',amount:1}]);
  assert.equal(action.wage.base,15);
  assert.deepEqual(action.wage.weights,[
    {stat:'sexuality',factor:0.35},
    {stat:'charm',factor:0.30},
    {stat:'manners',factor:0.20},
    {stat:'endurance',factor:0.15},
  ]);
  assert.deepEqual(action.scenes.map((x:any)=>x.id),['spring.default','summer.default','autumn.default','winter.default']);
  assert.deepEqual(action.scenes.map((x:any)=>x.media),[['stage.room'],['stage.room'],['stage.room'],['stage.room']]);
  assert.deepEqual(action.scenes.map((x:any)=>x.conditions),[
    [],
    [{kind:'calendarSeason',value:'summer'}],
    [{kind:'calendarSeason',value:'autumn'}],
    [{kind:'calendarSeason',value:'winter'}],
  ]);
  assert.deepEqual(action.seasonal,{
    spring:[{kind:'modifyStat',stat:'sexuality',delta:1},{kind:'modifyStat',stat:'charm',delta:1}],
    summer:[{kind:'modifyStat',stat:'charm',delta:1},{kind:'modifyStat',stat:'endurance',delta:1}],
    autumn:[{kind:'modifyStat',stat:'manners',delta:1},{kind:'modifyStat',stat:'sexuality',delta:1}],
    winter:[{kind:'modifyStat',stat:'charm',delta:1},{kind:'modifyStat',stat:'manners',delta:1}],
  });
});

test('C3-229 shipped career and Hard Work identity are the only exact career progression authority',()=>{
  assert.deepEqual(career,{
    id:'prostitute',
    label:'Professional',
    initialStage:'new-independent-worker',
    stages:['new-independent-worker'],
    transitions:[],
  });
  assert.equal(ending.id,'ending.prostitute.hard-work');
  assert.deepEqual(ending.conditions,[{kind:'careerCounter',career:'prostitute',counter:'completed_shifts',op:'gte',value:50}]);
  assert.equal(ending.reward,'prostitute.hardwork.compat');
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:prostitute',career:'prostitute'}]);
  assert.equal(inventory.shipped.ending.metaRewardId,'hardWork:prostitute');
});

test('C3-229 current authored localization and static presentation surfaces exist without creating new consumers',()=>{
  for(const key of inventory.shipped.authoredLocalizationKeys){
    const entry=localization.strings[key];
    assert.equal(typeof entry?.ru,'string',key+' ru');
    assert.equal(typeof entry?.en,'string',key+' en');
  }
  for(const family of [
    ...inventory.shipped.presentation.seasonalLocalizationFamilies,
    inventory.shipped.presentation.resultLocalizationFamily,
    inventory.shipped.presentation.endingLocalizationFamily,
  ]){
    const alt=localization.strings[family+'.alt'];
    const caption=localization.strings[family+'.caption'];
    assert.equal(typeof alt?.ru,'string',family+' alt.ru');
    assert.equal(typeof alt?.en,'string',family+' alt.en');
    assert.equal(typeof caption?.ru,'string',family+' caption.ru');
    assert.equal(typeof caption?.en,'string',family+' caption.en');
  }
});

test('C3-229 School authority remains copy-only with no producer threshold or mechanics',()=>{
  assert.equal(school.status,'CONTENT_PREP_ONLY');
  assert.equal(school.targetCareerId,'prostitute');
  assert.equal(school.targetActionId,'prostitute.shift');
  assert.deepEqual(school.mappings.map((x:any)=>x.courseId),inventory.shipped.schoolPrep.courseIds);
  assert.equal(school.selectedThreshold,null);
  assert.equal(school.selectedPublicFactId,null);
  assert.deepEqual(school.mechanics,{
    effects:[],lustEffects:[],consentRuleChanges:[],careerWrites:[],nightFlowChanges:[],publishesWorldFacts:[],
  });
});

test('C3-229 draft-only breadth stays pending while shipped Hard Work remains live',()=>{
  const pendingStages=inventory.draftVsProduction.careerStages.filter((x:any)=>x.runtimeId==='PENDING_RUNTIME_ID');
  assert.equal(pendingStages.length,7);
  const hard=inventory.draftVsProduction.outcomes.find((x:any)=>x.draft==='Hard Work');
  assert.deepEqual(hard,{draft:'Hard Work',runtimeId:'ending.prostitute.hard-work',status:'LIVE_BOUND'});
  for(const outcome of inventory.draftVsProduction.outcomes.filter((x:any)=>x.draft!=='Hard Work')){
    assert.equal(outcome.runtimeId,'PENDING_RUNTIME_ID',outcome.draft);
  }
  assert.equal(inventory.draftVsProduction.relationships.runtimeId,'PENDING_RUNTIME_ID');
  assert.equal(inventory.draftVsProduction.night.voluntaryCareerNightConsumers,'PENDING_RUNTIME_ID');
  assert.equal(inventory.draftVsProduction.night.secretDebtForcedNightConsumers,'PENDING_RUNTIME_ID');
  for(const item of inventory.draftVsProduction.itemConcepts)assert.equal(item.runtimeId,'PENDING_RUNTIME_ID',item.concept);
  for(const value of Object.values(inventory.draftVsProduction.schoolProducerAuthority).filter((x:any)=>x!=='Existing School copy is preparatory/reactive content only; selectedThreshold and selectedPublicFactId remain null.')){
    assert.equal(value,'NO_AUTHORITY_NOT_BINDABLE');
  }
});

test('C3-229 adult-core product direction does not fabricate runtime authority',()=>{
  const adult=inventory.draftVsProduction.adultCoreDirection;
  assert.equal(adult.status,'PRODUCT_DIRECTION_NOT_RUNTIME_AUTHORITY');
  for(const [key,value] of Object.entries(adult)){
    if(key==='status')continue;
    assert.equal(value,'PENDING_RUNTIME_ID',key);
  }
  assert.equal(inventory.shipped.secretDebtRuntime.dedicatedSecretDebtIdentityPresent,false);
  assert.equal(inventory.shipped.secretDebtRuntime.dedicatedForcedNightIdentityPresent,false);
  for(const [key,value] of Object.entries(inventory.invariants)){
    if(key==='finalRuntimeBindingDeferred')assert.equal(value,true,key);
    else assert.equal(value,false,key);
  }
  assert.ok(inventory.forbiddenAssumptions.includes('ordinaryProstituteEqualsSecretDebt'));
  assert.ok(inventory.forbiddenAssumptions.includes('confidenceOrPresentationEqualsConsent'));
  assert.ok(inventory.forbiddenAssumptions.includes('recurringClientAutomaticallyRomance'));
  assert.ok(inventory.forbiddenAssumptions.includes('newPublicEndingIds'));
});
