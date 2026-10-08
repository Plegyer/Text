import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  hardWorkPackageDefinitions,
  hardWorkPackageSelectionPolicy,
  hardWorkPackageSupersedes
} from '../src/core/hardWorkPackageCatalog.ts';
import {
  applyHardWorkPackagesAtCreation,
  palaceNewStartQualified,
  validateHardWorkPackageDefinitions
} from '../src/core/hardWorkMeta.ts';
import {ordinaryHardWorkCareers,stats,type Stat} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

const all=[...ordinaryHardWorkCareers];

const expected=[
  {career:'lumber',stats:[['strength',5]],lust:0},
  {career:'satyr-maid',stats:[['charm',5]],lust:0},
  {career:'undead-farm',stats:[['magic',5]],lust:0},
  {career:'tavern',stats:[['wits',5]],lust:0},
  {career:'hunter',stats:[['dexterity',5]],lust:0},
  {career:'guard',stats:[['endurance',5],['manners',5]],lust:0},
  {career:'merchant',stats:[['reason',5],['sociability',5]],lust:0},
  {career:'artist-geisha',stats:[['creativity',5],['grooming',5]],lust:0},
  {career:'assassin',stats:[['dexterity',5],['wits',5]],lust:0},
  {career:'prostitute',stats:[['sexuality',5],['charm',5]],lust:5}
] as const;

function shape(){
  return hardWorkPackageDefinitions.map(item=>({
    career:item.career,
    stats:item.statBonuses.map(bonus=>[bonus.stat,bonus.amount] as const),
    lust:item.lustBonus??0
  }));
}

function baselineStats(value=1):Record<Stat,number>{
  return Object.fromEntries(stats.map(stat=>[stat,value])) as Record<Stat,number>;
}

test('D47 production catalog matches the accepted profession mapping exactly',()=>{
  assert.deepEqual(shape(),expected);
  assert.doesNotThrow(()=>validateHardWorkPackageDefinitions(hardWorkPackageDefinitions));

  assert.equal(hardWorkPackageDefinitions.slice(0,5).every(item=>item.statBonuses.length===1),true);
  assert.equal(hardWorkPackageDefinitions.slice(5).every(item=>item.statBonuses.length===2),true);

  const progressionBonuses=hardWorkPackageDefinitions.flatMap(item=>item.statBonuses);
  assert.equal(progressionBonuses.reduce((sum,bonus)=>sum+bonus.amount,0),75);
  assert.deepEqual(new Set(progressionBonuses.map(bonus=>bonus.stat)),new Set(stats));

  assert.deepEqual(
    hardWorkPackageDefinitions.filter(item=>item.lustBonus!==undefined).map(item=>[item.career,item.lustBonus]),
    [['prostitute',5]]
  );

  assert.deepEqual(hardWorkPackageSelectionPolicy,{
    mode:'arbitrary-earned-subset',
    allowNone:true,
    allowAllEarned:true,
    wholePackageOnly:true
  });
  assert.deepEqual(hardWorkPackageSupersedes,{
    automaticPlusThreePlusThree:true,
    merchantStartingMoneyPlus600:true
  });
});

test('arbitrary earned subset remains profession-package selection and applies atomically once',()=>{
  let s=freshSave({hardWorkProgress:['guard','prostitute']});
  const strongMetaBefore=structuredClone(s.meta.strongMeta);

  assert.equal(s.run.character.lust,5,'D46 base Lust');
  assert.equal(s.run.resources.money,600);
  assert.equal(Object.values(s.run.character.stats).every(value=>value===1),true);

  s=dispatch(s,{type:'setHardWorkPackageActive',career:'prostitute',active:true},catalog);
  s=dispatch(s,{type:'setHardWorkPackageActive',career:'guard',active:true},catalog);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,['prostitute','guard']);
  assert.deepEqual(s.meta.strongMeta,strongMetaBefore,'ordinary packages consume no Strong Meta slots');

  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},catalog);

  assert.equal(s.run.character.stats.endurance,6);
  assert.equal(s.run.character.stats.manners,6);
  assert.equal(s.run.character.stats.sexuality,6);
  assert.equal(s.run.character.stats.charm,6);
  assert.equal(s.run.character.lust,10,'D46 Lust 5 + Prostitute D47 Lust 5');
  assert.equal(s.run.creation.hardWorkPackagesApplied,true);
  assert.deepEqual(s.meta.strongMeta,strongMetaBefore);

  const characterSnapshot=structuredClone(s.run.character);
  const activeSnapshot=[...s.run.creation.activeHardWorkPackages];
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.character,characterSnapshot,'reload never reapplies package effects');
  assert.deepEqual(s.run.creation.activeHardWorkPackages,activeSnapshot);
  assert.throws(
    ()=>dispatch(s,{type:'setHardWorkPackageActive',career:'guard',active:false},catalog),
    /выбор наследия.*закрыт/i
  );
});

