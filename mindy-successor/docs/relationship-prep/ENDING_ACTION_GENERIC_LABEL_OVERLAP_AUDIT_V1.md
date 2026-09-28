# Ending / Action Generic-Label Overlap Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`

Audited production patches:
- `content/ending-localization-production-v2.fixture.json`
- `content/ordinary-action-result-localization-v3.fixture.json`

Compared against shipped root families:
- generic labels/hints: `stat.*`, `metric.*`, `resource.*`, `item.*`, `housing.*`, `season.*`, `unlock.*`, `ui.*`;
- legacy event localization: `event.*`;
- career action labels/descriptions: `action.<career>.shift.*`;
- School localization namespaces.

## Result

- item-146/item-147 keys: 50
- exact root-key collisions: 0
- cross-family namespace collisions: 0

No production-patch key duplicates a shipped generic label/hint or legacy event localization key.

## Semantic separation

### Ending titles/descriptions

Use only:

- `ending.<endingId>.title`
- `ending.<endingId>.description`

Do not reuse:
- `unlock.<id>.label` for ending titles;
- `ui.legacy.*` for per-ending copy;
- event-choice text for ending descriptions.

Those namespaces represent different presentation concepts.

### Ordinary action results

Use only:

- `action.<actionId>.label`
- `action.<actionId>.scene.<sceneId>.text`

Do not reuse:
- generic item/resource/stat labels as whole action titles;
- `event.*` text even when an action can trigger an event;
- career `action.<career>.shift.*` keys for legacy ordinary action IDs;
- Forest Activity route/result keys for `forest-search`.

`forest-search` remains the current legacy/tutorial ordinary action; its action result text is distinct from Forest Activity result content.

## Shared generic labels remain dependencies, not duplicates

Requirement and delta rendering may compose generic labels such as:
- stat/metric labels;
- item/resource labels;
- housing/season labels.

Those values are subcomponents of UI grammar and do not replace the ending/action title/body keys in items 146/147.

## Legacy event boundary

When an ordinary action triggers a blocking event:
- ordinary action result identity remains `action.*`;
- event scene/choice presentation remains `event.*`;
- a later event-choice journal ref remains an event identity.

Do not collapse the two namespaces.

## Cross-owner exclusions

No item-146/item-147 key is introduced under:
- School course namespaces;
- Night/lodging namespaces;
- poverty;
- Foreman relationship namespaces;
- Forest Activity result namespaces.

## Conclusion

Items 146/147 are semantically additive and namespace-clean against shipped generic labels/hints and legacy event localization.
