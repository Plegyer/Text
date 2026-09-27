# Project-owned static Lead branch source audit v2

Status: COMPLETE / GREEN_SELECTIVE_SOURCE

Reviewed Lead branch:
`lead/project-owned-static-media-v1`

Reviewed head:
`5ea2a18e214fca6d656a8751ff5c2dd1f4abce31`

Current main base:
`1af3104c1e4c180019b965adac8e87e67de89347`

The branch is exactly 6 commits ahead of current main and 0 behind.

## Selective-copy boundary

Lead did not merge the long-lived Chat 2 branch wholesale.

The worker `assets/presentation/` directory currently contains 90 files because Chat 2 has continued into later seasonal/non-career waves.

The Lead branch contains exactly 21 files under:
`assets/presentation/`.

Those 21 filenames and Git blob SHAs match the original Chat 2 items 184–195 project-owned static source exactly.

Missing from Lead by design:
- 40 later seasonal-career SVGs;
- later non-career static variants;
- route-specific Forest assets;
- other post-item-195 worker media.

This is correct selective integration.

## Actual 21 project-owned SVGs

Lead contains exactly the reviewed original set:
- 10 ordinary career result SVGs;
- 2 reachable School SVGs;
- 4 ordinary-poverty family SVGs;
- 3 Forest result SVGs;
- 2 Foreman professional/Night SVGs.

All 21 Lead blobs are byte-identical to the original Chat 2 reviewed source blobs.

No external-media URL, placeholder path, staging GIF, or remote asset was introduced by the Lead copy.

## Presentation activation

Lead activates exactly:
`39`
static semantic mappings in root `content/presentation.json`.

Comparison against the Chat 2 item-191 manifest:
- expected mappings: 39;
- Lead mappings: 39;
- missing mappings: 0;
- extra mappings: 0;
- source-path mismatches: 0;
- altKey mismatches: 0;
- unique physical sources: 21.

Thus the Lead branch activates the exact reviewed semantic mapping set rather than approximating it.

## RU+EN accessibility source

Lead root localization contains all 42 reviewed Chat 2 accessibility strings:
- 21 alt keys;
- 21 caption keys.

Comparison against the worker fixture:
- missing keys: 0;
- RU text mismatches: 0;
- EN text mismatches: 0.

The physical asset IDs and paths remain locale-neutral.

## Runtime/schema changes

Lead adds only presentation support needed to consume optional localized alt keys:
- optional `altKey` on static override;
- optional `altKey` on GIF override;
- optional `altKey` on GIF pool candidate;
- resolved presentation media carries optional `altKey`;
- renderer resolves `altKey` through the existing localization bundle, falling back to embedded `alt`.

These changes are presentation-only and reviewed separately in:
`PRESENTATION_ALTKEY_SCHEMA_COMPATIBILITY_QA_V1.md`.

## No gameplay drift

The Lead compare contains no edits to:
- `definitions.json`;
- gameplay packs;
- engine command/effect logic;
- Save schema;
- NightFlow;
- School mechanics;
- poverty mechanics;
- relationship mechanics;
- Activity results;
- endings.

Static-media activation does not introduce:
- conditions;
- effects;
- rewards;
- resource deltas;
- RNG gameplay inputs;
- new gameplay IDs.

## Current semantic identity boundary

The 39 activated IDs are existing current production presentation IDs.

The Lead branch does not activate:
- School teacher-specific Product-open IDs;
- Secret Debt;
- Hunter/Old Boundary gameplay semantics;
- deeper relationship routes;
- Palace content;
- later Chat 2 seasonal/non-career worker waves.

## Regression source

Lead adds:
`tests/project-owned-static-media-production.test.ts`

covering:
- presentation schema parse;
- exact 39 current semantic slots;
- exact 21 source files;
- root localization alt keys;
- source/build existence and byte equality;
- animations-on/off static selection;
- backward compatibility without altKey;
- deterministic GIF candidate selection with optional altKey.

CI acceptance for the exact branch/PR is handled separately by item 184.

## Verdict

`GREEN_SELECTIVE_SOURCE`.

Lead branch `lead/project-owned-static-media-v1` is a clean selective integration of the original 21 project-owned static-media source set, not a worker-branch merge.

Production merge still requires exact-head CI, build/runtime acceptance and post-merge main evidence.
