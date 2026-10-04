import test from 'node:test';
import assert from 'node:assert/strict';

import {loadCatalog} from '../src/core/content.ts';
import {
  availableActivityActions,
  dispatch,
  freshSave,
  parseSave
} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const CAMP_ID='test.multi-day-camp';

function activity(id:string,multiDay:boolean){
  return {
    id,
    label:id,
    version:1,
    entryConditions:[],
    entryEnergyCost:2,
    resumePolicy:'allowed',
    timePolicy:multiDay?'can_advance_days_internally':'same_day',
    failurePolicy:'exit_to_day',
    ...(multiDay?{campPolicy:{maxNights:2}}:{}),
    adapter:'counter.v1',
    adapterConfig:{
      initialEndurance:20,
      advanceEnduranceCost:1,
      successAtProgress:99,
      failAtEndurance:0,
      fieldTimeSegments:2,
      advanceFieldTimeCost:1
    },
    options:[],
    results:[
      {id:id+'.success',outcome:'success',effects:[]},
      {id:id+'.escape',outcome:'escape',effects:[]},
      {id:id+'.failure',outcome:'failure',effects:[]}
    ]
  };
}

function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[],
    lodgings:[
      {
        id:'lodging.normal',
        label:'Normal room',
        housing:'normal',
        moneyCost:100,
        conditions:[],
        effects:[],
        nextDayEffects:[],
        nextDayEnergyDelta:0
      }
    ],
    nightChoices:[],
    activities:[
      activity(CAMP_ID,true),
      activity('test.same-day',false)
    ]
  };
}

function forcedNightPack(){
  return {
    schemaVersion:1,
    id:'camp-debt',
    reads:[],
    writes:[],
    capabilities:{
      reads:{worldFacts:['test.bound']},
      writes:{nextDay:true}
    },
    media:[],
    events:[{
      id:'camp-debt.forced-night',
      title:'Synthetic bound Night',
      trigger:[],
      reactionTriggers:[{kind:'nightPhase',point:'before_lodging'}],
      priorityClass:'forced',
      priority:1000,
      blocking:true,
      delivery:{policy:'live'},
      nightPolicy:{
        intercept:'before_lodging',
        suppressLodgingPayment:false,
        suppressVoluntaryMenu:true,
        consumesNight:true
      },
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:160,
      conditions:[{kind:'worldFact',fact:'test.bound',present:true}],
      variants:[{id:'default',text:'Synthetic forced Night.',conditions:[],media:[]}],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'Apply the locked next-day penalty.',
        conditions:[],
        effects:[{
          kind:'addNextDayModifier',
          energyDelta:-1,
          statEffects:[],
          tag:'test.bound-night'
        }]
      }]
    }]
  };
}

function catalog():Catalog{
  return loadCatalog(definitions(),[forcedNightPack()]);
}

function start():Save{
  const s=freshSave();
  s.run.creation={
    remaining:0,
    allocated:{},
    activeHardWorkPackages:[],
    hardWorkPackagesApplied:true,
    complete:true
  };
  s.run.flags['story.arrived']=true;
  return s;
}

function enter(cat:Catalog,id=CAMP_ID){
  return dispatch(start(),{type:'enterActivity',id},cat);
}

function exhaustFieldTime(s:Save,cat:Catalog){
  let next=dispatch(s,{type:'activityAction',id:'advance'},cat);
  next=dispatch(next,{type:'activityAction',id:'advance'},cat);
  assert.equal(next.run.flow.activity?.internalState.fieldTimeRemaining,0);
  return next;
}

function completeCampBoundary(s:Save,cat:Catalog){
  let next=dispatch(s,{type:'activityAction',id:'camp'},cat);
  next=dispatch(next,{type:'activityAction',id:'camp.advance-calendar'},cat);
  next=dispatch(next,{type:'activityAction',id:'camp.refresh-field-time'},cat);
  return next;
}

