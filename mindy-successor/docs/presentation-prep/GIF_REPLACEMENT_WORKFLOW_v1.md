# GIF Replacement Workflow v1

Status: Chat 2 planning deliverable. Defines the intended no-code user workflow for replacing central-stage media.

## 1. Goal

A user must be able to replace the media assigned to a stable presentationId without editing TypeScript, active content JSON, or source-controlled asset references by hand.

The final editor flow is:

    choose presentationId
    -> choose/assign GIF
    -> assign or confirm static fallback
    -> enter/confirm alt text
    -> preview in the production central-stage box
    -> validate
    -> save override

Replacing media must not change gameplay state, conditions, effects, event selection, RNG, Energy, save compatibility, or ending logic.

## 2. Presentation selector

The editor presents a searchable list of known presentationIds. Each row should show:
- presentationId;
- a human-readable usage label when available;
- current primary media state;
- fallback state;
- validation state;
- whether the slot currently inherits/reuses another asset family.

The selector must be built from the presentation registry, not from filesystem filenames. Users choose the scene they want to change first and then select media.

Undiscovered secret content should not be exposed in a normal player-facing editor unless product policy explicitly allows it. Developer/inspector mode may list all IDs.

## 3. Assign GIF

Primary path:
1. Select a presentationId.
2. Press Replace GIF or Choose GIF.
3. Use the native file picker.
4. The application validates the selected file.
5. The application imports/copies or references the file through an app-managed override mechanism.
6. The UI displays the resolved stored location; the user does not type a source path.
7. Preview uses the same renderer and dimensions as gameplay.
8. Save writes a presentation override, not gameplay content.

The current M3.2 editor exposes a path field and supports image upload/data URLs. Phase B should keep the useful validation and preview behavior while removing manual path editing from the ordinary user workflow.

An optional advanced diagnostic view may show the resolved path, but it should be read-only by default.

## 4. File validation

A selected primary animated asset is accepted only when all applicable checks pass:
- file is local or imported into an allowed app-managed location;
- extension and detected media type are allowed;
- GIF content is decodable;
- the path cannot escape the allowed media/override directory;
- remote http/https URLs are not accepted as production media;
- required accessibility text is present;
- the resolved presentationId exists;
- the override does not create a fallback cycle;
- the asset can be previewed without changing gameplay.

Allowed production baseline:
- GIF for dynamic media;
- PNG, JPEG, and WebP for static fallback;
- video may remain compatibility-only if the existing schema still supports it, but it is not required for production acceptance.

Existing M3.2 source validation already restricts media to local assets paths or supported embedded images. Phase B should preserve that security intent. Exact file-size and pixel budgets are a production decision and should be explicit in implementation rather than silently invented by the editor.

Validation errors must name the problem and keep the previous saved assignment intact.

## 5. Static fallback

Every important production slot should have a usable non-animated path.

Editor flow:
1. After assigning a GIF, show the current static fallback.
2. Allow Replace Static Fallback with the same file-picker workflow.
3. If no slot-specific static fallback exists, show the inherited fallback category.
4. Preview both Animated and Animation Off modes before save.

Resolution priority:
1. requested GIF;
2. static image for the same presentationId;
3. parent/event/family fallback;
4. neutral location fallback;
5. text-only central stage.

The editor must make the current fallback chain visible enough to diagnose a missing asset without requiring JSON inspection.

## 6. Missing asset behavior

A missing, unreadable, or invalid GIF is a presentation failure only. It must never block:
- event resolution;
- save;
- load;
- ending commitment/completion;
- Activity return;
- relationship progression;
- reactive career progression.

Runtime behavior:
- record/display a non-fatal media diagnostic;
- continue the already-resolved mechanical scene;
- try the static/family/location fallback chain;
- if no media resolves, keep the fixed central-stage box and render a text-only safe state.

The requested presentationId remains the scene identity even if a fallback is rendered.

## 7. Animation-disable behavior

The player setting Disable animated media or equivalent must prevent animated GIF playback.

When animation is disabled:
- prefer the slot-specific static fallback;
- otherwise use a safely extracted/available first-frame representation if implementation supports it;
- otherwise continue through the normal fallback chain;
- keep all text, choices, deltas, and controls available;
- do not load or animate the GIF when a static path is sufficient.

Animation preference changes presentation only. It must not alter timing, RNG, effects, event order, or save data.

## 8. Preview behavior

Preview must use the same central-stage component/layout contract as gameplay:
- same fixed aspect box;
- same contain/crop policy resolved from presentation metadata;
- same fallback resolver;
- same alt/accessibility text;
- same animation-disable behavior.

Preview must not dispatch gameplay commands, apply effects, consume Energy, advance time, or mutate a run.

The preview can offer:
- Animated;
- Animation Off;
- Force Missing Primary, for testing fallback behavior;
- representative viewport sizes.

The preview does not need cinematic controls or timeline editing.

## 9. Save behavior

Save creates or updates a presentation override keyed by stable presentationId.

Saving must:
- validate the complete changed entry before replacing the previous one;
- preserve mechanics IDs and content definitions;
- store only presentation metadata/references, not GIF bytes inside the game save;
- keep presentation overrides versioned separately from life/run saves;
- leave a previously valid override intact when a new file fails validation.

The gameplay save does not store GIF frame, loop count, playback timestamp, or animation elapsed time.

## 10. Import/export

The editor should support an override pack so users can move replacements without modifying source files.

Export:
- presentation override metadata;
- referenced user media according to the desktop packaging strategy;
- version information sufficient for validation.

Import:
- validate schema;
- validate every target presentationId;
- reject or quarantine unknown/orphan targets;
- validate media files before activation;
- do not partially apply a broken pack without an explicit recovery model.

The exact on-disk packaging location is a Phase B desktop implementation decision. The user-facing contract is that import/export is performed through UI controls, not manual JSON editing.

## 11. Editor states

Recommended visible states:
- Inherited: no custom override; base presentation is used.
- Custom GIF: user override active.
- Static only: no animated primary, but slot is playable.
- Missing primary: fallback active.
- Invalid override: override not activated; previous valid mapping remains.
- Orphan target: imported ID no longer exists; not applied.

These states are presentation diagnostics only.

## 12. Acceptance scenarios

The workflow passes when:
1. A user selects job/lumber/shift/spring/default, picks a local GIF, previews it, and saves without editing code or JSON.
2. Replacing that GIF does not change the result of the Lumber action.
3. A broken GIF path/file falls back safely and the action still resolves.
4. Animation-disabled mode remains fully playable.
5. A pending reactive event reloads with the same presentationId even though GIF playback restarts.
6. Replacing a relationship or ending GIF uses the same workflow as replacing a work GIF.
7. Unknown imported presentationIds are rejected or shown as orphaned rather than silently bound to another scene.
8. Preview never consumes Energy or applies gameplay effects.
