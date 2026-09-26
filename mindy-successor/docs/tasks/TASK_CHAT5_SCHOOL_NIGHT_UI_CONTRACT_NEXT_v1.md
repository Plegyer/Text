# TASK CHAT 5 — School/Night UI Contract Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat5/school-reachability-next`.
Previous checkpoint is frozen for Lead review.

Locked School mechanics remain unchanged.
Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — School production picker interaction contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-picker-interaction.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-picker-interaction.test.ts`

Define the exact UI-facing contract for all eight paid courses:
- courseId;
- label;
- tuition;
- current-day Energy cost = 1;
- stat package;
- presentationId;
- disabled-state reasons for insufficient money, insufficient Energy, pending scene, active Night, active Activity, not-arrived run.

Verify:
- all eight courses covered exactly once;
- no ordinary course changes Lust;
- gameplay IDs unchanged;
- presentation IDs remain kebab-case;
- picker data contains no invented milestone/certificate/teacher thresholds.

This is a UI data/expectation contract only; do not edit `src/ui/app.ts`.

## Queue item 2 — NightFlow choice reachability matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-nightflow-reachability.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-nightflow-reachability.test.ts`

Using the completed 24-choice Night-study catalog and current Night contracts, define/verify:
- which lodging tiers permit normal Night study by locked design;
- each reachable School Night choice consumes the Night slot, not daytime Energy;
- tuition = 0;
- +2 only to a supported stat;
- next-day Energy delta = -1 exactly once;
- `night_study_sessions` increments separately from `lessons_completed`;
- street does not expose normal School Night study by default;
- save/reload checkpoints exist before choice, after choice, and after day advance;
- no course/stat pair outside the validated 24-choice catalog appears.

Do not edit NightFlow/runtime/schema/UI. After item 1 commit immediately continue to item 2.
