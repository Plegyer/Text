# Chat 3 Ownership / Collision Regressions v2

Status: C3-11 focused regression handoff, refreshed after PR #82 CI exposed shallow-checkout incompatibility.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Exact comparison base: `ef16d9fa0c85e3792e3dc223baadd247df95ec7f`.

Executable regression:
`prior-work/astra/prototype-m3.2/tests/chat3-content-ownership-collision-v1.test.ts`.

Regression manifest:
`prior-work/astra/prototype-m3.2/content/chat3-content-ownership-collision-v1.fixture.json`.

## CI-compatible design

GitHub Actions checks out the pull-request merge ref with depth 1, so the worker regression must not require the base commit object to exist locally.

The regression is therefore self-contained:
- exact baseline Git blob SHAs protect all `src/` files, School-owned content, `definitions.json`, `presentation.json`, and protected Lumber Night/Foreman packs;
- all `assets/presentation/` files are protected by count + aggregate path/blob fingerprint;
- localization is protected by an exact expected-value map for the 15 permitted Forest keys plus a fingerprint of every unaffected localization entry;
- the Forest result pack is protected by a mechanics fingerprint after removing only `title`, `text`, and `label`.

This proves the candidate does not modify School, Chat 2 media sources, Save/RNG/shared runtime, Foreman canon, or Forest result mechanics without depending on Git history.

## Allowed content deltas

Localization:
- 4 additive `event.lumber-cross.activity-forest-return.*` keys;
- 11 changed `event.forest-result-content-v1.*` player-facing text keys;
- all other localization entries must match the exact-base fingerprint.

Forest result pack:
- only `title/text/label` may differ;
- exact event IDs, ActivityResult IDs, variants, choices, conditions and effects remain mechanically identical.

## Existing UI content regression

Because C3-05 intentionally refreshes the success copy, the existing renderer content assertion in `tests/ui.test.ts` is updated to the new RU/EN title/body/choice strings.

That test continues to prove:
- same pending scene identity;
- same locale-switch save;
- same media alt/presentation behavior.

No UI implementation is changed.

## Candidate-diff evidence

Changed-path scope remains checked in GitHub PR compare/review rather than by the executable test. This is deliberate: a shallow PR checkout does not reliably contain the base commit needed for `git diff <base>...HEAD`.

C3-12 records the exact GitHub changed-file inventory and QA owns final scope acceptance.

## C3-11 disposition

The regression now runs under the repository's actual pull-request checkout model and remains ownership-focused rather than QA ownership.
