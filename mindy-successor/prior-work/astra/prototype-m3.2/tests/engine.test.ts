import test from 'node:test';import assert from 'node:assert/strict';
import {freshSave,dispatch,calendar,parseSave,meets,actionCost,rent,energyMax,eventChance} from '../src/core/engine.ts';
import {stats} from '../src/core/schema.ts';import {catalog,act,started,created} from './helpers.ts';

test('creation: twelve low stats, ten points, separate lust, no play before completion',()=>{
 let s=freshSave();
 assert.equal(s.schemaVersion,6);
 for(const k of stats)assert.equal(s.run.character.stats[k],1);
 assert.equal(s.run.character.lust,5);
 assert.equal(s.run.resources.money,600);
 assert.equal(s.run.dayState.energyCurrent,3);
 assert.throws(()=>act(s,'arrival'));
 assert.throws(()=>dispatch(s,{type:'finishCreation'},catalog));
 s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
 s=dispatch(s,{type:'allocate',stat:'strength',delta:-1},catalog);
 assert.equal(s.run.creation.remaining,10);
 assert.throws(()=>dispatch(s,{type:'allocate',stat:'lust',delta:1} as any,catalog));
 s=created();assert.equal(s.run.creation.complete,true);
 assert.throws(()=>dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog));
});

test('calendar: ten-day seasons across four forty-day years',()=>{
 assert.deepEqual(calendar(0),{year:1,season:'spring',date:1,dayInYear:1});
 assert.deepEqual(calendar(9),{year:1,season:'spring',date:10,dayInYear:10});
 assert.deepEqual(calendar(10),{year:1,season:'summer',date:1,dayInYear:11});
 assert.deepEqual(calendar(39),{year:1,season:'winter',date:10,dayInYear:40});
 assert.deepEqual(calendar(40),{year:2,season:'spring',date:1,dayInYear:1});
 assert.deepEqual(calendar(159),{year:4,season:'winter',date:10,dayInYear:40});
 assert.equal(freshSave().run.limitDays,160);
});

test('three work actions consume three energy; sleep advances one day and restores',()=>{
 let s=started();s=act(s,'tavern');s=act(s,'tavern');s=act(s,'tavern');
 assert.equal(s.run.day,0);assert.equal(s.run.metrics.energy,0);
 const before=JSON.stringify(s);assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));assert.equal(JSON.stringify(s),before);
 const money=s.run.metrics.money;s=dispatch(s,{type:'sleep',payment:'money'},catalog);
 assert.equal(s.run.day,1);assert.equal(s.run.metrics.energy,3);assert.equal(s.run.metrics.money,money-100);
});

test('outside sleep costs next-day energy and grooming; favor is an explicit stat cost',()=>{
 let s=started();const grooming=s.run.character.stats.grooming;
 s=dispatch(s,{type:'sleep',payment:'outside'},catalog);
 assert.equal(s.run.metrics.energy,2);assert.equal(s.run.housing,'shelter');assert.equal(s.run.character.stats.grooming,Math.max(0,grooming-1));
 const strength=s.run.character.stats.strength;
 s=dispatch(s,{type:'sleep',payment:'favor'},catalog);
 assert.equal(s.run.character.stats.strength,strength-1);assert.equal(s.run.metrics.energy,3);
 s.run.character.stats.strength=0;assert.throws(()=>dispatch(s,{type:'sleep',payment:'favor'},catalog));
 s.run.metrics.money=0;assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));
 assert.doesNotThrow(()=>dispatch(s,{type:'sleep',payment:'outside'},catalog));
});

test('pending scene blocks sleep and other actions; persists variant and resolves once',()=>{
 const initial=started();let s=dispatch(initial,{type:'action',id:'work'},catalog);assert.equal(s.run.pending?.eventId,'base.arrival');
 assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));
 s=parseSave(JSON.stringify(s),catalog);s=dispatch(s,{type:'choice',id:'introduce'},catalog);assert.equal(s.run.metrics.trust,3);assert.throws(()=>dispatch(s,{type:'choice',id:'introduce'},catalog));
});

test('legacy demo endings still work through compatibility layer while target state stays authoritative',()=>{
 let s=started();for(let i=0;i<5;i++)s=act(s,'work');s=act(s,'brew','gentle');s=act(s,'brew','gentle');s=act(s,'deliver');assert.ok(s.run.availableEndings.includes('guild-life'));
 for(let i=0;i<3;i++)s=act(s,'school');s=act(s,'exam');assert.ok(s.run.availableEndings.includes('scholar-life'));assert.throws(()=>act(s,'exam'));
 s=dispatch(s,{type:'accept',id:'scholar-life'},catalog);assert.deepEqual(s.meta.unlocks,['scholar']);assert.throws(()=>dispatch(s,{type:'accept',id:'scholar-life'},catalog));
 s=dispatch(s,{type:'newLife'},catalog);assert.equal(s.run.character.stats.reason,1);assert.equal(s.run.creation.complete,false);
});

test('scholar compatibility free lesson once weekly; importing old save does not erase current meta',()=>{
 let s=started();s.meta.unlocks=['scholar'];const school=catalog.definitions.actions.find(a=>a.id==='school')!;
 assert.equal(actionCost(school,s),0);s=act(s,'school');assert.equal(actionCost(school,s),18);s.run.day=7;assert.equal(actionCost(school,s),0);
 const loaded=parseSave(JSON.stringify(started()),catalog,s.meta);assert.ok(loaded.meta.unlocks.includes('scholar'));
});

