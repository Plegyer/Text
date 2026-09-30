import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {actionAvailable} from '../src/core/engine.ts';
import {presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/queue-v6-presentation-surface-manifest-v1.json','utf8'));
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const app=readFileSync('src/ui/app.ts','utf8');

function bilingual(pair:any,label:string){
  assert.ok(pair?.ru?.trim(),label+' ru');
  assert.ok(pair?.en?.trim(),label+' en');
}

test('Work availability manifest matches current engine policy without introducing unlock logic',()=>{
  const state=started();
  assert.equal(manifest.careerAvailability.length,10);
  assert.equal(manifest.invariants.noUnlockLogicChanges,true);
  const expectedAvailable=new Set(['lumber','satyr-maid','undead-farm']);
  for(const entry of manifest.careerAvailability){
    const action=catalog.definitions.actions.find(item=>item.id===entry.actionId);
    assert.ok(action,entry.actionId);
    const available=actionAvailable(action,state,catalog);
    assert.equal(available,expectedAvailable.has(entry.careerId),entry.careerId);
    assert.equal(entry.currentPresentationState,available?'available':'locked',entry.careerId);
    if(!available)assert.deepEqual(action.conditions,[],entry.careerId+' no guessed unlock condition');
  }
});

test('locked career accessibility metadata is bilingual and anchored to current action presentation identities',()=>{
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const locked=manifest.careerAvailability.filter((entry:any)=>entry.currentPresentationState==='locked');
  assert.equal(locked.length,7);
  for(const entry of locked){
    bilingual(localization[`action.${entry.actionId}.label`],entry.actionId+' label');
    bilingual(localization[`action.${entry.actionId}.description`],entry.actionId+' description');
    bilingual(entry.accessibility?.stateLabel,entry.actionId+' state');
    bilingual(entry.accessibility?.controlHelp,entry.actionId+' help');
    assert.match(entry.accessibility.stateLabel.ru,/недоступ/i);
    assert.match(entry.accessibility.stateLabel.en,/unavailable/i);
    assert.equal(entry.relatedPresentationIds.length,5,entry.careerId);
    for(const id of entry.relatedPresentationIds){
      assert.ok(registry.has(id),id);
      const resolved=resolvePresentation(catalog,presentation,id,{animationsEnabled:false,occurrenceKey:'locked-career-a11y'});
      assert.equal(resolved.textOnly,false,id);
      assert.ok(resolved.selected?.src,id);
    }
  }
});

test('Work UI keeps current localized card identity and disabled-state consumer without changing unlock policy',()=>{
  assert.ok(app.includes("const label=tr(\`action.\${a.id}.label\`,a.label);"));
  assert.ok(app.includes("const description=tr(\`action.\${a.id}.description\`,a.description);"));
  assert.ok(app.includes("${disabled(a)?'disabled':''}"));
  assert.equal(manifest.gameplayMutation,false);
  assert.equal(manifest.invariants.noGameplayFieldsChanged,true);
  assert.equal(manifest.invariants.noSaveOrRngMutation,true);
});
