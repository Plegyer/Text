import test from 'node:test';import assert from 'node:assert/strict';
import {parseSave,dispatch,freshSave} from '../src/core/engine.ts';import {catalog} from './helpers.ts';

function oldMetrics(overrides:Record<string,number>={}){
 return {
  strength:20,endurance:19,dexterity:18,perception:17,intelligence:16,magic:15,empathy:14,persuasion:13,composure:12,organization:11,
  lust:9,money:130,energy:2,health:100,stress:0,debt:4,work:1,lessons:2,alchemy:3,trust:5,...overrides
 };
}
function rawV3(overrides:any={}){
 return {
  schemaVersion:3,contentVersion:'0.1.0',
  meta:{unlocks:['guild'],completed:['guild-life'],lives:2},
  run:{
   id:'life-2',day:3,slot:1,limitDays:448,status:'active',housing:'room',metrics:oldMetrics(),
   flags:{'story.arrived':true},inventory:{herb:2,tonic:0,scales:0},
   creation:{remaining:0,allocated:{},complete:true},rng:123,lastAction:null,
   actionCounts:{work:1},history:{},pending:null,availableEndings:[],acceptedEnding:null,journal:['Старая запись'],
   ...overrides
  }
 };
}

test('genuine M2 save migrates through v3 into schema6 without losing pending scene/meta',()=>{
 const raw={
  schemaVersion:2,contentVersion:'0.1.0',meta:{unlocks:['guild'],completed:['guild-life'],lives:2},
  run:{id:'life-2',day:3,slot:1,limitDays:448,status:'active',housing:'room',metrics:oldMetrics({energy:75}),flags:{'story.arrived':true},inventory:{herb:2,tonic:0,scales:0},actionCounts:{work:1},history:{'base.arrival':{count:1,lastDay:3,variants:{welcome:3}}},pending:{eventId:'base.arrival',variantId:'welcome'},availableEndings:[],acceptedEnding:null,journal:['Старая запись']}
 };
 let s=parseSave(JSON.stringify(raw),catalog);
 assert.equal(s.schemaVersion,6);
 assert.equal(s.run.dayState.energyCurrent,2);
 assert.equal(s.run.character.stats.strength,20);
 assert.equal(s.run.character.stats.reason,16);
 assert.equal(s.run.character.stats.charm,13);
 assert.equal(s.run.character.lust,1);
 assert.equal(s.run.character.creation.complete,true);
 assert.equal(s.run.historyState.journal[0],'Старая запись');
 assert.equal(s.run.flow.pendingScene?.eventId,'base.arrival');
 s=dispatch(s,{type:'choice',id:'introduce'},catalog);
 assert.equal(s.run.flags['alchemy.intro'],true);
 assert.deepEqual(s.meta.completedEndings,['guild-life']);
});

test('schema3 migration maps only safe target stats and quarantines ambiguous prototype metrics',()=>{
 const s=parseSave(JSON.stringify(rawV3()),catalog);
 assert.equal(s.run.character.stats.strength,20);
 assert.equal(s.run.character.stats.endurance,19);
 assert.equal(s.run.character.stats.dexterity,18);
 assert.equal(s.run.character.stats.reason,16);
 assert.equal(s.run.character.stats.magic,15);
 assert.equal(s.run.character.stats.charm,13);
 for(const stat of ['creativity','wits','sociability','manners','grooming','sexuality'] as const)assert.equal(s.run.character.stats[stat],1);
 assert.equal(s.run.legacyCompat?.metrics.perception,17);
 assert.equal(s.run.legacyCompat?.metrics.empathy,14);
 assert.equal(s.run.legacyCompat?.metrics.composure,12);
 assert.equal(s.run.legacyCompat?.metrics.organization,11);
 assert.equal(s.run.resources.money,130);
 assert.equal(s.run.dayState.energyCurrent,2);
 assert.equal(s.run.calendar.elapsedDays,3);
 assert.equal(s.run.rngState.state,123);
 assert.equal(s.run.legacyCompat?.originalLimitDays,448);
});

test('schema3 migration maps only explicit safe legacy flags to typed facts and quarantines the rest',()=>{
 const s=parseSave(JSON.stringify(rawV3({flags:{'story.arrived':true,'story.mystery':true,'alchemy.intro':true}})),catalog);
 assert.deepEqual(new Set(s.run.progression.worldFacts),new Set(['story.arrived','story.mystery']));
 assert.equal(s.run.legacyCompat?.flags['alchemy.intro'],true);
 assert.equal(s.run.progression.worldFacts.includes('alchemy.intro'),false);
});

test('schema3 pending variant and RNG survive roundtrip without reroll',()=>{
 const raw=rawV3({
  rng:0,
  history:{'base.arrival':{count:1,lastDay:3,variants:{welcome:3}}},
  pending:{eventId:'base.arrival',variantId:'welcome'}
 });
 const a=parseSave(JSON.stringify(raw),catalog);
 const json=JSON.stringify(a);
 const b=parseSave(json,catalog);
 assert.equal(b.run.pending?.eventId,'base.arrival');
 assert.equal(b.run.pending?.variantId,'welcome');
 assert.equal(b.run.rng,0);
 assert.deepEqual(JSON.parse(json),JSON.parse(JSON.stringify(b)));
});

test('protected meta merge unions progress and never lowers run counters',()=>{
 const imported=parseSave(JSON.stringify(rawV3()),catalog);
 const current=freshSave();current.meta.completedEndings=['scholar-life'];current.meta.unlocks=['scholar'];current.meta.hardWorkProgress=['lumber'];current.meta.runsStarted=5;current.meta.runsCompleted=3;
 const merged=parseSave(JSON.stringify(imported),catalog,current.meta);
 assert.deepEqual(new Set(merged.meta.completedEndings),new Set(['guild-life','scholar-life']));
 assert.deepEqual(new Set(merged.meta.unlocks),new Set(['guild','scholar']));
 assert.ok(merged.meta.hardWorkProgress.includes('lumber'));
 assert.equal(merged.meta.runsStarted,5);assert.equal(merged.meta.runsCompleted,3);
});

test('old prototype dates outside target 160-day calendar are rejected instead of wrapped',()=>{
 const raw=rawV3({day:200});
 assert.throws(()=>parseSave(JSON.stringify(raw),catalog),/160-дневного календаря/);
});
