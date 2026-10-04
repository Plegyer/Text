# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — D51 SECRET DEBT / ACTIVITY ENERGY COMPAT PRODUCER v20**
Owner: Chat 3

Accepted Product authority:
`mindy-successor/docs/tasks/LEADER1_D51_BOUND_STREET_ACTIVITY_ENERGY_LOCK_2026-10-04.md`

Source audit:
`chat3/activity-secret-debt-energy-compat-audit-v19@d030bc72be62212130aad709cff748947eb36507`

Frozen Secret Debt base:
`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

New branch:
`chat3/secret-debt-activity-energy-compat-producer-v20`

Implement D51 narrowly on the Secret Debt/Night next-day Energy seam.

Required behavior:
- if the immediately preceding Night applied both Street Energy -1 and `secret-debt.bound-night` Energy -1, process both but apply a provenance-gated compatibility floor of 2 after those two specific modifiers;
- unrelated independent Energy penalties remain separate and may reduce below 2;
- no global Energy floor;
- Activity entry remains exactly 2 Energy;
- hidden work remains 1 Energy;
- Street Grooming consequence remains;
- Secret Debt forced Night remains every bound night;
- voluntary Night suppression remains;
- acceptance -> trap activation morning gets no retroactive forced-Night penalty;
- save/reload cannot duplicate or lose either modifier.

Use explicit modifier provenance/tags; do not infer from housing alone.

Focused QA must include v19 T1-T11, especially:
- normal/cheap controls;
- bound+Street reproduction/fix;
- reload before/after forced Night choice;
- trap activation boundary;
- second bound Street morning;
- unrelated third penalty;
- Meta +1 diagnostic;
- route exit.

Do not change D44 wages/thresholds, D36 entry cost, lodging prices, Palace, or Strong Meta.

No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT3_SECRET_DEBT_ACTIVITY_ENERGY_COMPAT_PRODUCER_v20.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
