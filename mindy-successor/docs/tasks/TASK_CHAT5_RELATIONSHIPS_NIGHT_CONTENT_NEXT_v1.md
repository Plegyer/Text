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


## Queue item 25 — non-Lumber ordinary-career result content audit v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_CAREER_RESULT_CONTENT_AUDIT_v1.md`

Audit current main for the nine non-Lumber ordinary careers: current action/result semantic presentation IDs, shipped RU+EN result copy coverage, generic text reuse and safe presentation-only depth opportunities.

## Queue item 26 — Satyr Maid result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/SATYR_MAID_RESULT_COPY_BANK_RU_EN_v1.md`

Author bilingual presentation-only result variants for the existing Satyr Maid shift identity. No new mechanics/relationships.

## Queue item 27 — Undead Farm result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/UNDEAD_FARM_RESULT_COPY_BANK_RU_EN_v1.md`

Same boundary for current Undead Farm shift/result identity.

## Queue item 28 — Tavern result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/TAVERN_RESULT_COPY_BANK_RU_EN_v1.md`

Same boundary for current Tavern shift/result identity.

## Queue item 29 — Hunter ordinary-shift result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/HUNTER_ORDINARY_SHIFT_RESULT_COPY_BANK_RU_EN_v1.md`

Cover only ordinary Hunter career shift/result presentation. Do not invent Forest Hunter route, clue, token or Old Boundary semantics.

## Queue item 30 — Guard result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/GUARD_RESULT_COPY_BANK_RU_EN_v1.md`

Presentation-only bilingual result variants for current Guard identity.

## Queue item 31 — Merchant result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/MERCHANT_RESULT_COPY_BANK_RU_EN_v1.md`

Presentation-only bilingual result variants for current Merchant identity.

## Queue item 32 — Artist/Geisha result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/ARTIST_GEISHA_RESULT_COPY_BANK_RU_EN_v1.md`

Presentation-only bilingual result variants for current Artist/Geisha identity.

## Queue item 33 — Assassin result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/ASSASSIN_RESULT_COPY_BANK_RU_EN_v1.md`

Presentation-only bilingual result variants for current Assassin identity. Do not add violent mechanics/rewards.

## Queue item 34 — Prostitute result copy bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/PROSTITUTE_RESULT_COPY_BANK_RU_EN_v1.md`

Presentation-only bilingual result variants for current career identity. Keep copy non-explicit and do not alter mechanics.

## Queue item 35 — non-Lumber career result localization/presentation staging fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/non-lumber-career-result-presentation-v1.fixture.json`

Map items 26–34 to exact existing current-main action/result presentation identities and proposed stable RU+EN keys. No duplicate events, conditions, effects, rewards, RNG or Save changes.

## Queue item 36 — non-Lumber career content-depth handoff v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_CAREER_CONTENT_DEPTH_HANDOFF_v1.md`

Consolidate items 25–35 into SAFE_PRESENTATION_COPY / STAGING_ONLY / PRODUCT_OPEN / SHARED_UI_REQUIRED with exact Lead selective-copy list.

Continue items 25–36 sequentially without waiting for Lead review.


## Queue item 37 — non-Lumber result localization production delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/non-lumber-career-result-localization-v1.fixture.json`

Convert items 26–34 into exact stable RU+EN localization entries for current non-Lumber result presentation only.
Use existing action/result identities; no new gameplay/content pack IDs.

## Queue item 38 — non-Lumber result localization collision guard v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/non-lumber-career-result-localization-v1.test.ts`

Validate item 37 against current main:
- exact nine current ordinary-career action IDs;
- RU+EN completeness;
- additive or exact-identical keys only;
- no mechanics/effects/rewards/RNG/Save fields;
- no Lumber/Forest/Secret Debt contamination.

## Queue item 39 — non-Lumber result UI expected-state fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/non-lumber-career-result-ui-smoke-v1.fixture.json`

For all nine careers, provide:
- action ID;
- current result presentationId;
- expected RU title/body;
- expected EN title/body;
- exact unchanged result mechanics references.

Fixture only; shared UI remains Lead-owned.

