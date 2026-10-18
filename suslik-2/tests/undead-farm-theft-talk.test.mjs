import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const read=name=>readFile(new URL('../'+name,import.meta.url),'utf8');
const [engine,ui,content,compiled,css]=await Promise.all([
 'gameplay-system.js','gameplay-ui.js','gameplay-content.js','content/offline-content.js','style.css'
].map(read));
const sourceScenes=JSON.parse(await read('content/scenes.json'));
const sourceWork=JSON.parse(await read('content/work.json'));
const catalogText=await read('content/media-manager-slots.json');

const authored=`— Сударыня Амалия! Должен признаться, наши совместные занятия доставляют мне истинное наслаждение! Вы проявляете поистине завидную восприимчивость к знаниям, постигая тончайшие премудрости с быстротой, достойной всяческого восхищения!
После многочисленных занятий Амалия действительно стала понимать своего учителя гораздо лучше.
— Спасибо, учитель. Вы действительно отличный преподаватель!
— О, не стану оспаривать столь справедливое суждение! Однако вынужден омрачить нашу беседу известием весьма прискорбного свойства. На ферме участились случаи вопиющего пренебрежения чужой собственностью! Некий злоумышленник систематически похищает продовольственные припасы, орудия труда и даже, о ужас, драгоценную церебральную субстанцию! Сиречь мозги, сударыня! МОЗГИ!
Зомби возмущённо всплеснул руками, но быстро вернул себе былую учтивость.
— Принимая во внимание ваше исключительное умение распоряжаться собственными телесными возможностями, осмелюсь обратиться к вам с деликатнейшей просьбой. Не соблаговолите ли вы предпринять некоторые изыскания и обнаружить хотя бы ничтожнейшую зацепку, способную пролить свет на сие безобразие? Предупреждаю, однако: предприятие потребует от вас немалого напряжения!
— Эм... Ну хорошо. Но где и что искать?
— Увы, сударыня, на сей предмет я и сам пребываю в прискорбном неведении. Осмелюсь рекомендовать вам начать с обстоятельного опроса прочих обитателей фермы. Быть может, кому-либо из них посчастливилось узреть нечто заслуживающее нашего пристального внимания.`;

function fixture(){
 const ctx={window:{},structuredClone,Math};
 runInNewContext(engine+'\n'+content,ctx);
 const H=ctx.window.SUSLIK2Gameplay;
 const state={run:H.startRun(sourceWork),character:{stats:{
  endurance:35,reason:35,strength:30,magic:10
 }},sceneId:'undead-farm-work',settings:{locale:'ru'}};
 state.run.farmBrainReturned=true;
 state.run.energy=5;
 let view=null,saved=0;
 Object.assign(ctx,{state,work:sourceWork,root:{},
  persist:()=>{saved++},render:()=>{},changeScene:id=>{state.sceneId=id;saved++;},
  copy:()=>({stats:{}})});
 runInNewContext(ui,ctx);
 ctx.gpScene=(image,text,buttons)=>{
  view={image,text,buttons};
  return {parentElement:{classList:{add(){}}}};
 };
 return {ctx,state,H,getView:()=>view,saves:()=>saved};
}

