import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,eligible,freshSave,parseSave} from '../src/core/engine.ts';
import {presentationIdForEvent} from '../src/core/presentation.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const matrix=JSON.parse(readFileSync('content/lumber-foreman-night-matrix.fixture.json','utf8'));
const baseDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

function definitions(){
  const d=structuredClone(baseDefinitions);
  d.lodgings=[{
    id:'lumber.normal-room',
    label:'Normal room',
    housing:'normal',
    moneyCost:matrix.mechanics.lodgingMoneyCost,
    conditions:[],
    effects:[],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  d.nightChoices=[{
    id:matrix.nightChoiceId,
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
  return loadCatalog(definitions(),[structuredClone(productionPack),structuredClone(nightPack)]);
}
function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}
function withRelationship(stage:string,routeChoice?:string|null){
  const s=ready();
  s.run.progression.relationships['lumber.foreman']={
    stage,counters:{},choices:routeChoice?{route:routeChoice}:{},facts:[]
  };
  return s;
}
function nightChoice(cat:Catalog){
  const choice=cat.definitions.nightChoices.find(x=>x.id===matrix.nightChoiceId);
  assert.ok(choice);
  return choice;
}
function reload(s:Save,cat:Catalog){return parseSave(JSON.stringify(s),cat);}

test('Foreman Night visibility matrix is professional-route only',()=>{
  const cat=catalog();
  const choice=nightChoice(cat);

  for(const row of matrix.visibilityMatrix){
    const s=withRelationship(row.stage,row.routeChoice);
    assert.equal(
      eligible(choice.conditions,s,cat),
      row.expectedVisible,
      `${row.stage}/${row.routeChoice}`
    );
  }

  assert.deepEqual(choice.conditions,[
    {kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}
  ]);
});

test('Foreman Night has no romance prerequisite in choice or event conditions',()=>{
  const cat=catalog();
  const choice=nightChoice(cat);
  const event=cat.events.find(e=>e.id===matrix.eventId);
  assert.ok(event);

  const encoded=JSON.stringify({choiceConditions:choice.conditions,eventConditions:event.conditions}).toLowerCase();
  assert.equal(/romance|love|affinity|kiss|lover/.test(encoded),false);
  assert.equal(matrix.mechanics.romancePrerequisite,false);

  const s=withRelationship('route-professional','professional');
  assert.equal(eligible(choice.conditions,s,cat),true);
});

test('Foreman Night costs zero daytime Energy and consumes one Night slot',()=>{
  const cat=catalog();
  let s=withRelationship('route-professional','professional');
  const energyBefore=s.run.dayState.energyCurrent;
  const dayBefore=s.run.day;

  s=dispatch(s,{type:'endDay'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=dispatch(s,{type:'chooseNightChoice',id:matrix.nightChoiceId},cat);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.pending?.eventId,matrix.eventId);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.day,dayBefore+1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].facts.filter(x=>x==='night-followup-complete').length,1);
});

test('lodging payment is committed exactly once across reload before Night choice',()=>{
  const cat=catalog();
  let s=withRelationship('route-professional','professional');
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s,cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat));

  s=dispatch(s,{type:'chooseNightChoice',id:matrix.nightChoiceId},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
});

test('pending Night scene reload cannot duplicate relationship progress or payment',()=>{
  const cat=catalog();
  let s=withRelationship('route-professional','professional');
  const moneyBefore=s.run.resources.money;
  const energyBefore=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  s=dispatch(s,{type:'chooseNightChoice',id:matrix.nightChoiceId},cat);

  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);

  s=reload(s,cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);
  assert.equal(s.run.pending?.eventId,matrix.eventId);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  s=reload(s,cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].facts.filter(x=>x==='night-followup-complete').length,1);
});

test('Night event presentation identity and locked Hard Work contract remain unchanged',()=>{
  const cat=catalog();
  assert.equal(
    presentationIdForEvent(cat,matrix.eventId,'default'),
    matrix.presentationId
  );
  const hardWork=baseDefinitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,matrix.lockedHardWork.conditions);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(matrix.lockedHardWork.rewardId,'hardWork:lumber');
});
