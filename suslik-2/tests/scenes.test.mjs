import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {initialState,restoreState,adjustStat,resetAllocations,canStart,canStartPlus,begin,beginPlus,recordCompletedRun} from '../creation-state.mjs';
const scenes=JSON.parse(await readFile(new URL('../content/scenes.json',import.meta.url),'utf8'));
const creation=JSON.parse(await readFile(new URL('../content/creation.json',import.meta.url),'utf8'));
const valid=new Set(Object.keys(scenes.scenes));

test('supplied media files belong to their scenes',async()=>{
  assert.equal(scenes.initialScene,'splash');
  assert.equal(scenes.scenes.splash.buttonDelayMs,2200);
  assert.equal(scenes.scenes.splash.imageId,'MEDIA.SPLASH.001');
  assert.equal(scenes.scenes['character-selection'].imageId,'MEDIA.CHARACTER_CREATION.001');
  for(const id of ['splash','character-selection','game-start','intro-02','intro-03','intro-04','intro-05','intro-allow-01','intro-forbid-01','intro-shared-02']){
    const scene=scenes.scenes[id];
    assert.ok((await stat(new URL('../'+scene.image,import.meta.url))).size>1000);
  }
});
test('all transitions are defined',()=>{
  for(const scene of Object.values(scenes.scenes)){
    for(const action of scene.actions||[]){
      for(const dest of [action.target,action.firstTarget,action.subsequentTarget]) if(dest) assert.ok(valid.has(dest),dest);
    }
  }
});
test('old creation baseline is 12 stats starting at one with 10 points',()=>{
  assert.deepEqual(creation.stats,['strength','endurance','dexterity','reason','magic','creativity','wits','charm','sociability','manners','grooming','sexuality']);
  assert.equal(creation.initialValue,1);
  assert.equal(creation.allocationPoints,10);
  const s=initialState(creation,'character-selection');
  assert.deepEqual(Object.values(s.character.stats),Array(12).fill(1));
  assert.equal(s.character.remaining,10);
  assert.equal(canStart(s),true, 'unspent allocation points do not block the prologue');
  assert.equal(canStartPlus(s),false, 'Start+ remains locked');
});
test('point distribution / refund / reset does not spend time or energy',()=>{
  const s=initialState(creation,'character-selection');
  for(let n=0;n<10;n++)assert.equal(adjustStat(s,creation,'strength',1),true);
  assert.equal(s.character.stats.strength,11);
  assert.equal(s.character.remaining,0);
  assert.equal(adjustStat(s,creation,'magic',1),false);
  assert.equal(adjustStat(s,creation,'strength',-1),true);
  assert.equal(s.character.remaining,1);
  assert.equal(adjustStat(s,creation,'strength',-1),true);
  assert.equal(s.character.stats.strength,9);
  assert.equal(resetAllocations(s,creation),true);
  assert.equal(s.character.stats.strength,1);
  assert.equal(s.character.remaining,10);
  assert.equal('energy' in s,false);
  assert.equal('day' in s,false);
});
test('New Game allows unspent points and does not unlock Start+ on reaching game-main',()=>{
  const scene=scenes.scenes['character-selection'];
  const state=initialState(creation,'character-selection');
  assert.equal(canStartPlus(state),false);
  assert.equal(beginPlus(state,scene),false);
  assert.equal(begin(state,scene),true);
  assert.equal(state.sceneId,'game-start');
  assert.equal(state.character.remaining,10);
  state.sceneId='game-main';
  assert.equal(state.meta.completedRuns,0);
  state.sceneId='character-selection';
  assert.equal(beginPlus(state,scene),false);
  assert.equal(begin(state,scene),true);
  state.sceneId='character-selection';
  assert.equal(recordCompletedRun(state),true);
  assert.equal(canStartPlus(state),true);
  assert.equal(beginPlus(state,scene),true);
  assert.equal(state.sceneId,'bonus-selection');
});
test('legacy startedOnce never unlocks Start+; valid stats/settings restore independently',()=>{
  const s=initialState(creation,'character-selection');
  adjustStat(s,creation,'strength',1);
  s.settings.locale='en';
  s.settings.musicVolume=53;
  s.meta.completedRuns=0;
  const restored=restoreState(JSON.parse(JSON.stringify(s)),creation,valid);
  assert.equal(restored.character.stats.strength,2);
  assert.equal(restored.character.remaining,9);
  assert.equal(restored.settings.locale,'en');
  assert.equal(restored.settings.musicVolume,53);
  assert.equal(restored.meta.completedRuns,0);
  const old={...s,version:2,meta:{startedOnce:true}};
  assert.equal(restoreState(old,creation,valid).meta.completedRuns,0);
  const corrupt=JSON.parse(JSON.stringify(s));
  corrupt.character.stats.strength=1000;
  assert.equal(restoreState(corrupt,creation,valid).character.stats.strength,1);
  assert.equal(restoreState({version:1,sceneId:'character-selection'},creation,valid).sceneId,'character-selection');
});
test('authored pre-world story chain preserves exact authored texts, supplied images, and branch buttons',async()=>{
  const story=JSON.parse(await readFile(new URL('../content/story.json',import.meta.url),'utf8'));
  const expected=[
    ['game-start','MEDIA.PREWORLD.CITY.001','assets/preworld-city-01.png','intro01Text',[{id:'intro01-next',labelKey:'next',target:'intro-02'}]],
    ['intro-02','MEDIA.PREWORLD.SUSLIK.002','assets/preworld-suslik-02.png','intro02Text',[{id:'intro02-next',labelKey:'next',target:'intro-03'}]],
    ['intro-03','MEDIA.PREWORLD.SUSLIK.003','assets/preworld-suslik-03.png','intro03Text',[{id:'intro03-next',labelKey:'next',target:'intro-fall'}]],
    ['intro-fall','MEDIA.PREWORLD.FALL.004','assets/preworld-fall-04.png','introFallText',[{id:'intro-fall-next',labelKey:'next',target:'intro-04'}]],
    ['intro-04','MEDIA.PREWORLD.ARRIVAL.004','assets/preworld-arrival-05.png','intro04Text',[{id:'intro04-next',labelKey:'next',target:'intro-05'}]],
    ['intro-05','MEDIA.PREWORLD.SATYR.005','assets/preworld-choice-06.png','intro05Text',[{id:'intro05-allow',labelKey:'allowTouch',target:'intro-allow-01'},{id:'intro05-forbid',labelKey:'forbidTouch',target:'intro-forbid-01'}]],
    ['intro-allow-01','MEDIA.PREWORLD.ALLOW.006','assets/intro-allow-01.gif','allow01Text',[{id:'allow01-next',labelKey:'next',target:'intro-shared-02'}]],
    ['intro-forbid-01','MEDIA.PREWORLD.FORBID.007','assets/intro-forbid-01.png','forbid01Text',[{id:'forbid01-next',labelKey:'next',target:'intro-shared-02'}]],
    ['intro-shared-02','MEDIA.PREWORLD.SHARED.008','assets/intro-shared-02.png','shared02Text',[{id:'shared02-next',labelKey:'next',target:'intro-06'}]],
    ['intro-06','MEDIA.PREWORLD.ROOM.009','assets/intro-room-03.png','intro06Text',[{id:'intro06-next',labelKey:'next',target:'game-main'}]]
  ];
  for(const [sceneId,imageId,image,textKey,actions] of expected){
    const scene=scenes.scenes[sceneId];
    assert.equal(scene.kind,'story');
    assert.equal(scene.imageId,imageId);
    assert.equal(scene.image,image);
    assert.ok((await stat(new URL('../'+scene.image,import.meta.url))).size>1000);
    assert.equal(scene.textKey,textKey);
    assert.deepEqual(scene.actions,actions);
  }
  assert.equal(story.locales.ru.allowTouch,'Разрешить');
  assert.equal(story.locales.ru.forbidTouch,'Запретить');
  assert.equal(story.locales.ru.allow01Text,`— Ну, раз ты не чёрт, то почему бы и нет? — пожала плечами Амалия. - Мне не жалко.
Сатир осторожно коснулся её груди и замер с таким благоговением, будто ему позволили прикоснуться к величайшей святыне.
— Святые карпики... Мягонькие! Будто трогаю счастье! — Он мечтательно вздохнул, но тут же оживился. — Слушай, красавица, а тебе случайно жильё не нужно? У меня как раз местечко свободное! И денег много не попрошу. Мы, сатиры, народ гостеприимный!`);
  assert.equal(story.locales.ru.forbid01Text,`— Знаю я вас, старых рогатых прохвостов! — Амалия шлёпнула сатира по шаловливым рукам. — Сначала сиськи потрогать, потом на коленочках посидеть, а там, глядишь, и выебать бесплатно! Нет уж, спасибо!
— Ну и злюка! — обиженно фыркнул сатир, потирая ладони. — Я ж от чистого сердца! Между прочим, хотел тебе жильё предложить. Почти даром! А ты сразу о пошлостях...`);
  assert.equal(story.locales.ru.shared02Text,`— Недорого — это натурой, да? — Амалия подозрительно прищурилась.
— Да как ты могла такое подумать?! — возмутился сатир, но тут же печально вздохнул. — Старенький я уже... Какая мне натура? Золотом возьму.
— Золотом?! Да откуда у меня золото?!
— Ну, нету — заработаешь! Ты ж вон какая — женщина! Товар редчайший! — Сатир осёкся и поспешно поправился: — То есть работница! Ценная, уникальная! Тебя тут с руками оторвут!
Амалия задумалась. Предложение звучало подозрительно, но ночевать неизвестно где хотелось ещё меньше. Да и кто лучше местного жителя объяснит, в какую чертовщину она угодила?
— Ладно, рогатый, веди. Согласная я. Только учти: руки держать при себе!
— Обижаешь! — просиял сатир. — Я домовладелец, а не какой-нибудь извращенец! К сожалению...`);
  assert.equal(story.locales.ru.intro06Text,`— Ну вот, располагайся! Твоя новая комната! Красота, правда? — сатир гордо развёл руками, словно показывал королевские покои.
Амалия огляделась. На удивление, здесь было довольно уютно. Даже симпатичнее той тесной студии, за которую она отдала половину своих накоплений в том мире.
— Ну... ничего так, — нехотя признала она.
— Вот и славненько! Я тебе даже золотишка немного одолжу на первое время. А работу в городе быстро найдёшь! С твоими-то... талантами, — сатир снова мечтательно уставился на её грудь. — Ух, красота... Слушай, а можно ещё разочек потрогать?
— А можно ты уже свалишь, дед? Мне подумать надо!
— Всё-всё, ухожу! — заторопился сатир к двери. — Только учти, красавица: за ночлег не заплатишь — на улице спать будешь! У меня тут не благотворительность! И это, переоденься уже...
Он захлопнул дверь, оставив Амалию наедине с её новыми перспективами.`);
  assert.equal(scenes.scenes['game-main'].kind,'map');
  assert.deepEqual(scenes.scenes['game-main'].actions,[]);
});

test('fall scene is between chase and waking up, and both choices have matching labels', async()=>{
  const story=JSON.parse(await readFile(new URL('../content/story.json',import.meta.url),'utf8'));
  assert.equal(story.locales.ru.introFallText,'Суслик юркнул в какой-то тёмный проём в старом здании, и Амалия, не раздумывая, бросилась следом. Но стоило ей сделать несколько шагов в темноте, как земля внезапно ушла из-под ног, и девушка с криком полетела куда-то вниз.');
  assert.equal(scenes.scenes['intro-03'].actions[0].target,'intro-fall');
  assert.equal(scenes.scenes['intro-fall'].actions[0].target,'intro-04');
  assert.ok((await stat(new URL('../assets/preworld-fall-04.png',import.meta.url))).size>1_000_000);
  assert.equal(story.locales.ru.allowTouch,'Разрешить');
  assert.equal(story.locales.ru.forbidTouch,'Запретить');
  assert.equal(scenes.scenes['intro-allow-01'].actions[0].target,'intro-shared-02');
  assert.equal(scenes.scenes['intro-forbid-01'].actions[0].target,'intro-shared-02');
});
