# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — FINISH SATYR v12 AGAINST FROZEN CHAT 1 RUNTIME**
Owner: Chat 2 / Presentation & Media Worker

Current draft:
- PR #166
- current head `f2b17cd3a9a3dccb5552e56ae9867ee6dc2540c7`
- CI #541 SUCCESS
- C2-121..130 completed.

Dependency is now available:
- Chat 1 Satyr runtime PR #164
- frozen exact head `de27bb5ac70edb7238657fcb51c1f201a1b1908e`
- exact-head CI #555 SUCCESS.

**Do not wait for PR #164 merge.**

Create a clean integration/finalization branch from Chat 1 frozen head (or transplant the v12 presentation delta onto that exact head), preserving current main/Chat 1 runtime semantics.

Now execute:
- C2-131 — prove the Satyr presentation slots are reached by the real C1D-97..108 production identities, not reserved/prep IDs;
- C2-132 — full exact-head CI, finalize one focused frozen candidate for Chat 4.

Do not move old accepted PR #151 (already integrated/closed).
Do not change gameplay, Save/RNG, progression or ending reward logic.
