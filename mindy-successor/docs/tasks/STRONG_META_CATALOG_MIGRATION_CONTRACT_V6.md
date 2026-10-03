# Strong Meta Catalog / Validation / Migration Contract v6

Status: **READY FOR LEADER ACCEPTANCE**
Owner: Chat 4
Branch: `chat4/strong-meta-catalog-contract-v6`
Authority base: `main@69eaedb1950e3ea712119388e1734c526a93be21`
Audited Product authority: D24, D27, D28, D30
Machine-readable companion:
`mindy-successor/docs/tasks/STRONG_META_CATALOG_V6.fixture.json`

This is an **implementation-ready data and migration contract**.

It does **not** implement production runtime or UI.

It does not create any reward beyond the four currently approved strong-Meta entries:

1. `palace.true.cap-200` — Specialist;
2. `secret-debt.paid-freedom.earned-reserve-match` — Keystone;
3. `secret-debt.bound-life.work-rhythm` — Keystone;
4. `secret-debt.takeover.network-retainer` — Keystone.

Research-only examples such as No Rent, unconditional +1 daily Energy, extra calendar time, generic passive income, large starting Capital, School discounts and generic access perks remain **unapproved examples** and do not appear in the production contract fixture.

## 1. Product invariants

For each New Start+ life:

```text
Keystone:   0..1
Specialist: 0..2
```

Separate layers:
- automatic knowledge/content: no capacity;
- ordinary Hard Work packages: any earned subset, no strong-Meta capacity.

D24 cap-200:
- consumes one ordinary Specialist position;
- has no hidden/free Palace position.

A third Specialist is invalid for a newly resolved run.

The three D30 rewards:
- are separately owned across lives;
- are all Keystone-class;
- may all be permanently owned;
- at most one may be active in the same life.

Their exact open numeric balance parameters are not invented here.

Once a life starts:
- its resolved strong-Meta snapshot is immutable;
- later catalog changes, capacity changes, reclassification and preference edits do not rewrite that life.

## 2. Stable ID contract

All strong reward IDs use exactly three dot-separated semantic segments:

```text
<source>.<outcome-or-scope>.<reward>
```

Each segment is lowercase ASCII kebab-case.

Regex:

```regex
^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*$
```

Approved IDs:

```text
palace.true.cap-200
secret-debt.paid-freedom.earned-reserve-match
secret-debt.bound-life.work-rhythm
secret-debt.takeover.network-retainer
```

An ID is permanent identity.

Do not change an ID because:
- UI copy changes;
- RU/EN wording changes;
- balance numbers change;
- a reward moves Keystone <-> Specialist;
- presentation art changes;
- effect implementation is refactored.

Class is metadata, not identity.

Create a new ID only when Product says the reward is a different mechanical identity. For example, Work Rhythm becoming unconditional daily +1 Energy would be a different reward and must not reuse `secret-debt.bound-life.work-rhythm`.

Do not normally put balance numbers in IDs. `palace.true.cap-200` is a Product-established identity and is retained verbatim; this is not precedent for future tuning values.

## 3. Branded typed IDs

Recommended domain types:

```ts
declare const strongRewardIdBrand: unique symbol;
declare const knowledgeUnlockIdBrand: unique symbol;

export type StrongRewardId =
  string & {readonly [strongRewardIdBrand]: true};

export type KnowledgeUnlockId =
  string & {readonly [knowledgeUnlockIdBrand]: true};
```

Storage parses ordinary strings first. Branding happens only after lexical validation.

Never silently lowercase or trim an ID during migration. A malformed ID is malformed data, not a different valid ID.

## 4. Registry class / lifecycle / readiness

```ts
export type StrongRewardClass =
  | 'keystone'
  | 'specialist';

export type StrongRewardLifecycle =
  | 'active'
  | 'retired';

export type StrongRewardActivationStatus =
  | 'resolvable'
  | 'pending-balance';
```

There is no `knowledge` or `hard-work` StrongRewardClass. Those are separate layers.

A player may permanently own a retired reward ID. Retirement means:
- not selectable for a newly resolved life;
- retained for ownership/history/migration;
- current-run snapshots remain valid.

`pending-balance` means identity/class/invariants are approved but at least one required numeric parameter remains open. Such a reward may be owned, but production New Start+ cannot resolve it until parameters are locked.

## 5. Open-or-locked balance parameter

```ts
export type BalanceParameter<T> =
  | Readonly<{
      state: 'locked';
      value: T;
      authority: string;
    }>
  | Readonly<{
      state: 'open';
      authority: string;
    }>;
```

Resolver invariant:

```text
selected reward
+
required parameter state == open
->
catalog_not_resolvable
```

Never use a research target, previous draft number or fallback constant as production value.

