# Chat 6 — Palace Player-Facing UI v16

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-player-facing-ui-v16`

Exact base:
`chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Leader disposition of v15:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**

No main merge.  
No PR.  
No full CI.

---

## 1. Scope implemented

v16 is a presentation/UI producer layer on top of frozen v15.

It exposes only already-authorized Palace runtime state:

- run-local Palace access after D23 acceptance;
- current rich-six Palace stage;
- structural duty progress `x / 15`;
- structural duty daily-use lock;
- exact next structural duty action;
- exact duty Energy cost 1;
- current bounded wage preview;
- support/prep daily-use lock;
- available support/prep actions;
- stage-appropriate route preparation state;
- Outcome Ready state;
- eligible Palace endings;
- explicit player ending acceptance;
- exact D39/D24 future-life reward previews.

No Palace gameplay mechanic is reimplemented in UI.

---

## 2. New pure UI model

Added:

`src/ui/palaceUi.ts`

This file consumes v15 runtime helpers and builds a read-only player-facing model.

It does not write Save state.

### Access

`palacePlayerUiModel(save)`

returns `null` unless:

`palace.access-granted`

is present in the current run.

No permanent Palace unlock is read or written.

### Structural progress

Model exposes:

- current stage;
- duty count;
- total = 15;
- whether structural duty was already used today;
- next exact duty ID;
- runtime availability of that duty;
- Energy cost = 1;
- current D43 wage preview;
- Outcome Ready state.

The wage preview calls the same v15 bounded runtime formula.

No UI-local wage formula exists.

### Support

Model exposes:

- whether Palace support was already used today;
- exact currently available support action IDs;
- Energy cost = 1.

No UI-local support eligibility logic replaces v15.

### Route visibility

Player-facing route names are hidden until their accepted progression threshold is reached:

- Service Life — from Trusted Service;
- Court Power — from Palace Network;
- Inner Truth — from Crossroads.

A route may also remain visible if already prepared/ready.

Before its threshold, the route is omitted entirely.

This prevents internal route facts from appearing as spoilers.

### Route presentation state

The UI presents only functional states:

- preparation available;
- preparation in progress;
- preparation complete;
- ending ready to choose.

It never prints internal fact IDs.

---

## 3. Work panel

Modified:

`src/ui/app.ts`

The normal Work panel still renders the same ten ordinary profession cards.

If Palace access is not granted:
- there is no Palace block;
- existing Work UI remains unchanged.

If Palace access is granted:
- a separate Palace section appears after the ordinary professions.

The section shows:

- Palace access = open for this life;
- localized Palace stage;
- structural duty progress;
- today's structural-duty lock;
- exact duty Energy cost;
- bounded wage preview while a paid structural duty remains;
- next structural duty action;
- support daily-use state;
- stage-appropriate route state;
- available support actions;
- Outcome Ready completion message.

At Outcome Ready:
- no next paid duty is rendered;
- no structural wage preview is rendered.

This avoids implying a 16th paid progression duty.

Palace action buttons use:
- RU: `Выполнить`
- EN: `Perform`

They still dispatch through the existing `data-action` path.

---

## 4. One-duty/day presentation

The Palace UI does not infer duty availability from Energy alone.

Example:

- current Energy = 3;
- today's structural duty already used;
- next duty remains visible as the next progression identity;
- button is disabled by v15 runtime availability;
- UI explicitly says today's structural duty is already complete.

Therefore extra Energy never visually implies a second structural duty.

A Palace support action may still be enabled on the same day if:
- support daily lock is unused;
- runtime support conditions are satisfied;
- at least 1 Energy remains.

This matches D43.

---

## 5. Lodging / Night / Secret Debt boundaries

v16 adds no:

- lodging condition;
- Night choice;
- Night owner;
- Secret Debt state;
- debt control;
- debt repayment control.

The Palace daytime UI does not mention normal/cheap/street lodging as a requirement.

It does not imply:
- Secret Debt revokes Palace access;
- Palace Night outranks forced Debt Night;
- extra Energy bypasses the daily duty lock.

Any future bound-state presentation remains owned by D19/Secret Debt integration.

---

## 6. Legacy / ending panel

The generic Legacy panel no longer renders locked Palace ending definitions.

Specifically:

`catalog.definitions.endings.filter(e=>!isPalaceEndingId(e.id))`

continues to render ordinary/non-Palace endings through the generic condition UI.

Palace endings use a dedicated eligible-only section.

### Why

Generic ending cards print every condition.

For Palace this would expose:
- internal route facts;
- internal ready facts;
- the True route's hidden runtime conditions before they are actually satisfied.

v16 avoids that.

### Palace ending section

The dedicated Palace section renders only ending IDs already present in:

