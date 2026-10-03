# Chat 4 — v12 start / recovery handoff — 2026-10-03

Git is the source of truth.

Current task:
`mindy-successor/docs/tasks/CURRENT_CHAT4_TASK_POINTER.md`

Current branch:
`chat4/secret-debt-full-route-producer-v12`

At the time of this recovery handoff, the branch had no worker commit yet and was still at Leader dispatch:
`67fd2dfd05f6f1ac77cf8d3816cfa508e9bdcba4`.

Do NOT redo the completed Secret Debt balance packet.

Accepted Product authority:
`chat4/secret-debt-balance-decision-v11@fdef24962c751fa8d4d8595f64b7f00a0e4fff04`

Leader locked that packet as D44.

D44 exact values:

Hidden shift:
- Energy cost remains 1;
- Endurance +1;
- Sexuality +1;
- Lust +0;
- Summer Reason -1;
- Winter Sociability -1;
- Spring/Autumn no hidden-work negative.

Hidden wage:
`round(30 + min(110, 0.70 * Endurance + 0.60 * Sexuality + 0.35 * Lust))`

Anchors:
- E10 / Sex10 / Lust5 => 45;
- E30 / Sex30 / Lust15 => 74;
- E50 / Sex50 / Lust25 => 104;
- absolute cap 140.

Bound Life:
- exactly 50 hidden shifts.

Takeover:
- hidden shifts >=75;
- Endurance >=75;
- Sexuality >=75;
- Wits >=35;
- Lust >=30;
- paid School lessons >=10;
- bound state active;
- explicit authored action;
- no auto-commit.

Existing D19/D30/D32 remain locked:
- 20% eligible street lender encounter;
- refusal closes encounter current life;
- accept +2000;
- trap exactly 10 days later;
- debt 20000;
- all ten ordinary careers locked while bound;
- School and Activity available;
- forced Night every bound night;
- next-day Energy -1;
- repayment only full 20000 explicit action;
- no hidden-work automatic Lust;
- no Meta/housing suppression of forced Night;
- D30/D32 reward IDs and numbers unchanged.

Your job is NOT research. It is the full D19 runtime producer.

Implement:
1. typed lender encounter / refusal / accept state;
2. exactly-once +2000;
3. exactly +10-day trap;
4. typed bound state;
5. ordinary-career lock with progress preserved;
6. School/Activity availability;
7. hidden work with D44 exact wage/stat/seasonal package;
8. forced Secret Debt Night;
9. next-day Energy -1 exactly once;
10. explicit full-only repayment;
11. Bound Life 50-shift eligibility;
12. Takeover exact D44 gate;
13. D16 explicit commit semantics;
14. exact Strong Meta ownership seams for:
   - secret-debt.paid-freedom.earned-reserve-match
   - secret-debt.bound-life.work-rhythm
   - secret-debt.takeover.network-retainer
15. Palace already-open preservation under D43;
16. save/reload/migration safety.

Strong Meta warning:
Chat 2 owns current-main Strong Meta assembly.
Do NOT create a duplicate registry/loadout system.
If needed, leave precise integration seams for Chat 2.

No full CI.

Focused minimum:
- typecheck;
- validate;
- build;
- deterministic 20% RNG test;
- refusal current-life closure;
- +2000 exactly once;
- +10-day trap;
- debt 20000;
- ordinary-career lock;
- School/Activity still available;
- wage anchors/cap;
- exact stat package;
- seasonal negatives;
- forced Night + Energy -1 reload-safe;
- full-only repayment;
- Bound Life 49 fail / 50 eligible;
- Takeover 74 fail / 75 plus all thresholds eligible;
- one-below tests for every Takeover threshold;
- no auto-commit;
- consent/refusal unaffected;
- Palace already-open preserved;
- no duplicate reward grants.

Finish with:
`READY_FOR_CHAT2_ASSEMBLY`

Report exact frozen SHA and changed files.

Do not merge main.
