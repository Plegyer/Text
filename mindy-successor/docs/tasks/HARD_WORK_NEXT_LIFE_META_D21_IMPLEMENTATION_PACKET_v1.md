# D21 Hard Work Next-Life Meta — Implementation Packet v1

Status: **READY FOR LEADER / PRODUCT DECISION**
Owner: Chat 4
Audit source: `Plegyer/Text` current main `04d1c0afff2dbb776fde4842d1fea6041fef4061`
Branch: `chat4/hard-work-next-life-meta-packet-v1`
Authority:
- `USER_DECISIONS_LOCKED_v1.md` D5, D6, D14, D15, D18, D19, D21;
- current shipped runtime and tests at the audited SHA.

This packet does **not** change shared runtime. It records the exact current behavior, the D21 delta, the files/functions that will need implementation work, acceptance contracts, and Product decisions still required.

## 1. Locked D21 target

Completing an ordinary profession through its Hard Work ending must permanently do two things for later lives:

1. that exact ordinary profession is available from the start of subsequent runs, regardless of its normal stat/year gate;
2. it unlocks a profession-specific selectable **+5 starting-stat bonus** in New Game setup.

The +5 is optional, not automatic.

The exact profession -> stat mapping is **not locked** and must not be implemented until Product locks it.

D21 does not change:
- the ordinary ten-career set;
- the three baseline starter careers for a fresh profile;
- Hard Work completion identity/reward IDs;
- Palace 10/10 counting;
- Secret Debt separation.

For a profile with no prior Hard Work, Day 1 still exposes exactly the baseline starter trio. D21 adds inherited early access only on later lives for careers already present in `meta.hardWorkProgress`.

## 2. Current ten ordinary profession unlock gates

Production action IDs and current normal gates in `content/definitions.json`:

| Profession | Action | Current normal Day/run gate |
| --- | --- | --- |
| Dwarven Lumber | `lumber.shift` | none; baseline starter |
| Satyr Maid | `satyr-maid.shift` | none; baseline starter |
| Undead Farm | `undead-farm.shift` | none; baseline starter |
| Tavern | `tavern.shift` | `(charm >= 45 AND sociability >= 35) OR year >= 2` |
| Hunter | `hunter.shift` | `(dexterity >= 25 AND endurance >= 20 AND wits >= 15) OR year >= 2` |
| Guard | `guard.shift` | `(strength >= 30 AND endurance >= 30 AND manners >= 20) OR year >= 2` |
| Merchant | `merchant.shift` | `(wits >= 20 AND reason >= 20 AND sociability >= 15) OR year >= 2` |
| Artist / Geisha | `artist-geisha.shift` | `(creativity >= 35 AND manners >= 25 AND grooming >= 30) OR year >= 3` |
| Assassin | `assassin.shift` | `(dexterity >= 30 AND wits >= 25 AND reason >= 20) OR year >= 3` |
| Voluntary Prostitute / Professional | `prostitute.shift` | `(sexuality >= 55 AND charm >= 40 AND sociability >= 35) OR year >= 3` |

The current gate implementation is generic:

- `src/core/engine.ts::starterCareerIds` = Lumber, Satyr Maid, Undead Farm.
- `src/core/engine.ts::ordinaryCareerForShiftAction()` maps `*.shift` to the ordinary career ledger.
- `src/core/engine.ts::actionAvailable()` first evaluates the action's authored conditions and currently does **not** consult `meta.hardWorkProgress`.

Therefore D21 should not rewrite ten action definitions. The normal gates must remain authored as-is and the inherited Hard Work access must be a generic availability override.

## 3. Current Hard Work completion / Meta plumbing

### 3.1 Master ordinary-career ledger

`src/core/schema.ts::ordinaryHardWorkCareers` currently contains exactly:

`lumber, satyr-maid, undead-farm, tavern, hunter, guard, merchant, artist-geisha, assassin, prostitute`.

`metaRewardSchema` already supports:

`{ kind: 'hardWork', rewardId: 'hardWork:<career>', career: <career> }`.

### 3.2 Production Hard Work endings

All ten production Hard Work endings currently use `completed_shifts >= 50` and publish one Hard Work Meta reward:

