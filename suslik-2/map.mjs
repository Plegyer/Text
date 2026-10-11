// Standalone map route. Rendering and test controls do not access game saves.
const ns='http://www.w3.org/2000/svg';
const layer=document.getElementById('map-objects');
const tip=document.getElementById('map-tooltip');
const modal=document.getElementById('location-dialog');
const toggle=document.getElementById('preview-switch');
const info=document.getElementById('map-description');
let map,preview=false,unlocked=new Set(),onOpen=null,focusBack=null;
const svg=(tag,attrs={})=>{const el=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,v);return el;};
function rect(el,r){for(const [k,v] of Object.entries({x:r.x,y:r.y,width:r.w,height:r.h}))el.setAttribute(k,v);return el;}
function showTip(name){tip.textContent=name;tip.hidden=false;}
function hideTip(){tip.textContent='';tip.hidden=true;}
function closeDialog(){modal.hidden=true;if(focusBack?.isConnected)focusBack.focus();}
function openLocation(loc){
 if(!loc.image||!unlocked.has(loc.id))return;
 if(onOpen){onOpen(loc.id);return;}
 focusBack=document.activeElement;
 document.getElementById('location-dialog-title').textContent=loc.name;
 document.getElementById('location-dialog-id').textContent='ID: '+loc.id;
 modal.hidden=false;document.getElementById('close-dialog').focus();
}
function artImage(loc){
 return rect(svg('image',{
  class:'map-art-image',href:loc.image,'data-location-id':loc.id,
  preserveAspectRatio:'none','pointer-events':'none','aria-hidden':'true'
 }),loc.position);
}
function clickArea(loc,art){
 const g=svg('g',{class:'map-building',role:'button',tabindex:'0',
  'data-location-id':loc.id,'aria-label':loc.name});
 g.append(rect(svg('rect',{class:'hit-shape',rx:10}),loc.hit));
 const title=svg('title');title.textContent=loc.name;g.append(title);
 const activate=()=>{art.classList.add('is-active');showTip(loc.name);};
 const deactivate=()=>{art.classList.remove('is-active');hideTip();};
 g.addEventListener('pointerenter',activate);g.addEventListener('pointerleave',deactivate);
 g.addEventListener('focus',activate);g.addEventListener('blur',deactivate);
 g.addEventListener('click',()=>openLocation(loc));
 g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLocation(loc);}});
 return g;
}
function render(){
 // All art is drawn first; click targets are placed above it, in the same SVG coordinates.
 const shown=map.locations.filter(loc=>loc.image&&(preview||unlocked.has(loc.id)));
 const arts=new Map(shown.map(loc=>[loc.id,artImage(loc)]));
 const clickable=map.locations.filter(loc=>loc.image&&unlocked.has(loc.id));
 layer.replaceChildren(...arts.values(),...clickable.map(loc=>clickArea(loc,arts.get(loc.id))));
 toggle.setAttribute('aria-pressed',String(preview));
 toggle.textContent=preview?'Стартовый вид':'Предпросмотр · 13 локаций';
 const missing=map.locations.filter(loc=>!loc.image).length;
 if(preview){
  info.textContent=missing
   ?`Предпросмотр: доступны изображения ${shown.length} из ${map.locations.length} зданий. Для ${missing} локаций художественные PNG ещё не добавлены; заглушки не показываются. Сохранения не меняются.`
   :`Предпросмотр: все ${shown.length} художественных зданий. Закрытые локации только видны, но не открываются; сохранения не меняются.`;
 }else{
  info.textContent='На старте доступны лесопилка, бар сатиров, ферма нежити и школа. Остальные локации скрыты.';
 }
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
 const {width,height}=map.coordinateSystem;
 document.getElementById('world-map').setAttribute('viewBox',`0 0 ${width} ${height}`);
 const terrain=document.getElementById('map-terrain');
 terrain.setAttribute('href',map.background);
 terrain.setAttribute('width',width);terrain.setAttribute('height',height);
 window.SUSLIK2_MAP_TEST=Object.freeze({
  getLocationIds:()=>map.locations.map(x=>x.id),
  getVisibleLocationIds:()=>[...layer.querySelectorAll('.map-art-image')].map(x=>x.dataset.locationId),
  getInteractiveLocationIds:()=>[...layer.querySelectorAll('.map-building')].map(x=>x.dataset.locationId),
  getLayout:()=>JSON.parse(JSON.stringify(map.locations)),
  setPreview:v=>{preview=v===true;render();},
  setUnlockedLocationIds:ids=>{if(!Array.isArray(ids))throw TypeError('Expected array');
   const known=new Set(map.locations.filter(x=>x.image).map(x=>x.id));
   unlocked=new Set(ids.filter(id=>known.has(id)));render();},
  setOpenHandler:fn=>{if(fn!==null&&typeof fn!=='function')throw TypeError('Expected function or null');onOpen=fn;}
 });
 render();
 const checks=await Promise.all([map.background,...map.locations.filter(x=>x.image).map(x=>x.image)].map(verifyAsset));
 if(checks.some(ok=>!ok))document.getElementById('asset-warning').hidden=false;
}
start().catch(e=>{console.error(e);info.textContent='Ошибка загрузки карты: проверьте JSON и изображения.';});
