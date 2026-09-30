import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch} from '../src/core/engine.ts';
import {presentationIdForEnding} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

test('C1D-81 every current ending has an existing presentation slot',()=>{
  for(const ending of catalog.definitions.endings){
    const id=presentationIdForEnding(ending.id);
    assert.ok(presentation.slots[id],ending.id+' -> '+id);
  }
});

test('C1D-81 eligible committed and completed states keep one stable ending presentation identity',()=>{
  let s=started();
  s.run.progression.careers.lumber={stage:'accepted-hand',shifts:0,counters:{completed_shifts:49},choices:{},facts:[]};
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  const id=presentationIdForEnding('ending.lumber.hard-work');
  assert.equal(id,'ending/lumber/hard-work');
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.status,'active');

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(presentationIdForEnding(s.run.endings.committed),id);
  assert.equal(s.run.endings.result,null);

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.equal(presentationIdForEnding(s.run.endings.result!.endingId),id);
});
