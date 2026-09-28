import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Sequence={
  sequenceKey:string;
  presentationId:string;
  exportReady:boolean;
  candidateKey:string;
  sourceLoopDurationMs:number;
  normalizedExportLoopDurationMs:number;
  normalizedFrameDelayMs:number;
  staticFallback:string;
  frames:string[];
  gifPath:null;
};

type Manifest={
  formatVersion:number;
  kind:string;
  status:string;
  sequences:Sequence[];
  summary:{
    validatedSequences:number;
    validatedFrameFiles:number;
    semanticIdentities:number;
    semanticIdsWithAtLeastThreeSourceSequences:string[];
    exportReadySequenceCount:number;
    actualGifPaths:number;
  };
};

const manifest=JSON.parse(
  readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v3.json','utf8')
) as Manifest;

const forbiddenAttributes=[
  'data-reward','data-rewards','data-effect','data-effects','data-energy',
  'data-eligibility','data-rng','data-save','data-save-state','data-cost',
  'data-gameplay-duration','data-outcome-selector','data-mechanics'
];

test('v4 manifest lists 24 validated source sequences for exact current semantic IDs',()=>{
  assert.equal(manifest.formatVersion,3);
  assert.equal(manifest.kind,'project-owned-animation-source-manifest');
  assert.equal(manifest.sequences.length,24);
  assert.equal(manifest.summary.validatedSequences,24);
  assert.equal(manifest.summary.validatedFrameFiles,96);
  assert.equal(manifest.summary.semanticIdentities,8);
  assert.equal(manifest.summary.exportReadySequenceCount,24);
  assert.equal(manifest.summary.actualGifPaths,0);

  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  for(const sequence of manifest.sequences){
    assert.ok(slots.has(sequence.presentationId),sequence.presentationId);
    assert.equal(sequence.exportReady,true,sequence.sequenceKey);
    assert.equal(sequence.gifPath,null,sequence.sequenceKey);
  }
});

test('every v4 source sequence has four ordered local SVG frames with consistent viewBox',()=>{
  const allFramePaths=new Set<string>();
  const allCandidateKeys=new Set<string>();

  for(const sequence of manifest.sequences){
    assert.equal(sequence.frames.length,4,sequence.sequenceKey);
    assert.match(sequence.candidateKey,/^[a-z0-9][a-z0-9._-]*$/,sequence.candidateKey);
    assert.equal(allCandidateKeys.has(sequence.candidateKey),false,'duplicate candidate key '+sequence.candidateKey);
    allCandidateKeys.add(sequence.candidateKey);

    assert.equal(existsSync(sequence.staticFallback),true,sequence.staticFallback);
    assert.equal(sequence.normalizedExportLoopDurationMs,sequence.normalizedFrameDelayMs*4,sequence.sequenceKey);
    assert.equal(sequence.normalizedFrameDelayMs%10,0,sequence.sequenceKey);

    const viewBoxes=new Set<string>();
    const frameBytes=new Set<string>();

    sequence.frames.forEach((file,index)=>{
      assert.equal(allFramePaths.has(file),false,'duplicate frame path '+file);
      allFramePaths.add(file);
      assert.match(file,/^assets\/presentation-frames\/[a-z0-9][a-z0-9._-]*\.svg$/,file);
      assert.equal(existsSync(file),true,file);

      const svg=readFileSync(file,'utf8');
      frameBytes.add(svg);
      assert.match(svg,/^<svg\b[^>]*>/,file);
      assert.match(svg,/<\/svg>\s*$/,file);
      assert.doesNotMatch(svg,/<script\b/i,file);
      assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,file);

      const viewBox=svg.match(/viewBox="([^"]+)"/)?.[1];
      assert.equal(typeof viewBox,'string',file);
      viewBoxes.add(viewBox!);

      assert.ok(svg.includes('data-presentation-id="'+sequence.presentationId+'"'),file);
      assert.ok(svg.includes('data-sequence-id="'+sequence.sequenceKey+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+(index+1)+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.sourceLoopDurationMs+'"'),file);

      const lower=svg.toLowerCase();
      for(const attr of forbiddenAttributes)assert.equal(lower.includes(attr+'='),false,file+' '+attr);
    });

    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.sequenceKey);
    assert.equal(frameBytes.size,4,sequence.sequenceKey+' frames must be distinct');
  }

  assert.equal(allFramePaths.size,96);
  assert.equal(allCandidateKeys.size,24);
});

test('v4 manifest has exactly three compatible sequences for each of eight current semantic IDs',()=>{
  const counts=new Map<string,number>();
  for(const sequence of manifest.sequences){
    counts.set(sequence.presentationId,(counts.get(sequence.presentationId)??0)+1);
  }

  assert.equal(counts.size,8);
  for(const [id,count] of counts)assert.equal(count,3,id);

  assert.deepEqual(
    [...counts.keys()].sort(),
    [...manifest.summary.semanticIdsWithAtLeastThreeSourceSequences].sort()
  );
});

test('v4 source package stays GIF-free and presentation-only',()=>{
  for(const sequence of manifest.sequences){
    assert.equal(sequence.gifPath,null);
    for(const file of sequence.frames)assert.doesNotMatch(file,/\.gif$/i);
  }
  assert.doesNotMatch(JSON.stringify(manifest),/https?:\/\//i);
});
