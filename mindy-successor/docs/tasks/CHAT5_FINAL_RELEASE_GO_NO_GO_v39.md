# Chat 5 — Final Release GO / NO-GO v39

Status: **OBJECTIVE RELEASE GATE DEFINED**  
Owner: Chat 5  
Branch: `chat5/windows-release-preflight-v37`

Scope: final release acceptance criteria only.

No runtime changes.  
No full CI.

---

# 1. Three distinct release states

Do not collapse these into one "green" status.

## State A — source-tree release candidate

The repository source is complete and exact-main green.

It is not yet a shippable Windows release.

## State B — packaged release candidate

An installer has been built from the exact source-tree candidate and has passed package/install/persistence gates.

It is not final GO until manual player-facing release checks are also closed.

## State C — final 1.0 GO

The exact packaged artifact, identified by SHA-256, has passed all objective release gates and has no unresolved acceptance-critical deviations.

---

# 2. Source-tree release candidate — minimum GO conditions

Source-tree candidate is GO only when **all** conditions below are true.

## S1 — broad burn-down is zero

All five remaining production stages must have completed in order:

1. Secret Debt + D51;
2. Palace + D39;
3. Activity + Camp + D38;
4. D46 + D47 + legacy;
5. final closure.

For every stage:

- focused QA green;
- typecheck green;
- validate green;
- build green;
- one full Chat 2 branch CI green;
- frozen candidate SHA;
- Leader merge;
- exact-main CI SUCCESS;
- burn-down decremented only after exact-main success.

Required final broad burn-down:

**0**

A branch full-CI success without exact-main success is not enough.

---

## S2 — exact final source identity is frozen

Record one exact main SHA as the source-tree release candidate.

Required:

- exact-main `mindy-successor check` SUCCESS on that SHA;
- working tree clean for release packaging;
- no unmerged "release-only" runtime/content fixes;
- no known source change pending outside that SHA.

If any source change is required afterward, source-tree GO is invalidated until the normal focused/full-CI/merge/exact-main path is repeated.

---

## S3 — current D39 consumer blocker is resolved

Current accepted state:

Formal Introduction has **no safe existing live consumer**.

This is not a historical closed issue.

Chat 3 is currently preparing:

- Source Method mapping;
- minimal Formal Introduction authored seam proposal;
- D39 consumer decision packet.

Before Palace can close and before final source-tree GO:

- Leader/Product must accept the required D39 consumer decision;
- the accepted Formal Introduction seam/consumer must be implemented if required;
- Source Method must have an accepted safe live consumer or an explicit accepted no-consumer/product resolution;
- focused tests must prove the accepted behavior;
- no generic relationship/access bypass may be introduced.

Until this decision and implementation path is closed:

**SOURCE-TREE NO-GO**

Do not waive the blocker because the D39 reward runtime itself is already green.

---

## S4 — final Strong Meta composition is coherent

Final source must prove the accepted D38+D39 combined model.

Required:

- correct current combined registry identity;
- 25 reward IDs if no later accepted reward additions change the count;
- 22 Specialists if no later accepted additions change the count;
- 3 Keystones;
- global Specialist capacity = 2;
- Source Method remains automatic knowledge;
- cap-200 remains a normal Specialist;
- old active snapshots remain loadable;
- D38 and D39 runtime state can coexist;
- no third/free domain-specific Specialist slot.

If later accepted source legitimately changes registry counts, the final test must reflect that current accepted registry rather than blindly enforcing historical numbers.

Capacity 2 and class semantics remain hard invariants.

---

## S5 — final save/migration closure is green

Final source must implement one authoritative combined closure equivalent to:

`CHAT5_FINAL_COMBINED_SAVE_MATRIX_v29.md`

Required semantic coverage:

- 36 top-level cases, or a demonstrably equivalent stronger suite;
- mixed D38+D39 runtime;
- Secret Debt + Activity/Camp;
- Palace progress + later Debt binding;
- legacy lumber + modern Meta;
- old Strong Meta snapshots;
- protected profile merge;
- exactly-once money/Energy/calendar/rewards;
- stable content IDs.

Do not claim source-tree GO using only isolated producer tests.

