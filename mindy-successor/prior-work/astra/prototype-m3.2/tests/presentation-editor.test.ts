import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('editor replacement workflow is presentationId-first and file-picker based',async()=>{
  const source=await readFile('src/ui/editor.ts','utf8');
  assert.match(source,/Поиск presentationId/);
  assert.match(source,/Выбрать GIF для presentationId/);
  assert.match(source,/Выбрать static fallback/);
  assert.match(source,/resolvePresentation/);
  assert.doesNotMatch(source,/Путь медиа/);
  assert.doesNotMatch(source,/placeholder='assets\//);
});

test('central stage and editor preview share one aspect token',async()=>{
  const css=await readFile('src/ui/style.css','utf8');
  assert.match(css,/--stage-aspect:16 \/ 9/);
  assert.match(css,/\.stage\{[^}]*aspect-ratio:var\(--stage-aspect\)/);
  assert.match(css,/\.presentation-preview\{[^}]*aspect-ratio:var\(--stage-aspect\)/);
});

test('central media renderer falls through failures without GIF timing hooks',async()=>{
  const app=await readFile('src/ui/app.ts','utf8');
  const start=app.indexOf('function mediaHTML');
  const end=app.indexOf('function central()',start);
  const renderer=app.slice(start,end);
  assert.match(renderer,/resolvePresentation/);
  assert.match(app,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
  assert.doesNotMatch(renderer,/onended|duration|setTimeout/);
});
