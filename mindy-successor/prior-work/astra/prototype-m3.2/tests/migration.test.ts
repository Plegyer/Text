import test from 'node:test';import assert from 'node:assert/strict';
import {parseSave,dispatch,freshSave} from '../src/core/engine.ts';import {catalog} from './helpers.ts';

test('genuine M2 save migrates to schema4 without inventing ambiguous target stats',()=>{
 const metrics={strength:20,endurance:20,dexterity:20,perception:77,intelligence:20,magic:20,empathy:66,persuasion:20,composure:55,organization:44,money:130,energy:75,health:100,stress:0,debt:0,work:1,lessons:0,alchemy:0,trust:0};
 const raw={schemaVersion:2,contentVersion:'0.1.0',meta:{unlocks:['guild'],completed:['guild-life'],lives:2},run:{id:'life-2',day:3,slot:1,limitDays:448,status:'active',housing:'room',metrics,flags:{'story.arrived':true},inventory:{herb:2,tonic:0,scales:0},actionCounts:{work:1},history:{'base.arrival':{count:1,lastDay:3,variants:{welcome:3}}},pending:{eventId:'base.arrival',variantId:'welcome'},availableEndings:[],acceptedEnding:null,journal:['Старая запись']}};
 let s=parseSave(JSON.stringify(raw),catalog);
 assert.equal(s.schemaVersion,4);assert.equal(s.run.dayState.energyCurrent,2);assert.equal(s.run.character.stats.strength,20);assert.equal(s.run.character.stats.reason,20);assert.equal(s.run.character.stats.charm,20);
 assert.equal(s.run.character.stats.creativity,1);assert.equal(s.run.character.stats.wits,1);assert.equal(s.run.character.stats.sociability,1);assert.equal(s.run.character.stats.manners,1);assert.equal(s.run.character.stats.grooming,1);assert.equal(s.run.character.stats.sexuality,1);
 assert.equal(s.run.legacyCompat?.metrics.perception,77);assert.equal(s.run.legacyCompat?.metrics.empathy,66);assert.equal(s.run.legacyCompat?.metrics.organization,44);
 assert.equal(s.run.character.lust,1);assert.equal(s.run.character.creation.complete,true);assert.equal(s.run.historyState.journal[0],'Старая запись');assert.equal(s.run.flow.pendingScene?.eventId,'base.arrival');
 s=dispatch(s,{type:'choice',id:'introduce'},catalog);assert.equal(s.run.flags['alchemy.intro'],true);assert.deepEqual(s.meta.completedEndings,['guild-life']);
});

test('schema4 serialization contains only target owners, not compatibility facade duplicates',()=>{
 const s=freshSave();const raw=JSON.parse(JSON.stringify(s));
 assert.equal(raw.schemaVersion,4);assert.equal(raw.run.metrics,undefined);assert.equal(raw.run.day,undefined);assert.equal(raw.run.flags,undefined);assert.equal(raw.run.inventory,undefined);assert.equal(raw.meta.completed,undefined);assert.equal(raw.meta.lives,undefined);
 assert.equal(raw.run.resources.money,600);assert.equal(raw.run.dayState.energyCurrent,3);assert.equal(raw.run.calendar.elapsedDays,0);
});

test('protected meta merge never erases newer profile progress',()=>{
 const older=freshSave();older.meta.completedEndings=['guild-life'];older.meta.unlocks=['guild'];
 const current=freshSave().meta;current.completedEndings=['scholar-life'];current.unlocks=['scholar'];current.hardWorkProgress=['lumber'];current.runsStarted=5;current.runsCompleted=4;
 const loaded=parseSave(JSON.stringify(older),catalog,current);
 assert.deepEqual(new Set(loaded.meta.completedEndings),new Set(['guild-life','scholar-life']));assert.deepEqual(new Set(loaded.meta.unlocks),new Set(['guild','scholar']));assert.ok(loaded.meta.hardWorkProgress.includes('lumber'));assert.equal(loaded.meta.runsStarted,5);assert.equal(loaded.meta.runsCompleted,4);
});

test('development save beyond target 160-day calendar is rejected instead of wrapped',()=>{
 const s:any={schemaVersion:3,contentVersion:'0.1.0',meta:{unlocks:[],completed:[],lives:1},run:{id:'life-1',day:200,slot:0,limitDays:448,status:'active',housing:'room',metrics:{strength:1,endurance:1,dexterity:1,perception:1,intelligence:1,magic:1,empathy:1,persuasion:1,composure:1,organization:1,lust:1,money:100,energy:3,health:100,stress:0,debt:0,work:0,lessons:0,alchemy:0,trust:0},flags:{},inventory:{herb:0,tonic:0,scales:0},creation:{remaining:0,allocated:{},complete:true},rng:1,lastAction:null,actionCounts:{},history:{},pending:null,availableEndings:[],acceptedEnding:null,journal:[]}};
 assert.throws(()=>parseSave(JSON.stringify(s),catalog),/160-day target calendar/);
});
