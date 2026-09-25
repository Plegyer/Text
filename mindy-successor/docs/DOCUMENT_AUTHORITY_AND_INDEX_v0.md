# Document Authority and Index v0

Дата: 2026-09-25.

Статус: **PROJECT NAVIGATION CONTRACT**.

Цель: новый исполнитель не должен читать документы в случайном порядке и принимать исторический draft за текущий lock.

## 1. Authority order

При конфликте:

1. Последнее прямое решение пользователя в текущем проекте.
2. `USER_VISION_AND_ACCEPTANCE.md`.
3. `NEW_GAME_SPEC_v0.md` — только те пункты, которые не были позже уточнены.
4. Target architecture v1 contracts.
5. Более новые product design drafts.
6. Historical prototype/M3.2 implementation.
7. WIP M3.3.
8. Reverse-engineering findings — как reference evidence, а не автоматический successor rule.

Если конфликт не разрешается по дате/статусу — записать его, не выбирать молча.

## 2. Must-read product context

1. `USER_VISION_AND_ACCEPTANCE.md`
2. `PROJECT_STATE.md`
3. `OPEN_QUESTIONS.md`
4. `USER_DECISION_PACKET_v0.md`
5. `LIFE_REQUIREMENTS_TRACEABILITY_v0.md`

## 3. Architecture baseline

1. `SUCCESSOR_SYSTEM_ARCHITECTURE_v1.md`
2. `TARGET_STATE_OWNERSHIP_v1.md`
3. `PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md`
4. `EVENT_RESOLVER_CONTRACT_v1.md`
5. `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`
6. `SAVE_AND_MIGRATION_CONTRACT_v1.md`

Historical:
- `SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md` superseded.

## 4. Implementation gates

- `ARCHITECTURE_MIGRATION_SLICE_v1.md`
- `PRODUCT_ACCEPTANCE_SLICE_v0.md`
- `FIRST_RELEASE_SCOPE_DRAFT_v0.md`
- `FULL_TZ_READINESS_REVIEW_v0.md`

## 5. Core product systems

### Jobs
- `JOB_ROSTER_RECONCILIATION_v1.md`
- `JOB_SYSTEM_MATRIX_v0.md`
- `JOB_STAT_TRADEOFF_PASS_v0.md`

Career drafts:
- Lumber
- Satyr Maid
- Undead Farm
- Tavern
- Hunter
- Guard
- Artist/Geisha
- Assassin
- Merchant
- Prostitute
- Palace hidden career
- Poverty/Secret Debt hidden career

### Stats
- `STAT_SYSTEM_DRAFT_v0.md`
- `STAT_COVERAGE_MATRIX_v1.md`
- `STAT_MODEL_RECOMMENDATION_v2.md`

### School
- `SCHOOL_SYSTEM_DRAFT_v0.md`

### Relationships
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`
- `LUMBER_RELATIONSHIP_CHAIN_v0.md`

### Activity
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`
- `FOREST_ACTIVITY_SLICE_v0.md`

### Items
- `ITEM_SYSTEM_DRAFT_v0.md`
- `INITIAL_ITEM_CATALOG_v0.md`

### Economy / poverty
- `ECONOMY_AND_POVERTY_DRAFT_v0.md`
- `ECONOMY_NUMERIC_FRAMEWORK_v0.md`
- `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`

### Calendar
- `CALENDAR_AND_RUN_LENGTH_ANALYSIS_v0.md`

### Meta
- `META_REWARD_HIERARCHY_DRAFT_v0.md`
- `META_MACRO_GOAL_DRAFT_v0.md`
- `PALACE_HIDDEN_CAREER_DRAFT_v0.md`

### UI/media
- `TARGET_GAME_SHELL_v0.md`
- `MEDIA_PRESENTATION_CONTRACT_v0.md`

### Production
- `CONTENT_PRODUCTION_BUDGET_DRAFT_v0.md`

## 6. Historical implementation

Read only after target docs:
- `prior-work/astra/prototype-m3.2/`
- `PROTOTYPE_M3_2_REUSE_REVIEW.md`

Do not apply:
- `prior-work/astra/wip-m3.3/` automatically.

## 7. Reverse engineering

Use `research/` when:
- resolving a specific reference mechanic;
- checking why architecture copied/improved a pattern;
- verifying a contradiction.

Do not require every executor to reread all SWF research.

## 8. Decision placeholders

Until user locks D1–D12:
- do not silently hard-code recommendation values in production content;
- architecture test fixtures may use synthetic temporary values clearly named as fixtures.

## 9. Status words

- **LOCKED / FIXED**: accepted user/project decision.
- **TARGET CONTRACT**: technical baseline.
- **STRONG DRAFT**: expected direction, still editable.
- **RECOMMENDATION**: model proposal, requires acceptance.
- **HISTORICAL**: evidence/old implementation only.
