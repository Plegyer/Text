# Chat 1 Developer Queue v14 — Guard Complete Career Runtime

Status: **ACTIVE AFTER HUNTER v13 FREEZE**
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-145..156
Target: **Guard Complete Career Runtime**

Predecessor:
- Hunter runtime PR #201
- frozen exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`
- exact-head CI #734 / id `36844983432`: SUCCESS
- do not move it.

Working branch:
- `chat1/guard-complete-v14`
- created from current main `159669efb93448a476b298025c4fb972d6079024`

Integration order:
- Guard work may proceed in parallel, but Guard must not bypass Tavern/Hunter QA/integration ordering.
- Do not import stale whole Hunter/Tavern branch history into this branch.

Existing compatibility identities that must remain stable:
- career/action: `guard` / `guard.shift`
- ordinary shift cost: 1 Energy
- existing unlock: Strength 30 + Endurance 30 + Manners 20 OR Year 2
- existing Hard Work ending: `ending.guard.hard-work`
- existing Hard Work reward: `guard.hardwork.compat`
- existing Meta reward: `hardWork:guard`

Design authority:
- `../CAREER_GUARD_DRAFT_v0.md`
- School prep: `content/school-guard-preparation-v1.fixture.json`
- Guard/Merchant reactive prep: `content/school-guard-merchant-reactive-depth-v1.fixture.json`

Global invariants:
- no new Morality stat;
- no generic combat/use-of-force subsystem;
- no new corruption currency;
- no shared Save/RNG/NightFlow/Activity architecture rewrite;
- no global minor-event framework rewrite;
- no public complex Guard ending/reward ID unless existing or explicitly Lead-approved;
- Secret Debt ordinary-career lock semantics remain global/shared and must be preserved.

### C1D-145 — publish Guard runtime contract first
Create the authoritative Guard runtime contract before implementing consumers.

It must define exact typed IDs for:
- career stages/transitions/counters/facts;
- relationship identity/stages/choices/facts;
- item/access/evidence identities that are actually implemented;
- city/crisis/cross-system event identities;
- School hook fact identities;
- route/readiness facts.

Contract rules:
- preserve `guard.shift` and `ending.guard.hard-work`;
- complex Officer/Reform/Network/Major Case outcomes may be typed stages/facts without public ending IDs;
- School numeric thresholds stay `null` unless an existing or explicit Lead authority supplies one;
- do not define a fixed crime, faction system, or universal law model.

### C1D-146 — ordinary Guard work and seasons
Bind the existing `guard.shift` into the typed Guard career.

Preserve:
- 1 Energy;
- current wage formula;
- current Year-2/stat unlock;
- Spring/Summer/Autumn/Winter work presentation IDs.

Add only Guard-local typed counters/facts needed for progression and seasonal/duty breadth.
Do not turn every shift into a blocking crisis.

### C1D-147 — career state machine
Implement the complete typed Guard progression from recruit through trusted/senior and late route readiness.

Required distinct late route families:
- Veteran / Hard Work;
- Officer;
- Reform / Order;
- Network / Corruption;
- Major Case.

Rules:
- several routes may become eligible in one run;
- route eligibility and ending commitment stay separate;
- Reform vs Network must be concrete choices/facts, never a morality meter.

### C1D-148 — city duty / minor-event integration
Use existing daily/minor-event machinery through Guard-local consumers.

Cover professional Guard versions of representative:
- patrol/dispute;
- crowd/festival or market pressure;
- suspicious cargo/pass;
- poverty/lodging response.

Do not replace the global minor-event framework.
Do not copy the draft crisis list literally if no live identity supports it.

### C1D-149 — Poverty and Secret Debt compatibility
Prove Guard interacts with poverty choices through typed facts/choices without creating a moral score.

Preserve:
- active Secret Debt ordinary-career lock;
- existing poverty/debt ownership;
- no Guard bypass that grants immunity or silently clears debt.

Any Debt Ledger / evidence hook must consume an existing identity or be explicitly Guard-local and documented in C1D-145.

### C1D-150 — recurring Guard relationship
Implement one complete typed recurring professional relationship using an existing draft archetype such as partner/superior/informant.

Requirements:
- professional trust;
- conflict;
- refusal path that preserves ordinary Guard progression;
- optional later cooperation/companion/informant utility;
- no mandatory romance.

### C1D-151 — access/items/evidence
Implement only concrete Guard-local capabilities justified by the contract, such as:
- official Guard access/badge;
- sealed/legal pass;
- evidence/ledger handling.

Rules:
- items change access/options, not global law;
- no generic weapon system;
- no unconditional immunity.

### C1D-152 — School hook authority
Map exactly the five already-prepared live School tracks:
- `school.track.literacy_and_numbers` — reports/evidence;
- `school.track.rhetoric_and_social` — de-escalation/questioning;
- `school.track.etiquette_and_presentation` — high-status/formal cases;
- `school.track.physical_training` — dangerous-duty preparation;
- `school.track.arcana` — anomaly observation.

Publish exact Guard career facts in C1D-145.
Keep all numeric School thresholds `null` unless existing/Lead-approved authority supplies them.
Do not invent a new School course or global certificate rule.

### C1D-153 — cross-system seams
Bind Guard only to exact live identities that already exist or are explicitly Guard-owned.

Priority seams:
- Tavern witness/ledger/information;
- Merchant cargo/licensing;
- poverty/debt evidence;
- Palace/high-status access if a live identity exists.

Assassin/Prostitute hooks remain contract-ready only until their runtime identities exist; do not fabricate future-career facts.

### C1D-154 — late routes and Major Case
Build route-readiness logic for Officer/Reform/Network/Major Case from concrete typed evidence/choices.

Major Case rules:
- multi-system preparation, not shift-count-only;
- no fixed crime/boss/faction authored here;
- no hidden morality variable;
- route may become ready without forcing commitment.

### C1D-155 — persistence, Hard Work and natural acceptance
Required regressions:
- exactly-once blocking reactions;
- save/reload at a pending Guard scene;
- refusal-safe relationship progression;
- 50-shift `ending.guard.hard-work`;
- ordinary Guard work remains available independent of Major Case;
- natural clean run from real unlock to at least one advanced route readiness;
- no Meta mutation before ending completion;
- New Life preserves only authorized Meta rewards.

### C1D-156 — full gate and freeze
Run full exact-head repository CI.
Freeze one focused Guard runtime PR for Chat 4 QA.

Record:
- exact head SHA;
- exact workflow run/id;
- frozen base/main observed;
- focused file delta.

After freeze, do not move the head except for a concrete QA/required-CI blocker or explicit Lead request.
