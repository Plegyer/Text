# Ending Localization Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`
Current app blob: `25a23d5fe80a4ca9a2cb991add67eb92c9b516a6`
Fixture: `content/ending-localization-v1.fixture.json`

## Current Legacy-panel consumers

Current code renders every ending card with raw catalog source:
- title: `e.title`
- description: `e.description`

Required presentation lookup:

`tr(`ending.${e.id}.title`, e.title)`

`tr(`ending.${e.id}.description`, e.description)`

## Exact key map

| Localization key | Exact current consumer seam | Current fallback | Status |
|---|---|---|---|
| `ending.guild-life.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.guild-life.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.scholar-life.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.scholar-life.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.tavern-stay.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.tavern-stay.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.tavern-guild.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.tavern-guild.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.tavern-court.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.tavern-court.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.lumber-stay.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.lumber-stay.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.ending.lumber.hard-work.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.ending.lumber.hard-work.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.ending.lumber.forewoman.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.ending.lumber.forewoman.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |
| `ending.ending.lumber.forest.title` | Legacy panel `<h3>${e.title}</h3>` in `panelContent()` | `e.title` | NEEDS_TR |
| `ending.ending.lumber.forest.description` | Legacy panel `<p>${e.description}</p>` in `panelContent()` | `e.description` | NEEDS_TR |

## End-state screen

The current inactive-run end-state screen does **not** render item-136 title/description keys.

It currently renders:
- generic localized heading `ui.run.endingAccepted` or `ui.run.timeExpired`;
- `r.journal.at(-1)`;
- media through `presentationIdForEnding(r.acceptedEnding)`.

Therefore there is no direct end-state title/description consumer to wire today.

If Lead later shows the accepted ending title on the end-state screen, it should reuse:

`ending.<acceptedEndingId>.title`

rather than invent a second end-state title namespace.

## Acceptance button

The shared button already uses:
`ui.legacy.acceptButton`

No ending-specific accept label is needed.

## Condition display

Ending requirements already flow through `explain(c)`; item-136 does not replace condition templates.

## Epilogues

Current ending epilogues are not part of item-136. Their current runtime/journal presentation remains unchanged.

## Invariants

Wiring title/description localization must not alter:
- ending order;
- conditions;
- availability;
- accept button state;
- reward/metaReward identity;
- acceptedEnding ID;
- presentation ID;
- Save;
- RNG.
