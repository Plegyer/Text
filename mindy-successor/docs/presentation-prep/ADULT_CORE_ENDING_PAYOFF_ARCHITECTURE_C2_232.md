# C2-232 — Adult ending-payoff semantic architecture

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future adult ending consumers: PENDING_RUNTIME_ID

## Product direction

Adult/intimacy payoff is expected for many future non-killing ending families.

This is presentation architecture only.

It does not decide:
- which exact endings receive adult payoff;
- ending eligibility;
- ending commitment;
- partner/client identity;
- reward/Meta;
- adult-routing conditions;
- asset filenames.

## Binding point

An adult ending payoff may bind only after an exact future ending pipeline exposes:
1. exact ending ID;
2. explicit commitment/completion state;
3. exact adult-payoff consumer identity.

Presentation must never infer ending completion from:
- route readiness;
- stage;
- relationship;
- item;
- adult scene availability.

## Semantic shape

Recommended future chain:

`ending eligibility`
-> `explicit commitment`
-> `ending completion`
-> `ending safe presentation`
-> optional exact `ending-adult` payoff consumer
-> common RunResult/Meta handling remains runtime-owned.

The adult payoff is a presentation layer, not a second ending.

## Route identity preservation

Adult payoff must preserve the ending's actual meaning.

Examples from the current product/balance candidate include distinct families such as:
- management/ownership;
- boundary mastery;
- research/successor;
- innkeeper/information/sanctuary;
- official/reform/network/investigation;
- artist mastery/patron/court invitation;
- covert/refusal/network outcomes;
- merchant house/route outcomes;
- Independent House / Elite Clientele / Network-Protection;
- Secret Debt outcome families.

If adult payoff is later authorized, it should remain route-specific rather than becoming one generic final scene.

## Non-killing focus

For a future ending explicitly classified by product/runtime authority as non-killing, adult payoff may be a natural optional presentation layer.

Chat 2 does not classify current endings as killing/non-killing from title alone.

Until exact authority publishes the classification and consumer:
- `PENDING_RUNTIME_ID`

## Partner/relationship boundary

An ending adult payoff does not automatically require a romance partner.

Future exact consumers may be:
- partner-specific;
- route-specific without romance;
- client/professional-context-specific;
- solo/private-life payoff;
- omitted entirely.

Presentation must not invent:
- partner identity;
- romance;
- exclusivity;
- client relationship.

## Coercive/dependency ending boundary

Dependency-route endings require separate semantics.

If a dependency ending later receives adult-themed presentation:
- it must preserve dependency context;
- it must not reuse voluntary romantic/payoff semantics;
- it must not visually convert coercive/dependency meaning into consensual reward.

## Ending reward separation

The current Complex Ending Meta Reward Catalog is product/balance candidate authority for reward roles, not presentation binding.

Adult ending payoff must not:
- grant the reward;
- imply reward amount;
- replace reward UI;
- alter Meta timing.

Presentation happens after runtime decides the ending.

## Safe fallback

Every future `ending-adult` consumer must have:
1. exact ending-specific safe presentation;
2. family fallback that preserves route meaning;
3. safe static fallback.

If adult media is unavailable/disabled, the ending remains fully understandable and complete.

## Accessibility

Adult ending accessibility should:
- name the ending context neutrally;
- describe visible payoff context;
- avoid inventing romance/consent/partner state;
- preserve route identity;
- never expose reward assumptions not visible in the scene.

## No reserved IDs

C2-232 does not reserve:
- `ending/<id>/adult`;
- partner-specific ending adult IDs;
- route-adult ending IDs.

All future ending adult consumers remain:
- `PENDING_RUNTIME_ID`

## Forbidden assumptions

`NO_AUTHORITY_NOT_BINDABLE`:
- every non-killing ending automatically has adult payoff now;
- Hard Work automatically receives adult payoff;
- adult payoff creates ending commitment;
- adult payoff grants Meta;
- ending title determines partner/romance;
- asset inventory determines ending routing.

## Firewall

C2-232 changes no ending eligibility, commitment, RunResult, reward/Meta, relationship state, consent state, Lust/router mechanics, Save/RNG or media sourcing.
