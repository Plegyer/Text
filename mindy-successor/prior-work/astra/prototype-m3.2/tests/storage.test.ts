import test from 'node:test';import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';import {tmpdir} from 'node:os';import {join} from 'node:path';import {createRequire} from 'node:module';
import {freshSave,parseSave} from '../src/core/engine.ts';import {catalog,act,started} from './helpers.ts';
const {createStore}=createRequire(import.meta.url)('../desktop/save-store.cjs');
test('atomic disk saves, fallback backup and serialized writes',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'portal-save-'));
  try{
    const store=createStore(dir,(text:string)=>parseSave(text,catalog));assert.equal(await store.read(),null);
    const first=started(),second=act(first,'tavern');await store.save(JSON.stringify(first));await store.save(JSON.stringify(second));
    assert.equal(JSON.parse((await store.read()).text).run.slot,1);
    await writeFile(join(dir,'save-v1.json'),'truncated');const recovered=await store.read();assert.equal(recovered.recovered,true);assert.equal(JSON.parse(recovered.text).run.slot,0);
    await store.save(JSON.stringify(second));assert.equal(JSON.parse(await readFile(join(dir,'save-v1.json.bak'),'utf8')).run.slot,0);
    await assert.rejects(()=>store.save('invalid'));assert.equal(JSON.parse((await store.read()).text).run.slot,1);
    await Promise.all([store.save(JSON.stringify(first)),store.save(JSON.stringify(second))]);assert.equal(JSON.parse((await store.read()).text).run.slot,1);
  }finally{await rm(dir,{recursive:true,force:true});}
});
