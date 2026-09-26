# Phase B Presentation Acceptance Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit target: PR #15 `chat2/phase-b-central-stage` @ `a9090b11a014f829355cf1777f5a8f72be647732`  
Integrated main evidence: `99204598c168d6d758aee43014e65c2d993feba1`

## Evidence baseline

PR #15 changed the presentation resolver, gameplay renderer, presentation editor, fixed-stage CSS and focused presentation/UI tests. Its GitHub Actions run `36251368895` completed successfully with:

- typecheck: pass;
- content validation: pass;
- renderer/content build: pass;
- tests: **142/142 pass**.

The audit below judges presentation behavior against:

- `GIF_CENTRAL_STAGE_CONTRACT_v1.md`;
- `MEDIA_PRESENTATION_CONTRACT_v0.md`;
- `presentation-prep/PRESENTATION_SLOT_TAXONOMY_v1.md`;
- `presentation-prep/PHASE_B_PRESENTATION_IMPLEMENTATION_PACKET_v1.md`.

Status meanings:

- **VERIFIED** — direct source/test evidence exists on PR #15.
- **PARTIAL** — the local presentation mechanism exists, but a required production/cross-slice wiring proof is incomplete.
- **NOT_COVERED** — no sufficiently direct acceptance evidence was found.

## Required Chat 4 checks

| Requirement | Status | Evidence / audit note |
|---|---|---|
| One persistent central media box for hub/work/event/result/ending | VERIFIED | `app.ts:central()` routes all gameplay scene families through `mediaHTML(presentationId)` inside the same central `.stage` layout. `presentation-ui.test.ts` asserts exactly one `.media-window` for the Lumber result view. CSS fixes the stage to one shared aspect token. “Persistent” is semantic/layout persistence; the renderer may recreate DOM during normal render. |
| Stable semantic `presentationId`, independent of asset filenames | VERIFIED | `presentation.ts` derives IDs such as `job/lumber/shift/spring/default`, `school/field-craft/lesson/default`, and `ending/lumber/hard-work`. `presentation-stage.test.ts` directly checks target-shaped Lumber, School and ending IDs. Replacing media source does not rename the slot. |
| GIF primary, static fallback, family/location fallback, text-only terminal fallback | VERIFIED | `resolvePresentation` constructs the ordered candidate chain. Tests cover GIF-first, static on Animation Off, unknown/missing slot fallback, text-only behavior and fallback-cycle rejection. UI media `onerror` advances to the next candidate. |
| Gameplay timing is not coupled to GIF completion | VERIFIED | The media renderer has no `onended`, duration, or timeout gate; `presentation-editor.test.ts` asserts this. Choices/actions are controlled by game state, not media playback callbacks. |
| Animation Off changes presentation only | VERIFIED | Toggle only changes `portal-life.presentation.animations`, resets the presentation candidate index and rerenders. `ui.test.ts` asserts the life save is byte-for-byte unchanged while GIF becomes static fallback. |
| Unknown/missing media is non-fatal | VERIFIED | Unknown presentation IDs fall back to town with diagnostics; no candidates yields a text-only/missing-art stage. Image/video `onerror` advances the candidate list. Tests explicitly cover unknown/media-less presentation. |
| Target-shaped Lumber / School / ending IDs | PARTIAL | PR #15’s resolver/tests support the correct semantic families, including target-like `lumber.shift`, `school.field-craft` and `ending.lumber.hard-work`. Cross-PR production wiring is not fully aligned: PR #16 events omit `sourceDomain`, so event presentation currently derives as generic `location/town/event/...`; PR #17 uses underscore School slugs such as `school/field_craft/...`, while the taxonomy says kebab-case and PR #15’s target example is `school/field-craft/...`. |
| Editor selects `presentationId` and uses file pickers rather than typed source paths | VERIFIED | `editor.ts` has presentationId search/select, GIF and static file inputs, preview through `resolvePresentation`, and validation-before-save. `presentation-editor.test.ts` asserts no “Путь медиа”/typed `assets/` source workflow. |

## Contract-by-contract findings

### Central-stage and sizing

The runtime now has a single fixed central presentation region. `--stage-aspect:16 / 9` is shared by the gameplay `.stage` and `.presentation-preview`, while media fills the box with `object-fit:contain`. Native media dimensions therefore do not determine the surrounding gameplay layout.

