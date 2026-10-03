import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {dispatch,eligible,freshSave,parseSave} from '../src/core/engine.ts';
import {schoolNightStudyChoice} from '../src/core/school.ts';
import type {Catalog,Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const schoolLife=JSON.parse(readFileSync('content/packs/school-life-content-v1.json','utf8'));
const manifest=JSON.parse(readFileSync('content/school-night-interoperability-v22.fixture.json','utf8'));

const schoolChoices=definitions.nightChoices.filter((x:any)=>x.id.startsWith('school.night_study.'));

test('C5-235/C5-236 exact current Night-study inventory is 24 choices and normal-or-cheap housing only',()=>{
  assert.equal(schoolChoices.length,24);
  assert.deepEqual(schoolChoices.map((x:any)=>x.id),manifest.current.schoolNightChoiceIds);
  for(const choice of schoolChoices){
    assert.deepEqual(choice.conditions,[{
      kind:'any',
      conditions:[
        {kind:'housingTier',value:'normal'},
        {kind:'housingTier',value:'cheap'}
      ]
    }],choice.id);
    assert.equal(choice.nextDayEnergyDelta,-1,choice.id);
    assert.deepEqual(choice.nextDayEffects,[],choice.id);
    assert.equal(choice.effects.some((x:any)=>x.kind==='modifyResource'),false,choice.id);
    assert.equal(choice.effects.some((x:any)=>x.kind==='modifyEnergy'),false,choice.id);
    assert.equal(choice.effects.filter((x:any)=>x.kind==='modifyStat'&&x.delta===2).length,1,choice.id);
    assert.equal(choice.effects.filter((x:any)=>x.kind==='incrementSchoolCounter'&&x.counter==='night_study_sessions'&&x.amount===1).length,1,choice.id);
  }
  assert.equal(manifest.current.streetEligible,false);
});

test('C5-237/C5-238 production save reload keeps lodging payment and School Night-study exactly once',()=>{
  let s=started();
  const dayBefore=s.run.calendar.elapsedDays;
  const moneyBefore=s.run.resources.money;
  const reasonBefore=s.run.character.stats.reason;
  const counterBefore=s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.calendar.elapsedDays,dayBefore);
  assert.equal(s.run.resources.money,moneyBefore);

  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  const moneyAfterLodging=s.run.resources.money;
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.resources.money,moneyAfterLodging);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog),/нельзя выбирать жильё|оплачен/);

  s=dispatch(s,{type:'chooseNightChoice',id:'school.night_study.arcana.reason'},catalog);
  assert.equal(s.run.calendar.elapsedDays,dayBefore+1);
  assert.equal(s.run.character.stats.reason,reasonBefore+2);
  assert.equal(s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,counterBefore+1);
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,0);

  const once=parseSave(JSON.stringify(s),catalog);
  const twice=parseSave(JSON.stringify(once),catalog);
  assert.equal(once.run.calendar.elapsedDays,dayBefore+1);
  assert.equal(twice.run.calendar.elapsedDays,dayBefore+1);
  assert.equal(twice.run.character.stats.reason,reasonBefore+2);
  assert.equal(twice.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,counterBefore+1);
  assert.equal(twice.run.resources.money,moneyAfterLodging);
});

function syntheticForcedCatalog():Catalog{
  const choice=schoolNightStudyChoice('school.course.arcana','reason');
  return loadCatalog({
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[],
    careers:[],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'lodging.normal',label:'Normal',housing:'normal',moneyCost:100,
      conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0
    }],
    nightChoices:[choice],
    activities:[]
  },[{
    schemaVersion:1,
    id:'v22-forced-night-fixture',
    reads:[],
    writes:[],
    capabilities:{reads:{housing:true},writes:{nextDay:true}},
    media:[],
    events:[{
      id:'v22.forced.before',
      title:'Forced before lodging',
      trigger:[],
      reactionTriggers:[{kind:'nightPhase',point:'before_lodging'}],
      priorityClass:'forced',
      priority:100,
      blocking:true,
      delivery:{policy:'live'},
      nightPolicy:{
        intercept:'before_lodging',
        suppressLodgingPayment:true,
        suppressVoluntaryMenu:true,
        consumesNight:true
      },
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:10,
      conditions:[],
      variants:[{id:'default',text:'Synthetic forced Night scene.',conditions:[],media:[]}],
      choices:[{id:'continue',label:'Continue',text:'Continue.',conditions:[],effects:[]}]
    }]
  }]);
}

function forcedReady():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  s.run.resources.money=600;
  return s;
}

test('C5-239/C5-242 School voluntary Night-study cannot bypass a pending forced Night scene',()=>{
  const cat=syntheticForcedCatalog();
  let s=dispatch(forcedReady(),{type:'endDay'},cat);
  const reasonBefore=s.run.character.stats.reason;
  assert.equal(s.run.pending?.eventId,'v22.forced.before');
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  assert.throws(()=>dispatch(s,{type:'chooseNightChoice',id:'school.night_study.arcana.reason'},cat),/Сначала завершите ночную сцену|нельзя выбирать ночное занятие/);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lodging.normal'},cat),/Сначала завершите ночную сцену|нельзя выбирать жильё/);
  assert.equal(s.run.character.stats.reason,reasonBefore);
  assert.equal(s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0,0);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.character.stats.reason,reasonBefore);
  assert.equal(s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0,0);
});

test('C5-240 School Night-study fixture owns no adult consent Lust client owner or forced-night state',()=>{
  for(const value of Object.values(manifest.noSchoolAuthority))assert.equal(value,false);
  assert.equal(manifest.authority.producerFactsAuthorized,false);
  assert.equal(manifest.authority.numericThresholdsAuthorized,false);
  assert.equal(manifest.authority.careerTransitionsAuthorized,false);
});

test('C5-241 all current Night-study UI follow-up and accessibility text is RU EN complete',()=>{
  for(const key of manifest.current.uiLocalizationKeys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
  const events=schoolLife.events.filter((e:any)=>e.id.includes('night-study'));
  assert.equal(events.length,25);
  for(const event of events){
    const base='event.'+event.id;
    const keys=[
      base+'.title',
      base+'.variant.default.text',
      base+'.choice.continue.label',
      base+'.choice.continue.text'
    ];
    for(const key of keys){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
});

test('C5-242 current relationship/career Night events are choice-local and do not trigger from School Night-study IDs',()=>{
  const files=[
    'content/packs/lumber-night-production.json',
    'content/packs/satyr-maid-night.json',
    'content/packs/tavern-night.json',
    'content/packs/undead-farm-night.json'
  ];
  const events=files.flatMap(file=>JSON.parse(readFileSync(file,'utf8')).events)
    .filter((e:any)=>e.nightPolicy);
  assert.ok(events.length>=7);
  for(const event of events){
    const triggers=event.reactionTriggers??[];
    for(const trigger of triggers.filter((x:any)=>x.kind==='nightChoiceCompleted')){
      assert.equal(trigger.choice.startsWith('school.night_study.'),false,event.id);
    }
  }
});

test('C5-243/C5-244 classifications keep mechanics and future priority outside School ownership',()=>{
  assert.deepEqual(manifest.conflictMatrix.map((x:any)=>x.classification),[
    'CURRENT','CURRENT','CURRENT','FUTURE_RUNTIME_AUTHORITY','NO_SCHOOL_AUTHORITY','NO_SCHOOL_AUTHORITY'
  ]);
  assert.equal(manifest.status,'AUDIT_PREP_ONLY');
});
