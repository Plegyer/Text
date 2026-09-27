import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {loadCatalog} from '../src/core/content.ts';
import {
  applyPresentation,
  presentationSchema,
  presentationSlots,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const draft=JSON.parse(
  readFileSync('content/presentation-drafts/starter-trio-media-batch-v1.json','utf8')
);

const seasons=['spring','summer','autumn','winter'] as const;

function targetAction(id:'satyr-maid.shift'|'undead-farm.shift',mediaRoot:string){
  return {
    id,
    label:id,
    description:'Minimal explicit PR34 presentation fixture for long-lived worker branch validation.',
    cost:{money:0,energy:1},
    conditions:[],
    effects:[],
    mode:'normal' as const,
    scenes:seasons.map(season=>({
      id:`${season}.default`,
      text:`${id} ${season}`,
      conditions:[],
      media:[`${mediaRoot}.${season}`]
    }))
  };
}

function catalogWithExplicitPr34Slots(){
  const definitions=structuredClone(catalog.definitions);
  definitions.actions.push(
    targetAction('satyr-maid.shift','stage.tavern') as any,
    targetAction('undead-farm.shift','stage.hunt') as any
  );
  return loadCatalog(definitions,structuredClone(catalog.packs));
}

test('worker branch limitation is explicit: PR34 starter actions are not locally merged',()=>{
  assert.equal(catalog.definitions.actions.some(a=>a.id==='satyr-maid.shift'),false);
  assert.equal(catalog.definitions.actions.some(a=>a.id==='undead-farm.shift'),false);
});

test('starter-trio draft is presentation-schema valid without invented GIF paths',()=>{
  const parsed=presentationSchema.parse(draft);
  assert.equal(parsed.version,1);
  assert.equal(Object.keys(parsed.slots??{}).length,15);
  const serialized=JSON.stringify(parsed);
  assert.equal(serialized.includes('.gif'),false);
  assert.equal(serialized.includes('data:image/gif'),false);
});

test('minimal explicit PR34 fixture exposes all referenced semantic IDs',()=>{
  const targetCatalog=catalogWithExplicitPr34Slots();
  const known=new Set(presentationSlots(targetCatalog).map(slot=>slot.id));
  for(const id of Object.keys(draft.slots)){
    assert.ok(known.has(id),id);
  }
  assert.doesNotThrow(()=>applyPresentation(targetCatalog,draft));
});

test('animations-off keeps a usable static fallback for every draft slot',()=>{
  const targetCatalog=catalogWithExplicitPr34Slots();
  for(const [id,override] of Object.entries(draft.slots) as [string,any][]){
    const resolved=resolvePresentation(targetCatalog,draft,id,{animationsEnabled:false});
    assert.equal(resolved.requestedId,id);
    assert.equal(resolved.textOnly,false,id);
    assert.ok(resolved.candidates.some(candidate=>
      candidate.kind==='image'&&candidate.src===override.static.src
    ),id);
  }
});

test('presentation resolution does not mutate save/gameplay state',()=>{
  const targetCatalog=catalogWithExplicitPr34Slots();
  const state=started();
  const before=structuredClone(state);
  for(const id of Object.keys(draft.slots)){
    resolvePresentation(targetCatalog,draft,id,{animationsEnabled:true});
    resolvePresentation(targetCatalog,draft,id,{animationsEnabled:false});
  }
  assert.deepEqual(state,before);
});

test('Satyr Maid and Undead Farm remain separate semantic identities despite base-media reuse',()=>{
  const targetCatalog=catalogWithExplicitPr34Slots();
  for(const season of seasons){
    const satyrId=`job/satyr-maid/shift/${season}/default`;
    const farmId=`job/undead-farm/shift/${season}/default`;
    assert.notEqual(satyrId,farmId);

    const satyr=resolvePresentation(targetCatalog,draft,satyrId,{animationsEnabled:false});
    const farm=resolvePresentation(targetCatalog,draft,farmId,{animationsEnabled:false});

    assert.equal(satyr.requestedId,satyrId);
    assert.equal(farm.requestedId,farmId);
    assert.ok(satyr.candidates.some(candidate=>candidate.src==='assets/stage-tavern.svg'));
    assert.ok(farm.candidates.some(candidate=>candidate.src==='assets/stage-forest.svg'));
  }

  assert.notEqual(
    'job/satyr-maid/result/default',
    'job/undead-farm/result/default'
  );
});
