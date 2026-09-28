import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const candidate=JSON.parse(
  readFileSync('content/presentation-drafts/old-boundary-v3-current-main-activation-v1.json','utf8')
);
const accessibility=JSON.parse(
  readFileSync('content/old-boundary-v3-accessibility-v1.fixture.json','utf8')
);
const rootPresentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const rootLocalization=JSON.parse(readFileSync('content/localization.json','utf8'));
const buildSource=readFileSync('scripts/build.mjs','utf8');

const id='activity/forest/route/old-boundary';
const defaultId='activity/forest/route/default';

test('post-PR59 root has neutral default but no old-boundary root slot collision',()=>{
  assert.ok(rootPresentation.slots?.[defaultId],defaultId);
  assert.equal(rootPresentation.slots?.[id],undefined,id);
  assert.equal(candidate.slot.presentationId,id);
  assert.equal(candidate.slot.fallbackId,defaultId);
});

test('old-boundary v3 activation candidate uses local project-owned SVG and existing recursive build-copy path',()=>{
  const src=candidate.slot.static.src;
  assert.equal(src,'assets/presentation/forest-route-old-boundary-v3.svg');
  assert.equal(existsSync(src),true,src);

  const svg=readFileSync(src,'utf8');
  assert.match(svg,/^<svg\b[^>]*>/);
  assert.match(svg,/<\/svg>\s*$/);
  assert.match(svg,/viewBox="0 0 1200 675"/);
  assert.doesNotMatch(svg,/<script\b/i);
  assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i);

  assert.match(
    buildSource,
    /cp\(['"]assets['"],\s*['"]dist\/assets['"],\s*\{\s*recursive:\s*true\s*\}\)/
  );

  const dist='dist/'+src;
  if(existsSync(dist)){
    assert.deepEqual(readFileSync(dist),readFileSync(src),dist);
  }
});

test('old-boundary v3 media identity is locale-neutral and accessibility keys match current root',()=>{
  const binding=accessibility.binding;
  assert.equal(binding.presentationId,id);
  assert.equal(candidate.slot.static.altKey,binding.altKey);
  assert.equal(candidate.slot.captionKey,binding.captionKey);

  for(const key of [binding.altKey,binding.captionKey]){
    const fixture=accessibility.strings[key];
    const current=rootLocalization.strings?.[key];
    assert.deepEqual(current,fixture,key);
    assert.equal(typeof fixture.ru,'string',key+'.ru');
    assert.equal(typeof fixture.en,'string',key+'.en');
  }

  assert.doesNotMatch(JSON.stringify(accessibility),/"(?:src|media|asset|fallbackId)"\s*:/i);
});

test('old-boundary v3 candidate retains neutral fallback and excludes forbidden semantics/gameplay fields',()=>{
  const svg=readFileSync(candidate.slot.static.src,'utf8');
  const text=[
    svg,
    candidate.slot.static.alt,
    ...Object.values(accessibility.strings).flatMap((pair:any)=>[pair.ru,pair.en])
  ].join('\n');

  assert.equal(candidate.slot.fallbackId,defaultId);
  assert.doesNotMatch(text,/\b(?:hunter|token|key|gate|gateway|arch|barrier|challenge|reward|success|failure|result|magic)\b/i);
  assert.doesNotMatch(text,/(?:охотник|токен|жетон|ключ|ворот|арка|барьер|испытани|награ|успех|провал|результат|маг)/i);

  const serialized=JSON.stringify(candidate);
  assert.doesNotMatch(serialized,/"(?:conditions|effects|rewards|reward|energy|eligibility|rng|save|outcome|progress|endurance)"\s*:/i);
});
