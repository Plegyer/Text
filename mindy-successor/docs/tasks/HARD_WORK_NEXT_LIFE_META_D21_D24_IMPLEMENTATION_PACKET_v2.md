# D21-D24 Hard Work / New Start+ / Palace Meta — Implementation Packet v2

Status: **READY FOR LEADER / PRODUCT DECISION**
Owner: Chat 4
Previous packet evidence: `a73c6ad3fd87e96fad79898fbe65c9b2abf5ebd0`
Audit source: current main `fe59b931c8f432c8aa6b66c4fc1a699195616065`
Branch: `chat4/hard-work-next-life-meta-packet-v2`

Authority:
- `USER_DECISIONS_LOCKED_v1.md` D21, D22, D23, D24;
- D19 Secret Debt domain-lock rule;
- D14/D15 ordinary-career roster and hidden-route separation;
- current runtime/tests at the audited main SHA.

This packet is design/implementation guidance only. It does not modify shared runtime, Chat 5 Secret Debt files, or Chat 6 Palace files.

## 1. Locked v2 model

### D21 — permanent earned state

Completing an ordinary profession through its Hard Work ending permanently:
- adds that ordinary career to the existing `meta.hardWorkProgress` ledger;
- makes that profession available from the start of later lives regardless of its normal stat/year gate;
- unlocks that profession's New Start+ bonus package.

The normal action conditions remain authored and continue to govern profiles that have not earned that profession's Hard Work.

### D22 — selectable profession packages

The ten ordinary profession packages have two breadth classes:

First five, exactly one +5 progression-stat bonus each:
1. Lumber
2. Satyr Maid
3. Undead Farm
4. Tavern
5. Hunter

Later five, up to two separate +5 progression-stat bonuses each:
6. Guard
7. Merchant
8. Artist / Geisha
9. Assassin
10. Prostitute / Professional

On New Start+ the player may activate **any subset** of earned profession packages:
- none;
- one;
- some;
- all ten.

There is no single-slot restriction for these profession packages.

The system must also contain at least one Hard Work Lust bonus. Lust is a separate content axis, not one of the 12 progression stats. Any Lust Hard Work bonus must be at least +3 Lust.

### D23 — Palace gate is per-life, not permanent-meta-only

Palace access requires, for the new life:
1. all ten ordinary Hard Work achievements already earned; and
2. all ten corresponding profession packages selected as active for this life.

Only then:
- an automatic Palace invitation arrives on Day 1;
- the authored invitation/reveal opens Palace access.

No random roll or substitute item can weaken this gate.

### D24 — Palace True Ending x2 is cap-only

When the permanent optional Palace True Ending legacy option is active:
- each of the 12 progression-stat caps is 200 instead of 100;
- current values are not multiplied;
- starting values are not multiplied;
- Hard Work package bonuses are not multiplied;
- the 10 manual allocation points are not multiplied;
- Lust remains outside this x2-cap reward.

## 2. Current runtime facts that v2 must replace or preserve

The executable runtime at `fe59b931...` is unchanged from the v1 audit in the relevant areas.

### Preserve

- `src/core/schema.ts::ordinaryHardWorkCareers` is the exact ten-career ordinary roster.
- Production Hard Work endings use `metaRewards: [{kind:'hardWork', rewardId:'hardWork:<career>', career}]`.
- `completeEndingMutable()` + `applyMetaRewardMutable()` add unique earned careers to `meta.hardWorkProgress`.
- RunResult transaction proof prevents duplicate Meta reward application.
- Protected Meta import merges `hardWorkProgress`.
- Secret Debt remains outside `ordinaryHardWorkCareers`.

Therefore `meta.hardWorkProgress` remains the single permanent source of truth for:
- earned Hard Work careers;
- earned New Start+ profession packages;
- D21 inherited ordinary-career access.

Do not create a parallel permanent “package unlock” ledger.

### Replace

Current `src/core/engine.ts` still contains the superseded automatic reward model:

`applyHardWorkStartingBonuses()`
- auto-applies +3/+3 to two stats for nine Hard Work careers;

`freshSave()`
- auto-adds +600 starting money when Merchant Hard Work is present.

Current tests explicitly assert those old rewards:
- `tests/ordinary-hard-work-meta-production.test.ts`;
- `tests/ending-meta.test.ts`.

