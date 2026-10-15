/* SUSLIK 2 farm window. Requires the existing shared gameplay host for paid work.
 * No localStorage, calendar, Audio, alternative stat store, or simulated rewards.
 */
(function(target){
'use strict';
const labels={spring:'Весна',summer:'Лето',autumn:'Осень',winter:'Зима'};
const statNames={strength:'Сила',endurance:'Выносливость',magic:'Магия',reason:'Разум'};
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
function btn(text,action,disabled=false){
 const node=el('button','undead-farm-button',text);node.type='button';node.disabled=disabled;
 if(action)node.addEventListener('click',action);return node;
}
function art(path,alt){
 const frame=el('div','undead-farm-art');const img=el('img');img.src=path;img.alt=alt;img.loading='eager';
 const missing=el('p','undead-farm-media-missing','Иллюстрация этого сезона ещё не опубликована в GitHub.');missing.hidden=true;
 img.addEventListener('error',()=>{img.hidden=true;missing.hidden=false;});
 frame.append(img,missing);return frame;
}
function comma(value){return new Intl.NumberFormat('ru-RU').format(value);}
function changes(deltas){
 const entries=Object.entries(deltas||{}).filter(([,v])=>v!==0);
 if(!entries.length)return 'Характеристики без изменений';
 return entries.map(([k,v])=>(statNames[k]||k)+' '+(v>0?'+':'')+v).join(' · ');
}
function mount(container,adapter){
 if(!container||typeof container.replaceChildren!=='function')throw TypeError('farm UI: container required');
 let pending=false,wasOpened=false,errorMessage='';
 const core=target.SUSLIK2UndeadFarm;if(!core)throw Error('farm UI: farm core not loaded');
 const integrated=!!adapter&&['readState','commitOrdinaryPaidShift','setFarmView','goToMap'].every(k=>typeof adapter[k]==='function');
 const previewState={season:'summer',energy:0,maxEnergy:3,stats:{strength:1,endurance:1,reason:1,magic:1},lust:0,lustActivationCount:0,committedShiftIds:[],farmView:'work'};
 function read(){return integrated?adapter.readState():previewState;}
 const alert=(value)=>{const paragraph=el('p','undead-farm-status',value);paragraph.setAttribute('role','status');return paragraph;};
 function close(){if(adapter&&typeof adapter.goToMap==='function')adapter.goToMap();else{container.replaceChildren();container.hidden=true;}}
 function render(){
  const s=read()||previewState;
  if(!labels[s.season])throw Error('farm UI: valid current season required from host');
  const result=s.farmView==='result'?s.farmLastReceipt:null;
  const frame=el('section','undead-farm-window');frame.setAttribute('aria-label','Работа на ферме зомби');
  const heading=el('div','undead-farm-heading');
  heading.append(el('span','undead-farm-kicker','SUSLIK 2 · ФЕРМА НЕЖИТИ'),el('h2','undead-farm-title','Ферма зомби'));
  const season=el('span','undead-farm-season',labels[s.season]);heading.append(season);frame.append(heading);
  const selected=result?.season||s.season;
  if(result?.alternateResult){
   const slot=el('div','undead-farm-art undead-farm-art--pending');
   slot.append(el('p','', 'Альтернативная иллюстрация пока не предоставлена.'));frame.append(slot);
  }else frame.append(art(core.seasonArt(selected),'Амалия работает на ферме зомби — '+labels[selected].toLowerCase()));
  const pane=el('div','undead-farm-details');
  if(result){
   pane.append(el('h3','','Рабочая смена завершена'));
   pane.append(el('p','undead-farm-result','Заработано: '+comma(result.goldEarned)+' золотых'));
   pane.append(el('p','undead-farm-deltas','−1 энергия · '+changes(result.statsDelta)));
   if(result.lustDelta)pane.append(el('p','undead-farm-deltas','Похоть +'+result.lustDelta));
  }else{
   pane.append(el('p','','Текущий сезон: '+labels[s.season]+'. Работа стоит 1 энергию.'));
   pane.append(el('p','undead-farm-preview-wage','Оплата смены: '+comma(core.calculateWage(s.stats))+' золотых.'));
  }
  pane.append(el('p','undead-farm-energy','Энергия: '+(Number.isFinite(s.energy)?s.energy:'—')+' / '+(Number.isFinite(s.maxEnergy)?s.maxEnergy:'—')));
  const controls=el('div','undead-farm-actions');
  if(result){
   controls.append(btn('Продолжить работу',async()=>{if(pending)return;await adapter.setFarmView('work');render();},!integrated||pending||s.energy<1));
  }else{
   controls.append(btn('Работать',async()=>{
     if(!integrated||pending)return;
     pending=true;errorMessage='';render();
     try{
       const current=adapter.readState();
       const packet={...current,shiftId:current.nextShiftId};
       const updated=await core.settle(packet,{committedShiftIds:current.committedShiftIds,commitOrdinaryPaidShift:adapter.commitOrdinaryPaidShift});
       if(updated?.kind==='already-committed'){
         errorMessage='Эта смена уже записана в сохранении.';
       }else{
         await adapter.setFarmView('result');
       }
     }catch(err){console.error(err);errorMessage='Не удалось завершить смену. Проверьте сохранение перед повторным нажатием.';}
     finally{pending=false;render();}
   },!integrated||pending||s.energy<1));
  }
  controls.append(btn('Вернуться домой',close));
  pane.append(controls);
  if(errorMessage)pane.append(alert(errorMessage));
  if(!integrated)pane.append(alert('Экран подключён к тестовой карте. Начисления доступны только через основной игровой хост; пробных денег и энергии здесь нет.'));
  else if(s.energy<1&&!result)pane.append(alert('Нет энергии для работы. Вернитесь на карту.'));
  frame.append(pane);container.replaceChildren(frame);container.hidden=false;wasOpened=true;
 }
 return Object.freeze({open:render,refresh:()=>{if(wasOpened)render();},close});
}
target.SUSLIK2UndeadFarmUI=Object.freeze({mount});
})(globalThis);
