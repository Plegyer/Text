import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROGRESSION_BALANCE_RESEARCH_NOTICE,
  formatProgressionBalanceSummary,
  loadLiveProgressionSource,
  runProgressionBalanceHarness,
  strongestWorkStat,
  type ResearchNegativeTargetOverride
} from '../scripts/progression-balance-harness.ts';
import {ordinaryHardWorkCareers,seasons,stats,type OrdinaryHardWorkCareer,type Stat} from '../src/core/schema.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

function oneAllocation(){
  return [{id:'base',mode:'base'}] as const;
}

function liveAction(career:OrdinaryHardWorkCareer){
  const source=loadLiveProgressionSource();
  const action=source.definitions.actions.find(candidate=>candidate.id===`${career}.shift`);
  assert.ok(action,`missing live action ${career}.shift`);
  return action;
}

test('progression harness reads all ten live ordinary career definitions',()=>{
  const source=loadLiveProgressionSource();
  assert.deepEqual([...ordinaryHardWorkCareers],[
    'lumber','satyr-maid','undead-farm','tavern','hunter',
    'guard','merchant','artist-geisha','assassin','prostitute'
  ]);
  assert.equal(source.baseDailyEnergy,3);

  let negativeCount=0;
  for(const career of ordinaryHardWorkCareers){
    const action=source.definitions.actions.find(candidate=>candidate.id===`${career}.shift`);
    assert.ok(action?.seasonal,`${career} must have live seasonal definitions`);
    assert.ok(action.wage,`${career} must have a live wage`);
    let negativeSeasons=0;
    for(const season of seasons){
      const negatives=action.seasonal[season].filter(
        effect=>effect.kind==='modifyStat'&&effect.delta<0
      );
      negativeCount+=negatives.length;
      if(negatives.length)negativeSeasons++;
      assert.ok(
        negatives.every(effect=>effect.kind==='modifyStat'&&effect.delta===-1),
        `${career}/${season} negative effects must stay -1 for this live baseline`
      );
    }
    assert.equal(negativeSeasons,2,`${career} must currently have two negative seasons`);
  }
  assert.equal(negativeCount,20);
});

test('shift policies reproduce live Energy-only and proposed research limits without changing runtime',()=>{
  const common={
    startingAllocations:oneAllocation(),
    school:{everyDays:null,course:'best-overlap' as const},
    cap:100 as const
  };
  const current=runProgressionBalanceHarness({...common,shiftPolicy:'current-energy'});
  const maxTwo=runProgressionBalanceHarness({...common,shiftPolicy:'two'});
  const maxOne=runProgressionBalanceHarness({...common,shiftPolicy:'one'});

  assert.equal(current.liveSource.baseDailyEnergy,3);
  assert.equal(current.policy.sameCareerShiftLimitPerDay,3);
  assert.equal(maxTwo.policy.sameCareerShiftLimitPerDay,2);
  assert.equal(maxOne.policy.sameCareerShiftLimitPerDay,1);

  for(const career of ordinaryHardWorkCareers){
    const currentRow=current.careers.find(row=>row.career===career)!;
    const twoRow=maxTwo.careers.find(row=>row.career===career)!;
    const oneRow=maxOne.careers.find(row=>row.career===career)!;
    assert.equal(currentRow.workOnly.dayTo50,17);
    assert.equal(twoRow.workOnly.dayTo50,25);
    assert.equal(oneRow.workOnly.dayTo50,50);
  }
});

test('live negative movement is measured after floor clipping rather than raw arithmetic',()=>{
  const result=runProgressionBalanceHarness({
    shiftPolicy:'one',
    startingAllocations:oneAllocation(),
    school:{everyDays:null,course:'best-overlap'},
    cap:100,
    days:50
  });

  for(const row of result.careers){
    const movement=row.workOnly.workMovement;
    assert.ok(movement.attemptedNegative>=movement.realizedNegative);
    assert.equal(
      movement.blockedByFloor,
      movement.attemptedNegative-movement.realizedNegative
    );
    assert.equal(
      movement.netRealized,
      movement.realizedPositive-movement.realizedNegative
    );
    assert.ok(row.workOnly.grossWorkMoneyBy50!==null&&row.workOnly.grossWorkMoneyBy50>0);
  }

  const lumber=result.careers.find(row=>row.career==='lumber')!;
  assert.ok(
    lumber.workOnly.workMovement.blockedByFloor>0,
    'current live Lumber negatives should demonstrate the floor-clipping risk'
  );
});

