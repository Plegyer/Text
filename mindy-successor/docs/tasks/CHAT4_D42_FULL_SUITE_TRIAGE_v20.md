# CHAT4 — D42 Full-Suite Failure Triage v20

Status: **READY_FOR_CHAT2_REPAIR**  
Owner: Chat 4  
Triage branch: `chat4/d42-full-suite-triage-v20`

Target under review:

`chat2/assembly-d42-night-current-main-20261004-v1@3d92dbbe0c5bfa0e8676178fb05765012f41f8e1`

Pre-D42 current-main base:

`main@f36de067ae2e82518360dbe045f71c700e200805`

Full CI evidence:

- run: `37206154367`
- job: `111447645264`
- tests: **1087**
- pass: **1074**
- fail: **13**
- cancelled: **0**
- skipped: **0**
- todo: **0**

No full CI was run by Chat 4.

## Classification legend

- **A** — stale pre-D42 count / fixture / presentation expectation
- **B** — missing D42 localization / caption / content closure
- **C** — real D42 runtime / behavior regression
- **D** — unrelated pre-existing failure

Final classification:

- **A = 8**
- **B = 5**
- **C = 0**
- **D = 0**

There is **no true D42 runtime blocker** in the 13-test ledger.

## Exact 13-test ledger

| # | Full-suite test | Exact failure | Class | Smallest safe repair |
|---|---|---|---|---|
| 55 | `every Assassin event surface has RU and EN production localization` | missing `event.assassin.night.handler-contact.title` RU; the whole D42 event copy family is absent | **B** | Add bilingual D42 event localization for `assassin.night.handler-contact`: title, default variant text, continue label, continue text. No pack/runtime changes. |
| 204 | `C3-158..167 has zero producer-mechanics drift` | frozen Tavern projection now contains the authorized D42 private Night choice; diff begins with `housingTier=normal` conditions | **A** | Keep the historical Tavern producer baseline frozen and explicitly exclude/authorize only `tavern.night.traveler-private` in this pre-D42 mechanics comparison. D42 has its own focused contract test. |
| 330 | `C2-179 integrated 65 Guard surfaces have RU EN alt-caption parity and animation-off static safety` | Guard surfaces are now 67, not 65; after fixing the count the two new D42 Guard captions are also missing | **B** | Update the stale test count 65→67 **and** complete the accepted D42 caption closure for the new Guard Night slots. No presentation-engine or mechanic change. |
| 331 | `C2-179 every published Guard event override maps to one exact frozen production event` | source-domain Guard event presentation count is 29, not 28 | **A** | Update 28→29 and assert the added exact D42 event backing `guard.night.case-debrief`. |
| 332 | `C2-180 every published Guard event override comes from one real frozen production event` | expected set is 29, not 28 | **A** | Update the pre-D42 count to 29 while keeping exact catalog/presentation backing checks. |
| 373 | `C2-166 all Hunter v15 surfaces have RU EN alt-caption parity and animation-off static safety` | missing `presentation.static.hunter.night.field-debrief.caption` RU; D42 Hunter captions were not assembled | **B** | Add bilingual captions for the D42 Hunter Night presentation slots as part of the required all-12 caption closure. |
| 438 | `C2-192 frozen Merchant production identities back every presentation-owned semantic surface` | Merchant source-domain event count is 30, not 29 | **A** | Update 29→30; the authorized additive event is `merchant.night.ledger-plan`. Preserve all existing identity/backing assertions. |
| 439 | `C2-192 all 29 frozen Merchant events resolve through exact live presentation IDs` | expected presentation-event set is 30, not 29 | **A** | Update the stale 29-event expectation/title to 30; retain exact live presentation ID checks. |
| 440 | `C2-192 Merchant registry exposes exactly 67 semantic surfaces after D40 endings and remains static-safe with animations off` | filtered Merchant registry is 68, not 67 | **A** | Update 67→68. The new supplier Night relationship slot is an authorized D42 additive surface. Keep static-safety checks unchanged. |
| 647 | `voluntary Prostitute owns no Secret Debt, forced Night, Lust router, housing mutation, or extra income mechanic` | old test asserts every `prostitute-*.json` event has no `nightPolicy`; D42 deliberately adds voluntary after-choice Night events | **A** | Narrow the firewall: allow only the exact D42 voluntary `after_choice` Night policy, while continuing to forbid Secret Debt / before-lodging forced semantics, debt/Lust routing, housing/energy/money mutations, Palace unlocks and extra income. |
| 652 | `every live Prostitute event and choice has RU/EN production copy` | event count is 36, not 34; after count repair both new D42 Prostitute events still lack their `event.*` bilingual copy | **B** | Update 34→36 and add title/default-variant/continue-label/continue-text RU+EN for `prostitute.night.personal-continuation` and `prostitute.night.client-private`. |
| 687 | `current player-visible Foreman condition consumer is stage-only; no new UI surface is invented` | test expects zero Foreman relationship fact/counter/choice conditions; D42 intentionally adds one anti-repeat `social-night-seen` fact condition | **A** | Preserve the legacy Foreman assertions outside D42, but explicitly allow/assert the one D42 `lumber.night.foreman-social` anti-repeat condition. Continue forbidding broad affinity/counter/choice gating. |
| 1020 | `C2-155 every Tavern override has RU EN alt-caption parity and animation-off static safety` | missing `presentation.static.tavern.night.traveler-private.caption` RU | **B** | Add the Tavern private-Night bilingual caption as part of the required all-12 D42 caption closure. |

