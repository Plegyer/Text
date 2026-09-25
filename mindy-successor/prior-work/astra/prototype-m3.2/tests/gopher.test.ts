import test from 'node:test';import assert from 'node:assert/strict';
import {freshSave,dispatch,parseSave,eligible} from '../src/core/engine.ts';
import {applyPresentation,textFields} from '../src/core/presentation.ts';
import {catalog,act,started} from './helpers.ts';
function start(){return started();}
function work(s:ReturnType<typeof freshSave>,id:string){if(s.run.metrics.energy<1)s=act(s,'rest');return act(s,id);}
function quest(){let s=start();for(let i=0;i<5;i++)s=work(s,'tavern');assert.ok(s.run.flags['tavern.quest']);s=work(s,'hunt');s=work(s,'hunt');s=work(s,'forest-search');return s;}
test('intro takes no slot; only three new professions initially eligible; counts separate',()=>{
 const s=start();assert.equal(s.run.slot,0);assert.equal(s.run.actionCounts.arrival,1);
 assert.deepEqual(catalog.definitions.actions.filter(a=>['tavern','lumber','hunt','guard'].includes(a.id)&&eligible(a.conditions,s)).map(a=>a.id),['tavern','lumber','hunt']);
 const t=work(s,'tavern');assert.equal(t.run.actionCounts.tavern,1);assert.equal(t.run.actionCounts.lumber,undefined);
 assert.throws(()=>act(t,'arrival'));assert.equal(parseSave(JSON.stringify(t),catalog).run.actionCounts.tavern,1);
});
test('season changes job effects; wages calculated from post-action stats',()=>{
 const a=start();const s=work(a,'tavern');assert.equal(s.run.metrics.money-a.run.metrics.money,17);assert.equal(s.run.metrics.composure,1);
 const b=start();b.run.day=28;const t=work(b,'tavern');assert.equal(t.run.metrics.endurance,2);assert.equal(t.run.metrics.organization,2);
});
test('all three tavern endings reachable; branch choice excludes opposite route; NG+ benefit',()=>{
 let s=start();for(let i=0;i<18;i++)s=work(s,'tavern');assert.ok(s.run.availableEndings.includes('tavern-stay'));
 s=dispatch(s,{type:'accept',id:'tavern-stay'},catalog);s=dispatch(s,{type:'newLife'},catalog);assert.equal(s.run.metrics.persuasion,6);
 for(const [choice,ending,other,reward] of [['guild','tavern-guild','tavern-court','mediator'],['prince','tavern-court','tavern-guild','court']]){
  let t=quest();t=dispatch(t,{type:'action',id:'tavern-talk'},catalog);assert.equal(t.run.pending?.eventId,'gopher.tavern-resolution');
  t=dispatch(t,{type:'choice',id:choice},catalog);assert.ok(t.run.availableEndings.includes(ending));assert.ok(!t.run.availableEndings.includes(other));
  assert.throws(()=>act(t,'tavern-talk'));t=dispatch(t,{type:'accept',id:ending},catalog);assert.ok(t.meta.unlocks.includes(reward as 'court'));
 }
});
test('v1 migration preserves progress, pending scenes and metadata; no invented counts',()=>{
 const s=act(start(),'work');const old:any=structuredClone(s);old.schemaVersion=1;delete old.run.actionCounts;delete old.run.creation;delete old.run.lastAction;delete old.run.rng;delete old.run.metrics.lust;
 const restored=parseSave(JSON.stringify(old),catalog);assert.equal(restored.schemaVersion,3);assert.equal(restored.run.actionCounts.work,1);assert.equal(restored.run.actionCounts.tavern,undefined);assert.deepEqual(restored.meta,s.meta);
});
test('presentation replacements change prose and media only; unsafe and unknown targets rejected',()=>{
 const before=JSON.stringify(catalog);const patch={version:1,texts:{'event/gopher.arrival/variant/default':'Другая история.\n\nДобавленный абзац.'},media:{'gopher.tavern-intro.default':{kind:'image',src:'assets/town.svg',alt:'Новая сцена'}}};
 const result=applyPresentation(catalog,patch);assert.match(result.events.find(e=>e.id==='gopher.arrival')!.variants[0].text,/Добавленный/);
 assert.deepEqual(result.definitions.actions,catalog.definitions.actions);assert.equal(JSON.stringify(catalog),before);
 assert.throws(()=>applyPresentation(catalog,{...patch,texts:{'unknown':'Подмена'}}));
 assert.throws(()=>applyPresentation(catalog,{...patch,media:{'gopher.tavern-intro.default':{kind:'image',src:'javascript:alert(1)',alt:'x'}}}));
 assert.ok(textFields(result).length>50);
});