D22 supersedes this behavior. Eventual implementation must remove/replace it, not stack the new package effects on top.

### Current Palace behavior is also superseded

Current:
- `palaceAvailable(meta)` returns true from permanent 10/10 `hardWorkProgress`;
- `ensurePalaceUnlock(meta)` projects that into `meta.unlocks['palace']`;
- `meets({kind:'metaUnlock', unlock:'palace'})` special-cases the permanent 10/10 result;
- `tests/hard-work-palace-meta-smoke.test.ts` and `tests/palace-derived-unlock.test.ts` assert that old model.

D23 requires those semantics to change. Permanent 10/10 is now only one half of the gate.

## 3. Current ordinary-career gates

The existing normal gates must remain unchanged.

| Career | Shift action | Normal gate |
| --- | --- | --- |
| Lumber | `lumber.shift` | none / starter |
| Satyr Maid | `satyr-maid.shift` | none / starter |
| Undead Farm | `undead-farm.shift` | none / starter |
| Tavern | `tavern.shift` | `(charm >= 45 && sociability >= 35) || year >= 2` |
| Hunter | `hunter.shift` | `(dexterity >= 25 && endurance >= 20 && wits >= 15) || year >= 2` |
| Guard | `guard.shift` | `(strength >= 30 && endurance >= 30 && manners >= 20) || year >= 2` |
| Merchant | `merchant.shift` | `(wits >= 20 && reason >= 20 && sociability >= 15) || year >= 2` |
| Artist / Geisha | `artist-geisha.shift` | `(creativity >= 35 && manners >= 25 && grooming >= 30) || year >= 3` |
| Assassin | `assassin.shift` | `(dexterity >= 30 && wits >= 25 && reason >= 20) || year >= 3` |
| Prostitute / Professional | `prostitute.shift` | `(sexuality >= 55 && charm >= 40 && sociability >= 35) || year >= 3` |

D21 inherited access bypasses only the normal stat/year gate for the career whose Hard Work was earned.

## 4. Concrete v2 mapping proposal

**PROPOSAL ONLY — AWAITING LEADER / PRODUCT LOCK. DO NOT IMPLEMENT THESE TARGETS YET.**

The proposal uses one +5 progression stat for each first-five package and two +5 progression stats for each later-five package.

| Profession package | Proposed progression-stat effects | Proposed Lust effect | Notes |
| --- | --- | --- | --- |
| Lumber | Strength +5 | — | direct core physical identity |
| Satyr Maid | Grooming +5 | — | service/presentation identity distinct from Tavern |
| Undead Farm | Magic +5 | — | profession-specific supernatural identity |
| Tavern | Sociability +5 | — | direct public/social-service identity |
| Hunter | Dexterity +5 | — | field precision/mobility identity |
| Guard | Endurance +5; Manners +5 | — | sustained duty + disciplined public conduct |
| Merchant | Wits +5; Reason +5 | — | negotiation judgment + commercial analysis; replaces old +600 direction |
| Artist / Geisha | Creativity +5; Grooming +5 | — | authored/performance identity + presentation discipline |
| Assassin | Dexterity +5; Wits +5 | — | precision + tactical reading |
| Prostitute / Professional | Sexuality +5; Charm +5 | **Lust +3** | voluntary professional identity; Lust is separate from the two progression-stat slots |

The Prostitute proposal intentionally gives:
- two permitted +5 progression-stat bonuses; and
- one separate +3 Lust bonus.

This packet interprets D22 consistently with D1: the “up to two +5 stat bonuses” limit applies to the 12 progression stats, while Lust is a separate axis governed by its own explicit `>= +3` clause.

If Product wants the Lust effect on another profession, or wants Lust to replace one of a later-five +5 progression-stat effects, that placement must be locked before runtime implementation.

## 5. Package data model

Recommended data-driven definition after mapping lock:

```ts
type HardWorkBonusPackage = {
  career: OrdinaryHardWorkCareer;
  statBonuses: Array<{ stat: Stat; amount: 5 }>;
  lustBonus?: number;
};
```

Validation contract:
- every ordinary career appears exactly once;
- first five: `statBonuses.length === 1`;
- later five: `statBonuses.length <= 2`;
- the approved production mapping may use two for each later-five package;
- every stat amount is exactly 5;
- `lustBonus`, when present, is an integer >= 3;
- at least one production package contains a Lust bonus;
- Secret Debt and Palace cannot appear as package careers.

