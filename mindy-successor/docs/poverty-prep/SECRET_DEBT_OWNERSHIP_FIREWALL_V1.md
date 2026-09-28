# Secret Debt Ownership Firewall v1

Status: ownership boundary for current poverty/Night/career content.

Current main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

Secret Debt is Product-intended but not yet represented by exact production content identities.

## Ordinary poverty ownership

Owned by current production packs:
- `poverty-street-production`;
- `poverty-street-production-v2`;
- `poverty-cheap-production`;
- `poverty-cheap-production-v2`;
- `poverty-recovery-production`;
- `poverty-pressure-production`.

Identity family:
`event.poverty-*`.

Purpose:
street/cheap lodging context, recovery, neutral and pressure scenes.

Do not promote these event IDs into Secret Debt offer/activation/forced-Night identities.

## Secret Debt ownership

Intended domain:
hidden exceptional debt route / hidden bound career.

Current exact production IDs:
**none**.

Reserved conceptual outcome names from Product design:
- `paid_freedom`;
- `bound_life`;
- `takeover`.

These conceptual names are not current production event/result/ending IDs and must not be attached to ordinary poverty IDs as a shortcut.

## Palace ownership

Palace is a separate hidden/meta profession.

Authoritative unlock:
Hard Work on all 10 ordinary professions.

Secret Debt / hidden careers do not count.

Do not:
- treat Secret Debt shift count as Palace ordinary profession progress;
- reuse Palace IDs for Secret Debt;
- grant Palace progress from Secret Debt outcomes.

## Relationship voluntary Night ownership

Current exact relationship Night event:
`lumber-night.foreman-professional`.

Current source domain:
`lumber.foreman`.

Trigger:
`nightChoiceCompleted(lumber.foreman.night)`.

This is voluntary relationship/professional content.

Do not reuse:
- its event ID;
- its choice ID;
- its relationship ID;
- its Night policy

for Secret Debt forced-Night behavior.

## Generic debt economy ownership

Current generic debt:
- metric `debt`;
- action `repay`;
- action `rent-room`;
- localization key `ui.bag.debtLabel`.

These are existing economy/housing primitives.

They are not proof that Secret Debt hidden-career identity has shipped.

Any future Secret Debt implementation may interact with economy only through explicitly approved domain design; it must not silently reinterpret these IDs as the hidden route.

## Cross-owner rules

Never:
- convert ordinary-poverty event into Secret Debt event;
- convert relationship Night event into forced-debt Night;
- make Secret Debt an ordinary profession slot;
- make Secret Debt a Palace prerequisite credit;
- reuse current generic debt action IDs as hidden-career result IDs;
- invent new IDs under another owner's namespace.

## Localization ownership

Ordinary poverty:
`event.poverty-*`.

Relationship Night:
`event.lumber-night.foreman-professional.*`.

Generic debt UI:
`ui.bag.debtLabel`.

Current Secret Debt localization namespace:
**none in production**.

Future Secret Debt localization must follow exact approved production identities after they exist.

## Firewall conclusion

Four domains remain separate:
1. ordinary poverty;
2. Secret Debt hidden/forced route;
3. Palace meta career;
4. voluntary relationship Night content.

No cross-owner promotion or ID reuse is authorized.
