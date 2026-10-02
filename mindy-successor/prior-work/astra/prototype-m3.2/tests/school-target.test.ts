import test from 'node:test';
import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,parseSave,resolveReactions} from '../src/core/engine.ts';
import {
  SCHOOL_ACTION_ID,
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  SCHOOL_LESSON_ENERGY_COST,
  SCHOOL_BODY_CONFIDENCE_LUST_GAIN,
  SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA,
  SCHOOL_NIGHT_STUDY_STAT_GAIN,
  executeSchoolLesson,
  schoolDirectCoverage,
  schoolNightStudyChoice,
  schoolNightStudyChoices,
  type SchoolCourseId
} from '../src/core/school.ts';
import {stats,type Catalog,type Save,type Stat} from '../src/core/schema.ts';

const runtime={applyEffects,resolveReactions};

function fixtureDefinitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[],
    careers:[{
      id:'school.fixture.career',
      label:'School fixture career',
      initialStage:'new',
      stages:['new'],
      transitions:[]
    }],
    quests:[],
    relationships:[],
    lodgings:[{
      id:'school.fixture.room',
      label:'Fixture room',
      housing:'normal',
      moneyCost:100,
      conditions:[],
      effects:[],
      nextDayEffects:[],
      nextDayEnergyDelta:0
    }],
    nightChoices:[schoolNightStudyChoice('school.course.arcana','reason')],
    activities:[]
  };
}

function fixturePack(){
  return {
    schemaVersion:1,
    id:'school-target-fixture',
    reads:[],
    writes:[],
    capabilities:{
      reads:{stats:['magic','reason','creativity']},
      writes:{careers:['school.fixture.career']}
    },
    media:[],
    events:[{
      id:'school-target-fixture.career-ready',
      title:'School fixture career reaction',
      reactionTriggers:[{kind:'actionCompleted',action:SCHOOL_ACTION_ID}],
      priorityClass:'normal_progression',
      priority:50,
      blocking:true,
      delivery:{policy:'live'},
      cooldownDays:0,
      variantCooldownDays:0,
      maxShows:1,
      conditions:[
        {kind:'stat',stat:'magic',op:'gte',value:5},
        {kind:'stat',stat:'reason',op:'gte',value:5},
        {kind:'stat',stat:'creativity',op:'gte',value:3}
      ],
      variants:[{
        id:'default',
        text:'All Arcana gains are visible before this reactive career scene is selected.',
        conditions:[],
        media:[]
      }],
      choices:[{
        id:'continue',
        label:'Continue',
        text:'The career reacts to the completed School package without another paid action.',
        conditions:[],
        effects:[{kind:'addCareerFact',career:'school.fixture.career',fact:'qualified_by_school'}]
      }]
    }]
  };
}

function catalog():Catalog{
  return loadCatalog(fixtureDefinitions(),[fixturePack()]);
}

function schoolReady():Save{
  const s=freshSave();
  s.run.character.creation.remaining=0;
  s.run.character.creation.allocated={};
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  return s;
}

function course(id:SchoolCourseId){
  const found=SCHOOL_COURSES.find(item=>item.id===id);
  if(!found)throw new Error('missing course fixture');
  return found;
}

