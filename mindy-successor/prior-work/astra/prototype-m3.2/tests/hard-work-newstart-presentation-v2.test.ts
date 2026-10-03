import test from 'node:test';
import assert from 'node:assert/strict';

import {
  activeHardWorkPackageIds,
  earnedHardWorkPackageIds,
  hardWorkNewStartCopy,
  hardWorkNewStartSummary,
  hardWorkPackageCardModel,
  hardWorkPackageEffectLabels
} from '../src/ui/hardWorkNewStart.ts';
import {ordinaryHardWorkCareers,type Stat} from '../src/core/schema.ts';

const statNames:Record<Stat,string>={
  strength:'Strength',
  endurance:'Endurance',
  dexterity:'Dexterity',
  magic:'Magic',
  reason:'Reason',
  charm:'Charm',
  creativity:'Creativity',
  wits:'Wits',
  sociability:'Sociability',
  manners:'Manners',
  grooming:'Grooming',
  sexuality:'Sexuality'
};

test('New Start+ presentation derives locked package effects from the centralized catalog',()=>{
  assert.deepEqual(hardWorkPackageEffectLabels('lumber','en',stat=>statNames[stat]),['Strength +5']);
  assert.deepEqual(
    hardWorkPackageEffectLabels('guard','en',stat=>statNames[stat]),
    ['Endurance +5','Manners +5']
  );
  assert.deepEqual(
    hardWorkPackageEffectLabels('prostitute','en',stat=>statNames[stat]),
    ['Sexuality +5','Charm +5','Lust +3']
  );
});

test('earned package list is ordinary-only, stable roster order, and independent of selected subset',()=>{
  assert.deepEqual(
    earnedHardWorkPackageIds(['prostitute','secret-debt','lumber','guard']),
    ['lumber','guard','prostitute']
  );
  assert.deepEqual(
    activeHardWorkPackageIds(['guard','secret-debt','lumber']),
    ['lumber','guard']
  );
});

test('none, some, and all package activation states are represented without a one-slot limit',()=>{
  const earned=[...ordinaryHardWorkCareers];

  const none=hardWorkNewStartSummary({earned,active:[],locale:'en',progressionStatCap:100});
  assert.equal(none.active.length,0);
  assert.equal(none.palaceQualified,false);

  const some=hardWorkNewStartSummary({
    earned,
    active:['lumber','guard','prostitute'],
    locale:'en',
    progressionStatCap:100
  });
  assert.deepEqual(some.active,['lumber','guard','prostitute']);
  assert.equal(some.palaceQualified,false);

  const all=hardWorkNewStartSummary({earned,active:earned,locale:'en',progressionStatCap:100});
  assert.equal(all.active.length,10);
  assert.equal(all.palaceQualified,true);
});

test('early profession access copy is separate from selected package effects and state',()=>{
  const copy=hardWorkNewStartCopy('en');
  const off=hardWorkPackageCardModel({
    career:'assassin',
    selected:false,
    locale:'en',
    statLabel:stat=>statNames[stat]
  });
  const on=hardWorkPackageCardModel({
    career:'assassin',
    selected:true,
    locale:'en',
    statLabel:stat=>statNames[stat]
  });

  assert.match(copy.earlyAccessBody,/permanently makes this profession available from the start/i);
  assert.match(copy.earlyAccessBody,/does not control that access/i);
  assert.equal(off.effects.join('|'),on.effects.join('|'));
  assert.notEqual(off.stateText,on.stateText);
  assert.equal(off.selected,false);
  assert.equal(on.selected,true);
});

test('RU/EN Palace help explicitly requires all ten earned and all ten active in that life',()=>{
  for(const locale of ['ru','en'] as const){
    const summary=hardWorkNewStartSummary({
      earned:ordinaryHardWorkCareers,
      active:ordinaryHardWorkCareers,
      locale,
      progressionStatCap:100
    });
    assert.match(summary.palaceRequirement,/10/);
    assert.match(summary.palaceProgress,/10\/10/);
  }
  assert.match(hardWorkNewStartCopy('en').palaceRequirement,/all 10.*earned.*all 10.*active/i);
  assert.match(hardWorkNewStartCopy('ru').palaceRequirement,/все 10.*заработаны.*все 10/i);
});

test('cap-200 wording describes a higher maximum and explicitly rejects value multiplication',()=>{
  const en=hardWorkNewStartSummary({
    earned:[],
    active:[],
    locale:'en',
    progressionStatCap:200
  }).capText;
  const ru=hardWorkNewStartSummary({
    earned:[],
    active:[],
    locale:'ru',
    progressionStatCap:200
  }).capText;

  assert.match(en,/maximum.*becomes 200 instead of 100/i);
  assert.match(en,/changes only the maximum/i);
  assert.match(en,/values stay unchanged/i);
  assert.doesNotMatch(en,/stats are doubled/i);

  assert.match(ru,/максимум.*становится 200 вместо 100/i);
  assert.match(ru,/меняется только максимум/i);
  assert.match(ru,/значения остаются прежними/i);
});

test('all ten packages have non-empty bilingual titles and accessible selected/unselected labels',()=>{
  for(const career of ordinaryHardWorkCareers){
    for(const locale of ['ru','en'] as const){
      const selected=hardWorkPackageCardModel({career,selected:true,locale,statLabel:stat=>statNames[stat]});
      const unselected=hardWorkPackageCardModel({career,selected:false,locale,statLabel:stat=>statNames[stat]});
      assert.ok(selected.title.trim(),`${career}.${locale}.title`);
      assert.ok(selected.ariaLabel.trim(),`${career}.${locale}.selectedAria`);
      assert.ok(unselected.ariaLabel.trim(),`${career}.${locale}.unselectedAria`);
      assert.notEqual(selected.ariaLabel,unselected.ariaLabel,`${career}.${locale}`);
    }
  }
});
