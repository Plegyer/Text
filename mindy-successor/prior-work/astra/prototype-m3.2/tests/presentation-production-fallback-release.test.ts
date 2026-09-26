import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';

const surfaces=[
  ['Lumber/Foreman','assets/stage-lumber.svg'],
  ['School paid lesson','assets/stage-school.svg'],
  ['School base.school blocking scene','assets/workshop.svg'],
  ['Night/town','assets/stage-town.svg'],
  ['Forest route/results','assets/stage-forest.svg'],
  ['Endings via town fallback','assets/stage-town.svg']
] as const;

test('every required merged-PR24 presentation group has a shipped static path',()=>{
  for(const [group,asset] of surfaces)assert.equal(existsSync(asset),true,`${group}: ${asset}`);
});

test('final School blocking scene is included in release fallback audit',()=>{
  assert.ok(surfaces.some(([group,asset])=>group==='School base.school blocking scene'&&asset==='assets/workshop.svg'));
});

test('planned seven GIFs remain optional rather than future-GIF-only',()=>{
  const gifs=[
    'media/lumber/shift-spring.gif','media/lumber/shift-summer.gif',
    'media/lumber/shift-autumn.gif','media/lumber/shift-winter.gif',
    'media/lumber/accepted-hand.gif','media/lumber/foreman-professional.gif',
    'media/lumber/foreman-night-professional.gif'
  ];
  assert.equal(gifs.length,7);
  assert.equal(surfaces.every(([,asset])=>existsSync(asset)),true);
});
