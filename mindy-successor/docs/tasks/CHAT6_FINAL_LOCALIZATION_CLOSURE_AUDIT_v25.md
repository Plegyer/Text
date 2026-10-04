# Chat 6 — Final 1.0 Localization / Accessibility Closure Audit v25

Status: **READY_FOR_LEADER_REVIEW**  
Owner: Chat 6  
Branch: `chat6/final-localization-closure-audit-v25`

Scope: audit only.

No runtime changes.  
No mechanics changes.  
No Product-lore rewrite.  
No full CI.

---

## 1. Sources of truth

Current live baseline audited:

`main@c61ec4cee2c1cc8c518c3aa1cdd9b164f6673345`

Current combined D40 + D41 Chat 2 assembly branch audited at live head:

`chat2/assembly-d41-tranche-a-current-main-20261004-v1@325f439cc4977745d80ce1a38962763f7be43804`

Frozen / queued producer surfaces audited:

- D41: `56e1fcc19201f8586634262bb8746cb99d33f8e9`
- D42 Night: `9305d1da055203c51137041a78a345cbc64339c0`
- Secret Debt v12: `10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- Palace v18: `67f948d185883d8e706dad522e5010bff8e2bd48`
- Palace v19: `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`
- Activity v15: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- Activity v16: `3cf69d7cb3df1a58d68908159d0acc14736435c4`
- Activity v17: `df9ef5c3d04cfd8eb582c24838d971854e984218`
- D46: `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47: `252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- global presentation v23: `f25069c369c449ce0efbfe57acf877f950b1dfea`

Accepted authorities also used:

- D49 Macro Mystery Lore Lock;
- D50 Global Non-Palace Media Lock;
- Chat 5 final ending-ID/migration audit v15.

---

# 2. Executive result

The 1.0 localization layer is **not yet release-closed**.

The problem is **not** one-sided entries inside existing localization records.

Across every localization bundle inspected, every existing localization record has both non-empty RU and EN.

The remaining problems are:

1. required runtime keys that do not exist at all;
2. ending epilogue coverage that is incomplete across the live ending roster;
3. 16 D40 endings whose player-facing final copy is still placeholder/fallback copy;
4. several concrete RU/EN Merchant choice-text mismatches;
5. 14 presentation surfaces whose alt text is bilingual but whose caption convention is incomplete;
6. retired / duplicate localization residue that should be cleaned after migration compatibility is locked.

The largest blocker is ending localization.

---

# 3. Whole-bundle RU / EN parity

Every existing entry in the inspected localization bundles has non-empty RU and EN.

| Surface | Localization entries | Missing RU existing entries | Missing EN existing entries |
|---|---:|---:|---:|
| current main | 3228 | 0 | 0 |
| D41 producer | 3284 | 0 | 0 |
| D42 Night | 3274 | 0 | 0 |
| Secret Debt v12 | 3272 | 0 | 0 |
| Palace v18 | 3422 | 0 | 0 |
| Palace v19 | 3436 | 0 | 0 |
| Activity v15 | 3224 | 0 | 0 |
| Activity v16 | 3236 | 0 | 0 |
| Activity v17 | 3245 | 0 | 0 |
| D46 | 3224 | 0 | 0 |
| D47 | 3224 | 0 | 0 |
| v23 | 3224 | 0 | 0 |

Therefore:

> “missing RU / EN” in this audit means a **required player-facing key is absent**, not that an existing localization object contains only one language.

---

# 4. Runtime ending-key convention

The current UI resolves ending copy with the shape:

`ending.<ending-id>.<field>`

Many stable ending IDs already begin with `ending.`.

Therefore the live localization namespace for:

`ending.guard.officer`

is:

`ending.ending.guard.officer.title`

and similarly for description / epilogue.

The doubled `ending.ending.*` form is currently a runtime convention, not by itself an error.

Any closure repair must target the exact live namespace unless the runtime convention is separately changed by an authorized owner.

v25 does **not** authorize such a runtime change.

---

# 5. P0 — D40 advanced endings have no final ending-owned RU / EN copy

The current combined D40 + D41 candidate has:

- 43 total live ending definitions;
- 40 canonical ordinary-career endings;
- 3 noncanonical prototype/legacy endings:
  - `guild-life`
  - `scholar-life`
  - `lumber-stay`

All 16 D40 advanced endings exist mechanically.

However, all 16 lack the exact live localization keys for:

- title;
- description;
- epilogue.

Their current definition fallbacks are English implementation placeholders such as:

> `D40 advanced Guard Officer ending. Eligibility is non-terminal until explicit commit.`

and:

> `Guard Officer route completed. Final authored epilogue remains presentation-owned.`

This means the RU UI currently falls back to English implementation copy for these endings.

This is a 1.0 release blocker.

## Exact D40 IDs requiring final RU / EN title + description + epilogue

### Guard

- `ending.guard.officer`
- `ending.guard.reform`
- `ending.guard.network`
- `ending.guard.major-case`

### Merchant

- `ending.merchant.house`
- `ending.merchant.speculator-smuggler`
- `ending.merchant.patron-of-routes`

### Artist / Geisha

- `ending.artist-geisha.master-artist`
- `ending.artist-geisha.patron-network`
- `ending.artist-geisha.court-invitation`

### Assassin

- `ending.assassin.ghost`
- `ending.assassin.handler-takeover`
- `ending.assassin.refusal-turncoat`

### Prostitute

- `ending.prostitute.independent-house`
- `ending.prostitute.elite-clientele`
- `ending.prostitute.network-protection`

## Exact required namespace

For every ID above, add the live title, description and epilogue key.

For example:

- `ending.ending.guard.officer.title`
- `ending.ending.guard.officer.description`
- `ending.ending.guard.officer.epilogue`

Total D40 repair:

**48 bilingual keys**

- 16 titles;
- 16 descriptions;
- 16 epilogues.

Do not invent mechanics, gates, rewards, or new ending IDs while authoring this copy.

---

# 6. P0 — global ordinary-ending epilogue debt

Activity v17 changes the ended-state UI to resolve a localized ending-owned epilogue for every ending.

This is a **global** ending-screen consumer, not Activity-only.

Therefore every live ending must have a bilingual epilogue key before / with v17 assembly.

Even before v17, the journal fallback is not locale-aware, so missing epilogue localization is already undesirable.

## 6.1 Hard Work

All **10 / 10** Hard Work endings lack the live runtime epilogue key:

- `ending.lumber.hard-work`
- `ending.satyr-maid.hard-work`
- `ending.undead-farm.hard-work`
- `ending.tavern.hard-work`
- `ending.hunter.hard-work`
- `ending.guard.hard-work`
- `ending.merchant.hard-work`
- `ending.artist-geisha.hard-work`
- `ending.assassin.hard-work`
- `ending.prostitute.hard-work`

Required:

**10 bilingual epilogue keys**

Example live namespace:

`ending.ending.lumber.hard-work.epilogue`

---

## 6.2 D41 Tranche A

D41 has 14 advanced endings.

Four already have bilingual runtime epilogues:

- `ending.satyr-maid.house-power`
- `ending.satyr-maid.boundary-mastery`
- `ending.undead-farm.research-farmer`
- `ending.undead-farm.successor`

Ten still need epilogues:

- `ending.lumber.forewoman`
- `ending.lumber.forest`
- `ending.satyr-maid.personal-network`
- `ending.undead-farm.external-anomaly`
- `ending.tavern.innkeeper`
- `ending.tavern.information-broker`
- `ending.tavern.sanctuary`
- `ending.hunter.master-hunter`
- `ending.hunter.warden`
- `ending.hunter.legend`

Required:

**10 bilingual epilogue keys**

The D41 title/description layer itself is bilingual and semantically aligned.

---

## 6.3 D40 Tranche B

All 16 D40 advanced epilogues are absent.

These are already counted inside the 48-key D40 repair in section 5.

---

## 6.4 Prototype / legacy live endings

Current combined candidate still has:

- `guild-life`
- `scholar-life`
- `lumber-stay`

None has a bilingual epilogue key.

### Required before 1.0

If `guild-life` and `scholar-life` remain live:

- add `ending.guild-life.epilogue`;
- add `ending.scholar-life.epilogue`.

Their definition fallback epilogues are Russian, so EN currently cannot rely on fallback.

### `lumber-stay`

Do **not** author a new 1.0 epilogue until Leader/Chat 5 closes the active retirement policy.

If it remains live as a legacy-exempt ending:

- add `ending.lumber-stay.epilogue`.

If it is retired for new play:

- preserve migration/history identity;
- do not map it to Forewoman or Forest;
- retire player-facing live presentation/localization consistently.

This is an explicit dependency on the active Chat 5 `lumber-stay` retirement-policy task.

---

# 7. P1 — Secret Debt ending epilogues

Secret Debt v12 has complete bilingual player-facing:

- ending titles;
- ending descriptions;
- event text;
- action text;
- route/state labels.

But its three live ending epilogue keys are absent:

- `ending.ending.secret-debt.paid-freedom.epilogue`
- `ending.ending.secret-debt.bound-life.epilogue`
- `ending.ending.secret-debt.takeover.epilogue`

The definitions contain English fallback epilogues.

Therefore RU would fall back to English on a localized epilogue consumer.

Required:

**3 bilingual epilogue keys**

No Secret Debt mechanics or consent rules need reopening.

---

# 8. PASS — Activity ending localization

Activity v17 is closed at the ending-copy layer.

All three D38 endings have bilingual runtime keys for:

- title;
- description;
- epilogue.

IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

The content is semantically aligned across RU / EN.

Presentation:

- alt present;
- altKey present;
- RU alt present;
- EN alt present;
- caption present;
- RU caption present;
- EN caption present.

No v25 repair required.

---

# 9. PASS — Palace v18 / v19 localization and D49 epistemic strength

Palace v19 remains the strongest fully closed story/localization packet in the queue.

The earlier v19 audit covered 97 required Palace localization entries with:

- 0 missing RU;
- 0 missing EN.

v25 independently checked the D49-sensitive reveal ladder.

## Duty 12

RU and EN both state:

- several records are authenticated;
- separate sources corroborate an anomaly;
- ordinary travel does not explain the records;
- mechanism remains unknown;
- cause remains unknown;
- repeatability remains unknown.

Neither locale names the Threshold at duty 12.

**PASS**

## Duty 15

RU and EN both first establish:

- Palace Concordance / Дворцовый Свод;
- Threshold Archive / Архив Порога;
- real inter-world Threshold / Порог;
- heroine's arrival as an anomaly in that record class;
- original displacement cause still unknown.

**PASS**

## Prince confrontation

RU and EN preserve the same epistemic distinctions:

- record vs institutional claim;
- authority/custody vs proof;
- successor world remains real;
- origin trace can be reconstructed without knowing the original cause;
- Prince defeat is epistemic/procedural;
- Return Home remains an explicit later choice.

**PASS**

## Macro-lore leak scan

Protected terms scanned across:

- current main;
- D41;
- D42 Night;
- Secret Debt;
- Activity v17;
- Palace v19.

Protected terms included:

- Palace Concordance / Дворцовый Свод;
- Threshold Archive / Архив Порога;
- inter-world / межмировой;
- Origin Trace / След происхождения;
- Custodial Mandate / Мандат Хранителя.

Results outside Palace-owned localization:

- current main: **0**
- D41: **0**
- D42: **0**
- Secret Debt: **0**
- Activity v17: **0**

Palace v19 contains the terms only in Palace-owned surfaces.

**No D49 pre-Palace lore leak found.**

---

# 10. PASS — D46 / D47 New Start+ bilingual accessibility

D46/D47 New Start+ copy is not sourced from `localization.json`; it is a runtime-bound bilingual presentation fixture:

`content/hard-work-new-start-presentation-v2.fixture.json`

Audited:

- every common RU field non-empty;
- every common EN field non-empty;
- all ten package titles in RU;
- all ten package titles in EN;
- Palace 10/10 requirement in both languages;
- cap-100 / cap-200 explanation in both languages;
- Lust label in both languages.

The UI builds package `ariaLabel` from localized:

- title;
- selected/unselected state;
- early-access copy;
- package effects.

The source validator already rejects empty common copy and missing package titles.

No concrete v25 accessibility gap found.

---

# 11. P1 — concrete RU / EN Merchant route mismatch

Most length/style differences are not treated as errors.

v25 found two concrete route-identity mismatches that should be repaired before 1.0.

## 11.1 Veteran choice

Key:

`event.merchant.career.choose-route.choice.veteran.text`

RU currently describes **Merchant House**:

> Merchant House означает устойчивую работу нескольких договорённостей...

EN correctly describes the Veteran choice:

> Choose seasoned ordinary trade.

The RU line is attached to the wrong route concept.

**Repair:** rewrite one locale so both describe the Veteran choice.

Do not alter the choice ID or route mechanics.

---

## 11.2 Speculator / Smuggler choice

Key:

`event.merchant.career.choose-route.choice.speculator-smuggler.text`

RU currently describes **Merchant House / stable logistics**:

> Стабильная логистика ... Merchant House ...

EN correctly describes high-risk trade readiness:

> Choose typed high-risk trade readiness without a morality score or generic law system.

The RU line is attached to the wrong route concept.

**Repair:** rewrite one locale so both describe the Speculator / Smuggler choice and preserve the no-morality-system boundary.

---

# 12. P2 — Merchant RU / EN action-consequence parity review

The following lines are not direct contradictions, but RU and EN currently communicate materially different portions of the action consequence.

They should be aligned in the final copy-edit pass.

### Route readiness

- `event.merchant.routes.house-ready.choice.record.text`
- `event.merchant.routes.speculator-ready.choice.record.text`
- `event.merchant.routes.patron-ready.choice.record.text`

EN consistently says the action records readiness alongside other routes.

RU instead supplies route-specific explanatory prose and does not clearly state the same record/readiness consequence.

### Relationship trust

- `event.merchant.relationship.trust.choice.continue.text`

RU discusses what Rhetoric teaches.

EN says the action builds professional trust through another verifiable handoff.

This is likely a copy-placement mismatch rather than a lore issue.

### Optional-item defer actions

- `event.merchant.items.appraisal-scales.choice.defer.text`
- `event.merchant.items.manifest-case.choice.defer.text`
- `event.merchant.items.sample-kit.choice.defer.text`

EN clearly states the optional item is deferred and ordinary career play remains available.

RU instead describes epistemic/tool limits without explicitly expressing the defer consequence.

These are not mechanics bugs, but final RU / EN player-facing consequence parity should be restored.

---

# 13. D42 Night — semantic parity and caption closure

D42 adds 50 new bilingual localization entries.

All 50 have both RU and EN.

The important consent / relationship boundaries are preserved in both languages:

- voluntary Night contact;
- friendship does not require romance;
- privacy does not imply intimacy;
- Lust / Sexuality / confidence do not imply consent;
- Night choices do not grant career-route readiness;
- professional debriefs do not create evidence;
- ordinary Night does not displace Secret Debt forced Night.

No blocking semantic-strength mismatch was found.

## Caption gap

D42 adds 12 new presentation alt keys with RU and EN alt text but no matching `.caption` pair.

Missing caption keys:

- `presentation.static.lumber.night.foreman-social.caption`
- `presentation.static.hunter.night.field-debrief.caption`
- `presentation.static.hunter.night.senior-guide.caption`
- `presentation.static.guard.night.case-debrief.caption`
- `presentation.static.guard.night.partner.caption`
- `presentation.static.merchant.night.ledger-plan.caption`
- `presentation.static.merchant.night.supplier.caption`
- `presentation.static.assassin.night.handler-contact.caption`
- `presentation.static.prostitute.night.personal-continuation.caption`
- `presentation.static.satyr-maid.night.recurring-guest-private.caption`
- `presentation.static.tavern.night.traveler-private.caption`
- `presentation.static.prostitute.night.client-private.caption`

Accessibility impact:

- all images still have localized alt text;
- therefore these are **not inaccessible images**;
- but the accepted presentation renderer supports localized caption pairing, and these 12 are inconsistent with the established 1.0 convention.

Priority:

**P2 closure**

---

# 14. D42 optional tone-alignment candidates

These are not blockers because the accompanying body copy is explicit and safe.

However, EN labels are slightly broader than RU and may be worth aligning in a consent-sensitive surface.

### Satyr Maid recurring guest

RU:

`Поговорить с постоянным гостем наедине`

EN:

`Continue privately with the recurring guest`

RU explicitly says “talk”; EN “continue privately” is broader.

### Tavern recurring traveler

RU:

`Поговорить с постоянным путешественником наедине`

EN:

`Continue privately with the recurring traveler`

Same issue.

Suggested direction:

make the EN labels explicitly conversation-oriented, matching the already-safe body text.

Priority:

**P3 copy polish**

---

# 15. D50 / v23 presentation accessibility

Exact-head v24 executable QA already proved v23:

- checkout exact producer SHA;
- typecheck;
- validate;
- build;
- focused presentation tests 36 / 36;
- source inventory integrity;
- RU / EN alt parity;
- semantic presentation IDs;
- Palace firewall;
- 98 local presentation asset paths, 0 missing.

Therefore v23 has no missing-alt or inaccessible-slot blocker.

## Generic caption gap introduced by approved reuse

Two v23 mappings reuse generic media alt keys that currently have no caption pair:

- `media.stage.room.alt`
- `media.base.town.alt`

They are used by:

- `night/rent-room/default`
- `night/rest/default`

Required for strict caption convention:

- `media.stage.room.caption`
- `media.base.town.caption`

Again:

- alt coverage is complete;
- this is a caption-consistency repair, not an inaccessible-image repair.

Priority:

**P2**

---

# 16. Presentation accessibility summary

Across audited current / queued surfaces:

### Missing `alt`

**0**

### Missing `altKey`

**0**

### Referenced alt keys missing RU

**0**

### Referenced alt keys missing EN

**0**

### Missing caption pairs

- D42 Night: **12**
- v23 generic Night reuse: **2**

Total known caption closure gap:

**14**

No current audited presentation slot is inaccessible because of a missing accessible name.

---

# 17. Retired / stale localization audit

## 17.1 Retired Tavern ending IDs

The current combined D40+D41 definitions and presentation mapping no longer expose:

- `tavern-stay`
- `tavern-guild`
- `tavern-court`

as live ending slots.

Their old source-inventory presentation rows have already been removed from the current Chat 2 branch.

However localization residue remains.

### Migration-description keys

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`

