# Ordinary Poverty Production Pack Review Gate v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Target: Lead review of Chat 3 ordinary-poverty production wave (items 87–95)

## Gate purpose

Review the first authored ordinary-poverty content package without letting it drift into Secret Debt, lock provisional balance values, or regress the already-green Night/lodging anti-softlock foundation.

This gate assumes:
- ordinary poverty is independently playable;
- Secret Debt is a separate hidden route;
- normal/cheap/street lodging already exists;
- PR33 has merged the production anti-softlock regression.

---

# 1. Natural street reachability

Required production evidence:

```text
valid run
-> endDay
-> choose lodging.street
-> ordinary poverty content becomes eligible naturally
```

Do not count:
- direct pendingScene injection;
- direct poverty fact injection;
- fixture-only event invocation

as natural reachability.

At least one representative street event must be reached through the production Night/Resolver path.

---

# 2. Helpful / neutral / bad content separation

The authored street pool should contain distinguishable outcome families rather than one repeated penalty.

Review should verify production content has separate semantic behavior for:
- helpful/recovery opportunity;
- neutral/low-impact street life;
- bad/negative consequence.

The exact number of events per family is authoring-owned unless separately locked.

QA should verify the categories are mechanically distinguishable, not just different text over identical effects.

---

# 3. No Secret Debt bleed

Ordinary poverty pack must remain playable without:
- lender encounter;
- debt acceptance;
- hidden Slave career;
- forced Secret Debt Night;
- Secret Debt outcome state.

The ordinary street event namespace must not silently write:
- Secret Debt activation state;
- hidden-career progression;
- Palace-related hidden progress.

If a shared street trigger can later host Secret Debt, the provider/consumer boundaries must remain separate.

---

# 4. No guessed lender implementation

Chat3 ordinary-poverty items 87–95 must not introduce:
- lender chance;
- debt amount;
- activation delay;
- hidden career lock

unless those are explicitly assigned as Secret Debt work with Product authority.

Ordinary poverty implementation should not “prepare” Secret Debt by hard-coding Product choices.

---

# 5. Initial tuning is not Product lock

Review exact numeric content for:
- money gains/losses;
- next-day Energy changes;
- stat changes;
- event probabilities;
- cooldowns.

Classify each as:
- locked;
- simulation/balance baseline;
- authoring baseline;
- open.

Tests should prefer structural/relational assertions where values remain open.

Example:

Good:
`street recovery opportunity does not require upfront money`

Avoid unless locked:
`recovery reward must equal exactly 12 coins`

---

# 6. Anti-softlock remains intact

After any ordinary poverty event family, verify the run cannot enter an unrecoverable state solely because money is zero.

Required representative paths:
- helpful event -> next day -> starting work;
- neutral event -> next day -> starting work;
- bad event -> next day -> at least one legal recovery path.

A bad event may be painful.

It may not remove every legal income/sleep continuation unless an explicitly authored non-poverty terminal state applies.

---

# 7. Starting-job recovery

Retain PR33 contract:

After zero-money street sleep, at least one starting ordinary Work action remains reachable.

Current representative:
`lumber.shift`

Future poverty content must not:
- consume all next-day Energy below any legal action permanently;
- add a money prerequisite to every starting job;
- require an item purchase before all income sources.

---

# 8. School Night-study street exclusion

Ordinary poverty content must not accidentally make School Night study available on street unless Product explicitly changes housing requirements.

Current rule:
- normal/cheap housing can support School Night study;
- street does not.

Any new street event granting education benefits must use its own authored effect, not masquerade as the normal School Night-study action.

---

# 9. Save/reload before event delivery

Test:

```text
street lodging committed
-> poverty candidate/pending state
-> save/reload
-> same event eligibility/pending identity
```

No reroll if the event is already selected/pending.

If selection is intentionally made only after reload, persisted RNG must remain deterministic.

---

# 10. Save/reload after event resolution

For representative helpful/neutral/bad events:

```text
resolve event
-> save/reload
```

Verify:
- money/stat/item effects do not reapply;
- event history/maxShows persists;
- Night/day transition does not repeat;
- next-day modifier applies exactly once.

---

# 11. Event idempotency

