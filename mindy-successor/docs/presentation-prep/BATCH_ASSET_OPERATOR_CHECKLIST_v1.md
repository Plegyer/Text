# Batch Asset Operator Checklist v1

Purpose: repeatable operator procedure for importing or replacing a batch of GIF/static presentation assets across later full-game production.

This workflow is semantic-ID driven and does not require manual source-path editing.

## 1. Prepare batch manifest

For every asset row include:
- exact semantic `presentationId`;
- intended media kind;
- approved asset file;
- alt/accessibility text;
- static fallback;
- text fallback;
- reuse group;
- Product/content approval reference if the scene was previously OPEN.

Do not accept filename-only rows.

## 2. Validate semantic IDs

For the whole batch:

- every `presentationId` exists or is explicitly approved by authored content;
- no duplicate exact IDs;
- no dotted/slash aliases;
- no underscore/kebab aliases;
- no route/challenge slug collision;
- no hidden-career ID silently collides with an ordinary-career namespace;
- no shipped ID is renamed.

If any row fails, reject the batch before persistence.

## 3. Validate reuse groups

A reuse group may contain multiple semantic IDs.

Confirm:
- reuse group is media metadata only;
- distinct gameplay scenes remain distinct IDs;
- one shared GIF does not become the semantic identity;
- reuse is visually appropriate for all rows.

## 4. Validate fallback

For every row:

- static fallback exists or a semantic fallback chain is valid;
- text fallback is non-empty where required;
- fallback graph has no cycle;
- missing GIF remains non-fatal;
- animations-off remains understandable.

The batch must not remove a valid shipped fallback merely because new media is added.

## 5. Validate files

Check:
- file kind matches declared media kind;
- managed/portable reference only;
- no absolute path;
- no parent traversal;
- no unsafe external URL;
- no duplicate file accidentally assigned under conflicting metadata;
- alt/accessibility text is present.

## 6. Import batch

Import all approved media into the managed presentation asset workflow.

Do not change:
- gameplay definitions;
- event/course/route/ending IDs;
- conditions/effects;
- inventory/capabilities;
- rewards;
- save schema.

## 7. Preview — animations on

For each semantic ID:

- open the exact authored scene/context;
- verify the intended media candidate is selected;
- verify text/UI still identifies the correct gameplay scene;
- verify reused media does not make two distinct identities indistinguishable in state/debug metadata;
- verify no duplicate candidate appears.

## 8. Preview — animations off

Disable animations for the entire batch.

Verify:
- same semantic presentation IDs;
- static/text fallback active;
- same gameplay controls;
- same available actions;
- no mechanical state changes;
- no scene becomes blocked waiting for animation.

## 9. Missing-primary injection

For a representative row in each reuse group:

- make the new primary unavailable;
- confirm static/semantic/text fallback resolves;
- confirm gameplay identity remains unchanged.

If a batch contains critical unique scenes, test each one.

## 10. Save/reload smoke

Choose representative boundaries from the batch:

### Action/result
- save after result;
- reload;
- no effect replay.

### Pending scene
- save before choice;
- reload;
- eventId + variantId + presentationId stable.

### Night
- save before/after Night choice;
- no duplicated payment/effect.

### Activity
- save route/checkpoint state;
- presentation remains gameplay-state driven.

### Ending
- save committed/completed state;
- ending identity remains stable.

Never serialize:
- GIF frame;
- playback timestamp;
- loop count;
- transient preview state.

## 11. Batch rollback

Rollback one row, then one full reuse group, then the full batch.

Verify:
- shipped fallback returns;
- remaining override entries stay deterministic;
- no orphan ID remains active;
- export/import ordering stays stable;
- gameplay/save state is unchanged.

## 12. Zero gameplay mutation check

Compare before/after gameplay state for the batch.

Must remain unchanged by:
- import;
- preview;
- animations toggle;
- replacement;
- rollback.

Check at minimum:
- resources;
- stats;
- School/career progression;
- inventory/capabilities;
- Activity route/checkpoint;
- Night state;
- ending state;
- Meta state;
- RNG state.

## 13. Batch acceptance

A batch passes only if:

1. semantic manifest validates;
2. duplicate/collision audit passes;
3. fallback validation passes;
4. asset files validate;
5. animations-on preview passes;
6. animations-off preview passes;
7. missing-primary fallback passes;
8. save/reload smoke passes;
9. rollback passes;
10. zero gameplay mutation is confirmed.

## 14. Failure handling

If any validation fails before persistence:
- reject the whole batch or isolate the bad row;
- keep current active presentation set unchanged.

If preview/save/rollback reveals a defect:
- disable or remove only the affected override;
- return to shipped fallback;
- do not patch gameplay mechanics to accommodate an asset.

## 15. Production scaling rule

This checklist is designed for:
- one asset;
- one reuse group;
- one career batch;
- full roster production.

The workflow remains the same because semantic IDs, fallback policy and gameplay ownership do not change with batch size.
