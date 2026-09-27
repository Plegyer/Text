# Multi-GIF Production Handoff v1

Purpose: implementation guidance for supporting **3–5 GIF candidates under one semantic presentationId** without coupling media to gameplay.

This handoff consolidates Queue items 98–105.

## Current state — what already works

Current presentation runtime already provides:

- semantic slash `presentationId`;
- slot-based catalog media lookup;
- multiple catalog media candidates when one slot owns multiple base media IDs;
- animation filtering;
- static/semantic fallback;
- media-candidate de-duplication;
- save/reload gameplay identity independent from GIF frame/time;
- strict override validation;
- one optional override GIF primary;
- one optional override static fallback;
- one optional semantic fallback.

Current tests added in this queue demonstrate that one semantic Lumber slot can expose three catalog GIF candidates while gameplay effects stay unchanged.

## Exact gap 1 — override/import schema supports only one primary GIF

Current slot override shape is effectively:

```text
{
  primary?: GIF
  static?: IMAGE
  fallbackId?: presentationId
}
```

It cannot represent an explicit imported pool of 3–5 GIFs.

### Minimum extension

Add a presentation-only optional pool field, conceptually:

```text
pool?: {
  ordering: "ordered" | "unordered"
  selectionPolicy: "rotation" | "unweighted" | "weighted"
  candidates: GIF[3..5]
}
```

Each candidate needs:
- stable presentation-only candidate key;
- GIF source;
- alt text;
- optional presentation-only weight.

Backward compatibility:
- existing `primary` remains valid;
- a slot should reject conflicting ambiguous use unless precedence is explicitly defined.

## Exact gap 2 — current resolver enumerates candidates but does not own occurrence-level selection

`resolvePresentation()` currently returns a candidate list.

That is enough for fallback ordering, but not enough to specify:
- candidate variation between occurrences;
- stable candidate choice for the same materialized pending scene;
- weighted/rotation policy.

### Minimum runtime extension

Add a presentation-only selection step after candidate resolution.

Recommended API shape:

```text
resolvePresentation(..., {
  animationsEnabled,
  instanceKey?
})
```

Then:
1. resolve valid pool candidates;
2. filter unavailable/disabled candidates;
3. select one dynamic candidate using presentation-only policy;
4. keep static/semantic fallback behind it.

The selector must not consume or mutate gameplay RNG.

## Stable occurrence selection

A new occurrence may choose a different GIF.

Reload of the same pending/materialized occurrence must not silently reroll.

### Preferred no-migration path

Derive a stable `instanceKey` from already-persisted gameplay identity where possible.

Examples:
- pending reactive event: `eventId + variantId + reactionEpochId`;
- queued event before materialization: existing queued `instanceId`;
- repeatable action/result: action identity plus persisted action/career occurrence counter;
- School lesson: track/course identity plus persisted lesson/progress occurrence count;
- ending: existing RunResult `transactionId`;
- Night/Activity: stable persisted flow/checkpoint identity.

The presentation selector hashes:

`presentationId + instanceKey + poolVersion`

to a presentation candidate.

That produces variation across occurrences while remaining stable across reload.

### When persisted identity is insufficient

If a specific surface cannot derive a unique stable occurrence key, the minimal additive save option is an **optional presentation-only candidate key** on the materialized presentation owner.

That field must:
- be optional for old saves;
- never encode frame/time/playback;
- never affect mechanics;
- never be used as gameplay identity.

Do not add such a field unless deterministic derivation is proven insufficient.

## Migration / save impact

### Pool data

Pool definitions belong to presentation configuration/import data, not Save.

No save migration is needed merely to add 3–5 candidate definitions.

### Candidate selection

Preferred implementation:
**no Save schema migration** by deriving selection from existing persisted occurrence identity.

If a presentation-only candidate key becomes necessary:
- make it optional;
- retain schema4 compatibility where project migration policy permits;
- old saves simply select deterministically on first materialization;
- never persist frame number, playback position, loop count or elapsed media time.

## Missing candidate behavior

Selection pipeline:

```text
pool candidates
-> remove invalid/unavailable candidate
-> choose among remaining dynamic candidates
-> static fallback
-> semantic fallback
-> text-safe terminal
```

One missing GIF must not reject the gameplay scene.

All missing GIFs must not reject the gameplay scene.

## Gameplay event variants stay separate

Do not use media pools to represent gameplay variants.

Example poverty event:

```text
eventId + variantId -> semantic presentationId -> GIF pool
```

Not:

```text
eventId -> GIF A means variant A
          GIF B means variant B
```

