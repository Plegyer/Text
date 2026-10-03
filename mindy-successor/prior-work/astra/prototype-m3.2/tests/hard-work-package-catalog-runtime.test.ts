import test from 'node:test';
import assert from 'node:assert/strict';

import {hardWorkPackageDefinitions} from '../src/core/hardWorkPackageCatalog.ts';

test('runtime package catalog exposes the approved D21-D22 mapping exactly once',()=>{
  assert.deepEqual(
    hardWorkPackageDefinitions.map(item=>({
      career:item.career,
      stats:item.statBonuses.map(bonus=>[bonus.stat,bonus.amount]),
      lust:item.lustBonus??0
    })),
    [
      {career:'lumber',stats:[['strength',5]],lust:0},
      {career:'satyr-maid',stats:[['grooming',5]],lust:0},
      {career:'undead-farm',stats:[['magic',5]],lust:0},
      {career:'tavern',stats:[['sociability',5]],lust:0},
      {career:'hunter',stats:[['dexterity',5]],lust:0},
      {career:'guard',stats:[['endurance',5],['manners',5]],lust:0},
      {career:'merchant',stats:[['wits',5],['reason',5]],lust:0},
      {career:'artist-geisha',stats:[['creativity',5],['grooming',5]],lust:0},
      {career:'assassin',stats:[['dexterity',5],['wits',5]],lust:0},
      {career:'prostitute',stats:[['sexuality',5],['charm',5]],lust:3}
    ]
  );
});
