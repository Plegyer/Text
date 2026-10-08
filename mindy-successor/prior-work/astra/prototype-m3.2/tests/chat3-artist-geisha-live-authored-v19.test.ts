import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/artist-geisha-authored-v19-frozen-mechanics.fixture.json','utf8'));
baseline.action.seasonal.summer.push({kind:'modifyStat',stat:'manners',delta:-1});
baseline.action.seasonal.autumn.push({kind:'modifyStat',stat:'dexterity',delta:-1});
// D46 supersedes only the wage base, preserving the producer's other mechanics.
baseline.action.wage.base=37;
const source=JSON.parse(readFileSync('content/artist-geisha-authored-copy-v19.fixture.json','utf8'));
const audit=JSON.parse(readFileSync('content/artist-geisha-authored-v19-binding-audit.fixture.json','utf8'));
const packFiles=[
  'artist-geisha-career.json','artist-geisha-cross-system.json','artist-geisha-items.json',
  'artist-geisha-night.json','artist-geisha-relationship.json','artist-geisha-routes.json',
  'artist-geisha-season.json',
];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function compact<T>(x:T):T{return JSON.parse(JSON.stringify(x));}
function withoutD40SelectedRouteEffects(effects:any[]){
  return (effects??[]).filter((effect:any)=>!(
    effect.kind==='addCareerFact'
    && String(effect.fact??'').startsWith('ending-route-')
    && String(effect.fact??'').endsWith('-selected')
  ));
}

function project(){
  const shift=defs.actions.find((x:any)=>x.id==='artist-geisha.shift');
  const ending={...defs.endings.find((x:any)=>x.id==='ending.artist-geisha.hard-work')};
  delete ending.title;delete ending.description;delete ending.epilogue;
  return compact({
    action:{...shift,scenes:shift.scenes.map((s:any)=>({id:s.id,conditions:s.conditions,media:s.media}))},
    career:defs.careers.find((x:any)=>x.id==='artist-geisha'),
    ending,
    items:(defs.itemDefinitions||[]).filter((x:any)=>String(x.id).startsWith('artist_')),
    packs:packs.map((p:any,i:number)=>({
      file:packFiles[i],id:p.id,reads:p.reads,writes:p.writes,capabilities:p.capabilities,media:p.media,
      events:(p.events??[]).map((e:any)=>({
        id:e.id,sourceDomain:e.sourceDomain,trigger:e.trigger,reactionTriggers:e.reactionTriggers,
        priorityClass:e.priorityClass,priority:e.priority,blocking:e.blocking,delivery:e.delivery,
        cooldownDays:e.cooldownDays,variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,
        conditions:e.conditions,
        variants:(e.variants??[]).map((v:any)=>({id:v.id,conditions:v.conditions,media:v.media})),
        choices:(e.choices??[]).map((c:any)=>({id:c.id,conditions:c.conditions,effects:withoutD40SelectedRouteEffects(c.effects)})),
      })),
    })),
  });
}
function event(id:string){
  for(const p of packs){const e=(p.events??[]).find((x:any)=>x.id===id);if(e)return e;}
  throw new Error('missing '+id);
}
function choose(e:any,s:Save){
  const preferred:Record<string,string>={
    'artist-geisha.career.first-shift':'continue',
    'artist-geisha.season.spring-program':'take-window',
    'artist-geisha.season.summer-evening':'take-window',
    'artist-geisha.season.autumn-festival':'take-window',
    'artist-geisha.season.winter-salon':'take-window',
  };
  const wanted=preferred[e.id];
  return (wanted?e.choices.find((c:any)=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
    ??e.choices.find((c:any)=>eligible(c.conditions,s,catalog));
}
function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>200)throw new Error('pending loop: '+s.run.pending.eventId);
    const e=catalog.events.find(x=>x.id===s.run.pending!.eventId);
    assert.ok(e,s.run.pending.eventId);
    const c=choose(e,s);assert.ok(c,e.id);
    s=dispatch(s,{type:'choice',id:c.id},catalog);
  }
  return s;
}
function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>200)throw new Error('night loop');
    if(s.run.pending){s=settlePending(s);continue;}
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);continue;}
    if(phase==='VoluntaryNightChoice'){s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);continue;}
    throw new Error('night stalled '+phase);
  }
  return s;
}

