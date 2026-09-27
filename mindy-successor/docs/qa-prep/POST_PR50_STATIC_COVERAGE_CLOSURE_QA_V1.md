# Post-PR50 static coverage closure QA v1

Status: COMPLETE / ESTABLISHED_TARGET_80_OF_80

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`
(PR50 merge).

## Root project-owned static mappings

Current root `content/presentation.json`:
- project-owned static semantic mappings: 80;
- unique active project-owned physical sources: 79.

All active static overrides use:
`assets/presentation/*.svg`.

The 80 -> 79 source difference is intentional:
`school-day-study.svg`
is shared by two current generic School reaction semantic IDs.

## Physical project-owned assets

Current `assets/presentation/` files:
`89`.

Not every retained physical file is active.

PR49 left superseded first-wave sources in the repo as source history while active slots moved to refined one-to-one assets.

Coverage is measured by exact active semantic mapping, not raw file count.

## Established target scope

The established current production project-owned static target is exactly 80 semantic IDs:

- ordinary career results: 10;
- ordinary career seasonal shifts: 40;
- reachable/current School: 11;
- ordinary-poverty events: 10;
- Forest return/reaction: 6;
- Foreman milestone/Night: 2;
- shared Forest route/default: 1.

Total:
`80`.

## Exact target recompute

Mapped target IDs:
`80 / 80`.

Missing target IDs:
`0`.

Therefore the established project-owned static target is closed.

## PR50 closure item

The final previous gap:
`activity/forest/route/default`

now maps to:
`assets/presentation/forest-route-default-v1.svg`.

It has complete RU+EN alt/caption and natural-path Save-invariance coverage.

## Product-open route-specific exclusion

Not counted in the 80-ID target:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current root slots for both:
`absent`.

This is correct.

Route-specific presentation is separate future work requiring the Lead seam and reviewed route assets.

Static closure of the current generic target does not authorize those IDs.

## Other non-target generic media

Legacy root events may still use generic pack media and lack dedicated per-event project-owned static refinements.

That is separate media specificity/accessibility debt and does not reopen the established 80-ID target.

## Animation does not affect closure

Project-owned GIF pool coverage:
`0`.

The 80/80 result is **static fallback coverage**, not animation coverage.

Static remains the authoritative required fallback.

## Locale invariance

All target slots use locale-neutral semantic IDs/asset paths.

Localization changes alt/caption text only.

PR47–PR50 exact/post-merge regressions protect static identity across RU↔EN.

## Verdict

`ESTABLISHED_TARGET_80_OF_80`.

The defined current project-owned static production target has no remaining generic-static gap after PR50.

Product-open route-specific slots remain excluded by design.


## PR51/PR52 compatibility note

PR51 changes ordinary-poverty localization values and PR52 adds legacy root localization values.
Neither changes the app/engine/presentation seams audited by this document.

Current app blob remains:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Current presentation blob remains:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.