## Queue item 40 — Tavern/Hunter/Guard result copy normalization v2
Create NEW file only:
- `docs/relationship-prep/TAVERN_HUNTER_GUARD_RESULT_COPY_NORMALIZATION_V2.md`

Normalize authored RU+EN result prose from items 28–30 for consistent length, tone, no internal implementation language and no invented mechanics.

## Queue item 41 — Merchant/Artist-Geisha result copy normalization v2
Create NEW file only:
- `docs/relationship-prep/MERCHANT_ARTIST_GEISHA_RESULT_COPY_NORMALIZATION_V2.md`

Same normalization for items 31–32.

## Queue item 42 — Assassin/Prostitute result copy normalization v2
Create NEW file only:
- `docs/relationship-prep/ASSASSIN_PROSTITUTE_RESULT_COPY_NORMALIZATION_V2.md`

Same normalization for items 33–34.
Keep Prostitute content non-explicit and Assassin content presentation-only.

## Queue item 43 — Satyr Maid/Undead Farm result parity review v2
Create NEW file only:
- `docs/relationship-prep/SATYR_MAID_UNDEAD_FARM_RESULT_PARITY_REVIEW_V2.md`

Compare existing current-main prose against items 26–27 and identify exact text-only replacements needed for RU-source/EN parity.

## Queue item 44 — ordinary-career result presentation key map v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/ordinary-career-result-localization-key-map-v1.fixture.json`

Map all 10 ordinary careers, including Lumber as reference-only, to:
- action ID;
- result presentationId;
- title localization key;
- body localization key;
- media alt key.
Do not modify Lumber content.

## Queue item 45 — non-Lumber result copy duplication audit v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_RESULT_COPY_DUPLICATION_AUDIT_V1.md`

Detect near-duplicate RU/EN lines across the nine career result banks.
Recommend text-only differentiation by career while preserving current mechanics and semantic IDs.

## Queue item 46 — non-Lumber result localization natural-path plan v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_RESULT_LOCALIZATION_NATURAL_PATH_PLAN_V1.md`

For each of the nine current careers, document the shortest existing production path to a result screen and the invariants Lead tests must check across RU↔EN.

No new test runtime helpers.

## Queue item 47 — non-Lumber result production integration checklist v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_RESULT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`

Define exact Lead acceptance:
- root localization merge;
- shared UI result title/body consumption;
- same result presentationId;
- same deltas/actionCounts/Save;
- RU↔EN switch invariance;
- exact-head CI;
- no worker branch wholesale merge.

## Queue item 48 — non-Lumber result integration handoff v2
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_CAREER_CONTENT_DEPTH_HANDOFF_V2.md`

Consolidate items 37–47 into SAFE_TO_COPY_NOW / SHARED_UI_REQUIRED / PRESENTATION_ONLY / PRODUCT_OPEN with exact selective-copy file list and recommended next work only after Lead integration.

Continue items 37–48 sequentially without waiting for Lead review.


## Queue item 49 — non-Lumber seasonal work-scene copy audit v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_SEASONAL_WORK_SCENE_COPY_AUDIT_V1.md`

Audit current main seasonal work-scene presentation text for the nine non-Lumber ordinary careers.
For each spring/summer/autumn/winter identity classify:
- SHIPPED_RU_ONLY;
- SHIPPED_RU_EN;
- GENERIC_OR_REUSED;
- MISSING;
- PRODUCT_OPEN.

Do not change mechanics or semantic IDs.

## Queue item 50 — Satyr Maid seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/SATYR_MAID_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Author concise RU-source + full EN spring/summer/autumn/winter work-scene prose for the exact current Satyr Maid seasonal presentation identities.

## Queue item 51 — Undead Farm seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/UNDEAD_FARM_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Same for current Undead Farm seasonal identities.

## Queue item 52 — Tavern seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/TAVERN_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Same for current Tavern seasonal identities.

## Queue item 53 — Hunter ordinary-work seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/HUNTER_ORDINARY_WORK_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Cover only ordinary Hunter work seasonal presentation.
Do not introduce Forest Hunter route, clue, token, Old Boundary or expedition semantics.

## Queue item 54 — Guard seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/GUARD_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Same for current Guard seasonal identities.

## Queue item 55 — Merchant seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/MERCHANT_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Same for current Merchant seasonal identities.

