# School Teacher / Relationship Boundary Template v1

Status: reusable ownership template for future teacher/presenter relationship content.

Teacher identities and relationship content remain OPEN until Product/authoring approves them.

## Ownership

### School owns
- paid lesson availability and transaction;
- tuition;
- current-day Energy cost;
- paid stat package;
- `lessons_completed`;
- Night-study mechanics;
- `night_study_sessions`;
- School milestones/certificates/projects/exams;
- School semantic presentation IDs;
- School-owned public-result publication.

### Relationship domain owns
- relationship stage;
- relationship counters;
- relationship choices;
- relationship-private facts;
- friendship/rivalry/mentor/romance/professional route state;
- relationship-scene eligibility and relationship-owned outcomes.

Neither domain writes the other's private state directly.

## Teacher identity

For each authored teacher/presenter:

- Canonical teacher ID: OPEN
- Display name: OPEN
- Course/track assignment: OPEN
- Relationship ID, if any: OPEN
- Relationship role: OPEN
- Relationship route types: OPEN
- Teacher exists without relationship system: OPEN

A teacher may present a course without automatically becoming a relationship state machine.

## Paid lesson boundary

Ordinary paid lesson remains School-owned.

Relationship state must not silently become a paid-lesson prerequisite.

Default rule:
- course availability uses the locked School availability contract;
- teacher relationship may alter presentation variants only;
- a special relationship-gated School scene requires explicit Product authoring and must not replace ordinary paid access unless separately approved.

Relationship content cannot:
- charge tuition again;
- spend paid School Energy again;
- reapply the paid stat package;
- increment `lessons_completed` again.

## Relationship reaction after School

Allowed authored pattern:

`School transaction commits -> optional approved public/explicit reaction boundary -> relationship reaction -> relationship-owned state change`.

Requirements:
- School transaction completes first;
- relationship reacts to an approved public result or explicit reaction fact;
- relationship mutation is relationship-owned;
- no direct read of School-private counters unless Product/Lead introduces an explicit typed public contract;
- reload cannot replay the School transaction.

## School reaction after relationship

Allowed authored pattern:

`relationship state commits -> approved public/explicit boundary -> School presentation/option reacts`.

Requirements:
- School does not mutate relationship-private state;
- ordinary paid lesson remains available unless a specific approved authored prerequisite says otherwise;
- any special option uses explicit conditions and stable IDs;
- no hidden prerequisite derived from teacher affection/route.

## Public-result bridge

For durable cross-domain progression, use an approved public result.

School-to-relationship:
- School private provider: OPEN
- public result ID: OPEN
- relationship consumer/listener: OPEN
- exactly-once publication: REQUIRED

Relationship-to-School:
- relationship-owned public/typed result: OPEN
- School consumer: OPEN
- exactly-once behavior: REQUIRED where durable progression is involved

Do not reuse fixture-only IDs.

## Night / relationship scenes

Night School study and relationship Night content are separate choices/flows.

Rules:
- relationship Night scene cannot charge School tuition;
- relationship Night scene cannot increment `night_study_sessions` unless it actually executes the explicit School Night-study action;
- School Night study cannot advance relationship state unless an approved reaction occurs after the School action;
- both must respect the single Night-flow ordering/slot rules;
- pending relationship scene blocks incompatible actions according to shared flow rules.

## Save / reload

Required exactly-once behavior:

### Paid lesson + teacher relationship reaction
- paid lesson payment/stat/progress commits once;
- reload with pending teacher/relationship scene preserves that scene;
- resolving the scene does not replay payment or progress;
- relationship state changes once.

### School public result + relationship consumer
- reload before publication may publish once later;
- reload after publication cannot duplicate result/reaction;
- pending relationship consumer scene survives reload;
- resolving it cannot re-publish the School result.

### Night
- reload preserves the active Night phase;
- no duplicate Night-study +2;
- no duplicate next-day Energy -1;
- no duplicate relationship Night outcome.

## Presentation

Teacher/relationship variants may have their own semantic presentation IDs.

Requirements:
- gameplay course ID unchanged;
- existing paid School presentation ID unchanged;
- relationship scene presentation ID is explicit and stable;
- static/GIF/text fallback remains mechanic-independent;
- media timing cannot decide transaction completion.

## Authoring fields

Fill only after Product decisions:

- Teacher ID: OPEN
- Relationship ID: OPEN
- Relationship type/routes: OPEN
- Course/track assignment: OPEN
- Teacher relationship affects ordinary course availability: OPEN — default NO
- Presentation variants: OPEN
- School public result used: OPEN
- Relationship public result used: OPEN
- Night scene overlap policy: OPEN
- Milestone involvement: OPEN
- Ending/Meta relevance: OPEN

## Validation checklist

- [ ] School owns tuition/Energy/stat transaction
- [ ] School owns School counters
- [ ] Relationship owns relationship state
- [ ] no private-state cross-write
- [ ] no silent paid-lesson prerequisite
- [ ] no duplicate tuition/Energy/progress
- [ ] Night flows remain separate and deterministic
- [ ] durable cross-system result uses public boundary
- [ ] reload before/after reaction is idempotent
- [ ] semantic presentation IDs remain stable
- [ ] Hard Work receives no teacher/School prerequisite

This template selects no teacher identity, relationship route, threshold, milestone or public result.
