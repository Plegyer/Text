# Secret Debt Career Content-Depth Matrix v1

Status: content-depth requirements for the hidden Secret Debt / Slave career.

Goal: ensure the hidden career reaches the structural depth expected of a full career without prematurely locking thresholds, rewards, prose, balance or final presentation assets.

## Status vocabulary

- **FIXED_STRUCTURE** — required by user-directed Product design;
- **AUTHORING_REQUIRED** — concrete content must be written/connected;
- **HUMAN_DECISION_REQUIRED** — Product must choose an unresolved identity/policy;
- **BALANCE_OPEN** — numeric tuning remains open;
- **PRESENTATION_OPEN** — semantic content identity needed before final media specialization.

## Career identity

Fixed:
- hidden career is additional to the 10 ordinary jobs;
- only appears after Secret Debt activation;
- ordinary jobs are blocked while bound;
- prior ordinary career progress is preserved;
- Palace 10/10 ordinary Hard Work prerequisite excludes this hidden career.

Open:
- final display name/fantasy terminology;
- employer/master identity;
- location/visual identity.

## Repeatable shifts

Structure:
**FIXED_STRUCTURE**.

Required:
- repeatable daytime hidden-career shift;
- shift is distinct from forced Night obligation;
- shift contributes to hidden-career progression;
- repeatable action survives save/reload and pays/applies effects once.

User-directed stat theme:
- Strength;
- Endurance;
- Sexuality design axis.

Open:
- exact stat mapping if final catalog terminology differs;
- exact gain magnitudes;
- pay/debt reduction relationship;
- shift Energy cost if not inherited/locked by later implementation package;
- variant text/assets.

## Career stages / transitions

Structure:
**FIXED_STRUCTURE**.

Required:
- multiple career stages;
- reactive milestone scenes separate from repeatable shift;
- stage transitions use authoritative progress/conditions;
- at least one branch/choice before outcomes become ready.

Open:
- stage IDs/names;
- exact number of stages;
- exact shift/progress thresholds;
- stat gates;
- milestone content.

Do not implement a single counter-only ladder as the entire career.

## Forced Night variants

Structure:
**FIXED_STRUCTURE**.

Required:
- bound state has mandatory Night obligation;
- it is distinct from daytime shift;
- suppresses ordinary voluntary Night freedom according to accepted forced policy;
- can advance its own career counters/events;
- can apply accepted next-day pressure;
- save/reload is idempotent.

Content depth:
**AUTHORING_REQUIRED**.

Need multiple variants across the full career so Night does not become one repeated scene.

Open:
- intercept point relative to lodging;
- payment suppression;
- exact next-day penalty;
- variant count;
- event prose/NPCs/media.

## Relationship / story events

Structure:
**FIXED_STRUCTURE**.

A full hidden career requires:
- lender/master story progression;
- at least one recurring relationship/story thread;
- route choices that can alter later content;
- public facts/relationship boundaries usable by outcomes where accepted.

Content:
**AUTHORING_REQUIRED**.

Open:
- characters;
- relationship stages;
- exact event IDs;
- romance/intimacy semantics;
- rewards/effects.

Ownership rule:
- do not use unrelated private counters as cross-system gates.

## External hooks

Structure:
**FIXED_STRUCTURE** for complex outcome depth.

Required:
- at least one multi-system hook for `takeover`;
- possible categories include item, ally/relationship, School public result, Activity result or another accepted typed/public condition.

Status:
**HUMAN_DECISION_REQUIRED + AUTHORING_REQUIRED**.

Open:
- exact external system;
- exact fact/item/capability ID;
- exact threshold/provider;
- whether School or Activity is available while bound.

## Seasonal / context variants

Structure:
**FIXED_STRUCTURE** as full-career depth expectation.

Required:
- at least some repeatable/story/Night content varies by season or meaningful context;
- variation must affect available content/conditions/outcomes, not only asset skin;
- stable core career identity remains unchanged.

Content:
**AUTHORING_REQUIRED**.

Open:
- which seasons/contexts;
- exact events;
- balance changes;
- visuals.

## Outcome family: `paid_freedom`

Structure:
**FIXED_STRUCTURE**.

Mechanical role:
- economy solution;
- debt payoff/dependency exit;
- ordinary professional lock releases if run continues.

Authoring required:
- payoff scene/choice;
- ending presentation;
- debt-resolution state transition.

Open:
- exact debt threshold;
- Meta reward;
- continuation semantics not already fixed by ending flow.

## Outcome family: `bound_life`

Structure:
**FIXED_STRUCTURE**.

Mechanical role:
- career/endurance fate;
- not generic failure;
- conscious commitment after substantial hidden-career progression.

Authoring required:
- milestone/route commitment;
- ending scene;
- completion flow.

Open:
- exact progress threshold;
- exact milestone;
- Meta reward.

Locked exclusion:
- no Palace ordinary-Hard-Work credit.

## Outcome family: `takeover`

Structure:
**FIXED_STRUCTURE**.

Mechanical role:
- multi-system power solution;
- requires more than shifts;
- requires accepted build + route choice + at least one external dependency.

Authoring required:
- external hook content;
- takeover resolution scene;
- control/ownership state result.

Open:
- build thresholds;
- external fact/item/ally/School/Activity identity;
- Meta reward;
- final lore.

## Presentation surfaces

Structure:
**FIXED_STRUCTURE**.

Need semantic presentation surfaces for:
- lender encounter;
- accept/refuse choice;
- delayed activation reveal;
- daytime hidden-career shift;
- stage milestones;
- forced Night variants;
- relationship/story events;
- external hook resolution;
- paid freedom;
- bound life;
- takeover;
- ending completion/RunResult.

Presentation contract:
- stable semantic `presentationId` per meaningful surface;
- static fallback;
- text fallback;
- GIF/animation optional;
- mechanics independent from asset timing/presence.

Status:
**PRESENTATION_OPEN** until content identities are authored.

## Content-depth matrix

| Dimension | Structure | Concrete content | Numbers/rewards/prose |
| --- | --- | --- | --- |
| repeatable shifts | FIXED | AUTHORING_REQUIRED | OPEN |
| stage transitions | FIXED | AUTHORING_REQUIRED | OPEN |
| forced Night variants | FIXED | AUTHORING_REQUIRED | OPEN |
| relationship/story events | FIXED | AUTHORING_REQUIRED | OPEN |
| external hooks | FIXED category requirement | PRODUCT DECISION + AUTHORING | OPEN |
| seasonal/context variants | FIXED depth requirement | AUTHORING_REQUIRED | OPEN |
| paid_freedom | FIXED family | AUTHORING_REQUIRED | threshold/reward OPEN |
| bound_life | FIXED family | AUTHORING_REQUIRED | threshold/reward OPEN |
| takeover | FIXED family | AUTHORING_REQUIRED | build/external IDs/reward OPEN |
| presentation surfaces | FIXED need | AUTHORING_REQUIRED | prose/art OPEN |

## Full-career completeness target

Hidden career is not content-complete until all are present:
1. repeatable shift;
2. multi-stage progression;
3. reactive milestone/story scenes;
4. multiple forced Night variants;
5. relationship/story thread;
6. at least one external multi-system hook;
7. season/context variants;
8. all three outcome families;
9. save/reload exactly-once coverage;
10. semantic presentation/fallback surfaces.

## Explicit OPEN fields

Do not lock here:
- exact thresholds;
- exact wages/debt reduction;
- exact stat gains;
- exact Night penalties;
- exact stage IDs/count;
- exact relationship characters/stages;
- exact external dependency IDs;
- exact Meta rewards;
- final prose/lore;
- final GIF/media assets.
