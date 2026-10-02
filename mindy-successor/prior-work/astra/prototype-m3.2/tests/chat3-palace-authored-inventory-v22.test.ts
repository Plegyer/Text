import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/palace-authored-v22-inventory.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const schema=readFileSync('src/core/schema.ts','utf8');
const engine=readFileSync('src/core/engine.ts','utf8');

const ordinary=[
  'lumber','satyr-maid','undead-farm','tavern','hunter',
  'guard','merchant','artist-geisha','assassin','prostitute'
];

test('C3-241 Palace unlock authority is exactly ten unique ordinary Hard Work careers',()=>{
  assert.equal(inventory.activation.branchStart,'260e44daad22a6ab8eb879ee24f13b9ec2abf19b');
  assert.deepEqual(inventory.fixedAuthority.ordinaryHardWorkCareers,ordinary);
  assert.equal(inventory.fixedAuthority.ordinaryHardWorkCount,10);
  assert.match(schema,/ordinaryHardWorkCareers=\['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'\]/);
  assert.match(engine,/ordinaryHardWorkCareers\.every\(c=>meta\.hardWorkProgress\.includes\(c\)\)/);
  assert.equal(inventory.fixedAuthority.palaceUnlock.uniqueCareersRequired,10);
  assert.equal(inventory.fixedAuthority.palaceUnlock.duplicateCareerDoesNotSubstitute,true);
  assert.equal(inventory.fixedAuthority.palaceUnlock.secretDebtDoesNotSubstitute,true);
});

test('C3-241 all ten current production Hard Work endings match the Palace ledger',()=>{
  for(const career of ordinary){
    const ending=definitions.endings.find((x:any)=>x.id===`ending.${career}.hard-work`);
    assert.ok(ending,career);
    assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:`hardWork:${career}`,career}],career);
    assert.ok(inventory.fixedAuthority.hardWorkEndingIds.includes(ending.id),career);
    assert.ok(inventory.fixedAuthority.hardWorkMetaRewardIds.includes(`hardWork:${career}`),career);
  }
});

test('C3-241 current production has no Palace career/action/ending/relationship/Night/item consumer',()=>{
  const has=(xs:any[],name:string)=>xs.filter(x=>JSON.stringify(x).toLowerCase().includes('palace')).map(x=>x.id??name);
  assert.deepEqual(has(definitions.actions,'action'),[]);
  assert.deepEqual(has(definitions.careers??[],'career'),[]);
  assert.deepEqual(has(definitions.endings,'ending'),[]);
  assert.deepEqual(has(definitions.relationships??[],'relationship'),[]);
  assert.deepEqual(has(definitions.nightChoices??[],'night'),[]);
  assert.deepEqual(has(definitions.itemDefinitions??[],'item'),[]);
  assert.equal(inventory.currentProductionPalaceConsumers.status,'NO_PALACE_CAREER_RUNTIME_CONSUMER');
});

test('C3-241 derived unlock already has a current localization label but not a career consumer',()=>{
  assert.equal(localization.strings['unlock.palace.label']?.ru,'Дворец');
  assert.equal(localization.strings['unlock.palace.label']?.en,'Palace');
  assert.deepEqual(inventory.fixedAuthority.palaceUnlock.conditionSurface,{kind:'metaUnlock',unlock:'palace',present:true});
});

test('C3-241 draft/product concepts remain pending and forbidden assumptions stay unbound',()=>{
  for(const value of Object.values(inventory.futureConsumers))assert.equal(value,'PENDING_RUNTIME_ID');
  assert.ok(inventory.openVsFixed.open.includes('exact ruler identity'));
  assert.ok(inventory.openVsFixed.open.includes('exact global mystery'));
  assert.ok(inventory.openVsFixed.open.includes('exact ending rewards and Meta'));
  assert.ok(inventory.forbiddenAssumptions.includes('progressCardShowsNineOfTenBeforeUnlock'));
  assert.ok(inventory.forbiddenAssumptions.includes('artistCourtInvitationUnlocksPalace'));
  assert.ok(inventory.forbiddenAssumptions.includes('secretDebtCountsAsOrdinaryHardWork'));
});

test('C3-241 safe prep owns no Palace mechanics or production localization',()=>{
  for(const [key,value] of Object.entries(inventory.invariants)){
    if(key==='finalRuntimeBindingDeferred')assert.equal(value,true,key);
    else assert.equal(value,false,key);
  }
});
