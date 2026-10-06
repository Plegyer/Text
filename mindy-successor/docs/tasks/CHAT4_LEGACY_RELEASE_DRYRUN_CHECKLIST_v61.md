# Chat 4 — Legacy / D46 / D47 Selective Assembly Dry-Run Checklist v61

Status: **DRY-RUN CHECKLIST — PRE-INTEGRATION**
Owner: Chat 4
Branch: `chat4/legacy-release-dryrun-v61`

## Authorities

Accepted release-evidence handoff:

`mindy-successor/docs/tasks/CHAT4_LEGACY_RELEASE_EVIDENCE_v60.md`

Blob:

`858abe645f7b9db19da9aea3e7209af677e5e7ae`

Accepted compact cross-golden handoff:

`mindy-successor/docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONSISTENCY_v58.md`

Blob:

`3a3038066809e1f391320ff9e3b0440e021ce36e`

Referenced mechanics operations:

`CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json@17282cf11436d54d49915f44ed84de56a0eebf7c`

Referenced focused gate:

`CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json@dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

Locked Product authority:

`mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md@f2dac5cecfa4953aacc42aea2711e825a359097b`

Leader checkpoint:

`mindy-successor/docs/tasks/LEADER1_CHECKPOINT_2026-10-06_LATE.md@6f7179d6f4bc9adf8b86baf89612aade8e876992`

## Dry-run status convention

Every row must be attached to **one exact frozen integrated candidate SHA**.

Allowed result values:

- `PASS`
- `FAIL`
- `NOT-RUN`

Do not mark `PASS` from pre-integration authority alone where the row requires observation of the integrated production candidate.

## Ordered checklist

| # | Dry-run step | Expected result / evidence | Result |
|---:|---|---|---|
| 1 | Freeze live integration branch + exact SHA | Branch and 40-char SHA recorded before edits | NOT-RUN |
| 2 | Recheck no newer Product authority supersedes D46/D47/legacy | D46 Lust 5, wages 35/37, cap120, D47 mapping, HW=50, 40 endings, legacy +1 remain authoritative | PASS |
| 3 | Apply D46 fresh-Lust operation semantically | Fresh/new-life Lust = 5; stored/in-progress Lust untouched | NOT-RUN |
| 4 | Apply D46 ten wage-base operations by stable action ID | Lumber=35; other nine=37; existing weights preserved | NOT-RUN |
| 5 | Preserve D46 ordinary-only cap 120 | Only ten ordinary shifts capped; Palace/Secret Debt/other wages bypass | NOT-RUN |
| 6 | Apply exact ten D47 whole profession packages | Exact accepted package map; profession package is selection unit | NOT-RUN |
| 7 | Preserve D47 outside Strong Meta slots | Hard Work packages consume no Keystone/Specialist capacity | NOT-RUN |
| 8 | Preserve Hard Work threshold exactly 50 | All ten ordinary HW endings remain >=50 completed shifts | NOT-RUN |
| 9 | Retire live `lumber-stay` | No live ending definition/eligibility/commit path | NOT-RUN |
| 10 | Retire live generic `vitality` acquisition | No modern generic reward/unlock acquisition | NOT-RUN |
| 11 | Preserve historical identity | `legacy.lumber-stay.vitality` remains historical-only | NOT-RUN |
| 12 | Preserve legacy Energy | Historical lumber contributes exactly +1 Energy, max once | NOT-RUN |
| 13 | Preserve historical RunResult/transaction | Existing proof remains exact; no replay | NOT-RUN |
| 14 | Preserve pre-RunResult compatibility | Migration constructs deterministic proof without replay | NOT-RUN |
| 15 | Apply exact live localization retirement set | Exactly five live lumber keys deleted | NOT-RUN |
| 16 | Preserve exact historical localization set | Exactly five historical compatibility rows retained | NOT-RUN |
| 17 | Delete exact presentation slot | `ending/lumber-stay` absent; unrelated slots untouched | NOT-RUN |
| 18 | Preserve historical display-only UI | Historical card remains visible and non-interactive | NOT-RUN |
| 19 | Inspect shared-file diff for third values | No unreviewed third value in any v53-owned scalar/key | NOT-RUN |
| 20 | Inspect shared-file diff for unrelated reversion | No whole-file historical snapshot overwrites newer systems | NOT-RUN |
| 21 | Record observed canonical ordinary ending count | Exactly 40 | NOT-RUN |
| 22 | Freeze exact post-assembly candidate SHA | All subsequent gates run on this same SHA | NOT-RUN |
| 23 | `npm ci` | PASS | NOT-RUN |
| 24 | `npm run typecheck` | PASS | NOT-RUN |
| 25 | `npm run validate` | PASS | NOT-RUN |
| 26 | `npm run build` | PASS | NOT-RUN |
| 27 | Run complete v54 focused gate | Every applicable v54 phase PASS | NOT-RUN |
| 28 | Run final player-facing golden gate | PASS on same frozen candidate | NOT-RUN |
| 29 | Run final save/migration golden gate | PASS on same frozen candidate | NOT-RUN |
| 30 | Explicit lumber F4 existing-RunResult case | PASS; proof preserved exactly | NOT-RUN |
| 31 | Explicit lumber F5 pre-RunResult case | PASS; deterministic proof, no replay | NOT-RUN |
| 32 | Run newer authoritative adjacency tests present on live base | PASS | NOT-RUN |
| 33 | Attach one consolidated PASS/FAIL/NOT-RUN ledger to frozen SHA | No result sourced from a different candidate SHA | NOT-RUN |

## Exact semantic anchors for steps 3-18

These are accepted contract anchors and therefore `PASS` as authority facts before integration:

- fresh Lust target = **5**;
- existing stored Lust must be preserved;
- Lumber wage base = **35**;
- other nine ordinary wage bases = **37**;
- ordinary cap = **120**, ordinary-only;
- exactly ten D47 whole profession packages;
- D47 packages outside Strong Meta;
- Hard Work = **50 shifts**;
- canonical ordinary endings after retirement = **40**;
- live `lumber-stay` absent;
- live generic `vitality` acquisition absent;
- historical identity = `legacy.lumber-stay.vitality`;
- legacy Energy = **+1 exactly once**;
- existing historical RunResult/transaction preserved exactly;
- pre-RunResult proof deterministic and no replay;
- five live lumber localization deletions;
- five historical compatibility rows retained;
- presentation slot `ending/lumber-stay` deleted;
- historical display non-interactive.

These authority facts do not by themselves make the future integrated rows PASS.

## Exact five live localization deletions

- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `unlock.vitality.label`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`

