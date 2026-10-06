# Chat 5 — Final Release Evidence Ledger Template v38

Status: **TEMPLATE READY**  
Owner: Chat 5  
Branch: `chat5/windows-release-preflight-v37`

Use this document as the single release evidence index.

Do not paste entire logs into this file. Link/record exact run IDs, job IDs, SHAs, hashes and concise pass/fail summaries.

---

# A. Release identity

| Field | Value |
|---|---|
| Release label | `<fill>` |
| Final intended package version | `<fill>` |
| appId | `<fill>` |
| productName | `<fill>` |
| Final source-tree main SHA | `<fill after Stage 5>` |
| Final source-tree exact-main run | `<fill>` |
| Final source-tree exact-main job | `<fill>` |
| Final source-tree test count | `<fill>` |
| Windows build machine | `<fill>` |
| Windows version/build | `<fill>` |
| Architecture | `x64 / <fill>` |
| Node version | `<fill>` |
| npm version | `<fill>` |
| Evidence owner/date | `<fill>` |

---

# B. Five-stage source-tree ledger

Fill exactly one row per broad burn-down stage.

| Stage | Assembly branch | Accepted source refs / decision packet | Exact candidate SHA | Focused QA evidence | Typecheck / validate / build | Full-CI run / job | Leader merge SHA | Exact-main run / job | Exact-main result | Burn-down |
|---|---|---|---|---|---|---|---|---|---|---|
| 1. Secret Debt + D51 | `<fill>` | `<fill>` | `<fill>` | `<tests, pass/fail>` | `<P/P/P>` | `<run / job>` | `<fill>` | `<run / job>` | `<SUCCESS>` | `5 -> 4` |
| 2. Palace + D39 | `<fill>` | `<include D39 consumer decision>` | `<fill>` | `<tests, pass/fail>` | `<P/P/P>` | `<run / job>` | `<fill>` | `<run / job>` | `<SUCCESS>` | `4 -> 3` |
| 3. Activity + Camp + D38 | `<fill>` | `<include v19 repair + v36 copy>` | `<fill>` | `<tests, pass/fail>` | `<P/P/P>` | `<run / job>` | `<fill>` | `<run / job>` | `<SUCCESS>` | `3 -> 2` |
| 4. D46 + D47 + legacy | `<fill>` | `<fill>` | `<fill>` | `<tests, pass/fail>` | `<P/P/P>` | `<run / job>` | `<fill>` | `<run / job>` | `<SUCCESS>` | `2 -> 1` |
| 5. Final closure | `<fill>` | `<v29 matrix + final UI/localization>` | `<fill>` | `<tests, pass/fail>` | `<P/P/P>` | `<run / job>` | `<fill>` | `<run / job>` | `<SUCCESS>` | `1 -> 0` |

## Stage failure note template

Use only when a stage has a failed gate.

```text
Stage:
Candidate SHA:
Gate:
Expected:
Observed:
Run/job:
Classification:
- implementation
- content
- migration/save
- test-only
- CI/environment
Repair SHA:
Replacement full-CI:
Replacement merge SHA:
Replacement exact-main:
Disposition:
```

Never overwrite failed evidence. Append the successful replacement evidence.

---

# C. Current hard-decision ledger

Record unresolved Product/content decisions that block a source stage.

| Decision / blocker | Owner | Required before | Evidence | Decision / resolution | Resolution SHA / packet |
|---|---|---|---|---|---|
| D39 Formal Introduction live consumer | `Chat 3 / Leader` | Palace focused acceptance | `v39 blocker + v43/v44 packet` | `<fill>` | `<fill>` |
| D39 Source Method live consumer | `Chat 3 / Leader` | Palace focused acceptance | `v42/v44` | `<fill>` | `<fill>` |
| Final package/release version identity | `Leader/release owner` | Windows packaging | current `package.json` + v37 | `<fill>` | `<fill>` |
| Other current release decision | `<fill or NONE>` | `<fill>` | `<fill>` | `<fill>` | `<fill>` |

