import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {catalog} from './helpers.ts';
import {presentationIdForActionResult,presentationIdForActivityRoute,presentationIdForEvent,presentationIdForEnding,resolvePresentation} from '../src/core/presentation.ts';

const localization=JSON.parse(readFileSync('content/localization.json','utf8'));
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const packs=readdirSync('content/packs').filter(f=>f.startsWith('assassin-')&&f.endsWith('.json')).map(f=>JSON.parse(readFileSync('content/packs/'+f,'utf8')));

test('every Assassin event surface has RU and EN production localization',()=>{
 for(const pack of packs)for(const event of pack.events){
  const keys=[
   `event.${event.id}.title`,
   ...event.variants.map((v:any)=>`event.${event.id}.variant.${v.id}.text`),
   ...event.choices.flatMap((c:any)=>[`event.${event.id}.choice.${c.id}.label`,`event.${event.id}.choice.${c.id}.text`])
  ];
  for(const key of keys){
   assert.equal(typeof localization.strings[key]?.ru,'string',key+' ru');
   assert.equal(typeof localization.strings[key]?.en,'string',key+' en');
   assert.ok(localization.strings[key].ru.trim().length>0,key+' ru');
   assert.ok(localization.strings[key].en.trim().length>0,key+' en');
  }
 }
});

test('Assassin action, event, Activity, and ending have stable semantic presentation fallbacks',()=>{
 const action=catalog.definitions.actions.find(a=>a.id==='assassin.shift'); assert.ok(action);
 for(const scene of action.scenes??[]){
  const id=presentationIdForActionResult(catalog,'assassin.shift',scene.media);
  const resolved=resolvePresentation(catalog,presentation,id,{animationsEnabled:false});
  assert.ok(resolved.selected,id);
 }
 const eventId=presentationIdForEvent(catalog,'assassin.contract.offer','default');
 assert.ok(resolvePresentation(catalog,presentation,eventId,{animationsEnabled:false}).selected,eventId);
 const activityId=presentationIdForActivityRoute(catalog,'assassin.infiltration','local-route');
 assert.ok(resolvePresentation(catalog,presentation,activityId,{animationsEnabled:false}).selected,activityId);
 const endingId=presentationIdForEnding('ending.assassin.hard-work');
 assert.ok(resolvePresentation(catalog,presentation,endingId,{animationsEnabled:false}).selected,endingId);
});

test('natural Explore UI exposes the Assassin-owned Activity through the existing shared consumer',()=>{
 const app=readFileSync('src/ui/app.ts','utf8');
 assert.match(app,/activityEntryList\(\['lumber\.forest','hunter\.expedition','assassin\.infiltration'\]\)/);
});
