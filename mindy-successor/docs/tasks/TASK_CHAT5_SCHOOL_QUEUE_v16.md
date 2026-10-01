# Chat 5 School Queue v16 — Guard School Cross-System Slice

Status: **ACTIVE IN PARALLEL WITH GUARD RUNTIME v14**
Owner: Chat 5 / School + Text Localization Worker
Queue: C5-169..180
Target: **Guard School Cross-System Slice**

Predecessor:
- Hunter School PR #199
- frozen exact head `f04c93db866b1d2603f6917b41297670f86b0bef`
- exact-head CI #745 / id `36846888973`: SUCCESS
- C4-151: PASS-WITH-NOTES
- do not move it.

Runtime authority in progress:
- Chat 1 branch `chat1/guard-complete-v14`
- queue `TASK_CHAT1_DEVELOPER_QUEUE_v14.md`
- C1D-145 must publish the Guard runtime contract first.
- Until that contract exists, Guard gameplay event IDs, career fact IDs and School thresholds are **not authorized**.

Existing School preparation authority:
- `content/school-guard-preparation-v1.fixture.json`
- `content/school-guard-merchant-reactive-depth-v1.fixture.json`
- exactly five current tracks:
  - `school.track.literacy_and_numbers` — reports/evidence notes;
  - `school.track.rhetoric_and_social` — de-escalation/questioning;
  - `school.track.etiquette_and_presentation` — high-status/formal cases;
  - `school.track.physical_training` — dangerous-duty preparation;
  - `school.track.arcana` — anomaly observation.

Global boundaries:
- reuse current School courses, teachers, media and Night-study choices;
- no new curriculum/course/teacher;
- no Morality stat;
- no generic combat/use-of-force subsystem;
- no corruption currency;
- no global School certificate/project rule;
- no shared Save/RNG/NightFlow/Activity architecture rewrite;
- no public Guard ending/reward identity;
- no invented Guard-local numeric School threshold.
- If C1D-145 keeps a threshold `null`, Chat 5 must keep it `null`.

### C5-169 — exact Guard School live inventory
Audit current production School surfaces against the five prepared Guard tracks.

Record exact:
- course IDs;
- track IDs;
- teacher IDs/media;
- current Night-study choice IDs;
- existing source fixtures;
- current production Guard-School consumers, if any.

Mark every missing gameplay event/fact/threshold as blocked pending C1D-145. Do not create placeholders that look like live IDs.

### C5-170 — Literacy & Numbers producer
Prepare RU/EN School-side content for:
- factual reports;
- evidence notes;
- sequence/time/place clarity;
- separating observation from inference.

No evidence economy, legal authority, crime model or career advancement.

### C5-171 — Rhetoric & Social producer
Prepare RU/EN School-side content for:
- de-escalation;
- questioning;
- restating facts;
- keeping a dispute answerable without escalation.

No interrogation subsystem, coercion meter or morality scoring.

### C5-172 — Etiquette & Presentation producer
Prepare RU/EN School-side content for:
- formal/high-status cases;
- respectful explanation of restrictions;
- courtesy without favoritism.

No Palace access invention, class reputation stat or special immunity.

### C5-173 — Physical Training producer
Prepare RU/EN School-side content for:
- controlled effort;
- stopping/changing direction;
- balance and safe duty preparation.

No injury system, weapon system, combat engine or use-of-force mechanic.

### C5-174 — Arcana producer
Prepare RU/EN School-side content for:
- anomaly observation;
- preserving unusual traces;
- documenting boundaries/changes/unknowns.

Do not invent a fixed magical crime, creature, faction or final lore.

### C5-175 — immediate Resolver authority
After C1D-145/C1D-152 publishes exact Guard School consumers:
- bind only exact authorized event/fact IDs;
- prove the qualifying School-side producer can trigger the Guard reaction immediately without a dummy `guard.shift`;
- reaction consumes no extra daytime Energy unless the authoritative producer itself does.

If the runtime publishes no live consumer for a track, leave that track fact-only/blocked. Do not invent an event.

### C5-176 — Night-study parity authority
Use only existing typed Night-study choices.

If Guard authority publishes a valid Night-study-compatible condition, prove parity and exactly-once behavior.
If authority keeps numeric thresholds `null` or the live condition cannot be produced by Night-study, record explicit negative parity and do not manufacture a threshold/fact.

### C5-177 — teacher continuity
Reuse exactly the current teacher roster for the five mapped courses:
- Mara Fen;
- Cassian Reed;
- Eliane Marrow;
- Tovan Kest;
- Ilyra Venn.

No Guard-only teacher or duplicate media identity.

### C5-178 — RU/EN result, journal and accessibility
For every authorized live Guard School consumer:
- complete RU/EN event/result/journal/accessibility strings;
- keep locale presentation-only;
- reuse existing teacher media;
- preserve exact gameplay identity across locale and reload.

Prepared fact-only tracks may keep source-local RU/EN copy without publishing fake live event localization.

### C5-179 — persistence and global-policy firewall
Regressions must prove:
- exactly-once authorized reactions;
- pending event survives save/reload;
- locale switch does not mutate save;
- no global School certificate/project publication;
- no Morality/corruption state;
- no new curriculum;
- no direct Guard career advancement from School source fixtures;
- all unauthorized numeric thresholds remain `null`.

### C5-180 — natural acceptance, full gate and freeze
Only after Chat 1 freezes Guard runtime:
1. rebuild this same Guard School branch on the exact frozen Guard dependency head;
2. transplant only focused Chat 5-owned delta;
3. run a natural clean path through the authorized School -> Guard seam(s);
4. run full repository exact-head CI;
5. freeze one focused PR for Chat 4 QA.

Record:
- frozen Guard dependency head and CI;
- exact Chat 5 head;
- exact workflow run/id;
- focused file delta;
- explicit list of live consumers vs fact-only blocked tracks.

Do not move the frozen head except for a concrete QA/required-CI blocker or explicit Lead request.
