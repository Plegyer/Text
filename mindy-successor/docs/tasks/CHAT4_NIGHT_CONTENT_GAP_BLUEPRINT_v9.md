# CHAT 4 — NIGHT CONTENT GAP BLUEPRINT v9

Status: **IMPLEMENTATION-READY CONTENT BLUEPRINT**
Owner: Chat 4
Branch: `chat4/night-content-gap-blueprint-v9`
Recovery baseline head observed before work: `66707cf56342e68a0b54ab246c076b393480f503`
Companion matrix: `mindy-successor/research/night_content_gap_matrix_v1.csv`

## 1. Authority and scope

This blueprint converts locked D35 + D37 into exact authored contracts for the remaining ordinary-career Night coverage gaps.

Authority used:
- `mindy-successor/docs/tasks/CHAT4_RECOVERY_HANDOFF_2026-10-03.md`;
- `mindy-successor/docs/tasks/CURRENT_CHAT4_TASK_POINTER.md`;
- `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`, especially D35 and D37;
- accepted Night audit `chat4/night-system-completeness-audit-v8@63078afd37d4ef785043d443126e2be0061d559b`;
- accepted audit inventory `mindy-successor/research/night_system_coverage_v1.csv` from `9a5903526ed733dc1cdbf00d3ff53078b4872942`;
- the exact Hunter / Guard / Merchant / Satyr Maid / Tavern runtime-contract identities already present on the v9 branch;
- frozen voluntary Prostitute and Assassin producer state only as identity evidence, never as branches to modify.

This task is **documentation and content-contract design only**. It does not authorize production runtime, schema, UI, shared NightFlow, Palace, Secret Debt, or Activity/camp changes.

## 2. Global implementation contract

Every ID in this document is a proposed stable production identity. Producers should preserve it exactly unless Leader explicitly supersedes the blueprint before implementation.

All twelve surfaces are ordinary **voluntary Night choices**. They enter only through the existing `VoluntaryNightChoice` phase. None may install a forced-night policy or write the calendar directly.

The shared lifecycle remains:

`LodgingResolution -> VoluntaryNightChoice -> NightEventResolution -> NextDayModifiersFinalized -> CalendarAdvance`.

For every new surface:
- the choice itself consumes the one global Night slot through existing NightFlow;
- `nextDayEffects=[]`;
- `nextDayEnergyDelta=0`;
- there is no direct `CalendarAdvance` effect in content;
- save/reload before NightEventResolution commit must perform zero choice effects;
- save/reload after commit must preserve the effects exactly once and must not replay them;
- the shared NightFlow performs exactly one calendar advance for the completed global Night.

D35 is implemented with the already-supported `housingTier` condition. A private-space seed uses exactly `housingTier=normal`. It does not infer privacy from money, item possession, relationship closeness, Lust, Sexuality, or any stat.

All public/workplace/non-private rows remain eligible under `normal|cheap|street` when their career/relationship conditions are met. This blueprint therefore does not regress cheap lodging: cheap continues to support School Night Study and all eligible public/workplace Night choices.

Secret Debt precedence is external and absolute: while a forced Secret Debt Night owns the Night slot, none of these voluntary choices is offered or counted as declined. Palace optional Night likewise cannot displace a forced Secret Debt Night.

## 3. Consent, refusal, and progression firewall

The following is normative for all producers implementing these rows.

Romance is never required. A private room is an access capability, not consent. Confidence, Body Confidence, Lust, Sexuality, relationship counters, career stage, or prior professional contact never substitute for an explicit player choice.

A player declining by simply choosing another Night action writes no relationship penalty. If a producer adds an internal confirm/back-out presentation before the Night choice commits, back-out must return before `NightEventResolution` and write nothing.

The new `*-seen` facts below are **durable history facts only**. They may drive later presentation variants, but they must not be added to Hard Work, ordinary career stage promotion, Palace qualification, or ending eligibility. The blueprint intentionally avoids +stat filler and avoids using Night as a hidden replacement for daytime work, School, Activity, cases, deliveries, contracts, or route preparation.

No new broad affinity, attraction, romance, approval, chemistry, consent, or relationship-score system is introduced.

## 4. Stable surface index

