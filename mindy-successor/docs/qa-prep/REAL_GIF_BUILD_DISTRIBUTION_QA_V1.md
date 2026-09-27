# Real GIF Build / Distribution Path QA v1

Status: QA acceptance definition
Queue item: Chat 4 item 144
Baseline: current main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

This document defines the evidence required before a future real-GIF multi-pool may be called shipped. It makes no runtime edit.

## Current source-to-package path

Current main build behavior is explicit in `prior-work/astra/prototype-m3.2/scripts/build.mjs`:

- source media root: `assets/`;
- build executes `cp('assets','dist/assets',{recursive:true})`;
- renderer output is under `dist/`;
- `package.json` desktop packaging includes `dist/**/*`.

Therefore a production GIF must be a real repository blob under the prototype's source `assets/` tree and, after build, the same relative asset path must exist under `dist/assets/`.

A Markdown/JSON path with no source blob is not shippable.

## Runtime URL resolution

Current `presentation.ts` accepts pool candidate GIF sources only as:

- local `assets/...gif`; or
- data GIF values accepted by schema.

For production repository assets this gate requires the local `assets/...gif` form. Test-only data GIFs do not count as shipped files.

The UI renders the resolved source directly as an `<img src="assets/...gif">` relative to the built application. Because `index.html` and `assets/` are both in `dist/`, the source path must resolve to the copied `dist/assets/...gif`.

## Build/distribution acceptance

For every future production pool candidate require all of the following on the exact integration head:

1. source path exists as a Git blob under `prior-work/astra/prototype-m3.2/assets/...gif`;
2. source bytes have a valid GIF signature;
3. path contains no placeholder/staging/test-only marker;
4. `npm run build` succeeds;
5. corresponding `dist/assets/...gif` exists after build;
6. packaged file set includes that path through `dist/**/*`;
7. presentation patch references exactly the same relative `assets/...gif` path;
8. semantic presentation ID exists on current main;
9. pool has 3–5 real candidates and unique locale-neutral candidate keys;
10. static fallback exists and is copied to `dist/assets/`.

A source blob without build output fails. A build output generated from an untracked/local-only file also fails because Git is the source of truth.

## Existing validation gap

Current `scripts/validate.ts` calls `applyPresentation` and verifies filesystem existence for media present in the catalog's `presented.media`.

PR42 slot-pool candidate sources are not added to that catalog media array. Therefore the generic validator does **not** prove that every `slots.*.pool.candidates[*].src` or slot static override exists.

This is a no-false-green gap for future real pools.

Acceptance requires a dedicated asset preflight/contract test that walks slot pool candidates and static overrides. Chat2's `real-asset-multigif-v1.test.ts` already demonstrates the required existence pattern for future non-empty real pools; any later preflight utility may strengthen this, but production integration must not rely on the generic validator alone.

## Static fallback behavior

The PR42 resolver places the selected pool GIF first, other pool candidates after it, then the slot static fallback when configured. Base catalog fallbacks may follow through the semantic fallback chain.

The current UI attaches `onerror` to media elements. On a failed image/video load it increments `mediaIndex` and re-renders. Consequently a missing first GIF can advance through remaining candidates and eventually reach the static fallback.

This runtime behavior is useful resilience, but it does not make a missing production file acceptable. Production acceptance must fail earlier in CI/preflight.

With animations disabled, a configured static override is selected without using the GIF pool.

## Missing-file failure acceptance

Test a deliberately missing candidate only in an explicitly test fixture. Required behavior:

- preflight/contract validation rejects the production patch before merge;
- if a missing file is injected only for UI fault testing, renderer remains non-fatal;
- UI advances to another resolved candidate/static fallback on media load error;
- pending event/action/activity identity does not change;
- no gameplay RNG is consumed;
- Save gameplay state does not change;
- locale switch still cannot change candidate ordering/selection seed.

Do not intentionally ship a missing candidate merely because runtime fallback is non-fatal.

## Required CI proof for a first real pool

A first real production pool is not GREEN until exact-head CI proves:

- source-file existence and GIF signature;
- pool schema 3–5;
- build copies every candidate and static fallback into `dist/assets/`;
- runtime resolves each URL from built output;
- animations-on deterministic candidate selection;
- animations-off static fallback;
- missing-file fault test is non-fatal but production preflight rejects the missing source;
- RU/EN switching preserves the selected candidate;
- gameplay/Save/RNG remain invariant.

Post-merge main CI must repeat the build/test floor.

## Current verdict

**NO_REAL_GIF_BUILD_DISTRIBUTION_CANDIDATE_EXISTS YET**.

The path is technically capable of shipping real GIFs once repository files are supplied, but current main and Chat2 contain zero real GIF blobs. No placeholder pool may be promoted to satisfy this gate.
