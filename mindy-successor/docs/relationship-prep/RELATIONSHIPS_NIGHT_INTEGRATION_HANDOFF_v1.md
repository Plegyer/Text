# Relationships + Night Integration Handoff v1

Date: 2026-09-27  
Owner stream: Chat 5 — typed Relationships + ordinary voluntary Night content/localization  
Branch: `chat5/relationships-night-content-next`  
Scope completed: queue items 1–11 consolidated for selective Lead integration

This handoff does not change shared runtime/schema/UI/NightFlow, Forest/poverty/Secret Debt content, QA/CI ownership, or worker coordination. Git remains authoritative.

## SAFE_TO_INTEGRATE_NOW

### Current-main audits and authoring references

The following docs are safe to integrate as current-state/content-authoring references because they do not mutate gameplay:

1. `docs/relationship-prep/CURRENT_MAIN_RELATIONSHIP_PRODUCTION_INVENTORY_v1.md`
2. `docs/relationship-prep/CURRENT_MAIN_ORDINARY_NIGHT_CONTENT_INVENTORY_v1.md`
3. `docs/relationship-prep/FOREMAN_RELATIONSHIP_CONTENT_DEPTH_BANK_v1.md`
4. `docs/relationship-prep/ORDINARY_RELATIONSHIP_NIGHT_VARIANT_BANK_v1.md`
5. `docs/relationship-prep/RELATIONSHIP_ROSTER_CONTENT_DRAFT_MATRIX_v1.md`
6. `docs/relationship-prep/RELATIONSHIP_CROSS_SYSTEM_HOOK_INVENTORY_v1.md`
7. `docs/relationship-prep/ORDINARY_NIGHT_PRESENTATION_IDENTITY_MAP_v1.md`

The roster and reusable variant docs remain explicitly non-canonical where marked; integrating the documents does not make their proposed roles Product facts.

### Foreman RU+EN localization fixture

`prior-work/astra/prototype-m3.2/content/relationship-foreman-localization-v1.fixture.json`

This fixture is safe source material for the **currently shipped** Foreman relationship surfaces only. It contains locale-neutral keys with complete RU+EN values and no gameplay fields.

Covered current identities:

- `lumber.foreman-notice`
- `lumber.foreman.night` label
- `lumber-night.foreman-professional`
- `relationship.lumber.foreman.professional` media alt
- `relationship.lumber.foreman.night.professional` media alt

Safe selective integration action for Lead: copy/reconcile these strings into the authoritative localization bundle without changing event/relationship IDs, conditions, effects, RNG, or Save state.

Important shared-UI caveat: the current Night choice list does not resolve `nightChoice.<id>.label`, so the prepared `nightChoice.lumber.foreman.night.label` key will not affect that menu until Lead chooses to wire the existing localization layer into Night-choice labels.

### Localization regression

`prior-work/astra/prototype-m3.2/tests/relationship-foreman-localization-v1.test.ts`

This test is designed to protect:

- RU+EN completeness;
- locale-neutral IDs;
- localization-only fixture structure;
- no per-locale gameplay duplication;
- current `lumber.foreman` identity;
- Lumber Hard Work exactly `completed_shifts >= 50`;
- reward identity exactly `hardWork:lumber`.

It does not edit shared runtime.

## STAGING_ONLY

### Foreman relationship staging pack

`prior-work/astra/prototype-m3.2/content/packs/relationship-target/foreman-relationship-content-v1.json`

This file must remain explicit-load staging unless Lead selectively merges its presentation copy into the existing production event.

Its important shape:

- pack id remains `lumber`;
- event id remains the already-shipped `lumber.foreman-notice`;
- relationship identity remains `lumber.foreman`;
- source domain remains `lumber.foreman`;
- reaction trigger, conditions, priority, variant media identity, choice id, and relationship transition effects intentionally match current production mechanics;
- RU source fallback replaces only player-facing presentation copy;
- no new relationship stage, route, counter, fact, School/Hunter/Old Boundary identity, reward, Energy change, or Hard Work effect is added.

Because its pack/event/media identities overlap the current root `lumber-production.json`, **do not root-load this staging file alongside the production pack**. It is a replacement/reference packet for selective content extraction, not an additive pack.

This choice is intentional: current strict pack schema has no bilingual event object, while item 3 already provides locale coverage for the shipped event ID. Creating a second additive Foreman milestone solely to carry deeper prose would duplicate gameplay identity.

### Foreman staging regression

`prior-work/astra/prototype-m3.2/tests/foreman-relationship-content-v1.test.ts`

