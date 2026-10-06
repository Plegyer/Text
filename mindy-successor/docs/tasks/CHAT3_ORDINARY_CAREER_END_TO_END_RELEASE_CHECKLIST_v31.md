# Chat 3 — Ordinary Career End-to-End Release Checklist v31

Status: **RESEARCH COMPLETE — BUNDLE TASK B COMPLETE**  
Owner: Chat 3  
Branch: `chat3/release-career-closure-bundle-v30`

## Purpose

This is the release checklist for all ten ordinary careers from a fresh life through:

```text
fresh creation
-> ordinary wage
-> shift progression
-> 50 completed ordinary shifts
-> Hard Work ending eligibility
-> explicit commit
-> completeEnding
-> permanent hardWork:<career> proof
-> future-life package selection
-> exactly-once package application
```

Authorities:

- v29 final selective assembly packet;
- v30 migration/reload matrix;
- D46 frozen producer `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`;
- D47 frozen producer `252dc26c514e24f4ab0f0cc0da7694254282e4c4`;
- accepted D40/D41 ordinary ending production already in current main;
- current D42 Night production already merged and exact-main green.

This is a release checklist only.

No production runtime changes are authorized here.

---

# 1. Shared release invariants for all ten careers

## Fresh creation

After D46 assembly, a genuinely fresh life begins with:

- money = **600**;
- base Energy = **3**;
- Lust = **5**;
- all 12 progression stats = **1** before allocation;
- no ordinary Hard Work package selected automatically.

Existing saves preserve stored Lust instead of being rewritten to 5.

## Ordinary shift wage

Only the ten exact ordinary shift actions use the D46 ordinary-wage seam.

Exact action IDs:

- `lumber.shift`
- `satyr-maid.shift`
- `undead-farm.shift`
- `tavern.shift`
- `hunter.shift`
- `guard.shift`
- `merchant.shift`
- `artist-geisha.shift`
- `assassin.shift`
- `prostitute.shift`

Rules:

- wage uses pre-shift stat inputs;
- ordinary wage cap = **120**;
- D31 seasonal processing remains after the committed ordinary wage;
- non-ordinary work does not enter this seam.

## Hard Work progression

For each exact ordinary career:

1. at 49 `completed_shifts`, Hard Work is not complete;
2. the next valid ordinary shift reaches exactly 50;
3. exact `ending.<career>.hard-work` becomes eligible;
4. eligibility does not end the run;
5. explicit ending commit is required;
6. explicit `completeEnding` is required;
7. exactly one `hardWork:<career>` permanent proof is applied;
8. `meta.hardWorkProgress` gains that career once;
9. repeating or reloading cannot duplicate the proof/transaction;
10. the package is not activated in the life that just earned it if creation was already complete;
11. it becomes selectable during a future character creation.

## Ending lifecycle

The D16 lifecycle remains authoritative:

```text
eligible
!= committed
!= completed
```

A 50th shift must never auto-commit or auto-complete a Hard Work ending.

## Package lifecycle

```text
earned permanent identity
-> optional future-life selection
-> finishCreation
-> effect applies exactly once
-> selected/applied identities frozen for that run
```

Ordinary packages consume no Keystone or Specialist slot.

---

# 2. Career release table

| Career | Shift action | D46 base | all-1 starter wage | Hard Work ending | D47 future package |
| --- | --- | ---: | ---: | --- | --- |
| Lumber | `lumber.shift` | 35 | 36 | `ending.lumber.hard-work` | Strength +5 |
| Satyr Maid | `satyr-maid.shift` | 37 | 38 | `ending.satyr-maid.hard-work` | Charm +5 |
| Undead Farm | `undead-farm.shift` | 37 | 38 | `ending.undead-farm.hard-work` | Magic +5 |
| Tavern | `tavern.shift` | 37 | 38 | `ending.tavern.hard-work` | Wits +5 |
| Hunter | `hunter.shift` | 37 | 38 | `ending.hunter.hard-work` | Dexterity +5 |
| Guard | `guard.shift` | 37 | 38 | `ending.guard.hard-work` | Endurance +5, Manners +5 |
| Merchant | `merchant.shift` | 37 | 38 | `ending.merchant.hard-work` | Reason +5, Sociability +5 |
| Artist/Geisha | `artist-geisha.shift` | 37 | 38 | `ending.artist-geisha.hard-work` | Creativity +5, Grooming +5 |
| Assassin | `assassin.shift` | 37 | 38 | `ending.assassin.hard-work` | Dexterity +5, Wits +5 |
| Prostitute | `prostitute.shift` | 37 | 38 | `ending.prostitute.hard-work` | Sexuality +5, Charm +5, separate Lust +5 |

