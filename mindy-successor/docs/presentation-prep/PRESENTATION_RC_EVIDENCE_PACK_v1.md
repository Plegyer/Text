# Presentation RC Evidence Pack v1

Status: reconciled against merged PR #24 on current main `4931d2a1cdd1526a90ce50fbf0391e135f39b0af`.

## Minimal tests worth integrating

1. `presentation-central-stage-interaction.test.ts`
2. `presentation-save-reload-adversarial.test.ts`
3. `presentation-activity-option-save.test.ts`
4. `presentation-production-fallback-release.test.ts`
5. `presentation-pr24-one-save-audit.test.ts` — includes the final `base.school -> listen` blocking boundary.
6. `presentation-semantic-coverage-checksum.test.ts` — covers **27** RC semantic IDs including `location/town/event/base-school/lesson`.
7. `presentation-route-challenge-collision.test.ts`
8. `presentation-override-rollback.test.ts`

## Docs worth indexing

- `PRESENTATION_RELEASE_GATE_v1.md`
- `PRESENTATION_PR24_ONE_SAVE_AUDIT_v1.md`
- `PRESENTATION_ASSET_BACKLOG_PRIORITY_v1.md`
- `PRESENTATION_OVERRIDE_ROLLBACK_CONTRACT_v1.md`

## Asset backlog

RC-required missing presentation assets: **none**.

Seven optional Lumber/Foreman GIFs remain polish-only. The final PR24 School blocking scene is already static-backed by `assets/workshop.svg`.

## Authoring-blocked presentation specialization

Keep route/challenge-specific Forest families and the School management/accounting public-result presentation unfinalized until their content/gameplay identity is authored.

## Superseded and post-release work

Older readiness/handoff/smoke layers stay superseded. External replacement import/export, bundle migration and future GIF package work remain post-release unless explicitly productized.

## Final status

Merged PR24 is presentation-audited end to end at semantic/fallback/save-contract level, including the real School blocking scene and 49-not-eligible -> real 50th-shift boundary.

No shared runtime/schema/UI presentation change is requested.
