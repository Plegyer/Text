# Ending localization source QA v1

Status: COMPLETE / GREEN_SOURCE / SHIPPED_GREEN_VIA_PR61

Reviewed Chat5 items:
`133–139`.

Source:
`ending-localization-v1.fixture.json`
blob `a0d437777fc0b1991713e61bbb5cf34fa061f2fa`.

## Exact ending set

Exactly 9 current ending IDs:
- `guild-life`;
- `scholar-life`;
- `tavern-stay`;
- `tavern-guild`;
- `tavern-court`;
- `lumber-stay`;
- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`.

Source strings:
`18` = title + description for every exact ending.

Missing RU:
0.

Missing EN:
0.

No invented ending ID.

The double-prefix localization keys for IDs already beginning with `ending.` are intentional:
`ending.ending.lumber.*`.

## Current exact conditions

`guild-life`:
work >=5, organization >=6, `alchemy.delivered=true`.

`scholar-life`:
`school.exam=true`.

`tavern-stay`:
18 tavern visits.

`tavern-guild`:
`tavern.guild=true`.

`tavern-court`:
`tavern.prince=true`.

`lumber-stay`:
24 lumber visits.

`ending.lumber.hard-work`:
only `careerCounter(lumber, completed_shifts) >= 50`.

`ending.lumber.forewoman`:
- `management-school-ready` career fact;
- `forewoman-problem-resolved` career fact;
- `lumber.foreman` relationship stage `route-professional`.

`ending.lumber.forest`:
- `forest-truth-known`;
- `forest-problem-resolved`.

## Reward/meta lock

Localization source contains no condition/reward/meta fields.

Hard Work remains:
- reward `lumber.hardwork.compat`;
- meta reward `hardWork:lumber`.

No School/Forest/Foreman prerequisite is added to Hard Work.

## Production integration

PR61 production fixture:
`ending-localization-production-v2.fixture.json`
blob `9bb43019ad0e57f0f2fa75beee426e15ae0b9cab`.

Current root contains all 18 exact reviewed values.

PR61 accepted head:
`a7b16eca18ccba37719fc84432c1fe1a9b275bf5`.

Run #121:
369 / 369 PASS, validator 17 / 46 / 35 / 9.

Merged current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Run #122:
369 / 369 PASS, same validator counts.

Renderer PASS:
`ending cards localize RU EN without changing eligibility or save`.

## Verdict

`SHIPPED_GREEN_VIA_PR61`.

The source is exact-ID, complete RU+EN and text-only; all eligibility/reward/meta identity remains gameplay-owned and unchanged.
