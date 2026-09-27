# Real GIF Integration Handoff v7

Scope: Chat 2 queue items **172–182**.

Current result: **NO REAL GIF IMPORT / NO PRODUCTION POOL ACTIVATED**.

This is the intended outcome of the rights + semantic-fit gate, not a failure to execute the queue.

## 1. Source policy established

File:

`docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`

Autonomous production sourcing is limited to:
- project-owned/commissioned assets with permission;
- CC0;
- verified public-domain material;
- CC BY with attribution;
- CC BY-SA only after ShareAlike acceptance/review.

Wikimedia Commons is treated only as a discovery host; each file's own license/provenance must pass.

Not autonomously approved:
- CC BY-ND for assets likely to require optimization/adaptation;
- any CC-NC variant;
- unclear custom licenses;
- vague "free to download" claims;
- generic Giphy/Tenor/Pinterest/social repost sources;
- unknown-rights assets.

## 2. First real source discovery — Lumber

File:

`docs/presentation-prep/FIRST_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`

Target:
`job/lumber/shift/spring/default`
with possible same-career cross-season reuse only if the visual is neutral.

Five source candidates were reviewed.

Outcome:
- clean CC0 tool-image GIFs existed but were effectively static and not useful work loops;
- mechanical shaper GIFs did not match the Lumber semantic brief;
- one mechanical candidate had a page-level PD claim but an embedded "Commercial use forbidden" comment;
- a historical hauling GIF carried an explicit non-U.S./Canada public-domain caveat.

Compatible, rights-clear Lumber loop candidates:
**0 / minimum 3**.

## 3. Import decision

File:

`docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`

Item 174 imported:
**0 GIF files**.

No path under:
`prior-work/astra/prototype-m3.2/assets/gif/`
was populated merely to satisfy the pool-size rule.

This preserves the project rule:
**real 3–5 candidates or no production pool**.

## 4. Technical imported-asset inventory

File:

`docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md`

Imported production GIF rows:
**0**.

There are therefore no production byte-size/signature/dimensions/frame/provenance rows yet.

## 5. Imported-real-GIF preflight v2

Test:

`prior-work/astra/prototype-m3.2/tests/imported-real-gif-preflight-v2.test.ts`

Because no real imports exist, the test validates the truthful blocked state:
- blocker evidence exists;
- technical inventory records zero production imports;
- no production GIF appears under `assets/gif/`;
- test-only temporary GIF fixtures cannot be treated as production success.

