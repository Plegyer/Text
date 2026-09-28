# First Exporter Proof-of-Concept Patch v1

Current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`.

This is the exact minimal proposed patch needed to prove local project-owned SVG-frame -> GIF export with the already recommended toolchain.

No package file is modified by this document.

## Proposed package.json patch

Add exact devDependencies:

```json
{
  "devDependencies": {
    "gifenc": "1.0.3",
    "sharp": "0.35.4"
  }
}
```

Add one authoring script:

```json
{
  "scripts": {
    "media:export-gif": "node tools/export-project-owned-gif.mjs"
  }
}
```

Do not move either package into runtime `dependencies`.

## Proposed package-lock update

Generate with npm from the approved package.json:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

Commit the resulting `package-lock.json` together with `package.json`.

Do not hand-author integrity hashes or platform package entries.

## Existing exporter source to use

`prior-work/astra/prototype-m3.2/tools/export-project-owned-gif.mjs`

The script already provides:
- exact semantic/sequence lookup;
- repository-local SVG source validation;
- deterministic frame order from manifest;
- fixed dimensions/timing/palette/loop controls;
- dependency-free `--dry-run`;
- real export through dynamic `sharp` + `gifenc` imports;
- output restricted to `assets/gif/`;
- SHA-256 and byte-size reporting.

## Minimal proof command

After Lead approves and installs the exact dependencies:

```bash
node tools/export-project-owned-gif.mjs \
  --manifest content/presentation-drafts/project-owned-animation-source-manifest-v3.json \
  --presentation-id job/lumber/shift/spring/default \
  --sequence lumber-spring-work-loop-a \
  --output assets/gif/careers/lumber/spring-loop-a.gif
```

Expected target:
- 640×360;
- 4 ordered frames;
- normalized 600 ms frame delay;
- 2400 ms total loop;
- infinite loop;
- local project-owned source only.

## Proof acceptance

The patch is successful only if:
1. `npm ci` succeeds on the project CI Node version;
2. exporter dry-run tests pass;
3. one real GIF is emitted from local source SVG frames;
4. output validator accepts signature/dimensions/frame count/timing/loop;
5. repeated same-environment export is reproducible under the defined acceptance contract;
6. full `npm run check` passes.

The proof GIF is not automatically a production candidate.

## Rollback

Rollback is limited to:
- remove `sharp` and `gifenc` from `devDependencies`;
- remove `media:export-gif` script;
- regenerate lockfile;
- keep frame sources/static fallbacks untouched.

No gameplay/runtime/schema/UI change is required.
