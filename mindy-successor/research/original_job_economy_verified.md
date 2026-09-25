# Simply Mindy — verified job economy

Источник: ABC-код базовых рабочих сцен. Это не данные из гайда.

## Общая формула

Во всех 12 базовых рабочих сценах найден расчёт `_moneyEarned` по одной архитектурной схеме:

`случайная базовая сумма + профильные характеристики с весами + Fuckability`

После расчёта сумма прибавляется к глобальному `money`.

Это означает, что зарплата в оригинале не фиксирована: развитие персонажа напрямую повышает доход на работе.

## Формулы

| Job | Scene | Money formula |
|---|---:|---|
| Camwhore | 6 | random(15,30) + 1.25×Charisma + 1.25×Creativity + Fuckability |
| Farmer | 5 | round(random(25,50) + 1.25×Strength + 1.25×Durability + Fuckability) |
| Maid | 4 | random(25,50) + 1.5×Cleanliness + Fuckability |
| Guard | 3 | round(random(25,50) + 1.25×Strength + 1.25×Prowess + Fuckability) |
| Glory Hole | 13 | random(25,50) + 1.25×Durability + 1.25×Strength + Prowess + Fuckability |
| Prostitute | 25 | random(50,75) + 1.5×Charisma + 1.5×Sociability + Fuckability |
| Arm Candy | 24 | random(50,75) + 1.5×Class + 1.5×Sociability + Fuckability |
| Cosplayer | 52 | random(50,75) + 1.5×Class + 1.5×Sociability + Fuckability |
| Mascot | 53 | random(75,100) + 1.5×Creativity + 1.5×Sociability + 1.5×Cleanliness + Fuckability |
| Bikini Model | 88 | random(45,60) + 1.5×Charisma + 1.5×Durability + Fuckability |
| Cabaresque | 166 | random(75,100) + 1.5×Prowess + 1.5×Class + 1.5×Charisma + Fuckability |
| Geisha | 222 | random(75,100) + 1.5×Cleanliness + 1.5×Class + 1.5×Charisma + Fuckability |

Примечание: Guard/Farmer явно вызывают Math.round вокруг итоговой формулы. У остальных такого вызова в соответствующем блоке нет; не нормализуем это предположением.

## Структура тиров

По базовой случайной части уже виден экономический tiering:

- самый ранний Camwhore: 15–30;
- ранние Farmer/Maid/Guard и Glory Hole: 25–50;
- средние Prostitute/Arm Candy/Cosplayer: 50–75;
- Bikini Model: 45–60, но с высоким весом статов;
- поздние Mascot/Cabaresque/Geisha: 75–100.

Доход поздних работ выше не только через base roll, но и потому, что в формулу включено больше характеристик с коэффициентом 1.5.

## Важный дизайнерский вывод

Рабочие характеристики имеют двойную функцию:
1. работа сама изменяет stats;
2. уже накопленные профильные stats увеличивают доход от последующих смен.

Fuckability входит в формулу дохода КАЖДОЙ из 12 профессий. Это отдельный системный факт оригинала, который нельзя сводить только к открытию эротических сцен.

Для новой игры это не обязательное правило: пользователь уже решил, что Lust прежде всего маршрутизирует дополнительный контент, а не должна штрафовать базовую оплату.
