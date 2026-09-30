# School Reactive v2 Parity / Collision Regression

Task: C5-59  
Baseline: `main@593f9936d72296557b36a0e0ca7d3c7bb780839c`  
Test: `tests/school-reactive-v2-parity.test.ts`

The focused regression locks C5-49 through C5-58 to the current School boundary.

It verifies:
- direct paid-lesson execution knows exact course identity while the generic reaction fact does not;
- exact paid-course presentation identity is available through `lastAction.presentationId`;
- generic `actionCompleted: school` is safe only for generic after-School reactions;
- exact Night-study choice routing remains separately available;
- production teacher events remain absent;
- all eight v2 course fixtures bind exact current course/track/teacher identities;
- every v2 fixture leaves runtime consumer, threshold and public-result selections null;
- exact four course response roles are present: lesson success, ordinary repetition, teacher feedback, transfer context;
- the teacher matrix covers all eight teachers and three required contexts;
- 112 prepared keys are unique, RU/EN complete and absent from current root localization;
- Field Craft, Physical Training, Arts & Performance and Body Confidence keep their explicit mechanics boundaries.

No runtime file or production localization file is modified by the regression.
