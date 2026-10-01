# Chat 1 Developer Queue v12 — Tavern Complete Career Runtime

Status: **ACTIVE / START ON NEW BRANCH**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-121..132

Predecessor Undead candidate:
- PR #178
- exact frozen head `b75e73c0f5e37b19277cb25cf0321587f6444ab4`
- exact-head CI #616 SUCCESS
- do not move it while Chat 4 gates it.

Create a new branch from current main (or a clean stack that can later transplant to current main), e.g. `chat1/tavern-complete-v12`.

Goal: make **Tavern** the first complete late-career life.

Authority:
- `CAREER_TAVERN_DRAFT_v0.md`
- current late-career unlock contract;
- current School/Night/Activity/ending framework.

Preserve existing Tavern ending IDs/reward identifiers:
- `tavern-stay`
- `tavern-guild`
- `tavern-court`
- `ending.tavern.hard-work`
Do not invent replacement ending IDs merely to match the draft.

### C1D-121 — publish Tavern runtime contract
Publish one stable Tavern runtime contract for Chat 2/3/5:
- stages;
- milestone/reaction event IDs;
- relationship role IDs;
- Night IDs;
- School hook IDs/facts;
- item/capability IDs;
- Activity-return IDs;
- crisis/outcome facts;
- mapping from career outcomes to existing Tavern ending IDs.
No new proper NPC names required.

### C1D-122 — full typed progression
Implement:
T0 new-hand -> T1 trusted-worker -> T2 house-node -> late branches:
- veteran-service;
- innkeeper;
- information-broker;
- sanctuary;
then outcome-ready.
At least six meaningful milestones. Already-satisfied external gates must react without a dummy extra shift.

### C1D-123 — repeatable shift depth
Bring Tavern to 8–16 real shift variants across hall, rooms, supply, travelers, conflict, orders, deliveries and rumours.
Season must alter live visitor/supply/room context, not only media text.
Preserve 1 Energy shift cost and current wage tuning unless an existing authority changes it.

### C1D-124 — major relationship/confidentiality chain
Implement one role-based recurring-traveler or house-manager chain:
work -> free reaction -> optional Night/request -> confidentiality choice -> career reaction.
Refusal must preserve career progression.

### C1D-125 — information as typed route state
Implement one real rumour/information fact flow that is produced by Tavern work/relationship and consumed by another live action/route or by Tavern outcome progression.
No global “information currency” system.

### C1D-126 — housing/poverty hook
Tavern must interact with existing normal/cheap/street state without deleting the housing economy.
Implement a narrow, typed Tavern assistance/temporary-lodging or meal-in-kind hook using existing housing/poverty primitives. No final rent/wage tuning and no Secret Debt implementation.

### C1D-127 — School hooks
Use existing School tracks only.
Lead-approved Tavern-local minor thresholds:
- 3 Literacy & Numbers lessons -> Innkeeper/records hook;
- 3 Rhetoric & Social lessons -> Broker/conflict hook;
- 3 Etiquette & Presentation lessons -> high-status guest hook;
- 3 Arcana lessons -> strange-rumour/guest interpretation hook.
These are Tavern-local triggers, not global certificate rules.

### C1D-128 — item/access hook
Implement a real staff-access item/capability using the draft identity `access_guest_rooms_staff` (or exact current equivalent if already defined), plus one guest-ledger/evidence route fact.
Do not build a generic lock/key subsystem.

### C1D-129 — Activity return hook
Consume an already-live Forest/Activity result/fact to trigger a Tavern traveler/rumour/room event with 0 extra daytime Energy.
Do not fork Activity runtime.

### C1D-130 — late career crisis/outcome mapping
Implement one supply/occupancy/confidentiality crisis with at least three systemic solution families feeding:
- Innkeeper;
- Information Broker;
- Sanctuary.
Map those naturally onto existing Tavern ending eligibility without silently rewriting old reward IDs.

### C1D-131 — natural acceptance
From a clean run with no direct stage injection:
- unlock Tavern through real stat gate or Year-2 fallback;
- work real shifts across seasons;
- relationship/confidentiality chain;
- School hook;
- item/access hook;
- Activity return;
- crisis;
- natural 50-shift Hard Work;
- at least two non-Hard-Work Tavern endings eligible through distinct system paths where current ending semantics allow;
- save/reload mid-chain;
- explicit commit/completion;
- New Run persistence.

### C1D-132 — candidate freeze
Transplant/rebase onto then-current main.
Full exact-head repository CI green.
Freeze one focused PR for Chat 4.

Do not implement Hunter/Guard/Merchant career state in this queue.