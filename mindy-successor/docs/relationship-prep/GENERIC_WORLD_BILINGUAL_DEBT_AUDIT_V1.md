# Generic World Bilingual Debt Audit v1

Date: 2026-09-27
Owner: Chat 5
Baseline main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

## Scope

Only current shipped generic-world root events:
- `base.*`, excluding already-localized `base.school`;
- `gopher.*`;
- `stage.goblin`.

Explicitly excluded:
- `ds-lumber.*`;
- `lumber-cross.*`;
- `lumber.career-first-shift`;
- poverty;
- School;
- Forest route/result work;
- Secret Debt.

## Event-text debt

Current root localization has no matching event title, variant-body, choice-label, or choice-body keys for the 17 in-scope events:

### Base
- `base.arrival`
- `base.order`
- `base.bran`
- `base.invite`
- `base.workday`
- `base.winter`
- `base.shelter`

### Gopher
- `gopher.arrival`
- `gopher.tavern-intro`
- `gopher.tavern-quest`
- `gopher.receipt`
- `gopher.tavern-resolution`
- `gopher.tavern-routine`
- `gopher.woods-intro`
- `gopher.hunt-intro`
- `gopher.landlord`

### Stage
- `stage.goblin`

All currently rely on embedded Russian source copy. The generic pending-event renderer already supports localization keys for event title, selected variant body, and choice labels.

Stable key forms:
- `event.<event-id>.title`
- `event.<event-id>.variant.<variant-id>.text`
- `event.<event-id>.choice.<choice-id>.label`
- `event.<event-id>.choice.<choice-id>.text`

## Choice-body consumer debt

Choice bodies are stored as embedded source text by current event resolution and are not rendered through the generic pending-scene localization helper. Bilingual choice-body entries can be staged safely, but visible post-choice localization requires a locale-neutral presentation consumer rather than locale-selected Save writes.

## Media-alt debt

Among media identities used by the in-scope events:
- `media.base.workshop.alt` is already ROOT_RU_EN_ALT;
- all other current used media identities have embedded Russian alt text but no exact root RU+EN `media.<mediaId>.alt` entry.

Detailed classification is deferred to item 69.

## No Product dependency for text localization

No new mechanic, trigger, reward, route, condition, effect or semantic ID is required to provide RU+EN presentation for the covered current identities.

`gopher.hunt-intro` and `gopher.receipt` remain existing tutorial/legacy event text only and do not introduce new Forest Hunter or Forest Activity semantics.
