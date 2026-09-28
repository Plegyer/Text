import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Sequence={
  sequenceKey:string;
  presentationId:string;
  durationMs:number;
};

const sequences:Sequence[]=[
  {sequenceKey:'merchant-spring-stall-loop-a',presentationId:'job/merchant/shift/spring/default',durationMs:2800},
  {sequenceKey:'merchant-spring-stall-loop-b',presentationId:'job/merchant/shift/spring/default',durationMs:3000},
  {sequenceKey:'merchant-spring-stall-loop-c',presentationId:'job/merchant/shift/spring/default',durationMs:2600},
  {sequenceKey:'hunter-autumn-trail-loop-a',presentationId:'job/hunter/shift/autumn/default',durationMs:3000},
  {sequenceKey:'hunter-autumn-trail-loop-b',presentationId:'job/hunter/shift/autumn/default',durationMs:2800},
  {sequenceKey:'hunter-autumn-trail-loop-c',presentationId:'job/hunter/shift/autumn/default',durationMs:3200},
  {sequenceKey:'artist-geisha-winter-rehearsal-loop-a',presentationId:'job/artist-geisha/shift/winter/default',durationMs:3200},
  {sequenceKey:'artist-geisha-winter-rehearsal-loop-b',presentationId:'job/artist-geisha/shift/winter/default',durationMs:3000},
  {sequenceKey:'artist-geisha-winter-rehearsal-loop-c',presentationId:'job/artist-geisha/shift/winter/default',durationMs:3400}
];

const forbiddenAttributes=[
  'data-reward','data-rewards','data-effect','data-effects','data-energy',
  'data-eligibility','data-rng','data-save','data-save-state','data-cost',
  'data-gameplay-duration','data-outcome','data-outcome-selector',
  'data-progress','data-endurance','data-mechanics'
];

function framePath(sequenceKey:string,index:number){
  return 'assets/presentation-frames/'+sequenceKey+'-frame-'+String(index).padStart(2,'0')+'.svg';
}

test('items 352-360 provide exactly three compatible source sequences per assigned semantic identity',()=>{
  const counts=new Map<string,number>();
  for(const sequence of sequences){
    counts.set(sequence.presentationId,(counts.get(sequence.presentationId)??0)+1);
  }

  assert.deepEqual([...counts.entries()].sort(),[
    ['job/artist-geisha/shift/winter/default',3],
    ['job/hunter/shift/autumn/default',3],
    ['job/merchant/shift/spring/default',3]
  ]);
});

test('all new sequence semantic IDs exist in current presentation catalog',()=>{
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  for(const sequence of sequences){
    assert.ok(slots.has(sequence.presentationId),sequence.presentationId);
  }
});

test('all 36 new frames are local project-owned SVGs with ordered metadata and consistent dimensions',()=>{
  const allPaths=new Set<string>();

  for(const sequence of sequences){
    const viewBoxes=new Set<string>();
    const frameBytes=new Set<string>();

    for(let index=1;index<=4;index++){
      const file=framePath(sequence.sequenceKey,index);
      assert.equal(allPaths.has(file),false,'duplicate frame path '+file);
      allPaths.add(file);
      assert.equal(existsSync(file),true,file);
      assert.match(file,/^assets\/presentation-frames\/[a-z0-9][a-z0-9._-]*\.svg$/);

      const svg=readFileSync(file,'utf8');
      frameBytes.add(svg);

      assert.match(svg,/^<svg\b[^>]*>/,file);
      assert.match(svg,/<\/svg>\s*$/,file);
      assert.doesNotMatch(svg,/<script\b/i,file);
      assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i,file);

      const viewBox=svg.match(/viewBox="([^"]+)"/)?.[1];
      assert.equal(typeof viewBox,'string',file);
      viewBoxes.add(viewBox!);

      assert.ok(svg.includes('data-presentation-id="'+sequence.presentationId+'"'),file);
      assert.ok(svg.includes('data-sequence-id="'+sequence.sequenceKey+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+index+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.durationMs+'"'),file);
      assert.ok(svg.includes('data-source-kind="project-owned"'),file);

      const lower=svg.toLowerCase();
      for(const attr of forbiddenAttributes){
        assert.equal(lower.includes(attr+'='),false,file+' '+attr);
      }
    }

    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.sequenceKey);
    assert.equal(frameBytes.size,4,sequence.sequenceKey+' must have four distinct frames');
  }

  assert.equal(allPaths.size,36);
});

test('new animation source package remains presentation-only and GIF-free',()=>{
  for(const sequence of sequences){
    for(let index=1;index<=4;index++){
      const file=framePath(sequence.sequenceKey,index);
      const svg=readFileSync(file,'utf8');
      assert.doesNotMatch(file,/\.gif$/i);
      assert.ok(svg.includes('data-source-kind="project-owned"'),file);
    }
  }
});
