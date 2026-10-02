# CURRENT CHAT4 TASK POINTER

Status: **ARTIST QA v18 — C4-168+C4-169 COMPLETE / C4-170+C4-171 CI-HELD / COLLISION PREFLIGHT ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-168..173

Completed:
- C4-168 runtime #234: PASS-WITH-NOTES
- C4-169 School #232: PASS-WITH-NOTES

Held:
- C4-170 authored #229 @ `75664819e824187ea23531e39f6cf5cd952b1047`: not frozen; last required run failed before runner steps.
- C4-171 presentation #237 @ `ef9cc2df1edaf428ed44c34ba9832ff3a88032b4`: not frozen; last required run failed before runner steps.

Execute useful QA work now without issuing final verdict:
### C4-172 PRELIMINARY COLLISION PREFLIGHT
- compare accepted runtime #234 + accepted School #232 + held authored #229 + held presentation #237;
- inventory all file intersections and shared ownership;
- identify provisional safe application order;
- prove which authored/presentation blobs can be transplanted without touching runtime mechanics;
- identify preservation requirements for Merchant/Guard/Hunter/Tavern/Satyr/Undead/Forest/School/NightFlow;
- record a **PRELIMINARY / NON-VERDICT** ledger comment in PR #170.
- do not call C4-172 COMPLETE until C4-170 and C4-171 receive real QA verdicts.

The instant exact held #229 or #237 receives executable full SUCCESS and producer freeze, interrupt preflight and execute the corresponding C4-170/C4-171 gate.

QA never mutates producer heads or implements fixes.
