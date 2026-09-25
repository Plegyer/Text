import test from 'node:test';import assert from 'node:assert/strict';
import {freshSave,dispatch,calendar,parseSave,meets,actionCost,rent,energyMax,eventChance} from '../src/core/engine.ts';
import {stats} from '../src/core/schema.ts';import {catalog,act,started,created} from './helpers.ts';

test('creation: twelve target stats start at one, ten points, Lust is separate',()=>{
 let s=freshSave();for(const k of stats)assert.equal(s.run.character.stats[k],1);assert.equal(s.run.character.lust,1);assert.equal(s.run.dayState.energyCurrent,3);assert.equal(s.run.resources.money,600);
 assert.throws(()=>act(s,'arrival'));assert.throws(()=>dispatch(s,{type:'finishCreation'},catalog));
 s=dispatch(s,{type:'allocate',stat:'charm',delta:1},catalog);s=dispatch(s,{type:'allocate',stat:'charm',delta:-1},catalog);assert.equal(s.run.character.creation.remaining,10);
 s=created();assert.equal(s.run.character.creation.complete,true);assert.throws(()=>dispatch(s,{type:'allocate',stat:'charm',delta:1},catalog));
});

test('calendar: four 10-day seasons over four 40-day years',()=>{
 assert.deepEqual(calendar(0),{year:1,season:'spring',date:1});assert.deepEqual(calendar(9),{year:1,season:'spring',date:10});assert.deepEqual(calendar(10),{year:1,season:'summer',date:1});assert.deepEqual(calendar(39),{year:1,season:'winter',date:10});assert.deepEqual(calendar(40),{year:2,season:'spring',date:1});assert.deepEqual(calendar(159),{year:4,season:'winter',date:10});
});

test('three work actions consume three Energy; sleep restores target base Energy',()=>{
 let s=started();s=act(s,'tavern');s=act(s,'tavern');s=act(s,'tavern');assert.equal(s.run.day,0);assert.equal(s.run.dayState.energyCurrent,0);
 const before=JSON.stringify(s);assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));assert.equal(JSON.stringify(s),before);
 const money=s.run.resources.money;s=dispatch(s,{type:'sleep',payment:'money'},catalog);assert.equal(s.run.day,1);assert.equal(s.run.dayState.energyCurrent,3);assert.equal(s.run.resources.money,money-100);
});

test('street sleep costs no money but gives next-day Energy and Grooming penalties',()=>{
 let s=started();const g=s.run.character.stats.grooming;s=dispatch(s,{type:'sleep',payment:'outside'},catalog);assert.equal(s.run.dayState.energyCurrent,2);assert.equal(s.run.housingState.current,'street');assert.equal(s.run.character.stats.grooming,Math.max(0,g-1));
 assert.equal(rent(s),100);s.run.metrics.money=0;assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));assert.doesNotThrow(()=>dispatch(s,{type:'sleep',payment:'outside'},catalog));
});

test('pending scene blocks sleep and actions; persisted variant resolves once',()=>{
 const initial=started();let s=dispatch(initial,{type:'action',id:'work'},catalog);assert.equal(s.run.pending?.eventId,'base.arrival');
 assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));
 s=parseSave(JSON.stringify(s),catalog);s=dispatch(s,{type:'choice',id:'introduce'},catalog);assert.equal(s.run.metrics.trust,3);assert.throws(()=>dispatch(s,{type:'choice',id:'introduce'},catalog));
});

test('legacy demo routes remain reachable through compatibility fields without serializing duplicate owners',()=>{
 let s=started();for(let i=0;i<5;i++)s=act(s,'work');s=act(s,'brew','gentle');s=act(s,'brew','gentle');s=act(s,'deliver');assert.ok(s.run.availableEndings.includes('guild-life'));
 for(let i=0;i<3;i++)s=act(s,'school');s=act(s,'exam');assert.ok(s.run.availableEndings.includes('scholar-life'));assert.throws(()=>act(s,'exam'));
 s=dispatch(s,{type:'accept',id:'scholar-life'},catalog);assert.ok(s.meta.completedEndings.includes('scholar-life'));assert.throws(()=>dispatch(s,{type:'accept',id:'scholar-life'},catalog));
 const json=JSON.parse(JSON.stringify(s));assert.equal(json.run.metrics,undefined);assert.equal(json.run.resources.money,s.run.resources.money);
});

