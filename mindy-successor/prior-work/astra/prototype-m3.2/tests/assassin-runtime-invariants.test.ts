import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contractPack=JSON.parse(readFileSync('content/packs/assassin-contract.json','utf8'));
const itemPack=JSON.parse(readFileSync('content/packs/assassin-items.json','utf8'));

test('Assassin preserves shipped ordinary-work unlock, seasonal tuning, and Hard Work authority',()=>{
 const action=definitions.actions.find((a:any)=>a.id==='assassin.shift');
 assert.ok(action);
 assert.deepEqual(action.cost,{money:0,energy:1});
 assert.deepEqual(action.conditions,[{kind:'any',conditions:[
  {kind:'all',conditions:[
   {kind:'stat',stat:'dexterity',op:'gte',value:30},
   {kind:'stat',stat:'wits',op:'gte',value:25},
   {kind:'stat',stat:'reason',op:'gte',value:20}
  ]},
  {kind:'calendarYear',op:'gte',value:3}
 ]}]);
 assert.deepEqual(action.wage,{base:15,weights:[
  {stat:'dexterity',factor:0.35},{stat:'wits',factor:0.3},
  {stat:'reason',factor:0.2},{stat:'manners',factor:0.1}
 ]});
 assert.deepEqual(action.scenes.map((x:any)=>x.id),['spring.default','summer.default','autumn.default','winter.default']);
 assert.deepEqual(action.seasonal,{
  spring:[{kind:'modifyStat',stat:'dexterity',delta:1},{kind:'modifyStat',stat:'wits',delta:1},{kind:'modifyStat',stat:'grooming',delta:-1}],
  summer:[{kind:'modifyStat',stat:'dexterity',delta:1},{kind:'modifyStat',stat:'manners',delta:1}],
  autumn:[{kind:'modifyStat',stat:'wits',delta:1},{kind:'modifyStat',stat:'reason',delta:1}],
  winter:[{kind:'modifyStat',stat:'dexterity',delta:1},{kind:'modifyStat',stat:'reason',delta:1},{kind:'modifyStat',stat:'sociability',delta:-1}]
 });
 const ending=definitions.endings.find((e:any)=>e.id==='ending.assassin.hard-work');
 assert.ok(ending);
 assert.deepEqual(ending.conditions,[{kind:'careerCounter',career:'assassin',counter:'completed_shifts',op:'gte',value:50}]);
 assert.equal(ending.reward,'assassin.hardwork.compat');
 assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:assassin',career:'assassin'}]);
 assert.deepEqual(definitions.endings.filter((e:any)=>e.id.startsWith('ending.assassin.')).map((e:any)=>e.id),['ending.assassin.hard-work']);
});

test('Assassin publishes career-scoped machines, narrow capabilities, Night hook, and advanced Activity',()=>{
 const career=definitions.careers.find((x:any)=>x.id==='assassin');
 assert.ok(career);
 assert.deepEqual(career.stages,['runner','operative','trusted-blade','veteran','ghost','turncoat','handler-takeover','refusal-chain','outcome-ready']);
 assert.ok(definitions.quests.some((x:any)=>x.id==='assassin.contract'));
 assert.ok(definitions.relationships.some((x:any)=>x.id==='assassin.handler'));
 const exactItems:any={
  assassin_concealed_toolset:['assassin_concealed_entry'],
  assassin_sealed_pass:['assassin_sealed_access'],
  assassin_disguise_kit:['assassin_context_disguise'],
  assassin_evidence_case:['assassin_handle_evidence']
 };
 for(const [id,caps] of Object.entries(exactItems)){
  const item=definitions.itemDefinitions.find((x:any)=>x.id===id);
  assert.ok(item,id); assert.deepEqual(item.capabilities,caps,id);
 }
 const activity=definitions.activities.find((x:any)=>x.id==='assassin.infiltration');
 assert.ok(activity);
 assert.equal(activity.adapter,'counter.v1');
 assert.equal(activity.entryEnergyCost,2);
 assert.ok(activity.entryConditions.some((c:any)=>c.kind==='careerFact'&&c.career==='assassin'&&c.fact==='infiltration-qualified'&&c.present===true));
 const night=definitions.nightChoices.find((x:any)=>x.id==='assassin.night.review-notes');
 assert.ok(night);
 assert.deepEqual(night.effects,[{kind:'addCareerFact',career:'assassin',fact:'night-notes-reviewed'}]);
 assert.equal(night.nextDayEnergyDelta,0);
});


test('Assassin contract prep survives the intentional Toolset priority collision without a shift threshold',()=>{
 const toolset=itemPack.events.find((e:any)=>e.id==='assassin.items.concealed-toolset');
 const prep=contractPack.events.find((e:any)=>e.id==='assassin.contract.prep');
 assert.ok(toolset);
 assert.ok(prep);
 assert.ok(toolset.priority>prep.priority,'Toolset must still win first so it can affect current-contract prep');
 assert.deepEqual(prep.reactionTriggers,[
  {kind:'questTransition',quest:'assassin.contract'},
  {kind:'actionCompleted',action:'assassin.shift'}
 ]);
 assert.deepEqual(prep.conditions,[{kind:'questStage',quest:'assassin.contract',stage:'intel'}]);
 assert.equal(JSON.stringify(prep).includes('careerCounter'),false);
 assert.equal(JSON.stringify(prep).includes('completed_shifts'),false);
});
