# Chat 5 Late-Career School v4 Candidate Handoff

Date: 2026-09-29
Owner: Chat 5 / School + Text Localization Content Worker
Task: C5-36
Branch: `chat5/late-career-school-v4`
Baseline: `main@05fa2d1084a48cab20d42f23885e19ee627d3d09`

## Scope

Candidate for C5-25 through C5-35.

The queue prepares School/localization content for the seven non-starter ordinary careers using only the eight existing School courses and existing teacher identities:
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist-Geisha;
- Assassin;
- voluntary ordinary Prostitute.

No new course, curriculum, threshold, producer fact, career state, Save field, NightFlow rule, runtime consumer, economy rule, Activity rule, or presentation/media asset is introduced.

## C5-25 — late-career School mapping audit

Added:
- `content/school-late-career-mapping-audit-v1.fixture.json`
- `docs/school-prep/SCHOOL_LATE_CAREER_MAPPING_AUDIT_V1.md`

The audit locks the seven current career/action targets:
- `tavern` / `tavern.shift`
- `hunter` / `hunter.shift`
- `guard` / `guard.shift`
- `merchant` / `merchant.shift`
- `artist-geisha` / `artist-geisha.shift`
- `assassin` / `assassin.shift`
- `prostitute` / `prostitute.shift`

It records gaps without inventing curriculum:
- Hunter draft mentions practical medicine/craft if added; no current course exists, so existing Field Craft is the only practical-handling match and no medicine/craft course is created.
- Artist-Geisha draft leaves history/music/dance/craft conditional on curriculum; existing Arts & Performance is reused and no specialized course is added.
- Assassin draft has no explicit School section; its mappings are capability matches only, not canonical gates.

## C5-26 — Tavern School preparation

Added:
- `content/school-tavern-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_TAVERN_PREPARATION_V1.md`

Existing course mappings:
- Rhetoric & Social -> guest conflict / information handling;
- Literacy & Numbers -> tabs, stock notes, shift handoff;
- Etiquette & Presentation -> high-status/formal service;
- Arcana -> careful treatment of strange objects/claims.

Prepared complete RU/EN text for four variants.

## C5-27 — Hunter School preparation

Added:
- `content/school-hunter-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_HUNTER_PREPARATION_V1.md`

Existing course mappings:
- Field Craft -> navigation / observation / practical handling;
- Arcana -> unusual trace interpretation;
- Literacy & Numbers -> maps, contracts, measurements, field notes;
- Physical Training -> pacing and repeatable field preparation.

Prepared complete RU/EN text for four variants.

No Activity route, preservation capability, medical curriculum, or Hunter gate is created.

## C5-28 — Guard School preparation

Added:
- `content/school-guard-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_GUARD_PREPARATION_V1.md`

Existing course mappings:
- Literacy & Numbers -> reports/evidence notes;
- Rhetoric & Social -> de-escalation/questioning;
- Etiquette & Presentation -> formal/high-status conduct;
- Physical Training -> controlled dangerous-duty preparation;
- Arcana -> anomaly observation.

Prepared complete RU/EN text for five variants.

No Guard recommendation, Palace access, investigation state, or public result is created.

## C5-29 — Merchant School preparation

Added:
- `content/school-merchant-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_MERCHANT_PREPARATION_V1.md`

Existing course mappings:
- Literacy & Numbers -> accounting/contracts/manifests;
- Rhetoric & Social -> negotiation;
- Etiquette & Presentation -> formal/elite customer context;
- Arcana -> cautious magical-goods appraisal.

Prepared complete RU/EN text for four variants.

No prices, credit, inventory, Merchant House state, or economy mechanics are changed.

## C5-30 — Artist-Geisha School preparation

Added:
- `content/school-artist-geisha-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_ARTIST_GEISHA_PREPARATION_V1.md`

Existing course mappings:
- Arts & Performance -> rehearsal/expression;
- Etiquette & Presentation -> formal guest context;
- Rhetoric & Social -> conversation/room-reading;
- Body Confidence -> deliberate presence/boundaries;
- Literacy & Numbers -> program notes/bookings/handoff.

Prepared complete RU/EN text for five variants.

No specialized history/music/dance/craft curriculum, advanced career gate, relationship state, or Palace access is created.

## C5-31 — Assassin School preparation

Added:
- `content/school-assassin-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_ASSASSIN_PREPARATION_V1.md`

Because the current Assassin draft has no explicit School section, the fixture marks these as `CAPABILITY_MATCH_ONLY`:
- Field Craft -> route/fallback observation;
- Rhetoric & Social -> neutral information-gathering conversation;
- Etiquette & Presentation -> context-appropriate presentation;
- Literacy & Numbers -> timelines/document comparison;
- Physical Training -> controlled movement/endurance.

Prepared complete RU/EN non-combat text for five variants.

No target, lethal/nonlethal rule, contract phase, career stage, or Activity mechanic is created.

