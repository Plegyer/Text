# Chat 3 — D39 Source Method Consumer Mapping v42

Status: **RESEARCH COMPLETE — SAFE EXISTING CONSUMER IDENTIFIED**  
Owner: Chat 3  
Branch: `chat3/palace-d39-consumer-resolution-v42`

## Scope

Map automatic knowledge:

`palace.inner-truth.source-method`

onto an already-legal, information-only live scene without creating any new progression/resource effect and without leaking D49 macro-mystery truth.

Research-time authorities:

- current task branch seed:
  `098e381e301aaa07469e65583ac01823d08213a5`;
- current main observed:
  `c2146d92156b63ad55c12d3b862a11eaab898868`;
- D39 Product authority:
  `chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`;
- D39 runtime:
  `chat5/palace-d39-reward-producer-v20`;
- D49 lore authority:
  `chat6/macro-mystery-lore-authority-v21`.

No production/runtime change is made by v42.

---

# 1. D39 Source Method contract

Source Method is automatic inherited knowledge, not a Specialist.

Stable knowledge ID:

`palace.inner-truth.source-method`

Runtime condition already exists:

```text
kind: strongMetaKnowledge
knowledge: palace.inner-truth.source-method
present: true
```

Required content behavior:

- only in a scene already legal for other reasons;
- source/provenance/corroboration/contradiction interpretation only;
- no money;
- no Energy;
- no stat;
- no counter;
- no stage;
- no route-ready fact;
- no ending eligibility;
- no Palace gate;
- no Activity gate;
- no Secret Debt mutation;
- no same-life activation after earning Inner Truth.

The condition reads the immutable run Strong Meta snapshot.

Therefore the knowledge becomes visible only in a later life after New Start+ creates a fresh snapshot.

---

# 2. D49 ceiling

Before Palace, Source Method may remain at D49 L1 only.

Safe content may say:

- observation differs from explanation;
- source identity matters;
- two independent records agreeing strengthen confidence;
- a mismatch remains unresolved;
- uncertainty should remain explicit.

It may not say:

- Threshold;
- Threshold Archive;
- Palace Concordance;
- inter-world crossing as explanation;
- Palace caused the heroine's arrival;
- route home;
- original displacement cause.

Source Method teaches method, not the macro answer.

---

# 3. Existing effect-free information candidates

The strongest current candidates are all already-live effect-free reactions.

## Candidate A — School Arcana / Reason Night Study

Exact event:

`school-life-content-v1.night-study.arcana-reason`

Owning file:

`content/packs/school-life-content-v1.json`

Existing trigger:

```text
nightChoiceCompleted:
  school.night_study.arcana.reason
```

Existing title:

`Separate evidence from explanation`

Existing default copy:

the page is divided into observed / tested / still unknown, and explanation does not replace evidence.

Existing choice:

`continue`

Existing effects:

`[]`

This is the strongest semantic match.

D49 explicitly authorizes School to teach:

- evidence vs explanation;
- observed / tested / unknown;
- source bias;
- independent comparison;
- preserving uncertainty.

## Candidate B — School Literacy & Numbers / Reason Night Study

Exact event:

`school-life-content-v1.night-study.literacy-and-numbers-reason`

Existing choice effects:

`[]`

Semantics:

trace each reasoning step from evidence to conclusion.

Safe, but less directly provenance/cross-check oriented than Candidate A.

## Candidate C — Tavern Broker Index family

Exact events:

- `tavern.information.broker-index-y1`
- `tavern.information.broker-index-y2`
- `tavern.information.broker-index-y3`
- `tavern.information.broker-index-y4`

Existing choice:

`read-hint`

Existing effects:

`[]`

Semantics:

a recorded report still needs independent route confirmation.

This is also D49-safe.

However these scenes already require:

`knowledge.tavern.broker-index`

plus a Tavern rumor fact and matching calendar year.

Adding Source Method only as a variant would therefore make the D39 knowledge depend on another inherited/unlock path before the consumer can ever be seen.

That is safe but unnecessarily narrow.

---

# 4. Preferred mapping

**Preferred existing live consumer:**

`school-life-content-v1.night-study.arcana-reason`

Reasons:

1. the event is already legal only after the player actually selected the exact Night Study choice;
2. the reaction itself owns no School mechanics;
3. its only choice has `effects: []`;
4. current executable QA already asserts School-life flavor content owns no Night Study mechanics;
5. D49 explicitly names “observed / tested / unknown” as safe School epistemic method;
6. it needs no other inherited Meta unlock;
7. it reveals no Palace-specific fact;
8. it can use the existing `strongMetaKnowledge` condition without runtime changes.

---

# 5. Exact authored mapping

Keep the event trigger, event conditions, choice and effects unchanged.

Add one higher-specificity variant to:

`school-life-content-v1.night-study.arcana-reason`

Recommended variant ID:

`source-method-crosscheck`

Condition:

```json
[
  {
    "kind": "strongMetaKnowledge",
    "knowledge": "palace.inner-truth.source-method",
    "present": true
  }
]
```

