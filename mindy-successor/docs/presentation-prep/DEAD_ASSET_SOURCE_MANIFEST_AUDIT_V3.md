# Dead Asset / Source Manifest Audit v3

Status: C2-82 COMPLETE
Owner: Chat 2 / Presentation & Media

The audit compares project-owned `assets/presentation/` files against:
- production `content/presentation.json`;
- current pack JSON under `content/packs/`;
- presentation source manifests under `content/presentation-drafts/`.

## Unreferenced presentation assets

Current unreferenced legacy/source files: **8**.

- `assets/presentation/foreman-night-professional.svg`
- `assets/presentation/forest-result-escape.svg`
- `assets/presentation/forest-result-failure.svg`
- `assets/presentation/forest-result-success.svg`
- `assets/presentation/poverty-pressure.svg`
- `assets/presentation/poverty-recovery-help.svg`
- `assets/presentation/poverty-street.svg`
- `assets/presentation/school-night-study.svg`

These files are detected and documented; C2-82 does not delete them because deletion/cleanup is not required for presentation correctness and may remove historical source material without a separate ownership decision.

## Active source health

Active production presentation overrides resolving to missing asset sources: **0**.

Selected source-manifest rows with dead semantic presentation IDs: **0**.

The regression recomputes the dead-file set from repository content so new stale files or newly referenced legacy files change the expected audit result explicitly.

No gameplay identity is deleted or inferred from asset liveness.
