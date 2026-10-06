# Chat 3 — Palace Save / Reload Matrix v34

Status: **RESEARCH COMPLETE — BUNDLE TASK B COMPLETE**  
Owner: Chat 3  
Branch: `chat3/palace-independent-release-review-v33`

## Scope

Exact save/reload matrix for the future assembled Palace tranche covering:

- D23 access qualification;
- Palace duty progression;
- support/prep use;
- Outcome Ready;
- Prince readiness and retry;
- `palace.prince-defeated`;
- explicit Return Home commit;
- D39 reward completion;
- current-run vs future-run reward activation;
- Secret Debt forced-Night coexistence.

Authorities:

- Palace v18 mechanics/narrative;
- Palace v19 final prose/presentation;
- D39 v20 runtime;
- Palace assembly refresh v21;
- D43/D45/D48/D49;
- current schema6 / ending transaction / Strong Meta ownership model.

No production runtime change is authorized here.

---

# 1. Palace persisted state model

Palace progression is run-local and separate from ordinary careers.

Stable persisted state under:

`run.progression.palace`

contains:

- `stage`
- `shifts`
- `counters['palace-duty-count']`
- `facts`
- `lastStructuralDutyDay`
- `lastSupportActionDay`
- ordered `committedDutyIds`
- ordered/unique `completedSupportIds`
- non-exclusive `routePrepFacts`

Stable Palace stages:

1. `entered-service`
2. `working-rhythm`
3. `trusted-service`
4. `palace-network`
5. `crossroads`
6. `outcome-ready`

Other serialized Palace carriers:

- world fact `palace.d23-qualified`;
- world fact `palace.access-granted`;
- world fact `palace.progression-complete`;
- world fact `palace.prince-defeated`;
- quest `palace.prince-confrontation`;
- pending/latched event state;
- ending eligible/committed/result state;
- Strong Meta snapshot/runtime;
- permanent Strong Meta ownership / inherited knowledge;
- RunResult transaction proof.

---

# 2. Access qualification matrix

## A1 — not qualified

Input:

- permanent ordinary Hard Work <10/10, or
- active current-creation ordinary packages <10/10.

Expected:

- no `palace.d23-qualified`;
- no Palace invitation;
- no access fact.

Reload:

- cannot synthesize qualification;
- cannot synthesize invitation.

## A2 — 10 permanent + 10 active before creation completion

At creation completion:

- Hard Work packages apply/freeze;
- D23 predicate evaluates;
- `palace.d23-qualified` is recorded;
- deterministic Day-1 invitation becomes eligible.

Reload before invitation resolves:

- qualification remains;
- pending/latched invitation remains exactly once;
- no duplicate invitation history.

## A3 — invitation pending

Save while Day-1 arrival/reveal is pending.

Reload must preserve:

- exact pending scene;
- no `palace.access-granted` until explicit acceptance;
- no double event show.

## A4 — invitation accepted

Acceptance writes exactly:

`palace.access-granted`

Reload:

- access persists for that run;
- invitation does not repeat;
- no permanent `meta.unlocks['palace']` is created.

## A5 — restart/new life

Run-local access clears.

Permanent Hard Work history remains.

New life must qualify again using:

- permanent 10/10;
- current creation active 10/10.

No cross-life Palace access carryover.

---

# 3. Legacy/migration access firewall

Existing old completed save must not receive a retroactive Day-1 invitation merely because historical Hard Work state happens to satisfy current D23.

Migration must preserve:

- no fabricated `palace.d23-qualified`;
- no fabricated `palace.access-granted`;
- no retroactive invitation.

Qualification belongs to successful current creation completion under the active rules.

---

# 4. Structural duty save/reload matrix

Each structural duty is atomic:

1. validate access;
2. validate next ordinal/stage;
3. validate duty count <15;
4. validate no structural duty already today;
5. validate Energy >=1;
6. compute pre-duty wage;
7. spend 1 Energy;
8. pay wage;
9. increment duty count exactly once;
10. set daily lock;
11. append exact duty ID;
12. apply milestone stage transition if applicable;
13. publish completion fact at duty 15 if applicable;
14. run resolver.

