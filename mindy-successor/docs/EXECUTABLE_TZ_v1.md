# EXECUTABLE TЗ v1 — Mindy Successor

Дата: 2026-09-25.

Статус: **MASTER IMPLEMENTATION SPEC v1**.

Назначение: единая точка входа для SOL / DeepSeek / другого исполнителя. Этот документ не отменяет подробные target-contract docs; он связывает их в один исполнимый план.

---

## 0. Authority

При конфликте использовать:

1. прямое последнее решение пользователя;
2. `USER_VISION_AND_ACCEPTANCE.md`;
3. `USER_DECISIONS_LOCKED_v1.md`;
4. `NEW_GAME_SPEC_v1.md`;
5. этот документ;
6. target architecture contracts;
7. newer product drafts;
8. stable M3.2 implementation as reuse source;
9. reverse-engineering research as evidence/reference;
10. WIP M3.3 never auto-applied.

Обязательный индекс:
`DOCUMENT_AUTHORITY_AND_INDEX_v0.md`.

Исполнитель не имеет права закрывать OPEN decision своим вкусом.

---

## 1. Product

Standalone single-player adult fantasy life-sim RPG.

Heroine:
- взрослая женщина;
- попадает в fantasy world без женщин через белого суслика/люк;
- может строить профессию, учиться, жить бедно или богато, развивать отношения, исследовать мир;
- большая тайна существует, но не подчиняет себе каждую жизнь.

Главная ценность:
**плотность взаимосвязей систем**.

Нормальная жизнь должна поддерживать:
- profession;
- School;
- housing;
- Night;
- relationships;
- items;
- Large Activity;
- endings;
- meta/NG+.

Не копировать:
- original characters/dialogue/assets;
- JRPG literally;
- original Final Mode;
- bugs;
- exact scene content.

---

## 2. Locked run loop

Fresh day:
- base Energy = 3.

Explicit Energy costs:
- ordinary Work = 1;
- School = 1 + money;
- Large Activity entry = 2.

Default 0-Energy:
- reactive career dialogue;
- reactive relationship dialogue;
- job-unlock scene;
- minor reactive city event.

Night:
- one Night slot;
- normal relationship meeting uses Night slot, not daytime Energy;
- night study uses Night slot and gives next-day Energy -1;
- lodging resolves before day advance;
- forced night can intercept before/after lodging by policy.

Calendar:
- 4 years;
- 40 days/year;
- 4 seasons;
- 10 days/season;
- 160 days total.

Run ending:
- eligibility != commitment;
- eligible ending does not stop play;
- player commits separately;
- central completion produces RunResult;
- Meta reward applied exactly once.

