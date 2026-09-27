# Legacy Root-Event Localization Debt Audit v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

## Scope

Exact current-main root-loaded player-facing event localization debt outside:
- Forest route/result work owned by Chat3;
- School;
- ordinary poverty;
- Foreman;
- Secret Debt / Product-open content.

Audited packs:
- `content/packs/base.json`
- `content/packs/gopher.json`
- `content/packs/stage.json`

`base.school` is excluded because School localization is already shipped.

## Result

Current root localization contains no event title / variant body / choice label / choice body entries for the remaining event IDs below. Their embedded Russian pack copy is therefore the only current player-facing source.

### RU_FALLBACK_ONLY

| Event ID | Player-facing fields currently relying on embedded RU |
|---|---|
| `base.arrival` | title; `welcome` body; `introduce` label/body |
| `base.order` | title; `order` body; `accept` label/body |
| `base.bran` | title; `delivery` body; `friendly` label/body |
| `base.invite` | title; `tea` body; `yes` label/body; `no` label/body |
| `base.workday` | title; `labels`, `cat`, `dust` bodies; `steady` label/body |
| `base.winter` | title; `snow` body; `help` label/body; `pass` label/body |
| `base.shelter` | title; `bunks` body; `tell` label/body |
| `gopher.arrival` | title; `default` body; `home`, `status`, `mystery` labels/bodies |
| `gopher.tavern-intro` | title; `default` body; `agree` label/body |
| `gopher.tavern-quest` | title; `default` body; `help`, `later` labels/bodies |
| `gopher.receipt` | title; `default` body; `take` label/body |
| `gopher.tavern-resolution` | title; `default` body; `guild`, `prince`, `wait` labels/bodies |
| `gopher.tavern-routine` | title; `spring`, `summer`, `autumn`, `winter`, `default` bodies; `finish` label/body |
| `gopher.woods-intro` | title; `default` body; `learn` label/body |
| `gopher.hunt-intro` | title; `default` body; `learn` label/body |
| `gopher.landlord` | title; `default` body; `tea` label/body |
| `stage.goblin` | title; `curious`, `default` bodies; `spar`, `flirt`, `work` labels/bodies |

### PARTIAL_RU_EN

None in the audited event-text scope.

### NON_PLAYER_FACING

No additional root event IDs in the audited namespace require player-facing localization classification.

### PRODUCT_OPEN

None of the listed text fields requires a Product decision. They can be localized without changing conditions, triggers, effects, rewards, flags, route semantics or presentation identity.

## Media note

Event-text localization debt is separate from media-alt debt. `base.workshop` already has a root RU+EN alt entry. Other player-facing media used by these events require a separate inventory in item 66.

## Locked exclusions

This audit does not cover or alter:
- `base.school`;
- Forest route/result content;
- School events;
- ordinary poverty events;
- Foreman events;
- Secret Debt;
- Lumber-owned route/result events outside the legacy root scope.

## Stable key convention

- `event.<event-id>.title`
- `event.<event-id>.variant.<variant-id>.text`
- `event.<event-id>.choice.<choice-id>.label`
- `event.<event-id>.choice.<choice-id>.text`

Locale is presentation-only; IDs remain locale-neutral.