| Surface | Proposed stable Night choice ID | Intent | Housing | Producer group |
|---|---|---|---|---|
| Lumber personal/social | `lumber.night.foreman-social` | relationship-personal | normal / cheap / street | 1 |
| Hunter field debrief | `hunter.night.field-debrief` | professional | normal / cheap / street | 1 |
| Hunter Senior Guide | `hunter.night.senior-guide` | relationship-personal | normal / cheap / street | 2 |
| Guard case debrief | `guard.night.case-debrief` | professional | normal / cheap / street | 1 |
| Guard Partner | `guard.night.partner` | relationship-personal | normal / cheap / street | 2 |
| Merchant ledger plan | `merchant.night.ledger-plan` | professional | normal / cheap / street | 1 |
| Merchant Supplier | `merchant.night.supplier` | relationship-personal | normal / cheap / street | 2 |
| Assassin handler/informant | `assassin.night.handler-contact` | relationship-personal | normal / cheap / street | 2 |
| Prostitute personal continuation | `prostitute.night.personal-continuation` | relationship-personal | normal / cheap / street | 1 |
| Satyr Maid private recurring guest | `satyr-maid.night.recurring-guest-private` | relationship-personal / Night-heavy third | **normal only** | 1 |
| Tavern private recurring traveler | `tavern.night.traveler-private` | relationship-personal / Night-heavy third | **normal only** | 1 |
| Prostitute private recurring client | `prostitute.night.client-private` | relationship-personal / Night-heavy third | **normal only** | 1 |

The CSV is the machine-readable companion. The sections below are the normative implementation notes.

## 5. Lumber — distinct personal/social continuation

**Stable ID:** `lumber.night.foreman-social`.

**Intent:** relationship-personal. It is deliberately distinct from existing `lumber.foreman.night`, whose current function is professional Foreman continuation.

**Eligibility:** any selected lodging; `lumber.foreman` must be at `route-professional`; `lumber.foreman/social-night-seen` must be absent. No stat, School, Activity, Lust, or Sexuality condition.

**State consumed:** existing `lumber.foreman` stage and existing `night_meetings` counter. Optional presentation variants may read Lumber `management-school-ready` or `forest-truth-known`, but neither may gate the choice.

**Player-choice function:** choose an off-duty personal/social conversation that can remain friendship/social contact. It must not silently turn the existing professional relationship into romance.

**Exact effects:**
`incrementRelationshipCounter(lumber.foreman, night_meetings, +1)`;
`addRelationshipFact(lumber.foreman, social-night-seen)`;
`nextDayEffects=[]`;
`nextDayEnergyDelta=0`.

**Durable route facts:** none. `social-night-seen` is durable history only.

**Ending contribution:** presentation/variant material for a future professional-partnership or friendship outcome only. It is not an input to Forewoman, Forest, Hard Work, career stage, or Palace qualification.

**Presentation slot:** `relationship/lumber-foreman/lumber-night-foreman-social/default`.

**Localization surface:** RU/EN keys `night.lumber.foreman-social.label`, `night.lumber.foreman-social.body`, `night.lumber.foreman-social.aria`, and `presentation.static.lumber.night.foreman-social.alt`. These are localization slots, not final prose.

**Save/reload and refusal:** commit the counter + fact atomically in NightEventResolution. Non-selection/back-out before commit writes nothing. Reload after commit cannot increment again. Decline never changes Foreman route or Lumber progression.

**Why this is not a hidden gate:** it writes no career counter, route-ready fact, stat, money, School fact, Activity fact, or ending fact.

## 6. Hunter — professional field/debrief Night

**Stable ID:** `hunter.night.field-debrief`.

**Intent:** professional / non-romantic.

**Eligibility:** any selected lodging; Hunter stage in `tracker|recognized-hunter|veteran|master-hunter|warden|legend|outcome-ready`; `hunter/night-field-debrief-seen` absent.

**State consumed:** Hunter stage. School facts `school-field-craft-ready`, `school-arcana-ready`, `school-literacy-ready`, and `school-physical-ready` may change presentation only. Existing Activity-derived Hunter facts `expedition-returned`, `expedition-preserved-sample`, and `expedition-rough-route` may change presentation only. No School or Activity input is required.

**Player-choice function:** professional after-hours field review: observations, route notes, specimen handling, or next-contract planning.

**Exact effects:** `addCareerFact(hunter, night-field-debrief-seen)`; no other effect; no next-day effect.

**Durable route facts:** none. The seen fact must never become Master/Warden/Legend readiness.

**Ending contribution:** none mechanically. It may only select later debrief/presentation variants.

