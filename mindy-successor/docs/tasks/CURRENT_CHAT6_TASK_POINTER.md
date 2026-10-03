# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE PRINCE CONFRONTATION DECISION PACKET v9**
Owner: Chat 6

Frozen Palace D23 consumer:
`chat6/palace-d23-consumer-integration-v8@9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`
Preserve it frozen; it is queued after Chat 4 shared runtime + UI integration.

Create:
`chat6/palace-prince-confrontation-decision-v9`
from fresh main.

## Product direction

- successor True Ending is Palace Return Home;
- do **not** port the original Plus Mode/job-replacement true-ending structure;
- True readiness remains all 12 progression stats >=91;
- Lust excluded;
- the Prince must be defeated in a final Palace confrontation;
- exact confrontation mechanics remain Product-open.

## Assignment

Prepare 2-3 concrete, implementable confrontation models using systems that already exist in the successor where possible.

For each option define:
- how confrontation becomes available after Palace progression + all-12 >=91;
- explicit player action to begin it;
- sequence length / save-reload behavior;
- which existing mechanics are reused (Activity-like choices, authored event chain, relationships/items/capabilities, stat checks);
- what exact signal constitutes `prince-defeated`;
- failure/refusal/retry behavior;
- how it avoids becoming a single automatic stat check;
- how it preserves the separate Return Home ending commit;
- production files/systems touched;
- focused acceptance tests.

Do not invent a new generic combat subsystem unless every lower-complexity option is demonstrably insufficient.
Do not choose final Prince lore/name.
Do not implement production runtime.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_PRODUCT_DECISION`.
