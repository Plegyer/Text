# Post-PR59 bilingual visible-debt audit v1

Status: COMPLETE / CURRENT_NORMAL_PLAYER_DEBT_RECORDED

This queue item originated after PR59. PR60, PR61 and PR62 merged during the QA wave, so the final inventory uses latest current main:
`1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`.

Current root localization:
- 744 keys;
- missing RU: 0;
- missing EN: 0.

Excluded:
- debug/internal-only UI;
- Product-open content/mechanics;
- worker-only staged material.

## Closed since PR59

PR60:
- safe old-boundary v3 route-specific static shipped.

PR61:
- all 9 current ending title/description pairs shipped RU+EN;
- 16 exact ordinary default-scene action result title/body pairs shipped RU+EN;
- Legacy ending cards consume localization;
- mapped ordinary immediate result screens consume localization.

PR62:
- selected Forest route now renders bilingual option label instead of raw routeId;
- route checkpoint displays a localized route-option label when it is a current `forest.route.*` option;
- Stats profession summary uses bilingual profession labels;
- Legacy inheritance unlocks use bilingual stable unlock labels.

Do not continue listing those closed surfaces as open debt.

## 1. Seasonal profession result bodies

The ten current `*.shift` profession actions each have four seasonal scenes:
`40` current result scene identities.

Root has bilingual profession/action labels and descriptions, but no:
`action.<shift>.scene.<season>.default.text`
result-body keys.

The current result consumer correctly does not guess a scene identity for multi-scene actions, so the immediate result body still falls back to authored English source text.

Debt:
`40 SEASONAL_PROFESSION_RESULT_BODIES + STABLE_SCENE CONSUMER`.

## 2. Ordinary action card descriptions

For the 16 PR61 ordinary actions:
- localized label: 16/16;
- localized immediate result body: 16/16;
- localized `action.<id>.description`: 0/16.

The action-list card requests `action.<id>.description`, so EN may still fall back to Russian source descriptions for these ordinary actions.

Debt:
`16 ORDINARY_ACTION_DESCRIPTION_KEYS`.

## 3. Work effect tags

Current Work-card effect tags still use:
`labels[e.key]`
directly.

In EN, stat-effect names can therefore remain Russian.

PR58 already supplies generic stat/resource labels; no new stat IDs are needed.

Debt:
`WORK_EFFECT_TAG_GENERIC_LABEL_CONSUMER`.

## 4. Lumber ending requirement semantic values

Condition grammar is localized, but current typed condition explanation still inserts raw stable semantic values for some career/relationship fields.

Visible examples can include:
- `lumber`;
- `completed_shifts`;
- `management-school-ready`;
- `forewoman-problem-resolved`;
- `lumber.foreman`;
- `route-professional`;
- `forest-truth-known`;
- `forest-problem-resolved`.

Debt:
`SEMANTIC_NAME_LAYER`.

Do not rename persisted IDs to solve display debt.

## 5. Ordinary action Journal rows

PR54 ref-backed Journal localization covers event-choice outcomes.

Ordinary action completion still has no stable ordinary-action Journal ref. PR61 localizes the immediate result screen only.

Historical/current ordinary action Journal rows therefore remain stored source prose and cannot safely rerender by locale.

Debt:
`ORDINARY_ACTION_JOURNAL_IDENTITY`.

No fuzzy prose matching.

## 6. Ending completion / epilogue history

Ending cards are bilingual, but ending completion/epilogue Journal text remains separate stored prose and can remain source-language in inactive-run/history presentation.

Debt:
`ENDING_EPILOGUE_HISTORY_PRESENTATION`.

## 7. Generic Night fallback

Primary LodgingResolution and VoluntaryNightChoice screens are localized.

The generic Night fallback still renders raw:
`night.phase`
if that fallback is visible.

Debt:
`NIGHT_PHASE_DISPLAY_LABEL`.

## 8. Runtime errors

Command failures can surface raw `Error.message`.

Some engine errors remain source-language strings without stable semantic error-code localization.

Debt:
`RUNTIME_ERROR_PRESENTATION_LAYER`.

Translated error prose must never become gameplay control flow.

## 9. Remaining event localization

Six current root event IDs still have zero root event-localization coverage:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

Reachability/frequency differs; this audit does not claim equal user impact for all six.

## Not counted as current normal-player blocker

Not counted:
- Event Inspector/debug strings;
- Product-open teacher/Hunter/token/Secret Debt/Palace authored content;
- unexported animation source frames;
- old pre-feature Journal entries intentionally preserved as text-only fallback;
- generic root media-alt debt without current reachability proof.

## Priority

Highest-value next fixes:
1. seasonal profession result bodies + stable scene consumer;
2. ordinary action card descriptions;
3. Work effect-tag generic-label reuse;
4. semantic display names for Lumber ending requirement IDs;
5. ordinary action Journal identity;
6. ending history/epilogue localization;
7. stable localized runtime errors.

## Verdict

Current product remains:
`PARTIAL_BILINGUAL`.

PR62 closes the selected-route, Stats profession-name and Legacy unlock-name debt; the remaining normal-player mixed-language surfaces above remain open.
