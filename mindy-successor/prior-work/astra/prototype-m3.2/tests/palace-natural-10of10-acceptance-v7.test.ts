import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {ordinaryHardWorkCareers} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const fixture=JSON.parse(readFileSync('content/palace-natural-10of10-acceptance-v7.fixture.json','utf8'));

const ordinary=[...ordinaryHardWorkCareers];
const ordinarySet=new Set<string>(ordinary);

function qualifies(
  permanent:readonly string[],
  active:readonly string[]
){
  const earned=new Set(permanent);
  const selected=new Set(active);
  return ordinary.every(career=>earned.has(career))
    && ordinary.every(career=>selected.has(career));
}

type InvitationState={
  qualified:boolean;
  invitation:'none'|'queued'|'pending'|'accepted';
  pendingEventId:string|null;
  accessFacts:string[];
  shows:number;
};

function freshContractState(qualified:boolean):InvitationState{
  return {
    qualified,
    invitation:'none',
    pendingEventId:null,
    accessFacts:[],
    shows:0
  };
}

function onCreationCompleted(input:InvitationState):InvitationState{
  const state=structuredClone(input);
  if(!state.qualified||state.invitation!=='none')return state;
  state.invitation='queued';
  return state;
}

function presentInvitation(input:InvitationState):InvitationState{
  const state=structuredClone(input);
  if(state.invitation!=='queued')return state;
  state.invitation='pending';
  state.pendingEventId=fixture.invitationContract.arrivalEventId;
  state.shows++;
  return state;
}

function advanceToAcceptanceScene(input:InvitationState):InvitationState{
  const state=structuredClone(input);
  if(state.invitation!=='pending')return state;
  state.pendingEventId=fixture.invitationContract.acceptanceSceneId;
  return state;
}

function acceptInvitation(input:InvitationState):InvitationState{
  const state=structuredClone(input);
  if(state.invitation!=='pending'||state.pendingEventId!==fixture.invitationContract.acceptanceSceneId)return state;
  state.invitation='accepted';
  state.pendingEventId=null;
  if(!state.accessFacts.includes(fixture.invitationContract.accessFact)){
    state.accessFacts.push(fixture.invitationContract.accessFact);
  }
  return state;
}

function reload<T>(value:T):T{
  return JSON.parse(JSON.stringify(value));
}

test('shipped ordinary Hard Work roster is exactly the locked ten and excludes Secret Debt and Palace',()=>{
  assert.deepEqual(ordinary,fixture.shippedRoster.ordinaryCareers);
  assert.equal(ordinary.length,10);
  assert.equal(new Set(ordinary).size,10);

  const careerIds=(definitions.careers??[]).map((career:any)=>career.id);
  assert.equal(careerIds.length,10,'shipped career machine roster must contain exactly the ten ordinary careers');
  assert.deepEqual(new Set(careerIds),new Set(ordinary));

  assert.equal(ordinarySet.has('secret-debt'),false);
  assert.equal(ordinarySet.has('palace'),false);
  assert.deepEqual(fixture.shippedRoster.excluded,['secret-debt','palace']);
});

test('each shipped ordinary career has exactly one real Hard Work ending at completed_shifts >= 50',()=>{
  const hardWorkRewards=definitions.endings.flatMap((ending:any)=>
    (ending.metaRewards??[])
      .filter((reward:any)=>reward.kind==='hardWork')
      .map((reward:any)=>({ending,reward}))
  );

  assert.equal(hardWorkRewards.length,10);

  for(const expected of fixture.shippedRoster.hardWorkEndings){
    const matches=hardWorkRewards.filter((row:any)=>row.reward.career===expected.career);
    assert.equal(matches.length,1,expected.career);

    const {ending,reward}=matches[0];
    assert.equal(ending.id,expected.endingId);
    assert.equal(reward.rewardId,expected.rewardId);
    assert.equal(reward.career,expected.career);

    assert.deepEqual(ending.conditions,[{
      kind:'careerCounter',
      career:expected.career,
      counter:'completed_shifts',
      op:'gte',
      value:50
    }],expected.career);
  }
});

