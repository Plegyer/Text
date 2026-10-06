# Chat 6 — Strong Meta UI Closure v42

Date: 2026-10-06
Branch: `chat6/strong-meta-ui-closure-v42`
Implementation head before documentation: `fac645878ebd726f50fd1364ac72414796755a2d`

## Scope

This closes the remaining player-facing Strong Meta selector P1 from the v39 audit without repeating v39-v41 work and without changing Strong Meta mechanics, ownership semantics, capacity rules, save schema, or the immutable per-run snapshot contract.

## Existing legal seam confirmed

The accepted engine already exposes `setStrongMetaKeystone` and `setStrongMetaSpecialist`. Those commands are accepted only while character creation is open, write `meta.strongMeta.preferredSelection`, and are validated by the existing Strong Meta registry/selection rules. `finishCreation` remains the only place that resolves the current-life `run.strongMetaSnapshot`.

No core engine or schema file was changed for v42.

## UI closure

`src/ui/app.ts` now renders a Strong Meta section during pre-run creation, after the existing Hard Work package section. The selector enumerates only rewards that are both owned and active in `strongMetaRegistry`, then uses the registry class to split them into Keystone and Specialist choices.

The UI imports the accepted capacities (`STRONG_META_KEYSTONE_CAPACITY = 1`, `STRONG_META_SPECIALIST_CAPACITY = 2`) instead of inventing a second rule system. Selecting a different Keystone replaces the current Keystone through the existing engine command. Once two Specialists are selected, unselected Specialist controls are disabled while selected controls remain removable; the engine still remains the authority and revalidates every command.

`palace.true.cap-200` is presented as a normal Specialist because the accepted registry classifies it as `specialist`, so it consumes one of the two Specialist slots. Source Method / inherited knowledge is not enumerated as a selectable reward: automatic knowledge remains in `strongMeta.knowledge.inheritedKnowledgeIds` and is carried into `automaticKnowledgeIds` by snapshot resolution. The UI explicitly explains that automatic inherited knowledge does not consume Strong Meta slots.

Ordinary Hard Work packages remain in the existing `hardWorkNewStartHTML()` section and do not enter the Strong Meta slot system. Owned/imported Strong Meta rewards are not auto-selected; the selector only reflects `preferredSelection`. Existing pre-run selections survive save/reload. Once creation finishes, the selector disappears and the immutable current-run snapshot remains engine-owned.

## Player-facing copy

Added new RU/EN keys only for the v42 selector (`ui.strongMeta.*`). Reward labels resolve through the existing `unlock.<rewardId>.label` namespace when an assembled content overlay supplies one, with a human-readable non-ID fallback. The accepted 21-row v40 localization repair was not copied or repeated on this branch.

## Focused coverage

Added `tests/strong-meta-player-ui-v42.test.ts`. It covers: owned rewards remain unselected by default; an owned Keystone can be selected; `palace.true.cap-200` is a Specialist; two Specialists fill capacity and block a third unselected Specialist; selected Specialists remain removable; Source Method-style automatic knowledge is not selectable; Hard Work is outside the Strong Meta selector; preferred selection survives reload; and `finishCreation` freezes the chosen Keystone/Specialists plus automatic knowledge into `run.strongMetaSnapshot`.

Added shared source/localization assertions in `tests/strong-meta-ui-localization-v42-v43.test.ts`.

## Result

v42 implementation is complete on the branch. No Strong Meta reward math, registry semantics, ownership rules, persistence schema, or current-run snapshot semantics were changed.
