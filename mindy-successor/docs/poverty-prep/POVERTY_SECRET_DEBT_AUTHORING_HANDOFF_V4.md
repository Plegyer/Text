# Poverty / Secret Debt Authoring Handoff v4

Status: Chat 3 authoring handoff for queue items 173–183.

Worker branch:
`chat3/lumber-production-proof-next`.

Integration rule:
**do not merge this long-lived worker branch wholesale**. Lead should selectively copy reviewed files onto a fresh branch from current `main`.

This handoff separates safe ordinary-poverty text polish from presentation-only atmosphere and from Secret Debt authoring that must remain non-production until Product closes mechanics.

---

# SAFE_TEXT_POLISH

These items edit player-facing wording only. They do not alter IDs, conditions, effects, rewards, RNG, NightFlow, tuning, media identity, or save state.

## Item 173 — RU source copyedit

File:
`docs/poverty-prep/ORDINARY_POVERTY_RU_COPYEDIT_V1.md`.

Scope:
- reviewed all 84 RU entries in the ordinary-poverty localization payload;
- proposes exact-key replacement text for the entries that need polish;
- approves the remaining entries unchanged.

Primary editorial cleanup:
- remove implementation language from player-facing Russian:
  - «начальная настройка»;
  - «зафиксированный баланс»;
  - `Product lock`;
  - «механический штраф»;
  - «контекстное событие»;
  - «предмет инвентаря»;
- make consequences concrete in prose rather than describing the implementation.

Important:
the document is a replacement list by exact localization key. It does not modify the gameplay packs.

## Item 174 — EN localization copyedit

File:
`docs/poverty-prep/ORDINARY_POVERTY_EN_COPYEDIT_V1.md`.

Scope:
- reviewed all 84 EN entries against the RU source;
- proposes exact-key English replacements for the same player-facing surfaces;
- preserves English as a full second locale;
- removes internal language such as:
  - “initial tuning”;
  - “locked balance”;
  - “Product lock”;
  - “mechanical penalty”;
  - “context event”;
  - “inventory item”.

## Safe application after Lead poverty integration

After Lead merges the ordinary-poverty localization payload into the real current-main `content/localization.json`:

1. use the exact-key tables in item 173 for RU source text;
2. use the exact-key tables in item 174 for EN;
3. apply text values only;
4. do not rename keys;
5. do not touch the event packs;
6. rerun localization collision/natural-path/invariance tests from the earlier Chat 3 waves.

The canonical key families remain:
- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `event.<eventId>.choice.<choiceId>.text`;
- `media.<mediaId>.alt`.

---

# PRESENTATION_ONLY

These items add optional atmosphere/copy depth for already-shipped ordinary-poverty identities. They must not become gameplay variants automatically.

## Item 175 — recurring-scene variation bank

File:
`docs/poverty-prep/ORDINARY_POVERTY_RECURRING_VARIATION_BANK_v1.md`.

Contains RU+EN alternate prose for already-shipped repeatable ordinary-poverty event/variant identities:
- helpful street work;
- neutral autumn street;
- winter street pressure;
- summer shade;
- autumn arcade;
- winter wind;
- cheap shared room;
- recovery/help;
- cold rain;
- noisy loading;
- muddy splash.

Integration rule:
select presentation text only **after** the authoritative gameplay event and variant are already selected.

Do not turn these prose candidates into new `event.variants[]` unless a separate gameplay authoring decision explicitly creates them.

## Item 176 — cheap lodging atmosphere

File:
`docs/poverty-prep/CHEAP_LODGING_ATMOSPHERE_BANK_V1.md`.

Contains RU+EN effect-free prose for:
- crowding;
- quiet;
- weather carryover;
- shared-room details;
- before-sleep texture;
- morning transition;
- short captions.

Safe uses:
- event body alternatives;
- ambient UI copy;
- captions;
- future presentation candidates.

Not safe uses:
- new housing cost;
- extra recovery;
- a new Night choice;
- stat changes;
- item rewards.

## Item 177 — street lodging atmosphere

File:
`docs/poverty-prep/STREET_LODGING_ATMOSPHERE_BANK_V1.md`.

Contains RU+EN effect-free prose for:
- dry shelter;
- exposure;
- weather;
- night sounds;
- small routines;
- neutral ordinary nights;
- morning transition;
- short captions.

Explicit firewall:
street atmosphere does not itself create a Secret Debt encounter.

Do not add a lender, hidden obligation, surveillance, forced work, or professional lock to ordinary street-lodging copy.

## Item 178 — media alt/caption depth

File:
`docs/poverty-prep/ORDINARY_POVERTY_MEDIA_ALT_DEPTH_BANK_V1.md`.

