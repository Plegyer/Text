# Chat 3 — D38 Activity Ending Reachability / Pacing Audit v18

Status: **RESEARCH COMPLETE — READY FOR LEADER REVIEW**  
Owner: Chat 3  
Branch: `chat3/activity-ending-reachability-audit-v18`  
Frozen mechanics: `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`  
Frozen content/presentation: `chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`

Research-only task. No runtime/content changes were made.

> Final frozen SHA is reported after this documentation commit.

## Executive conclusion

All three D38 Activity endings are structurally reachable inside the locked 160-day run.

The requested reference target of **<=10 Activity entries** is healthy. A conservative prepared reference path uses **about 5 Activity entries per ending**, leaving substantial retry and detour headroom.

The requested **roughly Day-120 eligibility** is also credible as a reference pacing point, but it is not a natural hard minimum for all three endings:

- **Pathfinder** can become eligible materially earlier with focused preparation.
- **Preservation** can also become eligible materially earlier with focused School / preservation preparation.
- **Network** is the natural late member of the family because Restricted Sites is Year-3 gated and Network additionally needs two distinct network-marked anchors.

Therefore the current family is not calendar-unreachable. If Product wants all three to converge tightly around Day 120, the likely balance issue is **early Pathfinder/Preservation eligibility**, not insufficient time.

The dominant practical bottleneck is not Activity-entry count. It is **preparing at least one real relationship/contact route**, and for Network, preparing **two**.

## Locked pacing frame

The run is exactly 160 days:

- 4 years;
- 40 days per year;
- 4 seasons per year;
- 10 days per season.

Runtime calendar conversion:

- Year 2 begins at elapsed day 40, i.e. player-facing Day 41.
- Year 3 begins at elapsed day 80, i.e. player-facing Day 81.
- player-facing Day 120 is the end of Year 3.

D16 remains unchanged:

- ending eligibility is non-terminal;
- reaching eligibility does not end the run;
- explicit ending commit remains a separate player action.

This audit therefore measures **eligibility timing**, not forced completion timing.

## D36 Activity cost and field-time baseline

All four D36 regions still have:

- exactly **2 Energy** entry cost;
- `timePolicy: same_day`;
- exactly **6 Field Time** per entry;
- progress target 6.

Relevant region gates:

| Region | Earliest calendar gate | Other entry requirement |
|---|---:|---|
| Forest Frontier | Year 1 | none |
| Trade Corridor | Year 1 | none |
| Anomalous Reach | Year 2 | one of its authored prep/anchor conditions |
| Restricted Sites | Year 3 | one of its authored access/prep/previous-anchor conditions |

The Year-3 Restricted gate is the main reason Network naturally lands later than Pathfinder/Preservation.

## Common D38 eligibility pressure

Every Activity ending requires:

- >=3 of 4 regional anchors;
- >=2 distinct mini-game families;
- >=1 meaningful extracted Activity result;
- >=1 resolved Activity contact/companion thread represented by a regional Network mark;
- explicit commit after eligibility.

This means a character with no deliberate relationship/contact preparation is **not** a valid D38 reference build even if she can clear regional mechanics.

That is an intentional cross-system dependency, not a calendar failure.

## Activity-entry economics

Base daily Energy is 3.

Lodging effects:

- Normal room: 100 money, next-day Energy 3.
- Cheap lodging: 50 money, next-day Energy 3.
- Street: 0 money, next-day Energy 2 and Grooming -1.

Because Activity entry costs 2 Energy:

- after Normal/Cheap lodging, an Activity day normally leaves **1 Energy** for one ordinary 1-Energy action;
- after Street lodging, an Activity entry normally consumes the entire **2-Energy** day.

This makes Street a real pacing cost without making ordinary unbound Activity unreachable.

Five reference Activity-entry days are therefore small relative to 160 calendar days. The real economy pressure comes from mixing:

- paid lodging;
- School tuition;
- career/contact preparation;
- foregone work income on Activity-heavy days.

Starting money is 600. Starting-career base wages are roughly 13–15 before stat scaling, so continuous 100-money Normal lodging is not supported by low-stat work alone without deliberate income progression. Cheap lodging is much less severe but still consumes approximately a full low-stat three-shift day's base wages.

The reference paths below do **not** require consecutive Activity days.

## School and starter-career preparation

School is relevant because each paid lesson costs:

- 1 Energy;
- its listed tuition.

Useful examples:

