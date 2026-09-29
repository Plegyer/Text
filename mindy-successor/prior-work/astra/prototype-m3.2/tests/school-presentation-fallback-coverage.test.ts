import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSchema,presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/starter-school-presentation-source-manifest-v1.json','utf8'));

const courseSlots=manifest.slots.filter((entry:any)=>entry.domain==='school'&&entry.role==='course-lesson');
const teacherMedia=manifest.mediaSurfaces.filter((entry:any)=>entry.domain==='school'&&entry.role==='teacher-classroom');

test('eight School course semantic slots already have project-owned static fallback',()=>{
  presentationSchema.parse(presentation);
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.equal(courseSlots.length,8);
  for(const entry of courseSlots){
    assert.ok(known.has(entry.presentationId),entry.presentationId);
    const slot=presentation.slots?.[entry.presentationId];
    assert.ok(slot?.static,entry.presentationId);
    assert.equal(slot.static.kind,'image',entry.presentationId);
    assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId);
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
  }
});

test('eight existing School teacher media identities keep a valid static image fallback',()=>{
  assert.equal(teacherMedia.length,8);
  for(const entry of teacherMedia){
    const media=catalog.media.find(item=>item.id===entry.mediaId);
    assert.ok(media,entry.mediaId);
    assert.equal(media.kind,'image',entry.mediaId);
    assert.equal(media.src,entry.sourceAsset,entry.mediaId);
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
  }
});
