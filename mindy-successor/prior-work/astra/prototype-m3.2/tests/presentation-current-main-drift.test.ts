import test from 'node:test';
import assert from 'node:assert/strict';

const currentMain='7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798';
const pr21='e6c32903516d1ba40b9a3ffbf955d5f04783ac25';

const mainPostPr21ChangedPaths=[
  'mindy-successor/docs/CURRENT_PROJECT_HANDOFF_v1.md',
  'mindy-successor/docs/DOCUMENT_AUTHORITY_AND_INDEX_v0.md',
  'mindy-successor/docs/PARALLEL_WORK_BOARD_v1.md',
  'mindy-successor/docs/PROJECT_STATE.md'
];

const classification={
  alreadyShipped:[
    'semantic-slash-save-reload',
    'pending-scene-semantic-id',
    'school-presentation-slots',
    'activity-presentation-slots'
  ],
  usefulBranchOnlyQa:[
    'semantic-id-drift',
    'pa-checkpoints',
    'fallback-exhaustion',
    'fallback-asset-integrity',
    'central-stage-interaction',
    'post-pr21-smoke'
  ],
  staleSuperseded:[
    'presentation-production-patch-plan.fixture.json',
    'presentation-shipped-closure-inventory.fixture.json',
    'presentation-production-smoke.fixture.json',
    'presentation-pa-scenario.fixture.json',
    'presentation-asset-consistency.fixture.json'
  ],
  blockedByGameplayAuthoring:[
    'old-boundary-token-acquisition-use',
    'school-management-accounting-public-result',
    'forest-route-challenge-season-depth',
    'item-driven-activity-action-space'
  ]
};

test('audit is explicitly anchored to current main and PR21',()=>{
  assert.notEqual(currentMain,pr21);
  assert.match(currentMain,/^[0-9a-f]{40}$/);
  assert.match(pr21,/^[0-9a-f]{40}$/);
});

test('post-PR21 main movement is coordination documentation only',()=>{
  assert.equal(mainPostPr21ChangedPaths.length,4);
  for(const path of mainPostPr21ChangedPaths){
    assert.equal(path.startsWith('mindy-successor/docs/'),true,path);
    assert.equal(path.includes('/src/'),false,path);
    assert.equal(path.includes('/content/packs/'),false,path);
    assert.equal(path.includes('/assets/'),false,path);
  }
});

test('historical fixture differences are classified as stale/superseded, not automatic defects',()=>{
  assert.ok(classification.staleSuperseded.includes('presentation-production-patch-plan.fixture.json'));
  assert.ok(classification.staleSuperseded.includes('presentation-asset-consistency.fixture.json'));
  assert.equal(classification.alreadyShipped.includes('semantic-slash-save-reload'),true);
});

test('remaining PA gaps stay classified as gameplay authoring blockers',()=>{
  assert.equal(classification.blockedByGameplayAuthoring.length,4);
  assert.deepEqual(
    new Set(classification.blockedByGameplayAuthoring),
    new Set([
      'old-boundary-token-acquisition-use',
      'school-management-accounting-public-result',
      'forest-route-challenge-season-depth',
      'item-driven-activity-action-space'
    ])
  );
});
