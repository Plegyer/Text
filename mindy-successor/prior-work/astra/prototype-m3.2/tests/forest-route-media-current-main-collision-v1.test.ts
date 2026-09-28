import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const rootPresentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const activation=JSON.parse(
  readFileSync('content/presentation-drafts/old-boundary-v3-current-main-activation-v1.json','utf8')
);
const accessibility=JSON.parse(
  readFileSync('content/old-boundary-v3-accessibility-v1.fixture.json','utf8')
);
const expected=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-gif-dry-run-expected-v1.json','utf8')
);
const sources=JSON.parse(
  readFileSync('content/presentation-drafts/forest-route-animation-source-manifest-v1.json','utf8')
);

const oldBoundaryId='activity/forest/route/old-boundary';
const loggingId='activity/forest/route/logging-road';
const defaultId='activity/forest/route/default';

const forbiddenKeys=new Set([
  'conditions','effects','effect','rewards','reward','cost','energy','energyCost',
  'eligibility','mechanics','rng','gameplayRng','save','saveState','outcome',
  'progress','endurance','relationshipDelta','statDelta'
]);

function forbiddenFields(value:unknown,path:string[]=[]):string[]{
  if(Array.isArray(value)){
    return value.flatMap((entry,index)=>forbiddenFields(entry,[...path,String(index)]));
  }
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbiddenKeys.has(key))hits.push([...path,key].join('.'));
    hits.push(...forbiddenFields(entry,[...path,key]));
  }
  return hits;
}

test('post-PR59 old-boundary activation candidate has no current root ID collision',()=>{
  assert.ok(rootPresentation.slots?.[defaultId],defaultId);
  assert.ok(rootPresentation.slots?.[loggingId],loggingId);
  assert.equal(rootPresentation.slots?.[oldBoundaryId],undefined,oldBoundaryId);

  assert.equal(activation.slot.presentationId,oldBoundaryId);
  assert.equal(activation.slot.fallbackId,defaultId);
});

test('post-PR59 route media candidates contain no gameplay fields',()=>{
  assert.deepEqual(forbiddenFields(activation),[]);
  assert.deepEqual(forbiddenFields(accessibility),[]);
  assert.deepEqual(forbiddenFields(expected),[]);
  assert.deepEqual(forbiddenFields(sources),[]);
});

test('all candidate/source asset inputs are repository-local and exist',()=>{
  const localSvgPaths=[
    activation.slot.static.src,
    ...expected.outputs.flatMap((entry:any)=>[
      entry.staticFallback,
      ...entry.sourceFrames
    ])
  ];

  for(const path of localSvgPaths){
    assert.match(path,/^assets\/[a-z0-9_./-]+\.svg$/i,path);
    assert.doesNotMatch(path,/https?:|^\/|\.\./i,path);
    assert.equal(existsSync(path),true,path);
  }

  assert.doesNotMatch(JSON.stringify({activation,accessibility,sources}),/https?:\/\//i);
});

test('dry-run expected manifest does not claim fake GIF files',()=>{
  assert.equal(expected.status,'EXPECTED_ONLY_NO_FILES');
  assert.equal(expected.outputs.length,6);
  assert.equal(expected.summary.expectedFilesPresent,0);
  assert.equal(Object.prototype.hasOwnProperty.call(expected,'gifPath'),false);

  for(const entry of expected.outputs){
    assert.equal(entry.exists,false,entry.candidateKey);
    assert.equal(Object.prototype.hasOwnProperty.call(entry,'gifPath'),false,entry.candidateKey);
    assert.match(entry.expectedGifPath,/^assets\/gif\/[a-z0-9_./-]+\.gif$/i,entry.candidateKey);
    assert.doesNotMatch(entry.expectedGifPath,/https?:|^\/|\.\./i,entry.candidateKey);
    assert.equal(existsSync(entry.expectedGifPath),false,entry.expectedGifPath);
  }
});

test('old-boundary activation accessibility remains locale-neutral media metadata',()=>{
  assert.equal(accessibility.binding.presentationId,oldBoundaryId);
  assert.equal(activation.slot.static.altKey,accessibility.binding.altKey);
  assert.equal(activation.slot.captionKey,accessibility.binding.captionKey);
  assert.doesNotMatch(JSON.stringify(accessibility),/"(?:src|media|asset|fallbackId)"\s*:/i);
});