**Presentation slot:** `night/hunter/hunter-night-field-debrief`.

**Localization surface:** `night.hunter.field-debrief.label`, `night.hunter.field-debrief.body`, `night.hunter.field-debrief.aria`, `presentation.static.hunter.night.field-debrief.alt`.

**Save/reload and refusal:** the seen fact commits once with NightEventResolution; non-selection writes nothing.

**Why this is not a hidden gate:** it does not increment `successful_expeditions`, `rare_contracts`, any seasonal contract counter, or publish any Master/Warden/Legend route fact.

## 7. Hunter — optional Senior Guide / companion Night

**Stable ID:** `hunter.night.senior-guide`.

**Intent:** relationship-personal.

**Eligibility:** any selected lodging; `hunter.senior-guide` stage in `professional-trust|conflict-open|companion-ready|route-resolved`; `night-companion-seen` absent.

**Relationship extension required:** add a relationship-local `night-meetings` counter and durable history fact `night-companion-seen`. Do not add a global relationship meter.

**Optional reflections:** `expedition-returned` can change presentation. School can be reflected only through an exact shipped Hunter-owned fact; no School threshold may be invented here.

**Player-choice function:** optional off-duty company/debrief with the Senior Guide, supporting friendship/companionship. A romance variant, if later authored, requires a separate explicit choice.

**Exact effects:** `incrementRelationshipCounter(hunter.senior-guide, night-meetings, +1)`; `addRelationshipFact(hunter.senior-guide, night-companion-seen)`; no next-day effect.

**Durable route facts:** none. Specifically forbidden from this choice: `relationship-trust-ready`, `companion-ready`, `protected-route-choice`, `warden-route-ready`.

**Ending contribution:** optional Warden/companion presentation only after those routes are independently ready.

**Presentation slot:** `relationship/hunter-senior-guide/hunter-night-senior-guide/default`.

**Localization surface:** `night.hunter.senior-guide.label`, `night.hunter.senior-guide.body`, `night.hunter.senior-guide.aria`, `presentation.static.hunter.night.senior-guide.alt`.

**Save/reload and refusal:** relationship counter + fact are one atomic Night commit. Not selecting it is neutral; existing relationship refusal semantics remain unchanged.

**Why this is not a hidden gate:** no career/ending readiness is written and no romance/stat gate exists.

## 8. Guard — professional report/case/debrief Night

**Stable ID:** `guard.night.case-debrief`.

**Intent:** professional / non-romantic.

**Eligibility:** any selected lodging; Guard stage in `trusted-guard|senior-guard|veteran|officer|reform-order|network|major-case|outcome-ready`; `guard/night-case-debrief-seen` absent.

**Optional reflections:** `school-literacy-ready`, `school-rhetoric-ready`, `school-etiquette-ready`, and `school-arcana-ready` may alter presentation only. No Activity reflection is bound until Guard has an exact typed Activity seam.

**Player-choice function:** sort testimony, prepare/review a report, or debrief a city incident.

**Exact effects:** `addCareerFact(guard, night-case-debrief-seen)`; no next-day effect.

**Durable route facts:** none. Do not write `duty-report-evidence`, `partner-case-support`, `officer-route-ready`, `major-case-ready`, or any other route readiness.

**Ending contribution:** none mechanically; presentation variants only.

**Presentation slot:** `night/guard/guard-night-case-debrief`.

**Localization surface:** `night.guard.case-debrief.label`, `night.guard.case-debrief.body`, `night.guard.case-debrief.aria`, `presentation.static.guard.night.case-debrief.alt`.

**Save/reload and refusal:** atomic seen-fact commit; non-selection writes nothing.

**Why this is not a hidden gate:** it does not increment `report_duties` or substitute for report/case work.

## 9. Guard — optional Partner Night

**Stable ID:** `guard.night.partner`.

**Intent:** relationship-personal.

**Eligibility:** any selected lodging; `guard.partner` stage in `professional-trust|conflict-open|cooperation-ready|route-resolved`; `night-partner-seen` absent.

**Relationship extension required:** relationship-local `night-meetings` + `night-partner-seen`; no affinity meter.

**Optional reflections:** School rhetoric/literacy readiness may alter presentation only.

**Player-choice function:** optional off-duty decompression, personal trust, or friendship with the Partner. Romance is not assumed.

