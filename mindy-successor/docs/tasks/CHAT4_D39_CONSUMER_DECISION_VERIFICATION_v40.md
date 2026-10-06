# Chat 4 — D39 Consumer Decision Verification v40

Status: **INDEPENDENT DECISION PACKET COMPLETE — RECOMMEND ACCEPT WITH FOCUSED QA**  
Owner: Chat 4  
Branch: `chat4/d39-consumer-independent-resolution-v38`

## Purpose

Combine the independent v38 Formal Introduction review and v39 Source Method review into one Leader decision packet.

Research/design only.

No production runtime was changed.  
No full CI was run.

## 1. Is the Chat3 Formal Introduction blocker confirmed?

**Yes.**

The accepted D39 runtime is executable, but the frozen implementation adds no authored content pack.

Exact compare:

`09a97e0deef5bbccdbcdfbc4fc955f59b369345c -> b28b19628c0374c405cd32afedb0f16c105e2403`

contains only runtime/schema/UI/test files and zero `content/packs/*.json` changes.

Therefore no live production event currently consumes:

- `strongMetaFormalIntroductionAvailable`;
- `useStrongMetaFormalIntroduction`.

Chat3's blocker is confirmed as **missing content wiring**, not a mechanics failure.

No reason exists to reopen:

- the 3-use limit;
- one-use-per-relationship rule;
- one-shift prerequisite;
- ordinary-career legality;
- Specialist capacity;
- Palace/Activity/Secret-Debt exclusions.

## 2. Preferred Formal Introduction resolution

Preferred career:

`satyr-maid`

Preferred relationship:

`satyr-maid.recurring-guest`

Preferred existing event to reuse:

`satyr-maid.recurring-guest.intro`

### Required new first-professional state

Stage:

`professional-introduced`

Meaning:

a professional contact has been established, but no trust/route/private-contact state has been granted.

### Required new transition

Transition:

`formal-introduction`

Exact semantic shape:

```text
introduced
  -> professional-introduced
conditions: none
effects: none
```

The D39 runtime itself supplies:

- selected/resolved reward;
- legal ordinary career;
- legal current shift action;
- at least one completed current-life Satyr shift;
- unused relationship;
- remaining run use.

### D39 authored choice

Use the existing event `satyr-maid.recurring-guest.intro`.

Suggested choice ID:

`formal-introduction`

Typed effect:

```json
{
  "kind": "useStrongMetaFormalIntroduction",
  "career": "satyr-maid",
  "relationship": "satyr-maid.recurring-guest",
  "transition": "formal-introduction"
}
```

This choice must not write:

- `introduced-at-work`;
- `service-meetings`;
- trust facts;
- Night choice;
- request/route facts;
- career stage/facts.

### Normal path preservation

The existing normal intro retains exactly its authored work-contact writes:

- `introduced-at-work`;
- first `service-meetings +1`.

At its original career timing, the normal path also enters `professional-introduced`.

If D39 introduced the relationship earlier, the later ordinary intro still performs only the normal contact fact/counter and does not consume another D39 use.

Existing trust remains:

- `introduced-at-work == true`;
- `service-meetings >= 2`;
- then `build-trust`;
- then `professional-trust`.

For save compatibility, `build-trust` and the trust/service event must accept both pre-trust stages:

- legacy `introduced`;
- new `professional-introduced`.

Old in-progress saves therefore need no migration rewrite.

## 3. Why Satyr is preferred

Satyr provides a meaningful but bounded effect:

- ordinary relationship;
- explicitly professional/non-romantic intro;
- reward can establish the contact after one shift;
- normal intro timing remains separately authored;
- trust uses explicit counters/facts and is therefore easy to prove unchanged;
- later Night/request/route chain begins only after `professional-trust`.

This is safer and more useful than Lumber.

Lumber's `notice-work` transition is mechanically clean, but the ordinary foreman relationship already opens immediately after the first-shift career transition. Spending a Specialist use there would be nearly zero-value.

## 4. Preferred Source Method consumer

Preferred pack:

`content/packs/tavern-information.json`

Preferred existing event:

