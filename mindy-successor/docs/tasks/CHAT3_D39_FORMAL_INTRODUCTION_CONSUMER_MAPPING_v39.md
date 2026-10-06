# Chat 3 — D39 Formal Introduction Consumer Mapping v39

Status: **BLOCKED — NO UNIQUE SAFE EXISTING CONSUMER MAPPING**  
Owner: Chat 3  
Branch: `chat3/palace-d39-live-consumer-closure-v39`

## Task

Find an exact existing ordinary-career professional event/relationship transition that can safely consume:

- `strongMetaFormalIntroductionAvailable`;
- `useStrongMetaFormalIntroduction`.

Required D39 semantics:

- target is an ordinary-career professional relationship;
- career is already legally available;
- current life has at least 1 completed shift in that career;
- relationship has not already passed its first professional stage;
- one successful use performs exactly one transition into that normal first professional stage;
- max 3 successful uses/run;
- max 1/relationship;
- no Palace / Activity / Secret Debt relationship target;
- no generic bypass;
- no downstream route/trust/ending shortcut;
- preserve existing gates and existing authored relationship routes.

Research-time authority:

- `main@ddf043bc61dc2ed9150799c8d26d183879971199`;
- D39 Product:
  `chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`;
- D39 runtime:
  `chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`.

No production/runtime change is made here.

---

# 1. Runtime contract relevant to mapping

v20 validates an authored Formal Introduction condition/effect against a real existing relationship transition.

The condition requires:

```text
kind: strongMetaFormalIntroductionAvailable
career: <ordinary career>
relationship: <relationship ID>
transition: <existing transition ID>
```

The effect requires the same target:

```text
kind: useStrongMetaFormalIntroduction
career: <ordinary career>
relationship: <relationship ID>
transition: <existing transition ID>
```

The runtime then:

1. confirms the D39 Specialist is active in the current run snapshot;
2. confirms the ordinary career is legally available;
3. confirms at least one current-life completed shift;
4. confirms the exact relationship transition is currently legal;
5. performs that exact relationship transition atomically;
6. only after success records the relationship ID as consumed.

The content validator also requires explicit pack capabilities for:

- read `meta.strongMetaFormalIntroduction`;
- read target career;
- read target relationship;
- write target relationship.

This is intentionally not a generic relationship auto-enable seam.

---

# 2. Exhaustive current relationship-machine review

The current ordinary relationship machines were checked from `content/definitions.json` and their owning production packs.

| Career | Relationship | Initial stage | Candidate first professional transition | Transition effects | Existing authored consumer | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| Lumber | `lumber.foreman` | `unknown` | `notice-work -> professional` | none | `lumber.foreman-notice` | structurally closest, but not safely consumable |
| Satyr Maid | `satyr-maid.recurring-guest` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `satyr-maid.recurring-guest.service` | reject |
| Undead Farm | `undead-farm.keeper` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `undead-farm.keeper.trust` | reject |
| Tavern | `tavern.recurring-traveler` | `introduced` | `build-trust -> trusted` | writes `professional-trust-earned` | `tavern.recurring-traveler.trust` | reject |
| Hunter | `hunter.senior-guide` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `hunter.relationship.trust` | reject |
| Guard | `guard.partner` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `guard.relationship.trust` | reject |
| Merchant | `merchant.supplier` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `merchant.relationship.trust` | reject |
| Artist/Geisha | `artist-geisha.mentor` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `artist-geisha.relationship.trust` | reject |
| Prostitute | `prostitute.recurring-client` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `prostitute.relationship.trust` | reject |
| Assassin | `assassin.handler` | `introduced` | `build-trust -> professional-trust` | writes `professional-trust-earned` | `assassin.relationship.trust` | reject |

No Palace, Activity or Secret Debt relationship was considered a valid target.

---

# 3. Why the eight/nine trust-stage candidates are invalid

For Satyr Maid, Undead Farm, Tavern, Hunter, Guard, Merchant, Artist/Geisha and Prostitute, normal `build-trust` is not merely an introduction.

The authored transition requires accumulated work-contact state such as:

- `introduced-at-work`;
- usually a relationship meeting counter reaching 2.

The transition itself writes:

`professional-trust-earned`.

The normal owning event also typically increments relationship/career counters and/or writes downstream career facts.

D39 explicitly forbids Formal Introduction from becoming a shortcut that writes downstream relationship trust/conflict facts or skips ordinary route requirements.

Therefore mapping Formal Introduction directly to these `build-trust` transitions would turn the reward from “first professional introduction” into “professional trust shortcut”.

That is outside accepted D39 authority.

Assassin is not an exception: its `build-trust` transition has a lighter precondition than most other careers, but the transition itself still writes `professional-trust-earned`, so it remains a trust-stage shortcut rather than a clean first introduction.

---

# 4. Closest candidate — Lumber Foreman

Exact machine:

`lumber.foreman`

Stages:

```text
unknown
-> professional
-> route-professional
```

Transitions:

```text
notice-work:
  unknown -> professional
  condition: career lumber stage accepted-hand
  transition effects: none

choose-professional:
  professional -> route-professional
  transition effects:
    set relationship choice route=professional
```

This is the only current ordinary relationship whose first transition:

- starts before any introduction stage;
- lands in an explicitly professional stage;
- has no trust/conflict/route side effect.

On the transition definition alone, `notice-work` is the only D39-shaped candidate.

---

# 5. Why Lumber still cannot be safely mapped using existing content

Owning event:

`lumber.foreman-notice`

Owning file:

`content/packs/lumber-production.json`

The event is already the first-shift Foreman flow.

