# Satyr Maid Content Identity Map v1

Status: C3-15 current-main content identity audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/satyr-maid-content-identity-map-v1.fixture.json`.

## Current production identity

Career:
- `satyr-maid`
- initial stage `new-maid`
- current second stage `known-face`.

Current transition:
- transition ID `first-shift`;
- from `new-maid`;
- to `known-face`;
- exact condition: `completed_shifts >= 1`;
- exact effect: add career fact `first-shift-complete`.

This is the full current typed Satyr Maid progression surface. C3-15 does not infer later career stages from the design draft.

## Current service identity

Repeatable production action:
`satyr-maid.shift`.

Existing semantic scene IDs:
- `spring.default`;
- `summer.default`;
- `autumn.default`;
- `winter.default`.

Existing result presentation:
`job/satyr-maid/result/default`.

Existing seasonal presentation IDs:
- `job/satyr-maid/shift/spring/default`;
- `job/satyr-maid/shift/summer/default`;
- `job/satyr-maid/shift/autumn/default`;
- `job/satyr-maid/shift/winter/default`.

Current service text is still broad seasonal shift copy. No current scene ID distinguishes:
- drink service;
- table reset;
- large order;
- guest conflict;
- VIP request;
- coworker help;
- closing;
- supply shortage.

Therefore C3-16 must use the existing four seasonal shift identities and result identity only. It must not invent service sub-event IDs.

## Existing localization

Current production contains:
- `action.satyr-maid.shift.label`;
- `action.satyr-maid.shift.description`;
- `profession.satyr-maid.label`;
- `profession.satyr-maid.description`;
- result alt/caption localization;
- four seasonal shift alt/caption pairs.

There is no current Satyr Maid event namespace such as `event.satyr-maid.*`.

There are no current stage/fact localization keys specifically for:
- `new-maid`;
- `known-face`;
- `first-shift-complete`.

Those typed gameplay identities exist, but dedicated player-facing stage/fact labels are not currently shipped.

## Guest identity

Current production has no Satyr Maid guest event, guest relationship, guest fact, guest counter, or guest choice identity.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

The design draft discusses recurring guests, but that is not a production identity contract.

C3-16 may describe guests inside existing seasonal service copy because a bar shift already has guests in its authored scene text. It must not imply a persistent named guest, guest counter, recurring relationship, or future meeting unless such an identity appears in production.

## Flirt identity

Current production has no Satyr Maid flirt:
- event;
- choice;
- fact;
- relationship;
- counter;
- ending.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

The current shift wage uses existing stat weights including `sexuality`. That is not a flirt-route identity and does not authorize flirt outcomes, consent state, romance state, or after-hours relationship progression.

C3-17 may prepare content only if it remains presentation-only on an existing identity. It must not turn the wage weight into a new social mechanic.

## Boundary identity

Current production has no:
- boundary choice ID;
- boundary fact;
- boundary counter;
- boundary reputation;
- House Rules state;
- boundary ending.

Classification:
`CONTENT_GAP_REQUIRES_EXISTING_GAMEPLAY_IDENTITY`.

The design draft describes a future boundary route, but current main provides no gameplay seam to attach persistent boundary progression.

C3-17 must therefore distinguish:
- safe descriptive/professional service copy that can fit current seasonal shifts;
from
- persistent boundary/reputation progression, which is blocked until exact gameplay identities exist.

## Reputation identity

Current production has no separate Satyr Maid reputation system.

Nearest existing identity:
`satyr-maid:known-face`.

This is a typed career stage reached after the first shift. It should not be renamed or treated as:
- reputation score;
- guest approval;
- flirt reputation;
- house reputation;
- boundary reputation.

Classification:
`NO_SEPARATE_REPUTATION_SYSTEM`.

The current stage can support player-facing recognition language, but not invented thresholds or counters.

## Relationships

Current `definitions.json` has no Satyr Maid relationship identity.

The current typed relationship list contains Lumber Foreman only for the relevant starter-career comparison.

Therefore design-draft roles remain non-production:
- recurring guest;
- coworker;
- manager/owner.

No relationship state should be authored by Chat 3 until an exact ID exists.

## Night / after-hours

Current Satyr Maid production has no dedicated NightFlow hook.

There is no:
- after-hours event ID;
- nightChoice ID;
- staff gathering ID;
- private conversation ID;
- recurring guest Night trigger.

The design draft describes these as future career depth. They are not current content seams.

C3-16/C3-17 must not add a forced/voluntary night mechanic or claim an after-hours transition exists.

## Item / capability identities

The design draft mentions:
- `professional_service_presentation`;
- `after_hours_staff_access`;
- rare bottle / supply contract;
- house token / staff key.

None is a current Satyr Maid production identity on this baseline.

These remain design-only and must not be referenced as if currently obtainable.

## Ending identities

Current production has no Satyr Maid ending.

Explicitly absent:
- `ending.satyr-maid.hard-work`;
- House Power ending;
- Personal Network ending;
- House Rules / Boundary ending.

Existing tests explicitly protect the absence of guessed Satyr Maid Hard Work.

C3-15 does not choose:
- Hard Work threshold;
- reputation threshold;
- ending condition;
- reward;
- Meta reward.

## Current content gaps by queue need

### C3-16 service / guest

Ready now:
- four seasonal shift scene identities;
- shift label/description;
- profession label/description;
- result presentation/localization surface.

Safe content can deepen:
- routine guest service;
- crowd handling;
- table work;
- closing/setup;
- seasonal guest atmosphere.

Blocked as gameplay identity:
- persistent guest;
- named recurring guest;
- guest relationship progression;
- guest-specific choice/effect.

### C3-17 boundary / flirt / reputation

Safe now:
- presentation-only language around professional tone, refusal of unwanted pressure, confident service, social boldness or restraint, provided it does not claim state changes.

Blocked as gameplay identity:
- boundary counters/facts;
- flirt counters/facts;
- reputation score;
- relationship stages;
- threshold gates;
- endings;
- rewards.

The only existing durable recognition signal is `known-face`, and it must remain exactly a career stage.

## Ownership boundaries

Chat 3 may change:
- player-facing Satyr Maid content/localization;
- content fixtures;
- content-side regressions/handoffs.

Chat 3 must not change:
- career state machine;
- shift costs/wage/stat weights;
- thresholds;
- NightFlow;
- relationship state machine;
- item capabilities;
- ending framework;
- School;
- presentation/media source ownership;
- shared runtime/UI.

## C3-15 conclusion

Current Satyr Maid production is a narrow starter-career slice:
- one repeatable shift;
- four seasonal service scenes;
- one first-shift transition;
- one recognition stage;
- one career fact;
- existing seasonal/result presentation identities.

Guest, flirt, boundary and reputation systems described in the design draft are not implemented identities. Upcoming content tasks must stay on the existing service/stage surfaces and mark persistent social progression as blocked rather than inventing mechanics.