## Queue item 56 — Artist/Geisha seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/ARTIST_GEISHA_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Same for current Artist/Geisha seasonal identities.

## Queue item 57 — Assassin seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/ASSASSIN_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Presentation-only seasonal work prose for current Assassin identities.
Do not add violence mechanics/rewards or new mission semantics.

## Queue item 58 — Prostitute seasonal scene bank RU+EN v1
Create NEW file only:
- `docs/relationship-prep/PROSTITUTE_SEASONAL_SCENE_BANK_RU_EN_V1.md`

Presentation-only seasonal work prose for current career identities.
Keep content non-explicit, voluntary and mechanics-neutral.

## Queue item 59 — non-Lumber seasonal scene localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/non-lumber-seasonal-scene-localization-v1.fixture.json`

Map items 50–58 to the exact current 36 seasonal presentation IDs/keys.
Requirements:
- RU+EN complete;
- current IDs only;
- no gameplay fields;
- no Lumber edits;
- no media path duplication;
- compatible with Chat2 project-owned seasonal static assets.

## Queue item 60 — non-Lumber seasonal scene integration handoff v1
Create NEW file only:
- `docs/relationship-prep/NON_LUMBER_SEASONAL_SCENE_INTEGRATION_HANDOFF_V1.md`

Consolidate items 49–59 into SAFE_TEXT_SOURCE / SHARED_PRESENTATION_CONSUMER_REQUIRED / PRODUCT_OPEN with exact selective-copy files and the expected Lead/QA invariants.

Continue items 49–60 sequentially without waiting for Lead review.


## Queue item 61 — generic world bilingual debt audit v1
Create NEW file only:
- `docs/relationship-prep/GENERIC_WORLD_BILINGUAL_DEBT_AUDIT_V1.md`

Audit current main root-event localization debt outside Chat3/School/Lumber ownership.
Scope only:
- `base.*` except already-localized `base.school`;
- `gopher.*`;
- `stage.goblin`.

Explicitly exclude:
- `ds-lumber.*`;
- `lumber-cross.*`;
- `lumber.career-first-shift`;
- poverty;
- School;
- Forest;
- Secret Debt.

## Queue item 62 — base generic-world RU+EN localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/base-generic-world-localization-v1.fixture.json`

Provide complete RU-source + EN localization for current shipped:
- `base.arrival`;
- `base.order`;
- `base.bran`;
- `base.invite`;
- `base.workday`;
- `base.winter`;
- `base.shelter`.

Exact existing event/variant/choice identities only.

## Queue item 63 — gopher early-chain localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/gopher-early-chain-localization-v1.fixture.json`

Cover current shipped:
- `gopher.arrival`;
- `gopher.tavern-intro`;
- `gopher.tavern-quest`;
- `gopher.receipt`.

No trigger/effect/reward changes.

## Queue item 64 — gopher resolution/routine localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/gopher-resolution-localization-v1.fixture.json`

Cover current shipped:
- `gopher.tavern-resolution`;
- `gopher.tavern-routine`.

## Queue item 65 — gopher woods/hunt/landlord localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/gopher-world-hooks-localization-v1.fixture.json`

Cover current shipped:
- `gopher.woods-intro`;
- `gopher.hunt-intro`;
- `gopher.landlord`.

Hunter here is only the existing gopher/tutorial event text; do not introduce Forest Hunter route semantics.

## Queue item 66 — stage goblin bilingual localization delta v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/stage-goblin-localization-v1.fixture.json`

Provide complete RU+EN title/variant/choice text for current `stage.goblin` event only.
No mechanics changes.

## Queue item 67 — generic-world localization collision guard v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/generic-world-localization-collision-v1.test.ts`

Validate items 62–66:
- exact current event IDs;
- RU+EN complete;
- additive or exact-identical root collision policy;
- no gameplay fields;
- excluded Lumber/poverty/School/Secret Debt namespaces absent.

## Queue item 68 — generic-world natural-path inventory v1
Create NEW file only:
- `docs/relationship-prep/GENERIC_WORLD_NATURAL_PATH_INVENTORY_V1.md`

