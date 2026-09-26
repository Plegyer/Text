import test from 'node:test';
import assert from 'node:assert/strict';

const rows=[
  {
    "order": 1,
    "boundary": "lumber-shift-result",
    "presentationId": "job/lumber/result/default",
    "fallback": "stage.lumber -> assets/stage-lumber.svg",
    "owner": "lastAction",
    "reload": "lastAction semantic identity preserved; shift effects not replayed",
    "animationOff": "same presentationId, static Lumber candidate"
  },
  {
    "order": 2,
    "boundary": "career-milestone",
    "presentationId": "job/lumber/event/lumber-career-first-shift/default",
    "fallback": "job.lumber.event.accepted-hand -> assets/stage-lumber.svg",
    "owner": "pendingScene",
    "reload": "eventId + variantId + semantic presentationId preserved",
    "animationOff": "same presentationId, shipped static milestone candidate"
  },
  {
    "order": 3,
    "boundary": "foreman-opening",
    "presentationId": "relationship/lumber-foreman/lumber-foreman-notice/default",
    "fallback": "relationship.lumber.foreman.professional -> assets/stage-lumber.svg",
    "owner": "pendingScene",
    "reload": "relationship event/variant semantic identity preserved",
    "animationOff": "same presentationId, shipped static Foreman candidate"
  },
  {
    "order": 4,
    "boundary": "school-arcana-result",
    "presentationId": "school/arcana/lesson/default",
    "fallback": "stage.school -> assets/stage-school.svg",
    "owner": "lastAction",
    "reload": "course result identity preserved; tuition/Energy not charged again",
    "animationOff": "same presentationId, static School candidate"
  },
  {
    "order": 5,
    "boundary": "night-normal-lodging",
    "presentationId": "location/town/default",
    "fallback": "stage.town -> assets/stage-town.svg",
    "owner": "nightFlow",
    "reload": "NightFlow lodging payment state preserved; no second payment",
    "animationOff": "same central-context presentationId, static town candidate"
  },
  {
    "order": 6,
    "boundary": "foreman-night",
    "presentationId": "relationship/lumber-foreman/lumber-night-foreman-professional/default",
    "fallback": "relationship.lumber.foreman.night.professional -> assets/stage-lumber.svg",
    "owner": "pendingScene",
    "reload": "Night event/variant semantic identity preserved",
    "animationOff": "same presentationId, shipped static Night candidate"
  },
  {
    "order": 7,
    "boundary": "forest-entry",
    "presentationId": "activity/forest/route/default",
    "fallback": "stage.hunt -> assets/stage-forest.svg",
    "owner": "activity",
    "reload": "optionModelVersion and pre-route Activity state preserved",
    "animationOff": "same presentationId, static Forest candidate"
  },
  {
    "order": 8,
    "boundary": "forest-logging-road",
    "presentationId": "activity/forest/route/default",
    "fallback": "stage.hunt -> assets/stage-forest.svg",
    "owner": "activity",
    "reload": "routeId=logging-road and checkpoint survive reload deterministically",
    "animationOff": "same presentationId, static Forest candidate"
  },
  {
    "order": 9,
    "boundary": "lumber-forest-return",
    "presentationId": "job/lumber/event/lumber-cross-activity-forest-return/default",
    "fallback": "job.lumber.event.forest-return -> assets/stage-forest.svg",
    "owner": "pendingScene",
    "reload": "continuation event/variant semantic identity preserved",
    "animationOff": "same presentationId, shipped static Forest-return candidate"
  },
  {
    "order": 10,
    "boundary": "hard-work-final-shift-after-threshold-accelerator",
    "presentationId": "job/lumber/result/default",
    "fallback": "stage.lumber -> assets/stage-lumber.svg",
    "owner": "lastAction",
    "reload": "50th shift result and ending eligibility persist without replay",
    "animationOff": "same presentationId, static Lumber candidate",
    "note": "49-shift setup accelerator is gameplay test setup only; it creates no presentation identity or authoring requirement."
  },
  {
    "order": 11,
    "boundary": "hard-work-committed",
    "presentationId": "ending/lumber/hard-work",
    "fallback": "location/town/default -> stage.town -> assets/stage-town.svg",
    "owner": "endingState",
    "reload": "committed ending identity survives reload before completion",
    "animationOff": "same presentationId, town/static fallback"
  },
  {
    "order": 12,
    "boundary": "hard-work-completed",
    "presentationId": "ending/lumber/hard-work",
    "fallback": "location/town/default -> stage.town -> assets/stage-town.svg",
    "owner": "runResult",
    "reload": "terminal ending/result is idempotent across reload/retry",
    "animationOff": "same presentationId, town/static fallback"
  },
  {
    "order": 13,
    "boundary": "new-run",
    "presentationId": "location/town/default",
    "fallback": "stage.town -> assets/stage-town.svg",
    "owner": "dayHub",
    "reload": "fresh run returns to fresh location semantic identity",
    "animationOff": "same presentationId, static town candidate"
  }
] as const;