## D1 — before structural duty

Save before dispatch.

Reload:

- duty remains available if all conditions still true;
- no Energy spent;
- no wage paid;
- count unchanged.

## D2 — after atomic duty commit, before milestone scene resolves

Expected persisted state already includes:

- Energy spent once;
- wage paid once;
- duty count advanced once;
- exact duty ID appended;
- `lastStructuralDutyDay` set;
- stage transitioned if milestone duty;
- milestone pending scene may exist.

Reload:

- milestone scene may resume;
- duty transaction must not replay;
- no second wage;
- no second Energy spend;
- no second count increment.

## D3 — same-day second structural duty attempt

Must remain unavailable.

Reload on same calendar day does not clear:

`lastStructuralDutyDay`.

## D4 — next calendar day

Daily lock becomes non-blocking by date comparison.

Reload does not need to reset the persisted old day value manually.

---

# 5. Structural milestone matrix

| Duty | Stage after commit | Required durable state |
| ---: | --- | --- |
| 1 | entered-service | duty count 1 |
| 2 | working-rhythm | transition serialized; milestone-02 may be pending |
| 5 | trusted-service | transition serialized; milestone-05 may be pending |
| 8 | palace-network | transition serialized; milestone-08 may be pending |
| 12 | crossroads | transition serialized; milestone-12 may be pending |
| 15 | outcome-ready | transition serialized + `palace.progression-complete` exactly once |

Reload during any milestone must preserve:

- new stage;
- new duty count;
- committed duty ID;
- pending latched event.

The event cannot be the owner of the already-committed duty transaction.

---

# 6. Duty 15 / Outcome Ready matrix

Immediately after duty 15 atomic commit:

- duty count = 15;
- shifts = 15;
- stage = `outcome-ready`;
- `palace.progression-complete` exists exactly once;
- no structural duty 16 is available.

If milestone-15 scene is pending:

reload must not:

- remove Outcome Ready;
- add another completion fact;
- reopen paid duty progression.

After milestone resolves:

state remains Outcome Ready.

No reload can restore a 16th paid structural action.

---

# 7. Support/prep save/reload matrix

All support actions:

- cost 1 Energy;
- pay 0;
- do not increment duty count;
- max one Palace support action/calendar day.

## S1 — before support

Reload has no effect.

## S2 — after support beat 1

Persist:

- exact support ID in `completedSupportIds`;
- `lastSupportActionDay`;
- Energy spend once.

No route prep fact yet where beat 2 owns completion.

Reload must not allow beat 1 to repay Energy or duplicate completion.

## S3 — support beat 2 completes route prep

Persist:

- support ID;
- exact `routePrepFact`;
- projected world/career fact required by runtime consistency;
- daily support lock.

Reload:

- route prep remains;
- no duplicate routePrepFact;
- no Energy replay.

## S4 — multiple route preps

Service / Court / Inner Truth prep facts may coexist.

Reload must preserve all three without converting them into exclusive choices.

## S5 — prep completed after duty 15

If already Outcome Ready, finalization resolver may trigger after route prep completes.

Reload must support both ordering cases:

- prep before duty 15;
- prep after duty 15.

---

# 8. Outcome finalization save/reload matrix

Non-True finalize events:

- Service Life;
- Court Power;
- Inner Truth.

Each is:

- blocking;
- latched;
- max once;
- no RNG.

Finalize writes only its final-ready fact.

## F1 — eligible to finalize, scene not yet shown

Reload may still expose the exact finalize event.

No permanent reward exists yet.

## F2 — finalize scene pending

Reload preserves pending scene/allowed choices.

No ending is committed.

## F3 — finalize choice resolved

Persist corresponding final-ready fact:

- `palace.outcome.service-life-ready`;
- `palace.outcome.court-power-ready`;
- `palace.outcome.inner-truth-ready`.

Reload:

- ending becomes/remains eligible;
- no permanent reward;
- no auto-commit.

Multiple non-True ending eligibilities may coexist.

---

# 9. Prince readiness matrix

Exact readiness:

