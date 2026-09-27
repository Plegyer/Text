# Lumber Post-Decision Migration Impact v1

Status: conservative migration-impact audit for unresolved Lumber Product decisions after PR26/PR27.

Classification values:
- **NO_SAVE_MIGRATION** — existing saves remain structurally valid; only new authored content/presentation is added.
- **CONTENT_ONLY_CHANGE** — existing runtime/schema already represents the chosen behavior.
- **NEW_DURABLE_STATE** — the Product choice introduces a new persisted fact/access/history concept, but current generic save schema may already be able to store it.
- **SCHEMA_RUNTIME_CHANGE** — only required if the accepted choice cannot be expressed by current shipped primitives.

Do not classify a choice as `SCHEMA_RUNTIME_CHANGE` merely because it introduces new content.

## D1 — Old Boundary Token acquisition source

Likely classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION** for existing saves unless Product explicitly wants retroactive ownership/eligibility.

Reason:
- item ID `old_boundary_token` already exists;
- inventory persistence already exists;
- `addItem`/item ownership semantics already exist;
- event/action/relationship/public conditions already exist.

Potential durable state:
- a new one-shot source may use existing event history/public facts;
- this is **NEW_DURABLE_STATE only at content-state level** if a new source-completion fact/event-history marker is introduced;
- it does not imply schema change by itself.

Schema/runtime change:
**NOT EXPECTED** for ordinary event/reward/purchase/relationship grant authoring.

Would require reassessment only if Product selects a source type that cannot be represented by existing event/action/relationship/item-effect primitives.

## D2 — Token acquisition timing / eligibility

Likely classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

Reason:
current public fact, relationship, calendar and typed progression conditions can express ordinary eligibility.

Potential durable state:
- only if the approved timing rule introduces a new explicit one-shot/eligibility fact not already derivable from existing state.

Schema/runtime change:
**NOT EXPECTED** unless Product requires a new condition primitive that current conditions cannot express.

## D3 — Token retained indefinitely

Classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

Reason:
no removal transaction is authored; authoritative inventory remains the access source.

New durable state:
none beyond existing inventory.

Schema/runtime change:
none expected.

## D4 — Token consumed on route use

Classification:
- **CONTENT_ONLY_CHANGE** if consumption is an explicit existing item-removal effect at the accepted route-use commit boundary;
- **NO_SAVE_MIGRATION** for ordinary existing saves.

Existing persistence can represent:
- item count decrement;
- route/capability recomputation;
- save/reload after the transaction.

New durable state:
not required solely to remove the item exactly once if the use transaction is already represented by persisted Activity option resolution/history.

Schema/runtime change:
**NOT EXPECTED** unless the accepted design requires a transaction identity/state that existing resolved option/event history cannot represent.

## D5 — Token turned in later

Classification:
- normally **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

Reason:
route use and later turn-in can be separate existing content transactions.

New durable state:
- only if Product requires a new explicit `used-but-not-yet-turned-in` phase that is not derivable from existing item/event/fact state.

Schema/runtime change:
not expected if that phase can be represented by an existing public/world/career fact or event-history marker.

## D6 — Permanent access after token removal

Classification:
- **NEW_DURABLE_STATE** if Product explicitly chooses permanent route access after the token leaves inventory.

Reason:
a durable access marker would be needed because inventory-derived `enter_old_boundary` disappears when the item is gone.

Preferred migration interpretation:
- use an existing generic persisted fact/capability/public-state mechanism if Product accepts it;
- this is new authored durable state, not automatically a schema change.

Save migration:
- old saves may need a one-time content-level transition **only if** Product requires retroactive permanent access for players who historically used/owned the token.

Schema/runtime change:
**NOT REQUIRED by default**.

Only promote to schema/runtime work if the approved permanent-access semantics cannot be represented by existing persisted facts/conditions.

## D7 — Token repeatable vs one-shot acquisition

Classification:
- **CONTENT_ONLY_CHANGE** in the ordinary case;
- **NO_SAVE_MIGRATION**.

One-shot:
- persist source completion using existing event/public state.

Repeatable:
- each grant remains an explicit item transaction.

New durable state:
- possible content-level source-history marker for one-shot behavior.

Schema/runtime change:
not expected.

## D8 — Token inventory / locked-route presentation

Classification:
- **NO_SAVE_MIGRATION**;
- **CONTENT_ONLY_CHANGE / presentation-only**.

Reason:
label/help/locked-vs-hidden route presentation does not need new persistent gameplay state.

Schema/runtime change:
none expected unless Product requests a new UI behavior impossible in the current projection model.

## D9 — Hunter-trail unlock identity

Likely classification:
- **CONTENT_ONLY_CHANGE** if the approved unlock uses existing public facts, relationship facts, item capability, or existing typed conditions;
- **NO_SAVE_MIGRATION** for existing saves by default.

New durable state:
- **YES at content level** if Product approves a new Hunter-owned public clue fact.

That fact can normally live in existing persisted public/world/progression state.

Schema/runtime change:
**NOT EXPECTED** for ordinary public-fact/item-capability gating.

Reassess only if Product selects an unlock model requiring a new condition/effect primitive.

## D10 — Hunter-trail narrative provider / acquisition source

Classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

