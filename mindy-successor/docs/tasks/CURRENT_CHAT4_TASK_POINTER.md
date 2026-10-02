# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HARD WORK / NEW START+ GENERIC INFRA PREP**
Owner: Chat 4

Packet v2 is frozen at:
`b5764e2edb531e62d063e1a18c2febd6da8d0899`

Create a fresh implementation-prep branch from current main:
`chat4/hard-work-meta-infra-prep-v1`

## Locked facts

- first 5 ordinary careers: one +5 progression-stat bonus package effect;
- later 5: up to two +5 progression-stat effects;
- any earned package subset may be active on New Start+, including none/all;
- any Lust Hard Work bonus is **at least +3 Lust** in magnitude;
- earned Hard Work permanently grants early access to that profession;
- old automatic +3/+3 and Merchant +600 model is superseded;
- Palace gate consumes permanent 10/10 + current-run active 10/10;
- Palace True reward is cap-only 100 -> 200, never value multiplication.

## Work now without waiting for final profession->stat mapping

Prepare the generic, collision-minimized infrastructure as isolated code/tests where possible:
- typed/data-driven Hard Work package definition shape and validator;
- arbitrary subset selection representation for New Start+;
- exactly-once package application contract at creation completion;
- D21 inherited early-career access helper with Secret Debt domain-lock precedence;
- migration/test plan for retiring old automatic rewards;
- tests using synthetic/package fixtures rather than guessing final production mapping;
- explicit integration seam for Palace to read all-ten-active;
- no Palace authored content and no Secret Debt implementation changes.

Avoid broad engine/schema rewrites if they cannot be isolated safely; in that case produce compile-ready helper modules + tests and a minimal integration patch plan.

No full CI.
Freeze exact SHA and report `READY_FOR_CHAT2_OR_LEADER`.
