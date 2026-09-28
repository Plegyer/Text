import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {
  parseCliArgs,
  resolveExportPlan,
  publicPlan,
  defaultOutputPath
} from '../tools/export-project-owned-gif.mjs';

async function fixtureRoot(){
  const root=await mkdtemp(join(tmpdir(),'project-gif-exporter-'));
  await mkdir(join(root,'content','presentation-drafts'),{recursive:true});
  await mkdir(join(root,'assets','presentation-frames'),{recursive:true});
  await mkdir(join(root,'assets','presentation'),{recursive:true});

  await writeFile(
    join(root,'assets','presentation','fallback.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"></svg>'
  );

  const frames=[];
  for(let index=1;index<=4;index++){
    const rel='assets/presentation-frames/test-loop-frame-'+String(index).padStart(2,'0')+'.svg';
    frames.push(rel);
    await writeFile(
      join(root,...rel.split('/')),
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" '+
      'data-presentation-id="job/lumber/shift/spring/default" '+
      'data-sequence-id="test-loop" data-frame-index="'+index+'" data-frame-count="4">'+
      '<rect width="1200" height="675" fill="#123456"/></svg>'
    );
  }

  const manifest={
    formatVersion:3,
    sequences:[{
      sequenceKey:'test-loop',
      presentationId:'job/lumber/shift/spring/default',
      exportReady:true,
      candidateKey:'test-lumber-loop-a',
      sourceLoopDurationMs:2400,
      normalizedExportLoopDurationMs:2400,
      normalizedFrameDelayMs:600,
      staticFallback:'assets/presentation/fallback.svg',
      frames,
      gifPath:null
    }]
  };

  await writeFile(
    join(root,'content','presentation-drafts','manifest.json'),
    JSON.stringify(manifest)
  );

  return root;
}

async function withFixture(run:(root:string)=>Promise<void>){
  const root=await fixtureRoot();
  try{await run(root);}finally{await rm(root,{recursive:true,force:true});}
}

test('CLI argument parsing exposes deterministic defaults without loading exporter dependencies',()=>{
  const args=parseCliArgs([
    '--manifest','content/presentation-drafts/manifest.json',
    '--presentation-id','job/lumber/shift/spring/default',
    '--sequence','test-loop',
    '--dry-run'
  ]);

  assert.equal(args.width,640);
  assert.equal(args.height,360);
  assert.equal(args.palette,256);
  assert.equal(args.loop,0);
  assert.equal(args.delayMs,null);
  assert.equal(args.dryRun,true);
});

test('dry-run manifest lookup resolves exact semantic ID, sequence and deterministic output name',async()=>{
  await withFixture(async root=>{
    const args=parseCliArgs([
      '--manifest','content/presentation-drafts/manifest.json',
      '--presentation-id','job/lumber/shift/spring/default',
      '--sequence','test-loop',
      '--dry-run'
    ]);
    const plan=publicPlan(await resolveExportPlan(args,{rootDir:root}));

    assert.equal(plan.presentationId,'job/lumber/shift/spring/default');
    assert.equal(plan.sequenceKey,'test-loop');
    assert.equal(plan.candidateKey,'test-lumber-loop-a');
    assert.equal(plan.output,'assets/gif/project-owned/test-lumber-loop-a.gif');
    assert.equal(plan.frameDelayMs,600);
    assert.equal(plan.width,640);
    assert.equal(plan.height,360);
    assert.equal(plan.frames.length,4);
    assert.equal(plan.dryRun,true);
  });
});

test('default output naming is candidate-key deterministic',()=>{
  assert.equal(
    defaultOutputPath('guard-summer-loop-a'),
    'assets/gif/project-owned/guard-summer-loop-a.gif'
  );
  assert.equal(
    defaultOutputPath('guard-summer-loop-a'),
    defaultOutputPath('guard-summer-loop-a')
  );
});

test('dry-run refuses unknown semantic presentation IDs',async()=>{
  await withFixture(async root=>{
    const args=parseCliArgs([
      '--manifest','content/presentation-drafts/manifest.json',
      '--presentation-id','job/unknown/shift/spring/default',
      '--sequence','test-loop',
      '--dry-run'
    ]);
    await assert.rejects(
      ()=>resolveExportPlan(args,{rootDir:root}),
      /unknown presentationId/
    );
  });
});

test('dry-run refuses a sequence that belongs to another semantic ID',async()=>{
  await withFixture(async root=>{
    const args=parseCliArgs([
      '--manifest','content/presentation-drafts/manifest.json',
      '--presentation-id','job/lumber/shift/spring/default',
      '--sequence','unknown-loop',
      '--dry-run'
    ]);
    await assert.rejects(
      ()=>resolveExportPlan(args,{rootDir:root}),
      /is not owned by presentationId/
    );
  });
});

test('CLI refuses external manifest and output URLs',()=>{
  assert.throws(
    ()=>parseCliArgs([
      '--presentation-id','job/lumber/shift/spring/default',
      '--sequence','test-loop',
      '--output','https://example.invalid/out.gif',
      '--dry-run'
    ]),
    /output/
  );
});

test('dry-run refuses external frame URLs from a manifest',async()=>{
  await withFixture(async root=>{
    const manifestPath=join(root,'content','presentation-drafts','manifest.json');
    const bad={
      formatVersion:3,
      sequences:[{
        sequenceKey:'test-loop',
        presentationId:'job/lumber/shift/spring/default',
        exportReady:true,
        candidateKey:'test-lumber-loop-a',
        sourceLoopDurationMs:2400,
        normalizedExportLoopDurationMs:2400,
        normalizedFrameDelayMs:600,
        staticFallback:'assets/presentation/fallback.svg',
        frames:[
          'https://example.invalid/frame.svg',
          'assets/presentation-frames/test-loop-frame-02.svg',
          'assets/presentation-frames/test-loop-frame-03.svg',
          'assets/presentation-frames/test-loop-frame-04.svg'
        ],
        gifPath:null
      }]
    };
    await writeFile(manifestPath,JSON.stringify(bad));

    const args=parseCliArgs([
      '--manifest','content/presentation-drafts/manifest.json',
      '--presentation-id','job/lumber/shift/spring/default',
      '--sequence','test-loop',
      '--dry-run'
    ]);

    await assert.rejects(
      ()=>resolveExportPlan(args,{rootDir:root}),
      /frame path/
    );
  });
});

test('dry-run refuses source SVG that embeds an external resource',async()=>{
  await withFixture(async root=>{
    await writeFile(
      join(root,'assets','presentation-frames','test-loop-frame-01.svg'),
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" '+
      'data-presentation-id="job/lumber/shift/spring/default" data-sequence-id="test-loop" data-frame-index="1">'+
      '<image href="https://example.invalid/pixel.png"/></svg>'
    );

    const args=parseCliArgs([
      '--manifest','content/presentation-drafts/manifest.json',
      '--presentation-id','job/lumber/shift/spring/default',
      '--sequence','test-loop',
      '--dry-run'
    ]);

    await assert.rejects(
      ()=>resolveExportPlan(args,{rootDir:root}),
      /forbidden external/
    );
  });
});