**Exact effects:** `incrementRelationshipCounter(guard.partner, night-meetings, +1)`; `addRelationshipFact(guard.partner, night-partner-seen)`; no next-day effect.

**Durable route facts:** none. Do not write `relationship-trust-ready`, `case-support-ready`, `partner-case-support`, or `major-case-ready`.

**Ending contribution:** optional Partner/Major Case presentation only after independent readiness.

**Presentation slot:** `relationship/guard-partner/guard-night-partner/default`.

**Localization surface:** `night.guard.partner.label`, `night.guard.partner.body`, `night.guard.partner.aria`, `presentation.static.guard.night.partner.alt`.

**Save/reload and refusal:** counter + fact commit once. Non-selection is neutral; existing `conflict-response=declined` remains valid and career-safe.

**Why this is not a hidden gate:** no Guard evidence/readiness fact or stat effect is written.

## 10. Merchant — professional ledger/supplier-planning Night

**Stable ID:** `merchant.night.ledger-plan`.

**Intent:** professional / non-romantic.

**Eligibility:** any selected lodging; Merchant stage in `independent-trader|networked-merchant|veteran|merchant-house|speculator-smuggler|patron-of-routes|outcome-ready`; `merchant/night-ledger-plan-seen` absent.

**Optional reflections:** School readiness facts can alter presentation. Merchant-local cross-system facts such as `hunter-input-known` can alter route-planning presentation but are not required.

**Player-choice function:** reconcile records, plan a delivery, or compare supply routes after hours.

**Exact effects:** `addCareerFact(merchant, night-ledger-plan-seen)`; no next-day effect.

**Durable route facts:** none. Do not write `manifest-verified`, `supplier-trust-ready`, `crisis-resolved`, `merchant-house-ready`, `patron-route-ready`, or `speculator-route-ready`.

**Ending contribution:** none mechanically.

**Presentation slot:** `night/merchant/merchant-night-ledger-plan`.

**Localization surface:** `night.merchant.ledger-plan.label`, `night.merchant.ledger-plan.body`, `night.merchant.ledger-plan.aria`, `presentation.static.merchant.night.ledger-plan.alt`.

**Save/reload and refusal:** one atomic history-fact commit; non-selection has no supplier/career effect.

**Why this is not a hidden gate:** it increments no trade/delivery/supplier counter and grants no route fact.

## 11. Merchant — optional Supplier relationship Night

**Stable ID:** `merchant.night.supplier`.

**Intent:** relationship-personal.

**Eligibility:** any selected lodging; `merchant.supplier` stage in `professional-trust|conflict-open|utility-ready|route-resolved`; `night-supplier-seen` absent.

**Relationship extension required:** relationship-local `night-meetings` + `night-supplier-seen`.

**Optional reflections:** School rhetoric/literacy readiness and already-owned `hunter-input-known` may alter presentation only.

**Player-choice function:** off-hours personal conversation/friendship with the recurring Supplier, explicitly distinct from ledger/supply planning. Any romance remains separately opt-in.

**Exact effects:** `incrementRelationshipCounter(merchant.supplier, night-meetings, +1)`; `addRelationshipFact(merchant.supplier, night-supplier-seen)`; no next-day effect.

**Durable route facts:** none. Do not write Supplier trust/utility, Merchant House, Patron, or Speculator readiness.

**Ending contribution:** optional Supplier/House variant only after independent readiness.

**Presentation slot:** `relationship/merchant-supplier/merchant-night-supplier/default`.

**Localization surface:** `night.merchant.supplier.label`, `night.merchant.supplier.body`, `night.merchant.supplier.aria`, `presentation.static.merchant.night.supplier.alt`.

**Save/reload and refusal:** relationship counter + history fact commit once. Non-selection or refusal does not alter existing conflict/utility route.

**Why this is not a hidden gate:** no trust/readiness fact or stat threshold.

## 12. Assassin — optional handler/informant relationship Night

**Stable ID:** `assassin.night.handler-contact`.

**Intent:** relationship-personal, distinct from existing professional `assassin.night.review-notes`.

**Eligibility:** any selected lodging; `assassin.handler` stage in `professional-trust|conflict-open|utility-ready|route-resolved`; `night-handler-seen` absent.

**Relationship extension required:** relationship-local `night-meetings` + `night-handler-seen`.

**School / Activity reflection:** no School gate. Where already available, `assassin/advanced-infiltration-reviewed` may alter presentation only. The Night does not require `assassin.infiltration`.

