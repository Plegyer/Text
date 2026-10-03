import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {catalog} from './helpers.ts';
import {dispatch,eligible,freshSave,palaceRunQualified,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {STRONG_META_IDS,STRONG_META_SPECIALIST_CAPACITY,emptyStrongMetaState,grantStrongMetaReward,resolveStrongMetaSnapshot,setPreferredStrongMetaSpecialist,strongMetaRegistry} from '../src/core/strongMeta.ts';

const D40={
  'ending.guard.officer':['guard','ending-route-officer-selected','unlock.guard.command-briefing','automatic'],
  'ending.guard.reform':['guard','ending-route-reform-selected','unlock.guard.reform-practice','automatic'],
  'ending.guard.network':['guard','ending-route-network-selected','specialist.guard.institutional-favors','specialist'],
  'ending.guard.major-case':['guard','ending-route-major-case-selected','unlock.guard.casebook-index','automatic'],
  'ending.merchant.house':['merchant','ending-route-merchant-house-selected','unlock.merchant.house-supplier','automatic'],
  'ending.merchant.speculator-smuggler':['merchant','ending-route-speculator-smuggler-selected','specialist.merchant.risk-ledger','specialist'],
  'ending.merchant.patron-of-routes':['merchant','ending-route-patron-routes-selected','unlock.merchant.patron-destinations','automatic'],
  'ending.artist-geisha.master-artist':['artist-geisha','ending-route-master-artist-selected','unlock.artist.master-repertoire','automatic'],
  'ending.artist-geisha.patron-network':['artist-geisha','ending-route-patron-network-selected','specialist.artist.salon-introductions','specialist'],
  'ending.artist-geisha.court-invitation':['artist-geisha','ending-route-court-invitation-selected','unlock.artist.court-context','automatic'],
  'ending.assassin.ghost':['assassin','ending-route-ghost-selected','specialist.assassin.ghost-routes','specialist'],
  'ending.assassin.handler-takeover':['assassin','ending-route-handler-takeover-selected','specialist.assassin.contract-ledger','specialist'],
  'ending.assassin.refusal-turncoat':['assassin','ending-route-refusal-turncoat-selected','unlock.assassin.refusal-protocol','automatic'],
  'ending.prostitute.independent-house':['prostitute','ending-route-independent-house-selected','specialist.prostitute.housebook','specialist'],
  'ending.prostitute.elite-clientele':['prostitute','ending-route-elite-clientele-selected','unlock.prostitute.elite-protocol','automatic'],
  'ending.prostitute.network-protection':['prostitute','ending-route-network-protection-selected','specialist.prostitute.mutual-aid-roster','specialist']
} as const;

function ending(id:string){
  const e=catalog.definitions.endings.find(x=>x.id===id);
  assert.ok(e,id);
  return e;
}
function withCareer(career:string,stage:string,facts:string[]):Save{
  const s=freshSave();
  s.run.progression.careers[career]={stage,shifts:0,counters:{},choices:{},facts:[...facts]};
  return s;
}
function schoolState(track:string,lessons:number,night:number){
  const s=freshSave();
  s.run.progression.school.tracks[track]={
    trackId:track,counters:{lessons_completed:lessons,night_study_sessions:night},
    facts:[],milestones:[],certificates:[],choices:{}
  };
  return s;
}

test('D40 catalog contains exactly the 16 stable advanced ending IDs with selected-route isolation',()=>{
  const ids=Object.keys(D40);
  assert.equal(ids.length,16);
  for(const [id,[career,fact,reward,kind]] of Object.entries(D40)){
    const e=ending(id);
    assert.deepEqual(e.conditions,[
      {kind:'careerStage',career,stage:'outcome-ready'},
      {kind:'careerFact',career,fact,present:true}
    ],id);
    assert.equal(e.reward,reward,id);
    if(kind==='automatic'){
      assert.deepEqual(e.metaRewards,[{kind:'unlock',rewardId:reward,unlock:reward}],id);
    }else{
      assert.deepEqual(e.metaRewards,[],id);
    }

    const yes=withCareer(career,'outcome-ready',[fact]);
    assert.equal(eligible(e.conditions,yes,catalog),true,id);
    const no=withCareer(career,'outcome-ready',[]);
    assert.equal(eligible(e.conditions,no,catalog),false,id);
  }
});

test('route-ready facts alone cannot make a D40 ending eligible',()=>{
  const s=withCareer('guard','outcome-ready',[
    'officer-route-ready','reform-route-ready','network-route-ready','major-case-ready'
  ]);
  for(const id of ['ending.guard.officer','ending.guard.reform','ending.guard.network','ending.guard.major-case']){
    assert.equal(eligible(ending(id).conditions,s,catalog),false,id);
  }
});

test('overlapping selected facts preserve D16 choice until explicit commit',()=>{
  let s=withCareer('guard','outcome-ready',[
    'ending-route-officer-selected',
    'ending-route-reform-selected'
  ]);
  const ids=['ending.guard.officer','ending.guard.reform'];
  for(const id of ids)assert.equal(eligible(ending(id).conditions,s,catalog),true,id);
  s.run.endings.eligible=[...ids];
  s=dispatch(s,{type:'commitEnding',id:'ending.guard.officer'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.guard.officer');
  assert.deepEqual(s.run.endings.eligible,ids);
  assert.equal(s.meta.completedEndings.length,0);
});

test('automatic completion grants unlock once while Specialist completion grants strong Meta ownership exactly once',()=>{
  let automatic=withCareer('guard','outcome-ready',['ending-route-officer-selected']);
  automatic.run.endings.eligible=['ending.guard.officer'];
  automatic=dispatch(automatic,{type:'commitEnding',id:'ending.guard.officer'},catalog);
  automatic=dispatch(automatic,{type:'completeEnding'},catalog);
  assert.ok(automatic.meta.unlocks.includes('unlock.guard.command-briefing'));
  assert.deepEqual(automatic.run.endings.result?.appliedMetaRewardIds,['unlock.guard.command-briefing']);

  let specialist=withCareer('guard','outcome-ready',['ending-route-network-selected']);
  specialist.run.endings.eligible=['ending.guard.network'];
  specialist=dispatch(specialist,{type:'commitEnding',id:'ending.guard.network'},catalog);
  specialist=dispatch(specialist,{type:'completeEnding'},catalog);
  assert.deepEqual(specialist.run.endings.result?.appliedMetaRewardIds,['specialist.guard.institutional-favors']);
  assert.deepEqual(specialist.meta.strongMeta.ownership.ownedRewardIds,['specialist.guard.institutional-favors']);
  assert.equal(specialist.meta.unlocks.includes('specialist.guard.institutional-favors'),false);
  specialist=dispatch(specialist,{type:'completeEnding'},catalog);
  assert.deepEqual(specialist.meta.strongMeta.ownership.ownedRewardIds,['specialist.guard.institutional-favors']);
});

test('atomic branch choices persist the exact selected-route fact and defer/veteran choices do not',()=>{
  const files=[
    'guard-career.json','merchant-career.json','artist-geisha-career.json',
    'assassin-routes.json','prostitute-routes.json'
  ];
  const packs=files.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));
  const expected=[
    ['guard.career.choose-route','officer','guard','ending-route-officer-selected'],
    ['guard.career.choose-route','reform','guard','ending-route-reform-selected'],
    ['guard.career.choose-route','network','guard','ending-route-network-selected'],
    ['guard.career.choose-major-case','major-case','guard','ending-route-major-case-selected'],
    ['merchant.career.choose-route','merchant-house','merchant','ending-route-merchant-house-selected'],
    ['merchant.career.choose-route','speculator-smuggler','merchant','ending-route-speculator-smuggler-selected'],
    ['merchant.career.choose-patron','patron','merchant','ending-route-patron-routes-selected'],
    ['artist-geisha.career.choose-route','master-artist','artist-geisha','ending-route-master-artist-selected'],
    ['artist-geisha.career.choose-route','patron-network','artist-geisha','ending-route-patron-network-selected'],
    ['artist-geisha.career.choose-route','court-invitation','artist-geisha','ending-route-court-invitation-selected'],
    ['assassin.routes.choose-practice','ghost','assassin','ending-route-ghost-selected'],
    ['assassin.routes.choose-practice','turncoat','assassin','ending-route-refusal-turncoat-selected'],
    ['assassin.routes.choose-network','handler-takeover','assassin','ending-route-handler-takeover-selected'],
    ['assassin.routes.choose-network','refusal-chain','assassin','ending-route-refusal-turncoat-selected'],
    ['prostitute.routes.choose','independent-house','prostitute','ending-route-independent-house-selected'],
    ['prostitute.routes.choose','elite-clientele','prostitute','ending-route-elite-clientele-selected'],
    ['prostitute.routes.choose','network-protection','prostitute','ending-route-network-protection-selected']
  ];
  for(const [eventId,choiceId,career,fact] of expected){
    const event=packs.flatMap((p:any)=>p.events??[]).find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    const choice=event.choices.find((c:any)=>c.id===choiceId);
    assert.ok(choice,eventId+'/'+choiceId);
    assert.ok(choice.effects.some((e:any)=>e.kind==='advanceCareer'),eventId+'/'+choiceId);
    assert.ok(choice.effects.some((e:any)=>e.kind==='addCareerFact'&&e.career===career&&e.fact==='outcome-ready'),eventId+'/'+choiceId);
    assert.ok(choice.effects.some((e:any)=>e.kind==='addCareerFact'&&e.career===career&&e.fact===fact),eventId+'/'+choiceId);
  }
  assert.equal(expected.length,17);
});

test('D40 School publishers use exact 3 paid OR 3 Night Study rule and never sum 2+1',()=>{
  const events=catalog.events.filter(e=>e.id.startsWith('d40.school.'));
  assert.equal(events.length,7);
  for(const event of events){
    const any=event.conditions.find((c:any)=>c.kind==='any') as any;
    assert.ok(any,event.id);
    const tracks=[...new Set(any.conditions.map((c:any)=>c.track))];
    assert.equal(tracks.length,1,event.id);
    const track=tracks[0];
    assert.equal(eligible(event.conditions,schoolState(track,3,0),catalog),true,event.id+' paid');
    assert.equal(eligible(event.conditions,schoolState(track,0,3),catalog),true,event.id+' night');
    assert.equal(eligible(event.conditions,schoolState(track,2,1),catalog),false,event.id+' no sum');
  }
});

test('Assassin Refusal Chain has the missing exact producer contract',()=>{
  const event=catalog.events.find(e=>e.id==='assassin.routes.refusal-chain-ready');
  assert.ok(event);
  const raw=JSON.stringify(event.conditions);
  for(const token of [
    'trusted-blade','veteran-ready','refusal-chain-evidence','contract-cycle-complete',
    'assassin.handler','refusal-respected','refusal-chain-ready'
  ])assert.ok(raw.includes(token),token);
});

test('D40 Specialists are canonical Strong Meta rewards and share normal capacity with Palace cap-200',()=>{
  const expected:any={
    'specialist.guard.institutional-favors':{kind:'guard-institutional-favors',maxUsesPerRun:2},
    'specialist.merchant.risk-ledger':{kind:'merchant-risk-ledger',maxDealsPerRun:2,reveal:['reward-band','downside-tag'],allowAbortBeforeCommit:true},
    'specialist.artist.salon-introductions':{kind:'artist-salon-introductions',maxUsesPerRun:4,maxUsesPerSeason:1},
    'specialist.assassin.ghost-routes':{kind:'assassin-ghost-routes',maxContractsPerRun:2},
    'specialist.assassin.contract-ledger':{kind:'assassin-contract-ledger',maxContractsPerRun:2,reveal:['sponsor-tag','fallout-tag'],allowAuthoredReroute:true},
    'specialist.prostitute.housebook':{kind:'prostitute-housebook',maxBookingsPerRun:2,reveal:['terms','risk'],allow:['decline','renegotiate']},
    'specialist.prostitute.mutual-aid-roster':{kind:'prostitute-mutual-aid-roster',maxRiskScenesPerRun:2,allow:['safe-exit','request-help','contact-support']}
  };
  assert.equal(Object.keys(expected).length,7);
  assert.equal(STRONG_META_SPECIALIST_CAPACITY,2);
  for(const [endingId,[,,reward,kind]] of Object.entries(D40)){
    if(kind!=='specialist')continue;
    const definition=strongMetaRegistry[reward as keyof typeof strongMetaRegistry];
    assert.ok(definition,reward);
    assert.equal(definition.class,'specialist');
    assert.deepEqual(definition.effect,expected[reward]);
    assert.deepEqual(ending(endingId).metaRewards,[{kind:'strongMeta',rewardId:reward,reward}],endingId);
  }
  let state=emptyStrongMetaState();
  for(const id of [STRONG_META_IDS.palaceCap200,STRONG_META_IDS.guardInstitutionalFavors,STRONG_META_IDS.merchantRiskLedger])state=grantStrongMetaReward(state,id);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.guardInstitutionalFavors,true);
  assert.equal(resolveStrongMetaSnapshot(state).specialistIds.length,2);
  assert.throws(()=>setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.merchantRiskLedger,true),/specialist_capacity_exceeded/);
});

