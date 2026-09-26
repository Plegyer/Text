import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {presentationIdForEvent} from '../src/core/presentation.ts';
import type {Catalog} from '../src/core/schema.ts';

const parity=JSON.parse(readFileSync('content/lumber-shipped-pack-parity.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

const packs=[productionPack,crossPack,nightPack];
const byPackId=new Map(packs.map((pack:any)=>[pack.id,pack]));
const cat={
  definitions,
  packs,
  events:packs.flatMap((pack:any)=>pack.events),
  media:packs.flatMap((pack:any)=>pack.media)
} as Catalog;

function ids(entries:any[]|undefined){return (entries??[]).map(entry=>entry.id);}

function eventMediaIds(pack:any,eventIds:string[]){
  const selected=pack.events.filter((event:any)=>eventIds.includes(event.id));
  return [...new Set(selected.flatMap((event:any)=>
    event.variants.flatMap((variant:any)=>variant.media??[])
  ))];
}

function assertRequiredDefinitions(required:any){
  for(const id of required.actions)assert.ok(ids(definitions.actions).includes(id),`missing action ${id}`);
  for(const id of required.careers)assert.ok(ids(definitions.careers).includes(id),`missing career ${id}`);
  for(const id of required.relationships)assert.ok(ids(definitions.relationships).includes(id),`missing relationship ${id}`);
  for(const id of required.activities)assert.ok(ids(definitions.activities).includes(id),`missing activity ${id}`);
  for(const id of required.endings)assert.ok(ids(definitions.endings).includes(id),`missing ending ${id}`);
}

test('parity manifest covers exactly the three approved Lumber event families and pack IDs',()=>{
  assert.deepEqual(
    parity.families.map((family:any)=>family.id),
    [
      'career-foreman-progression',
      'school-forest-cross-system-return',
      'foreman-night-continuation'
    ]
  );
  assert.deepEqual(
    parity.families.map((family:any)=>family.packId),
    ['lumber','lumber-cross','lumber-night']
  );

  for(const family of parity.families){
    const pack=byPackId.get(family.packId);
    assert.ok(pack,`missing pack ${family.packId}`);
    assert.deepEqual(
      pack.events.map((event:any)=>event.id),
      family.eventIds,
      family.id
    );
  }
});

test('each family preserves exact read/write capability domains and required target definitions',()=>{
  for(const family of parity.families){
    const pack=byPackId.get(family.packId);
    assert.ok(pack);
    assert.deepEqual(pack.capabilities,family.capabilityDomains,family.id);
    assertRequiredDefinitions(family.requiredTargetDefinitions);
  }
});

test('required event media and semantic presentation IDs match shipped pack content',()=>{
  for(const family of parity.families){
    const pack=byPackId.get(family.packId);
    assert.ok(pack);

    assert.deepEqual(
      eventMediaIds(pack,family.eventIds),
      family.requiredMediaIds,
      family.id
    );

    for(const eventId of family.eventIds){
      const event=pack.events.find((entry:any)=>entry.id===eventId);
      assert.ok(event,`missing event ${eventId}`);
      assert.equal(
        presentationIdForEvent(cat,eventId,'default'),
        family.semanticPresentationIds[eventId],
        eventId
      );
      assert.ok(family.semanticPresentationIds[eventId].includes('/'),eventId);
    }

    for(const mediaId of family.requiredMediaIds){
      assert.ok(pack.media.some((media:any)=>media.id===mediaId),`missing media ${mediaId}`);
      assert.equal(mediaId.includes('/'),false,`media asset ID must remain distinct from semantic presentation ID: ${mediaId}`);
    }
  }
});

test('synthetic school.lumber-management is not a production requirement for shipped Lumber packs',()=>{
  assert.ok(ids(definitions.actions).includes('school.lumber-management'));
  assert.ok(parity.productionExclusions.includes('school.lumber-management'));

  for(const family of parity.families){
    assert.ok(!family.requiredTargetDefinitions.actions.includes('school.lumber-management'),family.id);
    assert.equal(JSON.stringify(family.requiredTargetDefinitions).includes('school.lumber-management'),false,family.id);
  }

  const cross=parity.families.find((family:any)=>family.id==='school-forest-cross-system-return');
  assert.ok(cross);
  assert.equal(cross.externalBoundaries.schoolPublicFact.productionProvider,'OPEN');
  assert.equal(cross.externalBoundaries.schoolPublicFact.syntheticProviderActionExcluded,'school.lumber-management');
});

test('Forest success continuation is driven by exact A5 activityResult boundary',()=>{
  const cross=byPackId.get('lumber-cross');
  assert.ok(cross);
  const event=cross.events.find((entry:any)=>entry.id==='lumber-cross.activity-forest-return');
  assert.ok(event);

  const expected={
    kind:'activityResult',
    activity:'lumber.forest',
    outcome:'success',
    result:'lumber.forest.success'
  };
  assert.deepEqual(event.reactionTriggers,[expected]);
  assert.deepEqual(parity.lockedContracts.activityContinuation,{
    boundaryKind:'activityResult',
    activityId:'lumber.forest',
    outcome:'success',
    resultId:'lumber.forest.success',
    eventId:'lumber-cross.activity-forest-return'
  });
});

test('no shipped event adds a second Hard Work prerequisite and exact hardWork:lumber survives unchanged',()=>{
  const hardWork=definitions.endings.find((ending:any)=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);

  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.deepEqual(parity.lockedContracts.hardWork,{
    endingId:'ending.lumber.hard-work',
    conditions:[
      {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
    ],
    metaReward:{kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  });

  for(const event of cat.events){
    const effects=event.choices.flatMap((choice:any)=>choice.effects??[]);
    assert.equal(
      effects.some((effect:any)=>
        effect.kind==='incrementCareerCounter'&&
        effect.career==='lumber'&&
        effect.counter==='completed_shifts'
      ),
      false,
      event.id
    );
  }
});
