# LEADER1 D39 LIVE-CONSUMER DECISION — 2026-10-06

Status: **APPROVED FOR PRODUCER IMPLEMENTATION**
Authority: Leader 1

## Background

D39 reward runtime is accepted, but independent reviews confirmed that no existing authored event safely consumes Formal Introduction without either:
- skipping trust/route progression;
- stranding an existing relationship route;
- or turning the reward into a generic bypass.

Chat 3 and Chat 4 independently confirmed the blocker.

They proposed different safe authored seams.

Leader resolves the design by choosing the narrower integration with the least downstream topology change.

## Decision A — Formal Introduction

Approve the first live consumer on:

- career: `assassin`
- relationship: `assassin.handler`

Add one neutral first-professional stage:

`formal-introduced`

Add one transition:

`formal-introduction`

from existing `introduced` to `formal-introduced`.

Allowed introductory fact:
- existing `introduced-at-work` only.

Forbidden effects:
- trust;
- handler approval;
- conflict;
- route state;
- career progression;
- ending readiness;
- resources;
- stats;
- counters beyond the existing introductory fact.

The existing Assassin intro gate remains unchanged.

Normal trust remains a later separate transition and must accept the neutral intermediate stage without weakening any existing trust conditions.

Rationale:
- Assassin has the smallest clean introductory semantic surface;
- no meeting counter needs to be fabricated;
- no route choice needs to be performed early;
- no Night/request chain needs to be retimed;
- the new D39 seam can be proved as exactly one bounded professional-introduction transition.

Do not expand this opt-in to other careers in this closure.

## Decision B — Source Method

Approve first live Source Method consumer on the existing School Arcana/Reason Night Study information event:

`school-life-content-v1.night-study.arcana-reason`

Add one `strongMetaKnowledge`-gated information-only variant.

The variant must remain effect-free.

It may improve:
- provenance checking;
- distinction between observation and report;
- independent corroboration;
- explicit uncertainty.

It must not:
- alter resources/stats/counters/stages;
- change ending eligibility;
- reveal D49-reserved macro truth;
- make an otherwise illegal School/Night scene legal.

Rationale:
- existing event is already effect-free;
- no unrelated Meta unlock is required;
- the knowledge remains information-only and slot-free;
- no runtime redesign is needed.

## Required validation

Implementation must prove:
- same-life earned D39 rewards do not activate in the current immutable snapshot;
- future-life selection/knowledge behavior is preserved;
- Formal Introduction consumes one use only on successful transition;
- same relationship cannot consume twice;
- normal Assassin trust route remains reachable;
- old saves require no fabricated use/stage;
- Source Method variant has zero mechanical delta;
- D49 macro-lore remains sealed;
- Specialist capacity remains 2;
- Source Method never becomes selectable.

Full CI remains Chat 2 / Leader lane.
