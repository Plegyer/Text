# Hunter Presentation v15 — C2-158 through C2-166

Owner: Chat 2 / Presentation & Media
Frozen Hunter runtime base: PR #201 exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`
Related Hunter School authority: PR #199 exact head `f04c93db866b1d2603f6917b41297670f86b0bef`

## C2-158 — ordinary seasonal work

Existing project-owned Hunter static assets remain the presentation source for Spring/Summer/Autumn/Winter ordinary shifts:
- `career-hunter-shift-spring.svg`
- `career-hunter-shift-summer.svg`
- `career-hunter-shift-autumn.svg`
- `career-hunter-shift-winter.svg`

No Hunter GIF/video candidate exists in the project-owned presentation asset set, so v15 keeps ordinary seasonal work static-only rather than fabricating animation. This is intentionally distinct from `hunter.expedition`.

## C2-159 — career stages

All eight frozen career stages receive stable semantic Presentation IDs:
`job/hunter/stage/<stage>`.

The Hunter Work card exposes the persisted stage as a focusable presentation-only status with RU/EN labels and static alt/caption fallback. No career transition or readiness fact is authored by Chat 2.

## C2-160 — senior guide relationship

All five live relationship events receive exact live event presentation overrides:
- intro;
- trust;
- conflict-open;
- conflict-resolve;
- companion.

All five typed relationship stages also receive presentation-only stage surfaces. Pending relationship scenes expose presentation state and explicit choice states for cooperation, rivalry, refusal, companion acceptance and companion refusal. Copy remains role-only (“Senior Hunter / Guide”) and never implies that refusal removes ordinary Hunter work.

## C2-161 — cross-system clues

Exact live clue events for Forest, Lumber, Tavern and Farm receive static Hunter presentation overrides. The Work card can show qualitative recorded-clue chips backed only by frozen Hunter career facts:
- `forest-clue-known`
- `lumber-clue-known`
- `tavern-clue-known`
- `farm-clue-known`

No Merchant/Guard future hook and no fixed creature identity is added.

## C2-162 — items and expedition

Presentation-only semantic gear surfaces cover:
- `rope_kit` / `cross_rough_route`
- `field_preservation_kit` / `preserve_specimen`

The Explore panel now surfaces the already-live `hunter.expedition` Activity using its existing entry conditions and exact runtime 2-Energy entry cost. Ordinary `hunter.shift` remains the existing 1-Energy Work action.

Expedition presentation covers:
- default entry;
- local / rough / rare routes;
- success / escape / failure return outcomes;
- item-result events `hunter.items.preserve-return` and `hunter.items.rough-route-return`.

The frozen runtime has no live `hunter.activity.expedition-return` event despite the contract field, so v15 does not publish a fake event override. Return presentation binds the live Activity outcome identities instead.

## C2-163 — School

Only `hunter.school.field-craft` receives a Hunter event presentation override. Chat 2 does not edit its event text/gameplay localization and does not create Arcana/Literacy/Physical Hunter consumer IDs or numeric Hunter School thresholds. Rowan Pike / Field Craft authority remains with the frozen School candidate and existing School media/localization.

## C2-164 — late routes

Exact frozen route events receive presentation:
- `hunter.routes.master-ready`
- `hunter.routes.warden-ready`
- `hunter.routes.legend-contract`
- `hunter.routes.legend-return`

Qualitative Work-card status can expose `master-route-ready`, `warden-route-ready`, `legend-route-ready`, and `rare-contract-active`. Master Hunter / Warden / Legend stay career routes, not ending cards. Rare-route media deliberately avoids a fixed boss or creature depiction.

## C2-165 — ending

The only public Hunter ending remains `ending.hunter.hard-work`. Existing ID, reward and Meta authority are preserved. No Master/Warden/Legend ending or Meta reward is introduced.

## C2-166 — RU/EN, accessibility and fallback

Every new Hunter static override has RU/EN alt/caption parity. New Hunter Work status elements are keyboard-focusable. Senior-guide pending scenes receive an accessible region label and explicit choice-state hooks. Hunter expedition entry uses the existing Activity button focus model and a localized presentation description that distinguishes 2-Energy expedition entry from 1-Energy ordinary work.

All new Hunter v15 media is project-owned static SVG fallback. Animation-off therefore remains safe by construction; C2-167 additionally tests synthetic missing-GIF fallback without mutating gameplay/save state.

No gameplay conditions/effects/rewards, Save/RNG, career/relationship state, Activity mechanics, School mechanics, NightFlow, economy, ending eligibility or Meta authority is changed.
