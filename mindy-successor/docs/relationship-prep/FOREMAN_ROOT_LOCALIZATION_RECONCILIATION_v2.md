# Foreman Root Localization Reconciliation v2

Date: 2026-09-27
Scope: item-3 Foreman RU+EN keys vs current main root localization.
Baseline main: ab53da4059e348734703c2de490e43e94c02b057

This is a comparison packet only. It does not edit root localization or gameplay.

## Classification

Current main `content/localization.json` contains no item-3 Foreman keys.

| Key | Status |
|---|---|
| `event.lumber.foreman-notice.title` | ADDITIVE |
| `event.lumber.foreman-notice.variant.default.text` | ADDITIVE |
| `event.lumber.foreman-notice.choice.professional.label` | ADDITIVE |
| `event.lumber.foreman-notice.choice.professional.text` | ADDITIVE |
| `nightChoice.lumber.foreman.night.label` | ADDITIVE + SHARED_UI_REQUIRED |
| `event.lumber-night.foreman-professional.title` | ADDITIVE |
| `event.lumber-night.foreman-professional.variant.default.text` | ADDITIVE |
| `event.lumber-night.foreman-professional.choice.continue.label` | ADDITIVE |
| `event.lumber-night.foreman-professional.choice.continue.text` | ADDITIVE |
| `media.relationship.lumber.foreman.professional.alt` | ADDITIVE |
| `media.relationship.lumber.foreman.night.professional.alt` | ADDITIVE |

IDENTICAL: none.
CONFLICT: none.

Exact RU+EN values remain in:
`prior-work/astra/prototype-m3.2/content/relationship-foreman-localization-v1.fixture.json`.

## Shared UI boundary

Current `localizedNightChoiceLabel(id, fallback)` only handles `school.night_study.*`. The existing `lumber.foreman.night` choice therefore still displays its embedded fallback label even if `nightChoice.lumber.foreman.night.label` is added to root localization.

The key itself is safe and locale-neutral, but making the ordinary Night menu consume it is Lead-owned shared UI work. No UI change is authorized here.

## Embedded fallbacks

The production Foreman milestone and Night follow-up packs still contain English fallback copy. Those strings do not conflict with localization because root localization currently has no matching Foreman keys. Adding the item-3 keys changes presentation lookup only; it does not duplicate events or mechanics.

## Caption boundary

Item 3 contains current media alt keys only. There is no item-3 caption key to reconcile. A future caption key would be presentation-only under the same media identity and requires no gameplay duplication.

## Invariants

Selective localization integration must not change:

- relationship ID `lumber.foreman`;
- stages `unknown`, `professional`, `route-professional`;
- Night choice `lumber.foreman.night`;
- `night_meetings +1`;
- Night next-day Energy delta `0`;
- event `lumber-night.foreman-professional`;
- relationship fact `night-followup-complete`;
- Lumber Hard Work: only `completed_shifts >= 50`, reward `hardWork:lumber`;
- exact Forest success result `lumber.forest.success`;
- locale-neutral RNG and Save identity.

## Selective integration note

The ten event/media keys are safe additive localization material. The Night-choice label key is also additive, but remains a shared-UI acceptance dependency until the ordinary Night menu resolves generic Night-choice localization.
