import test from 'node:test';import assert from 'node:assert/strict';
import {freshSave,dispatch,parseSave,eligible} from '../src/core/engine.ts';
import {applyPresentation,textFields} from '../src/core/presentation.ts';
import {catalog,act,started} from './helpers.ts';
function start(){return started();}
function work(s:ReturnType<typeof freshSave>,id:string){if(s.run.metrics.energy<1)s=act(s,'rest');return act(s,id);}
function quest(){let s=start();for(let i=0;i<5;i++)s=work(s,'tavern');assert.ok(s.run.flags['tavern.quest']);s=work(s,'hunt');s=work(s,'hunt');s=work(s,'forest-search');return s;}
test('intro takes no slot; legacy demo keeps three initially eligible actions; counts separate',()=>{
 const s=start();assert.equal(s.run.slot,0);assert.equal(s.run.actionCounts.arrival,1);
 assert.deepEqual(catalog.definitions.actions.filter(a=>['tavern','lumber','hunt','guard'].includes(a.id)&&eligible(a.conditions,s)).map(a=>a.id),['tavern','lumber','hunt']);
 const t=work(s,'tavern');assert.equal(t.run.actionCounts.tavern,1);assert.equal(t.run.actionCounts.lumber,undefined);
 assert.throws(()=>act(t,'arrival'));assert.equal(parseSave(JSON.stringify(t),catalog).run.actionCounts.tavern,1);
});
test('season changes job effects; wages calculated from post-action stats',()=>{
 const a=start();const s=work(a,'tavern');assert.equal(s.run.metrics.money-a.run.metrics.money,17);assert.equal(s.run.metrics.composure,0);
 const b=start();b.run.day=10;const t=work(b,'tavern');assert.equal(t.run.metrics.endurance,4);assert.equal(t.run.metrics.organization,0);
});
test('legacy Tavern demo branches do not resurrect retired endings or bypass canonical D41 routes',()=>{
 const retired=['tavern-stay','tavern-guild','tavern-court'];
 const canonical=['ending.tavern.innkeeper','ending.tavern.information-broker','ending.tavern.sanctuary'];
 let s=start();for(let i=0;i<18;i++)s=work(s,'tavern');
 for(const id of [...retired,...canonical])assert.equal(s.run.availableEndings.includes(id),false,id);
 for(const [choice,legacyEnding,legacyReward] of [['guild','tavern-guild','mediator'],['prince','tavern-court','court']] as const){
  let t=quest();t=dispatch(t,{type:'action',id:'tavern-talk'},catalog);assert.equal(t.run.pending?.eventId,'gopher.tavern-resolution');
  t=dispatch(t,{type:'choice',id:choice},catalog);
  for(const id of [...retired,...canonical])assert.equal(t.run.availableEndings.includes(id),false,choice+' / '+id);
  assert.equal(t.meta.unlocks.includes(legacyReward),false,legacyReward);
  assert.throws(()=>dispatch(t,{type:'accept',id:legacyEnding},catalog));
 }
});
test('schema5 roundtrip preserves progress, pending state and metadata',()=>{
 const s=act(start(),'work');const restored=parseSave(JSON.stringify(s),catalog);assert.equal(restored.schemaVersion,6);assert.equal(restored.run.actionCounts.work,1);assert.equal(restored.run.actionCounts.tavern,undefined);assert.deepEqual(JSON.parse(JSON.stringify(restored.meta)),JSON.parse(JSON.stringify(s.meta)));
});
test('presentation replacements change prose and media only; unsafe and unknown targets rejected',()=>{
 const before=JSON.stringify(catalog);const patch={version:1,texts:{'event/gopher.arrival/variant/default':'Другая история.\n\nДобавленный абзац.'},media:{'gopher.tavern-intro.default':{kind:'image',src:'assets/town.svg',alt:'Новая сцена'}}};
 const result=applyPresentation(catalog,patch);assert.match(result.events.find(e=>e.id==='gopher.arrival')!.variants[0].text,/Добавленный/);
 assert.deepEqual(result.definitions.actions,catalog.definitions.actions);assert.equal(JSON.stringify(catalog),before);
 assert.throws(()=>applyPresentation(catalog,{...patch,texts:{'unknown':'Подмена'}}));
 assert.throws(()=>applyPresentation(catalog,{...patch,media:{'gopher.tavern-intro.default':{kind:'image',src:'javascript:alert(1)',alt:'x'}}}));
 assert.ok(textFields(result).length>50);
});
