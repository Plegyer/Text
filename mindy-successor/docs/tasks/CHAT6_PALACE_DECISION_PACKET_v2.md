# Chat 6 — Palace Decision / Dependency Packet v2

Status: **READY FOR LEADER DECISION PACKET**
Owner: Chat 6 / Palace Producer
Packet branch: `chat6/palace-decision-packet-v2`
Exact packet base: `6a6029df8e9c007227da0173eb499d59ba51648e`
Preserved production foundation: `chat6/palace-complete-reset-v1` @ `8919a3686c1952d700c4c1377130918e0e181fa3`
Historical authored source only: PR #247 @ `5a2e72cc530e4edbe41d0d03e4904e2272614e9e`

This packet is analysis/decision support only. It does not grant authority to implement any proposal below.

## 0. Re-audit baseline

The exact packet base already contains:
- shipped Artist/Geisha complete-career assembly;
- shipped voluntary Prostitute complete-career assembly;
- all ten ordinary shift action identities;
- all ten ordinary Hard Work endings at `completed_shifts >= 50`;
- the derived Palace Meta unlock from all ten unique ordinary Hard Work entries;
- current schema-4 ending eligibility -> explicit commit -> completion -> exactly-once Meta reward lifecycle.

The next main commit after this packet base is coordination / Secret Debt authority work. It does not supply new Palace runtime authority, so this packet intentionally stays on the exact base named by the Chat 6 pointer.

The frozen Assassin producer candidate is:
- PR #252;
- exact head `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642`;
- already handed to Chat 2;
- producer branch must not move.

## 1. Current shipped contracts relevant to Palace

### 1.1 Progression stats

Current progression stat IDs are exactly:
- `strength`
- `endurance`
- `dexterity`
- `reason`
- `magic`
- `creativity`
- `wits`
- `charm`
- `sociability`
- `manners`
- `grooming`
- `sexuality`

Each current progression stat is schema-capped to integer `0..100`.
Lust is separate and is not one of these 12.

Current condition comparison operators are:
- `gte`
- `lte`
- `eq`

There is no `gt` condition operator.

### 1.2 Palace unlock

Current engine authority is already exact:

`palaceAvailable(meta) = every ordinaryHardWorkCareer is present in meta.hardWorkProgress`.

The ordinary ledger is exactly:
`lumber`, `satyr-maid`, `undead-farm`, `tavern`, `hunter`, `guard`, `merchant`, `artist-geisha`, `assassin`, `prostitute`.

`metaUnlock:palace` is derived from that rule. Secret Debt cannot substitute.

### 1.3 Existing domain leaves/effects

Current condition system can already read:
- `careerFact`, `careerStage`, `careerCounter`, `careerChoice`;
- `questFact`, `questStage`, `questCounter`, `questChoice`;
- `relationshipFact`, `relationshipStage`, `relationshipCounter`, `relationshipChoice`;
- `worldFact`;
- `itemCapability`;
- `metaUnlock`, `metaEndingCompleted`, `metaHardWork`;
- all 12 progression stats.

Current effect system can already write Palace-local career/quest/relationship facts, choices, counters, transitions, items and world facts without a new state framework.

### 1.4 Meta reward and NG+ surface

Current ending Meta rewards support only:
1. `unlock`;
2. `hardWork` for the ten ordinary careers.

`activeLegacyPerks` already persists in Meta and survives new lives, but there is no current Palace/x2 consumer for it.

Current new-life starting order is:
1. every progression stat starts at 1;
2. ordinary Hard Work starting bonuses are added, clamped to 100;
3. the run is created with 10 manual allocation points still unspent;
4. allocation happens later during character creation and is also clamped by the current stat setter.

This makes D18 x2 ordering a real Product choice rather than a missing implementation detail.

### 1.5 Shipped relationship / item / Night patterns

Current production proves Palace does not need new global frameworks for these hooks.

Shipped relationship machines include:
- `artist-geisha.mentor`;
- `prostitute.recurring-client`;
- professional contacts for Lumber, Satyr Maid, Undead Farm, Tavern, Hunter, Guard and Merchant.

