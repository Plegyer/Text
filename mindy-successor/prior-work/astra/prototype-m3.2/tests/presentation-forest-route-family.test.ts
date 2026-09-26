import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-forest-route-family.fixture.json','utf8')
);

test('contract covers three route families, three challenge families, and three result outcomes',()=>{
  const byDimension=(dimension:string)=>fixture.families.filter((row:any)=>row.dimension===dimension);
  assert.equal(byDimension('route').length,3);
  assert.equal(byDimension('challenge').length,3);
  assert.equal(byDimension('result').length,3);

  assert.deepEqual(
    new Set(byDimension('route').map((row:any)=>row.key)),
    new Set(['logging-road','hunter-trail','old-boundary'])
  );
  assert.deepEqual(
    new Set(byDimension('challenge').map((row:any)=>row.key)),
    new Set(['navigation','physical-obstacle','interpretation-ritual-anomaly'])
  );
  assert.deepEqual(
    new Set(byDimension('result').map((row:any)=>row.key)),
    new Set(['success','escape','failure'])
  );
});

test('route/challenge entries define families without inventing final semantic slots',()=>{
  for(const row of fixture.families.filter((x:any)=>x.dimension!=='result')){
    assert.match(
      row.semanticFamily,
      /^activity\/forest\/(?:route|challenge)\/[a-z0-9]+(?:-[a-z0-9]+)*\/\*$/
    );
    assert.equal(row.semanticFamily.endsWith('/*'),true,row.key);
  }
});

test('shipped result slots remain exact and unchanged',()=>{
  const results=fixture.families.filter((row:any)=>row.dimension==='result');
  assert.deepEqual(
    results.map((row:any)=>row.semanticFamily).sort(),
    [
      'activity/forest/return/escape',
      'activity/forest/return/failure',
      'activity/forest/return/success'
    ]
  );
});

test('all future families use the shipped generic Forest route fallback',()=>{
  for(const row of fixture.families){
    assert.equal(row.fallbackId,'activity/forest/route/default',row.key);
  }
  assert.equal(fixture.policy.fallbackId,'activity/forest/route/default');
});

test('contract invents no event IDs, lore, assets, or gameplay conditions',()=>{
  assert.equal(fixture.policy.finalEventIdsInvented,false);
  assert.equal(fixture.policy.finalLoreInvented,false);
  assert.equal(fixture.policy.finalAssetsInvented,false);
  assert.equal(fixture.policy.gameplayConditionsInvented,false);

  const serialized=JSON.stringify(fixture).toLowerCase();
  for(const forbidden of [
    '"eventid"','"lore"','"assetpath"','"conditions"','"effects"',
    '"energy"','"reward"','"threshold"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});

test('authored gameplay state is explicit and does not pretend open families are shipped',()=>{
  const hunter=fixture.families.find((row:any)=>row.key==='hunter-trail');
  const logging=fixture.families.find((row:any)=>row.key==='logging-road');
  const boundary=fixture.families.find((row:any)=>row.key==='old-boundary');
  assert.equal(hunter.authoredGameplayState,'open-authoring');
  assert.equal(logging.authoredGameplayState,'shipped');
  assert.equal(boundary.authoredGameplayState,'shipped-option-capability-gated');
});
