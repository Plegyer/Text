import test from 'node:test';import assert from 'node:assert/strict';
import {parseSave,dispatch} from '../src/core/engine.ts';import {catalog} from './helpers.ts';
test('genuine M2 save migrates without shrinking stats or losing pending scene/meta',()=>{
 // Construct against the saved M2 schema fields, not a current v3 save with its version changed.
 const metrics={strength:20,endurance:20,dexterity:20,perception:20,intelligence:20,magic:20,empathy:20,persuasion:20,composure:20,organization:21,money:130,energy:75,health:100,stress:0,debt:0,work:1,lessons:0,alchemy:0,trust:0};
 const raw={schemaVersion:2,contentVersion:'0.1.0',meta:{unlocks:['guild'],completed:['guild-life'],lives:2},run:{id:'life-2',day:3,slot:1,limitDays:448,status:'active',housing:'room',metrics,flags:{'story.arrived':true},inventory:{herb:2,tonic:0,scales:0},actionCounts:{work:1},history:{'base.arrival':{count:1,lastDay:3,variants:{welcome:3}}},pending:{eventId:'base.arrival',variantId:'welcome'},availableEndings:[],acceptedEnding:null,journal:['Старая запись']}};
 let s=parseSave(JSON.stringify(raw),catalog);assert.equal(s.schemaVersion,3);assert.equal(s.run.metrics.energy,2);assert.equal(s.run.metrics.strength,20);assert.equal(s.run.metrics.lust,1);assert.equal(s.run.creation.complete,true);assert.equal(s.run.journal[0],'Старая запись');assert.equal(s.run.pending?.eventId,'base.arrival');
 s=dispatch(s,{type:'choice',id:'introduce'},catalog);assert.equal(s.run.flags['alchemy.intro'],true);assert.deepEqual(s.meta.completed,['guild-life']);
});