Normative:
- `ACTION_TIME_COST_MODEL_v1.md`
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`
- `CORE_NUMERIC_BASELINE_v1.md`.

---

## 3. Character model

### 3.1 Progression stats

12 progression stats:

- strength / Сила
- endurance / Выносливость
- dexterity / Ловкость
- reason / Разум
- magic / Магия
- creativity / Творчество
- wits / Смекалка
- charm / Обаяние
- sociability / Общительность
- manners / Манеры
- grooming / Ухоженность
- sexuality / Сексуальность

Separate:
- lust / Похоть — positive content axis.

### 3.2 Range

Normal progression stats:
- min 0;
- max 100.

Creation:
- all 12 start at 1;
- +10 free allocation points among the 12;
- Lust not part of those 10.

Lust:
- must never reduce salary merely for being high;
- can unlock/replace voluntary content variants;
- stat unlock does not equal consent/action choice.

Normative:
`TARGET_STAT_SYSTEM_v1.md`.

---

## 4. Work stat progression

No universal +2/+2/-1.

Every ordinary job has four seasonal effect packages.

Current implementation baseline:
`SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`.

Seasonal effects:
- data-driven;
- small integer deltas;
- clamp progression stats 0..100;
- can differ in number of positive/negative axes;
- presentation variants do not reapply mechanical effects.

Grooming is a full high-volatility progression stat:
- dirty/field work can reduce it;
- service/presentation jobs can raise it;
- School can raise it;
- street sleep can reduce it.

Do not add a second global Cleanliness meter.

Normative:
`SEASONAL_JOB_STAT_MODEL_v1.md`.

---

## 5. Ordinary profession availability

Exactly three available from Day 1:

1. Lumber
2. Satyr Maid
3. Undead Farm

Other seven use:
`stat gate OR calendar fallback`.

Baseline gates:

- Tavern: Charm >=45 AND Sociability >=35; Year-2 fallback.
- Hunter: Dexterity >=25 AND Endurance >=20 AND Wits >=15; Year-2 fallback.
- Guard: Strength >=30 AND Endurance >=30 AND Manners >=20; Year-2 fallback.
- Merchant: Wits >=20 AND Reason >=20 AND Sociability >=15; Year-2 fallback.
- Artist/Geisha: Creativity >=35 AND Manners >=25 AND Grooming >=30; Year-3 fallback.
- Assassin: Dexterity >=30 AND Wits >=25 AND Reason >=20; Year-3 fallback.
- Prostitute: Sexuality >=55 AND Charm >=40 AND Sociability >=35; Year-3 fallback.

Unlock is derived/reactive.
Do not store redundant boolean unlock when it is derivable; store discovery/notified fact separately if needed.

Normative:
- `ORDINARY_JOB_UNLOCK_MODEL_v1.md`
- `ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv`
- `JOB_UNLOCK_SIMULATION_REPORT_v2.md`.

---

## 6. Career architecture

Every ordinary career consists of:

### Repeatable layer
- Work command;
- 1 Energy;
- wage;
- seasonal stat package;
- repeatable presentation variants;
- history/cooldown.

### Career progression
Typed CareerRunState:
- stage;
- shifts;
- domain counters;
- choices;
- facts.

Progression can trigger after:
- work;
- School;
- Activity;
- item/fact;
- relationship;
- calendar boundary.

Career progression must not require another shift merely to notice a gate already satisfied by another system.

### Outcomes
Each production career:
- Hard Work;
- at least two complex outcome families.

Full ordinary career drafts:
- `CAREER_LUMBER_DRAFT_v0.md`
- `CAREER_SATYR_MAID_DRAFT_v0.md`
- `CAREER_UNDEAD_FARM_DRAFT_v0.md`
- `CAREER_TAVERN_DRAFT_v0.md`
- `CAREER_HUNTER_DRAFT_v0.md`
- `CAREER_GUARD_DRAFT_v0.md`
- `CAREER_GEISHA_ARTIST_DRAFT_v0.md`
- `CAREER_ASSASSIN_DRAFT_v0.md`
- `CAREER_MERCHANT_DRAFT_v0.md`
- `CAREER_PROSTITUTE_DRAFT_v0.md`.

---

## 7. Hard Work

Baseline:
- 50 completed shifts in that profession;
- no seasonal-breadth requirement;
- no relationship requirement;
- no complex quest requirement.

It is intentionally the simple persistence fate.

Eligibility:
- registers ending;
- does not end run.

Meta:
- reward only after commitment/completion;
- repeat does not stack;
- each job counts once for Palace.

At least ten completed runs are required for 10/10 Palace under current one-committed-ending-per-run baseline.

Automatic rewards:

- Lumber: +3 starting Strength/+3 Endurance
- Satyr Maid: +3 Charm/+3 Grooming
- Undead Farm: +3 Reason/+3 Magic
- Tavern: +3 Sociability/+3 Manners
- Hunter: +3 Dexterity/+3 Wits
- Guard: +3 Endurance/+3 Manners
- Merchant: +600 starting money
- Artist/Geisha: +3 Creativity/+3 Grooming
- Assassin: +3 Dexterity/+3 Wits
- Prostitute: +3 Sexuality/+3 Charm

Normative:
`HARD_WORK_META_REWARDS_v1.md`.

---

## 8. Palace

Hidden/meta profession, not one of ordinary 10.

Unlock:
**Hard Work completed on all 10 ordinary professions.**

No:
- year fallback;
- Secret Debt contribution;
- duplicate-work contribution.

Palace profile is expected to be meta-powered.

Palace career remains:
- repeatable work;
- typed progression;
- legacy-sensitive opportunities;
- minimum outcome families:
  - Service/Palace Hard Work;
  - Court Power;
  - Inner Truth/world route.

Normative:
`PALACE_HIDDEN_CAREER_DRAFT_v0.md`.

---

## 9. School

School is both:
- reliable build correction;
- independent progression/content system.

All 12 progression stats must be purchasable through repeatable lessons.

Baseline courses:

- Literacy & Numbers: 300; +4 Reason +2 Wits.
- Arcana: 500; +4 Magic +4 Reason +2 Creativity.
- Rhetoric & Social: 300; +3 Charm +3 Sociability +2 Wits.
- Etiquette & Presentation: 400; +3 Manners +3 Grooming +2 Charm.
- Field Craft: 400; +3 Dexterity +3 Wits +2 Creativity.
- Physical Training: 400; +3 Strength +3 Endurance +2 Dexterity.
- Arts & Performance: 500; +3 Creativity +3 Charm +2 Sociability +2 Dexterity.
- Body Confidence: 400; +3 Sexuality +3 Grooming +2 Endurance.

Each lesson:
- 1 Energy;
- tuition;
- immediate stat package.

On top:
- track progress;
- teachers;
- milestones;
- projects/exams;
- certificates/public facts;
- relationship hooks;
- School endings.

Special correction service:
- any progression stat -> any other;
- target ratio candidate 2:1;
- cannot involve Lust.

Night study:
- choose one stat supported by known/enrolled track;
- +2 chosen stat;
- no tuition;
- Night slot;
- next-day Energy -1;
- does not auto-complete certificate.

Normative:
- `SCHOOL_SYSTEM_v2.md`
- `SCHOOL_BALANCE_MATRIX_v0.csv`
- `SCHOOL_REACHABILITY_SIMULATION_v1.md`.

---

## 10. Economy / housing

Visible scale:
- 1 WU = 50 currency.

Fresh:
- starting money = 600.
- starter work ≈ 50.

Housing:
- normal = 100/night;
- cheap = 50/night;
- street = 0.

Normal:
- full Energy;
- full normal Night/privacy;
- no passive Grooming gain.

Cheap:
- full Energy;
- restricted privacy/Night/storage;
- no universal arbitrary stat penalty.

Street:
- next-day Energy -1;
- Grooming -1;
- restricted Night;
- street/poverty event pool;
- Secret Debt lender eligibility.

Never softlock:
0 money must still allow:
- sleeping somewhere;
- next day;
- at least one earning action.

Normative:
- `ECONOMY_BALANCE_CANDIDATE_v2.md`
- `HOUSING_AND_NIGHT_BALANCE_v1.md`
- `FULL_160_DAY_RUN_SIMULATION_v1.md`.

---

## 11. Relationships

No universal paid date loop.

Preferred progression:

```text
life action
-> stat/visit/counter/fact changes
-> Resolver condition
-> 0-Energy relationship dialogue
-> stage/choice/fact changes
```

Gate types:
- stat;
- work interaction count;
- previous interactions;
- night count;
- career stage;
- item;
- School fact;
- Activity result;
- season.

Night relationship:
- Night slot;
- no universal next-day Energy penalty.

Stat unlocks a choice; it does not force romance/sex.

Major relationship must feed another life system.

Normative:
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`
- `RELATIONSHIP_TRIGGER_MODEL_v1.md`
- `LUMBER_RELATIONSHIP_CHAIN_v0.md`.

