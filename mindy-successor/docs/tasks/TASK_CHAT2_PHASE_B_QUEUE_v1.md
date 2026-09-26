# Chat 2 — Phase B Presentation Queue v1

Base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`
Branch: `chat2/phase-b-central-stage`

## No-idle rule

Do not wait for Lead review after Queue Item 1. If Item 1 is green, immediately continue Item 2 on the same branch. Stop only for a genuine shared-core dependency that cannot be avoided.

## Queue Item 1 — Central GIF stage runtime

Implement the presentation runtime from `docs/presentation-prep/PHASE_B_PRESENTATION_IMPLEMENTATION_PACKET_v1.md`.

Allowed writes:
- `prior-work/astra/prototype-m3.2/src/core/presentation.ts`
- `prior-work/astra/prototype-m3.2/src/ui/app.ts`
- `prior-work/astra/prototype-m3.2/src/ui/style.css`
- dedicated presentation/UI tests
- new presentation registry/fixture files under `content/` if isolated from gameplay mechanics

Do not modify:
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/content.ts`
- career/School/Activity mechanics
- A6 ending/meta semantics

Required behavior:
- one fixed central media stage;
- stable semantic `presentationId` resolver;
- GIF primary, static/text fallback;
- fallback cycle validation;
- missing media non-fatal;
- animation-disable mode;
- no GIF timing coupled to commands/effects/RNG;
- same box dimensions across GIF/static/missing/text states.

Acceptance:
- focused tests for resolver/fallback/animation-off;
- existing `npm run check` remains green.

## Queue Item 2 — Editor replacement workflow

Immediately after Item 1 is green:
- update `src/ui/editor.ts` and dedicated tests;
- select/search by `presentationId`;
- replace GIF/static fallback through file-picker/import path;
- no manual source path required in normal workflow;
- preview uses same resolver/stage dimensions;
- invalid replacement preserves previous valid override;
- import/export keeps presentation separate from run save.

Do not wait for Lead before starting Item 2.

## Handoff

At a stable checkpoint, commit. A short handoff is enough:
SHA, changed paths, tests, genuine blockers only.
