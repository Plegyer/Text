import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyPresentation,
  emptyPresentation,
  presentationIdForAction,
  presentationIdForActionResult,
  presentationSlots,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const gif='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';

test('presentation slots expose stable semantic work/result IDs',()=>{
  const ids=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.ok(ids.has('location/town/default'));
  assert.ok(ids.has('job/lumber/shift/spring/default'));
  assert.ok(ids.has('job/lumber/result/spring'));
  assert.equal(presentationIdForAction(catalog,'lumber',['stage.lumber.spring']),'job/lumber/shift/spring/default');
  assert.equal(presentationIdForActionResult(catalog,'lumber',['stage.lumber.spring']),'job/lumber/result/spring');
});

test('resolver prefers GIF, then static override when animation is disabled',()=>{
  const patch={
    ...emptyPresentation(),
    slots:{
      'job/lumber/shift/spring/default':{
        primary:{kind:'gif' as const,src:gif,alt:'Animated Lumber shift'},
        static:{kind:'image' as const,src:png,alt:'Static Lumber shift'}
      }
    }
  };
  assert.doesNotThrow(()=>applyPresentation(catalog,patch));
  const animated=resolvePresentation(catalog,patch,'job/lumber/shift/spring/default',{animationsEnabled:true});
  assert.equal(animated.candidates[0]?.kind,'gif');
  assert.equal(animated.candidates[0]?.source,'override-primary');
  const reduced=resolvePresentation(catalog,patch,'job/lumber/shift/spring/default',{animationsEnabled:false});
  assert.equal(reduced.candidates[0]?.kind,'image');
  assert.equal(reduced.candidates[0]?.source,'override-static');
});

test('missing slot media falls through to safe family/location candidate or text-only',()=>{
  const patch=emptyPresentation();
  const resolved=resolvePresentation(catalog,patch,'ending/nonexistent',{animationsEnabled:false});
  assert.equal(resolved.requestedId,'ending/nonexistent');
  assert.ok(resolved.diagnostics.length>0);
  assert.equal(resolved.textOnly,resolved.candidates.length===0);
  if(resolved.candidates.length)assert.equal(resolved.candidates.at(-1)?.slotId,'location/town/default');
});

test('fallback cycles and unknown presentation targets are rejected',()=>{
  const a='job/lumber/shift/spring/default',b='location/town/default';
  assert.throws(()=>applyPresentation(catalog,{
    ...emptyPresentation(),
    slots:{[a]:{fallbackId:b},[b]:{fallbackId:a}}
  }),/Цикл presentation fallback/);
  assert.throws(()=>applyPresentation(catalog,{
    ...emptyPresentation(),
    slots:{'job/missing/shift/spring/default':{}}
  }),/Неизвестный presentationId/);
});

test('imported slot overrides validate media kind/source pairing',()=>{
  assert.throws(()=>applyPresentation(catalog,{
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{primary:{kind:'gif',src:png,alt:'Wrong source'}}}
  }),/Primary presentation media должен быть GIF/);
  assert.throws(()=>applyPresentation(catalog,{
    ...emptyPresentation(),
    slots:{'job/lumber/shift/spring/default':{static:{kind:'image',src:gif,alt:'Wrong source'}}}
  }),/Static fallback/);
});
