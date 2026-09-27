# Secret Debt Authored Content Handoff v1

Status: selective handoff for Queue items 105–112.

This wave is content-only plus one machine-readable fixture.

No runtime, schema, shared definitions, build, or UI file was changed.

## Authored content now ready

### Lender offer

File:
`docs/poverty-prep/SECRET_DEBT_LENDER_OFFER_TEXT_BANK_v1.md`

Ready:
- five one-time street-offer scene variants;
- accept/refuse agency copy;
- generic lender role language;
- ambiguity consistent with delayed future trap;
- no exact values embedded.

Still OPEN:
- encounter probability;
- immediate principal;
- canonical lender identity;
- exact production event ID.

### Delayed activation

File:
`docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_TEXT_BANK_v1.md`

Ready:
- temporary-relief scenes;
- ambiguous reminder variants;
- optional pre-activation warnings;
- activation-notice variants;
- save/reload/content boundaries.

Still OPEN:
- exact delay length;
- exact debt amount;
- chosen persistence representation;
- exact activation event ID.

### Hidden career daytime work

File:
`docs/poverty-prep/SECRET_DEBT_HIDDEN_CAREER_WORK_BANK_v1.md`

Ready:
- ten repeatable work families;
- early/middle/late narrative progression bands;
- compliance/resistance flavor axis;
- identity-neutral relationship/world reaction hooks;
- reusable presentation pool suggestions.

Still OPEN:
- canonical hidden-career ID/display name;
- shift Energy cost;
- wage/debt effect;
- stat gains;
- stage/counter thresholds;
- exact public facts.

### Forced Night

File:
`docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_SCENE_BANK_v1.md`

Ready:
- ten forced-Night scene families;
- clear separation from daytime hidden work;
- content variants suitable for stage/relationship/context filtering;
- exactly-once/save-reload acceptance language.

Still OPEN:
- `before_lodging | after_lodging | after_choice`;
- lodging-payment policy;
- housing-context policy;
- exact next-day penalty;
- modifier composition;
- exact progression effects.

### `paid_freedom`

File:
`docs/poverty-prep/SECRET_DEBT_PAID_FREEDOM_CONTENT_v1.md`

Ready:
- approach scenes;
- settlement/resolution copy;
- immediate aftermath;
- relationship/world hooks;
- RunResult copy candidates;
- presentation placeholders.

Still OPEN:
- exact payoff eligibility;
- exact debt transaction value;
- exact ending ID if different from family identity;
- exact Meta reward.

### `bound_life`

File:
`docs/poverty-prep/SECRET_DEBT_BOUND_LIFE_CONTENT_v1.md`

Ready:
- substantial-progress narrative context;
- explicit commitment scene;
- non-failure framing;
- aftermath/reaction hooks;
- RunResult/presentation placeholders.

Still OPEN:
- exact hidden-career stage/counter/milestone threshold;
- exact commitment event ID;
- exact Meta reward;
- any post-ending same-run continuation feature.

### `takeover`

File:
`docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`

Ready:
- progression/preparation scenes;
- leverage framing;
- confrontation/control-transfer variants;
- aftermath;
- relationship/world hooks;
- RunResult/presentation placeholders.

Still OPEN:
- exact build requirement;
- exact external dependency category;
- exact item/fact/relationship/School/Activity identity;
- exact controller/ally identities;
- exact Meta reward.

## Machine-readable authored fixture

File:
`prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`

Purpose:
- encodes the authored scene families from items 105–111;
- records structural meanings;
- records presentation placeholders;
- records every unresolved mechanic as `status: OPEN` with `value: null`;
- provides no guessed threshold/value;
- is explicitly marked `CONTENT_DRAFT_NOT_PRODUCTION`;
- is explicitly marked `productionCatalogIncluded: false`.

Do not add this fixture to the production catalog unchanged.

## Product decisions still blocking final mechanics

The content wave itself does not require these answers, but production mechanics do.

### Lender/economy
- encounter probability;
- immediate principal;
- delayed debt amount;
- activation interval/rule.

### Bound-state daytime systems
- School availability while bound;
- Activity/Forest availability while bound.

### Forced Night
- exact intercept;
- lodging-payment policy;
- housing behavior;
- exact next-day penalty;
- modifier composition.

### Hidden career
- exact shift costs/effects;
- career stage/threshold structure;
- public facts actually required by consumers.

### Endings
- `paid_freedom` exact eligibility;
- `bound_life` exact eligibility;
- `takeover` exact progression/build/external dependency.

### Meta
- exact reward ID/effect for all three outcomes.

## Engineering decision still needed

State ownership recommendation from prior work remains:
- existing Secret Debt career machine as authoritative owner;
- public projections only where real external consumers require them;
- centralized ordinary-career professional-lock enforcement as the one clear bounded runtime seam.

This wave does not implement that recommendation.

## Content that can convert to production immediately after minimal IDs/values are approved

### Lender pack

Can convert:
- one or more offer variants;
- accept/refuse choices;
- presentation IDs/fallbacks;
- one-time encounter history.

