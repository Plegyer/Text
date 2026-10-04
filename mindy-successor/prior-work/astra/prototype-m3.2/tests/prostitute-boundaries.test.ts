import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const packsDir='content/packs';
const prostitutePacks=readdirSync(packsDir)
  .filter(f=>f.startsWith('prostitute-')&&f.endsWith('.json'))
  .sort().map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));

function walk(value:any,visit:(x:any)=>void){
  if(Array.isArray(value)){for(const x of value)walk(x,visit);return;}
  if(!value||typeof value!=='object')return;
  visit(value);
  for(const x of Object.values(value))walk(x,visit);
}

test('voluntary Prostitute owns no Secret Debt, forced Night, Lust router, housing mutation, or extra income mechanic',()=>{
  for(const pack of prostitutePacks){
    assert.equal(pack.events.some((event:any)=>event.nightPolicy!==undefined),false,pack.id);
    assert.equal(pack.capabilities?.writes?.housing,undefined,pack.id);
    assert.equal(pack.capabilities?.writes?.resources,undefined,pack.id);
    assert.equal(pack.capabilities?.writes?.energy,undefined,pack.id);
    let forbidden=false;
    walk(pack,(x:any)=>{
      if(x.kind==='schoolCounter')forbidden=true;
      if(x.kind==='metric'&&(x.key==='lust'||x.key==='debt'))forbidden=true;
      if(x.kind==='modifyResource'&&x.resource==='money')forbidden=true;
      if(x.kind==='setHousing'||x.kind==='modifyEnergy')forbidden=true;
      if(x.kind==='metaUnlock'&&x.unlock==='palace')forbidden=true;
    });
    assert.equal(forbidden,false,pack.id);
  }

  const night=definitions.nightChoices.find((x:any)=>x.id==='prostitute.night.client-followup');
  assert.ok(night);
  assert.equal(night.nextDayEnergyDelta,0);
  assert.deepEqual(night.nextDayEffects,[]);
});

test('School remains an authority boundary instead of an invented Prostitute threshold',()=>{
  for(const pack of prostitutePacks){
    assert.equal(pack.capabilities?.reads?.schoolTracks,undefined,pack.id);
    let found=false;
    walk(pack,(x:any)=>{if(x.kind==='schoolCounter')found=true;});
    assert.equal(found,false,pack.id);
  }
  const schema=readFileSync('src/core/schema.ts','utf8');
  assert.equal(schema.includes("kind:z.literal('schoolCounterChanged')"),false,
    'shared runtime has no School reaction trigger; producer must not fabricate one');
});

test('cross-system seams read shipped facts and housing context but write Prostitute-local state only',()=>{
  const cross=prostitutePacks.find((p:any)=>p.id==='prostitute.cross');
  assert.ok(cross);
  assert.deepEqual(cross.capabilities.writes,{careers:['prostitute']});
  assert.deepEqual(cross.capabilities.reads.careers,['prostitute','satyr-maid','tavern','guard','merchant']);
  assert.equal(cross.capabilities.reads.housing,true);

  const exact:any={
    'prostitute.cross.satyr-network':['satyr-maid','personal-network-ready','satyr-network-known'],
    'prostitute.cross.tavern-information':['tavern','rumour-confirmed','tavern-information-known'],
    'prostitute.cross.city-safety':['guard','city-dispute-resolved','guard-safety-context-known'],
    'prostitute.cross.merchant-business':['merchant','delivery-recorded','merchant-business-context-known']
  };
  for(const [eventId,[career,fact,localFact]] of Object.entries(exact) as any){
    const event=cross.events.find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    assert.ok(event.conditions.some((c:any)=>
      c.kind==='careerFact'&&c.career===career&&c.fact===fact&&c.present===true),eventId);
    const effects=event.choices.flatMap((c:any)=>c.effects);
    assert.ok(effects.some((e:any)=>
      e.kind==='addCareerFact'&&e.career==='prostitute'&&e.fact===localFact),eventId);
    assert.equal(effects.some((e:any)=>e.career&&e.career!=='prostitute'),false,eventId);
  }

  const housing=cross.events.find((e:any)=>e.id==='prostitute.cross.housing-context');
  assert.ok(housing);
  assert.ok(housing.conditions.some((c:any)=>
    c.kind==='any'&&c.conditions.every((x:any)=>x.kind==='housingTier')));
  assert.ok(housing.choices.flatMap((c:any)=>c.effects).some((e:any)=>
    e.kind==='addCareerFact'&&e.fact==='housing-context-reviewed'));
});

test('recurring client modes stay distinct and romance is never a career requirement',()=>{
  const relationship=definitions.relationships.find((x:any)=>x.id==='prostitute.recurring-client');
  const modes=relationship.transitions
    .filter((x:any)=>x.id.startsWith('mode-'))
    .map((x:any)=>x.conditions.find((c:any)=>c.kind==='relationshipChoice')?.value).sort();
  assert.deepEqual(modes,['friendship','professional-only','romance']);

  const career=definitions.careers.find((x:any)=>x.id==='prostitute');
  const serialized=JSON.stringify(career.transitions);
  assert.equal(serialized.includes('"relationship-mode"'),false);
  assert.equal(serialized.includes('"romance"'),false);
});

test('Prostitute items and routes create no Palace access and expose only the exact D40 public ending identities',()=>{
  const exactCaps=new Set([
    'prostitute_formal_presence','prostitute_private_room_access',
    'prostitute_client_token','prostitute_handle_evidence'
  ]);
  for(const item of definitions.itemDefinitions.filter((x:any)=>x.id.startsWith('prostitute_'))){
    assert.ok(item.capabilities.every((x:string)=>exactCaps.has(x)),item.id);
    assert.equal(item.capabilities.some((x:string)=>/palace|court|universal/i.test(x)),false,item.id);
  }
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.prostitute.')).map((e:any)=>e.id),
    [
      'ending.prostitute.hard-work',
      'ending.prostitute.independent-house',
      'ending.prostitute.elite-clientele',
      'ending.prostitute.network-protection'
    ]
  );
});
