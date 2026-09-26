import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from './helpers.ts';
import {presentationIdForEvent} from '../src/core/presentation.ts';

const base=JSON.parse(readFileSync('content/packs/base.json','utf8'));

test('merged base.school event has exact lesson variant and listen choice',()=>{
  const event=base.events.find((row:any)=>row.id==='base.school');
  assert.ok(event);
  assert.ok(event.variants.some((variant:any)=>
    variant.id==='lesson'&&variant.media.includes('base.workshop')
  ));
  assert.ok(event.choices.some((choice:any)=>choice.id==='listen'));
});

test('base.school lesson resolves to the final merged semantic presentationId',()=>{
  assert.equal(
    presentationIdForEvent(catalog,'base.school','lesson'),
    'location/town/event/base-school/lesson'
  );
});

test('paid School result and blocking School event are distinct presentation boundaries',()=>{
  assert.notEqual(
    'school/arcana/lesson/default',
    'location/town/event/base-school/lesson'
  );
});

test('merged PR24 reconciliation requires the blocking School scene before NightFlow',()=>{
  const sequence=[
    {owner:'lastAction',presentationId:'school/arcana/lesson/default'},
    {owner:'pendingScene',presentationId:'location/town/event/base-school/lesson'},
    {owner:'nightFlow',presentationId:'location/town/default'}
  ];
  assert.deepEqual(sequence.map(step=>step.owner),['lastAction','pendingScene','nightFlow']);
});

test('49-shift setup does not create any presentation identity',()=>{
  const accelerator={counter:'completed_shifts',value:49,kind:'gameplay-threshold-setup'};
  assert.equal('presentationId' in accelerator,false);
});
