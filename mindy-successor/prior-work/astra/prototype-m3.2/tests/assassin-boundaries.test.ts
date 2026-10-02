import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const packsDir='content/packs';
const assassinFiles=readdirSync(packsDir).filter(f=>f.startsWith('assassin-')&&f.endsWith('.json')).sort();
const packs=assassinFiles.map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));

function walk(value:any,visit:(x:any)=>void){
 if(Array.isArray(value)){for(const x of value)walk(x,visit);return;}
 if(!value||typeof value!=='object')return;
 visit(value); for(const x of Object.values(value))walk(x,visit);
}

test('Assassin does not write other careers, Palace, Morality, or global crime/network state',()=>{
 assert.equal(definitions.endings.some((e:any)=>e.id.startsWith('ending.assassin.')&&e.id!=='ending.assassin.hard-work'),false);
 for(const pack of packs){
  const foreignWrites=pack.capabilities?.writes?.careers?.filter((x:string)=>x!=='assassin')??[];
  assert.deepEqual(foreignWrites,[],pack.id);
  let forbidden=false;
  walk(pack,(x:any)=>{
   if(x.kind==='addCareerFact'&&x.career&&x.career!=='assassin')forbidden=true;
   if(x.kind==='addWorldFact'&&/palace|morality|crime|black.?market|network/i.test(x.fact??''))forbidden=true;
   if(x.kind==='metaUnlock'&&x.unlock==='palace')forbidden=true;
  });
  assert.equal(forbidden,false,pack.id);
 }
});

test('cross-system hooks read shipped Guard/Tavern/Merchant facts and write Assassin-local facts only',()=>{
 const cross=packs.find((p:any)=>p.id==='assassin.cross');
 assert.ok(cross);
 assert.deepEqual(cross.capabilities.writes,{careers:['assassin']});
 const expected:any={
  'assassin.cross.tavern-rumour':['tavern','rumour-confirmed','tavern-intel-known'],
  'assassin.cross.merchant-route':['merchant','delivery-recorded','merchant-route-known'],
  'assassin.cross.guard-pressure':['guard','cargo-pass-evidence','guard-pressure-known']
 };
 for(const [eventId,[career,fact,localFact]] of Object.entries(expected) as any){
  const e=cross.events.find((x:any)=>x.id===eventId); assert.ok(e,eventId);
  assert.ok(e.conditions.some((c:any)=>c.kind==='careerFact'&&c.career===career&&c.fact===fact&&c.present===true),eventId);
  const effects=e.choices.flatMap((c:any)=>c.effects);
  assert.ok(effects.some((x:any)=>x.kind==='addCareerFact'&&x.career==='assassin'&&x.fact===localFact),eventId);
 }
});

test('School hook is capability-only context and cannot gate Assassin progression',()=>{
 const school=packs.find((p:any)=>p.id==='assassin.school');
 assert.ok(school);
 assert.deepEqual(school.capabilities.writes,{});
 assert.deepEqual([...school.capabilities.reads.schoolTracks].sort(),[
  'school.track.etiquette_and_presentation','school.track.field_craft','school.track.literacy_and_numbers',
  'school.track.physical_training','school.track.rhetoric_and_social'
 ].sort());
 for(const event of school.events)for(const choice of event.choices)assert.deepEqual(choice.effects,[]);
 const assassin=definitions.careers.find((x:any)=>x.id==='assassin');
 assert.equal(JSON.stringify(assassin).includes('schoolCounter'),false);
 const action=definitions.actions.find((x:any)=>x.id==='assassin.shift');
 assert.equal(JSON.stringify(action.conditions).includes('schoolCounter'),false);
});

