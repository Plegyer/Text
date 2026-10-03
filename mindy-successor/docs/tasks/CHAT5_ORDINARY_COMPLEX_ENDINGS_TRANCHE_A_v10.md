# Chat 5 — Ordinary Complex Endings Tranche A v10

Status: **PRODUCT DECISION PACKET — no production runtime/UI/content changes**
Owner: Chat 5
Research baseline: `main@24dbe470022d9bcfd92100861f931026e18f5dad`
Machine-readable companion:
`mindy-successor/research/ordinary_complex_endings_tranche_a_v1.csv`

Scope is **exactly 14 advanced ordinary-career endings**:

- Lumber: Forewoman, Forest Compact;
- Satyr Maid: House Power, Favourite / Partner / Personal Network, Boundary Mastery;
- Undead Farm: Research Farmer, Farm Successor, External Anomaly;
- Tavern: Innkeeper, Information Broker, Sanctuary;
- Hunter: Master Hunter, Warden, Legend.

Ordinary Hard Work endings are explicitly out of scope and unchanged.

---

# 1. Authority preserved

This packet does not reinterpret or weaken:

- **D16** — eligibility is non-terminal; explicit ending commit remains mandatory;
- **D27/D28** — 0..1 Keystone, 0..2 Specialists, automatic knowledge/content outside slots;
- **D33** — canonical Lumber management readiness comes from Literacy & Numbers with exactly 3 paid lessons OR 3 Night Study sessions;
- **D34** — Lumber stages and 1/8/20 milestones; Forewoman/Forest cannot be eligible before trusted-worker / 8 shifts; Hard Work remains 50;
- **D35** — normal lodging private-space capability; cheap/street are not globally relationship-blocked;
- **D36** — four-region Activity, entry 2 Energy, Field Time 6, ordinary-career Activity leg <=3 entries after prep where practical;
- **D37** — professional + personal Night completeness bar; Night content does not become mandatory merely to satisfy coverage;
- **D38** — three standalone Activity endings/rewards remain separate from Hunter and other ordinary-career endings.

No reward in this packet:
- grants unconditional +1 daily Energy;
- grants No Rent;
- grants generic large starting cash;
- grants extra calendar time;
- grants broad stat carry-over;
- grants free Specialist slots;
- bypasses Palace D23;
- bypasses Secret Debt;
- changes ordinary Hard Work.

---

# 2. Proposed gating rule for Tranche A

## Direct stat thresholds: none

For all 14 endings, the proposed direct raw-stat threshold is:

**NONE**.

Reason:
these routes already test competence through richer typed achievements:
- career stage / shifts;
- School repetition;
- relationship state and explicit choices;
- Activity results;
- item capabilities;
- route facts/counters.

Adding a second raw stat gate would duplicate the same build pressure and make the route harder to read without adding a distinct playstyle.

This does **not** mean stats stop mattering:
they still influence work, School, Activity, economy and the actions needed to reach the typed route facts.

## Shift bands

The proposal uses these exact minimums:

- Lumber complex endings: **8 shifts** — already locked by D34;
- Satyr Maid complex endings: **15 shifts** — veteran-service;
- Undead Farm complex endings: **15 shifts** — keeper-of-process must already be reached at 8;
- Tavern complex endings: **15 shifts** — house-node must already be reached at 8;
- Hunter complex endings: **8 shifts** — recognized-hunter, with route-specific requirements providing the real later pacing.

Hunter deliberately does not receive an arbitrary 15/20-shift floor:
Master Hunter and Legend already require multiple seasons/Activity successes, while Warden is the non-Activity relationship/world-knowledge alternative.

---

# 3. Reward architecture

This tranche proposes **no new Keystone**.

Rewards are either:

### Specialist
A narrow mechanical exception or access modifier selected under D28's existing 0..2 capacity.

Specialist ownership is permanent; its per-run charge/cap resets on each New Start+ life.

### Automatic knowledge/content
Always available after permanent completion and consumes no Specialist slot.

These rewards:
- expose information or authored alternatives;
- do not grant generic resources;
- do not set ending-ready facts automatically;
- do not bypass Palace/Secret Debt.

Specialists proposed in this tranche:

- `specialist.lumber.forewoman-ledger`;
- `specialist.lumber.forest-compact-route`;
- `specialist.satyr-maid.house-ledger`;
- `specialist.satyr-maid.guest-network`;
- `specialist.undead-farm.field-preservation`;
- `specialist.undead-farm.supplier-account`;
- `specialist.tavern.house-ledger`;
- `specialist.tavern.safehouse-network`;
- `specialist.hunter.master-kit`.

Automatic knowledge/content rewards:

- `satyr-maid.clear-terms`;
- `knowledge.undead-farm.anomaly-catalog`;
- `knowledge.tavern.broker-index`;
- `knowledge.hunter.warden-signs`;
- `knowledge.hunter.legend-contracts`.

---

# 4. Exact ending contracts

## Lumber / Лесорубы

### Forewoman

- **Stable ending ID:** `ending.lumber.forewoman` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** trusted-worker reached; **8 shifts**.
- **Exact route facts/counters:** management-school-ready; forewoman-problem-resolved; relationship lumber.foreman stage route-professional.
- **School:** MANDATORY: Literacy & Numbers track: lessons_completed>=3 OR night_study_sessions>=3; canonical publisher lumber.school.management-ready per D33.
- **Night / relationship:** MANDATORY relationship: lumber.foreman route-professional; Night is OPTIONAL.
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Foreman professional Night follow-up; Activity; private-space content.
- **D16 boundary:** D16: eligibility only after all gates; explicit commitEnding then completeEnding; no auto-end.
- **Current-life resolution:** Take operational leadership of the Lumber crew/plot; management outcome, not Hard Work.
- **Permanent reward:** `specialist.lumber.forewoman-ledger`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected in New Start+, after Lumber has reached trusted-worker and lumber.foreman is route-professional, unlock exactly one Forewoman Ledger preparation per run. It satisfies the Forewoman School-competence leg through a specialist-only route token, but does not increment School counters, publish lumber.school.management-ready, or resolve forewoman-problem-resolved. The production-crisis resolution remains mandatory..
- **Exact reward numbers:** 1 use/run; active Specialists still 0..2 total; no money/Energy/stat grant.
- **Migration / legacy cleanup:** Keep ending ID. Existing completed ending with metaRewards:[] receives specialist ownership once on migration. Do NOT map legacy lumber-stay/vitality to Forewoman..
- **Implementation status:** Ending executable on main, but D34 trusted-worker gate/stages are not fully current-main integrated; reward not implemented.
- **OPEN после Product lock:** Final lore title/epilogue/presentation copy only; Product decision on this proposal.

