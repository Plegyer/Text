# Bilingual Presentation Integration Handoff v1

Status: Lead-facing handoff for Queue items 125–132.

Current main observed before handoff:
`eaae5e5c59f40eb032943c048e99a26af9a688ba`.

Product localization rule:
- Russian is source authoring;
- English is a full second locale;
- one gameplay/content identity;
- one semantic presentationId;
- one media identity;
- one Save/gameplay state;
- locale changes player-facing presentation text only.

## Current runtime status

Current-main presentation runtime still has no dedicated localization resolver/schema for presentation strings.

The only `locale` substring found in `presentation.ts` is `localeCompare` used for string sorting; it is not a localization seam.

Repository PR search at handoff found no PR explicitly titled around:
- localization;
- bilingual presentation.

Current-main presentation runtime also still lacks the previously identified explicit multi-GIF:
- `pool` schema;
- deterministic occurrence selector.

Therefore bilingual presentation and multi-GIF are two bounded presentation seams that must compose without changing gameplay.

---

# Exact localization infrastructure needed

## 1. Locale type

Minimum shipped locale set:

```ts
type Locale='ru'|'en'
```

RU is source locale.

## 2. Localized player-facing value

Conceptual shape:

```ts
type LocalizedText={
  ru:string
  en:string
}
```

or an equivalent key-based localization catalog.

Required for presentation-layer:
- scene text;
- captions;
- alt/accessibility text;
- text fallback;
- labels/descriptions surfaced through presentation UI.

## 3. Resolver

Minimum pure seam:

```ts
resolveLocalizedText(value, locale, fallbackLocale)
```

Recommended fallback:
- requested RU -> RU, then EN;
- requested EN -> EN, then RU.

Final ship target:
no known RU or EN gaps.

## 4. Presentation UI locale input

Presentation rendering may receive:
- current UI locale.

It must not feed locale into:
- gameplay dispatch;
- conditions/effects;
- RNG;
- occurrence identity;
- candidate selector seed;
- save identity.

## 5. Authoring validation

Bilingual production data should validate:
- RU present;
- EN present;
- locale-neutral semantic/media IDs;
- no localized gameplay duplication.

---

# Authoring fixture ready now

`prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-multi-gif-authoring-v1.json`

It contains representative shipped semantic surfaces across:
- careers;
- School paid lesson;
- School Night-study hook;
- ordinary poverty;
- cheap lodging;
- pressure event.

Every candidate includes:
- locale-neutral candidate key;
- locale-neutral placeholder media path;
- `alt.ru`;
- `alt.en`.

Every representative pool also includes:
- RU/EN text keys;
- RU/EN static fallback alt;
- RU/EN text fallback.

Status is explicitly:
`AUTHORING_ONLY_NOT_RUNTIME_WIRED`.

---

# Contract test ready now

`prior-work/astra/prototype-m3.2/tests/presentation-bilingual-completeness-contract.test.ts`

Fixture-level validation covers:
- every candidate has RU + EN alt;
- every pool remains 3–5 candidates;
- static fallback has RU + EN alt;
- text fallback has RU + EN;
- semantic IDs are locale-neutral;
- candidate keys/media paths are locale-neutral;
- no conditions/effects/rewards are embedded;
- no duplicated locale gameplay events;
- current runtime is not falsely treated as localization-capable.

After Lead adds localization infrastructure, retain this authoring test and add direct runtime resolver tests.

---

# Multi-GIF interaction

Bilingual text and media-pool selection must compose as:

```text
gameplay occurrence
-> shared semantic presentationId
-> deterministic shared candidate key
-> one shared GIF/image
-> localized RU or EN text/alt
```

Not:

```text
RU -> candidate A
EN -> candidate B
```

Locale must not participate in:

`hash(presentationId + occurrenceKey + poolVersion)`

For the same materialized occurrence:
- RU and EN show the same candidate;
- language switch changes only caption/text/alt.

## Runtime adoption dependency

Static/text bilingual presentation can integrate after the localization seam alone.

Bilingual 3–5 GIF pools require both:
1. localization seam;
2. Lead-owned multi-GIF pool/selector extension.

No gameplay change is required for either.

---

# Ten-career localization scope

Inventory:

`docs/presentation-prep/TEN_CAREER_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

Current scope:
- 10 base action labels/descriptions;
- 40 seasonal shift scene surfaces;
- 10 stable result/default presentation surfaces;
- RU+EN alt for all future pool candidates;
- RU+EN static fallback alt.

Existing Lumber-only semantic identities also need bilingual migration/review:
- first-shift milestone;
- Foreman professional relationship scene;
- Foreman Night scene;
- Lumber Hard Work ending;
- Lumber Forewoman ending;
- Lumber Forest ending.

No other-career Hard Work/ending identity was invented.

Producer batch:

`docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_TEN_CAREERS_v1.md`

Provides:
- 10 career cards;
- RU scene/context;
- EN scene/context;
- locale-neutral visual brief in RU+EN;
- 30 initial candidate loop briefs;
- RU + EN alt;
- shared media identity.

---

# School localization scope

Inventory:

`docs/presentation-prep/SCHOOL_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

### REACHABLE_NOW

- 8 paid lesson result IDs:
  `school/<track>/lesson/default`;
- generic post-School event:
  `location/town/event/school-lesson-content-v1-after-school/default`;
- generic School-life post-paid event:
  `location/town/event/school-life-content-v1-after-paid-lesson/default`;
- exact Night-study event:
  `location/town/event/school-life-content-v1-after-night-study/default`.

These can receive bilingual text immediately after the localization seam.

### STAGED