## 6. Typed effect union

```ts
export type StrongMetaEffectSpec =
  | ProgressionStatCapEffectSpec
  | EarnedReserveMatchEffectSpec
  | WorkRhythmEffectSpec
  | NetworkRetainerEffectSpec;
```

Production effect identity is not a generic `Record<string, unknown>`.

### D24 cap-200

```ts
export type ProgressionStatCapEffectSpec = Readonly<{
  kind: 'progression-stat-cap';
  cap: 200;
  appliesTo: '12-progression-stats';
  excludes: readonly ['lust'];
  multipliesCurrentValues: false;
  multipliesStartingValues: false;
  multipliesHardWorkPackages: false;
  multipliesManualCreationPoints: false;
}>;
```

ID: `palace.true.cap-200`  
Class: `specialist`

### D30 Earned Reserve Match

```ts
export type EarnedReserveMatchEffectSpec = Readonly<{
  kind: 'earned-reserve-match';

  matchRatio: Readonly<{
    earned: 1;
    matched: 1;
  }>;

  qualifyingIncome:
    'ordinary-profession-wage-earned-in-run';

  requiresNotSecretDebtBound: true;

  excludes: readonly [
    'school-money',
    'activity-money',
    'item-money',
    'passive-income',
    'secret-debt-lender-grant',
    'secret-debt-hidden-work-wage',
    'repayment'
  ];

  perRunCap: BalanceParameter<number>;
}>;
```

ID: `secret-debt.paid-freedom.earned-reserve-match`  
Class: `keystone`

The 1:1 ratio is locked. The per-run cap is open.

### D30 Work Rhythm

```ts
export type WorkRhythmEffectSpec = Readonly<{
  kind: 'work-rhythm';

  trigger:
    'at-least-one-ordinary-profession-shift-completed-on-prior-calendar-day';

  energyDelta: 1;

  sameDayMultipleShiftsStack: false;

  excludes: readonly [
    'secret-debt-hidden-work',
    'school-only',
    'activity-only'
  ];

  maxBonusDays: BalanceParameter<number>;

  secretDebtPenaltyOrder:
    'selected-energy-modifier-then-forced-next-day-minus-one';
}>;
```

ID: `secret-debt.bound-life.work-rhythm`  
Class: `keystone`

Locked:
- +1 usable Energy;
- ordinary profession shift trigger;
- no same-day multi-shift stacking;
- hidden work does not arm it;
- D19 -1 remains after modifier.

Open:
- max triggered bonus days per run.

### D30 Network Retainer

```ts
export type NetworkRetainerEffectSpec = Readonly<{
  kind: 'network-retainer';

  paymentTiming:
    'start-of-eligible-early-run-day';

  paymentAmount: BalanceParameter<number>;
  eligibleDayCount: BalanceParameter<number>;
  perRunTotalCap: BalanceParameter<number>;

  pausesWhileSecretDebtBound: true;
  pausedPaymentsBanked: false;

  invariantNonEffects: readonly [
    'lender-discovery',
    'debt-size',
    'repayment',
    'forced-night',
    'ordinary-career-lock',
    'palace-d23-gating'
  ];
}>;
```

ID: `secret-debt.takeover.network-retainer`  
Class: `keystone`

No current research target is promoted to a runtime constant.

## 7. Registry shape

```ts
export type StrongRewardDefinition =
  Readonly<{
    id: StrongRewardId;
    class: StrongRewardClass;
    lifecycle: StrongRewardLifecycle;
    activationStatus: StrongRewardActivationStatus;
    authority: string;
    sourceOutcome: string;
    effect: StrongMetaEffectSpec;

    replacement?: Readonly<{
      id: StrongRewardId;
      ownershipTransfer:
        | 'none'
        | 'explicit-product-authority';
    }>;
  }>;

export type StrongRewardRegistry =
  Readonly<Record<StrongRewardId, StrongRewardDefinition>>;
```

Registry validator:
- record key equals `definition.id`;
- every ID unique;
- every ID matches lexical format;
- effect kind compatible with identity contract;
- class valid;
- pending parameters consistent with activationStatus;
- active/resolvable reward has no open required parameter.

## 8. Presentation is not effect authority

The original runtime contained a verified description/wiring mismatch: UI prose promised one Title while runtime wiring mutated another effect/index.

Successor must not make prose an effect source.

Recommended presentation type:

```ts
type StrongRewardPresentation = Readonly<{
  id: StrongRewardId;
  titleKey: string;
  flavorDescriptionKey: string;
}>;
```

Mechanical summary:
- generated from typed effect spec;
- generated from resolved parameters;
- not handwritten independently.

Static contract:

