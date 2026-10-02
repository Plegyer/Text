import test from 'node:test';
import assert from 'node:assert/strict';

import {
  hasRequiredPalaceProgressionEvidence,
  palaceDiscoveryPolicy,
  palaceLegacyOpportunityCareers,
  palaceOutcomeFamilies,
  palaceTrueEndingEligibility,
  palaceTrueEndingProgressionStats,
  palaceTrueEndingResult,
  palaceUnlockProgress,
  palaceUnlockSatisfied
} from '../src/core/palace.ts';
import {ordinaryHardWorkCareers,stats,type Stat} from '../src/core/schema.ts';

function percentages(value:number):Record<Stat,number>{
  return Object.fromEntries(stats.map(stat=>[stat,value])) as Record<Stat,number>;
}

test('Palace unlock counts only the ten unique ordinary Hard Work careers',()=>{
  const withDuplicates=[...ordinaryHardWorkCareers,'lumber','lumber','secret-debt'];
  const progress=palaceUnlockProgress(withDuplicates);
  assert.equal(progress.unlocked,true);
  assert.deepEqual(progress.completedOrdinary,[...ordinaryHardWorkCareers]);
  assert.deepEqual(progress.missingOrdinary,[]);
  assert.equal(palaceUnlockSatisfied(withDuplicates),true);
});

test('Secret Debt and duplicate Hard Work never substitute for a missing ordinary career',()=>{
  const firstNine=ordinaryHardWorkCareers.slice(0,9);
  const input=[...firstNine,'secret-debt',firstNine[0],firstNine[0]];
  const progress=palaceUnlockProgress(input);
  assert.equal(progress.unlocked,false);
  assert.deepEqual(progress.missingOrdinary,[ordinaryHardWorkCareers[9]]);
  assert.equal(palaceUnlockSatisfied(input),false);
});

test('locked Palace outcome families remain three distinct families',()=>{
  assert.deepEqual(palaceOutcomeFamilies,['service-life','court-power','inner-truth']);
  assert.equal(new Set(palaceOutcomeFamilies).size,3);
});

test('Palace progression evidence requires every locked evidence category without inventing thresholds',()=>{
  const complete={
    hasPalaceShiftEvidence:true,
    hasBuildCheckEvidence:true,
    hasExternalFact:true,
    hasPalaceDecision:true,
    hasLegacyOpportunity:true
  };
  assert.equal(hasRequiredPalaceProgressionEvidence(complete),true);

  for(const key of Object.keys(complete) as (keyof typeof complete)[]){
    assert.equal(hasRequiredPalaceProgressionEvidence({...complete,[key]:false}),false,key);
  }
});

test('D18 stat gate uses all twelve progression percentages, strictly above 90, with Lust excluded',()=>{
  assert.equal(palaceTrueEndingProgressionStats.length,12);
  assert.deepEqual(palaceTrueEndingProgressionStats,stats);
  assert.equal((palaceTrueEndingProgressionStats as readonly string[]).includes('lust'),false);

  const ready=palaceTrueEndingEligibility({
    palaceUnlocked:true,
    progressionPercentByStat:percentages(91),
    princeVictory:true
  });
  assert.deepEqual(ready,{eligible:true,missing:[]});

  const exactNinety=percentages(91);
  exactNinety.strength=90;
  assert.deepEqual(
    palaceTrueEndingEligibility({palaceUnlocked:true,progressionPercentByStat:exactNinety,princeVictory:true}),
    {eligible:false,missing:['progression-stats']}
  );
});

test('D18 eligibility independently requires Palace unlock and Prince victory',()=>{
  const result=palaceTrueEndingEligibility({
    palaceUnlocked:false,
    progressionPercentByStat:percentages(91),
    princeVictory:false
  });
  assert.deepEqual(result,{
    eligible:false,
    missing:['palace-unlock','prince-victory']
  });
});

test('D18 percentage input stays semantic and does not encode raw cap conversion',()=>{
  const overHundred=percentages(101);
  assert.equal(palaceTrueEndingEligibility({
    palaceUnlocked:true,
    progressionPercentByStat:overHundred,
    princeVictory:true
  }).eligible,true);

  const invalid=percentages(91);
  invalid.magic=Number.NaN;
  assert.deepEqual(
    palaceTrueEndingEligibility({palaceUnlocked:true,progressionPercentByStat:invalid,princeVictory:true}),
    {eligible:false,missing:['progression-stats']}
  );
});

test('True Ending semantic result records Return Home and permanent optional x2 capability only',()=>{
  assert.deepEqual(palaceTrueEndingResult,{
    returnsHome:true,
    grantsPermanentOptionalDoubleAllProgressionStats:true
  });
  assert.deepEqual(Object.keys(palaceTrueEndingResult).sort(),[
    'grantsPermanentOptionalDoubleAllProgressionStats',
    'returnsHome'
  ]);
});


test('Palace legacy opportunity inputs derive only from the published ordinary Hard Work ledger',()=>{
  const input=['lumber','artist-geisha','assassin','prostitute','secret-debt','assassin'];
  assert.deepEqual(
    palaceLegacyOpportunityCareers(input),
    ['lumber','artist-geisha','assassin','prostitute']
  );
});

test('Palace discovery policy exposes no numeric Hard Work progress before unlock',()=>{
  assert.deepEqual(palaceDiscoveryPolicy,{showNumericHardWorkProgressBeforeUnlock:false});
});
