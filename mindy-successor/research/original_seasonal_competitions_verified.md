# Simply Mindy — verified seasonal competition layer

Источники:
- [SWF] main ABC: `SceneEvents_0`, `SceneEvents_20`, contest scenes 7 / 29 / 244 / 243, contest progression handler, ending/meta scenes.
- [User playthrough] конец последнего обычного года является terminal ending route, а не ещё одним полноценным годом.

## 1. Competitions are recurring calendar deadlines

[SWF] На day 5 первого обычного года, если `doneFestivalIntro == false`, main автоматически запускает Scene 20.

Scene 20:
- сразу ставит `doneFestivalIntro = true`;
- объясняет систему четырёх сезонных contests;
- возвращает на main.

После этого main показывает/обрабатывает Contest Day на точных датах:

| day внутри года | season | contest scene | contest |
|---:|---|---:|---|
| 10 | Brimstone | 7 | Wet T-Shirt |
| 16 | Megahot | 29 | OverCum |
| 28 | Ghostings | 244 | Modelling |
| 39 | Darkly | 243 | Quiz |

Contest handler работает только когда:
- `finaleMode == false`;
- `endingSet == ""`.

Так как normal calendar после day 40 делает `year += 1; day = 1`, эти четыре даты повторяются каждый обычный год.

Это ключевое исправление прежней модели: contests не ограничены четырьмя событиями за весь run.

## 2. Contest consumes the rest of the day, not Stamina

[SWF] Entry router не списывает Stamina.

После завершения contest scenes все четыре типа возвращают игрока в Scene 15 (paid sleep / night transition), а не обратно в свободный дневной main loop.

Практическая модель:
`calendar deadline -> contest -> reward/penalty -> night transition -> next day`.

То есть участие — отдельный календарный выбор, который завершает текущий день, а не обычная Stamina-активность.

## 3. Four contests deliberately test different kinds of player progress

### Wet T-Shirt — Scene 7

Contest presentation explicitly evaluates:
- Charisma;
- Cleanliness;
- Fuckability.

Win:
- `contestsWon += 1`;
- `contestWonList[0] = "yes"`;
- +3 Charisma;
- +3 Cleanliness;
- +3 Fuckability;
- +$3,000.

Loss:
- `contestsLost += 1`;
- -3 Fuckability.

### OverCum — Scene 29

Это отдельный interactive endurance-style contest. Текст предупреждает, что важны Strength/Durability; сама scene имеет собственный opponent/progress state.

Win:
- `contestsWon += 1`;
- `contestWonList[1] = "yes"`;
- +$3,000;
- +5 Fuckability.

Loss:
- `contestsLost += 1`;
- -3 Strength;
- -3 Durability;
- -3 Prowess.

### Modelling — Scene 244

Игрок выбирает outfit; разные варианты проверяют разные пары stats. Код/текст показывает пары:
- schoolgirl -> Charisma + Intellect;
- cop -> Strength + Prowess;
- nurse -> Cleanliness + Sociability;
- nude/presentation route -> Class + Fuckability.

Contest дополнительно считает presentation/outfit score и сравнивает Mindy с двумя NPC contestants.

Win:
- `contestsWon += 1`;
- `contestWonList[2] = "yes"`;
- +$3,000;
- +3 Charisma;
- +3 Prowess.

Loss:
- `contestsLost += 1`;
- -1 Charisma;
- -1 Prowess;
- -1 Class;
- -1 Cleanliness;
- -1 Sociability.

### Quiz — Scene 243

Это уже не проверка билда, а проверка знания игры самим игроком.

- пять правильных ответов -> win;
- пять неправильных -> loss.

Win:
- `contestsWon += 1`;
- `contestWonList[3] = "yes"`;
- +$3,000;
- +10 Intellect.

Loss:
- `contestsLost += 1`;
- -6 Intellect.

Архитектурно четыре seasonal events специально используют разные axes: stat build, interactive endurance, choice/scoring и player knowledge.

## 4. Two progression representations are stored at once

[SWF] Contest layer tracks both:

1. `contestsWon` / `contestsLost` — total repeated performance across years;
2. `contestWonList[0..3]` — whether each distinct contest type has ever been won in the current run.

All of these are reset by the normal new-run reset.

This allows the same recurring event family to support qualitatively different goals.

## 5. Three separate ending eligibility routes

The main reactive handler checks:

### Four distinct wins
If all four entries in `contestWonList` are `"yes"`:
- launches Scene 245 if `doneContest4WinSinnersOrb == false`;
- this leads to the `endContest4Win` / **Games Theorist** route.

Meta reward:
- imports `ceil(previousStat / 4)` for most stats into a future run.

### Five total wins
If `contestsWon >= 5`:
- launches Scene 253 if its Sinner's Orb scene is still pending;
- leads to `endContest5Win` / **Spansexy**.

Meta reward:
- +1 daily Stamina through `staminaBoost`.

### Six total losses
If `contestsLost >= 6`:
- launches Scene 252 if its Sinner's Orb scene is still pending;
- leads to `endContest6Loss` / **Bend 'er Vendor**.

Meta reward:
- +2 to most starting stats.

Handler priority is:
1. four distinct wins;
2. five total wins;
3. six total losses.

As with job endings, these scenes offer a Sinner's Orb commitment rather than directly ending the run on the spot.

## 6. Extra-year and Final Mode implications

Because contest dates depend on `day`, not on a minimum `year`, a run beginning at `year=0` gets another full set of four seasonal contest opportunities during that added 40-day year.

Final Mode explicitly bypasses this normal contest layer through the `finaleMode == false` gate.

## Architecture takeaway

The useful abstraction is not "four sexy minigames". It is:

`recurring calendar deadline`
-> `one-day special challenge`
-> `immediate reward/penalty`
-> `per-type mastery + cumulative win/loss history`
-> `ending eligibility`
-> `meta reward for a future run`.

This is a strong model for making seasons matter without requiring every seasonal event to be part of a job or dungeon. The most reusable idea is storing both **breadth** (win each distinct challenge) and **volume** (total wins/losses), because they create different long-term goals from the same recurring events.