- `palace.access-granted`;
- stage `outcome-ready`;
- `palace.progression-complete`;
- all 12 progression stats >=91;
- `palace.prince-defeated` absent;
- confrontation quest stage `ready`.

Lust is ignored.

## P1 — one stat 90

Reload cannot make confrontation available.

High Lust does not compensate.

## P2 — all 12 >=91 but not Outcome Ready

Unavailable.

Reload cannot infer Palace progression from stats.

## P3 — Outcome Ready + 12x91

`palace.confront-prince` is available if quest ready and defeat absent.

Action costs:

- Energy 0;
- money 0.

Reload before action leaves it available.

---

# 10. Prince confrontation stage matrix

Quest:

`palace.prince-confrontation`

Stages:

1. `ready`
2. `audit-record`
3. `name-contradiction`
4. `define-boundary`
5. `reconstruct-return`
6. `defeated`

## P4 — after explicit begin

Save after begin / during phase 1.

Reload preserves:

- quest stage;
- pending exact phase;
- allowed-choice snapshot.

No RNG reroll exists.

## P5 — after phase success

Reload resumes next legal phase.

No previous phase replays as a state mutation.

## P6 — failure/back-out

Failure or Not Yet:

- writes no defeat fact;
- commits no ending;
- returns quest to `ready`;
- preserves Palace progression and stats;
- costs no new Product-defined resource.

Reload after reset:

- confrontation may be attempted again immediately if readiness still holds.

## P7 — repeated failures

There is no Product retry counter.

Reload must not fabricate one.

Technical event replay ceilings cannot become a Product retry budget.

---

# 11. Prince defeat matrix

Only phase 4 successful choice writes:

`palace.prince-defeated`

and quest stage becomes `defeated`.

## PD1 — before phase 4 success

Defeat fact absent.

Reload cannot synthesize it.

## PD2 — phase 4 success committed

Persist:

- defeat fact exactly once;
- quest stage defeated;
- Return Home eligibility may become true.

Reload:

- fact remains;
- confrontation action no longer appears;
- no additional reward is granted;
- no Return Home commit occurs.

## PD3 — reload repeatedly after defeat

No duplicate fact.

No new transaction.

No Prince reward transaction exists separately from ending completion.

---

# 12. Explicit Return Home commit matrix

Ending:

`ending.palace.return-home`

Prince defeat makes it eligible only when all other ending conditions hold.

## R1 — defeated but uncommitted

Reload:

- Return Home remains eligible;
- run remains not ended;
- no cap-200 ownership is granted.

## R2 — explicit commit

Persist:

- `run.endings.committed = ending.palace.return-home` (or current equivalent);
- current-life committed ending state.

Reload before `completeEnding`:

- commitment remains;
- no permanent reward yet;
- no duplicate commit.

## R3 — completeEnding

On first completion:

- RunResult produced;
- transaction proof recorded;
- `palace.true.cap-200` ownership granted exactly once;
- current run snapshot remains unchanged.

Reload:

- no reward replay;
- RunResult identity stable;
- transaction proof stable.

---

# 13. Non-True D39 ending completion matrix

## Service Life

Before `completeEnding`:

- no Steady Practice ownership.

On first completion:

- grant `palace.service-life.steady-practice` exactly once.

Reload:

- ownership preserved;
- current run Strong Meta snapshot unchanged.

## Court Power

Before `completeEnding`:

- no Formal Introduction ownership.

On first completion:

- grant `palace.court-power.formal-introduction` exactly once.

Reload:

- ownership preserved;
- current run snapshot unchanged.

## Inner Truth

Before `completeEnding`:

- no Source Method knowledge ownership.

On first completion:

- add `palace.inner-truth.source-method` to permanent inherited knowledge exactly once.

Reload:

- permanent knowledge preserved;
- current run automatic knowledge snapshot unchanged.

---

# 14. Current-run vs future-run activation matrix

