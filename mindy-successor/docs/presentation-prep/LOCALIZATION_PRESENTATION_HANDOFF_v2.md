# Localization Presentation Handoff v2

Current production baseline:
- PR #41 merged as `974d6e077ffc511e304a64aef32f2aab81167f41`;
- PR41 exact-head CI: **291/291 PASS**;
- PR #42 merged as `55adc69dcda4c41c71548cd146756896fa5976d0`;
- PR42 exact-head CI: **295/295 PASS**;
- current main at this handoff is downstream of both milestones.

## 1. What PR41 now provides

Production localization runtime exists.

Current API:
- locales: `ru | en`;
- default locale: `ru`;
- `resolveLocalizedText(bundle,key,locale,fallback)`;
- EN may temporarily fall back to RU;
- `missingEnglishKeys()` exposes migration debt;
- locale preference lives in presentation/UI state, not gameplay Save.

Current shipped RU+EN slice:
- language controls;
- town/HUD shell;
- main panel labels/subtitles;
- Work panel shell;
- labels/descriptions for all 10 ordinary career shift actions.

Current PR41 localization bundle has 56 keys and, at the audited checkpoint, no missing EN values.

## 2. What PR42 now provides

Production multi-GIF runtime also exists.

Exact slot pool shape:

```ts
{
  pool:{
    version:number,              // 1..1000
    ordering:'ordered'|'unordered',
    selectionPolicy:'unweighted'|'weighted',
    candidates:[
      {
        key:string,
        kind:'gif',
        src:string,
        alt:string,
        weight?:number
      }
    ] // 3..5
  },
  static?:{
    kind:'image',
    src:string,
    alt:string
  },
  fallbackId?:presentationId
}
```

Rules already enforced:
- 3–5 pool candidates;
- unique candidate keys;
- GIF-only pool sources;
- positive finite optional weight;
- `primary + pool` rejected;
- old primary/static overrides remain compatible.

Resolver support:
- `occurrenceKey`;
- deterministic FNV-style presentation hash;
- selected pool member is ordered first;
- `selected` points at first resolved candidate;
- no gameplay RNG;
- no Save migration;
- animations-off skips the GIF pool and uses static fallback;
- locale switching can keep the same occurrence/candidate identity because locale is not part of selector seed.

## 3. Items 134–142 ready for selective integration

### Item 134 — localization-key convention

`docs/presentation-prep/LOCALIZATION_KEY_CONVENTION_FOR_PRESENTATION_v1.md`

Stable locale-neutral key patterns for:
- action label/description;
- event title/variant/choice;
- presentation caption/fallback;
- candidate alt;
- static alt;
- teacher display names/roles.

Recommended convention is compatible with PR41's flat string catalog.

### Item 135 — bilingual fallback audit

`docs/presentation-prep/BILINGUAL_PRESENTATION_FALLBACK_AUDIT_v1.md`

Finding:
current presentation is mechanically safe, but deeper School/poverty/Forest/Night/endings text and presentation alt/captions remain localization debt.

### Item 136 — first migration batch

`prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-presentation-migration-batch-v1.json`

Contains:
- 10 Work-panel career label entries;
- Lumber four seasons + result shell;
- reachable School generic/Night surfaces;
- representative ordinary-poverty surfaces;
- RU+EN captions/static alt/text fallback.

This is authoring data, not a runtime patch.

### Item 137 — localization + multi-GIF authoring contract

`prior-work/astra/prototype-m3.2/tests/presentation-localization-multigif-contract.test.ts`

Covers:
- same semantic ID across locale switch;
- same candidate key/media path;
- RU/EN changes text metadata only;
- missing EN -> deterministic RU fallback;
- gameplay/action identity unchanged;
- localization fixtures contain no gameplay mechanics.

### Item 138 — ten-career localization bundle

`prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-localization-v1.json`

Machine-readable RU+EN authoring for:
- all 10 action labels/descriptions;
- result shell text;
- 40 seasonal semantic IDs;
- shared media-pool refs;
- bilingual candidate alt examples.

### Item 139 — complete current base-shift alt pack

`docs/presentation-prep/TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`

Coverage:
- 10 careers;
- 4 seasons;
- 3 candidate entries per seasonal slot;
- **120 RU+EN alt pairs**.

### Item 140 — localization fallback fixture

`prior-work/astra/prototype-m3.2/content/presentation-drafts/localization-fallback-v1.fixture.json`

Includes:
- fully translated entry;
- RU-only migration debt;
- missing-key legacy fallback;
- localized multi-GIF alt/caption example.

### Item 141 — locale-switch contract v2

`prior-work/astra/prototype-m3.2/tests/presentation-locale-switch-contract-v2.test.ts`

Validates authoring behavior:
- shared semantic IDs;
- shared candidate/media identity;
- deterministic RU fallback;
- visible missing-EN QA debt;
- no gameplay fields.

### Item 142 — production coverage after PR41

`docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

Status buckets:
- `SHIPPED_RU_EN`;
- `RU_FALLBACK`;
- `STAGED_RU_EN`;
- `NOT_MIGRATED`.

## 4. Exact next localization integrations

### A. School safe/reachable localization

First non-Work content migration target:
- eight paid lesson result surfaces;
- generic after-School hook;
- generic School-life after-paid hook;
- exact School Night-study hook.

Use PR41 localization catalog.

Do not route teacher/course-specific staged content unless exact course identity is safe.

### B. Ordinary-poverty localization

PR37 already supplies production gameplay/content identities.

Add localization keys for:
- event title;
- variant scene text;
- choice labels/text;
- presentation captions;
- fallback alt/text.

Do not fork events by locale.

### C. Forest bilingual result content

Current town Explore shell is bilingual, but deeper Activity/Forest content is not fully migrated.

Localize actual authored route/result surfaces only.

Do not invent unfinished Forest depth.

### D. Night and endings

Town-level shell is localized.

Remaining:
- NightFlow internal copy;
- ending titles/descriptions/epilogues;
- condition explanation text where player-facing.

## 5. Exact PR41 key integration guidance

Use one key for both locales.

Recommended examples:

```text
action.lumber.shift.label
action.lumber.shift.description

presentation.job/lumber/shift/spring/default.caption
presentation.job/lumber/shift/spring/default.static.alt
presentation.job/lumber/shift/spring/default.candidate.lumber-spring-a.alt

event.poverty-pressure-production.cold-rain.title
event.poverty-pressure-production.cold-rain.variant.default.text
event.poverty-pressure-production.cold-rain.choice.take-doorway.label
```

Lead may normalize punctuation/slash style to match current PR41 catalog conventions.

Invariant is more important than exact separator:
one locale-neutral key -> RU/EN values.

## 6. Exact PR42 integration guidance

For production presentation overrides:
- copy only real/approved pool candidates;
- 3–5 candidates per pool;
- use existing semantic presentationId;
- keep static fallback;
- supply stable candidate keys;
- pass persisted occurrenceKey from existing scene/action/event identity.

Do not add:
- gameplay conditions;
- event effects;
- rewards;
- locale into candidate seed;
- Save fields.

## 7. Localization and PR42 alt limitation

PR42 candidate schema currently stores:
`alt:string`.

PR41 localization runtime stores:
`key -> {ru,en?}`.

Therefore the remaining small presentation-localization seam is:
- map a candidate/static alt localization key to resolved localized `alt:string` before rendering;
- or materialize the localized alt into the runtime presentation patch for the active locale.

Preferred architecture:
keep stable candidate/media identity locale-neutral and resolve only text/alt at render/import boundary.

Changing locale must not rebuild occurrence identity or choose another candidate.

## 8. No Save migration

PR41 and PR42 both validate the preferred architecture:
- locale is presentation-only;
- pool selection is presentation-only;
- occurrence key derives from existing persisted gameplay identity;
- no locale-specific gameplay copy;
- no selected GIF frame/time in Save.

No Save migration is justified for localization or multi-GIF adoption.

## 9. Next production media batches after runtime readiness

PR42 means the runtime is no longer the blocker.

Next media batches should be ordered by **real asset readiness**:

1. starter trio spring shifts with real GIFs, if available;
2. other ordinary career base-shift pools where 3 real GIFs exist;
3. PR37 ordinary-poverty pools with real GIF assets;
4. reachable School generic/Night pools with real GIF assets;
5. later career/School/Forest/ending content only after authored identities and art exist.

Placeholder paths are planning artifacts, not production media.

## 10. QA required for each integrated pool

For every production pool:
1. `presentationSchema.parse` passes;
2. semantic target exists;
3. candidate count 3..5;
4. candidate keys unique;
5. candidate sources resolve to real GIFs;
6. animations-on selects deterministic candidate;
7. same occurrence reload selects same candidate;
8. RU->EN keeps same selected candidate;
9. animations-off reaches static fallback;
10. one missing GIF does not change gameplay;
11. localization key exists for RU;
12. EN exists or is explicitly QA-visible as RU fallback debt;
13. no gameplay RNG/Save mutation.

## 11. Integration boundary

Worker branch is long-lived.

Do not merge wholesale.

Selectively copy reviewed content/docs/tests onto a fresh Lead branch based on current main.

For machine-readable production integration:
- replace any `authoring://` or staging placeholder path with an actual managed `assets/...gif`;
- validate against current PR42 `presentationSchema`;
- require exact-head CI.

## Final handoff

Infrastructure is now present:
- PR41 solves RU/EN resolution;
- PR42 solves deterministic 3–5 GIF pools.

The remaining work is primarily:
- migrate real player-facing strings into PR41 localization;
- connect localized alt/caption to presentation rendering;
- integrate only pools backed by real GIF assets;
- continue content authoring for still-missing Forest/Night/ending surfaces.

No gameplay redesign and no Save migration are needed.
