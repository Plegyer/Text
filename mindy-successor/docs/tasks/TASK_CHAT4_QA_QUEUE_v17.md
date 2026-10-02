# Chat 4 QA Queue v17 — Merchant Frozen Gates

Status: **ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167
Target: **Merchant Complete Career**

Git is authority. Re-query exact PR heads, draft/frozen status, bases and exact workflow runs before every verdict.

## Shipped baseline

Shipped product truth before this queue:
- Guard shipped at C4-161 PASS;
- exact product merge: `ab88827aea1e9a0ec20b544666c5352ce4f86345`;
- C4-161 exact-current-main verdict SHA: `4120c9ba4ae3594e14cd97a8ef425af2ee42d3dd`;
- workflow #862 / id `36974083053`: SUCCESS;
- validator: 52 packs / 193 events / 39 actions / 22 endings;
- tests: 859 / 859 pass.

Merchant activation coordination main:
- `d7dad76d47d71144a5788f762cedd72d9fc95ae5`;
- workflow #865 / id `36975175686`: SUCCESS;
- coordination-only Merchant queues/pointers; shipped Guard product bytes are unchanged.

QA never implements producer fixes and never mutates frozen candidates. Eligible frozen siblings are gated independently; do not wait for all siblings before testing one that is already frozen.

## Merchant candidate status at queue publication

### Runtime — PR #226 — FROZEN / ELIGIBLE NOW
- exact head: `88422257f618c7182dd6d1f3eca7596c9972eb0a`;
- exact base: activation main `d7dad76d47d71144a5788f762cedd72d9fc95ae5`;
- exact-head CI #898 / id `36977507786`: SUCCESS;
- validator: 60 packs / 222 events / 39 actions / 22 endings;
- tests: 866 / 866 pass, 0 fail;
- 15 changed files;
- PR status: CANDIDATE_FROZEN / READY FOR CHAT 4 QA.

### School — PR #224 — DRAFT / NOT YET QA-ELIGIBLE
Safe prep exists, but final C5-192 rebuild/freeze must use the exact frozen Merchant runtime. Do not gate until PR body/head explicitly records a frozen exact runtime-based candidate with green exact-head CI.

### Authored content — PR #225 — DRAFT / FINALIZATION IN PROGRESS
C3-193..203 prep is complete. C3-204 final rebuild/binding/freeze must use exact frozen runtime #226 head. Do not gate until one frozen green candidate is declared.

### Presentation — PR #223 — DRAFT / FINALIZATION IN PROGRESS
C2-181..191 prep is complete. C2-192 final rebuild/binding/freeze must use exact frozen runtime #226 head. Do not gate prep branch as product candidate.

## C4-162 — gate frozen Merchant runtime #226

Gate exact PR #226 head `88422257f618c7182dd6d1f3eca7596c9972eb0a`.

Verify:
- existing `merchant.shift` remains ordinary 1-Energy paid Work;
- unlock remains Wits 20 + Reason 20 + Sociability 15 OR Year 2;
- shipped wage and four seasonal scene/stat packages remain intact;
- typed progression from Stall Hand through Independent Trader / Networked Merchant into Veteran / Merchant House / Speculator-Smuggler / Patron readiness is naturally reachable;
- readiness families may coexist and do not force commitment;
- trade/appraisal/records/delivery/crisis decisions remain Merchant-local and do not create a global dynamic-pricing engine;
- `merchant.supplier` relationship supports trust, conflict, cooperation/rivalry/refusal and ordinary-work continuation;
- Appraisal Scales / Manifest Case / Sample Kit capabilities remain narrow and do not rewrite global inventory or prices;
- poverty/liquidity reactions preserve shared ordinary-career and Secret Debt ownership;
- School contract publishes only exact runtime consumer facts; producer thresholds/public facts remain null and no School producer is invented;
- Lumber/Farm/Hunter/Tavern/Guard inputs are copied into Merchant-local evidence only and do not transfer ownership;
- Patron of Routes requires real multi-system inputs rather than a shift counter;
- natural acceptance covers pending save/reload, one-shot reactions, 50 real Merchant shifts, advanced readiness, explicit Hard Work completion and New Life persistence/reset;
- refusal-safe supplier path remains live;
- only public Merchant ending remains `ending.merchant.hard-work` with reward `merchant.hardwork.compat` and Meta `hardWork:merchant`;
- no global price engine, inventory-capacity rewrite, Merchant credit/debt state, Merchant-owned Secret Debt, generic illegal-goods law/morality score, Palace rule, future-career seam or extra public ending is introduced.