---

# 3. Lumber release checklist

## Fresh / wage

- [ ] fresh money 600;
- [ ] fresh Energy 3;
- [ ] fresh Lust 5;
- [ ] `lumber.shift` authored wage base 35;
- [ ] Strength 1 + Endurance 1 starter wage resolves to 36;
- [ ] pre-shift inputs are used;
- [ ] final ordinary wage never exceeds 120.

## Progression / ending

- [ ] 49 shifts: no Hard Work completion;
- [ ] 50th valid `lumber.shift`: completed_shifts becomes exactly 50;
- [ ] `ending.lumber.hard-work` becomes eligible;
- [ ] run stays active;
- [ ] explicit commit required;
- [ ] explicit completeEnding required;
- [ ] one `hardWork:lumber` proof;
- [ ] `meta.hardWorkProgress` includes `lumber` once.

## Future package

- [ ] package remains inactive in the already-created earning life;
- [ ] future creation may select Lumber package;
- [ ] finishCreation applies Strength +5 once;
- [ ] reload does not reapply.

## Lumber-specific firewalls

50 Hard Work shifts must not synthesize:

- `ending.lumber.forewoman`;
- `ending.lumber.forest`;
- management/school facts belonging to those routes;
- historical `lumber-stay`;
- historical `vitality`.

Historical `lumber-stay` must not synthesize modern Lumber Hard Work either.

---

# 4. Satyr Maid release checklist

## Fresh / wage

- [ ] `satyr-maid.shift` base 37;
- [ ] all-1 starter wage 38;
- [ ] existing Charm 0.35 + Sexuality 0.25 weights preserved;
- [ ] wage cap 120.

## Progression / ending

- [ ] 49 -> not complete;
- [ ] 50th shift -> exact completed_shifts 50;
- [ ] `ending.satyr-maid.hard-work` eligible only;
- [ ] explicit commit;
- [ ] explicit completeEnding;
- [ ] exactly one `hardWork:satyr-maid`;
- [ ] permanent ledger deduped.

## Future package

- [ ] exact D47 mapping is **Charm +5**;
- [ ] old Grooming +5 mapping is absent;
- [ ] effect applies only in a future selected creation;
- [ ] current-run reload never reapplies.

---

# 5. Undead Farm release checklist

## Fresh / wage

- [ ] `undead-farm.shift` base 37;
- [ ] starter wage 38;
- [ ] Endurance 0.3 + Magic 0.3 + Reason 0.2 weights preserved;
- [ ] cap 120.

## Progression / ending

- [ ] threshold is 50 completed ordinary shifts;
- [ ] `ending.undead-farm.hard-work` eligibility is non-terminal;
- [ ] commit/complete are explicit;
- [ ] exactly one `hardWork:undead-farm`;
- [ ] no advanced-route identity is fabricated by Hard Work.

## Future package

- [ ] exact mapping **Magic +5**;
- [ ] no auto-application on earning;
- [ ] future selected creation applies once;
- [ ] reload stable.

---

# 6. Tavern release checklist

## Fresh / wage

- [ ] `tavern.shift` base 37;
- [ ] starter wage 38;
- [ ] Charm 0.3 + Wits 0.3 + Manners 0.2 weights preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50th shift makes only `ending.tavern.hard-work` Hard Work-eligible;
- [ ] explicit commit/complete required;
- [ ] one `hardWork:tavern`;
- [ ] no advanced Tavern route is substituted.

## Future package

- [ ] exact D47 mapping **Wits +5**;
- [ ] retired Sociability +5 mapping is absent;
- [ ] exactly-once future application.

## D41 identity firewall

Hard Work must remain distinct from:

- `ending.tavern.innkeeper`;
- `ending.tavern.information-broker`;
- `ending.tavern.sanctuary`.

---

# 7. Hunter release checklist

## Fresh / wage

