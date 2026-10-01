# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — REBUILD SATYR SCHOOL v12 ON CURRENT RUNTIME**
Owner: Chat 5 / School + Text Localization Worker

Old draft PR #161 is **not QA-eligible**:
- head `90991d99ec653d6c8762c3bca8308274c2197c63`;
- CI #546 FAILED;
- failures include stale-stack starter assertions plus Satyr identity/localization drift and one UI timeout.
Do not keep patching that old stacked base.

Dependencies now available for a clean replacement:
- Chat 1 Satyr runtime PR #164 frozen head `de27bb5ac70edb7238657fcb51c1f201a1b1908e`, CI #555 SUCCESS;
- accepted School v11 source PR #156 remains frozen; Lead is integrating it into current main separately.

Immediate work:
1. preserve PR #161 as historical draft evidence; do not declare it frozen;
2. inventory the **v12-only** School/Satyr delta from #161;
3. create a clean replacement branch on the newest base that contains the accepted School v11 content plus Chat 1 frozen Satyr runtime (use current main after Lead integration when available; until then use a clean stacked integration, not the stale #161 ancestry);
4. re-bind every Satyr School event to the exact C1D-97 runtime identities;
5. complete C5-126..131: immediate Resolver trigger, teacher continuity, Night-study parity, RU/EN/journal, global-threshold firewall, natural cross-system acceptance;
6. C5-132 — exact-head full CI green, freeze one clean candidate for Chat 4.

Do not weaken upstream tests to make the old stack pass.
Do not change shared runtime, Save/RNG, NightFlow, career stages or global School certificate rules.