Do not hard-code ten `if/else` reward branches in `freshSave()`.

## 6. Generic New Start+ save/setup representation

Recommended persisted per-life field:

```ts
run.character.creation.activeHardWorkPackages: OrdinaryHardWorkCareer[]
```

Semantics:
- before `finishCreation`: selected New Start+ packages;
- after `finishCreation`: frozen active package set for the entire life;
- new life/restart: defaults to `[]`;
- values must be unique;
- every selected career must already exist in `meta.hardWorkProgress`;
- any subset is legal, including `[]` and all ten earned packages;
- selecting a profession package activates the whole package; individual effects inside a package are not independently toggled.

The same per-life array serves D23. No second “Palace package selection” field is needed.

### Exactly-once setup application

Recommended flow:
1. `freshSave(meta)` creates baseline stats at 1, Lust baseline, normal starting money, 10 allocation points, and `activeHardWorkPackages: []`.
2. setup commands add/remove earned profession package IDs only.
3. stat allocation remains the existing 10-point manual process.
4. `finishCreation` validates the selected subset.
5. `finishCreation` applies each active package's effects exactly once.
6. creation becomes complete and package selection becomes immutable.
7. `creationCompleted` reaction boundary runs after final package effects are present.

Do not apply/reverse package stat effects while the user is toggling checkboxes. Store selection first and apply atomically at `finishCreation`.

## 7. D21 early ordinary-career access

Current `actionAvailable()` evaluates authored action conditions before identifying the ordinary career.

Eventual conceptual ordering must be:

```
if ordinary career is globally/domain locked -> unavailable
else if that career is in meta.hardWorkProgress -> available
else -> evaluate existing authored stat/year gate
```

Important:
- package activation is **not** required for D21 inherited career access;
- Hard Work earned permanently unlocks that career's early availability;
- choosing zero New Start+ packages must not remove the earned early-career access.

This distinction is required by D21 and D23.

## 8. Palace all-ten-active integration

### Split the current permanent helper

Current `palaceAvailable(meta)` conflates permanent completion with current-life access.

Recommended split:

```ts
allOrdinaryHardWorkEarned(meta)
allOrdinaryHardWorkPackagesActive(save)
palaceInvitationEligible(save)
```

Where:

`allOrdinaryHardWorkEarned(meta)`
- true only if every entry in `ordinaryHardWorkCareers` exists in `meta.hardWorkProgress`.

`allOrdinaryHardWorkPackagesActive(save)`
- true only if the per-life active package set contains all ten ordinary careers exactly as valid earned selections.

`palaceInvitationEligible(save)`
- true only when both predicates above are true for the new life.

### Retire permanent Palace projection

D23 means `ensurePalaceUnlock(meta)` must no longer make Palace accessible merely from 10/10 permanent Meta.

Do not use stale permanent `meta.unlocks['palace']` as the new access authority.

Migration should remove/ignore a stale derived Palace unlock when the new D23 semantics are active.

### Day-1 invitation

The current runtime already emits the deterministic `creationCompleted` reaction fact from `finishCreation`.

That is the clean integration boundary for the Palace-owned authored invitation:
- no RNG;
- no extra stat/year requirement;
- check permanent 10/10 + all-ten active;
- deliver the Palace invitation on Day 1;
- invitation resolution opens Palace run access.

There is currently no production Palace content pack in the executable prototype tree. Chat 6 owns Palace authored/runtime content. This packet therefore does not invent:
- the invitation event ID;
- the Palace run-state/fact ID;
- priority class;
- presentation ID.

Shared runtime should expose the selection/gate; Chat 6/Leader should bind the authored invitation/access state.

### `metaUnlock: palace` compatibility

Current `meets()` special-cases `metaUnlock palace` through permanent `palaceAvailable(meta)`.

That must not remain the authority for D23 Palace access.

Recommended integration direction:
- permanent 10/10 completion stays queryable through `metaHardWork` / `allOrdinaryHardWorkEarned`;
- actual Palace access becomes run-scoped after the Day-1 invitation;
- Palace content reads its Palace-owned run-scoped access state rather than a permanent Meta unlock.

## 9. Secret Debt collision ordering

D19 binds and domain-locks **all ten ordinary professions** until real Secret Debt exit.

Required ordering for ordinary work:

