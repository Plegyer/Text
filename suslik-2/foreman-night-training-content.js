/* Author-configurable media manifest. Add files and variants HERE, not in engine.
   Variants: {id:'stable-id',src:'assets/.../author-animation.gif',kind:'image'}
   or kind:'video' for mp4/webm. Empty slots render a neutral placeholder.
   Independently rerolled on each NEW training, saved across reloads. */
(function (host) {
'use strict';
host.SUSLIK2ForemanNightTrainingContent=Object.freeze({
  mediaSlots:[
    {id:'main',variants:[]},
    {id:'detail',variants:[]}
  ],
  locales:{
    ru:{title:'Тренировка',next:'Далее',missingMedia:'Медиа будет добавлено позже'},
    en:{title:'Training',next:'Next',missingMedia:'Media will be added later'}
  }
});
})(globalThis);