| Reward | Earned at completion | Same-life activation | Future-life behavior |
| --- | --- | --- | --- |
| Steady Practice | permanent Specialist ownership | NO | may be explicitly selected in later New Start+ |
| Formal Introduction | permanent Specialist ownership | NO | may be explicitly selected in later New Start+ |
| Source Method | permanent knowledge | NO | automatically present in later run snapshot |
| cap-200 | permanent Specialist ownership | NO | may be explicitly selected in later New Start+ |

A reward earned after the current run snapshot resolves must never mutate that snapshot.

Reload within the earning life must not activate newly earned reward state.

---

# 15. D39 run-state reload matrix

## Steady Practice

Persist run-local:

- ordered `steadyPracticeBoundCareerIds`;
- `steadyPracticeProtectionsUsedByCareer`.

Reload:

- bind order preserved;
- used counters preserved;
- no protection restored;
- no protection consumed twice.

Ghost state without resolved Steady Practice must be rejected.

## Formal Introduction

Persist:

- `formalIntroductionUsedRelationshipIds`.

Reload:

- used relationship IDs preserved;
- max-use count derives from resolved snapshot;
- same relationship cannot be consumed again;
- failed transition never enters used list.

Ghost state without resolved Formal Introduction must be rejected.

## Source Method

No use counter.

Run snapshot contains automatic knowledge IDs.

Reload preserves snapshot exactly.

Permanent knowledge earned mid-life does not inject into snapshot.

---

# 16. Strong Meta preference / profile merge matrix

Permanent ownership/knowledge may merge.

Required behavior:

- ownership union/dedupe;
- inherited knowledge union/dedupe;
- transaction proof union/dedupe;
- current profile preferred selection remains authoritative;
- imported Specialist is not auto-selected;
- imported Source Method does not mutate an already-resolved run snapshot.

Reload after merge must not silently change current life loadout.

---

# 17. Secret Debt coexistence — daytime state

If Palace access exists before later Secret Debt binding:

persist through bind/reload:

- `palace.access-granted`;
- Palace stage;
- duty count;
- daily locks;
- committed duty IDs;
- support IDs;
- route prep facts;
- progression-complete;
- Prince quest state if already present.

Secret Debt binding must not reset any Palace field.

Ordinary careers may become locked; Palace remains a separate daytime domain.

---

# 18. Secret Debt forced-Night coexistence matrix

Forced Night is authoritative.

Exact priority remains:

- intercept before lodging;
- class forced;
- priority 1000;
- voluntary menu suppressed;
- consumes Night.

## N1 — Palace daytime action done, then bound Night

Reload before Night:

- Palace daytime transaction remains committed;
- forced Night remains pending/required;
- Palace cannot substitute an optional Night.

## N2 — forced Night pending

Reload:

- exact forced-night flow resumes;
- no Palace Night choice can appear ahead of it;
- no Palace progression changes.

## N3 — forced Night completes

Next-day Secret Debt modifier remains exactly-once.

Reload must not duplicate Energy -1.

## N4 — Street + bound Night

D51 provenance pair remains:

- `lodging.street.energy-penalty`;
- `secret-debt.bound-night`.

Reload preserves queued/applied provenance without double application.

Compatibility floor belongs only to the pair.

Palace adds no floor.

---

# 19. StartDay -> Palace action ordering

On a bound day:

1. finish previous Night;
2. activate/update Secret Debt as current system requires;
3. resolve next-day modifiers;
4. apply D51 provenance compatibility;
5. apply independent later modifiers;
6. finalize current usable Energy;
7. only then evaluate/pay Palace duty/support Energy cost.

Reload between StartDay and Palace action must not:

- reapply start-day penalties;
- refund Palace cost;
- recalculate D51 from housing inference.

---

# 20. D48 presentation state and save

Presentation mapping is content, not save-state authority.

Reload must not infer gameplay state from:

- current Palace image;
- fallback asset;
- dedicated D48 asset presence.

If dedicated asset files are absent, neutral fallback remains valid without migration.

No save version changes due to D48.

---

# 21. D49 lore and save

Reveal facts/stages must remain tied to Palace progression, not arbitrary load history.

Duty 12 reload:

- may resume Crossroads milestone;
- must not name Threshold as canonical fact earlier than D49 permits.

