import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const pack=JSON.parse(readFileSync('content/packs/poverty-closure-production-v14.json','utf8'));
const manifest=JSON.parse(readFileSync('content/poverty-production-inclusion-v1.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const PREFIX='poverty-closure-production-v14.';

function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}
function score(choice:any){
  return choice.effects.reduce((sum:number,e:any)=>{
    if(e.kind==='addNextDayModifier')return sum+e.energyDelta+e.statEffects.reduce((a:number,x:any)=>a+Math.min(0,x.delta),0);
    if(e.kind==='modifyResource')return sum+Math.min(0,e.delta);
    if(e.kind==='modifyStat'||e.kind==='modifyEnergy')return sum+Math.min(0,e.delta);
    if(e.kind==='removeItem')return sum-e.count;
    return sum;
  },0);
}
function resolvePending(input:Save,preferWorst=false){
  let s=input,guard=0;
  while(s.run.pending){
    if(++guard>24)throw new Error('v14 pending cascade exceeded guard');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId)!;
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(c=>c.id);
    const choices=event.choices.filter(c=>allowed.includes(c.id)&&eligible(c.conditions,s,catalog));
    assert.ok(choices.length,event.id);
    const selected=[...choices].sort((a,b)=>preferWorst?score(a)-score(b):score(b)-score(a))[0];
    s=dispatch(s,{type:'choice',id:selected.id},catalog);
  }
  return s;
}
function enter(day:number,lodging:'lodging.street'|'lodging.cheap'|'lodging.normal',prepare?:(s:Save)=>void){
  let s=started();s.run.calendar.elapsedDays=day;prepare?.(s);
  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:lodging},catalog);
  return s;
}

test('C3-145 inventory/closure pack is live production and adds no balance effects',()=>{
  assert.ok(catalog.packs.some(p=>p.id===pack.id));
  assert.equal(pack.events.length,10);
  assert.equal(manifest.inclusionOrder.at(-1).packId,pack.id);
  assert.equal(manifest.status,'PROPOSED_EXPLICIT_INCLUSION_ORDER');
  assert.ok(pack.events.every((e:any)=>e.reactionTriggers.some((t:any)=>t.kind==='nightPhase'&&t.point==='after_lodging')));
  assert.ok(pack.events.every((e:any)=>e.choices.every((c:any)=>c.effects.length===0)));
  assert.deepEqual(pack.capabilities.writes,{});
  assert.doesNotMatch(JSON.stringify(pack),/secret.?debt|lender|slave|forced.?debt/i);
});

test('C3-146/C3-147 distinct housing and missing seasonal street identities are naturally reachable',()=>{
  const street=[
    [2,'street-spring-neutral'],
    [18,'street-summer-pressure'],
    [28,'street-autumn-helpful'],
    [38,'street-winter-neutral']
  ] as const;
  for(const [day,suffix] of street){
    const s=enter(day,'lodging.street');
    assert.equal(s.run.pending?.eventId,PREFIX+suffix);
    assert.equal(s.run.housingState.current,'street');
  }

  let normal=enter(0,'lodging.normal',s=>{s.run.resources.money=150;});
  assert.equal(normal.run.pending?.eventId,PREFIX+'normal-tight-budget');
  assert.equal(normal.run.housingState.current,'normal');

  const cheap=enter(9,'lodging.cheap');
  assert.equal(cheap.run.pending?.eventId,PREFIX+'cheap-seasonal-boundaries');
  assert.equal(cheap.run.pending?.variantId,'spring-noise');
  assert.equal(cheap.run.housingState.current,'cheap');

  const defs=catalog.definitions.lodgings;
  const n=defs.find(x=>x.id==='lodging.normal')!,c=defs.find(x=>x.id==='lodging.cheap')!,st=defs.find(x=>x.id==='lodging.street')!;
  assert.ok(n.moneyCost>c.moneyCost&&c.moneyCost>st.moneyCost);
  assert.equal(st.moneyCost,0);
  assert.ok(st.nextDayEnergyDelta<0||st.nextDayEffects.some(x=>x.delta<0));
});

test('C3-148 cheap lodging breadth distinguishes noise privacy shared space and seasons without a new penalty',()=>{
  const expected=[
    [9,'spring-noise'],[19,'summer-privacy'],[29,'autumn-shared-space'],[39,'winter-quiet-hours']
  ] as const;
  for(const [day,variant] of expected){
    const s=enter(day,'lodging.cheap');
    assert.equal(s.run.pending?.eventId,PREFIX+'cheap-seasonal-boundaries');
    assert.equal(s.run.pending?.variantId,variant);
  }
  const e=pack.events.find((x:any)=>x.id===PREFIX+'cheap-seasonal-boundaries');
  assert.ok(e.choices.every((c:any)=>c.effects.length===0));
});