### Forest Compact

- **Stable ending ID:** `ending.lumber.forest` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** trusted-worker reached; **8 shifts**.
- **Exact route facts/counters:** forest-specimen-catalogued; forest-truth-known; forest-problem-resolved.
- **School:** None mandatory.
- **Night / relationship:** None mandatory; Foreman/social Night optional.
- **Activity / item:** MANDATORY: 1 successful qualifying Forest Frontier/Lumber Forest Activity result AND 1 preserved forest specimen consumed/validated by the return chain.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School Arcana; Hunter/Tavern clues; extra relationship context.
- **D16 boundary:** D16 explicit ending commit after eligibility.
- **Current-life resolution:** Resolve the forest-production conflict through a compact/management choice and establish a durable Lumber–forest settlement.
- **Permanent reward:** `specialist.lumber.forest-compact-route`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, after Forest Frontier is normally unlocked, one authored forest-compact lateral route becomes available during one Activity entry per run. It grants no region unlock, no automatic result/fact, no entry-Energy discount and no Field Time discount..
- **Exact reward numbers:** max 1 lateral-route use/run; Activity entry remains 2 Energy; Field Time remains 6.
- **Migration / legacy cleanup:** Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration. No interaction with lumber-stay/vitality..
- **Implementation status:** Ending executable on main; D34 minimum-stage gate not yet in ending condition; reward not implemented.
- **OPEN после Product lock:** Exact lore wording of compact choice and presentation assets.

---

## Satyr Maid

### House Power

- **Stable ending ID:** `ending.satyr-maid.house-power` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** veteran-service reached; **15 shifts**.
- **Exact route facts/counters:** crisis-house-power; house-power-ready; crisis-resolved.
- **School:** MANDATORY one track: (Literacy & Numbers lessons_completed>=3 OR night_study_sessions>=3) OR (Rhetoric & Social lessons_completed>=3 OR night_study_sessions>=3), producing school-management-ready OR school-rhetoric-ready.
- **Night / relationship:** None mandatory.
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Recurring Guest relationship; staff debrief Night; D35 private-space branch.
- **D16 boundary:** D16 explicit commit; route readiness does not end run.
- **Current-life resolution:** Become management/co-owner-level authority in the house and set operating terms.
- **Permanent reward:** `specialist.satyr-maid.house-ledger`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, after Satyr Maid reaches house-regular (8 shifts), once per run choose Management or Rhetoric as a House-Power-only competence substitute. It creates a specialist-only readiness token for House Power; it does not add School counters/facts and does not resolve the crisis..
- **Exact reward numbers:** 1 competence substitution/run; earliest activation after 8 Satyr Maid shifts.
- **Migration / legacy cleanup:** Replace legacy satyr-maid.house-credit +600 starting-money behavior. Existing owners/completed House Power migrate to specialist ownership once. Do not claw back money already snapshotted into an in-progress run..
- **Implementation status:** Ending/gates executable on main; current +600 reward is legacy/stale; replacement not implemented.
- **OPEN после Product lock:** Final management lore/presentation.

### Favourite / Partner / Personal Network

- **Stable ending ID:** `ending.satyr-maid.personal-network` — NEW_ID.
- **Минимум по карьере:** veteran-service reached; **15 shifts**.
- **Exact route facts/counters:** personal-network-ready; relationship satyr-maid.recurring-guest stage request-resolved; service-meetings>=2; night-meetings>=1; request-response=accepted; request-resolved.
- **School:** None mandatory.
- **Night / relationship:** MANDATORY: voluntarily accept recurring-guest Night, complete >=1 Night meeting, explicitly accept the later request and resolve it. Romance is not required..
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School social courses; D35 private-space branch is optional enrichment, not an ending gate.
- **D16 boundary:** D16 explicit commit after relationship route readiness.
- **Current-life resolution:** Choose a durable personal/business network outcome with the recurring guest without forcing romance.
- **Permanent reward:** `specialist.satyr-maid.guest-network`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, the first Satyr Maid recurring-guest work introduction in a run awards one extra service-meeting credit. It changes only this relationship counter and never auto-accepts a Night/request or changes consent choices..
- **Exact reward numbers:** +1 extra service-meeting credit once/run; normal first introduction therefore records 2 instead of 1.
- **Migration / legacy cleanup:** No old ending ID. Existing personal-network-ready saves gain no completion automatically; only actually completed future ending earns reward..
- **Implementation status:** Career/relationship route exists on main, but no ending ID/reward/presentation.
- **OPEN после Product lock:** Final NPC/lore label and epilogue.

### Boundary Mastery

