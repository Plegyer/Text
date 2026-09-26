# Presentation Asset Backlog Priority v1

This matrix ranks presentation asset work **only by product dependency class**. It does not rank aesthetics, art quality, animation appeal, or subjective visual importance.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-asset-backlog-priority.fixture.json`

## REQUIRED_FOR_RC_SAFE_FALLBACK

**No missing items.**

The current release-candidate slice already has shipped static fallback coverage for Lumber, School, Night/town, Forest and endings.

Therefore the current count of missing presentation assets required for RC-safe fallback is **0**.

## ALREADY_COVERED_STATIC

Shipped static coverage already exists for:

- town / shared Night / ending terminal fallback;
- Lumber and Foreman;
- all eight paid School lessons;
- Forest route/results.

These assets are product dependencies that are already satisfied, not backlog work.

## BLOCKED_BY_AUTHORING

Do not create final unique media bindings before product/content identity is authored for:

- route-specific Forest presentation variants;
- hunter trail;
- challenge-specific navigation / physical obstacle / interpretation-ritual-anomaly presentation;
- final School management/accounting public result.

The generic shipped Forest/School/town fallbacks remain safe while this authoring is open.

## TEXT_FALLBACK_ACCEPTABLE

Dedicated art is optional where current semantic/text meaning remains understandable and a safe generic static fallback exists.

Current examples:

- dedicated ending-specific art;
- dedicated School Night-study art.

Their absence does not block the RC.

## NICE_TO_HAVE_GIF

Exactly seven optional animated replacements remain:

- four seasonal Lumber shifts;
- accepted-hand milestone;
- Foreman professional;
- Foreman professional Night.

Each already has a shipped static fallback, so these are polish-only.

## Priority conclusion

There are **no presentation asset blockers for RC-safe fallback**.

Any next asset work should be selected because authoring has become final or because optional polish is scheduled—not because a missing GIF is mistaken for a product dependency.
