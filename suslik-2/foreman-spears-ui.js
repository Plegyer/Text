/* Portable DOM-only UI. The host provides the sawmill soundtrack and callbacks. */
(function (host) {
  'use strict';
  const element=(tag,cls,value)=>{
    const x=document.createElement(tag);
    if(cls)x.className=cls;
    if(value!==undefined)x.textContent=value;
    return x;
  };
  function action(label,id,onClick) {
    if(typeof onClick!=='function') throw new TypeError('Host callback required: '+id);
    const x=element('button','foreman-spears-button',label);
    x.type='button';x.dataset.actionId=id;
    x.addEventListener('click',onClick);
    return x;
  }
  const translate=(content,lang)=>content.locales[lang==='en'?'en':'ru'];
  function addTalkButton(container,questState,evidence,onTalk,opts={}) {
    const core=host.SUSLIK2ForemanSpears;
    if(!core?.canOffer(questState,evidence)) return null; // No hidden/disabled button.
    const content=opts.content||host.SUSLIK2ForemanSpearsContent;
    const btn=action(translate(content,opts.locale).talk,'foreman-spear-talk',onTalk);
    container.append(btn);
    return btn;
  }
  function renderHandover(container,questState,onNext,opts={}) {
    const core=host.SUSLIK2ForemanSpears;
    if(!core?.isHandoverScene(questState)) throw new Error('Not in one-time handover scene');
    const content=opts.content||host.SUSLIK2ForemanSpearsContent;
    const lang=translate(content,opts.locale);
    // The sawmill soundtrack continues; there is intentionally NO new audio.
    const screen=element('section','foreman-spears-scene');
    screen.dataset.sceneId=core.SCENE_ID;
    const picture=element('img','foreman-spears-image');
    // Prefer a normal PNG. Until a binary Git blob is accepted, the previously
    // verified 20-part original image remains an offline file:// fallback.
    picture.src=opts.image||content.image;
    picture.addEventListener('error',()=>{
      if(host.SUSLIK2ForemanImageURL) picture.src=host.SUSLIK2ForemanImageURL;
    },{once:true});
    picture.alt=lang.imageAlt;
    picture.draggable=false;
    screen.append(picture,element('p','foreman-spears-dialogue',
      lang.dialogue||content.locales.ru.dialogue));
    screen.append(action(lang.next,'foreman-spear-next',onNext));
    container.replaceChildren(screen);
    return screen;
  }
  function addNightTrainingButton(container,questState,onTraining,opts={}) {
    const core=host.SUSLIK2ForemanSpears;
    if(!core?.isTrainingUnlocked(questState) || typeof onTraining!=='function') return null;
    const content=opts.content||host.SUSLIK2ForemanSpearsContent;
    const btn=action(translate(content,opts.locale).training,'foreman-night-training',onTraining);
    container.append(btn);
    return btn;
  }
  host.SUSLIK2ForemanSpearsUI=Object.freeze({
    addTalkButton,renderHandover,addNightTrainingButton
  });
})(globalThis);
