# School Track Data Map v1

Status: isolated School production-data preparation for Chat 5.
Source baseline: SCHOOL_SYSTEM_v2.md, SCHOOL_BALANCE_MATRIX_v0.csv, TARGET_STAT_SYSTEM_v1.md, EXECUTABLE_TZ_v1.md.
Integration state: non-loaded; no active content wiring.

## Numeric authority

This file carries forward the current School baseline without rebalancing it.

SCHOOL_BALANCE_MATRIX_v0.csv expresses tuition in WU. EXECUTABLE_TZ_v1.md expresses the same tuition in game currency with 1 WU = 50 currency. Both representations are recorded below; they are the same cost, not two separate charges.

Every ordinary lesson costs 1 current-day Energy plus tuition. Effects apply immediately as one lesson package.

## Stable baseline course IDs

| Stable course ID | Source key | Display name | Tuition | Exact stat effects | Direct progression-stat coverage |
|---|---|---|---:|---|---|
| school.course.literacy_and_numbers | LiteracyAndNumbers | Literacy & Numbers | 6 WU / 300 currency | reason +4; wits +2 | reason, wits |
| school.course.arcana | Arcana | Arcana | 10 WU / 500 currency | magic +4; reason +4; creativity +2 | magic, reason, creativity |
| school.course.rhetoric_and_social | RhetoricAndSocial | Rhetoric & Social | 6 WU / 300 currency | charm +3; sociability +3; wits +2 | charm, sociability, wits |
| school.course.etiquette_and_presentation | EtiquetteAndPresentation | Etiquette & Presentation | 8 WU / 400 currency | manners +3; grooming +3; charm +2 | manners, grooming, charm |
| school.course.field_craft | FieldCraft | Field Craft | 8 WU / 400 currency | dexterity +3; wits +3; creativity +2 | dexterity, wits, creativity |
| school.course.physical_training | PhysicalTraining | Physical Training | 8 WU / 400 currency | strength +3; endurance +3; dexterity +2 | strength, endurance, dexterity |
| school.course.arts_and_performance | ArtsAndPerformance | Arts & Performance | 10 WU / 500 currency | creativity +3; charm +3; sociability +2; dexterity +2 | creativity, charm, sociability, dexterity |
| school.course.body_confidence | BodyConfidence | Body Confidence | 8 WU / 400 currency | sexuality +3; grooming +3; endurance +2 | sexuality, grooming, endurance |

The direct-coverage column is mechanical: it lists only stats present in the accepted effect package. Conceptual curriculum themes do not add unlisted stat gains.

## Coverage check

The eight baseline packages directly cover all 12 progression stats at least once:

strength, endurance, dexterity, reason, magic, creativity, wits, charm, sociability, manners, grooming, sexuality.

Lust is a separate content axis. It is not a standard School stat, is not included in these lesson packages, and is not part of the ordinary progression-stat catalog.

## Stable track mapping

For the current one-course-per-baseline-track preparation, each course maps to a stable track ID with the same slug:

- school.track.literacy_and_numbers
- school.track.arcana
- school.track.rhetoric_and_social
- school.track.etiquette_and_presentation
- school.track.field_craft
- school.track.physical_training
- school.track.arts_and_performance
- school.track.body_confidence

These IDs are preparation IDs for data wiring. They do not activate School content and do not define teacher identity, milestones, exams, certificates, or lore.
