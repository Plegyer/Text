# School Ending / Meta Interaction Inventory v1

Status: inventory of intended School contributions to endings and cross-run/Palace routes.
Rule: this file does not author new endings, thresholds, rewards, or prerequisites.

Classification:
- **CURRENT_LOCKED** — current ending rule is authoritative.
- **DRAFT_INTENT** — career/system draft explicitly intends School to contribute.
- **AUTHORING_REQUIRED** — exact School result/condition/ending content is missing.
- **PRODUCT_DECISION_REQUIRED** — provider/threshold/scope/reward requires human choice.
- **NO_SCHOOL_DEPENDENCY** — current ending must remain independent of School.

## Career endings / outcomes

| Career | School interaction | Authority | Public-result boundary | Meta/reward status |
|---|---|---|---|---|
| Lumber Hard Work | none | **CURRENT_LOCKED / NO_SCHOOL_DEPENDENCY** | none | exact Hard Work reward remains owned by Lumber; no School prerequisite |
| Lumber management / Forewoman route | School management/accounting result may advance career outcome | current downstream listener exists; School provider remains **PRODUCT_DECISION_REQUIRED** | School public result -> Lumber listener -> Lumber-owned outcome state | final School-side provider/reward implications OPEN |
| Lumber Forest route | optional Arcana/knowledge School contribution may affect interpretation/route | **DRAFT_INTENT + PRODUCT_DECISION_REQUIRED** | School public result -> explicit Forest consumer -> Activity/Lumber result | School provider and any Meta consequence OPEN |
| Geisha / Artist advanced outcomes | School milestones contribute to Master Artist / cultural advancement | **DRAFT_INTENT + AUTHORING_REQUIRED** | approved educational public result where cross-domain | draft mentions education/performance Meta option; exact reward OPEN |
| Guard Officer / advanced outcomes | literacy/etiquette/rhetoric School contribution | **DRAFT_INTENT + AUTHORING_REQUIRED** | public School result if durable career gate is authored | exact ending/meta reward OPEN |
| Hunter advanced outcomes | Field Craft/Arcana/Literacy may support Warden/Legend/alternate route | **DRAFT_INTENT + AUTHORING_REQUIRED** | public School knowledge result if authored | exact ending/meta reward OPEN |
| Merchant advanced outcomes | accounting/rhetoric/literacy/etiquette/Arcana intended to matter | **DRAFT_INTENT + AUTHORING_REQUIRED** | approved public School result where needed | exact reward OPEN |
| Service-profession advanced outcomes | education/management School contribution may support business/status route | **DRAFT_INTENT + AUTHORING_REQUIRED** | approved public School result where needed | exact reward OPEN |
| Satyr Maid advanced outcomes | rhetoric/accounting/presentation School milestone may open branch | **DRAFT_INTENT + AUTHORING_REQUIRED** | public School result -> career reaction | exact reward OPEN |
| Tavern Innkeeper/Broker outcomes | accounting/literacy/rhetoric/etiquette/Arcana may advance route | **DRAFT_INTENT + AUTHORING_REQUIRED** | approved public School result -> Tavern-owned transition | exact reward OPEN |
| Undead Farm Research | Arcana/Reason School milestone contributes to Research Farmer | **DRAFT_INTENT + AUTHORING_REQUIRED** | School knowledge result -> Farm-owned Research transition | draft allows knowledge/research Meta; exact reward OPEN |
| Undead Farm Successor | accounting/management School result contributes to management outcome | **DRAFT_INTENT + AUTHORING_REQUIRED** | public management result -> Farm-owned Successor transition | economic/logistics Meta option remains draft/open |
| Assassin | no explicit School ending dependency | **NO_SCHOOL_DEPENDENCY** | none | do not invent School requirement |

Career endings remain career-owned. School may publish an approved result; the career owns its ending/outcome eligibility and commitment.

## Relationship endings

Current status: **PRODUCT_DECISION_REQUIRED / AUTHORING_REQUIRED** for any direct School relationship-ending interaction.

No generic relationship ending currently requires:
- School lesson count;
- School certificate;
- teacher relationship;
- School public result.

Future teacher/presenter relationships may contribute to a relationship ending only when explicitly authored.

Boundary:
`School public result or approved relationship event -> relationship-owned state -> relationship-owned ending eligibility`.

Forbidden:
- direct relationship read of School-private counters;
- School directly committing a relationship ending;
- teacher identity silently creating a relationship prerequisite.

Meta reward details for any future teacher relationship ending remain OPEN.

## Education-specific endings

Project direction allows School track progress to contribute to education-specific endings, but exact endings are not currently canonical.

Status:
- scope: **DRAFT_INTENT / PRODUCT_DECISION_REQUIRED**;
- ending IDs/names: **OPEN**;
- owning track(s): **OPEN**;
- milestone/certificate/project/exam requirements: **OPEN**;
- thresholds: **OPEN**;
- teacher involvement: **OPEN**;
- ending rewards/Meta effects: **OPEN**.

If retained:
- School-owned ending eligibility may use approved School-private progression;
- any external system contribution must cross an approved public/typed boundary;
- ending commitment/reward remains exactly-once and save/reload safe.

Do not promote draft certificate/milestone examples into final ending requirements.

## Palace routes

Palace draft explicitly intends School to matter.

Status: **DRAFT_INTENT + PRODUCT_DECISION_REQUIRED + AUTHORING_REQUIRED**.

Intended School inputs include:
- literacy/accounting;
- etiquette;
- Arcana;
- rhetoric;
- possible School ending/history contribution to archival/ritual access.

Required authoring:
- exact School public result/certificate;
- exact Palace option/condition;
- whether a School ending or education history affects Palace access;
- presentation/copy;
- save/reload validation.

Boundary:
`School-owned result -> durable public/Meta result -> Palace-owned option/route`.

School must not bypass independent Palace unlock/meta rules.

## Meta / cross-run routes

Possible draft families:
- education/performance familiarity;
- research/knowledge fragment;
- Palace archival/ritual access;
- future School-specific education history.

Status: **PRODUCT_DECISION_REQUIRED**.

For any approved Meta reward:
- source ending/result must be explicit;
- Meta reward ID must be canonical;
- reward applies exactly once;
- New Run preserves Meta but does not fabricate in-run School counters;
- reward must not silently alter locked tuition/Night mechanics unless separately approved.

## Hard Work independence

Lumber Hard Work is explicitly preserved as **NO_SCHOOL_DEPENDENCY**.

Locked eligibility:
- `completed_shifts >= 50` only.

School must not add:
- lesson threshold;
- certificate;
- milestone;
- public fact;
- teacher relationship;
- Arcana result;
- management result;
- Palace/Meta condition.

School-related Lumber branches may create alternative endings, but they cannot modify Hard Work eligibility.

## Post-authoring verification

When an ending/Meta interaction is approved:
1. freeze School provider/result;
2. freeze career/relationship/Palace consumer;
3. verify public/private ownership;
4. verify ending eligibility before/after result;
5. reload before/after publication;
6. reload before/after ending eligibility;
7. commit ending exactly once;
8. apply Meta reward exactly once;
9. start New Run and verify only approved Meta persists;
10. verify unrelated Hard Work and School mechanics remain unchanged.

## Current OPEN set

Still OPEN:
- management/accounting School provider/threshold;
- Arcana/Forest provider/threshold/direct consumer;
- education-specific ending definitions;
- teacher relationship ending content;
- School certificate/project/exam ending roles;
- Palace School result/certificate mapping;
- School-specific Meta reward details.

This inventory selects none of them.
