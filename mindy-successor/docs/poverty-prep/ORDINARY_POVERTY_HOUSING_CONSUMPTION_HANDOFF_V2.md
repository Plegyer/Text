# Poverty Housing Consumption Handoff v2

Status: C3-66 consumer-ready content handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `871a9a94e76e1df0449fdef513e9173bd9fce009`.

Source: `ordinary-poverty.housing-depth.v2`.

All eight variants already point at exact production `eventId + variantId` pairs. Integration can use the existing poverty-depth seam: publish the source RU/EN keys to root localization and append those exact mappings to `povertyDepthLookupEntries`.

No new runtime capability is required. Existing event effects, NightFlow, lodging costs, housing state and core fallback remain unchanged. Street/cheap/shared-lodging content remains ordinary poverty and does not create Secret Debt.
