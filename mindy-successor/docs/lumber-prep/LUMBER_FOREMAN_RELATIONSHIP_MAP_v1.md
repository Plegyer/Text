# Lumber Foreman Relationship Map v1

Status: ISOLATED DATA/DESIGN DRAFT. Not loaded by the live catalog.

Authority:
- LUMBER_RELATIONSHIP_CHAIN_v0.md
- RELATIONSHIP_TRIGGER_MODEL_v1.md
- CAREER_LUMBER_DRAFT_v0.md
- PRODUCT_ACCEPTANCE_SLICE_v0.md
- EXECUTABLE_TZ_v1.md

The NPC remains identified only by role: Foreman / senior worker. No name, race detail beyond the existing dwarf-crew context, romance prose, or final personality is invented here.

## 1. Relationship identity and state

Relationship ID: `lumber_foreman`.

Stages from the source draft:
- `unknown`
- `professional`
- `trusted`
- `personal_open`
- `route_professional`
- `route_close`
- `route_rival`
- `resolved`

Counters:
- `jointShifts`
- `nightMeetings`

Facts:
- `respects_work`
- `knows_private_problem`
- `helped_crew`
- `forest_request_open`
- `boundary_respected`
- `boundary_crossed`

Optional meters:
- respect/trust remain candidate-only and are not required by this map.

## 2. Ownership rule

`RelationshipRunState[lumber_foreman]` owns:
- relationship stage;
- relationship counters;
- relationship route choice/facts.

Lumber career may publish facts such as `foreman_noticed_player` and work-context reactions. It must not set the relationship stage directly.

School, Activity, items, Tavern/Hunter hooks, and housing/night may publish external/public facts or create actions. They must not directly rewrite this relationship's internal stage.

## 3. Transition map

### R01 `foreman_notice_work`
From: `unknown`  
To: `professional`

Trigger:
- Lumber first career milestone publishes `foreman_noticed_player`.

Effects:
- relationship opens at 0 daytime Energy;
- Foreman-aware shift overlays become eligible;
- no night meeting is required immediately.

Presentation:
- `relationship/lumber-foreman/professional/open`.

### R02 `foreman_build_trust`
From: `professional`  
To: `trusted`

Conditions from source:
- several joint work contexts;
- at least one meaningful work choice;
- no unresolved serious crew-conflict fact, or that conflict has been resolved.

Exact joint-shift threshold remains OPEN.

Effects:
- add `respects_work`;
- enable a voluntary evening/night opportunity through Night flow.

This transition is a 0-Energy resolver milestone.

Presentation:
- `relationship/lumber-foreman/trusted/milestone`.

### R03 `foreman_reveal_problem`
From: `trusted`  
To: `personal_open`

Delivery:
- voluntary Night meeting or another source-supported contextual meeting after trust;
- Night meeting uses the Night slot, not daytime Energy.

Scene purpose:
- reveal the source-supported crew/old-boundary problem;
- add `knows_private_problem`;
- add `forest_request_open`.

The Foreman does not know the full truth. No new explanation of the forest problem is introduced here.

Presentation:
- `relationship/lumber-foreman/night/problem-reveal`.

### R04A `foreman_choose_professional_route`
From: `personal_open`  
To: `route_professional`

Player intent:
- help while remaining professionally aligned.

Rules:
- professional route must remain fully viable;
- no romance/close requirement for career leadership;
- can support Forewoman/partnership outcomes.

Presentation:
- `relationship/lumber-foreman/route/professional`.

### R04B `foreman_choose_close_route`
From: `personal_open`  
To: `route_close`

Player intent:
- explicitly choose personal closeness.

Rules:
- close/romantic content is always choice-gated;
- Lust may expose optional variants but does not replace consent/choice;
- rejection/decline of one opportunity need not close the entire relationship.

Presentation:
- `relationship/lumber-foreman/route/close`.

### R04C `foreman_choose_rival_route`
From: `personal_open` or a later professional conflict point  
To: `route_rival`

Source-supported causes:
- publicly challenge a Foreman decision;
- hide important information;
- choose the opposite side in the forest conflict.

Rules:
- rival is a valid route, not a generic failure;
- it can feed an independent/leadership outcome.

Presentation:
- `relationship/lumber-foreman/route/rival`.

### R05 `foreman_external_result_reaction`
From:
- `personal_open`
- `route_professional`
- `route_close`
- `route_rival`

Trigger:
- accepted external fact appears, especially `forest_truth_known`, `old_ledger_understood`, `old_route_rumor`, or `forest_tracks_confirmed`.

Behavior:
- resolver creates the appropriate relationship continuation at 0 daytime Energy;
- route choice determines presentation/choices, not whether the external result is noticed;
- can add `helped_crew` where the result genuinely resolves a crew problem.

