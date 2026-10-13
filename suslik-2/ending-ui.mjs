import {availableBonuses, selectedBonusIds, toggleBonus, startPlusRun,
  openHardWorkerEnding, refuseEnding, finishHardWorkerEnding} from './ending-state.mjs';
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const btn = (label, className, action) => {
  const button=el('button',className,label);
  button.type='button'; button.addEventListener('click',action);
  return button;
};
const image = (path, alternative) => {
  const img=el('img','ending-art'); img.src=path; img.alt=alternative;
  img.draggable=false;
  img.addEventListener('error',()=>{
    img.replaceWith(el('div','media-placeholder',alternative));
  },{once:true});
  return img;
};
export function renderEndingScreen(kind, {root, scene, state, creation, tr, persist, render, freshCharacter}) {
  const wrapper=el('section','ending-screen '+(kind==='endings-menu'?'ending-screen--menu':'ending-screen--story'));
  wrapper.append(image(scene.image, tr(scene.imageAltKey)));
  if (kind==='endings-menu') {
    const choices=el('div','ending-choices');
    // Intentionally one item for now; future endings can be added to the content manifest.
    for (const ending of scene.endings || []) {
      choices.append(btn(tr(ending.labelKey),'game-button',()=>{
        if (ending.id==='hard-worker' && openHardWorkerEnding(state)) { persist(); render(); }
      }));
    }
    wrapper.append(choices);
    wrapper.append(btn(tr('refuseEnding'),'game-button ending-refuse',()=>{
      if (refuseEnding(state)) { persist(); window.location.assign('map.html?game=1'); }
    }));
  } else {
    wrapper.append(el('p','ending-text',tr(scene.textKey)));
    wrapper.append(btn(tr('endRun'),'game-button ending-done',()=>{
      if (finishHardWorkerEnding(state,creation,freshCharacter)) { persist(); render(); }
    }));
  }
  root.append(wrapper);
}
export function renderBonusSelection({root,state,tr,persist,render}) {
  const wrapper=el('section','scene--panel bonus-screen');
  const panel=el('div','selection-panel bonus-panel');
  panel.append(el('h1','',tr('bonusTitle')),el('p','bonus-instruction',tr('bonusInstruction')));
  const options=el('div','bonus-list');
  const selected=new Set(selectedBonusIds(state));
  for(const bonus of availableBonuses(state)) {
    const label=el('label','bonus-option');
    const check=el('input'); check.type='checkbox';check.name='newgame-bonuses';
    check.value=bonus.id;check.checked=selected.has(bonus.id);
    check.addEventListener('change',()=>{ if(toggleBonus(state,bonus.id)) {persist();render();} });
    label.append(check,el('span','',tr('bonus_'+bonus.id)));
    options.append(label);
  }
  panel.append(options);
  panel.append(btn(tr('bonusContinue'),'game-button',()=>{
    if(startPlusRun(state)) { persist();render(); }
  }));
  wrapper.append(panel);root.append(wrapper);
}
