# Static presentation slot mapping QA v1

Status: COMPLETE / GREEN_EXACT_MAPPING

Reviewed Lead head:
`5ea2a18e214fca6d656a8751ff5c2dd1f4abce31`.

## Mapping comparison

Lead root `content/presentation.json` contains:
- 39 project-owned static slot overrides;
- 21 unique physical SVG sources.

Compared against Chat 2 item-191 manifest:
- expected semantic mappings: 39;
- Lead mappings: 39;
- missing: 0;
- extra: 0;
- source mismatch: 0;
- altKey mismatch: 0.

The Lead regression also checks every mapped ID against current `presentationSlots(catalog)`.

## Accepted families

Exact intended families:
- 10 ordinary career result/default slots;
- 8 current School lesson result slots;
- current post-School / post-paid-lesson / post-Night-study slots;
- 10 ordinary-poverty event slots;
- Forest success/escape/failure Activity return slots;
- matching Forest result-reaction slots;
- current Foreman professional milestone and Night follow-up slots.

## Staged/Product-open rejection

Lead does not activate:
- School teacher-specific media identities;
- School exact-course teacher events;
- Secret Debt identities;
- Hunter-specific Forest route/result identities;
- Old Boundary route presentation IDs;
- deeper relationship routes;
- Palace content;
- later Chat 2 seasonal static wave.

The ordinary Hunter career result asset maps only to:
`job/hunter/result/default`.

That does not promote Hunter/Forest semantics.

## Family correctness

Representative mappings:
- Lumber result -> `career-lumber-result.svg`;
- School lesson -> `school-day-study.svg`;
- ordinary poverty street -> `poverty-street.svg`;
- Forest success -> `forest-result-success.svg`;
- Foreman Night -> `foreman-night-professional.svg`.

Intentional family reuse remains bounded to compatible current semantic IDs.

## Verdict

`GREEN_EXACT_MAPPING`.

Every activated static override matches an existing current production presentationId and the reviewed Chat 2 family mapping. No staged/Product-open semantic ID is activated.
