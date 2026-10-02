import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const lateIds=[
  'tavern.shift',
  'hunter.shift',
  'guard.shift',
  'merchant.shift',
  'artist-geisha.shift',
  'assassin.shift',
  'prostitute.shift'
] as const;

function legacySchema4(){
  const raw=JSON.parse(JSON.stringify(started()));
  raw.schemaVersion=4;
  delete raw.run.character.progressionStatCap;
  delete raw.run.character.creation.activeHardWorkPackages;
  delete raw.run.character.creation.hardWorkPackagesApplied;
  return raw;
}

function availability(raw:any){
  const s=parseSave(JSON.stringify(raw),catalog);
  return Object.fromEntries(lateIds.map(id=>{
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    return [id,actionAvailable(action,s,catalog)];
  }));
}

test('existing schema-4 saves migrate and still derive late-career availability without redundant unlock fields',()=>{
  const raw=legacySchema4();
  assert.equal(raw.schemaVersion,4);
  assert.equal('careerUnlocks' in raw.run,false);
  assert.equal('lateCareerUnlocks' in raw.run,false);
  assert.equal('careerUnlocks' in raw.meta,false);
  assert.equal('lateCareerUnlocks' in raw.meta,false);

  const locked=availability(raw);
  for(const id of lateIds)assert.equal(locked[id],false,id);

  for(const stat of Object.keys(raw.run.character.stats))raw.run.character.stats[stat]=100;
  const statUnlocked=availability(raw);
  for(const id of lateIds)assert.equal(statUnlocked[id],true,id);

  for(const stat of Object.keys(raw.run.character.stats))raw.run.character.stats[stat]=1;
  raw.run.calendar.elapsedDays=80;
  const calendarUnlocked=availability(raw);
  for(const id of lateIds)assert.equal(calendarUnlocked[id],true,id);
});

test('schema-4 migration round-trip does not synthesize redundant late-career unlock state',()=>{
  const first=parseSave(JSON.stringify(legacySchema4()),catalog);
  const second=parseSave(JSON.stringify(first),catalog);
  const raw=JSON.parse(JSON.stringify(second));

  assert.equal(raw.schemaVersion,5);
  assert.equal('careerUnlocks' in raw.run,false);
  assert.equal('lateCareerUnlocks' in raw.run,false);
  assert.equal('careerUnlocks' in raw.meta,false);
  assert.equal('lateCareerUnlocks' in raw.meta,false);
});
