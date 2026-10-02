# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 — C4-162..166 COMPLETE / C4-167 WAITING LEAD INTEGRATION**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Completed Merchant gates:
- C4-162 runtime #226 @ `88422257f618c7182dd6d1f3eca7596c9972eb0a`: **PASS-WITH-NOTES**
  - CI #898 / id `36977507786`: SUCCESS
  - validator 60 packs / 222 events / 39 actions / 22 endings
  - tests 866 / 866
  - QA ledger comment `5947547430`
- C4-163 School #224 @ `7bda6840a896fb3c75515b652e1bb959c674705d`: **PASS-WITH-NOTES**
  - exact base runtime #226
  - CI #921 / id `36980004711`: SUCCESS
  - validator 60 / 222 / 39 / 22
  - tests 876 / 876
  - producer thresholds/public facts remain null; negative producer parity is intentional
  - QA ledger comment `5947717124`
- C4-164 authored #225 @ `5a05de4fde291d0ce5b3f4d72dafc942e525bb40`: **PASS-WITH-NOTES**
  - exact base runtime #226
  - CI #920 / id `36979960415`: SUCCESS
  - validator 60 / 222 / 39 / 22
  - tests 889 / 889
  - 73 authored identities = 72 LIVE_BOUND + 1 intentional unbound `school.formal-terms`
  - QA ledger comment `5947710558`
- C4-165 presentation #227 @ `77becbeb8ce139ce4326df018af779fd741d70af`: **PASS-WITH-NOTES**
  - exact base runtime #226
  - CI #905 / id `36979447454`: SUCCESS
  - validator 60 / 222 / 39 / 22
  - tests 871 / 871
  - exactly 64 Merchant semantic presentation surfaces
  - QA ledger comment `5947590431`
- C4-166 collision/ownership ledger: **COMPLETE**
  - safe order: runtime #226 -> authored #225 -> School #224 -> presentation #227
  - only runtime/authored share production files (8 Merchant files); runtime mechanics win, authored text/localization layers on top
  - School is add-only/no shared production-file collision
  - presentation production code is isolated to `src/core/presentation.ts`
  - authored localization delta = 171 Merchant-only keys / 0 non-Merchant changes
  - QA ledger comment `5947735740`

C4-167 remains blocked until Lead performs collision-safe integration of the accepted wave onto main and the exact-current-main push workflow is green.

C4-167 acceptance must re-query exact current main and verify:
- natural Merchant unlock and 50 real shifts;
- supplier refusal-safe continuation;
- poverty/Secret Debt firewall;
- cross-system evidence and advanced readiness;
- School null producer authority / no fabricated Merchant School reaction;
- RU/EN, locale/media invariance, animation-off/missing-media fallback and Save-neutral presentation;
- explicit Hard Work completion -> New Life Meta behavior;
- preservation of Guard/Hunter/Tavern/Satyr/Undead/Forest and shared School/NightFlow/Activity behavior;
- next incomplete ordinary career from shipped product truth.

QA does not integrate producer candidates, mutate frozen heads, or implement fixes.
