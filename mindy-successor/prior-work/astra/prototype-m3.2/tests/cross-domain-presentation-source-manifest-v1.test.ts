import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {freshSave} from '../src/core/engine.ts';
import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const manifest=JSON.parse(readFileSync('content/presentation-drafts/cross-domain-presentation-source-manifest-v1.json','utf8'));

function assertBilingual(pair:any,label:string){
  assert.ok(pair?.ru?.trim(),label+' ru');
  assert.ok(pair?.en?.trim(),label+' en');
}

test('cross-domain manifest uses unique current semantic IDs and valid current-main fallback identities',()=>{
  presentationSchema.parse(presentation);
  const registry=new Map(presentationSlots(catalog).map(slot=>[slot.id,slot]));
  const seen=new Set<string>();
  assert.equal(manifest.summary.semanticSlots,38);
  assert.equal(manifest.summary.currentExactSemanticSlots,25);
  assert.equal(manifest.summary.preparedOverrideSemanticSlots,13);

  for(const entry of manifest.semanticSlots){
    assert.equal(seen.has(entry.presentationId),false,'duplicate '+entry.presentationId);
    seen.add(entry.presentationId);
    const semantic=registry.get(entry.presentationId);
    assert.ok(semantic,'unknown semantic ID '+entry.presentationId);
    assert.equal(semantic.fallbackId,entry.fallbackId,entry.presentationId+' fallback');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);

    if(entry.state==='current-exact'){
      const slot=presentation.slots?.[entry.presentationId];
      assert.ok(slot?.static,entry.presentationId+' production static');
      assert.equal(slot.static.src,entry.sourceAsset,entry.presentationId+' source');
      assert.equal(slot.static.altKey,entry.altKey,entry.presentationId+' altKey');
      assert.equal(entry.captionKey,entry.altKey.replace(/\.alt$/,'.caption'),entry.presentationId+' captionKey');
      assertBilingual(localization[entry.altKey],entry.altKey);
      assertBilingual(localization[entry.captionKey],entry.captionKey);
      const resolved=resolvePresentation(catalog,presentation,entry.presentationId,{animationsEnabled:false,occurrenceKey:'cross-domain-current'});
      assert.equal(resolved.textOnly,false,entry.presentationId);
      assert.equal(resolved.selected?.src,entry.sourceAsset,entry.presentationId);
    } else {
      assert.equal(entry.state,'prepared-override');
      assertBilingual(entry.accessibility?.alt,entry.presentationId+' prepared alt');
      assertBilingual(entry.accessibility?.caption,entry.presentationId+' prepared caption');
      assert.ok(entry.proposedAltKey?.endsWith('.alt'),entry.presentationId+' proposed alt key');
      assert.ok(entry.proposedCaptionKey?.endsWith('.caption'),entry.presentationId+' proposed caption key');
    }
  }
});

test('prepared Tavern and poverty overrides resolve by existing semantic ID without gameplay mutation',()=>{
  const prepared=manifest.semanticSlots.filter((entry:any)=>entry.state==='prepared-override');
  assert.equal(prepared.length,13);
  const patch:any={version:1,texts:{},media:{},slots:{}};
  for(const entry of prepared){
    patch.slots[entry.presentationId]={
      static:{kind:'image',src:entry.sourceAsset,alt:entry.accessibility.alt.ru}
    };
  }
  presentationSchema.parse(patch);
  const beforeDefinitions=structuredClone(catalog.definitions);
  const beforeSave=freshSave();
  const beforeSaveJson=JSON.stringify(beforeSave);
  const checked=applyPresentation(catalog,patch);
  assert.deepEqual(checked.definitions,beforeDefinitions);
  assert.equal(JSON.stringify(beforeSave),beforeSaveJson);

  for(const entry of prepared){
    const on=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:true,occurrenceKey:'cross-domain-prepared'});
    const off=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'cross-domain-prepared'});
    assert.equal(on.requestedId,entry.presentationId);
    assert.equal(off.requestedId,entry.presentationId);
    assert.equal(on.selected?.src,entry.sourceAsset,entry.presentationId+' on');
    assert.equal(off.selected?.src,entry.sourceAsset,entry.presentationId+' off');
    assert.equal(on.selected?.slotId,entry.presentationId);
    assert.equal(off.selected?.slotId,entry.presentationId);
  }
});

