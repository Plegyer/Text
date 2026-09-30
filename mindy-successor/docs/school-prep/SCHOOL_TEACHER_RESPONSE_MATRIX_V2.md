# Teacher Response Matrix v2

Task: C5-58  
Baseline: `main@593f9936d72296557b36a0e0ca7d3c7bb780839c`  
Fixture: `content/school-teacher-response-matrix-v2.fixture.json`

The matrix covers all eight current teacher identities and exactly three response contexts per teacher:
- lesson success;
- ordinary repetition;
- transfer context.

That produces 24 teacher response variants with complete RU/EN title/body pairs.

The matrix preserves each teacher's current course and track identity. It does not make teachers career gatekeepers and does not select a milestone, threshold, public result or runtime consumer.

Because paid-lesson ReactionFacts remain generic `actionCompleted: school`, `selectedRuntimeConsumerId` is null. The content is integration-ready only for a future approved exact-course/teacher selector or for a direct caller that already owns exact lesson identity.

Sera Vey's transfer response explicitly preserves the distinction between Body Confidence, consent and Lust. Tovan Kest's response adds no Energy rule. Rowan Pike's response adds no Activity route.