**Player-choice function:** off-hours contact about trust, boundaries, loyalty, friendship, or an informant relationship rather than covert-work notes. Romance is optional only if separately authored.

**Exact effects:** `incrementRelationshipCounter(assassin.handler, night-meetings, +1)`; `addRelationshipFact(assassin.handler, night-handler-seen)`; no next-day effect.

**Durable route facts:** none. Forbidden outputs include `handler-trust-ready`, `handler-utility-ready`, `handler-takeover-ready`, `refusal-chain-ready`, `turncoat-ready`, `ghost-ready`, and `outcome-ready`.

**Ending contribution:** presentation only after an independent Assassin route exists. This blueprint does not resolve open Assassin advanced-ending authority.

**Presentation slot:** `relationship/assassin-handler/assassin-night-handler-contact/default`.

**Localization surface:** `night.assassin.handler-contact.label`, `night.assassin.handler-contact.body`, `night.assassin.handler-contact.aria`, `presentation.static.assassin.night.handler-contact.alt`.

**Save/reload and refusal:** atomic relationship write once; current handler decline paths remain authoritative and refusal-safe.

**Why this is not a hidden gate:** no refusal evidence or route readiness is manufactured.

## 13. Prostitute — distinct optional personal/relationship continuation

**Stable ID:** `prostitute.night.personal-continuation`.

**Intent:** relationship-personal, distinct from existing professional `prostitute.night.client-followup`.

**Eligibility:** any selected lodging; recurring-client relationship stage `mode-defined|route-resolved`; the already explicit `relationship-mode` choice is `friendship|romance`; `personal-night-seen` absent.

Professional-only mode intentionally does not expose this personal branch and retains the existing professional Night. Friendship is a complete non-romantic personal path.

**School / consent:** no School fact or stat gates this choice. Body Confidence, Lust, Sexuality, and confidence never infer relationship mode or consent.

**Player-choice function:** personally continue a relationship only after the player has already selected friendship or romance. The Night itself remains explicitly optional.

**Exact effects:** `incrementRelationshipCounter(prostitute.recurring-client, night-meetings, +1)`; `addRelationshipFact(prostitute.recurring-client, personal-night-seen)`; `addCareerFact(prostitute, personal-night-continuation-seen)`; no next-day effect.

**Durable route facts:** none; both seen facts are non-gating history.

**Ending contribution:** presentation/relationship variation only. It is not required for ordinary Prostitute Hard Work, Independent House, Elite Clientele, Network/Protection, Palace, or Secret Debt.

**Presentation slot:** `relationship/prostitute-recurring-client/prostitute-night-personal-continuation/default`.

**Localization surface:** `night.prostitute.personal-continuation.label`, `night.prostitute.personal-continuation.body`, `night.prostitute.personal-continuation.aria`, `presentation.static.prostitute.night.personal-continuation.alt`.

**Save/reload and refusal:** explicit relationship mode is already durable before this choice. The Night counter + facts commit once. Declining does not change relationship mode or career state.

**Why this is not a hidden gate:** no debt, forced-night, wage, Lust, Sexuality, or ending-readiness write exists.

## 14. D35 seed — Satyr Maid recurring-guest private space

**Stable ID:** `satyr-maid.night.recurring-guest-private`.

**Intent:** relationship-personal and meaningful Night-heavy third intent.

**Housing:** **normal only**, exact condition `housingTier=normal`. Cheap and street do not satisfy this branch.

**Eligibility:** recurring guest stage `professional-trust|night-contact|request-open|request-resolved`; `private-space-night-seen` absent.

**State consumed:** existing `night-meetings` counter. Optional School facts `school-rhetoric-ready` / `school-boundaries-ready` may alter presentation only.

**Player-choice function:** use private space for a deeper voluntary conversation/boundary-setting continuation. Privacy does not imply romance or intimacy.

**Exact effects:** `incrementRelationshipCounter(satyr-maid.recurring-guest, night-meetings, +1)`; `addRelationshipFact(satyr-maid.recurring-guest, private-space-night-seen)`; no next-day effect.

**Durable route facts:** none.

**Ending contribution:** satisfies the required D35 seed and supplies Satyr Maid's meaningful third Night intent; no career, Hard Work, House Power, Boundary Mastery, or Palace gate.

**Presentation slot:** `night/satyr-maid/satyr-maid-night-recurring-guest-private`.

