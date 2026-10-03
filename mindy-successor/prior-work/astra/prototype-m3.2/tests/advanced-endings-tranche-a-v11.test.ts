import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,freshSave,palaceAvailable,parseSave} from '../src/core/engine.ts';
import {
  D41_AUTOMATIC_REWARD_BY_ENDING,
  D41_ENDING_IDS,
  D41_SPECIALIST_BINDINGS,
  D41_SPECIALIST_REWARD_IDS,
  d41PendingSpecialistRewardIds,
  migrateD41MetaData
} from '../src/core/advancedEndingsD41.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

type CareerId='lumber'|'satyr-maid'|'undead-farm'|'tavern'|'hunter';

function career(s:Save,id:CareerId,stage:string,counters:Record<string,number>,facts:string[]){
  s.run.progression.careers[id]={stage,shifts:0,counters:{...counters},choices:{},facts:[...facts]};
}
function relationship(
  s:Save,id:string,stage:string,counters:Record<string,number>,
  choices:Record<string,string>,facts:string[]=[]
){
  s.run.progression.relationships[id]={stage,counters:{...counters},choices:{...choices},facts:[...facts]};
}
function settlePending(input:Save){
  let s=input,guard=0;
  while(s.run.pending){
    if(++guard>40)throw new Error('D41 test pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choice=event.choices.find(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}
function fixture(id:string):Save{
  const s=started();
  switch(id){
    case D41_ENDING_IDS.lumberForewoman:
      career(s,'lumber','trusted-worker',{completed_shifts:8},['management-school-ready','forewoman-problem-resolved']);
      relationship(s,'lumber.foreman','route-professional',{}, {route:'professional'});
      break;
    case D41_ENDING_IDS.lumberForest:
      career(s,'lumber','trusted-worker',{completed_shifts:8},['forest-specimen-catalogued','forest-truth-known','forest-problem-resolved']);
      break;
    case D41_ENDING_IDS.satyrHousePower:
      career(s,'satyr-maid','veteran-service',{completed_shifts:15},[
        'crisis-house-power','house-power-ready','crisis-resolved','school-management-ready'
      ]);
      break;
    case D41_ENDING_IDS.satyrPersonalNetwork:
      career(s,'satyr-maid','veteran-service',{completed_shifts:15},['personal-network-ready']);
      relationship(s,'satyr-maid.recurring-guest','request-resolved',
        {'service-meetings':2,'night-meetings':1},
        {'night-response':'accepted','request-response':'accepted'},
        ['request-resolved']);
      break;
    case D41_ENDING_IDS.satyrBoundaryMastery:
      career(s,'satyr-maid','veteran-service',{completed_shifts:15},[
        'school-boundaries-ready','crisis-boundaries','boundaries-ready','crisis-resolved'
      ]);
      relationship(s,'satyr-maid.recurring-guest','professional-trust',
        {'service-meetings':2},{'night-response':'declined'},['night-declined']);
      break;
    case D41_ENDING_IDS.farmResearch:
      career(s,'undead-farm','research',{completed_shifts:15},[
        'process-keeper-ready','school-research-ready','sample-preserved',
        'crisis-research','research-ready','crisis-resolved'
      ]);
      break;
    case D41_ENDING_IDS.farmSuccessor:
      career(s,'undead-farm','successor',{completed_shifts:15},[
        'process-keeper-ready','school-management-ready','successor-ready',
        'crisis-successor','crisis-resolved'
      ]);
      relationship(s,'undead-farm.keeper','partner-ready',
        {'work-meetings':2,'night-meetings':1},
        {'night-response':'accepted','request-response':'accepted'},['request-resolved']);
      break;
    case D41_ENDING_IDS.farmExternalAnomaly:
      career(s,'undead-farm','external-anomaly',{completed_shifts:15},[
        'process-keeper-ready','school-research-ready','sample-preserved',
        'activity-source-returned','external-anomaly-ready'
      ]);
      break;
    case D41_ENDING_IDS.tavernInnkeeper:
      career(s,'tavern','innkeeper',{completed_shifts:15,supply_pressure:2},[
        'house-node-ready','school-records-ready','guest-ledger-evidence-ready',
        'crisis-innkeeper','innkeeper-ready','crisis-resolved'
      ]);
      s.run.resources.inventory.tavern_staff_key=1;
      break;
    case D41_ENDING_IDS.tavernInformationBroker:
      career(s,'tavern','information-broker',{completed_shifts:15},[
        'house-node-ready','school-broker-ready','traveler-rumour-known','rumour-route-open',
        'rumour-confirmed','confidentiality-resolved','crisis-broker',
        'information-broker-ready','crisis-resolved'
      ]);
      relationship(s,'tavern.recurring-traveler','confidentiality-shared',
        {'night-meetings':1},
        {'night-response':'accepted','request-response':'accepted','confidentiality-response':'share-route-only'});
      break;
    case D41_ENDING_IDS.tavernSanctuary:
      career(s,'tavern','sanctuary',{completed_shifts:15,shelter_pressure:2},[
        'house-node-ready','housing-assistance-complete','confidentiality-kept',
        'crisis-sanctuary','sanctuary-ready','crisis-resolved'
      ]);
      relationship(s,'tavern.recurring-traveler','confidentiality-kept',
        {'night-meetings':1},
        {'night-response':'accepted','request-response':'accepted','confidentiality-response':'keep-private'});
      break;
    case D41_ENDING_IDS.hunterMaster:
      career(s,'hunter','master-hunter',{
        completed_shifts:8,spring_contracts:1,summer_contracts:1,autumn_contracts:1,winter_contracts:1,
        successful_expeditions:2
      },[
        'recognized-ready','expedition-preserved-sample','expedition-rough-route',
        'rare-contract-ready','master-route-ready'
      ]);
      break;
    case D41_ENDING_IDS.hunterWarden:
      career(s,'hunter','warden',{completed_shifts:8,protected_routes:1},[
        'recognized-ready','relationship-trust-ready','protected-route-choice',
        'warden-route-ready','forest-clue-known'
      ]);
      relationship(s,'hunter.senior-guide','route-resolved',{}, {'conflict-response':'cooperate'});
      break;
    case D41_ENDING_IDS.hunterLegend:
      career(s,'hunter','legend',{completed_shifts:8,successful_expeditions:3},[
        'recognized-ready','rare-contract-ready','forest-clue-known','tavern-clue-known',
        'lumber-clue-known','rare-contract-active','rare-contract-complete','legend-route-ready'
      ]);
      break;
    default: throw new Error('unknown D41 ending '+id);
  }
  return s;
}

const allIds=Object.values(D41_ENDING_IDS);
const minimumShift:Readonly<Record<string,{career:CareerId;value:number}>>={
  [D41_ENDING_IDS.lumberForewoman]:{career:'lumber',value:8},
  [D41_ENDING_IDS.lumberForest]:{career:'lumber',value:8},
  [D41_ENDING_IDS.satyrHousePower]:{career:'satyr-maid',value:15},
  [D41_ENDING_IDS.satyrPersonalNetwork]:{career:'satyr-maid',value:15},
  [D41_ENDING_IDS.satyrBoundaryMastery]:{career:'satyr-maid',value:15},
  [D41_ENDING_IDS.farmResearch]:{career:'undead-farm',value:15},
  [D41_ENDING_IDS.farmSuccessor]:{career:'undead-farm',value:15},
  [D41_ENDING_IDS.farmExternalAnomaly]:{career:'undead-farm',value:15},
  [D41_ENDING_IDS.tavernInnkeeper]:{career:'tavern',value:15},
  [D41_ENDING_IDS.tavernInformationBroker]:{career:'tavern',value:15},
  [D41_ENDING_IDS.tavernSanctuary]:{career:'tavern',value:15},
  [D41_ENDING_IDS.hunterMaster]:{career:'hunter',value:8},
  [D41_ENDING_IDS.hunterWarden]:{career:'hunter',value:8},
  [D41_ENDING_IDS.hunterLegend]:{career:'hunter',value:8}
};

test('D41 exposes exactly fourteen canonical advanced ending IDs and retires legacy Tavern contracts',()=>{
  assert.equal(allIds.length,14);
  assert.equal(new Set(allIds).size,14);
  for(const id of allIds)assert.ok(catalog.definitions.endings.some(e=>e.id===id),id);
  for(const id of ['tavern-stay','tavern-guild','tavern-court']){
    assert.equal(catalog.definitions.endings.some(e=>e.id===id),false,id);
  }
});

test('all fourteen D41 endings satisfy their authored route fixture and fail below the exact shift gate',()=>{
  for(const id of allIds){
    const ending=catalog.definitions.endings.find(e=>e.id===id);
    assert.ok(ending,id);
    const s=fixture(id);
    assert.equal(eligible(ending.conditions,s,catalog),true,id);

    const gate=minimumShift[id]!;
    s.run.progression.careers[gate.career]!.counters.completed_shifts=gate.value-1;
    assert.equal(eligible(ending.conditions,s,catalog),false,id+' below minimum shifts');
  }
});

test('stage milestone gates cannot be bypassed by counters alone',()=>{
  for(const id of [D41_ENDING_IDS.lumberForewoman,D41_ENDING_IDS.lumberForest]){
    const s=fixture(id);
    s.run.progression.careers.lumber!.stage='accepted-hand';
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    assert.equal(eligible(ending.conditions,s,catalog),false,id);
  }
  for(const id of [D41_ENDING_IDS.satyrHousePower,D41_ENDING_IDS.satyrPersonalNetwork,D41_ENDING_IDS.satyrBoundaryMastery]){
    const s=fixture(id);
    s.run.progression.careers['satyr-maid']!.stage='house-regular';
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    assert.equal(eligible(ending.conditions,s,catalog),false,id);
  }
  for(const id of [D41_ENDING_IDS.farmResearch,D41_ENDING_IDS.farmSuccessor,D41_ENDING_IDS.farmExternalAnomaly]){
    const s=fixture(id);
    s.run.progression.careers['undead-farm']!.facts=
      s.run.progression.careers['undead-farm']!.facts.filter(f=>f!=='process-keeper-ready');
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    assert.equal(eligible(ending.conditions,s,catalog),false,id);
  }
  for(const id of [D41_ENDING_IDS.tavernInnkeeper,D41_ENDING_IDS.tavernInformationBroker,D41_ENDING_IDS.tavernSanctuary]){
    const s=fixture(id);
    s.run.progression.careers.tavern!.facts=s.run.progression.careers.tavern!.facts.filter(f=>f!=='house-node-ready');
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    assert.equal(eligible(ending.conditions,s,catalog),false,id);
  }
  for(const id of [D41_ENDING_IDS.hunterMaster,D41_ENDING_IDS.hunterWarden,D41_ENDING_IDS.hunterLegend]){
    const s=fixture(id);
    s.run.progression.careers.hunter!.facts=s.run.progression.careers.hunter!.facts.filter(f=>f!=='recognized-ready');
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    assert.equal(eligible(ending.conditions,s,catalog),false,id);
  }
});

test('D41 preserves consent and Activity distinctions',()=>{
  let s=fixture(D41_ENDING_IDS.satyrBoundaryMastery);
  let ending=catalog.definitions.endings.find(e=>e.id===D41_ENDING_IDS.satyrBoundaryMastery)!;
  s.run.progression.relationships['satyr-maid.recurring-guest']!.choices['night-response']='accepted';
  assert.equal(eligible(ending.conditions,s,catalog),false,'Boundary Mastery requires explicit decline');

  s=fixture(D41_ENDING_IDS.satyrPersonalNetwork);
  ending=catalog.definitions.endings.find(e=>e.id===D41_ENDING_IDS.satyrPersonalNetwork)!;
  s.run.progression.relationships['satyr-maid.recurring-guest']!.counters['night-meetings']=0;
  assert.equal(eligible(ending.conditions,s,catalog),false,'Personal Network requires actual voluntary Night meeting');

  s=fixture(D41_ENDING_IDS.hunterWarden);
  ending=catalog.definitions.endings.find(e=>e.id===D41_ENDING_IDS.hunterWarden)!;
  assert.equal(eligible(ending.conditions,s,catalog),true,'Warden has no mandatory Activity completion');

  s=fixture(D41_ENDING_IDS.hunterLegend);
  ending=catalog.definitions.endings.find(e=>e.id===D41_ENDING_IDS.hunterLegend)!;
  s.run.progression.careers.hunter!.counters.successful_expeditions=2;
  assert.equal(eligible(ending.conditions,s,catalog),false,'Legend requires the third successful expedition after master preparation');
});

test('D16 allows overlapping D41 endings, persists eligibility, and requires explicit commit',()=>{
  let s=fixture(D41_ENDING_IDS.hunterLegend);
  const h=s.run.progression.careers.hunter!;
  Object.assign(h.counters,{
    spring_contracts:1,summer_contracts:1,autumn_contracts:1,winter_contracts:1,
    successful_expeditions:3,protected_routes:1
  });
  for(const fact of [
    'expedition-preserved-sample','expedition-rough-route','master-route-ready',
    'relationship-trust-ready','protected-route-choice','warden-route-ready'
  ])if(!h.facts.includes(fact))h.facts.push(fact);
  relationship(s,'hunter.senior-guide','route-resolved',{}, {'conflict-response':'cooperate'});

  s=settlePending(dispatch(s,{type:'action',id:'lumber.shift'},catalog));
  for(const id of [D41_ENDING_IDS.hunterMaster,D41_ENDING_IDS.hunterWarden,D41_ENDING_IDS.hunterLegend]){
    assert.ok(s.run.endings.eligible.includes(id),id);
  }
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);

  const restored=parseSave(JSON.stringify(s),catalog);
  for(const id of [D41_ENDING_IDS.hunterMaster,D41_ENDING_IDS.hunterWarden,D41_ENDING_IDS.hunterLegend]){
    assert.ok(restored.run.endings.eligible.includes(id),id+' after reload');
  }
  assert.equal(restored.run.status,'active');

  const committed=dispatch(restored,{type:'commitEnding',id:D41_ENDING_IDS.hunterWarden},catalog);
  assert.equal(committed.run.status,'ending_committed');
  assert.equal(committed.run.endings.result,null);
  const completed=dispatch(committed,{type:'completeEnding'},catalog);
  assert.equal(completed.run.status,'ended');
  assert.equal(completed.run.endings.result?.endingId,D41_ENDING_IDS.hunterWarden);
});

test('automatic D41 knowledge/content rewards grant once through existing Meta unlocks',()=>{
  for(const [endingId,rewardId] of Object.entries(D41_AUTOMATIC_REWARD_BY_ENDING)){
    let s=fixture(endingId);
    const ending=catalog.definitions.endings.find(e=>e.id===endingId)!;
    assert.equal(eligible(ending.conditions,s,catalog),true,endingId);
    s.run.endings.eligible=[endingId];
    s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
    s=dispatch(s,{type:'completeEnding'},catalog);
    assert.ok(s.meta.unlocks.includes(rewardId),endingId);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[rewardId],endingId);
  }
});

test('Specialist endings keep exact IDs and no generic fallback while strong-Meta is absent',()=>{
  assert.equal(D41_SPECIALIST_BINDINGS.length,9);
  assert.equal(new Set(D41_SPECIALIST_BINDINGS.map(x=>x.rewardId)).size,9);
  for(const binding of D41_SPECIALIST_BINDINGS){
    const ending=catalog.definitions.endings.find(e=>e.id===binding.endingId);
    assert.ok(ending,binding.endingId);
    assert.equal(ending.reward,binding.rewardId,binding.endingId);
    assert.deepEqual(ending.metaRewards,[],binding.endingId);
    assert.equal(binding.rewardClass,'specialist');
  }
  assert.deepEqual(
    new Set(D41_SPECIALIST_BINDINGS.map(x=>x.rewardId)),
    new Set(Object.values(D41_SPECIALIST_REWARD_IDS))
  );
});

test('D41 migration is idempotent, retires Tavern legacy and House Power +600, and preserves D23',()=>{
  const migrated=migrateD41MetaData({
    completedEndings:[
      'tavern-stay','tavern-guild','tavern-court',
      D41_ENDING_IDS.satyrHousePower,D41_ENDING_IDS.satyrBoundaryMastery
    ],
    unlocks:['host','mediator','court','satyr-maid.house-credit']
  });
  const twice=migrateD41MetaData(migrated);
  assert.deepEqual(twice,migrated);
  assert.deepEqual(migrated.completedEndings,[
    D41_ENDING_IDS.tavernInnkeeper,
    D41_ENDING_IDS.tavernSanctuary,
    D41_ENDING_IDS.tavernInformationBroker,
    D41_ENDING_IDS.satyrHousePower,
    D41_ENDING_IDS.satyrBoundaryMastery
  ]);
  assert.equal(migrated.unlocks.includes('host'),false);
  assert.equal(migrated.unlocks.includes('mediator'),false);
  assert.equal(migrated.unlocks.includes('court'),false);
  assert.equal(migrated.unlocks.includes('satyr-maid.house-credit'),false);
  assert.ok(migrated.unlocks.includes('knowledge.tavern.broker-index'));
  assert.ok(migrated.unlocks.includes('satyr-maid.clear-terms'));

  const s=freshSave({
    completedEndings:migrated.completedEndings,
    unlocks:['satyr-maid.house-credit'],
    hardWorkProgress:[]
  });
  assert.equal(s.run.resources.money,600,'House Power no longer grants broad +600 starting money');
  assert.equal(s.meta.unlocks.includes('satyr-maid.house-credit'),false);
  assert.equal(palaceAvailable(s.meta,[]),false,'D41 rewards cannot bypass D23 Palace gate');

  assert.deepEqual(d41PendingSpecialistRewardIds(migrated.completedEndings),[
    'specialist.satyr-maid.house-ledger',
    'specialist.tavern.house-ledger',
    'specialist.tavern.safehouse-network'
  ]);
});

test('completed legacy Tavern saves migrate canonically; uncompleted eligibility is retired',()=>{
  const raw=started();
  raw.meta.completedEndings=['tavern-court'];
  raw.meta.unlocks=['court'];
  raw.meta.appliedResultTransactions=['tx.legacy-tavern-court'];
  raw.run.status='ended';
  raw.run.endings.eligible=['tavern-court'];
  raw.run.endings.committed='tavern-court';
  raw.run.endings.result={
    resultId:'result.legacy-tavern-court',
    endingId:'tavern-court',
    transactionId:'tx.legacy-tavern-court',
    completedAtDay:raw.run.day,
    firstCompletion:true,
    appliedMetaRewardIds:['court']
  };

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.deepEqual(migrated.meta.completedEndings,[D41_ENDING_IDS.tavernInformationBroker]);
  assert.equal(migrated.meta.unlocks.includes('court'),false);
  assert.ok(migrated.meta.unlocks.includes('knowledge.tavern.broker-index'));
  assert.equal(migrated.run.endings.committed,D41_ENDING_IDS.tavernInformationBroker);
  assert.equal(migrated.run.endings.result?.endingId,D41_ENDING_IDS.tavernInformationBroker);
  assert.equal(migrated.run.endings.eligible.includes('tavern-court'),false);

  const twice=parseSave(JSON.stringify(migrated),catalog);
  assert.deepEqual(twice.meta.completedEndings,migrated.meta.completedEndings);
  assert.deepEqual(twice.meta.unlocks,migrated.meta.unlocks);
});