```text
active registry ID
<-> exactly one presentation entry with same ID
```

No array-index identity.

## 9. Automatic knowledge/content registry

Automatic knowledge is intentionally not a StrongRewardClass.

```ts
export type KnowledgeDefinition = Readonly<{
  id: KnowledgeUnlockId;
  lifecycle: 'active' | 'retired';
  authority: string;
  contentContractVersion: number;
}>;

export type KnowledgeRegistry =
  Readonly<Record<KnowledgeUnlockId, KnowledgeDefinition>>;
```

Current v6 approved entries: **none**.

The companion fixture intentionally has an empty knowledge registry. Do not invent research examples as production entries.

# 10. Four separate state layers

The production model must not collapse these into one array.

## Layer 1 — permanent reward ownership

Question:

> What strong rewards has this profile permanently earned?

```ts
export type StrongMetaOwnership = Readonly<{
  ownedRewardIds: readonly StrongRewardId[];
}>;
```

Conceptual save path:

```text
meta.strongMeta.ownership.ownedRewardIds
```

Properties:
- permanent;
- monotonic except explicit save repair;
- protected Meta set-union;
- includes owned active and retired IDs;
- does not mean selected;
- does not mean active this life.

All three D30 rewards may coexist here.

## Layer 2 — automatic inherited knowledge/content

Question:

> What permanent knowledge/content unlocks automatically apply to later lives?

```ts
export type StrongMetaKnowledge = Readonly<{
  inheritedKnowledgeIds: readonly KnowledgeUnlockId[];
}>;
```

Conceptual path:

```text
meta.strongMeta.knowledge.inheritedKnowledgeIds
```

Properties:
- no Keystone capacity;
- no Specialist capacity;
- no player toggle;
- separate registry;
- current v6 registry empty.

Never store StrongRewardIds here.

## Layer 3 — New Start+ preferred selection

Question:

> What does the player prefer to select for the next eligible life?

```ts
export type StrongMetaPreferredSelection = Readonly<{
  keystoneId: StrongRewardId | null;
  specialistIds: readonly StrongRewardId[];
}>;
```

Conceptual path:

```text
meta.strongMeta.preferredSelection
```

Properties:
- preference only;
- may become invalid after catalog change;
- not current-run authority;
- max 1 Keystone;
- max 2 Specialists;
- only owned active/resolvable entries may resolve.

Hard Work IDs never go here.

## Layer 4 — resolved current-run snapshot

Question:

> What strong Meta rules did this exact life actually start with?

```ts
export type ResolvedStrongMetaSnapshot =
  Readonly<{
    contractVersion: 1;
    registryVersion: string;

    keystoneId: StrongRewardId | null;
    specialistIds: readonly StrongRewardId[];

    automaticKnowledgeIds:
      readonly KnowledgeUnlockId[];

    specialistCapacityAtStart: 2;

    resolvedRewards:
      readonly ResolvedStrongReward[];
  }>;
```

Conceptual path:

```text
run.strongMetaSnapshot
```

This is the selected strong-Meta authority for an in-progress life.

Gameplay must not reread `preferredSelection`.

## Resolved reward principle

At life start, open parameters are forbidden.

Conceptual union includes:
- cap-200 with cap=200;
- Reserve Match with resolved perRunCap;
- Work Rhythm with resolved maxBonusDays;
- Network Retainer with resolved payment/duration/total.

Run counters such as matched money or triggered bonus days are run-local state, not permanent ownership.

# 11. Hard Work remains separate

Do not add Hard Work IDs to:
- ownedRewardIds;
- keystoneId;
- specialistIds;
- resolvedRewards.

Hard Work remains:
- permanent ordinary Hard Work ledger;
- current-life active package subset.

D23 Palace qualification continues to read only:
- permanent ordinary 10/10;
- active ordinary packages 10/10.

Strong Meta does not alter that predicate.

# 12. Grant provenance

A reward becomes owned only through an explicit Product-authorized grant binding.

```ts
export type StrongRewardGrantBinding =
  Readonly<{
    endingId: string;
    rewardId: StrongRewardId;
    authority: string;
  }>;
```

Current shared main searched for this packet does not expose stable production ending IDs for all four source outcomes.

Therefore v6:
- fixes reward IDs;
- fixes semantic source outcomes;
- does not invent foreign ending IDs.

Integration supplies exact ending bindings when owner lanes expose final IDs.

No title substring inference.

Grant algorithm:

```text
complete authorized ending
-> explicit grant binding
-> add reward once if absent
```

Repeating ending:
- no duplicate ownership;
- no auto-selection;
- no current-run rewrite.

# 13. Validation order

Validation is deterministic.

## Step 1 — structural shape

