# Chat 3 — D38 Activity Ending Content / Presentation v17

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 CONTENT ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/activity-ending-content-presentation-v17`  
Exact base: `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`  
Implementation head before this documentation commit: `5306fbf4c72caed42291e62f2eecba3e6e348d2c`

> Final frozen SHA is reported after this documentation commit.

## Scope

v17 finishes the player-facing content and presentation layer for the three locked D38 Activity endings without changing their mechanics.

Stable IDs remain exactly:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

Stable Specialist reward IDs remain exactly:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

## Final player-facing ending copy

### Pathfinder

Stable ID:

`ending.activity.pathfinder`

Final title:

- RU: **За пределами карты**
- EN: **Beyond the Map**

The final description presents the ending as cross-region route knowledge rather than a career outcome.

The epilogue centers on a working atlas built from routes, warnings, dates, and contacts. It explicitly avoids implying that the reward automatically makes routes safe or shorter.

### Preservation

Stable ID:

`ending.activity.preservation`

Final title:

- RU: **Сохранённое невозможное**
- EN: **The Impossible Preserved**

The final description frames extracted samples, records, and patterns as evidence that can be preserved, checked, and passed on.

The epilogue turns those finds into a durable field archive without claiming that the character stops regional change or failure.

### Network

Stable ID:

`ending.activity.network`

Final title:

- RU: **Нити через границы**
- EN: **Threads Across the Boundaries**

The final description frames field contacts, guides, and access relationships as a real expedition network without turning trust into a universal access bypass.

The epilogue emphasizes distributed contacts rather than a faction, headquarters, career, or universal pass.

## RU / EN epilogue presentation seam

Before v17 the engine stored the ending epilogue as authored fallback text and the ending screen displayed the final journal line directly.

v17 does not change ending state or completion mechanics.

The ending screen now resolves:

`ending.<stable-ending-id>.epilogue`

through the existing localization bundle only when the run is already `ended`.

This makes all three final epilogues actually player-facing in both RU and EN while leaving engine completion, RunResult, reward application, and saves unchanged.

## Specialist reward presentation copy

The existing locked Specialist names are retained as final reward labels:

### Surveyor's Atlas

ID:

`specialist.activity.surveyors-atlas`

RU label:

**Атлас землемера**

EN label:

**Surveyor's Atlas**

The RU/EN description states the once-per-region 1 Field Time -> 0 Field Time survey effect, the 4 Field Time maximum direct saving, and the no-unlock/no-gate-bypass firewall.

### Field Archive Protocol

ID:

`specialist.activity.field-archive`

RU label:

**Протокол полевого архива**

EN label:

**Field Archive Protocol**

The RU/EN description states legal `activity-secure-eligible` acquisition, one secured result per region, maximum four per run, survival through later escape/failure, and no result creation or acquisition waiver.

### Expedition Contact Network

ID:

`specialist.activity.contact-network`

RU label:

**Сеть экспедиционных контактов**

EN label:

**Expedition Contact Network**

The RU/EN description states normal region unlock first, one authored introduction per region, maximum four per run, and no bypass of career, relationship, item, Palace, Secret Debt, or ending gates.

No active Specialist runtime or extra Specialist slot was added here. Chat 2 still owns canonical current-main binding.

## Presentation-slot mapping

Three ending slots are now explicitly mapped:

### `ending/activity/pathfinder`

Current safe project-owned reuse:

`assets/presentation/forest-route-default-v1.svg`

Reason:

the image is a neutral authored Activity route image and does not imply a specific career, faction, boss, or required equipment.

Its accessibility copy explicitly says that it is a representative mapping visual and does not mean the ending is Forest-only.

### `ending/activity/preservation`

Current safe project-owned reuse:

`assets/stage-town.svg`

Reason:

there is no safe existing archive/research image that does not imply School, Merchant, Hunter, or another specific route. The town image is intentionally neutral.

### `ending/activity/network`

Current safe project-owned reuse:

`assets/stage-town.svg`

Reason:

career Assassin/Tavern/Guard imagery would falsely imply a required career or faction. The town image safely represents the city as the convergence point of regional contacts.

## Accessibility

Every new ending presentation override has:

- a stable localized `altKey`;
- RU alt text;
- EN alt text;
- RU caption;
- EN caption.

Captions state when a visual is temporary safe reuse rather than dedicated final art.

The existing media renderer already derives `.caption` from localized `.alt` keys, so no presentation runtime extension was required.

## Missing-asset manifest

Added:

`content/activity-ending-missing-assets-v17.json`

It contains exactly three genuinely absent dedicated assets:

1. Pathfinder — dedicated cross-region atlas/survey-table final art;
2. Preservation — dedicated field-archive / secured-sample final art;
3. Network — dedicated multi-contact regional-network final art.

Each row records:

- stable ending ID;
- presentation ID;
- desired art brief;
- current safe project-owned reuse;
- the semantic limit of that reuse.

No fake dedicated asset was created and no career-specific image is presented as a universal Activity-ending visual.

## Mechanics preservation

Static comparison against frozen v16 confirms:

- all Activity definitions are unchanged;
- the total ending roster is unchanged;
- for each D38 ending, the following are JSON-identical to frozen v16:
  - stable ID;
  - eligibility conditions;
  - reward ID;
  - `metaRewards`;
- every non-D38 ending definition is unchanged.

The only D38 definition fields edited in v17 are:

- `title`;
- `description`;
- `epilogue`.

Core files unchanged from frozen v16:

- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/core/hardWorkMeta.ts`
- `src/core/presentation.ts`

