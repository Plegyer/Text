import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';

const rows=[
  {
    "order": 1,
    "boundary": "lumber-result",
    "presentationId": "job/lumber/result/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-lumber.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 2,
    "boundary": "career-milestone",
    "presentationId": "job/lumber/event/lumber-career-first-shift/default",
    "classification": "FUTURE_GIF_TARGET",
    "currentAsset": "assets/stage-lumber.svg",
    "futureGifTarget": "media/lumber/accepted-hand.gif",
    "textSafeTerminal": true
  },
  {
    "order": 3,
    "boundary": "foreman-opening",
    "presentationId": "relationship/lumber-foreman/lumber-foreman-notice/default",
    "classification": "FUTURE_GIF_TARGET",
    "currentAsset": "assets/stage-lumber.svg",
    "futureGifTarget": "media/lumber/foreman-professional.gif",
    "textSafeTerminal": true
  },
  {
    "order": 4,
    "boundary": "school-result",
    "presentationId": "school/arcana/lesson/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-school.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 5,
    "boundary": "school-blocking-scene",
    "presentationId": "location/town/event/base-school/lesson",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/workshop.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 6,
    "boundary": "night-normal-lodging",
    "presentationId": "location/town/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-town.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 7,
    "boundary": "foreman-night",
    "presentationId": "relationship/lumber-foreman/lumber-night-foreman-professional/default",
    "classification": "FUTURE_GIF_TARGET",
    "currentAsset": "assets/stage-lumber.svg",
    "futureGifTarget": "media/lumber/foreman-night-professional.gif",
    "textSafeTerminal": true
  },
  {
    "order": 8,
    "boundary": "forest-entry",
    "presentationId": "activity/forest/route/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-forest.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 9,
    "boundary": "forest-logging-road",
    "presentationId": "activity/forest/route/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-forest.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 10,
    "boundary": "lumber-return",
    "presentationId": "job/lumber/event/lumber-cross-activity-forest-return/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-forest.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 11,
    "boundary": "hard-work-final-shift",
    "presentationId": "job/lumber/result/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-lumber.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 12,
    "boundary": "hard-work-committed",
    "presentationId": "ending/lumber/hard-work",
    "classification": "STATIC_FALLBACK",
    "currentAsset": "assets/stage-town.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 13,
    "boundary": "hard-work-completed",
    "presentationId": "ending/lumber/hard-work",
    "classification": "STATIC_FALLBACK",
    "currentAsset": "assets/stage-town.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  },
  {
    "order": 14,
    "boundary": "new-run",
    "presentationId": "location/town/default",
    "classification": "DIRECT_SHIPPED_MEDIA",
    "currentAsset": "assets/stage-town.svg",
    "futureGifTarget": null,
    "textSafeTerminal": true
  }
] as const;

test('live-path fallback audit covers exactly the 14 merged one-Save boundaries',()=>{
  assert.equal(rows.length,14);
  assert.deepEqual(rows.map(row=>row.order),Array.from({length:14},(_,i)=>i+1));
});

test('classification counts match the exact merged path',()=>{
  const count=(kind:string)=>rows.filter(row=>row.classification===kind).length;
  assert.equal(count('DIRECT_SHIPPED_MEDIA'),9);
  assert.equal(count('STATIC_FALLBACK'),2);
  assert.equal(count('FUTURE_GIF_TARGET'),3);
  assert.equal(count('TEXT_SAFE_FALLBACK'),0);
});

test('every current asset used by the merged live path exists',()=>{
  for(const row of rows){
    assert.equal(existsSync(row.currentAsset),true,`${row.boundary}: ${row.currentAsset}`);
    assert.equal(row.textSafeTerminal,true,row.boundary);
  }
});

test('final School blocking scene uses direct shipped workshop media',()=>{
  const row=rows.find(row=>row.boundary==='school-blocking-scene');
  assert.ok(row);
  assert.equal(row.presentationId,'location/town/event/base-school/lesson');
  assert.equal(row.classification,'DIRECT_SHIPPED_MEDIA');
  assert.equal(row.currentAsset,'assets/workshop.svg');
});

test('future GIF rows are optional because current static assets remain present',()=>{
  const future=rows.filter(row=>row.classification==='FUTURE_GIF_TARGET');
  assert.equal(future.length,3);
  for(const row of future){
    assert.match(row.futureGifTarget??'',/^media\/.*\.gif$/);
    assert.equal(existsSync(row.currentAsset),true,row.currentAsset);
  }
});

test('ending boundaries are static fallback, not missing media blockers',()=>{
  for(const id of ['hard-work-committed','hard-work-completed']){
    const row=rows.find(x=>x.boundary===id);
    assert.equal(row?.classification,'STATIC_FALLBACK');
    assert.equal(row?.currentAsset,'assets/stage-town.svg');
  }
});