The test loads the staging pack explicitly against a minimal current definition slice. It validates:

- schema and event namespace;
- current relationship identity only;
- mechanical equivalence to shipped `lumber.foreman-notice`;
- no duplicate gameplay transaction;
- no daytime Energy charge;
- no `addNextDayModifier`;
- current `lumber.foreman.night` remains next-day Energy 0;
- Hard Work remains exactly locked;
- pending event/presentation identity survives save/reload;
- staged RU source fields have full EN coverage from item 3.

The pack and this regression should be reviewed together.

## CONTENT_DRAFT

The following authored material is intentionally useful but non-canonical:

### Foreman depth bank

The Foreman bank provides professional work-recognition, trust-tone, after-work conversation, refusal/professional-only responses, and seasonal presentation flavor. It does **not** select deeper stages, romance, ending, final NPC name, or unresolved cross-system semantics.

### Ordinary relationship Night pattern bank

Reusable patterns include:

- professional conversation;
- public walk;
- shared meal/conversation;
- practical help;
- polite decline;
- professional-only boundary;
- normal/cheap/street presentation substitutions.

These are scene shapes, not canonical NPC assignments or universal effects.

### Ten-career roster matrix

Only `lumber.foreman` is an existing shipped relationship identity. Every proposed role for Satyr Maid, Undead Farm, Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin, and Prostitute is marked:

`CONTENT_DRAFT / PRODUCT_NOT_LOCKED`.

No proposed role has a final name or ending.

### Proposed presentation identities

Template presentation IDs in the identity map use placeholders such as `<relationship-id>` and `<event-id>`. They are authoring conventions, not shipped identifiers.

No placeholder GIF path is presented as production media.

## PRODUCT_BLOCKED

The following decisions remain unresolved and must not be inferred from this wave:

- final relationship/NPC roster for the ten ordinary careers;
- final NPC names/biographies and whether one NPC spans multiple careers;
- final Foreman identity/name and characterization beyond the existing role;
- Foreman stages beyond `unknown -> professional -> route-professional`;
- trusted/personal/close/rival/resolved route definitions;
- exact `night_meetings` thresholds for future milestones;
- romantic/close-route content and relationship ending families;
- whether/how relationship progress persists into Meta;
- exact Foreman housing/privacy rule;
- exact ordinary relationship Night cooldown/repeat policy;
- exact School management/accounting public result and producer semantics;
- Hunter cross-hook semantics;
- Old Boundary Token acquisition/retain/consume/turn-in semantics;
- any new Activity result identity;
- any Palace/meta relationship route;
- final real relationship GIF/static asset production.

Current root `lumber-cross.school-management-return` may consume `lumber.school.management-ready`, but this wave does not treat the upstream School result as Product-locked.

## RUNTIME_GAP

No relationship-state, Resolver, Save, or NightFlow engine gap was found that blocks the safe ordinary relationship content wave. Current runtime already supports:

- typed relationship stage/fact/choice/counter state;
- relationship transitions;
- career/stat/world/item/housing/season relationship conditions;
- relationship/career/world/Activity/Night reaction triggers;
- voluntary Night slot;
- explicit next-day modifiers;
- save/reload-stable pending identity;
- semantic relationship `presentationId`;
- deterministic presentation-only 3–5 GIF pools.

Bounded shared gaps discovered:

1. **Night choice label localization:** `nightChoiceList()` currently renders `choice.label` directly instead of a locale key. The RU key is authored in item 3 but shared UI consumption is Lead-owned.
2. **Per-choice Night presentation:** the pre-selection Night menu requests generic `night/choice/default`; there is no per-choice semantic presentation slot. This is not required to ship the existing Foreman event because its post-choice event already owns a relationship `presentationId`.
3. **Relationship roster UI:** there is no dedicated relationship browser/state screen. The current reactive content contract does not require one; if Product later wants one, it is shared UI work.
4. **Deeper Foreman definition:** current authoritative definition exposes only three stages and two transitions. New authored mechanics cannot safely create deeper routes until Product/Lead extends the definition.

None of these gaps authorizes Chat 5 to edit shared runtime/schema/UI.

## Exact selective file list for Lead

Files created in queue order:

