# Chat 5 — Lumber-Stay Retirement / Legacy Policy v16

Status: **PRODUCT DECISION — READY FOR PRODUCT LOCK**

Scope: Product/migration policy only.  
No runtime changes in this branch.  
No Chat 2 assembly changes.  
No full CI.

Authority/context:

- current Chat 5 pointer: **LUMBER-STAY 1.0 RETIREMENT / LEGACY POLICY v16**;
- final ending identity audit: `chat5/final-ending-id-migration-audit-v15@288f4eae979eea223e9667352055f51946b5cb46`;
- canonical ordinary-career 1.0 surface: **40 endings** = 10 Hard Work + 14 D41 + 16 D40;
- current legacy ending:
  - ID: `lumber-stay`;
  - old requirement: 24 legacy Lumber visits;
  - old reward: `vitality`;
  - old effect: next-life daily Energy maximum +1;
- frozen D41 rule: `lumber-stay` / `vitality` must **not** be mapped to Forewoman, Forest Compact, or any modern D41 reward.

---

# 1. Locked 1.0 direction

## Decision

**Retire `lumber-stay` from new play.**

For 1.0:
- `lumber-stay` is **not a live ending**;
- it is not eligible in new or migrated active runs;
- it cannot be newly committed;
- it cannot be newly completed;
- it is not included in the live ending selector;
- it is not included in the canonical ordinary-career completion denominator;
- it is not counted as a 41st ordinary-career ending.

The live ordinary-career ending surface is therefore exactly the canonical **40**.

## No alias

`lumber-stay` has **no canonical replacement**.

It must never canonicalize to:
- `ending.lumber.forewoman`;
- `ending.lumber.forest`;
- `ending.lumber.hard-work`;
- any other ending.

Historical completion remains historical completion under the exact old ID:

`lumber-stay`

This preserves evidence without fabricating modern progression.

---

# 2. Legacy reward policy

## Old reward

Historical reward ID:

`vitality`

Historical effect:

**+1 to daily Energy maximum in future lives.**

The currently shipped prototype implements that directly through:

`meta.unlocks.includes('vitality')`

inside Energy maximum calculation.

That representation is retired for 1.0.

## Locked migration representation

Normalize historical ownership into the dedicated compatibility ledger:

`meta.activeLegacyPerks`

Exact legacy perk ID:

`legacy.lumber-stay.vitality`

After migration:
- `vitality` is removed from `meta.unlocks`;
- `legacy.lumber-stay.vitality` is stored at most once in `meta.activeLegacyPerks`;
- the old effect remains active only for profiles with historical evidence;
- the effect remains exactly **+1 daily Energy maximum**;
- it is not selectable;
- it consumes no Keystone slot;
- it consumes no Specialist slot;
- it is not a Hard Work package;
- it is not a modern unlock;
- it is never newly awarded in 1.0.

## Historical benefit is preserved

**The earned +1 Energy remains active in future runs for historical owners.**

Reason: retirement removes the obsolete route from new play, but it must not silently take away a permanent reward already earned by an existing profile.

This is a **legacy compatibility effect**, not a modern progression reward.

The implementation should place the legacy perk in the same additive Energy-max position formerly occupied by `vitality`:
- baseline daily Energy remains whatever the current economy/start-balance authority defines;
- this legacy perk contributes exactly +1;
- existing unrelated Energy modifiers continue to stack under their own rules;
- the legacy perk itself never stacks with duplicate `vitality` evidence.

If both old `vitality` and normalized `legacy.lumber-stay.vitality` exist, the migration resolves them to **one** legacy perk and therefore one +1 effect.

---

# 3. Evidence rules for legacy ownership

Migration must be conservative and must not fabricate completion.

## A. Completed `lumber-stay` evidence exists

If:

`meta.completedEndings` contains `lumber-stay`

then:
- preserve `lumber-stay` in historical completion evidence;
- add `legacy.lumber-stay.vitality` to `activeLegacyPerks`;
- remove `vitality` from normal unlocks if present;
- do not add Forewoman, Forest Compact, or Hard Work completion;
- do not increment canonical-40 completion progress.

