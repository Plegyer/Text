# Chat 6 — Palace Natural 10/10 + Day-1 Entry Acceptance Prep v7

Status: **READY FOR CHAT2 OR LEADER**
Owner: Chat 6 / Palace Producer
Branch: `chat6/palace-natural-10of10-acceptance-v7`
Exact base: `aff3a6de866ea40f8d2d6761d148888b22b73278`

Source Palace prep:
- v4: `302c5cd636b2389edd05de2b4e50d5df8f88133d`
- v5: `c7b26032af9347af59c590de187abd7d44795050`
- v6: `29def63f348ffd0bf46c16a7a3c7292b0877db9a`

## 1. Shipped roster audit on exact main

The shipped ordinary career machine roster is exactly:

1. `lumber`
2. `satyr-maid`
3. `undead-farm`
4. `tavern`
5. `hunter`
6. `guard`
7. `merchant`
8. `artist-geisha`
9. `assassin`
10. `prostitute`

`content/definitions.json` contains exactly ten career machines and they match the locked ordinary Hard Work roster.

`secret-debt` is not an ordinary career machine.

`palace` is not an ordinary career machine.

## 2. Real Hard Work ending audit

Every one of the ten ordinary careers has exactly one shipped Hard Work ending:

| Career | Ending | Reward |
|---|---|---|
| lumber | `ending.lumber.hard-work` | `hardWork:lumber` |
| satyr-maid | `ending.satyr-maid.hard-work` | `hardWork:satyr-maid` |
| undead-farm | `ending.undead-farm.hard-work` | `hardWork:undead-farm` |
| tavern | `ending.tavern.hard-work` | `hardWork:tavern` |
| hunter | `ending.hunter.hard-work` | `hardWork:hunter` |
| guard | `ending.guard.hard-work` | `hardWork:guard` |
| merchant | `ending.merchant.hard-work` | `hardWork:merchant` |
| artist-geisha | `ending.artist-geisha.hard-work` | `hardWork:artist-geisha` |
| assassin | `ending.assassin.hard-work` | `hardWork:assassin` |
| prostitute | `ending.prostitute.hard-work` | `hardWork:prostitute` |

Each real ending has exactly this gate shape:

```json
{
  "kind": "careerCounter",
  "career": "<same ordinary career>",
  "counter": "completed_shifts",
  "op": "gte",
  "value": 50
}
```

Therefore the current shipped natural Hard Work contract is still:

`completed_shifts >= 50`

for all ten ordinary careers.

There are exactly ten `hardWork` Meta rewards in shipped definitions.

There is no `hardWork:secret-debt`.

There is no `hardWork:palace`.

Secret Debt and Palace cannot contribute to the ordinary 10/10 ledger.

## 3. Shared D23 API status

The future D23 runtime API is **not landed** on this main baseline.

Observed on `aff3a6de...`:

- `src/core/hardWorkMeta.ts` does not exist;
- `activeHardWorkPackages` is not present in current engine state;
- `palaceNewStartQualified` is not present;
- `engine.ts::palaceAvailable(meta)` still derives Palace from permanent `meta.hardWorkProgress` 10/10 only;
- `ensurePalaceUnlock(meta)` still projects that permanent-only result into `meta.unlocks['palace']`.

Because the shared D23 seam is not landed, v7 does **not** patch engine/schema/Meta/Save.

Dependent D23 acceptance remains a contract fixture and focused future test suite.

## 4. Added fixture

`content/palace-natural-10of10-acceptance-v7.fixture.json`

It freezes:

- exact shipped ordinary roster;
- exact ten real Hard Work ending IDs;
- exact reward IDs;
- exact `completed_shifts >= 50` gates;
- explicit Secret Debt / Palace exclusions;
- D23 truth table;
- duplicate/substitution rules;
- Day-1 invitation contract;
- invitation/reveal identity split;
- run-local `palace.access-granted`;
- queued/pending/accepted reload expectations;
- future acceptance cases V7-A01 through V7-A10.

## 5. D23 truth table prepared

### 9 permanent / 9 active

Expected:

