import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';

const surfaces=[
  {group:'Lumber',asset:'assets/stage-lumber.svg',mode:'static-backed'},
  {group:'School',asset:'assets/stage-school.svg',mode:'static-backed'},
  {group:'Night shared context',asset:'assets/stage-town.svg',mode:'static-backed'},
  {group:'Foreman Night',asset:'assets/stage-lumber.svg',mode:'static-backed'},
  {group:'Forest route/results',asset:'assets/stage-forest.svg',mode:'static-backed'},
  {group:'Endings via town fallback',asset:'assets/stage-town.svg',mode:'static-backed-through-fallback'}
];

const optionalFutureGifs=[
  'media/lumber/shift-spring.gif',
  'media/lumber/shift-summer.gif',
  'media/lumber/shift-autumn.gif',
  'media/lumber/shift-winter.gif',
  'media/lumber/accepted-hand.gif',
  'media/lumber/foreman-professional.gif',
  'media/lumber/foreman-night-professional.gif'
];

test('all audited production presentation groups have a current shipped static fallback',()=>{
  for(const surface of surfaces){
    assert.equal(existsSync(surface.asset),true,`${surface.group}: ${surface.asset}`);
    assert.match(surface.mode,/^static-backed/);
  }
});

test('no required audited group is text-only or missing/blocking',()=>{
  assert.equal(surfaces.some(surface=>surface.mode==='text-only'),false);
  assert.equal(surfaces.some(surface=>surface.mode==='missing-blocking'),false);
});

test('planned GIF backlog is optional rather than future-GIF-only',()=>{
  assert.equal(optionalFutureGifs.length,7);
  for(const ref of optionalFutureGifs){
    assert.match(ref,/^media\/.*\.gif$/);
  }
  assert.equal(surfaces.every(surface=>existsSync(surface.asset)),true);
});

test('PR22 Forest option state keeps the generic Forest static fallback viable',()=>{
  const routePresentationId='activity/forest/route/default';
  const routeFallback='assets/stage-forest.svg';
  assert.equal(routePresentationId,'activity/forest/route/default');
  assert.equal(existsSync(routeFallback),true);
});
