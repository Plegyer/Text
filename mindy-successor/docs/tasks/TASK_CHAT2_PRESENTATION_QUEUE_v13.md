# Chat 2 Presentation Queue v13 — Undead Farm Complete Career Presentation

Status: **PREASSIGNED / START AFTER SATYR v12 FREEZE**
Owner: Chat 2 / Presentation & Media Worker
Queue: C2-133..144
Authoritative runtime contract: `UNDEAD_FARM_RUNTIME_CONTRACT_v1.json` from Chat 1 v11 branch.

Do not invent mechanics or proper NPC names. Presentation must consume the exact gameplay identities published by Chat 1.

### C2-133 — runtime identity inventory
Read the current Undead Farm runtime contract and enumerate every live career stage, milestone event, relationship event, Night choice, School hook, Activity return, crisis, resource/item result and ending presentation identity.

### C2-134 — seasonal shift surfaces
Provide stable static fallbacks for Undead Farm Spring/Summer/Autumn/Winter work plus any safe motion-pool bindings already supported by the presentation system.
No gameplay changes.

### C2-135 — career-stage surfaces
Cover all published stages:
new-hand, reliable-helper, keeper-of-process, veteran, research, successor, external-anomaly, outcome-ready.

### C2-136 — production/resource feedback
Add presentation for ordinary produce, unstable specimen, preserved specimen and delivery input results using project-owned static fallbacks and accessibility text.

### C2-137 — Farm Keeper relationship/Night
Cover role-based keeper intro, professional trust, voluntary Night request, accepted/refused request and return-to-work consequences.
Keep the role generic; no new proper name.

### C2-138 — School hook presentation
Cover exact live events:
- `undead-farm.school.arcana-research`
- `undead-farm.school.management-records`
and preserve the exact production presentation IDs from runtime.

### C2-139 — Forest Activity return
Cover `undead-farm.activity.forest-return` and the preserved-sample/external-anomaly feedback seam.

### C2-140 — crisis presentation
Cover `undead-farm.crisis.supply-labor-containment` and all three existing systemic resolution families without implying mechanics not present in the event effects.

### C2-141 — endings
Provide distinct stable static presentation for:
- `ending.undead-farm.hard-work`;
- `ending.undead-farm.research-farmer`;
- `ending.undead-farm.successor`.

### C2-142 — RU/EN + accessibility parity
All new static/motion candidates need stable alt identities and RU/EN source coverage where the presentation registry/localization system expects it.

### C2-143 — production reachability
From the real catalog/runtime, prove every published Undead presentation ID resolves from a player-reachable production identity. Include animation-off and missing-GIF fallback safety.

### C2-144 — candidate freeze
Full exact-head repository CI green. Freeze one focused candidate for Chat 4. Do not move it after QA starts.

Ownership: presentation/media/accessibility only. No career state, School mechanics, Save/RNG, NightFlow, ending eligibility/rewards or Activity mechanics.
