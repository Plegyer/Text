import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES} from '../src/core/school.ts';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const pa=json('content/presentation-pa-scenario.fixture.json');
const regression=json('content/presentation-replacement-regression.fixture.json');
const smoke=json('content/presentation-production-smoke.fixture.json');
const product=json('content/presentation-product-coverage.fixture.json');
const lumberPA=json('content/lumber-product-acceptance.fixture-manifest.json');
const patchPlan=json('content/presentation-production-patch-plan.fixture.json');
const inventory=json('content/presentation-shipped-closure-inventory.fixture.json');

type Claim={key:string;presentationId:string;source:string};

function identityKey(identity:Record<string,string>){
  if(identity.kind==='location')return `location:${identity.locationId}`;
  if(identity.kind==='action')return `action:${identity.actionId}:scene:${identity.sceneId}`;
  if(identity.kind==='action-result')return `action-result:${identity.actionId}:scene:${identity.sceneId}`;
  if(identity.kind==='event')return `event:${identity.eventId}:variant:${identity.variantId}`;
  if(identity.kind==='course')return `course:${identity.courseId}`;
  if(identity.kind==='activity')return `activity:${identity.activityId}:phase:${identity.phase}`;
  if(identity.kind==='activity-result')return `activity-result:${identity.activityId}:result:${identity.resultId}`;
  if(identity.kind==='ending')return `ending:${identity.endingId}`;
  throw new Error('unsupported identity kind: '+identity.kind);
}

function claims():Claim[]{
  const result:Claim[]=[];

  for(const scenario of pa.scenarios){
    for(const step of scenario.steps){
      result.push({
        key:identityKey(step.identity),
        presentationId:step.presentationId,
        source:`pa:${scenario.scenarioId}/${step.stepId}`
      });
    }
  }

  for(const row of regression.cases){
    result.push({
      key:identityKey(row.identity),
      presentationId:row.presentationId,
      source:`regression:${row.caseId}`
    });
  }

  for(const step of smoke.steps){
    result.push({
      key:identityKey(step.identity),
      presentationId:step.presentationId,
      source:`smoke:${step.stepId}`
    });
  }

  for(const course of SCHOOL_COURSES){
    result.push({
      key:`course:${course.id}`,
      presentationId:course.presentationId,
      source:'school.ts'
    });
  }

  for(const entry of product.entries){
    if(entry.area==='school-lesson'){
      result.push({
        key:`course:${entry.gameplayId}`,
        presentationId:entry.presentationId,
        source:'product-coverage'
      });
    }
    if(entry.area==='lumber-ending'){
      result.push({
        key:`ending:${entry.gameplayId}`,
        presentationId:entry.presentationId,
        source:'product-coverage'
      });
    }
    if(entry.area==='lumber-milestone'){
      result.push({
        key:`event:${entry.gameplayId}:variant:default`,
        presentationId:entry.presentationId,
        source:'product-coverage'
      });
    }
    if(entry.area==='foreman-relationship'||entry.area==='foreman-night'){
      result.push({
        key:`event:${entry.gameplayId}:variant:default`,
        presentationId:entry.presentationId,
        source:'product-coverage'
      });
    }
  }

  result.push(
    {
      key:`event:${lumberPA.mappings.milestone.eventId}:variant:default`,
      presentationId:lumberPA.mappings.milestone.presentationId,
      source:'lumber-pa'
    },
    {
      key:`event:${lumberPA.mappings.foremanRelationship.openingEventId}:variant:default`,
      presentationId:lumberPA.mappings.foremanRelationship.presentationId,
      source:'lumber-pa'
    },
    {
      key:`event:${lumberPA.mappings.nightHook.eventId}:variant:default`,
      presentationId:lumberPA.mappings.nightHook.presentationId,
      source:'lumber-pa'
    },
    {
      key:`ending:${lumberPA.mappings.hardWorkEnding.endingId}`,
      presentationId:lumberPA.mappings.hardWorkEnding.presentationId,
      source:'lumber-pa'
    },
    {
      key:`ending:${lumberPA.mappings.complexEnding.endingId}`,
      presentationId:lumberPA.mappings.complexEnding.presentationId,
      source:'lumber-pa'
    }
  );

  return result;
}

function detectDrift(input:Claim[]){
  const byKey=new Map<string,{presentationId:string;sources:string[]}>();
  for(const claim of input){
    const existing=byKey.get(claim.key);
    if(!existing){
      byKey.set(claim.key,{presentationId:claim.presentationId,sources:[claim.source]});
      continue;
    }
    if(existing.presentationId!==claim.presentationId){
      throw new Error(
        `semantic presentationId drift for ${claim.key}: `+
        `${existing.presentationId} vs ${claim.presentationId} (`+
        `${[...existing.sources,claim.source].join(', ')})`
      );
    }
    existing.sources.push(claim.source);
  }
  return byKey;
}

test('all accumulated identity-bearing presentation fixtures agree on semantic IDs',()=>{
  const all=claims();
  const checked=detectDrift(all);
  assert.ok(checked.size>0);

  for(const claim of all){
    assert.match(claim.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/,claim.source);
    assert.equal(claim.presentationId.includes('.'),false,claim.source);
  }
});

test('patch-plan and shipped closure inventory expose the same semantic slot set',()=>{
  const planned=new Set(patchPlan.slots.map((slot:any)=>slot.presentationId));
  const inventoried=new Set(inventory.rows.map((row:any)=>row.presentationId));
  assert.deepEqual(inventoried,planned);
  assert.equal(planned.size,21);
});

test('School course semantic segments are kebab-case projection of underscore gameplay IDs',()=>{
  for(const course of SCHOOL_COURSES){
    const raw=course.id.slice('school.course.'.length);
    const expected=`school/${raw.replaceAll('_','-')}/lesson/default`;
    assert.equal(course.presentationId,expected,course.id);
    assert.equal(course.presentationId.includes('_'),false,course.id);
    assert.match(course.presentationId,/^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/);
  }
});

test('detector explicitly rejects dotted-vs-slash semantic drift',()=>{
  const all=claims();
  const target=all.find(claim=>claim.key==='event:lumber.career-first-shift:variant:default');
  assert.ok(target);
  const dotted={
    ...target,
    presentationId:target.presentationId.replaceAll('/','.'),
    source:'synthetic-dotted-drift'
  };
  assert.throws(()=>detectDrift([...all,dotted]),/semantic presentationId drift/);
});

test('detector explicitly rejects School underscore-vs-kebab drift',()=>{
  const all=claims();
  const target=all.find(claim=>claim.key==='course:school.course.literacy_and_numbers');
  assert.ok(target);
  const underscored={
    ...target,
    presentationId:'school/literacy_and_numbers/lesson/default',
    source:'synthetic-school-underscore-drift'
  };
  assert.throws(()=>detectDrift([...all,underscored]),/semantic presentationId drift/);
});
