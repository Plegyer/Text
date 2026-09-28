# Foreman Semantic Localization Handoff v3

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`
Scope: queue items 181–191
Integration mode: selective data merge/shared presentation wiring only.

## SEMANTIC_LABELS_READY

Primary fixture:
- `prior-work/astra/prototype-m3.2/content/relationship-foreman-semantic-labels-v1.fixture.json`

Source docs:
- `FOREMAN_SEMANTIC_DISPLAY_DEBT_AUDIT_V1.md`
- `FOREMAN_RELATIONSHIP_STAGE_LABELS_RU_V1.md`
- `FOREMAN_RELATIONSHIP_STAGE_LABELS_EN_V1.md`
- `FOREMAN_COUNTER_FACT_LABELS_RU_EN_V1.md`
- `FOREMAN_ROUTE_CHOICE_LABELS_RU_EN_V1.md`

Prepared keys: 8 total.

Coverage:
- relationship label: 1
- exact current stage labels: 3
- current counter label: 1
- current fact label: 1
- current route-choice label: 1
- current route-value label: 1

Stable namespace:

`relationship.lumber.foreman.*`

## CURRENT_IDENTITIES_ONLY

Exact relationship:
- `lumber.foreman`

Exact stages:
- `unknown`
- `professional`
- `route-professional`

Exact current counter:
- `night_meetings`

Exact current fact:
- `night-followup-complete`

Exact current choice/value:
- `route=professional`

No other stage, counter, fact, route choice or route value is included.

Transition display matrix:
- `FOREMAN_STAGE_TRANSITION_DISPLAY_MATRIX_V1.md`

Current transition graph remains:

`unknown --notice-work--> professional --choose-professional--> route-professional`

with the existing `route=professional` write on the second transition.

## COLLISION STATUS

Audit:
- `FOREMAN_SEMANTIC_LABEL_COLLISION_AUDIT_V1.md`

Against exact audited root:
- ADDITIVE: 8
- IDENTICAL: 0
- REUSE_EXISTING: 0
- CONFLICT: 0

Lead must repeat collision classification on the exact integration head.

## SHARED_CONSUMER_WIRING_REQUIRED

Map:
- `FOREMAN_SEMANTIC_CONSUMER_MAP_V1.md`

Current generic relationship condition presentation interpolates raw:
- relationship ID;
- stage;
- counter;
- fact;
- choice;
- value.

The current normal-player Foreman raw-ID seam is the Lumber Forewoman ending requirement using:

`relationshipStage(lumber.foreman, route-professional)`

Recommended presentation lookup:
- relationship → `relationship.<id>.label`
- stage → `relationship.<id>.stage.<stage>.label`
- counter → `relationship.<id>.counter.<counter>.label`
- fact → `relationship.<id>.fact.<fact>.label`
- choice → `relationship.<id>.choice.<choice>.label`
- value → `relationship.<id>.choice.<choice>.value.<value>.label`

Fallback remains the stable raw ID.

Do not mutate condition/Save identity.

## NIGHT_PATH_VERIFIED

Natural-path matrix:
- `FOREMAN_NIGHT_NATURAL_PATH_LOCALIZATION_MATRIX_V3.md`

Verified exact current path:
1. Lumber first-shift milestone;
2. accepted-hand career stage;
3. `lumber.foreman-notice`;
4. transitions to `route-professional`;
5. normal Night/lodging flow;
6. voluntary choice `lumber.foreman.night`;
7. `night_meetings += 1`;
8. event `lumber-night.foreman-professional`;
9. choice `continue`;
10. fact `night-followup-complete`.

Exact Night presentation ID remains:

`relationship/lumber-foreman/lumber-night-foreman-professional/default`

Locked:
- daytime Energy cost 0;
- next-day Energy delta 0;
- lodging payment semantics unchanged;
- same Night slot consumption;
- same Save/RNG behavior.

## PRODUCT_OPEN_EXCLUDED

Not included and not current canon:
- Foreman personal name;
- romance route/value;
- affection meter;
- extra stages;
- extra facts/counters;
- new relationship choices;
- explicit/sexual content;
- new housing/privacy gate;
- new relationship economy/reward;
- new ending condition.

## REGRESSION SOURCE

Test:
- `prior-work/astra/prototype-m3.2/tests/relationship-foreman-semantic-labels-v1.test.ts`

Validates:
- exact current relationship/stages;
- exact current counter/fact/route value;
- exact 8-key fixture set;
- complete RU+EN pairs;
- no new gameplay/RNG/Save payload.

Exact-head CI remains Lead/QA ownership.

## SELECTIVE COPY

181. `mindy-successor/docs/relationship-prep/FOREMAN_SEMANTIC_DISPLAY_DEBT_AUDIT_V1.md`
182. `mindy-successor/docs/relationship-prep/FOREMAN_RELATIONSHIP_STAGE_LABELS_RU_V1.md`
183. `mindy-successor/docs/relationship-prep/FOREMAN_RELATIONSHIP_STAGE_LABELS_EN_V1.md`
184. `mindy-successor/docs/relationship-prep/FOREMAN_COUNTER_FACT_LABELS_RU_EN_V1.md`
185. `mindy-successor/docs/relationship-prep/FOREMAN_ROUTE_CHOICE_LABELS_RU_EN_V1.md`
186. `mindy-successor/prior-work/astra/prototype-m3.2/content/relationship-foreman-semantic-labels-v1.fixture.json`
187. `mindy-successor/docs/relationship-prep/FOREMAN_SEMANTIC_LABEL_COLLISION_AUDIT_V1.md`
188. `mindy-successor/docs/relationship-prep/FOREMAN_SEMANTIC_CONSUMER_MAP_V1.md`
189. `mindy-successor/docs/relationship-prep/FOREMAN_NIGHT_NATURAL_PATH_LOCALIZATION_MATRIX_V3.md`
190. `mindy-successor/docs/relationship-prep/FOREMAN_STAGE_TRANSITION_DISPLAY_MATRIX_V1.md`
191. `mindy-successor/prior-work/astra/prototype-m3.2/tests/relationship-foreman-semantic-labels-v1.test.ts`
192. `mindy-successor/docs/relationship-prep/FOREMAN_SEMANTIC_LOCALIZATION_HANDOFF_V3.md`

## Recommended Lead order

1. Recheck item 186 against exact integration-head root.
2. Merge approved additive semantic labels.
3. Wire shared relationship condition presentation through item 188.
4. Preserve raw-ID fallback.
5. Exercise item 189/190 identity and transition invariants.
6. Run item 191 plus exact-head CI.

## Acceptance invariants

RU↔EN changes presentation only:
- same relationship/stage/counter/fact/choice IDs;
- same transitions/conditions/effects;
- same Night choice/event IDs;
- same lodging/NightFlow behavior;
- same daytime/next-day Energy;
- same presentation ID/media;
- same Save;
- same RNG.
