# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — C4-135 THEN THREE GREEN C4-136 GATES**
Owner: Chat 4 / QA + Product Acceptance Gate

Current main:
- `a44d0f765fffd9f8b74307d116bf5f15e7688590`
- CI #591 / id `36825365041`: **SUCCESS**
- contains accepted Satyr runtime + Forest product slice + prior Forest/Poverty v11 + School v11.

## C4-135 — do now
Verify exact current-main truth:
- Forest/Poverty v11 live reachability;
- School v11 live reachability + locale/save invariance;
- Satyr complete-career runtime shipped;
- Forest v12 natural item acquisition, 3 routes/challenge families, seasonal topology, extraction -> Lumber, deterministic save/resume shipped;
- explicitly exclude still-unmerged presentation/School-v12/authored-depth candidates from shipped truth.

Record exact main SHA and CI #591.

## C4-136 — continue immediately after C4-135
Gate all currently eligible frozen green candidates; do not stop after one.

1. PR #174 — Satyr complete-career presentation
   - exact head `56ca78ccb0210225136aeca1c68978296ba7d61d`
   - CI #582 SUCCESS, 616/616
   - verify real runtime reachability, static fallback, animation-off/missing-GIF safety, RU/EN/accessibility, no gameplay drift.

2. PR #175 — Forest Authored Depth v13
   - exact head `234e1a6fac0d25b0393f7ffec84eac4007347c32`
   - CI #593 SUCCESS
   - verify seasonal/route/item/challenge copy is player-reachable, deterministic, save/reload-stable, and presentation-only with no Activity mechanics drift.

3. PR #172 — Satyr School v12 clean
   - exact head `41ed6a9d54965a16bff004dae6e7fc79a2841883`
   - CI #592 SUCCESS
   - verify immediate 3-lesson local hooks, Night-study parity, exactly-once/save-reload, RU/EN, global-threshold firewall, no shared-runtime drift.

Do not QA PR #178 until a new current-main-based exact head is green/frozen.

After each verdict:
- record exact SHA + CI;
- PASS / PASS-WITH-NOTES / BLOCK with exact blocker;
- continue to the next eligible candidate even if one blocks.

C4-137 closes the wave only after these gates and resulting Lead integrations are reflected in current-main executable truth.