## C5-32 — voluntary Prostitute School preparation

Added:
- `content/school-prostitute-preparation-v1.fixture.json`
- `docs/school-prep/SCHOOL_PROSTITUTE_PREPARATION_V1.md`

Existing course mappings:
- Rhetoric & Social -> terms and boundaries;
- Literacy & Numbers -> appointments/payments/business records;
- Etiquette & Presentation -> high-status professional context;
- Arts & Performance -> professional improvisation;
- Body Confidence -> self-possession and boundaries.

Prepared complete non-explicit RU/EN text for five variants.

Explicit invariants:
- confidence/presentation is not consent;
- Body Confidence/Sexuality is not Lust;
- no Lust effect;
- no consent-rule change;
- no NightFlow change;
- ordinary career remains distinct from Secret Debt.

## C5-33 — teacher reaction coverage

Added:
- `content/school-late-career-teacher-reactions-v1.fixture.json`
- `docs/school-prep/SCHOOL_LATE_CAREER_TEACHER_REACTIONS_V1.md`

Prepared one RU/EN transfer-focused variant for each existing teacher:
- Mara Fen;
- Ilyra Venn;
- Cassian Reed;
- Eliane Marrow;
- Rowan Pike;
- Tovan Kest;
- Nessa Lark;
- Sera Vey.

Teachers remain School-owned educators, not career gatekeepers. No teacher relationship state, career write, threshold, or world-fact publication is added.

## C5-34 — Night-study late-career depth

Added:
- `content/school-night-study-late-career-depth-v1.fixture.json`
- `docs/school-prep/SCHOOL_NIGHT_STUDY_LATE_CAREER_DEPTH_V1.md`

Prepared eight RU/EN variants using exact current Night-study choice IDs, one representative choice for each existing School course.

Existing Night contract remains unchanged:
- tuition 0;
- current-day Energy 0;
- selected supported stat +2;
- next-day Energy -1;
- existing `night_study_sessions` only;
- no career progress;
- no NightFlow change.

## C5-35 — parity/stable-ID regression

Added:
- `tests/school-late-career-parity-v1.test.ts`
- `docs/school-prep/SCHOOL_LATE_CAREER_PARITY_REGRESSION_V1.md`

Regression checks:
- exact seven current career/action targets;
- existing School course IDs only;
- null thresholds/public-result IDs;
- complete RU/EN pairs;
- stable unique prepared keys;
- no current root-localization collisions;
- exact eight teacher identities/course mappings;
- exact current Night-study choice IDs;
- unchanged Night-study mechanics invariants;
- no School-authored career/world-fact writes;
- voluntary Prostitute fixture remains non-explicit and mechanics-neutral.

## Prepared localization inventory

Across C5-26 through C5-34:
- 96 prepared localization keys;
- 96/96 RU non-empty;
- 96/96 EN non-empty;
- 96/96 unique;
- zero current root-localization collisions.

All prepared keys remain fixture-local. Root `content/localization.json` is not modified.

## Current-main revalidation

Immediately before C5-36 handoff:
- current main remains exactly `05fa2d1084a48cab20d42f23885e19ee627d3d09`;
- candidate baseline and current main are identical;
- no rebase or base-drift decision is required.

## Static checks actually performed before PR

PASS:
- 10 new JSON fixtures parse;
- all seven target career IDs exist in current definitions;
- all seven target `.shift` action IDs exist in current definitions;
- all mapped School course IDs exist in current School source;
- all eight C5-34 Night-study choice IDs exist in current definitions;
- 96 prepared localization keys scanned;
- 96/96 RU values non-empty;
- 96/96 EN values non-empty;
- zero duplicate prepared keys;
- zero root-localization collisions;
- result: 0 static validation errors.

## Ownership surface

This candidate adds only:
- School-owned docs;
- School-owned fixture-local content;
- one School-owned focused regression test.

It does not modify:
- `src/`;
- `content/definitions.json`;
- root `content/localization.json`;
- root production packs;
- assets/presentation;
- career/relationship state;
- Save/RNG;
- NightFlow;
- Activity runtime;
- economy/balance.

## Missing runtime producer/consumer identities remain gaps

This candidate does not invent any School-to-career producer fact.

For all seven careers, any future gameplay effect still requires separately approved:
- authoritative School provider/milestone identity;
- threshold/value if any;
- durable public result ID;
- publication timing/rule;
- career consumer event/condition.

Assassin additionally lacks an explicit School dependency section in its design draft, so its mapping must remain optional capability-oriented content unless Product later selects a canonical School role.

Exact-course teacher/lesson reaction routing remains a shared Integration concern because current School reaction facts do not expose exact paid course identity.

## Candidate state

After this handoff commit:
- open one focused PR from `chat5/late-career-school-v4`;
- require exact-head `mindy-successor check` green;
- after green CI, record exact frozen head in the PR;
- hand the same head to Chat 4 QA;
- do not move the head for unrelated main drift.