---

## S6 — final gameplay/system invariants are green

At minimum final automation must prove:

### Secret Debt

- forced Night absolute;
- ordinary careers locked while bound;
- School/Activity available;
- 50 hidden shifts for Bound Life;
- Takeover explicit;
- D51 compatibility only for Street+bound pair;
- no global Energy floor.

### Palace

- no permanent Palace access;
- duty/progression ledger valid;
- Prince gate correct;
- Return Home explicit;
- D39 rewards exactly once;
- accepted live consumers behave within their scope.

### Activity

- four production regions;
- entry Energy 2;
- Field Time 6;
- Camp max two nights;
- Camp cannot suppress forced Debt Night;
- D38 explicit ending commit;
- exact accepted Atlas/Archive/Contact mapping;
- Field Archive durability correct;
- v36 Network copy value present.

### D46/D47/legacy

- fresh Lust 5;
- old Lust preserved;
- money 600;
- base Energy 3;
- wages 35/37;
- ordinary wage cap 120;
- exact ten D47 packages;
- legacy lumber +1 Energy once;
- exactly 40 canonical ordinary endings;
- no live `lumber-stay`;
- unrelated non-ordinary endings preserved.

---

## S7 — final localization/presentation/source integrity is green

Required final automated source checks:

- localization completeness;
- RU/EN pairs;
- presentation validation;
- source integrity;
- locale/accessibility parity;
- generic localized ending screen;
- no required live raw localization keys;
- retired live labels absent;
- D41 historical compatibility rows preserved;
- final Activity Network corrected epilogue.

Any accepted Chat 6 P0/P1 source/content correction must be included in the exact final SHA.

---

# 3. Automatic source-tree NO-GO conditions

Any one of these is enough for NO-GO:

- broad burn-down > 0;
- any stage lacks exact-main SUCCESS;
- source candidate SHA is not exact/known;
- unresolved D39 consumer/Product decision;
- known required source fix exists outside candidate SHA;
- final full check failing;
- final combined save/migration closure incomplete;
- current schema/content cannot load accepted compatible saves;
- reward/payment/calendar replay bug;
- Strong Meta capacity/class loophole;
- Secret Debt forced Night can be bypassed;
- Activity/Palace cross-domain unauthorized bypass;
- canonical ordinary ending count != 40;
- retired `lumber-stay` remains live;
- player-facing P0 localization/runtime issue remains open.

Historical producer failures that are already repaired by accepted later work are **not** automatic NO-GO by themselves.

---

# 4. Packaged release candidate — minimum GO conditions

Packaging starts only from the exact source-tree-GO SHA.

## P1 — release identity is approved

Record and intentionally approve:

- release label;
- package version;
- appId;
- productName.

Current reviewed source reports package version:

`0.1.0`

Before calling an artifact final "1.0", Leader/release owner must explicitly approve the final package-version identity.

Possible valid outcomes:

- current value intentionally retained and documented; or
- version updated through the normal source/CI path before packaging.

An unreviewed mismatch between advertised release identity and package metadata is NO-GO.

---

## P2 — package provenance is exact

Required chain:

```text
final exact-main-green SHA
-> clean checkout
-> npm ci
-> npm run dist:win
-> new installer
-> SHA-256
```

Required:

- packaging checkout SHA equals source-tree candidate SHA;
- working tree clean;
- no manual release-only edits;
- old/stale `release/` artifacts removed or archived;
- `dist:win` nested `npm run check` PASS;
- Electron Builder NSIS x64 PASS.

---

## P3 — installer artifact identity is complete

Record:

- exact filename;
- byte size;
- creation timestamp;
- SHA-256.

The tested artifact must be the newly built artifact.

Recompute hash after transfer to each release-test machine.

Any unexplained hash mismatch:

**NO-GO**

Renaming/mutating artifact after hashing requires new identity evidence.

---

## P4 — installed build works from normal Windows paths

Required:

- default installation succeeds;
- custom path containing spaces succeeds;
- custom path containing non-ASCII characters succeeds;
- installed app launches;
- content loads;
- basic action works;
- save/reload works;
- representative packaged media works.

Installer completion without successful installed launch is NO-GO.

