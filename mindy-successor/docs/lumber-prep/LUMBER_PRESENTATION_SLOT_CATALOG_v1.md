# Lumber Presentation Slot Catalog v1

Status: ISOLATED PRESENTATION MAPPING DRAFT. No assets are required and nothing is wired into the live presentation catalog.

Authority:
- GIF_CENTRAL_STAGE_CONTRACT_v1.md
- CAREER_LUMBER_DRAFT_v0.md
- LUMBER_RELATIONSHIP_CHAIN_v0.md
- FOREST_ACTIVITY_SLICE_v0.md
- PRODUCT_ACCEPTANCE_SLICE_v0.md

## 1. Rules

- Mechanics emit stable `presentationId`; they never branch on asset filenames.
- GIF is the preferred dynamic format.
- A slot can be reused by multiple event/text variants.
- Unique GIF priority: endings -> major career milestones -> major relationship milestones -> major Activity encounters/results -> ordinary shifts.
- Missing GIF must fall back to static/parent/location/text without changing mechanics.
- A pending scene persists its resolved presentationId for deterministic reload.
- No gameplay effect depends on GIF timing/frame completion.

## 2. Fallback categories

Stable fallback categories for this Lumber slice:

- `fallback/job/lumber/shift` — generic Lumber work still/static.
- `fallback/job/lumber/event` — generic Lumber career milestone still/static.
- `fallback/relationship/lumber-foreman` — neutral Foreman dialogue still/static.
- `fallback/night/lumber-foreman` — neutral evening/night Foreman still/static.
- `fallback/activity/forest` — generic Forest Activity still/static.
- `fallback/ending/lumber` — Lumber ending still/static.
- `fallback/location/forest` — neutral forest location.
- `fallback/location/town` — neutral town/hub fallback.
- final fallback: text-only central stage.

The live presentation data can map these categories to actual media later.

## 3. Reusable ordinary shift slots

| presentationId | Visual situation | Expected reuse | Static fallback |
|---|---|---|---|
| `job/lumber/shift/spring/mud-access` | spring mud/water access work | S01 and compatible spring text variants | `fallback/job/lumber/shift` |
| `job/lumber/shift/spring/road-work` | spring damaged road/logistics repair | S02 variants | `fallback/job/lumber/shift` |
| `job/lumber/shift/shared/paired-work` | paired/crew work with Foreman or crew | S03 and Foreman overlays in any season | `fallback/job/lumber/shift` |
| `job/lumber/shift/summer/felling` | ordinary summer felling | S04 and compatible summer work | `fallback/job/lumber/shift` |
| `job/lumber/shift/summer/distant-plot` | distant summer work area | S05 | `fallback/job/lumber/shift` |
| `job/lumber/shift/summer/fire-risk` | heat/fire-risk work context | S06 | `fallback/job/lumber/shift` |
| `job/lumber/shift/autumn/sorting` | autumn sorting/processing | S07 | `fallback/job/lumber/shift` |
| `job/lumber/shift/autumn/logistics` | autumn loading/transport pressure | S08 | `fallback/job/lumber/shift` |
| `job/lumber/shift/autumn/tracks` | ordinary work intersecting tracks/migration clue context | S09 until clue is resolved | `fallback/job/lumber/shift` |
| `job/lumber/shift/winter/frozen-route` | winter frozen access/haul | S10 | `fallback/job/lumber/shift` |
| `job/lumber/shift/winter/heavy-cut` | difficult/high-value winter cut | S11 | `fallback/job/lumber/shift` |
| `job/lumber/shift/shared/tool-repair` | tool repair/maintenance | S12 and compatible repair text | `fallback/job/lumber/shift` |
| `job/lumber/shift/shared/heavy-tool` | reinforced-axe capability choice | capability overlays; optional asset | `fallback/job/lumber/shift` |

These slots are intentionally reusable. A unique GIF per repeatable event is not required.

## 4. Career milestone slots

| presentationId | Situation | Media priority | Static fallback |
|---|---|---|---|
| `job/lumber/event/accepted-hand` | L0 -> L1 first production milestone | high | `fallback/job/lumber/event` |
| `job/lumber/event/trusted-worker` | L1 -> L2 trusted-worker milestone | high | `fallback/job/lumber/event` |
| `job/lumber/event/route-veteran` | Veteran-track route acknowledgement | medium | `fallback/job/lumber/event` |
| `job/lumber/event/route-forewoman` | Forewoman-track opening/management problem | high | `fallback/job/lumber/event` |
| `job/lumber/event/route-forest` | Forest-track opening after accepted clue/result | high | `fallback/job/lumber/event` |
| `job/lumber/event/forest-return` | Lumber reaction after Forest Activity result | high | `fallback/job/lumber/event` |
| `job/lumber/event/outcome-ready` | non-ending career acknowledgement when outcome conditions are ready | medium; can reuse | `fallback/job/lumber/event` |

Text variants for strength/precision/coordination/wits choices can share the same milestone media unless the staging is materially different.

