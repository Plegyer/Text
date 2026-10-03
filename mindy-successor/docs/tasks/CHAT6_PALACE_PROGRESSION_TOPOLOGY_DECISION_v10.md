# Chat 6 — Palace Progression Topology Decision v10

Status: **READY FOR LEADER PRODUCT DECISION**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-progression-topology-decision-v10`

Dispatch authority observed:
- `main@0c8926049a4b4ee4fda0574cea588d39f39dd14e`

Branch already contained leader queue/pointer commits before Chat 6 work began.

Frozen source packets:
- v5 authored Palace surfaces: `c7b26032af9347af59c590de187abd7d44795050`
- v6 selective integration manifest: `29def63f348ffd0bf46c16a7a3c7292b0877db9a`
- v8 D23 consumer integration: `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`
- v9 Prince confrontation decision: `4de1a3925d499a6337a3c40c05b8b4aba9f3cc03`

Machine-readable companion:

`content/palace-progression-topology-decision-v10.fixture.json`

Static decision checks:

`tests/palace-progression-topology-decision-v10.test.ts`

---

## 1. Locked boundaries preserved

Both topologies keep the same Palace contract:

- permanent ordinary Hard Work 10/10 + active ordinary Hard Work package 10/10 -> deterministic Day-1 Palace invitation;
- Palace is the successor True Ending route;
- no original Plus Mode;
- no `hardWork:palace`;
- True readiness requires all 12 progression stats `>=91`;
- Lust is excluded;
- Prince defeat is required before Return Home;
- defeating the Prince does not automatically commit Return Home;
- no Prince name/lore/mechanics are chosen here.

The topology decision only answers:

**How much Palace progression exists between Day-1 entry and the final outcome-ready state?**

---

## 2. Existing successor reference points

Current ordinary careers already demonstrate multiple progression densities:

- Lumber currently has a very small 2-stage machine.
- Most developed ordinary careers have 8–9 stages including branch states and `outcome-ready`.
- Common shipped work thresholds include:
  - first shift;
  - around 8 shifts for established work;
  - around 15–20 shifts for later ordinary progression.

This packet does not copy those thresholds directly.

Palace is structurally different:

- it is entered only after the player has already permanently earned all ten ordinary Hard Works;
- ordinary Hard Work itself is still 50 shifts;
- D26 limits same-career daily pacing only for the ten ordinary professions;
- D26 does **not** silently apply to Palace.

For comparison purposes only, v10 models Palace at roughly:

- compact: **8 Palace duty completions**;
- rich: **15 Palace duty completions**.

These are planning envelopes, not locked production numbers.

---

# 3. Shared topology contract

Both options use the same run-local completion signal:

`palace.progression-complete`

That world fact becomes the concrete replacement for v9's placeholder:

`PALACE_PROGRESSION_COMPLETE_SIGNAL`

The signal is written exactly once when Palace progression enters:

`outcome-ready`

Prince confrontation availability then requires:

```text
palace.access-granted
AND palace.progression-complete
AND all 12 progression stats >=91
AND palace.prince-defeated absent
```

The confrontation implementation itself remains the separate v9 Product decision.

---

# OPTION A — COMPACT 3-STAGE PALACE

## 4. Functional stages

### Stage 1 — Entered Service

ID:

`entered-service`

Function:

- invitation already accepted;
- Palace access exists;
- entry/orientation/handoff occurs;
- basic Palace work begins.

### Stage 2 — Trusted Service

ID:

`trusted-service`

Function:

- heroine is established enough for recurring professional context;
- patron/rival/official-contact content can develop;
- voluntary Night and legacy-item work variants have meaningful context;
- non-True outcome preparation can be foreshadowed.

### Stage 3 — Outcome Ready

ID:

`outcome-ready`

Function:

- general Palace progression is complete;
- `palace.progression-complete` is written;
- three non-True completion-only resolutions are available;
- Prince confrontation can become available if all 12 stats are also `>=91`.

---

## 5. Compact advancement

Planning skeleton:

### Entered Service -> Trusted Service

Candidate requirements:

- first-day orientation/handoff complete;
- 3 total Palace duty completions.

### Trusted Service -> Outcome Ready

Candidate requirements:

- 8 total Palace duty completions;
- one topology-neutral capstone work event resolved.

The general route must not require:

- romance;
- a specific Palace relationship;
- a legacy item;
- voluntary Night.

This preserves an item-free, romance-free, relationship-independent route to True readiness.

---

## 6. Compact existing-content attachment

### Entry / orientation

Stage:

`entered-service`

Reuse v5:

- `palace.invitation.day1-arrival`
- `palace.invitation.reveal`
- `palace.entry.gates`
- `palace.orientation.first-day`
- `palace.orientation.handoff`

### Official contact

- intro: `entered-service`
- practical help: `trusted-service`
- boundary: `outcome-ready`

### Professional patron

- intro: `trusted-service`
- trust: `trusted-service`
- conflict: `outcome-ready`

### Rival

- intro: `trusted-service`
- cooperation: `trusted-service`
- conflict: `outcome-ready`

### Optional romance

- invitation: `outcome-ready`
- mode choice: `outcome-ready`

Never required.

### Voluntary Palace Night

`palace.night.work-review`

Available after orientation.

`palace.night.social-conversation`

Available from Trusted Service.

Neither owns forced Night.

### Optional legacy-item variants

Entry/orientation is the natural home for:

- `artist_handle_invitation`
- `artist_formal_presence`
- `official_guard_access`
- `guard_sealed_pass`

Trusted-service work variants can use:

- `merchant_verify_manifest`
- `merchant_handle_samples`
- `access_guest_rooms_staff`
- `cross_rough_route`
- `preserve_specimen`
- `prostitute_handle_evidence`

No capability is required for Palace access or general progression.

---

## 7. Compact three non-True branch points

Because there are only three stages, all three final branch resolutions attach to:

`outcome-ready`

They remain distinct events/ending readiness facts.

### Service Life

Branch signal:

`palace.outcome.service-life-ready`

Baseline path:

- ordinary Palace duty continuity;
- optional official-contact or Night variants.

No relationship required.

### Court Power

Branch signal:

`palace.outcome.court-power-ready`

Baseline path:

- professional responsibility / network resolution;
- patron, rival and official-contact state may change responses;
- romance never required.

### Inner Truth

Branch signal:

`palace.outcome.inner-truth-ready`

Baseline path:

- neutral work/evidence/interpretation resolution;
- Night and legacy-item evidence handling may add alternate choices;
- an item-free path must always exist.

All three remain completion-only.

None auto-ends the run.

None closes the True route before ending commit.

---

## 8. Compact repetition and pacing

Planning expectation:

- about 8 Palace duties;
- two major progression changes;
- approximately two authored progression milestones;
- final three outcome resolution surfaces.

### Strength

Palace feels like a capstone after the player already completed the long ten-career Meta journey.

### Main risk

**Too-short / compressed Palace.**

With only one meaningful middle stage:

- multiple relationship routes compete for the same stage window;
- Court Power and Inner Truth preparation can feel abrupt;
- all three non-True outcomes appear close together.

### Mitigation

Do not fire all optional content immediately.

Use stage gating and event ordering so Trusted Service carries most relationship development before Outcome Ready.

---

## 9. Compact production estimate

Already-authored reusable player-facing scenes from v5:

- entry/orientation: 5;
- relationship scenes: 11;
- total: 16.

Also reusable:

- 2 voluntary Night choices;
- 10 optional legacy capability reactions/variants.

Estimated new topology-specific events:

**5–7**

Estimated total Palace scenes before Prince confrontation:

**21–23**

Production profile:

- localization: medium;
- test matrix: medium-low;
- regression surface: lower of the two options.

---

# OPTION B — RICH 6-STAGE PALACE

## 10. Functional stages

### Stage 1 — Entered Service

`entered-service`

Invitation, entry and orientation.

### Stage 2 — Working Rhythm

`working-rhythm`

Routine Palace procedure is understood.

Practical contact and early work variants can appear.

### Stage 3 — Trusted Service

`trusted-service`

Broader responsibility.

Professional patron/rival routes become meaningful.

Service Life preparation can begin.

### Stage 4 — Palace Network

`palace-network`

Cross-service coordination and professional relationship depth.

Court Power preparation fits here.

### Stage 5 — Crossroads

`crossroads`

Late work/evidence/interpretation choices converge.

Inner Truth preparation fits here.

### Stage 6 — Outcome Ready

`outcome-ready`

General Palace progression is complete.

`palace.progression-complete` is written.

All completion-only outcome resolution and True confrontation checks may evaluate.

---

## 11. Rich advancement

Planning skeleton:

### Entered Service -> Working Rhythm

- orientation complete;
- 2 total Palace duties.

### Working Rhythm -> Trusted Service

- 5 total duties.

### Trusted Service -> Palace Network

- 8 total duties;
- coordination milestone resolved.

### Palace Network -> Crossroads

- 12 total duties;
- network milestone resolved.

### Crossroads -> Outcome Ready

- 15 total duties;
- neutral capstone resolved.

These are comparison targets only.

They are not a new Palace daily cadence rule.

---

## 12. Rich existing-content attachment

### Entry/orientation

`entered-service`

Same five v5 scenes as compact.

### Official contact

- intro: `working-rhythm`
- practical help: `trusted-service`
- boundary: `crossroads`

### Professional patron

- intro: `trusted-service`
- trust: `palace-network`
- conflict: `crossroads`

### Rival

- intro: `trusted-service`
- cooperation: `palace-network`
- conflict: `crossroads`

### Optional romance

- invitation: `crossroads`
- mode: `crossroads` or `outcome-ready`

Never required.

### Voluntary Palace Night

Work review:

available from `working-rhythm`.

Social conversation:

available from `trusted-service`.

Still voluntary and subordinate to any forced-Night owner.

### Legacy item placement

Entered Service:

- invitation/formal/access variants.

Working Rhythm:

- staff access / rough-route variants.

Trusted Service / Palace Network:

- manifest;
- samples;
- preservation.

Crossroads:

- evidence handling;
- preservation;
- manifest verification.

Again, all are variants or alternate choices, never progression gates.

---

## 13. Rich three non-True branch points

The richer topology lets Product separate **preparation** from **completion**.

### Service Life

Preparation point:

`trusted-service`

The heroine can establish a continuity-of-service direction.

Final readiness fact is written only after completion at:

`outcome-ready`

### Court Power

Preparation point:

`palace-network`

Professional responsibility/network content can prepare this route.

Final readiness fact is written only at:

`outcome-ready`

### Inner Truth

Preparation point:

`crossroads`

Evidence/interpretation content can prepare this route.

A baseline no-item path remains mandatory.

Final readiness fact is written only at:

`outcome-ready`

Therefore all three non-True endings remain completion-only even though their identity is foreshadowed earlier.

True route remains open throughout.

---

## 14. Rich repetition and pacing

Planning expectation:

- about 15 Palace duties;
- five progression transitions;
- 4–5 authored stage milestones;
- three outcome preparation/resolution paths.

### Strength

Existing v5 Palace content has more room to breathe.

Relationship arcs can move through:

- introduction;
- cooperation/trust;
- conflict/boundary;

without stacking all three beats into one stage.

The three non-True outcome families gain distinct preparation windows.

### Main risk

**Grind / cosmetic staging.**

If the player presses the same Palace-work button 15 times while only stage labels change, the six-stage structure is worse than the compact version.

### Required mitigation if Product chooses rich

Every middle stage must expose at least one newly meaningful authored surface:

- new relationship beat;
- new work-context choice;
- new optional legacy variant;
- new outcome preparation;
- or a visible milestone event.

The six stages should organize content, not merely delay it.

---

## 15. Rich production estimate

Same existing 16 v5 authored scenes are reusable.

Estimated new topology-specific events:

**10–14**

Estimated total Palace scenes before Prince confrontation:

**26–30**

Production profile:

- localization: medium-high;
- test matrix: high;
- more stage-specific presentation/UI states;
- larger regression surface.

No new generic engine subsystem is required.

---

# 16. Save/reload semantics — both options

The existing successor schema already serializes Palace-compatible career state:

```text
stage
shifts
counters
choices
facts
```

under run-local career progression.

It also serializes:

- pending scene;
- latched/scheduled/optional reaction queue;
- relationship state;
- NightFlow;
- world facts.

Therefore both topologies can use normal run persistence.

Required behavior:

- reload preserves exact Palace stage;
- duty counters survive reload;
- stage facts/choices survive reload;
- queued/pending milestone scenes survive reload;
- Palace progression state is not Meta;
- restart/new life starts a new Palace progression run.

Important for the six-stage model:

A high duty counter must **not** cause reload to skip unresolved intermediate authored milestones.

Example:

If the player already has 12 duties but the `palace-network -> crossroads` milestone has not resolved, reload resumes that stage/milestone state rather than jumping directly toward Outcome Ready.

---

# 17. Prince availability — both options

Earliest availability:

`outcome-ready`

Required state:

```text
palace.access-granted
palace.progression-complete
all 12 progression stats >=91
palace.prince-defeated absent
```

The topology packet does not select v9 confrontation A/B/C.

Whichever v9 confrontation model Product chooses consumes the same:

`palace.progression-complete`

signal.

---

# 18. Direct comparison

| Axis | Compact 3-stage | Rich 6-stage |
|---|---|---|
| Functional stages | 3 | 6 |
| Planning Palace duties | ~8 | ~15 |
| Stage transitions | 2 | 5 |
| New topology events | ~5–7 | ~10–14 |
| Total scenes before Prince | ~21–23 | ~26–30 |
| Relationship pacing | compressed | distributed |
| Non-True branch prep | mostly final-stage | staggered |
| Grind risk | low | medium |
| Too-short risk | medium-high | low |
| Save/reload complexity | low | medium |
| Localization/test cost | medium | medium-high |
| Engine subsystem needed | no | no |
| `hardWork:palace` | no | no |
| Prince gate | same | same |

---

# 19. Acceptance matrix

The fixture carries V10-A01 through V10-A20.

Key shared acceptance:

- D23 invitation remains external to topology.
- No second Palace entry gate.
- General Palace progression requires no romance/item/relationship/Night.
- No `hardWork:palace`.
- `palace.progression-complete` appears exactly once.
- Prince cannot appear before progression completion.
- True stats remain all 12 `>=91`.
- Lust excluded.
- cap-200 does not normalize 91.
- all three non-True outcomes remain completion-only.
- optional romance refusal cannot block any outcome.
- legacy items remain optional.
- Palace Night cannot bypass forced Night.
- save/reload preserves stage/counters/facts/pending queue.
- no Prince lore/mechanics are introduced.

Compact-specific:

- exactly 3 stages;
- planning work thresholds 3 -> 8;
- three non-True final resolutions remain distinct.

Rich-specific:

- exactly 6 stages;
- planning work thresholds 2 -> 5 -> 8 -> 12 -> 15;
- Service Life prep at Trusted Service;
- Court Power prep at Palace Network;
- Inner Truth prep at Crossroads;
- all still complete only at Outcome Ready.

---

# 20. Product decision

The core choice is not about capability.

Both structures are implementable with current successor state-machine/event primitives.

The decision is about desired Palace weight.

### Compact 3-stage

Best aligned with Palace as a short capstone after the player already completed ten long ordinary Hard Work paths.

Cost/risk profile:

- smaller production scope;
- lower grind risk;
- higher risk that Palace feels compressed.

### Rich 6-stage

Best aligned with Palace as a substantial final career/route with room for relationships and three outcome families to develop separately.

Cost/risk profile:

- better authored pacing;
- higher production/test cost;
- higher risk of repetitive Palace work if the middle stages do not unlock visibly different content.

Leader/Product needs to decide:

1. `COMPACT_3_STAGE` or `RICH_6_STAGE`.
2. Whether ~8 vs ~15 duties are acceptable pacing envelopes before exact balance tuning.
3. Whether non-True preparation remains non-exclusive until ending commit.
4. Whether Palace later receives its own daily cadence rule; v10 does not infer D26 onto Palace.

---

# 21. Explicit non-goals

v10 does not implement or decide:

- production Palace career machine;
- final Palace work action ID;
- wages/stat effects;
- Palace daily frequency rule;
- Prince name/lore;
- v9 confrontation model;
- confrontation mechanics;
- original Plus Mode;
- `hardWork:palace`;
- shared Meta/Save/cap infrastructure.

No production runtime is changed.

No full CI is requested.

Freeze exact SHA and report:

`READY_FOR_LEADER_PRODUCT_DECISION`
