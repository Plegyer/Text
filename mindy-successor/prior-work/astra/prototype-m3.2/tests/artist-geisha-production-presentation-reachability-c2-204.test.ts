import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {actionAvailable,calendar,dispatch,eligible} from '../src/core/engine.ts';
import {
  applyPresentation,
  presentationIdForArtistGeishaItem,
  presentationIdForArtistGeishaNightChoice,
  presentationIdForArtistGeishaRelationshipStage,
  presentationIdForArtistGeishaStage,
  presentationIdForArtistGeishaState,
  presentationIdForEnding,
  presentationIdForEvent,
  presentationSlots,
  resolvePresentation,
  ARTIST_GEISHA_ADVANCED_STATUS_IDS,
  ARTIST_GEISHA_ITEM_IDS,
  ARTIST_GEISHA_NIGHT_CHOICE_IDS,
  ARTIST_GEISHA_PRESENTATION_STAGES,
  ARTIST_GEISHA_PUBLIC_ENDING_IDS,
  ARTIST_GEISHA_RELATIONSHIP_STAGES,
  ARTIST_GEISHA_SCHOOL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';
import type {Save} from '../src/core/schema.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const appSource=readFileSync('src/ui/app.ts','utf8');

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>400)throw new Error('night loop');
    if(s.run.pending){
      const event=catalog.events.find(item=>item.id===s.run.pending!.eventId);
      assert.ok(event,s.run.pending!.eventId);
      const choice=event.choices.find(item=>eligible(item.conditions,s,catalog));
      assert.ok(choice,event.id);
      s=dispatch(s,{type:'choice',id:choice.id},catalog);
      continue;
    }
    if(s.run.flow.night?.phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(s.run.flow.night?.phase==='VoluntaryNightChoice'){
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+s.run.flow.night?.phase);
  }
  return s;
}

function assertLocalizedStatic(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' altKey');
  const caption=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,caption]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-204 frozen Artist runtime backs every presentation-owned semantic family',()=>{
  const career=catalog.definitions.careers?.find(item=>item.id==='artist-geisha');
  const relationship=catalog.definitions.relationships?.find(item=>item.id==='artist-geisha.mentor');
  assert.ok(career);
  assert.ok(relationship);
  assert.deepEqual(career.stages,[...ARTIST_GEISHA_PRESENTATION_STAGES]);
  assert.deepEqual(relationship.stages,[...ARTIST_GEISHA_RELATIONSHIP_STAGES]);
  assert.deepEqual([...ARTIST_GEISHA_SCHOOL_EVENT_IDS],[
    'd40.school.artist-geisha.arts',
    'd40.school.artist-geisha.literacy',
    'd40.school.artist-geisha.rhetoric',
    'd40.school.artist-geisha.etiquette'
  ]);

  const caps:Record<string,string>={
    artist_formal_attire:'artist_formal_presence',
    artist_performance_kit:'artist_performance_ready',
    artist_invitation_token:'artist_handle_invitation'
  };
  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));

  for(const stage of ARTIST_GEISHA_PRESENTATION_STAGES){
    assert.ok(known.has(presentationIdForArtistGeishaStage(stage)),stage);
  }
  for(const stage of ARTIST_GEISHA_RELATIONSHIP_STAGES){
    assert.ok(known.has(presentationIdForArtistGeishaRelationshipStage(stage)),stage);
  }
  for(const itemId of ARTIST_GEISHA_ITEM_IDS){
    const item=catalog.definitions.itemDefinitions.find(item=>String(item.id)===itemId);
    assert.ok(item,itemId);
    assert.ok(item.capabilities.includes(caps[itemId]!),itemId+' capability');
    assert.ok(known.has(presentationIdForArtistGeishaItem(itemId)),itemId+' presentation');
  }
  for(const choiceId of ARTIST_GEISHA_NIGHT_CHOICE_IDS){
    assert.ok(catalog.definitions.nightChoices.some(choice=>choice.id===choiceId),choiceId);
    assert.ok(known.has(presentationIdForArtistGeishaNightChoice(choiceId)),choiceId+' presentation');
  }

  const runtimeText=JSON.stringify({
    career,
    relationship,
    events:catalog.events.filter(event=>event.sourceDomain==='artist-geisha')
  });
  for(const stateId of ARTIST_GEISHA_ADVANCED_STATUS_IDS){
    assert.ok(runtimeText.includes(stateId),stateId+' backing');
    assert.ok(known.has(presentationIdForArtistGeishaState(stateId)),stateId+' presentation');
  }

  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('artist-geisha')).map(ending=>ending.id),
    [...ARTIST_GEISHA_PUBLIC_ENDING_IDS]
  );
  assert.ok(known.has(presentationIdForEnding('ending.artist-geisha.hard-work')));
  assert.equal([...known].some(id=>id.startsWith('palace/')&&id.includes('artist')),false);
});