The editor preview shares the same presentation resolver and the same aspect token, although it implements its own small DOM media rendering routine rather than literally calling the gameplay `mediaHTML` function. This does not violate the current product behavior, but a future refactor should avoid the two renderers drifting.

### Mechanical separation

`applyPresentation` rebuilds/revalidates catalog content and permits presentation changes only to text/media/presentation-slot data. It does not expose Effect or command execution. The gameplay renderer’s media load/error callbacks only move through candidate media and rerender.

Existing tests directly show Animation Off and editor replacement do not change the life save. There is not a focused test named “GIF load failure preserves RNG”, so that exact adversarial wording remains structural evidence rather than an isolated RNG assertion. The architecture is nevertheless separated: RNG/effects resolve before the UI chooses or loads media.

### Pending save / presentation determinism

The save schema has optional `pendingScene.presentationId`, and the UI honors it when present. Current resolver selection does not populate that field; it stores event ID, resolved variant, epoch and allowed choices, and UI deterministically derives the presentationId from the already-resolved event/variant.

This is compatible with the Phase B migration rule that a legacy/missing presentationId may be derived deterministically without rerolling the variant. However, there is no dedicated end-to-end test that persists an explicit pending `presentationId` and restores that exact field. Mark this as a **follow-up evidence gap**, not a current gameplay failure.

### Fallback behavior

The runtime supports:

1. slot override GIF;
2. same-slot static fallback;
3. catalog GIF/image/video candidates according to animation mode;
4. configured slot fallback chain;
5. town fallback for unknown slot;
6. text-only stage when no media candidate remains.

Fallback cycles and unknown override targets are rejected before activation. Failed image/video load cannot block a command or scene resolution.

### Editor behavior

Normal replacement flow is presentationId-first:

1. search/select semantic slot;
2. choose GIF via file picker;
3. optionally choose static fallback;
4. provide accessibility text;
5. preview Animated / Animation Off;
6. validate via `applyPresentation`;
7. save presentation override separately from the life save.

This meets the task requirement. JSON import/export remains available as a transfer feature, but manual JSON/path editing is not required for ordinary replacement.

## Cross-PR integration risks discovered during presentation audit

### PR #16 Lumber events do not declare `sourceDomain`

PR #15’s `presentationIdForEvent` selects the job/relationship namespace from `event.sourceDomain`. PR #16 events such as:

- `lumber.career-first-shift`;
- `lumber.foreman-notice`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;

currently omit `sourceDomain`. Therefore the presentation resolver treats them as generic town events even though their media IDs are named like Lumber/relationship assets.

This is an integration mismatch to fix in the producing content/wiring branch; Chat 4 does not patch it here.

### Target-shaped Lumber result slot is generic

For target action `lumber.shift`, PR #15 intentionally resolves the action result to `job/lumber/result/default`. PR #16 supplies season-specific shift media but no explicit generic result asset. `presentationSlots` merges media from the seasonal scenes into the generic result slot.

That is valid if Product Acceptance intentionally wants one reusable result slot, but integration must make the choice explicit. Otherwise candidate order can effectively inherit the first seasonal media rather than represent the current season. This is a presentation-data wiring issue, not a mechanics issue.

### PR #17 School IDs are not registered by the current catalog slot inventory

PR #17 defines course presentation IDs in `src/core/school.ts`, outside catalog action/event/ending definitions. PR #15’s `presentationSlots(cat)` enumerates catalog actions, events and endings. Therefore School module IDs such as `school/arcana/lesson/default` are not automatically editor/runtime slots until integration registers them or authors corresponding catalog presentation entries.

Additionally, PR #17 underscore slugs (`field_craft`, `physical_training`) conflict with the taxonomy’s kebab-case naming guidance and PR #15’s target-shaped example.

## Acceptance disposition

**PR #15 presentation runtime itself: VERIFIED for Phase B integration.** Its merge-ref check is green at 142/142 and the task-critical presentation behaviors are directly covered.

**Product Acceptance presentation wiring: PARTIAL.** Before PA00–PA26 can claim presentation coverage, the integration owner should:

- give Lumber/Foreman/cross-system events semantic source ownership or an equivalent explicit presentation mapping;
- register School course presentation slots and settle underscore-vs-kebab canonical IDs;
- explicitly wire target Lumber result presentation behavior;
- add/retain a pending-scene save/reload presentationId proof when the production mappings are active.

No runtime/UI/content file was changed by Chat 4 during this audit.
