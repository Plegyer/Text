import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  applyHardWorkPackagesAtCreation,
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

type CatalogFixture = {
  version:number;
  status:string;
  selectionPolicy:{
    mode:string;
    allowNone:boolean;
    allowAllEarned:boolean;
    wholePackageOnly:boolean;
  };
  supersedes:{
    automaticPlusThreePlusThree:boolean;
    merchantStartingMoneyPlus600:boolean;
  };
  packages:HardWorkPackageDefinition[];
};

type LocaleCopy = {
  title:string;
  description:string;
  selectedAria:string;
  unselectedAria:string;
};

type PresentationFixture = {
  version:number;
  status:string;
  surface:string;
  selectionPolicy:{
    wholePackageOnly:boolean;
    arbitraryEarnedSubset:boolean;
    allowNone:boolean;
    allowAllEarned:boolean;
  };
  common:{
    ru:{sectionTitle:string;sectionDescription:string;selectedState:string;unselectedState:string};
    en:{sectionTitle:string;sectionDescription:string;selectedState:string;unselectedState:string};
  };
  packages:Record<OrdinaryHardWorkCareer,{ru:LocaleCopy;en:LocaleCopy}>;
};

function loadJson<T>(relative:string):T{
  return JSON.parse(readFileSync(new URL(relative,import.meta.url),'utf8')) as T;
}

const fixture=loadJson<CatalogFixture>('../content/hard-work-package-catalog-v1.fixture.json');
const presentation=loadJson<PresentationFixture>('../content/hard-work-new-start-presentation-v1.fixture.json');

const expected:Record<OrdinaryHardWorkCareer,{stats:readonly Stat[];lust?:number}>={
  lumber:{stats:['strength']},
  'satyr-maid':{stats:['grooming']},
  'undead-farm':{stats:['magic']},
  tavern:{stats:['sociability']},
  hunter:{stats:['dexterity']},
  guard:{stats:['endurance','manners']},
  merchant:{stats:['wits','reason']},
  'artist-geisha':{stats:['creativity','grooming']},
  assassin:{stats:['dexterity','wits']},
  prostitute:{stats:['sexuality','charm'],lust:3}
};

function packageFor(career:OrdinaryHardWorkCareer){
  const definition=fixture.packages.find(item=>item.career===career);
  assert.ok(definition,career);
  return definition;
}

function baselineStats(value=1):Record<Stat,number>{
  return Object.fromEntries(stats.map(stat=>[stat,value])) as Record<Stat,number>;
}

test('production Hard Work package fixture validates against generic D21-D22 infrastructure',()=>{
  assert.equal(fixture.version,1);
  assert.equal(fixture.status,'PRODUCTION_MAPPING_UNBOUND');
  assert.doesNotThrow(()=>validateHardWorkPackageDefinitions(fixture.packages));

  assert.deepEqual(fixture.packages.map(item=>item.career),[...ordinaryHardWorkCareers]);
  assert.equal(new Set(fixture.packages.map(item=>item.career)).size,10);
});

test('production mapping exactly matches the Leader-approved profession effects',()=>{
  for(const career of ordinaryHardWorkCareers){
    const definition=packageFor(career);
    const target=expected[career];

    assert.deepEqual(
      definition.statBonuses.map(item=>item.stat),
      [...target.stats],
      career
    );
    assert.equal(definition.statBonuses.every(item=>item.amount===5),true,career);
    assert.equal(definition.lustBonus,target.lust,career);
  }
});

test('first five packages have exactly one +5 progression effect and later five exactly two',()=>{
  const firstFive=ordinaryHardWorkCareers.slice(0,5);
  const laterFive=ordinaryHardWorkCareers.slice(5);

  for(const career of firstFive){
    const definition=packageFor(career);
    assert.equal(definition.statBonuses.length,1,career);
    assert.deepEqual(definition.statBonuses.map(item=>item.amount),[5],career);
  }

  for(const career of laterFive){
    const definition=packageFor(career);
    assert.equal(definition.statBonuses.length,2,career);
    assert.deepEqual(definition.statBonuses.map(item=>item.amount),[5,5],career);
  }
});

