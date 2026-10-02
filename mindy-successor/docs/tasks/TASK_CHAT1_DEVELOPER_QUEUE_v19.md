# Chat 1 Developer Queue v19 — Palace True Ending Runtime Contract Prep

Status: **ACTIVE PREP ONLY / NO PRODUCTION FREEZE**
Owner: Chat 1 / Runtime + Integration Developer
Queue: C1D-205..216
Branch: `chat1/palace-true-ending-runtime-prep-v19`

Authority:
- `USER_DECISIONS_LOCKED_v1.md` D18
- `NEW_GAME_SPEC_v1.md` §9A
- `PALACE_HIDDEN_CAREER_DRAFT_v0.md`
- current ending/Meta commit-completion flow
- current typed 12-stat model.

Critical rule:
D18 requires **all 12 progression stats strictly >90%**. Current design does not lock raw stat maximum/cap. Do not assume raw >90 unless exact authority proves max=100. Preserve a normalized/percentage contract and mark raw conversion/cap behavior OPEN.

C1D-205 — exact current stat storage/range/cap audit.
C1D-206 — D18 eligibility contract: Palace unlocked + 12/12 >90% + PrinceVictory fact.
C1D-207 — prove Lust is excluded.
C1D-208 — Prince confrontation seam as an authority placeholder only; no combat/minigame/lore invention.
C1D-209 — True Ending eligibility remains non-terminal until explicit commit.
C1D-210 — completion returns a typed ReturnHome result without bypassing normal ending completion semantics.
C1D-211 — Meta reward contract for permanent NG+ `doubleAllProgressionStats` option.
C1D-212 — define exactly-once unlock persistence and New Life behavior.
C1D-213 — audit interaction with existing Meta bonuses/loadout; do not choose stacking order.
C1D-214 — audit stat-cap interaction after x2; leave ordering/clamp OPEN.
C1D-215 — natural acceptance design from 10/10 Palace unlock through eligibility/commit/completion/NG+ option.
C1D-216 — publish machine-readable prep contract + collision/rebuild ledger. No production Palace IDs, Prince mechanics or frozen candidate yet.
