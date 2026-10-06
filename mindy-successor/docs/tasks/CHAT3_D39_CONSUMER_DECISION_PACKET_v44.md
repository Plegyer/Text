# Chat 3 — D39 Consumer Decision Packet v44

Status: **RESEARCH/DESIGN COMPLETE — READY FOR LEADER DECISION**  
Owner: Chat 3  
Branch: `chat3/palace-d39-consumer-resolution-v42`

## Inputs

Accepted D39 runtime authority:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Accepted Product authority:

`chat6/palace-nontrue-ending-rewards-v13@7673e9f47404468175567d952825cf0b0e981ed3`

D49 lore authority:

`chat6/macro-mystery-lore-authority-v21`

Chat 3 evidence:

- v39 blocker:
  `chat3/palace-d39-live-consumer-closure-v39@d65e5b2dd02628c7c36e7adb45a49493f0182e21`
- v42 Source Method mapping:
  `54206a7df28d1aca00a3e187643b2a276417a81f`
- v43 Formal Introduction seam proposal:
  `6e39f1c905e124c13182528bac1fc0a04c168f43`

No production/runtime code is changed by this packet.

---

# 1. Decision summary

Two D39 consumer gaps have different dispositions.

## Source Method

**SAFE NOW.**

Existing live effect-free consumer exists:

`school-life-content-v1.night-study.arcana-reason`

Recommended integration:

add one `strongMetaKnowledge`-gated information variant only.

No Product mechanics decision is required.

## Formal Introduction

**NOT SAFE TO WIRE TO EXISTING TRANSITIONS AS-IS.**

v39 exhaustively showed:

- Lumber's only clean first-professional transition is embedded in a one-shot event that immediately performs a second route transition;
- all other current direct candidates are trust-stage transitions with downstream trust semantics.

The accepted blocker must not be bypassed.

Smallest safe new seam:

`assassin.handler`

with one new neutral first-professional stage/transition.

This requires exactly one explicit Product/content opt-in decision.

---

# 2. Source Method — exact recommended assembly

Knowledge ID:

`palace.inner-truth.source-method`

Existing file:

`content/packs/school-life-content-v1.json`

Existing event:

`school-life-content-v1.night-study.arcana-reason`

Existing trigger:

`nightChoiceCompleted school.night_study.arcana.reason`

Existing choice:

`continue`

Existing effects:

`[]`

Add variant:

`source-method-crosscheck`

Condition:

```json
{
  "kind": "strongMetaKnowledge",
  "knowledge": "palace.inner-truth.source-method",
  "present": true
}
```

Keep event legality unchanged.

Add typed pack capability read:

```json
"meta": [
  "strongMetaKnowledge"
]
```

No typed write is added.

## Source Method content ceiling

Allowed:

- source;
- observation;
- independent corroboration;
- contradiction;
- unresolved mismatch;
- inference vs fact.

Forbidden before Palace reveal:

- Threshold;
- Threshold Archive;
- Palace Concordance;
- inter-world explanation;
- origin cause;
- route home;
- Prince responsibility.

Recommended content identity:

```text
Trace each claim back to what was observed and who supplied it.
Independent agreement strengthens a conclusion; a mismatch remains unresolved
instead of being turned into an answer.
```

Final prose/localization can be content-owned if epistemic strength remains identical.

---

# 3. Why Source Method integration is mechanically safe

The selected School-life event is already:

- live;
- optional notification content;
- effect-free;
- reload-stable;
- downstream of an already-resolved legal Night Study choice.

Current test authority already proves:

- School-life authored choices are effect-free;
- Night-study flavor content owns no Night-study mechanics;
- materialized variant ID survives save/reload.

Source Method changes only event presentation.

It does not own:

- Night stat +2;
- School Night-study counter;
- next-day Energy -1;
- calendar advance;
- any progression effect.

Because resolver variant selection prefers more-specific eligible variants, the one-condition Source Method variant deterministically outranks the zero-condition `default`.

---

# 4. Formal Introduction — accepted blocker

Stable Specialist:

`palace.court-power.formal-introduction`

Runtime seams:

- `strongMetaFormalIntroductionAvailable`;
- `useStrongMetaFormalIntroduction`.

