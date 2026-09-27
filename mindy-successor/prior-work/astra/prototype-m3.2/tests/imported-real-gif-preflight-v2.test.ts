import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';

const blockerPath='../../../docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md';
const inventoryPath='../../../docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md';
const productionGifRoot='assets/gif';

function collectGifs(root:string):string[]{
  if(!existsSync(root))return [];
  const out:string[]=[];
  const walk=(dir:string)=>{
    for(const name of readdirSync(dir,{withFileTypes:true})){
      const full=join(dir,name.name);
      if(name.isDirectory())walk(full);
      else if(name.isFile()&&/\.gif$/i.test(name.name))out.push(full);
    }
  };
  walk(root);
  return out.sort();
}

test('item 174 blocker is explicit and no production GIF import is falsely claimed',()=>{
  assert.equal(existsSync(blockerPath),true,'item 174 blocker evidence must exist');
  const blocker=readFileSync(blockerPath,'utf8');
  assert.match(blocker,/BLOCKED \/ NO GIF FILES IMPORTED/);
  assert.match(blocker,/three semantically compatible, rights-clear GIF assets/i);

  const gifs=collectGifs(productionGifRoot);
  assert.deepEqual(gifs,[],'blocked item 174 must not leave imported production GIF files');
});

test('item 175 inventory records zero actual imported production candidates',()=>{
  assert.equal(existsSync(inventoryPath),true,'item 175 technical inventory must exist');
  const inventory=readFileSync(inventoryPath,'utf8');
  assert.match(inventory,/Item 174 imported \*\*0 production GIF files\*\*/);
  assert.match(inventory,/BLOCKED_BY_REAL_ASSETS/);
});

test('test-only GIF fixtures are not accepted as evidence of a production import',()=>{
  const productionGifs=collectGifs(productionGifRoot);
  assert.equal(productionGifs.length,0);

  // The separate media-asset-preflight test may generate valid GIF bytes in a
  // temporary directory. Those bytes are intentionally outside assets/gif and
  // must never satisfy this production-import assertion.
  const blocker=readFileSync(blockerPath,'utf8');
  assert.match(blocker,/Only a physical repository blob|physical repository/i);
});