test('scholar free lesson once weekly; protected meta merge survives schema4 reload',()=>{
 let s=started();s.meta.unlocks=['scholar'];const school=catalog.definitions.actions.find(a=>a.id==='school')!;assert.equal(actionCost(school,s),0);s=act(s,'school');assert.ok(actionCost(school,s)>0);s.run.day=7;assert.equal(actionCost(school,s),0);
 const loaded=parseSave(JSON.stringify(started()),catalog,s.meta);assert.ok(loaded.meta.unlocks.includes('scholar'));
});

test('brewing and debt compatibility remains atomic',()=>{
 let s=started();s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,0);s=act(s,'scales');s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,2);
 assert.throws(()=>act(s,'brew','gentle'));s.run.metrics.debt=5;s.run.metrics.money=100;s=act(s,'repay');assert.equal(s.run.metrics.debt,0);
});

test('refusal still blocks repeated romantic invitation',()=>{let s=started();s=act(s,'work');s=act(s,'work');s=dispatch(s,{type:'action',id:'visit'},catalog);assert.equal(s.run.pending?.eventId,'base.invite');s=dispatch(s,{type:'choice',id:'no'},catalog);for(let i=0;i<3;i++)s=act(s,'visit');assert.equal(s.run.history['base.invite'].count,1);});

test('legacy vitality demo unlock still maps to derived Energy compatibility',()=>{let s=started();s.meta.unlocks.push('vitality');assert.equal(energyMax(s),4);});

test('Lust changes probability and choices; deterministic roll/media survive reload',()=>{
 const e=catalog.events.find(e=>e.id==='stage.goblin')!;const s=started();assert.equal(eventChance(e,s),.092);s.run.metrics.lust=60;assert.ok(eventChance(e,s)>.79);s.run.metrics.lust=100;assert.equal(eventChance(e,s),.85);
 s.run.flags['woods.met']=true;s.run.actionCounts.lumber=1;s.run.rng=0;
 const a=dispatch(s,{type:'action',id:'lumber'},catalog),b=dispatch(parseSave(JSON.stringify(s),catalog),{type:'action',id:'lumber'},catalog);assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)));assert.equal(a.run.pending?.eventId,'stage.goblin');assert.equal(a.run.pending?.variantId,'curious');
 const c=dispatch(a,{type:'choice',id:'flirt'},catalog);assert.deepEqual(c.run.lastAction?.media,['stage.flirt']);assert.equal(parseSave(JSON.stringify(c),catalog).run.lastAction?.media[0],'stage.flirt');
 const low=parseSave(JSON.stringify(a),catalog);low.run.metrics.lust=1;assert.throws(()=>dispatch(low,{type:'choice',id:'flirt'},catalog));assert.doesNotThrow(()=>dispatch(low,{type:'choice',id:'work'},catalog));
});

test('variant cooldown and scene history persist across schema4 saves',()=>{let s=started();for(let i=0;i<5;i++)s=act(s,'work');const count=s.run.history['base.workday'].count;s=parseSave(JSON.stringify(s),catalog);s=act(s,'work');assert.equal(s.run.history['base.workday'].count,count);});

test('expiry handled at end of locked 160-day calendar; restart preserves meta',()=>{let s=started();s.run.day=159;s=dispatch(s,{type:'sleep',payment:'outside'},catalog);assert.equal(s.run.status,'expired');assert.equal(s.run.day,159);assert.throws(()=>act(s,'tavern'));s.meta.unlocks=['host'];s=dispatch(s,{type:'restart'},catalog);assert.equal(s.run.day,0);assert.equal(s.run.resources.money,600);});

test('invalid save values and incompatible version are rejected',()=>{assert.throws(()=>parseSave('{broken',catalog));const s=started();assert.throws(()=>parseSave(JSON.stringify({...JSON.parse(JSON.stringify(s)),schemaVersion:99}),catalog));s.run.metrics.energy=25;assert.throws(()=>parseSave(JSON.stringify(s),catalog));});

test('all/any/not conditions still compose',()=>{const s=started();assert.ok(meets({kind:'all',conditions:[{kind:'season',value:'spring'},{kind:'not',condition:{kind:'unlock',value:'guild'}}]},s));});
