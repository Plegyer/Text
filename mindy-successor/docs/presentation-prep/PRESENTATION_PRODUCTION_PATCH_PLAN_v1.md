# Presentation Production Patch Plan v1

Status: exact presentation-only patch plan for Lead activation. This document and its fixture do not edit `content/presentation.json`, gameplay content, runtime, schema, build, or UI.

## Scope

The plan closes the semantic presentation surface required by Lumber + School production activation. It is derived from the completed slot-closure, shipped-media-gap, target-registry, current stage pack, Lumber target packs, and School semantic ID work.

The authoritative machine-readable plan is:

`prior-work/astra/prototype-m3.2/content/presentation-production-patch-plan.fixture.json`

It contains exactly 21 required semantic slots.

## Classification meanings

- `direct-existing`: the semantic slot already has a deterministic shipped static media candidate that exists under `assets/`.
- `static-fallback`: the slot has no direct owned media in the current plan and must use its semantic `fallbackId`; that fallback ultimately reaches shipped static media.
- `future-GIF`: a target pack already declares a GIF media id/path, but that GIF file is not currently shipped. The row may still carry a shipped static candidate or semantic fallback.
- `text-only`: reserved for a slot with no usable media/fallback candidate. No required activation slot currently needs this class because every otherwise-unbound row has an explicit safe fallback.

## Shared fallback root

`location/town/default` is a support fallback, not an additional required product slot. It uses:

- media id: `stage.town`
- asset path: `assets/stage-town.svg`
- current availability: true

This keeps the 21-slot activation set exact while still making fallback validation explicit and cycle-checkable.

## Lumber shifts and result

The four seasonal Lumber shift slots retain their semantic slash IDs and prefer their already shipped legacy static stage ids:

- spring -> `stage.lumber.spring`
- summer -> `stage.lumber.summer`
- autumn -> `stage.lumber.autumn`
- winter -> `stage.lumber.winter`

All four static ids resolve to the shipped `assets/stage-lumber.svg`.

The activated Lumber production pack already declares four primary GIF targets under `assets/lumber/`, but those files are absent today. They are therefore `future-GIF`, never marked available.

`job/lumber/result/default` is `direct-existing` through `stage.lumber` and falls back to the spring shift slot.

## Lumber event and Foreman relationship/Night

The current target packs already declare exact future GIF ids/paths for:

- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Those GIF paths do not exist under the current shipped `assets/` tree, so all three remain `future-GIF`. No substitute direct static asset is guessed.

Fallbacks are semantic:
- career milestone -> Lumber result;
- Foreman relationship -> neutral town;
- Foreman Night -> Foreman relationship -> neutral town.

Gameplay event/relationship ids are not renamed or stored in this patch-plan fixture.

## Forest Activity

`activity/forest/route/default` is directly backed by shipped `stage.hunt` -> `assets/stage-forest.svg`.

`activity/forest/return/success` is intentionally `static-fallback` to the route slot. This preserves a distinct semantic return-result identity without inventing a new asset mapping.

## School

All eight School presentation IDs remain the locked kebab-case semantic namespace:

- `school/literacy-and-numbers/lesson/default`
- `school/arcana/lesson/default`
- `school/rhetoric-and-social/lesson/default`
- `school/etiquette-and-presentation/lesson/default`
- `school/field-craft/lesson/default`
- `school/physical-training/lesson/default`
- `school/arts-and-performance/lesson/default`
- `school/body-confidence/lesson/default`

Only Field Craft has a deterministic shipped static mapping in the completed migration/media-gap evidence: `stage.school` -> `assets/stage-school.svg`. It is `direct-existing`.

The other seven are `static-fallback` to `location/town/default`. The plan deliberately does not guess course-specific filenames or claim nonexistent GIF assets.

## Endings

The required ending slots are:

- `ending/lumber/hard-work`
- `ending/lumber/forewoman`
- `ending/lumber/forest`

No currently shipped ending-specific asset path is established by the audited sources. All three therefore use explicit semantic fallback to `location/town/default` and retain text fallbacks. No ending gameplay id is renamed.

## Non-fatal media rule

Every row has a text fallback. Missing future GIFs are presentation-only gaps. A missing GIF must not affect event identity, RNG, Energy, conditions, effects, ending eligibility, or gameplay transactions.

Lead activation may materialize this plan into the production presentation configuration, but missing assets must remain unavailable until their files actually exist.

## Validation requirements

The companion validator must prove:

1. all 21 required semantic slots occur exactly once;
2. semantic IDs are slash-taxonomy valid and contain no asset filename;
3. School segments are kebab-case;
4. every `direct-existing` media path exists under `assets/`;
5. every `future-GIF` path is explicitly marked `future-unavailable` and currently does not exist;
6. every fallback target exists in the plan or support fallback set;
7. the fallback graph is cycle-free;
8. no mechanics/effect/RNG/Energy/save-state payload exists in the plan.
