# Ordinary Poverty Housing Depth v2

Status: C3-54 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`.
Fixture: `prior-work/astra/prototype-m3.2/content/ordinary-poverty-housing-depth-v2.fixture.json`.

## Scope

C3-54 adds eight RU/EN seasonal lodging variants against existing ordinary-poverty event/variant identities.

Street coverage:
- spring doorway shelter;
- summer late-wall shade;
- autumn dry arcade;
- winter crosswind shelter.

Cheap/shared-lodging coverage:
- spring window;
- summer floor-space heat;
- autumn quiet lamp;
- winter stove turns.

## Housing and NightFlow boundary

Every string remains one-night presentation context.

No change to:
- housing tiers;
- lodging price;
- lodging payment;
- NightFlow phase;
- existing event effects;
- next-day modifiers;
- persistent housing state.

## Secret Debt boundary

Street lodging remains ordinary poverty. None of these variants creates a lender, debt, hidden career or automatic Secret Debt trigger.

## Integration

No runtime selector is added. Existing event/variant selection remains authoritative, with current production text as fallback.

## C3-54 disposition

Ready:
- eight additive RU/EN seasonal housing variants;
- exact existing event/variant mappings;
- no NightFlow, economy or housing-state changes.
