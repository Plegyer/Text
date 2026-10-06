# Chat 4 — D39 Formal Introduction Independent Resolution v38

Status: **BLOCKER CONFIRMED — MINIMAL SAFE CONTENT SEAM IDENTIFIED**  
Owner: Chat 4  
Branch: `chat4/d39-consumer-independent-resolution-v38`

## Scope

Independent review of the missing live consumer for:

`palace.court-power.formal-introduction`

Research/review only. No production runtime was changed. No full CI was run.

Current research-time main observed:

`main@574f6860968efda4aafc3dca28b364a4b86485b6`

The D39 executable implementation under review remains:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Producer handoff:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

## 1. Blocker independently confirmed

The historical Chat3 v39 filename named by the task is no longer present on the current Chat3 branch, but the accepted blocker is preserved in the current Chat3 v42-v44 task and in the prior independent Palace review v33.

More importantly, the blocker is independently visible in the executable delta itself.

Repository compare:

`09a97e0deef5bbccdbcdfbc4fc955f59b369345c -> b28b19628c0374c405cd32afedb0f16c105e2403`

changes only:

- `src/core/content.ts`;
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/core/strongMeta.ts`;
- `src/ui/app.ts`;
- `tests/palace-d39-reward-producer-v20.test.ts`;
- `tests/strong-meta-registry-v7.test.ts`.

No authored `content/packs/*.json` file is changed.

Therefore the D39 runtime exists, but no production event is explicitly opted in with:

- condition `strongMetaFormalIntroductionAvailable`;
- effect `useStrongMetaFormalIntroduction`.

The blocker is real: **Formal Introduction has no live authored consumer.**

## 2. Runtime contract that must not be changed

The existing runtime already enforces the accepted Product boundary:

- reward must be resolved in the current run snapshot;
- target career must be one of the ten ordinary careers;
- ordinary career action must be currently legal;
- at least one current-life completed shift is required;
- the named relationship transition must already be legal;
- max 3 successful uses/run;
- max once per relationship ID;
- Palace / Activity / Secret Debt relationship namespaces are rejected;
- failed/illegal transition consumes nothing;
- the effect applies exactly the authored relationship transition and only then consumes the use.

The content fix must therefore be explicit authoring, not a runtime bypass.

## 3. Existing relationship audit

The current ten ordinary relationships do not contain a generally safe existing transition for this reward.

Most relationships begin at `introduced` and move directly to `professional-trust` through `build-trust`. Those transitions depend on authored work-contact facts/counters and usually write a trust fact. Formal Introduction must not fabricate those counters/facts or skip trust.

Examples:

- `satyr-maid.recurring-guest.build-trust` requires `introduced-at-work` and `service-meetings >= 2`;
- `undead-farm.keeper.build-trust` requires `introduced-at-work` and `work-meetings >= 2`;
- `tavern.recurring-traveler.build-trust` requires the same two-meeting shape;
- Guard / Merchant / Hunter / Artist-Geisha follow the same trust-first pattern;
- Assassin's `build-trust` is also a trust transition and writes `professional-trust-earned`.

Using any of those existing `build-trust` transitions would violate the task boundary.

### Lumber exception is not the preferred solution

`lumber.foreman.notice-work` is technically safe in isolation:

`unknown -> professional`

with no trust/counter write.

However the normal event `lumber.foreman-notice` already opens that professional relationship immediately after the first-shift career transition. Tagging it would make the Specialist technically consumable but provide essentially no authored acceleration or useful distinction.

That is too weak to be the preferred release solution.

## 4. Preferred minimal seam

Preferred ordinary career:

`satyr-maid`

Preferred relationship:

`satyr-maid.recurring-guest`

Reason:

- clearly ordinary-career owned;
- explicitly professional/non-romantic at introduction;
- existing normal intro timing is later than one completed shift;
- trust is separately represented by facts/counters and can therefore remain untouched;
- later Night/request/route content already starts from `professional-trust` and does not need to be weakened.

### New stable relationship stage

Add one stage:

`professional-introduced`

This stage means only:

**a legitimate professional contact exists.**

It does not mean:

- trust earned;
- private meeting accepted;
- request opened;
- route selected;
- romance;
- ending progress.

### New stable transition

Add one transition to `satyr-maid.recurring-guest`:

`formal-introduction`

Shape:

```text
from: introduced
to: professional-introduced
conditions: []
effects: []
```

The D39 runtime supplies the legal-career + one-shift + reward-use gates around this transition.

No counter/fact is created by the transition.

## 5. Reuse the existing authored intro event

Do **not** create a second relationship chain.

Reuse:

`satyr-maid.recurring-guest.intro`

Current normal intro gate remains authoritative for the normal path:

- Satyr career at `known-face` or later;
- `introduced-at-work == false`.

The event may be extended so it can also appear earlier when the exact D39 condition is true.

Recommended exact D39 condition:

```json
{
  "kind": "strongMetaFormalIntroductionAvailable",
  "career": "satyr-maid",
  "relationship": "satyr-maid.recurring-guest",
  "transition": "formal-introduction"
}
```

Recommended exact D39 choice ID:

`formal-introduction`

Effect:

```json
{
  "kind": "useStrongMetaFormalIntroduction",
  "career": "satyr-maid",
  "relationship": "satyr-maid.recurring-guest",
  "transition": "formal-introduction"
}
```

That choice writes no fact/counter itself.

## 6. Preserve the normal intro/trust path exactly

The existing normal intro still owns:

- `introduced-at-work`;
- first `service-meetings +1`.

To make `professional-introduced` the normal first professional stage as well, the ordinary intro path should also enter that stage at its existing timing.

Recommended choice handling:

- existing choice `professional`, when current relationship stage is `introduced`:
  - keep the existing `introduced-at-work` write;
  - keep the existing `service-meetings +1`;
  - add `advanceRelationship(... formal-introduction)`.
- add a narrow choice for the case where Formal Introduction was used earlier:
  - suggested stable ID: `professional-after-formal`;
  - keep exactly the existing intro fact + first meeting counter;
  - do not re-run the Formal Introduction transition/use.

The existing intro event may need `maxShows: 2` so the early D39 appearance does not consume the later normal authored work-contact beat.

Without D39, the event remains one effective show because `introduced-at-work` becomes true after the normal intro.

## 7. Trust remains unchanged

Change the existing trust seam only to read the new first-professional stage.

Existing event:

`satyr-maid.recurring-guest.service`

must accept either pre-trust stage:

- `introduced`;
- `professional-introduced`.

Existing transition:

`satyr-maid.recurring-guest.build-trust`

must accept both:

`introduced | professional-introduced -> professional-trust`

while preserving its existing conditions:

- `introduced-at-work == true`;
- `service-meetings >= 2`.

Preserve the existing effect:

`professional-trust-earned`.

Therefore Formal Introduction cannot create trust and cannot reduce the two-meeting trust requirement.

Keeping legacy `introduced` as an accepted pre-trust source is required for in-progress save compatibility: a pre-D39 save may already have shown the normal intro event, recorded the first meeting, and still be at stage `introduced`. No migration or stage rewrite is needed; that save must continue naturally into `professional-trust`.

## 8. Resulting state paths

### Baseline, no Formal Introduction

```text
normal career progression
-> known-face
-> existing intro event
-> introduced-at-work
-> service-meetings = 1
-> professional-introduced
-> later service event
-> service-meetings = 2
-> build-trust
-> professional-trust
-> existing Night/request/route chain
```

### Selected Formal Introduction

```text
legal Satyr career
-> first completed satyr-maid.shift
-> D39 option appears
-> use formal-introduction
-> professional-introduced
-> NO introduced-at-work fact
-> NO service-meetings increment
-> normal intro beat still waits for its authored timing
-> normal intro writes first work-contact fact/counter
-> second work meeting still required
-> build-trust
-> professional-trust
-> unchanged later chain
```

This is a real professional-contact acceleration while preserving trust and route progression.

## 9. Files an implementation would need to touch

Minimum expected authored/content delta:

1. `content/definitions.json`
   - add stage `professional-introduced`;
   - add transition `formal-introduction`;
   - retarget `build-trust` from the new stage.
2. `content/packs/satyr-maid-relationship.json`
   - explicit D39 condition/effect;
   - preserve normal intro fact/counter;
   - allow later normal intro after early Formal Introduction;
   - retarget service event stage;
   - add `meta: strongMetaFormalIntroduction` read capability.
3. localization for any new player-facing choice copy, using the repository's current Satyr localization convention.
4. focused tests.

No engine/schema/Strong-Meta runtime change is required.

No new presentation slot is required if the existing event ID `satyr-maid.recurring-guest.intro` is reused.

## 10. Required regression tests

Existing focused suites to retain:

- `tests/palace-d39-reward-producer-v20.test.ts`;
- `tests/satyr-maid-relationship-night.test.ts`;
- `tests/satyr-maid-natural-acceptance.test.ts`;
- `tests/satyr-maid-recurring-guest-presentation-c2-124.test.ts`;
- `tests/satyr-maid-ending-coexistence.test.ts`.

Add one focused consumer test covering:

1. reward not resolved -> Formal Introduction choice absent;
2. selected reward, zero Satyr shifts -> absent;
3. one legal Satyr shift -> choice available;
4. use -> stage exactly `professional-introduced`;
5. use writes no trust fact, no route choice, no relationship counter;
6. one relationship use consumed exactly once;
7. later normal intro still writes exactly one first work-contact + one meeting;
8. trust still requires meeting #2;
9. a pre-change save at stage `introduced` with first meeting already recorded still reaches `professional-trust` without migration;
10. later Night/request/route chain remains reachable;
11. refusal path remains valid;
12. no Palace/Activity/Secret-Debt relationship becomes targetable;
13. save/reload preserves the consumed relationship ID without replay.

At implementation time also run:

- `npm run typecheck`;
- `npm run validate`;
- `npm run build`.

Full CI remains outside this review bundle.

## 11. Reject conditions

Leader should reject this proposal if Product interprets the existing Satyr `known-face` timing as a hard non-bypassable prerequisite for **any** professional contact.

Under accepted D39 v13 wording, that is not the preferred reading: Formal Introduction explicitly may establish a professional contact without waiting for the relationship's usual intro-event timing, while it may not mutate career stage or skip downstream career/route facts.

Reject also if implementation:

- writes `introduced-at-work` through D39 itself;
- increments `service-meetings` through D39 itself;
- transitions directly to `professional-trust`;
- sets `night-response`;
- touches route/request facts;
- alters Satyr career stage;
- introduces a generic relationship bypass.

## Disposition

The blocker is confirmed.

Preferred safe resolution:

**reuse `satyr-maid.recurring-guest.intro`, add exactly one neutral first-professional stage/transition, and let D39 reach only that stage after one legal shift. Trust/counters/routes remain authored by the existing Satyr chain.**

**v38 COMPLETE — CONTINUE TO v39**