- **Stable ending ID:** `ending.satyr-maid.boundary-mastery` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** veteran-service reached; **15 shifts**.
- **Exact route facts/counters:** school-boundaries-ready; crisis-boundaries; boundaries-ready; crisis-resolved; recurring-guest service-meetings>=2; night-response=declined.
- **School:** MANDATORY: Body Confidence track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** MANDATORY explicit decline of recurring-guest Night invitation; no actual Night meeting required.
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Other personal/private-space scenes remain optional and cannot negate the recorded boundary choice.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Establish a professional house role defined by explicit service boundaries and staff/customer terms.
- **Permanent reward:** `satyr-maid.clear-terms`.
- **Reward class:** **Automatic knowledge/content unlock**.
- **Exact reward mechanics:** Preserve current Clear Terms behavior: on authored recurring-guest request scenes, expose the alternate professional negotiation choice that rejects the private obligation while keeping a professional arrangement. It does not auto-accept requests or alter stats/resources..
- **Exact reward numbers:** No slot cost; no numeric resource bonus; availability only on authored Clear Terms choices.
- **Migration / legacy cleanup:** Keep current reward/unlock identity. Reclassify/document it as automatic content rather than a broad Meta power. No migration of consent choices..
- **Implementation status:** Ending and reward consumer executable on main.
- **OPEN после Product lock:** Presentation/lore polish only.

---

## Undead Farm / Ферма нежити

### Research Farmer

- **Stable ending ID:** `ending.undead-farm.research-farmer` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** keeper-of-process reached; **15 shifts**.
- **Exact route facts/counters:** school-research-ready; sample-preserved; crisis-research; research-ready; crisis-resolved.
- **School:** MANDATORY: Arcana track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** None mandatory.
- **Activity / item:** MANDATORY item leg: preserve exactly 1 farm_unstable_specimen into farm_preserved_specimen using preserve_specimen capability in the normal route; Activity is optional.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Keeper relationship; Activity source comparison.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Turn the farm anomaly/production process into a disciplined research practice.
- **Permanent reward:** `specialist.undead-farm.field-preservation`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, once per run a held farm_unstable_specimen may be preserved without possessing the preserve_specimen capability. The specimen is consumed normally and produces the ordinary farm_preserved_specimen/result. This exception applies only to the farm specimen, not generic Activity loot..
- **Exact reward numbers:** 1 specimen preservation/run.
- **Migration / legacy cleanup:** Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration..
- **Implementation status:** Ending executable on main; reward absent.
- **OPEN после Product lock:** Final research lore/presentation.

### Farm Successor

- **Stable ending ID:** `ending.undead-farm.successor` — PRESERVE_CURRENT_ID.
- **Минимум по карьере:** keeper-of-process reached; **15 shifts**.
- **Exact route facts/counters:** school-management-ready; successor-ready; crisis-successor; crisis-resolved; relationship undead-farm.keeper stage partner-ready; work-meetings>=2; night-meetings>=1; request-response=accepted.
- **School:** MANDATORY: Literacy & Numbers track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** MANDATORY: voluntarily accept keeper Night request, complete >=1 Night meeting, explicitly accept keeper request, reach partner-ready. Romance not required..
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Farm delivery item route and Activity remain optional.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Take responsibility/control of the farm through management records and professional trust.
- **Permanent reward:** `specialist.undead-farm.supplier-account`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, after the first Undead Farm shift in a run, the player may claim exactly one farm_delivery_input from the inherited supplier account. No money is granted; the item is ordinary run inventory and is consumed normally by eligible farm content..
- **Exact reward numbers:** 1 farm_delivery_input/run; claim only after >=1 Undead Farm shift.
- **Migration / legacy cleanup:** Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration..
- **Implementation status:** Ending executable on main; reward absent.
- **OPEN после Product lock:** Final successor title/epilogue/presentation.

### External Anomaly

- **Stable ending ID:** `ending.undead-farm.external-anomaly` — NEW_ID.
- **Минимум по карьере:** keeper-of-process reached; **15 shifts**.
- **Exact route facts/counters:** school-research-ready; sample-preserved; activity-source-returned; external-anomaly-ready.
- **School:** MANDATORY: Arcana track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** None mandatory.
- **Activity / item:** MANDATORY: 1 farm_preserved_specimen and 1 successful Activity result tagged as a farm-anomaly source. Current vertical-slice publisher may be lumber.forest.success; full D36 content may move source to the appropriate region without changing the career fact contract..
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Keeper relationship; extra anomaly clues.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Trace the farm anomaly to an external source and resolve treatment/use/containment as a separate systemic outcome.
- **Permanent reward:** `knowledge.undead-farm.anomaly-catalog`.
- **Reward class:** **Automatic knowledge/content unlock**.
- **Exact reward mechanics:** In future runs, after a legitimate farm-anomaly source result has been obtained, expose one additional authored diagnosis option that reveals an extra route clue. It sets no ending-ready fact, grants no capability/item and cannot replace School or Activity..
- **Exact reward numbers:** max 1 anomaly-catalog diagnosis/run; no slot cost.
- **Migration / legacy cleanup:** No current ending ID. Reuse existing route facts; do not migrate ordinary Research Farmer completion into this ending..
- **Implementation status:** Route branch exists on main; ending/reward/presentation missing.
- **OPEN после Product lock:** Final source lore and epilogue.

---

## Tavern / Таверна

### Innkeeper

- **Stable ending ID:** `ending.tavern.innkeeper` — NEW_CANONICAL_ID_REPLACES_STALE.
- **Минимум по карьере:** house-node reached; **15 shifts**.
- **Exact route facts/counters:** school-records-ready; guest-ledger-evidence-ready; crisis-innkeeper; innkeeper-ready; crisis-resolved; supply_pressure>=2.
- **School:** MANDATORY: Literacy & Numbers track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** None mandatory.
- **Activity / item:** MANDATORY career access item/capability leg: access_guest_rooms_staff and guest-ledger evidence; no Activity required.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Recurring Traveler relationship; House Notes Night; D35 private-space branch.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Take operational ownership/control of the tavern.
- **Permanent reward:** `specialist.tavern.house-ledger`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, the first five paid city lodging purchases in the run cost 25 less each. Applies to normal and cheap only, preserving their 50-money relative gap; never changes housing tier/privateSpace and never applies to street/camp..
- **Exact reward numbers:** -25 money on each of first 5 paid city lodgings; max 125 saved/run; normal 100→75 and cheap 50→25 while charges remain.
- **Migration / legacy cleanup:** Retire tavern-stay as a new-run ending ID and remove visits>=18 shortcut. Migrate completed tavern-stay -> completed ending.tavern.innkeeper and grant the new Specialist once; retire legacy host unlock/old +5 prose. In-progress run snapshots are not retroactively repriced..
- **Implementation status:** Equivalent route facts exist; current runtime uses stale tavern-stay ID/reward.
- **OPEN после Product lock:** Final Innkeeper title/epilogue/presentation.