test('Court Context never bypasses D23 Palace qualification',()=>{
  const court=ending('ending.artist-geisha.court-invitation');
  assert.deepEqual(court.metaRewards,[{
    kind:'unlock',rewardId:'unlock.artist.court-context',unlock:'unlock.artist.court-context'
  }]);

  const consumer=catalog.events.find(e=>e.id==='d40.meta.artist.court-context');
  assert.ok(consumer);
  assert.ok(consumer.conditions.some((c:any)=>c.kind==='worldFact'&&c.fact==='palace.access-granted'&&c.present===true));

  let s=withCareer('artist-geisha','outcome-ready',['ending-route-court-invitation-selected']);
  s.run.endings.eligible=['ending.artist-geisha.court-invitation'];
  s=dispatch(s,{type:'commitEnding',id:'ending.artist-geisha.court-invitation'},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(palaceRunQualified(s),false);
  assert.equal(s.meta.unlocks.includes('palace'),false);
});

test('ordinary Prostitute D40 endings remain separate from Secret Debt forced-route semantics',()=>{
  for(const id of [
    'ending.prostitute.independent-house',
    'ending.prostitute.elite-clientele',
    'ending.prostitute.network-protection'
  ]){
    const e=ending(id);
    const raw=JSON.stringify(e.conditions).toLowerCase();
    assert.equal(raw.includes('secret-debt'),false,id);
    assert.equal(raw.includes('forced'),false,id);
  }
  const consumers=catalog.events.filter(e=>e.id.includes('prostitute')&&e.id.startsWith('d40.meta.'));
  for(const event of consumers){
    assert.equal(JSON.stringify(event).toLowerCase().includes('secret-debt'),false,event.id);
  }
});

test('parseSave repairs selected-route fact only from an unambiguous advanced stage',()=>{
  const cases=[
    ['guard','officer','ending-route-officer-selected'],
    ['merchant','merchant-house','ending-route-merchant-house-selected'],
    ['artist-geisha','master-artist','ending-route-master-artist-selected'],
    ['assassin','ghost','ending-route-ghost-selected'],
    ['assassin','turncoat','ending-route-refusal-turncoat-selected'],
    ['prostitute','independent-house','ending-route-independent-house-selected']
  ];
  for(const [career,stage,fact] of cases){
    const s=withCareer(career,stage,[]);
    const restored=parseSave(JSON.stringify(s),catalog);
    assert.ok(restored.run.progression.careers[career].facts.includes(fact),career+'/'+stage);
  }

  const ambiguous=withCareer('guard','outcome-ready',[
    'outcome-ready','officer-route-ready','reform-route-ready'
  ]);
  const restored=parseSave(JSON.stringify(ambiguous),catalog);
  assert.equal(restored.run.progression.careers.guard.facts.some(f=>f.startsWith('ending-route-')),false);
});

test('selected-route fact survives ordinary save/reload unchanged',()=>{
  const s=withCareer('merchant','outcome-ready',[
    'outcome-ready','ending-route-patron-routes-selected'
  ]);
  const restored=parseSave(JSON.stringify(s),catalog);
  assert.ok(restored.run.progression.careers.merchant.facts.includes('ending-route-patron-routes-selected'));
});
