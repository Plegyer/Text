# Chat 4 — D46 + D47 + Legacy Preassembly Acceptance v35

Status: **PREASSEMBLY ACCEPTED — READY FOR CHAT 2 SELECTIVE ASSEMBLY**  
Owner: Chat 4  
Branch: `chat4/career-preassembly-acceptance-bundle-v35`

## Purpose

This packet closes the acceptance layer for the ordinary-career release tranche:

- D46 economy/start balance;
- D47 ordinary Hard Work future-life package mapping;
- retirement of live `lumber-stay` with conservative historical `vitality` compatibility.

It combines the accepted producer sources, Chat 4 exact-head QA v29-v31, and Chat 3 planning/release audits v29-v32.

This is a selective-assembly handoff. It is not permission to copy historical shared files wholesale and it is not a full-CI result.

## Exact accepted source identities

### D46 economy / start balance

Producer:

`chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`

Exact-head QA:

`CHAT4_D46_ECONOMY_EXACT_HEAD_QA_v29.md`

QA branch:

`chat4/career-producers-exact-head-qa-bundle-v29@503eb2fadc72bc4dfe75d6d2da59d21efa7ca2d8`

Executable evidence:

- workflow run `37462590879`;
- job `112265598705`;
- exact SHA guard PASS;
- `npm ci` PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- focused **59/59 PASS**.

Accepted D46 semantics:

- genuinely fresh Lust = **5**;
- existing/migrated stored Lust is preserved;
- starting money remains **600**;
- base Energy remains **3**;
- Lumber ordinary wage base = **35**;
- the other nine ordinary wage bases = **37**;
- existing wage weights are preserved;
- ordinary final wage cap = **120**;
- the cap applies only to the ten ordinary `<career>.shift` identities;
- wage is computed from pre-shift inputs before existing seasonal effects;
- non-ordinary wage paths remain outside this seam.

### D47 Hard Work package mapping

Producer:

`chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`

Exact-head QA:

`CHAT4_D47_HARD_WORK_EXACT_HEAD_QA_v30.md`

Executable evidence:

- workflow run `37462886959`;
- job `112266586737`;
- exact SHA guard PASS;
- `npm ci` PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- focused **103/103 PASS**.

Accepted exact package map:

- Lumber -> Strength +5;
- Satyr Maid -> Charm +5;
- Undead Farm -> Magic +5;
- Tavern -> Wits +5;
- Hunter -> Dexterity +5;
- Guard -> Endurance +5, Manners +5;
- Merchant -> Reason +5, Sociability +5;
- Artist/Geisha -> Creativity +5, Grooming +5;
- Assassin -> Dexterity +5, Wits +5;
- Prostitute -> Sexuality +5, Charm +5, separate Lust +5.

Package identity remains the profession package. Arbitrary earned subsets are selectable; packages consume no Strong Meta slot; package effects apply atomically exactly once at `finishCreation`; current-run package selection is frozen after creation; newly earned Hard Work in the same life is future-life only.

### Lumber-stay retirement / historical compatibility

Accepted producer handoff:

`chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

Verified executable implementation:

`39912e7435c3707d98f96fe550d697c20ac0bedb`

The handoff head is one documentation commit after the verified implementation and does not change runtime/content behavior.

Exact-head QA:

`CHAT4_LUMBER_RETIREMENT_EXACT_HEAD_QA_v31.md`

Executable evidence:

- workflow run `37463168157`;
- job `112267534042`;
- exact implementation SHA guard PASS;
- `npm ci` PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- retirement suite 9/9 PASS;
- ending/migration adjacency 31/31 PASS;
- presentation/reload group 15/15 PASS;
- isolation group 20/20 PASS.

Accepted retirement semantics:

- live `lumber-stay` is removed from new play;
- no new `vitality` acquisition exists;
- the canonical ordinary-career surface remains exactly **40** endings;
- historical `lumber-stay` completion and/or historical `vitality` normalize to one deduped `legacy.lumber-stay.vitality`;
- that legacy perk contributes exactly **+1 daily Energy**;
- it consumes no Keystone/Specialist slot;
- it grants no Hard Work identity and no Palace D23 credit;
- migration/reload/profile merge are idempotent;
- live `ending/lumber-stay` presentation is retired;
- historical display remains non-interactive;
- `ending.lumber.hard-work`, `ending.lumber.forewoman`, and `ending.lumber.forest` remain canonical and distinct.

## Accepted planning authorities

Combined assembly preflight:

`chat5/d46-d47-legacy-assembly-preflight-v18@bed3a78507715f885b60d5b3f7a9824fc44c8de9`

Chat 3 final assembly packet:

`chat3/d46-d47-legacy-final-assembly-packet-v29@77259effc9cd626fefca1813d6e76f3ec5a9d299`

Chat 3 migration/release/conflict bundle:

`chat3/release-career-closure-bundle-v30@9d6730364cb98801d52e039b85e71b1f11877f5d`

Accepted planning documents:

- `CHAT3_D46_D47_LEGACY_FINAL_ASSEMBLY_PACKET_v29.md`;
- `CHAT3_D46_D47_LEGACY_MIGRATION_MATRIX_v30.md`;
- `CHAT3_ORDINARY_CAREER_END_TO_END_RELEASE_CHECKLIST_v31.md`;
- `CHAT3_FINAL_ECONOMY_HARDWORK_CONFLICT_AUDIT_v32.md`.

These documents establish the migration matrix, 40-ending invariant, cross-system ownership firewalls, focused test roster, and stop conditions.

## Current production position

Current observed control-plane head during this v35 audit:

`main@18166dbec95483f85df2d56adb59a2bf7bba26fb`

Current runtime still reflects the pre-tranche state:

- schema = 6;
- fresh Lust = 1;
- starting money = 600;
- base Energy = 3;
- ordinary wage bases are still Lumber 13 / other ordinary shifts 15;
- ordinary wage is still calculated without the D46 final cap helper;
- the pre-D47 package mapping is still live;
- Prostitute package Lust bonus is still +3;
- live `lumber-stay` still exists;
- `energyMax` still reads live `vitality` directly;
- total live ending definitions = 43;
- canonical ordinary endings already equal 40.

Therefore D46/D47/legacy retirement are not already assembled into current main.

Chat 2 must still re-query the actual assembly base immediately before composing this tranche. The SHA above is evidence of the present state, not a guessed future base.

## Required composition order

Use this semantic order on the actual Chat 2 base:

1. freeze and inspect the actual current base;
2. compose D46 fresh-life/economy behavior;
3. compose D47 package map/validator onto the current Hard Work lifecycle;
4. compose lumber retirement and historical normalization;
5. reconcile current save/migration/UI/presentation owners;
6. run the focused v37 gate;
7. only after focused green may the normal Chat 2 full-CI lane run.

No step authorizes replacing current shared files wholesale.

## Stable merge-only risks

### Engine / economy

D46 and lumber retirement both touch engine-level behavior. Preserve current Strong Meta, NightFlow, RunResult, Activity envelope, D40/D41 migration, and all later accepted integration work.

Required semantic composition:

- fresh Lust constructor 1 -> 5;
- keep money 600 and base Energy 3;
- add/use D46 ordinary-wage helper/cap only for ten ordinary shift IDs;
- Earned Reserve Match must consume the new committed D46 ordinary wage;
- historical lumber Energy must move from direct live `vitality` ownership to normalized legacy-perk ownership;
- Strong Meta Energy and legacy +1 must coexist.

### Hard Work / Strong Meta

D47 updates package contents and breadth validation, not the ownership system.

Preserve:

- `meta.hardWorkProgress` as ordinary package ownership;
- creation selection/application lifecycle;
- Strong Meta snapshot before package application;
- Keystone capacity 1;
- Specialist capacity 2;
- no package/legacy entry in Strong Meta ownership.

### Definitions

Compose only:

- D46 ordinary shift wage bases;
- removal of obsolete live `lumber-stay`.

Preserve all 40 canonical ordinary ending IDs and all current/later non-career content.

Do not force a global ending total of 42 if another accepted tranche has legitimately changed the non-ordinary ending catalog. The stable invariant is:

**40 canonical ordinary endings, live `lumber-stay` absent.**

### Localization / presentation / UI

Retire only live lumber-stay rows/bindings and add/preserve historical compatibility presentation. Preserve all D42 and any later Secret Debt/Palace/Activity localization, presentation, and UI work.

### Save / migration

Schema 6 remains authoritative. Compose lumber retirement into the existing migration chain rather than creating a parallel schema.

Preserve:

- legacy schema progression to 6;
- D40 route repairs;
- D41 retirement compatibility;
- Strong Meta migration/snapshot/runtime;
- RunResult transaction proof;
- D42 NightFlow state;
- current Activity envelope state.

Fresh Lust 5 is a constructor default, not a migration rewrite.

Settled old creation must not receive D47 packages retroactively.

## Cross-system ownership firewalls

### Secret Debt

Stable rule even if Secret Debt is not yet in the exact assembly base:

- hidden work is never an ordinary shift;
- hidden-work wage/cap 140 must never route through D46 cap 120;
- no hidden shift earns `hardWork:<career>`;
- bound career lock preserves ordinary progress;
- Earned Reserve Match stays suppressed on bound hidden work;
- D51 provenance logic remains separate from legacy Energy.

### Palace

D23 remains identity-based:

- 10/10 permanent ordinary Hard Work career identities;
- 10/10 active ordinary package identities in the current creation.

D47 components are not separate identities. Prostitute Lust is not an identity. Legacy lumber is not an identity. Strong Meta, Secret Debt, and Activity cannot fill a missing ordinary career.

D24 changes only the effective stat cap; D47 components remain +5.

### Activity

Activity keeps its own Energy-entry/Field-Time/result state. Historical lumber +1 may legitimately increase available daily Energy, but does not lower Activity entry cost, create Field Time, replay entry Energy, or create D38/ordinary Hard Work proof.

## Stop conditions

Stop and reconcile before the focused gate/full CI if any of the following occurs:

1. fresh existing saves are rewritten to Lust 5 instead of preserving stored Lust;
2. starting money changes from 600 or base Energy changes from 3;
3. Lumber base is not 35 or another ordinary shift base is not 37;
4. an ordinary final wage exceeds 120 through the D46 seam;
5. a non-ordinary wage is captured by the ordinary cap;
6. Secret Debt hidden work is capped at 120 or classified as ordinary work;
7. Earned Reserve Match uses stale pre-D46 wages or applies to bound hidden work;
8. any D47 mapping differs from the exact accepted ten-package map;
9. Prostitute separate Lust bonus is not +5;
10. package effects activate in the earning life or replay after reload;
11. Strong Meta slot capacities/ownership change because of D47 or legacy lumber;
12. package application occurs before Strong Meta cap snapshot resolution;
13. historical `lumber-stay` or `vitality` grants `hardWork:lumber`, a modern ending, a Strong Meta reward, or Palace credit;
14. historical evidence stacks legacy Energy beyond +1;
15. live `lumber-stay` remains obtainable;
16. `ending.lumber.forewoman` or `ending.lumber.forest` is removed/renamed;
17. any of the 40 canonical ordinary ending identities disappears;
18. schema 6 is downgraded/forked;
19. D42 NightFlow is overwritten;
20. Secret Debt/Palace/Activity owners present on the actual assembly base are overwritten by historical producer files.

## Disposition

The three producer sources are independently exact-head green for their accepted scope, and Chat3 v29-v32 found no Product-level contradiction.

The remaining work is selective composition onto the actual current Chat 2 base plus executable post-assembly verification.

**v35 COMPLETE — CONTINUE TO v36**
