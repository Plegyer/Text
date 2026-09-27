# School Content Production Unit Template v1

Status: reusable School authoring unit. All OPEN fields require Product/authoring input.

## Identity
- Unit ID: OPEN
- Course ID: OPEN — existing `school.course.*`
- Track ID: OPEN — must match course
- Unit type: OPEN — lesson / Night / milestone / exam / project / certificate / reaction / public-result scene
- Product decision source: OPEN

## Locked mechanics reference
Fill from authoritative School data; do not change here:
- tuition;
- paid Energy cost;
- paid stat package;
- no ordinary Lust mutation;
- paid `lessons_completed` behavior;
- Night `night_study_sessions` behavior;
- existing semantic presentation ID.

## Teacher / presenter
- Canonical ID: OPEN
- Display name: OPEN
- World role: OPEN
- Voice/tone: OPEN
- Relationship hook, if any: OPEN

Do not invent canonical teachers.

## Trigger / milestone
- Provider category: OPEN
- Provider ID: OPEN
- Private School eligibility: OPEN
- Threshold/value: OPEN
- Night contribution: OPEN
- Exactly-once completion required: OPEN

## Text variants
For each variant:
- Variant ID: OPEN
- Conditions: OPEN
- Text: OPEN
- Choice copy, if any: OPEN

## Semantic presentation
- presentationId: OPEN
- Existing paid presentationId, if applicable: fill from locked catalog
- New semantic slot needed: OPEN
- Reload-stability check: OPEN

Do not rename gameplay course IDs for presentation work.

## Media and fallback
- Primary media: OPEN
- Static fallback: OPEN
- GIF: OPEN
- Text fallback: OPEN
- Alt text: OPEN
- Gameplay depends on media timing: MUST BE NO

## Public result, if approved
- Canonical public result ID: OPEN
- Private provider: OPEN
- Publication timing: OPEN
- Exactly-once proof: OPEN
- Downstream consumer: OPEN
- Reload-before-publication behavior: OPEN
- Reload-after-publication behavior: OPEN

If no public result is approved, mark NOT APPLICABLE. Never use fixture-only IDs as production authoring.

## Relationship hook allowance
- Relationship ID: OPEN
- Hook type: OPEN
- Changes ordinary paid-course availability: NO unless separately approved
- Reload behavior: OPEN

## Acceptance checks
- [ ] course/track mapping valid
- [ ] tuition unchanged
- [ ] paid Energy unchanged
- [ ] paid stat package unchanged
- [ ] no ordinary Lust gain added
- [ ] no duplicate paid progress
- [ ] no paid/Night counter cross-write
- [ ] presentation ID stable across reload
- [ ] pending scene reload deterministic
- [ ] scene resolution does not recharge tuition/Energy
- [ ] public result, if any, publishes exactly once
- [ ] downstream systems read only public School result
- [ ] Lumber Hard Work gains no School prerequisite
- [ ] static/GIF/text fallback does not change mechanics

## Handoff
- Production content file(s): OPEN
- Test file(s): OPEN
- Media file(s): OPEN
- Downstream pack(s): OPEN
- Blocking human decision(s): OPEN
- Ready for implementation: OPEN
