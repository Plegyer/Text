# Tavern Presentation v14 — C2-147 through C2-154

Owner: Chat 2 / Presentation & Media
Runtime contract source: `chat1/tavern-complete-v12:mindy-successor/docs/tasks/TAVERN_RUNTIME_CONTRACT_v1.json`

## C2-147 — career-stage surfaces

All eight contract stages have presentation-only semantic IDs under `job/tavern/stage/<stage>`, project-owned static fallback, and RU/EN presentation labels/alt/captions. The Work panel exposes the current persisted Tavern stage as a focusable accessibility state without changing progression.

## C2-148 — recurring traveler / Night

The initial C1D-121 contract publishes role/stage/fact/choice identities for `tavern.recurring-traveler` but not separate relationship event IDs, so Chat 2 did not invent any during preparation. The frozen PR #187 runtime later publishes the exact live relationship/Night event IDs, and the final branch binds those real IDs only.

Presentation covers:
- all five exact relationship stages through semantic relationship-stage surfaces;
- exact Night choices `tavern.night.traveler-request` and `tavern.night.house-notes`;
- qualitative `confidentiality-kept` and `refusal-respected` states;
- role-only copy using “recurring traveler”, with no proper NPC name and no romance assumption.

The UI exposes relationship stage and refusal/confidentiality facts as focusable presentation status. Selected Tavern Night choices receive a dedicated static presentation surface during the existing Night flow. Frozen live events `tavern.recurring-traveler.intro`, `trust`, `request`, `confidentiality`, and `tavern.recurring-traveler.night` now have exact event overrides; the role-only relationship root remains their safe domain fallback.

## C2-149 — rooms / supply / information

Presentation-only qualitative states cover:
- staff guest-room access backed by `tavern_staff_key`;
- room pressure;
- supply pressure;
- guest-ledger evidence;
- traveler rumour;
- confirmed rumour;
- information routing.

The Work panel shows only qualitative active states. It does not expose hidden numeric thresholds. Exact events `tavern.access.staff-key`, `tavern.access.guest-ledger`, `tavern.housing.meal-in-kind`, frozen `tavern.information.rumour-route`, and frozen `tavern.house-notes.night` all have stable static event surfaces.

## C2-150 — School hooks

Exact contract event IDs:
- `tavern.school.records`;
- `tavern.school.broker`;
- `tavern.school.etiquette`;
- `tavern.school.arcana`.

Chat 2 adds static presentation and accessibility metadata only. School text, thresholds and mechanics remain outside Presentation ownership.

## C2-151 — Activity return

`tavern.activity.forest-return` receives a stable Tavern static presentation. The existing `lumber.forest` / `lumber.forest.success` Activity model is not changed.

## C2-152 — crisis presentation

`tavern.crisis.occupancy-supply-confidentiality` receives a stable static presentation plus presentation-only localized acknowledgement for the three contract resolution-family choice IDs:
- `stabilize-house`;
- `manage-information`;
- `protect-shelter`.

The feedback contains no thresholds, hidden effect values or new gameplay claims.

## C2-153 — endings

Existing live presentation remains stable for:
- `tavern-stay`;
- `tavern-guild`;
- `tavern-court`;
- `ending.tavern.hard-work`.

No ending ID, condition, reward or epilogue is renamed or rewritten by Chat 2.

## C2-154 — RU/EN + accessibility

Every v14-added Tavern semantic surface is static-safe and has RU/EN alt/caption parity. New Work status elements and relationship-state elements are keyboard-focusable; Tavern Night options keep native button focus and get a localized Tavern-specific aria label. No fake Tavern GIF/video candidates are introduced.

## C2-155 finalization

Finalization is stacked directly on frozen runtime PR #187 exact head `38c58ccdaa1d357f189cd640053d0b2a8605b9b4`. Preparation-only Tavern event reservations are removed. Event slots now exist only because the real production catalog contains those events; focused production-reachability regression proves every published Tavern event override maps through `presentationIdForEvent(...)` to a real event/variant, all stage/relationship/Night/state/ending surfaces have live runtime backing, a real Tavern shift writes the exact first-event presentation ID, animation-off is static-safe, and synthetic missing GIFs still leave the exact project-owned static fallback reachable.

No gameplay, Save/RNG, career/relationship state, School/NightFlow, Activity mechanics, housing economy, crisis effects, ending eligibility/rewards or Meta authority is changed.
