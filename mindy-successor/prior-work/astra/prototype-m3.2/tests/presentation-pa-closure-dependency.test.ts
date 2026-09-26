import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const assets=json('content/presentation-asset-consistency.fixture.json');
const checkpoints=json('content/presentation-pa-checkpoints.fixture.json');

type Classification=
  |'presentation-independent'
  |'presentation-ready-on-gameplay-authoring'
  |'missing-presentation-authoring';

const blockers=[
  {
    id:'old-boundary-token-acquisition-use',
    classification:'presentation-ready-on-gameplay-authoring' as Classification,
    presentationIds:['activity/forest/route/default','activity/forest/return/success']
  },
  {
    id:'school-management-accounting-public-result',
    classification:'presentation-ready-on-gameplay-authoring' as Classification,
    presentationIds:['school/arcana/lesson/default']
  },
  {
    id:'forest-route-challenge-season-depth',
    classification:'presentation-ready-on-gameplay-authoring' as Classification,
    presentationIds:['activity/forest/route/default','activity/forest/return/success']
  },
  {
    id:'item-driven-activity-action-space',
    classification:'presentation-independent' as Classification,
    presentationIds:['activity/forest/route/default']
  }
];

const staticById=new Map(
  assets.currentStaticBindings.map((row:any)=>[row.presentationId,row])
);

test('audit covers exactly the four remaining PR21 PA blockers',()=>{
  assert.deepEqual(
    new Set(blockers.map(blocker=>blocker.id)),
    new Set([
      'old-boundary-token-acquisition-use',
      'school-management-accounting-public-result',
      'forest-route-challenge-season-depth',
      'item-driven-activity-action-space'
    ])
  );
});

test('current blockers require no missing presentation authoring',()=>{
  assert.equal(
    blockers.filter(blocker=>blocker.classification==='missing-presentation-authoring').length,
    0
  );
  assert.equal(
    blockers.filter(blocker=>blocker.classification==='presentation-independent').length,
    1
  );
  assert.equal(
    blockers.filter(blocker=>blocker.classification==='presentation-ready-on-gameplay-authoring').length,
    3
  );
});

test('presentation-ready blockers already have safe shipped static presentation coverage',()=>{
  for(const blocker of blockers.filter(
    blocker=>blocker.classification==='presentation-ready-on-gameplay-authoring'
  )){
    for(const presentationId of blocker.presentationIds){
      const binding=staticById.get(presentationId);
      assert.ok(binding,`${blocker.id}: ${presentationId}`);
      assert.equal(binding.availability,'current',presentationId);
      assert.equal(existsSync(binding.assetPath),true,binding.assetPath);
    }
  }
});

test('PA checkpoint evidence already includes School and Forest semantic presentation state',()=>{
  const ids=new Set(checkpoints.checkpoints.map((row:any)=>row.presentationId));
  assert.ok(ids.has('school/arcana/lesson/default'));
  assert.ok(ids.has('activity/forest/route/default'));
  assert.ok(ids.has('activity/forest/return/success'));
});

test('dependency audit does not invent gameplay thresholds, acquisition sources, or mechanics',()=>{
  const serialized=JSON.stringify(blockers).toLowerCase();
  for(const forbidden of [
    'threshold','price','tuition','countervalue','acquisitionsource',
    'condition','effect','energydelta','moneydelta','rng'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});