Check:
- keystone 0/1 syntactically;
- specialists array;
- all values strings;
- knowledge separate.

## Step 2 — lexical ID validity

Every ID must match stable regex.

Malformed ID:
`invalid_id_format`.

Never trim/lowercase into another ID.

## Step 3 — duplicate detection

Duplicate selected ID anywhere:
`duplicate_selection`.

Do not silently dedupe preference.

## Step 4 — registry resolution

Unknown current registry ID:
`unknown_reward`.

No fuzzy matching.

## Step 5 — lifecycle

Retired reward:
`retired_reward`.

Ownership remains.

## Step 6 — ownership

Active selected reward must be owned:
`reward_not_owned`.

## Step 7 — class placement

Keystone in Specialists or Specialist in Keystone:
`wrong_reward_class`.

## Step 8 — capacity

D28:
- Keystone <=1;
- Specialist <=2.

Reasons:
- `keystone_capacity_exceeded`;
- `specialist_capacity_exceeded`.

cap-200 counts normally.

## Step 9 — activation readiness

Required open balance parameter:
`catalog_not_resolvable`.

No research fallback.

## Step 10 — explicit incompatibility

Current four-entry catalog has no extra pair incompatibility beyond class capacity.

Future explicit conflict:
`reward_pair_incompatible`.

## Step 11 — global invariants

Verify:
- no D23 substitution;
- no knowledge ID in strong slots;
- no Hard Work ID in strong slots;
- Secret Debt order contracts;
- snapshot parameter completeness.

## Step 12 — atomic materialization

Only after all validation:
- canonicalize order;
- bind catalog version;
- resolve locked parameters;
- create immutable snapshot.

No partial effect application.

# 14. Canonical ordering

For deterministic save/reload:
- Keystone singular;
- Specialists lexicographically sorted by stable ID in persisted snapshot;
- automatic knowledge lexicographically sorted;
- ownedRewardIds lexicographically sorted on canonical save;
- inheritedKnowledgeIds lexicographically sorted.

UI display order may differ. Gameplay snapshot must not depend on click order.

# 15. User-facing invalid-selection reasons

Stable programmatic reason codes:

| Code | RU | EN |
|---|---|---|
| `invalid_id_format` | «Награда имеет повреждённый идентификатор.» | “This reward has an invalid identifier.” |
| `duplicate_selection` | «Одна и та же награда выбрана больше одного раза.» | “The same reward is selected more than once.” |
| `unknown_reward` | «Эта награда неизвестна текущему каталогу.» | “This reward is unknown to the current catalog.” |
| `retired_reward` | «Эта награда больше недоступна для новой жизни.» | “This reward is retired and cannot be selected for a new life.” |
| `reward_not_owned` | «Эта награда ещё не заработана.» | “This reward has not been earned.” |
| `wrong_reward_class` | «Награда выбрана не в своей категории.» | “This reward is selected in the wrong category.” |
| `keystone_capacity_exceeded` | «Можно выбрать не более одного Keystone.» | “At most one Keystone may be selected.” |
| `specialist_capacity_exceeded` | «Можно выбрать не более двух Specialists.» | “At most two Specialists may be selected.” |
| `catalog_not_resolvable` | «Баланс этой награды ещё не зафиксирован для новой жизни.» | “This reward is not yet balance-resolved for a new life.” |
| `reward_pair_incompatible` | «Эти награды нельзя активировать вместе.» | “These rewards cannot be activated together.” |
| `reclassification_conflict` | «После обновления каталога выбор нужно подтвердить заново.» | “The catalog changed this reward’s class; please choose again.” |
| `legacy_selection_without_ownership` | «Старый выбор не подтверждает постоянное владение наградой.» | “A legacy selection does not prove permanent reward ownership.” |

Never show “we automatically dropped X” after silently mutating choice. Meaningful conflicts require explicit reselection.

# 16. Unknown and retired IDs

## Unknown owned ID

If lexical format is valid:

```text
preserve
+
do not activate
+
do not delete
```

This supports forward compatibility.

Unknown selected preference:
- remains parseable;
- new-run resolution fails with `unknown_reward`;
- user edits preference.

Unknown current-run snapshot:
- if snapshot embeds a supported resolved effect contract, preserve in-progress life;
- if snapshot contract cannot be interpreted, fail load explicitly;
- never substitute by similar name.

## Retired ID

Retired ownership:
- preserved.

Retired preference:
- invalid with `retired_reward`.

Retired current-run snapshot:
- remains active for in-progress life if snapshot contract supported.

No mid-run retirement.

# 17. Replacement and reclassification

Optional future registry metadata:

```ts
replacement?: {
  id: StrongRewardId;
  ownershipTransfer:
    | 'none'
    | 'explicit-product-authority';
}
```

