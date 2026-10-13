import {STORAGE_KEY, restoreState} from './creation-state.mjs';
import {canOpenEndingMenu, openEndingMenu} from './ending-state.mjs';
/* Imported only when the map is used as the real game map (?game=1).
   The standalone map preview deliberately never touches player saves. */
export async function connectGameMap() {
  const [creationResponse,scenesResponse]=await Promise.all([
    fetch('content/creation.json'),fetch('content/scenes.json')
  ]);
  if (!creationResponse.ok || !scenesResponse.ok) throw new Error('Game data unavailable');
  const [creation,scenes]=await Promise.all([creationResponse.json(),scenesResponse.json()]);
  let raw;
  try {raw=JSON.parse(localStorage.getItem(STORAGE_KEY));} catch (_) {raw=null;}
  const state=restoreState(raw,creation,new Set(Object.keys(scenes.scenes)),scenes.initialScene);
  if (state.sceneId!=='map') {window.location.replace('./');return;}
  document.documentElement.lang=state.settings.locale;
  if (!canOpenEndingMenu(state)) return; // The button must not exist until ALL conditions are met.
  const button=document.createElement('button');button.type='button';
  button.className='ending-map-trigger';button.id='ending-map-trigger';
  button.textContent=state.settings.locale==='en'?'Well...':'Ну что ж...';
  button.addEventListener('click',()=>{
    if (!openEndingMenu(state)) return;
    try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state));} catch (_) {return;}
    window.location.assign('./');
  });
  document.querySelector('.map-scene').append(button);
}
