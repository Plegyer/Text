# Chat 3 — D38 Activity Ending Family Producer v16-r1

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/activity-ending-family-producer-v16-r1`  
Exact base: `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`  
Implementation head before this documentation commit: `884bc0fb2155af4f7508f69db7aea8fc6dbfcd37`

> Final frozen SHA is reported after this documentation commit.

## Scope

v16 implements the locked D38 standalone Large Activity ending family on top of the complete four-region D36 production baseline.

Stable ending IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

Stable Specialist reward IDs:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

No duplicate Strong Meta registry/runtime was added on this historical cumulative branch.

## Common D38 eligibility

All three endings require the exact common baseline:

- at least **3 of 4** regional anchors:
  - `activity.forest-frontier.anchor-secured`
  - `activity.trade-corridor.anchor-secured`
  - `activity.anomalous-reach.anchor-secured`
  - `activity.restricted-sites.anchor-secured`
- successful specialized mechanics from at least **2 distinct mini-game families**:
  - Tracking Triangulation:
    - `forest.frontier.tracking-triangulated`
    - or `trade.corridor.tracking-verified`
  - Pattern / Ritual Circuit:
    - `activity.anomalous-reach.minigame.pattern-ritual-complete`
  - Infiltration / Suspicion:
    - `activity.restricted-sites.minigame.infiltration-suspicion-complete`
- at least one meaningful extracted Activity result:
  - `activity.trade-corridor.result.sample-secured`
  - or `activity.anomalous-reach.result.sample-secured`
  - or `activity.restricted-sites.result.evidence-secured`
- at least one resolved Activity contact/network thread represented by a production Network marker.

There is no ordinary Hard Work requirement and no Palace requirement.

Eligibility remains non-terminal. The existing D16 ending flow still requires explicit commit and central completion.

## Marked-anchor exactness

D38 says the additional Pathfinder / Preservation / Network requirement is a count of **marked regional anchors**, not a count of free-floating marker facts.

The v16 authored conditions therefore pair, per region:

`regional anchor + same-region classification marker`

before counting that region toward the ending-specific minimum of two.

This closes the case where a marker could be authored before the regional anchor was actually secured.

## Pathfinder / Mapping

Ending:

`ending.activity.pathfinder`

Additional eligibility:

- at least **2** completed Pathfinder-marked regional anchors in distinct regions;
- at least one successful Tracking Triangulation.

Permanent ownership seam:

`specialist.activity.surveyors-atlas`

The ending's explicit Meta reward is an `unlock` whose `rewardId` and `unlock` are both the stable Specialist ID.

The machine-readable binding contract records the locked D38 mechanic:

- once per D36 region per run;
- first authored route-survey/discovery action that normally costs exactly 1 Field Time may cost 0;
- maximum direct saving 4 Field Time per run;
- only normal survey information is revealed;
- no region/capability/season/ending bypass and no automatic encounter or anchor resolution.

## Preservation / Research

Ending:

`ending.activity.preservation`

Additional eligibility:

- at least **2** completed Preservation-marked regional anchors in distinct regions;
- successful Pattern / Ritual Circuit;
- at least one research-grade result:
  - `activity.forest-frontier.result.research-grade`
  - `activity.anomalous-reach.result.research-grade`
  - `activity.restricted-sites.result.research-grade`

Permanent ownership seam:

`specialist.activity.field-archive`

The machine-readable binding contract records:

- once per region per run;
- only a legally obtained result explicitly tagged `activity-secure-eligible`;
- mark one carried result Secured at a stable Activity checkpoint;
- Secured survives later escape/failure from that Activity entry;
- maximum 1 per region, 4 per run;
- no result creation/duplication, challenge/capability waiver, consumable refund, cross-life generic inventory, or implicit system-critical bypass.

## Network / Access

Ending:

`ending.activity.network`

Additional eligibility:

- at least **2** completed Network-marked regional anchors in distinct regions;
- successful Infiltration / Suspicion;
- a real network-capable Activity contact is required through the same production Network markers.

Permanent ownership seam:

`specialist.activity.contact-network`

The machine-readable binding contract records:

- region must already be normally unlocked;
- exactly one authored `activity-network-introduction` per region per run;
- maximum 4 introductions per run;
- no bypass of region unlock, career stage, ordinary Hard Work, relationship stage, item capability, Palace, Secret Debt, or ending eligibility.

## Strong Meta / D28 assembly seam

This historical branch intentionally does **not** implement a second active-Specialist registry or loadout runtime.

Instead:

1. first completion records permanent ownership through the stable Specialist unlock ID;
2. `content/activity-ending-family-v16.fixture.json` records the exact locked Specialist mechanics and firewalls;
3. Chat 2 binds those IDs into the canonical current-main Strong Meta Specialist system.

The fixture explicitly preserves:

- class = Specialist;
- slot cost = 1;
- normal D28 active capacity = 0..2 total;
- no Activity-only bonus slot;
- selectable, not automatic active bonuses.

## RU / EN functional copy

Production root localization now includes RU and EN copy for:

- all three Activity ending titles;
- all three Activity ending descriptions;
- all three Specialist inheritance labels;
- all three Specialist functional mechanic descriptions.

Functional names remain intentionally non-lore-final where D38 leaves final player-facing lore ownership to content.

## Firewalls preserved

v16 does not change the four D36 Activity definitions.

Static comparison against frozen v15 confirms all Activity definitions are JSON-identical.

The following core runtime files are byte/blob unchanged from frozen v15:

- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/hardWorkMeta.ts`

