# School Public-Result Decision Impact v1

Status: decision-impact matrix only. No provider or threshold is selected.

## Management/accounting public result

Authoring source remains OPEN:
- School milestone;
- certificate;
- project;
- exam;
- or another explicitly authored School-owned result.

Private threshold/milestone type remains OPEN.

Current downstream Lumber listener:
- event ID: `lumber-cross.school-management-return`;
- trigger boundary: `worldFactAdded`;
- currently declared transport key on the Lumber side: `lumber.school.management-ready`;
- relationship condition: `lumber.foreman` at `route-professional`;
- result: Lumber career facts `management-school-ready` and `forewoman-problem-resolved`.

This does not select the School provider or its private threshold. It only names the existing Lumber-side listener contract.

Save/reload semantics:
- the School-owned publication must commit once;
- reload before publication may still publish once later;
- reload after publication may not re-emit the same fact;
- a pending Lumber reaction scene must survive reload without re-publishing.

Resolver publication boundary:
`School private result -> public fact commit -> worldFactAdded -> lumber-cross.school-management-return`.

PA rows affected:
- PA07;
- PA08.

Affected tests/content:
- School public-fact authoring/preflight/exactly-once evidence;
- Lumber cross production pack;
- integrated PA07/PA08 acceptance path;
- future authored School milestone/certificate/project content.

## Arcana/Forest public result

Authoring source remains OPEN:
- Arcana milestone;
- Arcana certificate;
- Arcana project;
- Arcana exam;
- or another explicitly authored School-owned knowledge result.

Private threshold/milestone type remains OPEN.

Direct School-to-Forest listener status:
- no canonical production event ID currently listens directly for a final Arcana School public fact;
- therefore no listener ID is invented here.

Current downstream Forest/Lumber surfaces are exact:
- Activity ID: `lumber.forest`;
- eventual successful Activity result: `lumber.forest.success`;
- current Lumber continuation listener: `lumber-cross.activity-forest-return`;
- current returned public fact: `lumber.forest.truth-known`.

The unresolved Arcana School public result, if authored, must affect an explicit `lumber.forest` option/condition or another named Forest entry/interpretation listener before that Activity result. The exact direct listener remains a human/content decision.

Save/reload semantics:
- School publication exactly once;
- any Forest option unlocked by that public result remains stable after reload;
- reload does not republish the School fact;
- later `lumber-cross.activity-forest-return` remains driven by the Activity result, not by private School counters.

Resolver publication boundary:
`School private Arcana result -> public fact commit -> worldFactAdded -> authored Forest listener -> lumber.forest path -> activityResult -> lumber-cross.activity-forest-return`.

PA rows affected:
- PA08;
- PA14;
- PA15;
- PA16;
- PA18.

Affected tests/content:
- School public-fact authoring/preflight/exactly-once evidence;
- Forest Activity option/condition content;
- Lumber cross production pack;
- integrated Forest/PA acceptance path.

## Non-decisions

Still OPEN:
- management/accounting School provider;
- management/accounting private threshold/milestone type;
- final canonical School-side management public-result authoring;
- Arcana/Forest School provider;
- Arcana/Forest private threshold/milestone type;
- exact direct Arcana-to-Forest listener event/option if Product chooses a public fact path.

No legacy `metrics.lessons` threshold, fixture-only fact, teacher, certificate, project, or exam definition is promoted by this matrix.
