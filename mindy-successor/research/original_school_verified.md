# Simply Mindy — verified school mechanics from SWF

ABC-код school scene подтверждает точные цены, приросты и расход Stamina.

| Курс | Цена | Эффект |
|---|---:|---|
| Fuck | 300 | +2 Fuckability, +1 Charisma |
| Anal | 400 | +2 Fuckability, +2 Durability |
| Oral | 400 | +2 Fuckability, +2 Prowess |
| S&M | 500 | +3 Fuckability, +2 Prowess, +2 Creativity |
| Fight | 500 | +1 Fuckability, +3 Strength, +3 Durability, +3 Prowess |
| Magic | 600 | +1 Fuckability, +4 Intellect, +4 Spirit |
| Fancy/Class | 600 | +2 Fuckability, +3 Class, +3 Sociability, +2 Intellect |

Каждый платный урок:
- проверяет достаточность денег;
- проверяет Stamina > 0;
- списывает указанную цену;
- списывает ровно 1 Stamina;
- сразу применяет пакет характеристик.

Из этого следует важный системный паттерн: школа конкурирует с работой за тот же action-resource, но дополнительно конкурирует за деньги. Поздние дорогие курсы дают заметно более крупные мультистатовые пакеты.

Восьмой школьный пункт из гайда (swap/titles) пока оставлен на отдельную проверку, потому что он не входит в этот обычный семикурсовый обработчик.
