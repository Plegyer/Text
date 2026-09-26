import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';

const docsDir='../../../docs/lumber-prep';
const currentRcDocNames=readdirSync(docsDir).filter(name=>
  /^(?:LUMBER_PR24_ONE_SAVE_STATE_AUDIT|LUMBER_RC_CLOSURE_HANDOFF|LUMBER_FINAL_DECISION_EVIDENCE_HANDOFF)_v\d+\.md$/.test(name)
);
const currentRcContentNames=readdirSync('content').filter(name=>
  /^(?:lumber-rc-closure-handoff|lumber-final-decision-evidence-handoff)\.fixture\.json$/.test(name)
);
const artifacts=[
  ...currentRcDocNames.map(name=>({path:`${docsDir}/${name}`,text:readFileSync(`${docsDir}/${name}`,'utf8')})),
  ...currentRcContentNames.map(name=>({path:`content/${name}`,text:readFileSync(`content/${name}`,'utf8')})),
  {
    path:'content/lumber-pa-shipped-row-evidence.fixture.json',
    text:readFileSync('content/lumber-pa-shipped-row-evidence.fixture.json','utf8')
  }
];

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('RC artifacts never count seeded old_boundary_token inventory as a full PA09 pass',()=>{
  for(const artifact of artifacts){
    const text=artifact.text;
    const seededToken=/seed(?:ed|ing)?[\s\S]{0,160}old_boundary_token|old_boundary_token[\s\S]{0,160}seed(?:ed|ing)?/i.test(text);
    const pa09=/PA09/i.test(text);
    if(!(seededToken&&pa09))continue;

    assert.match(
      text,
      /(?:not|does not|cannot|blocked|OPEN|authoring|decision|required|accelerator)/i,
      artifact.path
    );
    assert.doesNotMatch(
      text,
      /PA09[^\n]{0,120}(?:full pass|PASS|SHIPPED_GREEN)[^\n]{0,120}seed(?:ed|ing)?[^\n]{0,80}old_boundary_token/i,
      artifact.path
    );
  }
});

test('RC artifacts never count completed_shifts=49 seed as ordinary-play evidence',()=>{
  const pr24=artifacts.find(a=>a.path.endsWith('LUMBER_PR24_ONE_SAVE_STATE_AUDIT_v1.md'));
  assert.ok(pr24,'PR24 one-Save audit missing');
  assert.match(pr24.text,/completed_shifts = 49/);
  assert.match(pr24.text,/long-threshold accelerator/);
  assert.match(pr24.text,/ordinary-play evidence for 49 prior shifts/);
  assert.doesNotMatch(
    pr24.text,
    /completed_shifts = 49[^\n]{0,160}(?:ordinary play proof|ordinary-play pass|natural 49-shift evidence)/i
  );
});

test('Hard Work source of truth stays exactly one completed_shifts >= 50 condition',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);

  const forbiddenKinds=new Set([
    'careerStage','careerFact','relationshipStage','relationshipFact',
    'worldFact','calendarSeason','itemCount','itemCapability'
  ]);
  assert.equal(hardWork.conditions.some((c:any)=>forbiddenKinds.has(c.kind)),false);
});

test('Hard Work exact rewardId cannot drift from hardWork:lumber',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('Forest Lumber continuation remains exact activityResult, never worldFact-only',()=>{
  const event=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.equal(event.reactionTriggers.some((r:any)=>r.kind==='worldFact'),false);
});

test('current RC handoff keeps token authoring as a human/product decision rather than false-green PA09',()=>{
  const handoff=artifacts.find(a=>a.path.endsWith('lumber-rc-closure-handoff.fixture.json'));
  assert.ok(handoff,'RC closure handoff fixture missing');
  const parsed=JSON.parse(handoff.text);
  assert.ok(parsed.remainingBlockers.some((b:any)=>b.id==='old-boundary-token-product-decisions'));
  assert.equal(parsed.hardWork.status,'SHIPPED_GREEN');
  assert.equal(parsed.hardWork.independent,true);
});
