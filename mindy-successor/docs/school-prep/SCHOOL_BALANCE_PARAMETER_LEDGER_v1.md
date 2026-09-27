# School Balance Parameter Ledger v1

Status: School balance/Product parameter inventory. No new numbers are selected.

## Locked paid values

All current tuition values are **LOCKED_NOT_OPEN**:
- Literacy & Numbers — 300
- Arcana — 500
- Rhetoric & Social — 300
- Etiquette & Presentation — 400
- Field Craft — 400
- Physical Training — 400
- Arts & Performance — 500
- Body Confidence — 400

Paid current-day Energy is locked at **1** per lesson.

All current stat packages are **LOCKED_NOT_OPEN**:
- Literacy & Numbers: Reason +4, Wits +2
- Arcana: Magic +4, Reason +4, Creativity +2
- Rhetoric & Social: Charm +3, Sociability +3, Wits +2
- Etiquette & Presentation: Manners +3, Grooming +3, Charm +2
- Field Craft: Dexterity +3, Wits +3, Creativity +2
- Physical Training: Strength +3, Endurance +3, Dexterity +2
- Arts & Performance: Creativity +3, Charm +3, Sociability +2, Dexterity +2
- Body Confidence: Sexuality +3, Grooming +3, Endurance +2

If a separate approved balance task ever reopens tuition/stat packages, validate economy reachability, all-course parity, Resolver stat facts, Night supported-stat parity and save/reload exactness. That is balance-data work, not runtime by default.

## Management/accounting milestone threshold

Status: **OPEN_PRODUCT_BALANCE + OPEN_CONTENT_AUTHORING**.

Open:
- owning provider/track;
- milestone type;
- exact threshold/value;
- whether Night study contributes;
- additional School-owned requirements.

Affected tracks: OPEN until provider is selected.

Required acceptance after a value is chosen:
- natural reachability;
- below / at / above threshold;
- reload before/after crossing;
- exactly-once publication;
- no duplicate tuition, Energy or `lessons_completed`;
- immediate downstream reaction;
- Hard Work independence.

Expected change type: content-authoring + balance-data. Runtime: no by default.

## Arcana / Forest milestone threshold

Status: **OPEN_PRODUCT_BALANCE + OPEN_CONTENT_AUTHORING** if Product retains the path.

Open:
- provider/milestone type;
- threshold/value;
- typed stat requirements, if any;
- Night-study contribution;
- final public result;
- direct Forest consumer.

Required acceptance:
- natural reachability before relevant Forest content;
- below / at / above threshold;
- publication idempotency across reload;
- Forest option stability after reload;
- no direct Forest read of School-private counters.

Expected change type: content-authoring + balance-data. Runtime: no by default.

## Certificate / project / exam values

Certificates: **OPEN_CONTENT_AUTHORING** only if adopted. No threshold is approved.

Projects: **OPEN_CONTENT_AUTHORING** only if adopted. Entry/completion requirements and any explicit cost remain OPEN.

Exams: **OPEN_CONTENT_AUTHORING** only if adopted. Eligibility/pass rules and any explicit cost remain OPEN. The old prototype exam threshold is not production authority.

For any adopted definition validate reachability, save/reload, one-time completion/cost and exactly-once public publication where applicable.

## Night study — locked, non-open

All baseline Night-study values are **LOCKED_NOT_OPEN**:
- tuition = 0
- current-day Energy = 0
- selected supported stat = +2
- next-day Energy delta = -1
- one Night slot
- `night_study_sessions +1`
- `lessons_completed +0`
- no ordinary Lust mutation
- only course-supported stats selectable
- normal/cheap housing available
- street restricted by default

Do not reopen these through content/balance authoring.

## Runtime-change gate

None of the current OPEN balance/content decisions requires runtime work by itself.

Runtime work is justified only when an approved authored behavior cannot be expressed by current typed School/publication surfaces and a concrete integration test proves the missing primitive.

## Current open numeric set

Genuinely OPEN numbers are limited to:
- management/accounting threshold/value if threshold-based;
- Arcana/Forest threshold/value if retained and threshold-based;
- certificate thresholds if certificates are adopted;
- project requirements if projects are adopted;
- exam eligibility/pass requirements if exams are adopted.

This ledger selects none of them.