A source candidate cannot be marked release-ready while a required row remains unresolved.

---

# D. Final closure save/regression evidence

| Gate | Evidence |
|---|---|
| 36-case final save/reload matrix | `<test file, count, run>` |
| Mixed D38 + D39 snapshot/runtime | `<fill>` |
| Bound Secret Debt + Activity/Camp | `<fill>` |
| Palace progress + later Debt binding | `<fill>` |
| Legacy lumber + modern Meta | `<fill>` |
| Old Strong Meta snapshot compatibility | `<fill>` |
| Protected profile merge | `<fill>` |
| Exactly-once reward/payment/calendar | `<fill>` |
| Stable content-ID resolution | `<fill>` |
| Final localization completeness | `<fill>` |
| Presentation source integrity | `<fill>` |
| RU/EN accessibility/parity | `<fill>` |
| Localized ended-screen regression | `<fill>` |
| One-save drift sentinel | `<fill>` |

---

# E. Packaging provenance

## Exact build source

| Field | Value |
|---|---|
| Packaging checkout SHA | `<fill>` |
| Equals final exact-main-green SHA | `YES / NO` |
| Working tree clean | `YES / NO` |
| package version | `<fill>` |
| appId | `<fill>` |
| productName | `<fill>` |
| Old release artifacts removed/archived | `YES / NO` |
| npm ci result | `<fill>` |

## dist:win

| Field | Value |
|---|---|
| Command | `npm run dist:win` |
| Nested npm run check | `PASS / FAIL` |
| Electron Builder NSIS x64 | `PASS / FAIL` |
| Build start/end | `<fill>` |
| Build log reference | `<fill>` |

---

# F. Installer artifact ledger

Use one row per produced candidate artifact.

| Candidate | Filename | Size bytes | Created timestamp | SHA-256 | Intended release artifact? |
|---|---|---:|---|---|---|
| 1 | `<fill>` | `<fill>` | `<fill>` | `<fill>` | `YES / NO` |
| 2 | `<optional>` |  |  |  |  |

Primary candidate:

`<exact filename>`

Primary candidate SHA-256:

`<exact hash>`

Do not mutate/rename the recorded release artifact without producing a new hash/evidence row.

---

# G. Artifact transfer / hash chain

| Location | Machine | SHA-256 | Match build record? |
|---|---|---|---|
| Build output | `<fill>` | `<fill>` | baseline |
| Build-machine installer test copy | `<fill>` | `<fill>` | `YES / NO` |
| Clean-machine / VM copy | `<fill>` | `<fill>` | `YES / NO` |
| Archive/release storage copy | `<fill>` | `<fill>` | `YES / NO` |

Any hash mismatch is NO-GO until explained by a deliberately rebuilt/rehashed artifact.

---

# H. Build-machine installed smoke

| Check | Result | Evidence / note |
|---|---|---|
| Default install | `PASS / FAIL` | `<fill>` |
| Install path with spaces | `PASS / FAIL` | `<fill>` |
| Install path with non-ASCII | `PASS / FAIL` | `<fill>` |
| Installed launch | `PASS / FAIL` | `<fill>` |
| Character creation/load | `PASS / FAIL` | `<fill>` |
| Basic action + save | `PASS / FAIL` | `<fill>` |
| Close/reopen same save | `PASS / FAIL` | `<fill>` |
| Representative packaged media | `PASS / FAIL` | `<stable ID>` |
| Uninstall safety | `PASS / FAIL` | `<fill>` |

---

# I. Clean-machine / offline evidence

Machine identity:

`<VM/physical machine, Windows build, x64>`

Preconditions:

| Condition | Result |
|---|---|
| No project checkout | `YES / NO` |
| No Node/npm required | `YES / NO` |
| No Git required | `YES / NO` |
| Network disconnected for primary smoke | `YES / NO` |
| Installer hash matches | `YES / NO` |