A completed historical ending is sufficient evidence that the old permanent reward was earned, even if an old/corrupt save is missing the `vitality` unlock row.

## B. `vitality` evidence exists without completed ending evidence

If:
- `meta.unlocks` contains `vitality`;
- but `meta.completedEndings` does not contain `lumber-stay`;

then:
- preserve the reward benefit by adding `legacy.lumber-stay.vitality`;
- remove `vitality` from normal unlocks;
- **do not** fabricate `lumber-stay` completion.

The reward row is accepted as historical perk evidence, but not as proof that the ending transaction itself was completed.

## C. Both exist

Normalize to:
- historical completion `lumber-stay`;
- one `legacy.lumber-stay.vitality`;
- no live `vitality` unlock.

## D. Neither exists

Do not grant anything.

## E. Already-normalized legacy perk exists

Preserve and deduplicate it.

No migration pass may create a second +1 effect.

---

# 4. Completed historical run

A run already completed as `lumber-stay` is historical fact and must remain completed.

## Identity

For an ended historical run:
- `run.status` remains `ended`;
- `run.endings.committed` remains `lumber-stay`;
- `run.endings.result.endingId` remains `lumber-stay`;
- `meta.completedEndings` contains `lumber-stay`.

Do not rewrite any of those fields to a canonical modern ending.

## Runtime validation policy

Because `lumber-stay` is removed from the live ending catalog, save validation must distinguish:

1. **live ending IDs** — canonical catalog endings available for current gameplay;
2. **retired historical ending IDs** — accepted only as preserved historical completion evidence.

`lumber-stay` belongs to the second set.

A retired ID may be accepted in:
- historical `meta.completedEndings`;
- an already-ended run's committed ending;
- an already-ended run's RunResult ending ID.

It must **not** be accepted in:
- live/new eligibility;
- a new commit command;
- an active-run ending choice;
- a newly created RunResult.

This avoids keeping a hidden 41st live ending definition solely to make old saves parse.

---

# 5. Historical RunResult and transaction proof

## Existing RunResult

If the old save already has a RunResult for `lumber-stay`:
- preserve its `resultId`;
- preserve its `transactionId`;
- preserve `completedAtDay`;
- preserve `firstCompletion` as historical data;
- preserve existing `appliedMetaRewardIds` as audit/history data;
- ensure that exact transaction ID remains in `meta.appliedResultTransactions`.

Do not regenerate a new transaction merely because the ending is retired.

Do not rewrite a legacy reward proof into a modern reward ID.

## Old ended save with no RunResult

For an older schema that records an ended `lumber-stay` but predates RunResult:

Create only the same kind of **compatibility RunResult proof** already used by existing save migration:
- basis uses the original `run.id`;
- ending identity uses original `lumber-stay`;
- transaction/result identity is deterministic;
- `firstCompletion = false`;
- `appliedMetaRewardIds = []`;
- insert the generated transaction proof into `meta.appliedResultTransactions`.

Why `firstCompletion=false`: migration is recording an already-completed historical transaction, not replaying the reward.

The legacy perk is normalized separately from historical completion/reward evidence.

## Profile-only completion evidence

If only `meta.completedEndings=['lumber-stay']` exists and there is no historical run identity available:
- preserve the completion row;
- grant/normalize the legacy perk;
- do **not** fabricate a fake RunResult or transaction ID without a run to anchor it.

---

# 6. Committed but not completed historical state

Old state:
- `run.endings.committed === 'lumber-stay'`;
- no completed RunResult for it.

This is **not historical completion**.

Migration behavior:
- remove `lumber-stay` from `run.endings.eligible`;
- set `run.endings.committed = null`;
- set `run.endings.result = null`;
- if status is `ending_committed`, return the run to `active`;
- preserve all unrelated career progress, counters, inventory, School, relationships, Activity state, and Meta;
- do not grant `legacy.lumber-stay.vitality` unless independent reward evidence already exists in Meta;
- do not grant any canonical Lumber ending;
- do not auto-complete anything.

