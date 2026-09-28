import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Sequence={
  key:string;
  presentationId:string;
  durationMs:number;
};

const sequences:Sequence[]=[
  {key:'lumber-spring-work-loop-a',presentationId:'job/lumber/shift/spring/default',durationMs:2400},
  {key:'lumber-spring-work-loop-b',presentationId:'job/lumber/shift/spring/default',durationMs:2200},
  {key:'lumber-spring-work-loop-c',presentationId:'job/lumber/shift/spring/default',durationMs:2600},

  {key:'guard-summer-watch-loop-a',presentationId:'job/guard/shift/summer/default',durationMs:2800},
  {key:'guard-summer-watch-loop-b',presentationId:'job/guard/shift/summer/default',durationMs:3000},
  {key:'guard-summer-watch-loop-c',presentationId:'job/guard/shift/summer/default',durationMs:2600},

  {key:'tavern-autumn-service-loop-a',presentationId:'job/tavern/shift/autumn/default',durationMs:2600},
  {key:'tavern-autumn-service-loop-b',presentationId:'job/tavern/shift/autumn/default',durationMs:2800},
  {key:'tavern-autumn-service-loop-c',presentationId:'job/tavern/shift/autumn/default',durationMs:2400},

  {key:'school-literacy-study-loop-a',presentationId:'school/literacy-and-numbers/lesson/default',durationMs:3000},
  {key:'school-literacy-study-loop-b',presentationId:'school/literacy-and-numbers/lesson/default',durationMs:2800},
  {key:'school-literacy-study-loop-c',presentationId:'school/literacy-and-numbers/lesson/default',durationMs:3200},

  {key:'poverty-helpful-summer-loop-a',presentationId:'location/town/event/poverty-street-production-helpful-summer/default',durationMs:2400},
  {key:'forest-success-return-loop-a',presentationId:'activity/forest/return/success',durationMs:3200},
  {key:'foreman-night-professional-loop-a',presentationId:'relationship/lumber-foreman/lumber-night-foreman-professional/default',durationMs:3600},
  {key:'school-arcana-rune-loop-a',presentationId:'school/arcana/lesson/default',durationMs:3000}
];

function framePath(sequenceKey:string,index:number){
  return 'assets/presentation-frames/'+sequenceKey+'-frame-'+String(index).padStart(2,'0')+'.svg';
}

test('v3 frame-source set resolves exact current semantic presentation IDs',()=>{
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  assert.equal(sequences.length,16);
  for(const sequence of sequences)assert.ok(slots.has(sequence.presentationId),sequence.presentationId);
});

test('every v3 sequence has four ordered, structurally valid project-owned SVG frames',()=>{
  const allPaths=new Set<string>();
  for(const sequence of sequences){
    const viewBoxes=new Set<string>();
    const frameBytes=new Set<string>();

    for(let index=1;index<=4;index++){
      const file=framePath(sequence.key,index);
      assert.equal(allPaths.has(file),false,'duplicate frame path '+file);
      allPaths.add(file);
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
      assert.ok(svg.includes('data-sequence-id="'+sequence.key+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+index+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.durationMs+'"'),file);
    }

    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.key);
    assert.equal(frameBytes.size,4,sequence.key+' frames must be distinct sources');
  }

  assert.equal(allPaths.size,64);
});

test('v3 frame-source metadata contains no gameplay/reward/RNG/Save contract',()=>{
  const forbidden=[
    'data-reward','data-rewards','data-effect','data-effects','data-energy',
    'data-eligibility','data-rng','data-save','data-save-state','data-cost',
    'data-gameplay-duration','data-outcome-selector'
  ];

  for(const sequence of sequences){
    for(let index=1;index<=4;index++){
      const file=framePath(sequence.key,index);
      const lower=readFileSync(file,'utf8').toLowerCase();
      for(const attr of forbidden)assert.equal(lower.includes(attr+'='),false,file+' '+attr);
    }
  }
});

test('v3 identifies exactly four semantic IDs with at least three compatible source sequences',()=>{
  const counts=new Map<string,number>();
  for(const sequence of sequences)counts.set(sequence.presentationId,(counts.get(sequence.presentationId)??0)+1);

  const ready=[...counts.entries()]
    .filter(([,count])=>count>=3)
    .map(([id])=>id)
    .sort();

  assert.deepEqual(ready,[
    'job/guard/shift/summer/default',
    'job/lumber/shift/spring/default',
    'job/tavern/shift/autumn/default',
    'school/literacy-and-numbers/lesson/default'
  ]);
});