test('all ten active packages add 75 progression points and separate Lust +5 from the D46 base',()=>{
  const result=applyHardWorkPackagesAtCreation({
    definitions:hardWorkPackageDefinitions,
    earnedHardWork:all,
    activePackages:all,
    snapshot:{stats:baselineStats(),lust:5,packagesApplied:false},
    progressionStatCap:100
  });

  const baseTotal=stats.length;
  const resultTotal=stats.reduce((sum,stat)=>sum+result.stats[stat],0);
  assert.equal(resultTotal-baseTotal,75);
  assert.equal(result.lust,10);
  assert.deepEqual(result.appliedPackages,all);
  assert.equal(result.newlyApplied,true);
});

test('D24 caps clip D47 +5 components rather than multiplying or spilling them',()=>{
  const near100=baselineStats(98);
  const clipped=applyHardWorkPackagesAtCreation({
    definitions:hardWorkPackageDefinitions,
    earnedHardWork:all,
    activePackages:all,
    snapshot:{stats:near100,lust:98,packagesApplied:false},
    progressionStatCap:100,
    lustCap:100
  });
  assert.equal(stats.every(stat=>clipped.stats[stat]===100),true);
  assert.equal(clipped.lust,100);

  const near200=baselineStats(198);
  const cap200=applyHardWorkPackagesAtCreation({
    definitions:hardWorkPackageDefinitions,
    earnedHardWork:['lumber'],
    activePackages:['lumber'],
    snapshot:{stats:near200,lust:5,packagesApplied:false},
    progressionStatCap:200
  });
  assert.equal(cap200.stats.strength,200);
  assert.equal(cap200.stats.endurance,198);
  assert.equal(cap200.lust,5);
});

test('D23 remains ten package identities, not fifteen stat components or a Lust component',()=>{
  assert.equal(palaceNewStartQualified({earnedHardWork:all,activePackages:all}),true);
  assert.equal(palaceNewStartQualified({earnedHardWork:all,activePackages:all.slice(0,9)}),false);
  assert.equal(palaceNewStartQualified({earnedHardWork:all.slice(0,9),activePackages:all}),false);

  const progressionComponentCount=hardWorkPackageDefinitions.reduce((sum,item)=>sum+item.statBonuses.length,0);
  assert.equal(progressionComponentCount,15);
  assert.equal(all.length,10);
});

test('earned Hard Work never auto-applies stats, Lust or the retired Merchant +600',()=>{
  let merchant=freshSave({hardWorkProgress:['merchant']});
  assert.equal(merchant.run.resources.money,600);
  assert.equal(merchant.run.character.stats.reason,1);
  assert.equal(merchant.run.character.stats.sociability,1);
  assert.equal(merchant.run.character.lust,5);

  merchant=dispatch(merchant,{type:'setHardWorkPackageActive',career:'merchant',active:true},catalog);
  merchant.run.creation.remaining=0;
  merchant=dispatch(merchant,{type:'finishCreation'},catalog);

  assert.equal(merchant.run.resources.money,600);
  assert.equal(merchant.run.character.stats.reason,6);
  assert.equal(merchant.run.character.stats.sociability,6);
  assert.equal(merchant.run.character.lust,5);
});
