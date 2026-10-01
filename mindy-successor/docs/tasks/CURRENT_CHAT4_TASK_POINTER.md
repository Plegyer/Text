# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HUNTER QA v15 / C4-152 + C4-153 ELIGIBLE NOW**
Owner: Chat 4 / QA + Product Acceptance Gate

Shipped Tavern baseline:
- exact product main `8652251051d24b507042b73c4fce4295277c38fe`
- CI #768 / id `36865274621`: SUCCESS
- tests: 764/764
- Tavern runtime + authored + School + presentation are shipped.

Completed Hunter gates:
- C4-150 runtime #201 @ `8af661de2ce6d73e4db0f61fe4206d3334822998`: PASS-WITH-NOTES
- C4-151 School #199 @ `f04c93db866b1d2603f6917b41297670f86b0bef`: PASS-WITH-NOTES

Eligible now — do not wait:

C4-152 — Hunter authored PR #209
- exact frozen head `7e51a0c28037cbfbb9dc00c4c438e32248ec45bf`
- CI #794 / id `36869428605`: SUCCESS
- validator: 37 packs / 136 events / 39 actions / 20 endings
- tests: 693/693
- PR ready/non-draft.

C4-153 — Hunter presentation PR #210
- exact frozen head `b5ec54134f2363041ce32a31fafc7bdfbbabe6f9`
- CI #790 / id `36867037325`: SUCCESS
- validator: 37 packs / 136 events / 39 actions / 20 endings
- tests: 696/696
- PR ready/non-draft.

Execute C4-152 and C4-153 independently now.
After both verdicts, execute C4-154 collision ledger against the Tavern-shipped current product baseline.
C4-155 only after Lead integrates the accepted Hunter wave.

QA never implements producer fixes or mutates frozen candidates.
Every verdict records exact head SHA, exact workflow run, validator/test evidence.
Hunter is not shipped before C4-155.