Record exact head, exact workflow, validator/test evidence and PASS / PASS-WITH-NOTES / BLOCKED in the QA ledger.

## C4-163 — gate frozen Merchant School candidate

Execute only after Chat 5 freezes one exact green runtime-based candidate.

Verify:
- exact dependency is runtime #226 frozen head;
- exactly four prepared School tracks are respected: Literacy & Numbers, Rhetoric & Social, Etiquette & Presentation, Arcana;
- all producer thresholds and selected public facts remain null unless exact runtime/School authority explicitly publishes otherwise;
- no dummy `merchant.shift`, invented paid-lesson threshold, global certificate/project rule, new course/teacher or direct Merchant transition;
- any live Merchant School reaction is backed by a real authorized producer and is immediate/exactly-once without extra daytime Energy;
- negative parity is explicit where no producer authority exists;
- RU/EN/result/journal/accessibility and save/reload remain deterministic;
- no economy, credit/debt, inventory, NightFlow/Activity, Save/RNG or Merchant runtime ownership drift.

## C4-164 — gate frozen Merchant authored candidate

Execute only after Chat 3 freezes one exact green runtime-based candidate.

Verify:
- zero Merchant producer-mechanics drift relative to frozen runtime #226;
- ordinary seasonal Merchant work remains 1-Energy meaning and bilingual;
- trade/supplier/manifest/delivery/buyer copy does not imply a global price engine;
- recurring supplier relationship remains role-only and refusal-safe;
- poverty/liquidity prose does not promise free capital or debt clearing;
- items/capabilities remain qualitative and narrow;
- School prose respects null producer thresholds/public facts and intentionally unbound mappings remain unbound;
- cross-system prose uses only exact shipped Lumber/Farm/Hunter/Tavern/Guard/Activity identities;
- Merchant House / Speculator-Smuggler / Patron routes remain distinct;
- RU/EN, deterministic identity, save/reload and natural reachability remain green;
- no Save/RNG, economy ownership, ending eligibility/reward, Meta, Palace or future-career drift.

## C4-165 — gate frozen Merchant presentation candidate

Execute only after Chat 2 freezes one exact green runtime-based candidate.

Verify:
- every Merchant presentation override maps to a real frozen runtime/authored identity;
- ordinary seasonal Merchant Work stays visually distinct from advanced trade/crisis/readiness routes;
- career stage, supplier, item, liquidity, cross-system and advanced-route surfaces are presentation-only;
- School presentation publishes no consumer that runtime/School does not actually authorize;
- only `ending/merchant/hard-work` is a public Merchant ending unless frozen runtime says otherwise;
- RU/EN alt-caption parity, keyboard/focus safety, static fallback, animation-off safety and deterministic identity are green;
- presentation resolution remains Save-neutral;
- all previously shipped Guard/Hunter/Tavern/Satyr/Undead/Forest presentation consumers are preserved;
- no gameplay, economy, Save/RNG, School/NightFlow/Activity, ending eligibility or Meta ownership drift.

## C4-166 — Merchant integration collision / ownership ledger

After C4-162..165 have accepted verdicts, compare focused accepted deltas against then-current shipped main and each other.

Record:
- exact accepted sibling heads;
- exact safe application order: runtime -> authored -> School -> presentation unless evidence requires a narrower adjustment;
- shared `definitions.json`, localization, presentation/UI and Merchant pack collisions;
- runtime vs authored vs School vs presentation ownership precedence;
- preservation requirements for shipped Guard/Hunter/Tavern/Satyr/Undead/Forest product and presentation behavior;
- any source-base assertions that must be adapted only because already-shipped data now exists.

QA records the ledger. Lead owns collision-safe integration.

## C4-167 — post-Merchant exact-current-main product gate

Only after Lead integrates the C4-166 accepted Merchant wave:
- re-query exact current main and exact push CI;
- run natural Merchant product acceptance across runtime + authored + School + presentation;
- verify natural unlock/progression, supplier refusal-safe continuation, poverty/debt firewall, trade/crisis/readiness and cross-system evidence;
- verify save/reload and NightFlow/Activity separation;
- verify School null-authority boundaries and only exact accepted live consumers;
- verify exactly 50 real Merchant shifts can reach Hard Work naturally;
- verify RU/EN, locale/media invariance, animation-off/missing-media fallback and save-neutral presentation;
- verify explicit ending completion -> New Life Meta behavior with no drift;
- verify all previously shipped careers remain preserved;
- record the next incomplete ordinary career from shipped product truth.

**Do not mark Merchant shipped before C4-167 records PASS / PASS-WITH-NOTES.**
