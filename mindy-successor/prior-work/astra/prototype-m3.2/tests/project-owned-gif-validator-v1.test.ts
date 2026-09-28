import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

import {
  parseGifMetadata,
  validateProjectOwnedGif,
  parseValidatorArgs
} from '../tools/validate-project-owned-gif.mjs';

function gifFixture(frameCount=2,delayCs=10,loopCount=0){
  const chunks:Buffer[]=[
    Buffer.from('GIF89a','ascii'),
    Buffer.from([
      0x01,0x00, // width
      0x01,0x00, // height
      0x80,      // global colour table, 2 colours
      0x00,      // background index
      0x00       // pixel aspect
    ]),
    Buffer.from([
      0x00,0x00,0x00,
      0xff,0xff,0xff
    ]),
    Buffer.from([0x21,0xff,0x0b]),
    Buffer.from('NETSCAPE2.0','ascii'),
    Buffer.from([
      0x03,0x01,
      loopCount&0xff,(loopCount>>8)&0xff,
      0x00
    ])
  ];

  for(let i=0;i<frameCount;i++){
    chunks.push(Buffer.from([
      0x21,0xf9,0x04,0x00,
      delayCs&0xff,(delayCs>>8)&0xff,
      0x00,0x00
    ]));
    chunks.push(Buffer.from([
      0x2c,
      0x00,0x00,0x00,0x00,
      0x01,0x00,0x01,0x00,
      0x00
    ]));
    chunks.push(Buffer.from([
      0x02,
      0x02,0x44,0x01,
      0x00
    ]));
  }

  chunks.push(Buffer.from([0x3b]));
  return Buffer.concat(chunks);
}

async function fixtureRoot(bytes=gifFixture()){
  const root=await mkdtemp(join(tmpdir(),'project-gif-validator-'));
  await mkdir(join(root,'assets','gif','project-owned'),{recursive:true});
  const file=join(root,'assets','gif','project-owned','candidate.gif');
  await writeFile(file,bytes);
  return {root,file};
}

async function withFixture(
  run:(root:string)=>Promise<void>,
  bytes=gifFixture()
){
  const {root}=await fixtureRoot(bytes);
  try{await run(root);}finally{await rm(root,{recursive:true,force:true});}
}

const provenance='Generated project-owned from repository-local SVG frame sources.';

test('safe in-test GIF fixture exposes signature, dimensions, frames, timing and infinite loop metadata',()=>{
  const metadata=parseGifMetadata(gifFixture(2,10,0));
  assert.equal(metadata.signature,'GIF89a');
  assert.equal(metadata.width,1);
  assert.equal(metadata.height,1);
  assert.equal(metadata.frameCount,2);
  assert.deepEqual(metadata.frameDelaysMs,[100,100]);
  assert.equal(metadata.totalDurationMs,200);
  assert.equal(metadata.loopCount,0);
  assert.ok(metadata.byteSize>0);
});

test('validator accepts safe local project-owned fixture when expected metadata matches',async()=>{
  await withFixture(async root=>{
    const result=await validateProjectOwnedGif({
      src:'assets/gif/project-owned/candidate.gif',
      provenanceNote:provenance,
      expected:{
        width:1,
        height:1,
        frameCount:2,
        frameDelayMs:100,
        totalDurationMs:200,
        loopCount:0
      }
    },{rootDir:root,maxBytes:1024});

    assert.equal(result.ok,true,result.errors.join('; '));
    assert.deepEqual(result.errors,[]);
    assert.equal(result.metadata?.frameCount,2);
  });
});

test('validator rejects invalid GIF signature',async()=>{
  const bytes=gifFixture();
  bytes.write('NOTGIF',0,'ascii');

  await withFixture(async root=>{
    const result=await validateProjectOwnedGif({
      src:'assets/gif/project-owned/candidate.gif',
      provenanceNote:provenance
    },{rootDir:root,maxBytes:1024});

    assert.equal(result.ok,false);
    assert.ok(result.errors.some((error:string)=>error.includes('invalid GIF signature')));
  },bytes);
});

test('validator rejects external and traversal GIF paths before file access',async()=>{
  const external=await validateProjectOwnedGif({
    src:'https://example.invalid/candidate.gif',
    provenanceNote:provenance
  });
  assert.equal(external.ok,false);
  assert.ok(external.errors.some((error:string)=>error.includes('external/scheme')));

  const traversal=await validateProjectOwnedGif({
    src:'assets/gif/../candidate.gif',
    provenanceNote:provenance
  });
  assert.equal(traversal.ok,false);
  assert.ok(traversal.errors.some((error:string)=>error.includes('traversal')));
});

test('validator rejects placeholder/external provenance claims',async()=>{
  const result=await validateProjectOwnedGif({
    src:'assets/gif/project-owned/candidate.gif',
    provenanceNote:'Downloaded external placeholder from https://example.invalid/file.gif'
  });
  assert.equal(result.ok,false);
  assert.ok(result.errors.some((error:string)=>error.includes('provenance')));
});

test('validator enforces byte-size budget',async()=>{
  await withFixture(async root=>{
    const result=await validateProjectOwnedGif({
      src:'assets/gif/project-owned/candidate.gif',
      provenanceNote:provenance
    },{rootDir:root,maxBytes:20});

    assert.equal(result.ok,false);
    assert.ok(result.errors.some((error:string)=>error.includes('maxBytes')));
  });
});

test('validator reports expected dimension/frame/timing mismatches',async()=>{
  await withFixture(async root=>{
    const result=await validateProjectOwnedGif({
      src:'assets/gif/project-owned/candidate.gif',
      provenanceNote:provenance,
      expected:{
        width:640,
        height:360,
        frameCount:4,
        frameDelayMs:600,
        totalDurationMs:2400,
        loopCount:2
      }
    },{rootDir:root,maxBytes:1024});

    assert.equal(result.ok,false);
    assert.ok(result.errors.some((error:string)=>error.includes('width mismatch')));
    assert.ok(result.errors.some((error:string)=>error.includes('height mismatch')));
    assert.ok(result.errors.some((error:string)=>error.includes('frameCount mismatch')));
    assert.ok(result.errors.some((error:string)=>error.includes('loopCount mismatch')));
    assert.ok(result.errors.some((error:string)=>error.includes('totalDurationMs mismatch')));
    assert.ok(result.errors.some((error:string)=>error.includes('frame delay mismatch')));
  });
});

test('CLI parser requires local file and explicit provenance note',()=>{
  const args=parseValidatorArgs([
    '--file','assets/gif/careers/lumber/spring-loop-a.gif',
    '--provenance-note',provenance,
    '--width','640',
    '--height','360',
    '--frames','4',
    '--loop','0',
    '--duration-ms','2400',
    '--delay-ms','600'
  ]);

  assert.equal(args.file,'assets/gif/careers/lumber/spring-loop-a.gif');
  assert.equal(args.expected.width,640);
  assert.equal(args.expected.height,360);
  assert.equal(args.expected.frameCount,4);
  assert.equal(args.expected.loopCount,0);
  assert.equal(args.expected.totalDurationMs,2400);
  assert.equal(args.expected.frameDelayMs,600);

  assert.throws(
    ()=>parseValidatorArgs(['--file','assets/gif/x.gif']),
    /--provenance-note is required/
  );
});