| Career | Ending | Meta reward ID |
| --- | --- | --- |
| Lumber | `ending.lumber.hard-work` | `hardWork:lumber` |
| Satyr Maid | `ending.satyr-maid.hard-work` | `hardWork:satyr-maid` |
| Undead Farm | `ending.undead-farm.hard-work` | `hardWork:undead-farm` |
| Tavern | `ending.tavern.hard-work` | `hardWork:tavern` |
| Hunter | `ending.hunter.hard-work` | `hardWork:hunter` |
| Guard | `ending.guard.hard-work` | `hardWork:guard` |
| Merchant | `ending.merchant.hard-work` | `hardWork:merchant` |
| Artist / Geisha | `ending.artist-geisha.hard-work` | `hardWork:artist-geisha` |
| Assassin | `ending.assassin.hard-work` | `hardWork:assassin` |
| Prostitute / Professional | `ending.prostitute.hard-work` | `hardWork:prostitute` |

For non-Lumber careers, the 50-shift values above are current production facts; this packet does not elevate them into new Product locks.

### 3.3 Exactly-once completion path

Current path in `src/core/engine.ts`:

1. `completeEndingMutable()` calculates the RunResult transaction identity.
2. On first completion it reads `ending.metaRewards`.
3. `applyMetaRewardMutable()` adds the career once to `meta.hardWorkProgress`.
4. `ensurePalaceUnlock()` derives Palace from all ten ordinary Hard Work careers.
5. RunResult stores the applied reward IDs and transaction proof.
6. `parseSave()` validates/merges transaction proof and unions protected Meta on import.

This is already the correct permanent ledger for D21. A second permanent “early career unlock” ledger would be redundant and risks drift. **Use `meta.hardWorkProgress` as the single source of truth.**

## 4. Critical legacy behavior that D21 supersedes

Current main already has an older automatic next-life Hard Work benefit in `src/core/engine.ts`:

- `applyHardWorkStartingBonuses()` automatically grants +3/+3 to two stats for every completed non-Merchant Hard Work career;
- `freshSave()` automatically grants Merchant Hard Work +600 starting money.

Current examples:
- Lumber: Strength +3, Endurance +3;
- Satyr Maid: Charm +3, Grooming +3;
- Undead Farm: Reason +3, Magic +3;
- Tavern: Sociability +3, Manners +3;
- Hunter: Dexterity +3, Wits +3;
- Guard: Endurance +3, Manners +3;
- Artist/Geisha: Creativity +3, Grooming +3;
- Assassin: Dexterity +3, Wits +3;
- Prostitute: Sexuality +3, Charm +3;
- Merchant: +600 starting money.

`tests/ordinary-hard-work-meta-production.test.ts` and `tests/ending-meta.test.ts` explicitly assert this old behavior.

**D21 implementation must replace this legacy automatic reward behavior, not stack the new selectable +5 on top of it.**

After D21 implementation:
- no Hard Work profession bonus is applied automatically merely because `hardWorkProgress` contains the career;
- Merchant must not retain the old automatic +600 unless separately re-locked by Product;
- the D21 +5 applies only when the player selects an unlocked profession-specific bonus in New Game setup.

## 5. Recommended generic D21 design

### 5.1 Early profession access

Add one generic helper, conceptually:

`hardWorkCareerAvailableFromStart(meta, career) = meta.hardWorkProgress.includes(career)`.

Then make ordinary career availability obey this precedence:

1. **global/domain prohibition** (notably Secret Debt bound-state lock) may deny the action;
2. inherited D21 Hard Work access may bypass only the career's normal stat/year gate;
3. otherwise evaluate the existing authored action conditions normally.

Do not delete or mutate normal action conditions. They remain the source for fresh-profile progression and for careers whose Hard Work has not been completed.

### 5.2 Selectable +5 option

Do not derive a second unlock table. Available D21 bonus options are exactly the ordinary careers present in `meta.hardWorkProgress`.

Recommended run-setup representation:

`run.character.creation.selectedHardWorkBonuses: OrdinaryHardWorkCareer[]`

Why an array rather than a single scalar:
- D21 says each completed profession unlocks an option;
- D5 says strong modifiers live in a selectable pre-run loadout;
- the exact loadout slot/budget count is still open.

