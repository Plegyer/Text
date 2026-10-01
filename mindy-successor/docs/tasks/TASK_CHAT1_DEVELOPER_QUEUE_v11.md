# Chat 1 Developer Queue v11 — Undead Farm Complete Career Runtime

Status: **ACTIVE / START ON NEW STACKED BRANCH**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-109..120
Base: frozen Satyr candidate PR #164 exact head `de27bb5ac70edb7238657fcb51c1f201a1b1908e`

Do not move PR #164. Create a new branch, e.g. `chat1/undead-farm-complete-v11`.

Goal: turn Undead Farm from the third starter shell into the third complete career slice, without inventing unresolved lore/proper names or global School policy.

### C1D-109 — publish Undead Farm runtime contract
Publish stable gameplay IDs for stages, milestone/reaction events, role-level relationship identity, School hook facts, item/capability hooks, crisis states and complex ending IDs.
Use `CAREER_UNDEAD_FARM_DRAFT_v0.md` as design authority.
No proper NPC name is required.

### C1D-110 — full typed career progression
Implement F0 New Hand -> F1 Reliable Helper -> F2 Keeper of the Process -> late branches -> F4 Outcome-ready.
At least six meaningful milestones. External gates already satisfied must react through Resolver without a dummy extra shift.

### C1D-111 — seasonal repeatable work depth
Bring Undead Farm to 8–16 real shift variants across Spring/Summer/Autumn/Winter.
Season must affect live task/resource/hazard selection, not only text/media.
Preserve 1 Energy per normal shift and existing wage contracts unless an authoritative current rule says otherwise.

### C1D-112 — meaningful production resources
Add a minimal typed production-resource loop that creates resources with concrete uses rather than inventory clutter.
Use neutral implementation identities where lore is open.
At least one ordinary product, one unstable/specimen result and one delivery/research input must be consumed by another live action or condition.

### C1D-113 — major professional relationship
Implement one role-based Farm relationship chain with professional trust/conflict and a non-romance path.
Work -> free reactive scene -> optional Night/external request -> work/career reaction.
Refusal must preserve the career.

### C1D-114 — School research hook
Lead-approved local minor trigger for this career: **3 completed lessons in a relevant existing Arcana/Reason-oriented School track**.
This is not a global certificate rule.
Satisfying it may unlock a Farm research continuation immediately through Resolver at 0 extra daytime Energy.

### C1D-115 — item/capability sample path
Wire a real sample route using approved item capabilities from the item catalog / Forest work where available:
- `preserve_specimen`;
- `contain_spirit_sample` only if the existing catalog/runtime defines it or it can be added without unresolved lore.
Do not invent a global crafting system.

### C1D-116 — Activity return hook
Consume a typed Forest/Activity result or preserved specimen in Farm progression.
If the current accepted Forest v12 contract provides an exact result identity, use it. Otherwise publish one narrow compatibility seam and document the dependency; do not fork Activity runtime.

### C1D-117 — production crisis and route split
Implement one supply/labor/containment crisis with at least two systemic solution families leading toward Research / Successor / Veteran or external-anomaly readiness.
No universal morality stat.

### C1D-118 — complex endings
Implement at least:
- `ending.undead-farm.research-farmer`;
- `ending.undead-farm.successor`.
Keep eligibility non-terminal and explicit commit/completion separate.
Do not invent a new permanent Meta reward where the authoritative reward is still OPEN; ending completion may ship without a new extra Meta modifier beyond already-authorized Hard Work.

### C1D-119 — coexistence + natural acceptance
From a clean run with no direct career-stage injection:
- real Farm shifts across multiple seasons;
- production resource;
- relationship choice;
- School research hook;
- item/sample path;
- crisis;
- natural 50-shift Hard Work;
- at least one complex ending;
- save/reload mid-chain;
- multiple eligible endings where conditions overlap;
- explicit commit/completion and New Run persistence.

### C1D-120 — candidate freeze
Transplant/rebase onto then-current main without replaying stale predecessor history.
Require exact-head full repository CI green, open/finalize one focused PR, freeze for Chat 4.

Do not implement Secret Debt, Palace career content or presentation/media ownership in this queue.
