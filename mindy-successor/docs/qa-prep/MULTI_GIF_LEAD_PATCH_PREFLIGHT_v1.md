# Multi-GIF Lead Patch Preflight v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main f3f062152752474f3021736772ada26c66635e10
Input: Chat 2 MULTI_GIF_RUNTIME_INTEGRATION_HANDOFF_v2.md

## Purpose

List the exact preflight conditions Lead should satisfy before changing shared presentation runtime for deliberate 3–5 GIF pools.

The Chat 2 handoff is directionally compatible with current main.

Its main-SHA note is older, but the relevant presentation runtime shape has not yet adopted the proposed pool/occurrence-key extension.

## Current main presentation baseline

Current slot override supports:
- optional primary GIF;
- optional static override;
- optional fallbackId.

Current resolver:
- produces an ordered candidates array;
- filters animation candidates when Animation Off;
- supports catalog/static/semantic fallback;
- deduplicates resolved candidate sources.

Current UI:
- uses mediaIndex starting at 0;
- advances mediaIndex on media load failure;
- resets the index on navigation/new command;
- does not deliberately select from a 3–5 GIF pool.

No current presentation override pool field exists.

No current resolvePresentation occurrenceKey option exists.

Therefore the proposed feature is a real but bounded presentation-runtime extension.

## Preflight 1 — schema extension is additive

Preferred new override shape:

- keep primary optional;
- add optional pool;
- keep static optional;
- keep fallbackId optional.

Pool contract:
- candidates min 3;
- candidates max 5;
- candidate key non-empty and unique;
- kind is GIF;
- source follows current managed GIF-source validation;
- alt required;
- optional weight positive finite.

Old payloads containing only:
- primary;
- static;
- fallbackId

must remain valid without migration.

## Preflight 2 — primary plus pool ambiguity

The first implementation should reject a slot that defines both:
- primary;
- pool.

Reason:
current precedence is unambiguous with one primary;
introducing both without a documented rule makes selection/fallback behavior unclear.

Required negative test:
primary + pool -> validation rejection.

If Lead chooses a different compatibility rule, it must be explicit and separately tested.

## Preflight 3 — no Save migration preferred

Chat 2 occurrence inventory found stable persisted occurrence material for every reviewed family except small Night-study plumbing.

Preferred implementation:
- no new Save fields;
- no schemaVersion bump;
- no candidate index/key stored in gameplay Save;
- no frame/time/playback persistence.

Candidate selection should be reconstructed from:
presentationId + stable occurrenceKey + poolVersion.

Only add a persisted presentation candidate key if a concrete shipped surface proves that no stable occurrence identity can be derived.

Current evidence does not prove such a need.

## Preflight 4 — deterministic selector

Add a pure presentation helper conceptually equivalent to:

selectPresentationCandidate(
  candidates,
  presentationId,
  occurrenceKey,
  selectionPolicy,
  poolVersion
)

Required properties:
- same inputs -> same selected candidate;
- different occurrence keys may produce different presentation candidates;
- no Save mutation;
- no gameplay RNG mutation;
- no event/route/result selection;
- no side effect outside presentation resolution.

Recommended deterministic seed:
hash(presentationId + occurrenceKey + poolVersion).

The hash implementation itself must be stable across supported platforms.

## Preflight 5 — no gameplay RNG

Before coding, identify all gameplay RNG owners:
- Resolver/event RNG;
- Activity-local RNG;
- any run-level deterministic gameplay state.

The selector must not call or advance them.

Required executable assertion:
gameplay RNG state before presentation selection == gameplay RNG state after selection.

A media pool may have presentation-only unweighted/weighted selection, but its entropy must be deterministic from presentation occurrence identity.

## Preflight 6 — occurrence key plumbing

Use existing persisted owners.

### Action/result
Derivable now:
run.id + actionId + action occurrence/count + presentationId.

### Reactive event / poverty
Derivable now:
eventId + variantId + reactionEpochId or queued instanceId.

Media selection occurs only after gameplay variant is already fixed.

### School paid lesson
Derivable now:
track ID + lessons_completed + semantic lesson presentationId.

No new School mechanic is needed.

### Night study
Needs small plumbing:
NightFlow startedDay + selectedNightChoiceId + night_study_sessions.

Do not invent a new gameplay state owner.

### Activity
Derivable now:
activityId + startedDay + checkpoint + routeId + step/occurrence material.

Do not use Activity lastRoll/RNG as media RNG.