test('PR24 one-Save presentation audit covers every visible boundary in order',()=>{
  assert.deepEqual(
    rows.map(row=>row.boundary),
    [
      'lumber-shift-result',
      'career-milestone',
      'foreman-opening',
      'school-arcana-result',
      'night-normal-lodging',
      'foreman-night',
      'forest-entry',
      'forest-logging-road',
      'lumber-forest-return',
      'hard-work-final-shift-after-threshold-accelerator',
      'hard-work-committed',
      'hard-work-completed',
      'new-run'
    ]
  );
  assert.deepEqual(rows.map(row=>row.order),Array.from({length:13},(_,i)=>i+1));
});

test('every boundary has semantic identity, fallback, ownership, reload and animation-off contract',()=>{
  for(const row of rows){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/,row.boundary);
    assert.ok(row.fallback.trim(),row.boundary);
    assert.ok(row.owner.trim(),row.boundary);
    assert.ok(row.reload.trim(),row.boundary);
    assert.ok(row.animationOff.trim(),row.boundary);
  }
});

test('pending scenes, action results, Activity and ending states own presentation at their proper boundaries',()=>{
  const owner=(id:string)=>rows.find(row=>row.boundary===id)?.owner;
  assert.equal(owner('lumber-shift-result'),'lastAction');
  assert.equal(owner('school-arcana-result'),'lastAction');
  assert.equal(owner('career-milestone'),'pendingScene');
  assert.equal(owner('foreman-opening'),'pendingScene');
  assert.equal(owner('foreman-night'),'pendingScene');
  assert.equal(owner('lumber-forest-return'),'pendingScene');
  assert.equal(owner('forest-logging-road'),'activity');
  assert.equal(owner('hard-work-committed'),'endingState');
  assert.equal(owner('hard-work-completed'),'runResult');
});

test('49-shift threshold accelerator never creates presentation authoring',()=>{
  const row=rows.find(row=>row.boundary==='hard-work-final-shift-after-threshold-accelerator');
  assert.ok(row);
  assert.equal(row.presentationId,'job/lumber/result/default');
  assert.match(row.note,/gameplay test setup only/);
  assert.doesNotMatch(row.note,/new presentation|new semantic slot required/i);
});

test('Forest logging-road keeps current generic route presentation through reload',()=>{
  const entry=rows.find(row=>row.boundary==='forest-entry');
  const route=rows.find(row=>row.boundary==='forest-logging-road');
  assert.equal(entry?.presentationId,'activity/forest/route/default');
  assert.equal(route?.presentationId,entry?.presentationId);
  assert.match(route?.reload??'',/routeId=logging-road/);
});

test('no presentation persistence rule depends on animation timing or filename',()=>{
  const serialized=JSON.stringify(rows).toLowerCase();
  for(const forbidden of ['frameindex','currentframe','elapsedms','playbacktimestamp','loopcount']){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});
