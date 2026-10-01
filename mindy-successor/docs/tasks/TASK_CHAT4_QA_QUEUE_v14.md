# Chat 4 QA Queue v14 — Accepted Integration Wave + Undead/Poverty Wave

Status: **ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-138..149

Previous v13:
- C4-135 PASS current-main truth;
- C4-136 PASS-WITH-NOTES for #174, #175, #172;
- C4-137 remains the final current-main truth refresh after Lead integrates those accepted candidates.

Do not idle while Lead performs those integrations.

### C4-138 — gate PR #178 Undead runtime
Frozen head `b75e73c0f5e37b19277cb25cf0321587f6444ab4`, CI #616 SUCCESS.
Verify complete Undead career, explicit no-Meta complex endings, natural Forest route usage, natural 50 shifts, save/reload and strict typed transition behavior.

### C4-139 — gate PR #180 ordinary poverty v14
Frozen head `4ba5d50b50d8d263e998d13de4126de3119090f2`, CI #624 SUCCESS.
Verify live normal/cheap/street breadth, zero-money anti-softlock, save/reload exactly-once and Secret Debt firewall. No hidden balance lock.

### C4-140 — gate PR #181 Undead School
Frozen head `47ce1b83e7ef30a18462833c95df25af4d1e7190`, CI #623 SUCCESS.
Dependency: frozen #178 runtime.
Verify local 3-lesson hooks, immediate Resolver behavior, Night-study parity, save/reload, global-threshold firewall.

### C4-141 — gate PR #182 Undead presentation
Frozen head `703cabefff9cbf9f681089d1c0f0c1ae70880c2c`, CI #626 SUCCESS.
Dependency: frozen #178 runtime.
Verify production reachability, static fallbacks, animation-off/missing-GIF safety, RU/EN/accessibility, no gameplay drift.

### C4-142 — integration collision order
After verdicts, record exact integration order and shared-file collisions against current main. Do not implement fixes.

### C4-143 — post-accepted-old-wave main gate
After Lead integrates #174/#175/#172, perform C4-137-equivalent current-main truth and close v13.

### C4-144 — post-Undead runtime main gate
After accepted #178 integration, verify exact main and Undead natural acceptance.

### C4-145 — post-poverty main gate
After accepted #180 integration, verify ordinary poverty/anti-softlock truth.

### C4-146 — post-Undead School/presentation main gate
After accepted #181/#182 integrations, verify combined Undead runtime + School + presentation.

### C4-147 — next Tavern runtime gate
Gate Chat 1 C1D-132 only on frozen exact-head green candidate.

### C4-148 — next Tavern content/presentation/School gates
Gate eligible frozen green Chat 2/3/5 Tavern candidates; do not wait on a blocked sibling.

### C4-149 — durable closeout
Refresh executable acceptance truth on current main and identify the next incomplete ordinary career.

QA only; never implement producer fixes.