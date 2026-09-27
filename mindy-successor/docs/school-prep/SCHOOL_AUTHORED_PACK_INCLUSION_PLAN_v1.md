# School Authored Pack Inclusion Plan v1

Status: future production inclusion plan only. No current production content is changed here.

Future authored School packs should be included explicitly, never by recursive fixture globbing.

Planned pack classes:
- base lesson-variant pack;
- teacher-specific pack(s);
- milestone/public-result pack(s);
- downstream cross-career reaction pack(s);
- presentation/media references.

Before inclusion, validate stable IDs, course/track references, ownership, explicit read/write capabilities, semantic presentation IDs, fallback media, save/reload behavior, exactly-once publication where used, and absence of fixture-only IDs.

Production bootstrap/catalog should name each approved pack explicitly. Paths matching test/fixture content must remain excluded. A QA fixture may inform a test shape but never become canonical production data by copy.

Dependency order should be explicit: locked School mechanics first, authored lesson/teacher content next, approved milestone/public-result providers next, downstream consumers after public IDs are frozen, presentation/media mapping after semantic IDs are stable.

Rollback/removal: a pack may be removed by deleting only its explicit production inclusion and authored content references, while preserving locked School mechanics and unrelated packs. Removing a downstream consumer must not delete the School-private provider unless that provider is separately retired. Removing presentation media must leave a valid fallback.

No provider, threshold, teacher, certificate, project, exam, or route unlock is selected by this plan.
