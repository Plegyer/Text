# CHAT 6 — FINAL UI / ACCESSIBILITY SMOKE v60-v62

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-ui-accessibility-smoke-v60`

Previous final player-facing golden QA v57-v59 is accepted.

This bundle prepares the final rendered/player-visible smoke gate for later fully assembled release validation.
No production runtime/mechanics/content changes. No full CI. Do not merge main.

Authorities:
- final player-facing golden fixture v54;
- final player-facing golden package QA v57-v59;
- accepted Strong Meta/modal UI closure;
- D42 Night player-facing authority;
- Activity Network v36 final copy;
- Palace v19 + D48 player-facing authorities;
- lumber/Tavern retired-surface compatibility authorities.

## v60 — rendered surface smoke matrix

Create a machine-auditable smoke matrix for representative final UI surfaces.

Cover at minimum:
- character creation Strong Meta selector;
- max 1 Keystone / max 2 Specialists presentation;
- automatic Source Method knowledge not rendered as selectable;
- modal accessible names for Work, School, Explore, Night, Heroine, Journal, Bag, Fates, Menu, Editor, Catalog;
- Secret Debt status/actions/ending labels;
- D42 Night player-facing localization/presentation;
- Activity Network v36 ending copy;
- Palace invitation, progression, confrontation, ending cards, explicit Return Home;
- D48 alt/caption and Palace-only asset use;
- retired Tavern historical display;
- retired lumber-stay/vitality historical display only;
- no raw internal IDs where accepted human-readable copy exists.

For each surface define:
- prerequisite state;
- expected visible text/localization keys;
- expected accessible name/alt/caption;
- forbidden raw/internal output;
- source authority;
- whether runnable only after final integration.

## v61 — test-only smoke harness

Author a test-only manifest/validator or focused test harness that can validate the smoke matrix on a future assembled checkout.

It must detect:
- missing RU/EN copy;
- raw route/key/reward IDs in visible/accessibility output;
- missing modal accessible names;
- selectable automatic knowledge;
- missing or leaked D48 media;
- retired live surfaces returning;
- Activity Network old four-direction wording returning;
- Palace explicit-ending/Return Home presentation regressions.

Run all structure/static checks possible now.
Do not claim final rendered integration green on an unassembled branch.

## v62 — handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_UI_ACCESSIBILITY_SMOKE_v62.md`

Include:
- matrix path;
- validator/test path;
- checks actually run;
- exact future execution command;
- unresolved post-integration requirements;
- stop conditions for final closure.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_UI_ACCESSIBILITY_SMOKE_EXECUTION`

No production mutation. No full CI. Do not merge main.
