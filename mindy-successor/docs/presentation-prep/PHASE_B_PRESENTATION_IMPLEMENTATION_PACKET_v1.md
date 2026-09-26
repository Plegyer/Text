# Phase B Presentation Implementation Packet v1

Status: Chat 2 handoff for future Phase B implementation. This file does not modify runtime code.

Base reviewed by Chat 2: worker base 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125 plus the Chat 2 task packet commit.
Normative presentation contract: GIF_CENTRAL_STAGE_CONTRACT_v1.md.

## 1. Phase B objective

Implement one persistent central media stage driven by stable presentationId values. GIF is the primary dynamic format; static image and text are safe fallbacks. Presentation remains replaceable independently of mechanics.

The implementation must preserve these invariants:
- gameplay resolves event/action/variant before presentation selection;
- presentation never applies effects or rerolls RNG;
- GIF duration never gates a command, choice, resolver step, save, Activity return, or ending;
- missing media is non-fatal;
- pending-scene reload preserves mechanical identity and presentationId;
- animation can be disabled without changing mechanics;
- replacing a GIF requires no source-code or JSON editing in the final user workflow.

## 2. Current M3.2 integration points observed

The stable M3.2 code already provides useful seams.

### 2.1 src/core/schema.ts

Current pack media entries have:
- id;
- kind: image, gif, or video;
- src under local assets;
- alt text.

Current action/event variants refer to media as arrays of catalog media IDs.

The target-state pending scene schema already contains optional presentationId. This is an important migration seam.

The legacy lastAction schema still stores media as an array of media IDs. Phase B should not treat that legacy shape as the final semantic presentation API.

### 2.2 src/core/presentation.ts

Current presentation override schema is version 1 with:
- texts keyed by editable text field;
- media overrides keyed by an existing catalog media ID.

applyPresentation validates that a media override targets an existing catalog media item and then replaces kind/src/alt on that catalog item. This correctly keeps mechanics separate, but the override key is still an asset/catalog media ID rather than the target stable scene presentationId.

### 2.3 content/presentation.json

The reviewed file currently contains text overrides and an empty media override map. No production GIF filenames need to be preserved from this file.

### 2.4 src/ui/editor.ts

The current editor:
- enumerates catalog media IDs;
- exposes a source path input;
- allows image/GIF upload as a data URL within the current limit;
- validates through applyPresentation;
- previews media;
- saves presentation overrides separately;
- exports/imports presentation JSON.

Phase B should preserve validation, preview, separate override storage, and import/export, while changing the user-facing selection model to presentationId and removing manual path editing from the normal workflow.

### 2.5 src/ui/app.ts

The current mediaHTML function receives an array of media IDs, resolves them directly from catalog.media, and renders image/video content. Missing media renders a non-fatal placeholder.

The central scene already uses one stage region for hub/action/event/result presentation. Phase B should keep this single-stage structure and replace direct media-ID selection with presentationId resolution.

### 2.6 src/ui/style.css

The current media window fills the stage and uses object-fit: contain. Phase B needs a fixed aspect contract so asset dimensions cannot resize or shift surrounding controls. The exact numerical aspect ratio is intentionally not selected by this prep packet.

## 3. Future code files likely to change

All paths below are relative to mindy-successor/prior-work/astra/prototype-m3.2.

### Required/primary integration files

1. src/core/schema.ts
   - define the target presentation entry/override structure;
   - define stable presentationId references where the target envelope requires them;
   - retain pendingScene.presentationId determinism;
   - stop treating direct asset IDs as the long-term scene identity.

2. src/core/presentation.ts
   - resolve stable presentationId to primary GIF/static/fallback;
   - validate presentation registry and override targets;
   - validate fallback graph and reject cycles;
   - preserve text/media override separation from mechanics;
   - provide a presentation-only resolver usable by both gameplay UI and editor preview.

3. src/ui/app.ts
   - accept current presentationId instead of direct media arrays at the UI boundary;
   - render all scene types in the same central-stage component;
   - implement safe fallback resolution;
   - implement animation-disable behavior;
   - never wait for GIF completion before enabling gameplay progression.

4. src/ui/editor.ts
   - select/search by presentationId;
   - file-picker assignment for GIF and static fallback;
   - preview through the same central-stage renderer/resolver;
   - validation and save without manual code/JSON editing;
   - show inherited/custom/missing/orphan states.

5. src/ui/style.css
   - fixed aspect media box using one layout token;
   - preserve aspect ratio;
   - contain/crop policy without layout jump;
   - same dimensions for loading, missing, static, animated, and text-only states.

### Likely shared-core integration files, to be changed only by the future owner after the current shared-core lock is released

6. src/core/engine.ts
   - ensure resolved actions/events/results expose a stable presentationId after mechanical variant resolution;
   - do not derive presentation from filenames;
   - do not dispatch effects from presentation callbacks.