test('Secret Debt and Palace have no ordinary Hard Work reward and cannot enter the 10-career ledger',()=>{
  const hardWorkRewards=definitions.endings.flatMap((ending:any)=>
    (ending.metaRewards??[]).filter((reward:any)=>reward.kind==='hardWork')
  );

  assert.equal(hardWorkRewards.some((reward:any)=>reward.career==='secret-debt'),false);
  assert.equal(hardWorkRewards.some((reward:any)=>reward.career==='palace'),false);
  assert.equal((definitions.careers??[]).some((career:any)=>career.id==='secret-debt'),false);
  assert.equal((definitions.careers??[]).some((career:any)=>career.id==='palace'),false);
});

test('v7 D23 truth table matches permanent 10/10 plus current-run active 10/10 semantics',()=>{
  const ten=[...ordinary];
  const nine=ten.slice(0,9);

  const cases=[
    {
      id:'nine-permanent-nine-active',
      permanent:nine,
      active:nine,
      expected:false
    },
    {
      id:'ten-permanent-zero-active',
      permanent:ten,
      active:[],
      expected:false
    },
    {
      id:'ten-permanent-nine-active',
      permanent:ten,
      active:nine,
      expected:false
    },
    {
      id:'ten-permanent-ten-active',
      permanent:ten,
      active:ten,
      expected:true
    }
  ];

  assert.deepEqual(
    fixture.d23TruthTable.map((row:any)=>({id:row.id,eligible:row.eligible})),
    cases.map(row=>({id:row.id,eligible:row.expected}))
  );

  for(const row of cases){
    assert.equal(qualifies(row.permanent,row.active),row.expected,row.id);
  }
});

test('duplicates, Secret Debt and Palace cannot substitute for a missing ordinary package',()=>{
  const ten=[...ordinary];
  const nine=ten.slice(0,9);
  const missing=ten[9];

  assert.equal(qualifies(
    [...ten,'secret-debt','palace'],
    [...nine,nine[0],nine[0],'secret-debt','palace']
  ),false);

  assert.equal(qualifies(
    [...nine,nine[0],'secret-debt'],
    [...ten,'secret-debt']
  ),false);

  assert.equal(qualifies(
    [...ten,'secret-debt','palace'],
    [...ten,'secret-debt','palace']
  ),true);

  assert.equal(ordinarySet.has(missing),true);
  assert.equal(fixture.substitutionRules.duplicatesCountOnce,true);
  assert.equal(fixture.substitutionRules.secretDebtCountsAsOrdinaryPackage,false);
  assert.equal(fixture.substitutionRules.palaceCountsAsOrdinaryPackage,false);
  assert.equal(fixture.substitutionRules.missingOrdinaryCareerCanBeSubstituted,false);
});

test('future Day-1 invitation contract remains deterministic, latched and run-local',()=>{
  const contract=fixture.invitationContract;
  assert.equal(contract.arrivalEventId,'palace.invitation.day1-arrival');
  assert.equal(contract.acceptanceSceneId,'palace.invitation.reveal');
  assert.equal(contract.trigger,'creationCompleted');
  assert.equal(contract.calendarElapsedDay,0);
  assert.equal(contract.delivery,'latched');
  assert.equal(contract.priorityClass,'critical_progression');
  assert.equal(contract.blocking,true);
  assert.equal(contract.maxShows,1);
  assert.equal(contract.usesGameplayRng,false);
  assert.equal(contract.requiresStatGate,false);
  assert.equal(contract.requiresItemGate,false);
  assert.equal(contract.acceptChoiceId,'accept');
  assert.equal(contract.accessFact,'palace.access-granted');
  assert.equal(contract.accessScope,'run-local');
});

