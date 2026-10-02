import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {
  applyPresentation,presentationIdForEvent,presentationSlots,resolvePresentation
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const packs=readdirSync('content/packs')
  .filter(f=>f.startsWith('prostitute-')&&f.endsWith('.json'))
  .map(f=>JSON.parse(readFileSync('content/packs/'+f,'utf8')));
const events=packs.flatMap((p:any)=>p.events);

function bilingual(key:string){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('every live Prostitute event and choice has RU/EN production copy',()=>{
  assert.equal(events.length,34);
  for(const event of events){
    bilingual(`event.${event.id}.title`);
    for(const variant of event.variants)bilingual(`event.${event.id}.variant.${variant.id}.text`);
    for(const choice of event.choices){
      bilingual(`event.${event.id}.choice.${choice.id}.label`);
      bilingual(`event.${event.id}.choice.${choice.id}.text`);
    }
  }
  bilingual('nightChoice.prostitute.night.client-followup.label');
  for(const id of [
    'prostitute_formal_attire','prostitute_private_room_key',
    'prostitute_client_token','prostitute_evidence_case'
  ])bilingual(`item.${id}.label`);
});

test('all live Prostitute events resolve to the career static fallback with animations off',()=>{
  const checked=applyPresentation(catalog,presentation);
  const known=new Set(presentationSlots(checked).map(slot=>slot.id));
  for(const event of events){
    for(const variant of event.variants){
      const id=presentationIdForEvent(checked,event.id,variant.id);
      assert.ok(known.has(id),id);
      const resolved=resolvePresentation(
        checked,presentation,id,{animationsEnabled:false,occurrenceKey:'prostitute-production'}
      );
      assert.equal(resolved.textOnly,false,id);
      assert.equal(resolved.selected?.source,'override-static',id);
      assert.equal(resolved.selected?.src,'assets/presentation/career-prostitute-result.svg',id);
      assert.ok(existsSync(resolved.selected!.src),resolved.selected!.src);
    }
  }
  bilingual('presentation.static.career.prostitute.event.alt');
  bilingual('presentation.static.career.prostitute.event.caption');
});
