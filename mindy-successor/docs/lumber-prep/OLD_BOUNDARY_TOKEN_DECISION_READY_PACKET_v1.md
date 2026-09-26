# Old Boundary Token Decision-Ready Packet v1

Status: Product decision packet after PR #22.

This packet does not select a preferred answer. It converts each remaining Old Boundary Token decision into a bounded choice with explicit downstream consequences.

Already shipped and not reopened:
- item ID `old_boundary_token`;
- capability `enter_old_boundary`;
- inventory-derived capability ownership;
- normal Forest entry without token;
- old-boundary route gated by `enter_old_boundary`;
- legacy active Activity save compatibility.

## D1 — acquisition source

### Acceptable answer types

Product may select one of these authoritative source families:
- Tavern rumour chain + old owner;
- relationship source;
- Hunter source;
- hidden city event.

Product may also explicitly defer/replace these source families in a later accepted content decision, but no new source should be inferred here.

### Downstream seams

- authored event/action/relationship source;
- `addItem old_boundary_token`;
- inventory presentation;
- acquisition presentation;
- event history / one-shot or repeatability state;
- save/reload after acquisition.

### PA rows

- PA09;
- PA14;
- PA17.

### Migration/save implications

If acquisition becomes one-shot, old saves need deterministic event-history/public-state handling so reload cannot grant it twice.

If multiple sources can award the token, exactly-once item-count expectations must be explicit.

No migration from old Lumber action counts or worldFact adapter is implied.

## D2 — acquisition timing / requirements

### Acceptable answer types

- always available once the source exists;
- gated by a public fact;
- gated by relationship stage;
- gated by calendar day/season;
- gated by a clue;
- gated by any/all composition of accepted public conditions.

Exact values remain Product-owned.

### Downstream seams

- source conditions;
- resolver timing;
- UI source visibility;
- calendar/relationship/public-fact reads;
- save/reload around eligibility transition.

### PA rows

- PA09;
- PA14;
- PA17;
- conditional PA16 if Forest depth assumes acquisition timing.

### Migration/save implications

Eligibility must recompute deterministically from persisted public state.

A save that becomes eligible after a normal progression transition must not require reload to surface the source.

No hidden legacy visit-count threshold may be imported.

## D3 — retained vs consumed

### Acceptable answer types

- retained/reusable;
- consumed on accepted old-boundary route use;
- turned in/consumed at a later explicit authored transaction.

### Downstream seams

- item-use transaction;
- `removeItem old_boundary_token` only if selected;
- capability recomputation;
- route availability after use;
- exactly-once commit identity;
- UI state after use.

### PA rows

- PA14;
- PA15;
- PA17.

### Migration/save implications

Retained policy:
- inventory count remains stable across reload;
- capability remains available while item remains owned.

Consumed policy:
- removal must commit exactly once;
- reload cannot restore the token;
- retry cannot remove a second copy.

Turn-in-later policy:
- route use and later removal must be separate stable transactions.

## D4 — repeatability

### Acceptable answer types

- token + route reusable indefinitely while owned;
- token source one-shot, route reusable while token remains;
- token consumed and reacquirable through an authored repeatable source;
- token consumed one-shot and route access later persists through a separately accepted permanent-access fact/capability.

No option is preferred.

### Downstream seams

- source event history;
- inventory count;
- permanent-access public fact if explicitly chosen;
- later Forest expedition availability;
- repeat acquisition/use QA.

### PA rows

- PA14;
- PA15;
- PA17;
- post-PA regression.

### Migration/save implications

A permanent-access conversion would need an explicit save-compatible authored transition.

Do not infer permanent access from historical worldFact adapter use.

## D5 — inventory visibility

### Acceptable answer types

The minimum mechanical requirement is locked:
- the item must be visible in inventory;
- capability meaning must be discoverable to the player.

Presentation choices may include:
- item label + short capability hint;
- item detail/help text;
- route requirement hint tied to inventory item.

### Downstream seams

- inventory UI;
- item definition label/help;
- Activity route lock/availability presentation;
- semantic presentation/media fallback if authored.

### PA rows

- PA09;
- PA17.

### Migration/save implications

No save migration is required solely for display text.

UI must derive ownership from current inventory rather than a stale cached capability flag.

## D6 — capability removal behavior

### Acceptable answer types

Runtime behavior is already shipped:
- if the authoritative inventory item is absent, `enter_old_boundary` is absent.

Product must decide whether gameplay ever removes the token:
- never remove through normal use;
- remove on route use;
- remove/turn in later.

If Product wants access to persist after removal, that requires a separately accepted permanent-access mechanism.

### Downstream seams

- optional `removeItem old_boundary_token`;
- exactly-once removal transaction;
- `availableActivityActions` recomputation;
- optional permanent-access fact/capability if explicitly accepted.

### PA rows

- PA14;
- PA15;
- PA17.

### Migration/save implications

After authoritative removal, reload must not restore `enter_old_boundary`.

If permanent access is authored, migration/transition must make clear whether old saves with token ownership also receive that access.

## D7 — locked route presentation

### Acceptable answer types

- hide old-boundary route until capability is present;
- show route disabled with a requirement hint.

Mechanical eligibility remains unchanged.

### Downstream seams

- Activity UI;
- locked-option presentation;
- availability/disabled-state projection.

### PA rows

- PA14;
- PA17.

### Migration/save implications

None beyond deterministic UI derivation from current capability state.

## D8 — interaction with other Forest capabilities

### Acceptable answer types

- no interaction beyond old-boundary route gate;
- explicit authored AND/OR combinations with another accepted capability/public fact;
- route-specific secondary option unlocked only after old-boundary access.

### Downstream seams

- Activity option conditions;
- challenge-family authoring;
- public fact reads;
- capability combinations.

### PA rows

- PA16;
- PA17;
- conditional PA18.

### Migration/save implications

Combined conditions must recompute from persisted authoritative state.

No universal-forest-key semantics may be inferred.

## Decision table

| Decision | Acceptable answer types | PA rows | Migration/save sensitivity |
| --- | --- | --- | --- |
| acquisition source | Tavern/relationship/Hunter/hidden-city source family | PA09, PA14, PA17 | exactly-once acquisition/history |
| timing/requirements | none/public fact/relationship/calendar/clue/composition | PA09, PA14, PA17 | deterministic eligibility |
| retain vs consume | retained / consume-on-use / later turn-in | PA14, PA15, PA17 | exactly-once removal/reload |
| repeatability | reusable / one-shot source / reacquirable / explicit permanent access | PA14, PA15, PA17 | persisted source/access state |
| inventory visibility | visible item + capability hint/detail | PA09, PA17 | no hidden cached capability |
| removal behavior | never remove / remove on use / remove later | PA14, PA15, PA17 | capability recompute |
| route lock presentation | hidden / disabled-with-hint | PA14, PA17 | UI derivation only |
| other capability interaction | none / explicit authored composition | PA16–PA18 | persisted condition inputs |

## Hard Work firewall

No answer to any token decision may modify Hard Work.

Hard Work remains only:
`completed_shifts >= 50`

with exact reward:
`hardWork:lumber`.
