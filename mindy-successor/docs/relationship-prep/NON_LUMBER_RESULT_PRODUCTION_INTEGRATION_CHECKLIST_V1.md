# Non-Lumber Result Production Integration Checklist v1

Date: 2026-09-27
Owner stream: Chat 5
Purpose: exact Lead acceptance checklist for items 37–46.

## 1. Root localization merge

- Copy only approved RU+EN strings from `non-lumber-career-result-localization-v1.fixture.json`.
- Confirm all 36 result-body keys are additive or exact-identical against the integration head.
- Keep existing action IDs, scene IDs, result presentation IDs and media IDs.
- Keep existing action label keys as result-title keys.
- Do not copy gameplay fixture metadata into root localization.
- Do not create per-locale actions, scenes, events, conditions, effects or rewards.

Expected body key form:

`action.<action-id>.result.<season>.default.text`

Expected title key form:

`action.<action-id>.label`

## 2. Shared UI result title/body consumption

Lead-owned UI/presentation change must make an ordinary career result screen resolve:

- title from `action.<lastAction.id>.label`;
- body from the stable result key corresponding to the authoritative selected seasonal scene.

Fallback must remain the existing embedded action label/scene text if a localization key is absent.

UI localization must not:
- dispatch the action again;
- choose a different scene;
- change media;
- mutate `lastAction`;
- consume gameplay RNG;
- write career progression.

## 3. Same semantic presentation identity

For each career, before and after localization integration, assert the result presentationId remains:

- `job/satyr-maid/result/default`
- `job/undead-farm/result/default`
- `job/tavern/result/default`
- `job/hunter/result/default`
- `job/guard/result/default`
- `job/merchant/result/default`
- `job/artist-geisha/result/default`
- `job/assassin/result/default`
- `job/prostitute/result/default`

Locale must not become part of presentationId.

## 4. Same transaction result

For a fixed pre-action Save and fixed action:

- same `lastAction.id`;
- same `lastAction.deltas`;
- same `lastAction.media`;
- same action-count increment;
- same career counter/stage/fact result;
- same wage result;
- same current-day Energy result;
- same RNG state after the action;
- same Save gameplay state.

Localization changes strings only.

## 5. RU ↔ EN switch invariance

On an already-produced result screen:

1. snapshot gameplay state;
2. render RU;
3. switch to EN;
4. render EN;
5. switch back to RU;
6. compare gameplay state to the snapshot.

Acceptance:
- RU and EN title/body differ where translations differ;
- presentationId remains identical;
- deltas remain identical;
- actionCounts remain identical;
- no extra wage;
- no extra Energy charge;
- no repeated career effect;
- no RNG advance;
- no Save gameplay mutation.

## 6. Career-specific boundaries

- Hunter: ordinary `hunter.shift` only; no Forest/Old Boundary/clue/token changes.
- Assassin: presentation-only ordinary covert work; no new mechanics or rewards.
- Prostitute: non-explicit voluntary professional copy only.
- Satyr Maid and Undead Farm: preserve existing first-shift career transitions exactly.
- Lumber: reference-only in item 44; do not modify Lumber through this integration.

## 7. Exact-head CI

Run acceptance on the exact integration commit that contains:
- root localization merge;
- shared UI consumption change;
- any associated Lead/QA tests.

Record the tested commit SHA. A green run on an earlier head is not acceptance for a later integration head.

Required checks should include the existing project suite plus targeted localization/UI invariance coverage selected by Lead/QA.

## 8. Selective integration only

Do **not** wholesale-merge `chat5/relationships-night-content-next`.

Lead should selectively copy/reconcile only reviewed files/strings. The worker branch contains multiple staging/audit waves and is intentionally not a single production merge unit.

## Final acceptance

Production acceptance is complete only when:
- root strings are present;
- ordinary result UI consumes them with fallback;
- all nine natural paths render RU and EN correctly;
- gameplay identity and state are invariant;
- exact-head CI is green;
- no unrelated worker-branch content was merged.
