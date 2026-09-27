# Chat5 relationship depth isolation QA v2

Status: COMPLETE / SAFE_FOREMAN_PRESENTATION_SEPARATED_FROM_PRODUCT_OPEN_DEPTH

Reviewed Chat 5 items:
`13–24`
on branch `chat5/relationships-night-content-next`.

Current production baseline for this QA:
`1af3104c1e4c180019b965adac8e87e67de89347`.

PR46 is now merged. This audit classifies the worker artifacts themselves while marking their older shared-UI/localization status fields as superseded where PR46 shipped the missing generic Night-choice label path.

## Current exact production boundary

Existing relationship identity:
`lumber.foreman`.

Existing stages:
- `unknown`;
- `professional`;
- `route-professional`.

Existing voluntary Night choice:
`lumber.foreman.night`.

Existing Night effect:
`night_meetings += 1`.

Existing next-day Energy delta:
`0`.

Existing events:
- `lumber.foreman-notice`;
- `lumber-night.foreman-professional`.

Everything accepted as safe current-Foreman source must remain under these exact identities.

## Item 13 — root localization reconciliation

`FOREMAN_ROOT_LOCALIZATION_RECONCILIATION_v2.md`

Classification:
`SAFE_REFERENCE / BASELINE_STILL_MATERIALLY_VALID`.

It classifies the 11 Foreman localization keys as additive against its then-main baseline.

The item-13 comparison was correct at its baseline, but PR46 has since integrated those 11 Foreman localization keys into current main.

Its statement that generic ordinary Night-choice UI is missing is now superseded: PR46 shipped the generic stable-ID Night-choice lookup.

## Item 14 — Night-choice localization acceptance fixture

`foreman-night-choice-localization-acceptance-v1.fixture.json`

Classification:
`SAFE_ACCEPTANCE_FIXTURE / SHARED_UI_DEPENDENCY_SATISFIED_BY_PR46`.

Good invariants:
- same choice ID across locales;
- same NightFlow state;
- same Save;
- same relationship state;
- same gameplay RNG;
- `nextDayEnergyDelta=0`.

It adds no gameplay effect.

Its `currentMainStatus=SHARED_UI_REQUIRED` is now historical worker metadata; PR46 satisfied that shared-UI dependency on current main.

## Items 15–16 — Foreman repetition / seasonal banks

Files:
- `FOREMAN_PROFESSIONAL_NIGHT_REPETITION_BANK_v2.md`;
- `FOREMAN_SEASONAL_NIGHT_PRESENTATION_BANK_v1.md`.

Classification:
`PRESENTATION_ONLY_CONTENT_BANK`.

Safe characteristics:
- current professional Foreman route only;
- RU+EN;
- effect-free;
- no threshold;
- no new stage;
- no reward;
- no new fact;
- no daytime Energy cost;
- no next-day Energy penalty.

These are copy candidates, not ten new events and not season mechanics.

Do not promote their internal authoring IDs as gameplay IDs.

## Item 17 — housing decision packet

`RELATIONSHIP_HOUSING_PRESENTATION_DECISION_PACKET_v1.md`

Classification:
`CONTENT_DRAFT / PRODUCT_DECISION_REQUIRED`.

Safe:
- normal/cheap/street prose concepts as non-binding presentation examples.

Not selected:
- whether housing changes availability;
- whether street blocks the choice;
- whether cheap lodging substitutes a public scene;
- whether current-night lodging or persistent housing is authoritative;
- whether any rule becomes a global relationship convention.

Current `lumber.foreman.night` has no housing condition.

No housing proposal may be converted to production condition without an explicit Product decision.

## Items 18–20 — authoring / public-hook templates

Files:
- `ORDINARY_RELATIONSHIP_EVENT_AUTHORING_TEMPLATE_v1.md`;
- `ORDINARY_RELATIONSHIP_NIGHT_AUTHORING_TEMPLATE_v1.md`;
- `RELATIONSHIP_PUBLIC_HOOK_REQUEST_TEMPLATE_v1.md`.

Classification:
`SAFE_DOCUMENTATION_TEMPLATE`.

They correctly require:
- locale-neutral IDs;
- typed public hooks;
- explicit effects/modifiers;
- voluntary Night ownership;
- no universal next-day Energy penalty;
- no reading another subsystem's private state;
- exact Activity result identity when Activity is used;
- Product-open markers.

These templates create no production relationship identity.

## Item 21 — approved-capability scene bank

`RELATIONSHIP_APPROVED_CAPABILITY_SCENE_BANK_v1.md`

