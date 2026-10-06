# Chat 4 — Strong Meta UI Exact-Head QA v43

Status: **EXACT-HEAD QA GREEN — READY FOR CHAT 2 CONTENT ASSEMBLY**  
Owner: Chat 4  
QA branch: `chat4/qa-strong-meta-ui-v41`

## Frozen producer target

Required implementation head:

`fac645878ebd726f50fd1364ac72414796755a2d`

Producer branch:

`chat6/strong-meta-ui-closure-v42`

This SHA is the exact implementation+localization+focused-test state before the later Chat6 v42-v44 report/document commits.

Chat 4 did not mutate the producer branch.

## v41 — exact-head build gate

Successful workflow:

- workflow: `chat4 strong meta ui exact-head qa v41-v43`
- run: **37480616854**
- job: **112327451110**
- runner: self-hosted Windows X64 (`HOME-PC`)
- Node: **22.18.0**
- npm: **10.9.3**

The workflow checked out:

`fac645878ebd726f50fd1364ac72414796755a2d`

and the explicit SHA guard printed:

```text
expected=fac645878ebd726f50fd1364ac72414796755a2d
actual=fac645878ebd726f50fd1364ac72414796755a2d
```

Result:

- exact SHA guard: **PASS**
- `npm ci`: **PASS**
- `npm run typecheck`: **PASS**
- `npm run validate`: **PASS**
- `npm run build`: **PASS**

Validation output:

```text
Content OK: 92 packs, 369 events, 39 actions, 43 endings.
```

Build output:

```text
Built renderer, content catalog and desktop save validator.
```

The npm install reported existing dependency audit warnings (8 moderate, 1 high), but installation completed successfully and those warnings did not fail the requested gate.

A post-job npm cache-save warning occurred because `gzip` was unavailable on the self-hosted runner. It happened after every requested gate and focused test had already succeeded; the workflow/job conclusion remained **success**. This is runner cache infrastructure, not a product/runtime failure.

## First-run infrastructure false start

Initial QA workflow run:

- run: **37480309458**
- job: **112326384078**

The checkout itself successfully reached the exact producer SHA and logged:

`HEAD is now at fac64587 Chat6 v43: add modal accessibility localization tests`

but the custom guard step used `pwsh`, which is not installed on this Windows runner:

```text
pwsh: command not found
```

Therefore all npm/test steps were skipped.

This run provides no producer QA verdict.

Chat 4 repaired only the QA workflow to use built-in Windows PowerShell and reran the entire requested gate. No producer file was changed.

## v42 — focused Strong Meta selector / registry / snapshot / save-reload QA

Command:

```text
node --experimental-strip-types --test   tests/strong-meta-player-ui-v42.test.ts   tests/strong-meta-engine-integration-v7.test.ts   tests/strong-meta-registry-v7.test.ts
```

Result:

- tests: **20**
- pass: **20**
- fail: **0**
- skipped: **0**

Focused coverage proves:

- owned Strong Meta rewards are not silently auto-selected;
- accepted Keystone selection is player-writable through the existing selector seam;
- `palace.true.cap-200` remains a **Specialist**;
- Specialist capacity remains **2**;
- a third unselected Specialist is blocked at capacity;
- selected Specialists remain removable;
- automatic knowledge / Source Method is visible as automatic knowledge and is not selectable;
- ordinary Hard Work packages remain outside Strong Meta slots;
- preferred selection survives local save/reload;
- before `finishCreation`, `run.strongMetaSnapshot` remains unresolved;
- `finishCreation` freezes the selected Keystone/Specialists plus automatic knowledge into the current-run snapshot;
- registry validation rejects unowned, unknown, wrong-class and over-capacity selection;
- current snapshot resolution remains deterministic;
- future preference changes do not rewrite an existing current-run snapshot;
- save/reload preserves snapshot/runtime counters;
- schema-5 migration remains conservative;
- protected Meta import preserves preference while unioning only permanent ownership/knowledge;
- D23 Palace qualification is not altered by selected Strong Meta rewards;
- Work Rhythm save/reload adjacency remains valid;
- Secret-Debt-style queued next-day loss remains a relative loss after Work Rhythm.