- Literacy & Numbers: 300 money, Reason +4, Wits +2.
- Arcana: 500 money, Magic +4, Reason +4, Creativity +2.
- Field Craft: 400 money, Dexterity +3, Wits +3, Creativity +2.
- Etiquette & Presentation: 400 money, Manners +3, Grooming +3, Charm +2.

Three Arcana lessons are expensive at 1500 money, but they provide a clean authored preparation route for:

- Anomalous Reach access;
- Pattern/Ritual thresholds;
- the Undead Farm `school-research-ready` seam.

Night study is an alternative preparation channel but applies next-day Energy -1, so it exchanges money pressure for calendar/Energy pressure.

### Undead Farm as the strongest mid-prep baseline

Undead Farm is a starting career and is the cleanest conservative reference route because it can prepare both preservation and a real network-capable contact without waiting for a late-career unlock.

Useful milestones:

- first completed shift advances the early career;
- 8 completed shifts + basic production can reach Keeper-of-Process;
- a Winter Undead Farm shift can produce `farm_unstable_specimen`;
- the authored Farm sample flow can grant a Field Preservation Kit;
- preservation converts the unstable specimen into `farm_preserved_specimen`;
- the preserved specimen supplies the `preserved_farm_sample` capability;
- Arcana preparation can publish `school-research-ready`.

The Keeper relationship can progress from introduction to professional trust, then through a voluntary Night meeting to an accepted request. That accepted request is sufficient authored relationship preparation for the Anomalous Reach network contact route.

This gives a realistic mid-prep path without requiring Merchant, Hunter, or Assassin as the primary contact source.

## Low / mid / high preparation bands

### Low preparation

Definition for this audit:

- no deliberately accepted relationship utility/companion/request route;
- no dedicated late-career item package;
- at most light School preparation.

Expected result:

- regional anchors are still possible;
- Trade tracking is possible with modest Wits;
- Anomalous pattern work can become possible after Year 2 with modest stat/School preparation;
- **D38 common eligibility still fails** because no regional Network mark is produced;
- meaningful extraction may also remain unavailable if no preservation/sample/evidence capability was prepared.

Conclusion:

**Low prep is intentionally insufficient for a D38 ending.**

The failure mode is cross-system preparation, not the 160-day calendar.

### Mid preparation

Definition for this audit:

- one deliberately prepared starter-career contact, preferably Undead Farm Keeper;
- preservation capability / preserved Farm sample available;
- modest School preparation for Wits/Reason/Magic;
- for Network, one additional Year-2/Year-3 relationship/contact path prepared.

Expected result:

- all three endings can meet the <=10-entry target;
- reference paths below use about 5 Activity entries;
- Network is comfortably reachable in Year 3 if its second contact route was prepared before Restricted Sites work begins.

Conclusion:

**Mid prep is the intended reference band.**

### High preparation

Definition for this audit:

- multiple career utility relationships already resolved;
- Merchant sample/access capabilities and/or Assassin intel/evidence/disguise capabilities available;
- School thresholds already covered;
- field preservation capability already owned.

Expected result:

- multiple goals can be folded into the same Activity entry;
- practical totals fall to roughly **3–5 entries**, depending on which regional route is used;
- D38 has large retry headroom under the <=10 target.

Conclusion:

**High prep risks early Pathfinder/Preservation eligibility more than late failure.**

## Pathfinder reference scenario

Locked extra requirement:

- >=2 Pathfinder-marked anchors in distinct regions;
- >=1 successful Tracking Triangulation.

### Conservative mid-prep reference: about 5 Activity entries

1. **Forest Frontier** — secure Forest anchor through an ordinary prepared success route.
2. **Trade Corridor / Caravan Spur** — complete Tracking Triangulation and use the triangulated shortcut:
   - Trade anchor;
   - Tracking family;
   - Pathfinder mark.
3. **Anomalous Reach / Echo Ridge** — complete Pattern/Ritual Circuit and stabilized-fold shortcut:
   - Anomalous anchor;
   - Pattern family;
   - second Pathfinder mark.
4. **Anomalous Reach / Preserved Basin** — secure the meaningful extracted sample.
5. **Anomalous Reach / Old-Boundary Rift** — use the prepared Keeper contact and return successfully so the regional Network mark can be recorded.

Result:

- 3 anchors: Forest + Trade + Anomalous;
- 2 mini-game families: Tracking + Pattern;
- meaningful extraction;
- resolved network-capable contact;
- 2 Pathfinder-marked anchors;
- explicit commit still separate.

