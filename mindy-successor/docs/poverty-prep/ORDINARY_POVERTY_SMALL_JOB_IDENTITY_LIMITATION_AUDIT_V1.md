# Ordinary Poverty Small-job Exact-identity Limitation Audit v1

Status: C3-79 current-main identity audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `8fb0985ccc353f3f35a2cc2fc140c07dff81cd11`.

The result screen currently localizes event outcomes by `eventId + choiceId`. It does not carry `variantId` into the choice-result localization lookup.

That is sufficient for single-variant events:
- `poverty-street-production.helpful-summer / default / take-errand`;
- `poverty-recovery-production.short-cleanup / default / do-cleanup`;
- `poverty-recovery-production.small-coin-help / default / take-coins`;
- `poverty-recovery-production.herb-bundle / default / take-herb`.

It is not sufficient for the two variant-specific small-task prose entries under `poverty-street-production-v2.helpful-summer-shade`, because both `market-closing` and `late-shade` use the same `take-small-task` choice result key.

Those two entries are classified `BLOCKED_VARIANT_SPECIFIC_RESULT`. Chat 3 does not add runtime/result identity. Safe fallback is the current shared choice-result copy unless Integration gains an approved variant-aware result seam.
