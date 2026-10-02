import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/palace-authored-safe-v5.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

type LocalizedChoice={id:string;label:string;text:string};
type LocalizedScene={
  title:string;
  body:string;
  choices:LocalizedChoice[];
};

function assertLocalizedScenePair(scene:any,label:string){
  for(const locale of ['ru','en']){
    const value=scene[locale] as LocalizedScene;
    assert.ok(value,title(label,locale,'missing localized scene'));
    assert.ok(value.title.length>=4,title(label,locale,'title too short'));
    assert.ok(value.body.length>=20,title(label,locale,'body too short'));
    assert.ok(Array.isArray(value.choices)&&value.choices.length>=1,title(label,locale,'choices missing'));
    for(const choice of value.choices){
      assert.ok(choice.id.length>=1,title(label,locale,'choice id missing'));
      assert.ok(choice.label.length>=3,title(label,locale,`choice label too short: ${choice.id}`));
      assert.ok(choice.text.length>=10,title(label,locale,`choice text too short: ${choice.id}`));
    }
  }

  assert.deepEqual(
    scene.ru.choices.map((choice:LocalizedChoice)=>choice.id),
    scene.en.choices.map((choice:LocalizedChoice)=>choice.id),
    `${label}: RU/EN choice identities must match`
  );
}

function title(label:string,locale:string,message:string){
  return `${label} [${locale}]: ${message}`;
}

function allAuthoredText(value:any,key='root'):string[]{
  if(typeof value==='string'){
    if(['sceneId','choiceId','reactionId','relationshipId','roleId','purpose','capability','status'].includes(key))return [];
    return [value];
  }
  if(Array.isArray(value))return value.flatMap(item=>allAuthoredText(item,key));
  if(!value||typeof value!=='object')return [];
  return Object.entries(value).flatMap(([childKey,childValue])=>allAuthoredText(childValue,childKey));
}

test('v5 stays explicitly SAFE_PREP_UNBOUND with all unresolved shared bindings null',()=>{
  assert.equal(fixture.status,'SAFE_PREP_UNBOUND');
  assert.equal(fixture.binding.livePack,false);
  assert.equal(fixture.binding.sharedD23Condition,null);
  assert.equal(fixture.binding.sharedNewStartPlusBinding,null);
  assert.equal(fixture.binding.sharedCapBinding,null);
  assert.equal(fixture.binding.careerTopologyBinding,null);
  assert.equal(fixture.binding.princeConfrontationBinding,null);
  assert.equal(fixture.openBoundaries.princeConfrontationMechanics,null);
  assert.equal(fixture.openBoundaries.palaceCareerTopology,null);
  assert.equal(fixture.openBoundaries.palaceCareerProductionIds,null);
  assert.equal(fixture.openBoundaries.sharedD23RuntimeIds,null);
});

test('Day-1 invitation identity is deterministic and contains no substitute gate',()=>{
  assert.deepEqual(fixture.entryContract,{
    day:1,
    trigger:'creationCompleted',
    delivery:'latched',
    deterministic:true,
    requiresPermanentTenOfTen:true,
    requiresActiveTenOfTenPackages:true,
    randomGate:false,
    statGate:false,
    itemGate:false,
    legacyItemSubstitution:false
  });

  assert.deepEqual(
    fixture.entryFlow.map((scene:any)=>scene.sceneId),
    [
      'palace.invitation.day1-arrival',
      'palace.invitation.reveal',
      'palace.entry.gates'
    ]
  );

  for(const scene of fixture.entryFlow)assertLocalizedScenePair(scene,scene.sceneId);
  assert.deepEqual(
    fixture.entryFlow[1].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['accept']
  );
  assert.match(fixture.entryFlow[1].en.choices[0].text,/open access to Palace work/i);
});

test('first-day orientation is bilingual and does not assign a final Palace title or topology',()=>{
  assert.deepEqual(
    fixture.orientationFlow.map((scene:any)=>scene.sceneId),
    ['palace.orientation.first-day','palace.orientation.handoff']
  );
  for(const scene of fixture.orientationFlow)assertLocalizedScenePair(scene,scene.sceneId);

  const text=fixture.orientationFlow.flatMap((scene:any)=>[
    scene.ru.title,scene.ru.body,...scene.ru.choices.flatMap((choice:any)=>[choice.label,choice.text]),
    scene.en.title,scene.en.body,...scene.en.choices.flatMap((choice:any)=>[choice.label,choice.text])
  ]).join(' ').toLowerCase();

  assert.equal(text.includes('princess'),false);
  assert.equal(text.includes('queen'),false);
  assert.equal(text.includes('court title'),false);
  assert.equal(text.includes('stage 3'),false);
  assert.equal(text.includes('stage 6'),false);
});