## 6. First real production pool patch

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/first-real-production-pool-v1.json`

Status:
`BLOCKED_BY_REAL_ASSETS`.

Claims:
- real GIF candidates: 0;
- real pools: 0;
- placeholder candidates: 0;
- presentation `slots`: empty.

No fake runtime candidate was introduced.

## 7. Localization delta

File:

`prior-work/astra/prototype-m3.2/content/first-real-production-pool-localization-v1.fixture.json`

Status:
`BLOCKED_BY_REAL_ASSETS`.

Because there are no actual candidates:
- RU/EN candidate alt bindings: 0;
- fake localization keys: 0;
- locale-neutral-selection invariant remains explicit.

## 8. Build-distribution smoke

Test:

`prior-work/astra/prototype-m3.2/tests/first-real-gif-build-distribution-v1.test.ts`

Blocked-mode validation confirms:
- no production pool claim exists;
- presentation patch slots are empty;
- build still copies `assets` -> `dist/assets`;
- the real Lumber static fallback exists.

A future non-blocked version should extend this to actual imported GIF output paths once real files land.

## 9. Second source discovery — ordinary poverty cold rain

File:

`docs/presentation-prep/SECOND_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`

Target:
`location/town/event/poverty-pressure-production-cold-rain/default`.

Best source candidate:
`Rain 2.gif`
- CC0;
- real loop;
- 640×480;
- 36 frames;
- 2.7 s;
- about 9.28 MB;
- environmentally plausible.

But:
- it is only one candidate;
- it is more atmospheric than player/street-specific;
- it exceeds the preferred repository budget and would require optimization review.

Other discovered rain-related files were rejected for:
- modern automobiles;
- satellite/weather-map mismatch;
- mixed provenance concerns;
- "digital rain" semantic mismatch.

Compatible cold-rain candidates:
**1 / minimum 3**.

No second pool is ready.

## 10. GIF repository budget

File:

`docs/presentation-prep/GIF_REPOSITORY_BUDGET_AND_OPTIMIZATION_GATE_v1.md`

Preferred guidance:
- longest side around 640–960 px;
- loop roughly 2–6 s;
- 8–15 fps;
- ≤2 MB preferred per GIF;
- >2–5 MB review;
- >5 MB optimize before activation;
- >12 MB exceptional only after optimization;
- preferred 3-pool total ≤6 MB;
- preferred 5-pool total ≤10 MB.

Optimization must:
- be license-compatible;
- preserve semantics;
- produce a new checksum;
- re-run preflight/visual acceptance.

## 11. License/provenance audit

File:

`docs/presentation-prep/REAL_MEDIA_LICENSE_PROVENANCE_AUDIT_v1.md`

Imported audit population:
**0**.

No external candidate is silently promoted to `SHIP_OK`.

Reviewed-but-not-imported source material remains discovery evidence only.

## 12. Production assets actually imported

None.

Real GIF repository files added by items 172–182:
**0**.

Production 3–5 GIF pools ready for Lead:
**0**.

Static fallbacks remain authoritative.

## 13. Current blocker

The remaining blocker is not runtime, schema, localization infrastructure, build path, or intake tooling.

It is:
**actual project-quality GIF production/supply**.

A real production pool requires at least three assets that simultaneously satisfy:
- semantic fit;
- rights/provenance;
- technical preflight;
- RU+EN alt coverage;
- static fallback;
- current-main semantic identity;
- candidate stability;
- repository budget/optimization;
- exact-head CI.

## 14. Best next real-media path

Given the discovery results, the preferred next source is project-owned production from the existing producer briefs rather than continued generic web sourcing.

Highest-value options:
1. produce one complete 3-GIF ordinary-career trio from item 164;
2. produce the three cold-rain poverty loops from item 165;
3. produce one complete generic School trio from item 166;
4. produce one Forest outcome trio from item 167.

One complete 3-file semantic pool is more useful than several isolated web-sourced GIFs across different identities.

## 15. Selective integration files

The worker branch remains long-lived. Do not merge it wholesale.

Lead may selectively integrate the following presentation-only artifacts onto a fresh current-main branch:

1. `docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`
2. `docs/presentation-prep/FIRST_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`
3. `docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`
4. `docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md`
5. `prior-work/astra/prototype-m3.2/tests/imported-real-gif-preflight-v2.test.ts`
6. `prior-work/astra/prototype-m3.2/content/presentation-drafts/first-real-production-pool-v1.json`
7. `prior-work/astra/prototype-m3.2/content/first-real-production-pool-localization-v1.fixture.json`
8. `prior-work/astra/prototype-m3.2/tests/first-real-gif-build-distribution-v1.test.ts`
9. `docs/presentation-prep/SECOND_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`
10. `docs/presentation-prep/GIF_REPOSITORY_BUDGET_AND_OPTIMIZATION_GATE_v1.md`
11. `docs/presentation-prep/REAL_MEDIA_LICENSE_PROVENANCE_AUDIT_v1.md`
12. this handoff.

No shared runtime/schema/UI change is part of this queue.

## 16. Commit ledger

- 172 — `32e9551b1fc2c8e542fa8fe99b0e9bc3f6312f12`
- 173 — `c85242d21e840319378ddd3e68bb6fecd6745932`
- 174 — `a016384629c94dca74271d345bd976b64339ed60`
- 175 — `cd54a204340b0e0493451023439d1952ba33f60a`
- 176 — `dc584b9110de047cdd02546f0a7dd67e4e923e9a`
- 177 — `e24a59be7ee6c7295dcd73868bc5c04170faf6f3`
- 178 — `46a022ec9055081b07552b1825d39847f9b0f9da`
- 179 — `08f219fb9be23e28323681feff9f4fb7f12c049e`
- 180 — `a14cc4cdecb32d879d0aad237025fac425c0fcc2`
- 181 — `6a56316f64e6effc0496184ec04647c48867783b`
- 182 — `c75d6aab8f749238a2fc1e1abe74774674b0d5a4`

## Final status

Legal-source discovery pipeline:
**READY**.

Import/preflight/build-blocking evidence:
**READY**.

Actual project-quality GIF assets:
**NOT YET SUPPLIED**.

Production dynamic pool:
**NONE**.

Static-backed presentation:
**UNCHANGED / SAFE**.
