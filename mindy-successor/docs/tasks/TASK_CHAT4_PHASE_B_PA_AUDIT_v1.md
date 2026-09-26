# TASK CHAT 4 — Phase B / Product Acceptance QA Queue v1

Status: ACTIVE / CONTINUOUS.
Base: current `main` after Phase A closure.
This branch is QA-only. Do not patch runtime.

## Queue item 1 — Phase B presentation acceptance audit

Review PR #15 behavior against:
- `GIF_CENTRAL_STAGE_CONTRACT_v1.md`;
- `MEDIA_PRESENTATION_CONTRACT_v0.md`;
- `presentation-prep/PRESENTATION_SLOT_TAXONOMY_v1.md`;
- `presentation-prep/PHASE_B_PRESENTATION_IMPLEMENTATION_PACKET_v1.md`.

Create:
- `docs/qa-prep/PHASE_B_PRESENTATION_AUDIT_v1.md`

Check specifically:
- one persistent central media box;
- stable semantic `presentationId`;
- GIF primary/static/text fallback;
- no gameplay timing coupled to GIF;
- animation-off is presentation-only;
- unknown/missing media non-fatal;
- target-shaped Lumber/School/ending IDs;
- editor uses presentationId + file picker, not typed source paths.

## Queue item 2 — cross-PR Product Acceptance wiring review

Review PR #16 Lumber and PR #17 School against the existing PA00–PA26 harness contract. Create:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_WIRING_REVIEW_v1.md`

Deliver:
- exact fixture IDs already available;
- missing IDs/hooks;
- conflicts between slices;
- which PA steps can run immediately after merges;
- which require Night/presentation integration;
- no invented content or thresholds.

Optional: add NEW tests only if they are pure QA and do not require runtime modification.

Forbidden:
- runtime/core/UI/content production files;
- existing Lead-owned board/state files.

Acceptance: actionable review, no duplicate implementation.