Shipped capability-item examples include:
- Artist: `artist_formal_presence`, `artist_performance_ready`, `artist_handle_invitation`;
- Guard: `official_guard_access`, `guard_sealed_pass`;
- Merchant: `merchant_appraise_goods`, `merchant_verify_manifest`, `merchant_handle_samples`;
- Prostitute: formal-presence / private-room / client-token / evidence capabilities.

Shipped optional Night patterns include:
- career-stage-gated work choices;
- relationship-stage-gated optional meetings/reviews;
- Artist rehearsal/salon/mentor review;
- voluntary Prostitute client follow-up.

No Palace-specific forced Night rule is required by current Palace authority.

---

# P1 — Prince confrontation victory signal

## What is actually blocked

D18 requires Prince victory before Return Home, but does not define the confrontation mechanics, lore, or the runtime signal consumed by ending eligibility.

The boolean victory signal can be decided independently from the confrontation mechanics.

## Option A — Palace-local career fact

Whatever future confrontation implementation resolves victory writes one Palace career fact. Return Home reads that Palace career fact.

Uses existing:
- `addCareerFact`;
- `careerFact` condition.

Advantages:
- no shared framework change;
- local ownership;
- reload-safe through normal career state;
- does not expose Prince state globally.

Cost:
- requires an authorized Palace career identity/fact identity before binding.

**Technically simplest proposal: A.**

## Option B — dedicated confrontation quest fact

Model the confrontation as a Palace-owned quest/state machine. Victory is a quest fact or terminal quest stage.

Uses existing:
- quest machine;
- `addQuestFact` / `questFact`;
- quest stages/transitions.

Advantages:
- best fit if confrontation itself has multiple resumable phases;
- keeps combat/social/etc. implementation detail out of the Palace career stage machine.

Cost:
- more authored/runtime surface than a single fact.

## Option C — world fact

Victory writes a world fact and Return Home reads it.

Advantages:
- easy cross-system reuse if victory changes the wider world.

Cost:
- creates global coupling before Product says Prince victory should matter outside Palace.

## Smallest Product question

**Must Prince victory be visible outside the Palace career?**

- **No** -> use Option A.
- **Yes, because the confrontation is a separate staged route** -> Option B.
- **Yes, as a wider-world state** -> Option C.

This question does not require deciding the Prince name, lore or confrontation mechanics.

---

# P2 — “all 12 progression stats strictly >90%” raw semantics

## What is actually blocked

Current stats are integer `0..100`, but D18 deliberately does not say that current raw units are the canonical percentage representation.

## Option A — current 0..100 raw scale is the percentage scale

Encode each D18 stat condition as `gte 91`.

Because current values are integers and capped at 100, this is exactly “strictly >90” under this interpretation.

Advantages:
- zero schema change;
- zero new compare operator;
- ending conditions stay fully data-driven;
- existing eligibility engine works unchanged.

Cost:
- Product explicitly commits current raw units to percentage semantics for D18.

**Technically simplest proposal: A.**

## Option B — engine helper normalizes against current cap

Keep D18 as a semantic percentage check in code:
`raw / currentCap * 100 > 90`.

Today this produces the same result as Option A because cap is 100.

Advantages:
- preserves conceptual percentage semantics if stat caps ever change.

Cost:
- introduces special Palace eligibility code outside ordinary condition data;
- requires an authoritative cap source.

## Option C — add `gt` to the shared condition schema

Then content can author `stat > 90` directly.

Advantages:
- literal expression of D18.

Cost:
- unnecessary shared schema expansion;
- migration/validation/test surface for no current functional gain.

## Smallest Product question

**For D18, may the current integer 0..100 progression-stat value be treated directly as its percentage?**

- **Yes** -> Option A, twelve existing `gte 91` conditions.
- **No** -> Product must define the normalization/cap contract; Option B is preferred over changing the shared compare schema.

---

# P3 — permanent optional NG+ x2-all-12-stats

## What is actually blocked

D18 fixes the reward outcome but leaves open:
- persistent capability identity;
- selection surface;
- x2 order relative to ordinary Hard Work starting bonuses and the 10 creation allocation points;
- cap interaction.

