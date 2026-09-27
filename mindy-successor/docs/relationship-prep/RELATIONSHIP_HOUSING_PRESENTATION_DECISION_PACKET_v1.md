# Relationship Housing Presentation Decision Packet v1

Date: 2026-09-27
Status: DECISION SUPPORT / NO PRODUCT LOCK
Scope: existing `lumber.foreman.night` only

## Current authoritative behavior

Current main has housing tiers `normal`, `cheap`, and `street`. The existing Foreman Night choice has **no housing condition**, so this packet must not silently make any tier required or forbidden.

The runtime can express `housingTier` conditions, but selecting a real availability/privacy rule is a Product decision.

## SAFE_PRESENTATION_ONLY

The following are copy directions only. They can be authored without asserting a new rule, but they must not be wired to availability until Product chooses how housing should matter.

| Context | RU presentation candidate | EN presentation candidate |
|---|---|---|
| normal | Вечер проходит спокойно; после смены находится тихое место для короткого рабочего разговора. | The evening is calm; after the shift there is a quiet place for a short professional conversation. |
| cheap | Вечером вокруг больше людей и шума, поэтому разговор остаётся коротким и практичным. | There are more people and noise around in the evening, so the conversation stays brief and practical. |
| street | Разговор возможен только в открытом общественном месте и не предполагает приватности. | The conversation can only be framed in an open public place and does not imply privacy. |

These lines are candidates, not statements that the current game already selects them.

Safe authoring principles:

- keep the same existing Foreman relationship identity;
- keep the interaction voluntary;
- keep the same Night slot;
- do not spend daytime Energy;
- do not add a universal next-day Energy penalty;
- do not imply lodging grants a relationship reward;
- do not turn a presentation variant into a new canonical route.

## PRODUCT_DECISION_REQUIRED

Product/Lead must decide before housing changes Foreman Night gameplay:

1. Whether housing affects only prose, actual choice availability, or both.
2. Whether `normal` guarantees a private version.
3. Whether `cheap` uses a common-space version, a public-walk version, or remains identical to normal.
4. Whether `street` permits a public version or blocks this Night choice.
5. Whether the rule reads persistent housing tier, the lodging selected for this Night, or another approved public context.
6. Whether an unavailable private scene should disappear silently or show a separate approved explanation.
7. Whether any housing rule applies only to Foreman content or becomes a broader ordinary-relationship convention.

None of those decisions is made here.

## Risk notes

A `street` variant must not borrow forced-poverty or Secret Debt identity. Ordinary voluntary relationship Night remains separate from forced NightFlow.

A `normal` variant must not imply intimacy or romance merely because privacy exists. The current Foreman route is professional.

A `cheap` variant must not impose a stat, money, or next-day Energy penalty unless a future authoritative content definition explicitly says so.

## Recommended safe implementation boundary

Until Product selects the rule, keep current eligibility unchanged and treat all three housing texts as a presentation bank only.

If Product later approves housing gating, the relationship content may use the already-supported `housingTier` condition. Shared runtime/schema changes are not required by this packet and remain Lead-owned if any UI selection behavior is needed.
