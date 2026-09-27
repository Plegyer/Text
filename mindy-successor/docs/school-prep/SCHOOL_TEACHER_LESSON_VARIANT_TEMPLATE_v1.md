# School Teacher / Lesson Variant Template v1

Status: reusable authored-content unit for teacher-led School variants.

All teacher identities, thresholds, milestone providers and public-result IDs remain OPEN until explicitly approved.

## Identity

- Course ID: OPEN — choose an existing `school.course.*`
- Track ID: OPEN — must match course
- Teacher/presenter canonical ID: OPEN
- Teacher/presenter display name: OPEN
- Variant unit ID: OPEN
- Authoring owner: OPEN

## Locked course reference

Fill from authoritative School data:
- tuition;
- paid Energy cost;
- stat package;
- existing paid semantic presentation ID;
- supported Night-study stats.

Do not change locked mechanics in this template.

## Lesson / milestone context

- Context type: OPEN
  - ordinary paid lesson;
  - first lesson;
  - repeated lesson;
  - School milestone;
  - project;
  - exam;
  - certificate;
  - public-result scene;
  - optional teacher reaction.
- Private trigger/provider: OPEN
- Threshold/value: OPEN
- Does Night study contribute: OPEN
- Blocking scene: OPEN
- Repeatable: OPEN

Ordinary paid lessons must not gain an unapproved teacher/relationship prerequisite.

## Text variants

### Variant A
- Variant ID: OPEN
- Conditions: OPEN
- Teacher text: OPEN
- Player choice text: OPEN
- Result text: OPEN

### Variant B
- Variant ID: OPEN
- Conditions: OPEN
- Teacher text: OPEN
- Player choice text: OPEN
- Result text: OPEN

Additional variants: OPEN.

Conditions must use approved state/public boundaries only.

## Relationship hook allowance

- Relationship hook present: OPEN
- Relationship ID: OPEN
- Hook type: OPEN
  - presentation variant;
  - reaction to a public School result;
  - explicit optional scene;
  - other approved relationship content.
- Changes ordinary course availability: MUST BE NO unless separately approved
- Changes paid mechanics: MUST BE NO

## Public-result publication

Complete only if Product approved a cross-system result.

- Public result approved: OPEN
- Stable result ID: OPEN
- School-owned private provider: OPEN
- Publication timing: OPEN
- Exactly-once proof: OPEN
- Downstream listener(s): OPEN
- Reload-before-publication expectation: OPEN
- Reload-after-publication expectation: OPEN

If no result is approved, mark NOT APPLICABLE.

Never substitute a fixture-only ID.

## Semantic presentation ID

- Existing course presentation ID: fill from locked catalog
- Variant presentation ID: OPEN
- Namespace relation to course: OPEN
- Stable across reload: REQUIRED
- Gameplay course ID changed: MUST BE NO

## Media / fallback

- GIF: OPEN
- Static image: OPEN
- Text fallback: OPEN
- Alt text: OPEN
- Media required to resolve gameplay: MUST BE NO
- Missing-media behavior tested: OPEN

A GIF/static presentation cannot control transaction timing or School progress.

## Acceptance checks

- [ ] teacher identity is approved, not invented
- [ ] course/track mapping valid
- [ ] tuition unchanged
- [ ] current-day Energy unchanged
- [ ] stat package unchanged
- [ ] ordinary Lust behavior unchanged
- [ ] paid lesson increments only `lessons_completed`
- [ ] Night study increments only `night_study_sessions`
- [ ] scene resolution does not recharge/reapply lesson
- [ ] pending scene reload deterministic
- [ ] semantic presentation ID survives reload
- [ ] relationship hook does not become an accidental prerequisite
- [ ] public result, if any, publishes exactly once
- [ ] downstream career reads public result only
- [ ] Lumber Hard Work unchanged
- [ ] static/GIF/text fallback remains mechanic-independent

## Handoff

- Production content file: OPEN
- Presentation/media file: OPEN
- Test file: OPEN
- Product decision source: OPEN
- Blocking authoring fields: OPEN
