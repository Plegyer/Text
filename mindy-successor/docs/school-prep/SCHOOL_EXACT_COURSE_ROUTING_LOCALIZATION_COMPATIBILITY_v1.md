# School Exact-Course Routing + Localization Compatibility v1

Status: compatibility review only.
Scope: proposed exact paid-course public routing seam + RU/EN Product rule.
No shared runtime/schema implementation is performed here.

## Shared identity principle

Exact paid-course routing must stay locale-neutral.

The routing payload should contain only the existing canonical course identity, conceptually:

```ts
{ kind: 'schoolLessonCompleted', course: 'school.course.arcana' }
```

The exact schema spelling may differ, but:
- `course` remains the existing `school.course.*` ID;
- RU and EN do not receive separate course IDs;
- no localized display label participates in routing.

## Backward-compatible generic School reaction

The current generic reaction:
- `actionCompleted:school`

must remain unchanged and locale-neutral.

RU/EN support must not require:
- `actionCompleted:school.ru`;
- `actionCompleted:school.en`;
- locale-specific event duplication.

Generic content can continue to react to the same gameplay fact and select localized presentation text afterward.

## Routing before localization

Required order:

1. Paid School transaction validates availability.
2. Tuition/Energy/stat/progress transaction commits once.
3. Generic and/or exact-course gameplay reaction facts are emitted.
4. Resolver selects the gameplay event/variant using locale-neutral IDs/state/RNG.
5. Presentation layer resolves the active locale.
6. RU or EN text/alt/caption is displayed for the already-selected gameplay identity.

Localization must not influence steps 1–4.

## Variant/RNG identity

A materialized event stores the same:
- event ID;
- variant ID;
- allowed choice IDs;
- reaction epoch identity

regardless of locale.

Switching language after materialization must not:
- reroll a different variant;
- alter event priority;
- alter event eligibility;
- duplicate an event instance;
- re-run the School transaction.

Only the text/media accessibility payload changes.

## Save compatibility

No Save migration should be required solely for language.

Reason:
- course identity is already locale-neutral;
- event/variant IDs are locale-neutral;
- Save should persist gameplay identity, not localized prose.

Required cross-locale checks:
- create/materialize in RU, save, reload in EN -> same event/variant/choices/state;
- create/materialize in EN, save, reload in RU -> same event/variant/choices/state;
- switching locale while a School scene is pending -> same pending scene identity.

If locale itself is persisted as a UI preference elsewhere, it must remain outside School gameplay state.

## No locale-specific progression

Exact-course localization must not alter:
- tuition;
- current-day Energy;
- stat package;
- Lust;
- `lessons_completed`;
- `night_study_sessions`;
- milestone eligibility;
- public-result publication;
- relationship/career state;
- Night-study mechanics.

A course completion in RU and EN must yield byte-equivalent School gameplay state except for any separately stored UI-language preference outside School state.

## Public-result compatibility

Future management/accounting or Arcana/Forest public results, if Product approves them, also remain locale-neutral.

Localization may change:
- player-facing milestone/result title;
- scene prose;
- choice labels;
- alt text/captions.

Localization may not change:
- public-result ID;
- provider;
- threshold;
- publication timing;
- exactly-once proof;
- downstream consumer.

## Teacher/course staged libraries

After exact-course routing exists:
- one teacher/course event ID remains shared across locales;
- one exact `school.course.*` trigger identity remains shared;
- RU/EN teacher names/roles/text are presentation payloads;
- teacher presentation/media semantic identity remains shared.

No duplicate English gameplay event may be created solely to carry English text.

## Night-study compatibility

Night routing is already exact and locale-neutral:
- `school.night_study.<course>.<stat>`.

RU/EN presentation for the same Night choice must share:
- choice ID;
- resulting stat;
- +2 amount;
- zero tuition;
- zero current-day Energy;
- next-day Energy -1;
- `night_study_sessions +1`;
- event identity/variant identity.

The bilingual sidecar in `school-night-exact-bilingual-v1.json` follows this model at authoring level.

## Current schema limitation

The current strict content pack schema stores player-facing values such as:
- `title`;
- variant `text`;
- choice `label` / `text`;
- media `alt`

as single strings.

It does not currently expose a RU/EN localization map in the pack schema.

Therefore current bilingual School JSON files are authoring sidecars:
- locale-neutral gameplay pack reference;
- one shared event/variant/media identity;
- paired `ru` / `en` presentation payload.

They must not be passed into the current strict `loadCatalog` as runtime packs.

## Smallest Lead localization seam

A minimal shared localization integration should:
1. keep gameplay content IDs unchanged;
2. introduce a locale-keyed presentation lookup or localized-string reference;
3. resolve localized text only after gameplay event/variant selection;
4. preserve the current pack/event mechanics contract;
5. avoid copying conditions/effects into each locale;
6. make missing-locale validation explicit;
7. keep Save state locale-independent.

This can be implemented either:
- through shared localization keys referenced by content; or
- through another centralized localized presentation layer.

This review does not choose which internal representation Lead should use.

## Validation requirements after seam implementation

- exact course routing works identically in RU and EN;
- generic `actionCompleted:school` remains backward-compatible;
- same event/variant selected under fixed state/RNG regardless of locale;
- no duplicate RU/EN gameplay event;
- RU and EN both resolve every required player-facing string;
- missing translation fails validation rather than silently changing gameplay routing;
- Save created in one locale can reload in the other with unchanged School gameplay state;
- paid transaction remains exactly once;
- Night routing remains exact;
- cross-system public results remain locale-neutral.

## Non-goals

This review does not:
- implement exact-course routing;
- implement shared localization runtime;
- select management/accounting semantics;
- select Arcana/Forest semantics;
- select certificate/project/exam participation;
- change final art style;
- change School mechanics.
