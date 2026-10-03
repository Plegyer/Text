# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — STRONG META CATALOG / MIGRATION CONTRACT v6**
Owner: Chat 4

Accepted v5 packet:
`chat4/strong-meta-keystone-capacity-v5@68d480c46d604da4f298ba03241011f8a55550d9`

Leader/Product authority:
- D27 = one Keystone + Specialists;
- D28 = **0..1 Keystone + 0..2 Specialists**;
- cap-200 consumes one ordinary Specialist slot;
- Hard Work packages remain a separate unrestricted subset layer;
- automatic knowledge/content consumes no strong-Meta slots;
- D30 selects three Secret Debt future-run rewards as distinct bounded **Keystones**.

Authority commit:
`main@69eaedb1950e3ea712119388e1734c526a93be21`

Branch:
`chat4/strong-meta-catalog-contract-v6`

The branch was created by Leader from the authority commit above.
Branch existence is dispatch only; count work only after a real worker commit.

## Assignment

Produce an implementation-ready **data / validation / migration contract** for D27+D28. Do not implement production runtime/UI.

The contract must define stable typed representation for four separate layers:

1. permanent reward ownership;
2. automatic inherited knowledge/content;
3. New Start+ preferred selection;
4. resolved current-run snapshot.

Exact capacity:
- Keystone IDs: 0..1;
- Specialist IDs: 0..2;
- Hard Work package IDs: separate, any earned subset;
- automatic knowledge IDs: separate, no capacity.

Approved catalog entries that must be represented now:
- D24 `palace.true.cap-200` — Specialist;
- D30 Paid Freedom / Earned Reserve Match — Keystone;
- D30 Bound Life / Work Rhythm — Keystone;
- D30 Takeover / Network Retainer — Keystone.

Do not silently promote research-only examples such as No Rent, unconditional +1 Energy, extra calendar time, generic passive income, large starting Capital, School discounts or access perks into approved rewards.

Deliver:
- exact stable ID format and typed registry shape;
- ownership vs selection vs current-run snapshot fields;
- validation order and user-facing invalid-selection reasons;
- deterministic resolution of unknown/retired IDs;
- migration from current `activeLegacyPerks` / generic Meta scaffolding;
- migration when a future catalog reclassifies a reward;
- rule that in-progress lives retain their start snapshot;
- save/reload and idempotence contract;
- exact inverse enable/disable regression model;
- pairwise collision matrix for the four currently approved strong-Meta entries;
- Secret Debt Energy-order invariant;
- Palace D23 non-substitution invariant;
- UI contract for "Keystone 0/1", "Specialists 0/2", automatic knowledge and separate Hard Work packages;
- focused/static acceptance scenarios.

Use the original-game runtime bugs already documented by Leader as regression evidence:
- incomplete spell disable;
- Title/description wiring mismatch;
- broad bonuses sharing flat cost.

Do not invent additional Product rewards.
No production runtime/UI changes.
No full CI.
Freeze exact SHA and report `READY_FOR_LEADER_ACCEPTANCE`.
