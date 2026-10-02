# Chat 2 — Ordinary Work Seasonal Tradeoffs Technical QA / Current-Main Assembly

Status: **STATIC TECHNICAL QA PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority
- producer PR #260
- frozen producer head: `d94a6a236a87267221a386406189a93a13615f47`
- producer implementation base: `223135d62b41c0add3cd621f756d8fad63072b39`
- fresh actual current main: `4e81e6a329bf1e735aa6d05f878f507ca8937edc`
- producer head was not moved.

The pointer's earlier main SHA `6a6f69f2a8f4f48a0767114ef41626e8f0cab61c` has since advanced only through documentation/task-pointer changes; no runtime file changed after that integration point.

## Collision analysis
PR #260 changes five files.
Current-main drift since producer base overlaps exactly one path: `content/definitions.json`.

The other four producer files are exact Git blobs from frozen #260.

### definitions.json
Frozen #260 changes only `seasonal.<season>` arrays of ten ordinary shift actions.
Shipped current-main Assassin changes in the same file are disjoint: `assassin.shift.scenes` plus Assassin career/quest/relationship/Night/Activity/item definitions.

Assembly uses current-main `definitions.json` and replaces only the ten approved seasonal arrays with frozen #260 seasonal arrays.
All current Assassin scenes and all unrelated definitions remain exact current-main values.

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

Static assembly assertions:
- 10 ordinary professions
- exactly 2 negative seasons each
- exactly 20 negative effects total
- all negatives are `modifyStat -1`
- zero Lust negatives
- current-main seasonal arrays had no independent drift before #260 application
- positive and non-negative seasonal effects match the producer baseline
- Lumber superseded Summer/Autumn negatives are gone.

## Preservation
Non-seasonal current-main action fields remain exact:
- costs
- shift effects/counters
- wages
- unlock conditions
- scenes
- items/events.

All non-action definitions remain exact current-main values.
Shipped Assassin and School D20 are preserved.
All ten ordinary Hard Work endings remain `completed_shifts >= 50`.

## Test integration
The four non-definitions files from #260 are exact producer blobs.
The regression fixture checks costs/effects/wage/unlocks/positive and non-stat seasonal effects/Hard Work authority and does not freeze current Assassin scene copy.

## Gate
Assembly = actual current main + collision-safe merged `definitions.json` + four exact producer test/fixture blobs + this QA evidence file.

Next step: one assembly PR and exactly one full CI run.
If green, freeze exact assembly SHA and report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