Default ownership transfer: `none`.

A replacement does not automatically:
- transfer ownership;
- rewrite preference;
- rewrite current run.

For class reclassification with same mechanical identity:
1. ownership ID unchanged;
2. current-run snapshot unchanged;
3. future preference checked against new class;
4. same ID may relocate if capacity permits;
5. if relocation conflicts, `reclassification_conflict`;
6. no silent drop.

### Specialist -> Keystone conflict

If another Keystone is already preferred, require explicit choice.

### Keystone -> Specialist conflict

If two Specialists already preferred, require explicit choice.

If mechanics change identity rather than only class/tuning, retire old ID and create a new Product-approved ID.

# 18. Migration from current generic Meta scaffolding

Current shared main contains:
- `meta.ruleModifiers: Record<string, unknown>`;
- `meta.activeLegacyPerks: string[]`;
- generic hooks such as `energy.daily`;
- legacy/demo hooks such as `vitality` / `guild`.

None is sufficient proof of ownership of any v6 approved reward.

Never infer:

```text
ruleModifiers["energy.daily"] = 1
->
owns Work Rhythm
```

Work Rhythm is conditional, bounded and ending-owned.

Never infer:

```text
guild
->
approved economy Keystone
```

No Product equivalence exists.

## Migration classes

### A. Explicit approved stable ID + explicit grant provenance

May map according to Product migration map.

### B. Generic rule modifier

Do not map to ownership.

May remain current-run compatibility state until life ends.

### C. activeLegacyPerks ID without ownership provenance

Do not treat as earned.

Diagnostic:
`legacy_selection_without_ownership`.

### D. Unknown legacy value

Preserve only in compatibility/audit state if required.

No fuzzy mapping.

Recommended result:

```ts
type StrongMetaMigrationResult = Readonly<{
  ownership: StrongMetaOwnership;
  knowledge: StrongMetaKnowledge;
  preferredSelection: StrongMetaPreferredSelection;

  currentRunSnapshot:
    | ResolvedStrongMetaSnapshot
    | LegacyCompatStrongMetaSnapshot;

  diagnostics: readonly StrongMetaMigrationIssue[];
}>;
```

# 19. Current-life migration rule

If an in-progress legacy life depends on generic modifier state:
- preserve effective current-life behavior through compatibility representation;
- do not remove mid-life;
- do not grant v6 ownership from it;
- do not add to preferred selection automatically.

At next New Start+:
- resolve only approved owned registry IDs.

This is the cleanup boundary.

# 20. Protected Meta import

Permanent ownership and knowledge are protected Meta.

Import merge:

```text
ownedRewardIds =
  set-union(current, imported)

inheritedKnowledgeIds =
  set-union(current, imported)
```

Preferred selection:
- preference, not protected progression;
- must not be unioned.

Current-run snapshot:
- belongs to run;
- must not be unioned.

Never union Keystone/Specialist active selections across saves.

# 21. Save/reload and idempotence

Canonical save/reload:

```text
parse(serialize(parse(save)))
==
parse(save)
```

for:
- ownership;
- knowledge;
- preference;
- current-run snapshot;
- resolved parameters;
- canonical ordering.

No effect applies again merely because save reloaded.

Resolution idempotence:

Given same:
- ownership;
- preference;
- registry version;
- locked parameters;

`resolve()` must produce semantic/byte-equivalent snapshot.

No RNG, current time, click order or object enumeration dependence.

# 22. Current-run snapshot authority

Once run starts, gameplay reads:

```text
run.strongMetaSnapshot
```

not:
- current registry class;
- current preferred selection;
- newly earned rewards;
- later balance values.

Reward earned mid-run:
- ownership updates;
- current run does not gain it;
- next run may select it.

Snapshot stores resolved numeric parameters so later retuning does not alter in-progress lives.

# 23. Exact inverse enable/disable model

Do not make pre-run selection a reversible direct gameplay mutation.

Bad:

```text
toggle on -> stats += X
toggle off -> stats -= X
```

The original incomplete spell-disable bugs prove this is fragile.

Correct:

```text
selection set
-> pure preview
-> run start resolves immutable snapshot
```

Pre-run toggle changes only:
- preferred selection;
- derived preview.

It does not mutate current gameplay state.

Exact regression sequence:

```text
P0 = baseline preference
P1 = select A
P2 = select B
P3 = deselect A
P4 = deselect B
```

Assertions:

```text
P1 == P0 + A
P2 == P0 + A + B
P3 == P0 + B
P4 == P0
```

Then:

```text
resolve(P2) = snapshot(A+B)
resolve(P3) = snapshot(B)
resolve(P4) = baseline snapshot
```

No residual A in P3 and no residual B in P4.

