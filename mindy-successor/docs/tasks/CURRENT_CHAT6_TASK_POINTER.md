# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — ENDING LOCALIZATION CLOSURE PRODUCER v26**
Owner: Chat 6

Accepted audit:
`chat6/final-localization-closure-audit-v25@e80a656ffe98f4fe8c96fa724f242854b83ae272`

Production base:
`main@f36de067ae2e82518360dbe045f71c700e200805` (D41 production merge)

New branch:
`chat6/ending-localization-closure-producer-v26`

Important ownership:
- Activity v17 already owns the generic localized ending-screen seam in `src/ui/app.ts`;
- do **not** duplicate or rewrite that runtime seam;
- D42 captions are owned by current Chat 2 D42 assembly;
- `lumber-stay` retirement/localization is owned by Chat 5 v17;
- Palace v19 and Activity v17 ending copy are already complete and must not be rewritten.

Task:
close the remaining ordinary/live ending localization debt that can be authored independently on D41-merged production.

Required content:
1. D40 — all 16 advanced endings:
   - final RU/EN title;
   - final RU/EN description;
   - final RU/EN epilogue.
2. Hard Work — all 10 canonical endings:
   - add missing RU/EN epilogue.
3. D41 — add the 10 missing RU/EN epilogues while preserving the 4 already localized.
4. Live generic prototype endings:
   - `guild-life` epilogue RU/EN;
   - `scholar-life` epilogue RU/EN.
5. Merchant localization correctness:
   - fix the two v25 wrong-route RU strings;
   - align the seven P2 consequence-parity keys identified by v25.
6. Hard Work namespace:
   - resolve Merchant / Artist-Geisha live double-prefix runtime keys;
   - preserve compatibility only where an actual consumer exists.

Do not:
- touch `src/ui/app.ts`;
- touch Activity runtime/content;
- touch D42 Night copy/captions;
- touch Secret Debt epilogues yet;
- touch Palace;
- touch `lumber-stay` / `vitality`;
- change mechanics/rewards/gates.

Focused QA:
- every canonical D40/D41/Hard Work ending has RU+EN runtime title/description/epilogue coverage as applicable;
- all 40 canonical ordinary-career endings have RU+EN epilogue coverage;
- guild-life/scholar-life epilogues have RU+EN coverage;
- no locale changes alter ending IDs/reward ownership;
- Merchant route wording matches the actual route;
- no D49 epistemic strengthening;
- localization loader/validator/build remains green.

No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_ENDING_LOCALIZATION_CLOSURE_PRODUCER_v26.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
