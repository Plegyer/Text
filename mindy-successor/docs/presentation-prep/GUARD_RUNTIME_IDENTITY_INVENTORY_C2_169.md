# C2-169 — Guard runtime identity inventory

Status: COMPLETE FOR PREP / FINAL RE-AUDIT REQUIRED
Owner: Chat 2 / Presentation & Media
Working runtime authority: PR #208 `chat1/guard-complete-v14`
Observed runtime head: `9dffd8eb97c6db14dd270b494b4285b82111cdc0`
Observed exact-head CI: #791 / id `36867128236` — FAILURE
Authoritative contract on observed head: `mindy-successor/docs/tasks/GUARD_RUNTIME_CONTRACT_v1.json`

This inventory is preparation authority only. PR #208 is mutable and red at this checkpoint; C2-180 must re-query one frozen green Guard runtime head and re-audit every identity below before final publication.

## Ordinary work

Action:
- `guard.shift`
- runtime authority: ordinary paid work, 1 Energy.

Existing project-owned seasonal presentation:
- `job/guard/shift/spring/default`
- `job/guard/shift/summer/default`
- `job/guard/shift/autumn/default`
- `job/guard/shift/winter/default`
- result fallback: `job/guard/result/default`

The existing static result fallback was rewritten to describe ordinary duty and official access, not generic combat or use-of-force mechanics.

## Career stages

Career ID: `guard`.

Observed stages:
- `recruit`
- `trusted-guard`
- `senior-guard`
- `veteran`
- `officer`
- `reform-order`
- `network`
- `major-case`
- `outcome-ready`

Observed career events:
- `guard.career.first-shift`
- `guard.career.senior`
- `guard.career.duty-breadth`
- `guard.career.veteran-ready`
- `guard.career.choose-route`
- `guard.career.choose-major-case`
- `guard.career.outcome-ready`

Veteran / Officer / Reform Order / Network / Major Case are route or readiness surfaces, not public ending cards.

## Professional partner

Relationship ID: `guard.partner`.

Observed stages:
- `introduced`
- `professional-trust`
- `conflict-open`
- `cooperation-ready`
- `route-resolved`

Observed relationship events:
- `guard.relationship.intro`
- `guard.relationship.trust`
- `guard.relationship.conflict-open`
- `guard.relationship.conflict-resolve`
- `guard.relationship.case-support`

Presentation choice states prepared:
- cooperation;
- professional rivalry;
- refusal;
- case support acceptance/refusal.

`refusal-respected` is presentation-safe and must never imply loss of ordinary Guard work.

## City duty / evidence

Exact observed city events:
- `guard.city.dispute`
- `guard.city.crowd-pressure`
- `guard.city.suspicious-pass`
- `guard.city.poverty-response`
- `guard.city.formal-report`

Qualitative evidence/readiness facts prepared for presentation include:
- `city-dispute-resolved`
- `crowd-pressure-resolved`
- `duty-report-evidence`
- `cargo-pass-evidence`
- `poverty-response-recorded`

No Morality stat and no corruption currency are represented.

## Access items

Observed items/capabilities:
- `guard_badge` -> `official_guard_access`
- `guard_sealed_pass` -> `guard_sealed_pass`

Observed access events:
- `guard.access.badge`
- `guard.access.sealed-pass`
- `guard.access.evidence-ledger`

Presentation treats these as access/option capabilities only. It adds no immunity, combat bonus, or generic law privilege.

## Cross-system seams

Live on observed runtime:
- ordinary poverty consumer -> `poverty-response-recorded`
- exact Tavern consumer -> `guard.cross.tavern-receipt`
- exact Tavern flags consumed by runtime: `forest.receipt`, `tavern.resolved`

Absent on observed runtime and therefore not publishable:
- Secret Debt clearing;
- Merchant cargo/licensing result identity;
- Palace access/case event;
- Assassin or Prostitute Guard consumer.

## Crisis / late-route readiness

Observed crisis:
- `guard.crisis.market-gate-pressure`

Observed route events:
- `guard.routes.officer-ready`
- `guard.routes.reform-ready`
- `guard.routes.network-ready`
- `guard.routes.major-case-ready`

Prepared qualitative route facts:
- `veteran-ready`
- `officer-route-ready`
- `reform-route-ready`
- `network-route-ready`
- `major-case-thread-ready`
- `major-case-ready`
- `crisis-resolved`

These are readiness/status surfaces only.

## School boundary

Observed School-ready facts:
- `school-literacy-ready`
- `school-rhetoric-ready`
- `school-etiquette-ready`
- `school-physical-ready`
- `school-arcana-ready`

All five numeric thresholds are `null` in the observed contract.

No live `guard.school.*` event consumer was observed, so v16 prep publishes no Guard School event presentation identity.

## Ending

Only public Guard ending authority:
- `ending.guard.hard-work`
- Meta reward authority remains runtime-owned `hardWork:guard`.

No Officer / Reform / Network / Major Case ending or new Meta reward is authorized.

This inventory changes no gameplay conditions/effects/rewards, Save/RNG, career state, School/NightFlow/Activity mechanics, economy, ending eligibility, or Meta.
