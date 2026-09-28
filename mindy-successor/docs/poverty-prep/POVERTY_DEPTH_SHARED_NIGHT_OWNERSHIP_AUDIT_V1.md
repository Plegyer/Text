# Poverty Depth / Shared Night Ownership Audit v1

Status: exact-key and UI-seam ownership audit.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Secret Debt remains separate.

## Poverty presentation key sets

Depth v2:
- **26** keys;
- namespace `presentation.poverty.depth.*`.

Current-main rebase v3:
- introduces no new key namespace;
- classifies the same 26 depth keys against current root.

Static accessibility v2:
- **20** reviewed replacement keys;
- namespace `presentation.static.poverty-*`.

## Shared Night/lodging ownership

Current shared Night/lodging localization is owned by namespaces such as:
- `ui.night.*`;
- `ui.sleep.*`;
- `lodging.*`;
- `housing.*`;
- `nightChoice.*`;
- `ui.result.chooseLodging`;
- `ui.town.lodgingToday`.

Current exact shared Night/lodging key count in those audited families:
**24**.

## Exact-key collision result

Poverty depth/static keys colliding with current shared Night/lodging keys:
**0**.

No exact key collisions found.

This audit flags only real exact-key conflicts; namespace similarity alone is not a collision.

## UI seam ownership

### Pending ordinary-poverty scene body

Current pending event UI renders the event variant body through:
`eventVariantText(eventId, variantId, fallback)`.

The proposed depth consumer belongs only at this pending event body seam, after current gameplay has already selected:
- event ID;
- variant ID.

### Shared Night shell

Current Night UI separately owns:
- LodgingResolution;
- VoluntaryNightChoice;
- generic Night sequence;
- sleep panel.

Those surfaces consume shared `ui.night.*`, `ui.sleep.*`, lodging/housing/nightChoice keys.

The poverty depth consumer must not replace:
- lodging prompt;
- Night title;
- Night choice copy;
- lodging labels;
- sleep panel copy.

## Night-trigger ownership

Ordinary-poverty events may be triggered at:
`nightPhase(after_lodging)`.

That trigger does **not** make their pending-scene body part of shared Night shell localization.

Once selected, the poverty event retains its own:
- event ID;
- variant ID;
- event localization;
- optional poverty depth presentation.

## Accessibility ownership

`poverty-static-accessibility-v2.fixture.json` updates only poverty static alt/caption localization.

It does not own:
- Night media alt;
- lodging media;
- shared Night UI copy.

## Journal ownership

Depth keys do not enter resolved Journal identity.

Resolved ordinary-poverty Journal refs remain:
`eventChoice(eventId, choiceId)`.

Shared Night has no ownership over those event-choice text keys.

## Secret Debt separation

No poverty depth/static accessibility key may be reused for:
- lender/offer;
- forced debt Night;
- bound career;
- Secret Debt outcomes.

Ordinary poverty remains separate even though both may eventually use NightFlow infrastructure.

## Ownership conclusion

Real collision count:
**0**.

The domains are cleanly separated:
- shared Night/lodging owns Night shell and lodging/night-choice UI;
- ordinary poverty owns selected event presentation and depth copy;
- shared Journal infrastructure owns stable event-choice refs;
- Secret Debt remains outside this slice.