## Why there is no class C runtime blocker

The same full-CI run passes the core D42 behavior contract:

- test 451 — exact accepted **12 Night surfaces** and exact effects: **PASS**
- test 452 — exactly **3 private-space branches**, all normal-lodging-only: **PASS**
- test 453 — all 12 choices survive pending reload and advance calendar **exactly once**: **PASS**
- test 454 — cheap/street reject only the three private branches while public Night survives: **PASS**
- test 456 — professional-only Prostitute stays non-personal even with high confidence-like stats: **PASS**
- test 457 — accepted D42 presentation + RU/EN Night-choice localization bindings: **PASS**
- test 465 — probabilistic forced Night survives reload without reroll: **PASS**
- test 656 — optional Prostitute continuation uses voluntary NightFlow and adds **no forced-night penalty**: **PASS**
- Secret Debt / ordinary poverty separation suites elsewhere in the same run remain green.

Therefore the failing Prostitute firewall test is stale ownership wording, not evidence that voluntary D42 Night inherited Secret Debt behavior.

## D42 delta explains the stale counts

Compared with pre-D42 base `f36de067ae2e82518360dbe045f71c700e200805`, target `3d92dbbe0c5bfa0e8676178fb05765012f41f8e1` is an additive D42 assembly:

- 8 new `*-night-gap-v10.json` packs;
- 12 accepted Night choices/events;
- new presentation slots;
- localization additions;
- D42 focused tests.

Examples directly explaining the count failures:

- Guard adds:
  - `night/guard/guard-night-case-debrief`
  - `relationship/guard-partner/guard-night-partner/default`
  - source-domain Guard event count +1 via `guard.night.case-debrief`
- Merchant adds:
  - `night/merchant/merchant-night-ledger-plan`
  - `relationship/merchant-supplier/merchant-night-supplier/default`
  - source-domain Merchant event count +1 via `merchant.night.ledger-plan`
  - the existing Merchant registry filter counts the Supplier relationship slot, hence 67→68
- Tavern adds the authorized normal-lodging-only `tavern.night.traveler-private` choice, which the historical frozen Tavern projection was not designed to contain.

## Localization/accessibility closure

The Chat 2 D42 pointer already requires the accepted Chat 6 v25 closure:

1. bilingual caption pairs for **all 12 D42 presentation alt keys**;
2. EN label alignment for the two private-conversation choices:
   - Satyr Maid recurring guest;
   - Tavern recurring traveler.

Assembly SHA `3d92dbbe...` has the D42 alt keys but not the required captions.

Additional v20 audit finding:

- all **12 D42 after-choice events** lack the normal `event.*` localization family:
  - title;
  - `variant.default.text`;
  - `choice.continue.label`;
  - `choice.continue.text`.

The full suite currently exposes this directly only through Assassin and Prostitute production-localization tests, but the UI's pending-event localization path consumes these same `event.*` keys for every D42 after-choice scene.

### Safe localization repair

Production content changes may be limited to `content/localization.json`:

- add the already-authorized all-12 RU/EN caption pairs;
- apply the two accepted EN private-conversation label alignments;
- add RU/EN `event.*` copy for the 12 D42 after-choice events, preferably by preserving the authored pack meaning exactly and introducing no new mechanic or consent implication.

No presentation slot, event condition, effect, Night policy, priority, trigger, or runtime code needs to change.

## Production changes allowed

Allowed for Chat 2 repair:

- **localization-only** D42 closure in `content/localization.json`:
  - 12 caption pairs;
  - two accepted EN label wording alignments;
  - missing D42 after-choice `event.*` bilingual copy;
- **test-only** expectation repairs:
  - Guard 65→67;
  - Guard event 28→29;
  - Merchant event 29→30;
  - Merchant registry 67→68;
  - Prostitute events 34→36;
  - Tavern historical projection explicitly excluding/authorizing the D42 additive private Night choice;
  - Prostitute boundary test narrowed to distinguish voluntary D42 Night from forced Secret Debt;
  - Foreman legacy/no-broad-affinity assertion narrowed to allow the exact D42 anti-repeat fact condition.

## Production changes forbidden

Do **not** change:

- `src/core/engine.ts` NightFlow behavior;
- `src/core/schema.ts` Night/save schema;
- D42 Night choice conditions/effects;
- D42 after-choice event `nightPolicy`;
- event priorities or reaction triggers;
- exactly-once calendar ownership;
- Secret Debt forced-Night precedence;
- ordinary Prostitute consent/relationship semantics;
- the three `housingTier=normal` private-space gates;
- refusal/back-out success semantics;
- global affinity mechanics;
- Palace access/coupling;
- D40/D41 ending mechanics;
- presentation engine or presentation routing merely to satisfy captions.

## Explicit runtime blocker disposition

**None.**

No failure in run `37206154367` requires a production runtime or behavior repair.

The safe repair lane is:

1. localization/accessibility closure;
2. stale test-count / fixture scope updates;
3. focused tests;
4. only Chat 2, after focused green, may run the next full CI according to its assembly lane.

## Disposition

**READY_FOR_CHAT2_REPAIR**