## 5. Foreman relationship slots

| presentationId | Situation | Slot type | Static fallback |
|---|---|---|---|
| `relationship/lumber-foreman/professional/open` | Foreman notices player after career milestone | major relationship milestone | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/trusted/milestone` | professional -> trusted | major relationship milestone | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/route/professional` | explicit professional route response | reusable route scene | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/route/close` | explicit close-route response | reusable route scene | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/route/rival` | explicit rival-route response | reusable route scene | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/external-result/default` | reaction to ledger/clue/forest result | reusable external-result scene | `fallback/relationship/lumber-foreman` |
| `relationship/lumber-foreman/resolved` | later authored relationship resolution | high if/when authored | `fallback/relationship/lumber-foreman` |

No unique GIF is required for every dialogue line or route choice.

## 6. Night slots

| presentationId | Situation | Slot type | Static fallback |
|---|---|---|---|
| `relationship/lumber-foreman/night/problem-reveal` | trusted Night meeting revealing the external crew/forest problem | major relationship/night milestone | `fallback/night/lumber-foreman` |
| `relationship/lumber-foreman/night/general` | compatible voluntary Night follow-up | reusable Night scene | `fallback/night/lumber-foreman` |

Season-specific text can reuse these IDs. A season-specific Night media override is optional, not required.

## 7. Forest Activity slots

### Route context
| presentationId | Situation | Static fallback |
|---|---|---|
| `activity/forest/route/logging-road` | Logging Road route context | `fallback/activity/forest` |
| `activity/forest/route/hunter-trail` | Hunter Trail route context | `fallback/activity/forest` |
| `activity/forest/route/old-boundary` | Old Boundary Path context | `fallback/activity/forest` |

### Challenge family
| presentationId | Situation | Static fallback |
|---|---|---|
| `activity/forest/encounter/navigation` | route choice/navigation challenge | `fallback/activity/forest` |
| `activity/forest/encounter/physical-obstacle` | rough route/obstacle challenge | `fallback/activity/forest` |
| `activity/forest/encounter/anomaly` | interpretation/ritual anomaly challenge | `fallback/activity/forest` |

### Capability-specific optional overrides
| presentationId | Situation | Static fallback |
|---|---|---|
| `activity/forest/tool/rope-route` | rope-kit route solution | `activity/forest/encounter/physical-obstacle` |
| `activity/forest/tool/heavy-wood` | reinforced-axe obstacle solution | `activity/forest/encounter/physical-obstacle` |
| `activity/forest/tool/preserve-specimen` | preservation-kit extraction | `fallback/activity/forest` |
| `activity/forest/tool/old-boundary-token` | token unlock/entry moment | `activity/forest/route/old-boundary` |

### Results
| presentationId | Situation | Media priority | Static fallback |
|---|---|---|---|
| `activity/forest/result/success` | qualifying Activity success/result return | high | `fallback/activity/forest` |
| `activity/forest/result/escape` | escape without full objective result | medium | `fallback/activity/forest` |
| `activity/forest/result/failure` | forced exit/failure | medium | `fallback/activity/forest` |

The exact forest truth is not depicted as unique lore here; these are stable mechanical/presentation slots only.

## 8. Ending slots

| presentationId | Ending family | Media priority | Static fallback |
|---|---|---|---|
| `ending/lumber/hard-work` | Lumber Hard Work | highest | `fallback/ending/lumber` |
| `ending/lumber/forewoman` | Forewoman / management outcome | highest | `fallback/ending/lumber` |
| `ending/lumber/forest-compact` | Forest systemic outcome family | highest | `fallback/ending/lumber` |

Eligibility does not automatically show/commit the ending media. Ending presentation belongs to explicit commitment/completion flow.

## 9. Central-stage sequence examples

Ordinary milestone cascade:

```text
job/lumber/shift/summer/felling
-> job/lumber/event/accepted-hand
-> relationship/lumber-foreman/professional/open
-> hub presentation
```

Forest return cascade:

```text
activity/forest/result/success
-> job/lumber/event/forest-return
-> relationship/lumber-foreman/external-result/default
-> hub presentation
```

Each swap uses the same central media box. No media swap charges Energy.

## 10. Asset-production notes

Highest unique-asset priority:
1. `ending/lumber/*`;
2. `job/lumber/event/accepted-hand`, `route-forewoman`, `route-forest`, `forest-return`;
3. `relationship/lumber-foreman/trusted/milestone` and `night/problem-reveal`;
4. `activity/forest/result/success` and major challenge contexts;
5. repeatable shift GIFs last.

A first playable slice may safely use fewer actual GIFs than presentation IDs because stable IDs can map to shared media/fallbacks.

## 11. Open presentation decisions

- Exact GIF/static filenames.
- Exact aspect/crop metadata.
- Whether each season gets a dedicated base Lumber GIF or some seasons share one.
- Whether route-specific Foreman responses need unique animation.
- Final alt text after prose/art is authored.
