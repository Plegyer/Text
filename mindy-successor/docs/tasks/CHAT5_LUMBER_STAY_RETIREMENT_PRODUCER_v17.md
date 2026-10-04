# Chat 5 — Lumber-Stay Retirement Producer v17

Implementation authority:
`CHAT5_LUMBER_STAY_RETIREMENT_DECISION_v16.md@4f4df720c9677b4b9becc0cb8538da26a276f944`

Production base:
`main@f36de067ae2e82518360dbe045f71c700e200805`

## Producer scope

This candidate retires `lumber-stay` from new play while preserving conservative historical compatibility.

Implemented behavior:

- live catalog no longer contains `lumber-stay`;
- live ordinary-career set remains exactly 40 canonical endings;
- no new `vitality` acquisition exists;
- historical `lumber-stay` remains an allowed retired completion identity only;
- historical `vitality`/completion evidence normalizes to exactly one
  `legacy.lumber-stay.vitality` entry in `meta.activeLegacyPerks`;
- that legacy perk preserves exactly +1 daily Energy and consumes no modern slot;
- eligible-only old state is removed without reward;
- committed-but-unfinished old state is cancelled and resumes active;
- existing historical RunResult/transaction identity is preserved;
- ended pre-RunResult saves receive deterministic compatibility proof without reward replay;
- migration and profile merge dedupe are idempotent;
- live `ending/lumber-stay` presentation/source inventory is retired;
- historical UI is non-interactive, uses legacy localization, and reuses neutral Lumber result imagery;
- Forewoman, Forest Compact and Hard Work identities are untouched;
- no Palace, Strong Meta, Hard Work package or Secret Debt coupling is introduced.

Focused acceptance lives in:
`tests/lumber-stay-retirement-v17.test.ts`.

Full CI is intentionally not part of this producer lane.

## Focused verification — 2026-10-04

Executable verification target:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

This is the v17 producer head plus one narrow QA-only repair:
`tests/presentation-ending-parity-v9.test.ts` had two stale hard-coded exact-static ending counts (`9`) after the intentional retirement of `ending/lumber-stay`; both expectations were aligned to the new exact count `8`. No runtime, content, migration, presentation registry, reward, Palace, Strong Meta, Hard Work, or Secret Debt behavior changed in that repair.

The delta from the original implementation head
`cbeae73e8559d43fcce24213d6f5606b682b3e7d`
to the verified target is exactly one test file with 2 additions / 2 deletions.

Focused GitHub Actions evidence:

- workflow run: `37206223034`
- job: `111447848659`
- temporary QA branch: `chat5/lumber-stay-v17-focused-qa-20261004`
- runner: self-hosted Windows X64
- Node: `v22.18.0`
- checkout was pinned to `39912e7435c3707d98f96fe550d697c20ac0bedb`
- full CI was not run.

Exact focused results:

- `npm run typecheck` — PASS
- `npm run validate` — PASS; `Content OK: 84 packs, 357 events, 39 actions, 42 endings.`
- `npm run build` — PASS; `Built renderer, content catalog and desktop save validator.`
- `node --experimental-strip-types --test tests/lumber-stay-retirement-v17.test.ts` — PASS, 9/9
- `node --experimental-strip-types --test tests/ending-meta.test.ts tests/migration.test.ts tests/advanced-endings-tranche-a-v11.test.ts` — PASS, 31/31
- `node --experimental-strip-types --test tests/lumber-stay-retirement-v17.test.ts tests/presentation-source-integrity-v9.test.ts tests/presentation-ending-parity-v9.test.ts` — PASS, 15/15
- `node --experimental-strip-types --test tests/strong-meta-engine-integration-v7.test.ts tests/hard-work-palace-meta-smoke.test.ts tests/hard-work-meta-migration-v5.test.ts tests/chat3-secret-debt-separation-v2.test.ts` — PASS, 20/20

Verified acceptance includes:

- canonical ordinary-career live surface remains exactly 40;
- no live `lumber-stay` or newly awardable `vitality`;
- historical RunResult / transaction identity preservation;
- deterministic pre-RunResult compatibility proof without reward replay;
- second-load idempotence;
- profile-merge legacy-perk dedupe;
- retired `ending/lumber-stay` presentation/source inventory;
- Strong Meta / Palace / Hard Work / Secret Debt isolation.

No merge to `main` was performed.

Status: **READY_FOR_CHAT2_ASSEMBLY**