One-time or cooldown events must use current event history/delivery semantics.

Reject:
- raw flag duplication where event history already owns one-time state;
- reload causing repeated free reward;
- reopening same resolved street event in the same Night.

---

# 12. Namespace separation

Ordinary poverty event IDs must remain in their accepted production namespace.

They must not collide with:
- Secret Debt namespace;
- School event namespace;
- Lumber event namespace.

Use the production namespace collision sentinel once integrated.

---

# 13. Declared capabilities

Each poverty pack must declare all typed reads/writes it uses.

Review:
- housing read;
- resources;
- stats;
- inventory if used;
- world facts if used;
- nextDay writes.

No cross-domain private-state reads.

---

# 14. Secret Debt state must remain absent

For the ordinary poverty wave, inspect changed production files for:
- SecretDebtState;
- debt activation flags;
- hidden Slave career;
- forced debt Night definitions.

If present without explicit ownership/task authority:
**BLOCK**

Ordinary poverty and Secret Debt are separate production packages.

---

# 15. Presentation fallback

Every meaningful poverty scene should have:
- semantic presentation identity;
- valid shipped static/text fallback;
- missing media nonfatal;
- Animation Off mechanics unchanged.

Final custom street GIFs are not required to accept the content package if fallback is valid.

---

# 16. Media cannot drive outcomes

Reject any implementation where:
- GIF completion applies poverty reward/penalty;
- timeout selects outcome;
- frame index changes money/Energy.

Poverty mechanics remain command/Resolver driven.

---

# 17. One-file ownership

Before Lead integration:
- verify Chat3 changed paths match assigned poverty ownership;
- shared runtime/schema/UI edits must have explicit Lead ownership;
- no file overlaps another active worker.

A content-only poverty wave should not modify shared core unless a demonstrated missing primitive exists.

---

# 18. Runtime-change necessity

Current generic systems already provide:
- lodging;
- Night resolver;
- events;
- money/stats/items;
- next-day modifiers;
- save/reload;
- presentation.

If Chat3 proposes shared runtime changes, require exact authored behavior that current primitives cannot express.

Do not reopen runtime for convenience.

---

# 19. Production-content validation

Require:
- unique IDs;
- pack namespace valid;
- all media refs known;
- all typed reads/writes declared;
- no contradictory conditions;
- free exit where required;
- valid delivery policy.

`npm run validate` must pass on exact integration SHA.

---

# 20. Targeted ordinary-poverty tests

At minimum retain/add:
1. natural street event reachability;
2. helpful event path;
3. neutral event path;
4. bad event path;
5. zero-money recovery;
6. save/reload pending event;
7. post-resolution idempotency;
8. Secret Debt state remains untouched;
9. presentation/fallback.

---

# 21. Exact CI requirement

On the Lead integration branch require:
- exact head SHA;
- `npm ci`;
- `npm run check`;
- observed test total/pass/fail;
- production validation result.

No static-review-only merge for production content.

---

# 22. Post-merge smoke

After merge to main, retain a short natural smoke:

```text
0 money
-> street lodging
-> ordinary poverty event
-> resolve
-> next day
-> starting work
```

This smoke must not enter Secret Debt.

---

# 23. Locked-invariant firewalls

Poverty package must not change:
- Lumber Hard Work 50-shift-only rule;
- `hardWork:lumber`;
- exact Forest success ActivityResult;
- Palace 10/10 ordinary Hard Work;
- Secret Debt exclusion from Palace;
- School paid/Night separation;
- GIF timing independence.

---

# Final review disposition

Use one:

## POVERTY_PACK_GREEN
Natural reachability, event categories, save/reload, anti-softlock, presentation and exact CI all pass.

## BLOCKED_SECRET_DEBT_BLEED
Ordinary poverty silently implements/locks Secret Debt.

## BLOCKED_BALANCE_LOCK
Open tuning is encoded as Product truth.

## BLOCKED_SAVE_RELOAD
Event/next-day effects replay or reroll incorrectly.

## BLOCKED_OWNERSHIP
Shared/foreign files changed without authority.

## BLOCKED_CI
Exact integration check is red or absent.

No production runtime/UI/content file was modified by Chat 4.