### Information Broker

- **Stable ending ID:** `ending.tavern.information-broker` — NEW_CANONICAL_ID_REPLACES_STALE.
- **Минимум по карьере:** house-node reached; **15 shifts**.
- **Exact route facts/counters:** school-broker-ready; traveler-rumour-known; rumour-route-open; rumour-confirmed; confidentiality-resolved; crisis-broker; information-broker-ready; crisis-resolved; recurring-traveler night-meetings>=1.
- **School:** MANDATORY: Rhetoric & Social track lessons_completed>=3 OR night_study_sessions>=3.
- **Night / relationship:** MANDATORY: voluntarily accept recurring-traveler Night, complete >=1 Night meeting, accept traveler request, then resolve confidentiality by either keep-private or share-route-only.
- **Activity / item:** MANDATORY: 1 successful qualifying Activity result that confirms the recorded rumour; current vertical slice uses lumber.forest.success -> rumour-confirmed.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** Extra external career networks/clues beyond the one confirmed route.
- **D16 boundary:** D16 explicit commit; never grants Palace access.
- **Current-life resolution:** Turn the tavern into a professional information node without becoming a Palace shortcut.
- **Permanent reward:** `knowledge.tavern.broker-index`.
- **Reward class:** **Automatic knowledge/content unlock**.
- **Exact reward mechanics:** Once per calendar year, the first eligible authored Tavern information scene may expose one extra broker-hint choice that reveals one route prerequisite/risk in UI/copy. The hint sets no progression fact, completes no requirement and spends no resource..
- **Exact reward numbers:** max 1 hint/year = 4 hints/run; no Specialist slot.
- **Migration / legacy cleanup:** Retire tavern-court as new-run ending ID and all tavern.prince shortcut semantics. Migrate completed tavern-court -> ending.tavern.information-broker and broker-index ownership once; retire legacy court unlock/old +5 prose. Never map it to Palace invitation..
- **Implementation status:** Route facts executable under stale tavern-court carrier; canonical ending/reward missing.
- **OPEN после Product lock:** Final broker lore/presentation.

### Sanctuary

- **Stable ending ID:** `ending.tavern.sanctuary` — NEW_CANONICAL_ID_REPLACES_STALE.
- **Минимум по карьере:** house-node reached; **15 shifts**.
- **Exact route facts/counters:** housing-assistance-complete; confidentiality-kept; crisis-sanctuary; sanctuary-ready; crisis-resolved; shelter_pressure>=2; recurring-traveler night-meetings>=1.
- **School:** None mandatory.
- **Night / relationship:** MANDATORY: recurring-traveler trust path through >=1 voluntary Night meeting; traveler request resolved; confidentiality-response=keep-private.
- **Activity / item:** None mandatory.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School; Activity; D35 private-space seed branch.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Make the tavern a protected community shelter/safe node by accepting an economic/social tradeoff.
- **Permanent reward:** `specialist.tavern.safehouse-network`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, once per calendar year after lodging resolution and only if no forced Night owns the Night, cheap or street lodging may expose one authored sanctuary-contact Night choice. It does not change lodging tier/cost, street penalties, lender eligibility/chance, privateSpace, or calendar rules..
- **Exact reward numbers:** max 1 sanctuary-contact use/year = 4 uses/run.
- **Migration / legacy cleanup:** Retire tavern-guild as new-run ending ID. Migrate completed tavern-guild -> ending.tavern.sanctuary and Specialist ownership once; retire legacy mediator unlock/old +5 prose..
- **Implementation status:** Route facts executable under stale tavern-guild carrier; canonical ending/reward missing.
- **OPEN после Product lock:** Exact sanctuary community/lore identity and presentation.

---

## Hunter / Охотница

### Master Hunter

- **Stable ending ID:** `ending.hunter.master-hunter` — NEW_ID.
- **Минимум по карьере:** recognized-hunter reached; **8 shifts**.
- **Exact route facts/counters:** spring_contracts>=1; summer_contracts>=1; autumn_contracts>=1; winter_contracts>=1; successful_expeditions>=2; expedition-preserved-sample; expedition-rough-route; rare-contract-ready; master-route-ready.
- **School:** None mandatory; Field Craft is optional preparation.
- **Night / relationship:** None mandatory; Senior Guide relationship/Night optional.
- **Activity / item:** MANDATORY by route identity: >=2 successful hunter.expedition entries; obtain preserve_specimen and cross_rough_route capabilities sufficiently to record preserved-sample and rough-route facts.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School Field Craft; companion relationship.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Become a master hunter proven across all seasons and multiple prepared expedition methods.
- **Permanent reward:** `specialist.hunter.master-kit`.
- **Reward class:** **Specialist**.
- **Exact reward mechanics:** When selected, once per run before entering hunter.expedition choose one loaned capability for that single Activity entry: preserve_specimen OR cross_rough_route. The loan expires on Activity exit and is never permanent inventory..
- **Exact reward numbers:** 1 loaned capability for 1 hunter.expedition entry/run; choose 1 of 2 capabilities; entry still costs 2 Energy and Field Time stays 6.
- **Migration / legacy cleanup:** No prior advanced ending ID. Do not attach reward to Hunter Hard Work..
- **Implementation status:** Route branch/counters exist on main; ending/reward/presentation missing.
- **OPEN после Product lock:** Final rare-contract lore/presentation.

### Warden

