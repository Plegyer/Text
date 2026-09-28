import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const src='assets/presentation/forest-route-old-boundary-safe-v1.svg';
const presentationId='activity/forest/route/old-boundary';

test('safe old-boundary static source is a local project-owned SVG with exact dimensions and semantic metadata',()=>{
  assert.equal(existsSync(src),true,src);
  const svg=readFileSync(src,'utf8');

  assert.match(svg,/^<svg\b[^>]*>/);
  assert.match(svg,/<\/svg>\s*$/);
  assert.match(svg,/viewBox="0 0 1200 675"/);
  assert.ok(svg.includes('data-presentation-id="'+presentationId+'"'));
  assert.ok(svg.includes('data-source-kind="project-owned"'));
});

test('safe old-boundary static source contains no scripts or external resources',()=>{
  const svg=readFileSync(src,'utf8');
  assert.doesNotMatch(svg,/<script\b/i);
  assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i);
});

test('safe old-boundary source text/metadata excludes forbidden route-result semantics',()=>{
  const svg=readFileSync(src,'utf8');
  assert.doesNotMatch(svg,/\b(?:hunter|token|key|gate|gateway|arch|barrier|challenge|reward|success|failure|result|magic)\b/i);
  assert.doesNotMatch(svg,/(?:охотник|токен|жетон|ключ|ворот|арка|барьер|испытани|награ|успех|провал|результат|маг)/i);
});

test('safe old-boundary source carries no gameplay fields',()=>{
  const svg=readFileSync(src,'utf8').toLowerCase();
  for(const attr of [
    'data-reward','data-effect','data-effects','data-energy','data-eligibility',
    'data-rng','data-save','data-save-state','data-cost','data-gameplay-duration',
    'data-outcome','data-progress','data-endurance'
  ]){
    assert.equal(svg.includes(attr+'='),false,attr);
  }
});