### Ending
Derivable now:
RunResult transactionId after completion;
or run.id + committedEndingId before completion.

## Preflight 7 — occurrence stability across reload

For one materialized occurrence:
- derive occurrenceKey;
- select candidate;
- save/reload gameplay state;
- derive occurrenceKey again;
- require same candidate.

A new occurrence may choose another candidate.

Reload of the same pending gameplay scene must not visibly reroll solely because the UI was reconstructed.

## Preflight 8 — resolver compatibility

Current resolvePresentation callers must remain valid if they do not provide occurrenceKey.

Define explicit backward-compatible behavior for:
- old call without pool;
- new pool call without occurrenceKey;
- new pool call with occurrenceKey.

Preferred:
pool selection requires/benefits from occurrenceKey on rollout surfaces, while old slots continue normal current ordering.

Do not allow transient UI random selection as an implicit fallback policy.

## Preflight 9 — Animation Off

When animations are disabled:
- pool GIFs ignored;
- static override still works;
- catalog image/semantic fallback still works;
- gameplay controls/effects unchanged.

No occurrence-key selection should be required just to render static fallback.

## Preflight 10 — missing candidate

Selection must operate over valid/available presentation candidates according to the chosen runtime boundary.

One failed GIF:
- fall to another pool candidate if available;
- then static/semantic fallback.

All GIF candidates fail:
- static/semantic/text-safe fallback.

Current UI media-error advance behavior is useful compatibility behavior and should be retained.

## Preflight 11 — old override import/export

Regression fixtures must prove old:
- primary GIF override;
- static override;
- fallback chain

still parse, apply, export/import, and rollback.

No user presentation bundle migration should be required just because pool support exists.

## Preflight 12 — semantic identity firewall

Pool members never become gameplay presentation IDs.

One semantic presentationId owns the pool.

The same media file may appear in more than one semantic pool without merging gameplay identities.

No selection key may be used as:
- event ID;
- variant ID;
- career state;
- route;
- ending ID.

## Preflight 13 — UI call-site inventory

Before merging runtime schema, enumerate each UI call to mediaHTML/resolvePresentation and decide its occurrence-key source.

Current major families:
- town/default;
- action/result;
- reactive event;
- ending;
- Activity route;
- Night lodging/choice/default;
- School surfaces as they become explicit semantic slots.

Do not leave some pool-enabled surface using transient mediaIndex alone as its occurrence identity.

## Preflight 14 — first production smoke

Use the Chat 2 proposed low-risk surface:

job/lumber/shift/spring/default

with:
- 3 valid GIF candidates;
- existing static fallback.

Verify:
1. semantic ID unchanged;
2. distinct shift occurrences can select different media;
3. same occurrence reload -> same media candidate;
4. Animation Off -> static fallback;
5. one GIF broken -> another/fallback;
6. all GIFs broken -> static fallback;
7. action Energy/stats/counter/result unchanged;
8. gameplay RNG unchanged;
9. save JSON has no media timing/candidate state.

## Preflight 15 — tests required before implementation merge

Required targeted tests:

- schema accepts exactly 3 candidates;
- schema accepts 5 candidates;
- rejects 0/1/2/>5 for explicit pool;
- unique candidate key required;
- GIF kind/source/alt required;
- positive finite weight;
- primary+pool ambiguity rejected;
- old primary/static/fallback payload still valid;
- deterministic selector;
- occurrence reload stability;
- no gameplay RNG consumption;
- Animation Off;
- one missing/corrupt candidate fallback;
- all GIFs unavailable fallback;
- semantic ID unchanged;
- no new Save frame/time/candidate field.

Then:
- full presentation suite;
- full npm run check;
- exact-head CI;
- post-merge main CI.

## Preflight 16 — scope firewall

Do not combine the shared-runtime pool patch with:
- career tuning;
- Hard Work authoring;
- School mechanics;
- School public results;
- poverty tuning;
- Secret Debt;
- Forest mechanics;
- Meta/Palace changes;
- final asset production.

The runtime patch is presentation infrastructure only.

## Readiness result

Current main is READY_FOR_BOUNDED_SHARED_PRESENTATION_PATCH if Lead follows the above scope.

Preferred implementation:
- additive pool(3..5) override schema;
- pure deterministic presentation selector;
- existing persisted occurrence-key plumbing;
- no gameplay RNG;
- no Save migration;
- old override compatibility.

No production runtime/UI/content file was modified by Chat 4.