test('School catalog locks all eight accepted packages and directly covers all 12 progression stats',()=>{
  assert.deepEqual(SCHOOL_COURSE_IDS,[
    'school.course.literacy_and_numbers',
    'school.course.arcana',
    'school.course.rhetoric_and_social',
    'school.course.etiquette_and_presentation',
    'school.course.field_craft',
    'school.course.physical_training',
    'school.course.arts_and_performance',
    'school.course.body_confidence'
  ]);
  assert.deepEqual(SCHOOL_COURSES.map(item=>item.tuition),[300,500,300,400,400,400,500,400]);
  assert.ok(SCHOOL_COURSES.every(item=>item.energyCost===SCHOOL_LESSON_ENERGY_COST));
  assert.deepEqual(SCHOOL_COURSES.map(item=>item.statEffects),[
    [{stat:'reason',amount:4},{stat:'wits',amount:2}],
    [{stat:'magic',amount:4},{stat:'reason',amount:4},{stat:'creativity',amount:2}],
    [{stat:'charm',amount:3},{stat:'sociability',amount:3},{stat:'wits',amount:2}],
    [{stat:'manners',amount:3},{stat:'grooming',amount:3},{stat:'charm',amount:2}],
    [{stat:'dexterity',amount:3},{stat:'wits',amount:3},{stat:'creativity',amount:2}],
    [{stat:'strength',amount:3},{stat:'endurance',amount:3},{stat:'dexterity',amount:2}],
    [{stat:'creativity',amount:3},{stat:'charm',amount:3},{stat:'sociability',amount:2},{stat:'dexterity',amount:2}],
    [{stat:'sexuality',amount:3},{stat:'grooming',amount:3},{stat:'endurance',amount:2}]
  ]);
  assert.deepEqual(schoolDirectCoverage(),[...stats].sort());
  assert.ok(!schoolDirectCoverage().includes('lust' as Stat));
  assert.equal(course('school.course.body_confidence').lustGain,SCHOOL_BODY_CONFIDENCE_LUST_GAIN);
  assert.equal(SCHOOL_COURSES.filter(item=>item.lustGain!==undefined).length,1);
});

test('School lesson rejects insufficient money atomically',()=>{
  const cat=catalog();
  const s=schoolReady();
  const target=course('school.course.arcana');
  s.run.resources.money=target.tuition-1;
  const before=JSON.stringify(s);
  assert.throws(
    ()=>executeSchoolLesson(s,target.id,cat,runtime),
    /money/
  );
  assert.equal(JSON.stringify(s),before);
});

test('School lesson rejects insufficient current-day Energy atomically',()=>{
  const cat=catalog();
  const s=schoolReady();
  s.run.dayState.energyCurrent=0;
  const before=JSON.stringify(s);
  assert.throws(
    ()=>executeSchoolLesson(s,'school.course.literacy_and_numbers',cat,runtime),
    /Energy/
  );
  assert.equal(JSON.stringify(s),before);
});

test('paid multi-stat lesson charges exactly once and Resolver observes the complete package',()=>{
  const cat=catalog();
  const s=schoolReady();
  s.run.character.stats.magic=1;
  s.run.character.stats.reason=1;
  s.run.character.stats.creativity=1;
  const beforeMoney=s.run.resources.money;
  const beforeEnergy=s.run.dayState.energyCurrent;

  const result=executeSchoolLesson(s,'school.course.arcana',cat,runtime);
  const out=result.state;

  assert.equal(s.run.resources.money,beforeMoney);
  assert.equal(s.run.dayState.energyCurrent,beforeEnergy);
  assert.equal(out.run.resources.money,beforeMoney-500);
  assert.equal(out.run.dayState.energyCurrent,beforeEnergy-1);
  assert.equal(out.run.character.stats.magic,5);
  assert.equal(out.run.character.stats.reason,5);
  assert.equal(out.run.character.stats.creativity,3);
  assert.deepEqual(
    result.reactionFacts.filter(fact=>fact.kind==='statChanged').map(fact=>fact.stat).sort(),
    ['creativity','magic','reason']
  );
  assert.equal(out.run.flow.pendingScene?.eventId,'school-target-fixture.career-ready');
});

test('School result can trigger a free reactive career event without another Work action',()=>{
  const cat=catalog();
  let s=schoolReady();
  const energyBefore=s.run.dayState.energyCurrent;

  s=executeSchoolLesson(s,'school.course.arcana',cat,runtime).state;
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.historyState.actionCounts.work,undefined);
  const energyAfterLesson=s.run.dayState.energyCurrent;

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,energyAfterLesson);
  assert.equal(s.run.historyState.actionCounts.work,undefined);
  assert.ok(s.run.progression.careers['school.fixture.career'].facts.includes('qualified_by_school'));
});

test('save/reload after a paid lesson preserves the committed transaction without recharging',()=>{
  const cat=catalog();
  const s=schoolReady();
  const out=executeSchoolLesson(s,'school.course.literacy_and_numbers',cat,runtime).state;
  assert.equal(out.run.resources.money,300);
  assert.equal(out.run.dayState.energyCurrent,2);

  const first=parseSave(JSON.stringify(out),cat);
  const second=parseSave(JSON.stringify(first),cat);

  assert.equal(first.run.resources.money,300);
  assert.equal(first.run.dayState.energyCurrent,2);
  assert.equal(second.run.resources.money,300);
  assert.equal(second.run.dayState.energyCurrent,2);
  assert.equal(second.run.character.stats.reason,out.run.character.stats.reason);
  assert.equal(second.run.character.stats.wits,out.run.character.stats.wits);
});

