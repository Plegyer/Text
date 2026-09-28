# GIF Exporter Rollback Packet v1

Scope:
future Lead dependency-integration PR for the deterministic presentation GIF exporter.

Current exporter source:
`prior-work/astra/prototype-m3.2/tools/export-presentation-gif.mjs`.

Proposed exact dev dependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

## Exact files a dependency-integration PR should touch

Required package files:

1. `prior-work/astra/prototype-m3.2/package.json`
2. `prior-work/astra/prototype-m3.2/package-lock.json`

Required exporter source already authored by Chat 2:

3. `prior-work/astra/prototype-m3.2/tools/export-presentation-gif.mjs`

Recommended regression/acceptance files already authored or queued:

4. `prior-work/astra/prototype-m3.2/tests/gif-exporter-source-v1.test.ts`
5. `docs/presentation-prep/GIF_EXPORTER_CLI_CONTRACT_V1.md`
6. `docs/presentation-prep/GIF_EXPORTER_DEPENDENCY_INTEGRATION_ACCEPTANCE_V1.md`

Optional Lead-added smoke test may be added separately.

## Exact package.json delta after approval

Under `devDependencies`:

```json
{
  "gifenc": "1.0.3",
  "sharp": "0.35.4"
}
```

Under `scripts`:

```json
{
  "media:export-gif": "node tools/export-presentation-gif.mjs"
}
```

Do not add either package under runtime `dependencies`.

## Exact lockfile generation

From the prototype root:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

Review resulting lockfile changes before commit.

Do not hand-author:
- integrity hashes;
- optional platform packages;
- transitive package metadata.

## Acceptance before keeping the dependency PR

The dependency PR remains acceptable only if:

1. `npm ci` succeeds on Node 22.18.0 / Ubuntu CI;
2. dynamic import of both packages succeeds;
3. one local SVG sequence dry-run succeeds;
4. one real smoke GIF export succeeds;
5. GIF validator accepts signature/dimensions/frame count/timing/loop;
6. two identical same-environment exports are byte-identical;
7. `npm run check` succeeds;
8. exact-head CI succeeds.

## Rollback trigger

Rollback if any of the following remains unresolved:
- sharp native install fails on CI;
- npm lock graph is not portable to the supported CI environment;
- exporter API differs from the pinned assumptions;
- repeated same-input output is not deterministic;
- generated GIF is invalid or violates budget;
- dependency adds unacceptable license/security/install-script risk;
- exporter leaks into application runtime dependency path.

## Exact rollback

1. remove `sharp` and `gifenc` from `devDependencies`;
2. remove `media:export-gif` script;
3. regenerate/restore `package-lock.json` to pre-integration dependency graph;
4. keep `tools/export-presentation-gif.mjs` only if Lead wants to retain blocked source for future work, otherwise revert that file from the integration PR;
5. remove any smoke-only GIF bytes not separately reviewed for production;
6. keep all project-owned SVG frame sources;
7. keep all static fallbacks;
8. leave `content/presentation.json` and `content/localization.json` unchanged unless a separate production media PR exists.

## Files that must not be rolled back with exporter dependency failure

Do not remove:
- project-owned SVG frame sources;
- project-owned static SVG fallbacks;
- presentation-source manifests;
- gameplay/content work unrelated to the exporter.

Exporter dependency failure does not invalidate presentation-source authoring.

## Runtime / Save impact

Rollback requires:
- no Save migration;
- no gameplay data migration;
- no runtime schema rollback;
- no UI rollback.

Reason:
the exporter is authoring-only and proposed as dev-only tooling.

## Production media boundary

If real GIF candidates were already generated during smoke:
- smoke output remains non-production unless explicitly reviewed;
- delete/revert smoke bytes on rollback;
- do not leave root production pool mappings pointing to missing bytes.

## Result

Dependency integration rollback is:
**PACKAGE-LOCAL AND LOW-RISK**.

Gameplay/runtime rollback:
**NONE**.

Project-owned source media rollback:
**NONE REQUIRED**.