The Trade tracking route can complete tracking + Pathfinder mark + regional success in one entry because its authored mini-game and shortcut progress fit inside the six Field Time budget.

The Anomalous Echo route likewise fits Pattern completion + Pathfinder shortcut + success within one prepared entry.

### Pacing judgment

**PASS.**

Pathfinder is comfortably reachable well under 10 entries. With focused prep it may be eligible significantly before Day 120.

## Preservation reference scenario

Locked extra requirement:

- >=2 Preservation-marked anchors in distinct regions;
- successful Pattern/Ritual Circuit;
- research-grade result.

### Conservative mid-prep reference: about 5 Activity entries

1. **Forest Frontier / Logging Road** — use preservation capability:
   - Forest anchor;
   - first Preservation mark.
2. **Trade Corridor / Caravan Spur** — complete Tracking family and secure Trade anchor.
3. **Anomalous Reach / Echo Ridge** — complete Pattern/Ritual Circuit and secure Anomalous anchor.
4. **Anomalous Reach / Preserved Basin** — secure sample:
   - meaningful extraction;
   - second Preservation mark.
5. **Anomalous Reach / Old-Boundary Rift** — use prepared Keeper relationship to produce the common Network mark.

After Anomalous anchor + sample + Pattern completion are present, the existing producer can publish:

`activity.anomalous-reach.result.research-grade`

No extra Activity entry is required merely to create that research-grade fact.

Result:

- 3 anchors;
- Tracking + Pattern families;
- meaningful extraction;
- one real network-capable contact;
- two Preservation marks;
- research-grade result.

### Pacing judgment

**PASS.**

Preservation is comfortably inside the <=10 target and can naturally mature during Year 2. Day 120 is generous rather than tight.

## Network reference scenario

Locked extra requirement:

- >=2 Network-marked anchors in distinct regions;
- successful Infiltration/Suspicion;
- network-capable Activity contact.

Network has the strongest cross-system preparation burden because each regional Network mark is backed by a real authored relationship:

- Forest -> Hunter senior guide;
- Trade -> Merchant supplier;
- Anomalous -> Undead Farm Keeper;
- Restricted -> Assassin Handler.

A contact-thread fact by itself is not enough. The corresponding relationship acceptance/resolution must exist and the successful regional return must be shared.

### Conservative mid-prep reference: about 5 Activity entries

Prepare two contacts before the final Year-3 push:

- Undead Farm Keeper;
- Merchant Supplier or another second authored regional relationship.

Then:

1. **Trade Corridor / contact-capable route** — secure Trade anchor and share the successful return to produce Trade Network mark.
2. **Anomalous Reach / Echo Ridge** — secure Anomalous anchor + Pattern family.
3. **Anomalous Reach / Old-Boundary Rift** — use accepted Keeper request and successful return to produce Anomalous Network mark.
4. **Restricted Sites / Service Ring** — complete Infiltration/Suspicion and secure Restricted anchor.
5. **Anomalous Preserved Basin** or another prepared authored extraction route — secure the common meaningful extraction requirement if it was not already folded into Trade/Restricted.

Result:

- 3 anchors: Trade + Anomalous + Restricted;
- 2 mini-game families: Pattern + Infiltration;
- meaningful extraction;
- >=2 Network-marked anchors;
- explicit commit still separate.

### Restricted infiltration preparation

Restricted Sites itself opens in Year 3 with a prior Trade or Anomalous anchor, even without Assassin career prep.

However, the successful Infiltration/Suspicion route has an additional practical preparation constraint.

After the initial observation:

- an Assassin intel fact can provide a clean timing window;
- an Assassin context disguise can provide the disguise window;
- the raw timing window raises Suspicion too high for the clean-handoff branch;
- raw timing can still reach the evidence-secure outcome if the Evidence Case capability was prepared.

Therefore the Region entry gate alone should not be mistaken for a complete Network-ending readiness gate.

### Pacing judgment

**PASS WITH PREP DEPENDENCY.**

Network is naturally the latest D38 ending. Year 3 begins on player-facing Day 81, leaving roughly 40 days before the requested Day-120 reference point and roughly 80 days before the run ends.

The bigger risk is failing to prepare two qualifying relationships, not running out of Activity entries or calendar days.

## High-prep entry compression

With late-career capabilities and relationships already prepared, one Activity entry can satisfy several requirements simultaneously.

Examples:

