import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));
const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
const media=new Map(catalog.media.map(item=>[item.id,item]));

test('queue-v9 source inventory is de-duplicated and project-owned',()=>{
  const rows=manifest.sourceIntegrity.uniqueProjectOwnedSources;
  assert.equal(rows.length,manifest.sourceIntegrity.uniqueSourceCount);
  const paths=rows.map((row:any)=>row.sourceAsset);
  assert.equal(new Set(paths).size,paths.length);
  assert.equal(manifest.sourceIntegrity.duplicateSourceRows,0);
  for(const row of rows){
    assert.match(row.sourceAsset,/^assets\/[a-zA-Z0-9/_-]+\.(?:svg|png|jpg|jpeg|webp)$/);
    assert.ok(existsSync(row.sourceAsset),'missing source '+row.sourceAsset);
    const built='dist/'+row.sourceAsset;
    assert.ok(existsSync(built),'missing built '+built);
    assert.deepEqual(readFileSync(built),readFileSync(row.sourceAsset),'dist/source mismatch '+row.sourceAsset);
    assert.ok(row.semanticIds.length+row.mediaIds.length>0,'unreferenced inventory row '+row.sourceAsset);
  }
});

test('every source inventory reference points to a live semantic or media identity',()=>{
  for(const row of manifest.sourceIntegrity.uniqueProjectOwnedSources){
    for(const id of row.semanticIds){
      assert.ok(registry.has(id),'dead semantic '+id);
      if(id!=='location/town/default'){
        const slot=presentation.slots?.[id];
        if(slot?.static)assert.equal(slot.static.src,row.sourceAsset,id+' source');
      }
    }
    for(const id of row.mediaIds){
      const current=media.get(id);
      assert.ok(current,'dead media '+id);
      assert.equal(current.src,row.sourceAsset,id+' source');
    }
  }
  assert.equal(manifest.sourceIntegrity.deadIdentityReferenceCount,0);
});

test('every selected exact semantic binding is represented exactly once in the source inventory',()=>{
  const seen=new Map<string,number>();
  for(const source of manifest.sourceIntegrity.uniqueProjectOwnedSources){
    for(const id of source.semanticIds)seen.set(id,(seen.get(id)??0)+1);
  }
  for(const row of manifest.reachability.activeExact){
    assert.equal(seen.get(row.presentationId),1,row.presentationId);
  }
  assert.equal(manifest.sourceIntegrity.missingSourceCount,0);
});
