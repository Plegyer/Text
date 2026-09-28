import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

type Sequence={
  route:'logging-road'|'old-boundary';
  presentationId:string;
  key:string;
  durationMs:number;
};

const sequences:Sequence[]=[
  {route:'logging-road',presentationId:'activity/forest/route/logging-road',key:'forest-route-logging-road-loop-a',durationMs:2600},
  {route:'logging-road',presentationId:'activity/forest/route/logging-road',key:'forest-route-logging-road-loop-b',durationMs:2800},
  {route:'logging-road',presentationId:'activity/forest/route/logging-road',key:'forest-route-logging-road-loop-c',durationMs:2400},
  {route:'old-boundary',presentationId:'activity/forest/route/old-boundary',key:'forest-route-old-boundary-loop-a',durationMs:3200},
  {route:'old-boundary',presentationId:'activity/forest/route/old-boundary',key:'forest-route-old-boundary-loop-b',durationMs:3000},
  {route:'old-boundary',presentationId:'activity/forest/route/old-boundary',key:'forest-route-old-boundary-loop-c',durationMs:3400}
];

function framePath(sequenceKey:string,index:number){
  return 'assets/presentation-frames/'+sequenceKey+'-frame-'+String(index).padStart(2,'0')+'.svg';
}

const forbiddenGameplay=[
  'data-reward','data-rewards','data-effect','data-effects','data-energy',
  'data-eligibility','data-rng','data-save','data-save-state','data-cost',
  'data-gameplay-duration','data-outcome','data-progress','data-endurance'
];

test('Forest route animation source set has exactly three sequences per route',()=>{
  const counts=new Map<string,number>();
  for(const sequence of sequences){
    counts.set(sequence.presentationId,(counts.get(sequence.presentationId)??0)+1);
  }

  assert.deepEqual([...counts.entries()].sort(),[
    ['activity/forest/route/logging-road',3],
    ['activity/forest/route/old-boundary',3]
  ]);
});

test('each Forest route source sequence has exactly four ordered local SVG frames with consistent dimensions',()=>{
  const allPaths=new Set<string>();

  for(const sequence of sequences){
    const viewBoxes=new Set<string>();
    const frameBytes=new Set<string>();

    for(let index=1;index<=4;index++){
      const file=framePath(sequence.key,index);
      assert.equal(allPaths.has(file),false,'duplicate frame path '+file);
      allPaths.add(file);
      assert.equal(existsSync(file),true,file);
      assert.match(file,/^assets\/presentation-frames\/forest-route-[a-z0-9-]+-frame-\d{2}\.svg$/);

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
      assert.ok(svg.includes('data-sequence-id="'+sequence.key+'"'),file);
      assert.ok(svg.includes('data-frame-index="'+index+'"'),file);
      assert.ok(svg.includes('data-frame-count="4"'),file);
      assert.ok(svg.includes('data-loop-duration-ms="'+sequence.durationMs+'"'),file);

      const lower=svg.toLowerCase();
      for(const attr of forbiddenGameplay){
        assert.equal(lower.includes(attr+'='),false,file+' '+attr);
      }
    }

    assert.deepEqual([...viewBoxes],['0 0 1200 675'],sequence.key);
    assert.equal(frameBytes.size,4,sequence.key+' must contain four visually distinct source frames');
  }

  assert.equal(allPaths.size,24);
});

test('route-specific source metadata uses only the two exact semantic presentation IDs',()=>{
  assert.deepEqual(
    [...new Set(sequences.map(sequence=>sequence.presentationId))].sort(),
    ['activity/forest/route/logging-road','activity/forest/route/old-boundary']
  );
});

test('old-boundary SVG metadata/text excludes forbidden route-result semantics',()=>{
  const forbiddenEnglish=/\b(?:hunter|token|key|gate|gateway|arch|challenge|reward|success|failure|result)\b/i;
  const forbiddenRussian=/(?:охотник|токен|жетон|ключ|ворот|арка|испытани|награ|успех|провал|результат)/i;

  for(const sequence of sequences.filter(sequence=>sequence.route==='old-boundary')){
    for(let index=1;index<=4;index++){
      const file=framePath(sequence.key,index);
      const svg=readFileSync(file,'utf8');
      assert.doesNotMatch(svg,forbiddenEnglish,file);
      assert.doesNotMatch(svg,forbiddenRussian,file);
    }
  }
});
