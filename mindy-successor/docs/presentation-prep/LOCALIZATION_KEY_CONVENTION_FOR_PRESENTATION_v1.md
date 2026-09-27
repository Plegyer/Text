# Localization-Key Convention for Presentation v1

Purpose:
define stable locale-neutral localization keys for presentation text without creating locale-specific gameplay identity.

Product localization rule:
- RU is source authoring;
- EN is a full second locale;
- localization keys are shared by both locales;
- locale selects the value stored under the key;
- keys never select mechanics.

## 1. General key format

Use slash-delimited keys:

```text
loc/<domain>/<stable-id-path>/<field>
```

Locale is **not** part of the key.

Correct:

`loc/action/lumber.shift/label`

with values:
- RU value;
- EN value.

Incorrect:

`loc/ru/action/lumber.shift/label`
`loc/en/action/lumber.shift/label`

## 2. Stable-ID preservation

A localization key must derive from an existing stable identifier.

Do not derive keys from:
- displayed Russian text;
- displayed English text;
- filenames;
- translated names;
- temporary UI labels.

Stable source identifiers include:
- action ID;
- event ID;
- variant ID;
- choice ID;
- semantic presentationId;
- media candidate stable key.

Keep the stable ID text intact wherever possible.

## 3. Action labels/descriptions

For action:

`<actionId>`

use:

```text
loc/action/<actionId>/label
loc/action/<actionId>/description
```

Examples:

`loc/action/lumber.shift/label`

`loc/action/lumber.shift/description`

`loc/action/satyr-maid.shift/label`

The same key resolves RU or EN value.

## 4. Event title

For event:

`<eventId>`

use:

```text
loc/event/<eventId>/title
```

Example:

`loc/event/poverty-pressure-production.cold-rain/title`

## 5. Event variant text

For gameplay event variant:

```text
eventId=<eventId>
variantId=<variantId>
```

use:

```text
loc/event/<eventId>/variant/<variantId>/text
```

Example:

`loc/event/poverty-pressure-production.cold-rain/variant/default/text`

The key does not create a new variant.

## 6. Choice labels and text

For choice:

`<choiceId>`

under event:

`<eventId>`

use:

```text
loc/event/<eventId>/choice/<choiceId>/label
loc/event/<eventId>/choice/<choiceId>/text
```

Example:

`loc/event/poverty-pressure-production.cold-rain/choice/take-doorway/label`

The localized label may change wording, but the gameplay choice ID remains `take-doorway`.

## 7. Semantic presentation captions

For semantic presentationId:

`<presentationId>`

use:

```text
loc/presentation/<presentationId>/caption
```

Example:

`loc/presentation/job/lumber/shift/spring/default/caption`

The slash structure of the semantic presentationId is preserved inside the key.

## 8. Presentation text fallback

Use:

```text
loc/presentation/<presentationId>/fallback/text
```

Example:

`loc/presentation/school/arcana/lesson/default/fallback/text`

This key contains text only.

Fallback media remains separately identified by locale-neutral media mapping.

## 9. GIF/image candidate alt text

For candidate stable key:

`<candidateKey>`

under semantic presentationId:

`<presentationId>`

use:

```text
loc/presentation/<presentationId>/candidate/<candidateKey>/alt
```

Example:

`loc/presentation/job/lumber/shift/spring/default/candidate/lumber-spring-a/alt`

The same candidate:
- uses one GIF/image path;
- uses one candidate stable key;
- resolves RU or EN alt value from this one localization key.

## 10. Static fallback alt text

Use:

```text
loc/presentation/<presentationId>/static/alt
```

Example:

`loc/presentation/location/town/event/poverty-cheap-production-shared-quiet-autumn/default/static/alt`

Do not derive static alt keys from the asset filename because one static asset may serve many semantic contexts.

## 11. Shared/reused GIFs

If the same GIF file is reused across semantic IDs, alt keys stay per semantic mapping.

Example one file:
`assets/presentation/reuse/classroom-writing.gif`

may have:

`loc/presentation/school/arcana/lesson/default/candidate/classroom-writing/alt`

and

`loc/presentation/school/literacy-and-numbers/lesson/default/candidate/classroom-writing/alt`

The media file is shared; the accessible meaning can differ by context.

## 12. School teacher names/roles

Teacher content ID:

`school.teacher.mara-fen`

recommended keys:

```text
loc/content/school.teacher.mara-fen/display-name
loc/content/school.teacher.mara-fen/role
```

The content ID remains stable regardless of RU/EN display spelling.

## 13. Ending title/description/epilogue

For existing ending ID:

`<endingId>`

use:

```text
loc/ending/<endingId>/title
loc/ending/<endingId>/description
loc/ending/<endingId>/epilogue
```

Only use keys for ending identities that actually exist.

Do not create localization keys as a backdoor for inventing missing gameplay endings.

## 14. Key normalization rules

Keys must:
- use lowercase stable IDs as already authored;
- preserve hyphens, dots and semantic slashes from stable IDs;
- never include whitespace;
- never contain the localized display text;
- never append `.ru` or `.en` to the identity key.

Locale belongs to the localization catalog lookup, not the key.

## 15. Collision rule

A generated key must be unique by construction because it includes:
- domain;
- stable identity;
- field.

If two source identities would produce the same key:
- treat it as an authoring collision;
- fix the stable key-generation rule;
- do not add arbitrary language-specific suffixes.

## 16. Multi-GIF pool version

Pool version should not normally appear in alt localization keys.

Candidate stable key carries the presentation member identity.

If a candidate is replaced visually but retains the same semantic meaning, the same alt key may remain.

If the visible meaning changes materially:
- use a new candidate stable key;
- create/update its localized alt.

## 17. Missing-locale fallback

The key remains the same while resolver tries locale values.

Example:

`loc/presentation/job/lumber/shift/spring/default/caption`

Requested EN:
1. EN value;
2. RU value temporarily if EN missing.

No new fallback key is generated.

## 18. Language switch invariant

Switching RU <-> EN:
- same localization key;
- different localized value;
- same gameplay action/event/choice;
- same presentationId;
- same candidate key;
- same media path;
- same occurrence key.

## 19. Keys are not gameplay identity

Never:
- store localization key as eventId;
- compare localization key in conditions;
- grant rewards from localization key;
- derive eligibility from localized text/key;
- store translated text as Save identity.

Localization keys are presentation lookup addresses only.

## 20. Reference patterns

| Surface | Key pattern |
| --- | --- |
| action label | `loc/action/<actionId>/label` |
| action description | `loc/action/<actionId>/description` |
| event title | `loc/event/<eventId>/title` |
| event variant text | `loc/event/<eventId>/variant/<variantId>/text` |
| choice label | `loc/event/<eventId>/choice/<choiceId>/label` |
| choice text | `loc/event/<eventId>/choice/<choiceId>/text` |
| presentation caption | `loc/presentation/<presentationId>/caption` |
| text fallback | `loc/presentation/<presentationId>/fallback/text` |
| candidate alt | `loc/presentation/<presentationId>/candidate/<candidateKey>/alt` |
| static alt | `loc/presentation/<presentationId>/static/alt` |
| teacher display name | `loc/content/<contentId>/display-name` |
| teacher role | `loc/content/<contentId>/role` |

## Acceptance

A presentation localization key is valid when:
1. it derives from a real stable identity;
2. it is locale-neutral;
3. it names exactly one player-facing field;
4. RU and EN resolve under the same key;
5. it never participates in gameplay logic.
