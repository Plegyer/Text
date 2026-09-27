# Presentation PR27 / Current-Main Reconciliation v1

Current main: `3eb9aed34dc00724832b68f615bedc69ec2dc28b`.

Technical RC floor remains the PR #27 merge:

`6cd990f45d368291b4a288f9f48c569f6e0b207f`

with:

- typecheck PASS;
- validate PASS;
- build PASS;
- **221/221 tests PASS**.

## PR27 presentation impact

PR27 added QA coverage only.

It verifies compatibility for schema4 saves that omit:

- `progression.school`;
- semantic `presentationId` metadata on pending/action state.

This does **not** change the presentation identity contract.

Semantic `presentationId` remains optional persisted presentation metadata. Mechanical/gameplay identity remains authoritative:

- action identity for action results;
- event + variant identity for pending scenes;
- Activity state for Activity presentation;
- ending state / RunResult for endings;
- fresh run/location state for New Run.

When older schema4 data omits semantic presentation metadata, compatibility parsing may reconstruct or safely omit presentation metadata without changing mechanics.

## Current-main movement after PR27

Current main moved beyond the PR27 merge through coordination/documentation updates only.

No post-PR27 production change introduced new:

- presentation runtime behavior;
- content presentation identity;
- UI presentation behavior;
- media fallback mechanics;
- animation timing coupling.

Therefore the technical presentation RC floor remains the PR27 221/221 baseline.

## Human/content gaps remain non-runtime

Remaining work is still human/Product/content authoring:

- optional GIF/art production;
- Forest route/challenge/season content depth;
- final Old Boundary product decisions before route-specific visual specialization;
- School management/accounting public-result authoring;
- other School content-specific visuals where Product retains them in scope;
- ending polish.

These do not justify reopening already-green central-stage, semantic-ID, fallback, save/reload, or animation-off mechanics.

## Presentation authority after PR27

Current technical rules remain:

- one logical central presentation stage;
- slash semantic `presentationId`;
- mechanics independent from animation frame/time/completion;
- save does not persist GIF frame/playback state;
- animation-off changes presentation only;
- missing semantic presentation metadata is compatibility-safe;
- media replacement remains presentation-only and semantic-ID keyed.

## Conclusion

Presentation technical RC status remains **GREEN** at the PR27 221/221 floor.

Current unresolved work is asset/content/product authoring, not missing presentation mechanics.
