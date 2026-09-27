# Global UI-shell localization source QA v1

Status: COMPLETE / GREEN_TEXT_SOURCE / SHARED_UI_WIRING_REQUIRED

Reviewed Chat 5 items:
`85–96`
as currently completed on `chat5/relationships-night-content-next`.

Current main:
`f93878b954385a1c61d8a06a0673354207d11d70`.

Current `src/ui/app.ts` blob:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Chat 5 consumer map was authored against the same app blob.

## Global fixture

Source:
`global-ui-shell-localization-v1.fixture.json`.

Blob:
`5fd2f7765cf3ed52d5f45c364d481a50251bb184`.

Total stable keys:
`34`.

All keys:
- start with `ui.`;
- are locale-neutral;
- have non-empty RU;
- have non-empty EN.

Missing RU:
`0`.

Missing EN:
`0`.

Locale-specific key IDs:
`0`.

## Current-root collision result

Against exact PR50 main:
- additive keys: 29;
- exact-identical existing keys: 5;
- conflicting keys: 0.

Exact-identical current root keys:
- `ui.panel.stats`;
- `ui.panel.journal`;
- `ui.panel.legacy`;
- `ui.town.eyebrow`;
- `ui.result.returnTown`.

These must be reused rather than duplicated.

## Safe text domains

### Explore shell

Keys:
- `ui.explore.title`;
- `ui.explore.activityHelp`;
- `ui.explore.entryEnergy`;
- `ui.explore.enterButton`;
- `ui.explore.errandsSummary`.

The approved copy replaces implementation-heavy wording such as:
`Activity · checkpoint save/reload`
with player-facing text.

No Activity mechanic changes.

### Outer Sleep panel

Keys:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

These describe only the pre-NightFlow shell entry point.

No NightFlow phase/payment/choice mechanics are changed.

### Stats shell

Safe:
- reuse `ui.panel.stats`;
- `ui.stats.professionsTitle`.

Optional presentation-only additions:
- `ui.stats.help`;
- `ui.stats.professionsHelp`.

No stat/career gameplay ID is localized or renamed.

### Journal shell

Safe:
- reuse `ui.panel.journal`;
- optional `ui.journal.empty`.

Journal entry outcome localization is explicitly outside this shell source.

### Bag/debt shell

Keys:
- `ui.bag.title`;
- `ui.bag.debtLabel`;
- optional `ui.bag.empty`.

No debt mechanic, repayment mechanic or Secret Debt content is changed.

### Legacy/endings shell

Safe:
- reuse `ui.panel.legacy`;
- `ui.legacy.help`;
- `ui.legacy.acceptButton`;
- `ui.legacy.inheritanceTitle`;
- `ui.legacy.emptyInheritance`;
- `ui.legacy.nextLifeButton`.

No ending condition/reward/meta unlock mechanic changes.

### Pre-arrival shell

Safe:
- reuse `ui.town.eyebrow`;
- `ui.arrival.title`;
- `ui.arrival.body`;
- `ui.arrival.button`.

The exact `arrival` action and `story.arrived` gameplay state remain unchanged.

### Shared generic controls

Safe:
- `ui.generic.selectButton`;
- `ui.generic.closeButton`;
- `ui.generic.dismissButton`;
- `ui.result.chooseLodging`;
- `ui.work.recipeReliable`;
- `ui.work.recipeFast`.

`ui.result.returnTown` already exists and is already wired.

## Chat3 Night/lodging overlap excluded

Chat 5 correctly excludes the Chat 3 shared Night/lodging ownership for:
- lodging-stage title/body;
- lodging prices;
- next-day Energy annotations;
- voluntary Night choice stage/body;
- Night-choice content;
- generic Night-slot annotations;
- active NightFlow phase presentation.

Item 87 localizes only the outer Sleep panel before the transaction begins.

No duplicated ownership is accepted.

## Journal/outcome boundary

The fixture localizes Journal shell only.

It does not solve:
- stored Journal choice-outcome prose;
- `lastAction.text`;
- old text-only save history.

The locale-neutral outcome consumer/migration contract remains separate and authoritative.

Do not wire Journal shell localization by mutating stored gameplay prose.

## Mechanics/state firewall

Fixture top-level data is presentation/localization only.

It contains no gameplay ID or mechanics field.

Lead wiring must preserve:
- panel IDs;
- action IDs;
- Activity IDs;
- ending IDs;
- enabled/disabled states;
- Energy/money/debt/inventory values;
- NightFlow;
- RNG;
- Save.

## Consumer readiness

Chat 5 item 95 maps every fixture key to exact current `app.ts` seams.

Current app blob matches that map exactly.

Required implementation pattern:
- `tr(key,fallback)`;
- `fmt(tr(...), values)` for formatted strings.

No code change is included in the worker source itself.

## Remaining debt after this source

Still outside items 85–96:
- character creation shell;
- event/inactive-run shell;
- active Activity state labels;
- dynamic `explain()` condition text;
- save/menu lifecycle text;
- debug/editor/catalog strings;
- actual Journal/outcome locale-neutral consumer;
- Chat3 Night/lodging consumer.

## Verdict

`GREEN_TEXT_SOURCE / SHARED_UI_WIRING_REQUIRED`.

The 34-key Chat 5 UI-shell source is safe for selective root localization + Lead UI wiring.

Do not merge the worker branch wholesale.
