import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/tavern-authored-copy-v15.fixture.json','utf8'));

function authored(node:any,out:any[]=[]):any[]{
  if(Array.isArray(node)){for(const x of node)authored(x,out);return out;}
  if(!node||typeof node!=='object')return out;
  if(typeof node.contentKey==='string'&&typeof node.ru==='string'&&typeof node.en==='string')out.push(node);
  for(const value of Object.values(node))authored(value,out);
  return out;
}

test('C3-158..167 source manifest is bilingual, live-bound and contract-only',()=>{
  assert.equal(fixture.status,'SOURCE_MANIFEST_LIVE_BOUND');
  assert.equal(fixture.contract.runtimeProducerHead,'38c58ccdaa1d357f189cd640053d0b2a8605b9b4');
  assert.equal(fixture.bindingPolicy.createsGameplayIds,false);
  assert.equal(fixture.bindingPolicy.useProducerEventIdsOnly,true);
  assert.equal(fixture.bindingPolicy.liveBound,true);
  const all=authored(fixture);
  assert.equal(all.length,44);
  for(const row of all){
    assert.ok(row.ru.trim().length>=40,row.contentKey+' RU');
    assert.ok(row.en.trim().length>=40,row.contentKey+' EN');
  }
  const raw=JSON.stringify(all);
  for(const name of ['Marek','Elian','Bronn','Ren','Silan','Марек','Элиан','Бронн','Рен','Силан']){
    assert.equal(new RegExp('(^|[^\\p{L}])'+name+'([^\\p{L}]|$)','iu').test(raw),false,name);
  }
  assert.deepEqual(fixture.mechanics,{
    effects:[],runtimeChanges:[],endingChanges:[],schoolChanges:[],nightFlowChanges:[],economyNumberChanges:[],secretDebtChanges:[]
  });
});
