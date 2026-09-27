import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const strings=localization.strings as Record<string,{ru:string;en:string}>;

const packNames=[
 'poverty-street-production.json',
 'poverty-street-production-v2.json',
 'poverty-cheap-production.json',
 'poverty-cheap-production-v2.json',
 'poverty-recovery-production.json',
 'poverty-pressure-production.json'
] as const;

const packs=Object.fromEntries(packNames.map(name=>[
 name.replace('.json',''),
 JSON.parse(readFileSync('content/packs/'+name,'utf8'))
]));

function requiredKeys(){
 const keys:string[]=[];
 for(const pack of Object.values(packs) as any[]){
  for(const event of pack.events){
   keys.push('event.'+event.id+'.title');
   for(const variant of event.variants)keys.push('event.'+event.id+'.variant.'+variant.id+'.text');
   for(const choice of event.choices){
    keys.push('event.'+event.id+'.choice.'+choice.id+'.label');
    keys.push('event.'+event.id+'.choice.'+choice.id+'.text');
   }
  }
 }
 keys.push('media.stage.outside.alt','media.stage.room.alt');
 return keys;
}

test('ordinary poverty production surfaces are fully RU EN localized in the root bundle',()=>{
 const keys=requiredKeys();
 assert.equal(new Set(keys).size,84);
 for(const key of keys){
  const entry=strings[key];
  assert.ok(entry,key);
  assert.ok(entry.ru?.trim(),key+' ru');
  assert.ok(entry.en?.trim(),key+' en');
  assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(key),false,key);
 }
 const serialized=JSON.stringify(keys).toLowerCase();
 for(const token of ['secret-debt','lender','forced-night','paid_freedom','bound_life','takeover']){
  assert.equal(serialized.includes(token),false,token);
 }
});

const cases=[
 ['poverty-street-production',10,'lodging.street','poverty-street-production.helpful-summer','default','take-errand'],
 ['poverty-street-production-v2',12,'lodging.street','poverty-street-production-v2.helpful-summer-shade','market-closing','take-small-task'],
 ['poverty-cheap-production',20,'lodging.cheap','poverty-cheap-production.shared-quiet-autumn','default','settle-quietly'],
 ['poverty-cheap-production-v2',0,'lodging.cheap','poverty-cheap-production-v2.shared-room-seasons','spring-window','settle-in'],
 ['poverty-recovery-production',1,'lodging.street','poverty-recovery-production.small-coin-help','default','take-coins'],
 ['poverty-pressure-production',6,'lodging.street','poverty-pressure-production.cold-rain','default','wait-it-out']
] as const;

function enter(day:number,lodging:string){
 let s=started();
 s.run.calendar.elapsedDays=day;
 s=dispatch(s,{type:'endDay'},catalog);
 assert.equal(s.run.flow.night?.phase,'LodgingResolution');
 s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
 return s;
}
function projection(s:any){
 return JSON.stringify({
  pending:s.run.pending,
  rng:s.run.rng,
  night:s.run.flow.night,
  resources:s.run.resources,
  dayState:s.run.dayState,
  housing:s.run.housingState,
  progression:s.run.progression,
  endings:s.run.endings
 });
}

test('all six ordinary-poverty production packs have locale-invariant natural paths',()=>{
 for(const [packId,day,lodging,eventId,variantId,choiceId] of cases){
  let s=enter(day,lodging);
  assert.equal(s.run.pending?.eventId,eventId,packId);
  assert.equal(s.run.pending?.variantId,variantId,packId);
  assert.equal(s.run.flow.night?.phase,'NightEventResolution',packId);

  const before=projection(s);
  const keys=[
   'event.'+eventId+'.title',
   'event.'+eventId+'.variant.'+variantId+'.text',
   'event.'+eventId+'.choice.'+choiceId+'.label',
   'event.'+eventId+'.choice.'+choiceId+'.text',
   lodging==='lodging.cheap'?'media.stage.room.alt':'media.stage.outside.alt'
  ];
  for(const key of keys){
   assert.ok(strings[key]?.ru?.trim(),key+' ru');
   assert.ok(strings[key]?.en?.trim(),key+' en');
  }
  assert.equal(projection(s),before,packId+' localization lookup');

  const pack=(packs as any)[packId];
  const event=pack.events.find((e:any)=>e.id===eventId);
  const choice=event.choices.find((c:any)=>c.id===choiceId);
  const beforeChoice=parseSave(JSON.stringify(s),catalog);
  s=dispatch(s,{type:'choice',id:choiceId},catalog);
  assert.equal(s.run.pending,null,packId);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice',packId);
  for(const effect of choice.effects){
   if(effect.kind==='modifyResource'){
    assert.equal(effect.resource,'money',packId+' representative resource');
    assert.equal(s.run.resources.money,beforeChoice.run.resources.money+effect.delta,packId);
   }else if(effect.kind==='addItem'){
    assert.equal(s.run.resources.inventory[effect.id]??0,(beforeChoice.run.resources.inventory[effect.id]??0)+effect.count,packId);
   }else if(effect.kind==='addNextDayModifier'){
    assert.equal(s.run.dayState.nextDayModifiers.energyDelta,beforeChoice.run.dayState.nextDayModifiers.energyDelta+effect.energyDelta,packId);
   }
  }
  const committed=projection(s);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(projection(s),committed,packId+' reload');
  assert.throws(()=>dispatch(s,{type:'choice',id:choiceId},catalog),/Нет активной сцены/);
 }
});
