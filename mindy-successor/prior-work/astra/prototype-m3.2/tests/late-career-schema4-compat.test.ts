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

function availability(text:string){
  const s=parseSave(text,catalog);
  return Object.fromEntries(lateIds.map(id=>{
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    return [id,actionAvailable(action,s,catalog)];
  }));
}

test('existing schema-4 saves derive late-career availability without new unlock fields',()=>{
  const raw=JSON.parse(JSON.stringify(started()));
  assert.equal(raw.schemaVersion,4);
  assert.equal('careerUnlocks' in raw.run,false);
  assert.equal('lateCareerUnlocks' in raw.run,false);
  assert.equal('careerUnlocks' in raw.meta,false);
  assert.equal('lateCareerUnlocks' in raw.meta,false);

  const locked=availability(JSON.stringify(raw));
  for(const id of lateIds)assert.equal(locked[id],false,id);

  for(const stat of Object.keys(raw.run.character.stats))raw.run.character.stats[stat]=100;
  const statUnlocked=availability(JSON.stringify(raw));
  for(const id of lateIds)assert.equal(statUnlocked[id],true,id);

  for(const stat of Object.keys(raw.run.character.stats))raw.run.character.stats[stat]=1;
  raw.run.calendar.elapsedDays=80;
  const calendarUnlocked=availability(JSON.stringify(raw));
  for(const id of lateIds)assert.equal(calendarUnlocked[id],true,id);
});

test('schema-4 round-trip does not synthesize redundant late-career unlock state',()=>{
  const first=parseSave(JSON.stringify(started()),catalog);
  const second=parseSave(JSON.stringify(first),catalog);
  const raw=JSON.parse(JSON.stringify(second));

  assert.equal('careerUnlocks' in raw.run,false);
  assert.equal('lateCareerUnlocks' in raw.run,false);
  assert.equal('careerUnlocks' in raw.meta,false);
  assert.equal('lateCareerUnlocks' in raw.meta,false);
});