- teacher classroom libraries;
- course-specific authored reaction libraries;
- teacher-specific relationship routes.

Teacher names require approved RU display forms plus EN display forms, while teacher content IDs remain locale-neutral.

### Still Product-blocked

- management/accounting public-result identity;
- Arcana/Forest public-result identity;
- certificate/project/exam route if retained;
- canonical teacher relationship routes.

No bilingual ID should be invented before those content identities exist.

---

# Ordinary-poverty localization scope

Inventory:

`docs/presentation-prep/POVERTY_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

PR37 current production:
- 3 street events;
- 1 cheap-lodging event;
- 3 recovery/help events;
- 3 pressure/bad-luck events.

Total:
**10 event+variant semantic presentation surfaces**.

Required bilingual fields:
- titles;
- variant scene text;
- choice labels/text;
- captions if shown;
- text fallback;
- pool candidate alt;
- static fallback alt.

No locale-specific:
- event IDs;
- variants;
- choices;
- effects;
- rewards;
- cooldowns;
- presentation IDs.

Secret Debt remains separate/staged.

---

# Producer-ready School + poverty batch

`docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_SCHOOL_POVERTY_v1.md`

Provides bilingual cards for:
- paid School lesson family;
- reachable generic School hooks;
- exact Night-study hook;
- ordinary street event;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Each card uses:
- shared semantic ID;
- shared media pool;
- RU context;
- EN context;
- RU alt;
- EN alt.

No duplicate GIF per locale is requested.

---

# No-save-migration expectation

Preferred implementation requires **no gameplay Save migration**.

Reasons:
- locale does not create gameplay identity;
- semantic presentationId remains shared;
- candidate stable key remains shared;
- occurrence key remains shared;
- localized text can be resolved at render time.

Locale preference should be:
- UI/account preference;
- or other presentation setting outside gameplay identity.

Even if persisted, it must not:
- affect schema migrations for gameplay facts;
- duplicate pending event state;
- affect RNG;
- affect route/ending eligibility.

## Multi-GIF + locale

The selected candidate should remain derivable from existing occurrence identity.

Do not add:
- per-locale candidate key;
- per-locale playback state;
- RU/EN duplicate pending scene.

---

# What can ship immediately after Lead localization seam

Without waiting for multi-GIF runtime:
- bilingual action labels/descriptions for 10 careers;
- bilingual 40 seasonal career scene texts;
- bilingual result/fallback text;
- bilingual School reachable-hook text;
- bilingual School paid lesson presentation text;
- bilingual PR37 poverty titles/scenes/choices;
- bilingual static media alt;
- bilingual text-only fallback.

With both localization seam + multi-GIF runtime:
- ten-career bilingual 3–5 candidate pools;
- reachable School bilingual pools;
- PR37 poverty bilingual pools;
- RU/EN per-candidate alt without duplicating media.

---

# Existing monolingual artifacts migration

Cross-cutting Product rule arrived after items 116–124 were already committed.

Do not rewrite those artifacts blindly.

Migration approach:
1. identify player-facing monolingual examples;
2. retain semantic/media IDs;
3. author RU source;
4. review EN localization;
5. update only presentation/localization data;
6. keep tests focused on identity/mechanics invariance.

Items 125–132 are the new bilingual source of truth for this wave.

---

# Exact selective-integration list

## Item 125
- `docs/presentation-prep/BILINGUAL_PRESENTATION_TEXT_CONTRACT_v1.md`

## Item 126
- `docs/presentation-prep/TEN_CAREER_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

## Item 127
- `docs/presentation-prep/SCHOOL_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

## Item 128
- `docs/presentation-prep/POVERTY_BILINGUAL_PRESENTATION_INVENTORY_v1.md`

## Item 129
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/bilingual-multi-gif-authoring-v1.json`

## Item 130
- `prior-work/astra/prototype-m3.2/tests/presentation-bilingual-completeness-contract.test.ts`

## Item 131
- `docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_TEN_CAREERS_v1.md`

## Item 132
- `docs/presentation-prep/BILINGUAL_GIF_PRODUCER_BATCH_SCHOOL_POVERTY_v1.md`

Worker branch is long-lived.

Do not merge it wholesale.

Selectively copy reviewed files onto a fresh Lead branch from current main.

---

# Lead acceptance tests after localization seam

Add direct runtime tests for:

1. RU resolves RU string;
2. EN resolves EN string;
3. missing EN temporarily falls back to RU;
4. missing RU temporarily falls back to EN;
5. language switch preserves semantic presentationId;
6. language switch preserves pending eventId/variantId;
7. language switch preserves selected multi-GIF candidate;
8. language switch does not consume gameplay RNG;
9. language switch does not replay effects/costs;
10. save serialization remains gameplay-equivalent across locale.

When multi-GIF runtime lands, add the same candidate-stability assertion across RU/EN.

---

# Remaining staged / Product-blocked work

### Content identity first
- non-Lumber Hard Work/endings;
- unshipped career milestones/relationships/Night scenes;
- Secret Debt presentation content;
- unresolved Forest-specific depth.

### Product decisions
- final teacher RU display-name forms;
- School management/accounting result;
- School Arcana/Forest result;
- final art style/asset priority.

### Runtime
- localization resolver/seam;
- explicit 3–5 GIF pool schema/selector.

None requires a gameplay or Save-state redesign.

## Final conclusion

Bilingual presentation should be implemented as a thin presentation-localization layer over existing semantic identities.

The desired composition is:

**one gameplay identity + one presentationId + one media candidate + RU/EN text.**

No duplicated events, no duplicated media by default, and no Save migration is justified by the current product rule.
