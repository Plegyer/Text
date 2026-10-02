# Assassin Runtime Prep v17 — C1D-192 Rebuild / Collision Ledger

Status: **SAFE PREP COMPLETE / NOT FROZEN / NOT QA-READY**

Activation checkpoint: `8c8b88e2518549cf43e1373638216e4a072c0484`  
Runtime/test prep head before this ledger commit: `986bd75f58a27e9ce2962ea9f47844064bdaf3e4`  
Observed current `main` during C1D-192: `4eba381c160ccd5b2dc539b09b98e727207c6aee`

## Exact prep delta before ledger

Compare activation -> runtime/test prep head:
- 4 commits ahead / 0 behind;
- 13 changed files;
- additive Assassin files: runtime contract, 7 packs, 3 tests;
- shared prototype edits: `content/definitions.json`, `src/core/schema.ts`.

Changed files:
- `mindy-successor/docs/tasks/ASSASSIN_RUNTIME_PREP_CONTRACT_v1.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-activity.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-career.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-contract.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-cross-system.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-items.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-relationship.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/assassin-routes.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/schema.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/assassin-boundaries.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/assassin-natural-acceptance.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/assassin-runtime-invariants.test.ts`

This ledger is the fourteenth prep file.

## Collision inventory

Against observed current `main@4eba381c...` since activation:
- direct changed-file intersection: **none**.

Against accepted/held Artist layers that are expected to feed post-Artist main:
- Artist runtime PR #234: collision on `content/definitions.json` and `src/core/schema.ts`;
- Artist School PR #232: no changed-file intersection;
- Artist authored PR #229: collision on `content/definitions.json`;
- Artist presentation PR #237: no changed-file intersection.

Therefore this prep branch must **not** be merged wholesale as the final Assassin candidate.

## Exact rebuild rule

After Artist/Geisha is fully integrated and shipped:

1. re-query exact current `main` and create/rebuild the final Assassin candidate from that exact post-Artist head;
2. copy the additive Assassin-only contract/packs/tests only after checking that no production Assassin IDs were introduced by another accepted layer;
3. replay `definitions.json` semantically onto the post-Artist file:
   - preserve all accepted Artist and existing career/quest/relationship/item/Activity definitions;
   - replace only the minimal pre-existing Assassin `runner` machine with the prep state machine if still authorized;
   - add only the provisional `assassin.contract`, `assassin.handler`, four narrow item definitions, and `assassin.infiltration` Activity after collision review;
   - preserve shipped `assassin.shift` and `ending.assassin.hard-work` byte/semantic invariants;
4. replay `schema.ts` by appending only the four Assassin item IDs to the then-current item enum; never replace the post-Artist enum wholesale;
5. re-run authority tests and re-audit all Guard/Tavern/Merchant reads as read-only Assassin inputs;
6. keep all five School mappings capability-only with producer threshold/public fact still null unless separate School authority exists at rebuild time;
7. re-run natural acceptance from a clean save: Year-3 fallback, real shifts, four-season breadth, contract save/reload, handler refusal safety, 50 shifts -> Hard Work, no forced late-route commitment;
8. run the full required exact-head workflow. Only one **executed full SUCCESS** may support a later production freeze.

## Prep authority boundaries

Implemented as prep:
- Runner -> Operative -> Trusted Blade and provisional late career stages;
- one deterministic, save-safe contract lifecycle with execute/abort/redirect and method families stealth/social/staged/indirect/refusal;
- no target identity and no lethal/nonlethal rule;
- professional handler relationship with cooperation/rivalry/refusal and refusal-safe continuation;
- four narrow Assassin-local item capabilities;
- selective advanced `assassin.infiltration` Activity; ordinary `assassin.shift` remains city-side;
- Guard/Tavern/Merchant shipped facts are read-only and only produce Assassin-local facts;
- Refusal Chain exact readiness threshold remains unproduced/open rather than invented;
- no Morality stat, combat subsystem, global black market, Palace bypass, or new public complex Assassin ending ID.

## Validation evidence

Static C1D-192 audit on prep head:
- 7 Assassin packs;
- 36 Assassin events;
- 9 Assassin career stages / 8 transitions;
- 8 contract quest stages / 9 transitions;
- 5 handler stages / 6 transitions;
- 4 narrow Assassin item definitions;
- one advanced `counter.v1` Activity with exact success/escape/failure results;
- no typed capability/read/write mismatches found by the prep audit.

Required GitHub workflow evidence is currently infrastructure-blocked, not green:
- #1041 / id `36991305389`: FAILURE before runner steps;
- #1048 / id `36991655448`: FAILURE before runner steps;
- #1049 / id `36991887556`: FAILURE before runner steps;
- #1051 / id `36992026421`: FAILURE before runner steps;
- observed jobs expose `steps=null`, so validator/build/tests did not execute.

Do not mutate runtime code merely to provoke another workflow. Hold the exact prep head after C1D-192 unless a concrete code/authority blocker or explicit Lead request appears.

**No production freeze is claimed by this document.**
