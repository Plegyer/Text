# Secret Debt / Forest Next Integration Boundary v1

Status: implementation-readiness boundary after Secret Debt authored-content wave (items 105–113) and Forest authored/result-content wave (items 114–121).

Current main observed while preparing this boundary:
`f880915a8103287f5fd2fff2c537baffeeec7140`

Worker branch is long-lived. Do not merge it wholesale. Use selective integration onto a fresh branch from current main.

## Summary

Two streams are at different readiness levels:

### Forest

A bounded **result-reaction production slice** is ready for selective integration now:
- exact Activity result triggers already exist;
- pack uses existing primitives only;
- no Product answer is needed to display success/escape/failure reaction content;
- targeted regression exists.

Deeper route/challenge/topology production authoring is partly ready in content but still needs concrete gameplay identities/conditions.

### Secret Debt

The narrative/content layer is substantially authored:
- lender offer;
- pending/activation;
- hidden-career day work;
- forced Night;
- all three outcome families;
- machine-readable content fixture.

But production mechanics still depend on unresolved Product decisions and one bounded cross-cutting runtime seam.

The content authority/docs can integrate now; the fixture must not be added to production catalog unchanged.

## Forest: production-ready now

### Exact files

Production pack:
`mindy-successor/prior-work/astra/prototype-m3.2/content/packs/forest-result-content-v1.json`

Targeted test:
`mindy-successor/prior-work/astra/prototype-m3.2/tests/forest-result-content-v1.test.ts`

Authoring/support docs:
- `mindy-successor/docs/lumber-prep/FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md`
- `mindy-successor/docs/lumber-prep/FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md`
- `mindy-successor/docs/lumber-prep/FOREST_SEASONAL_CONTEXT_BANK_v1.md`
- `mindy-successor/docs/lumber-prep/FOREST_AUTHORED_CONTENT_INTEGRATION_HANDOFF_v3.md`
- `mindy-successor/docs/lumber-prep/FOREST_MULTI_GIF_PRESENTATION_IDENTITY_MAP_v1.md`
- `mindy-successor/docs/lumber-prep/FOREST_PRODUCTION_CONTENT_DENSITY_AUDIT_v1.md`

### Why the result pack can enter production

It depends only on already-authoritative Activity boundaries:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

It adds:
- reaction text;
- blocking acknowledgement scenes;
- existing static Forest fallback media.

It does not add:
- progression effects;
- rewards;
- route gates;
- thresholds;
- new terminal outcomes;
- Hard Work dependencies.

No new runtime seam is required.

## Forest: content ready, mechanics not complete

### Logging road

Production route identity already exists.

Content readiness:
**HIGH**

Can safely receive:
- authored route variants;
- seasonal presentation;
- future concrete challenges using existing Activity primitives.

Still needs for full depth:
- concrete challenge option IDs/bindings/effects.

### Old boundary

Production route identity/gate already exists:
- `forest.route.old-boundary`;
- `enter_old_boundary`.

Content readiness:
**HIGH**

Product-blocked:
- natural `old_boundary_token` acquisition source;
- provider/source;
- price if any;
- retained/consumed/turn-in semantics.

These blockers affect the natural acquisition/use loop, not the already-authored route prose.

### Hunter trail

Content readiness:
**HIGH**

Production readiness:
**PRODUCT_BLOCKED**

Still OPEN:
- production option ID;
- Hunter public clue fact;
- navigation capability identity if needed;
- provider/source;
- threshold/reward.

Do not invent these to activate Hunter trail.

### Challenge families

Navigation, physical obstacle, and anomaly families now have substantial authored variants.

Production readiness:
**CONTENT_THIN at mechanical layer**

Still needed:
- concrete challenge IDs;
- route bindings;
- explicit conditions;
- explicit Activity-owned effects/checkpoint behavior.

Existing runtime primitives are sufficient for ordinary versions.

### Seasonal topology

Presentation/context:
**READY**

Mechanical topology:
**CONTENT_THIN**

Still needs explicit data-owned:
- spring route/shortcut difference;
- summer route/challenge difference;
- autumn Hunter difference after Hunter identity exists;
- winter cost/alternative path difference.

No runtime rewrite is implied.

## Forest exact runtime seams

Already sufficient:
- Activity entry/resume;
- Activity route state;
- Activity option conditions;
- item capabilities;
- calendar-season conditions;
- checkpoint persistence;
- terminal result dispatch;
- reaction resolver;
- presentation fallback.

No new Forest runtime seam is required for the item-117 result pack.

Future concrete challenge authoring should first use these existing primitives.

## Forest tests ready

Ready now:
`tests/forest-result-content-v1.test.ts`

It covers:
- exact result triggers;
- success/escape/failure distinction;
- reload;
- no duplicate content effect;
- Hard Work firewall;
- fallback media.

Existing regressions to retain during integration:
- Activity lifecycle tests;
- Lumber target cross-system/Forest continuation tests;
- item capability tests;
- Hard Work acceptance tests.

## Secret Debt: authored content ready now

Exact authored files:

1. `mindy-successor/docs/poverty-prep/SECRET_DEBT_LENDER_OFFER_TEXT_BANK_v1.md`
2. `mindy-successor/docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_TEXT_BANK_v1.md`
3. `mindy-successor/docs/poverty-prep/SECRET_DEBT_HIDDEN_CAREER_WORK_BANK_v1.md`
4. `mindy-successor/docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_SCENE_BANK_v1.md`
5. `mindy-successor/docs/poverty-prep/SECRET_DEBT_PAID_FREEDOM_CONTENT_v1.md`
6. `mindy-successor/docs/poverty-prep/SECRET_DEBT_BOUND_LIFE_CONTENT_v1.md`
7. `mindy-successor/docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`
8. `mindy-successor/prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`
9. `mindy-successor/docs/poverty-prep/SECRET_DEBT_AUTHORED_CONTENT_HANDOFF_v1.md`