- **Stable ending ID:** `ending.hunter.warden` — NEW_ID.
- **Минимум по карьере:** recognized-hunter reached; **8 shifts**.
- **Exact route facts/counters:** relationship-trust-ready; protected-route-choice; warden-route-ready; protected_routes>=1; at least one of forest-clue-known OR lumber-clue-known OR farm-clue-known; Senior Guide conflict-response=cooperate.
- **School:** None mandatory.
- **Night / relationship:** MANDATORY relationship cooperation with hunter.senior-guide; a D37 companion Night is authored coverage but is OPTIONAL for ending eligibility.
- **Activity / item:** Activity NOT mandatory. A qualifying clue may come from Activity/Forest, Lumber or Farm. No item requirement..
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School; Activity; companion Night; additional clue sources.
- **D16 boundary:** D16 explicit commit.
- **Current-life resolution:** Protect/manage hunting territory through cooperation and route stewardship rather than trophy maximization.
- **Permanent reward:** `knowledge.hunter.warden-signs`.
- **Reward class:** **Automatic knowledge/content unlock**.
- **Exact reward mechanics:** After Forest Frontier is normally unlocked in a future run, expose one authored Warden-marked conservation route option per run. It reveals/opens only that content branch; it does not unlock the region, reduce entry/Field Time costs, set ending facts or bypass capabilities..
- **Exact reward numbers:** max 1 Warden-marked lateral content route/run; no slot cost.
- **Migration / legacy cleanup:** No prior advanced ending ID. Do not alter Hunter Hard Work or D38 Activity rewards..
- **Implementation status:** Route branch exists on main; ending/reward/presentation missing.
- **OPEN после Product lock:** Final territory/lore presentation.

### Legend

- **Stable ending ID:** `ending.hunter.legend` — NEW_ID.
- **Минимум по карьере:** recognized-hunter reached; **8 shifts**.
- **Exact route facts/counters:** rare-contract-ready; forest-clue-known; tavern-clue-known; at least one of farm-clue-known OR lumber-clue-known; rare-contract-active; rare-contract-complete; legend-route-ready; successful_expeditions>=3 total.
- **School:** None mandatory.
- **Night / relationship:** None mandatory; Senior Guide Night optional.
- **Activity / item:** MANDATORY by route identity: first earn Master-route preparation including 2 successful expeditions, then accept rare contract and complete 1 further successful hunter.expedition; preserve_specimen capability required for rare contract chain.
- **Прямой stat threshold:** NONE.
- **Optional inputs:** School; companion relationship; extra clue sources.
- **D16 boundary:** D16 explicit commit after rare-contract-complete/legend-route-ready; rare-contract success does not auto-end.
- **Current-life resolution:** Resolve the rare legendary target/anomaly through a prepared multi-system contract.
- **Permanent reward:** `knowledge.hunter.legend-contracts`.
- **Reward class:** **Automatic knowledge/content unlock**.
- **Exact reward mechanics:** In future runs, once Hunter reaches recognized-hunter, expose one additional authored legendary-contract variant per run. The variant still requires its own normal clues/items/Activity success and grants no automatic completion or resource bonus..
- **Exact reward numbers:** max 1 additional legendary-contract chain/run; no slot cost.
- **Migration / legacy cleanup:** No prior advanced ending ID. Must remain separate from D38 standalone Activity endings..
- **Implementation status:** Rare-contract route exists on main; ending/reward/presentation missing.
- **OPEN после Product lock:** Final legendary target/lore/epilogue.


---

# 5. Migration and stale-runtime decisions

## Tavern legacy ending IDs

Current executable IDs are semantically stale:

- `tavern-stay`;
- `tavern-court`;
- `tavern-guild`.

They should **not** survive as canonical 1.0 IDs.

Proposed one-time migration:

- `tavern-stay` -> `ending.tavern.innkeeper`;
- `tavern-court` -> `ending.tavern.information-broker`;
- `tavern-guild` -> `ending.tavern.sanctuary`.

Profiles that already completed the old ending retain completion credit and receive the corresponding modern reward ownership once.

Retire:
- `host`;
- `court`;
- `mediator`;
- stale prose claiming generic +5 stat rewards.

Important:
`tavern-court` never maps to Palace access/invitation.
D23 remains the only Palace entry path.

## Satyr Maid House Power

Current `satyr-maid.house-credit` grants +600 starting money in `freshSave`.

That is a broad legacy economic reward and should be replaced by
`specialist.satyr-maid.house-ledger`.

Migration:
- existing ownership/completion -> new Specialist ownership once;
- remove future +600-starting-money behavior;
- do not subtract money from an already-started life.

## Current rewardless executable endings

Current main has `metaRewards: []` for:
- Lumber Forewoman;
- Lumber Forest;
- Undead Research Farmer;
- Undead Farm Successor.

If Product accepts the new rewards, existing permanent completion of those same stable ending IDs should grant the new reward once through an idempotent migration marker.

## Boundary Mastery

Keep current `satyr-maid.clear-terms`.

It is a good example of a narrow automatic content reward:
it adds an authored professional negotiation choice rather than generic power.

## Lumber legacy `lumber-stay`

Not part of this 14-ending tranche.

Do **not** silently map `lumber-stay` / `vitality` to Forewoman.
That stale identity needs its own cleanup decision.

---

# 6. Night / D35 / D37 boundary

Night is mandatory only where the ending identity actually depends on a relationship route:

Mandatory Night:
- Satyr Maid Personal Network;
- Undead Farm Successor;
- Tavern Information Broker;
- Tavern Sanctuary.

Explicit decline rather than a Night meeting:
- Satyr Maid Boundary Mastery.

Relationship mandatory but Night optional:
- Lumber Forewoman;
- Hunter Warden.

Night optional:
- Lumber Forest Compact;
- Satyr House Power;
- Undead Research Farmer;
- Undead External Anomaly;
- Tavern Innkeeper;
- Hunter Master Hunter;
- Hunter Legend.

D35 private-space scenes remain optional enrichment for these endings.
None of the 14 requires normal lodging solely because Product wants housing differentiation.

That preserves:
- cheap viability;
- street/public/workplace route viability;
- consent independence;
- D37's content-completeness intent without converting Night into a universal ending tax.

