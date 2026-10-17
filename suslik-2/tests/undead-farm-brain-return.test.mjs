import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const [engine,ui,content,rules,bundle,offline]=await Promise.all([
 'gameplay-system.js','gameplay-ui.js','gameplay-content.js','work-rules.js',
 'content/offline-content.js','offline.js'
].map(read));
const work=JSON.parse(await read('content/work.json'));
const scenes=JSON.parse(await read('content/scenes.json'));
const expected=`Амалия брезгливо вытряхнула мозги из сумки прямо в жадно трясущиеся руки старшего зомбяка. Тот уже почти утратил способность говорить, однако остатки приличий в нём ещё сохранились. Поэтому он не стал запихивать мозги в себя прямо при девушке, а поспешно скрылся из виду.
Вернулся он лишь после обеда, буквально сияя от счастья и даже слегка пританцовывая. К тому же зомби успел приодеться и теперь больше не напоминал бесформенную серую массу.
— Сударыня! — обратился он к Амалии с изысканным поклоном. — Позвольте выразить вам мою глубочайшую признательность за оказанное благодеяние! Вы соблаговолили возвратить мне драгоценнейшую субстанцию, обладанием которой я имею все основания по праву гордиться!
— А? — не поняла Амалия.
— Ах, простите великодушно! — зомби учтиво склонил голову. — Вижу, что изящество литературного слога и утончённость словесных конструкций пока ещё не находят должного отклика в вашем сознании. Посему осмелюсь предложить вам скромную услугу. Не обременяя вас ни малейшими финансовыми обязательствами, я почёл бы за честь взять на себя благородный труд по совершенствованию ваших интеллектуальных дарований! На поприще развития умственных способностей я, смею заметить, достиг весьма недурных высот, и полагаю, что плоды моего скромного наставничества окажутся для вас чрезвычайно благотворными!
— А... Э... Ага, — растерянно кивнула Амалия, не поняв почти ни слова, но решив на всякий случай согласиться.
Зомби воспринял её кивок как знак безоговорочного согласия, просиял ещё сильнее и, отвесив на прощание церемонный поклон, удалился по своим делам.`;
function setup(){
 const ctx={window:{},structuredClone,Math};
 runInNewContext(engine+'\n'+content+'\n'+rules,ctx);
 const H=ctx.window.SUSLIK2Gameplay;
 const state={run:H.startRun(work),character:{stats:{endurance:20,reason:20,strength:10,magic:10}},
   settings:{locale:'ru'},sceneId:'undead-farm-work'};
 let saves=0,renders=0,view=null;
 Object.assign(ctx,{state,work,root:{},persist:()=>{saves++},render:()=>{renders++},
   changeScene:id=>{state.sceneId=id;saves++;},copy:()=>({stats:{}})});
 runInNewContext(ui,ctx);
 ctx.gpScene=(image,text,buttons)=>{
   view={image,text,buttons};
   return {parentElement:{classList:{add:()=>{}}}};
 };
 return {ctx,H,state,getView:()=>view,saves:()=>saves,renders:()=>renders};
}
test('authored wide artwork, exact text and farm music are present',async()=>{
 const a=setup();
 assert.equal(a.ctx.window.SUSLIK2_GAMEPLAY_CONTENT.text.undeadFarmBrainReturn,expected);
 assert.equal(a.ctx.window.SUSLIK2_GAMEPLAY_CONTENT.images.undeadFarmBrainReturn,'assets/events/undead-farm-brain-return.webp');
 assert.equal(scenes.scenes['undead-farm-brain-return'].music,'farm');
 assert.ok(bundle.includes('"undead-farm-brain-return"'));
 assert.match(offline,/sceneId==='undead-farm-brain-return'\) sceneUndeadFarmBrainReturn\(\)/);
 const file=await readFile(new URL('../assets/events/undead-farm-brain-return.webp',import.meta.url));
 assert.ok((await stat(new URL('../assets/events/undead-farm-brain-return.webp',import.meta.url))).size>150000);
 assert.equal(file.subarray(0,4).toString(),'RIFF');
 assert.equal(file.subarray(8,12).toString(),'WEBP');
 assert.equal(file.subarray(12,16).toString(),'VP8 ');
 assert.equal((file[26]|(file[27]<<8))&0x3fff,1672);
 assert.equal((file[28]|(file[29]<<8))&0x3fff,941);
});
test('brain is not handed over simply by visiting; only next paid farm shift triggers',()=>{
 const a=setup(),{state,ctx,H}=a;
 state.run.farmOwnerMet=true;
 state.run.farmBrainsMet=true;
 state.run.farmShifts=17;
 state.run.energy=3;
 state.run.zombieBrainSearchUnlocked=true;
 state.run.zombieBrainFound=true;
 assert.equal(H.canStudyWithZombie(state),false);
 assert.equal(state.run.farmBrainHandoverPending,false);
 ctx.sceneUndeadFarmWork({});
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmBrainHandoverPending,false);
 const gold=state.run.gold,energy=state.run.energy,shifts=state.run.farmShifts;
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.sceneId,'undead-farm-brain-return');
 assert.equal(state.run.farmBrainHandoverPending,true);
 assert.equal(state.run.zombieBrainFound,true,'brain stays in inventory until Next');
 assert.equal(H.canStudyWithZombie(state),false);
 assert.equal(state.run.farmShifts,shifts+1);
 assert.equal(state.run.energy,energy-1);
 assert.ok(state.run.gold>gold);
 const wageGold=state.run.gold,paidEnergy=state.run.energy;
 ctx.sceneUndeadFarmBrainReturn();
 assert.equal(a.getView().image,'assets/events/undead-farm-brain-return.webp');
 assert.equal(a.getView().text,expected);
 assert.equal(a.getView().buttons.length,1);
 assert.equal(a.getView().buttons[0].label,'Далее');
 a.getView().buttons[0].fn();
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmLastShift,null);
 assert.equal(state.run.gold,wageGold);
 assert.equal(state.run.energy,paidEnergy);
 assert.equal(state.run.zombieBrainFound,false);
 assert.equal(state.run.farmBrainHandoverPending,false);
 assert.equal(state.run.farmBrainReturned,true);
 assert.equal(H.canCollectZombieBrain(state),false);
 assert.equal(H.canStudyWithZombie(state),true);
 assert.equal(H.collectZombieBrain(state),false);
 assert.equal(H.finishFarmBrainHandover(state),false);
 assert.ok(a.saves()>0);
 state.run.energy=3;
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.sceneId,'undead-farm-work');
});
test('save/restore preserve pending handover and completed night study unlock',()=>{
 const a=setup(),{H,state}=a;
 state.run.farmBrainsMet=true;
 state.run.zombieBrainFound=true;
 assert.equal(H.beginFarmBrainHandover(state),true);
 assert.equal(H.beginFarmBrainHandover(state),false);
 const resume={run:H.restoreRun(JSON.parse(JSON.stringify(state.run)),work)};
 assert.equal(resume.run.farmBrainHandoverPending,true);
 assert.equal(resume.run.zombieBrainFound,true);
 assert.equal(H.finishFarmBrainHandover(resume),true);
 const finished={run:H.restoreRun(JSON.parse(JSON.stringify(resume.run)),work)};
 assert.equal(finished.run.farmBrainReturned,true);
 assert.equal(finished.run.zombieBrainFound,false);
 assert.equal(H.canStudyWithZombie(finished),true);
 assert.equal(H.canCollectZombieBrain(finished),false);
 assert.equal(H.restoreRun({},work).farmBrainReturned,false);
});
test('night study is gated behind completed dialogue; dwarf training unaffected',()=>{
 assert.match(ui,/canStudyWithZombie\(state\)/);
 assert.match(ui,/gpButton\('Обучение','sleep-zombie-study'/);
 assert.match(ui,/gl\('training'\)/);
 assert.match(ui,/gl\('nightRent'\)/);
 assert.match(ui,/gl\('nightSatyr'\)/);
 assert.match(offline,/zombieBrainFound\?\[\['Мозг зомби',1\]\]/);
 const css=await read('style.css');
 assert.match(css,/farm-brain-return-scene \.story-image \{width:100%;height:100%;object-fit:contain;/);
 assert.match(css,/farm-brain-return-scene \.story-text/);
});
