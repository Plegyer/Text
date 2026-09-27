# Secret Debt Authoring Intake Template v1

Status: fill-in intake template for Product/content decisions before Secret Debt implementation.

Usage rule:
- fields marked **FIXED** must not be reopened implicitly;
- fields marked **OPEN** require explicit Product/content input;
- placeholders are not production values;
- QA fixtures do not count as filled Product decisions.

---

## A. Route identity

**FIXED**
- system: Secret Debt / hidden Slave career;
- additional to 10 ordinary jobs: YES;
- counts toward Palace 10/10 ordinary Hard Work: NO;
- ordinary poverty can function without this route: YES;
- route begins from eligible street-sleep context: YES;
- offer opportunity per run: at most one.

**OPEN**
- final display name: `[OPEN]`;
- location/world label: `[OPEN]`;
- lender/provider identity: `[OPEN]`;
- employer/master identity after activation: `[OPEN]`.

## B. Lender offer content

**FIXED**
- street-only eligibility;
- hidden/exceptional encounter, not ordinary poverty tutorial;
- player can accept or refuse;
- refusal closes offer for current run;
- acceptance grants immediate benefit once and creates delayed obligation;
- offer does not reveal the full later trap in advance.

Fill before authoring:
- canonical event ID: `[OPEN]`;
- lender NPC/provider ID: `[OPEN]`;
- exact eligibility beyond street sleep, if any: `[OPEN]`;
- chance/weight: `[OPEN BALANCE]`;
- immediate benefit amount: `[OPEN BALANCE]`;
- offer prose: `[OPEN CONTENT]`;
- accept choice label/prose: `[OPEN CONTENT]`;
- refuse choice label/prose: `[OPEN CONTENT]`;
- semantic presentationId: `[OPEN CONTENT ID]`;
- static fallback asset: `[OPEN PRESENTATION]`;
- optional GIF: `[OPEN PRESENTATION]`.

Validation after fill:
- one offer maximum per run;
- no reload reroll;
- no duplicate grant;
- refusal remains terminal for route encounter;
- ordinary street events remain separate.

## C. Activation / debt balance parameters

**FIXED**
- accepted state has delayed activation;
- activation boundary is persisted;
- activation creates bound hidden-career state;
- debt state is authoritative and reload-safe.

Fill before implementation:
- activation delay: `[OPEN BALANCE]`;
- principal/immediate grant: `[OPEN BALANCE]`;
- delayed debt amount: `[OPEN BALANCE]`;
- whether repayment date is shown immediately: `[OPEN PRODUCT]`;
- debt growth narrative/model if any: `[OPEN CONTENT/PRODUCT]`;
- activation reveal event ID: `[OPEN CONTENT ID]`;
- activation reveal prose: `[OPEN CONTENT]`;
- activation presentationId: `[OPEN CONTENT ID]`.

Migration/save question:
- should existing saves ever be retroactively considered accepted/bound? `[OPEN; default do not infer]`.

## D. Hidden-career work content

**FIXED**
- repeatable daytime career work exists;
- all 10 ordinary careers blocked while bound;
- ordinary career progress preserved;
- blocked ordinary careers do not advance;
- forced Night is separate from daytime shift;
- full career depth requires stages/milestones/story/events/outcomes.

User-directed stat theme:
- Strength;
- Endurance;
- Sexuality design axis.

Fill before implementation:
- canonical hidden-career ID: `[OPEN if not already approved]`;
- display name: `[OPEN]`;
- repeatable shift action ID: `[OPEN]`;
- shift Energy cost: `[OPEN BALANCE/CONTRACT]`;
- shift economic effect/pay/debt effect: `[OPEN BALANCE/PRODUCT]`;
- exact stat mapping: `[OPEN PRODUCT if Sexuality naming/mapping unresolved]`;
- stat gain magnitudes: `[OPEN BALANCE]`;
- career stage IDs/names: `[OPEN CONTENT]`;
- stage thresholds: `[OPEN BALANCE]`;
- milestone event IDs: `[OPEN CONTENT]`;
- branch choices: `[OPEN CONTENT]`;
- seasonal/context variants: `[OPEN CONTENT]`;
- shift presentationIds: `[OPEN CONTENT ID]`.

## E. School / Activity availability while bound

**FIXED**
- ordinary-job professional lock does not automatically decide School/Activity availability.

Product must answer:
- School available while bound? `[OPEN YES/NO/CONDITIONAL]`;
- night study available while bound? `[OPEN YES/NO/CONDITIONAL]`;
- large Activity/Forest available while bound? `[OPEN YES/NO/CONDITIONAL]`;
- other daytime non-job actions restricted? `[OPEN if any]`.

If conditional:
- authoritative condition identity: `[OPEN]`;
- public explanation/presentation: `[OPEN]`.

## F. Forced Night content

**FIXED**
- mandatory while bound;
- distinct from daytime shift;
- suppresses ordinary voluntary Night freedom according to final forced-event policy;
- can advance Secret Debt career/story state;
- may apply negative next-day modifier;
- one Night advances calendar exactly once.

Product must answer:
- intercept point: `[OPEN: before_lodging / after_lodging / after_choice]`;
- suppress lodging payment? `[OPEN]`;
- housing context retained/selected under forced Night? `[OPEN]`;
- next-day Energy penalty: `[OPEN BALANCE]`;
- modifier composition with street/cheap/night-study sources: `[OPEN PRODUCT/BALANCE]`.

