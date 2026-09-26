# School Authoring Decision-Ready Packet v1

Status: human/product decision packet.
Purpose: convert the remaining School gaps into explicit choices without selecting a preferred answer.

The School mechanics/runtime boundary is already prepared for authored decisions:
- eight paid course identities/packages are locked;
- typed School track ownership is defined;
- exactly-once publication semantics are defined;
- durable public cross-system transport is defined;
- semantic presentation slots are defined.

This packet does **not** choose final management/accounting or Arcana/Forest public-fact identities, thresholds, teachers, certificates, projects, or exams.

## Decision 1 — Management/accounting public-result provider

**Question**

Which authored School-owned result should publish the management/accounting public result consumed by Lumber/Forewoman?

**Acceptable answer types**
- a named School milestone;
- a named School certificate;
- a completed School project;
- a completed School exam;
- another explicit School-owned authored result.

**Downstream files/systems affected**
- School authoring data;
- School public-fact publication definition;
- Lumber/Forewoman public-fact consumer content;
- PA07/PA08 acceptance evidence.

**PA rows**
- PA07;
- PA08.

**Runtime status**

READY. Existing School ownership + public-boundary mechanics are sufficient for an authored provider. No runtime change is required merely to choose the provider.

## Decision 2 — Management/accounting threshold or milestone type

**Question**

What private School eligibility makes the chosen management/accounting result authoritative?

**Acceptable answer types**
- `lessons_completed >= N`;
- authored stat threshold set;
- project completion;
- exam completion;
- certificate completion;
- an explicit conjunction of authored School-owned requirements.

**Downstream files/systems affected**
- School milestone/certificate/project authoring;
- exactly-once publication proof;
- PA07 progression path;
- PA08 cross-system continuation.

**PA rows**
- PA07;
- PA08.

**Runtime status**

READY_FOR_AUTHORED_CONDITIONS. The runtime already supports School-owned progress and public publication boundaries in the integrated Lead path. A runtime change is needed only if Product chooses a condition type not representable by current authored conditions/state.

No threshold is chosen here.

## Decision 3 — Arcana/Forest public-result provider

**Question**

Which authored School-owned Arcana result publishes the knowledge boundary consumed by Forest/Lumber content?

**Acceptable answer types**
- Arcana track milestone;
- Arcana certificate;
- Arcana project;
- Arcana exam;
- another explicit authored School-owned knowledge result.

**Downstream files/systems affected**
- Arcana School authoring data;
- public-fact publication definition;
- Forest/Lumber consumer content;
- PA08 and Forest-route evidence.

**PA rows**
- PA08;
- PA14;
- PA18.

**Runtime status**

READY. Existing `worldFacts/worldFactAdded` or an equivalent typed domain-public boundary is sufficient. The provider identity remains a content decision.

## Decision 4 — Arcana/Forest threshold or milestone type

**Question**

What private School eligibility makes the chosen Arcana/Forest result authoritative?

**Acceptable answer types**
- `lessons_completed >= N`;
- Magic/Reason/other authored stat thresholds;
- project completion;
- exam completion;
- certificate completion;
- an explicit conjunction of School-owned requirements.

**Downstream files/systems affected**
- Arcana milestone/certificate/project authoring;
- Forest interpretation content;
- exactly-once publication definition.

**PA rows**
- PA08;
- PA14;
- PA18.

**Runtime status**

READY_FOR_AUTHORED_CONDITIONS. No threshold/provider is selected here.

## Decision 5 — Teacher identities and presentation depth

**Question**

Which canonical teacher/presenter identities and authored lesson content ship for the School slice?

**Acceptable answer types**
- one teacher per course;
- one teacher shared by several courses;
- presenter roles without relationship state;
- course-specific narrator/presenter;
- another approved mixed presentation model.

**Downstream files/systems affected**
- semantic School presentation slots;
- lesson/result text;
- static/GIF/media assets;
- PA07 presentation evidence.

**PA rows**
- PA07.

**Runtime status**

SEMANTIC_PRESENTATION_READY. The routing IDs already exist. Teacher identity/content is authoring depth; it does not require changing paid lesson mechanics.

## Decision 6 — Certificate/project/exam authoring

**Question**

Are certificates, projects, or exams part of the minimum authored School public-result path? If yes, which definitions ship?

**Acceptable answer types**
- no certificate/project/exam required for the minimum PA path;
- certificate-based provider;
- project-based provider;
- exam-based provider;
- explicit combined authored progression.

**Downstream files/systems affected**
- School progression content;
- reserved milestone/certificate/project/exam state;
- presentation content;
- public-fact provider definition if selected.

**PA rows**
- PA07;
- PA08.

**Runtime status**

RESERVED_STATE_READY. School progression contracts already reserve projects/exams/certificates. Implementation work is required only if the selected authored mechanic needs behavior beyond the existing reserved state/condition/effect surface.

## Decision table

| Decision | Human/Product answer required | Runtime already ready? | Runtime change required now? |
|---|---|---|---|
| management public-result provider | yes | yes | no |
| management threshold/milestone type | yes | yes for current condition/state surface | no |
| Arcana/Forest public-result provider | yes | yes | no |
| Arcana/Forest threshold/milestone type | yes | yes for current condition/state surface | no |
| teacher identities/content depth | yes | semantic presentation routing yes | no |
| certificate/project/exam inclusion | yes | reserved state ready | no unless selected behavior exceeds current surface |

## Non-decisions

This packet intentionally leaves:
- final management/accounting public fact ID = OPEN;
- management threshold = OPEN;
- final Arcana/Forest public fact ID = OPEN;
- Arcana/Forest threshold = OPEN;
- teacher identities = OPEN;
- certificate/project/exam definitions = OPEN unless separately authored.

No preferred answer is implied by ordering or examples.
