# Chat 5 School Queue v13 — Undead Farm School Cross-System Slice

Status: **PREASSIGNED / START AFTER SATYR SCHOOL v12 FREEZE**
Owner: Chat 5 / School + Text Localization Worker
Queue: C5-133..144
Authoritative runtime contract: `UNDEAD_FARM_RUNTIME_CONTRACT_v1.json` from Chat 1 v11 branch.

Do not invent global School certificate/project rules and do not change shared runtime.

### C5-133 — exact contract audit
Bind only to the published Undead Farm School identities:
- Arcana local hook -> `undead-farm.school.arcana-research`;
- Literacy & Numbers local hook -> `undead-farm.school.management-records`.
Both use the career-local threshold of **3 completed lessons**.

### C5-134 — Arcana research producer
Author production School-side content so 3 completed Arcana lessons can produce the exact typed progress/fact required by the Farm research hook.

### C5-135 — Literacy/Numbers management producer
Author the corresponding production School-side content for the Farm management-records hook.

### C5-136 — immediate Resolver parity
When the third qualifying paid lesson satisfies a Farm hook, the exact Farm reaction must be able to appear immediately without another work shift and without extra daytime Energy.

### C5-137 — Night-study parity
If existing Night-study can advance the same live typed track progress, reaching the same local threshold must produce the same Farm hook semantics. Do not create a second School progression model.

### C5-138 — teacher continuity
Use existing School teacher identities and current course ownership. Do not add a Farm-only teacher unless current School authority already defines one.

### C5-139 — research/sample copy
Add RU/EN School result/journal copy that acknowledges preserved-specimen/research context only through existing exact facts. Do not create item mechanics.

### C5-140 — management/career copy
Add RU/EN result/journal copy for management-record application to Farm work without advancing the career machine directly from School content.

### C5-141 — exactly-once + save/reload
Prove each local hook fires once per intended state transition and survives save/reload without locale-dependent gameplay drift.

### C5-142 — global-threshold firewall
Regression: the career-local 3-lesson thresholds must not become global School certificate/project/milestone policy for unrelated careers.

### C5-143 — natural acceptance
From a clean run, reach both qualifying School hooks through real lessons; prove immediate Resolver reaction, RU/EN parity, and no extra shift requirement.

### C5-144 — candidate freeze
Full exact-head repository CI green. Freeze one focused candidate for Chat 4.

Ownership: School content/localization only. No shared runtime, Save/RNG, NightFlow architecture, career stages, ending logic or global curriculum economy.
