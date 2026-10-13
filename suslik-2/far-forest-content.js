/* SUSLIK 2 far-forest media and copy; all scene text is editable here without
   changing game logic. Loaded as a classic script, without fetch or a server. */
(function (host) {
  'use strict';
  host.SUSLIK2FarForestContent = Object.freeze({
    goblinImage: 'assets/far-forest/goblin-encounter.png',
    // The actual sawmill must pass the approved CURRENT seasonal work image.
    // It is intentionally not invented or duplicated in this package.
    locales: {
      ru: {
        access: 'Работа в дальнем лесу',
        ordinaryAlt: 'Сезонная работа на лесопилке',
        ordinaryTitle: 'Обычная смена',
        next: 'Далее', continueWork: 'Продолжить работу',
        goblinAlt: 'Амалия встречает маленького гоблина в лесу',
        goblinText: 'Работая в самой глубине леса, Амалия вдруг услышала в листве осторожный шелест. Она обернулась и увидела маленького зелёного человечка, который с любопытством таращился на неё из кустов, а под его набедренной повязкой у него весьма недвусмысленно что-то выпирало.',
        permission: 'Получить разрешение', fight: 'Бой',
        permissionPending: 'Продолжение пути «Получить разрешение» будет добавлено позже.',
        fightPending: 'Продолжение пути «Бой» будет добавлено позже.'
      },
      en: {
        access: 'Work in the Distant Forest',
        ordinaryAlt: 'Seasonal work at the sawmill',
        ordinaryTitle: 'Ordinary shift',
        next: 'Next', continueWork: 'Continue working',
        goblinAlt: 'Amalia meets a small goblin in the forest',
        goblinText: 'While working deep in the forest, Amalia suddenly heard a cautious rustle in the leaves. She turned and saw a small green fellow peering at her curiously from the bushes, with something rather unmistakable protruding beneath his loincloth.',
        permission: 'Get permission', fight: 'Fight',
        permissionPending: 'The “Get permission” branch will be added later.',
        fightPending: 'The “Fight” branch will be added later.'
      }
    }
  });
})(globalThis);