The schema can represent any future allowed cardinality without changing the save shape again. The eventual Product loadout rule decides how many entries are legal.

Selection itself should not mutate stats live. During setup:
- UI records/removes selected career IDs;
- `finishCreation` validates every selected career is in `meta.hardWorkProgress`;
- after Product mapping is locked, each selected career resolves to one stat and applies exactly +5 once;
- completion then becomes immutable as today.

This avoids apply/reverse arithmetic while the player is editing the setup.

### 5.3 Mapping data

Once Product locks mapping, prefer one data-driven career->stat table rather than ten branches inside `freshSave()`.

Recommended semantic shape:

`{ career: OrdinaryHardWorkCareer, stat: Stat, amount: 5 }`

The amount is locked by D21; the `stat` field is the pending Product mapping.

The table may live in target definitions/content if the team wants Product data outside engine code. Whichever placement Leader 1 chooses, catalog/schema validation must require:
- all ten ordinary careers exactly once;
- only the 12 progression stats;
- amount exactly 5;
- no Secret Debt or Palace entry.

## 6. Profession -> +5 stat mapping proposal

**PROPOSAL ONLY — AWAITING PRODUCT LOCK. DO NOT IMPLEMENT FROM THIS TABLE.**

| Ordinary profession | Proposed +5 stat | Rationale |
| --- | --- | --- |
| Dwarven Lumber | Strength | primary physical identity and current wage axis |
| Satyr Maid | Grooming | differentiates service/presentation mastery from Tavern and Prostitute |
| Undead Farm | Magic | strongest profession-specific supernatural axis |
| Tavern | Sociability | direct social-service identity |
| Hunter | Dexterity | field precision/mobility identity |
| Guard | Endurance | sustained patrol/duty identity |
| Merchant | Reason | commercial judgment and analysis; avoids preserving the obsolete money reward |
| Artist / Geisha | Creativity | most profession-specific performance/art axis |
| Assassin | Wits | planning/reading situations; avoids duplicating Hunter's Dexterity proposal |
| Voluntary Prostitute / Professional | Sexuality | current profession-specific primary work axis |

This proposal intentionally spreads the ten ordinary careers across ten distinct stats. That uniqueness is **not** itself a Product requirement.

Plausible alternatives still exist and are the reason Product lock is required, for example:
- Satyr Maid -> Charm;
- Guard -> Manners;
- Merchant -> Wits;
- Assassin -> Dexterity;
- Prostitute -> Charm.

## 7. Exact implementation touchpoints after Product lock

### Required shared/runtime files

#### `src/core/schema.ts`

Change:
- creation/setup schema: add persisted D21 selection field (recommended array);
- add/validate mapping data shape if mapping is catalog-driven;
- bump save schema only if Leader chooses an explicit migration version rather than a defaulted compatible field.

Keep:
- `ordinaryHardWorkCareers`;
- `metaRewardSchema.kind='hardWork'`;
- `meta.hardWorkProgress` as permanent source of truth.

Do **not** create another permanent per-career unlock ledger.

#### `src/core/engine.ts`

Change:
- `actionAvailable()`: add D21 inherited normal-gate bypass, behind any global/domain lock;
- retire `applyHardWorkStartingBonuses()`;
- remove the Merchant `hardWorkProgress.includes('merchant') ? 600 : 0` starting-money branch;
- `freshSave()`: start at normal stats 1 and normal money, with empty D21 selection;
- `dispatch()`: add setup selection command(s) or equivalent;
- `finishCreation`: validate selected D21 options and apply locked +5 mapping exactly once;
- `parseSave()` / migration path: preserve old runs while defaulting new setup state safely;
- keep `applyMetaRewardMutable()`, `completeEndingMutable()`, `palaceAvailable()`, and `ensurePalaceUnlock()` semantically unchanged.

#### `src/ui/app.ts`

Change:
- creation screen `central()`: show unlocked D21 bonus options and explicit “none” behavior;
- `actionList()`: distinguish “available through Hard Work inheritance” from normal gate satisfaction.

