# Open questions / verification queue

Короткий список только реально оставшихся вопросов. Уже подтверждённые системы не держим здесь повторно.

## Закрыто и больше не является вопросом

- [SWF] Новый день: база 3 Stamina; `staminaBoost` складывается максимум из двух ending bonuses; Busy Bee даёт отдельный +1; ночное чтение уменьшает следующий день на 1.
- [SWF] В normal mode `day` сбрасывается 41 -> 1 с `year += 1`; 4 сезона занимают day 1–40 каждого года. Final Mode отдельно оставляет cumulative day до 100.
- [User playthrough] Конец последнего обычного года штатно даёт концовку и завершает run. Отдельной неизвестной "границы run" здесь нет.
- [SWF] Бонус дополнительного года ставит `year=0`, что фактически добавляет ещё один 40-дневный год перед обычными Year 1–4.
- [SWF] Для всех 12 профессий первый career trigger = 15 смен; общий второй слой около 50 смен связан с Sinner's Orb.
- [SWF] Job availability, stat gates, year fallback, сезонные gains, salary/content gating и reactive career flow уже разобраны.
- [SWF] Обычная школа, special school, ночное обучение, new-run/meta loadout, statBoost, quarter-stat carryover и Final Mode reference разобраны.
- [SWF] Dungeon combat math, Seduction, statuses, items, elements, enemy pools, seasons, time-of-day scope, quest graph, Coax loot и special map architecture разобраны на уровне, достаточном для successor.

## Низкоприоритетные технические хвосты

1. `mazeSucceed`: принимающая D3 scene имеет отдельный branch, но прямого setter строки в main ABC не найдено. Проверять дальше имеет смысл только если понадобится полный atlas конкретной maze implementation.
2. Monster ID 46 пока не идентифицирован по имени. Его Coax outcome подтверждён как text-only "flat broke".
3. Space-pool IDs 58–59 пока не именованы. Отдельного Coax loot coverage для них нет.
4. Изолированные scene-specific time-of-day события можно искать по необходимости; общего time-based enemy pool не найдено.
5. Полный exhaustive каталог каждого chest/tile/fixed actor не нужен, пока он не отвечает на конкретный архитектурный вопрос.

## Следующее полезное направление

Recurring seasonal/competition layer закрыт в `original_seasonal_competitions_verified.md`.

Если продолжать разбор оригинала, приоритет отдавать только системам, которые добавляют новый архитектурный принцип для successor, а не деталям уже понятных подсистем.

## Правило работы

Если гайд и SWF расходятся — источником истины для механики считаем SWF. Гайд используем как карту. Пользовательские наблюдения по фактическому прохождению фиксируем отдельно как [User playthrough].
