// Standalone development route: no game save imports, no progress writes.
const ns='http://www.w3.org/2000/svg';
const layer=document.getElementById('map-objects');
const tip=document.getElementById('map-tooltip');
const modal=document.getElementById('location-dialog');
const toggle=document.getElementById('preview-switch');
const info=document.getElementById('map-description');
let map,preview=false,unlocked=new Set(),onOpen=null,focusBack=null;
const svg=(tag,attrs={})=>{const el=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);return el;};
function rect(el,r){el.setAttribute('x',r.x);el.setAttribute('y',r.y);el.setAttribute('width',r.w);el.setAttribute('height',r.h);return el;}
function showTip(name){tip.textContent=name;tip.hidden=false;}
function hideTip(){tip.textContent='';tip.hidden=true;}
function closeDialog(){modal.hidden=true;if(focusBack?.isConnected)focusBack.focus();}
function openLocation(loc){
 if(!unlocked.has(loc.id)||!loc.image)return;
 if(onOpen){onOpen(loc.id);return;}
 focusBack=document.activeElement;
 document.getElementById('location-dialog-title').textContent=loc.name;
 document.getElementById('location-dialog-id').textContent='ID: '+loc.id;
 modal.hidden=false;document.getElementById('close-dialog').focus();
}
function building(loc){
 const g=svg('g',{class:'map-building',role:'button',tabindex:'0','data-location-id':loc.id,'aria-label':loc.name});
 g.append(rect(svg('rect',{class:'hit-shape',rx:10}),loc.hit));
 g.append(rect(svg('image',{class:'art-image',href:loc.image,preserveAspectRatio:'none','pointer-events':'none'}),loc.position));
 const t=svg('title');t.textContent=loc.name;g.append(t);
 g.addEventListener('pointerenter',()=>showTip(loc.name));g.addEventListener('pointerleave',hideTip);
 g.addEventListener('focus',()=>showTip(loc.name));g.addEventListener('blur',hideTip);
 g.addEventListener('click',()=>openLocation(loc));
 g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLocation(loc);}});
 return g;
}
function reserved(loc){
 const g=svg('g',{class:'map-reserved','aria-hidden':'true'});
 g.append(rect(svg('rect',{rx:14}),loc.slot));
 const t=svg('text',{x:loc.slot.x+loc.slot.w/2,y:loc.slot.y+loc.slot.h/2});
 t.textContent=loc.name;g.append(t);return g;
}
function render(){
 const ready=map.locations.filter(loc=>loc.image&&unlocked.has(loc.id));
 const missing=preview?map.locations.filter(loc=>!loc.image||!unlocked.has(loc.id)):[];
 layer.replaceChildren(...ready.map(building),...missing.map(reserved));
 toggle.setAttribute('aria-pressed',String(preview));
 toggle.textContent=preview?'Скрыть 9 позиций':'Показать 13 позиций';
 info.textContent=preview?'Отладочный вид: девять участков без изображений отмечены пунктиром, не кликабельны и не открывают профессии.':'Доступны лесопилка, бар сатиров, ферма нежити и школа. Остальные локации скрыты.';
 hideTip();
}
toggle.addEventListener('click',()=>{preview=!preview;render();});
document.getElementById('close-dialog').addEventListener('click',closeDialog);
modal.addEventListener('click',e=>{if(e.target===modal)closeDialog();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeDialog();});
async function verifyAsset(url){return new Promise(ok=>{const img=new Image();img.onload=()=>ok(true);img.onerror=()=>ok(false);img.src=url;});}
async function start(){
 const response=await fetch('map-locations.json',{cache:'no-store'});
 if(!response.ok)throw Error('Map manifest unavailable');
 map=await response.json();unlocked=new Set(map.initialVisible);
 document.getElementById('world-map').setAttribute('viewBox','0 0 '+map.coordinateSystem.width+' '+map.coordinateSystem.height);
 document.getElementById('map-terrain').setAttribute('href',map.background);
 window.SUSLIK2_MAP_TEST=Object.freeze({
  getLocationIds:()=>map.locations.map(x=>x.id),
  getVisibleLocationIds:()=>[...layer.querySelectorAll('.map-building')].map(x=>x.dataset.locationId),
  getLayout:()=>JSON.parse(JSON.stringify(map.locations)),
  setPreview:v=>{preview=v===true;render();},
  setUnlockedLocationIds:ids=>{if(!Array.isArray(ids))throw TypeError('Expected array');const known=new Set(map.locations.filter(x=>x.image).map(x=>x.id));unlocked=new Set(ids.filter(id=>known.has(id)));render();},
  setOpenHandler:fn=>{if(fn!==null&&typeof fn!=='function')throw TypeError('Expected function or null');onOpen=fn;}
 });
 render();
 const checks=await Promise.all([map.background,...map.locations.filter(x=>x.image).map(x=>x.image)].map(verifyAsset));
 if(checks.some(x=>!x))document.getElementById('asset-warning').hidden=false;
}
start().catch(e=>{console.error(e);info.textContent='Ошибка загрузки карты: проверьте JSON и изображения.';});