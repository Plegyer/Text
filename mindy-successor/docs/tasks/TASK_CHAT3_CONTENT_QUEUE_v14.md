# Chat 3 Content Queue v14 — Ordinary Poverty Production Closure

Status: **ACTIVE AFTER FOREST v13 FREEZE**
Owner: Chat 3 / Forest + Poverty Content Worker
Queue: C3-145..156

Authority:
- `ECONOMY_AND_POVERTY_DRAFT_v0.md`
- `poverty-prep/ORDINARY_POVERTY_IMPLEMENTATION_READINESS_v1.md`
- current production NightFlow/lodging behavior.

Do not lock any OPEN economy numbers. Do not implement Secret Debt.

### C3-145 — current live poverty inventory
Count only player-reachable production events in normal/cheap/street paths. Separate live packs from prep fixtures and identify thin live contexts.

### C3-146 — distinct housing-context feedback
Ensure normal, cheap and street nights have clearly distinct player-facing consequences/options using existing runtime state. No price or penalty tuning.

### C3-147 — street breadth
Expand the ordinary street pool with live helpful / neutral / pressure variants across existing seasonal contexts. Preserve free resolution and anti-softlock behavior.

### C3-148 — cheap-lodging breadth
Expand live cheap-lodging variants around noise/privacy/shared-space/seasonal context without inventing a new global penalty.

### C3-149 — recovery feedback
Make existing recovery paths visible in live content:
- starter-job recovery remains usable;
- existing coin-help / short-cleanup / herb assistance events;
- no mandatory helper NPC.

### C3-150 — resource/item acknowledgement
Where current inventory facts already exist, add poverty-side acknowledgement/useful choice text without introducing a sale/shop/barter system that Product has not accepted.

### C3-151 — relationship/public-state hook
Add at least one optional ordinary-poverty variant that can acknowledge an already-public relationship/help fact if one exists in current main. If no stable public fact exists, record the exact blocker for Chat 1; do not invent a private counter contract or canonical rescuer NPC.

### C3-152 — Work/School tension feedback
Use existing money/Energy outcomes to make poverty pressure after School spending and recovery through work legible to the player. Do not change tuition/wages/rent.

### C3-153 — zero-money anti-softlock regression
From a clean zero-money street path, prove:
- next day remains reachable;
- at least one starter job remains executable;
- ordinary poverty can recover without Secret Debt;
- repeated pressure cannot create an unavoidable terminal spiral under current structural rules.

### C3-154 — save/reload exactly-once
Verify lodging payment, next-day modifiers, ordinary poverty pending events and event history do not double-apply or reroll across save/reload.

### C3-155 — Secret Debt firewall
Regression must prove ordinary poverty packs contain no lender/debt/Slave/bound-career/forced-debt-Night state and remain functional if Secret Debt never exists.

### C3-156 — candidate freeze
Full exact-head repository CI green. Freeze one focused production-content candidate for Chat 4.

Non-goals:
- no Secret Debt implementation;
- no final prices/wages/tuition/penalty numbers;
- no poverty ending;
- no new shop/sale system;
- no shared runtime rewrite.
