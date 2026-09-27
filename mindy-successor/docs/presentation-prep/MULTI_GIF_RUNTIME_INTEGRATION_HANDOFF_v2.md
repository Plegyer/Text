# Multi-GIF Runtime Integration Handoff v2

Purpose: smallest Lead-owned implementation packet for supporting 3–5 presentation GIF candidates under one semantic `presentationId`.

Chat 2 does **not** edit shared runtime/schema in this branch.

Current main authority:
- PR36 merged at `279c71fcf87c9c06c5b96699c8516616a8350062`;
- all 10 ordinary base careers now exist on main;
- current presentation schema still supports one optional GIF `primary`, one optional static fallback, and one optional semantic fallback per slot.

## 1. Exact schema extension proposed

Current conceptual slot override:

```ts
{
  primary?: GifOverride;
  static?: StaticOverride;
  fallbackId?: PresentationId;
}
```

Proposed bounded extension:

```ts
{
  primary?: GifOverride;
  pool?: {
    ordering: 'ordered' | 'unordered';
    selectionPolicy: 'rotation' | 'unweighted' | 'weighted';
    candidates: Array<{
      key: string;
      kind: 'gif';
      src: GifSource;
      alt: string;
      weight?: number;
    }>; // min 3, max 5
  };
  static?: StaticOverride;
  fallbackId?: PresentationId;
}
```

Validation:
- `candidates.length >= 3 && <= 5`;
- candidate key non-empty and unique within pool;
- `kind === 'gif'`;
- GIF source obeys current local/data GIF source rules;
- alt is required;
- optional weight must be positive finite;
- `primary + pool` rejected initially to avoid ambiguous precedence;
- old `primary/static/fallbackId` shape stays valid.

No gameplay fields belong in this schema.

## 2. Exact presentation functions touched

Lead implementation should remain bounded to presentation code.

### `slotOverrideSchema`

Add optional `pool`.

### `PresentationSlotOverride`

Automatically reflects schema extension.

### `ResolvedPresentationMedia`

Add optional presentation-only candidate metadata if useful:

```ts
candidateKey?: string;
weight?: number;
```

Do not add gameplay identity.

### `mediaCandidates(...)`

Extend candidate enumeration to:
1. include override pool GIF candidates when animations are enabled;
2. keep current static fallback ordering;
3. skip dynamic pool when animations are disabled;
4. preserve catalog candidate behavior.

### New selector helper

Recommended pure helper:

```ts
selectPresentationCandidate(
  candidates,
  {
    presentationId,
    occurrenceKey,
    selectionPolicy,
    poolVersion
  }
)
```

Responsibilities:
- select only presentation media;
- never mutate Save;
- never consume gameplay RNG;
- deterministic when `occurrenceKey` is supplied;
- ignore unavailable candidates before selection.

### `resolvePresentation(...)`

Minimal option extension:

```ts
options:{
  animationsEnabled?: boolean;
  occurrenceKey?: string;
}
```

Preferred behavior:
- preserve current full candidate-list resolution for compatibility/debugging;
- additionally expose the selected candidate, or return the selected candidate first in deterministic order;
- avoid UI-side random reroll.

If adding a new field:

```ts
selected?: ResolvedPresentationMedia;
```

is presentation-only and backward-compatible for callers ignoring it.

## 3. Occurrence-key plumbing

Preferred rule:

`hash(presentationId + occurrenceKey + poolVersion)`

Use current persisted gameplay identity; do not add save fields unless proven necessary.

### Action/result

Use:
- `run.id`;
- action ID;
- `historyState.actionCounts[actionId]`;
- semantic presentationId.

Classification: DERIVABLE_NOW.

### Reactive / ordinary-poverty event

Use:
- `eventId`;
- `variantId`;
- `reactionEpochId`;
- queued `instanceId` before materialization when available.

Classification: DERIVABLE_NOW.

### School paid lesson

Use:
- track ID;
- `lessons_completed`;
- semantic lesson presentationId.

Classification: DERIVABLE_NOW.

### Night study

Persisted data exists:
- NightFlow `startedDay`;
- `selectedNightChoiceId`;
- track `night_study_sessions`.

Classification: NEEDS_SMALL_PLUMBING because a dedicated Night-study semantic surface is not currently authoritative.

### Activity

Use:
- `activityId`;
- `startedDay`;
- `checkpoint`;
- route ID;
- step/occurrence counter as needed.

Classification: DERIVABLE_NOW.

Do not consume Activity-local gameplay RNG for GIF selection.

### Ending / RunResult

Use:
- `RunResult.transactionId` after completion;
- or `run.id + committedEndingId` before result materialization.

Classification: DERIVABLE_NOW.

## 4. No-save-migration preferred path

Preferred implementation adds **no Save fields**.

Pool configuration lives in presentation/import data.

Candidate selection is reconstructed deterministically from:
- semantic presentationId;
- already-persisted occurrence key;
- pool version.

