# School Public-Result Consumer Crosswalk v1

Status: inventory of current and intended School public-result consumers.

Rule: downstream systems consume approved public School results only. They do not read School-private counters, milestones, certificates, projects/exams, or choices.

## Lumber

**CURRENT_SHIPPED_CONSUMER + PRODUCT_DECISION_REQUIRED**

Current management-side consumer:
- `lumber-cross.school-management-return`
- public-result trigger family
- current transport key `lumber.school.management-ready`

Still OPEN:
- School provider;
- milestone type;
- threshold/value;
- final School publication rule if Product changes the transport key.

Lumber Hard Work is **NO_DEPENDENCY_INTENDED** and remains `completed_shifts >= 50` only.

## Forest / Activity

**DRAFT_CONSUMER + PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED**

Current production surfaces:
- Activity `lumber.forest`
- success result `lumber.forest.success`
- post-Activity listener `lumber-cross.activity-forest-return`
- result fact `lumber.forest.truth-known`

The post-Activity listener consumes the Activity result, not School progress.

No canonical direct Arcana-School-to-Forest consumer is selected. If Product retains that path, it must choose the School result and one explicit Forest option/condition/listener.

## Other ordinary careers

| Career | Classification | Intended School consumer |
|---|---|---|
| Geisha / Artist | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | educational public facts for advanced scenes; School milestones for advanced artistry |
| Guard | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | literacy/rhetoric/etiquette public results for Officer/alternate solutions; Arcana/Physical Training for special cases |
| Hunter | DRAFT_CONSUMER + PRODUCT_DECISION_REQUIRED | Field Craft/Arcana/Literacy result or clue for alternate approaches |
| Merchant | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | accounting, rhetoric, literacy, etiquette or Arcana results for advanced trade/appraisal |
| Service profession | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | education/management result for negotiation, business or status routes |
| Satyr Maid | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | rhetoric/accounting/presentation result that may trigger career continuation |
| Tavern | DRAFT_CONSUMER + CONTENT_AUTHORING_REQUIRED | accounting/literacy/rhetoric/etiquette/Arcana results for Innkeeper/Broker paths |
| Undead Farm | DRAFT_CONSUMER + PRODUCT_DECISION_REQUIRED | Arcana/Reason Research result and accounting/management Successor result |
| Assassin | NO_DEPENDENCY_INTENDED | current draft defines no School public-result consumer |

No ordinary career may read `lessons_completed` or `night_study_sessions` directly.

## Relationships

**PRODUCT_DECISION_REQUIRED** for any direct relationship consumer.

Current professional Foreman relationship state is a condition on the Lumber management listener. That is not a generic direct relationship-system School consumer.

A future direct relationship reaction must use the same public-boundary and exactly-once rules.

## Palace / Meta

Palace: **DRAFT_CONSUMER + PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED**.

Draft intent includes School certificates/public facts for literacy/accounting, etiquette, Arcana and rhetoric.

Meta/cross-run: **DRAFT_CONSUMER + PRODUCT_DECISION_REQUIRED** where a School outcome is explicitly authored to affect future access.

No generic School-to-Meta result is selected.

## Secret Debt

**NO_DEPENDENCY_INTENDED**

Current draft defines no School public-result consumer. Do not add a School prerequisite or escape condition by inference.

## Validation

For every future consumer:
1. freeze the School public result ID;
2. freeze downstream listener/condition ID;
3. commit private School result first;
4. publish exactly once;
5. reload before/after publication deterministically;
6. downstream reads public result only;
7. downstream state mutation remains downstream-owned;
8. no School tuition/Energy/progress replay;
9. presentation identity remains stable;
10. Hard Work remains independent.

Use `SCHOOL_CAREER_HOOK_VALIDATION_CHECKLIST_v1.md`.

This crosswalk creates no new provider, threshold, route unlock, certificate, project, teacher, or prerequisite.