**Localization surface:** `night.satyr-maid.recurring-guest-private.label`, `night.satyr-maid.recurring-guest-private.body`, `night.satyr-maid.recurring-guest-private.aria`, `presentation.static.satyr-maid.night.recurring-guest-private.alt`.

**Save/reload and refusal:** `housingState.current=normal` must remain stable across reload after lodging resolution. Choice effects commit once. On cheap/street this one choice is omitted; existing public/workplace Night and cheap School Night Study remain available.

**Why this is not a hidden gate:** normal lodging only changes access to this optional content; no progression readiness is written.

## 15. D35 seed — Tavern recurring-traveler private space

**Stable ID:** `tavern.night.traveler-private`.

**Intent:** relationship-personal and meaningful Night-heavy third intent.

**Housing:** **normal only**.

**Eligibility:** recurring traveler stage `trusted|night-request|request-resolved|confidentiality-resolved`; `private-space-night-seen` absent.

**State consumed:** existing `night-meetings`. Optional `school-broker-ready`, `school-records-ready`, `school-etiquette-ready`, and Tavern `activity-returned` may alter presentation only.

**Player-choice function:** private-space conversation around personal context, confidentiality, or safety without automatically resolving the existing confidentiality decision.

**Exact effects:** `incrementRelationshipCounter(tavern.recurring-traveler, night-meetings, +1)`; `addRelationshipFact(tavern.recurring-traveler, private-space-night-seen)`; no next-day effect.

**Durable route facts:** none. Specifically do not write `confidentiality-kept`, `rumour-confirmed`, `information-broker-ready`, `sanctuary-ready`, or `innkeeper-ready`.

**Ending contribution:** D35 seed + Tavern Night-heavy third intent; optional variants only.

**Presentation slot:** `night/tavern/tavern-night-traveler-private`.

**Localization surface:** `night.tavern.traveler-private.label`, `night.tavern.traveler-private.body`, `night.tavern.traveler-private.aria`, `presentation.static.tavern.night.traveler-private.alt`.

**Save/reload and refusal:** normal housing persists through pending Night choice; effect is one atomic commit. Cheap/street omit only this private branch and retain existing Tavern public/workplace choices.

**Why this is not a hidden gate:** it does not shortcut information/confidentiality/career routes.

## 16. D35 seed — Prostitute recurring-client private space

**Stable ID:** `prostitute.night.client-private`.

**Intent:** relationship-personal and meaningful Night-heavy third intent.

**Housing:** **normal only**.

**Eligibility:** recurring-client stage `professional-trust|mode-open|mode-defined|route-resolved`; `private-space-night-seen` absent. Existing relationship mode can change presentation but is not required to expose private-space access.

**Consent firewall:** no Lust, Sexuality, Body Confidence, confidence, work-meeting count, or housing payment can infer consent. If an authored sub-branch moves toward intimacy/romance, it requires its own explicit player command.

**Player-choice function:** explicitly choose a private-space continuation that may remain professional, friendship-oriented, or follow an already explicit romance mode.

**Exact effects:** `incrementRelationshipCounter(prostitute.recurring-client, night-meetings, +1)`; `addRelationshipFact(prostitute.recurring-client, private-space-night-seen)`; `addCareerFact(prostitute, private-space-night-seen)`; no next-day effect.

**Durable route facts:** none; no Secret Debt facts or route semantics.

**Ending contribution:** D35 seed + Prostitute Night-heavy third intent; no ordinary Prostitute ending, Hard Work, Palace, or Secret Debt gate.

**Presentation slot:** `night/prostitute/prostitute-night-client-private`.

**Localization surface:** `night.prostitute.client-private.label`, `night.prostitute.client-private.body`, `night.prostitute.client-private.aria`, `presentation.static.prostitute.night.client-private.alt`.

**Save/reload and refusal:** normal lodging must already be committed. The Night effects, lodging payment, and calendar advance must each remain idempotent across reload. Cheap/street omit this private branch but retain eligible public/workplace Night; cheap retains School Night Study.

**Why this is not a hidden gate:** ordinary Prostitute gets no debt, coercion, forced-night, next-day penalty, Lust/Sexuality write, or Secret Debt ownership.

## 17. Cross-cutting acceptance invariants

A producer implementation of this blueprint is incorrect if any of the following occurs:

