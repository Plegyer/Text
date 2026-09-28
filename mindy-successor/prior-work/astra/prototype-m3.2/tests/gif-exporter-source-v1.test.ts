import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const exporterPath='tools/export-presentation-gif.mjs';
const fixturePath='content/presentation-drafts/gif-exporter-fixture-manifest-v1.json';

const exporter=readFileSync(exporterPath,'utf8');
const fixture=JSON.parse(readFileSync(fixturePath,'utf8'));

test('exporter source documents exact reviewed dependency versions without requiring them at test import time',()=>{
  assert.ok(exporter.includes("sharp:'0.35.4'"));
  assert.ok(exporter.includes("gifenc:'1.0.3'"));
  assert.ok(exporter.includes("import('sharp')"));
  assert.ok(exporter.includes("import('gifenc')"));
  assert.ok(exporter.indexOf("import('sharp')")>exporter.indexOf('async function loadDependencies'));
  assert.equal(fixture.dependencyExpectation.sharp,'0.35.4');
  assert.equal(fixture.dependencyExpectation.gifenc,'1.0.3');
});

test('exporter accepts repository-local manifest/frame/output paths only',()=>{
  assert.ok(exporter.includes("prefix:'content/presentation-drafts/'"));
  assert.ok(exporter.includes("prefix:'assets/presentation-frames/'"));
  assert.ok(exporter.includes("prefix:'assets/gif/'"));
  assert.ok(exporter.includes('must not use a URL/scheme'));
  assert.ok(exporter.includes('contains invalid path traversal'));
});

test('exporter source contains no network client or URL-fetch behavior',()=>{
  assert.doesNotMatch(exporter,/\bfetch\s*\(/);
  assert.doesNotMatch(exporter,/\baxios\b/i);
  assert.doesNotMatch(exporter,/\bhttps?\.request\b/i);
  assert.doesNotMatch(exporter,/from\s+['"]node:https?['"]/);
});

test('fixture uses one exact Lumber spring source sequence in deterministic frame order',()=>{
  assert.equal(fixture.sequences.length,1);
  const sequence=fixture.sequences[0];

  assert.equal(sequence.presentationId,'job/lumber/shift/spring/default');
  assert.equal(sequence.sequenceKey,'lumber-spring-work-loop-a');
  assert.equal(sequence.candidateKey,'lumber-spring-loop-a');
  assert.deepEqual(sequence.frames,[
    'assets/presentation-frames/lumber-spring-work-loop-a-frame-01.svg',
    'assets/presentation-frames/lumber-spring-work-loop-a-frame-02.svg',
    'assets/presentation-frames/lumber-spring-work-loop-a-frame-03.svg',
    'assets/presentation-frames/lumber-spring-work-loop-a-frame-04.svg'
  ]);

  for(const frame of sequence.frames){
    assert.equal(existsSync(frame),true,frame);
  }
});

test('fixture exact output naming is local, deterministic and not claimed to exist',()=>{
  assert.equal(
    fixture.expectedDryRun.output,
    'assets/gif/fixtures/lumber-spring-loop-a.gif'
  );
  assert.equal(fixture.expectedDryRun.expectedFileExists,false);
  assert.equal(existsSync(fixture.expectedDryRun.output),false);
  assert.equal(fixture.sequences[0].gifPath,null);
});

test('exporter source preserves source-array order and deterministic global palette flow',()=>{
  assert.ok(exporter.includes('for(let index=0;index<sequence.frames.length;index++)'));
  assert.ok(exporter.includes('Buffer.concat(rgbaFrames)'));
  assert.ok(exporter.includes('quantize(orderedPixels,plan.palette'));
  assert.ok(exporter.includes("applyPalette(rgba,palette,'rgb565')"));
  assert.ok(exporter.includes('rgbaFrames.forEach((rgba,index)=>'));
});

test('exporter source has no gameplay RNG or Save-state access',()=>{
  assert.doesNotMatch(exporter,/Math\.random\s*\(/);
  assert.doesNotMatch(exporter,/crypto\.random/i);
  assert.doesNotMatch(exporter,/\bgameplayRng\b/i);
  assert.doesNotMatch(exporter,/\bsaveState\b/i);
  assert.doesNotMatch(exporter,/localStorage|sessionStorage/i);
  assert.doesNotMatch(exporter,/content\/definitions\.json/);
});