If an ending-specific pending/queued scene exists only because `lumber-stay` was committed, that obsolete ending-owned instance may be retired with the commitment. Unrelated pending/queued content must not be discarded.

The player may continue ordinary play and later satisfy a canonical ending normally.

---

# 7. Eligible-only historical state

Old state:
- `run.endings.eligible` contains `lumber-stay`;
- it was never committed/completed.

Migration behavior:
- remove `lumber-stay` from `eligible`;
- grant no ending;
- grant no perk;
- preserve ordinary Lumber progress exactly;
- do not transform 24 legacy visits into 50 Hard Work shifts;
- do not infer Forewoman/Forest readiness.

After migration the resolver can never re-add `lumber-stay`, because it is absent from the live ending definitions.

---

# 8. New play behavior

After retirement:
- no `lumber-stay` ending definition participates in live catalog registration;
- 24 Lumber visits do not create any ending;
- `vitality` is not newly awardable;
- only canonical Lumber endings are live:
  - `ending.lumber.hard-work`;
  - `ending.lumber.forewoman`;
  - `ending.lumber.forest`.

Old `lumber` visit counters may remain for unrelated legacy compatibility, but they have no `lumber-stay` ending consumer.

No new player can acquire `legacy.lumber-stay.vitality`.

---

# 9. Canonical completion counting

`lumber-stay` remains historical evidence but is excluded from canonical 1.0 ordinary-ending completion metrics.

Any “ordinary career endings completed” denominator/numerator for 1.0 must operate on the canonical 40-ID set, not raw `meta.completedEndings.length`.

Therefore a legacy profile may legitimately have:
- all 40 canonical ordinary endings;
- plus `lumber-stay` in historical completion records.

That profile is still **40/40 canonical**, not 41/41.

Historical completion must not affect:
- D23 Palace qualification;
- Strong Meta capacity;
- Hard Work package ownership;
- advanced ending reachability;
- Secret Debt;
- Activity ending families.

---

# 10. Presentation policy

## Live ending UI

Remove `lumber-stay` from:
- live ending/fate cards;
- live ending presentation registry;
- live exact presentation mapping;
- accessibility traversal for live ending controls.

There must be no interactive `ending/lumber-stay` card after retirement.

## Dedicated presentation semantic

Retire the live semantic ID:

`ending/lumber-stay`

from active presentation mapping.

Remove:
- `presentation.json` explicit `ending/lumber-stay` slot;
- `presentation-hardening-v9-manifest-v1.json` activeExact row;
- source-inventory semantic reference to `ending/lumber-stay`;
- any target-registry/fixture row that declares it a live ending semantic.

The current dedicated asset:

`assets/presentation/ending-lumber-stay.svg`

does not need to be physically deleted for Product correctness, but it must not remain in the **live source inventory** solely under the retired ending identity.

## Historical display

A loaded historical completion may still be shown in a separate, non-interactive **Legacy / Historical fate** area.

That historical display:
- is not part of the live ending selector;
- has no Accept button;
- has no “eligible/locked” state;
- cannot trigger ending commands;
- should use an existing neutral Lumber/result fallback rather than requiring a live `ending/lumber-stay` presentation slot.

This keeps historical evidence visible without recreating a 41st live semantic ending surface.

---

# 11. Localization policy

Current active localization contains:
- `ending.lumber-stay.title`;
- `ending.lumber-stay.description`;
- `unlock.vitality.label`;
- `presentation.static.ending.lumber-stay.alt`;
- `presentation.static.ending.lumber-stay.caption`.

These must not remain active canonical-ending/unlock labels after retirement.

## Historical strings

Preserve user-visible history under a legacy namespace, not the live ending namespace.

Required historical localization identities:

- `legacy.ending.lumber-stay.title`
  - RU: `Бригадир поневоле`
  - EN: `Reluctant Forewoman`
- `legacy.ending.lumber-stay.description`
  - preserve the historical 24-shift / +1 Energy meaning for archived-save display;
- `legacy.perk.lumber-stay-vitality.label`
  - describes the preserved historical +1 daily Energy benefit.

UI may add a localized “Legacy / Historical” badge/status around the archived ending.

