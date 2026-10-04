# Leader 1 — D51 Bound Street / Secret Debt Activity-Energy Compatibility

Status: **ACCEPTED PRODUCT AUTHORITY**

Evidence:
`chat3/activity-secret-debt-energy-compat-audit-v19@d030bc72be62212130aad709cff748947eb36507`

Locked authorities:
- D19: while Secret-Debt-bound, Large Activity remains available;
- D19/D44: forced Secret Debt Night applies next-day Energy -1;
- D35: Street retains its normal consequence;
- D36: Activity entry costs exactly 2 daily Energy.

Observed conflict:
with base Energy 3, simultaneous Street -1 and Secret Debt forced-Night -1 produce Energy 1, making an otherwise legal 2-Energy Activity impossible solely because of the combined locked penalties.

## D51 rule

When start-day finalization contains **both** provenance markers from the immediately preceding Night:
1. the Street next-day Energy penalty; and
2. `secret-debt.bound-night` next-day Energy penalty,

apply the two locked penalties normally, but after those two specific modifiers the resulting usable Energy has a **compatibility floor of 2**.

This is provenance-gated to the simultaneous bound+Street case only.

Any other independent next-day Energy modifier is applied separately after this compatibility step and may reduce usable Energy below 2.

Examples:
- base 3 + Street -1 + bound-night -1 -> **2**;
- base 4 + Street -1 + bound-night -1 -> **2**;
- base 3 + Street -1 only -> **2**;
- base 3 + bound-night -1 only -> **2**;
- base 3 + Street -1 + bound-night -1 + unrelated -1 -> **1**.

Preserve:
- Street Grooming consequence;
- Secret Debt forced Night every bound night;
- forced Night suppression of voluntary Night;
- Activity entry cost = 2;
- hidden work cost = 1;
- no free Energy grant;
- no global Energy floor;
- no retroactive forced Night on the acceptance->trap activation boundary;
- save/reload exactly-once modifier semantics.

Implementation must use explicit modifier provenance/tags, not housing inference.

D51 closes only the D19/D36 compatibility conflict. It does not change Secret Debt balance, Activity economics, or lodging prices.
