# Seasonal Static Media Integration Handoff v2

Scope: Chat 2 items **196–206**.

Semantic baseline: current `main` `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

## Outcome

The 40 ordinary-career seasonal shift semantic identities now have distinct original project-owned SVG fallbacks prepared on the Chat 2 worker branch.

Combined with the 10 project-owned result/default assets from items 185–186, the ordinary-career static scope is now:

- **50 / 50 UNIQUE_PROJECT_OWNED**;
- **0 GENERIC_EXISTING** remaining in result + seasonal-shift scope;
- **0 MISSING**.

No shared runtime/schema/UI file changed.

## Queue artifacts

### Gap audit

`docs/presentation-prep/ORDINARY_CAREER_SEASONAL_FALLBACK_GAP_AUDIT_v1.md`

Established the starting gap:
- 40 seasonal semantic IDs;
- 40 generic existing fallbacks;
- 40 dedicated seasonal-art gaps.

### Seasonal asset batches

Item 197:
- Lumber;
- Satyr Maid.

Item 198:
- Undead Farm;
- Tavern.

Item 199:
- Hunter;
- Guard.

Item 200:
- Merchant;
- Artist/Geisha.

Item 201:
- Assassin;
- Prostitute.

Each career has:
- spring;
- summer;
- autumn;
- winter.

No Hunter Forest-route semantics were invented. Prostitute imagery remains non-explicit.

### Mapping manifest

`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-seasonal-static-media-v1.json`

Contains:
- 40 physical SVG entries;
- 40 exact current semantic IDs;
- locale-neutral paths/keys;
- no gameplay fields;
- no root-load claim.

### Accessibility delta

`prior-work/astra/prototype-m3.2/content/project-owned-seasonal-static-localization-v1.fixture.json`

Contains:
- 40 RU+EN alt entries;
- 40 RU+EN caption entries;
- 80 localized string keys total;
- no locale-specific asset duplication.

### Build/distribution regression

`prior-work/astra/prototype-m3.2/tests/project-owned-seasonal-static-build-v1.test.ts`

Validates:
- 40 manifest entries;
- physical source existence;
- SVG sanity;
- 1200×675 viewBox;
- per-file career/season markers;
- current semantic-ID validity;
- RU+EN accessibility coverage;
- no external URLs;
- no gameplay fields;
- normal build copy into `dist/assets/presentation/`;
- byte-preserving build copy;
- no same-career byte-identical season set.

### Visual consistency audit

`docs/presentation-prep/ORDINARY_CAREER_SEASONAL_VISUAL_CONSISTENCY_AUDIT_v1.md`

Source-level result:
- 40 SVG files;
- 40 unique Git blob SHAs;
- shared visual language preserved;
- spring/summer/autumn/winter differentiation present;
- career-specific scene motifs present;
- no exact duplicates;
- no seasonal set flagged as visually indistinguishable.

### Coverage closure

`docs/presentation-prep/ORDINARY_CAREER_STATIC_COVERAGE_CLOSURE_v2.md`

Result + four seasonal shifts for each of 10 ordinary careers:
**50 / 50 UNIQUE_PROJECT_OWNED**.

## Exact seasonal asset selective-copy list

- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-winter.svg`

## Data/test selective-copy list

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-seasonal-static-media-v1.json`
- `prior-work/astra/prototype-m3.2/content/project-owned-seasonal-static-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-seasonal-static-build-v1.test.ts`

## Documentation selective-copy list

- `docs/presentation-prep/ORDINARY_CAREER_SEASONAL_FALLBACK_GAP_AUDIT_v1.md`
- `docs/presentation-prep/ORDINARY_CAREER_SEASONAL_VISUAL_CONSISTENCY_AUDIT_v1.md`
- `docs/presentation-prep/ORDINARY_CAREER_STATIC_COVERAGE_CLOSURE_v2.md`
- this handoff.

## Recommended Lead integration sequence

The worker branch remains divergent; do not merge it wholesale.

On a fresh branch from exact current main:

1. copy the 40 seasonal SVG files;
2. copy the seasonal mapping manifest;
3. copy the RU+EN localization fixture/delta;
4. copy the seasonal build regression test;
5. selectively wire static slot overrides using the already shipped presentation runtime;
6. wire accepted RU+EN alt/caption keys through the existing localization seam;
7. run the targeted regression;
8. run full project checks;
9. perform representative renderer screenshot sanity across all four seasons;
10. require exact-head CI before merge.

## Final-GIF-only work remaining

Not part of this static closure:
- real 3–5 GIF candidate pools;
- animated seasonal career variation;
- final GIF optimization/provenance;
- dynamic media production.

The 50 ordinary-career project-owned static assets are intended to remain valid animations-off/static fallback coverage after GIFs are added.