Existing event/relationship/presentation systems can host ordinary provider scenes.

New durable state:
only the approved clue/source completion marker if needed.

Schema/runtime change:
not expected.

## D11 — Hunter-trail reward / lore / check threshold

Classification:
- usually **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

New durable state:
- only if the accepted reward/discovery introduces a new persisted fact/item.

Schema/runtime change:
not expected for ordinary facts/items/stat conditions/effects.

## D12 — School management/accounting provider

Classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION** in the ordinary forward-only implementation.

Reason:
- School lesson runtime exists;
- typed `lessons_completed` exists;
- public fact publication exists;
- Lumber consumer already expects `lumber.school.management-ready`.

New durable state:
`lumber.school.management-ready` is already the intended public result identity; publishing it is content authoring, not a new schema concept.

Schema/runtime change:
not expected.

## D13 — School management/accounting threshold or milestone

Classification:
- **CONTENT_ONLY_CHANGE** for lesson threshold / existing milestone / project / exam / certificate expressed with existing progression/event primitives;
- **NO_SAVE_MIGRATION** unless Product explicitly wants retroactive grant on load.

Retroactive behavior:
- if existing saves already satisfy the chosen threshold and Product wants the public result immediately, use normal resolver/reconciliation behavior where possible;
- do not add schema migration merely to evaluate an existing counter.

Schema/runtime change:
only if the accepted milestone type needs a genuinely missing persistent primitive.

## D14 — School Arcana / Forest public result

Classification:
- **CONTENT_ONLY_CHANGE** for existing public-fact/provider patterns;
- **NO_SAVE_MIGRATION** by default.

New durable state:
- a new approved Arcana public result fact is content-level durable state, normally representable in existing save structures.

Schema/runtime change:
not expected unless Product chooses an output shape current public facts/typed progression cannot represent.

## D15 — Hunter trail + three challenge families

Classification:
- **CONTENT_ONLY_CHANGE** under the current generic Activity option/route model;
- **NO_SAVE_MIGRATION** for saves outside an active new-content encounter.

Existing runtime already supports:
- authored options;
- conditions;
- route state;
- resolved option IDs;
- item capability checks;
- deterministic Activity save/reload.

New durable state:
- challenge-specific public facts/items only where accepted by Product;
- route/challenge completion can use existing resolved option/history seams where sufficient.

Schema/runtime change:
**NOT EXPECTED by default**.

Escalate only if accepted challenge mechanics demonstrably require persistent state that cannot fit existing Activity internal state/facts/items.

## D16 — Seasonal topology

Classification:
- **CONTENT_ONLY_CHANGE**;
- **NO_SAVE_MIGRATION**.

Reason:
calendar season already exists and authored option conditions can derive availability from it.

New durable state:
none required for deterministic season-conditioned availability itself.

Schema/runtime change:
not expected.

## D17 — Optional presentation polish

Classification:
- **NO_SAVE_MIGRATION**;
- **CONTENT_ONLY_CHANGE / asset-only**.

Reason:
semantic presentation IDs and static/text fallback already exist.

Schema/runtime change:
none expected.

## Migration decision table

| Decision | Default classification | New durable state? | Schema/runtime expected? |
| --- | --- | --- | --- |
| token source | CONTENT_ONLY_CHANGE | maybe source history | NO |
| token timing | CONTENT_ONLY_CHANGE | maybe explicit eligibility fact | NO |
| token retained | CONTENT_ONLY_CHANGE | no | NO |
| token consume-on-use | CONTENT_ONLY_CHANGE | normally no new state | NO |
| token later turn-in | CONTENT_ONLY_CHANGE | maybe use/turn-in phase fact | NO |
| permanent access after removal | NEW_DURABLE_STATE | YES | NO by default |
| repeatable/one-shot source | CONTENT_ONLY_CHANGE | maybe source history | NO |
| token presentation | NO_SAVE_MIGRATION | no | NO |
| Hunter unlock | CONTENT_ONLY_CHANGE | maybe clue fact | NO |
| Hunter provider | CONTENT_ONLY_CHANGE | maybe source fact/history | NO |
| Hunter reward/check | CONTENT_ONLY_CHANGE | maybe reward/discovery fact/item | NO |
| School management provider | CONTENT_ONLY_CHANGE | intended public result | NO |
| School management threshold | CONTENT_ONLY_CHANGE | no new schema state | NO |
| Arcana public result | CONTENT_ONLY_CHANGE | maybe new public fact | NO |
| Forest challenge depth | CONTENT_ONLY_CHANGE | only accepted challenge facts/items | NO by default |
| seasonal topology | CONTENT_ONLY_CHANGE | no | NO |
| presentation polish | NO_SAVE_MIGRATION | no | NO |

## Hard rule for future implementation

Do not introduce save-schema/runtime work merely because a Product choice becomes concrete.

Escalate to `SCHEMA_RUNTIME_CHANGE` only when accepted Product semantics cannot be represented with current:
- inventory/items;
- public/world/career/relationship facts;
- event history;
- calendar;
- typed School/career progression;
- Activity route/resolved option state;
- existing condition/effect primitives.

## Locked invariants

None of these decisions changes:
- Hard Work ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact A5 `activityResult(lumber.forest, success, lumber.forest.success)`.
