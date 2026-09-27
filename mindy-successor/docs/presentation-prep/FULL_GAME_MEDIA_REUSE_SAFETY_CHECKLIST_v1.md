# Full-Game Media Reuse Safety Checklist v1

Purpose: define the checks required before one GIF/static asset is reused across multiple semantic presentation IDs.

This is a generic production checklist, not a media catalog.

## 1. Gameplay identity separation

Before reuse, confirm:
- every target scene/action/event/result/ending has its own authored gameplay identity;
- each target semantic `presentationId` remains distinct where gameplay identity is distinct;
- no semantic IDs are merged merely because they share one asset;
- reuse group names never become gameplay IDs.

PASS only if media reuse is presentation metadata, not identity collapse.

## 2. Context correctness

For every target semantic ID, verify:
- scene text matches the authored gameplay context;
- choices shown are correct for that scene;
- result/outcome wording is correct;
- relationship/Night/route ownership is correct;
- shared media does not falsely imply a different character, location, outcome or route.

If one reused asset becomes misleading for any row, split the asset mapping.

## 3. Fallback independence

Each semantic ID must keep its own valid fallback path.

Check:
- static fallback exists or semantic fallback resolves;
- text fallback remains meaningful;
- fallback graph has no cycle;
- removing the reused primary from one mapping does not invalidate other mappings;
- one row can roll back independently where the operator workflow supports per-slot overrides.

## 4. Animations-off behavior

Disable animations and verify every mapped semantic ID independently.

Required:
- same semantic presentationId;
- same gameplay controls;
- same choices/actions;
- static/text fallback remains correct for that context;
- no scene waits for GIF completion.

A shared GIF must not become a hidden dependency for gameplay progression.

## 5. Accessibility / alt text

A reused file may require different context-specific alt/accessibility text for different semantic IDs.

Verify:
- each mapping has context-correct accessible meaning;
- alt text does not incorrectly name another scene/outcome;
- essential meaning is available without animation;
- no important information depends on frame timing, speed or loop count.

Do not force one generic alt string across all mappings when contexts differ materially.

## 6. Save identity independence

For every reuse mapping, confirm save/reload identity derives from gameplay state, such as:
- lastAction;
- pendingScene;
- NightFlow;
- Activity;
- endingState;
- RunResult;
- NewRunLocation;
- another explicitly authored owner.

Never derive save identity from:
- filename;
- asset hash;
- reuse group;
- animation frame;
- playback position.

## 7. Replacement scope

If one reused asset is replaced:

### Shared replacement intended
Confirm the replacement is intentionally applied to every semantic mapping in that reuse group.

### Per-slot replacement intended
Confirm one semantic mapping can be replaced without:
- rewriting the others;
- changing their semantic IDs;
- corrupting fallback references;
- producing orphan mappings.

The operator must know whether a media reference is shared globally or overridden per semantic slot.

## 8. Rollback safety

Test rollback for:
- one semantic slot;
- one reuse group;
- the full batch when applicable.

Verify:
- prior shipped/static fallback returns;
- remaining mappings stay valid;
- no stale media reference remains active;
- export/import remains deterministic;
- gameplay state is unchanged.

## 9. Collision checks

Before reuse, reject:
- duplicate semantic IDs;
- dotted/slash aliases;
- underscore/kebab aliases;
- route/challenge canonical slug collisions;
- one generic semantic ID covering multiple gameplay owners;
- filename-derived semantic IDs.

Shared media is safe only after semantic identity is collision-free.

## 10. Representative failure smoke

For each reuse group:
1. make primary media unavailable;
2. resolve every mapped semantic ID;
3. verify each falls back independently;
4. verify text/choice context remains correct;
5. reload a representative saved boundary;
6. verify gameplay identity is unchanged.

## 11. Approval record

For each reuse group record:
- asset reference;
- semantic IDs using it;
- reason reuse is visually appropriate;
- fallback per semantic ID;
- alt/accessibility text per semantic ID;
- replacement scope;
- reviewer/approval reference.

## Acceptance

Media reuse passes only when:
1. gameplay identities remain distinct;
2. semantic IDs remain distinct;
3. text/choices stay context-correct;
4. fallback chains remain independent;
5. animations-off remains valid;
6. accessibility meaning is context-correct;
7. save identity never derives from filename;
8. replacement/rollback behavior is intentional and safe.
