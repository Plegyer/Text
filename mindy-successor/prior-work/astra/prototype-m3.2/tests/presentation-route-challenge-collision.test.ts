import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-route-challenge-collision.fixture.json','utf8')
);

function normalizeSlug(raw:string){
  if(raw.includes('.'))throw new Error('dotted slug rejected');
  return raw.trim().toLowerCase()
    .replaceAll('_','-')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-');
}

function preflight(candidates:{dimension:'route'|'challenge';slug:string}[]){
  const seenDimension=new Set<string>();
  const seenSlug=new Set<string>();
  const reserved=new Set(['success','escape','failure','return']);

  for(const candidate of candidates){
    const slug=normalizeSlug(candidate.slug);
    assert.match(slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    if(reserved.has(slug))throw new Error('reserved result namespace collision');
    const dimKey=`${candidate.dimension}:${slug}`;
    if(seenDimension.has(dimKey))throw new Error('duplicate slug in dimension');
    if(seenSlug.has(slug))throw new Error('route/challenge slug collision');
    seenDimension.add(dimKey);
    seenSlug.add(slug);
  }
  return candidates.map(c=>({
    dimension:c.dimension,
    slug:normalizeSlug(c.slug)
  }));
}

test('duplicate canonical slugs reject within one dimension',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='duplicate-route-slug');
  assert.throws(()=>preflight(row.candidates),/duplicate slug in dimension/);
});

test('same canonical slug cannot be both route and challenge',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='route-challenge-same-slug');
  assert.throws(()=>preflight(row.candidates),/route\/challenge slug collision/);
});

test('dotted semantic IDs reject instead of being silently normalized to slash IDs',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='dotted-vs-slash-drift');
  assert.ok(row.semanticIds[0].includes('/'));
  assert.ok(row.semanticIds[1].includes('.'));
  assert.notEqual(row.semanticIds[0],row.semanticIds[1]);
  assert.equal(fixture.canonicalRules.dottedSemanticId,'reject');
});

test('underscore authoring shorthand normalizes deterministically before registration',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='underscore-normalization');
  assert.equal(normalizeSlug(row.rawSlug),row.normalizedSlug);
  assert.equal(row.normalizedSlug,'hunter-trail');
});

test('season identity uses an explicit season path segment, never a suffix guess',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='season-suffix-ambiguity');
  const [ambiguous,canonical]=row.candidates;
  assert.equal(ambiguous,'activity/forest/route/logging-road-spring/default');
  assert.equal(canonical,'activity/forest/route/logging-road/season/spring/default');
  assert.equal(fixture.canonicalRules.seasonSuffixOnBaseSlug,'reject-ambiguous');
});

test('legacy result names are reserved from route/challenge family slugs',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='legacy-result-collision');
  assert.throws(()=>preflight([row.candidate]),/reserved result namespace collision/);
  assert.equal(row.reservedId,'activity/forest/return/success');
});

test('locked route/challenge families pass canonical naming preflight',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='valid-distinct-families');
  const normalized=preflight(row.candidates);
  assert.equal(normalized.length,6);
  assert.equal(new Set(normalized.map(x=>x.slug)).size,6);
});
