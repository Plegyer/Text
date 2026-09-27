# TASK — Chat 5 Relationships + Night Content Next v1

Date: 2026-09-27
Owner: Chat 5
Branch: `chat5/relationships-night-content-next`
Role: authored Relationships + ordinary Night content/localization only.

## Mission

Move Chat 5 from completed School localization work to the next independent content-production stream:
**typed Relationships + ordinary voluntary Night content**.

This worker does NOT own:
- shared runtime/schema/UI;
- NightFlow engine;
- Secret Debt / forced debt nights;
- Forest/poverty content;
- QA/CI coordination;
- worker dispatch.

Lead owns shared runtime/integration.
Chat 3 owns Forest + ordinary poverty + Secret Debt content.
Chat 4 owns QA/CI/Product acceptance.

## Locked rules

- Git is authoritative.
- Branch is created fresh from current main; still do not assume whole-branch merge. Lead selectively integrates reviewed files.
- One file = one active owner.
- Relationships are typed state, not one universal affection meter.
- Reactive relationship milestone dialogue is normally 0 daytime Energy.
- Voluntary relationship night uses the Night slot, not daytime Energy.
- No universal next-day Energy penalty for relationship night.
- Housing may gate availability/privacy.
- Forced Secret Debt NightFlow is a separate system and is out of scope.
- RU is source authoring language; EN is a full second locale.
- Localization affects presentation/text only.
- Gameplay IDs, relationship IDs/stages, RNG and Save identity remain locale-neutral.
- Do not invent canonical final NPC roster/ending families as Product facts. New roster ideas must be marked CONTENT_DRAFT.
- Existing Lumber Hard Work remains ONLY `completed_shifts >= 50`; relationship content must never gate it.
- Existing exact `activityResult` Forest continuation must not be altered.
- Presentation uses semantic `presentationId`; GIF choice remains presentation-only.
- No explicit sexual prose/images are required in this wave.

## Queue depth Product rule

Keep **12 independent tasks** queued/outstanding whenever practical. Complete item -> commit -> continue without waiting for Lead review.

## Queue item 1 — current-main relationship production inventory

Create NEW file only:
- `docs/relationship-prep/CURRENT_MAIN_RELATIONSHIP_PRODUCTION_INVENTORY_v1.md`

Audit current main for:
- typed relationship definitions/stages/transitions;
- root-loaded relationship events/packs;
- current Lumber Foreman relationship path;
- relationship-trigger capabilities already supported;
- current UI/presentation identities;
- current localization coverage;
- exact gaps between architecture and shipped content.

Separate SHIPPED / STAGED / PRODUCT_OPEN / RUNTIME_GAP.

## Queue item 2 — current-main ordinary Night content inventory

Create NEW file only:
- `docs/relationship-prep/CURRENT_MAIN_ORDINARY_NIGHT_CONTENT_INVENTORY_v1.md`

Audit ordinary NightFlow surfaces:
- lodging phases;
- voluntary relationship choice support;
- Lumber Foreman Night;
- Night study boundary only as dependency;
- housing restrictions;
- forced-event interception boundary.

Secret Debt forced nights are explicitly out of scope.

## Queue item 3 — Foreman relationship RU+EN localization delta v1

Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/relationship-foreman-localization-v1.fixture.json`

Provide deterministic locale-neutral localization keys with RU+EN for the currently shipped Foreman relationship/night player-facing surfaces only:
- relationship milestone title/body/choices;
- professional Night follow-up title/body/choice;
- media alt/caption where applicable.

No gameplay fields.

## Queue item 4 — Foreman localization contract test v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/relationship-foreman-localization-v1.test.ts`

Validate:
- RU+EN completeness;
- stable locale-neutral gameplay/relationship IDs;
- no condition/effect/reward duplication per locale;
- Lumber Hard Work invariants untouched;
- localization fixture contains no gameplay mutations.

## Queue item 5 — Foreman milestone content-depth bank v1

Create NEW file only:
- `docs/relationship-prep/FOREMAN_RELATIONSHIP_CONTENT_DEPTH_BANK_v1.md`

