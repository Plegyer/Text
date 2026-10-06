# Chat 4 — Legacy / D46 / D47 Release Evidence Ledger v59

Status: **COMPACT RELEASE EVIDENCE — PRE-INTEGRATION**
Owner: Chat 4
Branch: `chat4/legacy-release-evidence-v59`

## Authorities

Accepted compact cross-golden handoff:

`mindy-successor/docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONSISTENCY_v58.md`

Blob:

`3a3038066809e1f391320ff9e3b0440e021ce36e`

Referenced mechanics operations:

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json`

Blob:

`17282cf11436d54d49915f44ed84de56a0eebf7c`

Referenced focused gate:

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`

Blob:

`dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

Locked Product authority:

`mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`

Blob:

`f2dac5cecfa4953aacc42aea2711e825a359097b`

Leader checkpoint:

`mindy-successor/docs/tasks/LEADER1_CHECKPOINT_2026-10-06_LATE.md`

Blob:

`0e0d203bb2b8ce690e176283e860a9f73c19d707`

## Evidence ledger

| Evidence item | Accepted evidence | Pre-integration status | Post-integration status |
|---|---|---:|---:|
| D46 fresh new-life Lust is 5 | v58 + locked D46 | PASS | NOT-RUN |
| Existing/stored Lust is preserved exactly | v58 + locked D46 | PASS | NOT-RUN |
| Lumber ordinary wage base is 35 | locked D46 | PASS | NOT-RUN |
| Other nine ordinary wage bases are 37 | locked D46 | PASS | NOT-RUN |
| Ordinary shift wage cap is 120 | locked D46 | PASS | NOT-RUN |
| Cap 120 applies only to ten ordinary professions | v58/v53 reference + locked D46 | PASS | NOT-RUN |
| D47 has exactly ten profession packages | v58 + locked D47 | PASS | NOT-RUN |
| D47 selectable unit is whole profession package | locked D47 | PASS | NOT-RUN |
| D47 packages remain outside Keystone/Specialist slots | v58 + locked D47 | PASS | NOT-RUN |
| Ordinary Hard Work threshold is exactly 50 shifts | locked D17/D26/D47 | PASS | NOT-RUN |
| Canonical ordinary endings after lumber retirement = 40 | v58 + Leader checkpoint | PASS | NOT-RUN |
| Live `lumber-stay` ending absent | v58 | PASS | NOT-RUN |
| Live generic `vitality` acquisition absent | v58 | PASS | NOT-RUN |
| Historical identity is `legacy.lumber-stay.vitality` only | v58 | PASS | NOT-RUN |
| Historical lumber Energy bonus = exactly +1 once | v58 + Leader checkpoint | PASS | NOT-RUN |
| Existing historical RunResult/transaction preserved exactly | v58 | PASS | NOT-RUN |
| Pre-RunResult lumber completion gets deterministic proof without reward replay | v58 | PASS | NOT-RUN |
| Profile merge/reload dedupes legacy perk | v58 | PASS | NOT-RUN |
| Exact five live lumber localization rows deleted | v58 | PASS | NOT-RUN |
| Exact five historical compatibility localization rows retained | v58 | PASS | NOT-RUN |
| Presentation slot `ending/lumber-stay` deleted | v58 | PASS | NOT-RUN |
| Historical lumber display remains non-interactive | v58 | PASS | NOT-RUN |
| Cross-golden contract conflicts | v58: 15/15 consistent, 0 conflicts | PASS | NOT-RUN |
| v57 cross-contract validator | v58: 10/10 PASS | PASS | NOT-RUN |
| Selective assembly on actual Chat2 integration head | future Chat2 work | NOT-RUN | NOT-RUN |
| v54 focused gate on exact integrated head | future gate | NOT-RUN | NOT-RUN |
| final Chat6 player-facing golden gate on assembled head | future gate | NOT-RUN | NOT-RUN |
| final Chat3 save/migration closure including lumber F4/F5 | future gate | NOT-RUN | NOT-RUN |
| release/full CI | Chat2/Leader-owned later stage | NOT-RUN | NOT-RUN |

No current row is `FAIL`.

`NOT-RUN` is intentional where evidence requires a future integrated production head.

## Exact live-retirement key contract

Live localization deletions, exactly five:

- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `unlock.vitality.label`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`

Historical compatibility rows retained, exactly five:

- `legacy.ending.lumber-stay.title`
- `legacy.ending.lumber-stay.description`
- `legacy.perk.lumber-stay-vitality.label`
- `ui.ending.state.historical`
- `ui.legacy.historicalTitle`

Presentation deletion:

`ending/lumber-stay`

## Future exact gate execution

On the future exact integrated Chat2 SHA:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then execute the complete focused contract from:

`CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json@dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

in its recorded phase order.

Then execute, on the same assembled candidate:

1. final Chat6 player-facing golden validator/gate;
2. final Chat3 save/migration closure, including historical lumber F4/F5;
3. any newer authoritative focused tests for owners already present on the live integration base.

Do not substitute historical test filenames for newer accepted equivalents.

Full CI remains outside this Chat4 bundle.

## Mandatory post-integration evidence fields

The future release evidence must record:

- exact integrated branch;
- exact integrated SHA;
- exact v54 gate artifact SHA/blob used;
- `typecheck`: PASS/FAIL;
- `validate`: PASS/FAIL;
- `build`: PASS/FAIL;
- every v54 phase: PASS/FAIL;
- player-facing golden gate: PASS/FAIL;
- save/migration golden gate: PASS/FAIL;
- lumber F4 existing-RunResult case: PASS/FAIL;
- lumber F5 pre-RunResult case: PASS/FAIL;
- canonical ordinary ending count: observed value;
- live `lumber-stay`: present/absent;
- live generic `vitality`: acquirable/not-acquirable;
- historical legacy Energy applications: observed maximum;
- full CI: PASS/FAIL/NOT-RUN.

## Third-value stop rule

For every v53-owned scalar/keyed semantic value:

- expected historical/pre-value -> desired golden value: allowed;
- desired golden value already present: idempotent/no-op;
- any third value: **STOP / REVIEW**.

Do not overwrite a third value automatically.

A newer explicit Product authority requires Leader disposition rather than forcing the older golden value.

## Whole-file replacement stop rule

Historical producer snapshots are never valid wholesale replacements for current shared owners.

STOP if assembly attempts whole-file replacement of any shared production owner instead of applying the v53 semantic operations by stable ID/symbol/key.

This includes, at minimum, shared definitions, engine, Hard Work Meta, localization, presentation, UI, schema and content owners referenced by v53.

## Additional hard stops

STOP if:

- migration rewrites valid stored Lust to 5;
- a fresh new life does not start at Lust 5;
- an ordinary wage base/cap differs from 35/37/120 without newer Product authority;
- a non-ordinary wage is captured by the ordinary cap;
- D47 packages enter Strong Meta slots;
- Hard Work threshold differs from 50;
- canonical ordinary ending count differs from 40;
- live `lumber-stay` or generic `vitality` returns;
- historical Energy stacks above +1;
- historical lumber fabricates Strong Meta, Hard Work or Palace identity;
- existing RunResult/transaction proof changes or replays;
- either five-key localization set drifts;
- `ending/lumber-stay` remains live in presentation;
- historical display becomes interactive;
- a disagreement is resolved by chronology or last-write-wins.

## v59 disposition

Accepted pre-integration evidence:

**PASS**

Cross-golden semantic conflict:

**NONE**

Integrated production proof:

**NOT-RUN**

Full CI:

**NOT-RUN**

Production mutation:

**NONE**
