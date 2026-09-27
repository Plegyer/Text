# Shared Night/lodging consumer QA contract v1

Status: COMPLETE / ACCEPTANCE_CONTRACT

Source:
Chat 3 finalized 20-key shared Night/lodging fixture.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

## Scope

Future Lead wiring may localize the currently hardcoded shared Night/lodging UI only.

Prepared keys cover:
- Night eyebrow/prompt/title/context;
- next-day Energy display text;
- sleep/Night panel copy;
- lodging selection labels;
- housing labels;
- result -> lodging button;
- town lodging summary;
- ordinary sleep Night-choice label.

## Text-only rule

The consumer may change visible RU/EN text only.

It must not change:
- NightFlow phase;
- lodging ID;
- housing value;
- lodging price;
- Energy delta;
- command type;
- choice ID;
- Save structure;
- gameplay RNG.

## Stable identities

Keep exact lodging IDs:
- `lodging.normal`;
- `lodging.cheap`;
- `lodging.street`.

Keep exact housing values:
- `room`;
- `hostel`;
- `shelter`.

Keep exact generic sleep choice:
`night.sleep`.

Internal Night phase values remain runtime identities and are never localized in state.

## Existing key reuse

Reuse existing shipped localization where already authoritative:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

Do not duplicate those under new ownership.

## No visible internal terminology

Player-facing copy must not expose implementation terminology such as:
- `NightFlow`;
- raw phase names like `LodgingResolution`;
- raw internal command/state identifiers.

The 20-key source should use natural player-facing terms.

## Locale-switch invariance

For each shared Night/lodging phase:

1. enter through the current production path;
2. snapshot serialized gameplay Save;
3. snapshot phase, lodging selection, available choice IDs, resources and RNG;
4. render RU;
5. switch to EN without dispatching gameplay;
6. assert only text changes;
7. assert the serialized gameplay Save is identical;
8. switch back to RU and repeat.

## Lodging transaction invariance

For each lodging option:
- same exact lodging ID in RU and EN;
- same price;
- same payment count;
- same housing result;
- same next-day modifier;
- no second charge on locale switch/re-render.

Locale must not change eligibility or order of lodging options.

## Night-choice invariance

For `night.sleep` and other generic Night choices:
- same stable choice ID;
- same eligibility;
- same effects;
- same next-day Energy semantics;
- only label/context text changes.

School Night-study remains on its existing School-specific dynamic localization path.

Foreman `lumber.foreman.night` retains its shipped dedicated label key and mechanics.

## Next-day Energy text

The UI may localize the formatter around the numeric delta.

It must not:
- recalculate the delta;
- invert sign;
- round differently by locale;
- store formatted text in Save.

The value displayed must come from the same gameplay-owned modifier.

## Housing labels

Localized housing labels are display aliases only.

They must not replace or migrate persisted values:
- `room`;
- `hostel`;
- `shelter`.

## Fallback behavior

Missing localization key must fall back to the current embedded/hardcoded display text.

Missing localization must never:
- block End Day;
- hide lodging;
- disable Night choice;
- change a cost/effect;
- throw during render.

## Required executable coverage

Lead integration must include tests for:
- normal lodging RU↔EN;
- cheap lodging RU↔EN;
- street/no-lodging RU↔EN;
- generic sleep choice RU↔EN;
- result-to-lodging button;
- town lodging summary;
- same serialized Save across locale switch;
- same command IDs and transaction results.

## Verdict

This contract permits shared Night/lodging localization only as a presentation consumer.

Acceptance condition:
`same Night/lodging gameplay state + same command = same result in RU and EN; only UI text differs`.