Document the shortest current production path to every event covered by items 62–66 and whether it is blocking/queued/repeatable.
Do not invent new trigger behavior.

## Queue item 69 — generic-world media-alt debt audit v1
Create NEW file only:
- `docs/relationship-prep/GENERIC_WORLD_MEDIA_ALT_DEBT_AUDIT_V1.md`

For media used by covered base/gopher/stage events, classify:
- ROOT_RU_EN_ALT;
- EMBEDDED_RU_ONLY;
- SHARED_GENERIC;
- MISSING;
- NOT_PLAYER_FACING.

## Queue item 70 — generic-world media-alt localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/generic-world-media-alt-localization-v1.fixture.json`

Provide RU+EN alt strings only for current player-facing media identities actually used by items 62–66.
No media path changes.

## Queue item 71 — generic-world locale-invariance acceptance plan v1
Create NEW file only:
- `docs/relationship-prep/GENERIC_WORLD_LOCALE_INVARIANCE_ACCEPTANCE_PLAN_V1.md`

Define Lead/QA checks for RU↔EN switch:
same event/variant/choice IDs, same media identity, same RNG/Save, same effects exactly once, only text/alt changes.

## Queue item 72 — generic-world bilingual integration handoff v1
Create NEW file only:
- `docs/relationship-prep/GENERIC_WORLD_BILINGUAL_INTEGRATION_HANDOFF_V1.md`

Consolidate 61–71 into SAFE_TO_COPY_NOW / SHARED_UI_OR_MEDIA_REQUIRED / PRODUCT_OPEN with exact selective-copy files and current-main baseline.

Continue items 61–72 sequentially without waiting for Lead review.


## Queue item 61 — current-main legacy root-event localization debt audit v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_EVENT_LOCALIZATION_DEBT_AUDIT_V1.md`

Audit exact current-main root-loaded player-facing event localization debt outside:
- Forest route/result work owned by Chat3;
- School already shipped/localized;
- ordinary poverty;
- Foreman;
- Secret Debt/Product-open content.

Classify exact remaining event IDs and fields as RU_FALLBACK_ONLY / PARTIAL_RU_EN / NON_PLAYER_FACING / PRODUCT_OPEN.

## Queue item 62 — base arrival/home legacy event RU+EN bank v1
Create NEW file only:
- `docs/relationship-prep/BASE_ARRIVAL_HOME_EVENT_BANK_RU_EN_V1.md`

Author/polish RU-source + full EN title/body/choice text for current reachable `base.*` arrival/home/town-introduction events only.
Do not change flags, effects, conditions or arrival mechanics.

## Queue item 63 — base ordinary-town legacy event RU+EN bank v1
Create NEW file only:
- `docs/relationship-prep/BASE_ORDINARY_TOWN_EVENT_BANK_RU_EN_V1.md`

Cover remaining current reachable non-School `base.*` ordinary-town events from item 61.
Text/presentation only.

## Queue item 64 — gopher event RU+EN bank v1
Create NEW file only:
- `docs/relationship-prep/GOPHER_EVENT_BANK_RU_EN_V1.md`

Author/polish all current root-loaded `gopher.*` event title/body/choice text in RU+EN.
No new gopher route/mechanics/rewards.

## Queue item 65 — stage goblin event RU+EN bank v1
Create NEW file only:
- `docs/relationship-prep/STAGE_GOBLIN_EVENT_BANK_RU_EN_V1.md`

Author/polish current `stage.goblin` player-facing event text in RU+EN only.
No stage/progression/reward changes.

## Queue item 66 — legacy root media-alt RU+EN inventory v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_LOCALIZATION_INVENTORY_V1.md`

For events covered by items 62–65, inventory their current media identities and propose stable RU+EN alt keys/text.
Do not create or rename media assets.

## Queue item 67 — legacy root-event localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/legacy-root-event-localization-v1.fixture.json`

Convert approved items 62–66 into exact stable localization entries:
- event titles;
- variant text;
- choice labels/text;
- media alt.

Use exact current event/media IDs only.
No gameplay fields.