---

## 12. Large Activity

Target:
expedition umbrella.

Entry:
- 2 daily Energy.

Inside:
- separate ActivityState;
- internal endurance/supplies/time/etc.;
- no alias to daily Energy;
- save/resume;
- deterministic RNG;
- success/escape/failure;
- typed ActivityResult.

Activity can return:
- resources;
- items;
- stats;
- world facts;
- quest facts;
- career facts;
- relationship facts.

First production slice:
Forest:
- 3 route contexts;
- navigation;
- physical obstacle;
- magic/interpretation;
- item capabilities;
- seasonal path changes;
- city preparation;
- career/relationship feedback.

Normative:
- `LARGE_ACTIVITY_PRODUCT_ROLE_v0.md`
- `FOREST_ACTIVITY_SLICE_v0.md`
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`.

---

## 13. Items

Capability-based.

Item must primarily:
- open action;
- open route;
- change method/risk/cost;
- act as evidence/key/tool;
- enable extraction/turn-in.

Do not center system on passive percentage bonuses.

Initial catalog:
`INITIAL_ITEM_CATALOG_v0.md`.

Schema/product:
`ITEM_SYSTEM_DRAFT_v0.md`.

---

## 14. Secret Debt / hidden poverty career

Separate hidden career.

Not an ordinary job.

Required principles:
- rare street-lender trigger;
- loan/debt trap;
- ordinary jobs blocked after bound activation;
- forced NightFlow;
- next-day Energy consequence;
- independent career progression.

Minimum endings:
- paid_freedom;
- bound_life;
- takeover.

Does not count toward Palace 10/10.

Exact loan/debt values remain product-tuning area; current direction 2000 -> 20000 after 10 days remains source design, not to be silently changed.

Normative:
`POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

