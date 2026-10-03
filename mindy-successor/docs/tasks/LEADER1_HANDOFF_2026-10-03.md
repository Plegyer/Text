# LEADER 1 HANDOFF — 2026-10-03

Status: CURRENT COORDINATION SNAPSHOT.
Repository: Plegyer/Text
Snapshot main: `2999f202e7e7fcd21f9d3f83b23b404921c41685`

New Leader must requery main/PRs/runs before acting because worker chats may move after this handoff.

## Role model

- Leader 1 is sole coordinator, final acceptance authority and merger to main.
- Chat 2 = Integration / Assembly + Technical QA and sole worker full-CI slot owner.
- Chats 3–6 = producer/research lanes. They do focused/static checks only unless Leader explicitly changes policy.
- Producer completion -> freeze exact SHA -> Chat 2 independent current-main assembly/QA -> Leader merge -> exact-main CI.
- Do not merge producer branches directly.
- Do not treat "branch exists" or pointer says ACTIVE as proof a worker is actually working. Verify branch head movement / latest commit.

## CI model

Workflow uses self-hosted Windows/X64 runner.
Full PR CI is gated to Chat 2 / Leader integration prefixes; producer PR runs are normally SKIPPED.
One full CI slot at a time.
Never rerun an unchanged failing head. Mine all failures first.

## Shipped recent slices

- Prostitute complete assembly merged; exact-main #1108 SUCCESS.
- Assassin complete assembly merged at `176d879f01edea725a331ffe7fb2fb17fb316889`; exact-main #1115 SUCCESS.
- School D20 Body Confidence Lust +2 merged at `e819ad1f373d785a13f7502f8b50342b825fbf7a`; exact-main #1117 SUCCESS.
- Ordinary seasonal negative-stat tradeoffs merged at `27f74e230f5e0e52e4120c8b97c99d250b869038`; exact-main #1120 SUCCESS.

## Current main

At snapshot: `2999f202e7e7fcd21f9d3f83b23b404921c41685`
Message: `Leader: triage meta CI and refill worker queues`.

## Chat 2 — current blocker

PR #264: `Chat 2: shared Hard Work Meta current-main assembly`
Branch: `chat2/assembly-hard-work-meta-shared-20261003-v1`
Current tested head: `df18be22e0bc4677b20dada55f9b9cc8383d2e31`
Full CI #1122: FAILURE
Result: **1009 tests / 992 pass / 17 fail**.

Do not merge #264 and do not request another full CI until all 17 are focused/local green.

Failure groups already triaged in `CURRENT_CHAT2_TASK_POINTER.md`:
- 12 schema-v5 completed-creation fixture failures: completed creation must have frozen Hard Work package state. Migrate legacy fixtures or use real creation completion; do not weaken invariant.
- `gopher.test.ts`: stale schema version 4 expectation vs 5.
- 2 `journal-outcome-localization.test.ts` failures: possible real schema4 migration compatibility regression; preserve fallback text/index alignment and reject malformed alignment if contract says so.
- `lumber-target-production.test.ts`: stale old automatic reward expectation. Under D21, Hard Work records achievement/early access; selectable package applies only at New Start+.
- `ui.test.ts`: stale permanent Palace unlock expectation. D23 uses permanent 10/10 + current-run active 10/10 -> Day-1 invitation, not permanent `meta.unlocks.palace`.

Before rerun Chat 2 must run all failed tests + migration/journal + D21-D24 + School D20 + seasonal-tradeoff focused suites, classify each failure as stale fixture vs real defect, then exactly one full CI.

Queued behind #264:
1. Chat 4 New Start+ Hard Work UI `837156277f7329f0187b04442acb8d5258a2e189`.
2. Chat 6 Palace D23 consumer `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`.

## Chat 3

Completed reusable harness:
`chat3/progression-balance-harness-v3@e631af2e17675c27309aa1b8bd5a6161a1090ce8`.

Current pointer asks for:
`chat3/progression-policy-comparison-v4`.

At handoff, that branch exists but still points to the harness head (no new work commit yet).
Task: use harness to compare current repetition vs max 2/day vs max 1/day, current vs alternate research negatives, School cadence, cap 100, money/milestone density; produce two coherent policy packages. No production edits/full CI.

