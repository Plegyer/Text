import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const endings=JSON.parse(readFileSync('content/ending-localization-production-v2.fixture.json','utf8'));
const actions=JSON.parse(readFileSync('content/ordinary-action-result-localization-v3.fixture.json','utf8'));

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

test('production ending patch targets exact current ending IDs',()=>{
  assert.deepEqual(definitions.endings.map((ending:any)=>ending.id).sort(),expectedEndingIds);
  const keys=Object.keys(endings.strings).sort();
  const expected=expectedEndingIds.flatMap(id=>[
    `ending.${id}.title`,
    `ending.${id}.description`
  ]).sort();
  assert.deepEqual(keys,expected);
});

test('production ordinary action result patch targets exact current action/scene IDs',()=>{
  const byId=new Map(definitions.actions.map((action:any)=>[action.id,action]));
  assert.deepEqual(actions.entries.map((entry:any)=>entry.actionId).sort(),expectedActionIds);

  for(const entry of actions.entries){
    const action:any=byId.get(entry.actionId);
    assert.ok(action,'missing action '+entry.actionId);
    assert.ok(action.scenes.some((scene:any)=>scene.id===entry.sceneId),
      `missing scene ${entry.actionId}/${entry.sceneId}`);
    assert.equal(entry.sceneId,'default');
    assert.equal(entry.titleKey,`action.${entry.actionId}.label`);
    assert.equal(entry.bodyKey,`action.${entry.actionId}.scene.default.text`);
  }
});

test('all production localization values have complete RU EN pairs',()=>{
  const merged={...endings.strings,...actions.strings};
  for(const [key,value] of Object.entries(merged) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' missing ru');
    assert.ok(value.en?.trim(),key+' missing en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
  }
});

test('production patches contain presentation fields only',()=>{
  const forbidden=new Set([
    'conditions','condition','effects','effect','reward','rewards','metaRewards',
    'rng','rngState','save','Save','cost','wage','moneyCost','energyCost'
  ]);

  const scanKeys=(value:any,path:string[]=[]):void=>{
    if(Array.isArray(value)){value.forEach((item,index)=>scanKeys(item,[...path,String(index)]));return;}
    if(value&&typeof value==='object'){
      for(const [key,child] of Object.entries(value)){
        assert.equal(forbidden.has(key),false,'forbidden field '+[...path,key].join('.'));
        scanKeys(child,[...path,key]);
      }
    }
  };

  scanKeys({strings:endings.strings});
  scanKeys({strings:actions.strings,entries:actions.entries});
});

test('production keys do not collide with current root or cross-owner namespaces',()=>{
  const keys=[...Object.keys(endings.strings),...Object.keys(actions.strings)];
  for(const key of keys){
    assert.equal(root[key],undefined,'unexpected root collision '+key);

    const allowedEnding=/^ending\..+\.(title|description)$/.test(key);
    const allowedAction=/^action\.(work|forage|brew|sell|scales|exam|deliver|visit|oddjob|repay|rent-room|rest|arrival|forest-search|tavern-talk|landlord)\.(label|scene\.default\.text)$/.test(key);
    assert.ok(allowedEnding||allowedAction,'unexpected namespace '+key);

    assert.equal(key.startsWith('event.'),false,key);
    assert.equal(key.startsWith('nightChoice.'),false,key);
    assert.equal(key.startsWith('school.'),false,key);
    assert.equal(key.startsWith('activity.'),false,key);
    assert.equal(key.startsWith('relationship.'),false,key);
  }
});
