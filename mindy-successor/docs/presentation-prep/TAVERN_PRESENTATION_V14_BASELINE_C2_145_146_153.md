# Tavern Presentation v14 baseline — C2-145 / C2-146 / C2-153

Owner: Chat 2 / Presentation & Media
Branch: `chat2/tavern-presentation-v14-final`
Preparation baseline: `main@778494d2d2bcefdfa714630e01a0331c570d7d94`
Final frozen runtime base: PR #187 exact head `38c58ccdaa1d357f189cd640053d0b2a8605b9b4`
C1D-121 contract first read at `chat1/tavern-complete-v12@7bf2531f208c8b3faf5f83c16064885b6295167b`.

## C2-145 — COMPLETE

The full contract-backed identity inventory now lives in:
`mindy-successor/docs/presentation-prep/TAVERN_RUNTIME_IDENTITY_INVENTORY_C2_145.md`.

Before the contract appeared, Chat 2 inventoried only already-live Tavern shift/result/seasonal/ending identities. After contract publication, no traveler relationship event IDs were invented. Finalization binds the additional exact relationship/Night/information event IDs only after they exist in frozen runtime PR #187.

## C2-146 — COMPLETE

Current production already owns four dedicated Tavern seasonal SVGs:
- `career-tavern-shift-spring.svg`;
- `career-tavern-shift-summer.svg`;
- `career-tavern-shift-autumn.svg`;
- `career-tavern-shift-winter.svg`.

No project-owned Tavern motion candidate exists in the presentation asset directory. The v14 candidate therefore intentionally keeps the four seasonal slots static-only rather than fabricating GIF/video sources. Regression coverage proves animations-on and animations-off both resolve to the same project-owned seasonal static asset with RU/EN alt/caption parity.

## C2-153 — COMPLETE

The four assigned ending IDs map to four distinct semantic presentation IDs:
- `tavern-stay` -> `ending/tavern-stay`;
- `tavern-guild` -> `ending/tavern-guild`;
- `tavern-court` -> `ending/tavern-court`;
- `ending.tavern.hard-work` -> `ending/tavern/hard-work`.

All four are live production ending definitions, have stable project-owned static fallback, and keep RU/EN title/description plus presentation alt/caption coverage. Gameplay IDs, conditions, rewards and epilogues are preserved.

## Finalization gate

C2-147..154 are finalized against frozen runtime PR #187. C2-155 removes preparation-only Tavern event reservations and proves live production reachability plus animation-off/missing-GIF fallback safety. C2-156 freezes only after full exact-head repository CI is green.