Recommended L1-safe content identity:

```text
Trace each claim back to what was actually observed and who supplied it.
Independent agreement strengthens a conclusion; a mismatch stays marked as
unresolved instead of being turned into an answer.
```

Exact final prose/localization may be content-owned, but it must preserve that epistemic strength.

Do not mention:

- Palace;
- Threshold;
- crossing;
- origin;
- return;
- Prince;
- archive.

---

# 6. Why the knowledge variant wins deterministically

Current resolver snapshot logic sorts eligible variants by:

1. descending condition count;
2. older/unused history;
3. stable variant ID.

Current event has only:

`default`

with zero conditions.

The proposed Source Method variant has one condition.

Therefore when the run snapshot contains Source Method:

`source-method-crosscheck`

wins over `default`.

Without the knowledge it is ineligible and the existing `default` remains unchanged.

No random selection or new runtime seam is needed.

---

# 7. Pack capability change required during assembly

Current:

`school-life-content-v1.json`

has no typed `capabilities` object.

Because v20 content validation treats `strongMetaKnowledge` as a typed Meta read, the assembled pack must declare:

```json
"capabilities": {
  "reads": {
    "meta": [
      "strongMetaKnowledge"
    ]
  },
  "writes": {}
}
```

No typed write capability is needed for Source Method.

Do not add:

- Strong Meta Specialist write;
- career write;
- School counter write;
- Palace capability;
- Activity capability;
- Secret Debt capability.

---

# 8. Mechanical neutrality

The preferred consumer event already has:

```text
choice: continue
effects: []
```

Source Method changes only which event variant text is materialized.

It must not change:

- the Night Study stat +2 already owned by the Night choice;
- next-day Energy -1 already owned by Night Study;
- School Night-study session counter;
- School lessons-completed counter;
- money;
- daytime Energy;
- calendar advance;
- Night ownership;
- any relationship;
- any career;
- any ending.

The Source Method event is downstream presentation of an already-resolved Night choice.

It does not become the owner of Night Study mechanics.

---

# 9. Save/reload behavior

Current reaction resolver materializes a queued optional event with a concrete:

- event ID;
- variant ID;
- allowed choice IDs.

Current `school-life-content-reload.test.ts` already proves materialized School-life variants remain stable through repeated reload.

Required D39 extension:

1. future-life run snapshot contains Source Method;
2. Night Study `school.night_study.arcana.reason` completes;
3. queued event is:
   `school-life-content-v1.night-study.arcana-reason`;
4. queued variant is:
   `source-method-crosscheck`;
5. reload preserves that variant ID exactly;
6. opening/resolving the offer changes no mechanical state beyond normal event history;
7. earning Inner Truth in the current life does not retroactively change a previously materialized/default scene.

---

# 10. Focused executable tests

Extend or add a narrow D39 live-consumer test with:

## Visibility

- without Source Method snapshot -> `default`;
- with Source Method snapshot -> `source-method-crosscheck`;
- same-life Inner Truth completion -> still `default`;
- later New Start+ snapshot -> Source Method variant available.

## Neutrality

Snapshot before opening the Source Method reaction:

- stats;
- money;
- Energy;
- progression careers;
- progression quests;
- progression relationships;
- School tracks;
- endings;
- Activity;
- Secret Debt-owned state.

Resolve `continue`.

Assert those values are unchanged.

Only normal reaction/event history may differ.

## Existing regression suites

Run at minimum:

```text
tests/palace-d39-reward-producer-v20.test.ts
tests/school-life-content-reload.test.ts
tests/school-night-study-adapter.test.ts
tests/night-flow.test.ts
```

plus final D49/lore/presentation checks on the assembled branch.

No full CI is owned by Chat 3.

---

# 11. Rejected mappings

## Do not put Source Method on the event-level conditions

That would make knowledge create scene reachability.

D39 requires already-legal scenes.

The knowledge belongs on the **variant**, not the event gate.

## Do not add a Source Method choice with progression effects

No:

- addCareerFact;
- increment counter;
- stat;
- item;
- money;
- stage;
- ending fact.

## Do not reinterpret Activity anomalies

Source Method cannot turn local route mismatches into inter-world evidence.

## Do not make the Tavern Broker Index the only consumer

It is safe but unnecessarily dependent on a second Meta unlock.

It remains a valid optional future secondary consumer, not the preferred first closure.

---

# 12. Disposition

A safe existing live consumer **does exist**.

Preferred mapping:

```text
knowledge:
  palace.inner-truth.source-method

existing live event:
  school-life-content-v1.night-study.arcana-reason

existing legal trigger:
  nightChoiceCompleted school.night_study.arcana.reason

new authored variant:
  source-method-crosscheck

variant condition:
  strongMetaKnowledge(palace.inner-truth.source-method)

existing choice:
  continue

choice effects:
  []
```

This mapping satisfies D39 and D49 without a new runtime effect or new scene gate.

**v42 COMPLETE — CONTINUE TO v43**
