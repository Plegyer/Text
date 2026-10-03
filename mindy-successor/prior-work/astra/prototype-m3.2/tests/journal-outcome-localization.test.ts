import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

test('resolved event choice stores locale-neutral outcome refs beside fallback text',()=>{
 let s=started();
 s.run.pending={eventId:'base.arrival',variantId:'welcome',allowedChoiceIds:['introduce']};
 const beforeJournal=s.run.journal.length;
 s=dispatch(s,{type:'choice',id:'introduce'},catalog);

 assert.equal(s.run.journal.length,beforeJournal+1);
 assert.equal(s.run.historyState.journalRefs.length,s.run.journal.length);
 assert.deepEqual(s.run.historyState.journalRefs.at(-1),{
  kind:'eventChoice',
  eventId:'base.arrival',
  choiceId:'introduce'
 });
 assert.equal(s.run.journal.at(-1),'Вы договорились начать с простого. Орвин убрал инструкцию для големов.');
 assert.deepEqual(s.run.lastAction?.outcomeRef,{
  kind:'eventChoice',
  eventId:'base.arrival',
  choiceId:'introduce'
 });
 assert.equal(s.run.flags['alchemy.intro'],true);
});

test('schema4 save without journal refs loads with null refs and keeps old text fallback',()=>{
 const before=started();
 const raw=JSON.parse(JSON.stringify(before));
 raw.schemaVersion=4;
 delete raw.run.historyState.journalRefs;
 if(raw.run.flow.lastAction)delete raw.run.flow.lastAction.outcomeRef;

 const after=parseSave(JSON.stringify(raw),catalog);
 assert.equal(after.run.historyState.journalRefs.length,after.run.journal.length);
 assert.ok(after.run.historyState.journalRefs.every(ref=>ref===null));
 assert.equal(after.run.flow.lastAction?.outcomeRef,undefined);
 assert.deepEqual(after.run.journal,before.run.journal);
});

test('journal refs must stay index-aligned with fallback journal text',()=>{
 const raw=JSON.parse(JSON.stringify(started()));
 raw.schemaVersion=4;
 raw.run.historyState.journalRefs=[];
 assert.throws(()=>parseSave(JSON.stringify(raw),catalog),/Некорректные ссылки дневника/);
});