Permanent ownership is separate:

```text
deselect reward
!=
forget ownership
```

This directly addresses the original Title persistence versus active-bonus ambiguity.

# 24. Pairwise collision matrix for approved entries

Legend:
- **VALID** — class/capacity permits coexistence;
- **DUPLICATE** — same ID twice invalid;
- **KEYSTONE CAPACITY** — two Keystones invalid.

| A \\ B | cap-200 (S) | Reserve Match (K) | Work Rhythm (K) | Network Retainer (K) |
|---|---|---|---|---|
| **cap-200 (S)** | DUPLICATE | VALID | VALID | VALID |
| **Reserve Match (K)** | VALID | DUPLICATE | KEYSTONE CAPACITY | KEYSTONE CAPACITY |
| **Work Rhythm (K)** | VALID | KEYSTONE CAPACITY | DUPLICATE | KEYSTONE CAPACITY |
| **Network Retainer (K)** | VALID | KEYSTONE CAPACITY | KEYSTONE CAPACITY | DUPLICATE |

No second Specialist is currently approved. The second Specialist position remains valid capacity but empty until Product approves another entry.

The matrix describes capacity legality only. D30 Keystones remain `pending-balance` until required parameters lock.

# 25. Secret Debt Energy-order invariant

For Work Rhythm:

```text
normal day base/max calculation
-> apply selected Work Rhythm +1 if armed
-> apply Secret Debt forced next-day Energy -1 if bound
-> usable Energy
```

Relative invariant:

```text
same loadout + same day conditions:
bound usable Energy
==
unbound usable Energy - 1
```

Illustrative only:

```text
normal: 3
Work Rhythm armed: 4
bound Work Rhythm day: 3
```

Do not apply debt -1 and then restore to selected max; that would erase D19.

Work Rhythm arms only from at least one ordinary-profession shift. Multiple ordinary shifts same day do not stack. Hidden work, School-only and Activity-only days do not arm it.

# 26. D30 economic invariants

## Earned Reserve Match

Eligible:
- legitimate ordinary-profession wage;
- while not Secret Debt-bound.

Ineligible:
- School money;
- Activity money;
- item money;
- passive income;
- lender +2000;
- hidden-work wage;
- repayment.

Ratio:
1:1.

Total matched amount is bounded by future locked cap.

Use explicit wage-source provenance, not “positive money delta”.

## Network Retainer

Payment:
- start of eligible early-run day;
- future locked amount;
- bounded early period;
- bounded total.

While bound:
- payment paused;
- no banking;
- no catch-up.

Never changes:
- lender discovery;
- grant/debt/repayment;
- forced Night;
- career lock;
- D23 gating.

# 27. Palace D23 non-substitution

Strong Meta never substitutes for:

```text
permanent ordinary Hard Work 10/10
+
current-life active ordinary packages 10/10
->
Day-1 Palace invitation
```

cap-200:
- does not grant invitation;
- does not count as Hard Work;
- does not make Palace available.

D30 Keystones:
- do not count toward 10/10;
- do not activate Hard Work packages;
- do not substitute for invitation.

# 28. UI contract

New Start+ exposes four semantically separate sections:

1. **Keystone 0/1**
2. **Specialists 0/2**
3. **Automatic knowledge/content**
4. **Hard Work profession packages**

## Keystone

- counter 0/1 or 1/1;
- only owned approved entries;
- pending-balance entry may be visible as owned but disabled for activation;
- selecting another Keystone must not silently replace current choice without explicit user action.

## Specialists

- counter 0/2, 1/2, 2/2;
- cap-200 consumes one;
- third rejected;
- existing two remain unchanged.

## Automatic knowledge

- no capacity counter;
- no toggle;
- current approved v6 list empty.

## Hard Work

- independent section;
- any earned subset;
- strong-Meta counts unchanged.

Valid conceptual state:

```text
Keystone 1/1
Specialists 2/2
Hard Work 10/10 active
```

## Mechanical summaries

Generate mechanics from registry/resolved values.

Do not hand-author the actual cap/payment/Energy logic in copy.

For pending D30 values, never show research targets as production mechanics.

# 29. Catalog version / definition version

Every run snapshot stores:
- contractVersion;
- registryVersion;
- definitionVersion per resolved reward.

Registry version should be stable semantic version identity, not current clock time.

Increment definitionVersion when:
- parameter schema changes;
- effect serialization changes;
- compatibility parser needs distinction.

Do not increment for flavor copy or art.

# 30. No live registry reads for current-run balance

Bad:

```text
day 20 Network Retainer payment
-> current global registry paymentAmount
```

Good:

```text
day 20 payment
-> run.strongMetaSnapshot resolved paymentAmount
```