test('C2-204 all frozen Artist events and variants resolve through exact live presentation IDs',()=>{
  const checked=applyPresentation(catalog,presentation);
  const known=new Set(presentationSlots(checked).map(slot=>slot.id));
  const events=checked.events.filter(event=>event.sourceDomain==='artist-geisha');
  assert.equal(events.length,29);

  const expected=new Set<string>();
  for(const event of events){
    for(const variant of event.variants){
      const id=presentationIdForEvent(checked,event.id,variant.id);
      expected.add(id);
      assert.ok(known.has(id),id);
      const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-204-event'});
      assert.equal(resolved.textOnly,false,id);
      assert.equal(resolved.selected?.source,'override-static',id);
      assert.ok(existsSync(resolved.selected!.src),resolved.selected!.src);
    }
  }
  assert.equal(expected.size,31);
  assert.equal(events.some(event=>event.id.startsWith('artist-geisha.school.')),false);
});

test('C2-204 Artist registry exposes exactly 61 frozen semantic surfaces and all are static-safe',()=>{
  const checked=applyPresentation(catalog,presentation);
  const expected=new Set<string>([
    'job/artist-geisha/result/default',
    'job/artist-geisha/shift/spring/default',
    'job/artist-geisha/shift/summer/default',
    'job/artist-geisha/shift/autumn/default',
    'job/artist-geisha/shift/winter/default',
    'ending/artist-geisha/hard-work'
  ]);

  for(const stage of ARTIST_GEISHA_PRESENTATION_STAGES)expected.add(presentationIdForArtistGeishaStage(stage));
  for(const stage of ARTIST_GEISHA_RELATIONSHIP_STAGES)expected.add(presentationIdForArtistGeishaRelationshipStage(stage));
  for(const itemId of ARTIST_GEISHA_ITEM_IDS)expected.add(presentationIdForArtistGeishaItem(itemId));
  for(const choiceId of ARTIST_GEISHA_NIGHT_CHOICE_IDS)expected.add(presentationIdForArtistGeishaNightChoice(choiceId));
  for(const stateId of ARTIST_GEISHA_ADVANCED_STATUS_IDS)expected.add(presentationIdForArtistGeishaState(stateId));
  for(const event of checked.events.filter(event=>event.sourceDomain==='artist-geisha')){
    for(const variant of event.variants)expected.add(presentationIdForEvent(checked,event.id,variant.id));
  }

  assert.equal(expected.size,61);
  const known=new Set(presentationSlots(checked).map(slot=>slot.id));
  const save=started();
  const before=JSON.stringify(save);
  for(const id of expected){
    assert.ok(known.has(id),id);
    const resolved=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-204-static'});
    assert.equal(resolved.textOnly,false,id);
    assert.equal(resolved.selected?.source,'override-static',id);
    assert.ok(existsSync(resolved.selected!.src),resolved.selected!.src);
  }
  assert.equal(JSON.stringify(save),before);

  for(const id of [
    'job/artist-geisha/result/default',
    'job/artist-geisha/shift/spring/default',
    'job/artist-geisha/shift/summer/default',
    'job/artist-geisha/shift/autumn/default',
    'job/artist-geisha/shift/winter/default',
    'ending/artist-geisha/hard-work'
  ])assertLocalizedStatic(id);
});

