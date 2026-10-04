# Chat 3 — D51 Exact-Head QA v21

Verify frozen producer:
`chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`.

The QA workflow must checkout that exact SHA.

Run:
- npm ci
- typecheck
- validate
- build
- D51 focused test
- Secret Debt v12 focused regression
- NightFlow/save-reload modifier provenance tests
- Activity 2-Energy regressions

No full CI. No production changes on frozen v20.

Return exact run/job IDs and READY_FOR_CHAT2_ASSEMBLY only if green.