test('Camp state is typed, neutral for old active saves, and Activity entry still costs exactly 2 Energy',()=>{
  const cat=catalog();
  let s=enter(cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.campStateVersion,1);
  assert.deepEqual(s.run.flow.activity?.campState,{
    phase:'idle',
    nightsUsed:0,
    boundaryDay:null,
    calendarAdvanceCommitted:false,
    fieldTimeRefreshCommitted:false
  });

  const raw=JSON.parse(JSON.stringify(s));
  delete raw.run.flow.activity.campStateVersion;
  delete raw.run.flow.activity.campState;
  s=parseSave(JSON.stringify(raw),cat);
  assert.equal(s.run.flow.activity?.campStateVersion,1);
  assert.deepEqual(s.run.flow.activity?.campState,{
    phase:'idle',
    nightsUsed:0,
    boundaryDay:null,
    calendarAdvanceCommitted:false,
    fieldTimeRefreshCommitted:false
  });
  assert.equal(s.run.dayState.energyCurrent,1);
});

test('Camp choice persists before calendar advance and reload does not infer or duplicate boundary state',()=>{
  const cat=catalog();
  let s=exhaustFieldTime(enter(cat),cat);
  s=parseSave(JSON.stringify(s),cat);
  assert.ok(availableActivityActions(s,cat).some(action=>action.id==='camp'));

  s=dispatch(s,{type:'activityAction',id:'camp'},cat);
  assert.equal(s.run.day,0);
  assert.deepEqual(s.run.flow.activity?.campState,{
    phase:'chosen',
    nightsUsed:0,
    boundaryDay:0,
    calendarAdvanceCommitted:false,
    fieldTimeRefreshCommitted:false
  });

  const restored=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(restored.run.flow.activity?.campState,s.run.flow.activity?.campState);
  assert.deepEqual(availableActivityActions(restored,cat).map(action=>action.id),['camp.advance-calendar']);
});

test('Camp calendar advance and Field Time refresh each commit exactly once across reload',()=>{
  const cat=catalog();
  let s=exhaustFieldTime(enter(cat),cat);
  const money=s.run.resources.money;
  const energy=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'activityAction',id:'camp'},cat);
  s=dispatch(s,{type:'activityAction',id:'camp.advance-calendar'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,money);
  assert.equal(s.run.dayState.energyCurrent,energy);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,0);
  assert.deepEqual(s.run.flow.activity?.campState,{
    phase:'calendar_advanced',
    nightsUsed:1,
    boundaryDay:0,
    calendarAdvanceCommitted:true,
    fieldTimeRefreshCommitted:false
  });

  s=parseSave(JSON.stringify(s),cat);
  const afterCalendar=JSON.stringify(s);
  assert.throws(
    ()=>dispatch(s,{type:'activityAction',id:'camp.advance-calendar'},cat),
    /Camp calendar advance/
  );
  assert.equal(JSON.stringify(s),afterCalendar);

  s=dispatch(s,{type:'activityAction',id:'camp.refresh-field-time'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.dayState.energyCurrent,energy);
  assert.equal(s.run.flow.activity?.internalState.fieldTimeRemaining,2);
  assert.deepEqual(s.run.flow.activity?.campState,{
    phase:'field_day_ready',
    nightsUsed:1,
    boundaryDay:0,
    calendarAdvanceCommitted:true,
    fieldTimeRefreshCommitted:true
  });

  s=parseSave(JSON.stringify(s),cat);
  const afterRefresh=JSON.stringify(s);
  assert.throws(
    ()=>dispatch(s,{type:'activityAction',id:'camp.refresh-field-time'},cat),
    /Field Time refresh/
  );
  assert.equal(JSON.stringify(s),afterRefresh);
});

test('ordinary Camp replaces city Night, charges no lodging, refreshes no global Energy, and stops after two nights',()=>{
  const cat=catalog();
  let s=exhaustFieldTime(enter(cat),cat);
  const money=s.run.resources.money;
  const energy=s.run.dayState.energyCurrent;

  s=completeCampBoundary(s,cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,money);
  assert.equal(s.run.dayState.energyCurrent,energy);
  assert.equal(s.run.flow.activity?.campState.nightsUsed,1);

  s=exhaustFieldTime(s,cat);
  s=completeCampBoundary(s,cat);
  assert.equal(s.run.day,2);
  assert.equal(s.run.resources.money,money);
  assert.equal(s.run.dayState.energyCurrent,energy);
  assert.equal(s.run.flow.activity?.campState.nightsUsed,2);

  s=exhaustFieldTime(s,cat);
  assert.equal(availableActivityActions(s,cat).some(action=>action.id==='camp'),false);
  const before=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'activityAction',id:'camp'},cat),/Camp сейчас недоступен/);
  assert.equal(JSON.stringify(s),before);
  assert.equal(s.run.day,2);
});