test('C3-149/C3-150 recovery map stays optional and herb acknowledgement never consumes or sells the item',()=>{
  let recovery=enter(4,'lodging.street',s=>{s.run.resources.money=0;});
  assert.equal(recovery.run.pending?.eventId,PREFIX+'recovery-map');
  const recoveryText=localization['event.'+PREFIX+'recovery-map.variant.default.text'];
  assert.match(recoveryText.en,/starter work|starter/i);
  assert.match(recoveryText.en,/errands|cleanup/i);
  assert.match(recoveryText.en,/herb/i);

  let herb=enter(15,'lodging.street',s=>{s.run.resources.inventory.herb=1;});
  assert.equal(herb.run.pending?.eventId,PREFIX+'herb-acknowledgement');
  const before=structuredClone(herb.run.resources.inventory);
  herb=dispatch(herb,{type:'choice',id:'keep-herb-dry'},catalog);
  assert.deepEqual(herb.run.resources.inventory,before);
});

test('C3-151 stable public relationship fact can be acknowledged without a rescuer contract',()=>{
  const relationship=catalog.definitions.relationships?.find(r=>r.id==='satyr-maid.recurring-guest');
  assert.ok(relationship);
  assert.ok(relationship.transitions.some(t=>t.effects.some((e:any)=>e.kind==='addRelationshipFact'&&e.fact==='professional-trust-earned')));

  const s=enter(24,'lodging.street',state=>{
    state.run.progression.relationships['satyr-maid.recurring-guest']={
      stage:'professional-trust',counters:{'service-meetings':2},choices:{},facts:['introduced-at-work','professional-trust-earned']
    };
  });
  assert.equal(s.run.pending?.eventId,PREFIX+'public-relationship-ack');
  const event=pack.events.find((x:any)=>x.id===PREFIX+'public-relationship-ack');
  assert.ok(event.choices.every((c:any)=>c.effects.length===0));
  assert.doesNotMatch(JSON.stringify(event),/rescue payment|addItem|modifyResource/i);
});

test('C3-152 School spending pressure is legible and ordinary work recovers on the next day',()=>{
  let s=started();
  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  s=resolvePending(s);
  assert.equal(s.run.resources.money,100);
  assert.ok(s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed>=1);

  s=dispatch(s,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.cheap'},catalog);
  assert.equal(s.run.resources.money,50);
  assert.equal(s.run.pending?.eventId,PREFIX+'cheap-school-budget');
  s=resolvePending(s);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  const before=s.run.resources.money;
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.ok(s.run.resources.money>before);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
});

test('C3-153 repeated zero-money street pressure cannot form an unavoidable terminal spiral',()=>{
  let s=started();s.run.resources.money=0;
  for(let i=0;i<16;i++){
    const day=s.run.calendar.elapsedDays;
    s=dispatch(s,{type:'endDay'},catalog);
    s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
    s=resolvePending(s,true);
    assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
    s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
    assert.equal(s.run.calendar.elapsedDays,day+1);
    assert.ok(s.run.dayState.energyCurrent>=1);
    const before=s.run.progression.careers.lumber?.counters.completed_shifts??0;
    s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
    assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,before+1);
    assert.equal(s.run.status,'active');
  }
  assert.equal(Object.keys(s.run.progression.careers).some(id=>/secret|debt|slave/i.test(id)),false);
});

test('C3-154 normal lodging payment pending variant and history remain exactly once across reload',()=>{
  let s=enter(0,'lodging.normal',state=>{state.run.resources.money=150;});
  assert.equal(s.run.resources.money,50);
  assert.equal(s.run.pending?.eventId,PREFIX+'normal-tight-budget');
  const variant=s.run.pending?.variantId;
  const history=structuredClone(s.run.history[PREFIX+'normal-tight-budget']);
  s=reload(s);
  assert.equal(s.run.resources.money,50);
  assert.equal(s.run.pending?.variantId,variant);
  assert.deepEqual(s.run.history[PREFIX+'normal-tight-budget'],history);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog),/нельзя выбирать жильё|оплачен/);
  s=dispatch(s,{type:'choice',id:'keep-plan'},catalog);
  const committed=structuredClone(s.run.history[PREFIX+'normal-tight-budget']);
  s=reload(s);
  assert.equal(s.run.resources.money,50);
  assert.deepEqual(s.run.history[PREFIX+'normal-tight-budget'],committed);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.history[PREFIX+'normal-tight-budget'].count,1);
});

test('C3-155 every live ordinary-poverty pack stays behind the Secret Debt firewall',()=>{
  const files=readdirSync('content/packs').filter(name=>name.startsWith('poverty-')&&name.endsWith('.json'));
  assert.ok(files.length>=7);
  for(const file of files){
    const raw=readFileSync('content/packs/'+file,'utf8');
    assert.doesNotMatch(raw,/secret.?debt|lender|slave|bound.?career|forced.?debt/i,file);
  }
  assert.doesNotMatch(JSON.stringify(pack),/ending|metaReward|setCareer|advanceCareer/i);
});