The current engine already has:
- exactly-once ending Meta application;
- `unlock` Meta rewards;
- persisted `activeLegacyPerks`;
- current 100 stat cap.

It does **not** have a Palace x2 perk consumer.

## Option A — Meta unlock + activeLegacyPerk; x2 before manual allocation

True Ending completion grants an ordinary Meta `unlock` capability.
The existing pre-run legacy-perk selection surface is extended so the player may activate that capability through `activeLegacyPerks`.

On new life:
1. base 1;
2. ordinary Hard Work bonuses;
3. optional x2;
4. clamp to 100;
5. player spends the normal 10 allocation points.

Advantages:
- smallest change around current `freshSave`;
- uses existing persistent Meta structures;
- no new Meta reward kind.

Cost:
- the 10 manually allocated points are not doubled.

**Technically simplest implementation proposal: A.**

## Option B — Meta unlock + activeLegacyPerk; x2 after manual allocation

Grant/select exactly as Option A, but apply x2 when creation is finished:

1. base 1;
2. ordinary Hard Work bonuses;
3. player spends 10 allocation points;
4. optional x2;
5. clamp to 100.

Advantages:
- doubles the completed starting build, including the player's allocation.

Cost:
- adds a creation-completion modifier hook rather than staying inside `freshSave`.

## Option C — allow x2 to exceed current 100 cap

Apply either order but widen the stat model above 100.

Advantages:
- preserves literal doubling at high starting values.

Cost:
- changes the shared stat schema, consumers, balancing and presentation;
- largest possible blast radius.

Not recommended without a broader stat-cap decision.

## Smallest Product questions

1. **Does x2 apply before or after the 10 manual creation allocation points?**
2. **Does the existing 100 cap still apply after x2?**
3. **May the option use the existing selectable `activeLegacyPerks` model after True Ending grants an unlock?**

Recommended low-risk answer:
- before allocation;
- cap 100;
- yes, use `activeLegacyPerks`.

This remains a **proposal**, not authority.

---

# P4 — Palace entry after Meta unlock

## What is actually blocked

`metaUnlock:palace` already exists. Product has not chosen whether an unlocked new life can start Palace work immediately or must receive an invitation.

## Option A — direct work availability after Meta unlock

A Palace work action is gated directly by:
`{kind:'metaUnlock', unlock:'palace', present:true}`.

No invitation fact/item is required for base entry.

Advantages:
- smallest runtime and authored surface;
- existing action eligibility supports it;
- exact 10/10 rule remains the only Meta prerequisite;
- does not reuse Artist Court Invitation as an unlock.

**Technically simplest proposal: A.**

## Option B — post-unlock invitation event

After `metaUnlock:palace`, a normal optional/latched Palace event gives an invitation/entry fact. Work becomes available after that fact.

Advantages:
- gives the hidden career a clear authored reveal moment;
- still cannot bypass 10/10 because the event itself requires the Meta unlock.

Cost:
- extra event + Palace-local entry fact;
- Product must decide when it appears.

## Option C — post-unlock capability item

After 10/10, an event gives a Palace-local invitation/seal capability item; work requires that capability.

Advantages:
- makes entry tangible and item-driven.

Cost:
- more IDs, acquisition and presentation;
- item becomes a mandatory gate rather than an optional capability hook.

## Smallest Product question

**After 10/10 Meta unlock, is Palace work available immediately in a new life, or only after an invitation?**

- immediate -> A;
- invitation -> B unless Product specifically wants a mandatory item, then C.

Artist `artist_invitation_token` remains a legacy-sensitive possibility only and must never substitute for the 10/10 unlock.

---

# P5 — Palace progression topology / stages

## What is actually blocked

The Palace draft requires:
- repeatable Palace work;
- separate Palace career progression;
- build checks;
- at least one external fact;
- decisions;
- legacy-sensitive opportunities.

The historical P0..P5 names are explicitly placeholders.
No exact shift counts or promotion thresholds are locked.

## Option A — compact evidence-driven three-stage machine

Use three internal progression positions:
1. entry;
2. established;
3. outcome-ready.

Transitions are event/evidence-driven rather than numeric-shift thresholds.

