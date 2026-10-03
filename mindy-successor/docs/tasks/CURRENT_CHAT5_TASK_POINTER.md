# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — HOUSING TIER VALUE DECISION v8**
Owner: Chat 5

Accepted calibration:
`chat5/secret-debt-keystone-calibration-v7@e8e759b5470e45c94b6827ce5dbecede478d60ff`

D32 now locks:
- Earned Reserve Match cap 1000;
- Work Rhythm max 20 triggered bonus days;
- Network Retainer 25/day × 40 eligible days, max 1000.

New branch:
`chat5/housing-tier-value-decision-v8`

Read:
`mindy-successor/docs/tasks/LEADER_HOUSING_SEMANTIC_AUDIT_v1.md`

## Problem

Current live lodging:
- normal = 100;
- cheap = 50;
- street = 0 with Energy -1 + Grooming -1.

Leader's full 88-pack structural scan found:
- School Night Study allows normal OR cheap equally;
- ordinary career/relationship Night choices generally do not distinguish normal vs cheap;
- the only normal-only authored event is effect-free;
- cheap therefore currently gives essentially the same functional lodging value for half the price.

This is a Product dominance gap.

## Assignment

Produce a Product packet comparing three ways to give **normal lodging a directed, legible advantage without simply making cheap worse**:

1. explicit private-space access allowlist;
2. bounded storage/preparation utility;
3. narrowly bounded rest/recovery utility.

For each option define:
- exact mechanical effect;
- which existing/new surfaces consume it;
- current 100 vs 50 price justification;
- interaction with School Night Study;
- interaction with public/workplace Night choices;
- interaction with relationship routes;
- save/runtime state needs;
- D30 Keystone interactions;
- Secret Debt forced-Night precedence;
- abuse/dominance risks;
- minimal producer scope;
- acceptance tests.

Important:
- do not globally block all relationship Night choices on street;
- do not copy original rent escalation;
- do not grant unconditional normal-room +1 Energy without proving balance;
- do not alter lodging prices in production;
- do not implement runtime.

Recommend one model and, if needed, exact bounded numbers.

The goal is:
- normal has at least one real reason to pay 100;
- cheap remains a viable 50-money budget strategy;
- street remains viable but meaningfully harsher;
- no housing choice cancels authored forced Night.

No full CI.
Freeze SHA and report `READY_FOR_LEADER_PRODUCT_DECISION`.
