# Meta Reward Hierarchy Draft v0

Дата: 2026-09-25.

Статус: **PARTIALLY SUPERSEDED FRAMEWORK**. The earlier anti-power-creep restrictions are overridden by `META_REWARD_PHILOSOPHY_v1.md`; tier vocabulary may still be reused.

Покрывает: LIFE-02, LIFE-13, LIFE-14, LIFE-15.

## 1. Проблема

Если каждая ending просто даёт +stat:
- NG+ быстро становится линейным power creep;
- разные судьбы ощущаются одинаково;
- простая стажевая ending может случайно оказаться сильнее сложной;
- повторное прохождение теряет смысл.

Поэтому rewards делятся по масштабу и типу.

## 2. Reward tiers

### Tier H — Hard Work / stable life

Источник:
- ordinary Hard Work;
- аналогичная простая профессиональная судьба.

Reward philosophy:
- небольшой тематический стартовый плюс;
- contact;
- starting item option;
- early familiarity;
- небольшой profession-specific stat/resource advantage.

Не использовать:
- +1 daily Energy за лёгкий стаж;
- крупные universal discounts;
- permanent broad multiplier.

### Tier B — Branch mastery

Источник:
- leadership;
- ownership;
- master artist/hunter;
- merchant house;
- officer;
- independent house.

Reward:
- новый способ начать;
- early access;
- supplier/contact;
- profession rule modification;
- selectable start option.

Сильнее Hard Work, но тематически ограничен.

### Tier X — Cross-system / difficult ending

Источник:
- Forest Compact;
- Major Case;
- Legend;
- Turncoat/Takeover;
- Research chain;
- complex Secret Debt takeover.

Reward:
- strong rule-changing option;
- MetaKnowledge;
- new route;
- alternate start;
- access to late content.

Не обязательно численно сильнее во всех runs, но шире по возможностям.

### Tier P — Palace / late meta

Источник:
- Palace complex outcomes;
- macro-goal milestones.

Reward:
- late-game access;
- major start rules;
- knowledge;
- alternate world route.

Не обязан давать raw stat inflation.

## 3. Reward type catalog

### Starting familiarity
Career begins at known/introduced state or skips tutorial-like gate.

### Starting contact
NPC/supplier/mentor accessible earlier.

### Starting item option
Player can choose thematic tool at new-run setup.

### Rule modifier
Changes a narrow rule:
- different lodging option;
- extra route choice;
- contract access;
- alternative payment.

### Knowledge unlock
New dialogue/condition without stat increase.

### Availability unlock
New job/course/activity/location.

### Carry-over
Limited stat/resource transfer if explicitly designed.

### Cosmetic/presentation
Optional, never sole reward for a major route unless paired with meaningful content.

## 4. Hard Work and Palace

Hard Work endings have an additional meta function:
- unique profession completion contributes to Palace unlock.

This is already more valuable than its individual perk.

Therefore personal Hard Work reward should stay moderate.

Exact `PALACE_REQUIRED` OPEN.

## 5. Secret Debt mandatory endings

### paid_freedom
Reward family:
economic resilience / debt knowledge.

Candidate examples:
- emergency-credit alternative;
- lender-trap recognition dialogue;
- small starting reserve;
- cheaper emergency lodging option.

Exact one OPEN.

### bound_life
Reward family:
hidden-system familiarity.

Candidate examples:
- early knowledge/contact in underclass network;
- alternate start option;
- specific hidden content access.

Whether it counts as ordinary Hard Work progress remains OPEN.

### takeover
Tier X candidate.

Reward family:
underworld/status/rule-changing access.

Could unlock:
- powerful contact;
- alternate coercive/economic route;
- knowledge of debt network;
- special start.

Не определять exact reward без whole-meta balance.

## 6. Reward duplication

Если two endings unlock same category:
- rewards should combine meaningfully or become alternatives;
- no duplicate dead unlock.

Loader/test should identify identical rewards with no additional effect.

## 7. Selectable vs automatic

Knowledge:
- automatic/persistent recommended.

Content/job availability:
- automatic unlock.

Strong rule modifiers:
- candidate for selectable loadout/budget.

Small thematic familiarity:
- can be automatic if balance permits.

Exact loadout model OPEN.

## 8. Reward acceptance

Каждая ending spec должна ответить:
1. почему reward тематически связан;
2. какой новый choice он создаёт;
3. насколько он силён относительно ending difficulty;
4. automatic/selectable?;
5. stack rules;
6. duplicate handling;
7. effect on first 7 days of next run.

## 9. Anti-patterns

- все endings дают +5 к разным stats;
- лёгкий Hard Work даёт +daily Energy;
- сложная ending даёт только косметику;
- hidden ending unlock бессмыслен без content;
- reward заставляет всегда выбирать один и тот же meta loadout.

## 10. Следующий шаг

После выбора stat/start model:
- назначить по 1 candidate reward каждой из 10 Hard Work endings;
- назначить rewards сложным branches;
- прогнать 7-day next-run scenarios;
- выбрать automatic/selectable policy.
