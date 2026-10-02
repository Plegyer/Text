# C2-193 — Artist/Geisha shipped identity inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Preparation baseline: `main@8067539a606714fad8400ccbba30fd7ccf4a9158`
Work branch: `chat2/artist-geisha-presentation-v18`
Artist/Geisha runtime producer branch at this checkpoint: `chat1/artist-geisha-complete-v16@8067539a606714fad8400ccbba30fd7ccf4a9158`

This inventory records only identities already shipped on the Artist/Geisha activation baseline. Advanced presentation binding remains deferred until Chat 1 publishes and freezes the Artist/Geisha runtime contract.

## Shipped gameplay identities

Action:
- `artist-geisha.shift`
- ordinary shift cost: 1 Energy
- current unlock identity: Creativity 35 + Manners 25 + Grooming 30 OR Year 3
- shipped scene identities: `spring.default`, `summer.default`, `autumn.default`, `winter.default`
- presentation ownership does not alter availability, wage, stat, counter, seasonal gameplay effects or career progression.

Career:
- career id: `artist-geisha`
- label: Artist House
- initial stage: `novice`
- shipped stages: `novice`
- shipped transitions: none.

Ending:
- `ending.artist-geisha.hard-work`
- this is the only shipped Artist/Geisha ending identity at this checkpoint.
- presentation does not alter the existing 50-shift requirement, reward `artist-geisha.hardwork.compat`, Meta record `hardWork:artist-geisha`, eligibility, commitment or completion behavior.

## Shipped presentation identities

Ordinary result:
- `job/artist-geisha/result/default`
- static source: `assets/presentation/career-artist-geisha-result.svg`
- accessibility key: `presentation.static.career.artist-geisha.result.alt`

Seasonal ordinary Work:
- `job/artist-geisha/shift/spring/default` -> `assets/presentation/career-artist-geisha-shift-spring.svg`
- `job/artist-geisha/shift/summer/default` -> `assets/presentation/career-artist-geisha-shift-summer.svg`
- `job/artist-geisha/shift/autumn/default` -> `assets/presentation/career-artist-geisha-shift-autumn.svg`
- `job/artist-geisha/shift/winter/default` -> `assets/presentation/career-artist-geisha-shift-winter.svg`

Hard Work:
- `ending/artist-geisha/hard-work`
- current static source: `assets/presentation/career-artist-geisha-result.svg`
- accessibility key: `presentation.static.artist-geisha-ending-hard-work.alt`

Current shipped Artist/Geisha presentation authority therefore contains six semantic slots: one ordinary result, four seasonal ordinary-Work slots and the existing Hard Work ending.

## Project-owned media preparation

Static production-safe assets already exist for the ordinary result and all four seasons.

The project-owned animation source manifest also contains three export-ready winter rehearsal source sequences for:
- `job/artist-geisha/shift/winter/default`

Source sequences:
- `artist-geisha-winter-rehearsal-loop-a`
- `artist-geisha-winter-rehearsal-loop-b`
- `artist-geisha-winter-rehearsal-loop-c`

Each sequence contains four project-owned SVG source frames and falls back to:
- `assets/presentation/career-artist-geisha-shift-winter.svg`

The manifest currently records `gifPath: null` for all three sequences and `actualGifPaths: 0` globally. C2-193 therefore does not claim or bind a fabricated GIF.

## Existing School preparation sources

Preparation:
- `docs/school-prep/SCHOOL_ARTIST_GEISHA_PREPARATION_V1.md`
- `content/school-artist-geisha-preparation-v1.fixture.json`

Reactive depth:
- `docs/school-prep/SCHOOL_ARTIST_GEISHA_REACTIVE_DEPTH_V1.md`
- `content/school-artist-geisha-reactive-depth-v1.fixture.json`

Prepared existing tracks:
- Arts & Performance / Nessa Lark
- Etiquette & Presentation / Eliane Marrow
- Rhetoric & Social / Cassian Reed
- Body Confidence / Sera Vey
- Literacy & Numbers / Mara Fen

Both fixtures remain preparation-only:
- `selectedThreshold: null`
- `selectedPublicFactId: null`
- no career writes
- no relationship writes
- no world-fact publication.

The design draft mentions history/music/dance/craft only conditionally. Those are not authorized specialized curriculum identities.

## Draft-only vocabulary, not production IDs

`docs/CAREER_GEISHA_ARTIST_DRAFT_v0.md` is design context only until exact runtime publication.

The following draft terms must not be reserved as presentation/gameplay IDs at C2-193:
- Performer
- Recognized Artist
- Veteran
- Master Artist
- Patron Network
- Court Invitation
- senior artist/mentor
- rival
- patron
- fellow performer
- court contact
- Formal Court Attire
- performance costume/instrument
- invitation/token
- rare cultural object
- festival/contest/salon/night route identities.

Court Invitation is especially not Palace access. Artist House must also remain semantically distinct from Satyr Maid and voluntary Prostitute presentation.

## Identities intentionally absent at C2-193

Until the frozen Artist/Geisha runtime publishes exact identities, presentation treats all of the following as absent:
- advanced career stages beyond `novice`;
- recurring relationship id/stages/events;
- Artist-owned item/capability ids;
- advanced performance/festival/salon event ids;
- Artist-local Night opportunity ids;
- School consumer event ids;
- cross-system Artist event ids;
- Master Artist / Patron Network / Court Invitation readiness ids;
- any Palace-access identity;
- any new public complex Artist/Geisha ending id.

## Presentation firewall

C2-193 is read-only inventory work. It changes no gameplay conditions/effects/rewards, Save/RNG, career state, economy, School/NightFlow/Activity mechanics, relationship canon, ending eligibility/rewards or Meta.

Final advanced production binding and reachability remain deferred to C2-204 on the exact frozen Artist/Geisha runtime head.