---

## 15. Endings and Meta

Ending state:
- eligible set;
- committed ending;
- RunResult.

Exactly once:
- one committed ending;
- one RunResult;
- one application of reward.

Automatic meta:
- Hard Work rewards;
- knowledge;
- content/profession unlocks;
- Palace progress.

Strong Legacy perks:
- 2 active slots before first Palace completion;
- 3 after Palace completion.

Strong candidates:
- +1 daily Energy;
- No Rent;
- School discount;
- daily income;
- stat carry-over;
- Activity benefit;
- extra calendar time;
- starting item packages.

Late runs are intentionally easier.

Do not rebalance them back toward fresh difficulty.

Normative:
- `META_REWARD_PHILOSOPHY_v1.md`
- `META_LOADOUT_MODEL_v1.md`
- `COMPLEX_ENDING_META_REWARD_CATALOG_v0.md`
- `META_PERK_IMPACT_SIMULATION_v1.md`
- `META_MACRO_GOAL_DRAFT_v0.md`.

---

## 16. Target state architecture

SaveEnvelope:

```text
schemaVersion
contentVersion
meta: MetaState
run: RunState
```

MetaState:
- completedEndings
- unlocks
- ruleModifiers
- hardWorkProgress
- persistentChoices
- carryOver
- runsStarted
- runsCompleted

RunState:
- CalendarState
- CharacterState
- ResourceState
- DayState
- HousingState
- ProgressionState
- EndingState
- FlowState
- RngState
- HistoryState

Single owners:
- current Energy -> DayState only;
- money/inventory -> Resources;
- stats -> Character;
- career -> CareerRunState;
- relationship -> RelationshipRunState;
- current activity -> Flow.ActivityEnvelope;
- current night -> Flow.Night;
- current pending scene -> Flow.PendingScene.

No new generic progression flag bag.

Normative:
`TARGET_STATE_OWNERSHIP_v1.md`.

---

## 17. Condition / Effect contract

Content:
- serialized declarative AST;
- no eval;
- no arbitrary save paths;
- no JS callbacks.

Typed conditions:
- stat/resource/item;
- calendar;
- job availability;
- career stage/shifts/counter/fact/choice;
- relationship;
- School/world facts;
- meta unlock;
- all/any/not.

Typed effects:
- stat/resource/item;
- career counter/fact/transition;
- relationship transition;
- next-day modifier;
- ending eligibility;
- reaction facts.

Other domain cannot directly mutate another domain's internal stage.

Normative:
`PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md`.

---

## 18. Event Resolver

After every state-changing boundary:
- emit reaction facts;
- collect eligible candidates;
- deterministic priority;
- persist chosen blocking scene;
- resolve;
- re-run after choice.

Priority classes:
1 terminal
2 ending_committed
3 forced
4 scheduled_mandatory
5 critical_progression
6 normal_progression
7 optional_world
8 notification