test('Body Confidence paid lesson adds Lust +2 separately from Sexuality and survives save reload once',()=>{
  const cat=catalog();
  const s=schoolReady();
  s.run.character.lust=11;
  s.run.character.stats.sexuality=7;
  const beforeMoney=s.run.resources.money;
  const beforeEnergy=s.run.dayState.energyCurrent;

  const out=executeSchoolLesson(s,'school.course.body_confidence',cat,runtime).state;

  assert.equal(out.run.character.lust,13);
  assert.equal(out.run.character.stats.sexuality,10);
  assert.equal(out.run.resources.money,beforeMoney-400);
  assert.equal(out.run.dayState.energyCurrent,beforeEnergy-1);
  assert.equal(out.run.progression.school.tracks['school.track.body_confidence']?.counters.lessons_completed,1);

  const first=parseSave(JSON.stringify(out),cat);
  const second=parseSave(JSON.stringify(first),cat);
  assert.equal(first.run.character.lust,13);
  assert.equal(second.run.character.lust,13);
  assert.equal(second.run.character.stats.sexuality,10);
  assert.equal(second.run.progression.school.tracks['school.track.body_confidence']?.counters.lessons_completed,1);
});

test('Night study is a separate zero-tuition Night-slot action with +2 supported stat and next-day Energy -1',()=>{
  const cat=catalog();
  const nightChoice=schoolNightStudyChoice('school.course.arcana','reason');
  assert.ok(schoolNightStudyChoices().some(choice=>choice.id===nightChoice.id));
  assert.equal(nightChoice.effects.length,2);
  assert.deepEqual(nightChoice.effects,[
    {kind:'modifyStat',stat:'reason',delta:SCHOOL_NIGHT_STUDY_STAT_GAIN},
    {kind:'incrementSchoolCounter',track:'school.track.arcana',counter:'night_study_sessions',amount:1}
  ]);
  assert.equal(nightChoice.nextDayEnergyDelta,SCHOOL_NIGHT_STUDY_NEXT_DAY_ENERGY_DELTA);
  assert.deepEqual(nightChoice.nextDayEffects,[]);
  assert.throws(()=>schoolNightStudyChoice('school.course.physical_training','reason'),/not supported/);

  let s=schoolReady();
  s.run.flags['story.arrived']=true;
  s.run.character.stats.reason=10;
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'school.fixture.room'},cat);
  const moneyAfterLodging=s.run.resources.money;
  const careersBefore=JSON.stringify(s.run.progression.careers);
  const questsBefore=JSON.stringify(s.run.progression.quests);
  const relationshipsBefore=JSON.stringify(s.run.progression.relationships);

  s=dispatch(s,{type:'chooseNightChoice',id:nightChoice.id},cat);

  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.character.stats.reason,12);
  assert.equal(s.run.resources.money,moneyAfterLodging);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions,
    1
  );
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0,
    0
  );
  assert.equal(JSON.stringify(s.run.progression.careers),careersBefore);
  assert.equal(JSON.stringify(s.run.progression.quests),questsBefore);
  assert.equal(JSON.stringify(s.run.progression.relationships),relationshipsBefore);
});


test('Body Confidence Night study never inherits paid-lesson Lust growth',()=>{
  const choice=schoolNightStudyChoice('school.course.body_confidence','sexuality');
  assert.deepEqual(choice.effects,[
    {kind:'modifyStat',stat:'sexuality',delta:SCHOOL_NIGHT_STUDY_STAT_GAIN},
    {kind:'incrementSchoolCounter',track:'school.track.body_confidence',counter:'night_study_sessions',amount:1}
  ]);
  assert.equal(choice.effects.some(effect=>effect.kind==='metric'&&effect.key==='lust'),false);
  assert.deepEqual(choice.nextDayEffects,[]);
});
