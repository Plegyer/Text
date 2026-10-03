import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const baseDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

function nightDefinitions(){
  const d=structuredClone(baseDefinitions);
  d.lodgings=[
    {
      id:'lumber.normal-room',
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
    }
  ];
  return d;
}

function catalog():Catalog{
  return loadCatalog(nightDefinitions(),[
    structuredClone(productionPack),
    structuredClone(nightPack)
  ]);
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

function establishProfessionalRoute(input:Save,cat:Catalog):Save{
  let s=dispatch(input,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  return s;
}

test('Lumber Night acceptance fixture is schema-valid and does not alter the locked Hard Work gate',()=>{
  const cat=catalog();
  assert.ok(cat.events.some(e=>e.id==='lumber-night.foreman-professional'));
  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('voluntary Foreman Night uses the Night slot, keeps the professional route, and spends no daytime Energy',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  const energyBeforeNight=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'endDay'},cat);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  assert.equal(s.run.dayState.energyCurrent,energyBeforeNight);

  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  const energyBeforeChoice=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);

  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.day,0);
  assert.equal(s.run.dayState.energyCurrent,energyBeforeChoice);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.day,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  assert.ok(s.run.progression.relationships['lumber.foreman'].facts.includes('night-followup-complete'));
});

test('paid lodging is committed exactly once across reload before the Foreman Night choice',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  assert.equal(s.run.housingState.paidForCurrentNight,true);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.throws(
    ()=>dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat),
    /нельзя выбирать жильё|оплачен/
  );

  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
});

test('reload of the pending Foreman Night scene cannot duplicate lodging payment or relationship progress',()=>{
  const cat=catalog();
  let s=establishProfessionalRoute(ready(),cat);
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');

  const restored=parseSave(JSON.stringify(s),cat);
  assert.equal(restored.run.resources.money,moneyBefore-100);
  assert.equal(restored.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(restored.run.pending?.eventId,'lumber-night.foreman-professional');

  const finished=dispatch(restored,{type:'choice',id:'continue'},cat);
  assert.equal(finished.run.resources.money,moneyBefore-100);
  assert.equal(finished.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(finished.run.progression.relationships['lumber.foreman'].facts.filter(x=>x==='night-followup-complete').length,1);
  assert.equal(finished.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(finished.run.day,1);
  assert.equal(finished.run.flow.night,null);
});
