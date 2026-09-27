# Poverty Localization Natural-Path Regression v1

Status: executable smoke specification for current ordinary-poverty production. Secret Debt is excluded.

## Street path

Use current engine helpers. Start normally, set winter day 30, perform one daytime action, dispatch EndDay, then choose lodging.street. Require pending event poverty-street-production.pressure-winter with variant default and NightEventResolution.

Resolve RU title, body, take-shelter label, and media.stage.outside.alt. Before locale change, capture serialized gameplay Save plus pending eventId, variantId, presentationId, RNG, event history, resources, metrics, progression, and NightFlow. Switch presentation locale to EN without gameplay dispatch. Assert every captured gameplay value is unchanged and the same localization keys resolve to non-empty EN.

Resolve take-shelter. Pending must clear, NightFlow must continue to VoluntaryNightChoice, and the safe choice must add no new effect. Reload with parseSave(JSON.stringify(state), catalog); pending must stay clear, history/state must match, and no reroll may occur. Finish night.sleep and assert one calendar advance.

## Cheap lodging path

Use autumn day 20. Run one daytime action, EndDay, choose lodging.cheap, and require poverty-cheap-production.shared-quiet-autumn/default. Check RU and EN title, variant text, settle-quietly label/text, and media.stage.room.alt around a locale switch with byte-identical gameplay Save. Resolve settle-quietly, reload, then finish night.sleep exactly once.

## Effectful companion

Use spring day 2 and naturally reach poverty-recovery-production.small-coin-help. Locale switching must leave money, pending identity, RNG, history, progression, and NightFlow unchanged. Resolve take-coins using the current production-pack effect as the expected value rather than hard-coding balance. Reload and prove the effect is not applied twice.

## Failure diagnostics

Report missing localization key, missing RU, missing EN, pending-identity drift, RNG mutation, gameplay-Save mutation, duplicated effect, reload reroll, or Secret Debt contamination as distinct failures.