- [ ] `hunter.shift` base 37;
- [ ] starter wage 38;
- [ ] Dexterity 0.35 + Endurance 0.3 + Wits 0.2 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 49 -> no completion;
- [ ] 50 -> `ending.hunter.hard-work` eligible;
- [ ] no auto-terminal transition;
- [ ] explicit commit/complete;
- [ ] one `hardWork:hunter`.

## Future package

- [ ] exact mapping **Dexterity +5**;
- [ ] future selection only;
- [ ] one application.

## D41 identity firewall

Hard Work stays distinct from:

- `ending.hunter.master-hunter`;
- `ending.hunter.warden`;
- `ending.hunter.legend`.

---

# 8. Guard release checklist

## Fresh / wage

- [ ] `guard.shift` base 37;
- [ ] starter wage 38;
- [ ] Endurance 0.3 + Manners 0.25 + Strength 0.2 + Reason 0.15 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50 shifts -> `ending.guard.hard-work` eligibility;
- [ ] explicit commit/complete;
- [ ] one `hardWork:guard`.

## Future package

- [ ] exact atomic package is **Endurance +5 + Manners +5**;
- [ ] both components clip at the active D24 cap;
- [ ] the package remains one career identity for D23;
- [ ] reload cannot produce +10/+10 through replay.

## D40 identity firewall

Hard Work remains distinct from:

- `ending.guard.officer`;
- `ending.guard.reform`;
- `ending.guard.network`;
- `ending.guard.major-case`.

---

# 9. Merchant release checklist

## Fresh / wage

- [ ] `merchant.shift` base 37;
- [ ] starter wage 38;
- [ ] Wits 0.35 + Charm 0.25 + Manners 0.2 + Reason 0.15 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50 -> `ending.merchant.hard-work` eligible;
- [ ] explicit commit/complete;
- [ ] one `hardWork:merchant`.

## Future package

- [ ] exact package **Reason +5 + Sociability +5**;
- [ ] retired Wits +5 + Reason +5 mapping absent;
- [ ] starting money remains **600** whether Merchant is earned, selected or applied;
- [ ] no retired Merchant +600 direction returns.

## D40 identity firewall

Hard Work remains distinct from:

- `ending.merchant.house`;
- `ending.merchant.speculator-smuggler`;
- `ending.merchant.patron-of-routes`.

---

# 10. Artist/Geisha release checklist

## Fresh / wage

- [ ] `artist-geisha.shift` base 37;
- [ ] starter wage 38;
- [ ] Manners 0.3 + Charm 0.3 + Sexuality 0.15 + Dexterity 0.15 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50 -> `ending.artist-geisha.hard-work` eligible;
- [ ] explicit commit/complete;
- [ ] one `hardWork:artist-geisha`.

## Future package

- [ ] exact atomic package **Creativity +5 + Grooming +5**;
- [ ] one package identity, two stat components;
- [ ] apply once after explicit future selection.

## D40 identity firewall

Hard Work remains distinct from:

- `ending.artist-geisha.master-artist`;
- `ending.artist-geisha.patron-network`;
- `ending.artist-geisha.court-invitation`.

---

# 11. Assassin release checklist

## Fresh / wage

- [ ] `assassin.shift` base 37;
- [ ] starter wage 38;
- [ ] Dexterity 0.35 + Wits 0.3 + Reason 0.2 + Manners 0.1 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50 -> `ending.assassin.hard-work` eligible;
- [ ] explicit commit/complete;
- [ ] one `hardWork:assassin`.

## Future package

- [ ] exact package **Dexterity +5 + Wits +5**;
- [ ] apply atomically once;
- [ ] Strong Meta Assassin Specialist rewards remain separate ownership/selection.

## D40 identity firewall

Hard Work remains distinct from:

- `ending.assassin.ghost`;
- `ending.assassin.handler-takeover`;
- `ending.assassin.refusal-turncoat`.

---

# 12. Prostitute release checklist

## Fresh / wage

- [ ] `prostitute.shift` base 37;
- [ ] starter wage 38;
- [ ] Sexuality 0.35 + Charm 0.3 + Manners 0.2 + Endurance 0.15 preserved;
- [ ] cap 120.

## Progression / ending

- [ ] 50 -> `ending.prostitute.hard-work` eligible;
- [ ] explicit commit/complete;
- [ ] one `hardWork:prostitute`.

## Future package

Exact atomic package:

- Sexuality +5;
- Charm +5;
- separate Lust +5.

Required fresh D46 interaction:

