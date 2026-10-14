/* Pure, serverless scene renderer. Media assets remain authored manifest data. */
(function(host){
'use strict';
const node=(tag,cls,txt)=>{
  const el=document.createElement(tag);
  if(cls)el.className=cls;
  if(txt!==undefined)el.textContent=txt;
  return el;
};
function render(container,presentation,onNext,options={}){
  const content=options.content||host.SUSLIK2ForemanNightTrainingContent;
  const core=host.SUSLIK2ForemanNightTraining;
  if(!core||presentation?.sceneId!==core.SCENE_ID||typeof onNext!=='function')
    throw new TypeError('Persisted training scene and real night Next handler required');
  const t=content.locales[options.locale==='en'?'en':'ru'];
  const section=node('section','foreman-training-scene');
  section.dataset.sceneId=core.SCENE_ID;
  section.append(node('h1','foreman-training-title',t.title));
  for(const slot of content.mediaSlots){
    const media=node('div','foreman-training-media');
    media.dataset.mediaSlot=slot.id;
    const id=presentation.mediaIds?.[slot.id];
    const chosen=slot.variants.find(v=>v.id===id);
    if(chosen&&typeof chosen.src==='string'&&chosen.src){
      if(chosen.kind==='video'){
        const video=node('video','foreman-training-video');
        video.src=chosen.src;video.controls=true;video.loop=true;
        video.playsInline=true;
        media.append(video);
      }else{
        const image=node('img','foreman-training-image');
        image.src=chosen.src;image.alt=t.title;
        media.append(image);
      }
    }else media.append(node('div','foreman-training-placeholder',t.missingMedia));
    section.append(media);
  }
  const next=node('button','foreman-training-next',t.next);
  next.type='button';next.dataset.actionId='foreman-training-next';
  next.addEventListener('click',onNext);
  section.append(next);
  container.replaceChildren(section);
  return section;
}
host.SUSLIK2ForemanNightTrainingUI=Object.freeze({render});
})(globalThis);