---

## P5 — no source-tree/development dependency

On a clean Windows x64 machine/VM:

- no project checkout;
- no Node;
- no npm;
- no Git dependency;
- no dev server;
- network disconnected for primary smoke.

Required:

- install succeeds;
- offline launch succeeds;
- packaged content loads;
- packaged save validator functions;
- gameplay action works;
- save/reload works;
- representative media works.

Any need for source checkout, localhost, npm, TypeScript or Git at runtime:

**NO-GO**

---

## P6 — installed persistence is safe

Use the real installed `userData/saves` store.

Required:

### healthy primary

- loads normally;
- recovery flag false.

### valid backup

After a second valid save:

- backup is known-good prior primary.

### corrupt primary

- valid backup loads;
- recovery flag true;
- localized backup-recovered message visible;
- read operation does not silently bless/overwrite the corrupt primary.

### corrupt primary + backup

- load stops safely;
- corrupted sources remain available;
- neither source is overwritten as valid.

### rapid saves

- final primary parses;
- no accepted truncation;
- serialized save queue behaves deterministically.

Failure to preserve saves safely is automatic NO-GO.

---

## P7 — mixed final-state persistence works

At least one installed-app save must exercise a cross-system final state.

Preferred fixture:

- one D38 Specialist;
- one D39 Specialist;
- run-local state in each family;
- representative progression/pending state.

After close/reopen:

- selected loadout identical;
- runtime uses identical;
- no third Specialist;
- no reward/use replay;
- save remains valid after another save/reload.

If final D39 decision changes the legal fixture, use an equivalent accepted mixed state.

---

## P8 — compatible installer update works

Record both builds.

Prior build:

- SHA;
- package version;
- appId;
- installer hash.

Final build:

- SHA;
- package version;
- appId;
- installer hash.

Required:

1. install prior compatible build;
2. create meaningful save;
3. install final candidate over/update it;
4. load old save;
5. verify final migration;
6. save again;
7. relaunch final candidate;
8. load again.

Loss of a supported compatible save:

**NO-GO**

---

## P9 — media packaging/fallback is safe

Installed candidate must prove representative:

- ordinary career media;
- relationship/milestone media;
- Activity media;
- ending media;
- animated GIF.

Also test optional missing media behavior.

Required:

- missing optional image/GIF does not break choices/mechanics;
- missing optional media does not alter money/Energy/progression/reward;
- missing video behavior is explicitly observed and recorded;
- no broken absolute source path is required.

A missing optional asset that changes mechanics is NO-GO.

---

# 5. Automatic packaged-candidate NO-GO conditions

Any one is enough:

- artifact not built from exact source-tree-GO SHA;
- dirty source checkout used for packaging;
- stale/unknown installer artifact tested;
- package identity/version not intentionally approved;
- `dist:win` or its nested `npm run check` fails;
- installer hash missing or mismatched;
- installed app cannot launch;
- custom path with spaces/non-ASCII breaks required runtime;
- clean-machine/offline launch fails;
- source/dev dependency exists;
- valid save cannot persist across relaunch;
- corrupt primary cannot recover healthy backup;
- both-corrupt case overwrites/blesses corrupt data;
- rapid saves produce accepted invalid JSON;
- supported installer update loses/breaks compatible save;
- packaged validator/content IDs do not match final source;
- required packaged media paths fail without safe fallback;
- source changes after installer was built.

---

# 6. Final 1.0 GO — minimum conditions

Final 1.0 is GO only if all three layers below are green.

## Layer 1 — source tree

- source-tree candidate GO;
- burn-down 0;
- final exact-main SUCCESS;
- no unresolved required Product/content decision.

## Layer 2 — packaged candidate

- packaged candidate GO;
- exact installer filename and SHA-256 frozen;
- installed/clean-machine/persistence/update/media gates green.

## Layer 3 — manual player-facing release smoke

Use the final accepted Chat 6 manual matrix.

Required representative review in both RU and EN:

- Night;
- Secret Debt;
- Activity;
- Palace;
- School;
- Strong Meta/reward selection;
- save/load/recovery notices;
- generic ending screen;
- all ending families;
- alt/captions/accessibility;
- retired live content absent;
- no raw localization keys;
- no contradictory final player-facing wording.

