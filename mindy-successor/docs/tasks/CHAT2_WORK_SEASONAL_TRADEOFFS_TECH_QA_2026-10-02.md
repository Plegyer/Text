# Chat 2 — Ordinary Work Seasonal Tradeoffs Technical QA / Current-Main Assembly

Status: **STATIC TECHNICAL QA PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority
- producer PR #260
- frozen producer head: `d94a6a236a87267221a386406189a93a13615f47`
- producer implementation base: `223135d62b41c0add3cd621f756d8fad63072b39`
- assembly snapshot base: `e2c09e7f32970caea919037df561518a4b93bc82`
- producer head was not moved.

The leader advanced main repeatedly with reference/task documentation while Chat 2 was assembling. Each checked drift from the pointer baseline through this snapshot was documentation-only. Per freeze protocol, unrelated docs-only drift does not require repeated rebuilds.

## Collision analysis
PR #260 changes five files.
Current-main drift since producer base overlaps only `content/definitions.json`.

Frozen #260 changes only `seasonal.<season>` arrays for:
- lumber.shift
- satyr-maid.shift
- undead-farm.shift
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

Shipped current-main Assassin changes in the same file are disjoint: `assassin.shift.scenes` plus Assassin career/quest/relationship/Night/Activity/item definitions.

Assembly keeps current-main definitions and applies only the ten approved seasonal arrays. Shipped Assassin scenes and all unrelated definitions remain current-main values.

## Approved map
Exactly two negative seasons per ordinary profession, each one `modifyStat -1`:
- Lumber: Spring Grooming; Winter Sociability
- Satyr Maid: Summer Grooming; Autumn Endurance
- Undead Farm: Spring Grooming; Autumn Sociability
- Tavern: Spring Grooming; Summer Endurance
- Hunter: Spring Grooming; Winter Sociability
- Guard: Summer Grooming; Winter Sociability
- Merchant: Summer Endurance; Winter Strength
- Artist/Geisha: Summer Endurance; Autumn Reason
- Assassin: Spring Grooming; Winter Sociability
- Prostitute: Summer Grooming; Winter Creativity

Static assertions already passed on the reviewed merged definitions:
- exactly 20 negative effects total
- exactly 2 negative seasons per profession
- every negative is `modifyStat -1`
- zero Lust negatives
- positive/non-negative seasonal effects preserved
- Lumber superseded Summer/Autumn negatives removed
- non-seasonal action fields preserved
- all unrelated definitions preserved
- current Assassin scenes preserved
- all ten Hard Work endings remain `completed_shifts >= 50`.

## Test integration
The four non-definitions files are exact frozen #260 blobs.
The regression fixture checks costs/effects/wage/unlocks/positive/non-stat seasonal effects/Hard Work authority and does not freeze Assassin scene copy.

## Gate
Next step: one assembly PR and exactly one full CI run.
If later main drift before CI touches production, stop and re-audit. Docs-only drift is not a blocker.
If green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
