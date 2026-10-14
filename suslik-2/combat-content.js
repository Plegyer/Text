/* SUSLIK 2 — combat display text and media IDs: no changes to the combat engine needed. */
(function(host){
'use strict';
host.SUSLIK2CombatContent=Object.freeze({
 heroImage:'assets/combat/hero-standard.png',
 goblinImage:'assets/combat/goblin.png',
 combatMusic:'assets/combat/Shields_Against_the_Sky.mp3',
 musicId:'MUSIC.COMBAT.001',
 locales:{
  ru:{
   hero:'Амалия',goblin:'Гоблин',hp:'Здоровье',mana:'Мана',strength:'Сила',endurance:'Выносливость',dexterity:'Ловкость',magic:'Магия',damage:'Урон',accuracy:'Точность',
   strike:'Удар',spell:'Заклинание',dodge:'Увернуться',flee:'Побег',surrender:'Сдаться',
   noSpells:'Амалия пока не знает заклинаний.',notEnoughMana:'Недостаточно маны',back:'Назад',round:'Раунд',victory:'Победа!',defeat:'Поражение',defeatPending:'Последствия поражения будут добавлены по сценарию автора.',
   rewardPending:'Награда за победу обрабатывается…',extraPay:'Доплата за дальний лес',lootGold:'Найденное золото',spear:'Сломанное копьё гоблина',continueWork:'Продолжить работу',returnToArtel:'Вернуться к артели',
   logHeroHit:'Амалия наносит {n} урона.',logEnemyHit:'Гоблин наносит {n} урона.',logMiss:'Амалия промахнулась.',logEnemyDodges:'Противник уклонился.',logHeroDodges:'Амалия уклонилась.',logGuard:'Амалия готовится уклониться (+20% на этот раунд).',logSpell:'Амалия использует заклинание: {n} урона.',logEscape:'Амалия пытается сбежать.',logSurrender:'Амалия сдаётся.'
  },
  en:{
   hero:'Amalia',goblin:'Goblin',hp:'Health',mana:'Mana',strength:'Strength',endurance:'Endurance',dexterity:'Agility',magic:'Magic',damage:'Damage',accuracy:'Accuracy',
   strike:'Strike',spell:'Spell',dodge:'Dodge',flee:'Escape',surrender:'Surrender',
   noSpells:'Amalia has not learned any spells.',notEnoughMana:'Not enough mana',back:'Back',round:'Round',victory:'Victory!',defeat:'Defeat',defeatPending:'The author has not supplied the defeat scene yet.',
   rewardPending:'Processing victory reward…',extraPay:'Distant forest bonus',lootGold:'Looted gold',spear:'Broken goblin spear',continueWork:'Continue working',returnToArtel:'Return to the lumber crew',
   logHeroHit:'Amalia deals {n} damage.',logEnemyHit:'Goblin deals {n} damage.',logMiss:'Amalia misses.',logEnemyDodges:'The enemy dodges.',logHeroDodges:'Amalia dodges.',logGuard:'Amalia prepares to dodge (+20% for this round).',logSpell:'Amalia casts a spell for {n} damage.',logEscape:'Amalia attempts to flee.',logSurrender:'Amalia surrenders.'
  }
 }
});
})(globalThis);