These explicitly say that the endings are retired and migrated.

They may be retained if migration/debug UI still deliberately consumes them.

Otherwise they are cleanup candidates.

### Dead presentation localization

No matching current presentation slots exist, but these remain:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

These are strong stale-key candidates.

### Retired reward labels

Still present:

- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

Chat 5's identity audit states those unlocks are retired from active ownership.

Keep only if an explicit migration/history surface needs them.

Priority:

**P3 cleanup after migration tests**

Do not remove compatibility copy blindly.

---

## 17.2 Legacy `lumber-stay`

Do not classify these as stale yet:

- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`
- `unlock.vitality.label`

The ending remains live in the current combined catalog and presentation.

Its 1.0 status is owned by the active Chat 5 retirement-policy task.

---

# 18. Duplicate ending-localization namespace residue

The current combined localization includes six single-prefix Hard Work keys:

- `ending.merchant.hard-work.title`
- `ending.merchant.hard-work.description`
- `ending.merchant.hard-work.epilogue`
- `ending.artist-geisha.hard-work.title`
- `ending.artist-geisha.hard-work.description`
- `ending.artist-geisha.hard-work.epilogue`

For stable IDs:

- `ending.merchant.hard-work`
- `ending.artist-geisha.hard-work`

the current generic runtime consumer asks for:

- `ending.ending.merchant.hard-work.*`
- `ending.ending.artist-geisha.hard-work.*`

Therefore the six single-prefix records do **not** satisfy live runtime coverage.

Recommended repair:

1. decide which title/description wording is Product-authoritative if duplicate wording differs;
2. populate the live double-prefix namespace;
3. migrate the useful single-prefix epilogue copy into the live epilogue keys if accepted;
4. search migration/tests for explicit single-prefix references;
5. remove the single-prefix duplicates only after that check.

Priority:

**P2 namespace cleanup**

---

# 19. Result / ending epilogue closure accounting

For the 40 canonical ordinary-career endings on the current combined candidate:

- Hard Work: 10 total, **0** localized epilogues;
- D41: 14 total, **4** localized epilogues;
- D40: 16 total, **0** localized epilogues.

Total canonical ordinary endings with bilingual runtime epilogue:

**4 / 40**

Total missing:

**36 / 40**

This must be closed before treating Activity v17's global localized ending-screen consumer as release-ready.

Additional live-family accounting:

- Activity endings: **3 / 3 complete**
- Palace v19 endings: Palace packet is complete for title / description / epilogue
- Secret Debt: **0 / 3 epilogues complete**
- generic `guild-life` / `scholar-life`: **0 / 2 epilogues complete**
- `lumber-stay`: conditional on retirement policy

---

# 20. Exact pre-1.0 repair list

## P0 — release blockers

### A. Author final D40 ending copy

Add final RU / EN title + description + epilogue for all 16 D40 advanced endings.

**48 keys**

### B. Complete ordinary-ending epilogues outside D40

Hard Work:

**10 keys**

D41 missing epilogues:

**10 keys**

Subtotal:

**20 keys**

### C. Complete live generic prototype epilogues

If still live:

- `ending.guild-life.epilogue`
- `ending.scholar-life.epilogue`

**2 keys**

### D. Close `lumber-stay` policy

Not a blind localization task.

- if kept live: add its bilingual epilogue;
- if retired: preserve migration identity and retire live surface consistently.

---

## P1 — route/copy correctness

### E. Secret Debt ending epilogues

Add:

- `ending.ending.secret-debt.paid-freedom.epilogue`
- `ending.ending.secret-debt.bound-life.epilogue`
- `ending.ending.secret-debt.takeover.epilogue`

**3 keys**

### F. Fix two concrete Merchant wrong-route RU strings

- `event.merchant.career.choose-route.choice.veteran.text`
- `event.merchant.career.choose-route.choice.speculator-smuggler.text`

Do not change mechanics.

---

## P2 — accessibility / semantic parity closure

### G. D42 Night captions

Add the 12 caption keys listed in section 13.

### H. v23 generic media captions

Add:

- `media.stage.room.caption`
- `media.base.town.caption`

### I. Merchant action-consequence parity

Review / align the seven keys listed in section 12.

### J. Hard Work duplicate namespace

Resolve the six Merchant / Artist single-prefix duplicate records after live-key copy is complete.

---

## P3 — stale/tone cleanup

### K. Retired Tavern localization residue

After migration tests confirm no consumer:

- remove dead presentation alt/caption keys;
- remove migration title/description only if no history/debug surface consumes them;
- remove retired unlock labels only if no migration/history surface consumes them.

### L. D42 private-conversation labels

Align the two “Continue privately” labels to explicit conversation wording if Product wants exact consent-tone parity.

---

# 21. Deterministic localization-key workload

Excluding conditional `lumber-stay`, Merchant rewrites, and stale-key deletion, the known key-addition workload is:

- D40 ending final copy: 48
- Hard Work epilogues: 10
- D41 epilogues: 10
- generic guild/scholar epilogues: 2
- Secret Debt epilogues: 3
- D42 captions: 12
- v23 generic captions: 2

Total deterministic additions:

**87 bilingual localization keys**

This count intentionally excludes:

- `lumber-stay` until policy lock;
- rewrites of existing Merchant keys;
- deletion/migration of stale keys.

---

# 22. No-repair areas

The following do not need a v25-driven content rewrite:

- Palace v19 reveal ladder;
- Palace D49 epistemic wording;
- Activity ending title/description/epilogue copy;
- Activity ending accessibility;
- Secret Debt event/action consent copy;
- D46/D47 New Start+ package UI and ARIA generation;
- v23 alt / altKey / asset-path mapping;
- D41 ending title/description copy;
- current presentation alt-text bilingual coverage.

---

# 23. Recommended assembly ordering

To avoid shipping mixed-language final screens:

1. close D40 ending title/description/epilogue keys;
2. close Hard Work + D41 ordinary epilogues;
3. close Secret Debt epilogues;
4. resolve `guild-life` / `scholar-life` epilogues;
5. resolve `lumber-stay` policy;
6. assemble Activity v17 global localized ending-screen seam;
7. add D42/v23 caption closure;
8. perform Merchant semantic-copy repair;
9. clean retired/duplicate keys only after migration consumers are verified.

Do not use a runtime fallback workaround instead of authoring the missing final localization.

---

# 24. Final disposition

The localization/accessibility architecture is sound:

- existing localization records are bilingual;
- presentation alt coverage is complete;
- New Start+ accessible labels are bilingual;
- D49 lore discipline is preserved;
- Palace and Activity final packets are strong;
- v23 exact-head presentation QA is green.

But the **1.0 content surface is not localization-closed yet** because ending-owned copy is incomplete, especially D40 and global epilogues.

The repair is finite and can be completed without reopening mechanics, presentation engine, or Product lore.

**READY_FOR_LEADER_REVIEW**