Conditions:

- Lumber career stage = `accepted-hand`;
- `lumber.foreman` stage = `unknown`.

Existing only choice:

`professional`

Existing effects:

```text
advanceRelationship lumber.foreman / notice-work
advanceRelationship lumber.foreman / choose-professional
```

Therefore the existing authored scene intentionally performs **two transitions atomically in one one-shot event**:

```text
unknown
-> professional
-> route-professional
```

The current Lumber production test explicitly requires the post-scene result:

`lumber.foreman.stage == route-professional`

and relationship choice:

`route == professional`.

The Forewoman cross-system route then relies on that `route-professional` stage.

## Attempt A — replace first transition with Formal Introduction but keep second transition

Example shape:

```text
useStrongMetaFormalIntroduction(... notice-work)
advanceRelationship(... choose-professional)
```

Reject.

A D39 use is allowed to perform exactly one transition into the first professional stage.

Immediately performing a second transition in the same authored choice jumps past that stage and reaches downstream route state.

This violates the Product firewall.

## Attempt B — add a Formal Introduction choice that performs only `notice-work`

Result:

`unknown -> professional`

Reject as release mapping.

`lumber.foreman-notice` is maxShows=1.

Choosing the one-transition D39 branch consumes the scene while leaving the relationship at `professional`.

No other existing production event was found that later owns `choose-professional`.

The normal Forewoman relationship route therefore loses its established `route-professional` continuation.

That is a route regression.

## Attempt C — use Formal Introduction earlier, before `lumber.foreman-notice`

Reject.

If the relationship reaches `professional` before the existing event, its condition:

`relationshipStage lumber.foreman == unknown`

fails.

The existing event no longer runs, and the same downstream `choose-professional` continuation is again missing.

## Attempt D — leave the normal free choice and add a separate D39 choice that produces less progress

Technically possible as data, but not a safe Product consumer.

The baseline choice already reaches `route-professional` for free after the same first shift.

Spending a bounded Specialist use to stop one stage earlier is strictly dominated and can strand the route.

It does not constitute a meaningful/live closure of the D39 reward.

---

# 6. Why this is a real blocker rather than a preference question

To be safe, an existing mapping must satisfy all of these simultaneously:

1. ordinary career already legal;
2. at least one completed current-life shift;
3. existing ordinary-professional relationship;
4. existing exact transition;
5. transition is the relationship's normal first professional stage;
6. exactly one transition on D39 use;
7. no downstream trust/conflict/route facts;
8. no career/School/Activity/ending gate bypass;
9. no regression of the relationship's normal route;
10. the D39 option has actual player value rather than being strictly worse than the free baseline path.

No current event/transition pair satisfies all ten.

The problem is not the v20 runtime.

The missing piece is an authored content seam/topology that D39 is allowed to opt into.

---

# 7. Required resolution outside this mapping task

One of the following must be explicitly accepted by the content/Product owner before Chat 2 assembly can close Formal Introduction:

## Option 1 — author a dedicated first-professional introduction event on an existing ordinary relationship

Requirements:

- existing ordinary career and relationship;
- reachable after legal career access + one shift;
- target transition lands exactly in first professional stage;
- target transition has no downstream trust/route effects;
- normal later relationship progression remains intact.

This is the cleanest D39 model but requires new authored content.

## Option 2 — split an existing relationship topology so first introduction and later trust are separate authored stages/transitions

This is broader and should not be inferred by Chat 2.

## Option 3 — Product explicitly authorizes a named existing trust transition as D39's “first professional stage”

This would change the currently accepted no-downstream-trust interpretation and therefore needs Product authority.

Chat 3 does not choose this unilaterally.

---

# 8. Do not implement these tempting shortcuts

Do not:

- tag every `build-trust` event;
- make Formal Introduction ignore transition conditions;
- fabricate relationship counters;
- fabricate `introduced-at-work`;
- write `professional-trust-earned` as a generic D39 effect;
- jump to `route-professional`;
- allow a second transition in the same D39 choice;
- alter Lumber Forewoman gates;
- target Palace, Activity or Secret Debt relationships;
- create a generic “any professional NPC” path.

---

# 9. Focused test requirements once an authored mapping exists

The eventual accepted consumer must prove:

1. inactive without Formal Introduction selected;
2. inactive before legal career access;
3. inactive at zero current-life shifts;
4. active after the exact required one-shift boundary;
5. performs exactly one relationship transition;
6. consumes exactly one use only on successful transition;
7. failed/invalid transition consumes zero;
8. same relationship cannot consume twice;
9. fourth relationship cannot consume after three successes;
10. reload preserves used relationship IDs;
11. baseline relationship route remains reachable after D39 use;
12. no downstream route/trust/ending fact is created by the D39 introduction itself;
13. Palace/Activity/Secret Debt targets remain rejected.

---

# 10. Disposition

**NO UNIQUE SAFE EXISTING MAPPING EXISTS.**

Closest structural candidate:

```text
event:        lumber.foreman-notice
career:       lumber
relationship: lumber.foreman
transition:   notice-work
target stage: professional
```

But the existing one-shot event immediately owns a second required `choose-professional` transition, so using only `notice-work` regresses the normal relationship route, while keeping the second transition violates D39's one-transition boundary.

All other current ordinary relationship candidates are trust-stage transitions with downstream trust side effects and are outside D39's accepted scope.

Per the v39–v41 task instruction:

**BLOCKER DOCUMENTED — STOP AFTER v39.**

v40 and v41 must not be fabricated until Leader/Product/content authority resolves the Formal Introduction consumer topology.
