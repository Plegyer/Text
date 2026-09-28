# Post-PR59 bilingual visible-debt audit v1

Status: COMPLETE / CURRENT_NORMAL_PLAYER_DEBT_RECORDED

This queue item originated after PR59. PR60 and PR61 merged during the QA wave, so the final inventory uses latest current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Current root localization:
- 714 keys;
- missing RU 0;
- missing EN 0.

Excluded:
- debug/internal-only UI;
- Product-open content;
- worker-only staged material.

Closed since PR59:
- PR60 shipped safe old-boundary v3 route static;
- PR61 shipped all 9 current ending title/description pairs;
- PR61 shipped 16 exact ordinary default-scene action result title/body pairs;
- PR61 wired ending cards and those ordinary result screens.

## Remaining normal-player debt

### 1. Selected Forest route status
The Activity line still displays raw persisted:
- `logging-road`;
- `old-boundary`.

Existing bilingual route-option labels should be reused at render time.

Persisted routeId must stay unchanged.

### 2. Activity checkpoint
The same Activity line displays `activity.checkpoint` directly.

If the checkpoint is a machine identifier, it remains implementation text in both locales.

### 3. Seasonal profession result bodies
The ten current career `*.shift` actions each have four seasonal scenes: 40 current result scene identities.

Root has bilingual profession action labels/descriptions, but no `action.<shift>.scene.<season>.default.text` keys.

The current result consumer correctly refuses to guess scene identity for multi-scene actions, so these result bodies fall back to the authored English scene text.

Debt:
40 seasonal profession result bodies plus a stable scene-aware presentation consumer.

### 4. Ordinary action card descriptions
For the 16 PR61 ordinary actions:
- localized label: 16/16;
- localized immediate result body: 16/16;
- localized `action.<id>.description`: 0/16.

Action-list cards can therefore still show Russian source description in EN.

### 5. Stats profession names
Stats profession summary renders raw catalog `.label` for the ten current profession actions.

Those source labels are English, so RU Stats can show English profession names despite existing bilingual action-label keys.

### 6. Work effect tags
Work-card effect tags use `labels[e.key]` directly.

In EN, these stat-effect names can remain Russian.

Existing generic stat/resource label helpers should be reused.

### 7. Legacy inheritance names
Legacy inheritance renders `state.meta.unlocks.map(k => labels[k])`.

In EN, these names remain Russian source labels.

Stable Meta unlock IDs must not be renamed to fix presentation.

### 8. Lumber ending requirement semantic values
Condition grammar is localized, but current Lumber ending requirements still insert raw stable values such as:
- `lumber`;
- `completed_shifts`;
- `management-school-ready`;
- `forewoman-problem-resolved`;
- `lumber.foreman`;
- `route-professional`;
- `forest-truth-known`;
- `forest-problem-resolved`.

This needs a semantic display-name layer, not gameplay ID changes.

### 9. Ordinary action Journal rows
PR54 dynamic Journal localization applies to event-choice refs.

Ordinary action completion still has no stable ordinary-action Journal ref, so historical/current ordinary action rows remain stored source prose.

PR61 fixes the immediate result screen only.

Do not fuzzy-match prose.

### 10. Ending completion / epilogue history
Ending cards are localized, but completion/epilogue Journal text is separate stored prose and can remain source-language on inactive-run/history presentation.

### 11. Generic Night fallback
Primary Night/lodging stages are localized, but the generic fallback still renders raw `night.phase` if that fallback becomes visible.

### 12. Runtime errors
Command failures can surface raw `Error.message`; some engine error messages remain source-language rather than stable-code localized.

### 13. Remaining event localization
Six current root event IDs still have zero root event-localization coverage:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

Reachability/frequency differs, so this audit does not claim equal user impact for all six.

## Not counted as current normal-player blocker

Not counted:
- Event Inspector/debug strings;
- Product-open teacher/Hunter/token/Secret Debt/Palace content;
- unexported animation source frames;
- old pre-feature Journal entries intentionally kept as text-only fallback;
- generic root media-alt debt without current reachability proof.

## Priority

Highest-value next fixes:
1. localized selected-route status;
2. seasonal profession result bodies with stable scene identity;
3. ordinary action card descriptions;
4. Stats profession label helper reuse;
5. Work effect-tag helper reuse;
6. Meta unlock display labels;
7. semantic names for ending requirement IDs;
8. ordinary action Journal identity;
9. ending history/epilogue localization.

Verdict:
`PARTIAL_BILINGUAL`.