1. `mindy-successor/docs/relationship-prep/CURRENT_MAIN_RELATIONSHIP_PRODUCTION_INVENTORY_v1.md`
2. `mindy-successor/docs/relationship-prep/CURRENT_MAIN_ORDINARY_NIGHT_CONTENT_INVENTORY_v1.md`
3. `mindy-successor/prior-work/astra/prototype-m3.2/content/relationship-foreman-localization-v1.fixture.json`
4. `mindy-successor/prior-work/astra/prototype-m3.2/tests/relationship-foreman-localization-v1.test.ts`
5. `mindy-successor/docs/relationship-prep/FOREMAN_RELATIONSHIP_CONTENT_DEPTH_BANK_v1.md`
6. `mindy-successor/docs/relationship-prep/ORDINARY_RELATIONSHIP_NIGHT_VARIANT_BANK_v1.md`
7. `mindy-successor/docs/relationship-prep/RELATIONSHIP_ROSTER_CONTENT_DRAFT_MATRIX_v1.md`
8. `mindy-successor/docs/relationship-prep/RELATIONSHIP_CROSS_SYSTEM_HOOK_INVENTORY_v1.md`
9. `mindy-successor/docs/relationship-prep/ORDINARY_NIGHT_PRESENTATION_IDENTITY_MAP_v1.md`
10. `mindy-successor/prior-work/astra/prototype-m3.2/content/packs/relationship-target/foreman-relationship-content-v1.json`
11. `mindy-successor/prior-work/astra/prototype-m3.2/tests/foreman-relationship-content-v1.test.ts`
12. `mindy-successor/docs/relationship-prep/RELATIONSHIPS_NIGHT_INTEGRATION_HANDOFF_v1.md` — this handoff.

Recommended selective order:

1. docs/inventories and content banks;
2. localization fixture content -> reconcile into root localization;
3. localization regression;
4. review staging pack + staging regression together;
5. selectively copy the approved RU source presentation fields into the existing production Foreman event rather than root-loading the nested staging replacement.

## Locked invariants preserved by this wave

- Relationship milestone dialogue remains normally 0 daytime Energy.
- Voluntary relationship Night uses the Night slot.
- No universal next-day Energy penalty exists for ordinary relationship Night.
- RU is source authoring language; EN is full second locale.
- Locale is presentation-only.
- Relationship/gameplay IDs remain locale-neutral.
- Lumber Hard Work eligibility remains only `completed_shifts >= 50`.
- Lumber Hard Work reward remains `hardWork:lumber`.
- Forest continuation remains exact typed `activityResult`.
- Secret Debt forced Night remains a separate out-of-scope system.
- No new relationship NPC identity is promoted to canon.

## Recommended next 12-task wave after Lead review

This is a proposed continuation for the same Relationships + ordinary Night content stream only; it does not assign or manage any other chat.

1. **Foreman root-localization reconciliation packet v2** — produce an exact key-by-key merge map against whatever localization content Lead has integrated.
2. **Foreman Night-choice localization acceptance fixture** — once/if shared UI consumes `nightChoice.<id>.label`, verify RU/EN menu behavior without Save drift.
3. **Foreman professional Night repetition bank v2** — add 6–10 RU+EN effect-free professional conversation variants under the existing route, with no new threshold.
4. **Foreman seasonal Night presentation bank v1** — RU+EN setting variants that remain presentation-only.
5. **Relationship housing presentation decision packet v1** — compare normal/cheap/street Foreman variants without selecting the Product rule.
6. **Ordinary relationship event authoring template v1** — reusable fields, public-hook checklist, bilingual/presentation requirements, refusal path.
7. **Ordinary relationship Night authoring template v1** — voluntary slot, housing, next-day modifier explicitness, localization/presentation checklist.
8. **Relationship public-hook request template v1** — format for requesting a School/world/item/Activity public identity without reading private subsystem state.
9. **Relationship item/capability scene bank v1** — bilingual effect-free acknowledgements for already-approved capabilities only.
10. **Relationship Activity-return scene bank v1** — bilingual 0-Energy reaction patterns that require an exact authoritative `activityResult`.
11. **Relationship media production brief v1** — semantic IDs, fallback frames, 3–5 GIF opportunity criteria, localized alt/caption copy, no placeholder assets counted as shipped.
12. **Relationships/Night next-wave handoff v2** — consolidate only decisions and files actually accepted after Lead review.

Any future roster-specific production pack should wait for Product to lock the corresponding relationship identity/role or explicitly authorize a noncanonical staging identity.

## Integration conclusion

Current main already has enough typed relationship and Night infrastructure to author ordinary professional relationship content safely. The near-term integration opportunity is primarily bilingual presentation depth for the existing `lumber.foreman` path, not a new relationship engine.

The most important selective integration rule is simple: preserve the existing gameplay identities and transactions, merge RU+EN presentation content around them, and keep all deeper roster/route decisions visibly Product-open until they are actually selected.
