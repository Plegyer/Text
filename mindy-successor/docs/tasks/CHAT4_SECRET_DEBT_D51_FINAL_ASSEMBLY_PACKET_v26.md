# Chat 4 — Secret Debt + D51 Final Assembly Packet v26

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 4  
Branch: `chat4/secret-debt-d51-final-assembly-packet-v26`

This packet is the final selective-assembly plan for the Secret Debt tranche.

## Frozen authorities

Secret Debt full route:

`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

D51 Energy compatibility:

`chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`

D51 executable evidence already accepted:

- workflow `374608518`
- run `37205501396`
- job `111445731393`
- focused result: **58/58 PASS**

Secret Debt ending localization:

`chat6/secret-debt-ending-localization-producer-v27@b6cc4ca6990936f4d801004806b25e4d920f9abf`

Localization exact-head QA:

- run `37456034960`
- job `112243760593`
- v27 localization/runtime-key bundle: **17/17 PASS**
- frozen v12 route + ordinary Prostitute boundary bundle: **26/26 PASS**

Current canonical runtime authority for composition:

- schema version: **6**
- canonical Strong Meta registry/snapshot/runtime
- current D40/D41 migrations and RunResult transaction ledger
- current NightFlow / Activity runtime
- current D42 Night content must remain intact.

Observed current D42 assembly lane during this audit:

`chat2/assembly-d42-night-current-main-20261004-v1@d22c6779bd973b20ac0b43c202f9d65c0e9f6db9`

This SHA is an audit reference, not permission to replace the actual Chat 2 assembly base. Chat 2 must always re-read its live branch before composition.

No production runtime was modified by Chat 4.  
No full CI was run.

---

# 1. Locked product/runtime contract

The final assembled tranche must preserve all of the following.

## Lender / trap

- lender chance is exactly **20%**;
- only eligible Street Night can surface the lender;
- refusal closes the lender route for the current life;
- acceptance grants exactly **+2000 once**;
- trap activates exactly **10 calendar days** after acceptance;
- trap principal is exactly **20000**;
- the preceding Night is never retroactively converted into a bound Night.

## Bound state

While `run.secretDebt.status==='bound'`:

- all ten ordinary-career work domains are locked;
- existing ordinary-career progress is preserved;
- caller options cannot bypass the bound lock;
- School remains available;
- Activity remains available if its normal cost/conditions are satisfied;
- Secret Debt forced Night owns every bound Night;
- ordinary D42 voluntary Night cannot displace it.

## Hidden work

`secret-debt.hidden-work`:

- costs exactly **1 Energy**;
- uses pre-shift wage values;
- Endurance +1;
- Sexuality +1;
- Lust +0;
- Summer: Reason -1;
- Winter: Sociability -1;
- no Spring/Autumn seasonal penalty.

Wage:

`round(30 + min(110, 0.70*Endurance + 0.60*Sexuality + 0.35*Lust))`

absolute wage cap: **140**.

## Route exits / endings

Repayment:

- full **20000** only;
- explicit action;
- no partial repayment;
- exits bound state;
- does not auto-commit an ending.

Bound Life:

- 49 hidden shifts: not eligible;
- exactly 50: eligible;
- still bound;
- explicit ending commit required;
- no auto-ending.

Takeover:

- hidden shifts >= 75;
- Endurance >= 75;
- Sexuality >= 75;
- Wits >= 35;
- Lust >= 30;
- paid School lessons >= 10;
- still bound before the action;
- explicit `secret-debt.takeover` action required;
- no auto-ending.

Stable ending IDs:

- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

Stable Strong Meta reward IDs:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

---

# 2. Exact source deltas

## Secret Debt v12 production delta

Relative to its task seed, v12 changes these production files:

1. `content/definitions.json`
2. `content/localization.json`
3. `content/packs/secret-debt.json` — new
4. `src/core/content.ts`
5. `src/core/engine.ts`
6. `src/core/schema.ts`
7. `src/core/secretDebt.ts` — new
8. `src/ui/app.ts`

Test added:

`tests/secret-debt-full-route-v12.test.ts`

Exact actions added:

- `secret-debt.hidden-work`
- `secret-debt.repay`
- `secret-debt.takeover`

Exact endings added:

- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

## D51 production delta

D51 changes only one production file relative to v12:

`src/core/engine.ts`

It also:

- adds `tests/secret-debt-activity-energy-compat-v20.test.ts`;
- updates the v12 bound+Street expected Energy from 1 to 2.

No D51 schema/content/pack/localization/UI change exists.

## v27 localization delta

v27 is localization/test/documentation only.

Required runtime ending keys:

- six title/description keys, exact-equal to frozen v12;
- three new epilogue keys.

The runtime namespace is intentionally double-prefixed because ending IDs already begin with `ending.`:

- `ending.ending.secret-debt.paid-freedom.*`
- `ending.ending.secret-debt.bound-life.*`
- `ending.ending.secret-debt.takeover.*`

---

# 3. Final composition order

Chat 2 should compose in this order.

1. Freeze the actual current Chat 2 integration head after D42/current-main work.
2. Add exact new file `src/core/secretDebt.ts` from frozen v12.
3. Add exact new pack `content/packs/secret-debt.json` from frozen v12.
4. Extend current **schema6** with only the v12 Secret Debt schema leaves/state/default.
5. Extend current `content.ts` with only Secret Debt capability validation.
6. Add the three Secret Debt actions and three endings to the current definitions.
7. Convert the three historical v12 generic unlock rewards to canonical current Strong Meta rewards.
8. Merge Secret Debt route/UI localization by key.
9. Merge the three v27 ending epilogues and preserve the exact v27 title/description values.
10. Compose Secret Debt UI additions into the current app without replacing D42/current UI.
11. Manually compose v12 Secret Debt runtime seams into the current engine.
12. Only after that, apply the D51 provenance/Energy seam from v20.
13. Port/adapt focused tests to the current schema6/Strong Meta world.
14. Run typecheck / validate / build.
15. Run the focused bundle defined in v28.
16. Stop on any stop condition in v28; do not “fix” a red gate by weakening D42, Strong Meta, or D51 semantics.

Do not cherry-pick historical shared files wholesale.

---

# 4. Shared-file conflict map

| File | Historical source ownership | Current ownership | Required disposition |
| --- | --- | --- | --- |
| `src/core/secretDebt.ts` | v12 new file | absent in current seed | exact-copy candidate |
| `content/packs/secret-debt.json` | v12 new file | absent in current seed | exact-copy candidate |
| `src/core/schema.ts` | v12 typed Secret Debt, schema5 | current schema6 + Strong Meta + newer systems | manual semantic compose |
| `src/core/engine.ts` | v12 route + D51 patch | current Strong Meta/D40/D41/Activity/Night | highest-risk manual compose |
| `src/core/content.ts` | v12 capability checks | current content validation | selective clauses only |
| `content/definitions.json` | v12 3 actions + 3 endings | current D42/D40/D41/etc. | add exact Secret Debt records only, then Strong Meta reward correction |
| `content/localization.json` | v12 route/UI + v27 endings | current D42/global/localization layers | merge by key only |
| `src/ui/app.ts` | v12 route UI | current D42/current UI | selective UI merge only |
| `tests/secret-debt-full-route-v12.test.ts` | v12 source test, D51 expectation updated | current schema6/Strong Meta | port/adapt |
| `tests/secret-debt-activity-energy-compat-v20.test.ts` | D51 focused matrix | current runtime | port with final fixture semantics |
| `tests/secret-debt-ending-localization-producer-v27.test.ts` | v27 localization | current localization | add/retain unchanged unless path-only adaptation is needed |

---

# 5. Schema6 composition

Historical v12 is schema5. It must never own the final schema file.

Preserve current:

- `schemaVersion: 6`;
- `meta.strongMeta`;
- `run.strongMetaSnapshot`;
- `run.strongMetaRuntime`;
- D40/D41 migration state;
- current NightFlow;
- current Activity envelope;
- current RunResult/transaction types.

Selectively add from v12:

## Public Secret Debt type

Statuses:

- `unseen`
- `refused`
- `accepted`
- `bound`
- `paid-freedom`
- `takeover`

## Conditions

- `schoolPaidLessons`
- `lust`
- `secretDebtStatus`
- `secretDebtShifts`
- `secretDebtLenderEligible`

Do not forget `schoolPaidLessons` and `lust`: Takeover content depends on both.

## Effects

- `secretDebtAccept`
- `secretDebtRefuse`

The existing `addNextDayModifier` mechanism remains the owner of bound/Street next-day provenance.

## Capability declarations

Reads:

- `schoolPaidLessons`
- `lust`
- `secretDebt`

Writes:

- `secretDebt`

## Persisted run state

Add typed `run.secretDebt` with the neutral old-save default:

```text
status: unseen
acceptedDay: null
trapDay: null
boundDay: null
resolvedDay: null
debt: 0
hiddenShifts: 0
grantApplied: false
lastLenderAttemptDay: null
```

This default must apply to pre-Secret-Debt **schema6** saves as well as saves that migrate from older schemas.

Do not infer Secret Debt history from:

- housing;
- legacy generic debt metric;
- Lust;
- Prostitute state;
- ordinary career progress;
- money balance.

Missing state means clean `unseen`, not reconstructed debt history.

---

# 6. content.ts composition

Add only the capability validation necessary for the v12 leaves.

Required checks:

- `schoolPaidLessons` condition requires paid-School read capability;
- `lust` condition requires Lust read capability;
- Secret Debt conditions require `reads.secretDebt===true`;
- `secretDebtAccept` requires Secret Debt write plus money write;
- `secretDebtRefuse` requires Secret Debt write;
- `addNextDayModifier` remains owned by the existing next-day capability path.

Preserve all current Strong Meta/reward/content validation.

Do not replace current `content.ts` with the v12 file.

---

# 7. Definitions and canonical Strong Meta reward binding

Add only the v12 Secret Debt actions/endings to the current definitions.

The historical v12 endings use obsolete generic unlock records:

```text
{ kind:'unlock', rewardId:<id>, unlock:<id> }
```

That is not acceptable in the current schema6/Strong Meta runtime.

All three IDs already exist in the canonical Strong Meta registry and are **Keystone** rewards:

- Earned Reserve Match;
- Work Rhythm;
- Network Retainer.

Final ending definitions must bind:

```text
{
  kind: 'strongMeta',
  rewardId: '<stable id>',
  reward: '<same stable id>'
}
```

Do not:

- add these IDs to `meta.unlocks`;
- create a second reward registry;
- grant both generic unlock and Strong Meta ownership;
- change the stable IDs;
- change Keystone capacity;
- add a Secret Debt Specialist slot.

The existing RunResult transaction path must remain the sole grant path:

- reward only on ending completion;
- first completion semantics preserved;
- transaction ID recorded in `meta.appliedResultTransactions`;
- reload/replay cannot duplicate ownership.

Eligibility and commit are not reward grant points.

---

# 8. Strong Meta interaction rules

Canonical current registry parameters remain authoritative.

## Earned Reserve Match

- current canonical reward ID: `secret-debt.paid-freedom.earned-reserve-match`;
- does not apply to bound Secret Debt hidden work;
- do not pass bound work through ordinary-work Reserve Match behavior.

## Work Rhythm

- current canonical reward ID: `secret-debt.bound-life.work-rhythm`;
- current-run snapshot/runtime remains frozen at creation;
- its start-day Energy bonus participates in effective Energy base;
- Secret Debt bound penalty remains relative and cannot be suppressed by the reward.

## Network Retainer

- current canonical reward ID: `secret-debt.takeover.network-retainer`;
- current runtime already suppresses payment when `secretDebtBound===true`;
- final engine must pass the **live bound state after trap activation**, not a stale/hard-coded false.

Do not reimplement any Strong Meta effect inside `secretDebt.ts`.

---

# 9. Required engine composition

The final current engine must gain the v12 semantics without losing current behavior.

Selectively integrate:

- Secret Debt condition evaluation;
- lender-eligibility condition;
- Secret Debt effects;
- ordinary-career bound lock;
- fresh-life neutral Secret Debt state;
- hidden-work / repay / Takeover dispatch;
- stale ending-eligibility revalidation;
- lender attempt bookkeeping and fixed 20% RNG;
- trap activation;
- Secret Debt save validation;
- Secret Debt forced-Night semantics;
- D51 Street provenance tag;
- D51 pair calculation.

Do not replace current engine with v12 or v20.

## Exact start-day ownership/order

The final Night -> StartDay sequence must be:

1. commit the one calendar advance exactly once;
2. call Secret Debt trap activation if due;
3. derive the **live post-activation** bound boolean;
4. apply queued stat effects;
5. apply current Strong Meta start-day processing with that live bound boolean;
6. compute usable next-day Energy through D51 using current effective Energy max/base;
7. clear `nextDayModifiers` exactly once;
8. perform normal housing/Night cleanup;
9. run normal resolver boundary, allowing trap-activation `dayStarted` content to surface exactly once.

The exact code shape can differ, but that semantic order is locked.

If Strong Meta is called before trap activation, Network Retainer can pay incorrectly on the first bound day. That is a stop condition.

---

# 10. D51 exact Energy ownership

Persisted provenance lives in the existing:

`run.dayState.nextDayModifiers.tags`

Required tags:

- `secret-debt.bound-night`
- `lodging.street.energy-penalty`

The Street tag is written only for the authored Street Energy -1 consequence.

D51 must not infer from current housing alone.

## Pair calculation

When both immediately preceding Night tags are present:

- locked pair delta = -2;
- apply both locked -1 penalties;
- floor the **pair result only** at usable Energy 2;
- then apply unrelated Energy delta;
- retain ordinary global minimum 1.

Equivalent rule:

```text
unrelatedDelta = queuedEnergyDelta - (-2)
afterLockedPair = max(2, effectiveEnergyBase - 2)
finalEnergy = max(1, afterLockedPair + unrelatedDelta)
```

Accepted examples:

- base 3 + Street -1 + bound -1 -> 2
- base 4 + Street -1 + bound -1 -> 2
- base 5 + pair -> 3
- Street only at base 3 -> ordinary 2
- bound only at base 3 -> ordinary 2
- pair + unrelated -1 -> 1

There is no global Energy floor 2.

The pair is a compatibility exception, not a new Energy system.

---

# 11. D42 Night preservation

D42 ordinary Night remains authoritative and must not be rewritten to accommodate Secret Debt.

Secret Debt forced Night:

- event: `secret-debt.forced-night`;
- priority class: `forced`;
- priority: **1000**;
- intercept: `before_lodging`;
- `suppressVoluntaryMenu: true`;
- `consumesNight: true`;
- bound choice queues Energy -1 with tag `secret-debt.bound-night`.

Therefore, while already bound:

- forced Secret Debt Night owns the Night before any voluntary D42 choice;
- no D42 voluntary/private choice executes;
- no D42 success fact/counter is published;
- normal housing resolution still occurs;
- calendar advances exactly once.

Do not lower Secret Debt priority or move it after the voluntary menu.

## Lender is different

`secret-debt.lender-encounter`:

- `critical_progression`;
- priority 200;
- `after_lodging`;
- Street only;
- non-consuming;
- does not suppress voluntary menu.

Acceptance does not retroactively create a forced Night.

## Trap activation is different

`secret-debt.trap-activation` is a `dayStarted` forced scene.

It does not backdate the prior Night.

The first true forced bound Night is the next Night after the route is actually bound.

---

# 12. Localization merge rules

Never replace the current localization file with v12 or v27 wholesale.

## v12 route/UI layer

v12 added exactly **48** localization keys and changed/removed none relative to its seed.

Of those, three are historical generic-unlock labels:

- `unlock.secret-debt.paid-freedom.earned-reserve-match.label`
- `unlock.secret-debt.bound-life.work-rhythm.label`
- `unlock.secret-debt.takeover.network-retainer.label`

Because final ownership is canonical Strong Meta, these three labels must **not** be treated as proof that `meta.unlocks` should exist.

Recommended final selective set:

- merge the 45 non-generic-unlock v12 Secret Debt route/action/event/UI/status/ending title-description keys;
- merge the three v27 epilogue keys;
- preserve v27 exact title/description text;
- only retain the three old `unlock.*` labels if an explicit current UI compatibility consumer is proven to require them; never create generic ownership just to make those labels visible.

## v27 ending layer

Required 9 runtime keys:

Paid Freedom:
- `ending.ending.secret-debt.paid-freedom.title`
- `ending.ending.secret-debt.paid-freedom.description`
- `ending.ending.secret-debt.paid-freedom.epilogue`

Bound Life:
- `ending.ending.secret-debt.bound-life.title`
- `ending.ending.secret-debt.bound-life.description`
- `ending.ending.secret-debt.bound-life.epilogue`

Takeover:
- `ending.ending.secret-debt.takeover.title`
- `ending.ending.secret-debt.takeover.description`
- `ending.ending.secret-debt.takeover.epilogue`

The six title/description rows equal frozen v12 semantics. The three epilogues are the actual v27 semantic addition.

Preserve all D42/global caption/current localization rows.

---

# 13. Save / migration risk register

## Risk A — schema6 old save without Secret Debt

Expected:

- parse succeeds;
- neutral `unseen` state is inserted;
- Strong Meta snapshot/runtime unchanged;
- D40/D41/D42 state unchanged;
- no inference from legacy debt or housing.

Stop if the assembly requires a global schema downgrade or silently rejects legitimate pre-Secret-Debt schema6 saves.

## Risk B — accepted/grant replay

`grantApplied` plus typed status/day data must prevent a reloaded accepted offer from granting +2000 again.

Stop on any reload path that can duplicate the grant.

## Risk C — trap replay/backdating

Trap activation must be deterministic at exact +10 calendar days.

Stop if reload:

- activates early;
- activates twice;
- creates a forced penalty for the prior Night;
- changes `boundDay`.

## Risk D — forced Night replay

NightFlow pending state and next-day tags must survive reload.

Stop if reload can:

- re-run the forced choice effect;
- duplicate `secret-debt.bound-night`;
- double-advance calendar;
- expose D42 voluntary Night while bound.

## Risk E — D51 provenance loss

Both tags and queued delta must survive pre-StartDay reload.

Stop if D51 is reconstructed from housing/status rather than persisted tags.

## Risk F — repayment / Takeover stale eligibility

After explicit route exit, stale Bound Life eligibility must not remain committable.

Stop if a route outcome can be committed after its conditions stopped being true.

## Risk G — reward replay

RunResult transaction proof remains the exactly-once boundary.

Stop if ending eligibility/commit grants reward, or if completion reload duplicates canonical Strong Meta ownership.

---

# 14. What must not be copied wholesale

Never wholesale copy from frozen v12/v20/v27:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `content/definitions.json`
- `content/localization.json`
- `src/ui/app.ts`

Reasons:

- v12 schema is historical schema5 and lacks current Strong Meta;
- v12/v20 engine predates current Strong Meta/D40/D41/current Activity composition;
- historical definitions use stale generic unlock rewards;
- current definitions/localization/UI contain later D42 and other accepted layers;
- v27 localization is selective, not cumulative.

Exact-copy candidates are limited to:

- `src/core/secretDebt.ts`
- `content/packs/secret-debt.json`

Even these must compile/validate against the current composed contracts immediately after insertion.

---

# 15. Focused source test expectations

The final Chat 2 gate is defined in v28, but the source responsibilities are:

## Secret Debt route

Use the D51-head version of:

`tests/secret-debt-full-route-v12.test.ts`

Adapt it for current schema6/Strong Meta:

- canonical `kind:'strongMeta'` reward assertions;
- schema6 pre-Secret-Debt default case;
- no stale generic-unlock ownership;
- exact current transaction behavior.

## D51

Port:

`tests/secret-debt-activity-energy-compat-v20.test.ts`

Preserve T1–T11, including mandatory unrelated-third-penalty case.

## Localization

Add/retain:

`tests/secret-debt-ending-localization-producer-v27.test.ts`

## D42

Retain:

`tests/night-content-gap-v10.test.ts`

## Ordinary Prostitute separation

Use:

`tests/prostitute-boundaries.test.ts`

Do **not** use historical `tests/chat3-secret-debt-separation-v2.test.ts` as a post-assembly absence gate. v24 executable QA proved that test intentionally asserts Secret Debt production is absent; it becomes stale once v12 is assembled.

---

# 16. Stop conditions

Chat 2 must stop assembly and classify the conflict rather than weakening semantics if any of these occur:

1. current schema6 cannot accept neutral missing `run.secretDebt` without overwriting Strong Meta;
2. Secret Debt requires replacing current engine wholesale;
3. first trap day pays Network Retainer because bound state was sampled too early;
4. forced Night does not preempt D42 voluntary Night;
5. D42 facts/counters publish on a bound Night;
6. calendar advances more or less than once per completed Night;
7. D51 triggers from housing alone;
8. pair + unrelated -1 cannot reach 1;
9. Activity entry cost is changed from 2 to “solve” D51;
10. Street Grooming -1 is lost;
11. hidden work cost/wage/stat rules drift;
12. 49 shifts becomes Bound Life eligible or 50 auto-commits;
13. Takeover auto-resolves without explicit action;
14. ordinary careers are usable while bound;
15. School/Activity are globally locked while bound;
16. Secret Debt creates Palace access;
17. v12 generic unlock rewards coexist with canonical Strong Meta ownership;
18. reward applies before ending completion;
19. reload duplicates +2000, 20000 activation, Night penalty, Street penalty, calendar, or ending reward;
20. current D42/current localization is overwritten by a historical snapshot.

---

# 17. Final disposition

There is no product ambiguity blocking the Secret Debt + D51 tranche.

The correct integration strategy is:

**selective semantic composition onto the actual current schema6/D42/Strong-Meta integration head.**

The highest-risk seams are:

1. current engine start-day ordering;
2. schema6 Secret Debt defaulting;
3. D42 forced-Night precedence;
4. D51 explicit provenance;
5. canonical Strong Meta reward binding;
6. exactly-once save/reload behavior.

**READY_FOR_CHAT2_PREFLIGHT**