v39 conclusion:

**no current existing event/transition pair is both safe and complete.**

Do not directly wire:

- `lumber.foreman / notice-work`;
- any current `build-trust` transition;
- Palace relationships;
- Activity relationships;
- Secret Debt relationships.

Do not reinterpret the blocker as a runtime defect.

The runtime is intentionally waiting for explicit authored opt-in.

---

# 5. Formal Introduction — exact recommended content decision

Recommended first live target:

`assassin.handler`

Why:

- existing ordinary career;
- explicitly professional handler relationship;
- baseline intro event writes only:
  `introduced-at-work`;
- no intro counter;
- no career fact;
- no trust fact;
- no route/conflict fact.

This is the smallest relationship topology that can absorb a neutral D39 introduction state.

## Required explicit decision

Leader/Product/content owner should approve:

> `assassin.handler` is the first live Formal Introduction consumer. Add one neutral relationship stage `formal-introduced` and one transition `formal-introduction` from `introduced` to `formal-introduced`. The transition may reproduce only the existing introductory fact `introduced-at-work`. It must not grant trust, handler approval, conflict state, utility, route state, career progression, ending readiness, resource or stat changes. The existing operative/trusted-blade intro gate remains. Normal `build-trust` remains a separate later transition and must accept the neutral intermediate stage without otherwise weakening its conditions.

That is the only Product/content decision requested by v44.

No D39 runtime rule change is requested.

---

# 6. Formal Introduction — exact file edits after approval

## A. `content/definitions.json`

Relationship:

`assassin.handler`

Add stage:

`formal-introduced`

Add transition:

`formal-introduction`

Shape:

```json
{
  "id": "formal-introduction",
  "from": [
    "introduced"
  ],
  "to": "formal-introduced",
  "conditions": [],
  "effects": [
    {
      "kind": "addRelationshipFact",
      "relationship": "assassin.handler",
      "fact": "introduced-at-work"
    }
  ]
}
```

Expand existing:

`build-trust.from`

to accept:

- `introduced`;
- `formal-introduced`.

Do not change its target/conditions/effects.

## B. `content/packs/assassin-relationship.json`

Existing event:

`assassin.relationship.intro`

Keep current event conditions unchanged:

- Assassin `operative` OR `trusted-blade`;
- `introduced-at-work == false`.

Keep existing baseline choice unchanged.

Add choice:

`formal-introduction`

Condition:

```json
{
  "kind": "strongMetaFormalIntroductionAvailable",
  "career": "assassin",
  "relationship": "assassin.handler",
  "transition": "formal-introduction"
}
```

Effect:

```json
{
  "kind": "useStrongMetaFormalIntroduction",
  "career": "assassin",
  "relationship": "assassin.handler",
  "transition": "formal-introduction"
}
```

Add capability read:

`meta.strongMetaFormalIntroduction`

Existing relationship write capability is sufficient.

## C. Existing trust event

Event:

`assassin.relationship.trust`

Expand only its relationship-stage condition to accept:

- `introduced`;
- `formal-introduced`.

Keep:

- `introduced-at-work == true`;
- `continue` choice;
- `handler-trust-ready` write;
- normal `build-trust` transition.

No other Assassin relationship event changes.

---

# 7. What Chat 2 must not do

Do not:

- change Formal Introduction max uses;
- create a third Specialist slot;
- auto-select Court Power reward;
- activate it in the earning life;
- make it generic across every relationship;
- infer usage from old saves;
- grant trust at Formal Introduction;
- grant `handler-trust-ready`;
- grant `professional-trust-earned`;
- open conflict;
- resolve conflict;
- write route/ending facts;
- bypass Assassin career gates;
- bypass one-current-life-shift runtime check;
- consume use on failed transition;
- add Palace/Activity/Secret Debt relationship targets.

For Source Method do not:

- gate the whole School scene on knowledge;
- add a mechanical choice;
- alter Night Study effects;
- state D49 macro answers.

---

# 8. Save/reload rules

## Source Method

The run snapshot is authoritative.

Same-life Inner Truth completion:

- permanent knowledge ownership may be earned;
- current run snapshot does not change;
- Source Method variant must not appear retroactively.

