# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 — C4-162..166 COMPLETE / C4-167 PENDING EXACT-CURRENT-MAIN CI**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Accepted Merchant source candidates:
- C4-162 runtime #226 @ `88422257f618c7182dd6d1f3eca7596c9972eb0a`: PASS-WITH-NOTES; CI #898 SUCCESS.
- C4-163 School #224 @ `7bda6840a896fb3c75515b652e1bb959c674705d`: PASS-WITH-NOTES; CI #921 SUCCESS.
- C4-164 authored #225 @ `5a05de4fde291d0ce5b3f4d72dafc942e525bb40`: PASS-WITH-NOTES; CI #920 SUCCESS.
- C4-165 presentation #227 @ `77becbeb8ce139ce4326df018af779fd741d70af`: PASS-WITH-NOTES; CI #905 SUCCESS.
- C4-166 collision/ownership ledger: COMPLETE; PR #170 comment `5947735740`.

Lead integration is now complete in the accepted order:
1. runtime source PR #226 -> main merge `effca71298e4b2b2d1722b320c612382199deb18`; post-runtime main CI #942 SUCCESS;
2. authored focused delta -> Lead PR #230, integration head `cd91bb9660caa3da98eccd8a6d0e57cd59b280ef`, CI #945 SUCCESS -> merge `aac9c7007d4b1fce3b1da1a505fe57167d306ebd`;
3. School focused add-only delta -> Lead PR #231, integration head `d6d77deefb4e19bcce17aa8f15826cbcbfbd8202`, CI #947 SUCCESS -> merge `9997f6bcd3fa37eb3d041c881b9ca6308a666b09`;
4. presentation focused delta -> Lead PR #233, integration head `70b09059ab892dbb8ca62ea385fe341a54441610`, CI #950 SUCCESS -> product merge `17f5ddc10d0f4d8a7f3d17495d08f537f43eb1d5`.

Integration properties:
- accepted authored / School / presentation blobs were transplanted byte-for-byte from the QA-accepted source heads;
- runtime mechanics/state/IDs remain authoritative;
- School producer thresholds/public facts remain null;
- intentional `school.formal-terms` unbound boundary is preserved;
- presentation remains additive and preserves previously shipped consumers.

**Do not execute C4-167 until the exact push workflow for the current main containing this pointer commit is SUCCESS.**

Once that exact-current-main workflow is green, execute C4-167 immediately:
- re-query exact current `main` and exact push workflow;
- verify natural Merchant unlock and 50 real shifts;
- verify supplier refusal-safe continuation;
- verify poverty/Secret Debt firewall;
- verify cross-system evidence and advanced readiness;
- verify School null producer authority and no fabricated Merchant School reaction;
- verify RU/EN, locale/media invariance, animation-off/missing-media fallback and Save-neutral presentation;
- verify explicit `ending.merchant.hard-work` completion -> New Life Meta behavior;
- verify preservation of Guard/Hunter/Tavern/Satyr/Undead/Forest and shared School/NightFlow/Activity behavior;
- record PASS / PASS-WITH-NOTES / BLOCKED with exact evidence in PR #170;
- identify the next incomplete ordinary career from shipped product truth.

QA never mutates producer heads or implements fixes.