test('unqualified creation never queues a Palace invitation',()=>{
  let state=freshContractState(false);
  state=onCreationCompleted(state);
  state=presentInvitation(state);
  assert.deepEqual(state,{
    qualified:false,
    invitation:'none',
    pendingEventId:null,
    accessFacts:[],
    shows:0
  });
});

test('qualified creation queues and presents the Day-1 invitation exactly once',()=>{
  let state=freshContractState(true);
  state=onCreationCompleted(state);
  assert.equal(state.invitation,'queued');

  state=presentInvitation(state);
  assert.equal(state.invitation,'pending');
  assert.equal(state.pendingEventId,'palace.invitation.day1-arrival');
  assert.equal(state.shows,1);

  state=presentInvitation(state);
  assert.equal(state.shows,1,'pending invitation must not be shown twice');

  state=onCreationCompleted(state);
  assert.equal(state.shows,1,'replayed creationCompleted must not duplicate the invitation');
});

test('reload preserves pending invitation identity without duplicate delivery',()=>{
  let state=presentInvitation(onCreationCompleted(freshContractState(true)));
  const restored=reload(state);

  assert.deepEqual(restored,state);
  assert.equal(restored.invitation,'pending');
  assert.equal(restored.pendingEventId,'palace.invitation.day1-arrival');
  assert.equal(restored.shows,1);

  const afterDuplicateAttempt=presentInvitation(restored);
  assert.deepEqual(afterDuplicateAttempt,restored);
});

test('invitation acceptance writes palace.access-granted once and reload preserves it in the same run',()=>{
  let state=presentInvitation(onCreationCompleted(freshContractState(true)));
  state=advanceToAcceptanceScene(state);
  assert.equal(state.pendingEventId,'palace.invitation.reveal');

  state=acceptInvitation(state);
  assert.equal(state.invitation,'accepted');
  assert.equal(state.pendingEventId,null);
  assert.deepEqual(state.accessFacts,['palace.access-granted']);
  assert.equal(state.shows,1);

  const restored=reload(state);
  assert.deepEqual(restored,state);
  assert.deepEqual(restored.accessFacts,['palace.access-granted']);

  const duplicateAccept=acceptInvitation(restored);
  assert.deepEqual(duplicateAccept,restored);
  assert.equal(duplicateAccept.accessFacts.filter(fact=>fact==='palace.access-granted').length,1);

  const duplicatePresentation=presentInvitation(duplicateAccept);
  assert.equal(duplicatePresentation.shows,1);
  assert.equal(duplicatePresentation.invitation,'accepted');
});

test('run-local Palace access does not carry into a new contract run and D23 must be evaluated again',()=>{
  let accepted=presentInvitation(onCreationCompleted(freshContractState(true)));
  accepted=advanceToAcceptanceScene(accepted);
  accepted=acceptInvitation(accepted);
  assert.deepEqual(accepted.accessFacts,['palace.access-granted']);

  const nextRun=freshContractState(false);
  assert.deepEqual(nextRun.accessFacts,[]);
  assert.equal(nextRun.invitation,'none');
  assert.equal(nextRun.qualified,false);
});

test('future-dependent checks remain contract-only because shared D23 API is not on this baseline',()=>{
  assert.equal(fixture.sharedD23ApiLanded,false);
  assert.equal(fixture.sharedD23Blocker.missingModule,'src/core/hardWorkMeta.ts');
  assert.equal(fixture.sharedD23Blocker.missingRunSnapshot,'activeHardWorkPackages');
  assert.equal(fixture.sharedD23Blocker.currentEngineAuthority,'permanent hardWorkProgress only');
});

test('v7 keeps Prince mechanics, Palace topology and shared Meta/Save/cap implementation explicitly deferred',()=>{
  assert.equal(fixture.deferred.princeMechanics,null);
  assert.equal(fixture.deferred.palaceCareerTopology,null);
  assert.equal(fixture.deferred.sharedMetaSaveCapImplementation,null);
});
