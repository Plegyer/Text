import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const fixture=load('content/secret-debt-separation-regression-v2.fixture.json');

const packs=fixture.ordinaryPovertyPackIds.map((id:string)=>
  load('content/packs/'+id+'.json')
);
const events=packs.flatMap((pack:any)=>pack.events);

test('ordinary poverty packs do not require or write Secret Debt state',()=>{
  const serialized=JSON.stringify(packs);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  const debtWrites=events
    .flatMap((event:any)=>event.choices)
    .flatMap((choice:any)=>choice.effects)
    .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  const debtConditions=events
    .flatMap((event:any)=>event.conditions??[])
    .filter((condition:any)=>JSON.stringify(condition).includes('"key":"debt"'));
  assert.equal(debtConditions.length,0);
});

test('ordinary poverty keeps independent income/help/resource opportunities',()=>{
  for(const required of fixture.requiredIndependentOpportunities){
    const event=events.find((candidate:any)=>candidate.id===required.eventId);
    assert.ok(event,required.eventId);
    const choice=event.choices.find((candidate:any)=>candidate.id===required.choiceId);
    assert.ok(choice,required.eventId+' / '+required.choiceId);
    assert.ok(choice.effects.length>0,required.eventId+' should retain its ordinary effect');
  }
});

test('generic debt stays separate while Secret Debt has its own production identities',()=>{
  for(const actionId of fixture.genericDebtBoundary.actionIds){
    assert.ok(definitions.actions.some((action:any)=>action.id===actionId),actionId);
  }

  const expected=fixture.secretDebtProductionExpectedPresent;
  assert.ok(definitions.careers.some((career:any)=>career.id===expected.careerId),expected.careerId);
  assert.ok(definitions.actions.some((action:any)=>action.id===expected.actionId),expected.actionId);
  for(const endingId of expected.endingIds){
    assert.ok(definitions.endings.some((ending:any)=>ending.id===endingId),endingId);
  }

  const secretDebt=definitions.careers.find((career:any)=>career.id===expected.careerId);
  assert.ok(secretDebt);
  assert.equal(JSON.stringify(secretDebt).includes('"key":"debt"'),false,'Secret Debt must not reuse the legacy generic debt metric');
  assert.equal(
    (definitions.relationships??[]).some((relationship:any)=>/secret.?debt|lender|slave/i.test(JSON.stringify(relationship))),
    false
  );
});

test('C3-46 keeps Secret Debt product values open',()=>{
  assert.ok(fixture.productOpen.includes('trigger probability'));
  assert.ok(fixture.productOpen.includes('offer amount'));
  assert.ok(fixture.productOpen.includes('activation delay'));
  assert.ok(fixture.productOpen.includes('future debt amount'));
  assert.ok(fixture.productOpen.includes('forced Night penalty'));
  for(const value of Object.values(fixture.assertions)){
    assert.equal(value,true);
  }
});
