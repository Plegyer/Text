import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {
  applyPresentation,
  emptyPresentation,
  presentationIdForAction,
  presentationIdForEnding,
  presentationIdForEvent,
  resolvePresentation
} from '../src/core/presentation.ts';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const sourceDefinitions=json('content/definitions.json');
const activationPresent=sourceDefinitions.actions.some((action:any)=>action.id==='lumber.shift');

test('shipped dist activation contract', {skip:!activationPresent}, ()=>{
  assert.ok(
    existsSync('dist/content.json'),
    'dist/content.json is required; run npm run build before this smoke contract'
  );

  const dist=json('dist/content.json');
  assert.deepEqual(dist.definitions,sourceDefinitions);
  assert.deepEqual(dist.presentation,json('content/presentation.json'));

  const packIds=dist.packs.map((pack:any)=>pack.id).sort();
  assert.deepEqual(packIds,[
    'base',
    'ds-lumber',
    'gopher',
    'lumber',
    'lumber-cross',
    'lumber-night',
    'stage'
  ]);
  assert.equal(new Set(packIds).size,packIds.length);
  assert.equal(packIds.includes('school-production'),false);

  const actions=dist.definitions.actions.map((action:any)=>action.id);
  assert.ok(actions.includes('lumber.shift'));
  assert.equal(actions.includes('school.lumber-management'),false);

  assert.ok((dist.definitions.careers??[]).some((item:any)=>item.id==='lumber'));
  assert.ok((dist.definitions.relationships??[]).some((item:any)=>item.id==='lumber.foreman'));
  assert.ok((dist.definitions.activities??[]).some((item:any)=>item.id==='lumber.forest'));

  const endings=dist.definitions.endings;
  for(const id of [
    'ending.lumber.hard-work',
    'ending.lumber.forewoman',
    'ending.lumber.forest'
  ])assert.ok(endings.some((ending:any)=>ending.id===id),id);

  const hardWork=endings.find((ending:any)=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);
  assert.deepEqual(hardWork.metaRewards,[{
    kind:'hardWork',
    rewardId:'hardWork:lumber',
    career:'lumber'
  }]);

  const lodgingIds=(dist.definitions.lodgings??[]).map((item:any)=>item.id);
  assert.deepEqual(lodgingIds,[
    'lodging.normal',
    'lodging.cheap',
    'lodging.street'
  ]);

  const nightChoiceIds=(dist.definitions.nightChoices??[]).map((item:any)=>item.id);
  assert.ok(nightChoiceIds.includes('night.sleep'));
  assert.ok(nightChoiceIds.includes('lumber.foreman.night'));
  assert.equal(
    nightChoiceIds.filter((id:string)=>id.startsWith('school.night_study.')).length,
    24
  );

  const productionMedia=dist.packs.flatMap((pack:any)=>pack.media??[]);
  for(const media of productionMedia){
    assert.match(media.src,/^assets\//,media.id);
    assert.ok(existsSync('dist/'+media.src),`missing built media for ${media.id}: ${media.src}`);
  }

  const catalog=loadCatalog(dist.definitions,dist.packs);
  const presented=applyPresentation(catalog,dist.presentation??emptyPresentation());

  assert.equal(
    presentationIdForAction(catalog,'lumber.shift',['job.lumber.shift.spring.default']),
    'job/lumber/shift/spring/default'
  );
  assert.equal(
    presentationIdForEvent(catalog,'lumber.career-first-shift','default'),
    'job/lumber/event/lumber-career-first-shift/default'
  );
  assert.equal(
    presentationIdForEvent(catalog,'lumber.foreman-notice','default'),
    'relationship/lumber-foreman/lumber-foreman-notice/default'
  );
  assert.equal(
    presentationIdForEvent(catalog,'lumber-night.foreman-professional','default'),
    'relationship/lumber-foreman/lumber-night-foreman-professional/default'
  );
  assert.equal(
    presentationIdForEvent(catalog,'lumber-cross.activity-forest-return','default'),
    'job/lumber/event/lumber-cross-activity-forest-return/default'
  );
  assert.equal(
    presentationIdForEnding('ending.lumber.hard-work'),
    'ending/lumber/hard-work'
  );

  for(const semanticId of [
    'job/lumber/shift/spring/default',
    'job/lumber/event/lumber-career-first-shift/default',
    'relationship/lumber-foreman/lumber-foreman-notice/default',
    'relationship/lumber-foreman/lumber-night-foreman-professional/default',
    'job/lumber/event/lumber-cross-activity-forest-return/default',
    'ending/lumber/hard-work'
  ]){
    const resolved=resolvePresentation(presented,dist.presentation??emptyPresentation(),semanticId);
    assert.equal(resolved.requestedId,semanticId);
  }
});
