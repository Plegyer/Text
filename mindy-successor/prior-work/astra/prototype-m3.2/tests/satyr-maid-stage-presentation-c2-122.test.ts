import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots,SATYR_MAID_PRESENTATION_STAGES,presentationIdForSatyrMaidStage} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');

test('C2-122 reserves all C1D-97 Satyr Maid stage presentation IDs with project-owned static fallback',()=>{
 assert.equal(SATYR_MAID_PRESENTATION_STAGES.length,9);
 const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
 for(const stage of SATYR_MAID_PRESENTATION_STAGES){
  const id=presentationIdForSatyrMaidStage(stage);
  assert.ok(known.has(id),id+' registry');
  const slot=presentation.slots[id];
  assert.ok(slot?.static,id+' static');
  assert.equal(slot.static.src,'assets/presentation/career-satyr-maid-result.svg',id);
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(localization[slot.static.altKey]?.ru?.trim(),slot.static.altKey+' ru');
  assert.ok(localization[slot.static.altKey]?.en?.trim(),slot.static.altKey+' en');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  assert.ok(localization[caption]?.ru?.trim(),caption+' ru');
  assert.ok(localization[caption]?.en?.trim(),caption+' en');
  const label=`presentation.satyr-maid.stage.${stage}.label`;
  assert.ok(localization[label]?.ru?.trim(),label+' ru');
  assert.ok(localization[label]?.en?.trim(),label+' en');
 }
});

test('C2-122 Work UI consumes a persisted Satyr stage only as presentation metadata',()=>{
 assert.match(app,/presentationIdForSatyrMaidStage\(satyrStage\)/);
 assert.match(app,/data-satyr-maid-stage=/);
 assert.match(app,/data-stage-presentation-id=/);
 assert.match(app,/data-career-stage=/);
 assert.doesNotMatch(app,/advanceCareer\([^\n]*satyr-maid/);
});