Contains concise RU+EN alt/caption alternatives for:
- current shared `stage.outside`;
- current shared `stage.room`;
- future real media for the shipped ordinary-poverty event identities.

Safe after Lead/media integration:
- alt-text selection;
- caption selection;
- 3–5 candidate media pools;
- accessibility review.

It does not claim bespoke GIF files are shipped and does not create runtime slots.

## Presentation-only selection rule

All items 175–178 must preserve:
- same gameplay event ID;
- same variant ID;
- same choices;
- same choice effects;
- same event history;
- same lodging price;
- same NightFlow;
- same RNG/gameplay outcome.

Presentation selection may vary text/media only.

---

# AUTHORING_ONLY_SECRET_DEBT

Items 179–183 expand Secret Debt content only. They are reusable authoring banks, not root-loaded production content.

## Item 179 — lender dialogue bank v2

File:
`docs/poverty-prep/SECRET_DEBT_LENDER_DIALOGUE_BANK_V2.md`.

Expands RU+EN offer/accept/refuse dialogue across existing concepts:
- rain;
- market close;
- warm drink;
- no-pity practical offer;
- envelope.

Safe authored properties:
- voluntary offer presentation;
- clear refusal language;
- qualitative “money / advance / help” wording;
- no exact amount;
- no exact delay.

Still not selected:
- lender canonical identity;
- probability;
- one-time trigger implementation;
- principal;
- debt amount;
- repayment schedule;
- acceptance effect;
- refusal effect beyond authored offer closure.

## Item 180 — delayed activation scene bank v2

File:
`docs/poverty-prep/SECRET_DEBT_DELAYED_ACTIVATION_SCENE_BANK_V2.md`.

Expands RU+EN presentation for:
- temporary relief;
- ambiguous reminder;
- pre-activation;
- activation notice.

No exact elapsed days, debt amount, countdown, penalty, or activation rule is authored.

## Item 181 — hidden-work scene bank v2

File:
`docs/poverty-prep/SECRET_DEBT_HIDDEN_WORK_SCENE_BANK_V2.md`.

Expands RU+EN hidden-work presentation:
- sorting/carrying;
- cleanup;
- supervised delivery;
- inventory count;
- records;
- waiting duty;
- backroom support;
- controlled errands;
- opaque service;
- reusable work lines.

The file intentionally does not create:
- hidden-career production ID;
- pay;
- Energy cost;
- stat gain;
- progress counter;
- compliance/resistance score;
- ordinary-career credit;
- Palace credit.

## Item 182 — forced-Night presentation bank v2

File:
`docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_PRESENTATION_BANK_V2.md`.

Expands RU+EN forced-Night presentation for the existing conceptual families:
- late summons;
- inventory;
- escort;
- cleanup;
- watch;
- private ledger;
- personal errand;
- correction;
- trusted task;
- ambiguous kindness.

Explicitly Product-open:
- interception point;
- interception frequency;
- probability;
- lodging relationship;
- voluntary Night replacement/defer behavior;
- School/Foreman Night interactions;
- Energy/stat/Grooming/money penalties;
- debt/hidden-work progression.

## Item 183 — outcome presentation bank v2

File:
`docs/poverty-prep/SECRET_DEBT_OUTCOME_PRESENTATION_BANK_V2.md`.

Expands RU+EN presentation for the fixed outcome families:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Adds:
- approach variants;
- confrontation/commitment variants;
- resolution variants;
- aftermath variants;
- run-result copy candidates;
- cross-outcome tone guidance.

It does not select:
- eligibility thresholds;
- debt-state requirement;
- hidden-work thresholds;
- external dependency;
- takeover leverage identity;
- outcome-choice surfacing;
- Meta rewards.

---

# PRODUCT_BLOCKED

The following remain explicitly unresolved and must not be inferred from prose.

## Secret Debt entry

OPEN:
- encounter probability;
- canonical lender identity;
- one-time trigger implementation;
- principal;
- debt amount;
- repayment schedule;
- activation delay.

## Bound / hidden-work mechanics

OPEN:
- hidden-career ID;
- work availability;
- Energy cost;
- pay;
- stat gains;
- progression counters;
- thresholds;
- whether/how compliance or resistance exists;
- how 10 ordinary careers are blocked in runtime while preserving progress.

Locked concept only:
bound state blocks 10 ordinary careers while preserving their progress.

## Forced Night

OPEN:
- intercept location in NightFlow;
- frequency;
- trigger mechanism;
- relationship to lodging payment;
- relationship to voluntary Night choice;
- School Night Study behavior;
- Foreman Night behavior;
- next-day penalties;
- state progression.

