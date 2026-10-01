import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const careers=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
const seasons=['spring','summer','autumn','winter'];
const expected=careers.flatMap(career=>seasons.map(season=>({
 id:`job/${career}/shift/${season}/default`,
 src:`assets/presentation/career-${career}-shift-${season}.svg`,
 altKey:`presentation.static.career.${career}.shift.${season}.alt`,
 captionKey:`presentation.static.career.${career}.shift.${season}.caption`
})));

test('all 40 ordinary-career seasonal semantic slots use project-owned static SVGs',()=>{
 presentationSchema.parse(presentation);
 const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
 assert.equal(expected.length,40);
 for(const row of expected){
  assert.ok(known.has(row.id),row.id);
  const slot=presentation.slots[row.id];
  assert.ok(slot?.static,row.id);
  assert.equal(slot.static.kind,'image',row.id);
  assert.equal(slot.static.src,row.src,row.id);
  assert.equal(slot.static.altKey,row.altKey,row.id);
  assert.ok(localization[row.altKey]?.ru?.trim(),row.altKey+' ru');
  assert.ok(localization[row.altKey]?.en?.trim(),row.altKey+' en');
  assert.ok(localization[row.captionKey]?.ru?.trim(),row.captionKey+' ru');
  assert.ok(localization[row.captionKey]?.en?.trim(),row.captionKey+' en');
  assert.ok(existsSync(row.src),row.src);
  assert.ok(existsSync('dist/'+row.src),'dist/'+row.src);
  assert.equal(readFileSync('dist/'+row.src,'utf8'),readFileSync(row.src,'utf8'),row.src+' build copy');
 }
});

test('seasonal static selection remains deterministic and animation-mode independent',()=>{
 const checked=applyPresentation(catalog,presentation);
 for(const row of expected){
  const on=resolvePresentation(checked,presentation,row.id,{animationsEnabled:true,occurrenceKey:'same'});
  const off=resolvePresentation(checked,presentation,row.id,{animationsEnabled:false,occurrenceKey:'same'});
  const slot=presentation.slots[row.id];
  if(slot.pool){
   assert.equal(on.selected?.source,'override-pool',row.id+' animations on source');
   assert.ok(slot.pool.candidates.some((candidate:any)=>candidate.src===on.selected?.src),row.id+' animations on pool member');
   assert.ok(slot.pool.candidates.some((candidate:any)=>candidate.altKey===on.selected?.altKey),row.id+' animations on alt key');
  }else{
   assert.equal(on.selected?.src,row.src,row.id+' animations on');
   assert.equal(on.selected?.altKey,row.altKey,row.id+' alt key');
  }
  assert.equal(off.selected?.src,row.src,row.id+' animations off');
  assert.equal(off.selected?.altKey,row.altKey,row.id+' alt key off');
 }
});

test('seasonal static production patch is presentation-only and locale-neutral',()=>{
 for(const row of expected){
  assert.doesNotMatch(row.id,/(?:^|\/)(?:ru|en)(?:\/|$)/i,row.id);
  assert.doesNotMatch(row.src,/(?:^|\/)(?:ru|en)(?:\/|[-_.])/i,row.src);
 }
 const serialized=JSON.stringify(expected);
 assert.doesNotMatch(serialized,/https?:\/\//i);
 assert.doesNotMatch(serialized,/conditions|effects|rewards|energyCost|rng|saveState/i);
});
