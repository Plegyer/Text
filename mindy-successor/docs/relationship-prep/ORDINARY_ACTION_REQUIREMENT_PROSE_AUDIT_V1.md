# Ordinary Action Requirement Prose Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Consumer: `src/ui/app.ts` → `actionList()` / `explain(c)`

## Current ordinary-action requirement consumers

Action cards show unmet requirements through:

`miss.map(explain).join(' · ')`

The underlying condition objects are current gameplay truth. This audit only classifies visible prose debt.

## Current actions with requirements

### `brew`
Condition:
- item `herb` ×1

Visible debt:
- item label is currently read from RU-only `labels.herb`.

After item-115 wiring:
- RU: `Травы × 1`
- EN: `Herbs × 1`

### `sell`
Condition:
- item `tonic` ×1

Visible debt:
- RU-only item label.

Expected after wiring:
- RU: `Микстуры × 1`
- EN: `Tonics × 1`

### `scales`
Condition:
- NOT item `scales` ×1

Current visible grammar:
- `Не требуется: Весы × 1`

Debt:
- `Не требуется:` is hardcoded RU;
- item label is RU-only.

Expected localized structure:
- RU: `Не требуется: Весы × 1`
- EN: `Not required: Scales × 1`

### `exam`
Conditions:
- metric `lessons >= 3`
- metric `intelligence >= 7`
- metric `alchemy >= 2`
- flag `school.exam=false`

Debt:
- metric labels come from RU-only dictionary;
- false-flag prose is hardcoded RU `Этот этап уже пройден`.

Expected labels need metric-domain localization; condition objects remain exact.

### `deliver`
Conditions:
- `alchemy.order=true`
- `alchemy.delivered=false`
- item `tonic` ×2

Debt:
- generic flag prose is currently lossy and Russian-only;
- item label RU-only.

### `visit`
Condition:
- `bran.met=true`

Current generic flag prose:
- `Продвиньте связанную историю`

Debt:
- Russian-only grammar, but no raw flag ID is shown.

### `repay`
Condition:
- metric `debt >= 1`

Debt:
- RU-only metric label.

### `rent-room`
Conditions:
- metric `debt = 0`
- NOT housing `room`

Debt:
- metric label RU-only;
- NOT prefix RU-only.
- legacy `housing.room.label` is already localized in root and current housing helper exists elsewhere.

### `arrival`, `tavern`, `lumber`, `hunt`, `landlord`, School legacy actions
Most ordinary entry gates are flag conditions.

Current flag explanation intentionally hides raw IDs and uses generic Russian prose:
- true → `Продвиньте связанную историю`
- false → `Этот этап уже пройден`

Debt is grammar/localization only, not identity.

### `guard`
Conditions:
- story-arrived flag;
- ANY of:
  - strength >= 6 AND composure >= 5
  - guard recommendation flag

Debt:
- logical separators `и` / `или` are Russian-only;
- target stat `strength` has existing localized stat key but `explain(metric)` still reads raw dictionary;
- legacy metric `composure` is RU-only;
- flag prose is RU-only.

### `forest-search`
Conditions:
- story-arrived flag;
- tavern quest flag;
- forest receipt false;
- perception >= 3

Debt:
- generic flag prose RU-only;
- legacy metric `perception` RU-only.

No Forest route/result semantic change is implied.

### `tavern-talk`
Conditions:
- story-arrived;
- forest receipt;
- tavern resolved false.

Debt:
- only generic flag prose localization.

## Other condition kinds visible in endings/eligibility

Current `explain(c)` also has Russian-only templates for target career/quest/relationship/world/meta condition kinds even when ordinary current actions do not use all of them.

Those templates are shared UI debt, not new action mechanics.

## Remaining raw IDs

Even after label/template localization, these condition kinds may still deliberately display stable raw IDs because no semantic-name localization layer currently exists:
- career ID;
- quest ID;
- relationship ID;
- stage ID;
- counter ID;
- fact ID;
- choice ID/value;
- world fact ID;
- item capability ID;
- ending ID in meta condition text.

Classification: **ACCEPTABLE_ID_FALLBACK / FUTURE_SEMANTIC_LABEL_LAYER**, not a reason to mutate gameplay IDs.

## Grammar debt

The following current Russian-only grammar needs presentation wiring:
- item capability prefix/state;
- calendar prefixes;
- housing prefix;
- career/quest/relationship templates;
- world/meta templates;
- visits `смен`;
- generic flag true/false prose;
- `Не требуется:`;
- `и` / `или`.

Prepared prior source:
- `CONDITION_EXPLANATION_TEMPLATES_RU_EN_V2.md`
- `condition-state-word-localization-v1.fixture.json`

## Conclusion

For ordinary actions, the remaining visible debt is mostly:
1. direct RU-only label dictionary reads;
2. Russian-only condition grammar/state words;
3. some stable raw IDs without a separate semantic-label layer.

No current condition object needs to change.
