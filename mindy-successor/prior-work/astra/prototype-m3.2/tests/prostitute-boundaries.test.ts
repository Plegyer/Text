import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/PROSTITUTE_RUNTIME_PREP_CONTRACT_v1.json','utf8'));
const packsDir='content/packs';
const prostituteFiles=readdirSync(packsDir).filter(f=>f.startsWith('prostitute-')&&f.endsWith('.json')).sort();
const prostitutePacks=prostituteFiles.map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));

function allEffects(pack:any){
  return pack.events.flatMap((event:any)=>event.choices.flatMap((choice:any)=>choice.effects));
}
function walk(value:any,visit:(x:any)=>void){
  if(Array.isArray(value)){for(const x of value)walk(x,visit);return;}
  if(!value||typeof value!=='object')return;
  visit(value);
  for(const x of Object.values(value))walk(x,visit);
}

test('voluntary Prostitute prep owns no Secret Debt, forced-Night, Lust-router, housing, or extra-income mechanics',()=>{
  assert.equal(contract.adultContentRouter.status,'AUTHORITY_NULL');
  assert.equal(contract.adultContentRouter.lustThreshold,null);
  assert.equal(contract.adultContentRouter.consentStateMechanic,null);
  assert.equal(contract.adultContentRouter.explicitPresentationGate,null);

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
  assert.equal(/secret.?debt|forced/i.test(JSON.stringify(night)),false);
});

test('Prostitute School boundary remains capability-only with no producer threshold or runtime School gate',()=>{
  assert.equal(contract.schoolHooks.length,5);
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerThreshold===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerPublicFact===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.consumerEventId===null));

  for(const pack of prostitutePacks){
    assert.equal(pack.capabilities?.reads?.schoolTracks,undefined,pack.id);
    let foundSchool=false;
    walk(pack,(x:any)=>{if(x.kind==='schoolCounter')foundSchool=true;});
    assert.equal(foundSchool,false,pack.id);
  }
});

test('Prostitute cross-system seams read exact shipped inputs and write Prostitute-local state only',()=>{
  const cross=prostitutePacks.find((p:any)=>p.id==='prostitute.cross');
  assert.ok(cross);
  assert.deepEqual(cross.capabilities.writes,{careers:['prostitute']});
  assert.deepEqual(cross.capabilities.reads.careers,['prostitute','satyr-maid','tavern','guard','merchant']);
  assert.equal(cross.capabilities.reads.careers.includes('artist-geisha'),false);
  assert.equal(contract.crossSystemReadOnlyInputs.artistGeisha,null);

  const exactInputs:any={
    'prostitute.cross.satyr-network':['satyr-maid','personal-network-ready','satyr-network-known'],
    'prostitute.cross.tavern-information':['tavern','rumour-confirmed','tavern-information-known'],
    'prostitute.cross.guard-safety':['guard','city-dispute-resolved','guard-safety-context-known'],
    'prostitute.cross.merchant-business':['merchant','delivery-recorded','merchant-business-context-known']
  };
  for(const [eventId,[career,fact,localFact]] of Object.entries(exactInputs) as any){
    const event=cross.events.find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    assert.ok(event.conditions.some((c:any)=>c.kind==='careerFact'&&c.career===career&&c.fact===fact&&c.present===true),eventId);
    const effects=event.choices.flatMap((c:any)=>c.effects);
    assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.career==='prostitute'&&e.fact===localFact),eventId);
    assert.equal(effects.some((e:any)=>e.career&&e.career!=='prostitute'),false,eventId);
  }
});

test('recurring client modes are distinct and romance is never a career requirement',()=>{
  const relationship=definitions.relationships.find((x:any)=>x.id==='prostitute.recurring-client');
  assert.ok(relationship);
  const modes=relationship.transitions
    .filter((x:any)=>x.id.startsWith('mode-'))
    .map((x:any)=>x.conditions.find((c:any)=>c.kind==='relationshipChoice')?.value)
    .sort();
  assert.deepEqual(modes,['friendship','professional-only','romance']);

  const career=definitions.careers.find((x:any)=>x.id==='prostitute');
  assert.ok(career);
  const serialized=JSON.stringify(career.transitions);
  assert.equal(serialized.includes('"relationship-mode"'),false);
  assert.equal(serialized.includes('"romance"'),false);
});

test('Prostitute items and routes create no Palace access or new public complex ending identity',()=>{
  const exactCaps=new Set([
    'prostitute_formal_presence',
    'prostitute_private_room_access',
    'prostitute_client_token',
    'prostitute_handle_evidence'
  ]);
  for(const item of definitions.itemDefinitions.filter((x:any)=>x.id.startsWith('prostitute_'))){
    assert.ok(item.capabilities.every((x:string)=>exactCaps.has(x)),item.id);
    assert.equal(item.capabilities.some((x:string)=>/palace|court|universal/i.test(x)),false,item.id);
  }
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.prostitute.')).map((e:any)=>e.id),
    ['ending.prostitute.hard-work']
  );
});