`run.endings.eligible`

except Return Home, which receives an additional full-predicate presentation guard.

No locked Palace ending condition list is shown.

---

## 7. Explicit D16 player choice

Each visible Palace ending card has the existing explicit:

`data-ending="<ending id>"`

accept control.

The shared app handler keeps the existing compatibility command:

`type: 'accept'`

Runtime behavior:
- player click is required;
- engine executes `commitEnding`;
- if no committed pending scene exists, compatibility flow immediately completes the ending transaction;
- if a committed scene exists, normal committed/pending lifecycle applies.

v16 does not create a second Palace ending command protocol.

The Palace card uses the existing:
- eligible;
- committed;
- completed

presentation-state function.

---

## 8. True Return Home presentation

Stable ending:

`ending.palace.return-home`

v16 does not show this card merely because the ending ID exists in catalog.

It is displayed only when both are true:

1. the runtime eligible list contains Return Home; and
2. the full Palace UI predicate is satisfied.

The full predicate requires:

- Palace run-local access;
- Palace stage = Outcome Ready;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- Prince defeated fact;
- Lust is not read.

The 12-stat readiness reuses:

`palaceTrueEndingStatsReady()`

No 181/cap-200 normalization exists.

No Prince name, mechanics, scene text or final mystery lore is invented.

---

## 9. Future-life reward previews

v16 creates **preview only**.

No Strong Meta registry, ownership state, selection control or loadout control is added.

### Service Life

Ending:
`ending.palace.service-life`

Reward:
**Steady Practice**

ID:
`palace.service-life.steady-practice`

Layer:
**Specialist**

### Court Power

Ending:
`ending.palace.court-power`

Reward:
**Formal Introduction**

ID:
`palace.court-power.formal-introduction`

Layer:
**Specialist**

### Inner Truth

Ending:
`ending.palace.inner-truth`

Reward:
**Source Method**

ID:
`palace.inner-truth.source-method`

Layer:
**Automatic knowledge/content**

The preview explicitly explains:
- it is inherited after completing the ending;
- it uses no loadout slot;
- no local selection control is provided.

### Return Home

Ending:
`ending.palace.return-home`

Reward ID:
`palace.true.cap-200`

Layer:
**Specialist**

The preview explicitly says future selection/activation remains in Strong Meta UI.

There is no free Palace Specialist slot.

---

## 10. Strong Meta assembly compatibility

Current accepted Strong Meta assembly owner:

`chat2/assembly-strong-meta-current-main-20261003-v1`

Frozen runtime source authority:

