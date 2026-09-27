# School Authored Content Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat5/school-pa-gate-next
Reviewed scope: Chat5 items 82-89

## Disposition

SELECTIVE_INTEGRATION_READY_WITH_CORRECTION.

Do not merge the long-lived worker branch wholesale.

Branch state against current main:
- diverged;
- ahead 151 commits;
- behind 80 commits;
- merge base 88a0f7526bc43493d2415a0e7859296408e7b564.

The authored School files should be selectively copied/recreated on a fresh current-main branch.

## Eight-track representation

Items 82-89 provide one proposed teacher/presenter identity for each current School track:
- literacy_and_numbers;
- arcana;
- rhetoric_and_social;
- etiquette_and_presentation;
- field_craft;
- physical_training;
- arts_and_performance;
- body_confidence.

The machine-readable teacher fixture mirrors the same eight track/course references.

PASS.

## Teacher identities vs mechanics

The teacher draft explicitly states:
- identities are CONTENT_DRAFT;
- tuition does not change;
- current-day Energy does not change;
- stat packages do not change;
- paid/Night counters do not change;
- ordinary paid lessons are not gated by teacher identity;
- management/accounting public-result semantics are not selected;
- Arcana/Forest public-result semantics are not selected.

The authored names, roles and voices are content proposals only.

PASS.

## Repeatable lesson text

The lesson bank contains several short variants for every one of the eight tracks.

The text is framed around the existing course identity and teacher voice.

No authored variant introduces:
- a new tuition value;
- a new Energy cost;
- a new stat reward;
- a new milestone prerequisite;
- a public-result rule.

PASS.

## Milestone-neutral School life scenes

The neutral scene bank contains:
- classroom arrival/context;
- teacher feedback;
- peer/context moments;
- post-lesson reactions;
- Night-study flavor.

It explicitly avoids asserting unresolved exam/project/certificate/public-result completion.

PASS.

## Teacher prerequisite guard

Teacher relationship seeds are optional.

They do not gate ordinary paid lessons.

Teacher social/Night scenes remain separate from the paid School transaction and from Night-study transaction ownership.

PASS.

## Public-result guard

No reviewed item selects:
- management/accounting provider;
- management/accounting threshold;
- management public result;
- Arcana/Forest provider;
- Arcana/Forest threshold;
- Arcana/Forest public result.

Relationship/world hooks are phrased only as future reactions to approved public results.

PASS.

## Presentation briefs

The presentation briefs are content-only:
- portrait/static need;
- optional GIF loop;
- classroom motif;
- semantic presentation context;
- reuse ideas;
- alt-text seed.

They keep:
- final art style OPEN;
- static/text fallback valid;
- GIF optional;
- media timing independent from tuition/stat/progress/publication.

PASS.

## Consistency-audit defect

One section in:
SCHOOL_AUTHORED_CONTENT_CONSISTENCY_AUDIT_v1.md

reverses the counter ownership in prose.

It states that paid lessons increment night_study_sessions and Night study increments lessons_completed.

That is backwards.

Correct locked ownership is:
- paid lesson -> lessons_completed;
- Night study -> night_study_sessions.

The same audit later says counters are not mixed, and the other authored files preserve the intended separation, so this is a documentation defect rather than evidence that the content package changes mechanics.

Required correction before promoting that audit as authority:
fix the swapped counter-description lines.

Classification:
DOC_CORRECTION_REQUIRED.

## Selective integration set

Ready for Lead review after the correction above:
- SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md
- school-teacher-identities-v1.fixture.json
- SCHOOL_REPEATABLE_LESSON_TEXT_BANK_v1.md
- SCHOOL_MILESTONE_NEUTRAL_SCENE_BANK_v1.md
- SCHOOL_TEACHER_PRESENTATION_BRIEFS_v1.md
- SCHOOL_TEACHER_RELATIONSHIP_SEEDS_v1.md as optional content
- corrected SCHOOL_AUTHORED_CONTENT_CONSISTENCY_AUDIT_v1.md
- SCHOOL_AUTHORED_CONTENT_INTEGRATION_HANDOFF_v8.md

## What remains Product-blocked

Still OPEN:
- management/accounting provider/milestone;
- management public-result rule;
- whether Arcana/Forest distinct result remains in scope;
- Arcana/Forest provider/milestone if retained;
- canonical teacher relationship routes;
- final art direction.

The proposed teacher identities themselves remain content drafts until Lead accepts them.

## Runtime requirement

No new School runtime primitive is required for:
- teacher identity;
- repeatable lesson copy;
- neutral classroom copy;
- static/text presentation;
- optional presentation loops.

These can be converted into production content on current primitives.

## Final classification

- eight tracks represented: PASS
- teacher identity changes mechanics: NO
- lesson text matches course identities: PASS
- public-result decision invented: NO
- teacher prerequisite added: NO
- presentation briefs content-only: PASS
- selective integration: READY AFTER DOC CORRECTION
- whole-branch merge: BLOCKED BY STALE BASE
- shared runtime change required: NO

No production runtime/UI/content file was modified by Chat 4.
