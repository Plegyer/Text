# Late-Career School Mapping Audit v1

Task: C5-25
Baseline: `main@05fa2d1084a48cab20d42f23885e19ee627d3d09`
Fixture: `content/school-late-career-mapping-audit-v1.fixture.json`

This audit maps the seven non-starter ordinary careers to the eight existing School courses only. It does not select thresholds, School producer facts, career gates, public results, or runtime consumers.

| Career | Existing School capability matches | Explicit gap |
|---|---|---|
| Tavern | Rhetoric & Social; Literacy & Numbers; Etiquette & Presentation; Arcana | none required |
| Hunter | Field Craft; Arcana; Literacy & Numbers; Physical Training | draft mentions practical medicine/craft if added; no current course exists, so Field Craft may cover practical handling/preparation only |
| Guard | Literacy & Numbers; Rhetoric & Social; Etiquette & Presentation; Physical Training; Arcana | none required |
| Merchant | Literacy & Numbers; Rhetoric & Social; Etiquette & Presentation; Arcana | none required |
| Artist-Geisha | Etiquette & Presentation; Rhetoric & Social; Arts & Performance; Body Confidence; Literacy & Numbers | history/music/dance/craft remain conditional in draft; no new curriculum is introduced |
| Assassin | Field Craft; Rhetoric & Social; Etiquette & Presentation; Literacy & Numbers; Physical Training | draft has no explicit School section; these are capability matches, not canonical requirements |
| Prostitute | Rhetoric & Social; Literacy & Numbers; Etiquette & Presentation; Arts & Performance; Body Confidence | keep Body Confidence/Sexuality separate from Lust/consent |

## Current production boundary

All seven careers/actions already exist on current main:
- `tavern` / `tavern.shift`
- `hunter` / `hunter.shift`
- `guard` / `guard.shift`
- `merchant` / `merchant.shift`
- `artist-geisha` / `artist-geisha.shift`
- `assassin` / `assassin.shift`
- `prostitute` / `prostitute.shift`

Their advanced stages, School-result producers and career consumers are not authored by Chat 5.

## Mapping principles

- Prefer an existing course whose stated fantasy already matches the preparation need.
- Do not add a course because a draft mentions a future curriculum possibility.
- A preparation mapping is player-facing content guidance, not a gameplay gate.
- No career reads private School counters.
- No School fixture writes career state.
- Missing public producer/consumer identities remain explicit gaps for Product/Integration.