Docs and fixture can integrate as authored authority.

The fixture is explicitly:
- `CONTENT_DRAFT_NOT_PRODUCTION`;
- `productionCatalogIncluded: false`.

Do not add it to the production catalog unchanged.

## Secret Debt: Product decisions still blocking mechanics

### Lender/economy

OPEN:
- encounter probability;
- immediate principal;
- delayed debt amount;
- activation interval/rule.

### Bound-state cross-system availability

OPEN:
- School available / blocked / conditional;
- Activity/Forest available / blocked / conditional.

### Forced Night

OPEN:
- exact NightFlow intercept;
- lodging payment policy;
- housing-context policy;
- exact next-day penalty;
- modifier composition.

### Hidden career

OPEN:
- canonical final career/action IDs if not yet accepted;
- shift Energy cost;
- wage/debt effect;
- stat gains;
- stage/counter thresholds.

### Endings

OPEN:
- `paid_freedom` exact eligibility;
- `bound_life` exact eligibility;
- `takeover` exact build/external dependency.

### Meta

OPEN:
- exact reward ID/effect for all three outcomes.

No worker content draft should be used to infer these answers.

## Secret Debt exact runtime seams

### Existing primitives already sufficient

Reusable now:
- NightFlow forced intercept framework;
- event/reaction delivery;
- money effects;
- career stages/counters/facts/choices;
- calendar/day-start reactions;
- world/public facts;
- next-day modifiers;
- ending eligibility/commit/completion/RunResult;
- presentation fallback.

### Clear bounded runtime requirement

**Ordinary-career availability enforcement while bound**

Required behavior:
- all 10 ordinary careers blocked;
- direct dispatch agrees with visible availability;
- reactive ordinary-career progression cannot advance;
- progress preserved;
- Secret Debt career remains separate;
- School/Activity excluded until Product decides their policies;
- debt-specific lock releases when the relevant outcome resolves it.

This may be implemented as a centralized helper or an exhaustively validated equivalent.

### Delayed activation representation

Engineering choice remains open.

Technically compatible shapes already documented:
- career counter/day-boundary;
- narrow activation-day field;
- future-event scheduler only if deliberately justified.

Do not expand generic runtime before the selected representation requires it.

## Secret Debt tests ready before mechanics

Existing preparation already defines test contracts for:
- one-time lender offer;
- refusal terminality;
- acceptance exactly once;
- delayed activation reload;
- 10-career blocking;
- ordinary progress preservation;
- forced Night exactly once;
- outcome ending lifecycle;
- Palace exclusion.

These are contract/readiness tests, not proof that production Secret Debt is implemented.

Production E2E tests must be written/activated as each mechanical slice ships.

## What Lead may selectively integrate now

### Forest production slice

Immediate candidate:
1. `content/packs/forest-result-content-v1.json`
2. `tests/forest-result-content-v1.test.ts`

Then selectively include Forest authoring docs as review authority.

Required validation on fresh current-main branch:
- content validation;
- targeted Forest test;
- existing Activity/Forest regressions;
- full `npm run check`;
- exact-head GitHub Actions success.

### Secret Debt authored authority

Safe to integrate as docs/fixture:
- the eight authored content/fixture files above;
- handoff doc.

Do not treat this as mechanic activation.

### Not safe to activate without decisions

Do not production-enable:
- lender economics;
- bound-state cross-system policy;
- forced Night exact policy;
- final outcome conditions;
- final Meta rewards.

Do not guess values to remove blockers.

## Presentation / multi-GIF readiness

### Forest

Ready identity pools:
- logging road;
- old boundary;
- Hunter concept after production identity is accepted;
- navigation family;
- physical family;
- anomaly family;
- success;
- escape;
- failure.

Result reactions already have static fallback.

### Secret Debt

Ready authored pools:
- lender offer;
- pending reminders;
- activation;
- daytime hidden work;
- forced Night;
- paid freedom;
- bound life;
- takeover.

Each can support 3–5 media candidates per semantic identity.

Media selection changes no mechanics.

## Integration ordering boundary

This document does not choose which Product decision should be answered first.

Implementation-readiness ordering is:

### Forest bounded production work
- result reaction pack can integrate independently now;
- concrete logging-road challenges can be authored next using existing primitives;
- old-boundary natural acquisition waits for token decisions;
- Hunter production route waits for Hunter identity/gate decisions.

### Secret Debt bounded production work
- docs/content fixture can integrate now;
- state/content scaffolding can proceed with explicit OPEN parameters;
- global ordinary-career gate can be implemented without waiting for numeric balance;
- each Product-dependent behavior must remain unactivated until its specific decision exists.

## Selective integration rule

Worker branch history is not the integration unit.

Use exact files on a fresh branch from current main.

For any non-doc production file:
- validate against current main;
- run targeted tests;
- run full check;
- require exact-head CI.

## Locked firewalls

Both streams must preserve:

Lumber:
- Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact success continuation `activityResult(lumber.forest, success, lumber.forest.success)`.

Secret Debt:
- excluded from the 10 ordinary careers;
- zero ordinary Hard Work credit;
- Palace remains all 10 ordinary Hard Work careers.

## Boundary conclusion

Forest has one bounded production content slice ready for immediate selective integration: result reactions.

Secret Debt has a broad authored narrative layer ready for authority integration, while mechanical activation remains partially Product-blocked.

Deeper Forest route/challenge work can continue wherever authoritative identities already exist; Hunter/token-specific production must wait for their exact Product boundaries.
