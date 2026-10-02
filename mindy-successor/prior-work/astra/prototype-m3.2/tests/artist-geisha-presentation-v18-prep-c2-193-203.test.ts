import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForArtistGeishaItem,
  presentationIdForArtistGeishaRelationshipStage,
  presentationIdForArtistGeishaStage,
  presentationIdForArtistGeishaState,
  presentationIdForEnding,
  presentationSlots,
  resolvePresentation,
  ARTIST_GEISHA_ADVANCED_STATUS_IDS,
  ARTIST_GEISHA_DRAFT_STAGE_FAMILIES,
  ARTIST_GEISHA_ITEM_IDS,
  ARTIST_GEISHA_RELATIONSHIP_STAGES,
  ARTIST_GEISHA_SCHOOL_EVENT_IDS,
  ARTIST_GEISHA_SEASONAL_EVENT_IDS
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const animationManifest=JSON.parse(readFileSync('content/presentation-drafts/project-owned-animation-source-manifest-v4.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');
const styleSource=readFileSync('src/ui/style.css','utf8');

function assertLocalizedStatic(id:string){
  const slot=presentation.slots?.[id];
  assert.ok(slot?.static,id+' static');
  assert.ok(existsSync(slot.static.src),slot.static.src);
  assert.ok(slot.static.altKey,id+' altKey');
  const captionKey=slot.static.altKey.replace(/\.alt$/,'.caption');
  for(const key of [slot.static.altKey,captionKey]){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
}

test('C2-193..194 shipped Artist House ordinary presentation remains exact, localized and static-safe',()=>{
  const action=catalog.definitions.actions.find(item=>item.id==='artist-geisha.shift');
  const career=catalog.definitions.careers?.find(item=>item.id==='artist-geisha');
  assert.ok(action);
  assert.ok(career);
  assert.equal(action.cost.energy,1);
  assert.deepEqual(career.stages,['novice']);
  assert.deepEqual(
    catalog.definitions.endings.filter(ending=>ending.id.includes('artist-geisha')).map(ending=>ending.id),
    ['ending.artist-geisha.hard-work']
  );

  const ids=[
    'job/artist-geisha/result/default',
    'job/artist-geisha/shift/spring/default',
    'job/artist-geisha/shift/summer/default',
    'job/artist-geisha/shift/autumn/default',
    'job/artist-geisha/shift/winter/default',
    'ending/artist-geisha/hard-work'
  ];
  const checked=applyPresentation(catalog,presentation);
  for(const id of ids){
    assertLocalizedStatic(id);
    const a=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-203'});
    const b=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-203'});
    assert.equal(a.textOnly,false,id);
    assert.equal(a.selected?.source,'override-static',id);
    assert.equal(a.selected?.src,b.selected?.src,id+' deterministic');
  }
});

test('C2-195..202 Artist preparation vocabulary is exact and remains live-catalog gated on activation baseline',()=>{
  assert.deepEqual([...ARTIST_GEISHA_DRAFT_STAGE_FAMILIES],[
    'novice','performer','recognized-artist','veteran',
    'master-artist','patron-network','court-invitation','outcome-ready'
  ]);
  assert.deepEqual([...ARTIST_GEISHA_RELATIONSHIP_STAGES],[
    'introduced','professional-trust','conflict-open','utility-ready','route-resolved'
  ]);
  assert.deepEqual([...ARTIST_GEISHA_ITEM_IDS],[
    'artist_formal_attire','artist_performance_kit','artist_invitation_token'
  ]);
  assert.deepEqual([...ARTIST_GEISHA_ADVANCED_STATUS_IDS],[
    'veteran-ready','master-artist-ready','patron-network-ready','court-invitation-ready','outcome-ready'
  ]);
  assert.deepEqual([...ARTIST_GEISHA_SEASONAL_EVENT_IDS],[
    'artist-geisha.season.spring-program',
    'artist-geisha.season.summer-evening',
    'artist-geisha.season.autumn-festival',
    'artist-geisha.season.winter-salon'
  ]);
  assert.deepEqual([...ARTIST_GEISHA_SCHOOL_EVENT_IDS],[]);

  const known=new Set(presentationSlots(catalog).map(slot=>slot.id));
  assert.ok(known.has(presentationIdForArtistGeishaStage('novice')));
  for(const stage of ARTIST_GEISHA_DRAFT_STAGE_FAMILIES.filter(stage=>stage!=='novice')){
    assert.equal(known.has(presentationIdForArtistGeishaStage(stage)),false,stage+' absent before runtime publication');
  }
  for(const stage of ARTIST_GEISHA_RELATIONSHIP_STAGES){
    assert.equal(known.has(presentationIdForArtistGeishaRelationshipStage(stage)),false,stage+' relationship absent');
  }
  for(const itemId of ARTIST_GEISHA_ITEM_IDS){
    assert.equal(known.has(presentationIdForArtistGeishaItem(itemId)),false,itemId+' item absent');
  }
  for(const stateId of ARTIST_GEISHA_ADVANCED_STATUS_IDS){
    assert.equal(known.has(presentationIdForArtistGeishaState(stateId)),false,stateId+' readiness absent');
  }
});

test('C2-197 winter Artist animation sources remain project-owned preparation with no fabricated GIF path',()=>{
  const seqs=animationManifest.sequences.filter((item:any)=>item.presentationId==='job/artist-geisha/shift/winter/default');
  assert.equal(seqs.length,3);
  for(const seq of seqs){
    assert.equal(seq.exportReady,true);
    assert.equal(seq.gifPath,null);
    assert.equal(seq.frames.length,4);
    assert.equal(seq.staticFallback,'assets/presentation/career-artist-geisha-shift-winter.svg');
    assert.ok(existsSync(seq.staticFallback),seq.staticFallback);
    for(const frame of seq.frames)assert.ok(existsSync(frame),frame);
  }
  assert.equal(animationManifest.summary.actualGifPaths,0);
});

test('C2-198..202 Artist semantics do not imply School, Palace or public complex endings',()=>{
  assert.equal(presentationIdForArtistGeishaState('court-invitation-ready'),'job/artist-geisha/state/court-invitation-ready');
  assert.equal(presentationIdForArtistGeishaState('court-invitation-ready').startsWith('palace/'),false);
  assert.equal(presentationIdForArtistGeishaItem('artist_invitation_token').startsWith('palace/'),false);
  assert.equal(presentationIdForEnding('ending.artist-geisha.hard-work'),'ending/artist-geisha/hard-work');
  for(const id of [
    'ending/artist-geisha/master-artist',
    'ending/artist-geisha/patron-network',
    'ending/artist-geisha/court-invitation'
  ])assert.equal(presentation.slots?.[id],undefined,id);
});

test('C2-203 Artist presentation resolution is Save-neutral and preserves keyboard/focus/static fallback infrastructure',()=>{
  const save=started();
  const before=JSON.stringify(save);
  const checked=applyPresentation(catalog,presentation);
  for(const id of [
    'job/artist-geisha/result/default',
    'job/artist-geisha/shift/spring/default',
    'job/artist-geisha/shift/summer/default',
    'job/artist-geisha/shift/autumn/default',
    'job/artist-geisha/shift/winter/default',
    'ending/artist-geisha/hard-work'
  ]){
    resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'artist-c2-203-save'});
  }
  assert.equal(JSON.stringify(save),before);
  assert.match(styleSource,/button:focus-visible/);
  assert.match(appSource,/#close'\)\?\.focus\(\)/);
  assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
});
