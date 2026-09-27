# Product-open isolation audit v4

Status: COMPLETE / PASS_ISOLATION

Current production main:
`1af3104c1e4c180019b965adac8e87e67de89347`.

Reviewed integration history:
- PR44 School RU+EN;
- PR45 ordinary-poverty RU+EN;
- PR46 Foreman relationship/Night RU+EN + generic Night-choice label wiring.

None of these merges changes the Product-open gameplay boundaries below.

## School exact-course / teacher boundary

Current root production still has:
- eight paid School courses;
- current generic/reachable School lesson/life events;
- 24 current School Night-study choices;
- typed School progress.

`school-teachers-v1.json` is present in the root catalog as a media-only pack:
- event count: `0`;
- eight teacher classroom media IDs.

Therefore teacher media definitions existing in the catalog do not mean exact-course teacher events/routing are production-authored.

Still unpromoted:
- worker exact-course teacher event identities;
- teacher-specific gameplay routing;
- exact-course teacher progression effects;
- management/accounting public-result provider/threshold;
- Arcana/Forest public-result provider/threshold.

PR44 localized only current reachable production surfaces.

Verdict:
`ISOLATED`.

## School management/accounting seam

Current `lumber-cross.school-management-return` still consumes:
`lumber.school.management-ready`.

It requires:
- that world fact;
- `lumber.foreman.route-professional`.

This is a current consumer seam.

It does not establish:
- who produces the School result;
- exact School threshold;
- exact accounting/management course outcome;
- publication timing;
- final Product semantics.

PR46 localizes Foreman presentation only and does not make the upstream School result reachable.

Verdict:
`CONSUMER_SEAM_SHIPPED / PROVIDER_SEMANTICS_PRODUCT_OPEN`.

## Hunter / Forest boundary

Current ordinary career action:
`hunter.shift`
remains separate from `lumber.forest`.

Current Forest Activity remains:
- `lumber.forest`;
- success `lumber.forest.success`;
- escape `lumber.forest.escape`;
- failure `lumber.forest.failure`.

Current exact Lumber success continuation remains:
`activityResult(lumber.forest, success, lumber.forest.success)`.

No current integration adds:
- Hunter clue acquisition;
- Hunter-owned Forest route;
- Hunter-specific Forest result;
- Hunter relationship to Old Boundary;
- Hunter token semantics.

Chat 2 project-owned Hunter result static art is mapped only to the ordinary:
`job/hunter/result/default`.

Visual media is not gameplay promotion.

Verdict:
`ISOLATED / PRODUCT_OPEN`.

## Old Boundary boundary

Current technical seam is real:
- item: `old_boundary_token`;
- capability: `enter_old_boundary`;
- option: `forest.route.old-boundary`;
- persisted route value: `old-boundary`;
- option eligibility requires the existing capability.

This must not be described as absent.

Still Product-open:
- token acquisition source;
- retain/consume/turn-in behavior;
- Hunter relationship;
- deeper Old Boundary challenge;
- route-specific lore/reward;
- any new result identity.

The future route-presentation contract may bind already-persisted route state to art, but cannot decide any of these mechanics.

Verdict:
`BASE_SEAM_SHIPPED / DEEPER_SEMANTICS_ISOLATED`.

## Secret Debt / Slave boundary

Current root `content/packs/` production set contains no Secret Debt production pack.

PR45 ordinary poverty:
- localizes only the six ordinary-poverty packs;
- excludes lender/forced-night/debt-route markers in tests.

PR46 Foreman relationship Night:
- remains voluntary;
- next-day Energy delta remains 0;
- uses no debt/lender condition;
- does not reuse forced-Night semantics.

Chat 5 ordinary relationship authoring templates explicitly exclude forced Secret Debt NightFlow.

Chat 2 static poverty assets cover only ordinary poverty contexts.

No integration in the reviewed main adds:
- debt career/progression;
- lender-owned relationship;
- forced debt Night;
- paid-freedom/bound-life/takeover reward path;
- Secret Debt ending/reward.

Verdict:
`PRODUCT_BLOCKED / ISOLATED`.

## Palace boundary

Current engine retains only the existing infrastructure seam:
after all ordinary Hard Work careers are represented in Meta progress, `palace` can be added to Meta unlocks.

That unlock infrastructure is not authored Palace content.

Current main has no reviewed production:
- Palace scene pack;
- Palace relationship route;
- Palace quest;
- Palace ending family;
- Palace-specific action/content path.

PR44–46 do not add any Palace authoring.

Verdict:
`INFRASTRUCTURE_SEAM_EXISTS / AUTHORED_CONTENT_PRODUCT_OPEN`.

## Broader relationship roster

Current `definitions.relationships` contains exactly one typed relationship:
`lumber.foreman`.

Current stages remain:
- `unknown`;
- `professional`;
- `route-professional`.

PR46 adds bilingual presentation and generic label resolution only.

It does not add:
- another relationship definition;
- deeper Foreman stage;
- romance route;
- relationship ending;
- relationship Meta persistence;
- canonical NPCs for the other nine ordinary careers.

Chat 5 roster/depth proposals remain:
`CONTENT_DRAFT / PRODUCT_NOT_LOCKED`
unless separately selected later.

Verdict:
`CURRENT_FOREMAN_SHIPPED / BROADER_ROSTER_ISOLATED`.

## Housing rule

Current `lumber.foreman.night` still has only:
`relationshipStage(lumber.foreman, route-professional)`
as its eligibility condition.

It does not have a housing condition.

The Chat 5 normal/cheap/street packet remains decision support only.

PR46 does not add housing gating.

Verdict:
`PRODUCT_OPEN`.

## Hard Work invariant

Current Lumber Hard Work remains:
- ending ID `ending.lumber.hard-work`;
- only condition `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`.

PR46 exact-head and post-merge tests explicitly protect both condition and reward identity.

No Product-open content is smuggled through the Hard Work gate.

## Static media boundary

Chat 2 project-owned static-media items 184–195 are staging/selective source.

They do not root-load automatically and contain no gameplay fields.

Their media mappings must not be treated as proof that:
- School teacher routes are approved;
- Hunter/Old Boundary semantics are approved;
- relationship depth is approved;
- Secret Debt exists.

Presentation coverage cannot authorize gameplay.

## Final isolation table

| Area | Current shipped seam | Still Product-open | Promoted by PR44–46? |
| --- | --- | --- | --- |
| School teachers | media-only catalog entries | exact-course teacher events/routing | NO |
| School management/accounting | Lumber consumer fact | provider/threshold/result semantics | NO |
| School Arcana/Forest | Arcana course exists | public result semantics/provider | NO |
| Hunter | ordinary career shift | Forest clue/route/result meaning | NO |
| Old Boundary | token/capability/route option | acquisition/consume/deeper semantics | NO |
| Secret Debt | none in root production | mechanics/rewards/forced Night | NO |
| Palace | Meta unlock infrastructure | authored Palace content | NO |
| Relationships | `lumber.foreman` professional route | wider roster/deeper stages/endings | NO |
| Relationship housing | current Night works without housing gate | privacy/availability rule | NO |

## Verdict

`PASS_ISOLATION`.

Current production gains bilingual School, poverty and Foreman presentation without promoting unresolved Product gameplay decisions.

Continue to distinguish:
- technical seam;
- presentation asset;
- staged authoring;
- naturally reachable production mechanic.
