import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
class Node {
 constructor(tag){this.tag=tag;this.children=[];this.listeners={};this.hidden=false;this.disabled=false;this.textContent='';this.className='';this.style={};}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=nodes;}
 setAttribute(key,value){this[key]=value;}
 addEventListener(name,fn){this.listeners[name]=fn;}
}
const sandbox={document:{createElement:tag=>new Node(tag)},Intl,console:{error(){}}};
runInNewContext(readFileSync(new URL('../undead-farm-core.js',import.meta.url),'utf8'),sandbox);
runInNewContext(readFileSync(new URL('../undead-farm-ui.js',import.meta.url),'utf8'),sandbox);
const find=(node,check)=>{
 if(check(node))return node;
 for(const child of node.children){
  if(child&&typeof child==='object'){const match=find(child,check);if(match)return match;}
 }
 return null;
};
const button=(root,label)=>find(root,x=>x.tag==='button'&&x.textContent===label);
test('preview map has real UI and functional Return, but cannot grant fake work',()=>{
 const root=new Node('div');let home=0;
 const farm=sandbox.SUSLIK2UndeadFarmUI.mount(root,{goToMap:()=>{home++;}});
 farm.open();
 assert.equal(button(root,'Работать').disabled,true);
 assert.ok(button(root,'Вернуться домой'));
 assert.equal(find(root,x=>x.tag==='img')?.src,'assets/undead-farm/shift-summer.png');
 button(root,'Вернуться домой').listeners.click();
 assert.equal(home,1);
});
test('mounted farm host displays result and continues, without auto-paid entry',async()=>{
 const root=new Node('div');
 let calls=0,goHome=0;
 let s={season:'autumn',energy:3,maxEnergy:3,stats:{strength:1,endurance:15,magic:10,reason:5},
  lust:0,lustActivationCount:0,nextShiftId:'night-0-work-0',committedShiftIds:[],farmView:'work',farmLastReceipt:null};
 const host={
  readState:()=>s,
  commitOrdinaryPaidShift:receipt=>{
   assert.ok(!s.committedShiftIds.includes(receipt.receiptId));
   calls++;
   s={...s,energy:s.energy-1,stats:{...s.stats,...Object.fromEntries(Object.entries(receipt.statsDelta).map(([key,v])=>[key,s.stats[key]+v]))},
    committedShiftIds:[...s.committedShiftIds,receipt.receiptId],farmLastReceipt:receipt,nextShiftId:'next-'+calls};
   return s;
  },
  setFarmView:view=>{s.farmView=view;},
  goToMap:()=>{goHome++;}
 };
 sandbox.SUSLIK2UndeadFarmUI.mount(root,host).open();
 assert.equal(calls,0,'enter does not automatically work');
 assert.equal(button(root,'Работать').disabled,false);
 await button(root,'Работать').listeners.click();
 assert.equal(calls,1);
 assert.equal(s.energy,2);
 assert.equal(s.farmLastReceipt.goldEarned,46);
 assert.equal(s.farmLastReceipt.statsDelta.strength,0);
 assert.equal(s.farmView,'result');
 assert.ok(button(root,'Продолжить работу'));
 await button(root,'Продолжить работу').listeners.click();
 assert.equal(s.farmView,'work');
 assert.equal(calls,1,'continue does not trigger second paid shift');
 button(root,'Вернуться домой').listeners.click();
 assert.equal(goHome,1);
});
