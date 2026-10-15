import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const ctx={};
runInNewContext(readFileSync(new URL('../undead-farm-core.js',import.meta.url),'utf8'),{globalThis:ctx,Math,Object,Number,Error,Array});
const F=ctx.SUSLIK2UndeadFarm;
const stats={strength:1,endurance:15,magic:10,reason:5};
const plain={season:'spring',energy:3,stats,shiftId:'day1-work1',lust:0,lustActivationCount:0};
test('all four seasons have canonical stat effects only',()=>{
 const expected={
  spring:{endurance:1,magic:1,reason:-1},
  summer:{endurance:1,strength:1},
  autumn:{endurance:1,reason:1,strength:-1},
  winter:{magic:1,reason:1}
 };
 for(const [season,values] of Object.entries(expected)){
  const r=F.receipt({...plain,season});
  assert.deepEqual(JSON.parse(JSON.stringify(r.statsDelta)),{...values,
    ...(season==='autumn'?{strength:0}:{}),
    ...(season==='spring'?{}:{})}); // strength never below 1
  assert.equal(r.itemsAdded.length,0);
  assert.equal(r.endingGranted,false);
  assert.equal(r.energyCost,1);
  assert.equal(r.paidShifts,1);
  assert.equal(r.resultArtSlot,F.ART[season]);
 }
});
test('wage uses PRE-work stats; round and cap to 120',()=>{
 assert.equal(F.calculateWage(stats),Math.round(37+.3*15+.3*10+.2*5));
 assert.equal(F.calculateWage({endurance:200,magic:200,reason:200}),120);
 for(const season of Object.keys(F.SEASON_EFFECTS)){
  assert.equal(F.receipt({...plain,season}).goldEarned,F.calculateWage(stats));
 }
});
test('minus cannot cross minimum 1, positive caps are optional host-provided',()=>{
 assert.equal(F.receipt({...plain,season:'autumn'}).statsDelta.strength,0);
 assert.equal(F.receipt({...plain,season:'spring',stats:{...stats,reason:1}}).statsDelta.reason,0);
 assert.equal(F.receipt({...plain,season:'winter',statCaps:{magic:10,reason:5}}).statsDelta.magic,0);
 assert.equal(F.receipt({...plain,season:'winter',statCaps:{magic:10,reason:5}}).statsDelta.reason,0);
});
test('shared lust chance; each third alternative +1, ordinary outcome remains paid',()=>{
 const noLuck=F.receipt({...plain,lust:24},()=>{throw Error('must not roll');});
 assert.equal(noLuck.alternateResult,false);
 const hit=F.receipt({...plain,lust:25,lustActivationCount:2},()=>0.2499);
 assert.equal(hit.alternateResult,true);
 assert.equal(hit.lustDelta,1);
 assert.equal(hit.lustActivationCountAfter,3);
 assert.equal(hit.goldEarned,noLuck.goldEarned);
 assert.equal(hit.energyCost,1);
 assert.equal(hit.resultArtSlot,'undead-farm/shift/lust-pending');
 const miss=F.receipt({...plain,lust:25,lustActivationCount:2},()=>0.25);
 assert.equal(miss.alternateResult,false);
 assert.equal(miss.lustActivationCountAfter,2);
 const hundred=F.receipt({...plain,lust:100},()=>.99999);
 assert.equal(hundred.alternateResult,true);
});
test('cannot work at zero energy or silently replay duplicate work',()=>{
 assert.throws(()=>F.receipt({...plain,energy:0}),/energy/);
 assert.throws(()=>F.receipt({...plain,stats:{...stats,endurance:0}}));
 assert.throws(()=>F.receipt({...plain,season:'monsoon'}));
 let n=0;const callback=receipt=>(n++,receipt);
 const fresh=F.settle(plain,{committedShiftIds:[],commitOrdinaryPaidShift:callback});
 assert.equal(fresh.career,'undead-farm');assert.equal(n,1);
 const same=F.settle(plain,{committedShiftIds:['day1-work1'],commitOrdinaryPaidShift:callback});
 assert.equal(same.kind,'already-committed');assert.equal(n,1);
});
test('UI and map are host-bound; no duplicate Save, fake audio or item UI',()=>{
 const ui=readFileSync(new URL('../undead-farm-ui.js',import.meta.url),'utf8');
 const map=readFileSync(new URL('../map.mjs',import.meta.url),'utf8');
 const html=readFileSync(new URL('../map.html',import.meta.url),'utf8');
 for(const phrase of ['Работать','Продолжить работу','Вернуться домой'])assert.match(ui,new RegExp(phrase));
 assert.doesNotMatch(ui,/localStorage|sessionStorage|new Audio|farm_produce/);
 assert.match(ui,/commitOrdinaryPaidShift/);
 assert.match(map,/loc.id==='undead_farm'/);
 assert.match(html,/undead-farm-core.js/);
 assert.match(html,/undead-farm-ui.js/);
});
