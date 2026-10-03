# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE PLAYER-FACING UI v16**
Owner: Chat 6

Accepted frozen producer candidate:
`chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Leader disposition:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

v15 provides the Palace rich-six runtime candidate:
- typed Palace progression state;
- 15 structural duties;
- 2/5/8/12/15 milestones;
- support/prep envelope;
- D43 cadence/economy;
- non-True ending eligibility;
- True Ending gate infrastructure;
- D39 reward seams;
- save/reload hardening.

Do not mutate frozen v15.

## New assignment

Build the player-facing Palace daytime/progression UI on top of v15.

New branch:
`chat6/palace-player-facing-ui-v16`

Base:
`40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

No full CI.

## UI scope

Expose only state/actions already authorized by D23/D29/D39/D43/v15.

Implement:
- Palace access state after legitimate invitation acceptance;
- current Palace stage;
- structural duty progress `x / 15`;
- whether today's structural duty is already used;
- available structural duty action;
- exact Energy cost = 1;
- wage preview from current bounded formula where current UI patterns permit;
- support/prep availability;
- support daily-use lock;
- route-prep state for Service Life / Court Power / Inner Truth;
- Outcome Ready state;
- eligible Palace endings;
- explicit D16 commit choice.

Do not expose inaccessible route facts as spoilers.

## True Ending presentation

Show True Return Home eligibility only when the full runtime predicate is satisfied:
- Palace progression complete;
- all 12 progression stats >=91;
- Lust excluded;
- Prince confrontation defeated/completed;
- explicit Return Home commit available.

Do not invent final Prince/lore text.

## Strong Meta reward presentation seam

Do not create duplicate Strong Meta UI.

For Palace ending reward previews:
- use exact D39 reward IDs/names;
- show a clear “future-life reward” explanation;
- leave selection/loadout controls to the Strong Meta owner/runtime/UI layer.

Cap-200 remains one normal Specialist.

## Secret Debt / Night / lodging

UI must not imply:
- bound Secret Debt revokes Palace access;
- Palace Night overrides forced Debt Night;
- normal lodging is required for Palace daytime work;
- extra Energy allows a second duty.

If bound state is not yet wired on this branch, do not invent it; keep presentation compatible with later D19 integration.

## Localization/accessibility

Provide RU/EN strings for all new UI.
Preserve current accessibility/fallback conventions.

No final Palace lore names beyond accepted functional labels.

## Focused QA

No full CI.

Run focused:
- typecheck;
- validate;
- build;
- Palace v15 runtime test;
- D23 invitation regression;
- UI tests for stage/progress/daily locks;
- one-duty/day presentation;
- support availability;
- ending eligibility/explicit commit;
- True predicate 12x91, Lust excluded;
- no permanent Palace unlock;
- no Hard Work Palace card;
- localization completeness.

Deliver:
`mindy-successor/docs/tasks/CHAT6_PALACE_PLAYER_FACING_UI_v16.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