## Queue item 68 — legacy root-event localization collision guard v1
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/legacy-root-event-localization-v1.test.ts`

Validate item 67 against exact current main:
- every event/media identity exists;
- RU+EN complete;
- additive or exact-identical only;
- no gameplay fields;
- no School/poverty/Foreman/Forest/Secret Debt ownership overlap;
- locale-neutral IDs.

## Queue item 69 — legacy root-event natural-path matrix v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_EVENT_NATURAL_PATH_MATRIX_V1.md`

For each event covered by item 67, document the shortest existing production path, blocking/optional status, exact choices, and invariants Lead UI tests should assert across RU↔EN.

No new test helpers.

## Queue item 70 — legacy root-event copy duplication audit v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_EVENT_COPY_DUPLICATION_AUDIT_V1.md`

Detect repeated/generic RU/EN phrasing across items 62–65 and propose text-only differentiation without changing semantics.

## Queue item 71 — legacy root-event production integration checklist v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_EVENT_PRODUCTION_INTEGRATION_CHECKLIST_V1.md`

Define Lead acceptance:
- root localization merge;
- current event IDs only;
- same pending/choice IDs;
- same effects/flags/RNG/Save;
- RU↔EN renderer invariance;
- exact-head CI;
- no worker branch wholesale merge.

## Queue item 72 — legacy root bilingual handoff v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_BILINGUAL_HANDOFF_V1.md`

Consolidate items 61–71 into SAFE_TO_COPY_NOW / SHARED_UI_REQUIRED / EXCLUDED_OTHER_OWNER / PRODUCT_OPEN, with exact selective-copy files and remaining root-event localization debt after this wave.

Continue items 61–72 sequentially without waiting for Lead review.


## Queue item 73 — post-PR49 legacy root localization rebase audit v2
Create NEW file only:
- `docs/relationship-prep/POST_PR49_LEGACY_ROOT_LOCALIZATION_REBASE_AUDIT_V2.md`

Recheck item 67 against exact current main after PR47/48/49.
Classify every prepared key as ADDITIVE / IDENTICAL / CONFLICT / SUPERSEDED.
No root localization edits.

## Queue item 74 — legacy choice-outcome visibility debt inventory v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_VISIBILITY_DEBT_INVENTORY_V1.md`

Audit all item-67 current events whose choice body/outcome text can surface after choice resolution or in journal/lastAction.
Record exact event/choice IDs, current embedded source text, where it is persisted/rendered, and whether visible EN remains blocked by shared presentation/runtime.

## Queue item 75 — locale-neutral choice-outcome key map v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-key-map-v1.fixture.json`

Map exact current event/choice identities to stable localization keys:
- `event.<eventId>.choice.<choiceId>.text`
No locale-selected text in gameplay identity and no runtime edits.

## Queue item 76 — legacy choice-outcome RU copy normalization v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_RU_COPY_NORMALIZATION_V1.md`

Polish the RU source choice-outcome text covered by item 75 for concise post-choice/journal presentation.
Exact current events/choices only; no effects/flags changes.

## Queue item 77 — legacy choice-outcome EN parity review v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_CHOICE_OUTCOME_EN_PARITY_REVIEW_V1.md`

Review/normalize full EN translations against the RU source from item 76.
Text only.

## Queue item 78 — legacy choice-outcome final localization fixture v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/legacy-choice-outcome-localization-v2.fixture.json`

Produce the finalized RU+EN choice-outcome strings keyed by item 75.
No event duplication, no gameplay fields, no locale-specific IDs.

## Queue item 79 — legacy outcome natural-path expectation matrix v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_OUTCOME_NATURAL_PATH_EXPECTATION_MATRIX_V1.md`

For every item-78 choice outcome document:
- shortest current natural path;
- exact event/variant/choice identity;
- expected stable post-choice identity;
- expected RU presentation;
- expected EN presentation;
- exact unchanged effects/flags/RNG/Save invariants.

## Queue item 80 — legacy journal/outcome presentation contract v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_JOURNAL_OUTCOME_PRESENTATION_CONTRACT_V1.md`

Define the content-side contract for a future Lead consumer:
- derive visible text from stable event/choice identity;
- never write locale-selected prose into Save;
- locale switch changes text only;
- existing gameplay journal semantics remain unchanged.
No runtime/UI code changes.