test('all selected semantic slots remain editor-replaceable without changing gameplay or Save identity',()=>{
  const originalDefinitions=structuredClone(catalog.definitions);
  for(const entry of manifest.semanticSlots){
    const patch:any={
      version:1,
      texts:{},
      media:{},
      slots:{
        [entry.presentationId]:{
          static:{kind:'image',src:'assets/stage-town.svg',alt:'Cross-domain replacement compatibility preview.'}
        }
      }
    };
    const beforeSave=freshSave();
    const beforeSaveJson=JSON.stringify(beforeSave);
    const checked=applyPresentation(catalog,patch);
    assert.deepEqual(checked.definitions,originalDefinitions,entry.presentationId+' definitions');
    assert.equal(JSON.stringify(beforeSave),beforeSaveJson,entry.presentationId+' save');
    const resolved=resolvePresentation(checked,patch,entry.presentationId,{animationsEnabled:false,occurrenceKey:'cross-domain-replacement'});
    assert.equal(resolved.requestedId,entry.presentationId);
    assert.equal(resolved.selected?.src,'assets/stage-town.svg',entry.presentationId);
    assert.equal(resolved.selected?.slotId,entry.presentationId,entry.presentationId);
  }
});

test('School teacher surfaces keep exact media identity, static source, bilingual handoff metadata and editor replacement',()=>{
  assert.equal(manifest.teacherMediaSurfaces.length,8);
  const seen=new Set<string>();
  const originalDefinitions=structuredClone(catalog.definitions);

  for(const entry of manifest.teacherMediaSurfaces){
    assert.equal(seen.has(entry.mediaId),false,'duplicate teacher media '+entry.mediaId);
    seen.add(entry.mediaId);
    const media=catalog.media.find(item=>item.id===entry.mediaId);
    assert.ok(media,entry.mediaId);
    assert.equal(media.kind,'image',entry.mediaId);
    assert.equal(media.src,entry.sourceAsset,entry.mediaId);
    assert.ok(media.alt.trim(),entry.mediaId+' fallback alt');
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    assertBilingual(entry.accessibility?.alt,entry.mediaId+' alt');
    assertBilingual(entry.accessibility?.caption,entry.mediaId+' caption');

    const patch:any={
      version:1,
      texts:{},
      media:{
        [entry.mediaId]:{kind:'image',src:'assets/stage-town.svg',alt:'Teacher media replacement preview.'}
      }
    };
    const beforeSave=freshSave();
    const beforeSaveJson=JSON.stringify(beforeSave);
    const checked=applyPresentation(catalog,patch);
    assert.deepEqual(checked.definitions,originalDefinitions,entry.mediaId+' definitions');
    assert.equal(JSON.stringify(beforeSave),beforeSaveJson,entry.mediaId+' save');
    const replaced=checked.media.find(item=>item.id===entry.mediaId);
    assert.equal(replaced?.src,'assets/stage-town.svg',entry.mediaId+' replacement');
    assert.equal(replaced?.id,entry.mediaId,entry.mediaId+' identity');
  }
});

test('cross-domain handoff respects queue boundaries',()=>{
  assert.equal(manifest.gameplayMutation,false);
  assert.equal(manifest.policies.currentMainProductionFilesPreserved,true);
  assert.equal(manifest.policies.secretDebtIncluded,false);
  assert.equal(manifest.policies.schoolTeacherGameplayIdsInvented,false);
  assert.equal(manifest.policies.existingSemanticIdsOnly,true);
  assert.equal(manifest.policies.noGameplayFieldsChanged,true);
  assert.equal(manifest.policies.noSaveOrRngMutation,true);
  assert.equal(manifest.semanticSlots.some((entry:any)=>/secret-debt|lender/i.test(entry.presentationId)),false);
  assert.deepEqual(
    manifest.documentedGaps.map((entry:any)=>entry.presentationId).sort(),
    ['ending/guild-life','ending/scholar-life']
  );
});