Therefore v17 does not change:

- D38 eligibility;
- D16 commit/completion behavior;
- Specialist ownership IDs;
- D28 capacity;
- Activity runtime;
- 2-Energy entry;
- Activity XP policy;
- Palace rules;
- Secret Debt rules.

## Files added / changed

Added:

- `content/activity-ending-missing-assets-v17.json`
- `tests/activity-ending-content-presentation-v17.test.ts`
- this handoff document

Changed:

- `content/definitions.json` — final RU fallback titles/descriptions/epilogues only;
- `content/localization.json` — final RU/EN ending and Specialist copy + alt/caption;
- `content/presentation.json` — three explicit ending-slot overrides;
- `src/ui/app.ts` — localized ended-state epilogue display only.

## Focused QA authored

Added:

`tests/activity-ending-content-presentation-v17.test.ts`

Coverage includes:

- exact stable ending IDs;
- final RU/EN ending titles;
- RU/EN descriptions;
- RU/EN epilogues;
- exact stable reward IDs;
- exact explicit unlock ownership seams;
- Specialist reward presentation copy;
- exact ending presentation slots;
- alt/caption RU/EN coverage;
- missing-asset manifest exactness;
- localized ended-screen epilogue consumer.

## Static audits performed through GitHub connector

No full CI was initiated.

### Mechanics preservation audit

Result:

- **45 / 45 PASS**
- **0 failures**

Checks include:

- all Activity definitions unchanged;
- ending count unchanged;
- D38 ID/conditions/reward/metaRewards unchanged;
- all unrelated endings unchanged;
- only D38 title/description/epilogue changed.

### Content / presentation / accessibility audit

Result:

- **46 / 46 PASS**
- **0 failures**

Checks include:

- all final RU/EN ending copy present;
- all Specialist RU/EN labels/descriptions present;
- three presentation slots mapped;
- all referenced project-owned assets exist;
- every slot has localized alt and caption;
- missing-asset manifest contains exactly three dedicated visual gaps;
- ended screen consumes localized epilogue.

Combined focused static result:

- **91 / 91 PASS**
- **0 failures**

## Executable QA status

The GitHub connector available to Chat 3 does not provide a shell runner for this private worker branch.

Therefore v17 does **not** claim execution of:

- `npm run typecheck`
- `npm run validate`
- `npm run build`
- Node test runner
- full CI

Those executable checks remain the Chat 2 assembly gate.

Nothing was merged to `main`.

## Disposition

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
