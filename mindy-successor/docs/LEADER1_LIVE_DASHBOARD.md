# Leader 1 — Live Dashboard

Status: **LIVE / MUTABLE**
Snapshot: 2026-10-01
Rule: verify Git before acting; Git overrides this snapshot.

## Project moment

White Squirrel Chronicles is in **full-game production/integration**, not architecture discovery.

Current main at this snapshot:
`fda3dcb66d6fdb40230712e65f4cc4605d9b1124`

Current main CI:
- `mindy-successor check` run #488 / id `36817127290`;
- **SUCCESS**;
- main remains on the 556-test / 17-pack / 46-event / 35-action / 9-ending baseline until a production candidate is merged.

The game runtime is healthy. The limiting work is making the full designed game naturally playable.

## Important corrected acceptance truth

Chat 4 found a real current-main defect:

- Satyr Maid and Undead Farm are Day-1 selectable;
- their first real shift works;
- on current main their second shift fails because each action unconditionally tries to execute its one-time `first-shift` career transition again;
- therefore current main does **not** yet have naturally repeatable Satyr Maid / Undead Farm work loops.

Authoritative QA evidence:
- `docs/tasks/CHAT4_OPEN_PR_DISPOSITION_LEDGER_2026-10-01.md`;
- `docs/tasks/CHAT4_EXECUTABLE_ACCEPTANCE_TRUTH_2026-10-01.md`.

Do not describe those two careers as naturally repeatable until a repaired candidate is QA-accepted and merged.

## Worker state

| Worker | Queue | Current delivery state | What it is doing now |
|---|---|---|---|
| Chat 1 Developer | C1D-85..96 | PR #147, frozen exact head `e9e1c4d5cdafcdf5e8571170cd9b699426536746`, CI #483 **GREEN — 572/572, validator 18 endings** | Repairs starter repeatability without weakening generic typed transitions; adds seven late-career unlocks, nine missing ordinary Hard Work endings, all-ten Meta, Palace 10/10 predicate and natural regressions. Previous QA block must be re-gated on this repaired head. |
| Chat 2 Presentation | C2-109..120 | PR #151, frozen exact head `463d877009b5ecc1d255d7aa27a91bb7c38016e5`, CI #474 **GREEN — 565/565** | Full-roster Hard Work/late-career presentation, starter media pools, RU/EN, accessibility and safe static fallback. Awaiting QA after higher-priority shared runtime gate. |
| Chat 3 Forest/Poverty | C3-109..120 | PR #146 head `e750480404b1270ffbe47ca1dad2cb381bcf29d1`, CI #436 **RED** (539/568) | Must repair its production-promotion candidate. It is not QA-eligible. Do not count its promoted variants as shipped. |
| Chat 4 QA | C4-124 | Previous blocker evidence merged on main | Re-gate repaired Chat 1 PR #147 exact head first. QA does not implement fixes. After that gate, move to the next green/frozen candidate. |
| Chat 5 School | C5-109..120 | PR #156 current head `97b659d78ac3a2ccfe72c556344631f7de570507`; CI #489 **GREEN — 570/570, validator 70 events** | Promotes reachable School teacher/lesson/Night-study RU/EN content using existing mechanics. PR metadata has now been updated to **CANDIDATE_FROZEN** on this exact green head. It is QA-ready after the higher-priority PR #147 / then #151 sequence unless Lead changes order. |

## Open PRs that matter

### Active current-wave candidates
- #147 — Chat 1 shared runtime / career unlock / Hard Work / Meta. **Green and frozen; QA re-gate required.**
- #151 — Chat 2 presentation production. **Green and frozen; QA pending.**
- #146 — Chat 3 Forest/poverty production promotion. **Red; repair required.**
- #156 — Chat 5 School production promotion. **Exact-head CI #489 green and exact head explicitly frozen.**

### Selective-source legacy PRs
These contain distinct useful deltas but are **not** safe whole-PR merges:
- #124 — Forest + exact paid-course School consumer/wiring delta;
- #136 — presentation/accessibility/ending-state delta;
- #139 — central actionAvailability + exact Night-study UI consumer delta;
- #142 — regression-only selective source dependent on production seams.

### Closed/superseded backlog
Closed as superseded/no longer live candidates:
- #132, #134, #138, #140;
- #143 and #145 after their v11 successors became the active work lines;
- #152 duplicate/draft Chat 2 candidate;
- #157 duplicate Chat 4 follow-up.

## Immediate integration order

1. **Chat 4 re-gates PR #147 repaired frozen head.**
2. If accepted, integrate PR #147 on current main and require post-merge green CI.
3. Gate/integrate PR #151 where it matches the newly merged gameplay identities.
4. Wait for Chat 5 #156 exact-head green, then QA/integrate it.
5. Chat 3 #146 must be repaired before QA.
6. Separately consolidate the unique #124/#136/#139 deltas on a fresh Lead branch; do not merge those old branches wholesale.
7. Update this dashboard after each material merge/disposition.

## Product critical path after the current wave

The next major playable milestone is **Satyr Maid — Complete Career Slice**.

It must be a natural clean-run path:
- repeatable work;
- real career stages;
- relationship/Night depth;
- at least one School/item/cross-system hook;
- naturally reachable Hard Work;
- at least one complex ending;
- explicit ending commitment/completion;
- correct Meta effect in New Run;
- no direct state injection in the acceptance path.

Then complete Undead Farm the same way, then the seven late ordinary careers, School/Forest/item depth, Secret Debt, Palace, natural 160-day/NG+/Windows acceptance.

## Definition of done before GIF-only phase

Do not say "only GIFs remain" until:
- all 10 ordinary careers are complete and naturally reachable;
- Palace and Secret Debt are playable;
- School and Activity have target progression depth;
- meaningful items have natural acquisition;
- required endings and Meta are naturally reachable;
- save/reload, RU/EN, accessibility, long runs and Windows delivery are verified;
- every still-missing visual already has a stable presentation identity and usable static/text fallback.

## Takeover procedure for the next Leader 1

Read:
1. `LEADER1_START_HERE.md`;
2. this dashboard;
3. `LEAD1_CURRENT_STATE_v1.md`;
4. locked Product decisions and `EXECUTABLE_TZ_v1.md`;
5. all five current task pointers.

Then verify:
- current main + latest main CI;
- open PRs;
- exact worker branch heads;
- candidate CI/freeze status.

After verification, update stale dashboard rows and act on the next integration decision. Do not reconstruct leadership state from old chat prose.