---

# 7. Activity boundary

Activity is mandatory only where route identity genuinely requires field verification/preparation:

- Lumber Forest Compact: **1 qualifying success**;
- Undead External Anomaly: **1 qualifying source success**;
- Tavern Information Broker: **1 qualifying rumour-confirmation success**;
- Hunter Master Hunter: **2 successful hunter expeditions**;
- Hunter Legend: **3 successful hunter expeditions total**.

Activity is explicitly **not mandatory** for Hunter Warden.

This preserves D36's rule that ordinary complex Activity legs stay bounded and avoids turning every advanced Hunter ending into the same expedition route.

Hunter Legend's 3-success total is structurally:
- two successes for Master-route preparation;
- one later success for the accepted rare contract.

It remains distinct from D38's three standalone Activity endings.

---

# 8. Exact 14-row Product table

| Ending | Как получить | Что происходит | Что даёт навсегда | Reward class | Exact numbers | Legacy cleanup | OPEN |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Forewoman | 8 shifts; trusted-worker reached; management-school-ready; forewoman-problem-resolved; relationship lumber.foreman stage route-professional; School: MANDATORY: Literacy & Numbers track: lessons_completed>=3 OR night_study_sessions>=3; canonical publisher lumber.school.management-ready per D33; Night/rel: MANDATORY relationship: lumber.foreman route-professional; Night is OPTIONAL; Activity/item: None mandatory; stat: NONE | Take operational leadership of the Lumber crew/plot; management outcome, not Hard Work | `specialist.lumber.forewoman-ledger`: When selected in New Start+, after Lumber has reached trusted-worker and lumber.foreman is route-professional, unlock exactly one Forewoman Ledger preparation per run. It satisfies the Forewoman School-competence leg through a specialist-only route token, but does not increment School counters, publish lumber.school.management-ready, or resolve forewoman-problem-resolved. The production-crisis resolution remains mandatory. | Specialist | 1 use/run; active Specialists still 0..2 total; no money/Energy/stat grant | Keep ending ID. Existing completed ending with metaRewards:[] receives specialist ownership once on migration. Do NOT map legacy lumber-stay/vitality to Forewoman. | Final lore title/epilogue/presentation copy only; Product decision on this proposal |
| Forest Compact | 8 shifts; trusted-worker reached; forest-specimen-catalogued; forest-truth-known; forest-problem-resolved; School: None mandatory; Night/rel: None mandatory; Foreman/social Night optional; Activity/item: MANDATORY: 1 successful qualifying Forest Frontier/Lumber Forest Activity result AND 1 preserved forest specimen consumed/validated by the return chain; stat: NONE | Resolve the forest-production conflict through a compact/management choice and establish a durable Lumber–forest settlement | `specialist.lumber.forest-compact-route`: When selected, after Forest Frontier is normally unlocked, one authored forest-compact lateral route becomes available during one Activity entry per run. It grants no region unlock, no automatic result/fact, no entry-Energy discount and no Field Time discount. | Specialist | max 1 lateral-route use/run; Activity entry remains 2 Energy; Field Time remains 6 | Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration. No interaction with lumber-stay/vitality. | Exact lore wording of compact choice and presentation assets |
| House Power | 15 shifts; veteran-service reached; crisis-house-power; house-power-ready; crisis-resolved; School: MANDATORY one track: (Literacy & Numbers lessons_completed>=3 OR night_study_sessions>=3) OR (Rhetoric & Social lessons_completed>=3 OR night_study_sessions>=3), producing school-management-ready OR school-rhetoric-ready; Night/rel: None mandatory; Activity/item: None mandatory; stat: NONE | Become management/co-owner-level authority in the house and set operating terms | `specialist.satyr-maid.house-ledger`: When selected, after Satyr Maid reaches house-regular (8 shifts), once per run choose Management or Rhetoric as a House-Power-only competence substitute. It creates a specialist-only readiness token for House Power; it does not add School counters/facts and does not resolve the crisis. | Specialist | 1 competence substitution/run; earliest activation after 8 Satyr Maid shifts | Replace legacy satyr-maid.house-credit +600 starting-money behavior. Existing owners/completed House Power migrate to specialist ownership once. Do not claw back money already snapshotted into an in-progress run. | Final management lore/presentation |
| Favourite / Partner / Personal Network | 15 shifts; veteran-service reached; personal-network-ready; relationship satyr-maid.recurring-guest stage request-resolved; service-meetings>=2; night-meetings>=1; request-response=accepted; request-resolved; School: None mandatory; Night/rel: MANDATORY: voluntarily accept recurring-guest Night, complete >=1 Night meeting, explicitly accept the later request and resolve it. Romance is not required.; Activity/item: None mandatory; stat: NONE | Choose a durable personal/business network outcome with the recurring guest without forcing romance | `specialist.satyr-maid.guest-network`: When selected, the first Satyr Maid recurring-guest work introduction in a run awards one extra service-meeting credit. It changes only this relationship counter and never auto-accepts a Night/request or changes consent choices. | Specialist | +1 extra service-meeting credit once/run; normal first introduction therefore records 2 instead of 1 | No old ending ID. Existing personal-network-ready saves gain no completion automatically; only actually completed future ending earns reward. | Final NPC/lore label and epilogue |
| Boundary Mastery | 15 shifts; veteran-service reached; school-boundaries-ready; crisis-boundaries; boundaries-ready; crisis-resolved; recurring-guest service-meetings>=2; night-response=declined; School: MANDATORY: Body Confidence track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: MANDATORY explicit decline of recurring-guest Night invitation; no actual Night meeting required; Activity/item: None mandatory; stat: NONE | Establish a professional house role defined by explicit service boundaries and staff/customer terms | `satyr-maid.clear-terms`: Preserve current Clear Terms behavior: on authored recurring-guest request scenes, expose the alternate professional negotiation choice that rejects the private obligation while keeping a professional arrangement. It does not auto-accept requests or alter stats/resources. | Automatic knowledge/content unlock | No slot cost; no numeric resource bonus; availability only on authored Clear Terms choices | Keep current reward/unlock identity. Reclassify/document it as automatic content rather than a broad Meta power. No migration of consent choices. | Presentation/lore polish only |
| Research Farmer | 15 shifts; keeper-of-process reached; school-research-ready; sample-preserved; crisis-research; research-ready; crisis-resolved; School: MANDATORY: Arcana track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: None mandatory; Activity/item: MANDATORY item leg: preserve exactly 1 farm_unstable_specimen into farm_preserved_specimen using preserve_specimen capability in the normal route; Activity is optional; stat: NONE | Turn the farm anomaly/production process into a disciplined research practice | `specialist.undead-farm.field-preservation`: When selected, once per run a held farm_unstable_specimen may be preserved without possessing the preserve_specimen capability. The specimen is consumed normally and produces the ordinary farm_preserved_specimen/result. This exception applies only to the farm specimen, not generic Activity loot. | Specialist | 1 specimen preservation/run | Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration. | Final research lore/presentation |
| Farm Successor | 15 shifts; keeper-of-process reached; school-management-ready; successor-ready; crisis-successor; crisis-resolved; relationship undead-farm.keeper stage partner-ready; work-meetings>=2; night-meetings>=1; request-response=accepted; School: MANDATORY: Literacy & Numbers track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: MANDATORY: voluntarily accept keeper Night request, complete >=1 Night meeting, explicitly accept keeper request, reach partner-ready. Romance not required.; Activity/item: None mandatory; stat: NONE | Take responsibility/control of the farm through management records and professional trust | `specialist.undead-farm.supplier-account`: When selected, after the first Undead Farm shift in a run, the player may claim exactly one farm_delivery_input from the inherited supplier account. No money is granted; the item is ordinary run inventory and is consumed normally by eligible farm content. | Specialist | 1 farm_delivery_input/run; claim only after >=1 Undead Farm shift | Keep ending ID. Existing completed ending with metaRewards:[] gains specialist ownership once on migration. | Final successor title/epilogue/presentation |
| External Anomaly | 15 shifts; keeper-of-process reached; school-research-ready; sample-preserved; activity-source-returned; external-anomaly-ready; School: MANDATORY: Arcana track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: None mandatory; Activity/item: MANDATORY: 1 farm_preserved_specimen and 1 successful Activity result tagged as a farm-anomaly source. Current vertical-slice publisher may be lumber.forest.success; full D36 content may move source to the appropriate region without changing the career fact contract.; stat: NONE | Trace the farm anomaly to an external source and resolve treatment/use/containment as a separate systemic outcome | `knowledge.undead-farm.anomaly-catalog`: In future runs, after a legitimate farm-anomaly source result has been obtained, expose one additional authored diagnosis option that reveals an extra route clue. It sets no ending-ready fact, grants no capability/item and cannot replace School or Activity. | Automatic knowledge/content unlock | max 1 anomaly-catalog diagnosis/run; no slot cost | No current ending ID. Reuse existing route facts; do not migrate ordinary Research Farmer completion into this ending. | Final source lore and epilogue |
| Innkeeper | 15 shifts; house-node reached; school-records-ready; guest-ledger-evidence-ready; crisis-innkeeper; innkeeper-ready; crisis-resolved; supply_pressure>=2; School: MANDATORY: Literacy & Numbers track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: None mandatory; Activity/item: MANDATORY career access item/capability leg: access_guest_rooms_staff and guest-ledger evidence; no Activity required; stat: NONE | Take operational ownership/control of the tavern | `specialist.tavern.house-ledger`: When selected, the first five paid city lodging purchases in the run cost 25 less each. Applies to normal and cheap only, preserving their 50-money relative gap; never changes housing tier/privateSpace and never applies to street/camp. | Specialist | -25 money on each of first 5 paid city lodgings; max 125 saved/run; normal 100→75 and cheap 50→25 while charges remain | Retire tavern-stay as a new-run ending ID and remove visits>=18 shortcut. Migrate completed tavern-stay -> completed ending.tavern.innkeeper and grant the new Specialist once; retire legacy host unlock/old +5 prose. In-progress run snapshots are not retroactively repriced. | Final Innkeeper title/epilogue/presentation |
| Information Broker | 15 shifts; house-node reached; school-broker-ready; traveler-rumour-known; rumour-route-open; rumour-confirmed; confidentiality-resolved; crisis-broker; information-broker-ready; crisis-resolved; recurring-traveler night-meetings>=1; School: MANDATORY: Rhetoric & Social track lessons_completed>=3 OR night_study_sessions>=3; Night/rel: MANDATORY: voluntarily accept recurring-traveler Night, complete >=1 Night meeting, accept traveler request, then resolve confidentiality by either keep-private or share-route-only; Activity/item: MANDATORY: 1 successful qualifying Activity result that confirms the recorded rumour; current vertical slice uses lumber.forest.success -> rumour-confirmed; stat: NONE | Turn the tavern into a professional information node without becoming a Palace shortcut | `knowledge.tavern.broker-index`: Once per calendar year, the first eligible authored Tavern information scene may expose one extra broker-hint choice that reveals one route prerequisite/risk in UI/copy. The hint sets no progression fact, completes no requirement and spends no resource. | Automatic knowledge/content unlock | max 1 hint/year = 4 hints/run; no Specialist slot | Retire tavern-court as new-run ending ID and all tavern.prince shortcut semantics. Migrate completed tavern-court -> ending.tavern.information-broker and broker-index ownership once; retire legacy court unlock/old +5 prose. Never map it to Palace invitation. | Final broker lore/presentation |
| Sanctuary | 15 shifts; house-node reached; housing-assistance-complete; confidentiality-kept; crisis-sanctuary; sanctuary-ready; crisis-resolved; shelter_pressure>=2; recurring-traveler night-meetings>=1; School: None mandatory; Night/rel: MANDATORY: recurring-traveler trust path through >=1 voluntary Night meeting; traveler request resolved; confidentiality-response=keep-private; Activity/item: None mandatory; stat: NONE | Make the tavern a protected community shelter/safe node by accepting an economic/social tradeoff | `specialist.tavern.safehouse-network`: When selected, once per calendar year after lodging resolution and only if no forced Night owns the Night, cheap or street lodging may expose one authored sanctuary-contact Night choice. It does not change lodging tier/cost, street penalties, lender eligibility/chance, privateSpace, or calendar rules. | Specialist | max 1 sanctuary-contact use/year = 4 uses/run | Retire tavern-guild as new-run ending ID. Migrate completed tavern-guild -> ending.tavern.sanctuary and Specialist ownership once; retire legacy mediator unlock/old +5 prose. | Exact sanctuary community/lore identity and presentation |
| Master Hunter | 8 shifts; recognized-hunter reached; spring_contracts>=1; summer_contracts>=1; autumn_contracts>=1; winter_contracts>=1; successful_expeditions>=2; expedition-preserved-sample; expedition-rough-route; rare-contract-ready; master-route-ready; School: None mandatory; Field Craft is optional preparation; Night/rel: None mandatory; Senior Guide relationship/Night optional; Activity/item: MANDATORY by route identity: >=2 successful hunter.expedition entries; obtain preserve_specimen and cross_rough_route capabilities sufficiently to record preserved-sample and rough-route facts; stat: NONE | Become a master hunter proven across all seasons and multiple prepared expedition methods | `specialist.hunter.master-kit`: When selected, once per run before entering hunter.expedition choose one loaned capability for that single Activity entry: preserve_specimen OR cross_rough_route. The loan expires on Activity exit and is never permanent inventory. | Specialist | 1 loaned capability for 1 hunter.expedition entry/run; choose 1 of 2 capabilities; entry still costs 2 Energy and Field Time stays 6 | No prior advanced ending ID. Do not attach reward to Hunter Hard Work. | Final rare-contract lore/presentation |
| Warden | 8 shifts; recognized-hunter reached; relationship-trust-ready; protected-route-choice; warden-route-ready; protected_routes>=1; at least one of forest-clue-known OR lumber-clue-known OR farm-clue-known; Senior Guide conflict-response=cooperate; School: None mandatory; Night/rel: MANDATORY relationship cooperation with hunter.senior-guide; a D37 companion Night is authored coverage but is OPTIONAL for ending eligibility; Activity/item: Activity NOT mandatory. A qualifying clue may come from Activity/Forest, Lumber or Farm. No item requirement.; stat: NONE | Protect/manage hunting territory through cooperation and route stewardship rather than trophy maximization | `knowledge.hunter.warden-signs`: After Forest Frontier is normally unlocked in a future run, expose one authored Warden-marked conservation route option per run. It reveals/opens only that content branch; it does not unlock the region, reduce entry/Field Time costs, set ending facts or bypass capabilities. | Automatic knowledge/content unlock | max 1 Warden-marked lateral content route/run; no slot cost | No prior advanced ending ID. Do not alter Hunter Hard Work or D38 Activity rewards. | Final territory/lore presentation |
| Legend | 8 shifts; recognized-hunter reached; rare-contract-ready; forest-clue-known; tavern-clue-known; at least one of farm-clue-known OR lumber-clue-known; rare-contract-active; rare-contract-complete; legend-route-ready; successful_expeditions>=3 total; School: None mandatory; Night/rel: None mandatory; Senior Guide Night optional; Activity/item: MANDATORY by route identity: first earn Master-route preparation including 2 successful expeditions, then accept rare contract and complete 1 further successful hunter.expedition; preserve_specimen capability required for rare contract chain; stat: NONE | Resolve the rare legendary target/anomaly through a prepared multi-system contract | `knowledge.hunter.legend-contracts`: In future runs, once Hunter reaches recognized-hunter, expose one additional authored legendary-contract variant per run. The variant still requires its own normal clues/items/Activity success and grants no automatic completion or resource bonus. | Automatic knowledge/content unlock | max 1 additional legendary-contract chain/run; no slot cost | No prior advanced ending ID. Must remain separate from D38 standalone Activity endings. | Final legendary target/lore/epilogue |

