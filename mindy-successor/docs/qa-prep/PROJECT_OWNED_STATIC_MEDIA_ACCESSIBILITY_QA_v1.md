# Project-owned static media accessibility QA v1

Status: COMPLETE / GREEN_AS_SELECTIVE_ACCESSIBILITY_SOURCE

Reviewed:
- Chat 2 item 191 manifest;
- Chat 2 item 192 RU+EN accessibility fixture;
- all 21 physical SVG assets from items 185–190.

Current source files:
- manifest blob `9883830c20fc3f9ed600b9b15ddb7c707f609b9b`;
- localization fixture blob `22150f46a4faca397f2032a6cabf2d475483379f`.

## One-to-one accessibility coverage

Manifest assets:
`21`.

For every asset, the manifest declares:
- one `altKey`;
- one `captionKey`;
- required locales exactly `ru`, `en`.

Fixture coverage:
- alt entries: 21;
- caption entries: 21;
- total accessibility keys: 42;
- missing RU: 0;
- missing EN: 0.

No manifest asset lacks accessibility copy.

No fixture accessibility key is needed for a missing physical asset.

## Distinct meaningful alt text

All 21 RU alt strings are non-empty and mutually distinct.

All 21 EN alt strings are non-empty and mutually distinct.

The alt copy identifies the semantic visual rather than merely saying “image” or repeating a filename.

Examples of the semantic distinction preserved by the payload:
- Lumber describes timber/tools after a shift;
- Hunter describes an ordinary hunter returning at a forest trail without assigning deeper Forest outcome;
- School day describes daytime learning materials;
- School Night describes a lamplit night-study setting;
- poverty street/cheap lodging/recovery/pressure use different environmental contexts;
- Forest success/escape/failure use outcome-specific return descriptions;
- Foreman daytime professional and Night professional conversations have separate descriptions.

This is meaningful accessibility differentiation even where one physical family asset intentionally maps to multiple compatible presentation IDs.

## Caption quality

All 21 RU captions are non-empty and mutually distinct.

All 21 EN captions are non-empty and mutually distinct.

Captions remain presentation descriptions and do not claim new mechanics.

Notably:
- poverty captions avoid inventing a reward/result beyond the already selected event;
- Forest captions reflect already-resolved success/escape/failure outcomes;
- relationship captions stay professional and do not imply a new route.

## No decorative false-positive

The manifest does not classify these assets as decorative.

Every mapped image has required non-empty RU+EN alt text.

Therefore there is no asset that is visually meaningful in the production mapping while being hidden behind an empty decorative alt claim.

If Lead later intentionally marks any image decorative, that must be a separate reviewed UI/accessibility decision; this fixture should not silently replace meaningful alt with empty text.

## Locale-neutral identity

Verified:
- no localization key embeds a `.ru` or `.en` identity suffix;
- no asset key embeds a locale identity;
- no SVG path is duplicated per locale;
- all 21 physical SVGs contain no baked `<text>` element;
- language changes only alt/caption strings.

The same physical asset path and same semantic presentation ID are used for RU and EN.

This prevents locale from influencing:
- media identity;
- presentation candidate identity;
- gameplay identity;
- Save/RNG.

## Physical fallback coverage

All 21 manifest paths exist as actual Git blobs under:
`assets/presentation/`.

Every asset independently passed:
- non-empty SVG source;
- 1200×675 viewBox;
- no external embedded media URL;
- no script;
- no baked text.

The project therefore has a real static fallback source for every mapping in item 191.

The item-193 build regression additionally requires each source to be copied byte-for-byte into:
`dist/assets/presentation/`.

## Intentional family reuse

Accessibility text must describe the physical/family fallback accurately without pretending each reused mapping has unique art.

Accepted intentional reuse includes:
- one School daytime asset across eight current course results and compatible post-lesson events;
- one poverty family asset across compatible event IDs within that family;
- one Forest outcome asset shared between Activity return and matching reaction identity.

This reuse is accessible because:
- the art remains semantically compatible with every mapped ID;
- the alt text describes the shared visual family/outcome;
- the gameplay/event-specific body and choice text remain separate localization.

## Product-open exclusion

No accessibility key promotes:
- School teacher-specific staged identities;
- Secret Debt;
- Hunter/Old Boundary deeper semantics;
- relationship stages beyond current professional Foreman;
- Palace content.

Accessibility copy cannot be used as evidence that a Product-open gameplay route has been approved.

## Verdict

`GREEN_AS_SELECTIVE_ACCESSIBILITY_SOURCE`.

The 21 real project-owned SVGs have complete, meaningful and locale-neutral RU+EN accessibility coverage.

Production acceptance still requires selective integration of:
- physical assets;
- mapping activation;
- accessibility keys into the authoritative localization path;
- exact-head build/UI regressions;
- post-merge main CI.