## Retired active keys

After all historical consumers use the legacy namespace, remove or stop referencing as active:
- `ending.lumber-stay.title`;
- `ending.lumber-stay.description`;
- `unlock.vitality.label`;
- `presentation.static.ending.lumber-stay.alt`;
- `presentation.static.ending.lumber-stay.caption`.

Do not rename the historical ending ID itself.

---

# 12. Save/load idempotence

The migration must be idempotent.

After the first load:
- `lumber-stay` historical completion remains exactly once;
- `legacy.lumber-stay.vitality` exists at most once;
- `vitality` no longer exists in normal unlocks;
- live eligibility contains no `lumber-stay`;
- uncompleted committed state is already cleared;
- completed historical RunResult identity is unchanged;
- transaction proof is unchanged/deduplicated;
- no modern ending/reward is added.

Loading the migrated save again must produce the same ending/Meta identity state.

Profile merge must union/dedupe `legacy.lumber-stay.vitality` exactly like other `activeLegacyPerks`.

---

# 13. Required implementation acceptance cases

The future producer/assembly implementation should cover at least these exact cases:

| Case | Expected result |
| --- | --- |
| fresh 1.0 profile, 24 legacy Lumber visits | no `lumber-stay`, no `vitality`, no legacy perk |
| old eligible-only `lumber-stay` | eligibility removed; no completion/reward |
| old committed but unfinished `lumber-stay` | commitment cleared; active run resumes; no reward |
| old completed `lumber-stay`, has `vitality` | historical completion preserved; `vitality` removed; one legacy perk |
| old completed `lumber-stay`, missing `vitality` | historical completion preserved; one legacy perk backfilled |
| old `vitality` only | one legacy perk; no fabricated completion |
| both old `vitality` and normalized legacy perk | one legacy perk; never +2 |
| historical ended RunResult | exact old ending/result/transaction identity preserved |
| pre-RunResult ended save | deterministic compatibility proof; no reward replay |
| second parse/load | byte-semantically equivalent ending/legacy ownership |
| profile merge | legacy perk survives and dedupes |
| canonical Lumber endings | unaffected |
| Palace / Strong Meta / Hard Work / Secret Debt | unaffected |

---

# 14. Explicit non-goals / forbidden repairs

Do not:
- alias `lumber-stay` to Forewoman;
- alias `lumber-stay` to Forest Compact;
- alias `lumber-stay` to Hard Work;
- convert 24 visits into 50 Hard Work shifts;
- convert `vitality` into a Keystone;
- convert `vitality` into a Specialist;
- convert `vitality` into a Hard Work bonus/package;
- grant a canonical ending because a legacy reward exists;
- grant the legacy +1 to new profiles;
- keep `lumber-stay` silently live only to satisfy save validation;
- replay an old reward transaction on migration;
- count historical `lumber-stay` toward the canonical 40;
- create Palace access or Secret Debt behavior from this migration.

---

# 15. Product lock summary

**1.0 live behavior**
- retire `lumber-stay`;
- remove new `vitality` acquisition;
- canonical ordinary-career ending surface = exactly 40.

**Historical completion**
- retain exact identity `lumber-stay`;
- never canonicalize to a modern ending;
- allow the ID only as retired historical evidence.

**Historical reward**
- normalize `vitality` into `activeLegacyPerks: ['legacy.lumber-stay.vitality']`;
- preserve exactly +1 daily Energy for historical owners;
- no slots, no selection, no new acquisition, no stacking duplicates.

**Incomplete old state**
- eligible-only: delete eligibility;
- committed-but-unfinished: cancel commitment and resume active run;
- no free completion/reward.

**RunResult**
- preserve existing old proof exactly;
- synthesize compatibility proof only when migrating an already-ended pre-RunResult save;
- never replay reward application.

**Presentation/localization**
- remove live `ending/lumber-stay` semantic/source inventory;
- historical record is non-interactive and uses legacy localization + neutral existing Lumber imagery.

**Migration**
- deterministic;
- idempotent;
- conservative;
- no fabricated modern progression.

**READY_FOR_PRODUCT_LOCK**