1. Secret Debt/global domain lock;
2. D21 inherited Hard Work early-access override;
3. normal authored stat/year gate.

Therefore:
- an earned Lumber/Tavern/etc. Hard Work unlock never bypasses Secret Debt binding;
- active New Start+ packages never bypass Secret Debt binding;
- exiting Secret Debt restores whichever ordinary careers were available from D21 or normal gates;
- ordinary career progress and `meta.hardWorkProgress` remain intact.

### Palace invitation vs Secret Debt

The D23 Palace invitation gate is evaluated from New Start+ setup on `creationCompleted`, not from ordinary-career action availability.

Thus:
- Secret Debt does not count toward the ten earned packages;
- Secret Debt does not substitute for any active package;
- selecting all ten packages does not weaken the later Secret Debt ordinary-career lock;
- a later Secret Debt bind can still lock all ten ordinary jobs even if Palace invitation was earned on Day 1.

Current Product authority does **not** say Secret Debt blocks Palace itself. Do not invent a Palace lock from D19.

For migrated in-progress lives, do not retroactively manufacture a Day-1 Palace invitation. The D23 setup gate begins on the next New Start+ life.

## 10. D24 dynamic stat-cap touchpoints

Current runtime assumes progression-stat cap 100 in several places.

### `src/core/schema.ts`

Current:
- `progressionStatRecord` validates every progression stat with `.max(100)`;
- Lust separately validates `.max(100)`.

D24 requirement:
- saved progression stats must be able to reach 200 when the Palace cap option is active;
- Lust remains capped under its separate existing rule.

Recommended:
- permit storage up to 200 for progression stats;
- add semantic validation that the current life does not exceed its effective progression-stat cap;
- do not raise Lust's schema cap because D24 excludes Lust.

### `src/core/engine.ts::setMetric()`

Current:
- direct progression stats clamp to 100;
- safe aliases of progression stats clamp to 100;
- Lust separately clamps to 100.

Replace progression-stat clamps with one pure helper conceptually:

`progressionStatCap(save) -> 100 | 200`

Only the 12 progression stats/aliases use that helper.

Lust remains capped at 100.

### `src/ui/app.ts`

Current stats panel renders:

`<progress ... max="100">`

It must render the effective progression-stat cap for the current life.

Creation UI must show the real resulting stat values but never multiply:
- base 1;
- manual allocation;
- selected package +5s;
- no x2 multiplication.

### Palace cap option ownership

D24 describes an already-earned optional Palace True Ending legacy reward. Its exact runtime ID/selection representation belongs to the Palace/Meta implementation.

Do not invent that ID in this packet.

The shared stat-cap helper should read the authoritative “Palace x2 cap option active for this life” state once Chat 6/Leader defines it.

## 11. Migration from the old automatic rewards

Current saves may already contain stat/money values produced by:
- old automatic +3/+3 Hard Work bonuses;
- old Merchant +600 starting money.

Migration must not attempt to reverse-engineer and subtract those effects from an already-created life.

For any existing life:
- preserve current stats exactly;
- preserve current money exactly;
- preserve Lust exactly;
- preserve `meta.hardWorkProgress`;
- default `activeHardWorkPackages` to `[]` if the field is absent;
- do not auto-apply new package effects retroactively;
- do not create a retroactive Palace Day-1 invitation.

For the next `newLife` / `restart`:
- generate baseline start without old +3/+3;
- generate baseline money without Merchant +600;
- expose earned packages as selectable;
- apply only selected v2 package effects.

Protected Meta import must continue to union `hardWorkProgress` so earned packages cannot be erased by importing an older life.

If a save schema bump is used, migration should be explicit. If v4 is retained with defaulted fields, equivalent semantic validation is still required.

## 12. Exact current-runtime files/functions to change after mapping lock

### `src/core/schema.ts`

Required:
- extend creation/run setup with active Hard Work package IDs;
- validate unique subset membership;
- add package-definition shape if data-driven in catalog;
- permit progression-stat storage up to 200 for D24;
- retain Lust's separate cap;
- add any generic condition/read contract needed for Palace authored content to inspect active package state.

Keep:
- `ordinaryHardWorkCareers`;
- Hard Work Meta reward schema;
- `meta.hardWorkProgress`.

### `src/core/engine.ts`