## Exact five historical compatibility rows retained

- `legacy.ending.lumber-stay.title`
- `legacy.ending.lumber-stay.description`
- `legacy.perk.lumber-stay-vitality.label`
- `ui.ending.state.historical`
- `ui.legacy.historicalTitle`

## Gate command prelude

On the exact post-assembly candidate SHA:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then run all phases from:

`CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json@dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

Then run:

1. current accepted player-facing golden gate;
2. current accepted save/migration golden gate;
3. lumber F4/F5 coverage;
4. newer current authoritative adjacency tests for systems present on the integration base.

## Third-value hard stop

For every v53-owned scalar/keyed semantic field:

- expected historical/pre-value -> desired golden value: allowed;
- desired golden value already present: no-op;
- any third value: **FAIL / STOP / REVIEW**.

Never overwrite a third value automatically.

If a newer explicit Product authority owns the third value, obtain Leader disposition before proceeding.

## Whole-file replacement hard stop

**FAIL / STOP** if assembly attempts to copy a historical shared production file wholesale over the live integration base.

Only semantic operations by exact stable ID/symbol/key are allowed for shared owners.

The dry-run must explicitly inspect the diff for unrelated loss in:

- schema/migrations;
- Strong Meta;
- Palace;
- Secret Debt/D51;
- Activity;
- Night;
- School;
- ending transaction/RunResult;
- localization/presentation/UI;
- any newer accepted system present on the live base.

## Immediate NO-GO conditions

Mark dry-run `FAIL` and stop if any occurs:

- valid stored Lust rewritten to 5;
- fresh life not Lust 5;
- wages differ from 35/37 without newer Product authority;
- ordinary wage exceeds 120;
- non-ordinary wage captured by cap120 helper;
- D47 mapping differs;
- D47 packages consume Strong Meta slots;
- Hard Work threshold differs from 50;
- canonical ordinary endings != 40;
- live `lumber-stay` returns;
- live generic `vitality` acquisition returns;
- historical Energy stacks above +1;
- historical evidence fabricates modern ending/Strong Meta/Hard Work/Palace identity;
- RunResult/transaction proof changes or replays;
- exact five-key live deletion set drifts;
- exact five-key historical retention set drifts;
- `ending/lumber-stay` remains live;
- historical display becomes interactive;
- any third-value conflict is unresolved;
- any unrelated current system is reverted by snapshot replacement;
- typecheck/validate/build or any required focused gate is red.

## v61 disposition

Authority/contract dry-run preparation:

**PASS**

Integrated candidate:

**NOT-RUN**

Production gates:

**NOT-RUN**

Full CI:

**NOT-RUN**

Production mutation by Chat4:

**NONE**
