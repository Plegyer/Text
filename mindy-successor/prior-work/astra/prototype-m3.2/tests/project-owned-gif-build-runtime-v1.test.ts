import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';

const pool=JSON.parse(readFileSync('content/presentation-drafts/first-project-owned-gif-pool-v1.json','utf8'));
const localization=JSON.parse(readFileSync('content/first-project-owned-gif-localization-v1.fixture.json','utf8'));

function collectGifs(root:string):string[]{
  if(!existsSync(root))return [];
  const out:string[]=[];
  const walk=(dir:string)=>{
    for(const entry of readdirSync(dir,{withFileTypes:true})){
      const full=join(dir,entry.name);
      if(entry.isDirectory())walk(full);
      else if(entry.isFile()&&/\.gif$/i.test(entry.name))out.push(full);
    }
  };
  walk(root);
  return out.sort();
}

test('blocked first project-owned GIF pool emits no production candidate claim',()=>{
  assert.equal(pool.status,'BLOCKED_BY_GIF_EXPORT');
  assert.equal(pool.targetPresentationId,'job/lumber/shift/spring/default');
  assert.deepEqual(pool.gifCandidates,[]);
  assert.deepEqual(pool.presentationPatch.slots,{});
  assert.deepEqual(pool.presentationPatch.media,{});
  assert.equal(pool.currentStaticFallback,'assets/presentation/career-lumber-shift-spring.svg');
});

test('blocked localization delta contains no fake candidate strings',()=>{
  assert.equal(localization.status,'BLOCKED_BY_GIF_EXPORT');
  assert.deepEqual(localization.strings,{});
  assert.deepEqual(localization.candidateBindings,[]);
});

test('no item-238 production GIF bytes are present under assets/gif',()=>{
  const gifs=collectGifs('assets/gif');
  assert.deepEqual(gifs,[]);
});

test('source frame sequence remains real and separate from production GIF claim',()=>{
  assert.equal(pool.sourceFrameSequences.length,4);
  for(const frame of pool.sourceFrameSequences){
    assert.equal(existsSync(frame),true,frame);
    const svg=readFileSync(frame,'utf8');
    assert.match(svg,/^<svg\b/);
    assert.ok(svg.includes('data-presentation-id="job/lumber/shift/spring/default"'));
  }
});
