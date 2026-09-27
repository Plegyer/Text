# First imported real GIF pool QA v1

Status: COMPLETE / BLOCKED_BY_REAL_ASSETS

Reviewed Chat 2 branch:
`chat2/presentation-replacement-next`.

Current reviewed artifacts:
- item 174 blocker: `docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`;
- item 175 inventory: `docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md`;
- item 176: `tests/imported-real-gif-preflight-v2.test.ts`, blob `f4ad7057ea3084c16d714df21cba307afae1c9b1`;
- item 177: `content/presentation-drafts/first-real-production-pool-v1.json`, blob `7adf72268c37117fab1c182ba663d34c2861e229`;
- item 178: `content/first-real-production-pool-localization-v1.fixture.json`, blob `bb39f4e1df7a342436b251c229132a7ffbebf8ce`.

## Real repository asset gate

Item 176 explicitly walks only:
`assets/gif`

and requires the production GIF list to be empty while item 174 is blocked.

This is the correct no-false-green behavior:
- generated temporary GIF bytes from tests do not count;
- remote source URLs do not count;
- proposed filenames do not count;
- documentation does not count;
- only physical repository assets under the production asset tree may satisfy the import gate.

Current result:
`0 real imported production GIFs`.

Therefore GIF signature, dimensions and frame metadata cannot yet be accepted for a production candidate because no production candidate exists.

## Pool-size gate

The production rule requires 3–5 real compatible candidates for one current semantic presentationId.

Item 177 does not fabricate a pool. It self-declares:
- status: `BLOCKED_BY_REAL_ASSETS`;
- `realGifCandidates: 0`;
- `realPools: 0`;
- `placeholderCandidates: 0`;
- presentation patch `slots` is empty.

GREEN for honesty; BLOCKED for production activation.

There is no 1- or 2-candidate exception.

## Semantic presentationId gate

Because there are zero real candidates, item 177 correctly binds no slot and claims no semantic presentationId as having a real pool.

No stale or proposed semantic ID is falsely treated as active production.

A future pool must be rechecked against then-current main before activation.

## RU+EN alt/caption gate

Item 178 correctly contains:
- zero strings;
- zero candidate bindings;
- `status: BLOCKED_BY_REAL_ASSETS`.

It explicitly records:
- locale does not change candidate selection;
- candidate keys remain locale-neutral;
- media paths remain locale-neutral;
- no fake localization entries were added.

With zero imported assets, an empty localization delta is the only truthful result.

A future real pool must add RU+EN alt/caption coverage for the actual imported candidates rather than for planned filenames.

## Static fallback

The reviewed source/blocker stream keeps the current real static fallback rather than substituting an external URL, missing file or placeholder GIF.

A future pool remains unacceptable without a valid static/text fallback.

## Locale-neutral deterministic selection

No active pool exists, so this cannot be production-proven for imported assets yet.

The runtime contract from PR42 remains the acceptance target:
- stable unique candidate keys;
- deterministic occurrence-key selection;
- no gameplay RNG;
- locale switch preserves selected candidate;
- reload preserves selected candidate;
- animations-off reaches static fallback.

Item 178 does not introduce any locale-dependent candidate key/path.

## Provenance dependency

This gate inherits `REAL_GIF_SOURCING_PROVENANCE_QA_V2.md`.

Even technically valid GIF bytes are not shippable without explicit redistribution-compatible provenance.

Rights uncertainty or semantic mismatch remains a blocker independently of technical preflight.

## Verdict

`BLOCKED_BY_REAL_ASSETS`.

The worker artifacts correctly represent the blocked state and must not be interpreted as a production media-pool deliverable.

To change this verdict, Git must contain:
1. at least three compatible real GIF blobs in the production asset tree;
2. rights/provenance evidence for each;
3. valid GIF technical preflight;
4. one current semantic presentationId with 3–5 stable candidates;
5. RU+EN alt/caption coverage;
6. static fallback;
7. deterministic locale-neutral selection;
8. exact integration-head CI.

Until then, production pool count is zero.