To reach outcome-ready, the career must have evidence from the already locked categories:
- real Palace work;
- build check;
- external fact;
- Palace decision;
- legacy-sensitive opportunity.

Advantages:
- no invented numbers;
- real repeatable work still matters;
- smallest machine;
- current career machine framework supports it unchanged.

**Technically simplest proposal: A.**

The labels above are descriptive proposal vocabulary, not approved runtime IDs.

## Option B — expanded draft-shaped machine

Use roughly the draft's six progression positions:
- outsider/invited;
- probation;
- trusted;
- chosen sphere;
- inner court;
- outcome-ready.

Still use evidence-driven transitions and no numeric thresholds until Product authorizes them.

Advantages:
- richer Palace career arc;
- closer to draft intent.

Cost:
- more authored events/transitions;
- several placeholder stage identities become production decisions.

## Option C — shift-count stage ladder

Promote through stages using exact completed-shift thresholds plus route facts.

Advantages:
- transparent progression.

Cost:
- requires Product to invent/approve exact numeric thresholds now;
- explicitly blocked by current authority.

## Smallest Product question

**May Palace use an evidence-driven progression machine with no numeric shift thresholds?**

- **Yes** -> Option A is the smallest production topology.
- **No** -> Product must supply stage topology and exact thresholds before implementation.

---

# P6 — Service Life / Court Power / Inner Truth rewards and Palace Hard Work

## What is actually blocked

The three outcome families are locked and distinct.
Their exact rewards are open.
Whether Palace itself contributes a new Hard Work entry is open.

Current Meta reward schema can already express:
- no Meta reward: explicit `metaRewards: []`;
- an `unlock` reward;
- ordinary-career `hardWork` only.

It cannot currently express `hardWork:palace` because the Hard Work reward career enum is the ordinary ten.

## Option A — completion-only non-True endings

Service Life, Court Power and Inner Truth use explicit `metaRewards: []`.

Advantages:
- exactly matches current endings that intentionally have no permanent Meta modifier;
- no invented reward meanings;
- no shared schema change.

**Technically simplest proposal: A.**

## Option B — one permanent unlock per outcome family

Each ending grants an existing-kind `unlock` Meta reward with a Product-approved meaning.

Advantages:
- provides replay value / future starting options without new reward infrastructure.

Cost:
- Product must define three reward meanings and IDs before implementation.

## Option C — make Palace itself a Hard Work source

Extend `metaRewardSchema` beyond the ten ordinary careers and add Palace Hard Work semantics.

Advantages:
- creates another reusable meta achievement.

Cost:
- shared schema/meta change;
- current Palace unlock does not need it;
- explicitly open in the design.

Not recommended as a default.

## Smallest Product questions

1. **Should Service Life / Court Power / Inner Truth be completion-only, or each grant a permanent Meta reward?**
2. **Should Palace itself ever add Hard Work progress?**

Recommended low-risk answer:
- completion-only for the three non-True endings;
- no `hardWork:palace` unless a future Meta design explicitly needs it.

---

# P7 — Relationship / item / Night binds

These can all use existing shipped frameworks. The blockers are content/product identity choices, not architecture.

## P7-R — Relationships

### Option R-A — role-based Palace-local relationship machines

Create separate Palace-local relationships for the draft roles:
- professional patron;
- rival;
- servant/official contact;
- optional romance.

Use generic role identity, not named Prince/ruler lore.

Optional romance is never required for career completion.

Advantages:
- matches the draft directly;
- current relationship machine framework supports it;
- no single ruler owns the profession.

**Technically simplest draft-faithful proposal: R-A.**

### Option R-B — three professional relationships first; romance deferred

Ship patron / rival / staff-or-official contact and keep romance as later content.

Advantages:
- smaller first Palace slice.

Cost:
- delays one explicitly designed relationship family.

### Option R-C — one combined “court contacts” relationship

Advantages:
- least data.

Cost:
- flattens patron/rival/staff distinction and weakens replay value.

Not recommended.

### Smallest Product question

**May Palace relationships use generic role-based NPC identities with optional romance separate and non-required?**

A “yes” resolves the naming/lore blocker without requiring Prince identity.

## P7-I — Items

