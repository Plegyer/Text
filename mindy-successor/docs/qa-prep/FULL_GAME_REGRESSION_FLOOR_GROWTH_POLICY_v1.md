# Full-Game Regression Floor Growth Policy v1

Date: 2026-09-27  
Purpose: define how the retained regression floor grows as new careers/systems ship.

## Core principle

The regression floor is cumulative.

New production packages should add coverage for new behavior without silently deleting established architecture/save contracts.

Current known floor after PR27:

**221/221**

This number may increase, but the important requirement is retained invariant coverage, not count inflation.

---

# 1. Always retain architecture/save core

Do not remove without stronger replacements:

- architecture validation;
- Resolver/order behavior;
- orphan-state rejection;
- exactly-once reload;
- schema4 compatibility;
- ending/RunResult/Meta idempotency;
- NightFlow persistence;
- presentation semantic identity.

These remain relevant regardless of which careers ship next.

---

# 2. One natural-path smoke per major system

As a system becomes production-shipped, retain at least one representative no-injection natural path.

Examples:

## Career
`start -> unlock/available -> real shift -> milestone -> reload`

## School
`paid lesson -> pending result -> reload -> resolution`

## Poverty
`0 money -> street sleep -> next day -> recovery work`

## Secret Debt
`street lender -> accept -> delay -> activation -> forced Night -> outcome`

## Activity
`natural entry -> route -> progress -> result -> external continuation`

## Palace
`10/10 ordinary Hard Work -> unlock -> real Palace action`

A fixture-only state machine test does not replace the natural smoke.

---

# 3. Add exact locked-invariant sentinels

When Product locks a rule, add a narrow exact sentinel.

Examples:
- Lumber Hard Work exactly 50 shifts;
- exact reward ID;
- Palace unlock requires 10 ordinary Hard Work;
- hidden careers excluded;
- paid School Energy baseline;
- GIF mechanics independence.

Locked sentinels should be small and diagnostic.

Do not bury all locks inside one huge E2E only.

---

# 4. Distinguish runtime contracts from content-depth tests

Runtime tests prove:
- generic state/command semantics;
- migration;
- transaction;
- validation.

Content-depth tests prove:
- route count/content;
- specific challenge families;
- career-specific milestone chains;
- authored event pools.

Do not duplicate runtime tests for every career if the generic contract is already stable.

Add career-specific tests only where authored behavior differs.

---

# 5. Avoid redundant fixture-only duplication

Before adding a new test ask:
1. Does a current test already prove the same invariant?
2. Does the new test use only a different fixture name?
3. Does it add a new natural boundary or failure signal?

If no distinct value:
- do not add redundant test;
- keep one stronger canonical contract.

Regression floor quality matters more than raw count.

---

# 6. Keep subsystem natural smokes independent where valuable

One giant full-game E2E is useful but not enough.

Keep smaller natural smokes so failures localize to:
- School;
- poverty;
- Night;
- Activity;
- career;
- ending.

A broken late-game ending should not be the only signal that School payment replayed.

---

# 7. Add save/reload at transaction boundaries

For each new persisted feature, add at least one reload test at the point where replay would be dangerous.

Examples:
- after money charge;
- after item grant;
- pending event;
- route selected;
- debt accepted;
- delayed activation pending;
- ending committed;
- Meta completed.

Do not add reload after every line; select transaction boundaries.

---

# 8. Add negative tests for unavailable/invalid states

Every major package should add at least one high-value negative case:
- insufficient money;
- missing capability;
- wrong stage;
- blocked Night;
- duplicate use;
- stale save;
- repeated completion.

Negative tests should encode current authority, not stale pre-fix behavior.

---

# 9. Production-content floor

When a content pack ships, retain tests for:
- production IDs exist;
- natural reachability;
- cross-system public boundary;
- presentation/fallback;
- save/reload;
- ending/outcome where applicable.

Do not retain branch-only or synthetic content tests as production authority.

---

# 10. Presentation floor growth

For each major new package, add only the presentation coverage unique to it.

Global runtime stays covered by shared tests:
- semantic IDs;
- fallback;
- Animation Off;
- missing-media nonfatal;
- no timing coupling.

Package-specific tests should verify:
- slot registration;
- correct semantic identity;
- reload identity;
- asset/fallback presence.

---

# 11. Poverty/Secret Debt floor separation

Ordinary poverty and Secret Debt need separate retained floors.

Ordinary poverty:
- lodging ladder;
- zero-money continuation;
- street restrictions;
- recovery.

Secret Debt:
- lender;
- delayed activation;
- ordinary-job lock;
- forced Night;
- outcomes;
- Palace exclusion.

Do not let Secret Debt tests replace ordinary poverty coverage.

---

# 12. Career floor growth

For each newly shipped ordinary career retain at minimum:
- real repeatable shift;
- one seasonal distinction;
- typed career progression;
- one meaningful career-specific cross-system hook;
- one ending boundary;
- save/reload;
- presentation.

If a career design intentionally lacks a relationship/Activity hook, mark N/A rather than inventing one.

---

# 13. Palace floor

When Palace ships retain:
- 9/10 ordinary Hard Work -> locked;
- hidden endings do not substitute;
- 10/10 -> unlocked;
- one real Palace work path;
- save/reload;
- at least one Palace outcome transaction.

---

# 14. Test retirement policy

A stale test may be retired from the active floor when:
- its contract is intentionally superseded;
- stronger replacement exists;
- old assertion is now wrong under current authority.

Before retirement record:
- old test;
- old invariant;
- replacement test;
- why replacement is stronger/current.

Keep historical provenance in Git/docs.

Do not delete evidence silently.

---

# 15. Superseded negative tests

Negative tests require special review.

Examples of valid retirement:
- slash semantic ID rejection after slash IDs became accepted;
- immediate Forest advance expectation after option-model route requirement;
- worldFact capability assumption after inventory capability closure.

Do not keep obsolete negatives merely to preserve count.

---

# 16. Count policy

Test count is evidence chronology, not a product score.

Record exact counts when observed.

Do not require every PR to increase total count if:
- stale tests are replaced;
- equivalent duplicates removed.

Require invariant floor not to regress.

---

# 17. Regression floor ledger

Maintain a ledger with:
```text
Milestone:
Observed test count:
New invariants:
Superseded tests:
Replacement coverage:
```

Current historical sequence:
`187 -> 194 -> 200 -> 208 -> 209 -> 218 -> 221`

Future entries should state what changed, not only the number.

---

# 18. Full-check rule

Every production/runtime integration must run the full retained floor on the exact integration SHA.

Docs-only changes need not rerun gameplay tests solely to preserve the ledger.

Tests-only additions need execution before they become part of the retained floor.

---

# 19. Natural-path rule

A subsystem cannot join the production regression floor solely through seeded/fixture setup if it claims authored reachability.

At least one representative no-injection path is required.

Use:
`PRODUCTION_CONTENT_NATURAL_PATH_EVIDENCE_RULE_v1.md`

once available/current.

---

# 20. Final growth rule

As the game expands:
- keep green generic architecture once;
- add natural production smokes;
- add exact locks;
- add package-specific content behavior;
- add save/reload at commit boundaries;
- remove stale tests only with explicit replacement mapping.

No production runtime/UI/content file was modified by Chat 4.