7. src/core/content.ts
   - validate that referenced presentationIds exist or have an allowed fallback policy;
   - validate imported/custom target IDs;
   - keep presentation reference validation separate from condition/effect validation.

8. src/core/persistence.ts
   - migrate legacy pending/last-action presentation fields if the final save shape changes;
   - preserve deterministic pending presentationId;
   - never persist GIF bytes, current frame, loop count, or animation elapsed time.

### Active data likely to migrate in the future

9. content/presentation.json
   - move from media overrides keyed by legacy catalog media IDs toward presentationId-keyed overrides/registry data;
   - keep text overrides independently versioned.

10. Active content packs that currently put media ID arrays on scenes/events
   - replace direct scene-to-asset coupling with scene-to-presentationId references;
   - do not change conditions/effects merely for this migration.

The exact active pack filenames must be enumerated by the Phase B implementer from the then-current main branch. This packet intentionally does not edit or guess those active pack files while Chat 1 owns shared integration.

## 4. Proposed presentation data boundary

The semantic boundary should be:

    resolved mechanics
    -> stable presentationId
    -> presentation resolver
    -> primary GIF or static/fallback
    -> central-stage renderer

A candidate presentation entry needs, at minimum:
- id / presentationId;
- primary media reference when available;
- static fallback reference when available;
- optional fallbackId or fallback category;
- accessibility text;
- layout policy such as contain/crop when needed;
- tags/usage metadata useful to the editor.

The exact TypeScript field names may follow current code conventions. The behavioral contract matters more than this prep document's candidate shape.

Presentation data must not contain conditions, effects, resource deltas, RNG instructions, Energy costs, or event transitions.

## 5. Central-stage runtime flow

For a normal Lumber sequence:

    hub presentation
    -> player starts Lumber shift
    -> mechanics spend 1 Energy and resolve shift variant
    -> UI receives Lumber shift presentationId
    -> result presentation may replace the same media box
    -> resolver finds a free reactive career event
    -> UI swaps the same box to career-event presentationId
    -> player resolves dialogue
    -> next queued scene or hub presentation replaces the same box

The media swap itself costs 0 Energy and has no resolver side effect.

Equivalent swaps apply to School, relationship, Night, Activity, and ending scenes.

## 6. Fixed-aspect media box

Requirements:
- one persistent central box;
- constant aspect ratio within a given responsive layout;
- asset-native width/height must never determine surrounding layout;
- image/GIF/video content preserves aspect ratio;
- contain is the safe default unless presentation metadata explicitly requests a crop mode;
- loading and missing-art placeholders occupy the identical box;
- text/choices remain outside or layered consistently without being pushed by native media dimensions.

The numerical aspect ratio is still visual-production work. Implement it as a CSS/design token rather than scattering pixel values through scene code.

Responsive tests should verify that the ratio remains stable at representative desktop and narrow window sizes.

## 7. Animation lifecycle

GIF behavior:
- loop while its presentationId remains active;
- restart when the same pending scene is reloaded;
- replace immediately when presentationId changes;
- never own gameplay timing.

Forbidden implementation patterns:
- setTimeout based on assumed GIF duration before enabling Continue;
- listening for media loop/end to apply an effect;
- storing current GIF frame or elapsed time in the run save;
- applying a choice/effect from an image load callback;
- blocking a resolver cascade until animation finishes.

A slow or failed GIF load must not delay mechanical resolution.

## 8. Animation-disable mode

Add a presentation/accessibility setting that changes renderer behavior only.

When disabled:
1. use same-slot static fallback if available;
2. otherwise use an implementation-supported first-frame representation;
3. otherwise follow family/location/text fallback.

Do not create a separate mechanical scene for reduced motion. All controls, story text, deltas, and choices remain available.

## 9. Proposed editor flow

Normal user path:
1. Open presentation/media editor.
2. Search/select presentationId.
3. Review intended use and current resolved media.
4. Choose Replace GIF.
5. Pick a local GIF through file picker.
6. Validate and stage the change.
7. Optionally replace/confirm static fallback and alt text.
8. Preview in Animated and Animation Off modes using the production central-stage renderer.
9. Save override.
10. Runtime uses the new media on the next render without mechanics edits.

No source-code editor, JSON editor, or typed filesystem path is required.

Developer diagnostics may show resolved file paths and fallback chain, but that is not the primary user workflow.

## 10. Migration from current M3.2 mapping

### Step A — inventory

From the current catalog, enumerate:
- action scene media arrays;
- event variant media arrays;
- choice media arrays if used;
- catalog media entries;
- presentation.json override keys.

Record which legacy stage.* media IDs are shared.

### Step B — assign semantic IDs

For every player-visible scene that needs a stable slot, assign a presentationId using PRESENTATION_SLOT_TAXONOMY_v1.md.

Do not automatically create one presentationId per old asset ID. One old asset may serve many new IDs, and several old asset IDs may collapse into a single semantic family where the scene meaning is identical.

