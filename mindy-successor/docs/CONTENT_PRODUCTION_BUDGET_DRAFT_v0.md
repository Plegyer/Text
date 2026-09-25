# Content Production Budget Draft v0

Дата: 2026-09-25.

Статус: **SCOPE / PRODUCTION DRAFT**, не quota lock.

Покрывает: LIFE-09, LIFE-16, LIFE-17, LIFE-18.

Цель: оценивать насыщенность системно, а не обещанием "много сцен".

## 1. Content unit types

### Repeatable variant
Короткая рабочая/ночная/Activity постановка.

### Milestone scene
Существенная progression scene с choice/effects.

### Relationship beat
Значимый переход/запрос/конфликт.

### Ending completion
Отдельный финальный content unit.

### Calendar event
Festival/crisis/scheduled scene.

### Activity encounter
Повторяемый или уникальный challenge.

## 2. Ordinary career budget hypothesis

На одну ordinary job как ориентир:

- 8–16 repeatable shift variants;
- минимум несколько seasonal replacements/overlays;
- 6–10 major career milestones;
- 3–5 ending families;
- 1 major relationship chain;
- 1–3 external system hooks with dedicated scenes;
- 1–2 meaningful item integrations.

Это диапазон оценки, не обязательная квота.

## 3. Why not four fully unique seasons

Чтобы система была производимой:
- часть shift variants общая;
- часть получает seasonal presentation/text modifier;
- часть действительно season-exclusive;
- milestone сцены не дублируются четыре раза без причины.

Цель — сезон реально меняет решения, но не умножает весь сценарий на четыре.

## 4. Ten-job order-of-magnitude

При среднем:
- 12 repeatable variants x10 = 120;
- 8 major career scenes x10 = 80;
- 4 endings x10 = 40;
- 5 major relationship beats x10 = 50;

получается около 290 крупных/средних content units только вокруг ordinary careers, до School/Activity/general night/calendar.

Это показывает, почему нужны:
- reusable systems;
- variants;
- data-driven conditions;
- small production packages.

Это не означает 290 полностью уникальных иллюстраций.

## 5. Media budget principle

Media slot != unique commissioned asset.

Один stable presentation ID может:
- использовать placeholder;
- быть заменён позднее;
- иметь seasonal variant;
- reuse environment with different character pose.

Контент должен позволять сначала играть на placeholders.

## 6. Relationships

Не каждый NPC получает 8-scene romance.

Tiers:
- major: 4–8 meaningful beats;
- medium: 2–4;
- minor/repeatable: 1–2 + variants.

Major NPC должен иметь system impact.

## 7. Night content

Night budget состоит из:
- generic lodging outcomes;
- relationship meetings;
- School study;
- forced routes;
- season/housing variants.

Не создавать ежедневную уникальную night scene.

Cooldown/history/replacement rules обеспечивают разнообразие.

## 8. School

Каждый track:
- introduction;
- repeatable lesson variants;
- milestone/exam;
- teacher/peer hooks;
- certificate/result.

Не просто отдельный текст на каждую покупку stat.

## 9. Activity

Первый production target:
- 1 region;
- 3 route contexts;
- 3 challenge families;
- 1 NPC/quest chain;
- seasonal changes;
- 8–15 encounters including variants;
- 1 external career chain.

Только после проверки расширять regions.

## 10. Calendar/world events

Нужен небольшой повторяемый pool:
- optional daily/micro events;
- seasonal scheduled events;
- profession-injected variants.

Не начинать с сотен crisis IDs.

## 11. Production package sizing

DeepSeek/small executor:
- один законченный event family;
- один relationship beat set;
- один seasonal variant group;
- один item integration.

SOL:
- one bounded subsystem/career stage;
- integration;
- validation/tests.

Каждый пакет:
- exact files;
- IDs;
- allowed writes;
- acceptance tests.

## 12. Release slicing

### Architecture slice
Synthetic mechanics only.

### Product slice
Lumber + relationship + Forest Activity + items + School/night hooks.

### Starter slice
All 3 starting jobs to playable mid-depth.

### Roster expansion
Add jobs in batches.

### Late/meta slice
Palace + knowledge/meta route.

Так можно иметь playable checkpoints вместо "всё или ничего".

## 13. Acceptance

Content scope считается производимым, если:
- новые scenes не требуют core edits;
- media placeholders работают;
- repeatable pools не повторяются мгновенно;
- каждый major scene имеет system purpose;
- career can be implemented in bounded packages;
- progress recoverable after context/tool failure.

## 14. Открыто

- release-1 exact career count/depth;
- art budget;
- text length targets;
- localization;
- voice/audio;
- number of Activity regions;
- exact NPC count;
- final executor split.
