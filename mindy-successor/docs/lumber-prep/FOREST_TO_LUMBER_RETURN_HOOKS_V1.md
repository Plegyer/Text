# Forest-to-Lumber Return Hooks v1

Status: C3-06 content-side return-hook handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-to-lumber-return-hooks-v1.fixture.json`.

## Scope

This task documents and localizes the existing Forest -> Lumber return seam without adding new resolver behavior.

Changed production content:
- four additive RU/EN localization keys for the already-existing event `lumber-cross.activity-forest-return`.

Added handoff data:
- exact outcome-by-outcome mapping for success, escape, and failure.

No reaction trigger, condition, effect, world fact, career fact, ending condition, Save field, RNG behavior, Activity mechanic, or media path is changed.

## Success: existing Lumber progression hook

Activity boundary:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Existing Activity result effect:
world fact `lumber.forest.truth-known`.

Existing Forest result content:
- event `forest-result-content-v1.success`;
- presentation `job/lumber/event/forest-result-content-v1-success/default`.

Existing Lumber continuation:
- event `lumber-cross.activity-forest-return`;
- reaction trigger: exact success ActivityResult;
- condition: world fact `lumber.forest.truth-known`;
- choice: `continue`.

Existing choice effects:
- Lumber career fact `forest-truth-known`;
- Lumber career fact `forest-problem-resolved`.

Existing ending family that consumes those career facts:
`ending.lumber.forest`.

C3-06 does not create or alter any of those mechanics.

## Success localization added

Before C3-06, `lumber-cross.activity-forest-return` had source English copy but no event-localization keys in `content/localization.json`.

C3-06 adds exactly four keys:

### Title

`event.lumber-cross.activity-forest-return.title`

RU:
`Лесной результат доходит до артели`

EN:
`The Forest result reaches the crew`

### Variant text

`event.lumber-cross.activity-forest-return.variant.default.text`

RU:
`Ты возвращаешься к рабочей площадке с тем, что удалось подтвердить в лесу. Разговор сразу смещается от самой вылазки к тому, что этот результат значит для артели.`

EN:
`You return to the worksite with what you managed to confirm in the Forest. The conversation shifts at once from the expedition itself to what this result means for the crew.`

### Choice label

`event.lumber-cross.activity-forest-return.choice.continue.label`

RU:
`Передать результат`

EN:
`Hand over the result`

### Choice text

`event.lumber-cross.activity-forest-return.choice.continue.text`

RU:
`Ты вводишь лесные наблюдения в рабочий разговор, и подтверждённый результат становится частью дальнейшего решения артели.`

EN:
`You bring the Forest observations into the work discussion, and the confirmed result becomes part of the crew's next decision.`

These are localization-only additions. The existing event source fields are not required to change for the localization consumer to use these strings.

## Escape: content return only

Activity boundary:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Existing Activity result effect:
world fact `lumber.forest.escaped`.

Existing Forest result content:
- event `forest-result-content-v1.escape`;
- presentation `job/lumber/event/forest-result-content-v1-escape/default`.

Current main has no Lumber continuation event triggered by the escape result.

Therefore C3-06 classification:
`CONTENT_RETURN_ONLY_NO_LUMBER_STATE_HOOK`.

Chat 3 does not invent:
- a `lumber-cross` escape event;
- Lumber career facts for escape;
- ending eligibility from escape;
- a penalty/reward;
- a new resolver boundary.

The player-facing escape result remains the correct return content until Lead / Product explicitly introduces a gameplay continuation identity.

## Failure: content return only

Activity boundary:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

Existing Activity result effect:
world fact `lumber.forest.failed`.

Existing Forest result content:
- event `forest-result-content-v1.failure`;
- presentation `job/lumber/event/forest-result-content-v1-failure/default`.

Current main has no Lumber continuation event triggered by the failure result.

Therefore C3-06 classification:
`CONTENT_RETURN_ONLY_NO_LUMBER_STATE_HOOK`.

Chat 3 does not invent:
- a `lumber-cross` failure event;
- Lumber career facts for failure;
- penalties, rewards, recovery mechanics, or ending gates.

The existing failure result copy remains the return content.

## World fact vs career fact boundary

Do not collapse these identities:

Activity/world layer:
- `lumber.forest.truth-known`;
- `lumber.forest.escaped`;
- `lumber.forest.failed`.

Lumber career layer after the existing success continuation choice:
- `forest-truth-known`;
- `forest-problem-resolved`.

The world fact and career fact named around “truth” are different typed state identities.

Player-facing localization may describe the handoff, but content must not duplicate the effect writes.

## Presentation identities

Existing terminal return identities:
- `activity/forest/return/success`;
- `activity/forest/return/escape`;
- `activity/forest/return/failure`.

Existing worksite/reaction presentation identities from the Forest result events:
- `job/lumber/event/forest-result-content-v1-success/default`;
- `job/lumber/event/forest-result-content-v1-escape/default`;
- `job/lumber/event/forest-result-content-v1-failure/default`.

C3-06 changes no presentation slot and no media path.

## Ending boundary

Only the current successful continuation establishes the Lumber career facts consumed by `ending.lumber.forest`.

Escape and failure must not be described as satisfying that ending.

`ending.lumber.hard-work` remains independent from Forest and is not part of this return-hook chain.

`ending.lumber.forewoman` remains a separate management/relationship path and is not part of this return-hook chain.

## Selective integration

Production-ready now:
- the four additive localization keys for `lumber-cross.activity-forest-return`.

Handoff-only:
- `forest-to-lumber-return-hooks-v1.fixture.json`.

Do not turn the escape/failure rows in the fixture into new gameplay events. They are explicit proofs that current production has no Lumber state continuation for those outcomes.

## C3-06 disposition

Success:
existing gameplay continuation + new RU/EN player-facing localization.

Escape:
existing distinct result content; no Lumber state continuation.

Failure:
existing distinct result content; no Lumber state continuation.

This is the exact safe current-main content boundary.
