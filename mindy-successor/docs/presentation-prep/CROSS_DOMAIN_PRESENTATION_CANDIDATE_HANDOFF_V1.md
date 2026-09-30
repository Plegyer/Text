# Cross-Domain Presentation Candidate Handoff v1

Status: C2-48 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Final candidate branch: `chat2/cross-domain-presentation-c2-37-48-final`
Final current-main base: `593f9936d72296557b36a0e0ca7d3c7bb780839c`

The exact frozen candidate head and exact-head repository check are recorded in PR metadata after CI completes. This handoff intentionally does not self-reference its own commit SHA.

## Queue scope

This candidate carries C2-37 through C2-47 onto the required fresh current-main base and prepares C2-48 freeze.

Covered domains:
- current ending presentation inventory;
- three existing Tavern endings;
- target Lumber Hard Work / Forewoman / Forest ending re-audit;
- current Lumber Foreman relationship surfaces;
- Forest Activity routes, returns and Forest-related Lumber event surfaces;
- ordinary-poverty presentation identities with Secret Debt excluded;
- current School teacher media surfaces after the accepted School depth wave;
- cross-domain source/accessibility/fallback/editor-replacement regression.

## Resync discipline

Earlier working branches were intentionally not used as final integration bases after main moved.

Final candidate base is current main `593f9936d72296557b36a0e0ca7d3c7bb780839c`.

Only queue-v5 presentation artifacts are carried:
- presentation docs;
- cross-domain presentation source manifest;
- focused presentation test;
- three new project-owned Tavern ending SVG assets.

No files already merged from PR #88 or PR #98 are re-added.

No gameplay/runtime file is rewritten to resolve main drift.

## Semantic coverage

The cross-domain manifest records:
- **38** existing semantic presentation IDs;
- **25** current-main exact static bindings;
- **13** prepared presentation-only overrides;
- **8** current School teacher catalog media surfaces.

Prepared semantic overrides:
- 3 existing Tavern ending IDs;
- 10 existing ordinary-poverty v2 event-variant IDs.

Current-exact semantic coverage includes:
- 3 target Lumber endings;
- 2 current relationship event slots;
- 10 Forest route/return/event-reaction slots;
- 10 already-covered ordinary-poverty slots.

The manifest documents but does not self-assign bespoke presentation for:
- `ending/guild-life`;
- `ending/scholar-life`;
- `ending/lumber-stay`.

## Presentation-only safety

Prepared overrides:
- preserve existing semantic IDs;
- use project-owned local static SVG sources;
- preserve current registry fallback identity;
- carry RU/EN alt + caption metadata;
- do not depend on animation timing;
- do not mutate gameplay definitions, conditions, effects, rewards, economy, RNG, Save identity/schema, story canon, relationship canon, Activity mechanics or School mechanics.

Secret Debt presentation/media identity remains excluded.

School teacher depth does not create new teacher presentation IDs: the accepted teacher-depth fixture adds content text only, while the eight current teacher catalog media identities remain the presentation surface.

## Validation contract

The focused regression checks:
- unique semantic presentation IDs;
- exact registry identity on current main;
- current fallback IDs;
- source existence;
- RU/EN accessibility for current exact and prepared slots;
- current-main exact binding where already shipped;
- prepared override resolution through a presentation-only patch;
- editor replacement by unchanged semantic ID;
- unchanged gameplay definitions and Save serialization;
- exact School teacher media identity/source plus presentation-only media replacement;
- Secret Debt exclusion and documented ending gaps.

## QA freeze

After one exact head receives green required repository CI, that exact head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`.

Unrelated coordination-only main drift after freeze does not authorize rebasing or cleanup.
