# Project-owned static media production audit v1

Status: COMPLETE / GREEN_AS_SELECTIVE_STATIC_SOURCE

Reviewed Chat 2 items:
`184–195`
on branch `chat2/presentation-replacement-next`.

Worker branch head at review:
`9bd5b52b76babdb3df9ded81ed8f80e1ed1e5afe`.

Current production main for semantic compatibility:
`1af3104c1e4c180019b965adac8e87e67de89347`.

The Chat 2 manifest records an older semantic baseline `ab53da4...`; PR45 and PR46 changed localization/presentation lookup and tests but did not replace the 39 reviewed production semantic presentation IDs.

## Actual repository assets

Item 191 manifest:
`content/presentation-drafts/project-owned-static-media-v1.json`
blob:
`9883830c20fc3f9ed600b9b15ddb7c707f609b9b`.

Manifest state:
- status: `STAGING_ONLY_NOT_ROOT_LOADED`;
- physical asset entries: 21;
- mapped current semantic IDs: 39;
- source root: `assets/presentation/`.

All 21 manifest paths were independently fetched from Git as real repository blobs.

Verified across every asset:
- file exists in the worker branch;
- distinct Git blob SHA for all 21 files;
- non-empty SVG source;
- valid opening/closing SVG element;
- `viewBox="0 0 1200 675"`;
- no external `http://`, `https://` or protocol-relative media reference;
- no `<script>`;
- no baked `<text>` element.

Therefore these are actual local repository assets rather than remote URLs, placeholders or documentation-only filenames.

## Asset set

Ten ordinary-career result assets:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

Reachable School:
- daytime study;
- Night study.

Ordinary poverty:
- street;
- cheap lodging;
- recovery/help;
- pressure.

Forest results:
- success;
- escape;
- failure.

Foreman:
- professional milestone;
- professional Night follow-up.

Total:
`21` physical SVGs.

## Project-origin provenance

Item 184 defines these files as project-authored original geometric/vector compositions created directly for the repository and prohibits:
- copied external vector paths;
- embedded external images;
- third-party characters/trademarks;
- external source dependencies.

Item 195 repeats the project-origin provenance:
`project-authored original SVG; created directly in Plegyer/Text presentation-production work`.

QA can verify local Git blobs and the absence of external embedded media; legal authorship beyond the repository's recorded provenance statement is not independently inferable from file bytes.

For project integration, this provenance is materially stronger than the rejected web-GIF sourcing path because there is no external media dependency or ambiguous host license.

## Current semantic IDs

The 39 mappings are current presentation identities for:
- ten `job/<career>/result/default` results;
- eight School lesson result IDs;
- current post-School / post-paid-lesson / post-Night-study events;
- ten current ordinary-poverty event presentation IDs;
- Forest success/escape/failure Activity return + reaction IDs;
- current Foreman milestone and Night follow-up IDs.

No new gameplay route/event/relationship ID is introduced by the manifest.

Important boundaries:
- Hunter asset maps only to ordinary `job/hunter/result/default`; no Forest/Hunter route semantics.
- School teacher-specific staged identities are not activated.
- poverty assets exclude Secret Debt.
- Forest result assets do not invent Old Boundary/Hunter/challenge mechanics.
- Foreman assets do not add relationship stages/routes.

## Build/distribution path

Current build contract copies:
`assets -> dist/assets`
recursively.

Item 193 test:
`tests/project-owned-static-media-build-v1.test.ts`
blob:
`d5e84f863e83a3251e7e93b60e95f2da20e7cf00`

requires:
- every manifest asset exists;
- SVG source sanity;
- no embedded external URL/script;
- every semantic ID exists in production `presentationSlots(catalog)`;
- normal build copies every source to `dist/<asset.src>`;
- built text bytes equal source bytes.

Thus selective integration has a concrete distribution regression rather than relying only on documentation.

The worker-branch test is not itself current-main CI evidence; it must run on the fresh selective integration head.

## RU+EN accessibility payload

Item 192:
`content/project-owned-static-media-localization-v1.fixture.json`
blob:
`22150f46a4faca397f2032a6cabf2d475483379f`.

Verified:
- 42 localization entries;
- 21 alt keys;
- 21 caption keys;
- missing RU: 0;
- missing EN: 0;
- locale-suffixed asset/key identities: 0.

All entries correspond to actual manifest assets; no fake localization entries are required for missing assets.

## No gameplay fields

Independent manifest key scan and item-193 recursive contract find no gameplay-owned fields such as:
- conditions;
- effects;
- reward/rewards;
- gameplay RNG;
- Energy/money cost;
- Save state;
- outcome ownership.

Manifest paths are local and presentation-only.

No shared runtime/schema/UI change is part of Chat 2 items 184–195.

## Coverage classification

Item 194 reports:
- 39 `UNIQUE_PROJECT_OWNED` semantic mappings;
- 41 `GENERIC_EXISTING` surfaces retained in the wider audit:
  - 40 ordinary-career seasonal shifts;
  - neutral Forest route;
- 0 missing in the targeted static-fallback scope;
- 8 School teacher media identities remain Product-open/staged.

The word `UNIQUE_PROJECT_OWNED` means the mapping uses new project-specific/family-specific repository art rather than a generic legacy fallback. It does not require one physical file per compatible semantic ID.

## Integration status

`GREEN_AS_SELECTIVE_STATIC_SOURCE`.

Safe source set:
- 21 SVG blobs;
- item-191 mapping manifest;
- item-192 RU+EN accessibility fixture;
- item-193 distribution/semantic regression;
- optional plan/coverage/handoff docs.

Not yet production-activated:
- manifest is explicitly staging;
- root localization does not yet contain these 42 keys;
- current presentation registry is not yet selectively bound to these files.

Lead must integrate on a fresh current-main branch, activate mappings through existing presentation infrastructure, run exact-head CI, and then verify post-merge main.

Do not merge the long-lived Chat 2 branch wholesale.