test('RESEARCH negative-target overrides are applied in analysis without mutating live definitions',()=>{
  const source=loadLiveProgressionSource();
  const lumber=source.definitions.actions.find(action=>action.id==='lumber.shift')!;
  assert.ok(lumber.seasonal);
  const liveSpringNegative=lumber.seasonal.spring.find(
    effect=>effect.kind==='modifyStat'&&effect.delta<0
  );
  assert.ok(liveSpringNegative&&liveSpringNegative.kind==='modifyStat');
  const originalStat=liveSpringNegative.stat;

  const replacement:Stat=stats.find(stat=>stat!==originalStat)!;
  const alternate:ResearchNegativeTargetOverride={
    label:'test-only-lumber-spring',
    targets:{lumber:{spring:replacement}}
  };

  const research=runProgressionBalanceHarness({
    shiftPolicy:'one',
    startingAllocations:oneAllocation(),
    alternateNegativeTargets:alternate,
    school:{everyDays:null,course:'best-overlap'},
    cap:100,
    days:10
  },source);

  assert.equal(research.policy.negativeMapAuthority,'RESEARCH');
  assert.equal(research.policy.negativeMap,'RESEARCH:test-only-lumber-spring');
  assert.equal(research.researchNotice,PROGRESSION_BALANCE_RESEARCH_NOTICE);

  const stillLive=lumber.seasonal.spring.find(
    effect=>effect.kind==='modifyStat'&&effect.delta<0
  );
  assert.ok(stillLive&&stillLive.kind==='modifyStat');
  assert.equal(stillLive.stat,originalStat,'research run must not mutate definitions');
});

test('best-overlap School selection comes from the live School catalog and accelerates the same stat',()=>{
  const result=runProgressionBalanceHarness({
    shiftPolicy:'one',
    startingAllocations:[{id:'focus',mode:'focus-strongest'}],
    school:{everyDays:10,course:'best-overlap'},
    cap:100
  });

  for(const row of result.careers){
    assert.ok(row.withSchool.schoolCourseId);
    const course=SCHOOL_COURSES.find(candidate=>candidate.id===row.withSchool.schoolCourseId);
    assert.ok(course);
    const overlap=course.statEffects.find(effect=>effect.stat===row.withSchool.strongestStat)?.amount??0;
    const best=Math.max(...SCHOOL_COURSES.map(candidate=>
      candidate.statEffects.find(effect=>effect.stat===row.withSchool.strongestStat)?.amount??0
    ));
    assert.equal(row.withSchool.schoolOverlapGain,best);
    assert.equal(overlap,best);
    assert.ok(row.withSchool.schoolLessons>0);
    if(row.workOnly.dayTo100!==null&&row.withSchool.dayTo100!==null){
      assert.ok(row.withSchool.dayTo100<=row.workOnly.dayTo100);
    }
  }
});

test('cap 200 changes only the analysis ceiling; day-to-100 remains observable',()=>{
  const common={
    shiftPolicy:'current-energy' as const,
    startingAllocations:[{id:'focus',mode:'focus-strongest' as const}],
    school:{everyDays:null,course:'best-overlap' as const},
    days:160
  };
  const cap100=runProgressionBalanceHarness({...common,cap:100});
  const cap200=runProgressionBalanceHarness({...common,cap:200});

  const lumber100=cap100.careers.find(row=>row.career==='lumber')!;
  const lumber200=cap200.careers.find(row=>row.career==='lumber')!;
  assert.equal(lumber200.workOnly.dayTo100,lumber100.workOnly.dayTo100);
  assert.equal(lumber100.workOnly.finalStrongestStat,100);
  assert.ok(lumber200.workOnly.finalStrongestStat>100);
  assert.ok(lumber200.workOnly.finalStrongestStat<=200);
  assert.ok(lumber200.workOnly.dayToCap!==null);
});

test('milestone density and summaries are machine-readable and human-readable',()=>{
  const source=loadLiveProgressionSource();
  const result=runProgressionBalanceHarness({
    shiftPolicy:'one',
    startingAllocations:oneAllocation(),
    school:{everyDays:10,course:'best-overlap'},
    cap:100
  },source);

  assert.equal(result.careers.length,ordinaryHardWorkCareers.length);
  assert.doesNotThrow(()=>JSON.stringify(result));

  for(const row of result.careers){
    const density=row.milestoneDensity;
    assert.ok(density.early.thresholds.every(value=>value>=1&&value<=10));
    assert.ok(density.mid.thresholds.every(value=>value>=11&&value<=30));
    assert.ok(density.late.thresholds.every(value=>value>=31&&value<=49));
    assert.ok(density.shiftReactiveEvents>=0);
  }

  const lumber=result.careers.find(row=>row.career==='lumber')!;
  assert.ok(lumber.milestoneDensity.early.thresholds.includes(1));

  const summary=formatProgressionBalanceSummary(result);
  assert.match(summary,/Progression Balance Harness v3/);
  assert.match(summary,/RESEARCH ONLY/);
  assert.match(summary,/lumber/);
  assert.match(summary,/money@50/);
});

test('strongest stat is derived from live positive work packages',()=>{
  for(const career of ordinaryHardWorkCareers){
    const action=liveAction(career);
    const strongest=strongestWorkStat(action);
    assert.ok(stats.includes(strongest));
    let score=0;
    for(const season of seasons){
      for(const effect of action.seasonal?.[season]??[]){
        if(effect.kind==='modifyStat'&&effect.delta>0&&effect.stat===strongest)score+=effect.delta;
      }
    }
    assert.ok(score>0,`${career} strongest stat must have live positive work growth`);
  }
});