Same for:
- Reserve Match cap;
- Work Rhythm max bonus days;
- cap-200.

# 31. Run-local counters

Run-local counters may include:
- matched money so far;
- Work Rhythm triggered bonus days;
- Network Retainer paid days/total.

They are keyed by stable reward identity/effect contract and persist through save/reload.

Reload does not:
- reset counters;
- replay start-of-day payment;
- re-arm consumed day.

# 32. User choice vs repair

UI may offer:
- Review selection;
- Replace retired reward;
- Choose a different Keystone.

UI must not:
- silently choose replacement;
- silently remove third Specialist;
- silently drop unknown ID;
- silently prune after reclassification conflict.

# 33. Original-game bug evidence mapped to successor regression

## Incomplete spell disable

Original defect:
enable wrote multiple slots, disable failed to clear exactly the same state.

Successor guard:
- selection is a pure set;
- current-run snapshot resolves atomically;
- exact inverse selection tests;
- no additive/subtractive pre-run gameplay mutation.

## Title/description wiring mismatch

Original defect:
displayed reward description and runtime Title/effect wiring disagreed.

Successor guard:
- stable ID joins registry and presentation;
- mechanical summary derived from effect spec;
- no array-index identity;
- static keyset equality.

## Broad bonuses sharing flat cost

Original defect:
broad and narrow effects shared one Finale-count unit and could stack heavily.

Successor guard:
- broad run-defining effects are Keystone;
- 0..1 Keystone;
- directed effects Specialist;
- 0..2 Specialists;
- knowledge automatic;
- Hard Work separate.

# 34. Focused/static acceptance — registry

1. Exactly four approved strong IDs in v6 fixture.
2. All match ID regex.
3. No duplicate IDs.
4. Exactly one Specialist: cap-200.
5. Exactly three Keystones: D30 rewards.
6. No research-only example reward present.
7. Automatic knowledge registry empty.
8. Registry key must equal definition.id.
9. cap-200 is `resolvable`.
10. D30 entries are `pending-balance` until numeric locks.

# 35. Acceptance — D24

1. ID exact.
2. Specialist.
3. cap 200.
4. Lust excluded.
5. Current values not multiplied.
6. Starting values not multiplied.
7. Hard Work +5 not multiplied.
8. Manual creation points not multiplied.
9. Uses one Specialist slot.
10. Does not grant Palace access.

# 36. Acceptance — D30

## Reserve Match

- exact ID;
- Keystone;
- ratio 1:1;
- cap open;
- ordinary wage only;
- bound prevents matching;
- lender grant/hidden work/passive income/repayment excluded.

## Work Rhythm

- exact ID;
- Keystone;
- +1 Energy;
- prior ordinary shift required;
- multiple shifts do not stack;
- hidden work/School-only/Activity-only do not arm;
- max days open;
- D19 -1 afterward.

## Network Retainer

- exact ID;
- Keystone;
- early-day pattern;
- amount/duration/total open;
- pauses while bound;
- no banking;
- no lender/debt/forced-Night/D23 changes.

# 37. Acceptance — selection

Test:
- 0 Keystone valid;
- 1 Keystone valid if owned/resolvable;
- 2 Keystones invalid;
- 0 Specialists valid;
- 1 Specialist valid;
- 2 Specialists valid;
- 3 Specialists invalid;
- duplicate invalid;
- wrong class invalid;
- unknown invalid;
- retired invalid;
- unowned invalid;
- pending-balance selected invalid;
- Hard Work does not affect counts;
- knowledge does not affect counts.

# 38. Acceptance — ownership and preference

1. Authorized grant adds once.
2. Repeating ending does not duplicate.
3. Ownership does not auto-select.
4. All three D30 Keystones may be owned.
5. Only one selected.
6. Import set-unions ownership.
7. Unknown owned stable ID preserved.
8. Retired owned ID preserved.
9. Preference may select none.
10. Invalid preference is diagnosable.
11. Preference edits do not mutate current run.
12. Reward earned mid-run does not enter current snapshot.

# 39. Acceptance — snapshot

1. Created exactly once at New Start+ resolution boundary.
2. Contains registry version.
3. Contains selected IDs.
4. Contains specialistCapacityAtStart=2.
5. Contains resolved numeric parameters.
6. Same after save/reload.
7. Catalog update does not rewrite.
8. Ownership update does not rewrite.
9. Preference edit does not rewrite.
10. Unknown snapshot ID never fuzzy-matched.

# 40. Acceptance — reclassification / retirement

Keystone -> Specialist:
- relocate same ID only if capacity fits;
- otherwise `reclassification_conflict`.

Specialist -> Keystone:
- relocate only if Keystone slot free;
- otherwise conflict.