- Trade Customs can combine meaningful extraction and a supplier contact on the same successful regional route.
- Anomalous Echo can combine Pattern completion, Pathfinder classification, and anchor.
- Restricted Service Ring can combine Infiltration completion, Pathfinder classification, and anchor when intel/disguise prep exists.
- Restricted evidence routes can combine Infiltration completion, meaningful extraction, and Preservation classification when evidence handling exists.

Therefore high-prep totals around **3–5 Activity entries** are plausible.

This is far below the requested <=10 target and leaves room for failed attempts.

## Day-120 reference judgment

### Pathfinder

- not calendar-gated to Day 120;
- naturally possible in Year 2 with deliberate prep;
- Day 120 gives ample retry/relationship headroom.

### Preservation

- not calendar-gated to Day 120;
- naturally possible in Year 2 with deliberate School/preservation prep;
- Day 120 gives ample headroom.

### Network

- Restricted Sites cannot begin before Year 3;
- therefore Network is the best natural anchor for a Day-120 family pacing target;
- a prepared build has roughly 40 Year-3 days before Day 120.

Overall:

**Day 120 is a safe reference eligibility target, not a shared minimum.**

If Product wants a tight common timing band, Pathfinder/Preservation may need pacing review later. This v18 research task does not recommend changing their mechanics without a separate balance decision.

## Lodging pressure scenarios

### Normal lodging

- next-day Energy remains 3;
- Activity leaves 1 Energy;
- 100 money/night creates heavy economy pressure;
- repeated School + Activity + Normal room requires substantial work income.

Reachability:

**Calendar-safe, economy-expensive.**

### Cheap lodging

- next-day Energy remains 3;
- Activity leaves 1 Energy;
- 50 money/night is materially easier;
- still requires income planning when mixed with 300–500 money School lessons.

Reachability:

**Healthy reference case.**

### Street

- next-day Energy becomes 2;
- Activity consumes all available Energy;
- Grooming also loses 1 per street night.

Reachability:

**Still possible while unbound**, but every Activity entry becomes effectively the whole daytime Energy budget.

For the five-entry reference paths this does not threaten the 160-day calendar, but it increases opportunity cost and can interfere with grooming-sensitive late careers.

## Camp interaction

D8 permits Camp for multi-day expeditions.

The four current D36 regions audited here are all authored as:

`timePolicy: same_day`

and none of their definitions/options reference Camp.

Therefore:

- Camp is **not required** for any current D38 reachability path;
- Camp does not currently accelerate or block D38;
- future conversion of any region to multi-day Activity would require a new pacing audit.

## Secret Debt interaction

Product authority D19 says:

- while bound, all 10 ordinary professions are domain-locked;
- School remains available;
- Large Activity remains available;
- forced Night occurs every night;
- voluntary Night is suppressed;
- next-day Energy is reduced by 1.

The historical v18 worker branch does not contain the final Secret Debt runtime, so this interaction cannot be claimed as executable proof here.

At the product-contract level:

- base Energy 3 with forced Night -1 implies 2 usable Energy before other penalties;
- a 2-Energy Activity entry therefore remains possible but consumes the whole daytime Energy budget;
- ordinary-career locking makes **pre-binding career/item/contact preparation** especially important.

### Integration risk: Street + forced Night

Street lodging already applies next-day Energy -1.

If current-main Secret Debt integrates this additively with the forced Night -1, a base-3 character would reach only 1 usable Energy and could no longer pay a 2-Energy Activity entry.

That would conflict with D19's explicit rule that Large Activity remains available while bound.

Therefore current-main assembly/QA should explicitly verify one of the following:

- the two penalties do not stack into Activity lockout; or
- another authored Secret Debt rule preserves the 2-Energy Activity entry floor while maintaining forced-Night precedence.

This is the most important integration risk found by v18.

It is not changed on this research branch.

## Strong Meta reward interaction

The three D38 rewards are Specialist-class and selectable, not automatic.

They must **not** be assumed when proving first acquisition of their own ending.

Replay effects:

### Surveyor's Atlas

- can remove exactly one 1-Field-Time survey/discovery cost per region per run;
- maximum direct saving 4 Field Time;
- does not reduce the 2-Energy Activity entry;
- does not unlock regions or bypass gates.

Reachability effect:

**convenience / retry margin, not calendar bypass.**

### Field Archive Protocol

- can secure a legally obtained eligible result;
- does not create extraction;
- does not waive acquisition requirements.

Reachability effect:

**failure protection, not eligibility creation.**

### Expedition Contact Network

- can expose one authored lateral introduction per normally unlocked region;
- does not bypass region unlock, relationship requirements, Palace, Secret Debt, or ending gates.