Classification:
`PRESENTATION_ONLY / HOOK_USE_REQUIRES_EXACT_CONTEXT_REVIEW`.

The bank names already-existing identities:
- capability `preserve_specimen`;
- career fact `foreman-noticed-player`;
- relationship fact `night-followup-complete`;
- world fact `lumber.forest.truth-known`.

Its text is effect-free.

However, existence of a capability/fact does not automatically approve a new relationship event consuming it. Production use still requires:
- an exact current trigger/condition;
- relationship ownership;
- capability semantics appropriate to the scene;
- no invented cross-system consequence.

Old Boundary semantics remain excluded.

## Item 22 — Activity-return scene bank

`RELATIONSHIP_ACTIVITY_RETURN_SCENE_BANK_v1.md`

Classification:
`PRESENTATION_ONLY / EXACT_RESULT_DISCIPLINE_GREEN`.

Every example is bound to the exact current result:
`activityResult(activity=lumber.forest, outcome=success, result=lumber.forest.success)`.

The bank:
- does not invent another Activity result;
- does not reinterpret how success was obtained;
- does not add a second Activity cost;
- treats reaction copy as 0-daytime-Energy.

Any future relationship event using the bank remains new authored gameplay content and needs separate selective review. The exact Forest result identity itself is not Product-open.

## Item 23 — Foreman presentation replacement packet

`relationship-foreman-presentation-replacement-v1.fixture.json`

Classification:
`SAFE_PRESENTATION_REPLACEMENT_SOURCE / NOT_A_GAMEPLAY_PACK`.

It targets only:
- `lumber.foreman-notice/default/professional`;
- `lumber-night.foreman-professional/default/continue`;
- their current relationship presentation IDs;
- their current media IDs.

It contains:
- RU+EN title/body/choice text;
- current media alt keys;
- proposed caption keys;
- two safe copy candidates.

Its own invariants explicitly state:
- presentation only;
- no duplicate events;
- no duplicate choices;
- no gameplay effects;
- locale/media do not change gameplay.

Important:
some item-23 wording is a text replacement from the earlier item-3 source, not merely identical copy. Production integration must review the exact chosen prose instead of assuming all worker Foreman text is interchangeable.

Caption keys remain inert until a production surface consumes them.

## Item 24 — selective integration handoff v2

`RELATIONSHIPS_NIGHT_INTEGRATION_HANDOFF_v2.md`

Classification:
`USEFUL_HANDOFF / STATUS_FIELDS_MAY_BE_SUPERSEDED_BY_PR46`.

Its main separation is sound:
- SAFE_TO_INTEGRATE_NOW;
- PRESENTATION_ONLY;
- CONTENT_DRAFT;
- PRODUCT_BLOCKED;
- SHARED_UI_REQUIRED.

The generic Night-choice shared-UI note must be refreshed against the exact PR46 state before Lead integration because PR46 is the stream currently attempting that wiring.

## Broader relationship depth that remains Product-open

None of items 13–24 approves:
- a wider canonical NPC roster;
- final NPC names;
- deeper Foreman stages;
- romance route;
- meeting-count threshold;
- relationship ending;
- Meta relationship persistence;
- a housing/privacy gameplay rule;
- School management/accounting public result semantics;
- Hunter route semantics;
- Old Boundary acquisition/consume/turn-in semantics;
- new Activity results;
- Palace relationship content.

Banks/templates may discuss legal shapes, but discussion is not production authority.

## Secret Debt separation

The ordinary relationship Night template explicitly excludes forced Secret Debt NightFlow.

Housing/street presentation proposals must not borrow:
- debt obligation;
- lender identity;
- forced choice;
- debt reward/progression.

The ordinary professional Foreman route remains voluntary.

## Hard Work / Forest locks

Any selective use of these artifacts must preserve:
- Lumber Hard Work only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- exact Forest success `lumber.forest.success`;
- Lumber continuation through exact `activityResult`.

## Verdict

`SAFE_FOREMAN_PRESENTATION_SEPARATED_FROM_PRODUCT_OPEN_DEPTH`.

Ready as selective source:
- exact current-Foreman RU+EN localization/presentation material;
- acceptance fixtures;
- authoring/public-hook templates;
- effect-free copy banks.

Staging/content draft:
- seasonal/repetition variations until deliberately selected;
- housing presentation variants.

Product-blocked:
- housing gameplay rule;
- deeper relationship stages/routes/endings;
- broader roster;
- unresolved School/Hunter/Old Boundary/Palace semantics.

No Chat 5 worker branch wholesale merge is approved.
