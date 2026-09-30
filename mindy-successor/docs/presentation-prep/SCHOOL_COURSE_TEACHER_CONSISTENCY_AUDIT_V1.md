# School Course / Teacher Presentation Consistency Audit v1

Status: C2-57 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline queue-v6 branch from main: `5f2685f1fde6b4718483febd6f49108eaa4ac873`

## Course semantic presentation

The eight existing paid School course semantic IDs remain:

- `school/literacy-and-numbers/lesson/default`
- `school/arcana/lesson/default`
- `school/rhetoric-and-social/lesson/default`
- `school/etiquette-and-presentation/lesson/default`
- `school/field-craft/lesson/default`
- `school/physical-training/lesson/default`
- `school/arts-and-performance/lesson/default`
- `school/body-confidence/lesson/default`

Consistency result:
- **8 / 8** exact project-owned course static overrides;
- **8 / 8** RU/EN alt pairs;
- **8 / 8** RU/EN caption pairs;
- all fall back through the current registry to `location/town/default`.

## Teacher media surfaces

The School teacher pack still exposes exactly eight current catalog media identities:
- one classroom media identity per course;
- all eight are static image media;
- all eight currently use `assets/stage-school.svg`;
- all eight retain nonempty direct catalog alt text.

The merged cross-domain handoff already carries RU/EN presentation accessibility metadata for the same eight media identities. Queue-v6 records that metadata without inventing standalone teacher semantic presentation IDs.

## Content-depth consistency

Accepted Chat 5 teacher-depth content does not create a new current teacher media or semantic presentation identity. The presentation surface remains the course semantic slot plus the existing teacher catalog media identity.

## Result

Course semantic IDs: **8**, all exact/static/localized.

Teacher media identities: **8**, all static/source-backed.

Course/teacher identity mismatches: **0**.

New teacher gameplay or semantic presentation IDs created by Chat 2: **0**.