test('brewing and debt compatibility remains atomic',()=>{
 let s=started();s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,0);s=act(s,'scales');s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,2);
 assert.throws(()=>act(s,'brew','gentle'));s.run.metrics.debt=5;s.run.metrics.money=100;s.run.metrics.energy=1;s=act(s,'repay');assert.equal(s.run.metrics.debt,0);
});

test('refusal still blocks repeated romantic invitation',()=>{
 let s=started();s=act(s,'work');s=act(s,'work');s=dispatch(s,{type:'action',id:'visit'},catalog);assert.equal(s.run.pending?.eventId,'base.invite');
 s=dispatch(s,{type:'choice',id:'no'},catalog);for(let i=0;i<3;i++)s=act(s,'visit');assert.equal(s.run.history['base.invite'].count,1);
});

test('retired lumber-stay cannot be earned anew but historical ownership still grants one Energy',()=>{
 let s=started();for(let i=0;i<24;i++)s=act(s,'lumber');assert.equal(s.run.availableEndings.includes('lumber-stay'),false);
 assert.throws(()=>dispatch(s,{type:'accept',id:'lumber-stay'},catalog));
 const historical=freshSave({completedEndings:['lumber-stay'],unlocks:['vitality']});
 assert.equal(energyMax(historical),4);
 assert.equal(historical.run.metrics.energy,4);
 assert.equal(historical.meta.activeLegacyPerks.filter(id=>id==='legacy.lumber-stay.vitality').length,1);
});

test('lust is separate from progression stats but still changes legacy content probability and choices',()=>{
 const e=catalog.events.find(e=>e.id==='stage.goblin')!;const s=started();assert.equal(eventChance(e,s),.14);
 s.run.metrics.lust=60;assert.ok(eventChance(e,s)>.79);s.run.metrics.lust=100;assert.equal(eventChance(e,s),.85);
 s.run.flags['woods.met']=true;s.run.actionCounts.lumber=1;s.run.rng=0;
 const a=dispatch(s,{type:'action',id:'lumber'},catalog),b=dispatch(parseSave(JSON.stringify(s),catalog),{type:'action',id:'lumber'},catalog);
 assert.deepEqual(a,b);assert.equal(a.run.pending?.eventId,'stage.goblin');assert.equal(a.run.pending?.variantId,'curious');
 const c=dispatch(a,{type:'choice',id:'flirt'},catalog);assert.deepEqual(c.run.lastAction?.media,['stage.flirt']);assert.equal(parseSave(JSON.stringify(c),catalog).run.lastAction?.media[0],'stage.flirt');
 const low=structuredClone(a) as any;low.run.character.lust=1;const restored=parseSave(JSON.stringify(low),catalog);assert.throws(()=>dispatch(restored,{type:'choice',id:'flirt'},catalog));assert.doesNotThrow(()=>dispatch(restored,{type:'choice',id:'work'},catalog));
});

test('variant cooldown and scarce events persist across schema6 saves',()=>{
 let s=started();for(let i=0;i<5;i++)s=act(s,'work');const count=s.run.history['base.workday'].count;s=parseSave(JSON.stringify(s),catalog);s=act(s,'work');assert.equal(s.run.history['base.workday'].count,count);
});

test('expiry handled on final sleep; restart keeps meta and resets target calendar',()=>{
 let s=started();s.run.day=159;s=dispatch(s,{type:'sleep',payment:'outside'},catalog);assert.equal(s.run.status,'expired');assert.equal(s.run.day,159);assert.throws(()=>act(s,'tavern'));
 s.meta.unlocks=['host'];s=dispatch(s,{type:'restart'},catalog);assert.equal(s.run.day,0);assert.equal(s.run.character.stats.charm,1);
});

test('invalid save values and incompatible version are rejected',()=>{
 assert.throws(()=>parseSave('{broken',catalog));const s=started();assert.throws(()=>parseSave(JSON.stringify({...s,schemaVersion:99}),catalog));
 const raw=JSON.parse(JSON.stringify(s));raw.run.dayState.energyCurrent=25;assert.throws(()=>parseSave(JSON.stringify(raw),catalog));
});

test('all/any/not conditions still compose',()=>{
 const s=started();assert.ok(meets({kind:'all',conditions:[{kind:'season',value:'spring'},{kind:'not',condition:{kind:'unlock',value:'guild'}}]},s));
});

test('schema6 JSON has one authoritative owner for money energy stats and calendar',()=>{
 const s=started();const raw=JSON.parse(JSON.stringify(s));
 assert.equal(raw.schemaVersion,6);
 assert.equal(raw.run.resources.money,s.run.metrics.money);
 assert.equal(raw.run.dayState.energyCurrent,s.run.metrics.energy);
 assert.equal(raw.run.character.stats.strength,s.run.metrics.strength);
 assert.equal(raw.run.calendar.elapsedDays,s.run.day);
 assert.equal('metrics' in raw.run,false);
 assert.equal('day' in raw.run,false);
 assert.equal('flags' in raw.run,false);
 assert.equal('inventory' in raw.run,false);
 assert.equal('pending' in raw.run,false);
 assert.doesNotThrow(()=>parseSave(JSON.stringify(s),catalog));
});