Current run always unchanged.

Retired:
- ownership remains;
- cannot newly select;
- current snapshot remains;
- replacement ownership transfers only with explicit Product authority.

# 41. Acceptance — exact inverse

For every allowed selectable pair:

```text
baseline
-> select A
-> select B
-> deselect A
-> deselect B
```

At each step compare:
- preference;
- preview;
- candidate snapshot.

Final state equals semantic baseline.

No residual:
- parameter;
- flag;
- cap;
- Energy source;
- money source;
- access source.

# 42. Acceptance — presentation identity

For each active registry ID:
- exactly one presentation entry;
- joined by stable ID;
- no numeric array index;
- mechanical summary from effect spec;
- presentation cannot redefine class or mechanics.

# 43. Acceptance — Secret Debt

For Work Rhythm:

```text
boundEnergy = unboundEnergy - 1
```

under same loadout/day conditions.

For Network Retainer:
- bound day payment 0;
- no catch-up.

For Reserve Match:
- bound hidden-work wage matched 0.

For all:
- forced Night unchanged;
- ordinary-career lock unchanged;
- debt unchanged.

# 44. Acceptance — Palace

For each of four approved rewards:
D23 qualification remains based only on Hard Work earned 10/10 + active 10/10.

Selecting cap-200 or any D30 Keystone does not change D23 predicate.

# 45. Acceptance — UI

Keystone:
- counter 0/1;
- second selection not silently replacing first.

Specialists:
- counter 0/2;
- cap-200 consumes one;
- third rejected without altering existing two.

Knowledge:
- automatic;
- no slot.

Hard Work:
- separate;
- any earned subset.

# 46. Acceptance — no reward expansion

Production v6 registry must not contain unapproved candidates such as:
- No Rent;
- unconditional Energy;
- extra time;
- generic passive income;
- Capital;
- School discount;
- generic access.

Research docs may continue to mention them.

# 47. Recommended implementation boundaries

Future implementation may separate:

```text
strongMetaIds
strongMetaCatalog
strongMetaValidation
strongMetaMigration
strongMetaResolution
```

Important separation:
- Catalog = identity/effect specs.
- Validation = legality.
- Migration = old save -> four-layer model.
- Resolution = valid preference + locked catalog -> immutable snapshot.

Do not put all identity/migration/effect logic into one engine switch.

# 48. Conceptual pure APIs

```ts
parseStrongRewardId(value: string): StrongRewardId

validateStrongRegistry(
  registry: StrongRewardRegistry
): RegistryValidationResult

validatePreferredStrongSelection(input: {
  ownership: StrongMetaOwnership;
  preference: StrongMetaPreferredSelection;
  registry: StrongRewardRegistry;
}): SelectionValidationResult

resolveStrongMetaSnapshot(input: {
  ownership: StrongMetaOwnership;
  knowledge: StrongMetaKnowledge;
  preference: StrongMetaPreferredSelection;
  registry: StrongRewardRegistry;
  registryVersion: string;
}): ResolvedStrongMetaSnapshot

migrateStrongMeta(input: {
  save: unknown;
  registry: StrongRewardRegistry;
  migrationMap: ExplicitStrongMetaMigrationMap;
}): StrongMetaMigrationResult
```

All deterministic and UI-independent.

# 49. Atomic resolver rule

Bad:

```text
apply Keystone
apply Specialist 1
Specialist 2 fails
-> partially changed save
```

Good:

```text
validate entire selection
resolve all effects into temporary snapshot
if all valid -> commit snapshot atomically
```

No partial application.

# 50. Final contract summary

Four independent persisted concepts:

```text
PERMANENT POWER OWNERSHIP
meta.strongMeta.ownership.ownedRewardIds

AUTOMATIC KNOWLEDGE
meta.strongMeta.knowledge.inheritedKnowledgeIds

NEXT-RUN PREFERENCE
meta.strongMeta.preferredSelection
  Keystone 0..1
  Specialists 0..2

CURRENT-LIFE AUTHORITY
run.strongMetaSnapshot
  immutable resolved effects
```

Separate:

```text
Hard Work package layer
```

The four approved strong rewards are represented now.

No additional reward is approved by this packet.

The contract is specifically designed to prevent three verified original-game failure classes:

1. **incomplete inverse disable**  
   -> pure selection + immutable snapshot, not direct reversible gameplay mutation;

2. **description/Title wiring mismatch**  
   -> stable ID join + typed effect registry + derived mechanical summary;

3. **broad bonuses sharing flat opportunity cost**  
   -> D27/D28 Keystone 0..1 vs Specialist 0..2 classification.

Expected handoff status:

`READY_FOR_LEADER_ACCEPTANCE`.