### Step C — build presentation registry

Map each new presentationId to:
- existing compatible asset where one exists;
- static fallback where one exists;
- fallback family/category;
- explicit placeholder state where no asset exists.

Do not invent production filenames for missing media.

### Step D — migrate runtime references

Replace direct scene media-array coupling at the UI boundary with presentationId. Preserve already-resolved mechanics and variant selection.

Legacy stage.lumber.spring-style IDs may remain as asset keys during transition, but they are not the new gameplay/presentation API.

### Step E — migrate saves

For legacy pending scenes:
- if presentationId exists, preserve it;
- if absent, derive it deterministically from saved eventId + variantId using the migrated mapping;
- never reroll the variant;
- old lastAction.media may be accepted only as legacy migration input, not as the canonical new save contract.

### Step F — migrate presentation overrides

Known current media override keys should be mapped to the new presentation slots they intentionally affect. If one legacy media key was shared by several scenes, migration must either apply that override to all intended new slots or preserve it as a shared reusable asset assignment.

Unknown targets must be rejected or surfaced as orphaned; never guess a replacement target.

## 11. Acceptance tests

### Core separation

1. Changing media for a presentationId leaves conditions/effects/state identical.
2. Presentation resolution cannot dispatch effects.
3. GIF load success/failure cannot change RNG outcome.
4. Two different assets assigned to the same presentationId produce the same mechanical result.

### Central stage

5. Hub, Lumber shift, result, reactive career event, relationship scene, Activity scene, and ending all replace content inside one central media box.
6. Switching between radically different source dimensions does not change the box dimensions.
7. Loading and missing states preserve the same box dimensions.

### Fallback

8. Missing requested GIF uses same-slot static fallback.
9. Missing GIF and static use family/parent fallback when configured.
10. Missing all media reaches neutral/text-only state and remains playable.
11. Fallback cycles are rejected at validation time.

### Animation disable

12. Disable animation prevents animated playback while preserving text/choices.
13. Toggle does not change save data or mechanics.
14. A pending scene loaded with animation disabled retains the same presentationId and mechanical variant.

### Timing

15. A zero-length, very long, slow-loading, or endlessly looping GIF does not delay Continue/choice availability beyond ordinary UI rules.
16. Reactive career/relationship scenes remain 0-Energy unless their explicit action definition says otherwise.
17. Forest Activity entry remains the explicit 2-Energy action; internal media transitions do not consume daily Energy.

### Save/reload

18. Save/reload of a pending career scene restores eventId, variantId, choices, and presentationId deterministically.
19. Reload restarts GIF playback but does not reapply effects.
20. Save contains no media bytes, frame number, loop number, or animation elapsed time.

### Editor

21. User replaces a Lumber GIF by presentationId through a file picker and saves without manual code/JSON editing.
22. Invalid file leaves the previous valid override intact.
23. Preview cannot consume Energy, advance day, apply effects, or mutate the run.
24. Unknown imported presentationId is rejected or shown as orphaned.
25. Animated and Animation Off previews use the same central-stage dimensions.

### Product Acceptance Lumber chain

26. The full Product Acceptance Lumber path can be represented using the planning manifest without requiring a unique GIF for every event.
27. Endings and major milestones may receive unique GIFs while repeatable shifts reuse family media.
28. Returning from Activity can immediately present the free Lumber continuation without waiting for an Activity GIF to finish.

## 12. Suggested implementation order

1. Land current A5/A6 shared-core work first.
2. Add/lock presentation schema and semantic ID resolver.
3. Add presentation registry + validation/fallback graph.
4. Migrate current scene references to presentationId.
5. Add deterministic save migration.
6. Refactor central-stage renderer and fixed-aspect CSS.
7. Add animation-disable behavior.
8. Refactor editor to presentationId + file-picker workflow.
9. Migrate base presentation data and overrides.
10. Run core, UI, save/reload, and Product Acceptance tests.

Do not scale asset production before the central-stage and fallback acceptance tests pass.

## 13. Compatibility notes

Current M3.2 strengths to preserve:
- presentation overrides are separate from life saves;
- applyPresentation revalidates after text/media changes;
- editor preview exists;
- import/export exists;
- missing art is already non-fatal at the UI level;
- local media source validation exists;
- pendingScene already has a presentationId seam.

The Phase B migration should evolve these behaviors rather than rewrite unrelated mechanics.

## 14. Open decisions that do not block implementation prep

1. Exact central-stage aspect ratio and pixel target are still visual-production decisions.
2. Final desktop storage strategy for user-imported media must choose between an app-managed override directory and an equivalent packaged override mechanism.
3. Final art style and real GIF filenames/assets are not available in this packet.
4. Optional video compatibility may remain, but GIF is the production baseline.

None of these decisions justify coupling mechanics to media or require changing the stable presentationId taxonomy.
