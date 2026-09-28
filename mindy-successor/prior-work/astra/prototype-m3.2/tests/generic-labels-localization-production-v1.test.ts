import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixture=JSON.parse(readFileSync('content/generic-labels-localization-production-v1.fixture.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

test('generic labels production fixture is fully merged RU EN',()=>{
 const entries=Object.entries(fixture.strings as Record<string,{ru:string;en:string}>);
 assert.equal(entries.length,49);
 for(const [key,value] of entries){
  assert.deepEqual(root[key],value,key);
  assert.ok(value.ru.trim(),key+' ru');
  assert.ok(value.en.trim(),key+' en');
 }
});

test('generic label consumers resolve stats hints resources items and run shell through locale keys',()=>{
 for(const token of [
  'statLabel(','statHint(','resourceLabel(','itemLabel(','genericValueLabel(',
  "tr('ui.event.eyebrow'","tr('ui.run.endingAccepted'","tr('ui.run.timeExpired'","tr('ui.run.fatesAndNextLife'"
 ]) assert.ok(app.includes(token),token);
});

test('generic labels patch is presentation-only',()=>{
 assert.equal(fixture.invariants.presentationOnly,true);
 assert.equal(fixture.invariants.gameplayFieldsIncluded,false);
 assert.equal(fixture.invariants.changesSaveState,false);
});
