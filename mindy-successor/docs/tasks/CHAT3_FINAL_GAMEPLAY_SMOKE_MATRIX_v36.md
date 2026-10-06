# Chat 3 — Final Gameplay Smoke Matrix v36

Status: **RESEARCH COMPLETE — BUNDLE TASK A COMPLETE**  
Owner: Chat 3  
Branch: `chat3/final-gameplay-release-smoke-bundle-v36`

## Purpose

Compact end-to-end player journey matrix for the final intended 1.0 target.

This packet exercises the player-facing chain across:

- fresh start / New Start+;
- ordinary careers;
- School;
- Night;
- Secret Debt;
- Activity + Camp;
- Palace;
- Hard Work ending;
- advanced ordinary ending;
- save/reload boundaries;
- explicit ending commitment/completion.

This is a research/smoke specification only.

No production runtime changes are made here.

No full CI is run here.

---

# 1. Final-target source anchors

Core/current systems:

- current production main observed during this bundle:
  `main@37cda3b92c2228e0388c4ce6da47b36e1d52e543`
- D42 Night:
  `chat4/night-content-gap-producer-v10@9305d1da055203c51137041a78a345cbc64339c0`
- School production baseline:
  `chat5/school-production-v11@7797ce79b21c9c3580881349db19fdc6ad542c33`
- D40/D41 advanced endings: already merged into current production lineage.

Queued/frozen systems:

- Secret Debt v12:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- Activity regions through v15:
  `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- Camp accepted executable-green runtime anchor:
  `chat4/activity-camp-baseline-repair-v19@efde0a38bf71a8946194402a9fc47abb168f2aff`
- D38 mechanics:
  `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 content:
  `chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`
- D38 reward runtime:
  `chat3/activity-d38-reward-producer-v26@7770b6bf7f930e8af17331e8b22613523bb2e768`
- D38 authored tags:
  `chat3/activity-d38-authored-tag-mapping-v27@3ab2800a7d586b5e37600c3ff11d1129ff823df0`
- Palace v18:
  `67f948d185883d8e706dad522e5010bff8e2bd48`
- Palace v19:
  `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`
- Palace D39:
  `b5ab23a88ee0e18c6250251de15818ff799ff3f6`
