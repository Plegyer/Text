# LEADER 1 WORKER BUNDLE PROTOCOL

Status: **ACTIVE**

Purpose: reduce worker idle gaps.

## Producer / research / QA lanes (Chats 3-6)

Default assignment should be a safe bundle of 2-3 sequential tasks when the tasks:
- do not require a Leader merge between them;
- do not require a future unknown main SHA;
- do not overlap another worker's production ownership;
- can be completed without a Product decision.

The pointer must explicitly say:
- complete all tasks in order;
- do not stop after the first deliverable;
- stop only for a genuine blocker/ambiguity;
- no full CI unless specifically authorized.

When one bundle finishes, Leader should accept it and refill with another bundle.

## Chat 2

Chat 2 remains the sole current-main assembly/full-CI lane.

Do NOT chain major production tranches across an unperformed Leader merge.

Within one assembly tranche, Chat 2 should continue through:
compose -> focused QA -> build gates -> full CI
without waiting between substeps.

After `READY_FOR_LEADER_MERGE`, Chat 2 stops until Leader merges and exact-main CI is green.

## User-facing status

Use:
- WORKS
- WAITS
- ERROR
- DONE

A GitHub Actions job running does not mean the chat itself is working.
