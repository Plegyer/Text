import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const binding=JSON.parse(readFileSync('content/prostitute-authored-v21-binding-plan.fixture.json','utf8'));
const source=JSON.parse(readFileSync('content/prostitute-authored-copy-v21.fixture.json','utf8'));
const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));

test('C3-240 exact current Prostitute consumers are LIVE_BOUND',()=>{
  assert.deepEqual(binding.shippedAuthorityBindings,[
    {consumerId:'prostitute.shift',status:'LIVE_BOUND',kind:'action'},
    {consumerId:'prostitute',status:'LIVE_BOUND',kind:'career'},
    {consumerId:'prostitute.shift#spring.default',status:'LIVE_BOUND',kind:'actionScene'},
    {consumerId:'prostitute.shift#summer.default',status:'LIVE_BOUND',kind:'actionScene'},
    {consumerId:'prostitute.shift#autumn.default',status:'LIVE_BOUND',kind:'actionScene'},
    {consumerId:'prostitute.shift#winter.default',status:'LIVE_BOUND',kind:'actionScene'},
    {consumerId:'ending.prostitute.hard-work',status:'LIVE_BOUND',kind:'ending'},
  ]);
  const action=defs.actions.find((x:any)=>x.id==='prostitute.shift');
  assert.deepEqual(action.scenes.map((x:any)=>'prostitute.shift#'+x.id),binding.shippedAuthorityBindings.filter((x:any)=>x.kind==='actionScene').map((x:any)=>x.consumerId));
  assert.ok(defs.careers.some((x:any)=>x.id==='prostitute'));
  assert.ok(defs.endings.some((x:any)=>x.id==='ending.prostitute.hard-work'));
});

test('C3-240 every future adult Night relationship route and payoff source is PENDING_RUNTIME_ID unless explicitly unowned',()=>{
  const relevant=new Set(['adult-work','night','relationship','routes','ending-payoff']);
  for(const e of binding.entries.filter((x:any)=>relevant.has(x.section))){
    if(['night.secret-debt-firewall','ending.no-public-id','ending.no-meta-authority'].includes(e.contentKey))assert.equal(e.status,'NO_AUTHORITY_NOT_BINDABLE',e.contentKey);
    else if(e.contentKey==='ending.hard-work-live')assert.equal(e.status,'LIVE_BOUND',e.contentKey);
    else assert.equal(e.status,'PENDING_RUNTIME_ID',e.contentKey);
  }
});

test('C3-240 forbidden assumptions are never bound',()=>{
  for(const x of binding.forbiddenAssumptions)assert.equal(x.status,'NO_AUTHORITY_NOT_BINDABLE',x.identity);
  assert.equal(binding.policy.modifiesProduction,false);
  assert.equal(binding.policy.createsGameplayIds,false);
  assert.equal(binding.policy.freezeCandidate,false);
  const palace=binding.exactCrossAuthority.palace;
  assert.equal(palace.status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.deepEqual(palace.currentActionConsumers,[]);
  assert.deepEqual(palace.currentCareerConsumers,[]);
  assert.deepEqual(palace.currentItemConsumers,[]);
  assert.deepEqual(palace.currentRelationshipConsumers,[]);
  assert.deepEqual(palace.currentNightConsumers,[]);
});

test('C3-240 binding manifest covers every authored source identity exactly once',()=>{
  assert.equal(binding.entries.length,source.entries.length);
  assert.equal(new Set(binding.entries.map((x:any)=>x.contentKey)).size,source.entries.length);
  assert.deepEqual(new Set(binding.entries.map((x:any)=>x.contentKey)),new Set(source.entries.map((x:any)=>x.contentKey)));
  for(const e of binding.entries){
    assert.ok(['LIVE_BOUND','PENDING_RUNTIME_ID','NO_AUTHORITY_NOT_BINDABLE'].includes(e.status),e.contentKey);
    if(e.status==='PENDING_RUNTIME_ID')assert.equal(e.runtimeConsumerId,'PENDING_RUNTIME_ID',e.contentKey);
    if(e.status==='NO_AUTHORITY_NOT_BINDABLE')assert.equal(e.runtimeConsumerId,null,e.contentKey);
  }
});
