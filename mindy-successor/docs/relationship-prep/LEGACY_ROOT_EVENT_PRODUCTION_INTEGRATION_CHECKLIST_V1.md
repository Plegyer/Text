# Legacy Root-Event Production Integration Checklist v1

Date: 2026-09-27
Owner: Chat 5
Baseline audited main: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

## 1. Root localization merge

Selectively merge approved entries from:

`prior-work/astra/prototype-m3.2/content/legacy-root-event-localization-v1.fixture.json`

Acceptance:
- exact current event, variant, choice and media IDs only;
- every entry has non-empty RU and EN;
- every key is additive or exact-identical against the integration head;
- `media.base.workshop.alt` remains exact-identical to the already shipped root entry;
- no gameplay fields are copied into root localization.

## 2. Current event identities only

The production set is exactly:

- `base.arrival`
- `base.order`
- `base.bran`
- `base.invite`
- `base.workday`
- `base.winter`
- `base.shelter`
- `gopher.arrival`
- `gopher.tavern-intro`
- `gopher.tavern-quest`
- `gopher.receipt`
- `gopher.tavern-resolution`
- `gopher.tavern-routine`
- `gopher.woods-intro`
- `gopher.hunt-intro`
- `gopher.landlord`
- `stage.goblin`

No locale-specific duplicate event or choice IDs.

## 3. Existing renderer consumption

Current shared event renderer already resolves:
- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `media.<mediaId>.alt`.

For those surfaces, root-string integration should require no new event-specific runtime code.

Fallback remains the embedded pack title/body/choice label/media alt when a key is absent.

## 4. Choice-body caveat / shared UI requirement

Current event resolution writes the embedded `sceneChoice.text` into gameplay journal state and, when relevant, `lastAction.text`. The pending-scene renderer does not consume `event.<eventId>.choice.<choiceId>.text`.

Therefore:
- merging choice-body localization keys is safe staging;
- do not resolve choice text into the Save according to the active locale;
- do not make Save identity locale-dependent;
- any future visible localized choice-outcome surface must derive presentation from stable event/choice identity, or otherwise preserve locale-neutral gameplay state.

This is the only shared presentation gap in this wave.

## 5. Pending-scene RU ↔ EN invariance

For each path in item 69:

1. Reach the event and stop while it is pending.
2. Snapshot:
   - `pending.eventId`;
   - `pending.variantId`;
   - `pending.presentationId`;
   - `pending.allowedChoiceIds`;
   - current media identity;
   - RNG state;
   - flags/metrics/resources/progression;
   - serialized gameplay Save.
3. Render RU.
4. Switch to EN.
5. Assert only localized title/body/choice-label/media-alt presentation changes.
6. Switch back to RU.
7. Assert the gameplay snapshot remains identical.

## 6. Choice-resolution invariance

Resolve the same exact current choice from equivalent pre-choice states under RU and EN.

Acceptance:
- same choice ID;
- same effects exactly once;
- same flag/metric/resource changes;
- same event history;
- same next reaction selection for the same RNG state;
- same gameplay Save outcome;
- no second application caused by locale switching.

The raw legacy journal text may remain the embedded source until Lead supplies a locale-neutral choice-outcome presentation consumer.

## 7. Media invariance

For each event/variant:
- same media ID in RU and EN;
- same media path;
- no asset rename/copy;
- only alt presentation changes;
- media selection must not consume additional RNG.

## 8. Ownership exclusions

Do not touch through this integration:
- School / `base.school`;
- ordinary poverty;
- Foreman;
- Chat3-owned Forest route/result content;
- Secret Debt / Product-open content;
- unrelated Lumber route/result namespaces.

`gopher.receipt` remains the existing legacy/tutorial event reached through the existing `forest-search` action. Its localization does not redefine Forest Activity ownership.

## 9. Exact-head CI

Run the existing project suite plus targeted Lead/QA renderer coverage on the exact integration commit containing:
- root localization changes;
- any shared presentation adjustment for choice-outcome rendering, if Lead chooses to add one.

Record the exact commit SHA. A passing run from an earlier head is not acceptance for a later head.

## 10. No wholesale worker merge

Do not merge `chat5/relationships-night-content-next` wholesale.

Use the exact selective-copy list in item 72 and reconcile against the current integration head.

## Final acceptance

This wave is production-accepted when:
- approved root strings are merged;
- pending event surfaces render RU+EN through existing stable IDs;
- media alt is bilingual;
- locale switching leaves pending/choice IDs, effects, flags, RNG and Save unchanged;
- any choice-body consumer preserves locale-neutral Save identity;
- exact-head CI is green.