`tavern.information.broker-index-y1`

Preferred existing choice:

`read-hint`

New variant:

`source-method-crosscheck`

Condition:

```json
{
  "kind": "strongMetaKnowledge",
  "knowledge": "palace.inner-truth.source-method",
  "present": true
}
```

Keep the event's existing outer gates unchanged:

- Broker Index Meta unlock;
- year 1;
- `tavern.traveler-rumour-known`.

Keep:

`read-hint.effects == []`

exactly.

The new copy may distinguish:

- reported vs direct observation;
- source provenance;
- need for independent route confirmation;
- remaining uncertainty.

It must not establish new macro truth.

## 5. Why this Source Method seam is preferred

It is already a zero-write authored information event.

The existing text already defines it as guidance that:

- changes no fact;
- completes no prerequisite.

Other provenance-rich scenes are mechanically less clean:

- Hunter clue scenes write Hunter career facts;
- `tavern.information.rumour-route` writes `rumour-route-open`.

The Broker Index event therefore gives the smallest proof that Source Method is live without turning knowledge into progression.

## 6. Exact implementation surfaces if Leader accepts

### Formal Introduction

Expected authored files only:

- `content/definitions.json`;
- `content/packs/satyr-maid-relationship.json`;
- current localization source for new choice copy;
- focused tests.

The Satyr pack must add typed read capability:

`strongMetaFormalIntroduction`.

No new presentation slot is needed if the existing intro event ID is reused.

### Source Method

Expected authored files only:

- `content/packs/tavern-information.json`;
- current localization source for the new variant if required;
- focused tests.

The Tavern information pack must add typed read capability:

`strongMetaKnowledge`.

No new presentation slot is needed.

### Runtime

No new runtime/schema/Strong-Meta mechanic is recommended.

Chat 2 should use the accepted v20 D39 typed seams exactly.

## 7. Regression risks — Formal Introduction

### FI-R1 — accidental trust bypass

Risk:

D39 transition points directly to `professional-trust` or writes trust facts.

Stop condition:

Formal Introduction must stop at `professional-introduced`.

### FI-R2 — fabricated meeting progress

Risk:

D39 option writes `introduced-at-work` or increments `service-meetings`.

Stop condition:

D39 effect itself performs only the typed transition/use.

### FI-R3 — old-save soft lock

Risk:

a pre-change save has relationship stage `introduced` plus first meeting already recorded, while new trust content accepts only `professional-introduced`.

Stop condition:

trust event + `build-trust` must accept both pre-trust stages.

### FI-R4 — normal Satyr intro consumed too early

Risk:

early D39 display uses the existing event's only show and prevents the later authored work-contact beat.

Stop condition:

the event history/conditions must permit the later normal intro after an early D39 use, while baseline no-D39 still behaves as before.

### FI-R5 — free early normal intro

Risk:

broadening outer event eligibility accidentally exposes the ordinary `professional` choice after one shift even without spending Formal Introduction.

Stop condition:

the normal choice must retain the original Satyr career-stage timing; only the D39 choice may use the early one-shift path.

### FI-R6 — route/Night shortcut

Risk:

new stage satisfies Night/request/ending conditions.

Stop condition:

all later content continues to require `professional-trust` or its existing downstream stages/facts.

### FI-R7 — generic domain leak

Risk:

implementation auto-tags relationships or relaxes runtime namespaces.

Stop condition:

only `satyr-maid.recurring-guest` is opted in by authored content.

## 8. Regression risks — Source Method

### SM-R1 — reachability bypass

Risk:

Source Method becomes an alternative outer condition for the event.

Stop condition:

Broker Index/year/rumour gates remain unchanged.

### SM-R2 — mechanical reward

Risk:

cross-check choice writes a fact/counter/resource/stage.

Stop condition:

`read-hint.effects` remains empty.

### SM-R3 — variant ordering drift

Risk:

Source Method knowledge is present but default variant wins.

Stop condition:

the knowledge variant must be more specific than the zero-condition default under current variant ordering.

### SM-R4 — D49 lore leak

Risk:

new copy reveals Palace/Threshold/original-displacement truth.

