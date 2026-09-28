import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Candidate={
  candidateKey:string;
  sourceSequenceKey:string;
  sourceFrames:string[];
  targetTiming:{
    sourceLoopDurationMs:number;
    normalizedExportLoopDurationMs:number;
    normalizedFrameDelayMs:number;
    frameCount:number;
    loopCount:number;
  };
  targetRaster:{
    width:number;
    height:number;
    maxPaletteColors:number;
  };
  gifPath:string|null;
};

type Pool={
  formatVersion:number;
  kind:string;
  status:string;
  presentationId:string;
  staticFallback:string;
  candidates:Candidate[];
};

const files=[
  'content/presentation-drafts/lumber-spring-animation-candidates-v1.json',
  'content/presentation-drafts/guard-summer-animation-candidates-v1.json',
  'content/presentation-drafts/tavern-autumn-animation-candidates-v1.json',
  'content/presentation-drafts/school-literacy-animation-candidates-v1.json',
  'content/presentation-drafts/poverty-helpful-summer-animation-candidates-v1.json',
  'content/presentation-drafts/forest-success-return-animation-candidates-v1.json',
  'content/presentation-drafts/foreman-night-animation-candidates-v1.json'
];

const forbiddenKeys=new Set([
  'conditions','effects','effect','rewards','reward','cost','energy','energyCost',
  'eligibility','mechanics','rng','gameplayRng','save','saveState','outcome',
  'relationshipDelta','statDelta'
]);

function forbiddenFields(value:unknown,path:string[]=[]):string[]{
  if(Array.isArray(value)){
    return value.flatMap((entry,index)=>forbiddenFields(entry,[...path,String(index)]));
  }
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbiddenKeys.has(key))hits.push([...path,key].join('.'));
    hits.push(...forbiddenFields(entry,[...path,key]));
  }
  return hits;
}

function loadPools():Pool[]{
  return files.map(file=>JSON.parse(readFileSync(file,'utf8')) as Pool);
}

test('seven candidate metadata pools each contain exactly three source candidates',()=>{
  const pools=loadPools();
  assert.equal(pools.length,7);
  for(const pool of pools){
    assert.equal(pool.formatVersion,1);
    assert.equal(pool.kind,'animation-candidate-source-metadata');
    assert.equal(pool.status,'SOURCE_READY_GIF_EXPORT_BLOCKED');
    assert.equal(pool.candidates.length,3,pool.presentationId);
  }
});

test('all metadata pools use exact current semantic presentation IDs and real static fallbacks',()=>{
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  for(const pool of loadPools()){
    assert.ok(slots.has(pool.presentationId),pool.presentationId);
    assert.match(pool.staticFallback,/^assets\/[a-z0-9_./-]+\.svg$/i,pool.staticFallback);
    assert.equal(existsSync(pool.staticFallback),true,pool.staticFallback);
  }
});

test('candidate keys are globally unique and source frames exist in exact ordered local sets',()=>{
  const keys=new Set<string>();
  const frames=new Set<string>();

  for(const pool of loadPools()){
    for(const candidate of pool.candidates){
      assert.match(candidate.candidateKey,/^[a-z0-9][a-z0-9._-]*$/,candidate.candidateKey);
      assert.equal(keys.has(candidate.candidateKey),false,'duplicate candidate key '+candidate.candidateKey);
      keys.add(candidate.candidateKey);

      assert.equal(candidate.sourceFrames.length,3<4?4:4,candidate.candidateKey);
      assert.equal(candidate.targetTiming.frameCount,candidate.sourceFrames.length,candidate.candidateKey);
      assert.equal(candidate.targetTiming.normalizedExportLoopDurationMs,candidate.targetTiming.normalizedFrameDelayMs*candidate.sourceFrames.length,candidate.candidateKey);
      assert.equal(candidate.targetTiming.loopCount,0,candidate.candidateKey);
      assert.equal(candidate.targetRaster.width,640,candidate.candidateKey);
      assert.equal(candidate.targetRaster.height,360,candidate.candidateKey);

      candidate.sourceFrames.forEach((frame,index)=>{
        assert.match(frame,/^assets\/presentation-frames\/[a-z0-9][a-z0-9._-]*\.svg$/,frame);
        assert.equal(existsSync(frame),true,frame);
        assert.equal(frames.has(frame),false,'duplicate source frame '+frame);
        frames.add(frame);

        const svg=readFileSync(frame,'utf8');
        assert.ok(svg.includes('data-presentation-id="'+pool.presentationId+'"'),frame);
        assert.ok(svg.includes('data-sequence-id="'+candidate.sourceSequenceKey+'"'),frame);
        assert.ok(svg.includes('data-frame-index="'+(index+1)+'"'),frame);
      });
    }
  }

  assert.equal(keys.size,21);
  assert.equal(frames.size,84);
});

test('no GIF path is claimed unless real local GIF bytes exist',()=>{
  for(const pool of loadPools()){
    for(const candidate of pool.candidates){
      if(candidate.gifPath===null)continue;
      assert.match(candidate.gifPath,/^assets\/gif\/[a-z0-9_./-]+\.gif$/i,candidate.gifPath);
      assert.equal(existsSync(candidate.gifPath),true,candidate.gifPath);
      const bytes=readFileSync(candidate.gifPath);
      const signature=bytes.subarray(0,6).toString('ascii');
      assert.ok(signature==='GIF87a'||signature==='GIF89a',candidate.gifPath);
    }
  }
});

test('candidate metadata is presentation-only and contains no gameplay fields',()=>{
  for(const [index,pool] of loadPools().entries()){
    assert.deepEqual(forbiddenFields(pool),[],files[index]);
  }
});
