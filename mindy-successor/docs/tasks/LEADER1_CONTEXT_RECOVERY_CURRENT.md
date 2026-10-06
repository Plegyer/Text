# LEADER1 CONTEXT RECOVERY — CURRENT

Status: **AUTHORITATIVE BOOTSTRAP FOR A FRESH LEADER 1**
Updated: 2026-10-06

Purpose:
A fresh Leader 1 must be able to continue from GitHub without relying on chat memory.

## First rule

Do not trust stale prose status blindly.
Always re-query live GitHub branches, commits, PRs and Actions before making a status claim or merge decision.
Exact SHA + executable evidence outrank worker prose.

## Read order

1. `mindy-successor/docs/tasks/LEADER1_USER_COMMUNICATION_PROTOCOL.md`
2. `mindy-successor/docs/tasks/LEADER1_WORKER_BUNDLE_PROTOCOL.md`
3. `mindy-successor/docs/tasks/LEADER1_CONTEXT_RECOVERY_CURRENT.md`
4. `mindy-successor/docs/tasks/CURRENT_LEADER1_STATE.md`
5. `mindy-successor/docs/tasks/CURRENT_LEADER1_ASSEMBLY_QUEUE.md`
6. `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`
7. `CURRENT_CHAT2_TASK_POINTER.md` through `CURRENT_CHAT6_TASK_POINTER.md`
8. referenced freeze / QA / recovery / handoff docs from those pointers.

## Governance

- Leader 1 alone merges production candidates into `main`.
- Chat 2 alone owns current-main assembly and full CI.
- Chats 3/4/5/6 are producer / research / QA lanes.
- Producers do not merge main.
- Flow:
  producer/review -> Chat 2 selective current-main assembly -> focused QA -> full CI -> Leader merge -> exact-main CI.
- Burn-down decrements only after Leader merge + exact-main CI SUCCESS.

## User-facing communication semantics

The user wants simple operational status:
- WORKS = the chat window itself is actively producing work.
- WAITS = chat is idle because a check / merge / dependency is pending.
- ERROR = required check failed and repair is needed.
- DONE = task/bundle finished; refill immediately.

A running GitHub Actions job does NOT mean the chat itself is working.
The user may visually know a chat window is idle and say it "стоит"; respect that distinction.

Do not routinely expose SHAs, run IDs, branch names, schemas or test counts to the user.
Keep exact technical detail in GitHub docs.

## Product burn-down

D42 Night is CLOSED and exact-main green.

Broad remaining stages: **5**

1. Secret Debt v12 + D51
2. Palace + D39
3. Activity + Camp + D38
4. D46 + D47 + legacy ending retirement
5. final save/migration/UI/localization/presentation/regression closure

Do not decrement until exact-main green for the corresponding merged stage.

## Live branch checkpoint at this recovery write

Main:
`33606e18474a21bd44520bce06a1b9ae3596443a`

Chat 2:
`chat2/assembly-secret-debt-d51-current-main-v1@a02d4931087e0884756a6888354b8a69e0327b02`
Task: assemble Secret Debt + D51 continuously through focused QA, build gates and one full CI, then stop at READY_FOR_LEADER_MERGE.

Chat 3:
`chat3/palace-d39-consumer-resolution-v42@098e381e301aaa07469e65583ac01823d08213a5`
Task bundle v42-v44:
- Source Method live-consumer mapping;
- minimal Formal Introduction content-seam proposal;
- D39 consumer decision packet.

Chat 4:
`chat4/d39-consumer-independent-resolution-v38@9ce21e93540c67628140700f21bdb031a304f816`
Task bundle v38-v40:
- independently verify Formal Introduction blocker;
- independently find Source Method consumer;
- independent decision verification packet.

Chat 5:
`chat5/windows-release-preflight-v37@92e2d2bfd7603d7b6cbf021617eb1baf51a9d130`
Task bundle v37-v39:
- Windows packaged release preflight refresh;
- final evidence ledger template;
- final GO/NO-GO checklist.

Chat 6:
`chat6/strong-meta-ui-closure-v42@ce6753d482968581b0c2945f4b7c05b41a5d6e58`
Fresh-context task bundle v42-v44:
- Strong Meta player-facing selector;
- modal ARIA-name closure;
- focused QA + handoff.

These heads are only a checkpoint. Re-query live state first.

## Current important Palace blocker