Duty 15 reload:

- may resume Outcome Ready reveal;
- canonical Threshold naming remains valid.

Prince/Return Home reload must not invent the original displacement cause.

---

# 22. Malformed-save rejection matrix

Final assembled validation should reject at least:

- Palace duty count outside 0..15;
- `shifts` != Palace duty count;
- stage/count mismatch;
- duplicate/reordered/skipped committed duty IDs;
- future-dated daily locks;
- duplicate/unknown support IDs;
- prep beat 2 without beat 1;
- prep fact without completing support state;
- `palace.progression-complete` before duty 15;
- duplicate progression-complete fact;
- Prince quest stage inconsistent with pending confrontation phase;
- defeat fact with impossible quest state if invariant requires alignment;
- Steady Practice runtime without resolved reward;
- over-cap bound careers/protections;
- Formal Introduction runtime without resolved reward;
- duplicate/over-cap Formal Introduction relationships;
- ending result without transaction proof.

---

# 23. Required executable save/reload cases

Chat 2 post-assembly should prove at minimum:

1. D23 invitation pending reload;
2. access acceptance reload;
3. new-life access reset;
4. duty 1 committed reload;
5. duty 2 milestone pending reload;
6. duty 5/8/12 milestone reload;
7. duty 15 pending milestone reload;
8. no duty 16 after reload;
9. same-day second duty remains blocked after reload;
10. support beat 1 reload;
11. support beat 2/prep fact reload;
12. all three prep facts coexist after reload;
13. finalize pending reload;
14. multiple non-True eligibilities survive reload;
15. Prince unavailable at 11x91 + one 90;
16. Prince ready at exact 12x91;
17. confrontation phase 1/2/3/4 reload;
18. failure reset reload;
19. retry after failure;
20. defeat fact exactly once;
21. defeated/uncommitted Return Home reload;
22. committed Return Home reload before completeEnding;
23. Return Home completion transaction replay protection;
24. Service reward same-life inactive / next-life selectable;
25. Court reward same-life inactive / next-life selectable;
26. Inner Truth same-life inactive / next-life automatic;
27. Steady Practice counter reload;
28. Formal Introduction used-ID reload;
29. old schema6 missing D39 counters gets empty defaults;
30. profile merge does not auto-select imported Palace Specialist;
31. Palace access/progress survives Secret Debt binding;
32. forced Night remains ahead of Palace Night after reload;
33. D51 modifier reload exactly once;
34. Palace duty after StartDay spends from final Energy only.

---

# 24. Stop conditions

Stop Palace integration if any save/reload test shows:

- invitation duplicates;
- access becomes permanent across lives;
- duty Energy/wage/count replays;
- same-day locks clear on reload;
- support Energy replays;
- prep facts become exclusive;
- Outcome Ready disappears after reload;
- duty 16 reopens;
- Prince phase skips/rerolls;
- failure writes defeat;
- defeat auto-commits Return Home;
- committed ending grants reward before completeEnding;
- reward activates in earning life;
- current run snapshot mutates after reward grant;
- D39 counters reset on reload;
- ghost D39 runtime is accepted;
- Secret Debt bind clears Palace progress;
- Palace optional Night outranks forced Night;
- D51 penalty replays;
- schema6 is downgraded/forked.

---

# 25. Final save/reload contract

```text
D23:
  qualify at creation completion
  invitation/access run-local
  no retroactive migration unlock

Palace progression:
  duty/support transactions atomic
  daily locks persisted by day
  milestone scene may replay presentation only, never transaction

Outcome Ready:
  duty 15 serializes progression-complete once
  no duty 16

Prince:
  exact quest stage + pending phase persisted
  retry after fail/back-out
  defeat only on phase-4 success
  defeat never commits ending

Return Home:
  explicit commit
  completeEnding is permanent reward boundary

D39:
  grant exactly once
  same-life snapshot unchanged
  future-life activation only
  run counters reload-safe

Secret Debt:
  Palace progress survives binding
  forced Night remains absolute
  D51 remains provenance-owned
```

**v34 COMPLETE — CONTINUE TO v35**
