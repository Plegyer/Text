# Undead Farm School Mapping v1

Task: C5-23
Baseline: `main@32f48d15708a543ee26b90b78761da63b3363da2`
Fixture: `content/school-undead-farm-mapping-v1.fixture.json`

## Current target identities

Current production already contains:
- career `undead-farm`;
- repeatable action `undead-farm.shift`;
- current stages `new-hand` -> `reliable-helper` through the existing `first-shift` transition.

C5-23 does not change the career state machine, wage, seasonal stat effects, resources, or production mechanics.

## Existing School preparation opportunities

### Arcana

Existing IDs:
- `school.course.arcana`
- `school.track.arcana`

Best-fit opportunities:
- observing a farm anomaly;
- interpreting magical-resource behavior;
- preparing a controlled experiment;
- research-oriented explanation.

This matches the existing draft's Arcana/Reason research role. No Research Farmer milestone, threshold, public fact, sample result, or Activity route is created.

### Literacy & Numbers

Existing IDs:
- `school.course.literacy_and_numbers`
- `school.track.literacy_and_numbers`

Best-fit opportunities:
- supply records;
- production logs;
- accounting and management context for a future Successor route.

No Successor career state or Farm-specific management fact is selected.

### Field Craft

Existing IDs:
- `school.course.field_craft`
- `school.track.field_craft`

The Undead Farm draft names a generic “practical craft” School hook for repairing containers/tools. The current School catalog has no separate practical-craft course.

C5-23 maps that need to the already-existing Field Craft capability family because it already covers:
- practical tools;
- reliable improvisation;
- observation;
- route/worksite reasoning.

This is a reuse decision, not a new curriculum. No repair capability or item effect is added.

### Rhetoric & Social

Existing IDs:
- `school.course.rhetoric_and_social`
- `school.track.rhetoric_and_social`

Best-fit opportunities:
- Merchant/supplier negotiation;
- contract discussion;
- explaining production constraints to an external partner.

No Merchant condition, contract threshold, or public fact is authored.

## Supporting-only Physical Training

`school.course.physical_training` can already improve Endurance/Strength through normal School mechanics, and current Undead Farm work uses physical stats in its ordinary work economy/seasonal package.

C5-23 does not turn that generic compatibility into a dedicated Farm School gate or milestone.

## Non-primary courses

Etiquette & Presentation, Arts & Performance, and Body Confidence are not forced into the Farm map merely for eight-course coverage.

## Missing design decisions

The Undead Farm draft leaves OPEN:
- exact Research provider/milestone;
- exact Successor management provider;
- thresholds;
- durable Farm-facing School result identities;
- specimen/item/result chain details;
- exact career consumers beyond the current shipped first-shift shell;
- Activity source/result identity.

Chat 5 does not fill those gaps.

## Integration boundary

Future Farm career content should consume only an approved durable School result or existing public capability. It must not read private `run.progression.school.tracks` state directly or create a mirrored Farm-owned School counter.
