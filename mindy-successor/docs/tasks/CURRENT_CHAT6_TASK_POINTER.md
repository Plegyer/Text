# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE HIDDEN / META CAREER**
Owner: Chat 6 / Full-Career Producer D
Branch to use: `chat6/palace-complete-reset-v1`

## Assignment

Build the **Palace hidden/meta career** as far as current authority permits, as one coherent late-game career slice.

Authority:
- `mindy-successor/docs/PALACE_HIDDEN_CAREER_DRAFT_v0.md`
- `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md` D6/D15/D18
- current Meta/ending/career infrastructure on main
- historical Palace authored prep PR #247 @ `5a2e72cc530e4edbe41d0d03e4904e2272614e9e` is source-only and predates D18; selectively reuse only after revalidation.

Locked requirements:
- Palace is outside the 10 ordinary careers;
- unlock requires unique Hard Work completion for all 10 ordinary professions;
- Secret Debt does not count;
- Palace remains a real repeatable career with progression and legacy-sensitive options;
- at least Service Life / Court Power / Inner Truth outcome families;
- True Ending / Return Home additionally requires Palace unlocked, all 12 progression stats strictly >90%, Lust excluded, Prince victory, then return home and permanent optional NG+ x2-all-12-stats unlock;
- ending eligibility remains non-terminal and completion/meta reward remains exactly-once.

## Dependency and authority firewall

Artist is currently in Chat 2 integration; Assassin and Prostitute are being built by Chats 3/4. Do not hardcode future unpublished career facts merely to make Palace tests pass.

Do not invent:
- exact Palace role/name;
- Prince identity/lore or confrontation mechanics;
- global mystery;
- exact non-True-Ending rewards;
- exact runtime/presentation IDs where no authority exists;
- x2 ordering/cap interaction;
- raw stat-cap interpretation beyond the locked percentage requirement;
- day-1 vs invitation availability after Meta unlock.

Build all independent Palace state/progression/legacy/ending infrastructure that can safely use current shipped facts. Record exact blockers for unresolved dependencies and continue non-conflicting work.

## Delivery

Do not claim COMPLETE until 10/10 ordinary-career prerequisites are naturally achievable on the integration baseline and unresolved Product blockers needed for acceptance are resolved.
No early draft PR. Candidate-ready -> focused PR -> frozen exact head -> executable CI -> Chat 2 technical QA/integration -> Leader 1 final acceptance.
