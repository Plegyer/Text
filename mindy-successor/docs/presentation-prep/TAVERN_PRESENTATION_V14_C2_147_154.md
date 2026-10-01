# Tavern Presentation v14 — C2-147 through C2-154

Owner: Chat 2 / Presentation & Media
Runtime contract source: `chat1/tavern-complete-v12:mindy-successor/docs/tasks/TAVERN_RUNTIME_CONTRACT_v1.json`

## C2-147 — career-stage surfaces

All eight contract stages have presentation-only semantic IDs under `job/tavern/stage/<stage>`, project-owned static fallback, and RU/EN presentation labels/alt/captions. The Work panel exposes the current persisted Tavern stage as a focusable accessibility state without changing progression.

## C2-148 — recurring traveler / Night

The contract publishes role/stage/fact/choice identities for `tavern.recurring-traveler`, but does not publish separate relationship event IDs. Chat 2 therefore does not invent any.

Presentation covers:
- all five exact relationship stages through semantic relationship-stage surfaces;
- exact Night choices `tavern.night.traveler-request` and `tavern.night.house-notes`;
- qualitative `confidentiality-kept` and `refusal-respected` states;
- role-only copy using “recurring traveler”, with no proper NPC name and no romance assumption.

The UI exposes relationship stage and refusal/confidentiality facts as focusable presentation status. Selected Tavern Night choices receive a dedicated static presentation surface during the existing Night flow. In the live catalog, any event whose published source domain is `tavern.recurring-traveler` falls back through one role-only recurring-traveler static root, while any unbound `tavern`-domain event falls back through the Tavern result surface. This covers runtime events without inventing event IDs that the contract did not publish.

## C2-149 — rooms / supply / information

Presentation-only qualitative states cover:
- staff guest-room access backed by `tavern_staff_key`;
- room pressure;
- supply pressure;
- guest-ledger evidence;
- traveler rumour;
- confirmed rumour;
- information routing.

The Work panel shows only qualitative active states. It does not expose hidden numeric thresholds. Exact contract events `tavern.access.staff-key`, `tavern.access.guest-ledger`, and `tavern.housing.meal-in-kind` also have stable static event surfaces. Any additional live Tavern information event remains covered by the Tavern-domain static fallback without Chat 2 naming an unpublished gameplay ID.

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

## C2-155 dependency

Contract-backed event presentation IDs are temporarily registered so C2-147..154 can be authored before Chat 1 freezes the runtime. C2-155 must remove those event reservations and prove the exact same IDs originate from the real frozen production catalog. It must additionally prove animation-off and missing-media fallback safety on that exact runtime candidate.

No gameplay, Save/RNG, career/relationship state, School/NightFlow, Activity mechanics, housing economy, crisis effects, ending eligibility/rewards or Meta authority is changed.
