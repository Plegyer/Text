import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,eligible} from '../src/core/engine.ts';
import {stats,type Catalog,type Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));

function catalog(pack=productionPack):Catalog{return loadCatalog(structuredClone(definitions),[structuredClone(pack)]);}

function ready(day=0):Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.flags['story.arrived']=true;
  s.run.calendar.elapsedDays=day;
  s.run.dayState.energyCurrent=3;
  for(const stat of stats)s.run.character.stats[stat]=10;
  return s;
}

function resolveAll(input:Save,cat:Catalog):Save{
  let s=input,guard=0;
  while(s.run.pending){
    if(++guard>8)throw new Error('Lumber fixture reaction loop');
    const event=cat.events.find(e=>e.id===s.run.pending!.eventId)!;
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choice=event.choices.find(c=>allowed.includes(c.id)&&eligible(c.conditions,s,cat));
    if(!choice)throw new Error('No eligible Lumber fixture choice');
    s=dispatch(s,{type:'choice',id:choice.id},cat);
  }
  return s;
}

test('Lumber production fixture is schema-valid target content',()=>{
  assert.doesNotThrow(()=>catalog());
});

test('ordinary Lumber shift costs 1 Energy, increments its typed completed-shift counter once, and applies the locked seasonal matrix exactly',()=>{
  const cases=[
    {day:0,season:'spring',effects:{strength:1,endurance:1,grooming:-1},media:'job.lumber.shift.spring.default'},
    {day:10,season:'summer',effects:{strength:1,endurance:1,grooming:-1,manners:-1},media:'job.lumber.shift.summer.default'},
    {day:20,season:'autumn',effects:{strength:1,dexterity:1,endurance:-1},media:'job.lumber.shift.autumn.default'},
    {day:30,season:'winter',effects:{endurance:2,sociability:-1},media:'job.lumber.shift.winter.default'}
  ] as const;
  const cat=catalog();
  for(const c of cases){
    const source=ready(c.day);
    const before={...source.run.character.stats};
    const out=dispatch(source,{type:'action',id:'lumber.shift'},cat);
    assert.equal(out.run.dayState.energyCurrent,2,c.season);
    assert.equal(out.run.progression.careers.lumber.counters.completed_shifts,1,c.season);
    assert.equal(source.run.progression.careers.lumber,undefined,c.season);
    for(const stat of stats){
      const delta=out.run.character.stats[stat]-before[stat];
      assert.equal(delta,(c.effects as any)[stat]??0,`${c.season} ${stat}`);
    }
    assert.deepEqual(out.run.lastAction?.media,[c.media],c.season);
  }
});

test('career and Foreman reactions after a shift cost 0 extra Energy and preserve the professional non-romance route',()=>{
  const cat=catalog();
  let s=dispatch(ready(),{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.stage,'accepted-hand');
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');

  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
});

test('Lumber Hard Work is false at 49 and becomes eligible at exactly 50 completed shifts with no milestone, season, relationship, or Forest prerequisite',()=>{
  const cat=catalog();
  const s=ready();
  s.run.progression.careers.lumber={
    stage:'newcomer',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };
  const hardWork=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;
  assert.equal(eligible(hardWork.conditions,s,cat),false);
  assert.equal(s.run.progression.relationships['lumber.foreman'],undefined);
  assert.deepEqual(s.run.progression.worldFacts,[]);
  assert.deepEqual(s.run.endings.eligible,[]);

  const out=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(out.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(eligible(hardWork.conditions,out,cat),true);
  assert.ok(out.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(out.run.progression.relationships['lumber.foreman'],undefined);
});

test('A6 applies exactly one hardWork:lumber reward on committed completion',()=>{
  const cat=catalog();
  let s=ready();
  s.run.progression.careers.lumber={
    stage:'newcomer',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  s=resolveAll(s,cat);
  const ending=cat.definitions.endings.find(e=>e.id==='ending.lumber.hard-work')!;
  assert.deepEqual((ending.metaRewards??[]).map(r=>r.kind==='hardWork'?`${r.kind}:${r.career}`:r.kind),['hardWork:lumber']);

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  s=dispatch(s,{type:'newLife'},cat);
  assert.equal(s.run.character.stats.strength,4);
  assert.equal(s.run.character.stats.endurance,4);
});

test('Lumber presentation IDs are semantic and remain stable when asset paths are replaced',()=>{
  const ids=productionPack.media.map((m:any)=>m.id);
  assert.ok(ids.every((id:string)=>id.startsWith('job.lumber.')||id.startsWith('relationship.lumber.')));
  assert.ok(ids.every((id:string)=>!id.endsWith('.gif')));

  const replaced=structuredClone(productionPack);
  for(const media of replaced.media)media.src='assets/replacements/lumber-placeholder.gif';
  const cat=catalog(replaced);
  const action=cat.definitions.actions.find(a=>a.id==='lumber.shift')!;
  assert.deepEqual(action.scenes?.map(v=>v.media),definitions.actions[0].scenes.map((v:any)=>v.media));

  const out=dispatch(ready(10),{type:'action',id:'lumber.shift'},cat);
  assert.deepEqual(out.run.lastAction?.media,['job.lumber.shift.summer.default']);
});
