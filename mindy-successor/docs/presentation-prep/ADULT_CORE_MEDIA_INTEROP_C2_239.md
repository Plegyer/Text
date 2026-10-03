# C2-239 — Adult core media-manifest interoperability contract

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Asset shopping owner: Chat 6
Production adult media bindings: NONE

## Ownership split

Chat 6 owns:
- asset shopping inventory;
- candidate filenames;
- sourcing/procurement status inside its assigned scope.

Chat 2 owns:
- semantic presentation families;
- presentation IDs after runtime/content authority exists;
- media-manifest mapping;
- static/fallback requirements;
- presentation accessibility validation.

Neither side may use the other's artifact to create gameplay authority.

## Current manifest precedent

The current project-owned animation-source manifest uses fields such as:
- `sequenceKey`
- `presentationId`
- `exportReady`
- `candidateKey`
- loop timing metadata
- `staticFallback`
- `frames`
- `gifPath`

Its current invariants include:
- exact semantic presentation IDs;
- project-owned local sources;
- static fallback required;
- locale-neutral candidate keys;
- no gameplay fields;
- no gameplay RNG;
- no Save mutation;
- no GIF claim unless an actual GIF exists.

C2-239 preserves these principles.

## Chat 6 filename input

A Chat 6 filename is an **asset-candidate identifier only**.

Example shape:
- `career-<career>-adult-work-intimacy-a.gif`
- `career-<career>-night-intimacy-a.gif`
- `relationship-<career>-adult-intimacy-a.gif`
- `ending-<family>-adult-a.gif`

The filename can suggest a candidate semantic family, but it does not create:
- runtime event ID;
- presentation ID;
- partner identity;
- relationship stage;
- Night choice;
- ending commitment;
- adult-content eligibility.

## Interoperability states

### INVENTORY_ONLY

Chat 6 has a filename/candidate.

Chat 2 state:
- no production binding;
- no `presentationId`;
- no registry mutation;
- no claim that the file exists in project-owned assets.

### SEMANTIC_MATCH_PENDING_AUTHORITY

Filename appears compatible with a prepared Chat 2 family such as:
- work-adult;
- Night-adult;
- relationship-adult;
- route-adult;
- ending-adult.

But runtime/content consumer is missing.

Status:
- `PENDING_RUNTIME_ID`

### AUTHORITY_READY

Future runtime/content publishes an exact consumer.

Chat 2 may then define:
- exact `presentationId`;
- family classification;
- safe fallback;
- accessibility requirements.

The Chat 6 candidate is still not bound until the actual asset is available and validated.

### ASSET_READY

Actual project-owned media exists and passes media validation.

Only then may the manifest claim:
- actual local path;
- candidate key;
- exact semantic binding;
- static fallback.

### PRODUCTION_BOUND

Requires:
- exact runtime/content consumer;
- exact presentation registry slot;
- actual validated project-owned media;
- static fallback;
- RU/EN accessibility;
- required tests/CI.

## Filename-to-family hints

Filename token may suggest but never prove:

- `adult-work-intimacy` -> candidate `work-adult`
- `night-intimacy` -> candidate `Night-adult`
- `relationship-...-adult-intimacy` -> candidate `relationship-adult`
- route-specific name -> candidate `route-adult`
- `ending-...-adult` -> candidate `ending-adult`

Final semantic binding comes from Git runtime/content authority, not string parsing.

## Candidate keys

Future manifest `candidateKey` should remain:
- locale-neutral;
- stable;
- semantic-family aware;
- independent from RNG/gameplay state.

Candidate-key selection must not:
- change gameplay;
- select relationship route;
- decide voluntary/coercive state;
- decide ending.

## Static fallback

Every production-bound adult media entry requires a safe static fallback.

The static fallback must match:
- exact route/context where possible;
- voluntary/dependency classification;
- housing/privacy context where material.

Chat 6 is not required to provide gameplay fallback authority. Chat 2 validates the presentation fallback.

## Actual-file rule

Do not set a production `gifPath` merely because the shopping filename exists in a list.

A path is claimable only when:
- the actual file exists in the repository/project-owned asset set;
- format/path validation passes.

Until then:
- inventory filename remains planning metadata only.

## Manifest versioning

C2-239 does not modify the current v4 production manifest schema.

If future imported GIF assets require a different source representation than current frame-based sequences, Chat 2 must create an explicitly versioned manifest update at that future task checkpoint rather than overloading current fields.

## No reverse authority

Forbidden:
- asset filename -> gameplay event;
- asset filename -> presentation ID;
- asset inventory count -> required scene count;
- filename “relationship” -> romance;
- filename “night” -> NightFlow choice;
- filename “ending” -> ending eligibility.

All are:
- `NO_AUTHORITY_NOT_BINDABLE`

## Handoff checklist

For each future Chat 6 candidate Chat 2 may consume:
1. candidate filename;
2. actual project-owned file status;
3. semantic-family hint;
4. exact runtime/content consumer, if published;
5. exact presentation ID, if authorized;
6. safe fallback;
7. RU/EN accessibility;
8. validation/CI.

Missing item 4 keeps the asset:
- `PENDING_RUNTIME_ID`

## Firewall

C2-239 sources no media, changes no gameplay, invents no runtime IDs, binds no adult asset and does not modify Chat 6 inventory.
