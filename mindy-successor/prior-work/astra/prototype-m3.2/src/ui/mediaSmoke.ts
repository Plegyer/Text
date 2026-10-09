/** Opt-in test-media layer. Does NOT change game Save, story conditions or career content.
 * Source GIF/MP3 files are user-provided TEST placeholders, not licensed release media.
 * All media URLs are local and must exist under assets/smoke/ when packaging.
 */
export const smokeScenes=[
  {key:'animal',file:'01-animal.gif',ru:'Белый суслик выскакивает и убегает',en:'The white ground squirrel appears and escapes',priority:'P0'},
  {key:'running',file:'02-running.gif',ru:'Героиня бежит к люку и проваливается',en:'The heroine follows and falls through a hatch',priority:'P0'},
  {key:'waking',file:'03-waking.gif',ru:'Героиня просыпается и выбирается наружу',en:'The heroine wakes and emerges',priority:'P0'},
  {key:'explaining',file:'04-explaining.gif',ru:'Героиня объясняется с местным жителем',en:'The heroine tries to explain herself',priority:'P1'},
  {key:'tool',file:'05-tool.gif',ru:'Первый работодатель вручает инструмент',en:'First employer hands over a work tool',priority:'P1'}
] as const;
export const smokeMusic=[
  {key:'town',file:'Rum Punch Parlay.mp3',ru:'Город',en:'Town'},
  {key:'creation',file:'Clockwork Cupcake.mp3',ru:'Создание героини / школа',en:'Creation / School'},
  {key:'intro',file:'Tiki Chase.mp3',ru:'Погоня за сусликом',en:'Squirrel chase'},
  {key:'work',file:'Banjo Barn Shuffle.mp3',ru:'Работа',en:'Work'},
  {key:'palace',file:'Cape and Cadence.mp3',ru:'Дворец',en:'Palace'},
  {key:'activity',file:'Neon Orbit Loop.mp3',ru:'Экспедиция / Activity',en:'Expedition / Activity'},
  {key:'night',file:'Velvet Banana Split.mp3',ru:'Ночлег',en:'Night'}
] as const;
export type SmokeMusicContext=typeof smokeMusic[number]['key'];
const src=(type:'gif'|'music',file:string)=>'assets/smoke/'+type+'/'+encodeURIComponent(file);
const sound=new Audio();sound.loop=true;sound.preload='none';
let musicEnabled=false;
let activeContext:SmokeMusicContext='creation';
let activeMusic:SmokeMusicContext|null=null;
let previewIndex=0;
let dialog:HTMLDivElement|null=null;
let volume=Number(localStorage.getItem('portal-life.smoke.music.volume')??'0.22');
volume=Number.isFinite(volume)?Math.max(0,Math.min(1,volume)):0.22;
sound.volume=volume;
const localized=(ru:string,en:string)=>document.documentElement.lang==='en'?en:ru;
const track=(key:SmokeMusicContext)=>smokeMusic.find(m=>m.key===key)!;
const setFeedback=(message:string)=>{const status=dialog?.querySelector<HTMLElement>('[data-smoke-status]');if(status)status.textContent=message;};
sound.addEventListener('error',()=>{musicEnabled=false;activeMusic=null;setFeedback(localized('MP3 не найден или не читается. Проверьте assets/smoke/music.','MP3 not found or unsupported. Check assets/smoke/music.'));});
function playSelected(key:SmokeMusicContext){
 activeContext=key;
 if(!musicEnabled)return;
 if(activeMusic!==key){activeMusic=key;sound.src=src('music',track(key).file);sound.load();}
 void sound.play().then(()=>setFeedback(localized('Музыка играет.','Music playing.'))).catch(()=>setFeedback(localized('Нажмите ▶ ещё раз: браузер ожидает действие пользователя.','Press ▶ again: audio requires a user gesture.')));
}
export function smokeSetContext(key:SmokeMusicContext){playSelected(key);}
export function smokeMusicEnabled(){return musicEnabled;}
export function smokeToggleMusic(){
 musicEnabled=!musicEnabled;
 if(musicEnabled)playSelected(activeContext);else sound.pause();
 return musicEnabled;
}
function viewScene(){
 if(!dialog)return;
 const scene=smokeScenes[previewIndex]!;
 const image=dialog.querySelector<HTMLImageElement>('[data-smoke-image]')!;
 const label=dialog.querySelector<HTMLElement>('[data-smoke-stage]')!;
 const counter=dialog.querySelector<HTMLElement>('[data-smoke-count]')!;
 image.alt=localized(scene.ru,scene.en);
 image.src=src('gif',scene.file);
 label.textContent=scene.priority+' · '+localized(scene.ru,scene.en);
 counter.textContent=(previewIndex+1)+' / '+smokeScenes.length;
 const next=dialog.querySelector<HTMLButtonElement>('[data-smoke-next]')!;
 next.textContent=previewIndex===smokeScenes.length-1?localized('К началу','Restart'):localized('Дальше →','Next →');
}
function close(){dialog?.remove();dialog=null;}
export function smokeOpenPreview(){
 if(dialog){dialog.querySelector<HTMLButtonElement>('[data-smoke-close]')?.focus();return;}
 const element=document.createElement('div');
 element.className='smoke-overlay';
 element.innerHTML=`<section class="smoke-dialog" role="dialog" aria-modal="true" aria-label="Media smoke check">
   <header class="smoke-head"><h2 data-smoke-heading>5 GIF · 7 MP3</h2><button type="button" data-smoke-close>×</button></header>
   <p class="smoke-notice">TEST MEDIA ONLY / Только тестовые изображения, не финальный арт.</p>
   <div class="smoke-visual"><img data-smoke-image alt=""><p class="smoke-stage" data-smoke-stage></p><span data-smoke-count></span></div>
   <div class="smoke-actions"><button type="button" data-smoke-prev>←</button><button type="button" class="primary" data-smoke-next>Дальше →</button></div>
   <h3>MP3</h3><div class="smoke-tracks" data-smoke-tracks></div>
   <div class="smoke-actions"><button type="button" data-smoke-music>▶ / ❚❚</button><label>🔉 <input aria-label="Music volume" type="range" min="0" max="100" data-smoke-volume></label></div>
   <p class="smoke-feedback" role="status" data-smoke-status>Выберите трек для проверки звучания.</p>
   </section>`;
 dialog=element;
 document.body.append(element);
 const tracks=element.querySelector<HTMLElement>('[data-smoke-tracks]')!;
 for(const candidate of smokeMusic){
  const b=document.createElement('button');b.type='button';b.dataset.smokeTrack=candidate.key;
  b.textContent=localized(candidate.ru,candidate.en)+' — '+candidate.file;
  b.onclick=()=>{musicEnabled=true;playSelected(candidate.key);};
  tracks.append(b);
 }
 element.querySelector<HTMLButtonElement>('[data-smoke-close]')!.onclick=close;
 element.querySelector<HTMLButtonElement>('[data-smoke-prev]')!.onclick=()=>{previewIndex=(previewIndex+smokeScenes.length-1)%smokeScenes.length;viewScene();};
 element.querySelector<HTMLButtonElement>('[data-smoke-next]')!.onclick=()=>{previewIndex=(previewIndex+1)%smokeScenes.length;viewScene();};
 element.querySelector<HTMLButtonElement>('[data-smoke-music]')!.onclick=()=>{smokeToggleMusic();setFeedback(musicEnabled?localized('Музыка включена.','Music enabled.'):localized('Музыка выключена.','Music muted.'));};
 const slider=element.querySelector<HTMLInputElement>('[data-smoke-volume]')!;
 slider.value=String(Math.round(volume*100));
 slider.oninput=()=>{volume=Number(slider.value)/100;sound.volume=volume;localStorage.setItem('portal-life.smoke.music.volume',String(volume));};
 const image=element.querySelector<HTMLImageElement>('[data-smoke-image]')!;
 image.onerror=()=>{setFeedback(localized('GIF не найден: '+smokeScenes[previewIndex]!.file,'Missing GIF: '+smokeScenes[previewIndex]!.file));};
 image.onload=()=>setFeedback(localized('GIF загружен. Проверьте движение в кадре.','GIF loaded. Check visible animation.'));
 element.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
 viewScene();
 element.querySelector<HTMLButtonElement>('[data-smoke-close]')!.focus();
}
export function smokeMaybeShowIntro(){
 // First user-performed arrival only, and only if the first GIF exists locally.
 if(sessionStorage.getItem('portal-life.smoke.intro-shown')==='yes')return;
 const probe=new Image();
 probe.onload=()=>{sessionStorage.setItem('portal-life.smoke.intro-shown','yes');previewIndex=0;smokeOpenPreview();};
 probe.src=src('gif',smokeScenes[0].file);
}