## Queue item 81 — legacy root media-alt post-PR49 refinement v2
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_MEDIA_ALT_POST_PR49_REFINEMENT_V2.md`

Re-audit item-66 media-alt strings against the current project-owned static media now shipped after PR47/48/49.
Propose text-only RU+EN alt refinements where the old generic alt no longer matches the actual current asset.
Do not rename media IDs or paths.

## Queue item 82 — legacy root production localization patch v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/legacy-root-localization-production-patch-v2.fixture.json`

Consolidate the post-PR49 safe root localization set:
- event title/body/choice label;
- finalized choice-outcome strings;
- current-media alt refinements.
Existing exact current IDs only, no gameplay fields.

## Queue item 83 — legacy root post-PR49 regression source v2
Create NEW test only:
- `prior-work/astra/prototype-m3.2/tests/legacy-root-localization-post-pr49-v2.test.ts`

Validate item 82 against exact current main:
- every event/media identity exists;
- RU+EN complete;
- additive/identical or explicitly reviewed text replacement only;
- no School/poverty/Foreman/Forest-result/Secret Debt ownership overlap;
- no gameplay fields;
- locale-neutral IDs.

## Queue item 84 — legacy root bilingual handoff v2
Create NEW file only:
- `docs/relationship-prep/LEGACY_ROOT_BILINGUAL_HANDOFF_V2.md`

Consolidate items 73–83 into:
- SAFE_ROOT_LOCALIZATION;
- CHOICE_OUTCOME_SOURCE_READY;
- SHARED_PRESENTATION_CONSUMER_REQUIRED;
- EXCLUDED_OTHER_OWNER;
- PRODUCT_OPEN.

Include exact selective-copy files and the remaining visible localization debt after this wave.

Continue items 73–84 sequentially without waiting for Lead review.


## Queue item 85 — global UI-shell hardcoded text audit v1
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_HARDCODED_TEXT_AUDIT_V1.md`

Audit current main `src/ui/app.ts` for player-facing hardcoded text not already owned by School/poverty/Foreman/Forest result.
Classify exact consumer seams and exclude debug/internal text.

## Queue item 86 — Explore panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/EXPLORE_PANEL_UI_COPY_RU_EN_V1.md`

Author RU-source + full EN for:
- Explore panel title;
- Activity explanation;
- enter button/fallback help;
- ordinary errands disclosure.
Do not change Activity mechanics.

## Queue item 87 — Sleep/Night panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/SLEEP_NIGHT_PANEL_UI_COPY_RU_EN_V1.md`

Author RU+EN for the generic Sleep/Night panel shell not already covered by Chat3 lodging/Night keys.
No NightFlow mechanics.

## Queue item 88 — Stats panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/STATS_PANEL_UI_COPY_RU_EN_V1.md`

Author RU+EN section headings and explanatory copy for character stats/professions.
Do not rename stat/career gameplay IDs.

## Queue item 89 — Journal panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/JOURNAL_PANEL_UI_COPY_RU_EN_V1.md`

Author RU+EN shell text only.
Do not solve localized outcome rendering here; item 80 contract remains authoritative.

## Queue item 90 — Bag/debt panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/BAG_DEBT_PANEL_UI_COPY_RU_EN_V1.md`

Author RU+EN shell labels/headings for inventory/debt display.
Do not alter debt mechanics or Secret Debt.

## Queue item 91 — Legacy/endings panel RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/LEGACY_ENDINGS_PANEL_UI_COPY_RU_EN_V1.md`

Author RU+EN shared shell text for endings/legacy panel:
- panel heading;
- explanatory text;
- accept button;
- legacy heading;
- empty legacy fallback;
- next-life button.
Do not author/modify ending gameplay.

## Queue item 92 — Arrival screen RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/ARRIVAL_SCREEN_UI_COPY_RU_EN_V1.md`

Author RU+EN source for the pre-arrival shell:
- eyebrow/title/body/button.
Do not alter arrival action/event mechanics.

## Queue item 93 — shared generic button labels RU+EN source v1
Create NEW file only:
- `docs/relationship-prep/SHARED_GENERIC_BUTTON_LABELS_RU_EN_V1.md`