Author RU+EN milestone-neutral/professional relationship variants around the existing Foreman identity:
- work recognition;
- professional trust;
- after-work conversation;
- refusal/professional-only responses;
- seasonal presentation flavor.

Do not select unresolved final NPC name, romantic ending, Old Boundary semantics, School public-result semantics or Hunter semantics.

## Queue item 6 — ordinary relationship Night variant bank v1

Create NEW file only:
- `docs/relationship-prep/ORDINARY_RELATIONSHIP_NIGHT_VARIANT_BANK_v1.md`

Author RU+EN safe voluntary Night scene patterns that fit existing Night contracts:
- professional conversation;
- public walk;
- shared meal/conversation;
- practical help;
- polite decline;
- housing-sensitive presentation variants.

These are reusable content patterns, not canonical NPC assignments.
No universal mechanics/effects.

## Queue item 7 — relationship roster content-draft matrix v1

Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_ROSTER_CONTENT_DRAFT_MATRIX_v1.md`

Draft a **non-canonical** roster matrix for the 10 ordinary careers:
- career;
- proposed relationship archetype;
- proposed NPC role only;
- entry context;
- possible Night continuation yes/no;
- possible School/item/Activity cross-hook;
- presentation needs.

Mark every new identity `CONTENT_DRAFT / PRODUCT_NOT_LOCKED`.
Do not assign final names or endings.

## Queue item 8 — relationship cross-system hook inventory v1

Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_CROSS_SYSTEM_HOOK_INVENTORY_v1.md`

Map relationship hooks that are already legal under current contracts:
- career fact/counter/stage;
- stat threshold;
- School/world fact;
- item/capability;
- Activity result;
- housing;
- season;
- Night count.

Distinguish:
- currently shipped exact identity;
- safe authored proposal;
- Product-blocked unresolved identity.

Do not invent unresolved public facts as production.

## Queue item 9 — ordinary Night presentation identity map v1

Create NEW file only:
- `docs/relationship-prep/ORDINARY_NIGHT_PRESENTATION_IDENTITY_MAP_v1.md`

Map current and proposed safe ordinary relationship Night surfaces to:
- semantic presentationId;
- RU/EN title/body/alt/caption keys;
- current static fallback;
- future 3–5 GIF candidate opportunity.

No placeholder GIF path may be called shipped.

## Queue item 10 — Foreman relationship staging pack v1

Create NEW production-oriented file only:
- `prior-work/astra/prototype-m3.2/content/packs/relationship-target/foreman-relationship-content-v1.json`

Using existing pack/event/relationship primitives only, convert the **safe effect-free or already-authoritative professional Foreman content** from items 3–6 into a staging pack.

Requirements:
- strict namespace;
- existing `lumber.foreman` identity only;
- no new shared schema/runtime;
- no Hard Work condition/effect;
- no Product-open School/Hunter/Old Boundary facts;
- no new canonical romance route;
- presentation/content only where mechanics are unresolved.

If strict current schema cannot represent a desired beat safely, omit it and document the gap rather than changing runtime.

## Queue item 11 — Foreman staging pack regression v1

Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/foreman-relationship-content-v1.test.ts`

Validate staging pack:
- schema/namespace;
- current relationship identity only;
- no duplicate gameplay transaction;
- no daytime Energy charge;
- no universal next-day Energy penalty;
- no Lumber Hard Work drift;
- save/reload-safe deterministic content identity;
- RU+EN localization key coverage for included player-facing content.

Tests may load staging pack explicitly; do not root-load it.

## Queue item 12 — Relationships + Night integration handoff v1

Create NEW file only:
- `docs/relationship-prep/RELATIONSHIPS_NIGHT_INTEGRATION_HANDOFF_v1.md`

Consolidate items 1–11 into:
- SAFE_TO_INTEGRATE_NOW;
- STAGING_ONLY;
- CONTENT_DRAFT;
- PRODUCT_BLOCKED;
- RUNTIME_GAP;
- exact selective file list for Lead;
- recommended next 12-task wave after Lead review.

Do not manage or assign work to other chats.

Continue items 1–12 sequentially without waiting for Lead review.


## Queue item 13 — Foreman root-localization reconciliation v2
Create NEW file only:
- `docs/relationship-prep/FOREMAN_ROOT_LOCALIZATION_RECONCILIATION_v2.md`

Compare item-3 Foreman RU+EN keys against current main localization and classify ADDITIVE / IDENTICAL / CONFLICT / SHARED_UI_REQUIRED.
Do not edit root localization.

## Queue item 14 — Foreman Night-choice localization acceptance fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/foreman-night-choice-localization-acceptance-v1.fixture.json`