### Option I-A — existing shipped capability items only as optional legacy branches

Palace may read already shipped capabilities from previous careers as optional legacy-sensitive opportunities.

Examples available on the packet base include Artist formal/invitation capabilities, Guard access/sealed-pass capabilities and Merchant document/appraisal capabilities.

Important:
- none of them unlock Palace;
- none is mandatory for base Palace entry;
- frozen Assassin-only items are not treated as shipped facts.

Advantages:
- zero new item IDs;
- makes past careers materially useful.

**Technically simplest proposal: I-A for the first bind.**

### Option I-B — new Palace-local capability items

Add Palace-local invitation/seal, formal outfit, archive key, ceremonial component, and/or proof/document items.

Advantages:
- matches the Palace draft item vocabulary directly.

Cost:
- exact item IDs, acquisition and action gates must be approved.

### Option I-C — hybrid

Use shipped legacy items for optional paths and later add Palace-local items for Palace-only access.

Best long-term breadth, but more scope.

### Smallest Product question

**For the first Palace production bind, may items be optional legacy capabilities from already shipped careers, with Palace-local items deferred?**

- yes -> I-A;
- no -> Product must select which Palace-local capability item is mandatory first.

## P7-N — Night

### Option N-A — one voluntary Palace work-context Night choice

A normal `nightChoices` entry is gated by Palace career stage and writes only Palace-local progress/fact.

Examples of the same shipped pattern:
- Artist rehearsal/salon;
- Satyr Maid staff debrief;
- Tavern house notes.

Advantages:
- no NightFlow framework change;
- no forced interception;
- clearly profession-specific.

**Technically simplest proposal: N-A.**

### Option N-B — relationship-gated optional Night contact

Use the same pattern as Artist mentor review / voluntary Prostitute client follow-up.

Advantages:
- relationship content and Night content reinforce each other.

Cost:
- depends on which Palace relationship ships first.

### Option N-C — no Palace-specific Night choice

Smallest code, but leaves the Palace slice without a profession-specific Night hook.

Not recommended for final whole-career acceptance.

### Smallest Product question

**May Palace have one voluntary, non-forced work-context Night choice using the existing `nightChoices` framework?**

Recommended answer: yes.

---

# 8. Natural 10/10 dependency audit

## 8.1 Shipped base

At exact base `6a6029df8e9c007227da0173eb499d59ba51648e`:

All ten ordinary IDs already have:
- a `<career>.shift` action;
- a production Hard Work ending;
- Hard Work eligibility `completed_shifts >= 50`;
- an exactly-once `hardWork:<career>` Meta reward.

Current all-ten availability smoke proves:
- starter three are available at run start;
- all ten become available through their stat gates at max stats;
- all ten become available through the current Year-3 fallback;
- save/reload preserves availability.

The generic Palace smoke proves:
- duplicate Hard Work does not substitute;
- Secret Debt does not substitute;
- exactly ten unique ordinary Hard Work entries expose Palace.

That smoke accelerates careers to 49 shifts, so it is not by itself a natural ten-life acceptance proof.

## 8.2 Artist/Geisha — shipped and naturally proven

Shipped natural acceptance:
- waits to the Year-3 fallback;
- performs real `artist-geisha.shift` actions;
- crosses all four seasons;
- reaches 50 real completed shifts;
- exposes `ending.artist-geisha.hard-work`;
- keeps eligibility non-terminal;
- commit does not grant Meta;
- completion grants `hardWork:artist-geisha`;
- save/reload and new-life persistence are covered.

Status: **natural prerequisite proven on shipped base**.

## 8.3 Voluntary Prostitute — shipped and naturally proven

Shipped natural acceptance:
- waits to Year 3;
- performs real voluntary `prostitute.shift` actions;
- completes four-season/refusal-safe client flow;
- reaches 50 real completed shifts;
- exposes `ending.prostitute.hard-work`;
- commit remains non-rewarding;
- completion grants `hardWork:prostitute`;
- save/reload and new-life persistence are covered.

Status: **natural prerequisite proven on shipped base**.

## 8.4 Assassin — frozen candidate, not yet shipped on packet base

