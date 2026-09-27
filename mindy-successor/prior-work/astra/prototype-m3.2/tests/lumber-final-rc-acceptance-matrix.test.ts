import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const matrix=readFileSync('../../../docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const cross=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

function row(pa:string){
  return matrix.split('\n').find(line=>line.startsWith(`| ${pa} |`))??'';
}

test('matrix classifies every PA00-PA26 row exactly once',()=>{
  for(let i=0;i<=26;i++){
    const pa=`PA${String(i).padStart(2,'0')}`;
    const matches=matrix.split('\n').filter(line=>line.startsWith(`| ${pa} |`));
    assert.equal(matches.length,1,pa);
  }
});

test('human decision rows are PA07 PA08 PA09 and runtime-green authoring row is PA17',()=>{
  for(const pa of ['PA07','PA08','PA09'])assert.ok(row(pa).includes('HUMAN_DECISION_REQUIRED'),pa);
  assert.ok(row('PA17').includes('RUNTIME_GREEN_AUTHORING_OPEN'));
});

test('PA16 is the content-depth gap while shipped Lumber rows stay green',()=>{
  assert.ok(row('PA16').includes('CONTENT_DEPTH_OPEN'));
  for(const pa of ['PA02','PA03','PA04','PA05','PA06','PA10','PA11','PA12','PA13','PA14','PA15','PA18','PA19','PA20','PA21','PA22','PA23','PA24','PA25','PA26']){
    assert.ok(row(pa).includes('SHIPPED_GREEN'),pa);
  }
});

test('49 remains accelerator-only and never ordinary-play evidence',()=>{
  assert.ok(matrix.includes('completed_shifts=49'));
  assert.ok(matrix.includes('long-threshold accelerator only'));
  assert.ok(matrix.includes('not eligible at 49'));
  assert.ok(matrix.includes('one real `lumber.shift` moves 49 -> 50'));
  assert.ok(matrix.includes('without treating the seeded 49-state as ordinary-play evidence'));
});

test('Hard Work and exact A5 boundary remain locked',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  const event=cross.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
});
