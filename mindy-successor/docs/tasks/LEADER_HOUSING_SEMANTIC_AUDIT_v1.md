# Leader 1 — live housing semantic audit v1

Status: **RESEARCH / PRODUCT GAP — NOT YET RUNTIME AUTHORITY**

Purpose: verify whether current live `normal / cheap / street` lodging tiers have distinct mechanical value before final economy tuning.

Audited against current `main` after shared Hard Work Meta merge.

## 1. Live lodging definitions

Current executable definitions:

| Tier | Cost | Immediate effects | Next-day Energy | Next-day stat effect |
| --- | ---: | --- | ---: | --- |
| normal | 100 | none | 0 | none |
| cheap | 50 | none | 0 | none |
| street | 0 | none | -1 | Grooming -1 |

All three lodging options have empty availability conditions.

Therefore normal and cheap are always mutually available whenever the player can afford them.

## 2. Night Study access

All current School Night Study choices use the same housing condition:

`housingTier == normal OR housingTier == cheap`.

No School Night Study choice requires normal specifically.

So normal does not buy additional School/Night Study access.

## 3. Ordinary voluntary Night choices

Current career/relationship Night choices generally gate on:
- career stage;
- relationship stage/choice;
- item capability;
- route state.

They do not use normal-vs-cheap housing as an additional gate.

Examples include:
- Lumber Foreman talk;
- Satyr recurring guest / staff debrief;
- Undead Farm keeper / process notes;
- Tavern traveler / house notes;
- Artist-Geisha rehearsal, salon and mentor review;
- Prostitute client follow-up;
- Assassin covert notes.

Many of these can fictionally occur at work/public/professional locations, so this audit does **not** claim that all should be room-gated.

It does prove that paying 100 rather than 50 currently does not unlock them.

## 4. Full pack scan

Leader scanned all **88 current content pack JSON files** for structural:
- `housingTier`;
- legacy `housing`;
- `setHousing`

conditions/effects.

Housing-sensitive authored content is concentrated in:
- poverty cheap/street packs;
- poverty closure;
- Tavern housing assistance;
- Guard city poverty context;
- Hunter career housing variants;
- Merchant poverty context;
- Prostitute cross-system context;
- one legacy shelter event.

### Normal-specific authored content

Exactly one current pack event is normal-only:

`poverty-closure-production-v14.normal-tight-budget`

Conditions:
- housingTier normal;
- money <= 100.

Its only choice:
`keep-plan`

has **no effects**.

So the only normal-exclusive authored event is narrative acknowledgment, not mechanical value.

### Cheap-specific authored content

Cheap has:
- seasonal shared-room context;
- cheap-room closure/budget scenes;
- School Night Study access;
- Tavern/Guard/Hunter/Merchant poverty-aware variants.

These are mostly contextual, but they mean cheap is at least as richly represented as normal.

### Street-specific authored content

Street has:
- base Energy -1;
- base Grooming -1;
- multiple poverty pressure/recovery/seasonal scenes;
- occasional small opportunities;
- route-specific variants.

Street is mechanically and narratively distinct.

## 5. Dominance result

Under current executable rules:

**normal lodging is mechanically dominated by cheap lodging.**

For an extra 50 money per night, normal currently provides:
- no additional Energy;
- no stat protection beyond what cheap already has;
- no extra School access;
- no generic Night-choice access;
- no item/storage mechanic;
- no relationship/private-scene mechanic;
- no progression fact;
- no mechanical event reward.

The one normal-only event is effect-free.

Therefore a rational player who is choosing only on mechanics should choose cheap whenever both are available.

This is especially important because current live wages are already low relative to lodging and School prices. Paying an extra 50 for no mechanical benefit worsens the economy without adding a meaningful decision.

## 6. What should NOT be done blindly

Do not fix this by:
- globally blocking all career/relationship Night choices on street;
- copying original rent escalation;
- granting normal +1 Energy every day without balance simulation;
- making cheap intrinsically punitive only to justify normal;
- hiding the distinction in flavor text.

Many Night choices happen at work/public locations, and a broad +1 Energy reward would be a major action-economy change.

## 7. Product options for a later lock

A production fix should give normal a **directed, legible advantage** rather than simply making cheap worse.

Candidate directions for a dedicated decision packet:

### A. Private-space access
Normal enables a small set of explicitly private authored Night/relationship choices.
Cheap keeps public/workplace choices and all current School Night Study.
Street keeps public/workplace choices only.

This requires an allowlist, not a global "relationship = private" rule.

### B. Storage / preparation utility
Normal provides a bounded run-local utility:
- safe storage;
- preparation slot;
- limited item protection/organization;
- another narrow non-Energy benefit.

This avoids broad action-economy inflation.

### C. Rest reliability
Normal could protect against a narrow class of ordinary lodging-related negative contexts, without overriding authored forced Nights such as Secret Debt.

Any version must explicitly preserve:
- Secret Debt forced Night precedence;
- D30 reward interactions;
- no Palace bypass;
- no automatic cancellation of route-specific Night consequences.

## 8. Recommended next step

Before final economy numbers are locked, produce a small Product packet comparing:
1. private-space access;
2. bounded storage/preparation utility;
3. a narrowly bounded rest/recovery benefit.

Evaluate each against current live wages:
- normal 100;
- cheap 50;
- street 0;
- starter wages in the mid-teens / low twenties;
- School 300–500.

The target is not to make normal mandatory. The target is to remove the current strict dominance where cheap gives the same functional lodging value for half the price.

## 9. Regression requirement for any future fix

Any approved housing differentiation must test:
- normal has at least one explicit functional advantage;
- cheap remains a viable budget strategy;
- street remains meaningfully harsher without becoming route-dead;
- School Night Study behavior changes only if explicitly approved;
- public/workplace Night choices remain available where fiction/mechanics justify them;
- forced Secret Debt Night cannot be cancelled by housing tier;
- save/reload preserves any new housing utility state exactly.
