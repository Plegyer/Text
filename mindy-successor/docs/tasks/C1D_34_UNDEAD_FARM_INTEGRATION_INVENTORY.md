# C1D-34 — Undead Farm current-main integration inventory

Baseline: `main@75cbd6f5aa2ae81fa7b677c7e47d8d16faa75892`
Owner: Chat 1 Developer / Integration Developer
Status: INVENTORIED — no content-authoring expansion

## Current production state

Career machine:
- career id: `undead-farm`
- initial stage: `new-hand`
- current later stage: `reliable-helper`
- transition: `first-shift`
- transition condition: existing typed counter `completed_shifts >= 1`
- transition effect: existing fact `first-shift-complete`

Base action:
- action id: `undead-farm.shift`
- current cost: 1 Energy / 0 money
- increments `undead-farm.completed_shifts`
- also executes `advanceCareer(undead-farm, first-shift)`
- has four existing seasonal scenes/presentation surfaces.

Events / relationships / endings:
- no active top-level production pack currently references `undead-farm`;
- no dedicated Undead Farm relationship machine exists;
- no Undead Farm ending exists in current definitions;
- no authored post-`reliable-helper` career transition exists.

Current integration surfaces:
- Day-1 starter availability is approved and is owned by the C1D-26/27 central action availability contract;
- current presentation surfaces exist; later Chat 2 starter-career presentation work remains presentation ownership and is not authored here;
- merged School handoff material contains only preparation/mapping evidence and selects no Undead Farm threshold or public fact.

## Missing runtime seams / blockers

1. Repeatability after first transition:
   `undead-farm.shift` always contains `advanceCareer(first-shift)`. The engine correctly rejects that transition once stage is already `reliable-helper`. Therefore a second direct Undead Farm shift currently reaches a transition-availability error rather than behaving as a repeatable base shift. This is a current runtime seam, not permission to invent a new stage or threshold.

2. No approved later progression:
   no post-`reliable-helper` stage, event, relationship or ending contract is authored.

3. No approved School unlock/progression contract:
   School preparation mappings do not authorize a provider, milestone threshold, or career fact.

No progression threshold or content fix is invented in C1D-34; this inventory is the durable handoff for later Lead assignment.
