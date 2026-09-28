import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Sequence={
  sequenceKey:string;
  presentationId:string;
  sourceLoopDurationMs:number;
  staticFallback:string;
  frames:string[];
};

const prior=JSON.parse(
  readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v3.json','utf8')
) as {sequences:Array<{
  sequenceKey:string;
  presentationId:string;
  sourceLoopDurationMs:number;
  staticFallback:string;
  frames:string[];
}>};

function frames(key:string){
  return [1,2,3,4].map(index=>
    'assets/presentation-frames/'+key+'-frame-'+String(index).padStart(2,'0')+'.svg'
  );
}

const added:Sequence[]=[
  {
    sequenceKey:'forest-route-old-boundary-safe-loop-a',
    presentationId:'activity/forest/route/old-boundary',
    sourceLoopDurationMs:3200,
    staticFallback:'assets/presentation/forest-route-old-boundary-safe-v1.svg',
    frames:frames('forest-route-old-boundary-safe-loop-a')
  },
  {
    sequenceKey:'forest-route-old-boundary-safe-loop-b',
    presentationId:'activity/forest/route/old-boundary',
    sourceLoopDurationMs:3000,
    staticFallback:'assets/presentation/forest-route-old-boundary-safe-v1.svg',
    frames:frames('forest-route-old-boundary-safe-loop-b')
  },
  {
    sequenceKey:'forest-route-old-boundary-safe-loop-c',
    presentationId:'activity/forest/route/old-boundary',
    sourceLoopDurationMs:3400,
    staticFallback:'assets/presentation/forest-route-old-boundary-safe-v1.svg',
    frames:frames('forest-route-old-boundary-safe-loop-c')
  },
  {
    sequenceKey:'merchant-spring-market-loop-a',
    presentationId:'job/merchant/shift/spring/default',
    sourceLoopDurationMs:2800,
    staticFallback:'assets/presentation/career-merchant-shift-spring.svg',
    frames:frames('merchant-spring-market-loop-a')
  },
  {
    sequenceKey:'merchant-spring-market-loop-b',
    presentationId:'job/merchant/shift/spring/default',
    sourceLoopDurationMs:3000,
    staticFallback:'assets/presentation/career-merchant-shift-spring.svg',
    frames:frames('merchant-spring-market-loop-b')
  },
  {
    sequenceKey:'merchant-spring-market-loop-c',
    presentationId:'job/merchant/shift/spring/default',
    sourceLoopDurationMs:2600,
    staticFallback:'assets/presentation/career-merchant-shift-spring.svg',
    frames:frames('merchant-spring-market-loop-c')
  }
];

const all:Sequence[]=[
  ...prior.sequences.map(sequence=>({
    sequenceKey:sequence.sequenceKey,
    presentationId:sequence.presentationId,
    sourceLoopDurationMs:sequence.sourceLoopDurationMs,
    staticFallback:sequence.staticFallback,
    frames:sequence.frames
  })),
  ...added
];

const forbiddenAttributes=[
  'data-reward','data-rewards','data-effect','data-effects','data-energy',
  'data-eligibility','data-rng','data-save','data-save-state','data-cost',
  'data-gameplay-duration','data-outcome','data-progress','data-endurance'
];

test('v5 validates prior source manifest plus corrected old-boundary and Merchant spring sequences',()=>{
  assert.equal(prior.sequences.length,24);
  assert.equal(added.length,6);
  assert.equal(all.length,30);
});

test('all v5 source sequences use exact accepted semantic identities',()=>{
  const accepted=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  // Exact Chat3 route semantic is a source-prep target before root old-boundary slot activation.
  accepted.add('activity/forest/route/old-boundary');

  for(const sequence of all){
    assert.ok(accepted.has(sequence.presentationId),sequence.presentationId);
  }
});

test('all v5 source sequences have four ordered, distinct, local project-owned SVG frames',()=>{
  const allFramePaths=new Set<string>();

  for(const sequence of all){
    assert.equal(sequence.frames.length,4,sequence.sequenceKey);
    assert.equal(existsSync(sequence.staticFallback),true,sequence.staticFallback);

    const viewBoxes=new Set<string>();
    const sourceBytes=new Set<string>();

    sequence.frames.forEach((file,index)=>{
      assert.equal(allFramePaths.has(file),false,'duplicate frame path '+file);
      allFramePaths.add(file);
      assert.match(file,/^assets\/presentation-frames\/[a-z0-9][a-z0-9._-]*\.svg$/);
      assert.equal(existsSync(file),true,file);

      const svg=readFileSync(file,'utf8');
      sourceBytes.add(svg);
      assert.match(svg,/^<svg\b[^>]*>/,file);
      assert.match(svg,/<\/svg>\s*$/,file);
      assert.doesNotMatch(svg,/<script\b/i,file);
      assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/|data:)/i,file);

      const viewBox=svg.match(/viewBox="([^"]+)"/)?.[1];
      assert.equal(typeof viewBox,'string',file);
      viewBoxes.add(viewBox!);

      assert.ok(svg.includes('data-presentation-id="'+sequence.presentationId+'"'),file);
      assert.ok(svg.includes('data-sequence-id="'+sequence.sequenceKey+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+(index+1)+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.sourceLoopDurationMs+'"'),file);

      const lower=svg.toLowerCase();
      for(const attr of forbiddenAttributes){
        assert.equal(lower.includes(attr+'='),false,file+' '+attr);
      }
    });

    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.sequenceKey);
    assert.equal(sourceBytes.size,4,sequence.sequenceKey+' frames must be distinct');
  }

  assert.equal(allFramePaths.size,120);
});

test('v5 identifies semantic identities with at least three compatible sequences',()=>{
  const counts=new Map<string,number>();
  for(const sequence of all){
    counts.set(sequence.presentationId,(counts.get(sequence.presentationId)??0)+1);
  }

  const ready=[...counts.entries()]
    .filter(([,count])=>count>=3)
    .map(([id])=>id)
    .sort();

  assert.deepEqual(ready,[
    'activity/forest/return/success',
    'activity/forest/route/old-boundary',
    'job/guard/shift/summer/default',
    'job/lumber/shift/spring/default',
    'job/merchant/shift/spring/default',
    'job/tavern/shift/autumn/default',
    'location/town/event/poverty-street-production-helpful-summer/default',
    'relationship/lumber-foreman/lumber-night-foreman-professional/default',
    'school/arcana/lesson/default',
    'school/literacy-and-numbers/lesson/default'
  ]);
});