Inventory and author stable RU+EN labels for generic buttons still hardcoded:
select/enter/close/dismiss/home/town/accept/new-life and similar shared controls.
Exclude already-localized School-specific controls.

## Queue item 94 — global UI-shell localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v1.fixture.json`

Convert items 86–93 into stable RU+EN keys.
Presentation/text only; no gameplay IDs or mechanics fields.

## Queue item 95 — global UI-shell consumer map v1
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V1.md`

Map every item-94 key to exact current `src/ui/app.ts` fallback string/consumer seam.
No code edits.

## Queue item 96 — global UI-shell localization handoff v1
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_LOCALIZATION_HANDOFF_V1.md`

Consolidate items 85–95 into:
- SAFE_TEXT_SOURCE;
- CHAT3_NIGHT_LODGING_OVERLAP_EXCLUDED;
- JOURNAL_OUTCOME_CONSUMER_REQUIRED;
- SHARED_UI_WIRING_REQUIRED;
- NON_PLAYER_FACING_EXCLUDED.

Include exact selective-copy files and remaining hardcoded player-facing debt.

Continue items 85–96 sequentially without waiting for Lead review.


## Queue item 97 — character creation screen RU EN source v1
Create NEW file only:
- `docs/relationship-prep/CHARACTER_CREATION_UI_COPY_RU_EN_V1.md`

Author RU-source + full EN for creation eyebrow/title/body/free-points text/start button and stat allocation accessibility labels.
No creation mechanics changes.

## Queue item 98 — HUD/date/energy/coins RU EN audit v1
Create NEW file only:
- `docs/relationship-prep/HUD_DATE_ENERGY_COINS_RU_EN_AUDIT_V1.md`

Audit current HUD strings and provide missing RU+EN source only.
Reuse existing localization keys where already shipped.

## Queue item 99 — menu shell RU EN source v1
Create NEW file only:
- `docs/relationship-prep/MENU_SHELL_UI_COPY_RU_EN_V1.md`

Author RU+EN source for export/import, editor, animation toggle, restart, informational footer and related generic menu text.

## Queue item 100 — toast/error/close accessibility RU EN source v1
Create NEW file only:
- `docs/relationship-prep/TOAST_ERROR_ACCESSIBILITY_COPY_RU_EN_V1.md`

Author RU+EN for dismiss/close/recovery/import-error/player-facing shell messages.
Do not alter error handling.

## Queue item 101 — Activity generic shell RU EN source v1
Create NEW file only:
- `docs/relationship-prep/ACTIVITY_GENERIC_SHELL_UI_COPY_RU_EN_V1.md`

Author RU+EN generic Activity shell labels/instructions/fallbacks that are not Forest-route-specific.
No Activity mechanics.

## Queue item 102 — result screen generic RU EN source v1
Create NEW file only:
- `docs/relationship-prep/RESULT_SCREEN_GENERIC_UI_COPY_RU_EN_V1.md`

Audit generic result eyebrow/buttons/fallbacks and provide missing RU+EN only.
Do not duplicate career-specific result prose.

## Queue item 103 — ending condition explanation shell audit v1
Create NEW file only:
- `docs/relationship-prep/ENDING_CONDITION_EXPLANATION_SHELL_AUDIT_V1.md`

Audit player-facing generic condition explanation text used in ending/eligibility display.
Propose presentation-only RU+EN keys without changing conditions.

## Queue item 104 — player-facing validation/recovery copy inventory v1
Create NEW file only:
- `docs/relationship-prep/PLAYER_FACING_VALIDATION_RECOVERY_COPY_INVENTORY_V1.md`

Inventory only errors/messages that can actually reach normal players.
Exclude developer/debug/catalog-inspector text.

## Queue item 105 — UI shell localization fixture v2
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v2.fixture.json`

Consolidate items 97–104 plus safe item-94 keys into one exact RU+EN presentation-only fixture.

## Queue item 106 — UI shell current-main consumer map v2
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_CONSUMER_MAP_V2.md`

Map every item-105 key to exact post-PR52 current `src/ui/app.ts` consumer seam/fallback.

