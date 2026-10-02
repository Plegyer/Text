import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/ASSASSIN_RUNTIME_PREP_CONTRACT_v1.json','utf8'));
const packsDir='content/packs';
const assassinFiles=readdirSync(packsDir).filter(f=>f.startsWith('assassin-')&&f.endsWith('.json')).sort();
const assassinPacks=assassinFiles.map(f=>JSON.parse(readFileSync(`${packsDir}/${f}`,'utf8')));

function allEffects(pack:any){
  return pack.events.flatMap((event:any)=>event.choices.flatMap((choice:any)=>choice.effects));
}
function walk(value:any,visit:(x:any)=>void){
  if(Array.isArray(value)){for(const x of value)walk(x,visit);return;}
  if(!value||typeof value!=='object')return;
  visit(value);
  for(const x of Object.values(value))walk(x,visit);
}

test('Assassin prep writes Assassin-local state only and reads exact shipped cross-system facts',()=>{
  for(const pack of assassinPacks){
    assert.deepEqual(pack.capabilities?.writes?.careers?.filter((x:string)=>x!=='assassin')??[],[],pack.id);
    for(const effect of allEffects(pack)){
      if(effect.career)assert.equal(effect.career,'assassin',`${pack.id}: ${JSON.stringify(effect)}`);
    }
  }

  const cross=assassinPacks.find((p:any)=>p.id==='assassin.cross');
  assert.ok(cross);
  assert.deepEqual(cross.capabilities.writes,{careers:['assassin']});
  assert.deepEqual(cross.capabilities.reads.careers,['assassin','tavern','merchant','guard']);

  const exactInputs:any={
    'assassin.cross.tavern-rumour':['tavern','rumour-confirmed','tavern-intel-known'],
    'assassin.cross.merchant-route':['merchant','delivery-recorded','merchant-route-known'],
    'assassin.cross.guard-pressure':['guard','cargo-pass-evidence','guard-pressure-known']
  };
  for(const [eventId,[career,fact,localFact]] of Object.entries(exactInputs) as any){
    const event=cross.events.find((e:any)=>e.id===eventId);
    assert.ok(event,eventId);
    assert.ok(event.conditions.some((c:any)=>c.kind==='careerFact'&&c.career===career&&c.fact===fact&&c.present===true),eventId);
    const effects=event.choices.flatMap((c:any)=>c.effects);
    assert.ok(effects.some((e:any)=>e.kind==='addCareerFact'&&e.career==='assassin'&&e.fact===localFact),eventId);
    assert.equal(effects.some((e:any)=>e.career&&e.career!=='assassin'),false,eventId);
  }
});

test('Assassin School remains capability-match-only with no producer gate in runtime packs',()=>{
  assert.equal(contract.schoolHooks.length,5);
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerThreshold===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerPublicFact===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.canonicalGate===false));

  for(const pack of assassinPacks){
    assert.equal(pack.capabilities?.reads?.schoolTracks,undefined,pack.id);
    let foundSchoolCounter=false;
    walk(pack,(x:any)=>{if(x.kind==='schoolCounter')foundSchoolCounter=true;});
    assert.equal(foundSchoolCounter,false,pack.id);
  }
});

test('Assassin prep creates no Morality, combat, Palace, global black-market, or complex-ending authority',()=>{
  assert.equal(definitions.stats?.includes?.('morality')??false,false);
  assert.equal(definitions.endings.some((e:any)=>e.id.startsWith('ending.assassin.')&&e.id!=='ending.assassin.hard-work'),false);

  for(const pack of assassinPacks){
    let forbiddenState=false;
    walk(pack,(x:any)=>{
      if(x.kind==='metaUnlock'&&x.unlock==='palace')forbiddenState=true;
      if(x.kind==='addWorldFact'&&/palace|morality|black.?market/i.test(x.fact??''))forbiddenState=true;
      if(x.kind==='addCareerFact'&&x.career!=='assassin')forbiddenState=true;
    });
    assert.equal(forbiddenState,false,pack.id);
  }

  const assassin=definitions.careers.find((x:any)=>x.id==='assassin');
  assert.ok(assassin);
  const refusalTransition=assassin.transitions.find((x:any)=>x.id==='branch-refusal-chain');
  assert.ok(refusalTransition);
  assert.ok(refusalTransition.conditions.some((c:any)=>c.kind==='careerFact'&&c.fact==='refusal-chain-ready'));

  const produced=assassinPacks.flatMap(allEffects).filter((e:any)=>e.kind==='addCareerFact'&&e.fact==='refusal-chain-ready');
  assert.equal(produced.length,0,'open exact refusal-chain threshold must not be invented in prep');
});

test('Assassin advanced Activity is selective and ordinary shift remains city-side',()=>{
  const action=definitions.actions.find((a:any)=>a.id==='assassin.shift');
  const activity=definitions.activities.find((a:any)=>a.id==='assassin.infiltration');
  assert.ok(action);
  assert.ok(activity);
  assert.equal(action.cost.energy,1);
  assert.equal(JSON.stringify(action).includes('assassin.infiltration'),false);
  assert.ok(activity.entryConditions.some((c:any)=>c.kind==='careerFact'&&c.fact==='infiltration-qualified'&&c.present===true));
  assert.ok(activity.entryConditions.some((c:any)=>c.kind==='any'&&c.conditions.some((x:any)=>x.kind==='careerStage'&&x.stage==='trusted-blade')));
});