Benefits:
- old saves remain valid;
- no schemaVersion bump for media pools;
- no candidate-key migration;
- no frame/time/playback persistence;
- reload selects the same candidate for the same occurrence.

Only consider an optional persisted presentation key if a concrete shipped surface is proven unable to derive a stable occurrence identity.

The current inventory does not demonstrate such a need.

## 5. Compatibility behavior

Must preserve:

- old presentation bundles with `primary`;
- old static overrides;
- old fallback chains;
- catalog media candidate enumeration;
- animations-off behavior;
- unknown presentationId safe fallback;
- semantic IDs;
- current save schema;
- gameplay RNG/state.

### Old bundle

`primary/static/fallbackId` works unchanged.

### New pool bundle

`pool/static/fallbackId` becomes valid.

### Animation disabled

Pool GIFs are ignored.

Static + semantic fallback remains valid.

### Missing one candidate

Remove it from eligible candidates and select from the rest.

### Missing all pool GIFs

Use static/semantic/text-safe fallback.

## 6. Exact new tests ready from Chat 2

Selective integration/review candidates:

1. `tests/presentation-multi-gif-pool-contract.test.ts`
   - current multiple-catalog-candidate behavior;
   - gameplay invariance;
   - animations-off;
   - missing-media behavior;
   - save frame/time absence;
   - current explicit-pool schema gap evidence.

2. `tests/presentation-multi-gif-schema-matrix.test.ts`
   - future 3/5 candidate bounds;
   - invalid 0/1/2/>5 contract;
   - GIF+alt requirement;
   - positive finite weights;
   - old override compatibility;
   - primary+pool ambiguity rejection.

3. `tests/presentation-multi-gif-replacement-contract.test.ts`
   - whole-pool replacement model;
   - one broken candidate;
   - all dynamics missing;
   - rollback;
   - semantic/gameplay invariance;
   - save remains frame/time-free.

After Lead implements the schema:
- convert future-contract evidence into direct `presentationSchema.parse` assertions;
- add deterministic occurrence-key selection tests;
- add no-gameplay-RNG-consumption assertion.

## 7. Exact authoring manifests ready

### Current/runtime-shape evidence

- `content/presentation-multi-gif-pools-v1.fixture.json`
- `content/presentation-multi-gif-runtime-v1.fixture.json`

### Starter trio

- `content/presentation-drafts/starter-trio-multi-gif-v2.json`

15 shipped starter-trio shift/result surfaces.

### All 10 ordinary careers

- `content/presentation-drafts/ten-career-multi-gif-v1.json`

50 shipped base surfaces:
- 40 seasonal shift IDs;
- 10 result/default IDs.

No invented Hard Work, relationship or event IDs.

### School

- `content/presentation-drafts/school-authored-multi-gif-v1.json`

Contains:
- eight shipped generic paid-lesson pools;
- eight teacher-specific rows explicitly marked `CONTENT_DRAFT` until selective integration.

### Ordinary poverty

- `content/presentation-drafts/ordinary-poverty-multi-gif-v1.json`

Contains:
- pool per event+variant identity;
- no Secret Debt;
- media candidate never encodes helpful/neutral/pressure outcome.

### Generic import shape

- `content/presentation-drafts/media-pool-import-manifest-v1.json`

Authoring-only batch shape with:
- ordering;
- presentation-only weights;
- per-candidate alt;
- fallback;
- replacement/rollback metadata.

## 8. Recommended implementation order

1. extend presentation schema only;
2. add pure deterministic selector;
3. pass occurrenceKey from existing persisted owners;
4. update resolver;
5. flip future schema tests to executable positive assertions;
6. integrate one Lumber spring pool;
7. verify reload stability;
8. expand starter trio;
9. expand all 10 careers;
10. add School generic pools;
11. add ordinary-poverty pools after those packs are selectively integrated.

## 9. First production smoke

Use:

`job/lumber/shift/spring/default`

with 3 GIF candidates + `assets/stage-lumber.svg` static fallback.

Verify:
1. same semantic ID;
2. candidate varies across distinct action occurrences;
3. same action occurrence reload selects same candidate;
4. animations-off selects static fallback;
5. remove one GIF -> another GIF selected;
6. remove all GIFs -> static fallback;
7. action effects/result unchanged;
8. gameplay RNG unchanged;
9. save JSON has no media timing state.

## 10. Scope firewall

Do not combine the runtime pool extension with:
- career balance changes;
- Hard Work rules;
- new endings;
- new relationship events;
- teacher mechanic changes;
- poverty gameplay tuning;
- Secret Debt;
- Activity mechanics;
- Meta changes.

The runtime feature is presentation infrastructure only.

## Lead implementation summary

Smallest safe change:

**slot override pool(3..5) + deterministic presentation-only selector + existing persisted occurrence-key plumbing.**

Preferred migration result:

**no Save migration.**
