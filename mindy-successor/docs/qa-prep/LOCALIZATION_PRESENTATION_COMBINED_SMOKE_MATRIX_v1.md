# Localization Presentation Combined Smoke Matrix v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Runtime baseline:
- PR41 localization merged
- PR42 multi-GIF merged
- PR42 exact-head 295/295 PASS
- PR42 post-merge 295/295 PASS

## Purpose

Define one executable smoke combining:
- localized Work;
- deterministic multi-GIF selection;
- locale switch;
- reload;
- Animation Off;
- unchanged Work mechanics.

## Required setup

Use:
- a normal started/arrived run;
- one target career with a real wage;
- a 3-candidate pool on that career's shipped seasonal shift presentation;
- real static fallback;
- RU+EN label/description/alt keys;
- no gameplay fixture that changes Work mechanics.

Preferred first target:
lumber.shift.

## Smoke A — RU Work occurrence

1. Start in RU.
2. Open Work.
3. Record:
   - Save;
   - gameplay RNG;
   - money;
   - Energy;
   - lumber completed_shifts.
4. Execute lumber.shift.
5. Resolve normal blocking reactions as needed until the result presentation is visible.
6. Record:
   - action ID;
   - semantic presentationId;
   - selected candidate key;
   - money;
   - Energy;
   - completed_shifts;
   - gameplay RNG.

Require:
- action ID = lumber.shift;
- Energy -1;
- wage applied from production formula;
- completed_shifts +1;
- candidate key belongs to the configured pool;
- presentation selection does not add any gameplay effect.

## Smoke B — switch RU -> EN on same occurrence

With the same result occurrence still visible:
1. capture life Save bytes/string;
2. capture selected candidate key;
3. switch to EN.

Require:
- same action/result gameplay identity;
- same semantic presentationId;
- same selected candidate key;
- same media src;
- localized label/description/alt/caption may change;
- life Save unchanged;
- gameplay RNG unchanged;
- money/Energy/counter unchanged.

## Smoke C — EN -> RU

Switch back to RU without a new gameplay command.

Require:
- same selected candidate key;
- same life Save;
- same gameplay RNG;
- no transaction replay.

## Smoke D — reload same occurrence

1. Persist current life Save and presentation config.
2. Reload app.
3. Return to the same persisted occurrence/surface where architecture supports it.

Require:
- occurrence key reconstructs from persisted gameplay identity;
- same selected candidate key;
- no wage replay;
- no Energy replay;
- no counter replay;
- locale preference may persist independently.

For pending event surfaces, reload must preserve exact event/variant identity as well.

## Smoke E — new Work occurrence

1. Return to Work.
2. Execute another real lumber.shift while sufficient Energy exists.
3. Capture second occurrence key and candidate.

Require:
- action remains lumber.shift;
- normal wage/energy/counter transaction occurs exactly once;
- new occurrence key differs from prior occurrence.

Candidate behavior:
- it MAY select a different pool candidate;
- it is not required to differ every time;
- selection must remain deterministic for that new occurrence.

Do not assert forced visual diversity from only two occurrences.

## Smoke F — Animation Off

For a pool-enabled semantic slot:
1. capture life Save;
2. disable animations;
3. render same semantic surface.

Require:
- pool GIFs are skipped;
- configured static fallback is selected;
- gameplay Save unchanged;
- gameplay RNG unchanged;
- semantic presentationId unchanged;
- RU/EN localization still works.

## Smoke G — missing/corrupt candidate

Simulate the selected GIF failing to load.

Require:
- UI advances through presentation candidates/fallback;
- no gameplay command fires;
- life Save unchanged;
- locale does not change failure order;
- eventual static fallback remains usable if all GIFs fail.

## Smoke H — all-ten Work invariants

Run a parameterized mechanics check for all ten target actions under identical RU/EN starting Saves:

- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

For each locale pair require:
- same action ID;
- same enabled state;
- same Energy cost;
- same wage numeric result;
- same typed completed_shifts result;
- same facts/stage progression;
- same gameplay RNG result.

Only localized presentation strings may differ.

## Smoke I — candidate seed must ignore locale

For one explicit pool occurrence:
- compute/select under RU;
- compute/select under EN.

Require same index/key.

This is already structurally true in PR42 because locale is absent from the selection hash, but keep an executable regression.

## Smoke J — Save schema

Inspect serialized life Save after:
- pool rendering;
- locale switching;
- Animation Off;
- media error.

Require no new authoritative fields for:
- candidate key;
- media index;
- GIF frame;
- playback time;
- locale-specific gameplay identity.

Locale preference and presentation config remain separate storage concerns.

## Current evidence already shipped

PR41 UI:
- RU/EN switch keeps Work life Save unchanged.

PR42 core:
- pool bound 3..5;
- deterministic selection;
- no gameplay RNG source;
- Animation Off static fallback.

PR42 UI:
- same selected pool candidate survives RU/EN switch;
- same candidate survives reload;
- life Save unchanged.

PR40:
- Lumber wage + Work UI transaction green.

## Coverage still worth adding

The merged PR42 UI smoke uses town/default as its explicit pool surface.

A career-specific combined test should now add:
real lumber.shift -> pool presentation -> locale switch -> reload -> second shift.

That closes the exact item-131 Work+localization+media integration path.

## Acceptance

RU career Work mechanics:
MUST PASS.

Same Save RU/EN:
MUST PASS.

Same candidate same occurrence:
MUST PASS.

Different occurrence may vary:
ALLOWED.

Animation Off static:
MUST PASS.

Reload same candidate:
MUST PASS.

Wage/counters unchanged by locale/media:
MUST PASS.

No gameplay RNG consumption:
MUST PASS.

No media/locale state in authoritative gameplay Save:
MUST PASS.

No Chat 4 production runtime/UI/content file was modified.
