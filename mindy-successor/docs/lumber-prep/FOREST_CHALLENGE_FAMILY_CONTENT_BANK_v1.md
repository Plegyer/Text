# Forest Challenge Family Content Bank v1

Status: CONTENT_DRAFT bank for the three authoritative Lumber Forest challenge families.

This file adds reusable challenge prose and presentation hooks only. It does not choose success formulas, stat thresholds, rewards, public fact IDs, item consume rules, or terminal outcome IDs.

## Shared challenge boundary

Authoritative Activity:
`lumber.forest`

Authoritative challenge families:
1. navigation;
2. physical obstacle;
3. interpretation / ritual anomaly.

Every future production challenge must preserve:
- stable challenge identity;
- stable route context;
- explicit player-selected approach;
- deterministic checkpoint after resolution;
- no extra daily Energy cost inside Activity unless current Activity contract explicitly owns it;
- no reload reroll;
- no fourth terminal outcome.

Terminal results remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Family A — navigation

Allowed future dependency categories:
- Wits;
- Reason;
- Hunter-owned public knowledge;
- navigation capability;
- season.

No exact threshold/check is authored here.

### Variant A1 — split trail

The route divides around a stand of young trees.

Left:
- older footprints;
- softer ground;
- signs of recent passage.

Right:
- firmer footing;
- fewer tracks;
- a line that appears to keep elevation.

The scene should present a genuine route/information decision when production mechanics are authored.

Presentation hook:
`forest/challenge/navigation/split-trail`

### Variant A2 — lost horizon

The canopy blocks any long view.

The heroine must rely on smaller evidence:
- slope;
- wind;
- moss;
- water sound;
- remembered turns.

Draft line:

> The forest has not hidden the way. It has reduced the answer to details.

Presentation hook:
`forest/challenge/navigation/lost-horizon`

### Variant A3 — crossed tracks

Fresh tracks cross the current path.

They may belong to:
- workers;
- hunters;
- animals;
- the heroine's own earlier route.

The challenge is interpretation of route information, not combat.

Presentation hook:
`forest/challenge/navigation/crossed-tracks`

### Variant A4 — washed markers

Rain or runoff has erased the clearest signs.

Only partial markers remain:
- a broken twig line;
- disturbed stones;
- bark scrape;
- compacted mud.

Presentation hook:
`forest/challenge/navigation/washed-markers`

### Variant A5 — ridge choice

One route climbs to a ridge with better visibility.

Another stays lower and appears shorter.

Production may later assign different resource/risk paths.

No numeric cost is authored here.

Presentation hook:
`forest/challenge/navigation/ridge-choice`

## Navigation approach-language bank

Possible player-facing approach labels, not canonical IDs:
- **Read the ground**
- **Climb for a better view**
- **Follow the water**
- **Trust the marked route**
- **Use what you know about the trail**

Any approach requiring a fact/capability must use an authoritative condition when implemented.

## Family B — physical obstacle

Allowed future dependency categories:
- Strength;
- Endurance;
- Dexterity;
- `cross_rough_route`;
- `cut_heavy_wood`;
- season.

No success threshold or consume rule is authored here.

### Variant B1 — fallen trunk

A large trunk lies across the route at an awkward angle.

Possible mechanical approach families later:
- climb;
- go around;
- cut/clear with accepted capability;
- find a safer crossing point.

Presentation hook:
`forest/challenge/physical/fallen-trunk`

### Variant B2 — washed bank

Part of the path has collapsed into a shallow ravine.

The opposite edge is reachable, but not by simply walking forward.

Possible authored options later:
- descend and climb;
- use rope capability;
- detour;
- retreat.

Presentation hook:
`forest/challenge/physical/washed-bank`

### Variant B3 — tangled deadfall

Branches and broken trunks have formed a dense barrier.

The obstacle rewards:
- leverage;
- careful footing;
- accepted cutting capability;
- patience.

No effect magnitude is selected.

Presentation hook:
`forest/challenge/physical/deadfall`

### Variant B4 — slick stones

A stream crossing is shallow but unstable.

The challenge is not the water depth.

It is footing.

Possible future dependency categories:
- Dexterity;
- rope;
- alternate route knowledge.

Presentation hook:
`forest/challenge/physical/slick-stones`

### Variant B5 — steep root slope

A slope is threaded with exposed roots.

Some are strong enough to hold weight.

Some are not.

Possible future approaches:
- climb directly;
- secure a route;
- take a longer path.

