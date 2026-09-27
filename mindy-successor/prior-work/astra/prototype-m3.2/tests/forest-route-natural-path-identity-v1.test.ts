import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const replacement=JSON.parse(
  readFileSync('content/forest-route-presentation-replacement-v1.fixture.json','utf8')
);
const loggingLoc=JSON.parse(
  readFileSync('content/forest-logging-road-localization-v2.fixture.json','utf8')
);
const boundaryLoc=JSON.parse(
  readFileSync('content/forest-old-boundary-localization-v2.fixture.json','utf8')
);
const forestPack=JSON.parse(
  readFileSync('content/packs/forest-result-content-bilingual-v2.json','utf8')
);

const cases=[
  {
    routeOptionId:'forest.route.logging-road',
    routeState:'logging-road',
    needsToken:false,
    loc:loggingLoc
  },
  {
    routeOptionId:'forest.route.old-boundary',
    routeState:'old-boundary',
    needsToken:true,
    loc:boundaryLoc
  }
] as const;

function enterAndSelect(c:(typeof cases)[number]){
  let s=started();
  if(c.needsToken)s.run.resources.inventory.old_boundary_token=1;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.flow.activity?.activityId,'lumber.forest');
  s=dispatch(s,{type:'activityAction',id:c.routeOptionId},catalog);
  return s;
}

function lookupPresentation(c:(typeof cases)[number]){
  const route=replacement.routes.find(
    (entry:any)=>entry.routeId===c.routeOptionId
  );
  assert.ok(route,c.routeOptionId);
  assert.equal(route.routeState,c.routeState);
  assert.equal(
    route.semanticPresentationId,
    'activity/forest/route/'+c.routeState
  );

  const firstKey=route.safeProseCandidates[0];
  const pair=c.loc.additiveStrings[firstKey];
  assert.ok(pair,firstKey);
  assert.ok(pair.ru?.trim(),firstKey+' ru');
  assert.ok(pair.en?.trim(),firstKey+' en');

  return {
    presentationId:route.semanticPresentationId,
    key:firstKey,
    ru:pair.ru,
    en:pair.en,
    fallback:route.staticFallback.src
  };
}

test('current Forest route selection preserves exact activity and route identities through presentation lookup',()=>{
  for(const c of cases){
    let s=enterAndSelect(c);

    assert.equal(s.run.flow.activity?.activityId,'lumber.forest');
    assert.equal(s.run.flow.activity?.internalState.routeId,c.routeState);
    assert.deepEqual(
      s.run.flow.activity?.internalState.resolvedOptionIds,
      [c.routeOptionId]
    );

    const beforeSave=JSON.stringify(s);
    const beforeGlobalRng=s.run.rng;
    const beforeActivityRng=s.run.flow.activity?.rngState;

    const presentation=lookupPresentation(c);
    assert.match(
      presentation.presentationId,
      /^activity\/forest\/route\//
    );
    assert.equal(presentation.fallback,'assets/stage-forest.svg');

    assert.equal(JSON.stringify(s),beforeSave);
    assert.equal(s.run.rng,beforeGlobalRng);
    assert.equal(s.run.flow.activity?.rngState,beforeActivityRng);

    s=parseSave(JSON.stringify(s),catalog);
    assert.equal(s.run.flow.activity?.activityId,'lumber.forest');
    assert.equal(s.run.flow.activity?.internalState.routeId,c.routeState);
    assert.deepEqual(
      s.run.flow.activity?.internalState.resolvedOptionIds,
      [c.routeOptionId]
    );
  }
});

test('both shipped routes preserve the same exact Forest success result identity',()=>{
  for(const c of cases){
    let s=enterAndSelect(c);

    lookupPresentation(c);

    s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
    assert.equal(s.run.flow.activity?.internalState.progress,1);
    assert.equal(s.run.flow.activity?.internalState.routeId,c.routeState);

    s=parseSave(JSON.stringify(s),catalog);
    s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

    assert.equal(s.run.flow.activity,null);
    assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
    assert.equal(
      s.run.progression.worldFacts.includes('lumber.forest.escaped'),
      false
    );
    assert.equal(
      s.run.progression.worldFacts.includes('lumber.forest.failed'),
      false
    );
  }

  const activity=catalog.definitions.activities.find(
    entry=>entry.id==='lumber.forest'
  );
  assert.ok(activity);
  assert.deepEqual(
    activity.results.map(entry=>[entry.outcome,entry.id]),
    [
      ['success','lumber.forest.success'],
      ['escape','lumber.forest.escape'],
      ['failure','lumber.forest.failure']
    ]
  );
});

test('exact activityResult continuation remains locale-neutral and unchanged',()=>{
  const success=forestPack.events.find(
    (entry:any)=>entry.id==='forest-result-content-v1.success'
  );
  assert.ok(success);
  assert.deepEqual(success.reactionTriggers,[{
    kind:'activityResult',
    activity:'lumber.forest',
    outcome:'success',
    result:'lumber.forest.success'
  }]);

  for(const c of cases){
    assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(c.routeOptionId),false);
    assert.equal(/(^|[._/-])(ru|en)([._/-]|$)/i.test(c.routeState),false);
  }
});