Content fill:
- forced Night event family ID: `[OPEN]`;
- variant IDs: `[OPEN]`;
- minimum variant set: `[OPEN CONTENT TARGET]`;
- stage/context conditions: `[OPEN]`;
- relationship/story effects: `[OPEN]`;
- presentationIds: `[OPEN]`;
- prose/assets/GIFs: `[OPEN]`.

## G. Relationship / story content

**FIXED**
- hidden career requires relationship/story events;
- cross-system consumers should use accepted public/typed boundaries.

Fill:
- lender relationship role: `[OPEN]`;
- master/employer relationship role: `[OPEN]`;
- ally/opposition relationship roles: `[OPEN]`;
- relationship stage IDs: `[OPEN]`;
- public facts exposed to outcome logic: `[OPEN]`;
- story event IDs/order: `[OPEN]`;
- romance/intimacy semantics if any: `[OPEN PRODUCT]`.

## H. Outcome — `paid_freedom`

**FIXED**
- economy solution;
- debt/dependency exit;
- debt-specific professional lock released;
- common ending eligible -> commit -> complete -> RunResult flow;
- no Palace ordinary Hard Work credit.

Fill:
- exact payoff eligibility: `[OPEN BALANCE/PRODUCT]`;
- payment transaction boundary: `[OPEN AUTHORING]`;
- ending ID: `[OPEN if not already canonical]`;
- ending scene/choice: `[OPEN CONTENT]`;
- same-run continuation behavior if relevant: `[OPEN PRODUCT]`;
- exact Meta reward ID/effect: `[OPEN PRODUCT]`;
- presentationId/assets: `[OPEN]`.

## I. Outcome — `bound_life`

**FIXED**
- career/endurance fate;
- not generic failure;
- conscious commitment after substantial hidden-career progression;
- ordinary jobs remain blocked while active run remains bound before terminal ending completion;
- no Palace ordinary Hard Work credit.

Fill:
- exact progress/stage requirement: `[OPEN]`;
- required milestone/fact: `[OPEN]`;
- commitment choice/event: `[OPEN]`;
- ending ID: `[OPEN if not already canonical]`;
- same-run post-ending continuation policy if any: `[OPEN PRODUCT]`;
- exact Meta reward ID/effect: `[OPEN PRODUCT]`;
- presentationId/assets: `[OPEN]`.

## J. Outcome — `takeover`

**FIXED**
- multi-system power solution;
- requires more than shifts;
- requires build + route choice + at least one external dependency category;
- resolves subordinate dependency/control;
- no Palace ordinary Hard Work credit.

Fill:
- career progress requirement: `[OPEN]`;
- stat/build requirement: `[OPEN]`;
- external dependency category: `[OPEN PRODUCT]`;
- exact external fact/item/relationship/School/Activity ID: `[OPEN]`;
- route choice: `[OPEN CONTENT]`;
- ending ID: `[OPEN if not already canonical]`;
- exact Meta reward ID/effect: `[OPEN PRODUCT]`;
- takeover state/public fact if needed: `[OPEN]`;
- presentationId/assets: `[OPEN]`.

## K. Meta rewards

**FIXED transaction rule**
- Meta applies only after ending completion;
- exactly once;
- persists to New Run through normal Meta rules;
- Secret Debt Meta never counts as ordinary Hard Work for Palace.

Documented qualitative ideas only:
- `paid_freedom`: economy-oriented family;
- `bound_life`: hidden-career Hard-Work analogue;
- `takeover`: stronger/rule-changing qualitative family.

Fill exact Product decisions:
- `paid_freedom` reward ID/effect: `[OPEN]`;
- `bound_life` reward ID/effect: `[OPEN]`;
- `takeover` reward ID/effect: `[OPEN]`;
- loadout classification for strong modifiers: `[OPEN if applicable]`.

## L. Presentation / GIF mapping

**FIXED presentation contract**
- semantic `presentationId`;
- central stage;
- static fallback;
- text fallback;
- GIF optional;
- mechanics independent from animation timing/presence.

Fill after content identities exist:
- lender offer presentationId: `[OPEN]`;
- refusal: `[OPEN]`;
- acceptance/immediate benefit: `[OPEN]`;
- activation reveal: `[OPEN]`;
- repeatable shifts: `[OPEN variant map]`;
- forced Night variants: `[OPEN variant map]`;
- relationship/story scenes: `[OPEN]`;
- paid_freedom: `[OPEN]`;
- bound_life: `[OPEN]`;
- takeover: `[OPEN]`;
- Meta result presentation: `[OPEN]`;
- GIF priority order: `[OPEN ART DECISION]`.

## M. Acceptance sign-off before implementation

Implementation package should not treat intake as complete until:
- every field needed by that package is explicitly filled or intentionally parameterized;
- Product-owned choices are traceable to an authority decision;
- balance-owned values are marked as parameters rather than embedded assumptions;
- School/Activity availability decision is explicit before job-lock code broadens scope;
- ending rewards remain absent until Product chooses them;
- presentation IDs follow authored gameplay/content identity.

## N. Global invariants

Never change through this intake:
- 10 ordinary careers remain the Palace prerequisite set;
- Secret Debt remains additional/excluded;
- Lumber Hard Work remains ONLY `completed_shifts >= 50`;
- exact Lumber reward remains `hardWork:lumber`;
- exact Lumber Forest continuation remains `activityResult(lumber.forest, success, lumber.forest.success)`.
