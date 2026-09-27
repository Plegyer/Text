# School Cross-System Authoring Dependencies v1

Status: current authoring dependency matrix.
Rule: this file inventories existing/draft relationships between School and other systems. It does not create new prerequisites.

Classification:
- **CURRENT_EXPLICIT** — a current production-facing dependency/consumer exists.
- **OPTIONAL_HOOK** — draft allows School interaction but does not require it.
- **PRODUCT_DECISION_REQUIRED** — Product must decide provider/threshold/identity/scope.
- **CONTENT_AUTHORING_REQUIRED** — exact authored content/listener/scene is missing.
- **NO_DEPENDENCY_INTENDED** — current design defines no School dependency; do not invent one.

## Ten ordinary careers

| Career | Classification | School dependency |
|---|---|---|
| Lumber | CURRENT_EXPLICIT + PRODUCT_DECISION_REQUIRED | Production management-side consumer exists. School management provider/threshold remains OPEN. Optional Arcana/Forest School path remains OPEN. Hard Work has NO School dependency. |
| Geisha / Artist | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft makes education central: etiquette, rhetoric, performance/body confidence, literacy/history and educational public facts for advanced scenes. |
| Guard | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft uses literacy, rhetoric, etiquette, Physical Training and Arcana for Officer/alternate solutions. Exact public results remain unauthored. |
| Hunter | OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED | Draft uses Field Craft/Arcana/Literacy for alternate approaches. Exact School result/clue and hunter-route consumer remain OPEN. |
| Merchant | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft uses accounting, rhetoric, literacy, etiquette and Arcana for advanced trade/appraisal. |
| Service profession | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft uses education/management-related School results for negotiation, business or status routes. |
| Satyr Maid | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft allows rhetoric/accounting/presentation School milestone to trigger career continuation. |
| Tavern | OPTIONAL_HOOK + CONTENT_AUTHORING_REQUIRED | Draft uses accounting/literacy, rhetoric, etiquette and Arcana for Innkeeper/Broker progression. |
| Undead Farm | OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED | Draft uses Arcana/Reason for Research and accounting/management School result for Successor route. |
| Assassin | NO_DEPENDENCY_INTENDED | Current draft defines no School prerequisite/public-result consumer. |

All career consumers must use public School results or ordinary approved stat conditions, never School-private counters.

## Ordinary poverty / housing

Classification: **NO_DEPENDENCY_INTENDED** for core access, with one existing scheduling interaction.

School must not be required for:
- basic housing selection;
- ordinary poverty recovery;
- access to non-School work used to recover money.

Current interactions:
- paid School requires tuition and current-day Energy;
- Night study availability depends on housing policy;
- normal/cheap allow normal School Night study;
- street restricts normal School Night study by default.

Do not create a School certificate/milestone requirement for ordinary housing.

## Secret Debt hidden career

Classification: **NO_DEPENDENCY_INTENDED**.

Current draft defines no School prerequisite, School escape route or School-owned progress gate.

School progress should remain preserved if ordinary career access is locked by that hidden branch, but School must not silently become:
- an escape condition;
- a debt threshold modifier;
- a required certificate.

Any future interaction requires explicit Product authoring.

## Relationships

Classification: **OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED**.

Current explicit interaction:
- professional Foreman relationship state is a downstream condition on the Lumber management consumer.

Possible future teacher/relationship hooks:
- teacher presentation variants;
- reaction to an approved School public result;
- optional relationship scenes.

Ownership:
- School owns lesson/payment/progress;
- relationship domain owns relationship state;
- neither reads/writes the other's private state directly.

Teacher relationship cannot silently become an ordinary paid-lesson prerequisite.

## Night

Classification: **CURRENT_EXPLICIT**.

Locked School/Night interaction:
- 24 Night-study course/stat choices;
- zero tuition;
- zero current-day Energy;
- +2 supported stat;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`;
- normal/cheap available;
- street restricted by default.

Night relationship/career scenes are separate from School payment/progress.

No Product decision is required for baseline Night mechanics.

## Items

Classification: **OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED** where future School content uses items.

Current School baseline has no generic item prerequisite.

Possible authored uses:
- project material;
- exam/tool capability;
- research specimen;
- presentation/lesson prop.

Requirements:
- item dependency must be explicit;
- item capability cannot be inferred from a public fact;
- ordinary paid course access must not gain an item prerequisite without approval;
- item grant/removal is owned by the appropriate item/content transaction.

No canonical School item requirement is selected here.

## Forest / Activity

Classification: **PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED** for a direct Arcana/Forest School result.

Current production surfaces:
- `lumber.forest` Activity;
- `lumber.forest.success` result;
- `lumber-cross.activity-forest-return` post-Activity listener.

No canonical direct Arcana-School-to-Forest public-result consumer is selected.

If retained:
- School owns the Arcana provider;
- School publishes one durable public result;
- Forest owns the route/option/interpretation consumer;
- Activity result remains Activity-owned;
- later Lumber continuation remains result-driven.

Forest must not read School-private counters.

## Palace / Meta

Palace classification: **OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_REQUIRED**.

Draft Palace intent includes School certificates/public facts for:
- literacy/accounting;
- etiquette;
- Arcana;
- rhetoric.

Still needed:
- exact School result/certificate;
- exact Palace option condition;
- presentation/content;
- reload/integration evidence.

School must not bypass independent Palace access/meta rules.

Meta classification: **OPTIONAL_HOOK + PRODUCT_DECISION_REQUIRED**.

Possible School ending/education history may affect future access only when explicitly authored.

No generic School-to-Meta result is currently canonical.

## Cross-system ownership rules

Every future dependency follows:

`domain-private School result -> approved public boundary -> downstream-owned consumer/reaction`.

Forbidden:
- downstream read of `lessons_completed`;
- downstream read of `night_study_sessions`;
- downstream mutation of School milestones/certificates/projects;
- School direct mutation of downstream career/relationship private stage;
- School prerequisite added where current design says NO_DEPENDENCY_INTENDED;
- School added to Lumber Hard Work.

## Decision / authoring summary

CURRENT_EXPLICIT:
- paid School/Night interaction;
- Lumber management-side public consumer;
- professional Foreman condition on that Lumber consumer.

PRODUCT_DECISION_REQUIRED:
- management School provider/threshold;
- Arcana/Forest provider/threshold/direct consumer;
- teacher/relationship identities/hooks;
- Palace School result/certificate details;
- optional item-based School authored content;
- optional Meta relevance.

CONTENT_AUTHORING_REQUIRED:
- all draft career consumers not yet production-authored;
- direct Forest consumer if retained;
- Palace School conditions;
- teacher/relationship scenes.

NO_DEPENDENCY_INTENDED:
- Assassin current draft;
- Secret Debt current draft;
- ordinary housing access;
- Lumber Hard Work.

This matrix introduces no new prerequisite, provider, threshold, item, teacher or route unlock.