## Outcomes

Fixed names:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

OPEN:
- thresholds;
- eligibility;
- external dependencies;
- takeover leverage identity;
- exact ending integration;
- exact Meta rewards.

Locked:
Secret Debt is **not Palace 10/10**.

Do not add:
- `hardWork:secret-debt`;
- an 11th ordinary Hard Work career;
- Secret Debt outcome credit toward Palace career count.

---

# Exact text/content assets useful after Lead poverty integration

## Exact-key ordinary-poverty text polish

Primary files:
- `ORDINARY_POVERTY_RU_COPYEDIT_V1.md`;
- `ORDINARY_POVERTY_EN_COPYEDIT_V1.md`.

Use after the real localization bundle exists on current main.

These two files are the authoritative text-polish proposals from this wave because they are keyed to the current 84-key ordinary-poverty localization namespace.

## Existing exact-key localization fixtures from prior wave

Still useful:
- `prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-event-localization-key-map-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-surface-localization-v1.fixture.json`.

Recommended use:
1. integrate the real poverty localization;
2. apply item-173/174 exact-key copy polish;
3. localize remaining shared Night/lodging UI with the shared-surface fixture only through Lead-owned UI wiring;
4. run prior collision/invariance/natural-path coverage.

## Presentation banks useful after integration

Ordinary poverty:
- `ORDINARY_POVERTY_RECURRING_VARIATION_BANK_v1.md`;
- `CHEAP_LODGING_ATMOSPHERE_BANK_V1.md`;
- `STREET_LODGING_ATMOSPHERE_BANK_V1.md`;
- `ORDINARY_POVERTY_MEDIA_ALT_DEPTH_BANK_V1.md`.

These are not replacements for localization keys until a real presentation slot/text-candidate design exists.

## Secret Debt authoring banks

Use only after authoritative production mechanics exist:
- `SECRET_DEBT_LENDER_DIALOGUE_BANK_V2.md`;
- `SECRET_DEBT_DELAYED_ACTIVATION_SCENE_BANK_V2.md`;
- `SECRET_DEBT_HIDDEN_WORK_SCENE_BANK_V2.md`;
- `SECRET_DEBT_FORCED_NIGHT_PRESENTATION_BANK_V2.md`;
- `SECRET_DEBT_OUTCOME_PRESENTATION_BANK_V2.md`;
- prior `SECRET_DEBT_BILINGUAL_LOCALIZATION_KEY_INVENTORY_v1.md`.

The localization-key inventory provides stable authoring names, but it must not be treated as a production localization delta until production gameplay identities/mechanics are accepted.

---

# Recommended Lead sequence

## Ordinary poverty

1. merge/review the current ordinary-poverty localization delta on a fresh branch from current `main`;
2. apply item 173 RU exact-key text replacements;
3. apply item 174 EN exact-key text replacements;
4. wire remaining shared Night/lodging UI through Lead-owned localization consumption;
5. run collision guards;
6. run RU/EN natural-path and all-six-pack tests;
7. run locale-invariance/reload tests;
8. run full check and exact-head CI;
9. only then select recurring presentation/media alternatives from items 175–178.

## Secret Debt

1. keep items 179–183 as authoring-only;
2. obtain Product decisions for every blocked mechanic;
3. define authoritative production identities;
4. define root-loaded gameplay/content packs;
5. derive localization keys from authoritative identities;
6. reuse the v2 banks as RU source / EN localization material;
7. add forced-Night integration only through shared NightFlow design;
8. add outcome presentation only after eligibility/reward mechanics exist.

---

# Locked invariants preserved

Ordinary poverty:
- separate from Secret Debt;
- localization/presentation changes mechanics never;
- current production conditions/effects/tuning remain authority.

Secret Debt:
- begins from street context when eventually activated;
- bound state blocks 10 ordinary careers while preserving their progress;
- does not count toward Palace 10/10;
- outcome names remain exactly:
  - `paid_freedom`;
  - `bound_life`;
  - `takeover`;
- unresolved probability/principal/debt/delay/forced-Night penalties/outcome thresholds/Meta rewards remain OPEN.

## Handoff conclusion

Items 173–183 now provide:
- exact-key RU source polish;
- exact-key EN localization polish;
- recurring ordinary-poverty prose;
- cheap/street atmosphere depth;
- media alt/caption depth;
- expanded lender dialogue;
- delayed-activation scenes;
- hidden-work scenes;
- forced-Night scenes;
- outcome presentation depth.

The ordinary-poverty material is ready for selective text integration after Lead’s localization merge. Secret Debt remains authored and localization-ready in prose, but mechanically Product-blocked.