Chat 3 v39 proved:
**no unique safe existing live consumer exists for D39 Formal Introduction.**

Closest structural candidate is Lumber Foreman, but current authored topology either:
- jumps too far into route state, or
- strands normal progression.

Do not bypass this with:
- generic relationship tagging;
- trust-stage shortcut;
- fabricated counters/facts;
- Palace/Activity/Secret Debt targets;
- weakened normal career gates.

Resolution path:
1. Chat 3 produces minimal safe authored seam proposal + Source Method mapping.
2. Chat 4 independently verifies.
3. Leader chooses the convergent safe solution.
4. If a genuine Product choice remains, ask the user in plain game terms.
5. Only then allow Palace release assembly to call D39 live-consumer closure complete.

This blocker does NOT block current Secret Debt + D51 assembly. It blocks Palace release acceptance.

## Important accepted technical locks

- 160 days, 4 x 40.
- 12 progression stats; Lust separate.
- 10 ordinary careers.
- Hard Work = exactly 50 shifts, separate advanced endings.
- Advanced endings use explicit D16 commit; no auto-ending.
- Strong Meta schema6:
  max 1 Keystone + max 2 Specialists.
- D24 cap200 is a normal Specialist and consumes one Specialist slot.
- ordinary Hard Work packages are outside Strong Meta slots.
- automatic knowledge is slot-free.
- current-run loadout snapshot is immutable.
- School is integrated, not a stat shop.
- Night has 12 D42 surfaces and private-space constraints.
- Secret Debt:
  forced Night absolute priority;
  ordinary jobs locked while bound;
  School/Activity available;
  hidden wage cap140;
  Bound Life exactly 50 shifts;
  Takeover explicit;
  no auto-ending.
- D51 Energy compatibility:
  only the Street -1 + bound-night -1 pair is compat-floor-2;
  process both, then floor2;
  unrelated later penalties may reduce below2;
  no global Energy floor.
- Activity:
  entry 2 Energy;
  Field Time 6;
  Camp max 2 field nights;
  explicit endings.
- Palace:
  one duty/day;
  1 Energy;
  support max1/day;
  exactly15 duties;
  true readiness all 12 progression stats >=91, Lust excluded;
  retryable Prince confrontation;
  explicit Return Home;
  run-local progression.
- D39 rewards:
  Service Life -> Steady Practice Specialist;
  Court Power -> Formal Introduction Specialist;
  Inner Truth -> Source Method automatic knowledge;
  Return Home -> cap200 Specialist.
- D40/D41 no Keystone.
- canonical ordinary endings remain 40 after lumber-stay retirement.
- lumber-stay historical compatibility yields +1 Energy exactly once, no modern Hard Work/package conversion.

## Worker bundle policy

For Chats 3-6, prefer 2-3 sequential safe tasks per bundle so workers do not idle between small steps.
They should continue automatically inside the bundle and stop only for a real blocker.

Chat 2 may continue inside one production stage:
compose -> focused QA -> repair -> typecheck/validate/build -> full CI.
It intentionally stops only after a frozen full-CI-green candidate, waiting for Leader merge.

## Durable-state rule for the next Leader

Whenever a major state changes:
- update `CURRENT_LEADER1_STATE.md`;
- update `CURRENT_LEADER1_ASSEMBLY_QUEUE.md`;
- update affected `CURRENT_CHAT*_TASK_POINTER.md`;
- update this recovery file when the handoff picture materially changes.

Never rely on ChatGPT cross-chat memory as project authority.
GitHub is the durable project memory.


## Newest checkpoint — 2026-10-06

D39 blocker has a Leader decision:
- Formal Introduction -> Assassin handler neutral first-professional seam.
- Source Method -> School Arcana/Reason effect-free information variant.
Authority:
`mindy-successor/docs/tasks/LEADER1_D39_LIVE_CONSUMER_DECISION_2026-10-06.md`

Current worker branches:
- Chat2: `chat2/assembly-secret-debt-d51-current-main-v1`; recovery file available if window is lost.
- Chat3: `chat3/d39-consumer-producer-v45`
- Chat4: `chat4/qa-strong-meta-ui-v41`
- Chat5: `chat5/qa-secret-debt-current-head-v40`
- Chat6: `chat6/final-player-facing-cumulative-v45`

Broad burn-down remains 5.
Re-query every branch before status claims.