Therefore this producer branch adds no new Strong Meta runtime, no universal Activity XP, no Energy model changes, and no Night/Secret Debt runtime changes.

The four production Activity entry costs remain exactly **2 Energy**.

D38 ending definitions do not read or write Palace state, Hard Work state, Activity XP, or Secret Debt state.

## Files added / changed

Added:

- `content/activity-ending-family-v16.fixture.json`
- `tests/activity-ending-family-v16.test.ts`
- this handoff document

Changed:

- `content/definitions.json`
- `content/localization.json`

No other runtime/content file was changed by the v16 implementation commit.

## Focused QA authored

`tests/activity-ending-family-v16.test.ts` covers:

- exact three stable ending IDs;
- exact three stable Specialist reward IDs;
- exact explicit unlock ownership seams;
- positive readiness matrix for Pathfinder;
- positive readiness matrix for Preservation;
- positive readiness matrix for Network;
- negative common 3/4-anchor case;
- negative one-mini-game-family case;
- negative missing-extraction case;
- negative missing-contact case;
- negative marker-without-same-region-anchor case;
- negative one-Pathfinder-marked-anchor case;
- negative missing research-grade result;
- negative one-Network-marked-anchor case;
- D16 non-terminal eligibility;
- reward not granted at commit;
- reward granted only at ending completion;
- one normal ending commit per life;
- four-region 2-Energy entry invariant;
- Palace / Hard Work / Activity-XP / Secret-Debt static firewalls;
- D28 max-two/no-bonus-slot assembly seam;
- RU/EN functional copy coverage.

## Machine audit performed through GitHub connector

No full CI was initiated.

A focused static producer audit was run against implementation commit
`884bc0fb2155af4f7508f69db7aea8fc6dbfcd37`.

Result:

- **96 / 96 PASS**
- **0 failures**

The audit verifies:

- all pre-v16 endings unchanged;
- all four Activity definitions unchanged;
- `engine.ts`, `schema.ts`, `hardWorkMeta.ts` unchanged from frozen v15;
- exact ending/reward IDs;
- exact unlock ownership seams;
- all four Activity entry costs = 2;
- all three positive D38 matrices;
- all focused negative matrices;
- strict marked-anchor pairing;
- every worldFact referenced by D38 conditions exists in the four-region production source;
- no Palace / Hard Work / Activity XP / Secret Debt dependency in the new ending definitions;
- all required RU/EN localization keys are populated;
- D28 / Chat2 Strong Meta binding markers are present.

## Executable QA status

The GitHub connector available to Chat 3 does not provide a shell runner for this private branch.

Therefore v16 does **not** claim execution of:

- `npm run typecheck`
- `npm run validate`
- `npm run build`
- Node test runner
- prior executable Activity regressions

Those focused executable checks remain the Chat 2 assembly gate.

No full CI was started and nothing was merged to `main`.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