test('C2-204 real Year-3 Artist shift reaches ordinary result and first live milestone presentation',()=>{
  let state=started();
  const action=catalog.definitions.actions.find(item=>item.id==='artist-geisha.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(actionAvailable(action,state,catalog),false);

  while(calendar(state.run.day).year<3)state=finishNight(state);
  assert.equal(actionAvailable(action,state,catalog),true);

  state=dispatch(state,{type:'action',id:'artist-geisha.shift'},catalog);
  assert.equal(state.run.lastAction?.id,'artist-geisha.shift');
  assert.equal(state.run.lastAction?.presentationId,'job/artist-geisha/result/default');
  assert.equal(state.run.pending?.eventId,'artist-geisha.career.first-shift');

  const eventId=presentationIdForEvent(catalog,'artist-geisha.career.first-shift','default');
  assert.equal(state.run.pending?.presentationId,eventId);

  const ordinary=resolvePresentation(catalog,presentation,'job/artist-geisha/result/default',{animationsEnabled:false,occurrenceKey:'artist-c2-204-shift'});
  assert.equal(ordinary.selected?.source,'override-static');

  const milestone=resolvePresentation(catalog,presentation,eventId,{animationsEnabled:false,occurrenceKey:'artist-c2-204-first'});
  assert.equal(milestone.selected?.source,'override-static');
  assert.equal(milestone.selected?.src,presentation.slots['job/artist-geisha/result/default'].static.src);
});

test('C2-204 Artist Night choices have exact semantic consumers without changing NightFlow',()=>{
  for(const choiceId of ARTIST_GEISHA_NIGHT_CHOICE_IDS){
    const id=presentationIdForArtistGeishaNightChoice(choiceId);
    const resolved=resolvePresentation(catalog,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-204-night'});
    assert.equal(resolved.selected?.source,'override-static',choiceId);
    assert.equal(resolved.selected?.src,presentation.slots['job/artist-geisha/result/default'].static.src);
  }

  assert.match(appSource,/ARTIST_GEISHA_NIGHT_CHOICE_IDS/);
  assert.match(appSource,/data-artist-geisha-night-option/);
  assert.match(appSource,/presentationIdForArtistGeishaNightChoice/);
  assert.match(appSource,/ui\.artistGeisha\.nightChoiceAria/);
  assert.ok(localization['ui.artistGeisha.nightChoiceAria']?.ru?.trim());
  assert.ok(localization['ui.artistGeisha.nightChoiceAria']?.en?.trim());
});

test('C2-204 missing optional motion falls through to Artist static and shipped consumers remain intact',()=>{
  const resultId='job/artist-geisha/result/default';
  const staticSrc=presentation.slots[resultId].static.src;
  const synthetic:any={version:1,texts:{},media:{},slots:{
    [resultId]:{
      primary:{kind:'gif',src:'assets/presentation/missing-artist-c2-204.gif',alt:'Optional Artist animation.'},
      static:{kind:'image',src:staticSrc,alt:'Required Artist static fallback.'}
    }
  }};
  const checked=applyPresentation(catalog,synthetic);
  const resolved=resolvePresentation(checked,synthetic,resultId,{animationsEnabled:true,occurrenceKey:'artist-c2-204-missing'});
  assert.equal(resolved.candidates[0]?.src,'assets/presentation/missing-artist-c2-204.gif');
  assert.equal(resolved.candidates[1]?.source,'override-static');
  assert.equal(resolved.candidates[1]?.src,staticSrc);
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of [
    'job/lumber/result/default',
    'job/satyr-maid/result/default',
    'job/undead-farm/result/default',
    'job/tavern/result/default',
    'job/hunter/result/default',
    'job/guard/result/default',
    'job/merchant/result/default',
    'activity/forest/route/default',
    'location/town/default'
  ])assert.ok(known.has(id),id+' retained');

  const merchantIds=[...known].filter(id=>id.startsWith('job/merchant/')||id.startsWith('relationship/merchant-supplier/')||id.startsWith('ending/merchant/'));
  const artistIds=[...known].filter(id=>id.startsWith('job/artist-geisha/')||id.startsWith('relationship/artist-geisha-mentor/')||id.startsWith('night/artist-geisha/')||id.startsWith('ending/artist-geisha/'));
  assert.equal(artistIds.some(id=>merchantIds.includes(id)),false);
});
