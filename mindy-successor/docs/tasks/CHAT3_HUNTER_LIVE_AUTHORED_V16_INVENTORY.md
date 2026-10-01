# Chat 3 Hunter Live Authored v16 — C3-169 inventory

Status: **C3-169 COMPLETE / C3-170 SOURCE AUTHORING ACTIVE**
Branch: `chat3/hunter-live-authored-v16`
Inventory head before this document: `a9f90ada4e3e0d6c095318adee40999ba2a6f1e6`
Frozen predecessor: Tavern authored PR #185 @ `d2a5447a25a32253eb5ff5a6ab7821fb33a10600` — do not move.

## Exact shipped/current Hunter surface on this stack

Public identities already present:
- career `hunter`;
- ordinary action `hunter.shift`;
- Hard Work ending `ending.hunter.hard-work`;
- Hard Work meta reward `hardWork:hunter`.

`hunter.shift` is already a 1-Energy ordinary action, separate from Large Activity. It currently has only four placeholder seasonal scene identities:
- `spring.default`
- `summer.default`
- `autumn.default`
- `winter.default`

The current Hunter career state on this stack is only `novice`; there is no shipped typed Hunter progression pack, relationship pack, expedition event chain, Master/Warden/Legend state, or Hunter-local clue network yet. Those are Chat 1 C1D-133+ runtime ownership.

The current shift mechanics are producer/balance-owned and must not be changed by Chat 3:
- unlock: Dexterity 25 + Endurance 20 + Wits 15, or Year 2 fallback;
- cost: 1 Energy;
- wage base/weights remain existing values;
- seasonal stat effects remain existing values;
- Hard Work remains 50 completed shifts through the existing ending condition.

## Existing Forest Hunter route/challenges

The shipped Large Activity is `lumber.forest`, entry cost 2 Energy, deterministic save/resume allowed.

Existing Hunter Trail surface:
- route: `forest.route.hunter-trail`;
- clue: world fact `forest.hunter-trail-clue`;
- live seasons: Summer / Autumn;
- navigation: `forest.challenge.hunter-navigation`;
- physical obstacle: `forest.challenge.hunter-rough-crossing`;
- extraction: `forest.challenge.hunter-preserve-sample`.

Existing compatible capabilities/items:
- `rope_kit` -> `cross_rough_route`;
- `field_preservation_kit` -> `preserve_specimen`.

Existing natural sources:
- `forest.hunter-outfitter` supplies the Rope Kit and `forest.hunter-trail-clue`;
- `forest.collect-field-kit` supplies the Preservation Kit after real School enrollment and adds `forest.school-field-notes`.

RU/EN localization already exists for Hunter Trail route/challenge labels/help and for route/challenge presentation variants. Chat 3 must not duplicate the Activity engine or create replacement route IDs.

## Existing cross-system clue/response surfaces

### Tavern — frozen stack
- `tavern.information.rumour-route` records a typed route question as Tavern fact `rumour-route-open`.
- `tavern.activity.forest-return` consumes exact `lumber.forest.success` and can produce Tavern facts `activity-returned` + `rumour-confirmed`.
- These are Tavern-local facts, not yet Hunter-local contract facts.

### Lumber — frozen stack
- `lumber-cross.activity-forest-return` consumes exact `lumber.forest.success`.
- It recognizes `lumber.forest.truth-known`, `forest_preserved_specimen`, School field notes, old-boundary access, Rope Kit, Preservation Kit and Reinforced Axe capabilities.
- It produces Lumber-local `forest-specimen-catalogued`, `forest-truth-known`, `forest-problem-resolved`.
- These are candidate typed inputs only if C1D-133 explicitly publishes Hunter reads.

### Undead Farm — current main only at this checkpoint
Current `main` has Farm runtime that is not yet present in this stacked Hunter branch:
- `undead-farm.sample.kit-issued` can supply the existing `field_preservation_kit`;
- `undead-farm.production.preserve-sample` produces `farm_preserved_specimen` and Farm fact `sample-preserved`;
- Farm has an `external-anomaly` route using its own typed facts.

Chat 3 must not copy Farm runtime into this branch. Final Hunter binding may consume only exact seams that Chat 1 publishes after reconciling the then-current integration base.

## RU/EN coverage gap

Already localized:
- Hunter profession/action label + description;
- Hunter Hard Work ending;
- Forest Hunter Trail route/challenge labels/help;
- Hunter Trail presentation variants.

Not yet authored as real live Hunter career content:
- ordinary shift seasonal scene prose beyond the four placeholder English strings;
- tracking/trap-check/sorting/escort/edge-scouting/training/handoff event depth;
- Hunter expedition preparation/departure/return prose;
- Hunter relationship roles;
- Master vs Warden distinction;
- Legend investigation chain;
- Hunter poverty/survival acknowledgements.

There are no `action.hunter.shift.scene.*` RU/EN localization entries at this checkpoint.

## C1D-133 dependency state

Chat 1 branch `chat1/hunter-complete-v13` exists, but at observed head `5f397263753300b4678e41aafa7ae2d6275cd785` its delta from frozen Tavern runtime contains only its task pointer + queue. No Hunter runtime-contract artifact or runtime implementation is published yet.

Therefore:
- C3-169 is complete;
- C3-170 may proceed as contract-independent semantic RU/EN source authoring;
- no new gameplay/event/fact/relationship IDs may be invented or bound until exact C1D-133 identities are published.