Important UI bug to avoid:
`actionList()` currently computes missing authored conditions separately from `actionAvailable()`. After a Meta bypass, it would otherwise show an enabled career together with unmet normal requirements. If inherited access applies, normal-gate requirement text must be marked overridden/suppressed and replaced by a localized inheritance explanation.

The existing Work panel already uses `actionAvailable()`, so no per-career access branches are needed.

#### `content/localization.json`

Add RU/EN strings for:
- Hard Work inherited career access;
- New Game Hard Work bonus section;
- profession bonus option labels;
- selected/unselected/none state;
- accessibility text explaining “+5 <stat> from <profession>” after mapping lock;
- validation/error copy for unavailable selections.

### Mapping-data file

If Leader chooses catalog-driven mapping, add the ten locked entries to `content/definitions.json` and extend its schema accordingly.

No mapping data should be added before Product lock.

### Tests to update

Existing tests whose old assertions must change:
- `tests/ordinary-hard-work-meta-production.test.ts`;
- `tests/ending-meta.test.ts`;
- `tests/all-ten-career-availability-smoke.test.ts`.

Preserve:
- `tests/hard-work-palace-meta-smoke.test.ts` semantics: Palace remains all-ten ordinary Hard Work only.

Recommended dedicated file after implementation:
- `tests/hard-work-next-life-d21.test.ts`.

`src/core/persistence.ts` should not need game-semantic changes; save migration currently lives in `engine.ts::parseSave()`. Touch storage code only if the serialization transport itself changes.

## 8. Save / migration implications

Current save schema is v4 and already persists `meta.hardWorkProgress`.

### Permanent Meta

No migration is required to discover which profession bonuses are unlocked: old/current profiles already carry `hardWorkProgress`.

Protected Meta import merge must continue to union `hardWorkProgress`, so importing an older life cannot erase earned D21 options.

### Per-run setup

A new creation selection field must default to empty for old saves.

Recommended migration policy for existing v4 runs:
- preserve the current run's stats/money exactly;
- do not retroactively strip old +3/+3 or Merchant money from a life already created under the old build;
- do not auto-apply a new D21 +5 to that migrated run;
- D21 selection semantics begin on the next `newLife` / `restart` setup.

This avoids irreversible stat/money drift in ongoing saves.

If the schema is bumped, migration should mark pre-D21 creation state as already settled for the current life while keeping `meta.hardWorkProgress` intact for the next life.

### Exactly once

The selected +5 must survive save/reload during creation and apply exactly once at successful `finishCreation`.

Reloading a completed creation must never apply it again.

## 9. Focused acceptance contract for eventual implementation

### Career early access

1. Fresh profile, Day 1: exactly Lumber, Satyr Maid, Undead Farm ordinary shifts are available.
2. Complete Tavern Hard Work, start next life with baseline stats/year: Tavern is available immediately even though its normal gate is false.
3. Tavern Hard Work does not early-unlock Hunter, Guard, Merchant, Artist/Geisha, Assassin, or Prostitute.
4. Repeat the same invariant for each of the ten ordinary careers.
5. Normal stat/year gates still unlock careers for profiles without that career's Hard Work.
6. Save/reload and protected Meta import preserve inherited career access.
7. Duplicate completion of the same Hard Work does not create duplicate ledger entries or options.

### Selectable +5

After Product mapping lock:

8. Completing Hard Work exposes that profession's +5 option but does not apply it automatically.
9. Starting a later life with no D21 bonus selected yields baseline stats 1 plus only the normal ten manually allocated points.
10. Selecting one earned option applies exactly +5 to its locked target stat and no other stat.
11. Selecting an unearned profession is rejected.
12. Save/reload before `finishCreation` preserves selection without changing stats.
13. `finishCreation` applies the selected bonus exactly once.
14. Save/reload after `finishCreation` does not duplicate the bonus.
15. Old automatic +3/+3 rewards no longer occur.
16. Merchant Hard Work no longer auto-adds +600 starting money unless Product separately restores that reward.
17. RU/EN UI and accessible labels describe the inherited career access and selected +5 without changing Save/RNG by locale.

### Palace

