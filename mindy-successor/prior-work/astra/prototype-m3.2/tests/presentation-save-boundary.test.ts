import test from 'node:test';
import assert from 'node:assert/strict';
import {saveSchema} from '../src/core/schema.ts';
import {parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const semanticPresentationId='job/lumber/event/lumber-career-first-shift/default';
const schemaCompatiblePresentationId='job.lumber.event.lumber-career-first-shift.default';

function pendingSnapshot(presentationId:string){
  const save=started();
  const event=catalog.events[0];
  assert.ok(event,'fixture catalog must contain at least one event');
  const variant=event.variants[0];
  const choice=event.choices[0];
  assert.ok(variant&&choice,'fixture event must contain a variant and choice');

  save.run.flow.pendingScene={
    eventId:event.id,
    variantId:variant.id,
    presentationId,
    allowedChoiceIds:[choice.id]
  };
  return {
    save,
    eventId:event.id,
    variantId:variant.id
  };
}

test('canonical slash semantic presentationId is rejected at the persisted save schema boundary',()=>{
  const {save}=pendingSnapshot(semanticPresentationId);
  const raw=JSON.parse(JSON.stringify(save));
  const parsed=saveSchema.safeParse(raw);

  assert.equal(parsed.success,false);
  if(parsed.success)return;
  assert.ok(
    parsed.error.issues.some(issue=>
      issue.path.join('.')==='run.flow.pendingScene.presentationId'
    ),
    parsed.error.toString()
  );
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),catalog),
    /Invalid string|invalid_format|presentationId|regular expression/i
  );
});

test('schema-compatible presentation identity reload preserves eventId and variantId exactly',()=>{
  const {save,eventId,variantId}=pendingSnapshot(schemaCompatiblePresentationId);
  const reloaded=parseSave(JSON.stringify(save),catalog);

  assert.equal(reloaded.run.flow.pendingScene?.presentationId,schemaCompatiblePresentationId);
  assert.equal(reloaded.run.flow.pendingScene?.eventId,eventId);
  assert.equal(reloaded.run.flow.pendingScene?.variantId,variantId);
});

test('pending scene persistence contains no GIF source, timing or frame state',()=>{
  const {save}=pendingSnapshot(schemaCompatiblePresentationId);
  const raw=JSON.parse(JSON.stringify(save));
  const pending=raw.run.flow.pendingScene as Record<string,unknown>;

  assert.deepEqual(
    Object.keys(pending).sort(),
    ['allowedChoiceIds','eventId','presentationId','variantId'].sort()
  );

  for(const forbidden of [
    'src','gif','asset','filename','frame','currentFrame','frameIndex',
    'playbackTimestamp','loopCount','duration','elapsed','elapsedMs'
  ]){
    assert.equal(Object.prototype.hasOwnProperty.call(pending,forbidden),false,forbidden);
  }
});

test('presentation identity is independent from persisted mechanical event/variant identity',()=>{
  const first=pendingSnapshot(schemaCompatiblePresentationId);
  const second=pendingSnapshot('presentation.audit.alternate');

  assert.equal(first.save.run.flow.pendingScene?.eventId,second.save.run.flow.pendingScene?.eventId);
  assert.equal(first.save.run.flow.pendingScene?.variantId,second.save.run.flow.pendingScene?.variantId);
  assert.notEqual(first.save.run.flow.pendingScene?.presentationId,second.save.run.flow.pendingScene?.presentationId);
});
