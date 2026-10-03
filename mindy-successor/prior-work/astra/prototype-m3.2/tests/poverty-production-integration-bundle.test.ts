import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {dispatch,eligible,freshSave,parseSave} from '../src/core/engine.ts';
import {emptyResolvedStrongMetaSnapshot} from '../src/core/strongMeta.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const manifest=JSON.parse(readFileSync('content/poverty-production-inclusion-v1.fixture.json','utf8'));

function rootPacks(){
  return readdirSync('content/packs')
    .filter(file=>file.endsWith('.json'))
    .sort()
    .map(file=>JSON.parse(readFileSync('content/packs/'+file,'utf8')));
}

function buildCatalog():Catalog{
  return loadCatalog(structuredClone(definitions),rootPacks());
}

function manifestPackIds(){
  return manifest.inclusionOrder.map((entry:any)=>entry.packId);
}

function ready(day=0):Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.strongMetaSnapshot=emptyResolvedStrongMetaSnapshot();
  s.run.flags['story.arrived']=true;
  s.run.calendar.elapsedDays=day;
  s.run.dayState.energyCurrent=3;
  return s;
}

function pressureScore(choice:any){
  return choice.effects.reduce((score:number,effect:any)=>{
    if(effect.kind==='addNextDayModifier'){
      return score+effect.energyDelta+effect.statEffects.reduce((sum:number,entry:any)=>sum+Math.min(0,entry.delta),0);
    }
    if(effect.kind==='modifyResource')return score+Math.min(0,effect.delta);
    if(effect.kind==='modifyStat')return score+Math.min(0,effect.delta);
    if(effect.kind==='modifyEnergy')return score+Math.min(0,effect.delta);
    if(effect.kind==='removeItem')return score-effect.count;
    return score;
  },0);
}

function resolvePovertyScenes(input:Save,cat:Catalog,mode:'safe'|'worst-first'='safe'){
  let s=input;
  let first=true;
  let guard=0;
  while(s.run.pending){
    if(++guard>16)throw new Error('poverty integration cascade exceeded guard');
    const event=cat.events.find(entry=>entry.id===s.run.pending!.eventId);
    assert.ok(event);
    assert.match(event.id,/^poverty-/);
    const allowed=s.run.pending.allowedChoiceIds??event.choices.map(choice=>choice.id);
    const choices=event.choices.filter(choice=>
      allowed.includes(choice.id)&&eligible(choice.conditions,s,cat)
    );
    assert.ok(choices.length>0);

    let choice;
    if(mode==='worst-first'&&first){
      choice=[...choices].sort((a,b)=>pressureScore(a)-pressureScore(b))[0];
      first=false;
    }else{
      choice=[...choices].sort((a,b)=>pressureScore(b)-pressureScore(a))[0];
      assert.ok(pressureScore(choice)>=0,`${event.id} lacks a safe integration resolution`);
    }
    s=dispatch(s,{type:'choice',id:choice.id},cat);
  }
  return s;
}

test('manifest poverty packs coexist in the full production catalog with unique namespaces and valid capabilities',()=>{
  let cat:Catalog|undefined;
  assert.doesNotThrow(()=>{cat=buildCatalog();});
  assert.ok(cat);

  const ids=manifestPackIds();
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.ok(cat.packs.some(pack=>pack.id===id),`missing manifest pack ${id}`);

  const proposed=cat.packs.filter(pack=>ids.includes(pack.id));
  const eventIds=proposed.flatMap(pack=>pack.events.map(event=>event.id));
  assert.equal(new Set(eventIds).size,eventIds.length);

  for(const pack of proposed){
    assert.ok(pack.events.every(event=>event.id.startsWith(pack.id+'.')));
  }

  assert.doesNotMatch(JSON.stringify(proposed),/secret.?debt|lender|slave/i);
});

test('street and cheap poverty packs coexist through the same NightFlow and survive reload',()=>{
  const cat=buildCatalog();

  for(const sample of [
    {day:6,lodging:'lodging.street'},
    {day:10,lodging:'lodging.cheap'}
  ] as const){
    let s=ready(sample.day);
    s=dispatch(s,{type:'endDay'},cat);
    s=dispatch(s,{type:'chooseLodging',id:sample.lodging},cat);

    if(s.run.pending){
      const eventId=s.run.pending.eventId;
      const variantId=s.run.pending.variantId;
      s=parseSave(JSON.stringify(s),cat);
      assert.equal(s.run.pending?.eventId,eventId);
      assert.equal(s.run.pending?.variantId,variantId);
    }

    s=resolvePovertyScenes(s,cat,'safe');
    assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
    s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
    assert.equal(s.run.flow.night,null);
    assert.equal(s.run.calendar.elapsedDays,sample.day+1);
  }
});

test('integrated ordinary poverty keeps the zero-money worst-outcome path recoverable',()=>{
  const cat=buildCatalog();
  let s=ready(6);
  s.run.resources.money=0;

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},cat);
  assert.ok(s.run.pending?.eventId.startsWith('poverty-'));

  s=resolvePovertyScenes(s,cat,'worst-first');
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);

  assert.equal(s.run.flow.night,null);
  assert.ok(s.run.dayState.energyCurrent>=1);
  assert.ok(s.run.resources.money>=0);

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
});

test('manifest is ordinary-poverty-only and never proposes Secret Debt inclusion',()=>{
  assert.equal(manifest.status,'PROPOSED_EXPLICIT_INCLUSION_ORDER');
  assert.ok(manifest.inclusionOrder.length>=6);
  assert.doesNotMatch(JSON.stringify(manifest.inclusionOrder),/secret.?debt|lender|slave/i);
  assert.match(JSON.stringify(manifest.excluded),/Secret Debt/i);
});
