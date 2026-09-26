# Presentation Slot Taxonomy v1

Status: Chat 2 planning deliverable. Non-runtime guidance for Phase B presentation integration.

## 1. Purpose

This document defines stable presentationId naming for the single persistent central media stage. A presentationId names a semantic scene slot. It does not name a file, a GIF, a DOM node, a mechanical effect, or a save-state transition.

Gameplay resolves mechanics first and then emits a stable presentationId. Presentation data maps that ID to a GIF, static fallback, accessibility text, and optional fallback chain. Replacing media for an ID must never change conditions, effects, RNG, Energy cost, event availability, or ending eligibility.

## 2. Canonical namespace shapes

Use the following namespace families:

    location/<locationId>/<state>
    job/<jobId>/shift/<season>/<variant>
    job/<jobId>/event/<eventId>/<variant>
    job/<jobId>/result/<resultId>
    school/<trackId>/<eventId>/<variant>
    relationship/<npcId>/<eventId>/<variant>
    night/<eventId>/<variant>
    activity/<activityId>/<locationOrEncounter>/<variant>
    ending/<endingId>
    meta/<eventId>

These shapes align with MEDIA_PRESENTATION_CONTRACT_v0 and GIF_CENTRAL_STAGE_CONTRACT_v1. The target shell already specifies the job shift/event/result families.

## 3. Stable naming rules

1. IDs are semantic and asset-independent. Never put a filename, file extension, content hash, pixel size, codec, artist name, local path, or production revision into presentationId.
2. Use lowercase ASCII identifiers with slash-separated hierarchy and kebab-case leaf names. Keep IDs readable in logs and editor selectors.
3. The mechanical owner of the scene comes first: location, job, school, relationship, night, activity, ending, or meta.
4. Use stable domain IDs already owned by gameplay when they exist. Do not create a second alias for an existing job, NPC, activity, event, or ending solely for presentation.
5. Add a variant segment only when the scene needs a distinct presentation slot. Text-only wording changes do not automatically require a new presentationId.
6. Do not encode volatile counters, stat values, random seeds, day numbers, save IDs, timestamps, or choice order in an ID.
7. Do not encode UI implementation details such as panel, modal, img, video, stage-left, or css class names.
8. A presentationId remains valid if its GIF is replaced, removed, or downgraded to a static fallback.
9. IDs may outlive a specific asset. Removing the asset must not require renaming the ID.
10. Secret content IDs may exist in data and dev tooling, but production UI must not expose undiscovered secret slots in selectors intended for ordinary players.

## 4. Default, season, and variant suffixes

Use default as the normal semantic fallback within a family.

For repeatable work, the preferred shape is:

    job/lumber/shift/spring/default
    job/lumber/shift/summer/default
    job/lumber/shift/autumn/default
    job/lumber/shift/winter/default

Season is a stable level for work when the resolved presentation meaning is season-sensitive. Separate seasonal IDs may still point to the same GIF during early production. This preserves later replacement without changing mechanics.

Do not add a season segment merely because the current calendar has a season. For relationship, ending, or event scenes, add season only if the production slot is intentionally season-specific.

Variant names should describe a stable visual/story state rather than an ordinal. Prefer names such as default, success, escape, discovered, milestone, or restored when those meanings already exist in content. Avoid v1, v2, alt-3, random-7, or names derived from asset filenames.

If a scene has no meaningful visual distinction, keep one default slot and let text carry the difference.

## 5. Examples by scene family

Hub/location:

    location/town/default
    location/town/night
    location/forest-edge/default

Work:

    job/lumber/shift/spring/default
    job/lumber/shift/winter/default

Work result:

    job/lumber/result/default
    job/lumber/result/milestone

Reactive career event:

    job/lumber/event/foreman-trust/default

Relationship:

    relationship/foreman/trust/default
    relationship/foreman/night/default

School:

    school/field-craft/lesson/default
    school/field-craft/milestone/default

Night:

    night/lodging/default
    night/street/default

Activity:

    activity/forest/route/default
    activity/forest/ruins/default
    activity/forest/return/success
    activity/forest/return/escape

Ending:

    ending/lumber/hard-work
    ending/lumber/forewoman

Meta:

    meta/new-run/lumber-hard-work

The Lumber, Foreman, Forest, Hard Work, and Forewoman examples correspond to the Product Acceptance Slice. School examples are presentation planning examples and do not create new mechanical content.

## 6. Reuse rules

Presentation slot reuse and media asset reuse are separate decisions.

A single GIF asset may be assigned to multiple presentationIds when the visual is compatible. For example, all four Lumber seasonal shift IDs may initially reuse one generic Lumber work loop. Keeping separate IDs allows later season-specific replacement without changing gameplay.

Two scenes should share one presentationId when all of the following are true:
- they represent the same semantic visual beat;
- they can use the same alt/accessibility meaning;
- they use the same fallback policy;
- they do not reveal different story or secret-state information;
- replacing the media for one should intentionally replace it for the other.

Two scenes should use separate presentationIds when any of the following is true:
- the scene is a different major milestone, ending, relationship beat, Activity result, or location state;
- the visual difference communicates information the player must understand;
- the accessibility description must be materially different;
- one scene is secret/spoiler-sensitive and the other is not;
- fallback behavior differs;
- production wants independent future replacement even if both IDs currently reuse the same asset.

Do not create a unique slot solely because an event fired from a different trigger source. Trigger provenance is mechanical history, not necessarily a visual identity.

## 7. Result and transition policy

Ordinary action results may reuse a generic job result slot when the visual beat is the same. A milestone result gets a separate ID when the milestone deserves its own presentation or accessibility description.

Reactive event transitions do not create transitional presentation IDs by default. The same central media window swaps directly from the current presentationId to the next resolved presentationId. No transition ID may carry gameplay timing or effects.

Returning to hub uses the hub/location presentationId rather than preserving a completed action GIF.

## 8. Fallback identity policy

Fallback does not change the requested presentationId. The UI may resolve the requested ID through:
1. requested GIF;
2. static media for the same presentation;
3. parent/family fallback;
4. neutral location;
5. text-only stage.

The requested presentationId remains available for logging and deterministic pending-scene restoration even when a fallback is displayed.

Fallback IDs must not form cycles. A fallback is presentation-only and must never trigger gameplay resolution.

## 9. Save and determinism

For a pending mechanical scene, save/reload must restore the same resolved event/variant and the same presentationId when that ID is stored. If a legacy save lacks presentationId, migration may derive it from the already-resolved event/variant mapping. Reload restarts GIF playback; it does not restore GIF frame or elapsed animation time.

## 10. Lumber Product Acceptance mapping principle

The Product Acceptance Lumber chain does not require a unique GIF for every event. A compact production set can cover the flow with:
- one town hub family;
- one reusable Lumber shift family, optionally split by season later;
- one generic Lumber result family;
- distinct GIFs for major career milestones;
- one reusable Foreman dialogue family plus unique major relationship milestone slots;
- one School track/lesson family;
- one Night/lodging family;
- reusable Forest route/challenge families plus distinct major result slots;
- unique ending slots.

The isolated placeholder manifest in workstreams/chat2 demonstrates this mapping without inventing asset filenames.

## 11. Anti-patterns

Do not use IDs such as:

    lumber_spring.gif
    stage.lumber.spring
    screen/work/image-2
    event/12345/random-6
    ending-forewoman-final-v3.gif

Legacy stage.* identifiers from M3.2 are catalog media IDs, not the target stable presentationId taxonomy. They may be referenced during migration as legacy asset keys, but should not become the semantic API between gameplay and presentation.