Accepted final Activity Network epilogue:

RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

EN:

`The contacts tie disconnected routes into one practical working network.`

Any unresolved player-facing P0 at this stage:

**NO-GO**

---

# 7. Evidence completeness requirement

Final GO requires a filled evidence ledger equivalent to:

`CHAT5_FINAL_RELEASE_EVIDENCE_LEDGER_TEMPLATE_v38.md`

At minimum it must identify:

- five stage candidate SHAs;
- focused QA evidence;
- full-CI runs/jobs;
- Leader merge SHAs;
- exact-main runs/jobs;
- burn-down transitions;
- final source SHA;
- installer filename/size/hash;
- clean-machine identity;
- persistence/corruption/update evidence;
- media evidence;
- manual RU/EN/presentation result.

"Passed earlier" without exact evidence is not sufficient for final GO.

---

# 8. Handling a failure after apparent GO

## Source changes

Any source change after source-tree GO:

- invalidates source-tree candidate identity;
- invalidates existing packaged artifact as final candidate.

Required:

- affected focused regression;
- branch full CI;
- Leader merge;
- exact-main CI;
- new release SHA;
- rebuild;
- new artifact hash;
- rerun affected package gates.

## Packaging-only change

If source SHA does not change but packaging configuration/artifact changes:

- generate a new artifact;
- record new hash;
- rerun package/install gates affected by that change.

Do not reuse an old GO decision for a new artifact hash.

## Evidence-only gap

If behavior already passed but evidence is missing:

- rerun or reconstruct only if exact objective proof exists;
- never mark PASS from memory/assumption.

---

# 9. Things that are not release blockers by themselves

Do not issue NO-GO solely for:

- historical v15/v16/v17 exact-head failures already covered by accepted v19 repair;
- old Camp 6/7 fixture result;
- old Guard presentation assertion failures;
- old standalone D38/D39 registry cardinalities;
- stale historical global ending count 42;
- stale historical exact-static presentation count 8;
- superseded v17 Network four-direction copy;
- exact-head QA harness shell failures that never reached producer tests;
- missing dedicated optional art where accepted fallback is explicitly allowed.

Only the current final composed candidate matters.

---

# 10. Objective decision table

| State | GO when | Automatic NO-GO when |
|---|---|---|
| Source-tree RC | burn-down 0, final exact-main green, D39 decision resolved, final combined regression/localization green | unresolved stage/decision, exact-main fail, known source defect, migration/replay/domain invariant failure |
| Packaged RC | exact SHA provenance, approved identity, dist:win green, hash frozen, installed+clean-machine+persistence+update+media green | stale/wrong artifact, hash mismatch, install/runtime failure, source dependency, save corruption, update loss |
| Final 1.0 | source GO + package GO + final manual RU/EN/presentation smoke + complete evidence ledger | any open acceptance-critical deviation or player-facing P0 |

---

# 11. Current project disposition at time of this checklist

This document defines the gate; it does not declare current release GO.

Current known state includes:

- broad burn-down still above zero;
- Secret Debt+D51 assembly active;
- Palace not yet assembled;
- Formal Introduction has no safe existing live consumer;
- D39 consumer resolution/decision work is active;
- later Activity/D46/final closure stages remain.

Therefore current release disposition is objectively:

**NO-GO FOR 1.0 PACKAGING/SHIPMENT — EXPECTED, WORK IN PROGRESS**

This is not a regression finding.

It simply reflects that the final source candidate does not yet exist.

---

# 12. Final release declaration format

When all gates are complete, declare release only with exact identity:

```text
FINAL 1.0 GO

Source SHA:
Exact-main run/job:
Package version:
appId:
Installer:
Installer size:
SHA-256:
Windows clean-machine identity:
Save/backup/update smoke:
Manual RU/EN/presentation smoke:
Open acceptance-critical deviations: NONE
Approver:
Date:
```

Without exact source SHA and installer SHA-256, do not use the phrase:

`FINAL 1.0 GO`

**GO / NO-GO CONTRACT READY FOR USE**