test('C3-216 authored layer has zero frozen Artist producer-mechanics drift',()=>{
  assert.deepEqual(project(),{
    action:baseline.action,career:baseline.career,ending:baseline.ending,items:baseline.items,packs:baseline.packs,
  });
  assert.equal(baseline.producerHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(baseline.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791');
});

test('C3-216 all live Artist events and seasonal scenes have RU/EN parity',()=>{
  const shift=defs.actions.find((x:any)=>x.id==='artist-geisha.shift');
  assert.deepEqual(shift.scenes.map((x:any)=>x.id),[
    'spring.default','summer.default','autumn.default','winter.default',
  ]);
  for(const scene of shift.scenes){
    const k='action.artist-geisha.shift.scene.'+scene.id+'.text';
    assert.ok(loc[k]?.ru?.trim(),k+' RU');
    assert.equal(loc[k]?.en,scene.text,k+' EN');
  }

  const ids=packs.flatMap((p:any)=>p.events??[]).map((e:any)=>e.id);
  assert.equal(ids.length,30);
  for(const id of ids){
    const e=event(id);
    const tk='event.'+id+'.title';
    assert.ok(loc[tk]?.ru?.trim(),tk+' RU');
    assert.equal(loc[tk]?.en,e.title,tk+' EN');
    for(const v of e.variants??[]){
      const k='event.'+id+'.variant.'+v.id+'.text';
      assert.ok(loc[k]?.ru?.trim(),k+' RU');
      assert.equal(loc[k]?.en,v.text,k+' EN');
    }
    for(const c of e.choices??[])for(const suffix of ['label','text']){
      const k='event.'+id+'.choice.'+c.id+'.'+suffix;
      assert.ok(loc[k]?.ru?.trim(),k+' RU');
      assert.equal(loc[k]?.en,c[suffix],k+' EN');
    }
  }
  assert.ok(Object.keys(loc).filter(k=>/artist-geisha|artist_geisha/i.test(k)).length>=179);
});

test('C3-216 source audit proves 57 live bilingual identities and 7 authority gaps',()=>{
  assert.equal(source.entries.length,64);
  assert.equal(audit.sourceCount,64);
  assert.equal(audit.liveBoundCount,57);
  assert.equal(audit.authorityUnboundCount,7);

  const live=JSON.stringify({
    action:defs.actions.find((x:any)=>x.id==='artist-geisha.shift'),
    ending:defs.endings.find((x:any)=>x.id==='ending.artist-geisha.hard-work'),
    packs,
  });
  const localized=JSON.stringify(loc);
  const statusByKey=Object.fromEntries(audit.entries.map((x:any)=>[x.contentKey,x.status]));
  for(const row of source.entries){
    if(statusByKey[row.contentKey]==='LIVE_BOUND'){
      assert.ok(live.includes(row.en),row.contentKey+' live EN');
      if(row.contentKey==='hard-work.boundary'){
        // Stage5 Golden retires the old live hard-work alias copy, not the ending.
        assert.equal(localized.includes(row.ru),false,'deprecated alias text must not remain');
        assert.equal(loc['ending.artist-geisha.hard-work.description'],undefined);
      }else assert.ok(localized.includes(row.ru),row.contentKey+' live RU');
    }else{
      assert.equal(live.includes(row.en),false,row.contentKey+' unbound EN');
      assert.equal(localized.includes(row.ru),false,row.contentKey+' unbound RU');
    }
  }
  assert.deepEqual(audit.entries.filter((x:any)=>x.status!=='LIVE_BOUND').map((x:any)=>x.contentKey).sort(),[
    'cross.hunter-return','cross.lumber-forest-return','cross.undead-sample',
    'night.coworker-debrief','night.patron-context','performance.no-global-score','rehearsal.shared-scene',
  ]);
});

test('C3-216 natural Year-3 first shift reaches authored scene and preserves scheduled identity across reload',()=>{
  let s=started();
  const action=catalog.definitions.actions.find(a=>a.id==='artist-geisha.shift');
  assert.ok(action);
  while(calendar(s.run.day).year<3)s=finishNight(s);
  assert.equal(actionAvailable(action,s,catalog),true);

  s=dispatch(s,{type:'action',id:'artist-geisha.shift'},catalog);
  const liveShift=defs.actions.find((x:any)=>x.id==='artist-geisha.shift');
  assert.ok(liveShift.scenes.some((x:any)=>x.text===s.run.lastAction?.text),'authored shift scene must be selected');

  const beforeReload={lastAction:compact(s.run.lastAction),pending:compact(s.run.pending)};
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.lastAction,beforeReload.lastAction,'lastAction reload');
  assert.deepEqual(s.run.pending,beforeReload.pending,'first pending reload');
  assert.equal(s.run.pending?.eventId,'artist-geisha.career.first-shift');

  const first=event('artist-geisha.career.first-shift');
  const firstChoice=choose(first,s);assert.ok(firstChoice);
  s=dispatch(s,{type:'choice',id:firstChoice.id},catalog);
  assert.equal(s.run.progression.careers['artist-geisha'].stage,'performer');
  assert.ok(s.run.pending?.eventId.startsWith('artist-geisha.season.'),'scheduled seasonal window');

  const scheduled=compact(s.run.pending);
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.pending,scheduled,'scheduled pending reload');

  const pendingId=s.run.pending!.eventId;
  const pendingVariant=s.run.pending!.variantId;
  const lk='event.'+pendingId+'.variant.'+pendingVariant+'.text';
  assert.ok(loc[lk]?.ru?.trim(),lk+' RU');
  assert.equal(loc[lk]?.en,event(pendingId).variants.find((v:any)=>v.id===pendingVariant)?.text,lk+' EN');
});

test('C3-216 authored layer preserves ending, School and global-system boundaries',()=>{
  assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('artist-geisha')).map((x:any)=>x.id),['ending.artist-geisha.hard-work','ending.artist-geisha.master-artist','ending.artist-geisha.patron-network','ending.artist-geisha.court-invitation']);
  assert.equal(source.invariants.createsGameplayIds,false);
  assert.equal(source.invariants.changesMechanics,false);
  assert.equal(source.invariants.changesSaveOrRng,false);
  assert.equal(source.invariants.changesSchoolProducerAuthority,false);
  assert.equal(source.invariants.changesEndingEligibilityRewardOrMeta,false);
  assert.equal(source.invariants.changesNightFlow,false);
  assert.equal(source.invariants.changesPalaceUnlock,false);
  assert.equal(source.invariants.createsContestSubsystem,false);
  assert.equal(source.invariants.createsUniversalReputation,false);
  assert.equal(source.invariants.createsGenericPatronSystem,false);

  const live=JSON.stringify({action:defs.actions.find((x:any)=>x.id==='artist-geisha.shift'),packs});
  assert.doesNotMatch(live,/assassin\.|prostitute\./i);
});
