import test from 'node:test';import assert from 'node:assert/strict';
import {dispatch,availableVariants,parseSave,meets} from '../src/core/engine.ts';
import {started,act,catalog} from './helpers.ts';
test('four seasons have different event pools; three variants rotate, then cooldown blocks repeats',()=>{
 for(const [index,season] of ['spring','summer','autumn','winter'].entries()){
  const e=catalog.events.find(e=>e.id==='lumber-seasons.'+season)!;
  let s=started();s.run.day=index*28;s.run.flags['woods.met']=true;s.run.actionCounts.lumber=13;s.run.flags['ds.lumber.first']=true;s.run.flags['ds.lumber.second']=true;s.run.flags['ds.lumber.done']=true;
  // Keep the independent random encounter on cooldown; test only the seasonal scheduler.
  const seen=[];
  for(let day=0;day<=14;day+=7){
   s.run.day=index*28+day;s.run.metrics.energy=3;
   s.run.history['stage.goblin']={count:1,lastDay:s.run.day,variants:{}};
   s=dispatch(s,{type:'action',id:'lumber'},catalog);
   assert.equal(s.run.pending?.eventId,e.id);seen.push(s.run.pending!.variantId);
   const before=structuredClone(s.run.metrics);
   s=dispatch(s,{type:'choice',id:'help'},catalog);
   assert.deepEqual(s.run.metrics,before);assert.ok(s.run.flags['lumber.season.'+season]);
   assert.equal(s.run.pending,null);s=parseSave(JSON.stringify(s),catalog);
  }
  assert.equal(new Set(seen).size,3);assert.equal(availableVariants(e,s).length,0);
  s.run.day=index*28+21;assert.equal(availableVariants(e,s).length,0);
 }
});
test('manager fate needs four seasons and preparation; accepting grants the declared legacy',()=>{
 let s=started();for(let i=0;i<48;i++)s=act(s,'lumber');
 assert.ok(!s.run.availableEndings.includes('lumber-manager'));
 // Season fixtures shorten the calendar, while actions resolve the actual seasonal events.
 s.run.metrics.organization=10;
 for(const [i,season] of ['spring','summer','autumn','winter'].entries()){
  s.run.day=112+i*28;s.run.metrics.energy=3;s.run.history['stage.goblin']={count:1,lastDay:s.run.day,variants:{}};
  s=act(s,'lumber');assert.ok(s.run.flags['lumber.season.'+season]);
 }
 assert.ok(s.run.availableEndings.includes('lumber-manager'));
 const e=catalog.definitions.endings.find(e=>e.id==='lumber-manager')!;
 const incomplete=structuredClone(s);incomplete.run.flags['lumber.season.winter']=false;
 assert.ok(!e.conditions.every(c=>meets(c,incomplete)));
 s=dispatch(s,{type:'accept',id:e.id},catalog);s=dispatch(s,{type:'newLife'},catalog);
 assert.ok(s.meta.unlocks.includes('guild'));assert.equal(s.run.metrics.organization,6);
});
test('goblin setups change with season and desire; old pending variant IDs still load',()=>{
 const e=catalog.events.find(e=>e.id==='stage.goblin')!;
 for(const [i,season] of ['spring','summer','autumn','winter'].entries())for(const desire of [1,6]){
  const s=started();s.run.day=i*28;s.run.metrics.lust=desire;
  const variants=availableVariants(e,s).sort((a,b)=>b.conditions.length-a.conditions.length);
  assert.equal(variants[0].id,season+(desire===6?'-curious':'-work'));
 }
 const s=started();s.run.pending={eventId:e.id,variantId:'curious'};
 assert.equal(parseSave(JSON.stringify(s),catalog).run.pending?.variantId,'curious');
});