```text
fresh Lust 5
-> selected Prostitute package
-> finishCreation
-> Lust 10
```

- [ ] retired +3 Lust value absent;
- [ ] reload leaves Lust 10, never 15;
- [ ] package remains one D23 identity despite two progression components plus Lust.

## D40 identity firewall

Hard Work remains distinct from:

- `ending.prostitute.independent-house`;
- `ending.prostitute.elite-clientele`;
- `ending.prostitute.network-protection`.

---

# 13. Global D47 package acceptance checklist

Across all ten:

- [ ] exactly ten career package identities;
- [ ] first five packages have one progression-stat +5 component;
- [ ] later five have two progression-stat +5 components;
- [ ] total progression-stat package points = **75**;
- [ ] all 12 progression stats appear across the map;
- [ ] only Prostitute has separate Lust bonus;
- [ ] separate Lust bonus = +5;
- [ ] arbitrary earned subset selectable;
- [ ] package is atomic selectable unit;
- [ ] no one-package capacity;
- [ ] no Strong Meta slot usage;
- [ ] no automatic effect from permanent ownership;
- [ ] package effects clip at current D24 cap;
- [ ] no package reapplication after reload.

---

# 14. D42 Night isolation checklist

D42 is already merged into current main and must survive the later D46/D47/legacy assembly.

For every ordinary career:

- [ ] D42 authored Night content remains present;
- [ ] wage edits do not delete or rename D42 event identities;
- [ ] Hard Work threshold logic does not consume or substitute Night content;
- [ ] package application does not unlock/resolve Night routes automatically;
- [ ] D47 stat changes influence later gameplay only through ordinary stat values, not through hidden event rewrites;
- [ ] legacy lumber retirement does not remove unrelated D42 localization/presentation/UI rows.

Required cross-file rule:

Because D42 and legacy retirement both touch current definitions/localization/presentation/UI surfaces, legacy retirement must be key-level/manual composition onto current main.

Never wholesale-copy historical v17 versions over D42.

---

# 15. Secret Debt isolation checklist

Future Secret Debt v12 + D51 assembly remains independent from ordinary Hard Work mechanics.

While bound:

- [ ] all ten ordinary careers are unavailable under the Secret Debt career lock;
- [ ] existing ordinary shift counts/progress are preserved;
- [ ] no hidden work is counted as ordinary `completed_shifts`;
- [ ] Secret Debt hidden work costs 1 Energy;
- [ ] hidden-work wage is not routed through D46 ordinary wage cap;
- [ ] hidden work never earns any `hardWork:<career>` identity;
- [ ] `secret-debt` cannot fill a missing D23 ordinary package identity.

Night:

- [ ] Secret Debt forced Night wins over voluntary D42 ordinary Night;
- [ ] forced Night next-day Energy -1 remains;
- [ ] D51 bound+Street compatibility remains provenance-gated;
- [ ] no D46/D47 behavior creates a global Energy floor.

After Secret Debt exits:

- [ ] ordinary careers resume under normal current-main rules;
- [ ] preserved ordinary shift progress remains intact;
- [ ] no shift duplication/replay.

---

# 16. Palace D23 isolation checklist

Palace qualification remains:

```text
permanent ordinary Hard Work identities 10/10
AND
active ordinary package identities in this creation 10/10
```

Required:

- [ ] 9 earned + 10 selected cannot qualify;
- [ ] 10 earned + 9 active cannot qualify;
- [ ] 10 earned + 10 active qualifies;
- [ ] package components are not counted individually;
- [ ] Prostitute Lust component is not an 11th/extra identity;
- [ ] historical lumber-stay/vitality is not Lumber Hard Work;
- [ ] Secret Debt is not an ordinary career package;
- [ ] Strong Meta ownership cannot fill a missing career;
- [ ] Activity/D38 cannot fill a missing career.

Creation order remains:

```text
Strong Meta snapshot/cap
-> Hard Work package application
-> creation complete
-> Palace D23 qualification
```

Palace must see the final active package identity snapshot.

---

# 17. D24 cap isolation checklist

D24 progression stat cap behavior remains independent from the +5 amount.

At cap 100:

- a +5 component clips to 100.

At cap 200:

- a +5 component clips to 200.

Required:

