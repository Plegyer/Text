import test from 'node:test';import assert from 'node:assert/strict';
import {freshSave,dispatch,calendar,parseSave,meets,actionCost,rent,energyMax,eventChance} from '../src/core/engine.ts';
import {stats} from '../src/core/schema.ts';import {catalog,act,started,created} from './helpers.ts';
test('creation: low stats, ten points, reversible allocation, no play before completion',()=>{
 let s=freshSave();for(const k of stats)assert.equal(s.run.metrics[k],1);assert.equal(s.run.metrics.energy,3);
 assert.throws(()=>act(s,'arrival'));assert.throws(()=>dispatch(s,{type:'finishCreation'},catalog));
 s=dispatch(s,{type:'allocate',stat:'lust',delta:1},catalog);s=dispatch(s,{type:'allocate',stat:'lust',delta:-1},catalog);assert.equal(s.run.creation.remaining,10);
 assert.throws(()=>dispatch(s,{type:'allocate',stat:'lust',delta:-1},catalog));
 s=created();assert.equal(s.run.creation.complete,true);assert.throws(()=>dispatch(s,{type:'allocate',stat:'lust',delta:1},catalog));
});
test('calendar: 28 day seasons, four years, optional fifth',()=>{assert.deepEqual(calendar(447),{year:4,season:'winter',date:28});assert.equal(calendar(28).season,'summer');assert.equal(freshSave({unlocks:['calendar'],completed:[],lives:2}).run.limitDays,560);});
test('three work actions consume three energy; no automatic day advancement; manual sleep restores',()=>{
 let s=started();s=act(s,'tavern');s=act(s,'tavern');s=act(s,'tavern');assert.equal(s.run.day,0);assert.equal(s.run.metrics.energy,0);
 const before=JSON.stringify(s);assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));assert.equal(JSON.stringify(s),before);
 const money=s.run.metrics.money;s=dispatch(s,{type:'sleep',payment:'money'},catalog);assert.equal(s.run.day,1);assert.equal(s.run.metrics.energy,3);assert.equal(s.run.metrics.money,money-18);
});
test('outside sleep and favors have explicit costs; rent grows with year; no free energy action',()=>{
 let s=started();s=dispatch(s,{type:'sleep',payment:'outside'},catalog);assert.equal(s.run.metrics.energy,2);assert.equal(s.run.housing,'shelter');
 s=dispatch(s,{type:'sleep',payment:'favor'},catalog);assert.equal(s.run.metrics.strength,0);assert.equal(s.run.metrics.energy,3);
 assert.throws(()=>dispatch(s,{type:'sleep',payment:'favor'},catalog));s.run.day=112;assert.equal(rent(s),35);
 s.run.metrics.money=0;assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));assert.throws(()=>dispatch(s,{type:'action',id:'rest'},catalog));assert.doesNotThrow(()=>dispatch(s,{type:'sleep',payment:'outside'},catalog));
});
test('pending scene blocks sleep and other actions; persists variant and resolves once',()=>{
 const initial=started();let s=dispatch(initial,{type:'action',id:'work'},catalog);assert.equal(s.run.pending?.eventId,'base.arrival');
 assert.throws(()=>dispatch(s,{type:'sleep',payment:'money'},catalog));assert.throws(()=>dispatch(s,{type:'action',id:'hunt'},catalog));
 s=parseSave(JSON.stringify(s),catalog);s=dispatch(s,{type:'choice',id:'introduce'},catalog);assert.equal(s.run.metrics.trust,3);assert.throws(()=>dispatch(s,{type:'choice',id:'introduce'},catalog));
});
test('legacy guild and scholar routes remain reachable and award only accepted fate',()=>{
 let s=started();for(let i=0;i<5;i++)s=act(s,'work');s=act(s,'brew','gentle');s=act(s,'brew','gentle');s=act(s,'deliver');assert.ok(s.run.availableEndings.includes('guild-life'));
 for(let i=0;i<3;i++)s=act(s,'school');s=act(s,'exam');assert.ok(s.run.availableEndings.includes('scholar-life'));assert.throws(()=>act(s,'exam'));
 s=dispatch(s,{type:'accept',id:'scholar-life'},catalog);assert.deepEqual(s.meta.unlocks,['scholar']);assert.throws(()=>dispatch(s,{type:'accept',id:'scholar-life'},catalog));s=dispatch(s,{type:'newLife'},catalog);assert.equal(s.run.metrics.intelligence,6);assert.equal(s.run.creation.complete,false);
});
test('scholar free lesson once weekly; merging old save does not erase meta',()=>{
 let s=started();s.meta.unlocks=['scholar'];const school=catalog.definitions.actions.find(a=>a.id==='school')!;assert.equal(actionCost(school,s),0);s=act(s,'school');assert.equal(actionCost(school,s),18);s.run.day=7;assert.equal(actionCost(school,s),0);
 const loaded=parseSave(JSON.stringify(started()),catalog,s.meta);assert.ok(loaded.meta.unlocks.includes('scholar'));
});
test('brewing and debt: missing items fail atomically, equipment unlocks method, repay exact remainder',()=>{
 let s=started();s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,0);s=act(s,'scales');s=act(s,'brew','bold');assert.equal(s.run.inventory.tonic,2);
 assert.throws(()=>act(s,'brew','gentle'));s.run.metrics.debt=5;s.run.metrics.money=100;s=act(s,'repay');assert.equal(s.run.metrics.debt,0);
});
test('refusal still blocks repeated romantic invitation',()=>{let s=started();s=act(s,'work');s=act(s,'work');s=dispatch(s,{type:'action',id:'visit'},catalog);assert.equal(s.run.pending?.eventId,'base.invite');s=dispatch(s,{type:'choice',id:'no'},catalog);for(let i=0;i<3;i++)s=act(s,'visit');assert.equal(s.run.history['base.invite'].count,1);});
test('lumber reward increases actual daily budget, not a second hidden limiter',()=>{let s=started();for(let i=0;i<24;i++)s=act(s,'lumber');assert.ok(s.run.availableEndings.includes('lumber-stay'));s=dispatch(s,{type:'accept',id:'lumber-stay'},catalog);s=dispatch(s,{type:'newLife'},catalog);assert.equal(energyMax(s),4);assert.equal(s.run.metrics.energy,4);});
test('desire changes probability and choices; deterministic roll and media survive reload',()=>{
 const e=catalog.events.find(e=>e.id==='stage.goblin')!;const s=started();assert.equal(eventChance(e,s),.092);s.run.metrics.lust=60;assert.ok(eventChance(e,s)>.79);s.run.metrics.lust=100;assert.equal(eventChance(e,s),.85);
 s.run.flags['woods.met']=true;s.run.actionCounts.lumber=1;s.run.rng=0;
 const a=dispatch(s,{type:'action',id:'lumber'},catalog),b=dispatch(parseSave(JSON.stringify(s),catalog),{type:'action',id:'lumber'},catalog);assert.deepEqual(a,b);assert.equal(a.run.pending?.eventId,'stage.goblin');assert.equal(a.run.pending?.variantId,'curious');
 const c=dispatch(a,{type:'choice',id:'flirt'},catalog);assert.deepEqual(c.run.lastAction?.media,['stage.flirt']);assert.equal(parseSave(JSON.stringify(c),catalog).run.lastAction?.media[0],'stage.flirt');
 const low=structuredClone(a);low.run.metrics.lust=1;assert.throws(()=>dispatch(low,{type:'choice',id:'flirt'},catalog));assert.doesNotThrow(()=>dispatch(low,{type:'choice',id:'work'},catalog));
});
test('variant cooldown and scarce events persist across saves',()=>{let s=started();for(let i=0;i<5;i++)s=act(s,'work');const count=s.run.history['base.workday'].count;s=parseSave(JSON.stringify(s),catalog);s=act(s,'work');assert.equal(s.run.history['base.workday'].count,count);});
test('expiry handled on final sleep; explicit restart keeps earned meta and resets life',()=>{let s=started();s.run.day=447;s=dispatch(s,{type:'sleep',payment:'outside'},catalog);assert.equal(s.run.status,'expired');assert.equal(s.run.day,447);assert.throws(()=>act(s,'tavern'));s.meta.unlocks=['host'];s=dispatch(s,{type:'restart'},catalog);assert.equal(s.run.day,0);assert.equal(s.run.metrics.persuasion,6);});
test('invalid save values and incompatible version are rejected',()=>{assert.throws(()=>parseSave('{broken',catalog));const s=started();assert.throws(()=>parseSave(JSON.stringify({...s,schemaVersion:99}),catalog));s.run.metrics.energy=25;assert.throws(()=>parseSave(JSON.stringify(s),catalog));});
test('all/any/not conditions still compose',()=>{const s=started();assert.ok(meets({kind:'all',conditions:[{kind:'season',value:'spring'},{kind:'not',condition:{kind:'unlock',value:'guild'}}]},s));});