Relationships/career events are commonly free reactive scenes.

Save/reload cannot reroll:
- chance;
- chosen variant;
- pending scene.

Normative:
`EVENT_RESOLVER_CONTRACT_v1.md`.

---

## 19. Save / migration

Target migration starts from stable M3.2 schema 3 development saves.

Do not invent ambiguous stat history.

For development migration:
- exact same-name stats may map directly;
- unambiguous renamed fields may use an explicit mapping table;
- ambiguous obsolete prototype fields must be preserved in documented legacy compatibility/quarantine or declared dev-only incompatible;
- never silently reinterpret them.

Persist:
- RNG;
- pending scene variant;
- Night phase;
- Activity internal state/version;
- ending transaction identity.

Exactly once:
- Work cost;
- School tuition;
- lodging;
- Activity entry;
- ending reward.

Normative:
`SAVE_AND_MIGRATION_CONTRACT_v1.md`.

---

## 20. Presentation/UI

Main UI is media-first, not admin dashboard.

**Locked production constraint:** the center of the screen contains one persistent media window. GIF is the primary dynamic content format. Work, result, reactive event, relationship, Night and ending scenes replace the media inside this same box via stable `presentationId`.

No first-release requirement for:
- skeletal animation;
- sprite animation pipeline;
- frame/timeline editor;
- lip sync;
- unique animation per event.

Static image/text fallback must keep every scene playable.

Normative:
`GIF_CENTRAL_STAGE_CONTRACT_v1.md`.

Persistent HUD:
- year/season/day;
- Energy;
- money;
- only important active conditions.

Central stage:
- Work media;
- event media;
- relationship scene;
- result.

Navigation:
- Work
- School
- Activity
- Night/Home
- Character
- Inventory
- Journal
- Relationships
- Fates/Meta
- Menu

Only 3 starter jobs available at start.

Media uses stable presentation IDs.
Mechanics do not depend on asset file.

Production priority:
1. GIF;
2. static image fallback;
3. neutral location fallback;
4. text-only.

GIF reuse between compatible scenes is expected and does not count as missing content.

Missing optional art must fallback safely.

Normative:
- `TARGET_GAME_SHELL_v0.md`
- `MEDIA_PRESENTATION_CONTRACT_v0.md`.

---

## 21. Stable codebase to evolve

Base:
`prior-work/astra/prototype-m3.2/`.

Do not start from WIP M3.3.

Primary files:

Core:
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `src/core/persistence.ts`
- `src/core/presentation.ts`

UI:
- `src/ui/app.ts`
- `src/ui/editor.ts`
- `src/ui/labels.ts`
- `src/ui/style.css`
- `src/ui/index.html`

Content:
- `content/definitions.json`
- `content/pack.schema.json`
- `content/packs/*.json`
- `content/presentation.json`

Desktop:
- `desktop/main.cjs`
- `desktop/preload.cjs`
- `desktop/save-store.cjs`

Tests:
- `tests/engine.test.ts`
- `tests/content.test.ts`
- `tests/migration.test.ts`
- `tests/storage.test.ts`
- `tests/ui.test.ts`
- new targeted tests allowed.

Current commands:
- `npm run check`
- `npm start`
- `npm run dist:win`.

---

## 22. Implementation order

### Phase A — Architecture Migration
Use synthetic content only.

A1:
state/schema + v3->target migration.

A2:
Condition/Effect v2.

A3:
Event Resolver + reaction cascade.

A4:
Night flow + next-day modifiers.

A5:
ActivityEnvelope + synthetic 2-Energy adapter.

A6:
ending/RunResult/meta exactly-once.

Gate:
`ARCHITECTURE_MIGRATION_SLICE_v1.md`.

### Phase B — Product shell
- new HUD/calendar;
- work availability;
- School;
- Night;
- central presentation;
- Activity mode;
- ending/meta UI.

### Phase C — Lumber product slice
- Lumber seasonal shifts;
- career state;
- Foreman relationship;
- School trigger;
- items;
- Forest Activity;
- Hard Work + complex ending;
- new-run reward.

