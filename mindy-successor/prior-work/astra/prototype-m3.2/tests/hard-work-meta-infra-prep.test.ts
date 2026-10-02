import test from 'node:test';
import assert from 'node:assert/strict';

import {
  allHardWorkPackagesActive,
  allOrdinaryHardWorkEarned,
  applyHardWorkPackagesAtCreation,
  ordinaryCareerAvailableWithHardWork,
  palaceNewStartQualified,
  validateHardWorkPackageDefinitions,
  validateHardWorkPackageSelection,
  type HardWorkPackageDefinition
} from '../src/core/hardWorkMeta.ts';
import {
  ordinaryHardWorkCareers,
  stats,
  type OrdinaryHardWorkCareer,
  type Stat
} from '../src/core/schema.ts';

function syntheticDefinitions(): HardWorkPackageDefinition[] {
  // Synthetic structure fixture only. Stat positions deliberately follow array indices
  // and are not a production profession -> stat mapping proposal.
  return ordinaryHardWorkCareers.map((career, index) => {
    const first = stats[index % stats.length]!;
    const statBonuses = index < 5
      ? [{stat:first, amount:5 as const}]
      : [
          {stat:first, amount:5 as const},
          {stat:stats[(index + 1) % stats.length]!, amount:5 as const}
        ];
    return {
      career,
      statBonuses,
      ...(index === 5 ? {lustBonus:3} : {})
    };
  });
}

function baselineStats(value=1): Record<Stat, number> {
  return Object.fromEntries(stats.map(stat => [stat, value])) as Record<Stat, number>;
}

function expectedAfter(
  definitions: readonly HardWorkPackageDefinition[],
  active: readonly OrdinaryHardWorkCareer[],
  cap=100
): Record<Stat, number> {
  const result=baselineStats();
  for(const career of active){
    const definition=definitions.find(item=>item.career===career)!;
    for(const bonus of definition.statBonuses){
      result[bonus.stat]=Math.min(cap,result[bonus.stat]+bonus.amount);
    }
  }
  return result;
}

test('generic validator accepts synthetic D21-D22 package structure without production mapping',()=>{
  const definitions=syntheticDefinitions();
  assert.doesNotThrow(()=>validateHardWorkPackageDefinitions(definitions));
  assert.equal(definitions.slice(0,5).every(item=>item.statBonuses.length===1),true);
  assert.equal(definitions.slice(5).every(item=>item.statBonuses.length===2),true);
  assert.equal(definitions.some(item=>(item.lustBonus??0)>=3),true);
});

test('validator rejects missing/duplicate careers, invalid breadth, non-+5 stat effects, and missing/weak Lust',()=>{
  const valid=syntheticDefinitions();

  assert.throws(
    ()=>validateHardWorkPackageDefinitions(valid.slice(0,-1)),
    /cover exactly 10 ordinary careers/i
  );

  const duplicate=[...valid];
  duplicate[9]={...duplicate[9]!,career:duplicate[8]!.career};
  assert.throws(()=>validateHardWorkPackageDefinitions(duplicate),/duplicate hard work package/i);

  const firstFiveTooWide=[...valid];
  firstFiveTooWide[0]={...firstFiveTooWide[0]!,statBonuses:[
    ...firstFiveTooWide[0]!.statBonuses,
    {stat:stats[11],amount:5}
  ]};
  assert.throws(()=>validateHardWorkPackageDefinitions(firstFiveTooWide),/first-five.*exactly one/i);

  const laterTooWide=[...valid];
  laterTooWide[5]={...laterTooWide[5]!,statBonuses:[
    ...laterTooWide[5]!.statBonuses,
    {stat:stats[11],amount:5}
  ]};
  assert.throws(()=>validateHardWorkPackageDefinitions(laterTooWide),/later-five.*one or two/i);

  const wrongAmount=structuredClone(valid) as unknown as Array<{
    career:OrdinaryHardWorkCareer;
    statBonuses:Array<{stat:Stat;amount:number}>;
    lustBonus?:number;
  }>;
  wrongAmount[0]!.statBonuses[0]!.amount=4;
  assert.throws(
    ()=>validateHardWorkPackageDefinitions(wrongAmount as unknown as HardWorkPackageDefinition[]),
    /exactly \+5/i
  );

  const weakLust=valid.map(item=>({...item,lustBonus:undefined})) as unknown as HardWorkPackageDefinition[];
  (weakLust[5] as {lustBonus?:number}).lustBonus=2;
  assert.throws(()=>validateHardWorkPackageDefinitions(weakLust),/lust bonus.*>= \+3/i);

  const noLust=valid.map(({lustBonus:_lustBonus,...item})=>item) as HardWorkPackageDefinition[];
  assert.throws(()=>validateHardWorkPackageDefinitions(noLust),/at least one.*lust/i);
});

