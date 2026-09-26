# TASK CHAT 2 — Presentation Product Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: current main after PR #19.
Ownership: new presentation QA/data files only. Do not edit Lead-owned shared runtime/UI while `lead/product-activation-school-lumber` is active.

## Queue item 1 — shipped product presentation coverage

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/presentation-product-coverage.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-product-coverage.test.ts`

Build an exact coverage manifest for current target product semantic presentation IDs:
- Lumber shift spring/summer/autumn/winter;
- Lumber result;
- Lumber milestone/event;
- Foreman relationship event;
- Foreman Night event;
- Forest Activity route/result;
- all eight School lesson presentation IDs;
- Lumber Hard Work and complex Lumber ending.

Verify:
- slash taxonomy only;
- School presentation segments are kebab-case;
- no gameplay IDs are renamed;
- every manifest ID is either present in the merged target registry fixture or explicitly reported as missing;
- missing media is presentation-only and non-fatal;
- no mechanics/RNG/Energy/effect payload is stored in this manifest.

Do not patch `src/core/presentation.ts`, `src/ui/*`, `content/presentation.json`, or gameplay content.

## Queue item 2 — override-pack preflight/adversarial suite

Create NEW test file:
- `prior-work/astra/prototype-m3.2/tests/presentation-override-pack-preflight.test.ts`

Use the already completed portable override-pack contract/fixture from the previous branch as source material, but copy only what is required into NEW fixtures if needed.

Cover:
- duplicate presentationId override rejection;
- unknown presentationId quarantined/rejected before activation;
- fallback target must exist;
- fallback graph cycle rejection;
- invalid media kind/source pairing rejection;
- atomic activation: one invalid entry prevents partial application;
- changing asset source never changes semantic presentationId;
- override pack contains no life-save/gameplay state.

No shared runtime/editor edits. After item 1 commit immediately continue to item 2 without waiting for Lead review.
