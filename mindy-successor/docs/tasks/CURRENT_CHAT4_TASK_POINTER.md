# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — NIGHT SYSTEM COMPLETENESS AUDIT v8**
Owner: Chat 4

Strong-Meta runtime producer v7 current frozen candidate:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Leader will separately perform current-main assembly acceptance. Do not mutate that frozen head further.

## New assignment

Audit Night as a **full 1.0 gameplay system**, not just Sleep + School.

New branch:
`chat4/night-system-completeness-audit-v8`

Read:
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`;
- `HOUSING_AND_NIGHT_BALANCE_v1.md`;
- all 10 career drafts;
- Secret Debt draft + D19;
- Palace D29/v11 contract;
- D20 Body Confidence rule;
- D35 normal-lodging private-space rule;
- current executable `definitions.json` and all Night-related packs.

Current executable baseline at last Leader audit:
- 37 voluntary Night choices;
- 1 ordinary Sleep;
- 24 School Night Study choices;
- 12 career/relationship Night choices;
- forced Secret Debt Night is Product-locked but not complete 1.0 production;
- Palace Night is optional and must lose to forced Secret Debt Night.

## Deliverables

Create:
1. `mindy-successor/docs/tasks/CHAT4_NIGHT_SYSTEM_COMPLETENESS_AUDIT_v8.md`
2. `mindy-successor/research/night_system_coverage_v1.csv`

Inventory every current Night surface and map it to:
- housing tier;
- career;
- relationship;
- School;
- Activity/camp;
- forced/voluntary;
- consumesNight?;
- next-day effect;
- progression fact/counter;
- presentation binding;
- current implementation status.

Then produce a **10-career Night matrix**.

For each ordinary profession answer:
1. current Night choices;
2. professional/non-romantic continuation;
3. optional relationship/romance continuation;
4. School transfer/reflection;
5. housing/private-space opportunities;
6. Activity/camp hook;
7. route/ending contribution;
8. missing 1.0 surfaces.

Special required audits:
- Hunter, Guard and Merchant current Night gaps;
- D35 initial private-space seed surfaces:
  Satyr Maid recurring guest,
  Tavern recurring traveler,
  Prostitute recurring client;
- Secret Debt forced-Night interception and next-day Energy -1 ordering;
- Palace optional Night precedence;
- no forced-route semantics leaking into ordinary Prostitute content;
- no relationship route treating consent/confidence as the same state;
- save/reload at pending Night boundaries;
- exactly-one calendar advance.

Compare minimum 1.0 Night coverage bars such as:
- 1 professional continuation + 1 optional personal/relationship continuation per major career;
- richer exceptions for careers whose fantasy strongly depends on Night;
- no filler quota if a different authored pattern is stronger.

Recommend an exact minimum coverage rule, but do not lock it yourself.

Also identify which missing Night surfaces are:
- content-only;
- require new relationship state;
- require housing/private-space support;
- require forced-Night runtime;
- require Palace runtime.

No production code changes.
No full CI.

Freeze exact SHA and report:
`READY_FOR_LEADER_PRODUCT_DECISION`.