Runtime:

| Check | Result | Evidence / note |
|---|---|---|
| Install | `PASS / FAIL` | `<fill>` |
| Offline launch | `PASS / FAIL` | `<fill>` |
| Packaged content load | `PASS / FAIL` | `<fill>` |
| Packaged save validator accepts valid final save | `PASS / FAIL` | `<fill>` |
| Packaged validator rejects incompatible/invalid save | `PASS / FAIL` | `<fill>` |
| Gameplay action | `PASS / FAIL` | `<fill>` |
| Save / close / reopen | `PASS / FAIL` | `<fill>` |
| Blocking event persists | `PASS / FAIL` | `<fill>` |
| Paid Night no duplicate charge | `PASS / FAIL` | `<fill>` |
| Activity entry no duplicate 2 Energy | `PASS / FAIL` | `<fill>` |
| Ending/reward checkpoint idempotent | `PASS / FAIL` | `<fill>` |
| Representative packaged media | `PASS / FAIL` | `<stable ID>` |

---

# J. Save / backup / corruption ledger

Actual userData save directory:

`<fill from installed candidate>`

| Scenario | Precondition / files | Expected | Result | Evidence |
|---|---|---|---|---|
| Healthy primary | valid primary | load primary, recovered=false | `<fill>` | `<fill>` |
| Backup creation | second valid save | prior valid primary copied to .bak | `<fill>` | `<fill>` |
| Corrupt primary | invalid primary + valid backup | load backup, recovered=true, visible recovery message | `<fill>` | `<fill>` |
| Both corrupt | invalid primary + invalid backup | safe failure, files not blessed/overwritten | `<fill>` | `<fill>` |
| Rapid saves | repeated queued saves | final valid JSON, no accepted truncation | `<fill>` | `<fill>` |
| Temp-file state | after successful flush | authoritative primary exists; no temp substituted for it | `<fill>` | `<fill>` |

Record whether the corrupt primary remains unchanged after backup recovery:

`<YES / NO / hash before+after>`

Do not require automatic self-heal unless separately authorized.

---

# K. Mixed-state installed persistence

Fixture identity:

`<save fixture name/hash>`

Recommended final fixture:

- one selected D38 Specialist;
- one selected D39 Specialist;
- one D38 run-local use;
- one D39 run-local use;
- current final Strong Meta registry;
- representative pending/progression state.

| Check | Result |
|---|---|
| Save succeeds | `PASS / FAIL` |
| Close/reopen installed app | `PASS / FAIL` |
| Exact selected loadout persists | `PASS / FAIL` |
| D38 runtime persists | `PASS / FAIL` |
| D39 runtime persists | `PASS / FAIL` |
| No third Specialist appears | `PASS / FAIL` |
| No reward/use replay | `PASS / FAIL` |
| Save remains valid after another save/reload | `PASS / FAIL` |

If final D39 consumer decision changes the preferred fixture, record the equivalent accepted mixed state here.

---

# L. Compatible installer update

## Prior build

| Field | Value |
|---|---|
| Source SHA | `<fill>` |
| Package version | `<fill>` |
| appId | `<fill>` |
| Installer hash | `<fill>` |

Prior-save fixture:

`<identity / schema / meaningful state>`

## Upgrade result

| Check | Result |
|---|---|
| Final installer updates/installs over prior build | `PASS / FAIL` |
| Prior save found under intended userData identity | `PASS / FAIL` |
| Final migration/load succeeds | `PASS / FAIL` |
| No duplicate reward/payment/calendar effect | `PASS / FAIL` |
| Save under final candidate succeeds | `PASS / FAIL` |
| Second final relaunch/load succeeds | `PASS / FAIL` |

---

# M. Media / fallback ledger