Presentation hook:
`forest/challenge/physical/root-slope`

## Physical approach-language bank

Possible labels:
- **Climb carefully**
- **Clear a way**
- **Use the rope**
- **Take the longer detour**
- **Test each foothold**

No label creates an item consume rule by itself.

## Family C — interpretation / ritual anomaly

Allowed future dependency categories:
- Reason;
- Magic;
- accepted School Arcana public fact;
- `preserve_specimen`;
- accepted sample/tool capability;
- season.

No Arcana fact ID or threshold is authored here.

### Variant C1 — repeated knot marks

Thin branches have been tied into repeating knots.

They are too deliberate to be random damage.

They may be:
- markers;
- warnings;
- ritual remnants;
- practical trail signs.

The challenge is to interpret before acting.

Presentation hook:
`forest/challenge/anomaly/knot-marks`

### Variant C2 — ring of stones

A ring of stones sits where roots should have disturbed it years ago.

Nothing visibly moves.

Nothing obviously threatens the heroine.

The anomaly is the persistence of the arrangement.

Presentation hook:
`forest/challenge/anomaly/stone-ring`

### Variant C3 — altered sap

A damaged tree leaks sap with an unusual sheen.

Possible future authored approaches:
- observe;
- compare;
- preserve sample if capability exists;
- leave untouched.

No item/reward is granted in this draft.

Presentation hook:
`forest/challenge/anomaly/altered-sap`

### Variant C4 — sound without source

A low repeated sound carries through the trees.

Its rhythm is regular enough to feel intentional.

Possible interpretation paths:
- natural pattern;
- machinery;
- ritual signal;
- echo from terrain.

Presentation hook:
`forest/challenge/anomaly/source-less-sound`

### Variant C5 — old symbols under moss

Moss hides carved symbols on stone or bark.

The heroine can recognize that they are structured without necessarily understanding them.

Possible future dependencies:
- Reason;
- Magic;
- School Arcana public result.

Exact lore remains OPEN.

Presentation hook:
`forest/challenge/anomaly/old-symbols`

## Interpretation approach-language bank

Possible labels:
- **Study the pattern**
- **Compare the marks**
- **Preserve a sample**
- **Use Arcana knowledge**
- **Leave it undisturbed**

Every gated approach must use accepted typed/public ownership.

## Route binding guidance

### Logging road

Strong fits:
- fallen trunk;
- washed bank;
- crossed tracks;
- old symbols near abandoned work marks.

### Hunter trail

Only after Hunter route production identity/gate is accepted.

Strong fits:
- crossed tracks;
- lost horizon;
- migration-related navigation;
- subtle markers.

Do not invent Hunter clue fact/capability.

### Old boundary

Strong fits:
- old symbols;
- stone ring;
- knot marks;
- altered sap.

The route gate remains `enter_old_boundary`.

Challenge text never consumes the token.

### Generic deep forest

All three families may appear if route ownership is explicit.

## Seasonal presentation opportunities

These scenes support seasonal variants without changing challenge identity.

Examples:
- spring washed bank;
- summer dry ridge;
- autumn crossed migration tracks;
- winter frozen stones.

Topology/effect changes require explicit Activity authoring. Text alone changes nothing.

## Save/reload content contract

When converted to production:
- chosen challenge identity persists;
- selected approach persists after resolution;
- resolved challenge does not reappear;
- presentation variant cannot reroll mechanics;
- item-use transaction, if any, follows the generic exactly-once contract;
- terminal result identity remains separate from challenge identity.

## Multi-GIF pools

Recommended candidate pools:

Navigation:
- path split;
- canopy;
- track close-up;
- ridge/water orientation;
- washed signs.

Physical:
- trunk;
- ravine;
- deadfall;
- stream stones;
- root slope.

Anomaly:
- knot marks;
- stone ring;
- sap/sample;
- sound/forest atmosphere;
- moss-covered symbols.

3–5 media candidates may share one semantic challenge identity.

## Explicitly OPEN

Do not choose here:
- final challenge IDs;
- stat thresholds;
- check formulas;
- RNG probabilities;
- resource/endurance values;
- item consume/retain policy;
- Arcana public fact ID;
- Hunter clue/public fact ID;
- loot;
- lore reward;
- samples;
- new terminal outcomes.

## Hard Work firewall

No challenge family affects:
- Hard Work eligibility;
- `hardWork:lumber`;
- Palace progression.

Lumber Hard Work remains only:
`completed_shifts >= 50`.