test('all four authorized generic relationship roles have stable unique identities',()=>{
  assert.deepEqual(
    Object.values(fixture.relationships).map((route:any)=>route.roleId),
    ['professional-patron','rival','servant-or-official-contact','optional-romance']
  );
  assert.deepEqual(
    Object.values(fixture.relationships).map((route:any)=>route.relationshipId),
    [
      'palace.professional-patron',
      'palace.rival',
      'palace.official-contact',
      'palace.optional-romance'
    ]
  );
  assert.equal(new Set(Object.values(fixture.relationships).map((route:any)=>route.relationshipId)).size,4);

  for(const route of Object.values(fixture.relationships) as any[]){
    assert.equal(route.requiredForAccess,false,route.relationshipId);
    assert.equal(route.requiredForCareerCompletion,false,route.relationshipId);
    for(const scene of route.scenes)assertLocalizedScenePair(scene,scene.sceneId);
  }
});

test('professional patron route includes intro, trust and refusal-safe conflict resolution',()=>{
  const route=fixture.relationships.professionalPatron;
  assert.deepEqual(
    route.scenes.map((scene:any)=>scene.sceneId),
    [
      'palace.relationship.patron.intro',
      'palace.relationship.patron.trust',
      'palace.relationship.patron.conflict'
    ]
  );

  const conflict=route.scenes[2];
  assert.deepEqual(
    conflict.en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['clarify','decline','step-away']
  );
  assert.match(conflict.en.choices.find((choice:any)=>choice.id==='decline').text,/without ending professional cooperation|without.*losing access/i);
  assert.match(conflict.en.choices.find((choice:any)=>choice.id==='step-away').text,/keeping ordinary work/i);
});

test('rival route supports cooperation, bounded competition and safe disengagement',()=>{
  const route=fixture.relationships.rival;
  assert.deepEqual(
    route.scenes.map((scene:any)=>scene.sceneId),
    [
      'palace.relationship.rival.intro',
      'palace.relationship.rival.cooperation',
      'palace.relationship.rival.conflict'
    ]
  );

  assert.deepEqual(
    route.scenes[1].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['cooperate','parallel']
  );
  assert.deepEqual(
    route.scenes[2].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['correct-record','share-credit','disengage']
  );
  assert.match(route.scenes[2].en.choices[2].text,/keeping ordinary Palace work available/i);
});

test('servant or official contact route offers practical help and refusal-safe boundaries',()=>{
  const route=fixture.relationships.officialContact;
  assert.deepEqual(
    route.scenes.map((scene:any)=>scene.sceneId),
    [
      'palace.relationship.contact.intro',
      'palace.relationship.contact.practical-help',
      'palace.relationship.contact.boundary'
    ]
  );

  assert.deepEqual(
    route.scenes[2].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['help-within-role','decline','step-away']
  );
  assert.match(route.scenes[2].en.choices[1].text,/keep the professional relationship intact/i);
  assert.match(route.scenes[2].en.choices[2].text,/Ordinary Palace work remains available/i);
});

test('romance remains optional, decline-safe and irrelevant to access/career/endings',()=>{
  const route=fixture.relationships.optionalRomance;
  assert.equal(route.requiredForAccess,false);
  assert.equal(route.requiredForCareerCompletion,false);
  assert.equal(route.requiredForAnyEnding,false);

  assert.deepEqual(
    route.scenes.map((scene:any)=>scene.sceneId),
    [
      'palace.relationship.romance.invitation',
      'palace.relationship.romance.mode'
    ]
  );

  assert.deepEqual(
    route.scenes[0].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['consider','professional','decline']
  );
  assert.match(route.scenes[0].en.choices[2].text,/without any penalty to career progress, access, or other relationships/i);

  assert.deepEqual(
    route.scenes[1].en.choices.map((choice:LocalizedChoice)=>choice.id),
    ['friendship','romance','close']
  );
  assert.match(route.scenes[1].en.choices[2].text,/Palace work continues as usual/i);
});

test('Palace Night authored choices stay voluntary and never claim forced-night ownership',()=>{
  assert.deepEqual(
    fixture.voluntaryNight.map((choice:any)=>choice.choiceId),
    ['palace.night.work-review','palace.night.social-conversation']
  );

  for(const choice of fixture.voluntaryNight){
    assert.equal(choice.forced,false,choice.choiceId);
    assert.equal(choice.ownsForcedNight,false,choice.choiceId);
    assert.equal(choice.consumesNormalNightChoice,true,choice.choiceId);
    assert.equal(choice.requiresPalaceAccess,true,choice.choiceId);
    for(const locale of ['ru','en']){
      assert.ok(choice[locale].label.length>=5);
      assert.ok(choice[locale].body.length>=30);
      assert.ok(choice[locale].result.length>=20);
    }
  }

  assert.match(fixture.voluntaryNight[0].en.body,/normal night choice/i);
  assert.match(fixture.voluntaryNight[1].en.body,/without turning the evening into a mandatory social scene/i);
});

