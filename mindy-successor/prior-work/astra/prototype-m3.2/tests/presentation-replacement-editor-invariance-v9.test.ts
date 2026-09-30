import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));
const replacement='assets/stage-town.svg';

test('all queue-v9 semantic bindings are replaceable without gameplay identity or Save serialization mutation',()=>{
  const originalDefinitions=structuredClone(catalog.definitions);
  const originalEventIds=catalog.events.map(event=>event.id);
  const save=freshSave();
  const saveJson=JSON.stringify(save);
  const slots:any={};
  for(const entry of manifest.reachability.activeExact){
    slots[entry.presentationId]={
      static:{kind:'image',src:replacement,alt:'Queue v9 replacement preview.'}
    };
  }
  const patch={version:1,texts:{},media:{},slots};
  presentationSchema.parse(patch);
  const checked=applyPresentation(catalog,patch);

  assert.deepEqual(checked.definitions,originalDefinitions);
  assert.deepEqual(checked.events.map(event=>event.id),originalEventIds);
  assert.equal(JSON.stringify(save),saveJson);
  assert.equal((save as any).presentation,undefined);

  for(const entry of manifest.reachability.activeExact){
    const resolved=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'editor-v9'});
    assert.equal(resolved.requestedId,entry.presentationId,entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId);
    assert.equal(resolved.selected?.src,replacement,entry.presentationId);
  }
});

test('all eight School teacher media identities are replaceable without definition or Save mutation',()=>{
  const originalDefinitions=structuredClone(catalog.definitions);
  const save=freshSave();
  const saveJson=JSON.stringify(save);
  const media:any={};
  for(const row of manifest.schoolParity.courseRows){
    media[row.teacherMediaId]={kind:'image',src:replacement,alt:'Queue v9 teacher replacement preview.'};
  }
  const patch={version:1,texts:{},media};
  const checked=applyPresentation(catalog,patch);
  assert.deepEqual(checked.definitions,originalDefinitions);
  assert.equal(JSON.stringify(save),saveJson);

  for(const row of manifest.schoolParity.courseRows){
    const item=checked.media.find(mediaItem=>mediaItem.id===row.teacherMediaId);
    assert.ok(item,row.teacherMediaId);
    assert.equal(item.id,row.teacherMediaId);
    assert.equal(item.src,replacement,row.teacherMediaId);
  }
});

test('editor implementation keeps presentation persistence separate from life Save operations',()=>{
  const editor=readFileSync('src/ui/editor.ts','utf8');
  const app=readFileSync('src/ui/app.ts','utf8');
  assert.doesNotMatch(editor,/from ['"]\.\.\/core\/engine/);
  assert.match(editor,/save\(next\)/);
  assert.match(editor,/Presentation-замены хранятся отдельно от сохранения жизни/);

  const marker="mountEditor(editor,baseCatalog,patch,next=>";
  const start=app.indexOf(marker);
  assert.ok(start>=0,'editor mount callback');
  const tail=app.slice(start,start+500);
  assert.match(tail,/portal-life\.presentation\.v1/);
  assert.doesNotMatch(tail,/await write\(|dispatch\(/);
  assert.equal(manifest.replacementEditorInvariance.presentationStorageSeparate,true);
});