## v42/v43 — modal ARIA / localization / accessibility QA

Command:

```text
node --experimental-strip-types --test   tests/modal-aria-localization-v43.test.ts   tests/strong-meta-ui-localization-v42-v43.test.ts   tests/presentation-locale-accessibility-parity-v7.test.ts
```

Result:

- tests: **7**
- pass: **7**
- fail: **0**
- skipped: **0**

Focused coverage proves:

- normal modal panels expose non-empty localized accessible names;
- raw internal panel IDs are not exposed as dialog names;
- RU panel labels resolve;
- EN panel labels resolve after language switch;
- editor route remains human-readable;
- catalog route resolves exactly to:
  - RU: `Инспектор событий`
  - EN: `Event inspector`
- the source no longer binds generic modal `aria-label` directly to raw `panel`;
- v42/v43 Strong Meta UI and modal localization rows have RU/EN parity;
- the UI uses the existing Strong Meta command seam rather than inventing a second selector mechanic;
- Hard Work remains a separate creation section;
- adjacent presentation alt/caption localization parity remains green.

## Focused total

Combined focused executable total:

**27 / 27 PASS**

There were no focused failures, skips, or cancellations.

## Static implementation-delta verification

The implementation interval from the published task-bundle base:

`ce6753d482968581b0c2945f4b7c05b41a5d6e58`

through the frozen implementation head:

`fac645878ebd726f50fd1364ac72414796755a2d`

changes only:

Production surface:

- `src/ui/app.ts`
- `content/localization.json`

Focused tests:

- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

No changes in this implementation interval to:

- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/strongMeta.ts`
- gameplay definitions
- save schema
- Strong Meta reward math
- registry capacities
- reward ownership semantics.

This matches the Chat6 handoff claim that the closure is UI/localization/wiring-only.

## Acceptance findings

### Selector closure

**PASS.**

The player-facing selector is executable and preserves the accepted Strong Meta model:

- max 1 Keystone;
- max 2 Specialists;
- no hidden third slot;
- cap-200 consumes a normal Specialist slot;
- automatic knowledge consumes no selection slot;
- Hard Work packages remain separate;
- ownership does not imply auto-selection;
- preference is distinct from current-run frozen snapshot.

### Save/reload adjacency

**PASS.**

Both the player UI and engine integration coverage verify persistence boundaries:

- pre-run preference survives reload;
- current-run resolved snapshot survives reload;
- changing future preference does not mutate an existing snapshot;
- runtime counters remain validated;
- migration/import behavior remains conservative.

### Modal accessibility

**PASS.**

The generic overlay no longer exposes raw route IDs in its accessible name.

RU/EN accessible names are executable in the built renderer, including nested editor/catalog routes.

### Localization/accessibility adjacency

**PASS.**

The new selector/modal rows have RU/EN parity and the adjacent presentation accessibility suite remains green.

## Assembly guidance

Chat 2 should consume the producer branch state through the frozen implementation head semantics, while respecting later documentation-only commits.

Because this producer changes the shared:

- `src/ui/app.ts`
- `content/localization.json`

Chat 2 should still compose those changes semantically/key-wise onto its actual content-assembly base rather than wholesale replacing newer shared files.

Preserve any later:

- Secret Debt UI/localization;
- Palace UI/localization;
- Activity UI/localization;
- D39 live consumer content;
- other accepted content overlays.

After content assembly, Chat 2 should rerun the corresponding focused UI/Strong Meta suites on the assembled head.

## Scope boundary

This QA did **not** run full CI.

It ran only the exact requested:

- exact-head guard;
- npm install;
- typecheck;
- content validation;
- build;
- focused Strong Meta selector/registry/snapshot/save-reload tests;
- focused modal ARIA/localization/accessibility tests.

## Final disposition

The frozen Strong Meta UI closure implementation:

`fac645878ebd726f50fd1364ac72414796755a2d`

is **exact-head green** for the requested v41-v43 QA scope.

**v41 PASS**  
**v42 PASS — 27/27 focused combined**  
**v43 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_CHAT2_CONTENT_ASSEMBLY**
