# Current Main Relationship Production Inventory v1

Date: 2026-09-27
Status: Chat 5 current-main production audit
Scope: typed Relationships + current Lumber Foreman relationship only
Authority: current `main` at `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

This inventory distinguishes runtime capability from root-loaded authored content. It does not promote draft NPC identities, School result semantics, Hunter semantics, Old Boundary semantics, or ending families to Product canon.

## SHIPPED

### Typed relationship state and definition

Current `content/definitions.json` contains exactly one target relationship definition:

- relationship ID: `lumber.foreman`
- label: `Lumber Foreman`
- initial stage: `unknown`
- stages: `unknown -> professional -> route-professional`
- transition `notice-work`: `unknown -> professional`, gated by Lumber career stage `accepted-hand`
- transition `choose-professional`: `professional -> route-professional`, writing relationship choice `route=professional`

The shipped typed state is not a universal affection meter. Core state stores relationship-owned stage, facts, choices and counters. Current engine code can evaluate `relationshipStage`, `relationshipCounter`, `relationshipFact` and `relationshipChoice`; it can apply `advanceRelationship`, `incrementRelationshipCounter`, `addRelationshipFact` and `setRelationshipChoice`.

### Root-loaded Lumber relationship content

`scripts/build.mjs` root-loads every top-level `content/packs/*.json` file. The current Lumber relationship production surfaces are therefore part of the built catalog, not merely nested staging fixtures.

`content/packs/lumber-production.json` ships:

- `lumber.career-first-shift`, reacting to `careerCounterChanged(lumber.completed_shifts)`;
- the career transition `accept-hand`, which publishes career fact `foreman-noticed-player`;
- `lumber.foreman-notice`, reacting to the Lumber career transition;
- conditions requiring `careerStage=lumber.accepted-hand` and `relationshipStage=lumber.foreman.unknown`;
- a single professional choice which advances `notice-work` and then `choose-professional` in one choice transaction;
- no daytime Energy effect in the relationship milestone scene.

`content/packs/lumber-night-production.json` ships the current relationship Night continuation:

- voluntary Night choice ID `lumber.foreman.night` exists in `definitions.json`;
- availability requires `lumber.foreman` stage `route-professional`;
- choosing it increments relationship counter `night_meetings` by 1;
- its `nextDayEnergyDelta` is exactly 0;
- event `lumber-night.foreman-professional` reacts to `nightChoiceCompleted(lumber.foreman.night)`;
- the event is an after-choice Night intercept and consumes the Night slot;
- its choice adds relationship fact `night-followup-complete`.

### Shipped relationship-trigger capability

The current schema/Resolver can already drive authored relationship milestones from these typed reaction boundaries:

- `creationCompleted`
- `actionCompleted`
- `choiceResolved`
- `statChanged`
- `resourceChanged`
- `energyChanged`
- `calendarAdvanced`
- `dayStarted`
- `nightPhase` at `before_lodging`, `after_lodging`, or `after_choice`
- `nightChoiceCompleted`
- exact `activityResult`
- career counter / transition / fact changes
- quest counter / transition / fact changes
- relationship counter / transition / fact changes
- `worldFactAdded`
- ending eligibility / commitment

Conditions available to relationship-authored events include typed stats/resources/items, calendar and season, housing, career/quest/relationship stage/counter/fact/choice, world facts and meta facts. Packs must declare typed read/write capabilities; arbitrary state paths are not allowed.

This is sufficient architecture for stat-gated, work-gated, Night-count-gated, housing-gated, season-gated, item/capability-gated, Activity-result-gated and public-world-fact-gated relationship content without adding a universal relationship action or affection meter.

### Current cross-system Foreman path

`content/packs/lumber-cross-production.json` is root-loaded and reads `lumber.foreman`. Its School-facing event requires `relationshipStage=lumber.foreman.route-professional` plus world fact `lumber.school.management-ready`; when reached it writes Lumber career facts `management-school-ready` and `forewoman-problem-resolved`.

The same root pack also preserves the Forest continuation on the exact typed `activityResult` for `lumber.forest.success`. Relationship authoring must not alter that result identity.

### UI and presentation identities

Relationship events use the generic persisted pending-scene renderer. `presentationIdForEvent` maps events whose `sourceDomain` is a known relationship to semantic relationship presentation IDs.

Current semantic event presentation IDs are:

- Foreman milestone: `relationship/lumber-foreman/lumber-foreman-notice/default`
- Foreman Night follow-up: `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Current catalog media IDs are:

- `relationship.lumber.foreman.professional`
- `relationship.lumber.foreman.night.professional`

Both currently resolve to the static `assets/stage-lumber.svg` fallback image. There is no shipped relationship-specific GIF pool. The generic presentation runtime can support deterministic 3–5 GIF pools beneath a semantic `presentationId`, but no placeholder GIF path is counted as shipped content.

### Current localization coverage

The generic UI already resolves localized event fields through locale-neutral keys of these forms:

- `event.<eventId>.title`
- `event.<eventId>.variant.<variantId>.text`
- `event.<eventId>.choice.<choiceId>.label`
- `media.<mediaId>.alt`

Locale switching is presentation-only and does not alter event, relationship, RNG or Save identity.

However, current `content/localization.json` contains no RU+EN keys for either Foreman relationship event, its choices, or its relationship media alt text. The shipped Foreman relationship surfaces therefore still rely on embedded pack fallback text. This is migration debt under the bilingual localization contract, not a second gameplay path.

## STAGED

The repository also contains nested Lumber target/acceptance material under `content/packs/lumber-target/`, including production, cross-system and Night acceptance packs. The production build only enumerates top-level `content/packs/*.json`, so nested target packs are not root-loaded by `build.mjs`.

Likewise, presentation registry / migration fixtures and Lumber Product Acceptance fixture manifests are validation/staging evidence. They do not add another relationship identity or a second canonical Foreman route.

No staged content may be described as shipped merely because its schema is valid.

## PRODUCT_OPEN

The following relationship content remains explicitly unresolved by Product/design authority:

- final major-NPC roster for the ten ordinary careers;
- which NPCs are shared across careers;
- which relationships receive dedicated endings;
- final Foreman NPC name/identity and final characterization;
- additional Foreman stages such as trusted/personal/close/rival/resolved from the product draft;
- optional meters such as trust/respect;
- exact Night repetition thresholds and route depth;
- final romantic/close-route content;
- final relationship ending families and Meta persistence;
- final School management/accounting public-result identity and producer;
- Hunter/Forest cross-hook semantics;
- Old Boundary Token semantics.

Legacy/current Lumber prose mentioning a named worker does not lock the final typed relationship NPC identity. New identities must remain `CONTENT_DRAFT / PRODUCT_NOT_LOCKED` until Product selects them.

The root-loaded `lumber-cross.school-management-return` event is technically shipped as catalog content, but the upstream public School result it expects remains Product-open. It must not be used as evidence that the full School->Foreman path is naturally reachable or canonically authored.

## RUNTIME_GAP

The current shared runtime already represents typed relationship stages/facts/choices/counters and the required Resolver trigger families. Item 1 finds no blocker that justifies changing shared relationship state, Resolver, Save identity, or the NightFlow engine.

There are nevertheless presentation/localization seams that authored content cannot solve alone:

1. `nightChoiceList()` currently renders `NightChoice.label` directly instead of resolving a localization key, so `lumber.foreman.night` remains an embedded English label even when RU is selected.
2. Relationship-specific RU+EN event/media keys are absent from the current root localization bundle. The generic event renderer can consume them once integrated, but Chat 5 does not own the shared root localization/runtime integration.
3. There is no dedicated relationship roster/state UI. This is not required for the current reactive milestone contract, but any future Product decision requiring a player-facing relationship browser would be a Lead/UI task.
4. Current production definitions expose only the minimal three-stage professional Foreman machine. Deeper relationship content can be authored only within existing declared stages/transitions unless Lead/Product separately extends the authoritative definition.

## Exact architecture-to-content gap

The architecture is materially ahead of authored relationship depth.

Already executable today:

`Lumber shift -> career milestone -> 0-Energy Foreman professional scene -> typed professional route -> voluntary Foreman Night -> relationship counter/fact -> deterministic save/reload/presentation identity`.

Not yet authored/shipped as canonical relationship production:

`repeated professional interactions -> trust/personal branch -> multiple voluntary responses -> external School/item/Activity request -> reactive return milestone -> alternative professional/close/rival resolution -> relationship-specific ending family`.

The missing work is primarily bilingual authored content, declared relationship-depth definitions, Product decisions, and selective integration. It is not evidence for reopening the green shared Resolver/Night/Save contracts.

## Locked no-regression boundaries

Any relationship follow-up must preserve:

- Lumber Hard Work eligibility only at `completed_shifts >= 50`;
- exact Hard Work reward identity `hardWork:lumber`;
- exact Forest continuation via `activityResult`;
- reactive relationship milestones normally cost 0 daytime Energy;
- voluntary relationship Night uses the Night slot;
- no universal next-day Energy penalty for relationship Night;
- locale affects presentation only;
- relationship/gameplay/presentation IDs remain locale-neutral.
