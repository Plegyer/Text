import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const endingFixture=JSON.parse(readFileSync('content/ending-localization-v1.fixture.json','utf8'));
const actionFixture=JSON.parse(readFileSync('content/ordinary-action-result-localization-v2.fixture.json','utf8'));
const actionKeyMap=JSON.parse(readFileSync('content/ordinary-action-result-key-map-v2.fixture.json','utf8'));

const expectedEndingIds=[
  'guild-life',
  'scholar-life',
  'tavern-stay',
  'tavern-guild',
  'tavern-court',
  'lumber-stay',
  'ending.lumber.hard-work',
  'ending.lumber.forewoman',
  'ending.lumber.forest'
].sort();

const expectedActionIds=[
  'work','forage','brew','sell','scales','exam','deliver','visit',
  'oddjob','repay','rent-room','rest','arrival','forest-search',
  'tavern-talk','landlord'
].sort();

test('ending localization uses exact current ending ids only',()=>{
  const current=definitions.endings.map((ending:{id:string})=>ending.id).sort();
  assert.deepEqual(current,expectedEndingIds);

  const expectedKeys=expectedEndingIds.flatMap(id=>[
    `ending.${id}.title`,
    `ending.${id}.description`
  ]).sort();
  assert.deepEqual(Object.keys(endingFixture.strings).sort(),expectedKeys);
});

test('ordinary action result localization uses exact current action and scene ids',()=>{
  const currentActions=new Map(definitions.actions.map((action:any)=>[action.id,action]));
  const actual=actionFixture.entries.map((entry:any)=>entry.actionId).sort();
  assert.deepEqual(actual,expectedActionIds);

  for(const entry of actionFixture.entries){
    const action:any=currentActions.get(entry.actionId);
    assert.ok(action,'missing action '+entry.actionId);
    assert.ok(action.scenes.some((scene:any)=>scene.id===entry.sceneId),
      `missing scene ${entry.actionId}/${entry.sceneId}`);
    assert.equal(entry.titleKey,`action.${entry.actionId}.label`);
    assert.equal(entry.bodyKey,`action.${entry.actionId}.scene.${entry.sceneId}.text`);
  }
});

test('ordinary action key map agrees with localized result entries',()=>{
  const localized=new Map(actionFixture.entries.map((entry:any)=>[
    `${entry.actionId}|${entry.sceneId}`,entry
  ]));
  assert.equal(actionKeyMap.entries.length,actionFixture.entries.length);

  for(const mapping of actionKeyMap.entries){
    const entry:any=localized.get(`${mapping.actionId}|${mapping.sceneId}`);
    assert.ok(entry,`missing localized mapping ${mapping.actionId}/${mapping.sceneId}`);
    assert.equal(mapping.titleKey,entry.titleKey);
    assert.equal(mapping.bodyKey,entry.bodyKey);
    assert.ok(mapping.presentationId);
  }
});

test('all ending and action localization strings have complete RU EN pairs',()=>{
  for(const [key,value] of Object.entries({
    ...endingFixture.strings,
    ...actionFixture.strings
  }) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' ru');
    assert.ok(value.en?.trim(),key+' en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
  }
});

test('ending fixture carries presentation text only',()=>{
  assert.deepEqual(Object.keys(endingFixture).sort(),['defaultLocale','invariants','strings','version']);
  assert.equal(endingFixture.invariants.conditionsIncluded,false);
  assert.equal(endingFixture.invariants.rewardsIncluded,false);
  assert.equal(endingFixture.invariants.metaRewardsIncluded,false);
  assert.equal(endingFixture.invariants.gameplayFieldsIncluded,false);
});

test('ordinary action result fixture carries no mechanics rewards RNG or Save fields',()=>{
  assert.deepEqual(
    Object.keys(actionFixture).sort(),
    ['defaultLocale','entries','invariants','strings','version']
  );
  for(const entry of actionFixture.entries){
    assert.deepEqual(
      Object.keys(entry).sort(),
      ['actionId','bodyKey','expected','sceneId','titleKey']
    );
    assert.deepEqual(Object.keys(entry.expected).sort(),['en','ru']);
    assert.deepEqual(Object.keys(entry.expected.ru).sort(),['body','title']);
    assert.deepEqual(Object.keys(entry.expected.en).sort(),['body','title']);
  }

  const forbidden=['conditions','effects','reward','rewards','metaRewards','rng','save','cost','wage'];
  const scan=(value:any)=>{
    if(Array.isArray(value)){value.forEach(scan);return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.includes(key),false,'forbidden field '+key);
        scan(child);
      }
    }
  };
  scan({strings:actionFixture.strings,entries:actionFixture.entries});
});