Later life:

- fresh snapshot auto-inherits knowledge;
- variant may appear in already-legal scene.

Queued variant ID is materialized and must remain stable through reload.

## Formal Introduction

New stage:

`formal-introduced`

is valid only after approved content is assembled.

Existing saves:

- require no inferred stage;
- require no inferred D39 use.

New D39 use:

- stage persists;
- `introduced-at-work` persists;
- `formalIntroductionUsedRelationshipIds` persists.

Reload before normal trust must leave normal trust route reachable.

No schema-version bump is required solely for these content-compatible additions if final schema validator accepts the new definition stage and current D39 runtime fields.

---

# 9. Specialist/knowledge slot firewalls

Formal Introduction:

- Specialist;
- normal capacity 2;
- selectable only in later life;
- bounded 3 uses/run;
- 1 use/relationship.

Source Method:

- automatic knowledge;
- no Specialist slot;
- no preference selection;
- no usage counter;
- unlimited authored information-only appearances where explicitly mapped.

Do not merge these two lifecycle models.

---

# 10. Focused executable gate after approval/assembly

## D39 runtime authority

```text
tests/palace-d39-reward-producer-v20.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
```

## Source Method consumer

```text
tests/school-life-content-reload.test.ts
tests/school-night-study-adapter.test.ts
tests/night-flow.test.ts
```

Add assertions:

- default variant without knowledge;
- Source Method variant with future-life knowledge snapshot;
- same-life earned knowledge not active;
- no mechanical delta;
- queued variant stable across reload.

## Formal Introduction consumer

```text
tests/assassin-runtime-invariants.test.ts
tests/assassin-natural-acceptance.test.ts
tests/assassin-boundaries.test.ts
tests/migration.test.ts
```

Add assertions:

- baseline Assassin intro unchanged;
- D39 choice absent without selected reward;
- D39 choice absent before original Assassin gate;
- D39 choice absent before one-shift runtime boundary;
- successful use -> exactly `formal-introduced`;
- only `introduced-at-work` introductory fact appears;
- no trust/career/route/conflict/ending shortcut;
- exactly one relationship use recorded;
- normal trust later remains reachable;
- reload preserves stage/use ledger;
- same relationship cannot consume again;
- failed use consumes nothing.

## Build gate

On actual assembled branch:

```text
npm run typecheck
npm run validate
npm run build
```

Full CI remains Chat 2/Leader release lane, not Chat 3.

---

# 11. Stop conditions

Stop D39 consumer assembly if:

- Source Method event gets any mechanical effect;
- Source Method makes an otherwise illegal scene legal;
- Source Method reveals D49 L2+ material before authorized Palace point;
- same-life Inner Truth reward activates immediately;
- Formal Introduction target changes from explicitly approved relationship without new review;
- Formal Introduction writes trust/conflict/route/ending facts;
- Assassin `operative/trusted-blade` gate is weakened;
- normal Assassin relationship route becomes unreachable;
- baseline non-D39 intro changes behavior unexpectedly;
- transition failure still consumes a use;
- old saves infer a use;
- Specialist capacity changes;
- a generic relationship bypass is introduced.

---

# 12. Recommended Leader decision

Approve both of the following:

## Decision 1 — Source Method mapping

No mechanics change required.

Approve:

`school-life-content-v1.night-study.arcana-reason`

as the first live Source Method consumer through one `strongMetaKnowledge`-gated, effect-free L1 information variant.

## Decision 2 — Formal Introduction first authored opt-in

Approve:

`assassin.handler`

with:

- neutral stage `formal-introduced`;
- transition `formal-introduction`;
- introductory fact `introduced-at-work` only;
- existing Assassin intro gate unchanged;
- later normal trust route preserved.

No other relationship opts in during this closure unless separately reviewed.

---

# 13. Final disposition

Safe immediately:

**Source Method -> School Arcana/Reason Night Study effect-free variant.**

Requires one explicit content/Product approval:

**Formal Introduction -> Assassin handler neutral first-professional seam.**

No runtime redesign is needed.

No full CI was run.

**BUNDLE_COMPLETE — READY_FOR_LEADER_DECISION**