Frozen candidate `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642` has a focused natural acceptance test that:
- waits to Year 3;
- performs real Assassin shifts;
- naturally resolves the ordinary contract flow;
- covers refusal evidence and four seasons;
- reaches 50 real completed shifts;
- exposes `ending.assassin.hard-work`;
- preserves non-terminal eligibility;
- grants `hardWork:assassin` only on completion;
- persists across reload/new life.

Producer status is `READY_FOR_CHAT2`.
Chat 2 owns current-main assembly/technical QA.

Status: **natural prerequisite proven on frozen producer candidate; integration proof pending**.

## 8.5 Remaining seven ordinary careers

They are already shipped before the current Artist/Prostitute wave and remain in the ordinary master ledger.
Their Hard Work ending contract on the packet base is still exactly 50 completed shifts.

No Palace code should duplicate their internals; Palace reads only the published Hard Work Meta ledger.

## 8.6 Exact remaining dependency for 10/10

The previous Palace dependency “Artist + Assassin + Prostitute are unpublished” is reduced to:

**Assassin assembly must be accepted and merged, then a current-main sequential 10-life natural Hard Work -> Palace unlock acceptance must be executed.**

Until that happens, Palace must not claim final natural 10/10 acceptance even though all ten ledger identities and ending contracts are present.

---

# 9. Work safe before Product decisions

The following work is safe because it does not bind open Product values:

1. preserve the existing Palace foundation head `8919a3686c1952d700c4c1377130918e0e181fa3`;
2. preserve its authority-safe RU/EN copy and text fallbacks;
3. preserve 10/10 unlock parity tests;
4. preserve D18 semantic eligibility tests over already-normalized percentages;
5. preserve read-only School/Activity/legacy seam inventories;
6. re-run static collision audits after Assassin assembly lands;
7. prepare focused tests for whichever P1-P7 options Product selects, without changing shared runtime until Leader assigns ownership.

Unsafe before decisions:
- no Prince victory fact/quest/world ID;
- no `gte 91` production bind until P2 is locked;
- no NG+ x2 runtime;
- no Palace entry action/event/item bind;
- no Palace stage thresholds;
- no non-True reward IDs;
- no Palace relationship/item/Night production IDs.

---

# 10. Leader decision checklist

The minimum questions to Product/user are:

1. **P1:** Must Prince victory be visible outside Palace?
2. **P2:** For D18, is the current integer 0..100 stat value itself the percentage?
3. **P3:** Does x2 apply before or after the 10 allocation points; does cap 100 remain; may selection use `activeLegacyPerks`?
4. **P4:** After 10/10 unlock, is Palace immediately available or invitation-gated?
5. **P5:** May Palace use evidence-driven progression without numeric shift thresholds?
6. **P6:** Are the three non-True Palace endings completion-only or permanently rewarding; does Palace itself ever grant Hard Work?
7. **P7-R:** May relationships use generic role-based NPC identities, with optional romance non-required?
8. **P7-I:** May the first Palace item bind use shipped legacy capabilities only, with Palace-local items deferred?
9. **P7-N:** May Palace have one voluntary non-forced work-context Night choice?

## Proposed technically simplest bundle — NOT AUTHORITY

If Product explicitly approves the low-blast-radius path:

- P1: Palace-local career victory fact;
- P2: current 0..100 is percentage -> twelve `gte 91` conditions;
- P3: True Ending grants selectable legacy capability; x2 after Hard Work bonuses but before allocation; cap 100;
- P4: direct availability after `metaUnlock:palace`;
- P5: compact evidence-driven three-stage machine, no numeric thresholds;
- P6: Service Life / Court Power / Inner Truth completion-only, no Palace Hard Work;
- P7-R: generic role-based Palace-local relationships;
- P7-I: shipped legacy item capabilities as optional paths first;
- P7-N: one voluntary Palace work-context Night choice.

This bundle is intentionally optimized for minimum shared-framework change, not asserted as the Product design.

---

# 11. Handoff state

No production foundation was modified.
No shared runtime was changed.
No PR was opened.
No full CI was requested.

After this packet is committed, freeze its exact SHA and report:

`READY_FOR_LEADER_DECISION`