- [ ] D47 never changes +5 into another bonus because cap is 200;
- [ ] package values are not multiplied;
- [ ] Palace True Ending remains raw all-12 progression stats >=91;
- [ ] Lust is not one of the 12 Palace True-ending progression stats.

---

# 18. Strong Meta isolation checklist

Ordinary Hard Work packages:

- [ ] do not enter `meta.strongMeta.ownership.ownedRewardIds`;
- [ ] consume no Keystone slot;
- [ ] consume no Specialist slot;
- [ ] do not create an Activity-only or Hard-Work-only bonus slot;
- [ ] do not rewrite the frozen current-run Strong Meta snapshot.

Strong Meta can affect effective cap/start-day economy under its own rules.

Hard Work package application consumes that already-resolved effective cap but remains a separate subsystem.

---

# 19. Canonical ending-surface release checklist

Required ordinary structure:

```text
10 Hard Work endings
+ 30 D40/D41 advanced endings
= 40 canonical ordinary-career endings
```

After legacy retirement:

- [ ] live `lumber-stay` absent;
- [ ] historical `lumber-stay` allowed only as compatibility identity;
- [ ] Lumber live ordinary endings remain:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`
- [ ] total observed live ending catalog becomes 42 after retiring one ending from current 43;
- [ ] `guild-life` / `scholar-life` remain outside ordinary 40.

---

# 20. Save/reload checkpoints for every career

For each of the ten careers, run equivalent checks at:

1. 49 completed shifts;
2. immediately after 50th shift / eligibility;
3. after explicit commit;
4. after completeEnding / RunResult transaction;
5. after permanent `hardWorkProgress` update;
6. after restart/new life before package selection;
7. after selecting package before finishCreation;
8. after finishCreation;
9. after one reload;
10. after a second reload.

Required invariants:

- shift count never rolls back/duplicates;
- eligibility never becomes auto-completion;
- result transaction is exactly-once;
- permanent career identity dedupes;
- selection is future-life only;
- package applies exactly once;
- current-run active selection remains frozen after creation.

---

# 21. Focused release test bundle

Future Chat 2 integration should include at least:

```text
npm run typecheck
npm run validate
npm run build
```

D46 / ordinary progression:

```text
tests/economy-start-balance-v14.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/lumber-hard-work-invariant.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

D47 / package lifecycle:

```text
tests/hard-work-bonus-mapping-v13.test.ts
tests/hard-work-package-catalog-runtime.test.ts
tests/hard-work-meta-infra-prep.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/hard-work-newstart-presentation-v2.test.ts
tests/hard-work-newstart-ui-v2.test.ts
tests/ending-meta.test.ts
```

Legacy retirement:

```text
tests/lumber-stay-retirement-v17.test.ts
tests/migration.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-ending-parity-v9.test.ts
```

Isolation:

```text
tests/night-content-gap-v10.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
```

If current-main filenames have been superseded, run the authoritative replacement tests for the same domains.

---

# 22. Release stop conditions

Do not call the ordinary-career release path ready if any career exhibits:

- wrong wage base;
- wrong starter wage;
- wage above 120 through the ordinary seam;
- 49 shifts completing Hard Work;
- 50th shift auto-ending the run;
- missing explicit commit;
- duplicate completeEnding result;
- duplicate `hardWork:<career>`;
- package auto-activation in earning life;
- wrong D47 package mapping;
- reload reapplication;
- Strong Meta slot consumption;
- historical lumber evidence becoming modern Hard Work;
- D42 Night deletion/regression;
- Secret Debt hidden work counted as ordinary career work;
- Palace D23 counting components instead of ten identities;
- canonical ordinary ending count not equal to 40.

---

# 23. Final end-to-end release contract

Every ordinary career must satisfy the same skeleton:

```text
fresh life
  money 600
  Energy 3
  Lust 5

ordinary shift
  exact authored career action
  D46 base 35/37
  pre-shift weighted wage
  cap 120

progress
  49 != complete
  50 => hard-work ending eligible

ending
  explicit commit
  explicit completeEnding
  one transaction
  one hardWork:<career> permanent identity

same life
  no package auto-activation

future life
  package optionally selected
  package applies exactly once at finishCreation
  active package identity frozen for run

cross-system
  D42 intact
  Secret Debt isolated
  D23 counts ten career identities
  D24 only clips values
  Strong Meta slots untouched
```

**BUNDLE TASK B COMPLETE — CONTINUE TO v32**
