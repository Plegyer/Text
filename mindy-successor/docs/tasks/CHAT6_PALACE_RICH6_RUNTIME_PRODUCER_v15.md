# Chat 6 — Palace Rich-Six Runtime Producer v15

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-rich6-runtime-producer-v15`

Dispatch base:
`6fdf47c3a002e854d325fd40d24193d8374953df`

Authority preserved:
- D23 Palace entry;
- D29 rich-six topology;
- v11 state/milestone contract;
- v12 exact 15-duty authored map;
- D39 non-True Palace rewards;
- D43 daily cadence/economy.

No main merge.
No PR.
No full CI.

---

## 1. Production candidate implemented

v15 adds a current-main-compatible Palace runtime/content implementation candidate for:

- typed run-local Palace progression;
- exact six stages;
- exact 15 structural duties;
- exact 2 / 5 / 8 / 12 / 15 structural milestones;
- one structural duty/calendar day;
- optional one support action/calendar day;
- exact D43 Energy/wage semantics;
- reload-safe typed state;
- five blocking milestone events;
- six route-prep support actions;
- three non-True finalize events;
- three non-True ending definitions;
- separate Return Home ending eligibility;
- RU/EN production localization;
- focused Palace runtime tests;
- exact D39/D24 external reward seams.

---

## 2. Typed Palace state

File:
`src/core/schema.ts`

Added:
`run.progression.palace`

This is deliberately **not** stored in:

`run.progression.careers['palace']`

The typed Palace state extends normal career-state semantics so existing career conditions/reactions can consume it, but keeps Palace-specific fields explicit.

Stable stages:

1. `entered-service`
2. `working-rhythm`
3. `trusted-service`
4. `palace-network`
5. `crossroads`
6. `outcome-ready`

Stable persisted counter:

`palace-duty-count`

Additional run-local fields:

- `lastStructuralDutyDay`;
- `lastSupportActionDay`;
- ordered `committedDutyIds`;
- ordered/unique `completedSupportIds`;
- non-exclusive `routePrepFacts`.

Default state is supplied by the schema, so existing schema-5 saves without this field parse into an empty Palace progression state.

Schema version remains 5.

This does not synthesize:
- Palace access;
- D23 qualification;
- a retroactive invitation;
- Palace progression.

---

## 3. Split-authority protection

`assertPalaceProgressionState()` rejects:

- a duplicate `progression.careers['palace']` state;
- duty count outside 0..15;
- `shifts !== palace-duty-count`;
- a stage/count mismatch;
- skipped/reordered/duplicated structural duty IDs;
- duplicate/unknown support actions;
- support beat 2 without beat 1;
- duplicate route-prep identities;
- route-prep typed/worldFact projection mismatches;
- prep fact without its completing support beat;
- duplicated `palace.progression-complete`;
- completion fact before duty 15 / outside Outcome Ready;
- Palace daily locks dated in the future.

This keeps the typed Palace state authoritative.

---

## 4. Existing D23 flow preserved

Existing D23 consumer remains authoritative:

```text
permanent ordinary Hard Work 10/10
+ current-run active packages 10/10
-> creationCompleted qualification
-> Day-1 latched invitation
-> explicit accept
-> palace.access-granted
```

v15 does not restore:

- `meta.unlocks['palace']`;
- `ensurePalaceUnlock`;
- permanent-only Palace access;
- retroactive old-save invitation.

The old v8 D23 focused test remains part of the requested Chat 2 focused run.

---

## 5. Palace career machine

File:
`content/definitions.json`

Added career machine:

`palace`

Transitions:

| Count | Transition | From | To |
|---:|---|---|---|
| 2 | `duty-02-working-rhythm` | Entered Service | Working Rhythm |
| 5 | `duty-05-trusted-service` | Working Rhythm | Trusted Service |
| 8 | `duty-08-palace-network` | Trusted Service | Palace Network |
| 12 | `duty-12-crossroads` | Palace Network | Crossroads |
| 15 | `duty-15-outcome-ready` | Crossroads | Outcome Ready |

Each uses exact counter equality.

Only duty 15 transition writes:

`palace.progression-complete`

Exactly once.

---

## 6. Structural duty transaction

Implemented in:
`src/core/engine.ts`

Palace action IDs are ordinary catalog actions for content/UI compatibility, but their transaction is intercepted before the generic action wage/effect path.

Atomic Palace duty order:

1. validate action catalog conditions;
2. validate Palace access;
3. validate exact next duty ordinal;
4. validate exact current Palace stage;
5. validate no structural Palace duty already committed today;
6. validate count <15;
7. validate current Energy >=1;
8. calculate D43 wage from pre-duty stats;
9. Energy -1;
10. money + wage;
11. set exact new `palace-duty-count`;
12. set Palace `shifts` equal to the count;
13. set daily structural lock;
14. append exact committed duty ID;
15. apply the matching stage transition if this is duty 2/5/8/12/15;
16. at duty 15, transition writes `palace.progression-complete`;
17. record ordinary action/history counters;
18. register newly eligible endings;
19. run standard resolver boundary.

Because `dispatch` operates on a cloned Save and returns only after successful completion, an exception during the transaction does not mutate the caller's original Save.

---

## 7. D43 exact economy

Energy:
**1**

Max structural duties:
**1/calendar day**

Duty ends daytime:
**no**

Wage:

```text
35 + min(
  20,
  floor((Reason + Wits + Manners + Sociability) / 20)
)
```

Range:
**35..55**

At 91 / 91 / 91 / 91:
**53**

At cap-200:
still **55 max**

Maximum 15-duty gross:
**825**

Routine structural duty changes:
- progression stats: none;
- Lust: none;
- negative stats: none;
- items: none;
- next-day modifiers: none.

There is no generic `wage` property on Palace actions.

The bounded Palace formula is applied only by Palace runtime.

---

## 8. No 16th paid progression duty

After duty 15:

- `palaceDutyCount = 15`;
- stage = Outcome Ready;
- `palace.progression-complete` exists;
- every structural Palace duty returns unavailable;
- no 16th paid progression action exists.

Post-Outcome Palace content must use non-counting support/event surfaces.

This is the main anti-farm boundary, including while Secret-Debt-bound.

---

## 9. Exact 15 duty IDs

1. `palace.duty.01-service-rotation`
2. `palace.duty.02-logistics-support`
3. `palace.duty.03-records-review`
4. `palace.duty.04-service-rotation`
5. `palace.duty.05-logistics-support`
6. `palace.duty.06-coordination`
7. `palace.duty.07-records-review`
8. `palace.duty.08-service-rotation`
9. `palace.duty.09-formal-interface`
10. `palace.duty.10-coordination`
11. `palace.duty.11-logistics-support`
12. `palace.duty.12-records-review`
13. `palace.duty.13-evidence-review`
14. `palace.duty.14-formal-interface`
15. `palace.duty.15-coordination`

All use:
- 1 Energy;
- zero generic action effects;
- zero generic wage;
- zero seasonal effects;
- one functional baseline scene.

No final Palace mystery/lore is introduced.

---

## 10. Milestone pack

Added:

`content/packs/palace-progression.json`

Pack:
`palace.progression`

Five events:

- `palace.progression.milestone-02-working-rhythm`
- `palace.progression.milestone-05-trusted-service`
- `palace.progression.milestone-08-palace-network`
- `palace.progression.milestone-12-crossroads`
- `palace.progression.milestone-15-outcome-ready`

Each:
- reacts to Palace `careerTransition`;
- `critical_progression`;
- priority 100;
- blocking;
- latched;
- `maxShows: 1`;
- no RNG;
- writes exactly one `milestone-XX-resolved` Palace career fact.

The stage/count transaction is already serialized before the milestone scene opens.

Reload during the milestone cannot replay:
- Energy;
- wage;
- duty count;
- transition;
- daily lock.

---

## 11. Support/prep runtime

Exact six support actions:

### Service Life
- `palace.outcome-prep.service-life.01-continuity`
- `palace.outcome-prep.service-life.02-boundaries`

Available from Trusted Service.

Beat 2 writes:
`palace.prep.service-life`

### Court Power
- `palace.outcome-prep.court-power.01-responsibility`
- `palace.outcome-prep.court-power.02-network`

Available from Palace Network.

Beat 2 writes:
`palace.prep.court-power`

### Inner Truth
- `palace.outcome-prep.inner-truth.01-evidence`
- `palace.outcome-prep.inner-truth.02-contradiction`

Available from Crossroads.

Beat 2 writes:
`palace.prep.inner-truth`

All six:
- cost 1 Energy;
- max one Palace support action/calendar day;
- pay 0;
- grant no routine stats;
- grant no Lust;
- grant no duty count;
- may happen on a structural-duty day if Energy remains.

The three route prep identities are non-exclusive.

---

## 12. Outcome finalization pack

Added:

`content/packs/palace-outcome-finalize.json`

Pack:
`palace.outcome-finalize`

Events:

- `palace.outcome-finalize.service-life`
- `palace.outcome-finalize.court-power`
- `palace.outcome-finalize.inner-truth`

Each requires:
- Palace access;
- Outcome Ready;
- `palace.progression-complete`;
- exact route prep fact;
- final-ready fact absent.

Each listens to both:
- `palace.progression-complete` added;
- its route prep fact added.

Therefore it works whether prep finishes:
- before duty 15;
- or after Outcome Ready.

Each is:
- blocking;
- latched;
- max once;
- no RNG.

Finalize writes only:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- or `palace.outcome.inner-truth-ready`.

Finalize never commits an ending.

---

## 13. Non-True endings

Added:

- `ending.palace.service-life`
- `ending.palace.court-power`
- `ending.palace.inner-truth`

Common eligibility:
- Palace access;
- stage Outcome Ready;
- `palace.progression-complete`;
- exact corresponding final-ready fact.

Multiple may coexist in `run.endings.eligible`.

Only existing explicit `commitEnding` chooses one.

Current-life ending completion continues through the existing:
`commitEnding -> completeEnding`
transaction.

---

## 14. D39 reward integration seam

Current main does not contain the accepted Chat 4 strong-Meta runtime producer.

Dependency:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Therefore v15 does **not** create a second registry.

Exact reward identity seams are exported by `src/core/palace.ts`:

```text
ending.palace.service-life
-> palace.service-life.steady-practice
-> Specialist