test('legacy item reactions use only shipped capabilities and are never entry gates',()=>{
  const shipped=new Set(
    (definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[])
  );
  const ids=fixture.legacyItemReactions.map((reaction:any)=>reaction.reactionId);
  assert.equal(new Set(ids).size,ids.length);

  for(const reaction of fixture.legacyItemReactions){
    assert.ok(shipped.has(reaction.capability),reaction.capability);
    assert.equal(reaction.entryGate,false,reaction.reactionId);
    assert.equal(reaction.grantsAccess,false,reaction.reactionId);
    assert.ok(reaction.ru.length>=30,reaction.reactionId);
    assert.ok(reaction.en.length>=30,reaction.reactionId);
  }

  assert.match(
    fixture.legacyItemReactions.find((reaction:any)=>reaction.capability==='artist_handle_invitation').en,
    /not the reason Palace access exists/i
  );
  assert.match(
    fixture.legacyItemReactions.find((reaction:any)=>reaction.capability==='official_guard_access').en,
    /never substitutes for the Day-1 invitation/i
  );
});

test('True Ending authored readiness uses fixed all-12 >=91 semantics with Lust excluded',()=>{
  const readiness=fixture.trueEndingReadiness;
  assert.equal(readiness.progressionStatCount,12);
  assert.equal(readiness.minimumEach,91);
  assert.equal(readiness.lustIncluded,false);
  assert.equal(readiness.normalizesAgainstActiveCap,false);

  assert.match(readiness.en.notReady,/each of the 12 progression stats must be at least 91/i);
  assert.match(readiness.en.notReady,/Lust is not part/i);
  assert.match(readiness.en.ready,/All 12 progression stats.*at least 91/i);
  assert.match(readiness.en.cap200Life,/maximum stat value.*200/i);
  assert.match(readiness.en.cap200Life,/at least 91 in each of the 12 progression stats/i);

  assert.match(readiness.ru.notReady,/12 характеристик.*не ниже 91/i);
  assert.match(readiness.ru.notReady,/Похоть не входит/i);
});

test('cap-200 copy says maximum becomes 200 and never describes stat values as doubling',()=>{
  const reward=fixture.cap200Reward;
  assert.equal(reward.baseMaximum,100);
  assert.equal(reward.unlockedMaximum,200);
  assert.equal(reward.multipliesValues,false);
  assert.equal(reward.multipliesStartingBonuses,false);
  assert.equal(reward.multipliesAllocationPoints,false);
  assert.equal(reward.affectsLust,false);

  assert.match(reward.en.body,/maximum of each of the 12 progression stats becomes 200 instead of 100/i);
  assert.match(reward.en.body,/not multiplied/i);
  assert.match(reward.ru.body,/максимум каждой из 12 характеристик развития становится 200 вместо 100/i);
  assert.match(reward.ru.body,/не умножаются/i);

  const authoredText=allAuthoredText(fixture).join(' ').toLowerCase();
  assert.equal(/stats? double|stats? doubled|doubl(e|ed|ing) the stats/.test(authoredText),false);
  assert.equal(/характеристик[аи] удва|удвоен|удвоить характеристики/.test(authoredText),false);
});

test('all scene identities are unique across entry, orientation and relationship content',()=>{
  const ids:string[]=[
    ...fixture.entryFlow.map((scene:any)=>scene.sceneId),
    ...fixture.orientationFlow.map((scene:any)=>scene.sceneId),
    ...Object.values(fixture.relationships).flatMap((route:any)=>route.scenes.map((scene:any)=>scene.sceneId))
  ];
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ids)assert.match(id,/^palace\./);
});

test('fallbacks are bilingual and preserve the same safety boundaries',()=>{
  for(const [slot,value] of Object.entries(fixture.fallbacks) as [string,any][]){
    assert.ok(value.ru.length>=10,slot);
    assert.ok(value.en.length>=10,slot);
  }

  assert.match(fixture.fallbacks.relationshipDecline.en,/does not block Palace work/i);
  assert.match(fixture.fallbacks.night.en,/voluntary night choice/i);
  assert.match(fixture.fallbacks.trueEndingStats.en,/At least 91.*12 progression stats/i);
  assert.match(fixture.fallbacks.cap200.en,/maximum.*becomes 200 instead of 100/i);
  assert.match(fixture.fallbacks.cap200.en,/not multiplied/i);
});

test('authored player-facing text does not invent Prince mechanics or a final Palace stage topology',()=>{
  const authoredText=allAuthoredText({
    entryFlow:fixture.entryFlow,
    orientationFlow:fixture.orientationFlow,
    relationships:fixture.relationships,
    voluntaryNight:fixture.voluntaryNight,
    legacyItemReactions:fixture.legacyItemReactions,
    trueEndingReadiness:fixture.trueEndingReadiness,
    cap200Reward:fixture.cap200Reward,
    fallbacks:fixture.fallbacks
  }).join(' ').toLowerCase();

  assert.equal(authoredText.includes('prince'),false);
  assert.equal(authoredText.includes('boss fight'),false);
  assert.equal(authoredText.includes('duel'),false);
  assert.equal(authoredText.includes('three-stage'),false);
  assert.equal(authoredText.includes('six-stage'),false);
  assert.equal(authoredText.includes('stage 3'),false);
  assert.equal(authoredText.includes('stage 6'),false);
});
