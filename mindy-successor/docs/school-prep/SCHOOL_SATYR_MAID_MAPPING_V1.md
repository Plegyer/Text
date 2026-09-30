# Satyr Maid School Mapping v1

Task: C5-22
Baseline: `main@32f48d15708a543ee26b90b78761da63b3363da2`
Fixture: `content/school-satyr-maid-mapping-v1.fixture.json`

## Current target identities

Current production already contains:
- career `satyr-maid`;
- repeatable action `satyr-maid.shift`;
- current stages `new-maid` -> `known-face` through the existing `first-shift` transition.

C5-22 does not change that state machine or the shift wage/stat/seasonal package.

## Existing School preparation opportunities

### Rhetoric & Social
Existing IDs:
- `school.course.rhetoric_and_social`
- `school.track.rhetoric_and_social`

Best-fit opportunities from the existing Satyr Maid design:
- handling guest conflict;
- VIP/service conversation;
- House Power negotiation;
- discussing house rules/boundaries.

No threshold or public career fact is selected.

### Literacy & Numbers
Existing IDs:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`

Best-fit opportunities:
- supply records;
- payroll/accounting context;
- scheduling notes;
- management handoffs.

This reuses the same existing accounting/record-keeping capability family already identified for Lumber. It does not create a Satyr-specific accounting course or assert that the Lumber management transport fact applies here.

### Arts & Performance
Existing IDs:
- `school.course.arts_and_performance`
- `school.track.arts_and_performance`

Best-fit opportunities:
- festival/event service;
- stage-adjacent coordination;
- performance-aware guest handling.

No festival mechanic, event threshold, or relationship condition is authored.

### Body Confidence
Existing IDs:
- `school.course.body_confidence`
- `school.track.body_confidence`

Best-fit opportunities:
- deliberate professional presence;
- clear personal boundaries;
- confident higher-status service.

This mapping explicitly does not equate Sexuality or Body Confidence with Lust, consent, or willingness to accept intimate content.

### Etiquette & Presentation
Existing IDs:
- `school.course.etiquette_and_presentation`
- `school.track.etiquette_and_presentation`

Best-fit opportunities:
- elite clientele;
- formal service;
- guest protocol;
- Palace-adjacent invitations where another system already owns the invitation/eligibility rules.

No Palace unlock is created.

## Non-primary courses

Arcana, Field Craft, and Physical Training are not forced into the Satyr Maid School map merely for full-course coverage. They may still contribute generic stats through their normal School mechanics, but C5-22 defines no special Satyr-preparation semantic for them.

## Missing design decisions

The Satyr Maid draft names School hooks but does not lock:
- exact School provider/milestone identities;
- lesson/stat thresholds;
- durable Satyr-facing public fact IDs;
- exact career scenes that consume those results;
- House Power or House Rules production transitions beyond the current shipped two-stage career shell.

Those decisions remain outside Chat 5 ownership.

## Integration boundary

A future integration can consume an approved School result through the existing public-result/resolver model. It must not read School-private counters directly or create a parallel School progression layer inside `satyr-maid`.
