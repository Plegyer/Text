# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE / PRINCE NARRATIVE PRODUCER v18**
Owner: Chat 6

Accepted Product authority:
`chat6/palace-prince-narrative-authority-v17@f81c15252ae63e7edbda0e678732b3a790b01ccd`

Leader lock:
**D45 — Palace Concordance / Threshold Archive narrative authority**

Frozen runtime/UI bases:
- Palace runtime v15:
  `chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`
- Palace UI v16:
  `chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`

Do not mutate v15/v16/v17.

## New assignment

Implement the first production narrative layer authorized by D45.

New branch:
`chat6/palace-prince-narrative-producer-v18`

Base:
`65b9e668ff7112c86681905d62f723b6cf95cec0`

Read D45 authority from:
`chat6/palace-prince-narrative-authority-v17@f81c15252ae63e7edbda0e678732b3a790b01ccd`

No full CI.

## Required production

Implement, using existing Palace runtime/UI architecture:

1. reveal beats for invitation / duty 2 / 5 / 8 / 12 / 15;
2. stable presentation/localization for:
   - Concordance;
   - Threshold Archive;
   - Threshold;
   - Custodian role;
3. route-finalize narrative surfaces for:
   - Service Life;
   - Court Power;
   - Inner Truth;
4. quest-backed deterministic Prince confrontation:
   - carrier `palace.prince-confrontation`;
   - begin action `palace.confront-prince`;
   - durable success fact `palace.prince-defeated`;
   - four authored phases per D45;
   - fail/back-out retry-safe;
   - no RNG;
   - no extra numerical threshold;
   - no romance/Night/Activity item/School requirement;
   - no automatic Return Home commit;
5. Return Home post-confrontation presentation/explicit commit surface;
6. RU/EN functional prose sufficient for production testing.

Do not finalize personal Prince name/species/appearance if still unnecessary.
Functional labels are acceptable.

## Preserve

- D23 sole Palace entry;
- D29 stages/milestones;
- D43 cadence/economy;
- D39 rewards;
- v15 atomic duty semantics;
- v16 UI;
- all 12 >=91 True gate;
- Lust excluded;
- no permanent Palace unlock;
- no hardWork:palace;
- Secret Debt forced Night priority;
- no duplicate Strong Meta UI.

## Optional echoes

Only presentation-level callbacks from already-authorized facts:
- Secret Debt;
- Activity;
- School;
- ordinary advanced endings;
- Night/relationships.

No callback may become a gate.

## Focused QA

No full CI.

Minimum:
- typecheck / validate / build;
- v15 runtime regressions;
- v16 UI regressions;
- reveal milestone mapping;
- confrontation availability exact;
- each phase deterministic;
- failure/back-out writes no defeat fact;
- retry works;
- success writes `palace.prince-defeated` once;
- success does not auto-commit Return Home;
- 12x90 fail / 12x91 pass, Lust irrelevant;
- save/reload mid-confrontation;
- no hidden extra prerequisites;
- RU/EN localization completeness;
- D23/Secret Debt/Strong Meta firewalls.

Deliver:
`mindy-successor/docs/tasks/CHAT6_PALACE_PRINCE_NARRATIVE_PRODUCER_v18.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
