# Forest Route Static-Source Compatibility Audit v1

Status: review of Chat 2 Forest-route SVG candidates against exact current Forest route semantics.

Current-main baseline:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Source branch reviewed:
`chat2/presentation-replacement-next`.

This audit does not activate, copy, or root-load any asset.

## Classification meanings

- **VISUALLY_SAFE_IF_SEAM_SHIPS** — visual content is compatible with an already-shipped route identity, but should only be activated after the shared route-state -> presentationId seam exists.
- **TOO_SPECIFIC** — image adds a concrete visual claim beyond the currently safe authored route description.
- **PRODUCT_SEMANTICS_LEAK** — image would imply unresolved Product meaning such as Hunter ownership, token use, challenge outcome, magic, law, or deeper lore.
- **NEEDS_GENERIC_FALLBACK** — use a neutral Forest fallback instead of this candidate until the mismatch is resolved.

## Generic route fallback candidate

Asset:
`assets/presentation/forest-route-default-v1.svg`.

Embedded identity:
`data-forest-route="default"`.

Observed visual content:
- generic forest path;
- trees and undergrowth;
- a traveler figure;
- no route-specific marker;
- no Hunter sign;
- no token depiction;
- no outcome depiction.

Classification:
**VISUALLY_SAFE_IF_SEAM_SHIPS** as a neutral `activity/forest/route/default` fallback.

Reason:
the image intentionally avoids selecting logging-road or old-boundary semantics.

It may serve the current shared active-route request if Lead elects to root-load the default presentation slot. That is Chat 2/Lead presentation ownership, not activated here.

## Logging-road candidate

Asset:
`assets/presentation/forest-route-logging-road.svg`.

Embedded identity:
`data-forest-route="forest.route.logging-road"`.

Observed visual content:
- broad worked forest road;
- visible wheel/road corridor;
- cut timber/log form near the road;
- simple worksite-like marks/wood elements;
- no Hunter iconography;
- no token;
- no magical effect;
- no result/outcome scene.

Classification:
**VISUALLY_SAFE_IF_SEAM_SHIPS**.

Why it matches current semantics:
the shipped route is exactly `forest.route.logging-road`, and the final Chat 3 prose describes wheel ruts, recent logging work, timber stacks, cut branches, and a route shaped by work.

Activation condition:
only after authoritative route state `logging-road` maps to
`activity/forest/route/logging-road`.

The asset must not itself be used to create route availability or select the route.

## Old-boundary candidate

Asset:
`assets/presentation/forest-route-old-boundary.svg`.

Embedded identity:
`data-forest-route="forest.route.old-boundary"`.

Observed visual content:
- older-looking forest route;
- vegetation and older marks;
- a prominent constructed crossbar/post-like structure near the route center.

Classification:
**TOO_SPECIFIC**.

Reason:
current safe old-boundary semantics establish an old line through stones and weathered marks, but do not establish a built gate, fence, checkpoint, turn-in point, legal border structure, ritual structure, or token-using barrier.

The crossbar/post silhouette risks being read as one of those more specific structures even though no such meaning is authorized.

Secondary classification:
**NEEDS_GENERIC_FALLBACK** until the asset is revised or Product explicitly approves that constructed boundary feature.

The asset is **not** classified as PRODUCT_SEMANTICS_LEAK solely from the SVG contents because it does not explicitly depict Hunter ownership, token insertion/consumption, magic, a challenge reward, or a named lore fact. The problem is visual specificity, not a confirmed lore claim.

## Product-semantics leak check

None of the three reviewed SVGs explicitly shows:
- Hunter trail ownership or Hunter provider;
- `old_boundary_token`;
- token purchase;
- token insertion/consumption/turn-in;
- School Arcana;
- magical activation;
- challenge success/failure;
- route reward;
- seasonal mechanical closure;
- deeper Forest outcome.

Therefore no reviewed candidate is currently classified
**PRODUCT_SEMANTICS_LEAK**.

## Recommended asset disposition

| Candidate | Classification | Recommended disposition |
| --- | --- | --- |
| `forest-route-default-v1.svg` | **VISUALLY_SAFE_IF_SEAM_SHIPS** | optional neutral fallback after Lead-owned slot activation |
| `forest-route-logging-road.svg` | **VISUALLY_SAFE_IF_SEAM_SHIPS** | route-specific candidate after logging-road seam exists |
| `forest-route-old-boundary.svg` | **TOO_SPECIFIC** + **NEEDS_GENERIC_FALLBACK** | do not activate; use neutral fallback until revised/approved |

## Runtime firewall

Even a visually safe asset must not:
- alter route conditions;
- consume gameplay RNG;
- mutate Save;
- change Activity progress/endurance;
- alter result selection;
- add a world fact;
- change Lumber Hard Work.

Media remains presentation-only.

## Result-media boundary

PR47/48 already provide project-owned static media for Forest result/return states.

Route SVG candidates are active-route presentation sources, not result/reaction replacements.

Do not overwrite:
- `activity/forest/return/success`;
- `activity/forest/return/escape`;
- `activity/forest/return/failure`.

## Audit conclusion

The generic and logging-road SVG candidates are visually compatible with current semantics if the route presentation seam ships.

The old-boundary candidate should remain source-only because its constructed central feature is more specific than the currently authorized stones/marks boundary presentation.
