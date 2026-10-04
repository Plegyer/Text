import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForActivityRoute,
  presentationIdForEvent,
  presentationSchema
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

const assassinPacks=readdirSync('content/packs')
  .filter(name=>name.startsWith('assassin-')&&name.endsWith('.json'))
  .map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

const assassinSrc='assets/presentation/career-assassin-result.svg';
const assassinAltKey='presentation.static.career.assassin.result.alt';

function bilingual(key:string){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('v23 presentation patch remains schema-valid and project-owned',()=>{
  presentationSchema.parse(presentation);
  applyPresentation(catalog,presentation);
  for(const slot of Object.values(presentation.slots) as any[]){
    if(slot?.static?.src) assert.doesNotMatch(slot.static.src,/^(?:https?:)?\/\//i,slot.static.src);
  }
});

test('all 41 Assassin-authored event variants use the existing Assassin result master',()=>{
  const rows=[] as Array<{event:any;variant:any}>;
  for(const pack of assassinPacks){
    for(const event of pack.events??[]){
      if(event.sourceDomain!=='assassin')continue;
      for(const variant of event.variants??[])rows.push({event,variant});
    }
  }
  assert.equal(rows.length,41);

  for(const {event,variant} of rows){
    const id=presentationIdForEvent(catalog,event.id,variant.id);
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    assert.equal(slot.static.src,assassinSrc,id);
    assert.equal(slot.static.altKey,assassinAltKey,id);
  }
  assert.ok(existsSync(assassinSrc),assassinSrc);
  bilingual(assassinAltKey);
});

test('all eight Assassin infiltration route/return slots use Assassin context, not forest context',()=>{
  const activity=definitions.activities.find((item:any)=>item.id==='assassin.infiltration');
  assert.ok(activity);

  const routeIds=[
    presentationIdForActivityRoute(catalog,'assassin.infiltration',undefined),
    ...[...new Set(activity.options.map((option:any)=>option.setRoute).filter(Boolean))]
      .map((route:any)=>presentationIdForActivityRoute(catalog,'assassin.infiltration',route))
  ];
  const returnIds=activity.results.map((result:any)=>`activity/infiltration/return/${result.outcome}`);
  const ids=[...routeIds,...returnIds];

  assert.equal(ids.length,8);
  for(const id of ids){
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    assert.equal(slot.static.src,assassinSrc,id);
    assert.equal(slot.static.altKey,assassinAltKey,id);
    assert.doesNotMatch(slot.static.src,/forest|hunter/i,id);
  }
});

test('Secret Debt repay/rest/rent-room use approved existing poverty/town/room media with bilingual alt keys',()=>{
  const expected={
    'location/town/repay/default':{
      src:'assets/presentation/poverty-pressure.svg',
      altKey:'presentation.static.poverty.pressure.alt'
    },
    'night/rest/default':{
      src:'assets/stage-town.svg',
      altKey:'media.base.town.alt'
    },
    'night/rent-room/default':{
      src:'assets/stage-room.svg',
      altKey:'media.stage.room.alt'
    }
  } as const;

  for(const [id,row] of Object.entries(expected)){
    const slot=presentation.slots[id];
    assert.ok(slot?.static,id);
    assert.equal(slot.static.src,row.src,id);
    assert.equal(slot.static.altKey,row.altKey,id);
    assert.ok(existsSync(row.src),row.src);
    bilingual(row.altKey);
    assert.doesNotMatch(slot.static.src,/school/i,id);
  }
});

test('all 40 authored seasonal career sub-scenes reuse the matching existing seasonal master',()=>{
  const targetCareers=new Set(['satyr-maid','undead-farm','tavern','hunter','guard']);
  const seasons=new Set(['spring','summer','autumn','winter']);
  const rows=[] as Array<{career:string;season:string;id:string}>;

  for(const action of definitions.actions){
    const career=String(action.id).split(/[./]/)[0];
    if(!targetCareers.has(career))continue;
    for(const scene of action.scenes??[]){
      const parts=String(scene.id).split('.');
      const season=parts[0];
      if(!seasons.has(season)||parts.length<2||parts.at(-1)==='default')continue;
      rows.push({
        career,
        season,
        id:`job/${career}/shift/${parts.join('/')}/default`
      });
    }
  }

  assert.equal(rows.length,40);
  for(const row of rows){
    const parent=presentation.slots[`job/${row.career}/shift/${row.season}/default`];
    const slot=presentation.slots[row.id];
    assert.ok(parent?.static,row.id+' parent');
    assert.ok(slot?.static,row.id);
    assert.equal(slot.static.src,parent.static.src,row.id+' src');
    assert.equal(slot.static.altKey,parent.static.altKey,row.id+' altKey');
    assert.ok(existsSync(slot.static.src),slot.static.src);
    bilingual(slot.static.altKey);
  }
});

test('Forest hunter-trail reuses the approved existing neutral Forest route master',()=>{
  const base=presentation.slots['activity/forest/route/default'];
  const hunterTrail=presentation.slots['activity/forest/route/hunter-trail'];
  assert.ok(base?.static);
  assert.ok(hunterTrail?.static);
  assert.equal(hunterTrail.static.src,base.static.src);
  assert.equal(hunterTrail.static.altKey,base.static.altKey);
  assert.equal(hunterTrail.static.src,'assets/presentation/forest-route-default-v1.svg');
  assert.ok(existsSync(hunterTrail.static.src));
  bilingual(hunterTrail.static.altKey);
});
