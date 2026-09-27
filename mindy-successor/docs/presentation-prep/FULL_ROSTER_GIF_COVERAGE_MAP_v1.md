# Full-Roster GIF Coverage Map v1

Scope: all 10 ordinary careers plus Palace and Secret Debt / Slave.

Authoritative ordinary roster:
- Lumber
- Hunter
- Tavern
- Guard
- Merchant
- Assassin
- Prostitute
- Geisha / Artist
- Satyr Maid
- Undead Farm

Hidden/meta systems:
- Palace
- Secret Debt / Slave

## Classification model

**SHIPPED_IDENTITY_DEFINED**
A production semantic presentation surface already exists and can receive later media without inventing gameplay identity.

**CONTENT_AUTHORING_FIRST**
Gameplay/content scene identity must be authored before final semantic presentation IDs are assigned.

Media may still reuse an approved loop or setting later, but reused media never means shared gameplay identity.

## Current map

### Lumber
Status: **SHIPPED_IDENTITY_DEFINED**

Existing production patterns already include:
- `job/lumber/shift/<season>/default`
- `job/lumber/result/default`
- Lumber career event / Foreman / Night / ending IDs.

Reusable media candidates:
- generic work loop;
- seasonal variants;
- relationship/Night variants.

Current static/text fallback is sufficient during implementation.
Dedicated GIFs are desirable only as polish after content/media approval.

### Remaining nine ordinary careers
Hunter, Tavern, Guard, Merchant, Assassin, Prostitute, Geisha/Artist, Satyr Maid and Undead Farm are **CONTENT_AUTHORING_FIRST** for full production semantic coverage.

Their career drafts define product roles, but final production presentation IDs should be created from actual authored:
- repeatable work scenes;
- milestones;
- relationships;
- Night hooks;
- result/ending content.

Safe reusable motion/setting candidates may be planned:
- Hunter — outdoor route/work loop;
- Tavern — indoor service loop;
- Guard — patrol/duty loop;
- Merchant — counter/logistics loop;
- Assassin — stealth/preparation loop;
- Prostitute — client/service loop;
- Geisha/Artist — performance loop;
- Satyr Maid — service/household loop;
- Undead Farm — farm/production loop.

These are production reuse categories only, not gameplay definitions.

Static/text fallback is sufficient while authored content is being implemented.

### Palace
Status: **CONTENT_AUTHORING_FIRST**

Palace is a hidden/meta career beyond the ordinary ten-job roster.

Its exact role/name, court structure and several outcome details remain open in the product draft.

Presentation may plan reusable court/service media, but final IDs and dedicated GIFs must follow authored Palace assignments/scenes.

### Secret Debt / Slave
Status: **CONTENT_AUTHORING_FIRST**

This hidden career is distinct from ordinary poverty.

Presentation may plan reusable forced-obligation/night/work media, but final IDs must come from authored:
- secret lender offer;
- delayed debt activation;
- hidden career work;
- forced Night obligations;
- final outcomes.

No gameplay or character identity is inferred from the asset plan.

## Reuse rule

A single GIF may be reused by several semantic IDs when the visual motion/setting is genuinely reusable.

However:
- each distinct gameplay scene keeps its own semantic `presentationId`;
- media filenames never become gameplay identity;
- reused GIFs do not merge event/career/result semantics.

## Fallback rule

During full-game production, static/text fallback is sufficient for implementation until final art is ready.

Dedicated GIFs become desirable after content lock, not before semantic identity exists.

Machine-readable map:
`prior-work/astra/prototype-m3.2/content/full-roster-gif-coverage-map.fixture.json`.
