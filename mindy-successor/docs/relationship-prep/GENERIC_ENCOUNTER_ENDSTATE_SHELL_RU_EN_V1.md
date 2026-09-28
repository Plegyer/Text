# Generic Encounter / End-State Shell RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `295e6fc74d235f0b7555794555a18373451e8b7e`

## Generic pending-event eyebrow

### `ui.event.eyebrow`
RU: Встреча  
EN: Encounter

Current seam: pending event scene eyebrow.

## Inactive-run headings

### `ui.run.endingAccepted`
RU: Судьба принята  
EN: Fate accepted

### `ui.run.timeExpired`
RU: Срок истёк  
EN: Time expired

## Inactive-run navigation

### `ui.run.fatesAndNextLife`
RU: Судьбы и следующая жизнь  
EN: Fates and next life

Current seam: inactive-run button opening the Legacy panel.

## Existing next-life control to reuse

Current root already ships:

### `ui.legacy.nextLifeButton`
RU: Следующая жизнь  
EN: Next life

Do not create a second key for the same control.

## Existing town lodging sentence to reuse

PR55/current root already ships:

### `ui.town.lodgingToday`
RU: Ночлег сегодня: {cost} {coins}  
EN: Lodging today: {cost} {coins}

This is not duplicated here.

## Boundary

Shell text only. No pending-event identity, ending acceptance, run status, expiration timing, Legacy mechanics, new-life mechanics, Save or RNG changes.
