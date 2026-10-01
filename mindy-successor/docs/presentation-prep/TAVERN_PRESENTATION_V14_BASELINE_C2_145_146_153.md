# Tavern Presentation v14 baseline — C2-145 / C2-146 / C2-153

Owner: Chat 2 / Presentation & Media
Branch: `chat2/tavern-presentation-v14`
Baseline: current `main@778494d2d2bcefdfa714630e01a0331c570d7d94`

## C2-145 pre-contract inventory

The C1D-121 Tavern runtime contract is not yet published on the authoritative branch or an available Tavern runtime branch, so gameplay-stage/event/relationship/Night/School/item/Activity/crisis IDs are deliberately not invented or pre-bound.

Existing production identities already safe to inventory:
- action: `tavern.shift`;
- result presentation: `job/tavern/result/default`;
- seasonal presentation: `job/tavern/shift/{spring|summer|autumn|winter}/default`;
- existing endings: `tavern-stay`, `tavern-guild`, `tavern-court`, `ending.tavern.hard-work`.

C2-145 remains open until the C1D-121 contract appears; this document records the safe baseline only.

## C2-146 seasonal work pools — COMPLETE

Current production already owns four dedicated Tavern seasonal SVGs:
- `career-tavern-shift-spring.svg`;
- `career-tavern-shift-summer.svg`;
- `career-tavern-shift-autumn.svg`;
- `career-tavern-shift-winter.svg`.

No project-owned Tavern motion candidate exists in the presentation asset directory. The v14 baseline therefore intentionally keeps the four seasonal slots static-only rather than fabricating GIF/video sources. The focused regression proves animations-on and animations-off both resolve to the same project-owned seasonal static asset with RU/EN alt/caption parity.

## C2-153 endings — COMPLETE on current assigned identities

The four queue-assigned ending IDs map to four distinct semantic presentation IDs:
- `tavern-stay` -> `ending/tavern-stay`;
- `tavern-guild` -> `ending/tavern-guild`;
- `tavern-court` -> `ending/tavern-court`;
- `ending.tavern.hard-work` -> `ending/tavern/hard-work`.

All four are live production ending definitions, have stable project-owned static fallback, and have RU/EN title/description plus alt/caption coverage. Gameplay IDs, conditions, rewards and epilogues are preserved.

## Dependency gate

C2-147..152 and the full C2-154 surface depend on the exact C1D-121 Tavern runtime contract. C2-155 production reachability must wait for a frozen exact runtime candidate and must consume its real catalog IDs. No preparation-only event reservation is added here.