test('Lust is separate: only Professional carries the locked +3 Lust effect in this production catalog',()=>{
  const lustPackages=fixture.packages.filter(item=>item.lustBonus!==undefined);
  assert.deepEqual(lustPackages.map(item=>item.career),['prostitute']);
  assert.equal(lustPackages[0]?.lustBonus,3);

  const professional=packageFor('prostitute');
  assert.deepEqual(professional.statBonuses,[
    {stat:'sexuality',amount:5},
    {stat:'charm',amount:5}
  ]);
});

test('catalog has no old automatic +3/+3 or Merchant +600 reward model',()=>{
  assert.equal(fixture.supersedes.automaticPlusThreePlusThree,true);
  assert.equal(fixture.supersedes.merchantStartingMoneyPlus600,true);
  assert.equal(fixture.packages.flatMap(item=>item.statBonuses).some(item=>item.amount!==5),false);

  const serialized=JSON.stringify(fixture);
  assert.equal(serialized.includes('"amount":3'),false);
  assert.equal(serialized.includes('startingMoney'),false);
  assert.equal(serialized.includes('600'),false);
});

test('New Start+ policy is arbitrary whole-package subset: none, some, and all earned validate',()=>{
  assert.deepEqual(fixture.selectionPolicy,{
    mode:'arbitrary-earned-subset',
    allowNone:true,
    allowAllEarned:true,
    wholePackageOnly:true
  });

  const all=[...ordinaryHardWorkCareers];
  assert.deepEqual(validateHardWorkPackageSelection([],all),[]);

  const some=['guard','prostitute'] as const;
  assert.deepEqual(validateHardWorkPackageSelection(some,all),some);

  assert.deepEqual(validateHardWorkPackageSelection(all,all),all);
});

test('whole-package application cannot select individual effects: Guard and Professional effects apply atomically',()=>{
  const all=[...ordinaryHardWorkCareers];
  const result=applyHardWorkPackagesAtCreation({
    definitions:fixture.packages,
    earnedHardWork:all,
    activePackages:['guard','prostitute'],
    snapshot:{stats:baselineStats(),lust:1,packagesApplied:false},
    progressionStatCap:100
  });

  assert.equal(result.stats.endurance,6);
  assert.equal(result.stats.manners,6);
  assert.equal(result.stats.sexuality,6);
  assert.equal(result.stats.charm,6);
  assert.equal(result.lust,4);
  assert.deepEqual(result.appliedPackages,['guard','prostitute']);

  for(const stat of stats){
    if(['endurance','manners','sexuality','charm'].includes(stat))continue;
    assert.equal(result.stats[stat],1,stat);
  }
});

test('presentation source covers every production package in RU and EN with accessible selected/unselected copy',()=>{
  assert.equal(presentation.version,1);
  assert.equal(presentation.status,'UNBOUND_PRESENTATION_SOURCE');
  assert.equal(presentation.surface,'new-start-plus');
  assert.deepEqual(presentation.selectionPolicy,{
    wholePackageOnly:true,
    arbitraryEarnedSubset:true,
    allowNone:true,
    allowAllEarned:true
  });

  assert.deepEqual(Object.keys(presentation.packages),[...ordinaryHardWorkCareers]);

  for(const career of ordinaryHardWorkCareers){
    const packageCopy=presentation.packages[career];
    for(const locale of ['ru','en'] as const){
      const copy=packageCopy[locale];
      assert.ok(copy.title.trim().length>0,`${career}.${locale}.title`);
      assert.ok(copy.description.trim().length>0,`${career}.${locale}.description`);
      assert.ok(copy.selectedAria.trim().length>0,`${career}.${locale}.selectedAria`);
      assert.ok(copy.unselectedAria.trim().length>0,`${career}.${locale}.unselectedAria`);
      assert.notEqual(copy.selectedAria,copy.unselectedAria,`${career}.${locale}`);
    }
  }
});

test('presentation copy states exact Professional whole-package effects in both locales',()=>{
  const ru=presentation.packages.prostitute.ru;
  const en=presentation.packages.prostitute.en;

  assert.match(ru.description,/Сексуальность \+5/);
  assert.match(ru.description,/Обаяние \+5/);
  assert.match(ru.description,/Похоть \+3/);

  assert.match(en.description,/Sexuality \+5/);
  assert.match(en.description,/Charm \+5/);
  assert.match(en.description,/Lust \+3/);
});
