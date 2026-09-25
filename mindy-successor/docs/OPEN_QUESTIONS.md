# Open questions / verification queue

Короткий список реально открытых вопросов. Подтверждённые системы оригинала и уже принятые архитектурные contracts здесь не дублируются.

## Original SWF — только низкоприоритетные хвосты

1. `mazeSucceed`: принимающая D3 scene имеет branch, но direct setter в main ABC не найден.
2. Monster ID 46 пока не идентифицирован по имени; Coax outcome подтверждён как text-only "flat broke".
3. Space-pool IDs 58–59 пока не именованы; отдельного normal Coax loot coverage нет.
4. Изолированные scene-specific time-of-day события искать только при конкретной архитектурной необходимости.
5. Exhaustive atlas chest/tile/fixed actors не нужен без конкретного вопроса.

Эти пункты не блокируют successor architecture.

## Архитектура — закрыто на уровне v1 contracts

Закрыты как target contracts:
- authoritative state ownership;
- Run+Meta atomic envelope;
- declarative Condition/Effect direction;
- typed progression domains;
- Event Resolver semantics;
- Night lifecycle;
- ActivityState boundary;
- save/content migration strategy;
- architecture migration acceptance slice.

Файлы: `SUCCESSOR_SYSTEM_ARCHITECTURE_v1.md` и связанные v1 contracts.

## Открытые DESIGN decisions

Решения по stat model, seasonal work, calendar и Palace unlock уже закрыты и вынесены в:
- `NEW_GAME_SPEC_v1.md`;
- `TARGET_STAT_SYSTEM_v1.md`;
- `SEASONAL_JOB_STAT_MODEL_v1.md`;
- `USER_DECISIONS_LOCKED_v1.md`.

Остаются:

1. **Seasonal job numbers:** `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv` simulation-tuned but still OPEN for final cap/floor and mixed-run tuning.
1a. **Ordinary job gates:** `ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv` passed theoretical fresh/meta timing simulation. OPEN final lock after exact meta rewards/School prices and mixed-life schedule pass.
2. **Economy:** fresh-hard direction now fixed; v2 candidate = wage 1 WU, normal rent ~2 WU, start ~12 WU, School ~6–12 WU. OPEN exact final numbers, wage scaling, cheap/street penalties and Secret Debt calibration.
3. **School production:** universal stat access is fixed in `SCHOOL_SYSTEM_v2.md`; OPEN exact gains/costs after `SCHOOL_BALANCE_MATRIX_v0.csv`, teachers, milestones, certificates, endings/meta rewards and fiction of the 2:1 correction service.
4. **Relationships:** major NPC roster, shared NPCs между careers, какие линии имеют endings.
5. **Large Activity production:** exact region count, encounter mechanics, camp scope, combat presence/absence beyond the accepted expedition umbrella.
6. **Items:** inventory capacity, contextual loadout slots, craft scope, vendors and first production catalog.
7. **Meta rewards:** deliberate easing is fixed. Current candidates: `HARD_WORK_META_REWARDS_v1.md`, `META_LOADOUT_MODEL_v1.md`, `COMPLEX_ENDING_META_REWARD_CATALOG_v0.md`. OPEN final numeric values, exact mapping for all relationship/Palace endings, and final confirmation of 2 pre-Palace / 3 post-Palace strong slots.
8. **Macro-goal:** concrete mystery, knowledge-fragment catalog and final late route.
9. **Palace:** exact role/title, court structure, discovery presentation, career details and concrete rewards. Unlock rule 10/10 ordinary Hard Work is fixed.
10. **Secret Debt/Slave Career:** exact chance within current 10–20% direction, exact loan/debt numbers, Energy penalty, access to School/Activity while locked, income/debt flow and exact rewards.
11. **Successor Final/late meta mode:** whether a separate bespoke mode exists beyond Palace/macro-goal.
12. **Seasonal recurring events/competitions:** concrete successor content.
13. **UI/art:** visual style, resolution/layout, media budget, editor UX.
14. **Production scope:** public 1.0 exact content depth, NPC count, Activity region count and media budget.
15. **Original SWF low-priority tails** listed above remain non-blocking.

## Следующий engineering gate

Если начинается реализация архитектуры, сначала выполнять только `ARCHITECTURE_MIGRATION_SLICE_v1.md`.

Не масштабировать jobs/scenes/content до прохождения:
- migration;
- typed career;
- resolver cascade;
- night exactly-once;
- resumable Activity;
- ending/meta exactly-once;
- deterministic save/reload tests.

## Правило исследования

Если гайд и SWF расходятся — механическую истину берём из SWF. Пользовательские наблюдения по прохождению фиксируем отдельно как [User playthrough]. Старый прототип и WIP — evidence/implementation history, а не молчаливое утверждение target design.
