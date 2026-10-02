import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

import {ordinaryCareerForShiftAction} from '../src/core/engine.ts';
import {catalog} from './helpers.ts';

const packsDir='content/packs';
const artistFiles=readdirSync(packsDir).filter(f=>f.startsWith('artist-geisha-')&&f.endsWith('.json')).sort();
const artistPacks=artistFiles.map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));
const cross=JSON.parse(readFileSync('content/packs/artist-geisha-cross-system.json','utf8'));
const routes=JSON.parse(readFileSync('content/packs/artist-geisha-routes.json','utf8'));
const night=JSON.parse(readFileSync('content/packs/artist-geisha-night.json','utf8'));
const schoolAuthority=JSON.parse(readFileSync('content/artist-geisha-school-authority-v1.fixture.json','utf8'));
const schoolPrep=JSON.parse(readFileSync('content/school-artist-geisha-preparation-v1.fixture.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/ARTIST_GEISHA_RUNTIME_CONTRACT_v1.json','utf8'));

function allEffects(pack:any){
  return pack.events.flatMap((event:any)=>event.choices.flatMap((choice:any)=>choice.effects));
}
function containsKind(value:any,kind:string):boolean{
  if(Array.isArray(value))return value.some(x=>containsKind(x,kind));
  if(!value||typeof value!=='object')return false;
  if(value.kind===kind)return true;
  return Object.values(value).some(x=>containsKind(x,kind));
}

test('Artist runtime owns no other career, Palace, economy, or global reputation state',()=>{
  const action=catalog.definitions.actions.find(a=>a.id==='artist-geisha.shift');
  assert.ok(action);
  assert.equal(ordinaryCareerForShiftAction(action),'artist-geisha');
  assert.deepEqual(action.cost,{money:0,energy:1});

  for(const pack of artistPacks){
    for(const effect of allEffects(pack)){
      if(effect.career)assert.equal(effect.career,'artist-geisha',pack.id);
      if(effect.relationship)assert.equal(effect.relationship,'artist-geisha.mentor',pack.id);
      assert.notEqual(effect.kind,'setHousing',pack.id);
      assert.equal(effect.kind==='modifyResource',false,pack.id);
      assert.equal(effect.kind==='setMetaUnlock',false,pack.id);
      assert.equal(effect.kind==='addMetaHardWork',false,pack.id);
    }
    assert.deepEqual(pack.capabilities?.writes?.careers?.filter((x:string)=>x!=='artist-geisha')??[],[],pack.id);
    assert.deepEqual(pack.capabilities?.writes?.relationships?.filter((x:string)=>x!=='artist-geisha.mentor')??[],[],pack.id);
  }

  assert.equal(contract.unresolved.genericPatronSystem,null);
  assert.equal(contract.unresolved.palaceAccessFromArtistCareer,null);
  assert.equal(contract.crossSystem.activity.consumer,null);
});

test('Artist School authority maps exactly five prepared tracks and invents no producer threshold',()=>{
  const prepared=schoolPrep.mappings.map((x:any)=>x.trackId).sort();
  const published=schoolAuthority.mappings.map((x:any)=>x.trackId).sort();
  assert.deepEqual(published,prepared);
  assert.equal(published.length,5);
  assert.ok(schoolAuthority.mappings.every((x:any)=>x.producerThreshold===null));
  assert.ok(schoolAuthority.mappings.every((x:any)=>x.selectedPublicFactId===null));
  assert.equal(artistPacks.some(p=>containsKind(p,'schoolCounter')),false,
    'Artist runtime must not author School thresholds');
  assert.deepEqual(
    published,
    [
      'school.track.arts_and_performance',
      'school.track.body_confidence',
      'school.track.etiquette_and_presentation',
      'school.track.literacy_and_numbers',
      'school.track.rhetoric_and_social'
    ]
  );
});

