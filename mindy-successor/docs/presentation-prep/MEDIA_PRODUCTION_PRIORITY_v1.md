# Media Production Priority v1

Status: Chat 2 planning deliverable for GIF production sequencing.

## 1. Production principle

GIF production follows narrative importance, not event count. The project explicitly does not require a unique animation for every content node.

Stable presentationIds should be created wherever independent replacement is useful, but many IDs may reuse the same GIF asset. Asset reuse is expected and is not missing content.

The priority below follows GIF_CENTRAL_STAGE_CONTRACT_v1:
1. endings;
2. major career milestones;
3. major relationship milestones;
4. major Activity encounters/results;
5. ordinary repeatable shifts last.

Static and text fallbacks must keep the game playable before full GIF coverage exists.

## 2. Ranked production tiers

### Rank 1 — Endings and run-defining completion scenes

Produce unique GIFs first for:
- committed endings;
- central run completion when it has a distinct scene;
- major complex career endings.

Lumber acceptance examples:
- ending/lumber/hard-work;
- ending/lumber/forewoman.

Reason: these are low-frequency, high-salience scenes and benefit most from unique identity. They should not be visually collapsed into ordinary work.

### Rank 2 — Major career milestones

Produce unique GIFs for career beats that materially change status, responsibility, or direction.

Lumber acceptance example:
- job/lumber/event/foreman-trust/default, if this event is the chosen major career presentation.

Minor career dialogue can reuse a career/Foreman family GIF until production budget allows more.

### Rank 3 — Major relationship milestones

Produce unique GIFs for relationship beats that change the relationship meaningfully or reveal a major external problem.

Lumber acceptance examples:
- relationship/foreman/trust/default when it is a milestone rather than routine dialogue;
- a later major Foreman milestone if the final content defines one.

Routine Foreman conversations and optional Night meetings can reuse one dialogue family when the visual meaning is compatible.

### Rank 4 — Major Activity encounters and results

Prioritize:
- objective encounters;
- major discovery;
- success/escape result differences where the visual communicates a meaningful outcome.

Lumber acceptance example:
- activity/forest/return/success can deserve a distinct result GIF after endings/career/relationship priorities are covered.

Travel, route selection, and ordinary challenge beats should reuse Forest family media.

### Rank 5 — School milestones and distinctive Night beats

Produce unique GIFs only when a School or Night scene is itself a meaningful milestone.

School repeatable lessons should normally reuse a track-level GIF. Normal lodging/night transitions should reuse location/night families.

This tier is below the major career/relationship/Activity milestones unless a specific scene becomes a required product showcase.

### Rank 6 — Repeatable shifts, generic results, and hub ambience

Produce these last as unique assets:
- ordinary Lumber shifts;
- ordinary results;
- generic town hub;
- routine School lessons;
- routine Night transitions.

A single high-quality reusable GIF is preferable to many weak near-duplicates.

Seasonal Lumber IDs may exist from day one while all four initially map to one generic Lumber work GIF. Season-specific GIFs are an enhancement, not a prerequisite for the Product Acceptance gate.

## 3. Reusable slot families

### Town hub family

Candidate presentationIds:
- location/town/default;
- compatible non-story town states.

Use one neutral town GIF/static base until a distinct state deserves its own art.

### Lumber repeatable shift family

Candidate presentationIds:
- job/lumber/shift/spring/default;
- job/lumber/shift/summer/default;
- job/lumber/shift/autumn/default;
- job/lumber/shift/winter/default.

Early production: one generic Lumber loop may serve all four IDs.

Later: replace individual season IDs independently without changing mechanics.

### Lumber result family

Candidate:
- job/lumber/result/default.

Use for ordinary shift resolution. Do not spend a unique GIF on every wage/stat variation.

### Foreman dialogue family

Candidates:
- relationship/foreman/trust/default;
- relationship/foreman/night/default;
- compatible minor career dialogue.

Reuse is allowed when the location, character framing, accessibility meaning, and spoiler state are compatible. A major milestone can split out later without changing the mechanical event.

### School track family

Candidate:
- school/field-craft/lesson/default.

One loop per School track is sufficient for repeatable lessons. Unique School GIFs should be reserved for milestones/exams/projects that matter to the Product Acceptance story.

### Night/lodging family

Candidate:
- night/lodging/default.

Normal lodging transitions can reuse a location-based Night GIF. Do not create one animation per payment/state line.

### Forest route family

Candidates:
- activity/forest/route/default;
- compatible route/travel beats.

One traversal/exploration loop can cover several route contexts if no essential information is lost.

### Forest challenge family

Candidate:
- activity/forest/encounter/default.

Reuse for ordinary challenge families. Split only major objective encounters or visually necessary success/escape states.

### Meta new-run family

Candidate:
- meta/new-run/lumber-hard-work.

A visible Meta difference must exist in product acceptance, but the mechanical reward is not implemented by the GIF. A reusable New Run presentation can accompany different rewards unless a particular Meta unlock deserves unique art.

## 4. Product Acceptance Lumber minimum media set

The full acceptance flow can be presented with a compact set of actual GIF assets even though it uses more stable presentationIds.

A practical first asset set is:
- one town/hub GIF;
- one generic Lumber shift GIF reused across seasons;
- one generic Lumber result/static family;
- one unique major Lumber career milestone GIF;
- one reusable Foreman dialogue GIF;
- one School Field Craft lesson GIF;
- one normal Night/lodging GIF;
- one Forest route GIF;
- one Forest challenge GIF;
- one major Forest result GIF if budget permits;
- one Lumber Hard Work ending GIF;
- one complex Lumber ending GIF.

This is enough to demonstrate slot replacement, reuse, fallback, and high-value uniqueness without requiring a unique GIF per event.

## 5. When to spend a unique GIF

Spend a unique GIF when at least one is true:
- it is an ending;
- it is a major career/relationship/Activity milestone;
- the visual communicates a story fact that text alone should not be forced to carry;
- accessibility meaning is materially different from the reusable family;
- the scene has a different spoiler/secret state;
- the scene is a high-frequency product showcase whose repetition would otherwise be conspicuous.

Do not spend a unique GIF merely because:
- a numeric delta differs;
- a random text variant differs;
- the event arrived from a different trigger;
- the season changed but the available art does not;
- the same dialogue pose can communicate the beat;
- a result line has a different money/stat value.

## 6. Upgrade order after the minimum set

After the Product Acceptance gate is green:
1. add season-specific Lumber shift assets where visual payoff is clear;
2. split major Foreman relationship beats from generic dialogue;
3. add distinct Forest objective/escape/success assets;
4. add School milestone/project GIFs;
5. add distinctive Night encounter assets;
6. only then expand ordinary repeatable variations.

A replacement at any step changes presentation data only. Mechanics and saves should remain valid.

## 7. Fallback production priority

Static fallback should be produced alongside or before high-priority GIFs.

For every Rank 1–4 unique GIF:
- provide meaningful alt text;
- prefer a same-slot static fallback;
- define family/location fallback where appropriate;
- verify text-only playability.

For low-priority reusable families, a strong static image is acceptable while GIF production is pending.

## 8. Asset tracking rules

Media production tracking should record:
- presentationId;
- production tier;
- reusable family;
- asset state;
- static fallback state;
- accessibility text state;
- review/approval state.

Do not use filenames as the tracking identity. Filenames can change while presentationId remains stable.

The planning manifest under workstreams/chat2 intentionally has no invented production filenames.