Gameplay chooses variant first.

Presentation chooses media second.

## Weights

Optional candidate weights are allowed only as presentation metadata.

Requirements:
- positive finite values;
- no gameplay RNG consumption;
- no impact on event chance;
- no impact on rewards/effects;
- deterministic selection when a stable instance key is supplied.

## Replacement / rollback

Import package must be able to:
- replace full pool under one semantic ID;
- add/remove candidate within allowed count;
- preserve static fallback;
- reject stale semantic targets;
- rollback to prior pool/static mapping.

Rollback never renames gameplay or semantic identity.

## Tests required for implementation

### Schema
- accepts 3 candidates;
- accepts 5 candidates;
- rejects fewer than 3 when using pool mode;
- rejects more than 5;
- rejects invalid GIF source;
- rejects missing alt;
- rejects ambiguous primary+pool configuration if unsupported;
- validates presentation-only weights.

### Resolver
- same semantic ID resolves pool;
- animations off skips dynamic pool;
- missing one GIF leaves remaining candidates;
- all GIFs missing reaches static fallback;
- candidate de-duplication remains correct;
- weights/order never alter gameplay state.

### Occurrence stability
- new occurrences can produce different candidates;
- same pending event reload selects same candidate;
- same eventId/variantId with a new occurrence key may select another candidate;
- save/reload does not store frame/time.

### Gameplay invariance
- identical action/event effects across every media candidate;
- media pool selection does not consume gameplay RNG;
- candidate filename is never gameplay identity;
- replacement/rollback leaves Save mechanics unchanged.

### Compatibility
- old presentation override with `primary` still works;
- old saves parse unchanged;
- animations-off remains safe.

## Production artifacts already prepared

### Contract / fixtures / tests
- `MULTI_GIF_EVENT_PRESENTATION_CONTRACT_v1.md`
- `presentation-multi-gif-pools-v1.fixture.json`
- `presentation-multi-gif-pool-contract.test.ts`

### Production plans
- `STARTER_TRIO_MULTI_GIF_SLOT_PLAN_v1.md`
- `REMAINING_SEVEN_MULTI_GIF_SLOT_PLAN_v1.md`
- `SCHOOL_MULTI_GIF_LESSON_POOL_PLAN_v1.md`
- `POVERTY_MULTI_GIF_EVENT_POOL_PLAN_v1.md`

### Import shape
- `presentation-drafts/media-pool-import-manifest-v1.json`

The import manifest is authoring-only and intentionally not wired into runtime.

## Adoption order

### 1. Starter trio

First implementation target:
- Lumber;
- Satyr Maid;
- Undead Farm.

Why:
- 15 current production semantic shift/result slots already exist;
- safe static fallbacks already exist;
- no NPC/ending identity is required;
- current media replacement readiness is known.

Start with one seasonal shift pool per career before expanding all seasons.

### 2. Remaining seven ordinary careers

Current actual authority is PR36, not superseded PR35.

PR36:
- head `d8b60b5fb13e0571c1f04830521d96c8386ffd04`;
- open/mergeable at audit time;
- exact-head workflow SUCCESS.

Adopt pools only after the landed/current semantic IDs are revalidated.

### 3. School

Start with generic pools under the eight shipped paid lesson IDs.

Named teacher-specific media remains CONTENT_DRAFT until teacher authoring is approved/integrated.

Do not merge Night study or blocking School event identity into paid lesson pools.

### 4. Ordinary poverty

Adopt after Chat 3 poverty packs are selectively integrated and validated on current main.

Pool **per event+variant semantic ID**.

Never let a GIF reroll change:
- helpful/neutral/pressure identity;
- choices/effects;
- Secret Debt state.

## No Secret Debt shortcut

Ordinary poverty media pools do not authorize Secret Debt presentation IDs.

Secret Debt still needs its own production content identities before final pools.

## Recommended implementation package boundary

Minimum code package should be limited to:

1. presentation schema pool extension;
2. presentation-only candidate selector;
3. stable instance-key plumbing;
4. resolver tests;
5. compatibility tests.

Do **not** combine this with:
- new careers;
- new poverty gameplay;
- teacher mechanics;
- balance tuning;
- ending rules;
- Meta changes.

## Final implementation conclusion

Current presentation architecture is close to multi-GIF support.

The essential missing capability is not gameplay infrastructure.

It is a bounded presentation extension:

**explicit 3–5 candidate override pool + occurrence-stable presentation-only selection.**

Static/text fallback, semantic identity, gameplay ownership and frame/time independence remain unchanged.