Important prior audit:
- current Energy-only repetition can compress Hard Work=50 to ~17 calendar days at 3 shifts/day;
- current negative stats can floor at 0 and stop providing pressure;
- focused work can cap a primary stat early;
- no guaranteed direct 31–49 milestone in ordinary careers;
- Lumber is sparsest.
No Product decision on daily shift cap has been made yet.

## Chat 4

Completed dominance audit:
`chat4/strong-meta-dominance-audit-v3@a583549a88f9abf881fe130aec6d07044177eb9e`.

Current pointer asks for:
`chat4/strong-meta-nondominance-models-v4`.

At handoff, branch exists at main snapshot only; no work commit yet.
Task: 3 concrete strong-modifier loadout models that avoid a universally best choice. Hard Work packages are outside this restriction and may use any earned subset. Do not create/port Titles.

Frozen implementation candidates:
- shared D21-D24 runtime producer: `c085eda62dd39f71d3a4c75a6c31f4c72527039a` (currently under Chat 2 #264 QA);
- New Start+ Hard Work UI: `837156277f7329f0187b04442acb8d5258a2e189` (queued after shared runtime).

## Chat 5

Completed Secret Debt parameter sweep:
`chat5/secret-debt-balance-sweep-v5@c6ba3fdaab21321d94b1fe8a00dccb9b81672975`.

Current pointer asks for:
`chat5/secret-debt-ending-meta-rewards-v6`.

At handoff, that next branch does not yet exist.
Task: for each of 3 Secret Debt exits (repayment, hidden Hard Work, owner-kill/control) propose conservative/distinctive/strong-bounded optional Meta rewards; assess dominance vs +1 Energy/day, cap 200, no-rent, starting money, passive income. No runtime/full CI.

## Chat 6

Completed Prince confrontation decision packet:
`chat6/palace-prince-confrontation-decision-v9@4de1a3925d499a6337a3c40c05b8b4aba9f3cc03`.

Current pointer asks for:
`chat6/palace-progression-topology-decision-v10`.

At handoff, branch does not yet exist.
Task: compare compact 3-stage vs richer 6-stage Palace progression; define functional stages, actions, content attachment, repetition, branch points, Prince availability, save/reload and production cost. No implementation/full CI.

Frozen Palace D23 consumer:
`chat6/palace-d23-consumer-integration-v8@9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`.
It depends on Chat 4 shared runtime and is queued for Chat 2 only after shared runtime/UI order is safe.

## Locked Product facts

### Core
- 12 progression stats + separate Lust.
- All 12 progression stats start at 1; 10 allocation points.
- 160 days = 4 years x 40 days; 4 seasons x 10.
- Exactly 10 ordinary professions.
- Palace = hidden 11th main profession.
- Secret Debt = extra hidden/forced route, not one of 10 and never counts for Palace.
- Fresh-run baseline Day-1 careers: Lumber, Satyr Maid, Undead Farm.
- Hard Work for ordinary professions = 50 completed shifts.
- Ending eligibility is non-terminal; explicit commit/action remains separate.

### Work / School
- Seasonal work changes stats.
- Shipped ordinary tradeoff rule: each profession has negatives in about 2 seasons of 4; one -1 progression-stat effect each; no Lust negatives.
- Body Confidence paid School lesson grants Lust +2 exactly once in addition to existing stats; Night Study does not inherit Lust.
- Work growth/pacing is still under Product review; do not infer a 1/day shift limit yet.

### Hard Work / New Start+
- Completing Hard Work permanently grants early access to that same profession in later lives.
- Hard Work also earns a selectable profession package.
- First five ordinary careers have one +5 progression-stat effect.
- Later five may have two +5 progression-stat effects.
- Any Lust Hard Work bonus is at least +3 in magnitude.
- Player may activate any subset of earned Hard Work packages: none, some, or all. No one-slot restriction for ordinary Hard Work packages.
- Old automatic +3/+3 and Merchant +600 model is superseded.

Current candidate catalog (verify against current authority before merging production mapping):
Lumber Strength +5;
Satyr Maid Grooming +5;
Undead Farm Magic +5;
Tavern Sociability +5;
Hunter Dexterity +5;
Guard Endurance +5 + Manners +5;
Merchant Wits +5 + Reason +5;
Artist/Geisha Creativity +5 + Grooming +5;
Assassin Dexterity +5 + Wits +5;
Prostitute Sexuality +5 + Charm +5 + separate Lust +3.

### Palace
- Merely earning 10/10 is insufficient.
- In a New Start+ life, all ten corresponding Hard Work packages must be ACTIVE.
- If permanent 10/10 + active 10/10, an automatic Palace invitation arrives on Day 1.
- Invitation is the authored reveal/entry; no random/stat/item substitute gate.
- Secret Debt never substitutes for a career.
- True Ending requires all 12 progression stats >=91 (strictly >90); Lust excluded; defeat Prince; then explicit Return Home ending.
- True reward is optional cap x2 only: progression-stat maximum becomes 200 instead of 100. Values, +5 packages and 10 allocation points are not multiplied. Lust excluded from cap-200 reward.

### Secret Debt
- Eligible street sleep: 20% chance while unseen.
- Refusal closes lender encounter for current life; unseen can roll again later.
- Accept -> +2000 immediately.
- Activates exactly 10 days later.
- Debt exactly 20000.
- While bound, all 10 ordinary careers locked; progress preserved and restored after exit.
- School available.
- Activity available but must not trivialize debt.
- Hidden day work costs standard 1 Energy, pays like a profession, grows with relevant stats/progression; Lust positively affects wage.
- Intended day-work stat growth: Strength, Endurance, Sexuality; work itself does not automatically grow Lust.
- Forced Night every bound night.
- Forced Night causes next-day Energy -1.
- Full repayment only via explicit 20000 button; no partial payments.
- Hidden Hard Work = 50 hidden day shifts.
- Owner-kill/control outcome uses 50 shifts + relevant stats + high Lust + 10 paid School lessons and a separate explicit action.
- Exact shift gains, wage coefficients, takeover stat/Lust thresholds and Meta rewards are still Product/balance work.

## Original-game research — use only as reference

Docs:
- `mindy-successor/docs/ORIGINAL_GAME_MECHANICS_REFERENCE_v1.md`
- `mindy-successor/docs/ORIGINAL_GAME_DESIGN_PATTERNS_v1.md`

Important user clarifications:
- Do NOT port the original Plus Mode/job-replacement true-ending structure now. Successor True Ending is Palace.
- In the original, ALL earned ending bonuses could be independently enabled/disabled for a new run.
- Titles are a separate mechanic from ending bonuses.
- Do NOT copy original Titles as-is. The original +1 Energy/day Title is an example of a dominant option that makes narrow Titles like +1 Strength/night unattractive.
- Original numbers are for systemic understanding, not 1:1 replication.

Useful extracted patterns already recorded:
- original baseline Stamina 3;
- original 12 main stats start at 1;
- work combines gains/losses and wages use build stats;
- School is a paid stat-growth accelerator;
- all 12 original jobs use a 50-work career-ending milestone, usually with intermediate ~15 and some 5/10/30 events;
- reaching 50 gives an explicit ending opportunity rather than automatic end;
- complex routes combine counters, stats and prior choices;
- poverty/no-rent becomes content rather than dead fail;
- ending rewards are heterogeneous and selectable.

If a NEW chat needs to continue raw SWF extraction, do NOT assume the uploaded SWF is available across chats. Ask user to re-upload `Simply_Mindy_360(4)(3).swf` if raw bytes are needed. The two Git research docs preserve all findings already extracted.

## Immediate actions for new Leader

1. Requery current main, #264, #1122/current Chat2 head, current worker branch heads before acting.
2. If unchanged, keep Chat 2 on the 17-failure focused repair. No full rerun until locally green.
3. Wake/check Chats 3–6. At this snapshot:
   - Chat 3 v4 branch exists but has no new work commit.
   - Chat 4 v4 branch exists but has no new work commit.
   - Chat 5 v6 branch does not exist.
   - Chat 6 v10 branch does not exist.
4. Do not say a worker is “active” merely because pointer says ACTIVE. Verify branch movement.
5. After Chat 2 #264 becomes green: Leader merges -> exact-main CI -> then Chat 2 integrates queued New Start+ UI and Palace D23 consumer in dependency-safe order.
6. Continue Product decisions from Chat 3/4/5/6 packets; do not invent unresolved balance/lore.

## Communication style / user preference

- Russian.
- User is beginner but does not want artificial step-by-step.
- Give complete sensible sequences and exact copy/paste prompts when needed.
- Act in Git when authority is sufficient; do not ask unnecessary questions.
- User expects active coordination and notices worker idle time quickly.
- Keep internal English IDs explained in plain Russian.
- Avoid giant prompt dumps except for explicit handoffs.
