# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — STRONG META TYPED RUNTIME PRODUCER v7**
Owner: Chat 4

Accepted contract:
`chat4/strong-meta-catalog-contract-v6@b16afe2ea2195807b2e5dff564309c9123b3bde4`

Leader/Product authority:
- D27: Keystone + Specialists architecture;
- D28: 0..1 Keystone + 0..2 Specialists;
- D24 cap-200 = Specialist;
- D30 three Secret Debt Keystone identities;
- D32 exact numeric parameters:
  - Reserve Match cap 1000;
  - Work Rhythm max 20 bonus days;
  - Network Retainer 25/day for first 40 eligible days, max 1000.

New branch:
`chat4/strong-meta-runtime-producer-v7`

## Assignment

Implement the smallest typed production runtime/data layer described by accepted v6 contract.

Approved strong-Meta registry entries only:
- `palace.true.cap-200` — Specialist;
- Paid Freedom / Earned Reserve Match — Keystone;
- Bound Life / Work Rhythm — Keystone;
- Takeover / Network Retainer — Keystone.

Do not create No Rent, unconditional +1 Energy, extra calendar time, generic starting Capital, generic School/access perks or any other research-only reward.

Required production scope:
- typed stable-ID registry;
- permanent ownership state;
- automatic knowledge separation;
- preferred New Start+ strong-Meta selection;
- immutable resolved current-run snapshot;
- validation 0..1 Keystone / 0..2 Specialists;
- migration from current generic Meta scaffolding without inventing ownership;
- unknown/retired ID handling per v6;
- current-run snapshot preservation across catalog changes;
- run-local counters for the three D30 Keystones;
- exact D32 runtime behavior;
- cap-200 projected through the typed Specialist layer without multiplying stat values;
- exact inverse/reselection safety;
- save/reload idempotence.

Secret Debt invariants:
- forced Night cannot be cancelled;
- bound next-day Energy -1 applies after Work Rhythm and remains relative loss;
- hidden work does not arm Work Rhythm;
- Reserve Match does not match hidden wage/lender grant/repayment/non-work money;
- Retainer pauses while bound and missed payments are lost.

Palace invariants:
- no strong-Meta reward substitutes for D23 10/10 permanent + 10/10 active ordinary packages;
- do not implement Palace invitation/consumer here;
- no permanent Palace unlock.

Do not implement final strong-Meta UI; only minimal schema/runtime APIs needed for later UI binding.
Do not touch ordinary Hard Work package selection semantics except typed coexistence.
No full CI.

Run focused:
- registry/validation;
- migration;
- exact inverse;
- save/reload;
- D24;
- D30 each in isolation;
- D30 + cap-200;
- Secret Debt ordering;
- D23 non-substitution.

Freeze exact SHA and report `READY_FOR_CHAT2_ASSEMBLY`.
