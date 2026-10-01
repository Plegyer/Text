import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

function bilingual(key:string){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('all eight School courses have exact static source plus deterministic School-stage fallback',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  const rows=manifest.schoolParity.courseRows;
  assert.equal(rows.length,8);
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const checked=applyPresentation(catalog,presentation);
  for(const course of SCHOOL_COURSES){
    const row=rows.find((item:any)=>item.presentationId===course.presentationId);
    assert.ok(row,course.presentationId);
    assert.ok(registry.has(course.presentationId),course.presentationId);
    const slot=presentation.slots?.[course.presentationId];
    assert.ok(slot?.static,course.presentationId);
    assert.equal(slot.static.src,row.sourceAsset,course.presentationId);
    assert.equal(slot.static.altKey,row.altKey,course.presentationId);
    assert.ok(existsSync(row.sourceAsset),row.sourceAsset);
    bilingual(row.altKey);bilingual(row.captionKey);

    const exact=resolvePresentation(checked,presentation,course.presentationId,{animationsEnabled:false,occurrenceKey:'school-v9'});
    assert.equal(exact.selected?.src,row.sourceAsset,course.presentationId);

    const fallbackPatch={version:1,texts:{},media:{}};
    const fallback=resolvePresentation(catalog,fallbackPatch,course.presentationId,{animationsEnabled:false,occurrenceKey:'school-v9-fallback'});
    assert.equal(fallback.selected?.mediaId,'stage.school',course.presentationId);
    assert.equal(fallback.selected?.src,row.fallbackSourceAsset,course.presentationId);
  }
});

test('all eight existing School teacher media identities have live source and RU/EN alt-caption fallback metadata',()=>{
  const media=new Map(catalog.media.map(item=>[item.id,item]));
  const rows=manifest.schoolParity.courseRows;
  const teacherIds=new Set<string>();
  for(const row of rows){
    assert.ok(!teacherIds.has(row.teacherMediaId),row.teacherMediaId);
    teacherIds.add(row.teacherMediaId);
    const teacher=media.get(row.teacherMediaId);
    assert.ok(teacher,row.teacherMediaId);
    assert.equal(teacher.kind,'image',row.teacherMediaId);
    assert.equal(teacher.src,row.teacherSourceAsset,row.teacherMediaId);
    assert.ok(existsSync(row.teacherSourceAsset),row.teacherSourceAsset);
    bilingual(row.teacherAltKey);bilingual(row.teacherCaptionKey);
  }
  assert.equal(teacherIds.size,8);
  assert.equal(manifest.schoolParity.fixesRequired,0);
});
