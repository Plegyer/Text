# GIF Exporter Integration Exact-File Checklist v1

Purpose:
give Lead an exact selective-integration boundary for approving the project-owned SVG-frame -> GIF authoring toolchain.

Worker branch:
`chat2/presentation-replacement-next`.

Do not merge the worker branch wholesale.

## Copy unchanged from Chat 2

### Dependency proposal / contracts

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/gif-exporter-dependency-patch-v1.json`
- `docs/presentation-prep/GIF_EXPORTER_CLI_CONTRACT_V1.md`
- `docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_SECURITY_LICENSE_REVIEW_V1.md`
- `docs/presentation-prep/GIF_EXPORTER_REPRODUCIBILITY_ACCEPTANCE_V1.md`
- `docs/presentation-prep/FIRST_THREE_POOL_EXPORT_PLAN_V2.md`
- `docs/presentation-prep/PROJECT_OWNED_GIF_TECHNICAL_BUDGET_V1.md`

### Tool source

- `prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`
- `prior-work/astra/prototype-m3.2/tools/validate-project-owned-gif.mjs`

### Tests

- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-exporter-dry-run-v1.test.ts`
- `prior-work/astra/prototype-m3.2/tests/project-owned-gif-validator-v1.test.ts`

### Source-manifest prerequisite

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v3.json`

The manifest depends on the project-owned frame-source SVGs previously handed off by Chat 2.

## Files Lead must modify only after approval

### 1. package.json

Path:
`prior-work/astra/prototype-m3.2/package.json`.

Add exact devDependencies:

```json
"gifenc": "1.0.3",
"sharp": "0.35.4"
```

Add script:

```json
"media:export-gif": "node tools/export-project-owned-gif.mjs"
```

Do not move these packages into application `dependencies`.

### 2. package-lock.json

Path:
`prior-work/astra/prototype-m3.2/package-lock.json`.

Regenerate through npm from the approved package.json:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

Do not hand-author:
- registry integrity hashes;
- platform optional package entries;
- transitive package metadata.

Review the generated lock diff and commit package.json/package-lock.json together.

## Files that require no change for initial exporter approval

Existing build:
- `prior-work/astra/prototype-m3.2/scripts/build.mjs`

Reason:
finished files under `assets/gif/` are already covered by recursive assets copy.

Existing CI workflow:
- `.github/workflows/mindy-successor-check.yml`

Reason:
it already runs `npm ci` and `npm run check`; dependency install portability will therefore be exercised automatically after the lockfile is integrated.

No CI workflow edit is required merely to add the dev-only toolchain.

## Files that must remain untouched by exporter integration

### Shared presentation/runtime

- `prior-work/astra/prototype-m3.2/src/core/presentation.ts`
- renderer/UI presentation implementation files
- shared media-selection runtime

### Gameplay / Save

- `prior-work/astra/prototype-m3.2/src/core/game.ts`
- gameplay RNG/state/action code
- Save schema/migration files
- gameplay content definitions/conditions/effects/rewards

### Root production mapping/localization

Do not change merely to approve the exporter:

- `prior-work/astra/prototype-m3.2/content/presentation.json`
- `prior-work/astra/prototype-m3.2/content/localization.json`

Those files change only after real GIF bytes exist and a separately reviewed real pool/localization patch is ready.

### Production GIF assets

Do not create placeholder entries under:
`prior-work/astra/prototype-m3.2/assets/gif/`.

Only actual exporter output that passes technical/provenance QA may be committed there.

## Approval validation sequence

On a fresh integration branch from exact current main:

1. selectively copy the proposal/tool/test files listed above;
2. review security/license note;
3. approve exact devDependencies;
4. update package.json;
5. generate package-lock via npm;
6. run `npm ci`;
7. run dry-run exporter test;
8. run GIF validator test;
9. run a local exporter smoke export from one project-owned source sequence;
10. validate produced GIF with `validate-project-owned-gif.mjs`;
11. run full `npm run check`;
12. require exact-head CI.

The smoke output does not become a production media candidate merely because the exporter works.

## Lead decision required

Lead must explicitly decide:

**Approve or reject exact dev-only addition of `sharp@0.35.4` + `gifenc@1.0.3` and the accompanying authoring script.**

Until approved:
- package manifests remain unchanged;
- actual GIF export remains blocked;
- source frame sequences/static fallback production remains valid.
