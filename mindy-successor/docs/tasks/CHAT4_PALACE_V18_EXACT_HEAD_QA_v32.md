# Chat 4 — Palace v18 Exact-Head QA v32

Status: **EXACT-HEAD QA COMPLETE — ASSEMBLY REPAIRS REQUIRED**  
Owner: Chat 4  
QA branch: `chat4/palace-exact-head-qa-bundle-v32`

## Frozen producer

Verified producer:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Branch/head comparison:

- status: **identical**
- ahead: **0**
- behind: **0**

The producer branch was not mutated.

## Exact-head executable run

Workflow:

`Chat4 Palace v32-v34 exact-head QA`

Final evidence run:

`37465180151`

v18 job:

`112274304146`

Runner:

- self-hosted Windows X64
- Node `22.18.0`

Exact SHA guard:

**PASS**

Verified checkout:

`67f948d185883d8e706dad522e5010bff8e2bd48`

No full CI was run.

## Gate results

Real step outcomes from the aggregate guard:

| Gate | Result |
| --- | --- |
| exact SHA | PASS |
| `npm ci` | PASS |
| `npm run typecheck` | **FAIL** |
| `npm run validate` | **FAIL** |
| `npm run build` | PASS |
| focused Palace v15-v18 roster | **FAIL — 4 pass / 6 fail** |

The workflow used `continue-on-error` only to collect downstream evidence after the first failure. The final aggregate job deliberately remained red.

## Blocker V18-QA-1 — typed capability declaration is incomplete

`npm run validate` fails while loading the Palace catalog with:

`Недопустимая typed capability: read worldFact palace.outcome.service-life-ready`

The exact-head pack:

`content/packs/palace-outcome-finalize.json`

uses each outcome-ready fact as a negative `worldFact` condition before writing it, but `capabilities.reads.worldFacts` declares only:

- `palace.access-granted`
- `palace.progression-complete`
- `palace.prep.service-life`
- `palace.prep.court-power`
- `palace.prep.inner-truth`

while `capabilities.writes.worldFacts` contains:

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

The first missing read declaration stops validation at Service Life. The assembly repair is mechanically narrow: when the pack is selectively assembled, declare all three `palace.outcome.*-ready` facts in the pack's read capabilities because the existing conditions already read them. This does not authorize any Product behavior change.

Because catalog construction fails at this capability guard, the Palace-focused executable suites that import the catalog fail before their behavioral assertions can run.

## Blocker V18-QA-2 — producer tests do not pass repository typecheck

`npm run typecheck` reports test-only TypeScript diagnostics in:

- `tests/palace-prince-narrative-producer-v18.test.ts`
- `tests/palace-rich6-runtime-v15.test.ts`

Observed categories:

- TS7006 implicit-`any` callback parameters;
- TS2339 access to `variants` through an inferred `{}`;
- TS18048 optional `catalog.definitions.quests` / `careers`.

No production TypeScript diagnostic was reported in this run.

Chat 2 should adapt the imported tests to the current typed catalog surface on the assembly branch. Do not rewrite Product mechanics to make historical test typing compile, and do not mutate the frozen v18 producer.

## Required v32 behavioral scope

The exact v18 source and its focused suites contain the required contract coverage for:

- D23 as the only Palace entry seam;
- deterministic run-local invitation/access;
- exactly 15 structural duties;
- one structural duty per calendar day;
- one support action per day;
- 1 Energy structural-duty cost;
- bounded Palace wage formula and no duty 16;
- milestones 2 / 5 / 8 / 12 / 15;
- duty 15 -> Outcome Ready / progression complete;
- exact 12 progression stats at >=91 for Prince readiness;
- Lust excluded from the Prince gate;
- deterministic four-phase confrontation;
- failure/back-out returning to retryable ready state;
- `palace.prince-defeated` written only by phase-4 success;
- Return Home remaining separately eligible and explicitly committed;
- Prince confrontation state being save/reload safe;
- Palace remaining outside ordinary Hard Work;
- no Palace ownership of Secret Debt forced-Night state.

However, the current exact head is **not executable-green for this scope**, because the catalog capability blocker prevents those assertions from completing. This distinction is intentional: authored assertions are present, but exact-head runtime verification is blocked.

## Secret Debt / forced-Night firewall

Static inspection of the v15/v18 roster confirms the intended firewall is explicitly tested:

- Secret Debt next-day forced-Night modifier remains authored outside Palace;
- Palace duty does not create or clear the forced-Night provenance;
- no Palace Night choice is introduced;
- Palace does not become ordinary Hard Work ownership.

This must be re-proved executable on the post-Secret-Debt+D51 assembly branch after V18-QA-1 is repaired.

## Save/reload firewall

The v15/v18 suites explicitly cover persisted Palace stage/count/daily locks, milestone/finalize latching, confrontation phase persistence, retry, defeat-once behavior, and explicit Return Home commit separation.

These assertions must also be re-run after the catalog capability repair. No claim of exact-head executable PASS is made here.

## Disposition

The frozen source identity is verified, `npm ci` and build are reproducible, and the intended Palace contract is inspectable. Exact-head QA found two concrete preassembly defects:

1. missing Palace outcome-ready typed read capabilities;
2. non-compiling historical Palace test typings.

Therefore v18 is a **selective assembly source with required assembly-branch repairs**, not a green executable artifact.

Chat 2 must not merge/release Palace until the repaired assembled branch passes:

`npm ci` -> `typecheck` -> `validate` -> `build` -> focused Palace behavioral/save-reload/Secret-Debt adjacency tests.

**v32 COMPLETE**
