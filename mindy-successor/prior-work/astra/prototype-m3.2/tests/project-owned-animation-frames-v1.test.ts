import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const sequences=[
  {
    id:'lumber-spring-work-loop-a',
    presentationId:'job/lumber/shift/spring/default',
    durationMs:2400,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/lumber-spring-work-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  },
  {
    id:'school-arcana-rune-loop-a',
    presentationId:'school/arcana/lesson/default',
    durationMs:3000,
    files:[1,2,3,4].map(i=>'assets/presentation-frames/school-arcana-rune-loop-a-frame-'+String(i).padStart(2,'0')+'.svg')
  }
];

test('first project-owned animation frame sources exist with valid SVG structure',()=>{
  for(const sequence of sequences){
    assert.ok(sequence.files.length>=3&&sequence.files.length<=8,sequence.id);
    for(const file of sequence.files){
      assert.equal(existsSync(file),true,file);
      const svg=readFileSync(file,'utf8');
      assert.match(svg,/^<svg\b[^>]*>/,file);
      assert.match(svg,/<\/svg>\s*$/,file);
      assert.match(svg,/viewBox="0 0 1200 675"/,file);
      assert.doesNotMatch(svg,/<script\b/i,file);
      assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,file);
    }
  }
});

test('each frame sequence has stable dimensions and exact semantic identity metadata',()=>{
  for(const sequence of sequences){
    const viewBoxes=new Set<string>();
    sequence.files.forEach((file,index)=>{
      const svg=readFileSync(file,'utf8');
      const viewBox=svg.match(/viewBox="([^"]+)"/)?.[1];
      assert.equal(typeof viewBox,'string',file);
      viewBoxes.add(viewBox!);

      assert.ok(svg.includes('data-presentation-id="'+sequence.presentationId+'"'),file);
      assert.ok(svg.includes('data-sequence-id="'+sequence.id+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+(index+1)+'"'),file);
      assert.ok(svg.includes('data-frame-count="'+sequence.files.length+'"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.durationMs+'"'),file);
    });
    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.id);
  }
});

test('frame metadata stays presentation-only',()=>{
  const forbiddenDataAttributes=[
    'data-reward','data-effect','data-energy','data-eligibility',
    'data-rng','data-save','data-save-state','data-outcome-selector',
    'data-gameplay-duration'
  ];
  for(const sequence of sequences){
    for(const file of sequence.files){
      const svg=readFileSync(file,'utf8').toLowerCase();
      for(const attr of forbiddenDataAttributes)assert.equal(svg.includes(attr+'='),false,file+' '+attr);
    }
  }
});

test('first two frame-source identities are exact current semantic targets from the motion briefs',()=>{
  assert.deepEqual(
    sequences.map(sequence=>sequence.presentationId),
    ['job/lumber/shift/spring/default','school/arcana/lesson/default']
  );
});
