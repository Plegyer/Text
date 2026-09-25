import test from 'node:test';import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {applyPresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const keys=[
  'action/lumber/scene/spring','action/lumber/scene/summer','action/lumber/scene/autumn','action/lumber/scene/winter',
  'action/hunt/scene/spring','action/hunt/scene/summer','action/hunt/scene/autumn','action/hunt/scene/winter',
] as const;
const patch=JSON.parse(readFileSync('content/presentation-drafts/DS-007.json','utf8'));

test('DS-007: ровно восемь сезонных текстов, media пустой, механика не меняется',()=>{
  assert.deepEqual(Object.keys(patch.texts).sort(),[...keys].sort());
  assert.deepEqual(patch.media,{});
  assert.equal(patch.version,1);
  for(const [k,t] of Object.entries(patch.texts) as [string,string][])assert.ok(t.length>=120&&t.length<=450,`длина вне 120–450: ${k}`);
  assert.equal(new Set(Object.values(patch.texts)).size,keys.length,'повтор текста');
});

test('DS-007: applyPresentation подставляет все восемь постановок и не трогает каталог',()=>{
  const before=JSON.stringify(catalog);
  const result=applyPresentation(catalog,patch);
  for(const key of keys){
    const [,action,,season]=key.split('/');
    const scene=result.definitions.actions.find(a=>a.id===action)!.scenes!.find(v=>v.id===season)!;
    assert.equal(scene.text,patch.texts[key]);
  }
  // Условия, стоимость, эффекты, сезонные эффекты и заработок остаются прежними.
  const restored=structuredClone(result);
  for(const key of keys){
    const [,action,,season]=key.split('/');
    restored.definitions.actions.find(a=>a.id===action)!.scenes!.find(v=>v.id===season)!.text=
      catalog.definitions.actions.find(a=>a.id===action)!.scenes!.find(v=>v.id===season)!.text;
  }
  assert.deepEqual(restored,catalog,'кроме восьми текстов изменилось содержимое каталога');
  const byId=(list:typeof catalog.definitions.actions)=>new Map(list.map(a=>[a.id,a]));
  const src=byId(catalog.definitions.actions),dst=byId(result.definitions.actions);
  for(const id of ['lumber','hunt']){
    assert.deepEqual(dst.get(id)!.cost,src.get(id)!.cost);
    assert.deepEqual(dst.get(id)!.effects,src.get(id)!.effects);
    assert.deepEqual(dst.get(id)!.wage,src.get(id)!.wage);
    assert.deepEqual(dst.get(id)!.seasonal,src.get(id)!.seasonal);
    assert.deepEqual(dst.get(id)!.conditions,src.get(id)!.conditions);
    assert.deepEqual(dst.get(id)!.scenes!.map(s=>s.id),src.get(id)!.scenes!.map(s=>s.id));
    assert.deepEqual(dst.get(id)!.scenes!.map(s=>s.media),src.get(id)!.scenes!.map(s=>s.media));
  }
  assert.equal(JSON.stringify(catalog),before,'исходный каталог изменён');
});

test('DS-007: неизвестный ключ отклоняется',()=>{
  assert.throws(()=>applyPresentation(catalog,{...patch,texts:{unknown:'Подмена'}}));
});
