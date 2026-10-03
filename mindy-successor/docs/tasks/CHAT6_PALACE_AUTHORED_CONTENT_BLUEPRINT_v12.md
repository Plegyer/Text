# Chat 6 — Palace Authored Content Blueprint v12

Status: **READY FOR LEADER ACCEPTANCE**  
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-authored-content-blueprint-v12`

Accepted mechanical authority:
- v11 rich-six contract: `chat6/palace-rich6-stage-contract-v11@0d95f1e3f3267901efdb701f727e4cc54fec4ef0`
- frozen Prince mechanics packet: `chat6/palace-prince-confrontation-decision-v9@4de1a3925d499a6337a3c40c05b8b4aba9f3cc03`

Locked Product context used:
- D29: six-stage Palace topology and milestones 2 / 5 / 8 / 12 / 15;
- D35: normal lodging may enable explicitly authored private-space choices only;
- Secret Debt forced Night always overrides optional Palace/private-space Night.

Machine-readable companion:
`mindy-successor/prior-work/astra/prototype-m3.2/content/palace-authored-content-blueprint-v12.fixture.json`

Focused static contract test:
`mindy-successor/prior-work/astra/prototype-m3.2/tests/palace-authored-content-blueprint-v12.test.ts`

No production engine or UI code is included.

---

## 1. Scope

v12 turns the accepted v11 mechanics into an authored-content production blueprint.

It does **not** change:

- D23 Palace entry;
- Palace daily cadence;
- six-stage topology;
- duty milestones;
- True Ending readiness;
- Prince confrontation model;
- Prince identity/lore;
- final mystery truth;
- Secret Debt precedence;
- Meta architecture.

The blueprint defines what must be authored around the mechanics so Palace progression does not feel like fifteen identical clicks.

---

## 2. Fixed stage progression

The authored map uses the exact v11 stages:

1. `entered-service`
2. `working-rhythm`
3. `trusted-service`
4. `palace-network`
5. `crossroads`
6. `outcome-ready`

Structural transition duties remain:

- duty 2 -> Working Rhythm;
- duty 5 -> Trusted Service;
- duty 8 -> Palace Network;
- duty 12 -> Crossroads;
- duty 15 -> Outcome Ready.

v12 does not move these milestones.

Every successful Palace duty remains exactly:

`+1 palaceDutyCount`

No authored variant can award extra duty credit.

No Palace daily cadence is invented.

---

# 3. Exact fifteen-duty authored map

## Duty 1 — Service Rotation

ID:
`palace.duty.01-service-rotation`

Stage:
`entered-service`

Presentation function:
establish the repeatable Palace service grammar — bounded assignment, clear ownership, completed handoff, explicit closure.

Emphasis:
- Manners;
- Sociability.

Optional contextual hooks:
- Satyr Maid service knowledge;
- Tavern service knowledge;
- School Rhetoric & Social.

Must not gate:
entry, extra duty credit, any relationship/romance, Night, items, School, Activity, non-True outcome, Prince, Return Home.

Repetition control:
this is the one introductory service-rotation beat; later Service Rotation duties use different pressure/closure functions.

---

## Duty 2 — Logistics Support

ID:
`palace.duty.02-logistics-support`

Stage:
`entered-service`

Presentation function:
resolve a route/handoff mismatch using a baseline route.

Emphasis:
- Wits;
- Dexterity.

Optional hooks:
- Guard/Hunter knowledge;
- Field Craft;
- `hunter.expedition`;
- `official_guard_access`;
- `guard_sealed_pass`;
- `cross_rough_route`.

Milestone:
this exact completion transitions to Working Rhythm and queues milestone-02.

Repetition control:
first route-focused duty, distinct from Duty 1 service closure.

---

## Duty 3 — Records Review

ID:
`palace.duty.03-records-review`

Stage:
`working-rhythm`

Presentation function:
compare a register with a concrete handoff and distinguish verified information from assumption.

Emphasis:
- Reason;
- Wits.

Optional hooks:
- Merchant knowledge;
- Literacy & Numbers;
- `merchant_verify_manifest`;
- `merchant_handle_samples`;
- Official Contact.

Repetition control:
changes work mode from movement/service to documentary verification.

---

## Duty 4 — Service Rotation

ID:
`palace.duty.04-service-rotation`

Stage:
`working-rhythm`

Presentation function:
handle competing routine requests while preserving queue/order and professional boundaries.

Emphasis:
- Endurance;
- Sociability.

Optional hooks:
- Satyr Maid/Tavern/Professional-service knowledge;
- Rhetoric & Social;
- Official Contact.

Repetition control:
different pressure from Duty 1: queue conflict instead of first handoff.

---

## Duty 5 — Logistics Support

ID:
`palace.duty.05-logistics-support`

Stage:
`working-rhythm`

Presentation function:
reroute a delayed handoff through a safe baseline path.

Emphasis:
- Dexterity;
- Reason.

Optional hooks:
- Hunter/Tavern/Guard knowledge;
- Field Craft;
- `hunter.expedition`;
- `access_guest_rooms_staff`;
- `cross_rough_route`;
- Official Contact.

Milestone:
this exact completion transitions to Trusted Service and queues milestone-05.

Repetition control:
delayed rerouting differs from Duty 2 access/pass handling.

---

## Duty 6 — Coordination

ID:
`palace.duty.06-coordination`

Stage:
`trusted-service`

Presentation function:
coordinate two bounded workstreams with explicit responsibilities and a shared check point.

Emphasis:
- Charm;
- Manners;
- Sociability.

Optional hooks:
- Guard/Merchant/Artist knowledge;
- Rhetoric & Social;
- Etiquette & Presentation;
- Patron;
- Rival;
- Official Contact.

Repetition control:
first multi-person coordination duty.

---

## Duty 7 — Records Review

ID:
`palace.duty.07-records-review`

Stage:
`trusted-service`

Presentation function:
review a material record where observation and explanation must remain separate.

Emphasis:
- Reason;
- Magic.

Optional hooks:
- Undead Farm/Merchant knowledge;
- Arcana;
- Literacy & Numbers;
- `preserve_specimen`;
- `merchant_handle_samples`;
- Patron.

Repetition control:
material evidence replaces Duty 3's register discrepancy.

---

## Duty 8 — Service Rotation

ID:
`palace.duty.08-service-rotation`

Stage:
`trusted-service`

Presentation function:
close a longer service chain by recording what was completed, what remains open, and who owns the next step.

Emphasis:
- Endurance;
- Wits.

Optional hooks:
- Lumber/Tavern/Satyr Maid knowledge;
- Literacy & Numbers;
- `lumber.forest`;
- Patron;
- Rival.

Milestone:
this exact completion transitions to Palace Network and queues milestone-08.

Repetition control:
multi-step closure differs from Duties 1 and 4.

---

## Duty 9 — Formal Interface

ID:
`palace.duty.09-formal-interface`

Stage:
`palace-network`

Presentation function:
perform a formal-facing work exchange where protocol supports clarity but never substitutes for authorization.

Emphasis:
- Manners;
- Grooming;
- Charm.

Optional hooks:
- Artist/Guard knowledge;
- Etiquette & Presentation;
- Arts & Performance;
- `artist_formal_presence`;
- `artist_handle_invitation`;
- `official_guard_access`;
- Official Contact.

Repetition control:
introduces a new formal/protocol work family.

---

## Duty 10 — Coordination

ID:
`palace.duty.10-coordination`

Stage:
`palace-network`

Presentation function:
coordinate a shared result where credit, correction, and responsibility remain traceable.

Emphasis:
- Sociability;
- Wits;
- Charm.

Optional hooks:
- Merchant/Artist/Guard knowledge;
- Rhetoric & Social;
- Patron;
- Rival;
- Official Contact.

Repetition control:
credit/accountability replaces Duty 6's initial task division.

---

## Duty 11 — Logistics Support

ID:
`palace.duty.11-logistics-support`

Stage:
`palace-network`

Presentation function:
plan a constrained handoff while distinguishing route evidence, official attention, and actual access.

Emphasis:
- Dexterity;
- Wits.

Optional hooks:
- Guard/Hunter/Assassin knowledge;
- Field Craft;
- `hunter.expedition`;
- `assassin.infiltration`;
- `guard_sealed_pass`;
- `cross_rough_route`;
- `official_guard_access`;
- Rival.

Repetition control:
third logistics beat combines checked constraints rather than simple route selection.

---

## Duty 12 — Records Review

ID:
`palace.duty.12-records-review`

Stage:
`palace-network`

Presentation function:
reconcile multiple records into one checked summary while preserving disagreement between sources.

Emphasis:
- Reason;
- Wits.

Optional hooks:
- Merchant/Assassin knowledge;
- Literacy & Numbers;
- `assassin.infiltration`;
- `merchant_verify_manifest`;
- `merchant_handle_samples`;
- Patron/Rival.

Milestone:
this exact completion transitions to Crossroads and queues milestone-12.

Repetition control:
multi-source reconciliation differs from Duties 3 and 7.

---

## Duty 13 — Evidence Review

ID:
`palace.duty.13-evidence-review`

Stage:
`crossroads`

Presentation function:
separate direct observation, sourced testimony, and unresolved interpretation.

This scene must **not** reveal final mystery truth.

Emphasis:
- Reason;
- Wits;
- Magic.

Optional hooks:
- Professional-service/Undead Farm/Assassin knowledge;
- Arcana;
- Literacy & Numbers;
- `assassin.infiltration`;
- `prostitute_handle_evidence`;
- `preserve_specimen`;
- `merchant_verify_manifest`;
- Official Contact.

Repetition control:
the only required Evidence Review duty in the fifteen-duty core.

---

## Duty 14 — Formal Interface

ID:
`palace.duty.14-formal-interface`

Stage:
`crossroads`

Presentation function:
present a checked position formally while keeping performance, protocol, and factual certainty separate.

Emphasis:
- Manners;
- Charm;
- Creativity.

Optional hooks:
- Artist/Merchant knowledge;
- Etiquette & Presentation;
- Arts & Performance;
- `artist_formal_presence`;
- `artist_handle_invitation`;
- Patron/Rival.

Repetition control:
moves from protocol execution in Duty 9 to bounded presentation of checked material.

---

## Duty 15 — Coordination

ID:
`palace.duty.15-coordination`

Stage:
`crossroads`

Presentation function:
coordinate a final general-work handoff across several roles and close ordinary Palace progression obligations.

It does **not** choose an ending.

Emphasis:
- Wits;
- Sociability;
- Manners.

Optional hooks:
- Guard/Merchant/Artist/Assassin knowledge;
- Rhetoric & Social;
- Etiquette & Presentation;
- Patron;
- Rival;
- Official Contact.

Milestone:
this exact completion:

- transitions to `outcome-ready`;
- writes `palace.progression-complete` exactly once;
- queues milestone-15.

Repetition control:
final multi-role closure differs from Duty 6 task splitting and Duty 10 credit handling.

---

# 4. Family distribution

Exact required distribution:

| Family | Duties |
|---|---|
| Service Rotation | 1, 4, 8 |
| Logistics Support | 2, 5, 11 |
| Records Review | 3, 7, 12 |
| Coordination | 6, 10, 15 |
| Formal Interface | 9, 14 |
| Evidence Review | 13 |

This keeps all six v11 functional families visible without changing progression weight.

---

# 5. Service Life authored route

Preparation may begin at:

`trusted-service`

Preparation fact:

`palace.prep.service-life`

## Beat 1 — continuity

Candidate ID:
`palace.outcome-prep.service-life.01-continuity`

Function:
ask whether ordinary Palace service can be made sustainable through clear duties and repeatable work rather than status.

Baseline:
a Palace duty at Trusted Service or later is enough.

Optional context:
- Rhetoric & Social;
- Official Contact;
- Patron;
- Lumber/Satyr Maid/Tavern knowledge.

No optional input is required.

## Beat 2 — boundaries

Candidate ID:
`palace.outcome-prep.service-life.02-boundaries`

Function:
confirm a bounded professional service pattern.

This beat writes:

`palace.prep.service-life`

Optional context:
- Etiquette & Presentation;
- `access_guest_rooms_staff`;
- Official Contact;
- Patron;
- Guard/Professional-service knowledge.

## Finalize

At Outcome Ready:

`palace.outcome-finalize.service-life`

requires:

- Outcome Ready;
- `palace.progression-complete`;
- `palace.prep.service-life`.

Writes:

`palace.outcome.service-life-ready`

Does **not** commit an ending.

## Commit boundary

Candidate ending:
`ending.palace.service-life`

Explicit commit is required.

Post-commit current-life scene:
`palace.ending.service-life.committed`

Reward status:

**OPEN**

No permanent reward is implied by v12.

---

# 6. Court Power authored route

Preparation may begin at:

`palace-network`

Preparation fact:

`palace.prep.court-power`

## Beat 1 — responsibility

Candidate ID:
`palace.outcome-prep.court-power.01-responsibility`

Function:
frame influence as accountable professional responsibility rather than personal access.

Optional context:
- Rhetoric & Social;
- Etiquette & Presentation;
- `artist_formal_presence`;
- Patron;
- Rival;
- Official Contact;
- Guard/Merchant/Artist knowledge.

## Beat 2 — network

Candidate ID:
`palace.outcome-prep.court-power.02-network`

Function:
resolve a professional network/credit decision without requiring patronage or personal favor.

Writes:

`palace.prep.court-power`

Optional context:
- Rhetoric & Social;
- `official_guard_access`;
- `guard_sealed_pass`;
- Patron/Rival/Official Contact.

## Finalize

At Outcome Ready:

`palace.outcome-finalize.court-power`

writes:

`palace.outcome.court-power-ready`

No auto-commit.

## Commit boundary

Candidate ending:
`ending.palace.court-power`

Post-commit scene:
`palace.ending.court-power.committed`

Reward status:

**OPEN**

---

# 7. Inner Truth authored route

Preparation may begin at:

`crossroads`

Preparation fact:

`palace.prep.inner-truth`

## Beat 1 — evidence

Candidate ID:
`palace.outcome-prep.inner-truth.01-evidence`

Function:
sort evidence into observed / sourced / unresolved categories.

It must not name the final mystery truth.

Optional context:
- Literacy & Numbers;
- Arcana;
- `assassin.infiltration`;
- `hunter.expedition`;
- `prostitute_handle_evidence`;
- `preserve_specimen`;
- `merchant_verify_manifest`;
- Official Contact;
- Assassin/Undead Farm/Merchant/Professional-service knowledge.

## Beat 2 — contradiction

Candidate ID:
`palace.outcome-prep.inner-truth.02-contradiction`

Function:
compare plausible accounts and preserve uncertainty where evidence does not settle it.

Writes:

`palace.prep.inner-truth`

Optional context:
- Arcana;
- Field Craft;
- `assassin.infiltration`;
- evidence/preservation capabilities;
- Rival;
- Official Contact.

A no-item/no-Activity baseline must always exist.

## Finalize

At Outcome Ready:

`palace.outcome-finalize.inner-truth`

writes:

`palace.outcome.inner-truth-ready`

No auto-commit.

## Commit boundary

Candidate ending:
`ending.palace.inner-truth`

Post-commit current-life scene:
`palace.ending.inner-truth.committed`

Reward status:

**OPEN**

This route is not the True Ending and must not publish the game's final mystery answer.

---

# 8. Non-exclusive route behavior

Before explicit ending commit:

- any subset of the three preparation facts may coexist;
- all three may coexist;
- all three final-ready facts may coexist;
- finalizing one non-True route does not remove another;
- preparing/finalizing a non-True route does not block Prince availability;
- no route is selected merely by seeing content.

Exclusivity begins only when the player explicitly commits an ending.

---

# 9. Optional professional relationships

v12 reuses all eleven v5 relationship scenes.

## Professional Patron

Existing scenes:
- `palace.relationship.patron.intro`
- `palace.relationship.patron.trust`
- `palace.relationship.patron.conflict`

Use:
optional professional-review, coordination, Court Power variants.

Never a progression or ending gate.

## Official Contact

Existing scenes:
- `palace.relationship.contact.intro`
- `palace.relationship.contact.practical-help`
- `palace.relationship.contact.boundary`

Use:
optional logistics, routing and practical-context variants.

Never a progression gate.

## Rival

Existing scenes:
- `palace.relationship.rival.intro`
- `palace.relationship.rival.cooperation`
- `palace.relationship.rival.conflict`

Use:
optional coordination, credit and contradiction variants.

Disengagement is safe.

## Optional Romance

Existing scenes:
- `palace.relationship.romance.invitation`
- `palace.relationship.romance.mode`

First authored window:
Crossroads onward.

Refusal is safe.

Romance never gates:

- duties;
- milestones;
- non-True outcomes;
- Prince;
- Return Home.

---

# 10. Optional Palace Night

## Professional review

`palace.night.work-review`

First window:
Working Rhythm.

Purpose:
optional work review of documents/routes/current assignments.

It:

- consumes normal Night choice;
- never counts as a duty;
- never gates progression.

## Social conversation

`palace.night.social-conversation`

First window:
Trusted Service.

Purpose:
optional workplace/social context.

It never gates any route.

## Secret Debt precedence

If Secret Debt owns forced Night:

- Palace Night does not appear;
- no Palace progress is lost;
- no route becomes unavailable permanently;
- housing/private-space choices do not bypass forced Night.

---

# 11. D35 private-space Palace use

v12 allocates exactly one optional Palace private-space branch:

`palace.relationship.romance.private-conversation`

This is a **content slot**, not a progression requirement.

Requirements:

- player voluntarily kept a personal/romance-capable Palace relationship open;
- current lodging is `normal`;
- no forced Secret Debt Night owns the Night.

On `cheap` or `street`:

- this private branch is absent;
- romance can still continue through non-private authored content;
- Palace progression is unchanged;
- all endings remain available through their normal requirements.

This private branch:

- never counts as a duty;
- never grants access;
- never writes outcome prep/ready facts;
- is never required to continue romance;
- is never required for any ending.

---

# 12. School hooks

All eight shipped School course IDs are valid optional context sources:

- `school.course.literacy_and_numbers`
- `school.course.arcana`
- `school.course.rhetoric_and_social`
- `school.course.etiquette_and_presentation`
- `school.course.field_craft`
- `school.course.physical_training`
- `school.course.arts_and_performance`
- `school.course.body_confidence`

Suggested authored use:

- Literacy & Numbers -> Records Review / Evidence Review;
- Arcana -> material/evidence review;
- Rhetoric & Social -> Service / Coordination / Service Life / Court Power;
- Etiquette -> Coordination / Formal Interface / Court Power;
- Field Craft -> Logistics / Inner Truth;
- Physical Training -> occasional Service/Logistics variant;
- Arts & Performance -> Formal Interface;
- Body Confidence -> optional Formal Interface presentation only.

No School course/counter is a Palace gate.

---

# 13. Activity hooks

Shipped Activities:

- `lumber.forest`
- `hunter.expedition`
- `assassin.infiltration`

Optional authored use:

- Lumber Forest -> duty-chain closure / bounded work context;
- Hunter Expedition -> route observation/logistics;
- Assassin Infiltration -> route/evidence/conflicting-account context.

Activity experience/result may alter a response or presentation.

It never:

- substitutes for D23;
- grants Palace access;
- increments Palace duty count;
- satisfies a milestone;
- becomes mandatory for a Palace ending.

---

# 14. Legacy item/capability hooks

Exact v5 capability set retained:

1. `artist_formal_presence`
2. `artist_handle_invitation`
3. `official_guard_access`
4. `guard_sealed_pass`
5. `merchant_verify_manifest`
6. `merchant_handle_samples`
7. `access_guest_rooms_staff`
8. `cross_rough_route`
9. `preserve_specimen`
10. `prostitute_handle_evidence`

All remain optional variants/choices.

They never grant:

- Palace entry;
- extra duty count;
- milestone skip;
- outcome readiness by themselves;
- Prince access;
- Return Home.

---

# 15. Ordinary-career legacy knowledge

D27 says pure knowledge/content unlocks remain automatic and outside Keystone/Specialist capacity.

v12 reserves one authored knowledge slot per ordinary career:

- Lumber -> bounded repeat work / closure / route safety;
- Satyr Maid -> service queue / guest-facing boundaries;
- Undead Farm -> preservation / observed-vs-explained material evidence;
- Tavern -> service flow / checked information / staff-space context;
- Hunter -> route choice / observation / safe-path context;
- Guard -> official access / responsibility / checked route constraints;
- Merchant -> manifests / records / sources / network accountability;
- Artist/Geisha -> formal presentation / shared credit / protocol;
- Assassin -> route evidence / conflicting accounts / bounded intel;
- Professional/Prostitute -> boundaries / direct observation / evidence handling.

Important implementation boundary:

v12 does **not** invent machine IDs for these pure-knowledge unlocks.

When the shared knowledge catalog has authoritative IDs, these ten slots may bind to them.

Until then they are authored variant slots only.

---

# 16. True Ending handoff

True route remains unchanged.

Required:

- Palace stage = `outcome-ready`;
- `palace.progression-complete`;
- Strength >=91;
- Endurance >=91;
- Dexterity >=91;
- Reason >=91;
- Magic >=91;
- Creativity >=91;
- Wits >=91;
- Charm >=91;
- Sociability >=91;
- Manners >=91;
- Grooming >=91;
- Sexuality >=91;
- Lust excluded;
- Prince confrontation completed successfully;
- `palace.prince-defeated`.

v12 does not choose the v9 confrontation model.

No Prince name is authored.

Defeating the Prince does not auto-commit Return Home.

Return Home remains an explicit ending commit.

---

# 17. cap-200 reward handoff

The cap-200 reward occurs only after completed Return Home.

Locked semantics:

- Specialist under D27/D28;
- consumes one normal Specialist slot;
- no free Palace slot;
- maximum of all 12 progression stats becomes 200 instead of 100;
- current values are not multiplied;
- start bonuses are not multiplied;
- allocation points are not multiplied;
- Lust is unaffected.

v12 adds no extra reward behavior.

---

# 18. Required core scene budget

Exact required core authored scene count:

**37**

Breakdown:

| Surface | Count |
|---|---:|
| Entry + orientation | 5 |
| Exact duty presentations | 15 |
| Structural milestone scenes | 5 |
| Non-True prep beats | 6 |
| Non-True finalize scenes | 3 |
| Non-True post-commit current-life resolution scenes | 3 |
| **Total** | **37** |

Excluded:

- Prince confrontation scenes, because v9 model is not selected;
- Return Home final mystery/epilogue content;
- optional relationships/Night/cross-system variants.

---

# 19. Optional authored-unit budget

Exact optional authored-unit budget:

**45**

Already reusable from v5:

- relationship scenes: 11;
- Palace Night scenes: 2;
- legacy capability reaction variants: 10.

Reusable subtotal:

**23**

New optional slots:

- School course variants: 8;
- Activity variants: 3;
- ordinary-career knowledge variants: 10;
- D35 private-space romance scene: 1.

New subtotal:

**22**

Total:

**45**

---

# 20. RU/EN localization surface

For production planning, v12 defines one localization surface as one localized field:

- scene title;
- scene body;
- choice label;
- choice result;
- action label;
- action description.

## Required minimum per language

- scene titles: 37;
- scene bodies: 37;
- choice labels: 32;
- choice results: 32;
- six duty-family action labels: 6;
- six duty-family descriptions: 6.

Total:

**150 fields per language**

RU + EN:

**300 required bilingual fields**

This excludes final Prince, Return Home mystery/epilogue, and non-True permanent reward description copy while those remain open.

## Optional budget

Optional RU/EN surfaces:

- existing v5 relationships: 70 / language;
- existing v5 Night: 6 / language;
- v5 legacy reaction bodies: 10 / language;
- School variant bodies: 8 / language;
- Activity variant bodies: 3 / language;
- ordinary career knowledge bodies: 10 / language;
- D35 private-space scene: 6 / language.

Total:

**113 optional fields per language**

RU + EN:

**226 optional bilingual fields**

---

# 21. Media slot classes

v12 requires seven presentation classes.

## 1. `palace.entry.generic`

Use:
Day-1 entry, gates, orientation/handoff.

Generic Palace staging is sufficient.

## 2. `palace.work.generic`

Use:
Service Rotation, Logistics Support, Records Review, Coordination.

A shared Palace work/interior asset class is sufficient for first production.

## 3. `palace.formal.generic`

Use:
Formal Interface and Court Power authored surfaces.

## 4. `palace.review.generic`

Use:
Evidence Review and Inner Truth preparation/finalization.

## 5. `palace.relationship.generic`

Use:
Patron/contact/rival/optional-romance workplace scenes.

## 6. `palace.night.workplace`

Use:
optional public/workplace Palace Night content.

## 7. `lodging.private.normal`

Use:
D35 private-space branch.

This can reuse a generic normal-lodging private-room asset.

It must never render for cheap/street private-space-ineligible choices.

No unique Prince art is budgeted here.

---

# 22. Generic asset reuse

First implementation can ship all 37 required core Palace scenes with generic Palace staging classes.

Unique art is presentation polish, not a mechanical prerequisite.

Recommended reuse:

- entry/orientation -> entry generic;
- Duties 1–8, 10–12, 15 -> work generic;
- Duties 9/14 and Court Power -> formal generic;
- Duty 13 and Inner Truth -> review generic;
- Service Life -> work/relationship generic;
- relationship scenes -> relationship generic;
- Palace Night -> Night workplace;
- D35 private scene -> normal lodging private asset.

---

# 23. Content completeness acceptance

The fixture includes V12-A01 through V12-A31.

Key acceptance requirements:

- exactly 15 duties with no gaps/duplicates;
- all six duty families represented;
- milestones stay at 2/5/8/12/15;
- every duty has presentation/emphasis/hooks/non-gates/milestone/repetition notes;
- all duties remain +1;
- no daily cadence invented;
- Service Life prep begins no earlier than Trusted Service;
- Court Power no earlier than Palace Network;
- Inner Truth no earlier than Crossroads;
- each non-True route has 2 prep beats + one prep fact + finalize + final-ready fact + post-commit resolution;
- all route preparation remains non-exclusive before commit;
- reward status for three non-True outcomes remains OPEN;
- optional Palace Night and relationships remain non-gating;
- D35 private branch is normal-only and optional;
- Secret Debt forced Night wins;
- all 8 shipped School courses are optional-only hooks;
- all 3 shipped Activities are optional-only hooks;
- all 10 v5 Palace capabilities remain optional;
- ordinary-career knowledge has one slot per career without guessed machine IDs;
- True handoff stays Outcome Ready + progression-complete + 12×91 + Prince defeat;
- Lust excluded;
- Prince defeat does not auto-commit Return Home;
- cap-200 is post-completion Specialist only;
- required core scene count = 37;
- optional authored units = 45;
- required RU/EN surface = 300 fields;
- optional RU/EN budget = 226 fields;
- seven media slot classes cover the blueprint;
- no final Prince lore/mystery/runtime/UI is introduced.

---

# 24. Explicitly deferred

Still outside v12:

- Palace daily cadence;
- duty wages;
- duty stat rewards/penalties;
- final scene prose;
- final Palace proper nouns/lore;
- Prince identity/name;
- v9 confrontation model choice;
- final mystery truth;
- non-True permanent rewards;
- Return Home final epilogue;
- production runtime/UI;
- unique art budget.

No full CI is requested from Chat 6.

Freeze exact SHA and report:

`READY_FOR_LEADER_ACCEPTANCE`
