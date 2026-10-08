import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const missing=JSON.parse(readFileSync('content/activity-ending-missing-assets-v17.json','utf8'));
const app=readFileSync('src/ui/app.ts','utf8');

const ids=[
  'ending.activity.pathfinder',
  'ending.activity.preservation',
  'ending.activity.network'
] as const;

const rewards={
  'ending.activity.pathfinder':'specialist.activity.surveyors-atlas',
  'ending.activity.preservation':'specialist.activity.field-archive',
  'ending.activity.network':'specialist.activity.contact-network'
} as const;

test('v17 final Activity ending copy is player-facing RU EN without changing stable IDs',()=>{
  const expected={
    'ending.activity.pathfinder':['За пределами карты','Beyond the Map'],
    'ending.activity.preservation':['Сохранённое невозможное','The Impossible Preserved'],
    'ending.activity.network':['Нити через границы','Threads Across the Boundaries']
  } as const;
  for(const id of ids){
    const ending=catalog.definitions.endings.find(e=>e.id===id);
    assert.ok(ending,id);
    assert.equal(ending.title,expected[id][0],id);
    assert.equal(localization[`ending.${id}.title`]?.ru,expected[id][0],id+' title ru');
    assert.equal(localization[`ending.${id}.title`]?.en,expected[id][1],id+' title en');
    for(const field of ['description','epilogue']){
      assert.ok(localization[`ending.${id}.${field}`]?.ru?.trim(),id+' '+field+' ru');
      assert.ok(localization[`ending.${id}.${field}`]?.en?.trim(),id+' '+field+' en');
    }
  }
});

test('v17 preserves exact D38 reward ownership IDs and only edits presentation fields',()=>{
  for(const id of ids){
    const ending=catalog.definitions.endings.find(e=>e.id===id)!;
    const reward=rewards[id];
    assert.equal(ending.reward,reward,id);
    assert.deepEqual(ending.metaRewards,[{kind:'strongMeta',rewardId:reward,reward}],id);
    assert.ok(ending.conditions.length>0,id);
  }
});

test('Specialist reward presentation copy remains selectable and states its locked firewall',()=>{
  const keys=[
    'specialist.activity.surveyors-atlas',
    'specialist.activity.field-archive',
    'specialist.activity.contact-network'
  ];
  for(const id of keys){
    assert.ok(localization[`unlock.${id}.label`]?.ru?.trim(),id+' label ru');
    assert.ok(localization[`unlock.${id}.label`]?.en?.trim(),id+' label en');
    assert.match(localization[`${id}.description`].ru,/Выбираемый Specialist/);
    assert.match(localization[`${id}.description`].en,/Selectable Specialist/);
  }
  assert.match(localization['specialist.activity.surveyors-atlas.description'].en,/does not unlock regions/);
  assert.match(localization['specialist.activity.field-archive.description'].en,/without creating a result/);
  assert.match(localization['specialist.activity.contact-network.description'].en,/does not bypass region unlock/);
});

test('Activity ending presentation slots use only approved project-owned safe reuse',()=>{
  const expected={
    'ending/activity/pathfinder':'assets/presentation/forest-route-default-v1.svg',
    'ending/activity/preservation':'assets/stage-town.svg',
    'ending/activity/network':'assets/stage-town.svg'
  };
  for(const [slot,src] of Object.entries(expected)){
    assert.equal(presentation.slots[slot]?.static?.src,src,slot);
    const key=presentation.slots[slot]?.static?.altKey;
    assert.ok(key,slot+' altKey');
    assert.ok(localization[key]?.ru?.trim(),slot+' alt ru');
    assert.ok(localization[key]?.en?.trim(),slot+' alt en');
    const captionKey=key.replace(/\.alt$/,'.caption');
    assert.ok(localization[captionKey]?.ru?.trim(),slot+' caption ru');
    assert.ok(localization[captionKey]?.en?.trim(),slot+' caption en');
  }
});

test('missing-asset manifest lists exactly three genuinely absent dedicated ending visuals',()=>{
  assert.equal(missing.assets.length,3);
  assert.deepEqual(missing.assets.map((x:any)=>x.endingId),[...ids]);
  for(const row of missing.assets){
    assert.equal(row.status,'missing-dedicated-ending-visual');
    assert.ok(row.desired.trim());
    assert.ok(row.currentSafeReuse.startsWith('assets/'));
    assert.ok(row.reuseLimit.trim());
  }
});

test('ended screen consumes localized epilogue without touching ending mechanics',()=>{
  assert.ok(app.includes("tr(\`ending.\${endingDef.id}.epilogue\`,endingDef.epilogue)"));
  assert.ok(app.includes("r.status==='ended'&&endingDef"));
  assert.ok(app.includes('esc(endingBody)'));
});