test('Artist cross-system seams consume shipped facts read-only and write Artist state only',()=>{
  assert.deepEqual(cross.capabilities.writes,{careers:['artist-geisha']});
  for(const career of ['satyr-maid','tavern','merchant','guard']){
    assert.ok(cross.capabilities.reads.careers.includes(career),career);
  }

  const expected:any={
    'artist-geisha.cross.satyr-overlap':['satyr-maid','personal-network-ready','satyr-network-known'],
    'artist-geisha.cross.tavern-rumour':['tavern','rumour-confirmed','tavern-rumour-known'],
    'artist-geisha.cross.merchant-delivery':['merchant','delivery-recorded','merchant-material-route-known'],
    'artist-geisha.cross.guard-context':['guard','cargo-pass-evidence','guard-event-context-known']
  };
  for(const [eventId,[sourceCareer,sourceFact,artistFact]] of Object.entries(expected) as any){
    const event=cross.events.find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    assert.ok(event.conditions.some((c:any)=>
      c.kind==='careerFact'&&c.career===sourceCareer&&c.fact===sourceFact&&c.present===true
    ),eventId);
    const effects=event.choices.flatMap((c:any)=>c.effects);
    assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.career==='artist-geisha'&&e.fact===artistFact),eventId);
    assert.equal(effects.some((e:any)=>e.career&&e.career!=='artist-geisha'),false,eventId);
  }
});

test('Master, Patron Network, and Court Invitation readiness are mechanically distinct',()=>{
  const master=routes.events.find((e:any)=>e.id==='artist-geisha.routes.master-ready');
  const patron=routes.events.find((e:any)=>e.id==='artist-geisha.routes.patron-network-ready');
  const contact=routes.events.find((e:any)=>e.id==='artist-geisha.routes.court-contact');
  const court=routes.events.find((e:any)=>e.id==='artist-geisha.routes.court-ready');
  assert.ok(master);assert.ok(patron);assert.ok(contact);assert.ok(court);

  for(const fact of ['performance-breadth-ready','school-arts-ready','school-literacy-ready','performance-kit-issued']){
    assert.ok(master.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact===fact&&c.present===true),fact);
  }
  assert.ok(master.conditions.some((c:any)=>c.kind==='itemCapability'&&c.capability==='artist_performance_ready'));

  for(const fact of ['mentor-trust-ready','school-rhetoric-ready','social-network-breadth-ready']){
    assert.ok(patron.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact===fact&&c.present===true),fact);
  }

  for(const fact of ['school-etiquette-ready','formal-attire-issued','winter-window-seen','guard-event-context-known']){
    assert.ok(contact.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact===fact&&c.present===true),fact);
  }
  for(const fact of ['school-etiquette-ready','court-contact-ready','invitation-token-issued']){
    assert.ok(court.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact===fact&&c.present===true),fact);
  }
  assert.ok(court.conditions.some((c:any)=>c.kind==='itemCapability'&&c.capability==='artist_handle_invitation'));

  for(const event of [master,patron,contact,court]){
    const effects=event.choices.flatMap((c:any)=>c.effects);
    assert.ok(effects.length>0,event.id);
    assert.ok(effects.every((e:any)=>e.kind==='addCareerFact'&&e.career==='artist-geisha'),event.id);
    assert.equal(containsKind(event,'metaHardWork'),false,event.id);
    assert.equal(containsKind(event,'metaUnlock'),false,event.id);
  }
});

test('Artist Night pack uses existing after-choice Night semantics and no next-day rewrite',()=>{
  assert.equal(night.events.length,3);
  for(const event of night.events){
    assert.deepEqual(event.nightPolicy,{
      intercept:'after_choice',
      suppressLodgingPayment:false,
      suppressVoluntaryMenu:true,
      consumesNight:true
    },event.id);
    assert.ok(event.reactionTriggers.some((x:any)=>x.kind==='nightChoiceCompleted'),event.id);
  }
});