test('exactly authored text, wide artwork slot, correct scene music and layout',()=>{
 const {ctx}=fixture();
 assert.equal(ctx.window.SUSLIK2_GAMEPLAY_CONTENT.text.undeadFarmTheftTalk,authored);
 const published={window:{SUSLIK2_PUBLISHED_MEDIA:{farmTheftTalk:['assets/user-media/manager/undead-farm-theft-talk/scene.webp']}}};
 runInNewContext(content,published);
 assert.equal(published.window.SUSLIK2_GAMEPLAY_CONTENT.images.undeadFarmTheftTalk,
  'assets/user-media/manager/undead-farm-theft-talk/scene.webp');
 assert.equal(sourceScenes.scenes['undead-farm-theft-talk'].music,'farm');
 assert.equal(sourceScenes.scenes['night-zombie-study'].music,'night');
 assert.ok(compiled.includes('"undead-farm-theft-talk"'));
 assert.match(css,/farm-theft-talk-scene \.story-art\{/);
 assert.match(css,/aspect-ratio:1672\/941/);
 assert.match(css,/farm-theft-talk-scene \.story-text/);
 const slots=JSON.parse(requireSlotCatalog()).events;
 assert.equal(slots.find(e=>e.key==='farmTheftTalk').maxFiles,1);
});
function requireSlotCatalog(){
 return catalogText;
}
test('dwarf nights never count, requirements are independent and exact',()=>{
 const {H,state}=fixture();
 state.run.nightTrainingCount=30;
 state.run.zombieStudyNights=14;
 assert.equal(H.farmTheftTalkReady(state),false);
 state.run.zombieStudyNights=15;
 state.character.stats.reason=34;
 assert.equal(H.farmTheftTalkReady(state),false);
 state.character.stats.reason=35;
 state.character.stats.endurance=34;
 assert.equal(H.farmTheftTalkReady(state),false);
 state.character.stats.endurance=35;
 assert.equal(H.farmTheftTalkReady(state),true);
 state.run.farmBrainReturned=false;
 assert.equal(H.farmTheftTalkReady(state),false);
 state.run.farmBrainReturned=true;
 assert.equal(H.beginFarmTheftTalk(state),true);
 assert.equal(H.beginFarmTheftTalk(state),false);
 assert.equal(state.run.farmTheftInquiryUnlocked,false);
 assert.equal(state.run.farmTheftTalkSeen,false);
});

test('zombie study advances exactly one night, count is saved separately, no stat rewards',()=>{
 const {H,state}=fixture();
 state.run.nightTrainingCount=15;
 state.run.zombieStudyNights=14;
 state.run.elapsedDays=4;
 const before=JSON.stringify(state.character.stats);
 assert.equal(H.beginZombieStudy(state),true);
 assert.equal(H.beginZombieStudy(state),false);
 assert.equal(H.finishZombieStudy(state),true);
 assert.equal(H.finishZombieStudy(state),false);
 assert.equal(state.run.elapsedDays,5);
 assert.equal(state.run.zombieStudyNights,15);
 assert.equal(state.run.nightTrainingCount,15);
 assert.equal(JSON.stringify(state.character.stats),before);
 const restored=H.restoreRun(JSON.parse(JSON.stringify(state.run)),sourceWork);
 assert.equal(restored.zombieStudyNights,15);
 assert.equal(restored.pendingZombieStudy,false);
 assert.equal(H.farmTheftTalkReady(state),true);
});

test('mandatory authored conversation and Next unlock exactly two future buttons once',()=>{
 const x=fixture(),{ctx,state,H}=x;
 state.run.zombieStudyNights=15;
 assert.equal(H.beginFarmTheftTalk(state),true);
 state.sceneId='undead-farm-theft-talk';
 ctx.sceneUndeadFarmTheftTalk();
 assert.equal(x.getView().text,authored);
 assert.equal(x.getView().buttons.length,1);
 assert.equal(x.getView().buttons[0].label,'Далее');
 assert.equal(state.run.farmTheftInquiryUnlocked,false);
 x.getView().buttons[0].fn();
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmTheftTalkSeen,true);
 assert.equal(state.run.farmTheftInquiryUnlocked,true);
 assert.equal(H.farmTheftTalkReady(state),false);
 assert.equal(H.finishFarmTheftTalk(state),false);
 const restored=H.restoreRun(JSON.parse(JSON.stringify(state.run)),sourceWork);
 assert.equal(restored.farmTheftTalkSeen,true);
 assert.equal(restored.farmTheftInquiryUnlocked,true);
 assert.equal(restored.zombieStudyNights,15);
 assert.match(ui,/gpButton\('Допросить зомби-рабочих','farm-question-zombie-workers',\(\)=>\{\},true\)/);
 assert.match(ui,/gpButton\('Уговорить рассказать','farm-persuade-zombie-workers',\(\)=>\{\},true\)/);
 assert.match(ui,/if\(state\.run\.farmTheftInquiryUnlocked\)/);
 assert.ok(x.saves()>0);
});

test('pending zombie lesson and conversation survive reload without repeating progress',()=>{
 const {H,state}=fixture();
 state.run.zombieStudyNights=14;
 assert.equal(H.beginZombieStudy(state),true);
 const saved=H.restoreRun(JSON.parse(JSON.stringify(state.run)),sourceWork);
 assert.equal(saved.pendingZombieStudy,true);
 state.run=saved;
 assert.equal(H.finishZombieStudy(state),true);
 assert.equal(H.beginFarmTheftTalk(state),true);
 const pending=H.restoreRun(JSON.parse(JSON.stringify(state.run)),sourceWork);
 assert.equal(pending.farmTheftTalkPending,true);
 state.run=pending;
 assert.equal(H.finishFarmTheftTalk(state),true);
 assert.equal(H.beginFarmTheftTalk(state),false);
});