Required touchpoints:
- `defaultMeta()`: keep earned ledger; stop relying on derived permanent Palace unlock;
- `palaceAvailable()`: replace/split into permanent completion + per-life all-active predicates;
- `ensurePalaceUnlock()`: retire old permanent-availability projection;
- `meets()`: remove old “metaUnlock palace == permanent 10/10” access semantics;
- `actionAvailable()`: add inherited D21 gate with Secret Debt domain lock above it;
- remove `applyHardWorkStartingBonuses()`;
- `freshSave()`: remove old stat bonuses and Merchant +600; initialize package selection empty;
- `setMetric()`: use D24 effective progression-stat cap for 12 stats/aliases only;
- `dispatch()`: support package selection during incomplete creation;
- `finishCreation`: validate/apply package effects exactly once before `creationCompleted`;
- `parseSave()`: migrate/default package state, validate effective cap, preserve protected Meta.

Keep semantically:
- `completeEndingMutable()` exactly-once reward transaction behavior;
- `applyMetaRewardMutable(kind='hardWork')` as the permanent achievement writer.

### `src/ui/app.ts`

Required:
- creation/New Start+ package checklist supporting none/some/all earned packages;
- package summary showing all effects in each package;
- accessible selected/unselected state;
- no one-slot UI;
- Work panel inheritance label for D21 early access;
- suppress stale unmet normal-gate warning when a career is available through earned Hard Work;
- stats progress max = effective 100/200 cap;
- Palace qualification summary may show “10/10 earned” separately from “10/10 active this life”.

### `content/localization.json`

Add RU/EN text for:
- earned Hard Work package;
- package active/inactive;
- select all / clear all where useful;
- inherited early-career access;
- Palace 10/10 earned but package selection incomplete;
- Palace all-ten-active invitation qualification;
- +5 stat and +3-or-more Lust package effects;
- 100/200 stat-cap state.

### Mapping data

After Product locks the mapping, place a validated data-driven package table in the agreed definitions/config location.

Do not implement this proposal as production mapping before approval.

## 13. Test plan

### A. Earned early-career access

1. Fresh profile, no Hard Work: Day 1 ordinary careers are exactly Lumber, Satyr Maid, Undead Farm.
2. Earn Tavern Hard Work, start later life with Tavern package **inactive**: Tavern is still Day-1 available by D21.
3. Tavern Hard Work does not early-unlock a different unearned career.
4. Repeat for each ordinary career.
5. Save/reload and protected Meta import preserve earned early access.
6. Secret Debt binding defeats inherited early access for all ten ordinary careers.

### B. Package selection — none

With all ten Hard Work achievements earned:
7. select no packages;
8. no v2 Hard Work stat/Lust bonuses apply;
9. old +3/+3 rewards do not appear;
10. Merchant does not gain old +600;
11. all ten ordinary careers are still early-available by D21;
12. Palace invitation is **not** eligible.

### C. Package selection — some

With all ten achievements earned:
13. select a strict subset, e.g. Lumber + Guard + Prostitute;
14. apply exactly those package effects;
15. unselected earned packages apply nothing;
16. Prostitute proposal applies its approved two +5 stat effects and Lust effect only when that package is active;
17. selection survives save/reload during creation without changing stats early;
18. `finishCreation` applies effects exactly once;
19. reload after creation does not duplicate;
20. Palace invitation is not eligible with fewer than ten active packages.

### D. Package selection — all

With all ten achievements earned:
21. select all ten package IDs;
22. all ten package definitions apply exactly once;
23. all ten active + 10/10 earned makes `palaceInvitationEligible` true;
24. `creationCompleted` deterministically produces the Palace Day-1 invitation through the Palace-owned content seam;
25. no RNG controls the invitation;
26. invitation opens run-scoped Palace access;
27. Secret Debt does not count as an eleventh/substitute package.

### E. Invalid selections

28. selecting an unearned package is rejected;
29. duplicate package IDs are rejected or canonicalized to unique before save validation;
30. a profile with only nine Hard Work achievements cannot select a valid ten-package set;
31. all earned packages active when fewer than ten are earned does not satisfy D23.

### F. Palace gate migration

32. old `meta.unlocks=['palace']` without D23 conditions does not grant current-life Palace access.
33. ten earned + only nine active does not grant access.
34. ten earned + ten active grants Day-1 invitation, not immediate silent access.
35. migrated old current life does not receive a retroactive Day-1 invitation.