---

# 9. Acceptance criteria for implementation after Product lock

A future implementation should demonstrate, for every one of the 14 endings:

1. the stable ending ID exists exactly once;
2. eligibility cannot occur before the exact minimum shift/stage requirement;
3. route facts/counters are order-independent where preparation may happen early;
4. mandatory School/Night/Activity inputs are exactly those listed here;
5. optional inputs never become hidden mandatory gates;
6. no direct raw stat gate is added;
7. eligibility does not auto-end the run;
8. explicit commit selects one ending;
9. permanent reward applies once on first completion;
10. Specialist counters/charges reset per run and respect D28 0..2;
11. automatic knowledge rewards consume no Specialist slot;
12. no reward changes Palace qualification;
13. no reward changes Secret Debt discovery/debt/forced Night/exit;
14. Tavern/Satyr legacy rewards no longer leak stale broad power into new runs;
15. save/reload cannot duplicate reward ownership or per-run charges;
16. current-run snapshots are not retroactively rewritten by migration.

No full CI is requested for this docs/research tranche.

---

# 10. Product decision summary

If accepted, this packet closes for Tranche A:

- 14 stable ending identities;
- exact minimum stages/shifts;
- exact typed route gates;
- exact mandatory/optional School, Night, relationship, Activity and item inputs;
- explicit decision of **no direct stat thresholds**;
- 14 permanent reward identities;
- exact D27/D28 classes;
- exact caps/durations;
- Tavern canonical-ID migration;
- stale Satyr +600 replacement;
- rewardless-current-ending retroactive ownership policy.

Remaining OPEN fields are intentionally content-facing:
final lore names where necessary, epilogue copy and presentation assets.

**READY_FOR_LEADER_PRODUCT_DECISION**
