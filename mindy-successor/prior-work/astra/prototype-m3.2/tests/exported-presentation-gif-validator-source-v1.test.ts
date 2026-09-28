import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=readFileSync('tools/validate-exported-presentation-gif.mjs','utf8');

test('validator source enforces repository-local assets/gif paths and exact expected path',()=>{
  assert.ok(source.includes("must stay under assets/gif/"));
  assert.ok(source.includes("must not be a URL/scheme"));
  assert.ok(source.includes("contains invalid traversal/path segments"));
  assert.ok(source.includes("file must exactly match expected path"));
});

test('validator source parses GIF signature, dimensions, frames, loop metadata and trailer',()=>{
  assert.ok(source.includes("GIF87a"));
  assert.ok(source.includes("GIF89a"));
  assert.ok(source.includes("readUInt16LE(6)"));
  assert.ok(source.includes("readUInt16LE(8)"));
  assert.ok(source.includes("frameCount+=1"));
  assert.ok(source.includes("NETSCAPE2.0"));
  assert.ok(source.includes("ANIMEXTS1.0"));
  assert.ok(source.includes("GIF trailer is missing"));
});

test('validator source enforces max bytes and expected dimensions/frame timing/loop',()=>{
  assert.ok(source.includes("GIF exceeds max file size"));
  assert.ok(source.includes("width mismatch"));
  assert.ok(source.includes("height mismatch"));
  assert.ok(source.includes("frame count mismatch"));
  assert.ok(source.includes("loop count mismatch"));
  assert.ok(source.includes("frame duration mismatch"));
});

test('validator source contains no network or gameplay access',()=>{
  assert.doesNotMatch(source,/\bfetch\s*\(/);
  assert.doesNotMatch(source,/from\s+['"]node:https?['"]/);
  assert.doesNotMatch(source,/\baxios\b/i);
  assert.doesNotMatch(source,/Math\.random\s*\(/);
  assert.doesNotMatch(source,/\bgameplayRng\b/i);
  assert.doesNotMatch(source,/\bsaveState\b/i);
  assert.doesNotMatch(source,/localStorage|sessionStorage/i);
  assert.doesNotMatch(source,/content\/definitions\.json/);
});
