import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  PALACE_ACCESS_FACT,
  PALACE_BASE_STAT_CAP,
  PALACE_TRUE_ENDING_LEGACY_STAT_CAP,
  PALACE_TRUE_ENDING_STAT_THRESHOLD,
  initialPalaceAccessState,
  normalizeEarnedActiveHardWorkPackages,
  palaceAvailableLegacyItemCapabilities,
  palaceCap200LegacyContract,
  palaceInvitationContract,
  palaceOptionalLegacyItemCapabilities,
  palaceRelationshipMachineSkeletons,
  palaceRunGate,
  palaceTrueEndingStatGate,
  palaceVoluntaryNightContract,
  resolvePalaceInvitation
} from '../src/core/palaceSafePrep.ts';
import {
  machineDefinitionSchema,
  ordinaryHardWorkCareers,
  stats,
  type Stat
} from '../src/core/schema.ts';

const fixture=JSON.parse(readFileSync('content/palace-safe-prep-v4.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

function statValues(value:number):Record<Stat,number>{
  return Object.fromEntries(stats.map(stat=>[stat,value])) as Record<Stat,number>;
}

test('D23 Palace gate requires permanent 10/10 and active 10/10 career packages',()=>{
  const ten=[...ordinaryHardWorkCareers];
  const nine=ten.slice(0,9);

  assert.equal(palaceRunGate({
    permanentHardWorkCareers:nine,
    activeHardWorkCareerPackages:nine
  }).eligible,false);

  assert.equal(palaceRunGate({
    permanentHardWorkCareers:ten,
    activeHardWorkCareerPackages:[]
  }).eligible,false);

  assert.deepEqual(palaceRunGate({
    permanentHardWorkCareers:ten,
    activeHardWorkCareerPackages:nine
  }),{
    eligible:false,
    missingPermanent:[],
    missingActive:[ordinaryHardWorkCareers[9]]
  });

  assert.deepEqual(palaceRunGate({
    permanentHardWorkCareers:ten,
    activeHardWorkCareerPackages:ten
  }),{
    eligible:true,
    missingPermanent:[],
    missingActive:[]
  });
});

test('Secret Debt and duplicates never substitute in the D23 active package set',()=>{
  const ten=[...ordinaryHardWorkCareers];
  const nine=ten.slice(0,9);

  const missingWithHidden=palaceRunGate({
    permanentHardWorkCareers:[...ten,'secret-debt'],
    activeHardWorkCareerPackages:[...nine,'secret-debt',nine[0],nine[0]]
  });
  assert.equal(missingWithHidden.eligible,false);
  assert.deepEqual(missingWithHidden.missingActive,[ordinaryHardWorkCareers[9]]);

  assert.equal(palaceRunGate({
    permanentHardWorkCareers:[...ten,'secret-debt'],
    activeHardWorkCareerPackages:[...ten,'secret-debt']
  }).eligible,true);
});

test('run package normalization keeps only unique earned ordinary career packages',()=>{
  assert.deepEqual(
    normalizeEarnedActiveHardWorkPackages(
      ['lumber','guard','artist-geisha','secret-debt'],
      ['lumber','lumber','guard','merchant','secret-debt','artist-geisha']
    ),
    ['lumber','guard','artist-geisha']
  );
});

test('Day-1 invitation contract is deterministic, latched and has no alternate entry gate',()=>{
  assert.deepEqual(palaceInvitationContract.trigger,{kind:'creationCompleted'});
  assert.equal(palaceInvitationContract.calendarElapsedDay,0);
  assert.equal(palaceInvitationContract.deliveryPolicy,'latched');
  assert.equal(palaceInvitationContract.priorityClass,'critical_progression');
  assert.equal(palaceInvitationContract.blocking,true);
  assert.equal(palaceInvitationContract.maxShows,1);
  assert.equal(palaceInvitationContract.usesGameplayRng,false);
  assert.equal(palaceInvitationContract.requiresStatGate,false);
  assert.equal(palaceInvitationContract.requiresItemGate,false);
  assert.equal(palaceInvitationContract.grantsAccessFact,PALACE_ACCESS_FACT);
});

test('Palace-local invitation state is serializable and resolution alone grants access',()=>{
  const ineligible=initialPalaceAccessState(false);
  assert.deepEqual(ineligible,{invitation:'ineligible',accessGranted:false});
  assert.deepEqual(resolvePalaceInvitation(ineligible),ineligible);

  const queued=initialPalaceAccessState(true);
  const reloaded=JSON.parse(JSON.stringify(queued));
  assert.deepEqual(reloaded,{invitation:'queued',accessGranted:false});
  assert.deepEqual(resolvePalaceInvitation(reloaded),{
    invitation:'resolved',
    accessGranted:true
  });
});

test('D18 fixed stat threshold is >=91 and does not renormalize against cap 200',()=>{
  assert.equal(PALACE_TRUE_ENDING_STAT_THRESHOLD,91);
  assert.equal(stats.length,12);
  assert.equal((stats as readonly string[]).includes('lust'),false);

  assert.deepEqual(palaceTrueEndingStatGate(statValues(91)),{
    satisfied:true,
    belowThreshold:[]
  });

  const exactNinety=statValues(91);
  exactNinety.strength=90;
  assert.deepEqual(palaceTrueEndingStatGate(exactNinety),{
    satisfied:false,
    belowThreshold:['strength']
  });

  assert.equal(palaceTrueEndingStatGate(statValues(181)).satisfied,true);
  assert.equal(palaceTrueEndingStatGate(statValues(200)).satisfied,true,
    'cap-200 lives must retain the fixed 91+ D18 threshold');
});

test('D24 cap reward changes only the 12-stat cap and multiplies nothing',()=>{
  assert.equal(PALACE_BASE_STAT_CAP,100);
  assert.equal(PALACE_TRUE_ENDING_LEGACY_STAT_CAP,200);
  assert.deepEqual(palaceCap200LegacyContract.affectedStats,stats);
  assert.equal(palaceCap200LegacyContract.baseCap,100);
  assert.equal(palaceCap200LegacyContract.activeCap,200);
  assert.equal(palaceCap200LegacyContract.multipliesCurrentValues,false);
  assert.equal(palaceCap200LegacyContract.multipliesStartingValues,false);
  assert.equal(palaceCap200LegacyContract.multipliesHardWorkBonuses,false);
  assert.equal(palaceCap200LegacyContract.multipliesManualAllocationPoints,false);
  assert.equal(palaceCap200LegacyContract.affectsLust,false);
});

test('generic Palace relationship skeletons are schema-valid and romance is optional',()=>{
  assert.deepEqual(
    palaceRelationshipMachineSkeletons.map(machine=>machine.id),
    [
      'palace.professional-patron',
      'palace.rival',
      'palace.official-contact',
      'palace.optional-romance'
    ]
  );
  for(const machine of palaceRelationshipMachineSkeletons){
    assert.doesNotThrow(()=>machineDefinitionSchema.parse(machine),machine.id);
  }
  const romance=palaceRelationshipMachineSkeletons.find(machine=>machine.id==='palace.optional-romance');
  assert.ok(romance);
  assert.ok(romance.transitions.some(t=>t.id==='resolve-non-romance'));
  assert.ok(romance.transitions.some(t=>t.id==='resolve-romance'));
});

test('Palace Night prep is voluntary and cannot bypass a forced Night owner',()=>{
  assert.equal(palaceVoluntaryNightContract.voluntary,true);
  assert.equal(palaceVoluntaryNightContract.forced,false);
  assert.equal(palaceVoluntaryNightContract.requiresAccessFact,PALACE_ACCESS_FACT);
  assert.equal(palaceVoluntaryNightContract.consumesExistingVoluntaryNightChoice,true);
  assert.equal(palaceVoluntaryNightContract.bypassesForcedNight,false);
  assert.equal(palaceVoluntaryNightContract.writesPalaceLocalEvidenceOnly,true);
});

test('optional legacy item capabilities exist on shipped items and never participate in the D23 gate',()=>{
  const shippedCapabilities=new Set(
    (definitions.itemDefinitions??[]).flatMap((item:any)=>item.capabilities??[])
  );
  for(const capability of palaceOptionalLegacyItemCapabilities){
    assert.ok(shippedCapabilities.has(capability),capability);
  }

  assert.deepEqual(
    palaceAvailableLegacyItemCapabilities([
      'artist_formal_presence',
      'merchant_handle_samples',
      'not-a-palace-capability'
    ]),
    ['artist_formal_presence','merchant_handle_samples']
  );

  const ten=[...ordinaryHardWorkCareers];
  assert.equal(palaceRunGate({
    permanentHardWorkCareers:ten,
    activeHardWorkCareerPackages:ten.slice(0,9)
  }).eligible,false,
  'owning optional item capabilities cannot replace the missing tenth active package');
});

test('v4 authored fixture is explicitly unbound and bilingual at every player-facing Palace prep surface',()=>{
  assert.equal(fixture.status,'SAFE_PREP_UNBOUND');
  assert.equal(fixture.sharedDependencies.liveConditionBinding,null);
  assert.equal(fixture.sharedDependencies.capInfrastructureBinding,null);
  assert.equal(fixture.invitation.contract.deliveryPolicy,'latched');
  assert.equal(fixture.invitation.contract.usesGameplayRng,false);
  assert.equal(fixture.invitation.contract.requiresStatGate,false);
  assert.equal(fixture.invitation.contract.requiresItemGate,false);

  for(const language of ['ru','en']){
    assert.ok(fixture.invitation[language].title.length>5);
    assert.ok(fixture.invitation[language].text.length>30);
    assert.ok(fixture.invitation[language].choice.length>5);
    assert.ok(fixture.invitation[language].entry.length>10);
    assert.ok(fixture.night[language].label.length>5);
    assert.ok(fixture.night[language].text.length>30);
  }

  for(const fallback of Object.values(fixture.fallbacks) as any[]){
    assert.ok(fallback.ru.length>10);
    assert.ok(fallback.en.length>10);
  }

  for(const relationship of fixture.relationships){
    assert.ok(relationship.ru.length>30);
    assert.ok(relationship.en.length>30);
  }
});

test('v4 copy reflects cap-only 200 and keeps unresolved Prince/topology details out',()=>{
  const raw=JSON.stringify(fixture);
  assert.match(fixture.fallbacks.trueEndingRequirement.en,/at least 91/i);
  assert.match(fixture.fallbacks.capReward.en,/cap.*100 to 200/i);
  assert.match(fixture.fallbacks.capReward.en,/not multiplied/i);
  assert.equal(raw.includes('hardWork:palace'),false);
  assert.equal(raw.toLowerCase().includes('prince name'),false);
  assert.equal(fixture.openBoundaries.princeConfrontationMechanics,null);
  assert.equal(fixture.openBoundaries.palaceCareerTopology,null);
  assert.equal(fixture.openBoundaries.palaceCareerProductionIds,null);
});
