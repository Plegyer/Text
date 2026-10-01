# Chat 4 QA Queue v13 — Current Wave Gates Without Idle Gaps

Status: **ACTIVE NOW**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-126..137

Do not stop after one blocker. A blocked producer candidate is recorded and returned to its owner; then continue to the next eligible frozen candidate.

### C4-126 — re-gate Chat 1 PR #147
Exact frozen head: `e9e1c4d5cdafcdf5e8571170cd9b699426536746`
Exact-head CI #483: GREEN.
Re-run the previously blocking natural repeatability and typed-transition checks on this exact head.

### C4-127 — gate Chat 2 PR #151
Exact frozen head: `463d877009b5ecc1d255d7aa27a91bb7c38016e5`
Exact-head CI #474: GREEN.
Verify presentation-only ownership, gameplay/save invariance, live asset/fallback honesty and current-main collisions.

### C4-128 — gate Chat 3 PR #146 repaired head
Exact frozen head: `8fa771f212190e5ad9ba4145869d5ce0b04d2cf2`
Exact-head CI #500: GREEN.
Verify the repair removed blocking/identity drift rather than weakening mechanics; confirm content-only ownership and natural reachability claims.

### C4-129 — gate Chat 5 PR #156
Exact frozen head: `97b659d78ac3a2ccfe72c556344631f7de570507`
Exact-head CI #489: GREEN.
Verify School content-only scope, typed capability validity, locale/save invariance and unresolved-threshold firewall.

### C4-130 — integration-order collision review
After the four verdicts, provide one exact order for accepted candidates against current main, including any required rebase/selective-source action. Do not implement fixes.

### C4-131 — post-merge main gate #1
After Lead merges the first accepted candidate, verify exact new main and rerun the product-critical acceptance assertions affected by it.

### C4-132 — post-merge main gate #2
Repeat after the next accepted candidate.

### C4-133 — legacy selective-source check
Re-evaluate only the unique deltas from #124/#136/#139 against the then-current main. Mark each unique hunk still needed vs now superseded. No whole-PR approval.

### C4-134 — starter trio truth
Update executable truth for Lumber / Satyr Maid / Undead Farm after the shared-runtime merge. Distinguish repeatable base loop from complete career life.

### C4-135 — Forest/School truth
Update executable truth after Chat 3 / Chat 5 integrations: natural vs capability/test-accelerated routes, live teacher/Night-study content, items.

### C4-136 — next-wave readiness
When stacked Satyr/Forest queues begin producing candidate heads, gate only frozen green heads and never re-use old CI after movement.

### C4-137 — queue closeout
Persist concise QA evidence and current-main acceptance truth; no production implementation.

The QA worker continues automatically through every eligible item. A blocked candidate does not idle Chat 4.
