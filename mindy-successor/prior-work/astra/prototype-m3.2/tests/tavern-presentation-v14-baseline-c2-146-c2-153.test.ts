import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {
  applyPresentation,
  presentationIdForEnding,
  presentationSlots,
  resolvePresentation
} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

const seasons=['spring','summer','autumn','winter'] as const;
const endingIds=['ending.tavern.innkeeper','ending.tavern.information-broker','ending.tavern.sanctuary','ending.tavern.hard-work'] as const;

test('C2-146 Tavern seasonal work uses only existing project-owned static assets until a safe motion source exists',()=>{
  const checked=applyPresentation(catalog,presentation);
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));

  for(const season of seasons){
    const id=`job/tavern/shift/${season}/default`;
    const slot=presentation.slots?.[id];
    assert.ok(registry.has(id),id+' registry');
    assert.ok(slot?.static,id+' static');
    assert.equal(slot.static.kind,'image',id);
    assert.equal(slot.static.src,`assets/presentation/career-tavern-shift-${season}.svg`,id);
    assert.ok(existsSync(slot.static.src),slot.static.src);
    assert.equal(slot.primary,undefined,id+' no invented primary');
    assert.equal(slot.pool,undefined,id+' no invented pool');

    for(const key of [slot.static.altKey,slot.static.altKey.replace(/\.alt$/,'.caption')]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }

    const on=resolvePresentation(checked,presentation,id,{animationsEnabled:true,occurrenceKey:'c2-146'});
    const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-146'});
    assert.equal(on.textOnly,false,id+' on');
    assert.equal(off.textOnly,false,id+' off');
    assert.equal(on.selected?.src,slot.static.src,id+' on');
    assert.equal(off.selected?.src,slot.static.src,id+' off');
    assert.equal(on.selected?.kind,'image',id+' on kind');
    assert.equal(off.selected?.kind,'image',id+' off kind');
  }
});

test('C2-153 all assigned Tavern ending identities preserve distinct live semantic slots and stable static fallbacks',()=>{
  const checked=applyPresentation(catalog,presentation);
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const mapped=endingIds.map(id=>presentationIdForEnding(id));

  assert.deepEqual(mapped,[
    'ending/tavern/innkeeper',
    'ending/tavern/information-broker',
    'ending/tavern/sanctuary',
    'ending/tavern/hard-work'
  ]);
  assert.equal(new Set(mapped).size,4,'ending semantic IDs remain distinct');

  for(let i=0;i<endingIds.length;i++){
    const endingId=endingIds[i]!;
    const presentationId=mapped[i]!;
    const ending=catalog.definitions.endings.find(item=>item.id===endingId);
    const slot=presentation.slots?.[presentationId];

    assert.ok(ending,endingId+' live ending');
    assert.ok(registry.has(presentationId),presentationId+' registry');
    assert.ok(slot?.static,presentationId+' static');
    assert.ok(existsSync(slot.static.src),slot.static.src);

    for(const key of [
      `ending.${endingId}.title`,
      `ending.${endingId}.description`,
      slot.static.altKey,
      slot.static.altKey.replace(/\.alt$/,'.caption')
    ]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }

    const resolved=resolvePresentation(checked,presentation,presentationId,{
      animationsEnabled:false,
      occurrenceKey:'c2-153'
    });
    assert.equal(resolved.textOnly,false,presentationId);
    assert.equal(resolved.selected?.src,slot.static.src,presentationId);
    assert.equal(resolved.selected?.kind,'image',presentationId);
  }
});

test('C2-145 baseline keeps seasonal surfaces and canonical D41 Tavern ending identities live',()=>{
  const published=new Set(Object.keys(presentation.slots??{}).filter(id=>id.includes('tavern')));
  for(const id of [
    'job/tavern/result/default',
    ...seasons.map(season=>`job/tavern/shift/${season}/default`),
    ...endingIds.map(id=>presentationIdForEnding(id))
  ])assert.ok(published.has(id),id);
});
