# RC0 — проверяемая матрица требований всей игры vs живой `main`

## LATEST ACCEPTANCE UPDATE — EXACT MAIN CERTIFIED (2026-10-08)

This update overrides rows below that formerly marked the long-life tests **PENDING**. [PR #305](https://github.com/Plegyer/Text/pull/305) **MERGED** unseeded 50-shift Lumber/NG+ + whole 160-day Lumber/School/Forest/expiry. [PR #307](https://github.com/Plegyer/Text/pull/307) **MERGED** additional completely unseeded **10 ordinary Hard Work careers × 50 real shifts = 500 genuine work actions in 10 separate lives**, ten real Meta rewards, then 10/10 activated packages, **Day-1 Palace invitation**, **15 actual-day duties**, **non-True Palace Service Life ending**, NG+. Only 3 new test files total across the two PRs; **no production runtime/code/content/frozen-Golden changes**.

Exact PR-head Windows runs: #37819314383 **1356 PASS/0 FAIL/4 SKIP**, #37821532773 **1357 PASS/0 FAIL/4 SKIP**. Latest official merged-main [#37822147799](https://github.com/Plegyer/Text/actions/runs/37822147799) **SUCCESS, 1357 PASS / 0 FAIL / 4 opt-in SKIP**, code-tree merge SHA `daf8105005367811c53a248c186dab71d67d96d1`. These **now do prove** LIFE-02 Lumber, LIFE-09 example full calendar, LIFE-14 actual earned multi-life Meta, and LIFE-15 *non-True Palace entry and completion* (not just injected stand-ins).

Still NOT proven: Palace **True Return Home** via natural 12×91 stats and the Prince route, *combined natural four-region D36 / D38 endings*, final global macro lore/art editorial, whole-player manual acceptance, and **clean Windows install/GUI/save**. The RC0 installer source remains frozen at pre-test `10ae406cd3ff107a6b1316959daab50f43372824`, whose product code is unchanged by test-only merges. The user will perform manual Windows test tomorrow.

---


**Статус: FIRST INVENTORY, не release GO. Дата: 2026-10-08. Repo `Plegyer/Text`.** Продуктовый snapshot: `main@10ae406cd3ff107a6b1316959daab50f43372824`. После него GitHub main может сдвинуться документацией, но критерии здесь относятся именно к той исполняемой версии.

**Цель:** добиться **полной игры без сокращения замысла**, начиная с максимального использования уже реализованного движка/контента. Мастер требований: `docs/USER_VISION_AND_ACCEPTANCE.md`, LIFE-01..18; locked D1–D48: `docs/USER_DECISIONS_LOCKED_v1.md`, актуальные решения пользователя выше всех оперативных описаний. Текущий canonical knowledge: `docs/LEADER1_KNOWLEDGE_LIBRARY_CURRENT.md`.

## Как читать статусы — предохранитель против неверного GO

- **IMPLEMENTED:** источник и контракт реально присутствуют в shipped main.
- **FOCUSED TESTED:** отдельный аспект проверяется исполняемыми тестами. Нельзя автоматически назвать всей фичей `NATURAL PROVEN`.
- **NATURAL PARTIAL/PROVEN:** путь от обычного создания персонажа через реальные команды; **любой прямой ввод stats/day/flags/items/counters в Save — это seeded setup**, даже если файл называется `natural-acceptance`.
- **PRODUCT REVIEW OPEN:** надо оценить реальную полноту, ветвления, темп, полезность, качество RU/EN текста/визуала, повторность глазами игрока. Зелёная регрессия не заменяет этого.
- **RELEASE BLOCKED** отмечает неполученное необходимое доказательство, а НЕ автоматически отсутствие реализации.

### LIFE-01..18 — проект целиком, не выборочный технический slice

| ID | Требование пользователя | Подтверждено в живой игре/коде | Что остаётся до утверждения полноты |
| --- | --- | --- | --- |
| LIFE-01 | Самостоятельная разветвлённая жизнь каждой профессии | IMPLEMENTED: 10 обычных career definitions/actions/ending families, recurring layer, relationship, School/Night and advanced variants; `tests/*-natural-acceptance.test.ts` | PRODUCT REVIEW OPEN: вычитка всех десяти разных жизней и вариантов, сравнение качества. Внимание: многие «natural»-файлы выставляют статы напрямую (Guard/Merchant/Artist/Assassin/Prostitute); не считать их unseeded playthrough |
| LIFE-02 | Простая Hard Work судьба и отдельно сложные исходы | IMPLEMENTED, FOCUSED: `tests/ordinary-hard-work-meta-production.test.ts`, `tests/advanced-*endings*`, career tests | RC0: новый `tests/lumber-natural-50-shift-longrun-post-stage5.test.ts` в **Draft PR #305** PASS на 50 честных смен, 1355 PASS total; **ещё не слит**. Полный поведенческий проход всех профессий не доказан одним тестом |
| LIFE-03 | Каждая из 12 характеристик влияет на разные системы | IMPLEMENTED conditional/stat engine and seasonal packages, content condition/effect typing | PRODUCT REVIEW OPEN: реальная cross-system матрица **каждой** характеристики (источники + потери + решения вне своей работы), игроки могут иначе воспринимать «декоративные» статы |
| LIFE-04 | Сезоны меняют решения, события, статы, маршруты | IMPLEMENTED seasonal variants in 10 career work, region seasonal gates, tests | NATURAL PARTIAL: проверить в нескольких живых годах заметность этих изменений, variety/no repetition, не только selectors |
| LIFE-05 | Бедность — полноценная альтернативная жизнь с выходом | IMPLEMENTED housing normal/cheap/street, ordinary poverty packs, Secret Debt separate, poverty QA including `tests/poverty-long-run-distribution.test.ts` | PRODUCT REVIEW OPEN: реальные экономические и сюжетные последствия разных 160-day ситуаций, recovery, non-softlock, отдельные narrative outcomes |
| LIFE-06 | School как глубокая система, не кнопки статов | IMPLEMENTED 8 paid courses, tracks, teacher/cross-career content and School tests | PRODUCT REVIEW OPEN: проходят ли естественно сложные учебные milestone/relationship/outcome ветки, variety, педагогические персонажи и impact |
| LIFE-07 | Дневной расход/ночлег/ночные выборы/восстановление | IMPLEMENTED NightFlow, paid/cheap/street, optional and forced content; `tests/night-flow.test.ts`, night gap tests | Natural multi-year mixed lodging + Secret Debt / school study / camp cross-family compatibility and fun require review |
| LIFE-08 | Романтические/личные ночные NPC линии с реальными вехами | IMPLEMENTED relationships and authored Night packs, progression; multiple career-Night tests | PRODUCT REVIEW OPEN: глубина 10 relationships, повторное появление, добровольность, continuity and variety; not all routes human-reviewed |
| LIFE-09 | Малые повседневные решения накапливаются много дней | IMPLEMENTED typed state/reaction/resolver, RNG and event cooldown | NATURAL PARTIAL: 160-day multi-strategy one-save logs, balance, memory and repetition. Test `poverty-long-run-distribution` covers selective loops, not total product |
| LIFE-10 | Большая Activity/мини-игровая подсистема влияет на город | IMPLEMENTED all **four locked D36 regions** (Forest Frontier, Trade Corridor, Anomalous Reach, Restricted Sites), plus Hunter/Assassin auxiliaries; real tracking, ritual, suspicion, Camp; `*region*-production*.test.ts`, D38 tests | NATURAL PARTIAL: live 3-of-4 anchors and Activity specialist endings ≤10 entries from genuine city preparation, qualitative mini-game experience; many region test setups *inject* date/inventory/condition |
| LIFE-11 | Items change actual legal options and routes | IMPLEMENTED 25 item definitions, `itemCapability`, acquired Forest tools; `tests/item-capability-activity-closure.test.ts` | Product inventory/reachability matrix all meaningful items, natural acquisition and UX feedback |
| LIFE-12 | Отношения/работа/School/Activity помогают друг другу | IMPLEMENTED cross-contract reactivity, real paths like Lumber↔Foreman↔School↔Forest, Undead Farm etc; `tests/release-candidate-shipped-e2e.test.ts` | NATURAL PARTIAL: representative **unseeded** route combinations in every main family and believable human narrative continuity |
| LIFE-13 | Концовка eligible без мгновенного завершения | IMPLEMENTED and FOCUSED: separate eligible/commit/complete, exactly-once Meta and NG+; product acceptance tests | Check actual UX discoverability, choice clarity, all key ending families; not all defined 52 endings naturally completed |
| LIFE-14 | NG+ visibly changes possibilities, not just stats | IMPLEMENTED Hard Work, Strong Meta specialist/Keystones, loadout, New Start+; tests | NATURAL PARTIAL: multi-life actual earned Meta sequencing, 10/10 activation and in-world changes; scripted setups are not aggregate proof |
| LIFE-15 | Большая межжизненная цель и Palace | IMPLEMENTED D23 10/10 ordinary gate + 10 active bonuses, Palace rich-six duties, Prince ending logic, non-True D39 rewards, D48 four art assets; tests | **OPEN:** genuinely earned 10-life → Palace loop + full creative **global macro mystery/lore**; D45 explicitly does not resolve global origin/reveal. No forced revelation without Product approval |
| LIFE-16 | Высокая content density без пустых повторов | IMPLEMENTED many event packs, variants/cooldowns and media IDs; Stage5 content validation accepts shipped catalog | PRODUCT REVIEW OPEN: audit unique authored quality, repeated filler, pacing, narrative and localized copy across many loops |
| LIFE-17 | Понятный и удобный игроку UI | IMPLEMENTED central scene, day/energy/money, modal controls; Chromium actual RU/EN modal ARIA/focus/alt; UI source tests | PRODUCT REVIEW OPEN: real multi-screen interaction/usability, navigation and full accessibility and package display at player resolution; Stage5 browser smoke was **not** complete UI audit |
| LIFE-18 | Stable media IDs and static/GIF/video fallback | IMPLEMENTED **507 presentation slots**, each has static definition in current `content/presentation.json`, **101 SVG + 6 GIF** in `assets/presentation` (plus shared art elsewhere); runtime media selection and fallback tests | PRODUCT REVIEW OPEN: asset diversity, placeholder density, authorship/rights, story-appropriate imagery, animation quality; **507 slots are not 507 unique illustrations** |

## Additional non-negotiable 1.0 checks (outside LIFE rows)

| Gate | Current evidence | Still required |
| --- | --- | --- |
| Core platform/architecture | Engine, typed data, resolver, Night/Activity/Meta/save migration and UI already developed; official Windows full CI #37812797149 **1354 PASS / 0 FAIL / 4 conditional SKIP** on source `db3cc892...` | NO rewrite unless specific reproducible bug |
| Frozen Stage4/5 QA | Original Golden v54 SHA `bc8617be68825543ed7617e9dd5c7d915f6b0e14`, v55 SHA `e40737f3c6d6da83d1e4692e4457c04936279d53`, exact-source 32/32, strict RU/EN and migration accepted | Preserve original byte-exact authorities and exact-main regressions |
| True 160-day run | Calendar and lifecycle implemented, targeted long-run tests | Natural 160-day full save/reload, debt/poverty/mixed modes, terminal fate/commit semantics |
| 10 ordinary lives → Palace | 10 Hard Work contracts and D23 Palace 10/10 gate implemented and tested with prepared meta | **End-to-end actual earned 10 distinct complete lives** plus 10 activation New Start+, invitation and Palace final choices |
| Four D36 regions → D38 | Four shipped definitions and mini-games; separate tests | Combined unseeded all-region / ≥3-of-4 / ≥2 mechanic families / ≤10 entries, standalone ending and Save |
| Global macro mystery | D45 Palace Prince narrative locked and shipped | **Unresolved Product authorial decision explicitly OPEN after D48**. Preserve user choice |
| Art/media | 4 D48 dedicated Palace SVG shipped, many owned SVG/GIF static slots | Define actual remaining non-Palace art/media budget and prioritize scenes; art polish does not excuse missing game routes |
| Distribution | Electron 44, NSIS config, `npm start` and `npm run dist:win` in package.json | Exact-source Windows installer build, integrity, then **separate clean-machine install/open/save/relaunch** evidence. CI `npm run check` alone is NOT a packaged-release gate |
| 1.0 user quality gate | Code/QAs pass but no independent full-player end-to-end acceptance | Human full-play quality, actual tone/comedy/romance/consent, satisfying endings, RU/EN presentation, learnability |

## First release-candidate attempt — record the exact boundary, don't truncate game

- **RC0 frozen-source candidate:** `10ae406cd3ff107a6b1316959daab50f43372824` (full shipped main tree at audit). This is a **baseline for evaluation**, not a public released tag/approval. Later docs-only commits do not change it; future code commits require new source SHA.
- **Windows packaging experiment:** workflow wrapper branch `lead/ci-rc1-windows-package-v1` head `f180abe976305b9bcafbe2f654d9c8b8d568cf31`, Action [#37816885139](https://github.com/Plegyer/Text/actions/runs/37816885139) **SUCCESS**. Explicit checkout verified **RC0 actual product source** `10ae406cd3ff107a6b1316959daab50f43372824`, not wrapper SHA. `npm ci`, `npm run build`, unsigned Windows NSIS via electron-builder 26.15.3, `win-unpacked/Portal Life.exe`, `resources/app.asar`, file/hash assertions and artifact upload all PASS. Installer `Portal Life Setup 0.1.0.exe`, **112,505,127 bytes**, SHA256 `BE07726D5CC400E0B407D3EA038A4308860EEECDE429AC7D2309DBDBDD80EDEE`; GitHub artifact **#11567362669** `rc1-windows-nsis-installer`, 7-day retention (expires 2026-10-15). **No install/launch on a clean Windows machine yet; packaging proof only.**
- **Lumber unseeded life:** issue #304 / Draft PR #305, exact head `de51aad2817e6cee1f39c5598a3ef9cd4c9a83ed`, #37814203592 **1355 PASS / 0 FAIL / 4 SKIP**, but **not in RC0 baseline until deliberately integrated**.
- **Scope preservation:** no feature deletion; zero changes to game/runtime/content in this RC0 inventory or packaging experiment; no authorization to defer mandatory LOCKED D1–D48. Findings become priority/acceptance evidence, not scope-cutting decisions.
- **Workflow:** review largest player-visible gaps, create focused fixes or authored improvements, batch multiple independent slices → freeze exact source → full CI → merge → exact-main CI → real packaged clean-machine acceptance. One runner; avoid serial full CI on each tiny test.


## Direct visual inventory — first measured finishing hotspot

Data source: **current** `content/presentation.json` and actual `assets` directories, not old media drafts.

- **507 shipped semantic presentation slots**, **all 507 have a static image entry**; **92 distinct static source files** are referenced (no missing file among these 92 at audited paths). The same file is intentionally reused across many different slots — stable identity/fallback works, but scene-distinct illustration may not.
- Media candidate pools define **60 additional candidates**; the project-owned `assets/presentation` directory contains **101 SVG + 6 GIF**. These measurements are different sets and must not be added as if 507 unique paintings exist.
- Biggest placeholder-reuse hotspot by identical static `src`: Hunter basic result **65 slots**, Guard basic result **63**, Tavern basic result **54**, Assassin basic result **52**, Undead Farm basic result **38**, Prostitute basic result **38**, Satyr Maid basic result **33**. These repeated backgrounds cover not only routine shifts but also many milestones, endings, relationship events; they are **high-value priorities for art differentiation**, not evidence of broken resolver or missing content.
- Palace's four required D48 SVG are present. Non-Palace art budget and story-specific differentiated assets remain explicitly open under LOCKED decisions after D48. **Don't replace all 507 slots indiscriminately**; select high-value endings/milestones/unique story beats for a bounded art pass, preserve stable IDs and fallback.

## Next minimal order of execution

1. Capture exact Windows packaging verdict and installer file/hash, classify separately from install+launch. If FAIL, extract specific packaging blocker and fix only that, not the engine.
2. Record/seek user authorization for final **global mystery creative authority** and artwork priorities without self-authoring an unapproved origin reveal; independent work can continue.
3. Give real playtest/QA the unseeded 10-life + Palace and 4-region D38 tracks and representative 160-day mixed run, with exact reproducible Save/command trace on failure.
4. Do editorial/UX review of a playable candidate, not more abstract tooling; fix proven player-facing gaps in meaningful batches.

**Future Leader1 instruction:** before changing acceptance, read this file AND `docs/LEADER1_KNOWLEDGE_LIBRARY_CURRENT.md`, then verify latest GitHub. Do NOT mark all LIFE-01..18 DONE just because 1354 tests pass.
