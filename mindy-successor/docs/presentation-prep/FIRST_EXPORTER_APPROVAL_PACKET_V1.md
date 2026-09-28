# First Exporter Approval Packet v1

Current-main baseline observed for this packet:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Purpose:
state the smallest Lead decision needed before actual project-owned GIF bytes can be exported.

## Approval requested

Approve exact dev-only additions:

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Approve package script:

```json
"media:export-gif": "node tools/export-project-owned-gif.mjs"
```

No runtime/gameplay dependency is requested.

## Files already prepared by Chat 2

Exporter:
- `prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`.

Dry-run regression:
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-exporter-dry-run-v1.test.ts`.

Output validator:
- `prior-work/astra/prototype-m3.2/tools/validate-project-owned-gif.mjs`.

Validator regression:
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-validator-v1.test.ts`.

Source manifest:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`.

## Exact package change after approval

Modify only the prototype package files:

- `prior-work/astra/prototype-m3.2/package.json`;
- `prior-work/astra/prototype-m3.2/package-lock.json`.

Command:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

Then add:

```json
"media:export-gif": "node tools/export-project-owned-gif.mjs"
```

Commit package.json and package-lock.json together.

## Risk

### Native dependency risk

`sharp` is native/Node-API and uses libvips/platform packages.

Risk:
- platform-specific lockfile entries;
- install lifecycle behavior;
- native parser surface;
- possible CI/install breakage on unsupported platform/version combinations.

Mitigation:
- dev-only placement;
- exact pinning;
- CI `npm ci`;
- local project-owned SVG input only;
- bounded raster size/frame count;
- no runtime application import.

### Encoder maintenance risk

`gifenc` is a small older/stable JavaScript package.

Risk:
- less active release cadence.

Mitigation:
- exact pin;
- narrow wrapper;
- output validator;
- reproducibility smoke.

### Supply-chain risk

Any new npm dependency expands supply-chain surface.

Mitigation:
- exact versions;
- lockfile review;
- package-license review;
- no export-time network access.

## Licensing

- sharp: Apache-2.0;
- gifenc: MIT.

Approval should include normal project third-party-notice handling for dev tooling.

No game-content license is changed.

## CI acceptance

After integration:

1. `npm ci`;
2. exporter dry-run regression;
3. GIF validator regression;
4. one local exporter smoke;
5. validate generated GIF metadata;
6. repeat same-env export and compare SHA-256;
7. `npm run check`;
8. exact-head CI.

No CI workflow edit is required merely to install the dev dependencies because current CI already performs `npm ci` and project checks.

## Rollback

If dependency installation/export proof fails:

1. remove `sharp` and `gifenc` from devDependencies;
2. remove `media:export-gif` script;
3. regenerate package-lock;
4. retain project-owned SVG frame sources;
5. retain static fallbacks;
6. do not activate any GIF mapping.

No Save/gameplay migration is involved.

## Source readiness behind the approval

Seven explicit future-candidate metadata pools are prepared:
- Lumber spring;
- Guard summer;
- Tavern autumn;
- School Literacy;
- Poverty helpful summer;
- Forest success return;
- Foreman Night.

Each contains:
- exactly 3 candidate keys;
- exactly 3 compatible source sequences;
- 4 local SVG frames per source;
- target timing;
- static fallback;
- no GIF path.

School Arcana also has three source sequences in manifest v3, but it is outside the seven metadata pools requested by this queue.

## What approval does not authorize

Approval does not itself authorize:
- production root `presentation.json` GIF pools;
- root localization candidate keys;
- production animation claim;
- fake/placeholder GIF files;
- changes to gameplay/RNG/Save;
- changes to shared presentation runtime.

Those require actual GIF bytes plus later technical/provenance/runtime acceptance.

## Decision

Lead decision required:

**Approve / reject exact dev-only `sharp@0.35.4` + `gifenc@1.0.3` exporter integration.**