1. A new choice becomes forced, or romance becomes mandatory.
2. Lust, Sexuality, Body Confidence, confidence, housing payment, or a relationship counter is treated as consent.
3. `prostitute.night.personal-continuation` or `prostitute.night.client-private` receives Secret Debt interception, debt, coercion, forced-work, or mandatory next-day Energy semantics.
4. Any D35 seed is available from cheap or street housing.
5. Adding D35 removes School Night Study from cheap lodging or globally re-gates existing public/workplace Night.
6. A new `*-seen` history fact is consumed by Hard Work, career stage promotion, Palace qualification, or ending eligibility.
7. A professional Night increments the daytime progression counter it narrates (for example report duties, deliveries, expedition count) merely to make the Night numerically useful.
8. Secret Debt forced Night does not suppress these voluntary choices.
9. Palace optional Night is allowed to outrank a forced Secret Debt Night.
10. A content effect advances the calendar directly in addition to shared NightFlow.
11. A global affinity/romance/consent score is introduced.
12. Any row becomes a filler +stat action whose sole purpose is satisfying the D37 count.

## 18. Producer queue

### Group 1 — content-only surfaces that can be produced immediately

These need authored NightChoice data, localization, presentation binding, and focused tests only. They do not require a core runtime/schema/UI change:
- `lumber.night.foreman-social`;
- `hunter.night.field-debrief`;
- `guard.night.case-debrief`;
- `merchant.night.ledger-plan`;
- `prostitute.night.personal-continuation`;
- `satyr-maid.night.recurring-guest-private`;
- `tavern.night.traveler-private`;
- `prostitute.night.client-private`.

The three D35 rows are in this group because `housingTier=normal` already exists as a condition surface. Their implementation should not invent a new generic `private_space` resource, meter, capability registry, or UI mode.

### Group 2 — surfaces requiring relationship-state extension

These require a narrow extension to the named relationship content contract: one relationship-local `night-meetings` counter plus one non-gating history fact. They still require **no engine or broad relationship-system change**:
- `hunter.night.senior-guide`;
- `guard.night.partner`;
- `merchant.night.supplier`;
- `assassin.night.handler-contact`.

Each extension is local to one existing relationship. No affinity meter, romance meter, or universal relationship counter should be added.

### Group 3 — surfaces requiring housing/private-space runtime support

**None in this v9 ordinary-career closure.**

The current condition model already exposes `housingTier=normal|cheap|street`, so the three required D35 seeds can be authored as normal-only choices without a runtime rewrite. If an implementation attempt discovers that a specific producer stack does not project the committed Night housing tier into NightChoice conditions, that is a narrowly scoped integration defect to escalate; it is not authority to invent a broader housing subsystem.

### Group 4 — surfaces that must wait for Secret Debt / Palace / Activity runtime

**None of the twelve mandatory ordinary-career surfaces is blocked on those runtimes.**

Existing typed Activity facts may be used only as optional presentation reflections where already shipped. Activity camp Night, production Secret Debt forced-Night consumer work, and Palace optional Night are separate missing systems identified by v8 and are explicitly outside this blueprint. Ordinary-career D37 closure must not be held hostage to them, and these content producers must not implement those systems opportunistically.

## 19. Focused producer test contract

Full CI is not part of this producer task. Future content producers should run focused/static checks that prove:
- all twelve stable IDs are unique;
- the nine non-private surfaces have no `housingTier=normal` gate;
- exactly the three D35 seed IDs require `housingTier=normal`;
- no D35 seed accepts cheap/street;
- every new Night choice has empty next-day effects and zero next-day Energy delta;
- no new effect modifies stats, money, debt, housing, Lust, Sexuality, or calendar;
- relationship rows write only the named local counter/history facts;
- professional rows do not increment daytime career progression counters;
- no new history fact appears in ending eligibility or career-stage transition conditions;
- ordinary Prostitute rows contain no Secret Debt/forced-night ownership;
- existing `school.night_study.*` normal/cheap availability remains unchanged;
- forced Secret Debt precedence and shared one-CalendarAdvance NightFlow are preserved by absence of content-level overrides;
- save/reload around voluntary-choice commit cannot duplicate the new effects.

## 20. Delivery boundary

The implementation source of truth for row-level detail is the companion CSV plus this document. This blueprint does not contain final scene prose and does not authorize production runtime/UI edits.

Once the two documentation artifacts are frozen, Chat 4 should not amend the frozen head. Leader owns later acceptance/assembly decisions.
