# Presentation Release Readiness v1

Status: release-like presentation-layer checklist aligned with shipped Product Activation on main.

This checklist separates worker-owned presentation artifacts from integrated runtime evidence. The continuation branch intentionally does not rebase or patch Lead-owned shared runtime/schema/UI.

## Gate summary

| Gate | Status | Evidence / required condition |
| --- | --- | --- |
| Semantic slot coverage | PASS | The shipped closure inventory contains exactly 21 required Lumber / School / Forest / Night / ending semantic slots, once each. |
| Semantic ID consistency | PASS | IDs use slash taxonomy; School uses kebab-case; drift detection rejects dotted-vs-slash and underscore-vs-kebab conflicts. |
| Save/reload semantic presentationId | PASS ON SHIPPED MAIN | Product Activation PR #20 uses a dedicated semantic presentation ID validator and persists semantic IDs through pending-scene save/reload. |
| Pending-scene semantic wiring | PASS ON SHIPPED MAIN | Product Activation assigns semantic presentation IDs when creating pending event scenes. |
| Safe fallback | PASS | Every required slot resolves to shipped static media or an explicit text-safe terminal path; fallback graphs are cycle-free. |
| Animation-off | PASS (contract/fixture) | PA/regression matrices preserve semantic/domain identity and require a non-animated static candidate. |
| Current asset integrity | PASS | All 21 current static bindings resolve to existing shipped asset files. |
| Future GIF gaps | KNOWN NON-BLOCKING GAP | Seven planned Lumber/Foreman GIF targets remain explicitly future-unavailable and fall back safely. |
| Replacement bundle portability | PASS (contract/fixture) | Semantic-keyed bundle, portable refs, duplicate rejection, unknown quarantine/reject, no gameplay/save state. |
| Import/export round trip | PASS (contract/test) | Deterministic presentation-only export/import preserves semantic keys. Runtime/UI import-export implementation is outside this queue. |
| Bundle version migration | PASS (contract/test) | v0 -> v1 structural migration preserves known semantic keys; unknown/lookalike old IDs are orphaned, never guessed. |
| Media-path security | PASS (contract/test) | Absolute paths, traversal, data-video URLs, unsupported extensions, and gameplay JSON media targets reject. |
| Zero gameplay coupling | PASS | Presentation fixtures/contracts contain no mechanics/effects/RNG/Energy/save-state payloads and preserve domain identity. |

## Semantic coverage

Required activation coverage is exactly 21 semantic slots:

- four seasonal Lumber shifts;
- Lumber result;
- Lumber career milestone;
- Foreman relationship;
- Foreman Night;
- Forest route and success return;
- all eight School lesson slots;
- Hard Work, Forewoman, and Forest endings.

The support fallback `location/town/default` is not counted as an additional product slot.

## Save/reload and pending-scene identity

Historical Chat 2 boundary work found that the pre-activation schema reused the generic gameplay `id` validator for `pendingScene.presentationId`, which excluded slash taxonomy.

That historical blocker is resolved in shipped Product Activation on main:

- save schema uses a dedicated semantic presentation ID validator;
- slash semantic IDs are accepted;
- pending event scenes receive semantic `presentationId`;
- event/variant gameplay identity remains separate;
- presentation media/frame/playback state is not made part of life-save identity.

Because this continuation branch is worker-owned and not rebased onto Lead integration, branch-local shared source files must not be used to downgrade the shipped-main readiness state.

## Fallback and animation-off

Fallback remains presentation-only and non-fatal:

requested semantic slot -> same-slot static when available -> explicit semantic fallback -> shipped static terminal -> text-safe terminal.

Requirements:

- no fallback cycles or missing targets;
- requested semantic ID remains unchanged;
- missing media never changes event/course/activity/ending identity;
- animation-off selects non-animated media without semantic/gameplay changes;
- playback frame/timing state is not persisted.

## Replacement, migration, and security

Portable replacement payloads must:

- be keyed only by semantic `presentationId`;
- use package-relative refs;
- reject absolute paths, traversal, external URLs, invalid extensions, and gameplay JSON media targets;
- be versioned independently from life saves;
- import atomically;
- reject duplicates;
- quarantine/reject unknown semantic IDs without guessing;
- preserve semantic identity on deterministic export/import round trip.

Bundle migration may change envelope structure, never semantic keys by resemblance.

## Current assets and future GIF gaps

All current static bindings must resolve to existing shipped media IDs and files.

Seven target GIF paths are planned but currently absent:

- four seasonal Lumber shift GIFs;
- Lumber accepted-hand milestone GIF;
- Foreman professional GIF;
- Foreman professional Night GIF.

They remain explicitly `future-unavailable`. This is non-blocking because every affected semantic slot has a safe current static/text fallback.

## Zero gameplay coupling

Presentation artifacts must not contain or mutate mechanics, conditions/effects, RNG, Energy/resources/inventory/stats, career/relationship/School/Activity/ending mechanics, or life-save payloads.

## Release-like readiness

Within the presentation layer, the required semantic/fallback/asset/replacement contracts are ready for Lead Product Acceptance.

Shipped-main activation evidence recorded on the coordination board:

- Product Activation PR #20 merged;
- semantic slash `presentationId` persistence shipped;
- School + Activity semantic slots shipped;
- typecheck PASS;
- validate PASS;
- build PASS;
- integrated tests 187/187 PASS.

Remaining future GIF files are presentation-quality gaps, not gameplay or save/reload blockers.

Before a release candidate, rerun semantic drift, save/reload, fallback/animation-off, asset/security, replacement import/export/migration, production smoke/PA, and the repository-wide integrated check on current main.