## Queue item 107 — UI shell duplication/collision audit v1
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_DUPLICATION_COLLISION_AUDIT_V1.md`

Check item-105 keys against root localization after PR52.
Classify ADDITIVE / IDENTICAL / REUSE_EXISTING / CONFLICT.

## Queue item 108 — global UI shell handoff v2
Create NEW file only:
- `docs/relationship-prep/GLOBAL_UI_SHELL_LOCALIZATION_HANDOFF_V2.md`

Consolidate items 97–107 with exact selective-copy files and remaining player-facing hardcoded debt.

Continue items 97–108 sequentially without waiting for Lead review.


## Queue item 109 — labels dictionary localization debt audit v1
Create NEW file only:
- `docs/relationship-prep/LABELS_DICTIONARY_LOCALIZATION_DEBT_AUDIT_V1.md`

Audit player-facing uses of the shared labels dictionary: stats, seasons, housing, inventory/resource labels and other visible generic labels.
Separate already-localized keys from RU-only debt.

## Queue item 110 — hints dictionary RU EN source v1
Create NEW file only:
- `docs/relationship-prep/HINTS_DICTIONARY_RU_EN_SOURCE_V1.md`

Author full EN parity for player-facing stat/tooltips/hints currently sourced from hardcoded RU hints.
Presentation only.

## Queue item 111 — housing labels RU EN source v1
Create NEW file only:
- `docs/relationship-prep/HOUSING_LABELS_RU_EN_SOURCE_V1.md`

Author/review exact RU+EN labels for current housing identities only.
No housing mechanics/cost changes.

## Queue item 112 — inventory/resource labels RU EN source v1
Create NEW file only:
- `docs/relationship-prep/INVENTORY_RESOURCE_LABELS_RU_EN_SOURCE_V1.md`

Cover current player-visible item/resource labels used in Bag, condition explanation and result deltas.
No item mechanics.

## Queue item 113 — condition explanation templates RU EN v2
Create NEW file only:
- `docs/relationship-prep/CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`

Finalize RU+EN templates for every current player-facing `Condition` kind used by explain(c), keeping IDs/values authoritative.

## Queue item 114 — condition state-word dictionary v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/condition-state-word-localization-v1.fixture.json`

Provide stable RU+EN presentation words/separators for present/absent, completed/not completed, and/or/not required, stages, counters, comparisons.
No condition object changes.

## Queue item 115 — creation/menu/recovery localization delta v3
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/global-ui-shell-localization-v3.fixture.json`

Rebase item-105 on post-PR53 current root, remove already-shipped exact-identical keys, reuse existing semantic keys where possible, and include only remaining additive UI-shell labels/templates.

## Queue item 116 — labels/hints localization fixture v1
Create NEW file only:
- `prior-work/astra/prototype-m3.2/content/global-labels-hints-localization-v1.fixture.json`

Produce exact stable RU+EN keys for items 109–112.
No gameplay fields.

## Queue item 117 — app consumer map labels/hints/conditions v1
Create NEW file only:
- `docs/relationship-prep/LABELS_HINTS_CONDITIONS_CONSUMER_MAP_V1.md`

Map item-114/115/116 keys to exact current app.ts consumers and fallback strings after PR53.

## Queue item 118 — player-facing error wrapper localization v2
Create NEW file only:
- `docs/relationship-prep/PLAYER_FACING_ERROR_WRAPPER_LOCALIZATION_V2.md`

Define localized wrappers for import/load/recovery/presentation-edit errors while leaving raw validator payloads untouched when no stable semantic code exists.

## Queue item 119 — remaining hardcoded RU debt closure audit v2
Create NEW file only:
- `docs/relationship-prep/REMAINING_HARDCODED_RU_DEBT_CLOSURE_AUDIT_V2.md`

After items 109–118, inventory remaining normal-player hardcoded RU in app.ts and classify SHIP_NEXT / OTHER_OWNER / DEBUG_INTERNAL / ACCEPTABLE_FALLBACK.

## Queue item 120 — labels and condition localization handoff v3
Create NEW file only:
- `docs/relationship-prep/LABELS_CONDITIONS_LOCALIZATION_HANDOFF_V3.md`

Consolidate items 109–119 with exact selective-copy fixtures, consumer seams and remaining blockers.

Continue items 109–120 sequentially without waiting for Lead review.