- D46:
  `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47:
  `252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber-stay retirement:
  `52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

---

# 2. Shared smoke invariants

Final target must preserve:

- life horizon = 160 days;
- 12 progression stats + separate Lust;
- ten ordinary careers;
- ordinary Hard Work = exactly 50 completed same-career shifts;
- ending eligibility is non-terminal;
- only one ending may be committed per life;
- permanent reward applies at central completion transaction, not eligibility;
- New Start+ Strong Meta = 0..1 Keystone + 0..2 Specialists;
- ordinary Hard Work packages are outside those slots;
- base Energy = 3;
- starting money = 600;
- fresh Lust = 5 after D46;
- existing save Lust is preserved;
- School Body Confidence paid lesson gives Lust +2;
- Secret Debt forced Night has absolute priority;
- Activity entry cost = 2 Energy;
- Activity Field Time = 6;
- Activity has no universal XP;
- Camp max = 2 field nights / entry;
- Palace remains run-local;
- Palace True gate = all 12 progression stats >=91, Lust excluded;
- Return Home remains separate explicit ending commit.

---

# 3. Journey matrix

| Step | Normal path | Edge path | Save/reload assertion | Release evidence |
| --- | --- | --- | --- | --- |
| Fresh creation | money 600, Energy 3, Lust 5, stats baseline 1 | existing migrated character keeps stored Lust; historical Meta does not rewrite run state | reload before finishCreation preserves allocations/selections without applying twice | D46 + migration + Strong Meta tests |
| New Start+ selection | choose any earned Hard Work package subset, <=1 Keystone, <=2 Specialists | choose none; reject unowned reward; reject third Specialist | pre-finish selections persist; post-finish snapshot immutable | hard-work package + Strong Meta tests |
| Ordinary career | legal shift consumes normal work cadence and updates exact career progress | same-career second shift/day blocked under D26; Secret-Debt-bound ordinary job unavailable | shift/progression save reload without duplicate effects | ordinary career / D40/D41 tests |
| School | paid lesson applies authored tuition/gain package; Body Confidence +2 Lust | Night Study competes for Night; paid-only gates do not count Night Study where explicitly required | School track counters/lesson results reload exactly | School production tests |
| Voluntary Night | player chooses available professional/personal/private-space Night | forced Secret Debt Night suppresses menu; housing only gates authored private branches | pending Night reload does not repeat calendar advance/effects | night-flow + D42 tests |
| Secret Debt discovery | eligible Street night may expose one-time lender encounter | decline remains decline; acceptance schedules exact trap | pending encounter/trap state reload-safe | Secret Debt v12 |
| Bound Secret Debt | ordinary careers locked; School/Activity still available; hidden work costs 1 Energy | forced Night every bound night; Street + bound pair uses D51 provenance rule only | debt/hidden shifts/forced-night next-day effects do not duplicate | v12 + D51 |
| Activity entry | pay 2 Energy once, enter one of four regions, receive 6 Field Time | reload after entry does not repay Energy; bound character may enter | Activity state persists; entry cost not replayed | Activity region/reload tests |
| Activity Camp | explicit multi-day objective may Camp, refresh Field Time, max two nights | forced Secret Debt Night preempts Camp; same-day Activity cannot yield duplicate city day | Camp persisted state/calendar exactly once | Camp v19 tests |
| Activity result | secure/escape/fail under region rules | secured D38 Archive result persists only where tagged; no generic result fabrication | carried/secured result state reload-safe | D38 v26/v27 + region tests |
| Palace entry | 10/10 permanent Hard Work + 10/10 active packages -> Day-1 invitation -> explicit accept | 10+9 or 9+10 fails; no permanent Palace unlock | invitation pending/acceptance reload-safe; new life clears access | D23 tests / v34 |
| Palace duty | one structural duty/day, cost 1 Energy, wage 35..55, max 15 | extra Energy never buys second duty; no duty 16 | milestone pending reload cannot replay wage/Energy/count | Palace v15/v34 |
| Palace support | one support/prep/day, 1 Energy, pay 0 | prep routes may coexist; support after duty15 does not reopen duty count | route prep facts persist without duplication | Palace v15/v34 |
| Outcome Ready | duty15 writes progression complete once | reload during milestone cannot remove readiness/reopen duty progression | exact stage/count/fact survive | Palace v15/v34 |
| Prince | exact 12x91 + Outcome Ready -> deterministic four-phase confrontation | one stat 90 fails; Lust irrelevant; failure/back-out returns ready | exact phase survives reload; defeat fact phase4 only | Palace v18/v34 |
| Hard Work ending | shift50 -> eligible, keep playing -> explicit commit -> completeEnding | shift49 not eligible; eligibility grants nothing | committed state reloads; completion reward exactly once | ordinary-hard-work-lifecycle-parity |
| Advanced ending | authored route becomes eligible; overlapping endings may coexist | missing exact route/school/night/activity fact prevents only that route | selected route facts and eligibility persist | D40/D41 tests |
| Secret Debt ending | Paid Freedom / Bound Life / Takeover become eligible through exact route state | stale Bound Life cannot commit after repayment/Takeover | central transaction exactly once | secret-debt-full-route-v12 |
| Activity ending | Pathfinder / Preservation / Network eligibility after accepted D38 facts | 2/4 anchors insufficient; no Palace/Hard Work substitute | explicit commit/completion central lifecycle | activity-ending-family-v16 |
| Palace ending | 3 non-True routes or Return Home eligible under exact gates | Prince defeat does not auto-commit Return Home | ending commit/result/reward replay-safe | Palace v18/v20/v34 |
| New life after ending | permanent reward/knowledge retained, run domains reset | reward earned this life not active retroactively | next-life snapshot resolves from permanent Meta once | ending-meta / Strong Meta |

---

# 4. Fresh-start smoke

## Normal

1. create fresh save;
2. verify money 600;
3. verify Energy max/current basis 3 before independent modifiers;
4. verify Lust 5 after D46;
5. verify all progression stats 1 before allocations/packages;
6. select legal New Start+ options;
7. finish creation;
8. verify packages apply exactly once.

## Edge

- old save with Lust 17 stays 17;
- old completed creation does not receive newly remapped D47 packages;
- unowned Specialist cannot be selected;
- third Specialist rejected;
- current-run Strong Meta snapshot cannot change after creation;
- hard-work package earning later in the life does not activate mid-run.

## Reload

Check both:

- before creation completion;
- immediately after completion.

No selection or package effect may replay.

---

# 5. Ordinary-career smoke

Use at least one early/simple and one advanced-content career.

Recommended:

- Lumber;
- Guard or Merchant;
- Prostitute for separate Lust-package boundary.

## Normal

- first valid shift commits once;
- career counters/stage/facts advance;
- D31 seasonal package applies if relevant;
- ordinary wage uses final D46 formula once assembled;
- same career can continue across days;
- 50th completed shift exposes Hard Work ending.

## Edge

- second same-career shift on same day blocked;
- unrelated career may remain available if rules allow;
- Secret-Debt-bound state blocks all ten ordinary careers;
- Palace duty is not an ordinary shift;
- Secret Debt hidden work is not an ordinary shift;
- Activity is not an ordinary shift.

## Reload

Save at:

- one shift before milestone;
- immediately after milestone;
- shift49;
- after shift50 eligibility.

No counter/stage/seasonal effect duplication.

---

# 6. School smoke

## Normal

- paid lesson spends exact tuition;
- authored stat gain commits;
- Body Confidence paid lesson adds Lust +2;
- School-owned readiness publishers fire at accepted thresholds;
- School may contribute to an advanced ordinary route.

## Edge

- Night Study is not paid lesson where gate explicitly requires paid lessons;
- Secret Debt Takeover's ten-lesson requirement counts paid lessons only;
- School does not directly grant ending commit;
- School does not bypass career access or Palace D23.

## Reload

Save:

- before lesson;
- after transaction but before reaction scene;
- after readiness publication.

The lesson must not repay, repeat gains, or republish duplicate facts.

---

# 7. Night smoke

## Normal

- end daytime;
- select lodging;
- choose legal voluntary Night;
- resolve once;
- advance calendar exactly once.

## Edge

- normal/cheap Street housing semantics remain distinct;
- private-space branch only where authored;
- School Night Study remains a competing Night use;
- Secret Debt forced Night suppresses voluntary menu;
- ordinary Prostitute Night never inherits forced-route semantics;
- Activity Camp uses Activity/Night handoff instead of a second global Night.

## Reload

Test:

- before lodging;
- pending voluntary scene;
- forced Night pending;
- after Night before next-day action.

No duplicate calendar advance or next-day modifier.

---

# 8. Secret Debt smoke

## Normal lender/bound path

1. Street eligibility;
2. one-time lender encounter;
3. accept +2000;
4. exact trap-day transition;
5. debt becomes 20000;
6. ordinary careers lock;
7. School/Activity remain legal;
8. hidden work progresses;
9. forced Night occurs every bound night.

## Edge

- decline does not bind;
- encounter does not repeat after resolved;
- hidden-work wage uses D44 formula/cap140, not D46 ordinary cap120;
- hidden work does not count ordinary Hard Work;
- full repayment only;
- Takeover requires exact D44 thresholds + 10 paid lessons;
- threshold satisfaction never auto-commits ending.

## D51

Street -1 + bound-night -1 pair:

- compatibility floor 2 for that exact pair;
- unrelated later -1 may still yield 1;
- no global floor.

## Reload

At lender, trap, bound start, hidden shift, forced Night, repayment and Takeover transition.

No duplicate grant/debt/shift/penalty.

---

# 9. Activity + Camp smoke

## Normal

1. prepare in city;
2. enter region;
3. pay 2 Energy once;
4. start 6 Field Time;
5. resolve region mini-game/encounter;
6. obtain typed result/contact/anchor;
7. exit or continue.

## Camp

- only authored multi-day objective;
- max two camp nights/entry;
- advances calendar once per Camp;
- refreshes Field Time;
- does not refresh daily Energy;
- no city lodging charge for Camp night.

## Edge

- reload immediately after entry does not charge second 2 Energy;
- no universal Activity XP;
- Activity never substitutes Palace;
- bound character may enter;
- forced Secret Debt Night preempts attempted Camp boundary;
- same-day return cannot yield duplicate full city day.

## Reload

Test:

- entry;
- option before/after commit;
- result/carry state;
- Camp pending/completed;
- escape/failure;
- return to city.

---

# 10. Palace smoke

## Entry

- permanent Hard Work 10/10;
- active package identities 10/10;
- Day-1 deterministic invitation;
- explicit acceptance;
- run-local access.

## Duties

- 15 exact structural duties;
- one/day;
- 1 Energy;
- finite wage;
- no routine stat/Lust package;
- max one support/day.

## Route

- all three non-True prep facts may coexist;
- Outcome Ready at duty15;
- three non-True final-ready facts may coexist;
- explicit ending commit chooses one.

## Prince

- exact 12x91;
- Lust excluded;
- no hidden School/Activity/item/relationship/romance gate;
- four deterministic phases;
- failure/back-out retry;
- success writes defeat only;
- Return Home remains uncommitted.

## Known release wiring blockers from v33

Before Palace release:

- Formal Introduction needs at least one accepted live authored ordinary-professional consumer;
- Source Method needs at least one accepted live authored information-only consumer.

These are not optional smoke assertions.

---

# 11. Hard Work ending smoke

For every ordinary career:

```text
49 shifts
-> not eligible

