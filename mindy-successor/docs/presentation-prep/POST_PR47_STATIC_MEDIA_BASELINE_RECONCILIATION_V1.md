# Post-PR47 Static Media Baseline Reconciliation v1

Exact baseline: current `main` `7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Authority used:
- `prior-work/astra/prototype-m3.2/content/presentation.json`;
- `prior-work/astra/prototype-m3.2/content/localization.json`;
- actual current-main `assets/presentation/` tree.

No pre-PR47 worker assumption is treated as shipped unless it is present in those current-main files.

## What PR47 actually shipped

Current main contains **21 project-owned SVG files** under `assets/presentation/`:

### Ordinary career result assets — 10
- `career-lumber-result.svg`
- `career-satyr-maid-result.svg`
- `career-undead-farm-result.svg`
- `career-tavern-result.svg`
- `career-hunter-result.svg`
- `career-guard-result.svg`
- `career-merchant-result.svg`
- `career-artist-geisha-result.svg`
- `career-assassin-result.svg`
- `career-prostitute-result.svg`

Root `presentation.json` maps all ten exact:
`job/<career>/result/default`
slots to those files.

### Reachable School assets — 2
- `school-day-study.svg`
- `school-night-study.svg`

Root mappings:
- all 8 current `school/<course>/lesson/default` IDs -> `school-day-study.svg`;
- generic after-School -> `school-day-study.svg`;
- generic after-paid-lesson -> `school-day-study.svg`;
- generic after-Night-study -> `school-night-study.svg`.

### Ordinary poverty assets — 4
- `poverty-street.svg`
- `poverty-cheap-lodging.svg`
- `poverty-recovery-help.svg`
- `poverty-pressure.svg`

Root mappings cover all 10 ordinary-poverty production event presentation IDs by family reuse.

Secret Debt is not part of this static-media set.

### Forest result assets — 3
- `forest-result-success.svg`
- `forest-result-escape.svg`
- `forest-result-failure.svg`

Each is root-mapped to:
- matching `activity/forest/return/<outcome>`;
- matching PR43 `job/lumber/event/forest-result-content-v1-<outcome>/default`.

Current root `presentation.json` does **not** contain a static override for:
`activity/forest/route/default`.

### Foreman assets — 2
- `foreman-professional.svg`
- `foreman-night-professional.svg`

Root mappings:
- `relationship/lumber-foreman/lumber-foreman-notice/default`;
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

## Root localization actually shipped

Current root `localization.json` contains RU+EN keys for the shipped PR47 static set:
- 20 career result keys: alt + caption for 10 careers;
- 4 School generic keys: day/night alt + caption;
- 8 poverty family keys: alt + caption for 4 family assets;
- 6 Forest outcome keys: alt + caption for success/escape/failure;
- 4 Foreman keys: alt + caption for professional/Night.

Total shipped `presentation.static.*` localization keys in this PR47 set:
**42**.

## Worker-only after PR47

The following later Chat 2 work is **not** in current root presentation/localization and must be treated as incremental only.

### Seasonal ordinary-career assets
- 40 `career-<career>-shift-<season>.svg` files;
- 40 exact seasonal semantic mappings;
- 80 RU+EN alt/caption keys.

None of those 40 seasonal static overrides is present in current root `presentation.json`.

### Refined non-career assets
Worker-only:
- 8 course-distinct School lesson SVGs;
- refined generic Night-study SVG;
- 10 event-distinct ordinary-poverty SVGs;
- 6 split Forest return/reaction SVGs;
- 2 refined Foreman SVGs;
- 2 route-option Forest SVGs.

The first 27 mappings above can refine current production slots.
The two route-option-specific assets remain Product-open because current main still exposes only one shared route presentation slot:
`activity/forest/route/default`.

### Shared Forest route/default
Before item 227, no project-owned shared-route SVG exists on current main or in root `presentation.json`.

## Collision implications

### Already shipped: do not re-add as "new"
Items 221–226 must not duplicate the PR47 result/default static mappings or their already-shipped localization keys.

### Safe incremental seasonal work
All 40 seasonal career slots are absent from root static overrides, so they are additive fills against current main.

### Safe refinement work
Current School course/Night, poverty, Forest result/reaction and Foreman slots already have static mappings from PR47.

A later v2/v3 production subset may intentionally replace those static `src`/altKey bindings **for the same existing semantic IDs**. That is a presentation-only refinement, not a new semantic identity.

### Route-specific exclusion
Do not add invented:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current main does not expose those presentation IDs.

## Baseline counts

Current production static scope considered by the post-PR47 queue:
- 10 ordinary career result IDs: project-owned root static **10**;
- 40 ordinary career seasonal shift IDs: dedicated project-owned root static **0**;
- reachable School IDs: project-owned root static **11**;
- ordinary poverty IDs: project-owned root static **10**;
- Forest return/reaction IDs: project-owned root static **6**;
- Forest route/default: project-owned root static **0**;
- Foreman IDs: project-owned root static **2**.

Current-main project-owned semantic coverage in this scope:
**39 / 80**.

Remaining current-main static identities using generic/runtime fallback rather than dedicated project-owned root override:
**41 / 80**:
- 40 career seasonal shifts;
- 1 shared Forest route/default.

This is the exact starting baseline for items 221–231.
