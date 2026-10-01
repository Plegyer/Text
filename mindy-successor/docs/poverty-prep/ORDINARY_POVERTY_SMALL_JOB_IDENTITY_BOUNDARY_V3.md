# Ordinary Poverty Small-job Identity Boundary v3

Status: C3-101 current-main content identity audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `6afc01061646bc52cec824863bf89e8ad8c309d0`.
Fixture: `prior-work/astra/prototype-m3.2/content/ordinary-poverty-small-job-identity-boundary-v3.fixture.json`.

The current result renderer identifies event outcomes with `eventId + choiceId`. It does not expose `variantId` to result localization.

Safe single-variant result mappings remain:
- `poverty-street-production.helpful-summer / default / take-errand`;
- `poverty-recovery-production.short-cleanup / default / do-cleanup`;
- `poverty-recovery-production.small-coin-help / default / take-coins`;
- `poverty-recovery-production.herb-bundle / default / take-herb`.

The two `poverty-street-production-v2.helpful-summer-shade` variants both use `take-small-task`. Their distinct post-choice prose remains preparation-only because the current result identity cannot distinguish `market-closing` from `late-shade`.

Chat 3 does not add a runtime identity or collapse the two variants. Current shared result copy is the safe fallback.
