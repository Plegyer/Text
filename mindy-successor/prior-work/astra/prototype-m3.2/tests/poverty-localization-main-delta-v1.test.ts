import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('poverty localization main delta contract',()=>{
 const f=JSON.parse(readFileSync('content/poverty-localization-main-delta-v1.fixture.json','utf8'));
 const files=['poverty-street-production.json','poverty-street-production-v2.json','poverty-cheap-production.json','poverty-cheap-production-v2.json','poverty-recovery-production.json','poverty-pressure-production.json'];
 const events=files.flatMap(n=>JSON.parse(readFileSync('content/packs/'+n,'utf8')).events);
 const ids=events.map((e:any)=>e.id);
 const s=f.delta.strings;
 const keys=Object.keys(s);
 assert.equal(new Set(keys).size,84);
 assert.deepEqual(f.fallbackDebt,[]);
 for(const [k,v] of Object.entries(s) as [string,any][]){
  assert.ok(v.ru?.trim()&&v.en?.trim(),k);
  assert.equal(k.includes('.ru'),false,k);
  assert.equal(k.includes('.en'),false,k);
  if(k.startsWith('event.'))assert.ok(ids.some((id:string)=>k.startsWith('event.'+id+'.')),k);
 }
 const stage=JSON.parse(readFileSync('content/packs/stage.json','utf8'));
 for(const id of ['stage.outside','stage.room']){
  assert.ok(stage.media.some((m:any)=>m.id===id),id);
  assert.ok(s['media.'+id+'.alt'],id);
 }
 const raw=JSON.stringify(f.delta);
 for(const x of ['conditions','effects','reward','secret-debt','lender'])assert.equal(raw.toLowerCase().includes(x),false,x);
});
