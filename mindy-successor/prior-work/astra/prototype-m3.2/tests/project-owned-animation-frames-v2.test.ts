import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Sequence={
  key:string;
  presentationId:string;
  durationMs:number;
  files:string[];
};

const sequences:Sequence[]=[
  {
    key:'lumber-spring-work-loop-a',
    presentationId:'job/lumber/shift/spring/default',
    durationMs:2400,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/lumber-spring-work-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'lumber-spring-work-loop-b',
    presentationId:'job/lumber/shift/spring/default',
    durationMs:2200,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/lumber-spring-work-loop-b-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'lumber-spring-work-loop-c',
    presentationId:'job/lumber/shift/spring/default',
    durationMs:2600,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/lumber-spring-work-loop-c-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'guard-summer-watch-loop-a',
    presentationId:'job/guard/shift/summer/default',
    durationMs:2800,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/guard-summer-watch-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'tavern-autumn-service-loop-a',
    presentationId:'job/tavern/shift/autumn/default',
    durationMs:2600,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/tavern-autumn-service-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'school-literacy-study-loop-a',
    presentationId:'school/literacy-and-numbers/lesson/default',
    durationMs:3000,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/school-literacy-study-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'poverty-helpful-summer-loop-a',
    presentationId:'location/town/event/poverty-street-production-helpful-summer/default',
    durationMs:2400,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/poverty-helpful-summer-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'forest-success-return-loop-a',
    presentationId:'activity/forest/return/success',
    durationMs:3200,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/forest-success-return-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'foreman-night-professional-loop-a',
    presentationId:'relationship/lumber-foreman/lumber-night-foreman-professional/default',
    durationMs:3600,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/foreman-night-professional-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    key:'school-arcana-rune-loop-a',
    presentationId:'school/arcana/lesson/default',
    durationMs:3000,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/school-arcana-rune-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  }
];

test('expanded project-owned frame-source set uses exact current semantic IDs',()=>{
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  for(const sequence of sequences)assert.ok(slots.has(sequence.presentationId),sequence.presentationId);
  assert.equal(sequences.length,10);
  assert.equal(sequences.filter(sequence=>sequence.presentationId==='job/lumber/shift/spring/default').length,3);
});

test('all frame files exist in exact order with consistent metadata and viewBox',()=>{
  const seen=new Set<string>();
  for(const sequence of sequences){
    assert.equal(sequence.files.length,4,sequence.key);
    const viewBoxes=new Set<string>();
    sequence.files.forEach((file,index)=>{
      assert.equal(seen.has(file),false,'duplicate frame path '+file);
      seen.add(file);
      assert.equal(existsSync(file),true,file);

      const svg=readFileSync(file,'utf8');
      assert.match(svg,/^<svg\b[^>]*>/,file);
      assert.match(svg,/<\/svg>\s*$/,file);
      const viewBox=svg.match(/viewBox="([^"]+)"/)?.[1];
      assert.equal(typeof viewBox,'string',file);
      viewBoxes.add(viewBox!);

      assert.ok(svg.includes('data-presentation-id="'+sequence.presentationId+'"'),file);
      assert.ok(svg.includes('data-sequence-id="'+sequence.key+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+(index+1)+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.durationMs+'"'),file);
    });
    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.key);
  }
  assert.equal(seen.size,40);
});

test('expanded frame sources contain no external URLs/scripts or gameplay metadata',()=>{
  const forbiddenAttributes=[
    'data-reward','data-effect','data-effects','data-energy','data-eligibility',
    'data-rng','data-save','data-save-state','data-outcome-selector',
    'data-gameplay-duration','data-cost'
  ];
  for(const sequence of sequences){
    for(const file of sequence.files){
      const svg=readFileSync(file,'utf8');
      assert.doesNotMatch(svg,/<script\b/i,file);
      assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,file);
      const lower=svg.toLowerCase();
      for(const attr of forbiddenAttributes)assert.equal(lower.includes(attr+'='),false,file+' '+attr);
    }
  }
});

test('all animation sources are local project-owned SVGs only',()=>{
  for(const sequence of sequences){
    for(const file of sequence.files){
      assert.match(file,/^assets\/presentation-frames\/[a-z0-9][a-z0-9._-]*\.svg$/);
      assert.doesNotMatch(file,/gif|https?:|data:/i);
    }
  }
});
