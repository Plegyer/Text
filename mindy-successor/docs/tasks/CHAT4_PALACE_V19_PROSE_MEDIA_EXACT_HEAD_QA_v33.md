# Chat 4 — Palace v19 Prose / Media Exact-Head QA v33

Status: **EXACT-HEAD CONTENT QA COMPLETE — v19 SCOPE GREEN; INHERITED v18 EXECUTABLE BLOCKERS REMAIN**  
Owner: Chat 4  
QA branch: `chat4/palace-exact-head-qa-bundle-v32`

## Frozen producer

Verified producer:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Branch/head comparison:

- status: **identical**
- ahead: **0**
- behind: **0**

The producer branch was not mutated.

v19 is 12 commits ahead of frozen v18:

`67f948d185883d8e706dad522e5010bff8e2bd48`

The v18 -> v19 file delta contains prose/localization/presentation/task artifacts and the v19 focused test. It contains **no runtime TypeScript production source change**.

## Exact-head workflow evidence

Workflow:

`Chat4 Palace v32-v34 exact-head QA`

Run:

`37465180151`

v19 job:

`112274304057`

Exact SHA guard:

**PASS**

`npm ci`:

**PASS**

`npm run build`:

**PASS**

The job aggregate is red because v19 inherits the v18 catalog capability defect and also carries historical test-typing errors. The exact run records:

- `typecheck=failure`
- `validate=failure`
- `build=success`
- `focused=failure`

The three requested v18/v19 focused test files fail during catalog construction with the inherited capability error before their assertions run. That inherited executable defect is owned by v32/preassembly repair and does not represent a v19 prose/media mechanics change.

No full CI was run.

## Independent mechanical-freeze audit

Chat 4 independently compared the exact v18 and v19 JSON structures, not just the producer handoff text.

Deep leaf-diff results:

| File | Changed leaves | Allowed fields observed |
| --- | ---: | --- |
| `content/definitions.json` | 10 | action scene text; ending description/epilogue |
| `content/packs/palace-invitation.json` | 8 | title/label/text/variant text |
| `content/packs/palace-progression.json` | 10 | choice text/variant text |
| `content/packs/palace-outcome-finalize.json` | 12 | title/label/text/variant text |
| `content/packs/palace-prince-confrontation.json` | 20 | label/text/variant text |

No v18 -> v19 difference was found in:

- conditions;
- effects;
- costs;
- action mode;
- quest IDs/stages;
- transitions;
- Palace cadence/economy;
- route-ready facts;
- Prince defeat writer semantics;
- Return Home commit mechanics.

Result:

**NO MECHANICS CHANGE — PASS**

The inherited `palace-outcome-finalize` capability-read omission is byte-for-byte still present in v19; v19 did not introduce it.

## Localization parity

Chat 4 fetched the exact v19 localization blob:

`64922de3b6aab606f9b2932853e6bbd686766b6a`

and directly checked the release-critical Palace accessibility and ending keys.

Checked:

- five Palace presentation prefixes x `alt` / `caption`;
- four Palace endings x `title` / `description` / `epilogue`.

Result:

- required keys checked: **22**
- missing RU values: **0**
- missing EN values: **0**

The frozen v19 producer's own broader static audit covers **97 required Palace localization entries** with:

- missing RU: **0**
- missing EN: **0**

Result:

**LOCALIZATION PARITY — PASS**

## Presentation / media mappings

Chat 4 fetched exact v19 presentation blob:

`02c9a19eee0366131f793ed9e141b33a93f213b3`

and checked the canonical Palace slot roster.

Result:

- expected Palace slots: **19**
- mapped Palace slots: **19**
- invalid sources: **0**

Every mapped Palace slot uses exactly one of:

- `assets/stage-town.svg`
- `assets/stage-room.svg`

Both files exist at the exact v19 head.

No external media URL or absent dedicated Palace asset path is used.

Result:

**PRESENTATION / MEDIA — PASS**

## D48 fallback behavior

The v19 implementation uses the D48-authorized neutral project-owned fallback assets rather than fabricating missing dedicated Palace art.

Dedicated Palace art remains an optional production upgrade. Missing dedicated D48 assets are **not** a mechanics or assembly blocker while the valid neutral fallbacks remain.

Stop if Chat 2 introduces a dedicated Palace asset path before that asset actually exists.

Result:

**D48 FALLBACK — PASS**

## Palace ending copy

Exact v19 RU/EN ending keys are present for:

- `ending.palace.service-life`
- `ending.palace.court-power`
- `ending.palace.inner-truth`
- `ending.palace.return-home`

The exact English Return Home epilogue preserves that:

- the origin trace is verified;
- crossing does not erase the successor world;
- the Palace and its people remain real;
- the protagonist recognizes the original world after crossing.

The exact Inner Truth epilogue explicitly refuses to invent the missing displacement cause.

Result:

**ENDING COPY — PASS**

## D49 reveal boundaries

Independent v18 -> v19 prose inspection confirms:

- invitation does not name `Threshold Archive` / `inter-world Threshold`;
- duty 12 presents an authenticated anomaly without canonical Threshold naming;
- duty 15 first names the Palace Concordance / Threshold Archive / Threshold context;
- duty 15 still says the original displacement cause is unknown;
- Prince confrontation remains evidence/reconstruction rather than combat;
- Prince prose does not turn the Custodian into a god/avatar/combat boss;
- Prince reconstruction preserves the unresolved original cause;
- Return Home does not make the successor world a dream/simulation or destroy it.

Result:

**D49 REVEAL / LORE BOUNDARY — PASS**

## Inherited executable blockers

v19 inherits the v32 capability blocker:

`read worldFact palace.outcome.service-life-ready`

from the unchanged `palace-outcome-finalize` mechanics.

It also includes additional test-only TypeScript diagnostics in:

`tests/palace-final-prose-media-v19.test.ts`

alongside the inherited v18 test typing diagnostics.

These must be repaired/adapted only on the Chat 2 assembly branch before the post-assembly executable gate. They do not authorize a prose/media or Product-semantic rewrite.

## Disposition

For the actual v33 scope, exact v19 passes:

- exact SHA identity;
- RU/EN release-critical parity;
- 19/19 Palace presentation mapping;
- existing fallback asset integrity;
- Palace ending copy;
- D48 fallback policy;
- D49 reveal/lore boundaries;
- independent no-mechanics-change audit.

The v19 content layer is therefore accepted as a **selective Palace prose/localization/presentation source**.

Its executable focused test cannot be called green at the frozen head because the inherited v18 catalog capability defect prevents catalog construction. Chat 2 must carry the narrow v32 assembly repair before executing the final v19-focused test.

**v33 COMPLETE**