50th shift
-> eligible
-> run still active
-> permanent Meta unchanged

explicit commitEnding
-> ending_committed
-> permanent Meta unchanged

completeEnding
-> ended
-> RunResult
-> hardWork:<career> once
```

Edge:

- eligibility may overlap advanced endings;
- a later commit to one ending prevents committing another;
- completion repeated after ended state is idempotent.

Reload:

- after eligibility;
- after commit;
- after completion.

---

# 12. Advanced ordinary ending smoke

Coverage target:

- at least one D41 route with Night/relationship dependency;
- at least one D41 Activity-linked route;
- at least one D40 route with School publisher;
- at least one D40 Strong Meta reward route.

Normal:

- exact selected-route facts/conditions satisfy eligibility;
- eligibility remains non-terminal;
- commit explicitly chooses one;
- permanent reward only at completion.

Edge:

- multiple compatible endings coexist before commit;
- missing one mandatory authored fact blocks only that route;
- romance is never silently mandatory;
- Activity-required advanced route remains distinct from D38 standalone ending.

Reload:

- selected-route fact;
- eligible list;
- committed ending;
- RunResult transaction.

---

# 13. Explicit ending completion smoke

Universal final smoke:

1. make two endings eligible where possible;
2. verify status still `active`;
3. save/reload;
4. choose one explicit commit;
5. verify second commit is rejected;
6. save/reload committed state;
7. resolve ending-committed final scene if present;
8. call central `completeEnding`;
9. verify:
   - status ended;
   - one RunResult;
   - one transaction ID;
   - permanent reward(s) exactly once;
10. save/reload ended state;
11. call completion path again;
12. verify no state change.

The compatibility `accept` command for legacy endings is acceptable only because it routes through:

`commitEndingMutable -> completeEndingMutable`

and therefore uses the same one-ending/transaction guards.

---

# 14. Required focused final-smoke roster

At minimum after full production assembly:

```text
npm run typecheck
npm run validate
npm run build
```

Then representative executable smoke:

```text
tests/ending-meta.test.ts
tests/migration.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts

tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/d40-advanced-endings-tranche-b-v11.test.ts

tests/school-production-v11-firewall.test.ts
tests/school-production-v11-locale-save.test.ts
tests/school-body-confidence-lust-d20.test.ts
tests/school-night-study-adapter.test.ts

tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts

tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts

tests/activity.test.ts
tests/qa-activity-option-reload.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-d38-strong-meta-v26.test.ts

tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-d39-reward-producer-v20.test.ts
```

Use actual authoritative renamed replacements if assembly branches supersede a filename.

---

# 15. Final smoke stop conditions

Stop release closure if any of these is observed:

- fresh defaults wrong;
- existing save Lust rewritten;
- package/Strong Meta applied twice;
- ordinary same-career cadence bypassed;
- School paid/Night Study semantics conflated;
- Night advances calendar twice;
- forced Night loses priority;
- Secret Debt hidden work counts ordinary Hard Work;
- D51 becomes global floor;
- Activity entry cost replays;
- Camp refreshes Energy or suppresses forced Night;
- Palace access becomes permanent;
- Palace duty/support transaction replays;
- Prince success auto-commits Return Home;
- ending eligibility auto-ends a life;
- reward appears at eligibility/commit before completion;
- more than one ending commits;
- completion replay duplicates reward/transaction;
- v33 Palace D39 consumers remain absent.

---

# 16. Final disposition

The intended 1.0 player journey is smoke-testable as one connected lifecycle without adding a new global subsystem.

The release gate should test:

```text
create
-> play
-> cross systems
-> save/reload
-> become ending-eligible
-> continue play
-> explicitly commit
-> complete once
-> inherit only on later life
```

**v36 COMPLETE — CONTINUE TO v37**
