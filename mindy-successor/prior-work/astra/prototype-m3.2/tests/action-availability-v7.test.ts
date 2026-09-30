import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailability,actionAvailable,dispatch,parseSave} from '../src/core/engine.ts';
import type {Catalog} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function action(id:string,cat:Catalog=catalog){
  const found=cat.definitions.actions.find(item=>item.id===id);
  assert.ok(found,id);
  return found;
}

test('C1D-62 central availability keeps semantic eligibility separate from resources and flow',()=>{
  const s=started();
  const lumber=action('lumber.shift');
  assert.equal(actionAvailable(lumber,s,catalog),true);
  assert.deepEqual(actionAvailability(lumber,s,catalog).blockers,[]);

  s.run.dayState.energyCurrent=0;
  assert.equal(actionAvailable(lumber,s,catalog),true);
  const blocked=actionAvailability(lumber,s,catalog);
  assert.equal(blocked.available,false);
  assert.equal(blocked.eligible,true);
  assert.deepEqual(blocked.blockers,['energy']);
  assert.equal(blocked.energyCost,1);
  assert.throws(()=>dispatch(s,{type:'action',id:'lumber.shift'},catalog),/Не хватает денег или энергии/);
});

test('C1D-62 late career empty contract and authored condition expose distinct reasons',()=>{
  const base=started();
  const tavern=action('tavern.shift');
  const unconfigured=actionAvailability(tavern,base,catalog);
  assert.equal(unconfigured.available,false);
  assert.equal(unconfigured.eligible,false);
  assert.equal(unconfigured.careerContractMissing,true);
  assert.deepEqual(unconfigured.missingConditions,[]);
  assert.ok(unconfigured.blockers.includes('career-contract-missing'));

  const synthetic=structuredClone(catalog) as Catalog;
  const authored=action('tavern.shift',synthetic);
  authored.conditions=[{kind:'worldFact',fact:'test.authored-career-access',present:true}];
  const missing=actionAvailability(authored,base,synthetic);
  assert.equal(missing.careerContractMissing,false);
  assert.equal(missing.eligible,false);
  assert.equal(missing.missingConditions.length,1);
  assert.ok(missing.blockers.includes('authored-condition'));

  const unlocked=started();
  unlocked.run.progression.worldFacts.push('test.authored-career-access');
  const ready=actionAvailability(authored,unlocked,synthetic);
  assert.equal(ready.available,true);
  assert.equal(ready.eligible,true);
  assert.deepEqual(ready.blockers,[]);
  assert.doesNotThrow(()=>dispatch(unlocked,{type:'action',id:'tavern.shift'},synthetic));
});

test('C1D-64 ordinary career availability stays derived across Save reload',()=>{
  const synthetic=structuredClone(catalog) as Catalog;
  const authored=action('tavern.shift',synthetic);
  authored.conditions=[{kind:'worldFact',fact:'test.reload-career-access',present:true}];

  const locked=started();
  assert.equal(actionAvailability(authored,locked,synthetic).available,false);
  const lockedReload=parseSave(JSON.stringify(locked),synthetic);
  assert.equal(actionAvailability(authored,lockedReload,synthetic).available,false);

  const unlocked=started();
  unlocked.run.progression.worldFacts.push('test.reload-career-access');
  const unlockedReload=parseSave(JSON.stringify(unlocked),synthetic);
  assert.equal(actionAvailability(authored,unlockedReload,synthetic).available,true);
  assert.equal(JSON.stringify(unlockedReload).includes('jobUnlocked'),false);

  const result=dispatch(unlockedReload,{type:'action',id:'tavern.shift'},synthetic);
  assert.equal(result.run.progression.careers.tavern?.counters.completed_shifts,1);
  assert.equal(JSON.stringify(result).includes('jobUnlocked'),false);
});