`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

v16 was intentionally built on frozen v15, not on Chat 2's in-flight Strong Meta assembly.

v16 therefore:
- imports no Strong Meta runtime;
- mutates no Strong Meta schema;
- adds no registry entry;
- adds no selection button.

It only displays exact locked reward identities.

Chat 2 must surgically merge the Palace UI with current-main Strong Meta UI.

---

## 11. Collision map for Chat 2

### `src/ui/app.ts` — HIGH

Likely shared collision with:
- Strong Meta New Start+ UI;
- other current-main presentation work.

Required selective merge:
- Palace UI import;
- Palace Work section helpers;
- generic ending helper refactor if still compatible;
- eligible-only Palace ending section;
- Palace-specific action button text.

Do not wholesale replace current-main `app.ts`.

### `content/localization.json` — HIGH but key-local

v16 adds only new `ui.palace.*` keys.

Merge by key.

Do not wholesale replace current-main localization.

### `src/ui/palaceUi.ts` — LOW

New Palace-owned file.

Prefer direct addition unless current main has independently introduced an identical path.

### v16 test files — LOW

New unique files.

---

## 12. Localization / accessibility

Added **39** `ui.palace.*` keys with RU/EN parity.

Coverage includes:

- Palace title/access;
- stage/progress;
- duty lock/economy;
- support lock/cost;
- three route names;
- four route states;
- Outcome Ready;
- ending section;
- reward labels/names/layers/notes;
- Palace action button;
- summary/route/reward aria strings.

All new player-facing calls include fallback text.

Accessibility additions:

- Palace summary section is keyboard focusable;
- stage/progress summary has localized aria-label;
- each visible route is focusable with localized state aria-label;
- each reward preview is focusable with localized reward/layer/ID aria-label;
- ending cards preserve the existing generic ending accessibility pattern.

---

## 13. No Hard Work Palace

v16 does not change:

`ordinaryHardWorkCareers`

The existing ordinary Work roster remains exactly ten professions.

The UI does not add:
- `palace.shift`;
- Palace Hard Work card;
- Palace Hard Work package;
- Palace Hard Work progress.

Palace is rendered in its own conditional section only after run-local access.

---

## 14. Focused QA added

Added:

`tests/palace-player-facing-ui-v16.test.ts`

Pure model/source coverage:

- UI absent before access;
- UI present after run-local access;
- no permanent Palace unlock;
- no Hard Work Palace;
- stage/progress 0/15;
- exact Energy cost 1;
- bounded wage preview;
- one structural duty/day even with extra Energy;
- route visibility thresholds;
- support availability;
- support daily lock;
- non-exclusive route prep;
- route final-ready presentation;
- three non-True eligible endings coexist;
- full Return Home predicate;
- 12x91;
- one stat 90 fails;
- Lust irrelevant;
- Prince fact required;
- exact reward IDs/names;
- no local Strong Meta registry/control names;
- RU/EN completeness;
- no internal route fact IDs in player-facing app source.

Added:

`tests/palace-player-facing-ui-renderer-v16.test.ts`

Built-renderer coverage:

- no Palace block before access;
- Palace block after access;
- stage/progress display;
- exact Energy/wage copy;
- no inaccessible route names;
- same-day second duty disabled despite extra Energy;
- same-day support remains possible;
- Service Life threshold visibility;
- eligible-only Palace ending cards;
- hidden Court/Inner/True cards when not eligible;
- exact Steady Practice preview;
- no reward selection button;
- explicit ending acceptance;
- committed/completed state continuity;
- True Return Home only when full predicate passes;
- cap-200 Specialist preview;
- 90-stat failure even with Lust 100;
- RU/EN switch without save drift.

Existing v15/v8 tests remain the runtime authority for:
- D23 invitation;
- 9+9 / 10+0 / 10+9 / 10+10;
- duty 1..15 transaction;
- milestone exactly-once;
- save/reload wage/duty protection;
- D43 runtime enforcement.

---

## 15. QA actually performed by Chat 6

Connector/static checks performed on the exact branch:

- branch/base comparison;
- changed-file ownership audit;
- current `tsconfig` strict-mode inspection;
- Palace view-model source audit;
- Work panel integration audit;
- Legacy ending filtering audit;
- reward identity audit;
- True predicate helper audit;
- Prince requirement audit;
- Lust-reference audit;
- route-threshold audit;
- internal route-fact leakage audit;
- Strong Meta duplicate-control audit;
- Hard Work Palace audit;
- RU/EN localization completeness audit;
- GitHub Actions branch-run query;
- compatibility review against existing ending/localization/presentation UI tests.

Static audit result:
**PASS**

Key results:

- core changes from v15: **0**
- Secret Debt owner changes: **0**
- Night owner changes: **0**
- lodging changes: **0**
- Strong Meta owner changes: **0**
- `palace.shift`: **absent**
- internal route fact tokens in `app.ts`: **0**
- duplicate Strong Meta controls: **0**
- exact reward IDs present: **4/4**
- Palace UI localization keys: **39**
- missing RU/EN among those keys: **0**
- GitHub Actions workflow runs on v16 branch: **0**

---

## 16. Executable focused checks

Requested:

- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- v15 Palace runtime test;
- v8 D23 invitation test;
- v16 model test;
- v16 renderer test.

They were not executable in the Chat 6 producer environment:

- no repository checkout is mounted;
- the local container has Node/TypeScript but not the project tree/dependencies;
- private repository contents are available through the GitHub connector, not as a runnable checkout;
- the v16 branch has zero automatic GitHub workflow runs.

Chat 6 did not create or consume a CI lane.

Chat 2 remains the assembly/full-CI owner.

---

## 17. Chat 2 selective assembly order

Recommended assembly:

1. land/continue Strong Meta current-main assembly;
2. integrate frozen v15 Palace runtime selectively;
3. add `src/ui/palaceUi.ts`;
4. surgically merge Palace imports/helpers into current `src/ui/app.ts`;
5. preserve current Strong Meta New Start+ controls;
6. merge `ui.palace.*` localization keys;
7. add v16 tests;
8. run focused:
   - typecheck;
   - validate;
   - build;
   - v8 D23;
   - v15 runtime;
   - v16 model;
   - v16 renderer;
9. run broader current-main UI regressions;
10. use Chat 2 full-CI lane only when assembly is focused-green.

---

## 18. Files changed by v16

Player-facing UI:

- `src/ui/app.ts`
- `src/ui/palaceUi.ts`

Localization:

- `content/localization.json`

Focused QA:

- `tests/palace-player-facing-ui-v16.test.ts`
- `tests/palace-player-facing-ui-renderer-v16.test.ts`

Handoff:

- `docs/tasks/CHAT6_PALACE_PLAYER_FACING_UI_v16.md`

No core/runtime file changed from frozen v15.

Freeze exact SHA and report:

`READY_FOR_CHAT2_ASSEMBLY`