Reachability effect:

**route flexibility, not automatic Network eligibility.**

D28 remains intact:

- at most two active Specialists total;
- no Activity-only bonus slot.

## D23 Palace firewall

The D38 ending conditions contain no Palace requirement and no ordinary Hard Work requirement.

Palace qualification remains:

- permanent 10/10 ordinary Hard Work completion;
- all ten Hard Work packages active in the current New Start+ life;
- automatic Day-1 invitation.

Nothing in Activity can substitute for that.

Conversely, Palace access does not satisfy:

- Activity anchors;
- mini-game families;
- meaningful extraction;
- Activity relationship/contact requirements;
- Activity ending commit.

The two systems can coexist in one life but remain mechanically separate.

## Legacy seam warning: do not use as reference proof

`forest.collect-field-kit` currently depends on legacy flag:

`school.enrolled`

The modern typed School lesson path does not obviously publish that flag in the core School runtime inspected for this audit.

Therefore the main reference paths above do **not** rely on that action for preservation capability.

The Undead Farm Winter sample/kit path is used instead because its authored requirements are explicit in current branch content.

This is a content seam worth preserving in future QA, but v18 makes no runtime/content change.

## Reference entry-count summary

| Ending | Low prep | Mid-prep reference | High prep | <=10 target |
|---|---|---:|---:|---|
| Pathfinder | blocked by contact/extraction prep | ~5 | ~3–5 | PASS |
| Preservation | blocked by contact/extraction prep | ~5 | ~3–5 | PASS |
| Network | blocked by two-contact prep + late infiltration prep | ~5 | ~4–5 | PASS |

The counts are **reference route counts**, not executable exhaustive solver minima.

They intentionally leave space for:

- one or more failed entries;
- different route choices;
- delayed relationship scenes;
- economy recovery days.

## Risk ranking

### R1 — Secret Debt + Street Energy stacking

Severity: **High integration risk**

Reason:

potential violation of D19 Activity-availability guarantee if two -1 next-day Energy penalties stack from base 3.

Action:

current-main integration QA must test bound Street nights followed by 2-Energy Activity entry.

### R2 — Network relationship preparation

Severity: **Medium pacing risk**

Reason:

Network needs two real regional Network marks. A player who delays relationship utility/companion/request decisions can reach Year 3 with enough Activity access but remain ending-ineligible.

Action:

preserve clear UI/readability that Network is a relationship-backed ending, not just an infiltration ending.

### R3 — Early Pathfinder / Preservation

Severity: **Low/Medium balance risk**

Reason:

strong preparation can produce these well before Day 120.

Action:

only adjust if Product wants the three endings to cluster tightly around the same calendar window.

### R4 — Legacy `school.enrolled` preservation seam

Severity: **Low integration/content seam**

Reason:

do not use it as sole proof of preservation-kit reachability.

Action:

retain the explicit Undead Farm path in reachability QA.

## Static structural checks performed

Repository-level checks on the frozen v17 base confirmed:

- all four D36 regions have entry cost 2;
- all four are same-day Activity;
- all four have six Field Time;
- Anomalous Reach is Year-2 gated;
- Restricted Sites is Year-3 gated;
- current D38 ending mechanics contain no Palace dependency;
- current D38 ending mechanics contain no ordinary Hard Work dependency;
- current D38 ending mechanics contain no Secret Debt dependency;
- current D38 ending mechanics contain no Activity XP dependency;
- current four-region Activity content contains no Camp mechanic.

No runtime or content file was modified.

## Validation limits

This is a static repository-truth reachability/pacing audit, not a full state-space simulation.

The GitHub connector does not provide a shell runner on this worker branch, and the task explicitly forbids full CI.

Therefore v18 does not claim execution of:

- full CI;
- exhaustive route solver;
- current-main Secret Debt integration runtime;
- deterministic 160-day bot playthrough.

Those remain appropriate follow-up QA/assembly checks.

## Recommendation to Leader

Accept the D38 family as **160-day reachable** with the current locked mechanics.

Use these Product/QA expectations:

- <=10 Activity entries remains a healthy ceiling;
- ~5 entries is a credible mid-prep reference for all three endings;
- Day 120 is a healthy reference point, especially for Network;
- do not add a hard Day-120 gate merely to synchronize the family;
- treat relationship preparation as a deliberate D38 pillar;
- explicitly test Secret Debt + Street Energy stacking on current main before calling bound-Activity reachability closed.

## Disposition

**READY_FOR_LEADER_REVIEW**