test('item-specific prep and evidence methods require their actual capabilities',()=>{
 const contract=packs.find((p:any)=>p.id==='assassin.contract');
 const prep=contract.events.find((e:any)=>e.id==='assassin.contract.prep');
 const expected:any={
  'concealed-toolset':'assassin_concealed_entry',
  'sealed-pass':'assassin_sealed_access',
  disguise:'assassin_context_disguise'
 };
 for(const [choiceId,capability] of Object.entries(expected)){
  const c=prep.choices.find((x:any)=>x.id===choiceId); assert.ok(c,choiceId);
  assert.deepEqual(c.conditions,[{kind:'itemCapability',capability,present:true}]);
 }
 const itemPack=packs.find((p:any)=>p.id==='assassin.items');
 const toolEvent=itemPack.events.find((e:any)=>e.id==='assassin.items.concealed-toolset');
 const prepEvent=contract.events.find((e:any)=>e.id==='assassin.contract.prep');
 assert.ok(toolEvent.priority>prepEvent.priority,'toolset offer must resolve before prep so its capability can change the current contract');
 const activity=definitions.activities.find((x:any)=>x.id==='assassin.infiltration');
 const preserve=activity.options.find((x:any)=>x.id==='assassin.infiltration.preserve-evidence'); assert.ok(preserve);
 assert.deepEqual(preserve.conditions,[{kind:'itemCapability',capability:'assassin_handle_evidence',present:true}]);
});

test('open Product decisions remain open instead of being encoded as accidental mechanics',()=>{
 const assassin=definitions.careers.find((x:any)=>x.id==='assassin');
 const refusal=assassin.transitions.find((x:any)=>x.id==='branch-refusal-chain'); assert.ok(refusal);
 assert.ok(refusal.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact==='refusal-chain-ready'));
 const produced:any[]=[];
 for(const pack of packs)walk(pack,(x:any)=>{if(x.kind==='addCareerFact'&&x.career==='assassin'&&x.fact==='refusal-chain-ready')produced.push(x);});
 assert.equal(produced.length,0,'exact Refusal Chain promotion rule is still Product-open');
 assert.deepEqual(definitions.endings.filter((e:any)=>e.id.startsWith('ending.assassin.')).map((e:any)=>e.id),['ending.assassin.hard-work']);
});


test('Assassin removes prep-only numeric progression guesses while reusing shipped Activity mechanics',()=>{
 const handler=definitions.relationships.find((x:any)=>x.id==='assassin.handler');
 const trust=handler.transitions.find((x:any)=>x.id==='build-trust');
 assert.equal(trust.conditions.some((c:any)=>c.kind==='relationshipCounter'),false);

 const contract=packs.find((p:any)=>p.id==='assassin.contract');
 assert.equal(contract.events.find((e:any)=>e.id==='assassin.contract.offer').maxShows,1);

 const routes=packs.find((p:any)=>p.id==='assassin.routes');
 for(const id of ['assassin.routes.choose-practice','assassin.routes.choose-network']){
  const e=routes.events.find((x:any)=>x.id===id);
  assert.equal(e.maxShows,1,id);
  assert.equal(e.choices.some((c:any)=>c.id==='defer'),false,id);
 }

 const activity=definitions.activities.find((x:any)=>x.id==='assassin.infiltration');
 const hunter=definitions.activities.find((x:any)=>x.id==='hunter.expedition');
 assert.equal(activity.entryEnergyCost,hunter.entryEnergyCost);
 assert.deepEqual(activity.adapterConfig,hunter.adapterConfig);
 assert.equal(activity.timePolicy,hunter.timePolicy);
 assert.equal(activity.failurePolicy,hunter.failurePolicy);
});


test('Assassin major-contract offer is one authored entry point without a dead one-shot defer',()=>{
 const contract=packs.find((p:any)=>p.id==='assassin.contract');
 const offer=contract.events.find((e:any)=>e.id==='assassin.contract.offer');
 assert.equal(offer.maxShows,1);
 assert.deepEqual(offer.choices.map((c:any)=>c.id),['accept']);
});

test('Assassin School publishes five one-shot capability reactions with no tuning cadence or writes',()=>{
 const school=packs.find((p:any)=>p.id==='assassin.school');
 assert.equal(school.events.length,5);
 for(const event of school.events){
  assert.equal(event.maxShows,1,event.id);
  assert.equal(event.cooldownDays,0,event.id);
  assert.equal(event.variantCooldownDays,0,event.id);
  for(const choice of event.choices)assert.deepEqual(choice.effects,[],event.id);
 }
});