test('New Start+ selection supports none, some, and all earned packages; rejects duplicate or unearned selection',()=>{
  const all=[...ordinaryHardWorkCareers];

  assert.deepEqual(validateHardWorkPackageSelection([],all),[]);
  assert.deepEqual(
    validateHardWorkPackageSelection([ordinaryHardWorkCareers[1],ordinaryHardWorkCareers[7]],all),
    [ordinaryHardWorkCareers[1],ordinaryHardWorkCareers[7]]
  );
  assert.deepEqual(validateHardWorkPackageSelection(all,all),all);

  assert.throws(
    ()=>validateHardWorkPackageSelection([ordinaryHardWorkCareers[0],ordinaryHardWorkCareers[0]],all),
    /duplicate active hard work package/i
  );
  assert.throws(
    ()=>validateHardWorkPackageSelection([ordinaryHardWorkCareers[9]],ordinaryHardWorkCareers.slice(0,9)),
    /not earned/i
  );
});

test('package application is atomic at creation completion and exactly-once for none/some/all selections',()=>{
  const definitions=syntheticDefinitions();
  const all=[...ordinaryHardWorkCareers];
  const base={stats:baselineStats(),lust:1,packagesApplied:false};

  const none=applyHardWorkPackagesAtCreation({
    definitions,
    earnedHardWork:all,
    activePackages:[],
    snapshot:base,
    progressionStatCap:100
  });
  assert.deepEqual(none.stats,baselineStats());
  assert.equal(none.lust,1);
  assert.equal(none.packagesApplied,true);
  assert.equal(none.newlyApplied,true);
  assert.deepEqual(none.appliedPackages,[]);

  const someActive=[ordinaryHardWorkCareers[0],ordinaryHardWorkCareers[5]] as const;
  const some=applyHardWorkPackagesAtCreation({
    definitions,
    earnedHardWork:all,
    activePackages:someActive,
    snapshot:base,
    progressionStatCap:100
  });
  assert.deepEqual(some.stats,expectedAfter(definitions,someActive));
  assert.equal(some.lust,4);
  assert.equal(some.newlyApplied,true);

  const sameAgain=applyHardWorkPackagesAtCreation({
    definitions,
    earnedHardWork:all,
    activePackages:someActive,
    snapshot:{stats:some.stats,lust:some.lust,packagesApplied:some.packagesApplied},
    progressionStatCap:100
  });
  assert.deepEqual(sameAgain.stats,some.stats);
  assert.equal(sameAgain.lust,some.lust);
  assert.equal(sameAgain.newlyApplied,false);

  const allApplied=applyHardWorkPackagesAtCreation({
    definitions,
    earnedHardWork:all,
    activePackages:all,
    snapshot:base,
    progressionStatCap:100
  });
  assert.deepEqual(allApplied.stats,expectedAfter(definitions,all));
  assert.equal(allApplied.lust,4);
  assert.deepEqual(allApplied.appliedPackages,all);
});

test('package application uses the supplied progression cap without multiplying start values or +5 effects',()=>{
  const definitions=syntheticDefinitions();
  const active=[ordinaryHardWorkCareers[0]];
  const targetedStat=definitions[0]!.statBonuses[0]!.stat;
  const nearCap=baselineStats();
  nearCap[targetedStat]=198;

  const result=applyHardWorkPackagesAtCreation({
    definitions,
    earnedHardWork:active,
    activePackages:active,
    snapshot:{stats:nearCap,lust:1,packagesApplied:false},
    progressionStatCap:200
  });

  assert.equal(result.stats[targetedStat],200);
  assert.equal(Object.values(result.stats).some(value=>value===396),false);
});

test('D21 inherited early-career access never bypasses a Secret Debt/global ordinary-career domain lock',()=>{
  const career=ordinaryHardWorkCareers[7];

  assert.equal(ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied:false,
    ordinaryCareersDomainLocked:false,
    earnedHardWork:[career]
  }),true);

  assert.equal(ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied:false,
    ordinaryCareersDomainLocked:true,
    earnedHardWork:[career]
  }),false);

  assert.equal(ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied:true,
    ordinaryCareersDomainLocked:true,
    earnedHardWork:[]
  }),false);

  assert.equal(ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied:true,
    ordinaryCareersDomainLocked:false,
    earnedHardWork:[]
  }),true);
});

test('Palace seam requires both permanent ordinary 10/10 and current-run active 10/10',()=>{
  const all=[...ordinaryHardWorkCareers];
  const nine=ordinaryHardWorkCareers.slice(0,9);

  assert.equal(allOrdinaryHardWorkEarned(all),true);
  assert.equal(allHardWorkPackagesActive(all),true);
  assert.equal(palaceNewStartQualified({earnedHardWork:all,activePackages:all}),true);

  assert.equal(palaceNewStartQualified({earnedHardWork:nine,activePackages:all}),false);
  assert.equal(palaceNewStartQualified({earnedHardWork:all,activePackages:nine}),false);
  assert.equal(palaceNewStartQualified({
    earnedHardWork:[...nine,'secret-debt'],
    activePackages:[...nine,'secret-debt']
  }),false);
});
