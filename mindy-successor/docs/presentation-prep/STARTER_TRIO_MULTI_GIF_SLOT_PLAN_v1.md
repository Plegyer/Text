# Starter Trio Multi-GIF Slot Plan v1

Purpose: plan 3–5 visual candidates for each already-shipped starter-trio repeatable seasonal shift surface.

This is media-production planning only.

Candidate counts are not gameplay rules.

## Pool pattern

Recommended planning target per seasonal shift surface: **4 candidates**.

Composition:
- **2 reusable cross-season candidates** — career-specific base work motions that can appear in multiple seasons;
- **2 dedicated seasonal candidates** — visible context specific to the authored season.

This gives enough visual variation without requiring every motion to be commissioned four times.

A producer may ultimately deliver 3–5 candidates, provided fallback remains safe and semantic identity stays unchanged.

---

# Lumber

Current fallback for every seasonal slot:
`assets/stage-lumber.svg`

Visual variation can be produced immediately: **YES**.

## Spring

**presentationId**
`job/lumber/shift/spring/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- base Lumber manual-work loop A;
- base Lumber timber-handling/work loop B.

**Dedicated spring candidates**
- spring access/mud/new-growth work context A;
- spring access/mud/new-growth work context B.

**Content context**
Spring Lumber work with difficult access, water/mud and renewed forest activity.

## Summer

**presentationId**
`job/lumber/shift/summer/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- same career base loop A;
- same career base loop B.

**Dedicated summer candidates**
- heat/high-productivity context A;
- heat/fire-risk/distant-work context B.

**Current fallback**
`assets/stage-lumber.svg`

**Visual production now**
YES.

## Autumn

**presentationId**
`job/lumber/shift/autumn/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- base work loop A;
- base work loop B.

**Dedicated autumn candidates**
- demand/logistics context A;
- stock-preparation/seasonal-work context B.

**Current fallback**
`assets/stage-lumber.svg`

**Visual production now**
YES.

## Winter

**presentationId**
`job/lumber/shift/winter/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- base work loop A;
- base work loop B.

**Dedicated winter candidates**
- frozen-access/harsh-condition context A;
- winter timber/contract context B.

**Current fallback**
`assets/stage-lumber.svg`

**Visual production now**
YES.

---

# Satyr Maid

PR34 source:
`satyr-maid.shift`

Current fallback for all seasons:
`assets/stage-tavern.svg`

Visual variation can be produced immediately: **YES**.

## Spring

**presentationId**
`job/satyr-maid/shift/spring/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- generic satyr-bar service loop A;
- table/service/cleanup loop B.

**Dedicated spring candidates**
- new-traveller/busy-table context A;
- spring service context B.

**Current fallback**
`assets/stage-tavern.svg`

## Summer

**presentationId**
`job/satyr-maid/shift/summer/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- service loop A;
- table/service loop B.

**Dedicated summer candidates**
- late-evening busy-room context A;
- continuous high-service-load context B.

**Current fallback**
`assets/stage-tavern.svg`

## Autumn

**presentationId**
`job/satyr-maid/shift/autumn/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- service loop A;
- table/service loop B.

**Dedicated autumn candidates**
- festival-traffic service context A;
- crowd-management context B.

**Current fallback**
`assets/stage-tavern.svg`

## Winter

**presentationId**
`job/satyr-maid/shift/winter/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- service loop A;
- table/service loop B.

**Dedicated winter candidates**
- warm-table regular-customer context A;
- quieter winter room/service context B.

**Current fallback**
`assets/stage-tavern.svg`

---

# Undead Farm

PR34 source:
`undead-farm.shift`

Current fallback for all seasons:
`assets/stage-forest.svg`

Visual variation can be produced immediately: **YES**.

## Spring

**presentationId**
`job/undead-farm/shift/spring/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- generic farm-production loop A;
- tending/sorting/maintenance loop B.

**Dedicated spring candidates**
- wet-ground/fresh-growth context A;
- unstable magical-shoot context B.

**Current fallback**
`assets/stage-forest.svg`

## Summer

**presentationId**
`job/undead-farm/shift/summer/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- farm-production loop A;
- tending/maintenance loop B.

**Dedicated summer candidates**
- fast-growth context A;
- heavy-maintenance / living-and-undead work context B.

**Current fallback**
`assets/stage-forest.svg`

## Autumn

**presentationId**
`job/undead-farm/shift/autumn/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- farm-production loop A;
- tending/maintenance loop B.

**Dedicated autumn candidates**
- harvest/sorting context A;
- processing/storage-preparation context B.

**Current fallback**
`assets/stage-forest.svg`

## Winter

**presentationId**
`job/undead-farm/shift/winter/default`

**Target candidate count**
4.

**Reusable cross-season candidates**
- farm-production loop A;
- maintenance loop B.

**Dedicated winter candidates**
- storage/repair indoor context A;
- preserved-material work context B.

**Current fallback**
`assets/stage-forest.svg`

---

# Stable result/default surfaces

Existing:
- `job/lumber/result/default`
- `job/satyr-maid/result/default`
- `job/undead-farm/result/default`

Planning target if result pools are desired:
**3 candidates** each.

Recommended composition:
- 2 reusable completed-work/result candidates from the career's shift media;
- 1 optional dedicated completed-shift result candidate.

Dedicated result media is optional polish.

Current static fallbacks remain:
- Lumber -> `assets/stage-lumber.svg`;
- Satyr Maid -> `assets/stage-tavern.svg`;
- Undead Farm -> `assets/stage-forest.svg`.

# Selection invariant

For every seasonal slot:
- semantic `presentationId` remains one identity;
- pool selection changes only visual media;
- season is already selected by gameplay/content scene identity;
- choosing candidate A vs B must not change wage/effects/progression;
- missing one candidate falls through;
- animations-off uses static fallback.

# Immediate production summary

| Career | Seasonal surfaces ready | Planned candidates / season | Reusable cross-season | Dedicated seasonal | Current fallback | Can produce now |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Lumber | 4 | 4 | 2 | 2 | `stage-lumber.svg` | YES |
| Satyr Maid | 4 | 4 | 2 | 2 | `stage-tavern.svg` | YES |
| Undead Farm | 4 | 4 | 2 | 2 | `stage-forest.svg` | YES |

No NPC, ending, route or art-style decision is required for this shift-level visual variation.
