# CHAT5 CONTEXT RECOVERY — LUMBER-STAY RETIREMENT v17

Status: **NEW CHAT RECOVERY — CONTINUE EXISTING PRODUCER**
Owner: Chat 5

The previous Chat 5 conversation exhausted its context after implementing the v17 producer.

Do not restart from scratch.

## Repository / branch

Repository:
`Plegyer/Text`

Working branch:
`chat5/lumber-stay-retirement-producer-v17`

Exact current branch head:
`cbeae73e8559d43fcce24213d6f5606b682b3e7d`

Production base used for this producer:
`main@f36de067ae2e82518360dbe045f71c700e200805`

That base is the D41 production merge SHA.

Do not rebase or replace the existing implementation unless a concrete defect is found.

## Read order

1. `mindy-successor/docs/tasks/CHAT5_CONTEXT_RECOVERY_LUMBER_STAY_v17_2026-10-04.md`
2. `mindy-successor/docs/tasks/CURRENT_CHAT5_TASK_POINTER.md`
3. `mindy-successor/docs/tasks/CHAT5_LUMBER_STAY_RETIREMENT_DECISION_v16.md`
4. `mindy-successor/docs/tasks/CHAT5_LUMBER_STAY_RETIREMENT_PRODUCER_v17.md`
5. `mindy-successor/docs/tasks/CHAT5_FINAL_ENDING_ID_MIGRATION_AUDIT_v15.md`

## Accepted Product authority

Product decision:
`chat5/lumber-stay-retirement-decision-v16@4f4df720c9677b4b9becc0cb8538da26a276f944`

The 1.0 live ordinary-career ending surface must remain exactly 40 canonical endings.

`lumber-stay` is retired from new play.

Do not alias it to:
- Hard Work;
- Forewoman;
- Forest Compact.

Historical completion evidence remains historical.

Historical `vitality` ownership is normalized to:
`legacy.lumber-stay.vitality`

That historical perk:
- remains exactly +1 daily Energy for historical owners;
- consumes no modern Strong Meta slot;
- cannot be newly acquired;
- cannot stack duplicate ownership.

## Existing implementation at cbeae73e...

The implementation already claims to provide:

- live catalog no longer contains `lumber-stay`;
- no new `vitality` acquisition;
- historical `lumber-stay` allowed only as retired completion evidence;
- historical `vitality`/completion normalizes to one legacy perk;
- eligible-only old state removed without reward;
- committed-but-unfinished old state cancelled and run resumes active;
- existing historical RunResult / transaction identity preserved;
- ended pre-RunResult saves receive deterministic compatibility proof without reward replay;
- profile merge / migration dedupe;
- live `ending/lumber-stay` presentation/source inventory retired;
- historical UI non-interactive with legacy localization;
- no Palace / Strong Meta / Hard Work / Secret Debt coupling.

Focused test added:
`mindy-successor/prior-work/astra/prototype-m3.2/tests/lumber-stay-retirement-v17.test.ts`

## Exact production delta from f36de067...

Production files changed:

- `content/definitions.json`
- `content/localization.json`
- `content/presentation-drafts/presentation-hardening-v9-manifest-v1.json`
- `content/presentation.json`
- `src/core/engine.ts`
- `src/core/lumberStayLegacy.ts`
- `src/ui/app.ts`
- `tests/lumber-stay-retirement-v17.test.ts`

Plus Chat 5 task/handoff docs.

## Important current evidence gap

There are currently **no GitHub Actions workflow runs** on this producer branch.

The previous Chat 5 handoff says the focused acceptance suite exists, but executable evidence has not yet been attached.

Therefore the new Chat 5 must first verify the existing exact implementation instead of writing a second version.

## New Chat 5 mission

1. Inspect exact head `cbeae73e8559d43fcce24213d6f5606b682b3e7d`.
2. Confirm the delta matches v16 Product authority.
3. Run focused executable verification only:
   - typecheck;
   - validate;
   - build;
   - `lumber-stay-retirement-v17.test.ts`;
   - ending migration / RunResult adjacency tests;
   - presentation/source-inventory integrity relevant to retired `lumber-stay`;
   - Strong Meta / Palace / Hard Work / Secret Debt isolation;
   - save/load idempotence and profile-merge dedupe.
4. Do **not** run full CI.
5. If a real defect exists, repair it narrowly on the same branch and rerun focused verification.
6. If green, update the handoff with exact run/job IDs or exact executable evidence, freeze the final SHA, and report:
   `READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.

## Safety constraints

Do not:
- recreate `lumber-stay` as a live ending;
- convert 24 visits into 50 Hard Work shifts;
- fabricate a canonical modern ending from historical state;
- convert `vitality` into Keystone / Specialist / Hard Work package;
- grant the legacy perk to new profiles;
- let legacy history count toward the canonical 40;
- let legacy history affect Palace qualification;
- replay old reward transactions;
- delete unrelated pending/queued scenes;
- modify D40/D41 canonical ending identities.

## Leader integration note

This producer is not next in the Chat 2 integration order. Chat 2 is currently assembling D42 Night.

When this producer is executable-green, freeze it and leave it queued for later selective current-main assembly.