| Surface | Stable presentation/content ID | Packaged source | Result |
|---|---|---|---|
| Ordinary career | `<fill>` | `<fill>` | `PASS / FAIL` |
| Milestone/relationship | `<fill>` | `<fill>` | `PASS / FAIL` |
| Activity | `<fill>` | `<fill>` | `PASS / FAIL` |
| Ending | `<fill>` | `<fill>` | `PASS / FAIL` |
| Real GIF | `<fill>` | `<fill>` | `PASS / FAIL` |
| Missing optional image/GIF fallback | `<fill>` | broken acceptance path | `PASS / FAIL` |
| Missing video behavior | `<fill>` | broken acceptance path | `<observed behavior>` |

Mechanical neutrality of optional missing media:

`PASS / FAIL`

Acceptance override removed afterward:

`YES / NO`

---

# N. Manual RU/EN / presentation smoke

Use the final accepted Chat 6 manual matrix.

| Area | RU | EN | Presentation / accessibility | No raw/fallback key | Result |
|---|---|---|---|---|---|
| Night | `<fill>` | `<fill>` | `<fill>` | `<fill>` | `PASS/FAIL` |
| Secret Debt |  |  |  |  |  |
| Activity |  |  |  |  |  |
| Palace |  |  |  |  |  |
| School |  |  |  |  |  |
| Strong Meta/reward selection |  |  |  |  |  |
| Save/load/recovery notices |  |  |  |  |  |
| Generic ending screen |  |  |  |  |  |
| Ordinary endings |  |  |  |  |  |
| Secret Debt endings |  |  |  |  |  |
| Activity endings |  |  |  |  |  |
| Palace endings |  |  |  |  |  |
| Retired-content absence | n/a | n/a | `<fill>` | `<fill>` | `PASS/FAIL` |

Accepted Activity Network final epilogue value verified:

- RU: `Контакты связывают разрозненные направления в единое рабочее пространство.`
- EN: `The contacts tie disconnected routes into one practical working network.`

Result:

`PASS / FAIL`

---

# O. NO-GO / deviation log

Record every unresolved deviation, even if later fixed.

| ID | Candidate SHA / installer hash | Gate | Expected | Observed | Classification | Owner | Resolution | Closed? |
|---|---|---|---|---|---|---|---|---|
| `REL-001` | `<fill>` | `<fill>` | `<fill>` | `<fill>` | `source/content/package/persistence/media/evidence` | `<fill>` | `<fill>` | `YES/NO` |

Final GO requires no open acceptance-critical deviation.

---

# P. Final disposition block

## Source-tree candidate

- [ ] broad burn-down = 0
- [ ] all five exact-main runs SUCCESS
- [ ] final source SHA recorded
- [ ] required D39 consumer decision resolved
- [ ] final 36-case save/regression closure green
- [ ] final player-facing source checks green

Source-tree disposition:

`GO / NO-GO`

Reason:

`<fill>`

## Packaged candidate

- [ ] exact SHA provenance intact
- [ ] package identity/version approved
- [ ] dist:win PASS
- [ ] installer hash recorded/matches
- [ ] installed smoke PASS
- [ ] clean-machine/offline PASS
- [ ] persistence/backup/corruption PASS
- [ ] compatible update PASS
- [ ] media/fallback PASS
- [ ] manual RU/EN/presentation PASS

Packaged disposition:

`GO / NO-GO`

## Final 1.0

Final release decision:

`GO / NO-GO`

Approver:

`<fill>`

Exact source SHA:

`<fill>`

Exact installer filename:

`<fill>`

Exact SHA-256:

`<fill>`

Date:

`<fill>`

Notes:

`<fill>`

---

# Usage rule

This ledger is an index, not a substitute for evidence.

Every PASS that depends on automation must identify the exact:

- SHA;
- run;
- job;
- result/count where relevant.

Every packaged PASS must identify the exact installer hash.

If a source change occurs after packaging:

- invalidate packaged GO;
- record the new source candidate;
- rebuild;
- produce a new artifact/hash;
- rerun affected release gates.

**TEMPLATE READY FOR USE**