test('Secret-Debt-shaped forced Night preempts Camp, terminates Activity continuation, pays lodging once, and applies Energy -1',()=>{
  const cat=catalog();
  let source=start();
  source.run.progression.worldFacts.push('test.bound');
  let s=dispatch(source,{type:'enterActivity',id:CAMP_ID},cat);
  s=exhaustFieldTime(s,cat);
  s=dispatch(s,{type:'activityAction',id:'camp'},cat);

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'activityAction',id:'camp.advance-calendar'},cat);
  assert.equal(s.run.day,0,'forced Night must own the boundary before Camp calendar commit');
  assert.equal(s.run.flow.activity,null,'Camp continuation must terminate at the forced Night intercept');
  assert.equal(s.run.pending?.eventId,'camp-debt.forced-night');
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  assert.equal(s.run.resources.money,600);

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  assert.deepEqual(
    s.run.dayState.nextDayModifiers.tags.filter(tag=>tag==='test.bound-night'),
    ['test.bound-night']
  );

  s=parseSave(JSON.stringify(s),cat);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},cat);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.day,1);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.historyState.eventHistory['camp-debt.forced-night']?.count,1);

  s=parseSave(JSON.stringify(s),cat);
  const after=JSON.stringify(s);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lodging.normal'},cat),/Ночная последовательность не начата/);
  assert.equal(JSON.stringify(s),after);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,500);
});

test('Camp is unavailable to same-day Activity and incompatible persisted Camp/calendar states fail explicitly',()=>{
  const cat=catalog();
  let same=exhaustFieldTime(enter(cat,'test.same-day'),cat);
  assert.equal(availableActivityActions(same,cat).some(action=>action.id==='camp'),false);
  assert.throws(()=>dispatch(same,{type:'activityAction',id:'camp'},cat),/Camp сейчас недоступен/);

  let multi=enter(cat);
  const raw=JSON.parse(JSON.stringify(multi));
  raw.run.calendar.elapsedDays=1;
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),cat),
    /persisted nightsUsed/
  );

  const partial=JSON.parse(JSON.stringify(multi));
  delete partial.run.flow.activity.campStateVersion;
  assert.throws(
    ()=>parseSave(JSON.stringify(partial),cat),
    /Несовместимое persisted Activity Camp state/
  );

  multi=exhaustFieldTime(multi,cat);
  const chosen=JSON.parse(JSON.stringify(multi));
  chosen.run.flow.activity.campState={
    phase:'chosen',
    nightsUsed:0,
    boundaryDay:0,
    calendarAdvanceCommitted:true,
    fieldTimeRefreshCommitted:false
  };
  assert.throws(
    ()=>parseSave(JSON.stringify(chosen),cat),
    /chosen Activity Camp state/
  );
});

test('catalog accepts Camp only for explicit multi-day finite-Field-Time Activity',()=>{
  assert.doesNotThrow(()=>catalog());

  const badTime=definitions() as any;
  badTime.activities[0].timePolicy='same_day';
  assert.throws(()=>loadCatalog(badTime,[forcedNightPack()]),/can_advance_days_internally/);

  const noFieldTime=definitions() as any;
  delete noFieldTime.activities[0].adapterConfig.fieldTimeSegments;
  noFieldTime.activities[0].adapterConfig.advanceFieldTimeCost=0;
  assert.throws(()=>loadCatalog(noFieldTime,[forcedNightPack()]),/finite Field Time/);

  const tooMany=definitions() as any;
  tooMany.activities[0].campPolicy.maxNights=3;
  assert.throws(()=>loadCatalog(tooMany,[forcedNightPack()]));
});
