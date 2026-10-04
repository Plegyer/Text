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
