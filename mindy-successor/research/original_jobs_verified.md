# Simply Mindy — verified job architecture from SWF

Источник истины здесь: ABC-код SceneEvents_0. Гайд используется только как навигация.

## 1. Универсальный старт карьерной цепочки

Для всех 12 профессий найден отдельный счётчик посещений/смен. Во всех 12 цепочках первое карьерное событие запускается на 15-й смене, если соответствующий Scene02 ещё не пройден.

| Профессия | Счётчик | 15 смен -> |
|---|---|---|
| Camwhore | camwhoreVisit | doneCamWhoreScene02 |
| Guard / Wall | wallVisits | doneWallsScene02 |
| Maid / Hotel | hotelVisit | doneHotelScene02 |
| Farmer | zombieVisit | doneFarmScene02 |
| Glory Hole | gloryHoleVisit | doneGloryHoleScene02 |
| Prostitute | prostituteVisit | doneProstituteScene02 |
| Arm Candy | armCandyVisit | doneArmCandyScene02 |
| Cosplayer | cosplayVisit | doneCosplayScene02 |
| Mascot | mascotVisit | doneMascotScene02 |
| Bikini Model | modelVisit | doneModelScene02 |
| Cabaret/Cabaresque | cabaresqueVisit | doneCabaresqueScene02 |
| Geisha | geishaVisit | doneGeishaScene02 |

Это подтверждает ключевую мысль из гайда: 15 смен — не приблизительная рекомендация, а общий архитектурный порог карьерных квестов.

## 2. Второй общий порог: 50 смен

У всех 12 тех же счётчиков есть проверка >= 50, связанная с отдельной SinnersOrb-сценой соответствующей профессии. Это ещё один общий слой job framework.

Пока не трактуем автоматически как «простую концовку»: код подтверждает переход в SinnersOrb branch, но смысл и последствия этой ветки нужно рассматривать отдельно.

## 3. Открытие поздних профессий

SWF подтверждает dual-gate: профессия открывается либо раньше по характеристикам, либо автоматически по году.

### Year 2 group

- Glory Hole:
  - Strength >= 30
  - Durability >= 30
  - Prowess >= 20
  - ИЛИ Year >= 2

- Prostitute:
  - Charisma >= 30
  - Sociability >= 15
  - ИЛИ Year >= 2

- Arm Candy:
  - Cleanliness >= 30
  - Sociability >= 15
  - ИЛИ Year >= 2

- Cosplayer:
  - Creativity >= 30
  - Sociability >= 15
  - ИЛИ Year >= 2

### Year 3 group

- Mascot:
  - Cleanliness >= 40
  - Sociability >= 30
  - Creativity >= 30
  - ИЛИ Year >= 3

- Bikini Model:
  - Charisma >= 30
  - Prowess >= 30
  - Fuckability >= 30
  - ИЛИ Year >= 3

- Cabaresque:
  - Creativity >= 30
  - Prowess >= 30
  - Class >= 20
  - ИЛИ Year >= 3

- Geisha:
  - Cleanliness >= 30
  - Sociability >= 30
  - Class >= 30
  - ИЛИ Year >= 3

## 4. Где гайд оказался неточным

Сам гайд предупреждает, что требования приблизительные. SWF уточняет минимум три места:

- Glory Hole требует ещё Prowess >= 20, а не только Strength/Durability.
- Bikini Model требует ещё Fuckability >= 30.
- Cabaresque требует ещё Prowess >= 30.

Это хороший пример того, зачем гайд нужен как карта, а SWF — как окончательная проверка.

## 5. Базовые работы

В SceneEvents_0 отдельные ранние career-state handlers существуют для Camwhore, Guard/Wall, Maid/Hotel и Farmer. Восьмерка остальных профессий имеет явные Trigger-gates по статам/году.

Вместе с гайдом это практически подтверждает модель: 4 ранние профессии + 4 year-2 + 4 year-3.

## 6. Пример глубины одной карьерной машины

Farmer:
- zombieVisit >= 15 -> Scene02;
- затем Intellect >= 20 И Sociability >= 20 -> следующий этап;
- затем нужен отдельный quest-state brainGo;
- после развилки используются sexFarmerJohn, johnSexCount, mushroomGot, johnSpurnCountdown и отдельные lover/spurn ветки.

Maid:
- hotelVisit >= 15 -> Scene02;
- Charisma >= 20 -> следующий этап;
- Sociability >= 20 -> следующий этап;
- дальше развилка sexFroglord;
- lover-ветка использует frogLordSexCount;
- reject/kill-ветка использует frogLordKillCountdown и поздние stat gates.

Camwhore:
- camwhoreVisit >= 15 -> Scene02;
- Intellect >= 20 -> следующий этап;
- затем четыре отдельные J*Got флага;
- потом jerrySexCount 5 -> 10 -> 15.

Это показывает типичный паттерн:
15 смен -> stat gate -> внешний quest/object flag -> выбор ветки -> повторяемые ночные/дневные счётчики -> финальные условия.

## 7. Что переносим как дизайнерский принцип

Для новой игры полезен не конкретный сюжет, а каркас:

- у каждой работы есть счётчик смен;
- после фиксированного числа смен начинается персональная цепочка;
- ранний сильный билд открывает поздние профессии раньше;
- если билд слабый/другой, профессия всё равно открывается позже по времени;
- карьерная цепочка хранится несколькими persistent flags/counters;
- работа может пересекаться с внешними системами и возвращаться обратно в карьерную ветку.

Для нашего проекта 10+1 профессий могут использовать общий job engine, но каждая должна иметь собственную state machine поверх него.