Presentation:
- `relationship/lumber-foreman/external-result/default`, with route-specific text variants and optional media override.

### R06 `foreman_resolve_route`
From:
- `route_professional`
- `route_close`
- `route_rival`

To: `resolved`.

Final relationship ending requirements/text are OPEN in the source docs, so this transition remains a placeholder for later authored outcome definitions. It must not be required for Lumber Hard Work.

## 4. Reactive 0-Energy milestones

The following are relationship reactions, not paid relationship actions:
- initial professional opening after Lumber milestone;
- trust milestone after work counter/fact gate;
- reaction when School produces a relevant fact;
- reaction when Activity returns a relevant forest result;
- reaction after a Night counter reaches a relationship threshold;
- route-specific career feedback after a relevant fact.

No generic daytime "date" button is required.

Explicit exceptions may exist later only as separately defined actions with their own cost, such as a paid dinner/day trip/joint Activity. None is required by this draft.

## 5. Night meetings

Night behavior follows the target contract:
- uses one Night slot;
- does not spend daytime Energy;
- normally does not reduce next-day Energy;
- increments `nightMeetings` exactly once when the meeting actually occurs;
- can trigger a 0-Energy relationship milestone on next hub entry.

Housing/override rules:
- normal housing supports normal Night/privacy;
- cheap housing may restrict privacy/Night options;
- street housing has restricted Night;
- an active Secret Debt forced night may intercept the slot;
- interception is not counted as player rejection of the Foreman.

Suggested source-grounded seasonal staging, without four separate relationship lines:
- spring: after muddy/wet work or repair context;
- summer: late conversation after heat;
- autumn: pressure from high demand;
- winter: difficult road/risk/shelter context.

These are presentation/context variants only.

## 6. Professional route guarantee

The player must be able to:
- open the relationship through work;
- earn trust;
- learn about the external problem;
- help via School/Tavern/Hunter/item/Activity;
- resolve career consequences;
- remain on `route_professional`;
- qualify for Forewoman/professional outcomes without choosing romance/close content.

A declined close option must not erase `respects_work`, external facts, or professional career eligibility unless a later explicit conflict choice does so.

## 7. External hooks

### School
Supported fact:
- `old_ledger_understood`.

Source:
- literacy/accounting-style School progress.

Effect:
- can advance the external problem;
- can provide a Forewoman supply/legal/records solution;
- must trigger resolver immediately when the fact appears.

### Tavern
Supported fact:
- `old_route_rumor`.

Effect:
- provides route/history clue;
- does not itself force relationship route choice.

### Hunter
Supported fact:
- `forest_tracks_confirmed`.

Effect:
- confirms forest route information;
- may support Forest Activity preparation.

### Item
`old_boundary_token` / capability `enter_old_boundary`:
- opens the old-boundary Activity route;
- can also act as evidence in the Lumber problem.

Other source-supported items:
- `reinforced_axe` for work/Activity/Forewoman production solution;
- `rope_kit` for rough-route Activity access;
- `field_preservation_kit` for preserving an Activity specimen.

### Forest Activity
Key result:
- `forest_truth_known`.

Other source result facts:
- `forest_resource_exploitable`;
- `forest_protection_needed`;
- `forest_evidence_collected`.

`ActivityCompleted` plus the returned fact must be enough to trigger the relationship/career continuation without another Lumber shift.

## 8. Career feedback

Source-grounded feedback:
- `respects_work` -> additional L2 milestone choice/context;
- `old_ledger_understood` -> Forewoman supply/legal solution;
- `forest_truth_known` -> immediate Forest branch continuation after Activity;
- `route_rival` -> leadership scene uses conflict/rival context rather than support.

No relationship stage directly changes career stage. Career transitions react to public facts/choices.

## 9. Boundary facts

`boundary_respected` and `boundary_crossed` are retained from the source typed state.

Rules:
- they record an explicit relationship boundary choice/outcome;
- high Lust cannot set `boundary_crossed` automatically;
- route_close still requires explicit player choice;
- one declined opportunity does not necessarily resolve the route permanently.

Exact explicit-content handling remains outside this data-prep task.

## 10. Save/reload boundaries

Must be deterministic:
- before an offered Night meeting;
- during a pending relationship scene;
- after an external fact becomes true but before its queued/latched reaction resolves;
- after route choice.

Reload must not:
- increment `nightMeetings` twice;
- replay one-shot facts/effects;
- reroll a pending scene variant.

## 11. Open questions

- Exact number of joint shifts/night meetings for trust milestones.
- Whether respect/trust numeric meters are needed at all.
- Final Foreman name/personality.
- Exact relationship ending roster.
- Exact close-route content.
- Whether any relationship result persists into Meta as a contact/knowledge unlock.
