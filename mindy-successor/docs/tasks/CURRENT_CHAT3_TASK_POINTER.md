# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — TRADE CORRIDOR PRODUCTION v13**
Owner: Chat 3

Accepted frozen producer candidate:
`chat3/forest-frontier-production-hardening-v12@d151e4b99378d56bf17397cc0df8aa0fffa9d68a`

Leader disposition:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

Forest v12 now provides the first production-ready D36 region candidate:
- typed Field Time;
- deterministic save/resume;
- Tracking Triangulation state;
- success / failure / escape;
- seasonal/capability route structure;
- compatibility with existing Lumber/Tavern/Undead/Hunter Forest consumers.

Do not modify the frozen v12 head.

## New assignment

Build D36 Region 2 — **Trade Corridor** — on top of the accepted Forest/shared Activity runtime.

New branch:
`chat3/trade-corridor-production-v13`

Base:
`d151e4b99378d56bf17397cc0df8aa0fffa9d68a`

No full CI.

## Production target

Trade Corridor is early/mid Activity content and must be a real playable region, not a single event.

Implement a functional non-final-lore region with:
- at least 3 route contexts;
- at least 1 shortcut;
- at least 1 capability/fact-gated option;
- at least 1 season-sensitive edge;
- at least 1 information/risk choice;
- >=2 meaningful capability/equipment hooks;
- Field Time through the shared D36 runtime;
- explicit continue/detour/escape;
- success/failure/escape;
- deterministic save/reload;
- city preparation -> Activity feedback;
- Activity -> city/career/contact feedback;
- at least one contact/network thread suitable for the D38 Network family.

Do not create a universal Activity XP bar.

## Mini-game rule

Reuse the accepted D36 mini-game families only.

Trade Corridor may reuse Tracking Triangulation where route verification fits.
Do not invent a fourth universal mini-game family.

Do not implement final Restricted-Sites Infiltration ownership here unless only a minimal shared registry/interface is required.

## D38 seams

Add typed Trade Corridor anchor/result markers sufficient for later:
- Pathfinder;
- Preservation where justified;
- Network;
- meaningful extracted evidence/sample/capability;
- contact thread.

Do not make any standalone Activity ending reachable from Trade Corridor + Forest alone unless the exact D38 common baseline is genuinely satisfied.

## Compatibility

Preserve all Forest v12 typed results and current ordinary-career consumers.
Do not regress D23, NightFlow, Secret Debt boundaries or Activity entry cost = 2 Energy.

## Focused QA

Producer worker: no full CI.

Run focused:
- typecheck;
- validate;
- build;
- Forest v12 regressions;
- new Trade Corridor route tests;
- Field Time/save-reload;
- success/failure/escape;
- season edge;
- capability hooks;
- contact thread;
- D38 non-premature ending eligibility;
- 2-Energy entry preservation.

Deliver:
`mindy-successor/docs/tasks/CHAT3_TRADE_CORRIDOR_PRODUCTION_v13.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