18. `palaceAvailable(meta)` still requires all ten entries in `ordinaryHardWorkCareers`.
19. Early access to a profession does not count as Hard Work completion.
20. Secret Debt Hard Work/progress never substitutes for an ordinary career in Palace 10/10.

### Secret Debt integration

21. While D19 Secret Debt binding domain-lock is active, **all ten ordinary careers remain unavailable even if every career is inherited through D21**.
22. Exiting Secret Debt restores the inherited/normal availability without deleting ordinary career progress or Hard Work Meta.

This ordering must be regression-tested when Chat 5's Secret Debt runtime lands.

### New Game+ / Palace True Ending

23. D21 selection must compose with the Palace True Ending x2 reward only after Product locks arithmetic order/cap behavior.
24. No test should guess whether x2 happens before or after +5 until that decision is made.

## 10. Collision analysis

### Secret Debt — hard boundary

D19 says binding locks all ten ordinary professions until real exit.

Therefore D21 inherited access is an unlock of the **normal profession gate**, not immunity from global domain locks.

Incorrect:
`if (hardWorkProgress.includes(career)) return true` before all other blocking rules.

Required conceptual precedence:
`global/domain lock -> D21 inherited gate override -> normal authored gate`.

Current audited main does not yet contain the final D19 runtime domain-lock implementation; this must be integrated when Secret Debt lands.

### Palace — compatible source ledger

D6/D15 already use all ten ordinary entries in `hardWorkProgress`.

D21 should reuse that ledger. Do not infer Palace from available careers and do not add a second completion ledger.

### D5 Meta loadout — Product decision required

D5 locks the direction “strong rule modifiers selectable in limited pre-run loadout” but leaves exact slots/budget open.

D21 requires selectable +5 options but does not lock how many can be equipped at once.

The recommended array save shape avoids another schema migration, but the legal selection cardinality is **AWAITING PRODUCT LOCK**.

### Palace True Ending x2 — Product decision required

D18 explicitly leaves the order of x2 versus other NG+ bonuses/caps open.

D21 now introduces a concrete +5 starting-stat modifier, so this open question becomes implementation-blocking for a profile that owns both rewards.

Do not guess:
- `(base + 5) * 2`;
- `base * 2 + 5`;
- cap-before/cap-after behavior.

Leader/Product must lock this before combined D18+D21 arithmetic is shipped.

## 11. Leader/Product decision checklist

Required before the +5 runtime is implemented:

1. Lock the exact ten profession -> stat mappings.
2. Lock how many D21 +5 options can be selected per new life, or define how D21 consumes the future D5 loadout budget.
3. Lock D21 +5 ordering relative to Palace True Ending x2 and any starting-stat cap.

Not blocked by those decisions:
- using `hardWorkProgress` as the permanent D21 unlock source;
- early profession availability design;
- removal of obsolete automatic +3/+3 and Merchant +600 behavior when D21 implementation lands;
- save migration principle that current lives are preserved and D21 applies to later setups;
- Secret Debt precedence;
- Palace 10/10 invariants.

## 12. Proposed implementation sequence after locks

1. Add D21 setup schema/migration with empty selection default.
2. Replace old automatic Hard Work starting bonuses.
3. Add generic inherited career gate override in `actionAvailable()`.
4. Add generic New Game selection command/state and exactly-once application on `finishCreation`.
5. Add mapping data after Product lock.
6. Add RU/EN New Game and Work-panel inheritance presentation.
7. Update old Meta tests and add dedicated D21 acceptance tests.
8. Integrate with Secret Debt global lock when its runtime is current.
9. Add combined D18 x2 test only after arithmetic order is locked.
10. Hand executable implementation to Chat 2 for the single full-CI slot.

## 13. Packet conclusion

D21 does not require a new permanent Meta ledger. The existing `meta.hardWorkProgress` is already exactly-once, save-persistent, import-protected, and Palace-aware.

The implementation-critical changes are:
- use that ledger to bypass only normal ordinary-career stat/year gates on later lives;
- replace the obsolete automatic Hard Work stat/money rewards with an explicit New Game selection surface;
- preserve current-life saves during migration;
- keep Secret Debt global lock above inherited access;
- keep Palace counting unchanged;
- wait for Product on mapping, D5 selection capacity, and D18 x2 arithmetic order.