Stop condition:

copy stays strictly on local Tavern report provenance and uncertainty.

### SM-R5 — hidden dependence mistaken for universal visibility

The preferred consumer also requires the existing Broker Index unlock.

This is acceptable for a **safe existing consumer**, but Leader should understand that Source Method will not appear in every life/profile unless that separate Tavern knowledge is also owned.

If Product requires Source Method to be guaranteed visible to every owner without another Meta prerequisite, this mapping should be rejected and a new zero-write ordinary information scene should be authored instead.

## 9. Exact focused test gate

At implementation/assembly time, require:

### Core D39

- `tests/palace-d39-reward-producer-v20.test.ts`;
- `tests/strong-meta-registry-v7.test.ts`;
- `tests/strong-meta-engine-integration-v7.test.ts`.

### Satyr regression

- `tests/satyr-maid-relationship-night.test.ts`;
- `tests/satyr-maid-natural-acceptance.test.ts`;
- `tests/satyr-maid-recurring-guest-presentation-c2-124.test.ts`;
- `tests/satyr-maid-ending-coexistence.test.ts`.

Add one focused D39 consumer test proving:

1. unselected/unresolved Formal Introduction unavailable;
2. zero Satyr shifts unavailable;
3. one legal shift makes only the D39 early choice available;
4. use reaches exactly `professional-introduced`;
5. no intro/trust fact or meeting counter is fabricated;
6. exactly one relationship use recorded;
7. ordinary intro still occurs at its old timing;
8. ordinary intro records exactly one first meeting;
9. second meeting remains required for `professional-trust`;
10. old-save `introduced` pre-trust state remains valid;
11. later Night/request/route chain remains reachable;
12. reload does not replay use.

### Tavern regression

- `tests/chat3-tavern-live-authored-v15.test.ts`;
- `tests/tavern-natural-acceptance.test.ts`;
- `tests/tavern-runtime.test.ts`.

Add focused Source Method assertions proving:

1. baseline event eligibility unchanged without Source Method;
2. Source Method alone cannot bypass Broker Index/year/rumour gates;
3. with all baseline gates + Source Method, event ID is unchanged;
4. selected variant = `source-method-crosscheck`;
5. `read-hint.effects` remains exactly empty;
6. resources/stats/Lust/inventory unchanged;
7. career/relationship counters/stages unchanged;
8. ending eligibility unchanged;
9. Activity/Palace/Secret-Debt state unchanged;
10. pending variant survives save/reload;
11. no D49 macro-lore terms/facts are introduced.

### Static/build gate

After authored implementation:

- `npm ci`;
- `npm run typecheck`;
- `npm run validate`;
- `npm run build`.

Then run the focused roster above.

Full CI remains Chat 2/release-lane owned and was not run by this review.

## 10. Leader decision

### Recommended

**ACCEPT the Formal Introduction Satyr seam**, provided the implementation preserves both legacy and new pre-trust stages until trust and does not write contact/trust counters through D39 itself.

**ACCEPT the Source Method Tavern Broker Index mapping** as the safest existing information-only consumer.

### Reasons to reject

There is no mechanics-level reason to reject either proposal under the accepted D39 authority.

Leader should reject or request a different Source Method consumer only if Product requires guaranteed visibility without owning `knowledge.tavern.broker-index`.

Leader should reject the Satyr proposal only if Product intends the Satyr `known-face` timing to be a hard prerequisite even for the explicitly-authorized Formal Introduction acceleration. That reading would conflict with the accepted D39 statement that the reward may establish a professional contact without waiting for the relationship's usual intro-event timing.

## 11. Final verification disposition

Chat3 blocker:

**CONFIRMED.**

Preferred Formal Introduction seam:

`satyr-maid.recurring-guest`  
existing event `satyr-maid.recurring-guest.intro`  
new stage `professional-introduced`  
new transition `formal-introduction`.

Preferred Source Method consumer:

`tavern.information.broker-index-y1`  
new variant `source-method-crosscheck`  
existing zero-effect choice `read-hint`.

No runtime re-design is required.

**v40 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_LEADER_DECISION**