Gate:
`PRODUCT_ACCEPTANCE_SLICE_v0.md`.

### Phase D — starter trio
- Satyr Maid;
- Undead Farm.

### Phase E — economy/poverty
- normal/cheap/street;
- Secret Debt.

### Phase F — remaining ordinary roster
Tavern -> Hunter -> Merchant -> Guard -> Artist -> Prostitute -> Assassin, unless dependency testing justifies another order.

### Phase G — Palace / meta
After 10 ordinary careers and Hard Work tracking.

### Phase H — macro-goal / late content
Only after lore lock.

---

## 23. Mandatory architecture tests

Must pass before production content scale:

- schema owner invariants;
- 12 stats + separate Lust;
- 10 creation points;
- 160-day calendar;
- 3 starter jobs only;
- stat gate unlock + Year fallback;
- seasonal Work effects;
- School price/stat packages;
- 0-Energy reactive career/relationship scene;
- Work/School/Activity explicit Energy only;
- Night study next-day -1 exactly once;
- street next-day -1 exactly once;
- lodging payment exactly once;
- pending scene deterministic reload;
- Resolver cascade;
- RNG deterministic reload;
- Activity save/resume;
- Activity internal resource != daily Energy;
- ending eligible != committed;
- RunResult/reward exactly once;
- Hard Work duplicate does not stack;
- Palace 10/10;
- strong perk loadout persistence;
- migration fixtures;
- invalid content rejected.

---

## 24. Mandatory product acceptance

A playable Lumber chain must demonstrate:

```text
create heroine
-> only 3 jobs visible
-> Lumber shift spends 1 Energy
-> seasonal stat package
-> free reactive career/relationship scene
-> School spends 1 Energy + money
-> School stat gain triggers career scene at 0 extra Energy
-> obtain capability item
-> choose housing
-> optional Night relationship
-> next day
-> enter Forest Activity for 2 Energy
-> save/reload inside Activity
-> use capability
-> return ActivityResult
-> free reactive career continuation
-> at least two endings eligible
-> continue playing
-> commit one
-> complete RunResult
-> new run visibly has meta reward
```

No production scaling before this gate passes.

---

## 25. Content production rules

Career target:
- 8–16 repeatable shift variants;
- seasonal overlays/replacements;
- 6–10 major career milestones;
- 3–5 outcome families;
- 1 major relationship chain;
- 1–3 cross-system hooks;
- 1–2 meaningful item integrations.

Relationships:
- milestone scenes, not paid date spam.

Media:
- placeholders allowed;
- stable IDs;
- unique art prioritized for endings/milestones.

Normative:
`CONTENT_PRODUCTION_BUDGET_DRAFT_v0.md`.

---

## 26. Windows delivery

The project must keep:
- one clear startup command: `npm start`;
- one verification command: `npm run check`;
- Windows packaging: `npm run dist:win`.

Final acceptance requires clean-machine Windows test.

---

## 27. Recovery discipline

Every implementation package:

```text
ID
base commit
goal
required reads
allowed writes
forbidden writes
deliverables
tests
acceptance
result commit
unfinished notes
```

Never leave hidden local-only state.

If package fails:
- record dirty files;
- do not layer unrelated work;
- restore last green checkpoint or isolate patch.

---

## 28. Current deferred authorial/content decisions

Implementation must not invent:

- exact Palace characters/court lore;
- final global mystery;
- exact relationship NPC roster for all 10 jobs;
- final Activity region count;
- whether combat exists outside selected mechanics;
- final Secret Debt numeric tuning/rewards where still marked OPEN;
- final art style/assets;
- final relationship explicit-content writing.

These do not block Phase A architecture.

---

## 29. Definition of v1 success

The project has moved beyond planning when:

1. stable M3.2 is migrated without rewrite;
2. Architecture Migration Slice passes;
3. Product Acceptance Slice passes;
4. a real 160-day save can survive save/load/migration;
5. Work/School/relationships/Night/Activity/ending/meta interact under the contracts above;
6. new content can be added through typed data without core edits;
7. Windows build remains runnable.

Until then, adding hundreds of scenes is out of order.