ending.palace.court-power
-> palace.court-power.formal-introduction
-> Specialist

ending.palace.inner-truth
-> palace.inner-truth.source-method
-> automatic knowledge/content
```

The ending definitions also use those exact locked reward strings.

Their current `metaRewards` arrays are explicitly empty.

Why:

if `metaRewards` were omitted, current legacy engine would synthesize an old `unlock` reward from `ending.reward`, creating the wrong Meta semantics.

Chat 2 must bind these ending completion transactions to the accepted strong-Meta / automatic-knowledge owner after integrating Chat 4.

---

## 15. Return Home ending seam

Added:

`ending.palace.return-home`

Eligibility:

- Palace access;
- Palace stage Outcome Ready;
- `palace.progression-complete`;
- Strength >=91;
- Endurance >=91;
- Dexterity >=91;
- Reason >=91;
- Magic >=91;
- Creativity >=91;
- Wits >=91;
- Charm >=91;
- Sociability >=91;
- Manners >=91;
- Grooming >=91;
- Sexuality >=91;
- `palace.prince-defeated` present.

Lust has no condition.

Prince confrontation implementation itself remains external/frozen under v9.

The ending reward identity seam is:

`palace.true.cap-200`

Again, `metaRewards: []` until Chat 4 strong-Meta owner is assembled.

Prince defeat does not auto-commit Return Home.

---

## 16. Secret Debt boundary

v15 deliberately does not edit Secret Debt owner files.

Palace action availability does not use the ordinary-career domain lock.

Therefore a legitimately opened Palace remains a separate daytime domain.

Expected integration behavior:

- D23 access remains;
- Palace typed progression remains;
- ordinary ten careers may be externally domain-locked;
- Palace duty/support stays legal;
- Palace spends from the **already resolved current-day Energy**;
- a bound-day Energy=2 becomes 1 after one Palace duty;
- Palace does not refund or alter next-day modifiers;
- Palace does not touch debt;
- Palace does not touch lender chance;
- Palace does not touch repayment;
- Palace does not touch forced Night.

Finite paid Palace work ends at duty 15, max gross 825.

---

## 17. Lodging / Night boundary

No Palace daytime action contains a housing condition.

Normal / cheap / street do not gate Palace daytime work.

v15 adds no Palace Night choice and no Night owner.

Therefore:
- no Palace Night can outrank forced Secret Debt Night;
- no Palace Night grants duty count/wage/Energy refund;
- D35 private-space content remains outside this runtime producer.

Any later Palace Night integration must remain voluntary and subordinate to forced Secret Debt Night.

---

## 18. Localization

Modified:
`content/localization.json`

Added/updated **110 Palace keys** with RU and EN:

- 21 action labels;
- 21 action descriptions;
- 21 action baseline scene texts;
- Palace career label;
- six Palace stage labels;
- five milestone titles/bodies/choice label/result;
- three finalize titles/bodies/choice label/result;
- four ending titles/descriptions.

Static localization audit:
**0 missing RU/EN Palace keys**.

Copy is functional only.

No Prince name, final mystery answer or new Palace lore is introduced.

---

## 19. Focused test suite

Added:

`tests/palace-rich6-runtime-v15.test.ts`

Coverage includes:

- D23 invitation/access preservation;
- schema-5 save without Palace state defaults safely;
- Energy1 duty;
- bounded wage;
- no routine stat/Lust changes;
- cap-200 wage stays 55;
- same-day second duty rejected without mutating caller save;
- all 15 duties in exact order;
- stages at 2/5/8/12/15;
- milestone pending save/reload;
- exactly-once progression-complete;
- total paid structural wage <=825;
- no paid duty after 15;
- support Energy1/pay0/no-duty/no-stat/no-Lust;
- max one support/day;
- prep facts;
- all three prep routes coexist;
- all three non-True endings coexist eligible;
- explicit ending commit required;
- Return Home exact 12x91;
- Lust excluded;
- one stat at 90 fails even with high Lust;
- ordinary domain lock does not block Palace;
- bound-like Energy2 -> Palace duty leaves Energy1;
- next-day penalty state is untouched;
- no daytime housing gates;
- v15 adds no Palace Night owner;
- milestone/finalize packs are latched exactly-once;
- D39 reward IDs match seams and no legacy Meta grant is emitted;
- no `hardWork:palace`;
- RU/EN localization coverage;
- malformed/skipped duty save rejection;
- remaining daytime Energy after Palace duty.

Existing focused v8 D23 test still supplies the requested:
- 9+9;
- 10+0;
- 10+9;
- 10+10;
- invitation reload;
- no retroactive old-save invitation.

---

## 20. QA actually performed on producer branch

Performed through GitHub connector/static inspection:

- JSON parse for modified `definitions.json`;
- JSON parse for both new packs;
- JSON parse for full modified localization;
- exact Palace machine/stage/transition audit;
- action count audit: 15 duties + 6 support;
- ending count audit: 4 Palace endings;
- pack count audit: 5 milestone + 3 finalize events;
- typed pack capability/reference audit against current content loader rules;
- D23 legacy-regression string audit;
- `hardWork:palace` audit;
- routine action effect/wage/seasonal audit;
- True 12-stat/Lust exclusion audit;
- reward-ID/metaRewards seam audit;
- RU/EN key completeness audit;
- worker diff audit;
- GitHub Actions branch-run query.

Results:
- static/reference audits: **PASS**;
- missing Palace RU/EN keys: **0**;
- generic Palace action wage fields: **0**;
- direct Palace action effects: **0**;
- seasonal Palace action effects: **0**;
- legacy `ensurePalaceUnlock`: **absent**;
- `hardWork:palace`: **absent**;
- PR: **none**.

### Executable commands not run by Chat 6

Requested focused executable commands:
- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- Node focused test runner.

They were **not executable in this Chat 6 environment**:
- no repository checkout is mounted in the local container;
- project dependency `zod` is not installed in that container;
- the GitHub App branch has **0 workflow runs** and the commit-status endpoint is not accessible to this installation.

No synthetic/full workflow was created because:
- full CI belongs to Chat 2;
- creating CI/workflow infrastructure is outside v15 authority.

Chat 2 must run the focused commands after assembly/before merge.

---

## 21. Chat 2 assembly checklist

1. Start from exact frozen v15 SHA reported by Chat 6.
2. Integrate/resolve Chat 4 strong-Meta runtime owner.
3. Bind:
   - Service Life completion -> Steady Practice ownership;
   - Court Power completion -> Formal Introduction ownership;
   - Inner Truth completion -> Source Method automatic knowledge;
   - Return Home completion -> cap-200 ownership.
4. Do not replace v15 `run.progression.palace` with `progression.careers['palace']`.
5. Do not restore `meta.unlocks['palace']`.
6. Preserve D23 invitation/access consumer.
7. Preserve external Secret Debt ordinary-career lock and forced Night precedence.
8. Add/expose Palace daytime actions in UI only in Chat 2/authorized UI assembly; v15 does not edit `src/ui/app.ts`.
9. Run focused:
   - typecheck;
   - validate;
   - build;
   - v8 D23 test;
   - v15 Palace runtime test.
10. Then use Chat 2's sole full-CI lane when authorized.

---

## 22. Files changed by v15 producer

Runtime:
- `src/core/schema.ts`
- `src/core/palace.ts`
- `src/core/engine.ts`

Live content:
- `content/definitions.json`
- `content/localization.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`

Focused QA:
- `tests/palace-rich6-runtime-v15.test.ts`

Handoff:
- `docs/tasks/CHAT6_PALACE_RICH6_RUNTIME_PRODUCER_v15.md`

No UI file changed.
No Secret Debt owner file changed.
No strong-Meta owner file changed.

Freeze exact SHA and report:

`READY_FOR_CHAT2_ASSEMBLY`
