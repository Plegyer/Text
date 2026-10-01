# Guard Presentation v16 — C2-170 through C2-179

Status: PREP COMPLETE / LIVE BINDING WAITS FOR FROZEN GREEN RUNTIME
Owner: Chat 2 / Presentation & Media
Working branch: `chat2/guard-presentation-v16`
Current prep base: main `146b84127e6c4236a7be9b7fac577d90d5d1fe6a`
Observed mutable Guard runtime: PR #208 @ `9dffd8eb97c6db14dd270b494b4285b82111cdc0`, CI #791 FAILURE.

## C2-170 — ordinary seasonal Guard work

Existing project-owned static assets remain authoritative:
- `career-guard-shift-spring.svg`
- `career-guard-shift-summer.svg`
- `career-guard-shift-autumn.svg`
- `career-guard-shift-winter.svg`
- `career-guard-result.svg`

No Guard GIF/video is fabricated. The generic result fallback copy now presents ordinary city duty and official access rather than a combat/use-of-force mechanic. Existing `guard.shift` remains runtime-owned 1-Energy work.

## C2-171 — nine career-stage surfaces

Prepared stable semantic IDs:
- `job/guard/stage/<stage>`

The presentation registry emits a Guard stage slot only when the production career definition actually contains that stage. On current main only `recruit` exists, so the prep branch cannot reserve the other eight stages as fake production identities. Once a frozen runtime supplies all nine stages, the same registry code will expose all nine without changing career state.

The Work card exposes the persisted stage as a focusable RU/EN presentation-only status. Veteran / Officer / Reform / Network / Major Case remain career/readiness routes, not ending cards.

## C2-172 — professional `guard.partner`

Prepared semantic IDs:
- `relationship/guard-partner/stage/<stage>`

Relationship surfaces are emitted only if the live catalog contains `guard.partner` and the matching stage.

Pending-scene presentation hooks are prepared for:
- work introduction;
- professional trust;
- conflict open/resolution;
- case support;
- cooperation;
- rivalry;
- refusal;
- case-support acceptance/refusal.

Refusal copy explicitly preserves ordinary Guard duty. No romance requirement or career-loss implication is added.

## C2-173 — city duty / evidence

Prepared qualitative status surfaces:
- city dispute resolved;
- crowd pressure resolved;
- duty report evidence;
- pass discrepancy evidence;
- poverty response recorded.

Status slots are runtime-conditional and appear only if the corresponding fact is present in real Guard runtime content. No morality or corruption meter is added.

Live event overrides are intentionally **not** added to `content/presentation.json` during mutable-runtime prep. Final C2-180 will bind only event IDs present on the exact frozen runtime.

## C2-174 — poverty + Tavern only

Prepared status surfaces consume only:
- `poverty-response-recorded`;
- `tavern-evidence-known`.

The exact current Tavern event authority is `guard.cross.tavern-receipt`.

No Secret Debt clearing, Merchant cargo proof, Palace access/case event, Assassin hook, or Prostitute hook is prepared as a live production presentation ID.

## C2-175 — Badge / Sealed Pass

Prepared semantic IDs:
- `job/guard/item/guard_badge`
- `job/guard/item/guard_sealed_pass`

They are emitted only if the real item definitions exist. Work-card chips describe official access/options only. They do not depict immunity, combat bonuses, or generic legal authority.

## C2-176 — School boundary

Five School-ready facts are recorded in C2-169, but presentation publishes no `guard.school.*` event because the observed runtime has no live consumer. Numeric thresholds stay null and are not surfaced or invented.

## C2-177 — crisis + route readiness

Prepared qualitative state presentation:
- Veteran readiness;
- Officer readiness;
- Reform readiness;
- Network readiness;
- Major Case thread/readiness;
- crisis resolved.

The exact observed crisis is `guard.crisis.market-gate-pressure`. Presentation-only post-choice feedback is prepared for report, de-escalation, network/access, and defer choices. It does not mutate runtime facts and creates no public complex ending.

## C2-178 — existing ending only

`ending.guard.hard-work` remains the only Guard ending surface. Existing static fallback and RU/EN presentation remain in place. No Officer/Reform/Network/Major Case ending and no new Meta reward are added.

## C2-179 — RU/EN, accessibility, fallback, reachability prep

Prepared:
- RU/EN stage, relationship, item, state and crisis-feedback copy;
- focusable Guard stage/partner/item/status elements;
- pending partner scene region labeling;
- explicit refusal/cooperation/rivalry/case-support data states;
- static-only Guard fallback using project-owned SVG assets;
- animation-off compatibility by construction;
- runtime-conditional slot generation so mutable prep cannot reserve fake IDs;
- a final reachability checklist that requires real frozen production identities.

Presentation/media resolution remains outside Save/RNG and does not author gameplay facts.

## C2-180 blocker

C2-180 is not complete and must not be marked complete until Chat 1 publishes one exact frozen green Guard runtime head. At that point this prep delta must be rebuilt directly on that head, every event/item/stage/state override re-audited against the real production catalog, full CI run on the exact final head, and one clean candidate frozen for Chat 4.
