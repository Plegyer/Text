# Relationship / Night current-main boundary QA v1

Status: COMPLETE / SAFE_SELECTIVE_CONTENT_SOURCE_WITH_UI_LOCALIZATION_GAP

Reviewed:
- current-main baseline `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`;
- Chat 5 branch `chat5/relationships-night-content-next`;
- items 1–12 as present in Git.

## Current-main typed identity

Verified from `content/definitions.json`:

Relationship:
- ID: `lumber.foreman`;
- initial stage: `unknown`;
- stages: `unknown`, `professional`, `route-professional`;
- transition `notice-work`: `unknown -> professional`, requires Lumber `accepted-hand`;
- transition `choose-professional`: `professional -> route-professional`, sets relationship choice `route=professional`.

Voluntary Night choice:
- ID: `lumber.foreman.night`;
- requires relationship stage `route-professional`;
- increments `night_meetings` by 1;
- `nextDayEffects=[]`;
- `nextDayEnergyDelta=0`.

This is the only exact relationship/Night identity approved by the reviewed stream.

## Current-main production events

Verified from root production packs.

### Foreman milestone

`content/packs/lumber-production.json`:
- event `lumber.foreman-notice`;
- reacts to Lumber `careerTransition`;
- requires `careerStage=lumber.accepted-hand`;
- requires `relationshipStage=lumber.foreman.unknown`;
- choice `professional` performs only the two existing relationship transitions;
- no daytime Energy effect;
- source domain `lumber.foreman`.

### Foreman Night continuation

`content/packs/lumber-night-production.json`:
- event `lumber-night.foreman-professional`;
- reacts to `nightChoiceCompleted(lumber.foreman.night)`;
- requires `route-professional`;
- intercepts `after_choice`;
- does not suppress lodging payment;
- suppresses the already-used voluntary menu;
- consumes the Night;
- choice adds existing relationship fact `night-followup-complete`;
- no daytime Energy transaction;
- no universal next-day Energy penalty.

This matches the ordinary voluntary Night contract rather than forced-Night semantics.

## Chat 5 scope audit

Items 1–12 remain within the intended content/localization authoring boundary.

Safe current-identity source material includes:
- current-main relationship inventory;
- current-main ordinary Night inventory;
- Foreman RU+EN localization fixture;
- Foreman localization contract test;
- professional content-depth/reference banks.

The stream does not modify shared engine/schema/NightFlow in the reviewed artifacts.

The only production-oriented pack is nested under:
`content/packs/relationship-target/foreman-relationship-content-v1.json`.

It deliberately reuses the already shipped `lumber.foreman-notice` event/mechanics and therefore must remain staging/reference unless Lead selectively replaces presentation copy. It must not be root-loaded alongside the current production event.

## Typed relationship discipline

PASS.

The stream uses exact `lumber.foreman` identity and does not replace it with:
- a generic affection meter;
- locale-specific relationship IDs;
- a second Foreman gameplay identity;
- a new canonical romance route.

Deeper relationship stages/thresholds remain Product-open.

## Voluntary Night discipline

PASS.

The reviewed current-main and worker contracts preserve:
- one explicit voluntary Night choice;
- no daytime Energy charge for the relationship interaction;
- no universal next-day Energy penalty;
- lodging/payment handled by NightFlow rather than duplicated by the relationship event;
- deterministic typed relationship counter/fact updates.

School Night study remains a separate behavior with its own next-day Energy penalty and must not be generalized to relationship Night.

Secret Debt forced-night content is explicitly outside this stream.

## Secret Debt isolation

PASS.

The reviewed Relationships/Night artifacts do not:
- create lender/debt relationship identities;
- reuse forced-night mechanics;
- publish Secret Debt rewards;
- map ordinary Prostitute relationship authoring to Secret Debt progression;
- activate any Secret Debt pack.

Ordinary relationship Night remains voluntary and mechanically separate.

## Hard Work and Forest invariants

PASS.

Current main still defines Lumber Hard Work as exactly:
`careerCounter(lumber.completed_shifts, gte, 50)`

and exact Meta reward:
`hardWork:lumber`.

The relationship stream does not add a Hard Work condition/effect.

Current `lumber-cross-production.json` retains Forest continuation through exact:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Relationship authoring does not rename or reinterpret that result.

## No invented canonical roster

PASS.

`RELATIONSHIP_ROSTER_CONTENT_DRAFT_MATRIX_v1.md` labels non-Lumber proposed career contacts:
`CONTENT_DRAFT / PRODUCT_NOT_LOCKED`.

It does not assign final names or endings.

Only `lumber.foreman` is treated as a shipped exact relationship identity.

Proposed roles for the other ordinary careers are authoring possibilities, not Product canon.

## Product-open cross-hooks remain open

PASS with important nuance.

Current main contains:
- technical `old_boundary_token -> enter_old_boundary`;
- current old-boundary Activity option gated by that capability;
- Lumber consumer event for `lumber.school.management-ready`.

These existing technical/consumer seams do not settle:
- Old Boundary token acquisition;
- retain/consume/turn-in policy;
- deeper Hunter/Old Boundary meaning;
- upstream School management/accounting provider/threshold;
- School Arcana/Forest public result;
- relationship roster/endings.

The Chat 5 hook inventory correctly marks these as Product-blocked where semantics are unresolved.

## Current UI localization gap

The generic event renderer already supports locale keys for event title/body/choice and media alt.

However, current Night choice rendering does not generically resolve:
`nightChoice.<id>.label`.

PR44 adds special School Night-choice localization only. That does not make the Foreman Night label key automatically visible.

Therefore:
- Foreman event/media RU+EN strings are selectable source material;
- `nightChoice.lumber.foreman.night.label` is staged until shared/current UI wiring consumes it.

This is a localization presentation gap, not a relationship or NightFlow runtime gap.

## Verdict

`SAFE_SELECTIVE_CONTENT_SOURCE_WITH_UI_LOCALIZATION_GAP`.

Safe integration must be selective from a fresh current-main branch:
- localization strings/tests can be reviewed for production;
- content/reference docs can be integrated as non-canonical authoring evidence;
- the duplicate-identity staging pack must not be root-loaded;
- proposed roster/hooks remain non-canonical;
- Night-choice label localization requires an explicit current-main UI/resolver review;
- exact-head CI is required for any production integration.