Describe exact expected RU/EN label behavior for `lumber.foreman.night`, locale-neutral choice ID, unchanged NightFlow state and unchanged Save.
Fixture only; shared UI remains Lead-owned.

## Queue item 15 — Foreman professional Night repetition bank v2
Create NEW file only:
- `docs/relationship-prep/FOREMAN_PROFESSIONAL_NIGHT_REPETITION_BANK_v2.md`

Author 8–12 RU+EN professional/effect-free conversation variants under the existing Foreman route.
No new thresholds/stages/rewards.

## Queue item 16 — Foreman seasonal Night presentation bank v1
Create NEW file only:
- `docs/relationship-prep/FOREMAN_SEASONAL_NIGHT_PRESENTATION_BANK_v1.md`

RU+EN spring/summer/autumn/winter presentation variants for the existing professional Night identity.
Presentation only; season must not change mechanics.

## Queue item 17 — relationship housing presentation decision packet v1
Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_HOUSING_PRESENTATION_DECISION_PACKET_v1.md`

Compare normal / cheap / street presentation variants for Foreman Night without selecting a new Product rule.
Separate SAFE_PRESENTATION_ONLY from PRODUCT_DECISION_REQUIRED.

## Queue item 18 — ordinary relationship event authoring template v1
Create NEW file only:
- `docs/relationship-prep/ORDINARY_RELATIONSHIP_EVENT_AUTHORING_TEMPLATE_v1.md`

Define reusable bilingual authoring fields, typed hook requirements, refusal/professional path, presentationId, media fallback, and Product-open markers.

## Queue item 19 — ordinary relationship Night authoring template v1
Create NEW file only:
- `docs/relationship-prep/ORDINARY_RELATIONSHIP_NIGHT_AUTHORING_TEMPLATE_v1.md`

Template for voluntary Night content: Night slot ownership, housing context, explicit next-day modifier field, RU+EN copy, semantic media identity, save-safe trigger assumptions.

## Queue item 20 — relationship public-hook request template v1
Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_PUBLIC_HOOK_REQUEST_TEMPLATE_v1.md`

Define how relationship content requests a School/world/item/Activity public fact/result without reading private subsystem state or inventing identities.

## Queue item 21 — relationship approved-capability scene bank v1
Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_APPROVED_CAPABILITY_SCENE_BANK_v1.md`

Author RU+EN effect-free acknowledgements using only already-approved current capabilities/facts.
No new capability IDs.

## Queue item 22 — relationship Activity-return scene bank v1
Create NEW file only:
- `docs/relationship-prep/RELATIONSHIP_ACTIVITY_RETURN_SCENE_BANK_v1.md`

Author RU+EN 0-Energy reaction patterns that require exact authoritative `activityResult` identities.
Forest success may be used only with the existing exact result; do not invent new Activity results.

## Queue item 23 — Foreman production presentation replacement packet v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/relationship-foreman-presentation-replacement-v1.fixture.json`

Prepare an exact presentation-only replacement packet for currently shipped Foreman milestone/Night event text, media alt/caption keys, and safe variant prose.
No duplicate event or gameplay mechanics.

## Queue item 24 — Relationships/Night selective integration handoff v2
Create NEW file only:
- `docs/relationship-prep/RELATIONSHIPS_NIGHT_INTEGRATION_HANDOFF_v2.md`

Consolidate items 13–23 into SAFE_TO_INTEGRATE_NOW / PRESENTATION_ONLY / CONTENT_DRAFT / PRODUCT_BLOCKED / SHARED_UI_REQUIRED, with exact Lead selective-copy list.

Continue 13–24 sequentially without waiting for Lead review.
