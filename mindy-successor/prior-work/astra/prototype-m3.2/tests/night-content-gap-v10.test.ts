import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {
  NIGHT_CONTENT_GAP_PRESENTATION_IDS,
  presentationIdForEvent
} from '../src/core/presentation.ts';
import type {Condition,Effect,NightChoiceDefinition,Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const SURFACE_IDS=[
  'lumber.night.foreman-social',
  'hunter.night.field-debrief',
  'hunter.night.senior-guide',
  'guard.night.case-debrief',
  'guard.night.partner',
  'merchant.night.ledger-plan',
  'merchant.night.supplier',
  'assassin.night.handler-contact',
  'prostitute.night.personal-continuation',
  'satyr-maid.night.recurring-guest-private',
  'tavern.night.traveler-private',
  'prostitute.night.client-private'
] as const;

type SurfaceId=(typeof SURFACE_IDS)[number];
type HousingTier='normal'|'cheap'|'street';

const PRIVATE_IDS=[
  'satyr-maid.night.recurring-guest-private',
  'tavern.night.traveler-private',
  'prostitute.night.client-private'
] as const;

const EXPECTED_EFFECTS:Record<SurfaceId,Effect[]>={
  'lumber.night.foreman-social':[
    {kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'lumber.foreman',fact:'social-night-seen'}
  ],
  'hunter.night.field-debrief':[
    {kind:'addCareerFact',career:'hunter',fact:'night-field-debrief-seen'}
  ],
  'hunter.night.senior-guide':[
    {kind:'incrementRelationshipCounter',relationship:'hunter.senior-guide',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'hunter.senior-guide',fact:'night-companion-seen'}
  ],
  'guard.night.case-debrief':[
    {kind:'addCareerFact',career:'guard',fact:'night-case-debrief-seen'}
  ],
  'guard.night.partner':[
    {kind:'incrementRelationshipCounter',relationship:'guard.partner',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'guard.partner',fact:'night-partner-seen'}
  ],
  'merchant.night.ledger-plan':[
    {kind:'addCareerFact',career:'merchant',fact:'night-ledger-plan-seen'}
  ],
  'merchant.night.supplier':[
    {kind:'incrementRelationshipCounter',relationship:'merchant.supplier',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'merchant.supplier',fact:'night-supplier-seen'}
  ],
  'assassin.night.handler-contact':[
    {kind:'incrementRelationshipCounter',relationship:'assassin.handler',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'assassin.handler',fact:'night-handler-seen'}
  ],
  'prostitute.night.personal-continuation':[
    {kind:'incrementRelationshipCounter',relationship:'prostitute.recurring-client',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'prostitute.recurring-client',fact:'personal-night-seen'},
    {kind:'addCareerFact',career:'prostitute',fact:'personal-night-continuation-seen'}
  ],
  'satyr-maid.night.recurring-guest-private':[
    {kind:'incrementRelationshipCounter',relationship:'satyr-maid.recurring-guest',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'satyr-maid.recurring-guest',fact:'private-space-night-seen'}
  ],
  'tavern.night.traveler-private':[
    {kind:'incrementRelationshipCounter',relationship:'tavern.recurring-traveler',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'tavern.recurring-traveler',fact:'private-space-night-seen'}
  ],
  'prostitute.night.client-private':[
    {kind:'incrementRelationshipCounter',relationship:'prostitute.recurring-client',counter:'night-meetings',amount:1},
    {kind:'addRelationshipFact',relationship:'prostitute.recurring-client',fact:'private-space-night-seen'},
    {kind:'addCareerFact',career:'prostitute',fact:'private-space-night-seen'}
  ]
};

const LOCALIZATION_SURFACES:Record<SurfaceId,{base:string;altKey:string}>={
  'lumber.night.foreman-social':{base:'night.lumber.foreman-social',altKey:'presentation.static.lumber.night.foreman-social.alt'},
  'hunter.night.field-debrief':{base:'night.hunter.field-debrief',altKey:'presentation.static.hunter.night.field-debrief.alt'},
  'hunter.night.senior-guide':{base:'night.hunter.senior-guide',altKey:'presentation.static.hunter.night.senior-guide.alt'},
  'guard.night.case-debrief':{base:'night.guard.case-debrief',altKey:'presentation.static.guard.night.case-debrief.alt'},
  'guard.night.partner':{base:'night.guard.partner',altKey:'presentation.static.guard.night.partner.alt'},
  'merchant.night.ledger-plan':{base:'night.merchant.ledger-plan',altKey:'presentation.static.merchant.night.ledger-plan.alt'},
  'merchant.night.supplier':{base:'night.merchant.supplier',altKey:'presentation.static.merchant.night.supplier.alt'},
  'assassin.night.handler-contact':{base:'night.assassin.handler-contact',altKey:'presentation.static.assassin.night.handler-contact.alt'},
  'prostitute.night.personal-continuation':{base:'night.prostitute.personal-continuation',altKey:'presentation.static.prostitute.night.personal-continuation.alt'},
  'satyr-maid.night.recurring-guest-private':{base:'night.satyr-maid.recurring-guest-private',altKey:'presentation.static.satyr-maid.night.recurring-guest-private.alt'},
  'tavern.night.traveler-private':{base:'night.tavern.traveler-private',altKey:'presentation.static.tavern.night.traveler-private.alt'},
  'prostitute.night.client-private':{base:'night.prostitute.client-private',altKey:'presentation.static.prostitute.night.client-private.alt'}
};

function surfaceChoice(id:SurfaceId):NightChoiceDefinition{
  const choice=catalog.definitions.nightChoices.find(item=>item.id===id);
  assert.ok(choice,'missing Night choice '+id);
  return choice;
}

function setCareer(state:Save,career:string,stage:string){
  state.run.progression.careers[career]={
    stage,
    shifts:0,
    counters:{},
    choices:{},
    facts:[]
  };
}

function setRelationship(
  state:Save,
  relationship:string,
  stage:string,
  choices:Record<string,string>={}
){
  state.run.progression.relationships[relationship]={
    stage,
    counters:{},
    choices:{...choices},
    facts:[]
  };
}

function readyFor(id:SurfaceId):Save{
  const state=started();
  state.run.resources.money=2000;
  switch(id){
    case 'lumber.night.foreman-social':
      setRelationship(state,'lumber.foreman','route-professional',{route:'professional'});
      break;
    case 'hunter.night.field-debrief':
      setCareer(state,'hunter','tracker');
      break;
    case 'hunter.night.senior-guide':
      setRelationship(state,'hunter.senior-guide','professional-trust');
      break;
    case 'guard.night.case-debrief':
      setCareer(state,'guard','trusted-guard');
      break;
    case 'guard.night.partner':
      setRelationship(state,'guard.partner','professional-trust');
      break;
    case 'merchant.night.ledger-plan':
      setCareer(state,'merchant','independent-trader');
      break;
    case 'merchant.night.supplier':
      setRelationship(state,'merchant.supplier','professional-trust');
      break;
    case 'assassin.night.handler-contact':
      setRelationship(state,'assassin.handler','professional-trust');
      break;
    case 'prostitute.night.personal-continuation':
      setRelationship(state,'prostitute.recurring-client','mode-defined',{'relationship-mode':'friendship'});
      break;
    case 'satyr-maid.night.recurring-guest-private':
      setRelationship(state,'satyr-maid.recurring-guest','professional-trust',{'night-response':'accepted'});
      break;
    case 'tavern.night.traveler-private':
      setRelationship(state,'tavern.recurring-traveler','trusted',{'night-response':'accepted'});
      break;
    case 'prostitute.night.client-private':
      setRelationship(state,'prostitute.recurring-client','professional-trust',{'relationship-mode':'professional-only'});
      break;
  }
  return state;
}

function enterNight(state:Save,tier:HousingTier):Save{
  let next=dispatch(state,{type:'endDay'},catalog);
  assert.equal(next.run.pending,null,'unexpected forced event before lodging');
  const lodging=catalog.definitions.lodgings.find(item=>item.housing===tier&&eligible(item.conditions,next,catalog));
  assert.ok(lodging,'missing '+tier+' lodging');
  next=dispatch(next,{type:'chooseLodging',id:lodging.id},catalog);

  // Existing housing content may surface a non-consuming post-lodging scene
  // before the voluntary menu. Resolve only those scenes. A consuming Night
  // here is a real precedence failure and must remain a hard test failure.
  let guard=0;
  while(next.run.pending&&next.run.flow.night?.phase==='NightEventResolution'){
    if(++guard>8)throw new Error('post-lodging Night setup loop');
    const pendingEvent=catalog.events.find(event=>event.id===next.run.pending?.eventId);
    assert.ok(pendingEvent,'missing pending post-lodging event');
    assert.equal(
      pendingEvent.nightPolicy?.consumesNight,
      false,
      pendingEvent.id+' unexpectedly consumes the voluntary Night slot'
    );
    const exit=pendingEvent.choices.find(choice=>eligible(choice.conditions,next,catalog)&&choice.effects.length===0)
      ??pendingEvent.choices.find(choice=>eligible(choice.conditions,next,catalog));
    assert.ok(exit,pendingEvent.id+' has no eligible setup exit');
    next=dispatch(next,{type:'choice',id:exit.id},catalog);
  }

  assert.equal(next.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(next.run.housingState.current,tier);
  return next;
}

function walkConditions(conditions:Condition[],visit:(condition:Condition)=>void){
  for(const condition of conditions){
    visit(condition);
    if(condition.kind==='all'||condition.kind==='any')walkConditions(condition.conditions,visit);
    if(condition.kind==='not')walkConditions([condition.condition],visit);
  }
}

test('D42 defines exactly the accepted 12 Night surfaces and exact accepted effects',()=>{
  const ids=new Set(catalog.definitions.nightChoices.map(choice=>choice.id));
  for(const id of SURFACE_IDS)assert.equal(ids.has(id),true,id);

  for(const id of SURFACE_IDS){
    const choice=surfaceChoice(id);
    assert.deepEqual(choice.effects,EXPECTED_EFFECTS[id],id+' effects');
    assert.deepEqual(choice.nextDayEffects,[],id+' next-day stats');
    assert.equal(choice.nextDayEnergyDelta,0,id+' next-day Energy');

    const forbiddenKinds:string[]=[];
    walkConditions(choice.conditions,condition=>{
      if(condition.kind==='stat'||condition.kind==='metric')forbiddenKinds.push(condition.kind);
    });
    assert.deepEqual(forbiddenKinds,[],id+' cannot infer consent from stats');
    assert.equal(choice.effects.some(effect=>
      effect.kind==='modifyStat'||
      effect.kind==='modifyResource'||
      effect.kind==='modifyEnergy'||
      effect.kind==='setHousing'||
      effect.kind==='advanceCareer'||
      effect.kind==='advanceRelationship'
    ),false,id+' cannot create hidden progression or economy effects');
  }

  const events=SURFACE_IDS.map(id=>catalog.events.find(event=>event.id===id));
  assert.equal(events.every(Boolean),true,'all D42 after-choice events must be live');
  for(const [index,event] of events.entries()){
    assert.ok(event);
    const id=SURFACE_IDS[index];
    assert.deepEqual(event.reactionTriggers,[{kind:'nightChoiceCompleted',choice:id}],id+' trigger');
    assert.deepEqual(event.nightPolicy,{
      intercept:'after_choice',
      suppressLodgingPayment:false,
      suppressVoluntaryMenu:true,
      consumesNight:true
    },id+' Night policy');
    assert.equal(event.choices.length,1,id+' resolution choice count');
    assert.deepEqual(event.choices[0]?.effects,[],id+' scene must not add extra effects');
  }
});

test('D35 private-space count is exactly three and each is normal-only',()=>{
  const surfaceChoices=SURFACE_IDS.map(surfaceChoice);
  const privateChoices=surfaceChoices.filter(choice=>{
    let found=false;
    walkConditions(choice.conditions,condition=>{if(condition.kind==='housingTier')found=true;});
    return found;
  });
  assert.deepEqual(privateChoices.map(choice=>choice.id).sort(),[...PRIVATE_IDS].sort());

  for(const choice of privateChoices){
    const housingLeaves:{kind:'housingTier';value:HousingTier}[]=[];
    walkConditions(choice.conditions,condition=>{
      if(condition.kind==='housingTier')housingLeaves.push(condition as {kind:'housingTier';value:HousingTier});
    });
    assert.deepEqual(housingLeaves,[{kind:'housingTier',value:'normal'}],choice.id);
  }

  const publicChoices=surfaceChoices.filter(choice=>!PRIVATE_IDS.includes(choice.id as (typeof PRIVATE_IDS)[number]));
  assert.equal(publicChoices.length,9);
  for(const choice of publicChoices){
    let hasHousing=false;
    walkConditions(choice.conditions,condition=>{if(condition.kind==='housingTier')hasHousing=true;});
    assert.equal(hasHousing,false,choice.id+' must remain available across housing tiers when its own route conditions are met');
  }
});

test('all 12 D42 Night choices survive pending reload and advance the calendar exactly once',()=>{
  for(const id of SURFACE_IDS){
    let state=enterNight(readyFor(id),'normal');
    const dayBefore=state.run.day;
    const energyBefore=state.run.dayState.energyCurrent;

    state=dispatch(state,{type:'chooseNightChoice',id},catalog);
    assert.equal(state.run.pending?.eventId,id,id+' pending event');
    assert.equal(state.run.flow.night?.phase,'NightEventResolution',id+' pending phase');
    assert.equal(state.run.flow.night?.selectedNightChoiceId,id,id+' selected choice');
    assert.equal(state.run.day,dayBefore,id+' cannot advance before scene resolves');
    assert.equal(state.run.dayState.energyCurrent,energyBefore,id+' cannot spend daytime Energy');

    const progressionSnapshot=structuredClone(state.run.progression);
    state=parseSave(JSON.stringify(state),catalog);
    assert.equal(state.run.pending?.eventId,id,id+' pending event after reload');
    assert.deepEqual(state.run.progression,progressionSnapshot,id+' effects cannot duplicate on reload');

    state=dispatch(state,{type:'choice',id:'continue'},catalog);
    assert.equal(state.run.pending,null,id+' resolution');
    assert.equal(state.run.flow.night,null,id+' Night closes');
    assert.equal(state.run.day,dayBefore+1,id+' exactly one calendar advance');

    state=parseSave(JSON.stringify(state),catalog);
    assert.equal(state.run.day,dayBefore+1,id+' reload cannot duplicate calendar advance');
    assert.equal(eligible(surfaceChoice(id).conditions,state,catalog),false,id+' history fact prevents silent repeat progression');
  }
});

test('cheap and street reject only the three D35 private branches while public Night remains available',()=>{
  const cases=[
    {
      privateId:'satyr-maid.night.recurring-guest-private' as const,
      publicId:'satyr-maid.night.recurring-guest'
    },
    {
      privateId:'tavern.night.traveler-private' as const,
      publicId:'tavern.night.traveler-request'
    },
    {
      privateId:'prostitute.night.client-private' as const,
      publicId:'prostitute.night.client-followup'
    }
  ];

  for(const {privateId,publicId} of cases){
    for(const tier of ['cheap','street'] as const){
      const state=enterNight(readyFor(privateId),tier);
      assert.equal(eligible(surfaceChoice(privateId).conditions,state,catalog),false,privateId+' on '+tier);
      assert.throws(
        ()=>dispatch(state,{type:'chooseNightChoice',id:privateId},catalog),
        /недоступно/,
        privateId+' dispatch on '+tier
      );
      const publicChoice=catalog.definitions.nightChoices.find(choice=>choice.id===publicId);
      assert.ok(publicChoice,publicId);
      assert.equal(eligible(publicChoice.conditions,state,catalog),true,publicId+' must survive '+tier);
    }
  }
});

test('cheap lodging preserves School Night Study and its normal NightFlow behavior',()=>{
  let state=enterNight(started(),'cheap');
  const study=catalog.definitions.nightChoices.find(choice=>choice.id==='school.night_study.arcana.reason');
  assert.ok(study);
  assert.equal(eligible(study.conditions,state,catalog),true);
  const dayBefore=state.run.day;
  const reasonBefore=state.run.character.stats.reason;
  state=dispatch(state,{type:'chooseNightChoice',id:study.id},catalog);
  assert.equal(state.run.day,dayBefore+1);
  assert.equal(state.run.character.stats.reason,reasonBefore+2);
  assert.equal(state.run.flow.night,null);
});

test('professional-only Prostitute mode stays non-personal even at high confidence-like stats',()=>{
  let state=started();
  state.run.character.stats.sexuality=100;
  state.run.character.lust=100;
  setRelationship(state,'prostitute.recurring-client','mode-defined',{'relationship-mode':'professional-only'});

  const personal=surfaceChoice('prostitute.night.personal-continuation');
  const professional=catalog.definitions.nightChoices.find(choice=>choice.id==='prostitute.night.client-followup');
  assert.ok(professional);
  assert.equal(eligible(personal.conditions,state,catalog),false);
  assert.equal(eligible(professional.conditions,state,catalog),true);

  state.run.progression.relationships['prostitute.recurring-client'].choices['relationship-mode']='friendship';
  assert.equal(eligible(personal.conditions,state,catalog),true,'explicit friendship may open the optional personal continuation');
});

test('D42 presentation and RU/EN localization bindings use the accepted stable surfaces',()=>{
  const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
  const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings as Record<string,{ru:string;en?:string}>;

  for(const id of SURFACE_IDS){
    const presentationId=NIGHT_CONTENT_GAP_PRESENTATION_IDS[id];
    assert.equal(presentationIdForEvent(catalog,id,'default'),presentationId,id+' event presentation route');
    const slot=presentation.slots[presentationId];
    assert.ok(slot,id+' presentation override');

    const surface=LOCALIZATION_SURFACES[id];
    assert.equal(slot.static.altKey,surface.altKey,id+' alt key');
    for(const key of [`${surface.base}.label`,`${surface.base}.body`,`${surface.base}.aria`,surface.altKey]){
      assert.ok(localization[key]?.ru.trim(),key+' RU');
      assert.ok(localization[key]?.en?.trim(),key+' EN');
    }
  }
});