### G. D24 cap-only reward

36. cap option inactive -> progression-stat cap 100.
37. cap option active -> progression-stat cap 200.
38. activating cap option does not multiply existing values.
39. activating cap option does not multiply base start.
40. activating cap option does not multiply 10 manual allocation points.
41. activating cap option does not multiply Hard Work +5 package bonuses.
42. Lust cap/behavior is unchanged by D24.
43. save/reload accepts 101..200 only when the effective progression-stat cap for that life is 200.
44. UI progress maxima match 100/200.

## 14. Existing tests that must be revised

At implementation time:

- `tests/ordinary-hard-work-meta-production.test.ts`
  - remove automatic +3/+3 / Merchant +600 assertions;
  - assert permanent ledger + selectable package unlocks.

- `tests/ending-meta.test.ts`
  - remove old automatic new-life reward expectations;
  - preserve exactly-once Meta transaction proof.

- `tests/all-ten-career-availability-smoke.test.ts`
  - add D21 earned-gate cases independent of package activation.

- `tests/hard-work-palace-meta-smoke.test.ts`
  - replace permanent 10/10 => Palace access assertion with 10/10 earned + all-ten active => invitation eligibility.

- `tests/palace-derived-unlock.test.ts`
  - remove stale permanent `meta.unlocks['palace']` projection contract.

Recommended new focused files:
- `tests/hard-work-new-start-packages-d22.test.ts`;
- `tests/palace-new-start-gate-d23.test.ts`;
- `tests/palace-stat-cap-d24.test.ts`;
- integration regression with Secret Debt domain lock once Chat 5 runtime is current.

## 15. Ownership / collision boundaries

### Chat 5 — Secret Debt

Do not edit Chat 5 owned hidden-route files.

Shared integration contract only:
- its ordinary-career domain lock must be checked before D21 inherited availability.

### Chat 6 — Palace

Do not author the invitation event, Palace state IDs, or Palace presentation in this packet.

Shared integration contract only:
- New Start+ exposes active package set;
- shared predicate exposes 10/10 earned + 10/10 active qualification;
- `creationCompleted` is the deterministic Day-1 trigger boundary;
- Chat 6 owns authored invitation and Palace run-access transition.

### Shared runtime

This packet deliberately contains no shared runtime commit. Leader/Chat 2 should assign the implementation owner after mapping approval.

## 16. Decision still required

The structural model is locked by D21-D24.

The remaining Product decision for this packet is the exact mapping approval:
- confirm/change the first-five single +5 stat targets;
- confirm/change the later-five two +5 stat targets;
- confirm/change which profession carries Lust and its magnitude (proposal: Prostitute +3 Lust).

The proposal above satisfies the locked structural constraints but remains **PROPOSAL** until Leader/Product approves it.

## 17. Implementation sequence after mapping approval

1. add package definitions and validation;
2. add per-life active package selection state;
3. migrate old saves without subtracting legacy current-life effects;
4. remove automatic +3/+3 and Merchant +600 generation for new lives;
5. implement D21 early ordinary-career inherited access;
6. implement package selection and exactly-once `finishCreation` application;
7. split permanent 10/10 from D23 per-life Palace invitation eligibility;
8. expose deterministic `creationCompleted` integration seam to Palace authored content;
9. implement dynamic D24 100/200 progression-stat cap;
10. update RU/EN UI;
11. replace old reward/Palace tests and add none/some/all + Secret Debt collision regressions;
12. hand executable implementation to Chat 2 for its CI slot.

## 18. Conclusion

The v2 model is now structurally closed except for Product mapping approval:

- `meta.hardWorkProgress` remains the permanent earned ledger;
- early ordinary-career access is permanent once its Hard Work is earned;
- New Start+ activates any subset of earned **profession packages**;
- first five packages contain one +5 progression-stat bonus;
- later five may contain two +5 progression-stat bonuses;
- the proposal includes a separate Prostitute +3 Lust effect to satisfy the Lust rule;
- old automatic +3/+3 and Merchant +600 behavior must disappear for new lives;
- Palace requires 10/10 earned **and** 10/10 packages active in that life;
- the Palace invitation is deterministic on Day 1 after setup;
- Secret Debt still overrides all ordinary-career availability;
- Palace True Ending x2 changes only the 12 progression-stat cap to 200.