Needs before activation:
- canonical event/state IDs;
- configured probability;
- configured immediate benefit;
- authoritative accepted/refused state owner.

### Pending/activation events

Can convert:
- relief/reminder scenes;
- activation notice;
- presentation variants.

Needs:
- chosen delayed-state implementation;
- configured delay;
- authoritative bound transition.

### Hidden work pack

Can convert:
- repeatable work action scene variants;
- stage/context text pools;
- compliance/resistance choice flavor.

Needs:
- canonical hidden-career/action IDs;
- explicit cost/effects;
- stage/progression definition.

### Forced Night pack

Can convert:
- all ten scene families and media pools.

Needs:
- Product-selected Night intercept/policy;
- explicit modifier/progression effects.

### Ending definitions/content

Can convert scene/presentation shells now.

Final production ending eligibility must wait for:
- exact route conditions;
- exact Meta rewards where final package claims complete outcome implementation.

## Multi-GIF/media opportunities

Presentation production can use 3–5 media candidates per semantic identity without changing mechanics.

### Lender offer pool
Useful visual candidates:
- rain/awning;
- closed market arcade;
- warm drink/purse;
- envelope;
- quiet street conversation.

### Pending/activation pool
Useful candidates:
- temporary relief;
- note/reminder;
- distant observer;
- account card;
- activation confrontation.

### Hidden work pools
Reusable families:
- storage/warehouse;
- cleanup/back room;
- supervised delivery;
- inventory/ledger;
- service floor;
- maintenance;
- heavy work;
- trusted access.

### Forced Night pools
Reusable families:
- summons;
- midnight inventory;
- escort;
- cleanup;
- watch duty;
- private ledger;
- personal errand;
- correction;
- trusted late task.

### Ending pools
`paid_freedom`:
- accounting/payment;
- closed ledger;
- walking away.

`bound_life`:
- familiar workplace;
- commitment;
- long-term responsibility.

`takeover`:
- preparation;
- confrontation;
- keys/ledger/control transfer;
- aftermath.

Static/text fallback remains mandatory.

## Exact files for Lead

Selective-copy list:

1. `mindy-successor/docs/poverty-prep/SECRET_DEBT_LENDER_OFFER_TEXT_BANK_v1.md`
2. `mindy-successor/docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_TEXT_BANK_v1.md`
3. `mindy-successor/docs/poverty-prep/SECRET_DEBT_HIDDEN_CAREER_WORK_BANK_v1.md`
4. `mindy-successor/docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_SCENE_BANK_v1.md`
5. `mindy-successor/docs/poverty-prep/SECRET_DEBT_PAID_FREEDOM_CONTENT_v1.md`
6. `mindy-successor/docs/poverty-prep/SECRET_DEBT_BOUND_LIFE_CONTENT_v1.md`
7. `mindy-successor/docs/poverty-prep/SECRET_DEBT_TAKEOVER_CONTENT_v1.md`
8. `mindy-successor/prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-v1.fixture.json`
9. `mindy-successor/docs/poverty-prep/SECRET_DEBT_AUTHORED_CONTENT_HANDOFF_v1.md`

## Worker commits

- item 105 — `9c7023fb0340dd0b02874a087bf8bd47af3ef54d`
- item 106 — `a02fed277d12235aa103a041f9a15c6b8d55b534`
- item 107 — `7ae276382ca2794044bd4f8954c1adc2d15c7353`
- item 108 — `599ff07bd610eac347dc11ff9237cc513ffad9ed`
- item 109 — `a024084a8b0c6e62fcbb590eefc165f2fb07ba40`
- item 110 — `fb9c313f8180fadd44a23b4a353712892ccf4823`
- item 111 — `0b01e36e77bd5997ccbe5c7ba2f77508386f7b7f`
- item 112 — `cfeabea44d5fe2e8f72c69993892b1b2b542704d`

## No runtime/schema changes in this wave

Items 105–113 intentionally do not modify:
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- shared `content/definitions.json`;
- production catalog inclusion;
- build scripts;
- UI.

This wave cannot be used as evidence that Secret Debt mechanics are implemented.

## Palace / ordinary-career boundary

All authored content preserves:
- Secret Debt is outside the 10 ordinary careers;
- no Secret Debt outcome grants ordinary Hard Work;
- Palace prerequisite remains all 10 ordinary Hard Work careers.

## Lumber firewalls

No authored content changes:
- Lumber Hard Work eligibility = ONLY `completed_shifts >= 50`;
- exact reward = `hardWork:lumber`;
- Forest continuation boundary = `activityResult`.

## Handoff conclusion

The Secret Debt narrative/content layer is now substantially pre-authored:
- offer;
- pending/activation;
- repeatable day work;
- forced Night;
- all three required outcome families.

Lead can convert these drafts into production packs incrementally after the specific mechanical/Product decisions needed by each slice are supplied.

Do not wait for every final decision to begin ID/content plumbing, but do not guess any OPEN mechanical value.
