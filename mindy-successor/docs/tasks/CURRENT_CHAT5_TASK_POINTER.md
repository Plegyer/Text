# Current Chat 5 task pointer

Status: ASSIGNED
Owner: Chat 5 / School + Text Localization Content Worker
Queue: **205–216**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT5_MANDATORY_ROLE_PROMPT.md`
Ownership matrix: `mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Baseline

Previous queue 193–204 was delivered through merged PR #66.

Start a fresh branch from exact current `main`.
Recommended:
- `chat5/school-teacher-authoring-readiness-205-216`

This queue is **authoring/readiness only**.
It does not promote teacher staging into production and does not change School mechanics.

Use as historical/current references:
- `mindy-successor/docs/school-prep/SCHOOL_CANONICAL_TEACHER_CONTENT_DRAFT_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_EIGHT_TRACK_TEACHER_AUTHORING_MATRIX_v1.md`
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_PRESENTATION_IDENTITY_INVENTORY_v1.md`

Chat 2 owns media-source preparation. Do not create or edit media assets.

## 205 — teacher-authoring status reconciliation v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_AUTHORING_STATUS_RECONCILIATION_V1.md`

Reconcile the older OPEN teacher matrix with the later teacher content draft.

For each of eight tracks classify:
- PROPOSED_CONTENT_DRAFT;
- PRODUCT_OPEN;
- CANONICAL_CURRENT;
- NOT_IN_PRODUCTION.

Do not silently promote a proposal to canonical.

## 206 — exact-current School teacher identity readiness ledger v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_IDENTITY_READINESS_LEDGER_V1.md`

For each proposed teacher record:
- proposed content ID;
- player-facing name;
- associated current course/track;
- authored presentation IDs;
- current production consumer status;
- canon status;
- blocker to production, if any.

## 207 — teacher RU source copy review v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_RU_SOURCE_REVIEW_V1.md`

Review/polish Russian names, role summaries and teaching-voice descriptions for all eight proposed teachers.

Presentation/content copy only.

## 208 — teacher EN parity review v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_EN_PARITY_REVIEW_V1.md`

Provide full English parity for item 207.

## 209 — teacher relationship-boundary audit v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_RELATIONSHIP_BOUNDARY_AUDIT_V1.md`

Separate:
- harmless authored relationship hooks;
- actual relationship-state mechanics;
- ordinary School availability;
- milestone/public-result decisions.

No new relationship IDs/stages/meters.

## 210 — eight-track lesson voice bank RU v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_LESSON_VOICE_BANK_RU_V1.md`

For each proposed teacher provide 3 concise Russian presentation-only lesson lines compatible with current course identity.

No outcome/stat/mechanics promises.

## 211 — eight-track lesson voice bank EN v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_LESSON_VOICE_BANK_EN_V1.md`

Full English parity for item 210.

## 212 — teacher/classroom accessibility RU source v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_ACCESSIBILITY_RU_V1.md`

Provide Russian alt/caption copy candidates for the existing authored teacher/classroom staging identities.

Describe visible content only.

## 213 — teacher/classroom accessibility EN parity v1

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_ACCESSIBILITY_EN_V1.md`

Full English parity for item 212.

## 214 — teacher localization staging fixture v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/school-teacher-localization-staging-v1.fixture.json`

Contain only staging RU+EN presentation keys for the proposed teacher identities/content.

Must explicitly include:
- `productionActivated=false`;
- no mechanics fields;
- no relationship state;
- no tuition/Energy/stat changes.

Do not merge these keys into root localization.

## 215 — teacher authoring ownership/collision regression v1

Create:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/school-teacher-authoring-staging-v1.test.ts`

Validate:
- eight current course/track identities unchanged;
- proposed teacher IDs are staging/content only;
- no root production key collision;
- no School mechanics fields;
- no Chat 2 media files;
- no Chat 3 poverty/Forest ownership;
- no Foreman ownership.

## 216 — School teacher decision-ready handoff v1 + PR

Create:
- `mindy-successor/docs/school-prep/SCHOOL_TEACHER_DECISION_READY_HANDOFF_V1.md`

Consolidate 205–215 into:
- PROPOSED_TEACHERS;
- COPY_READY;
- RELATIONSHIP_BOUNDARIES;
- ACCESSIBILITY_COPY_READY;
- STAGING_LOCALIZATION_READY;
- PRODUCT_DECISIONS_REQUIRED;
- NOT_PRODUCTION_ACTIVATED.

Run focused regression plus relevant School/localization checks and full `npm run check` if available.

Open a focused worker PR, report exact head SHA and actual checks, then freeze the candidate.