`NO PALACE`

### 10 permanent / 0 active

Expected:

`NO PALACE`

### 10 permanent / 9 active

Expected:

`NO PALACE`

### 10 permanent / 10 active

Expected:

`DETERMINISTIC DAY-1 INVITATION ELIGIBILITY`

Qualification is set-membership over the exact ten ordinary career package identities.

Duplicate entries do not increase coverage.

`secret-debt` does not fill a missing ordinary package.

`palace` does not fill a missing ordinary package.

## 6. Invitation acceptance lifecycle prepared

Future runtime contract from v4-v6 remains:

### Arrival

`palace.invitation.day1-arrival`

- `creationCompleted`;
- elapsed day 0 / calendar Day 1;
- latched;
- blocking;
- `critical_progression`;
- no gameplay RNG;
- no stat gate;
- no item gate;
- maximum one delivery.

### Reveal / acceptance

`palace.invitation.reveal`

Choice:

`accept`

writes:

`palace.access-granted`

as run-local Palace access state.

The access fact is not Meta.

It does not carry automatically into a later life.

A later life must satisfy D23 again.

## 7. Reload contract prepared

The future acceptance suite requires:

- queued invitation survives save/reload;
- pending arrival invitation survives save/reload;
- reload does not increment delivery count;
- acceptance writes access once;
- accepted access survives reload in the same run;
- a duplicate acceptance attempt cannot duplicate the fact;
- accepted invitation cannot reappear;
- a new run starts without `palace.access-granted` and must requalify.

## 8. Focused test file

`tests/palace-natural-10of10-acceptance-v7.test.ts`

The test reads current shipped `definitions.json` directly.

It covers:

- exact ordinary roster;
- exactly ten career machines;
- exactly one Hard Work Meta reward per ordinary career;
- exact ending identity;
- exact reward identity;
- exact `completed_shifts >= 50` condition;
- Secret Debt exclusion;
- Palace exclusion;
- D23 9/9, 10/0, 10/9, 10/10 truth table;
- duplicate/Secret Debt/Palace non-substitution;
- deterministic latched Day-1 invitation contract;
- unqualified creation => no invitation;
- qualified creation => invitation exactly once;
- pending invitation save/reload;
- reveal acceptance => one run-local access fact;
- accepted access save/reload;
- new-run access reset;
- current shared D23 absence;
- Prince/topology/shared Meta-Save-cap deferral.

The lifecycle part is intentionally a contract model while the shared D23 API is absent.

Once the shared seam lands, integration should replace the model-only setup with real `dispatch` acceptance against production state, while preserving the same assertions.

## 9. Future natural acceptance path

After shared D21-D23 integration, Chat 2 should exercise the real path:

1. naturally complete Lumber Hard Work;
2. naturally complete Satyr Maid Hard Work;
3. naturally complete Undead Farm Hard Work;
4. naturally complete Tavern Hard Work;
5. naturally complete Hunter Hard Work;
6. naturally complete Guard Hard Work;
7. naturally complete Merchant Hard Work;
8. naturally complete Artist/Geisha Hard Work;
9. naturally complete Assassin Hard Work;
10. naturally complete Prostitute/Professional Hard Work;
11. verify permanent ledger contains ten unique ordinary careers;
12. start New Start+;
13. select all ten earned Hard Work career packages;
14. finish creation;
15. receive exactly one Day-1 Palace invitation;
16. save/reload while pending and verify no duplication;
17. accept the invitation;
18. verify exactly one run-local `palace.access-granted`;
19. save/reload and verify access persists inside that run.

Assassin is already shipped, so this future path no longer depends on an unpublished producer branch.

## 10. Explicit non-goals

v7 does not choose or implement:

- Prince mechanics;
- Prince victory signal;
- 3-stage vs 6-stage Palace topology;
- Palace career shift IDs;
- Palace progression thresholds;
- shared New Start+ package selection;
- shared Meta/Save migration;
- cap-200 runtime implementation.

No full CI is requested from this producer branch.

Freeze exact SHA and report:

`READY_FOR_CHAT2_OR_LEADER`
