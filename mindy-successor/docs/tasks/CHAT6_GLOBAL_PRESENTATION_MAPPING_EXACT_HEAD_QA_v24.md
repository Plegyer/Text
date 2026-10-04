# Chat 6 — Global Presentation Mapping Exact-Head QA v24

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 6  
QA branch: `chat6/qa-global-presentation-mapping-v24`

Frozen producer under test:

`chat6/global-presentation-mapping-producer-v23@f25069c369c449ce0efbfe57acf877f950b1dfea`

Producer scope:

- 93 additive presentation mappings only;
- no production behavior change outside presentation mapping.

No full CI was run.

---

## 1. Exact-head workflow identity

Focused workflow:

- workflow name: `Chat 6 v24 exact-head presentation QA`
- workflow file: `.github/workflows/chat6-v24-exact-head.yml`
- workflow ID: **374588239**

Green run:

- run number: **2**
- run ID: **37203184279**
- job name: `focused`
- job ID: **111438870283**
- conclusion: **success**

The workflow explicitly checked out:

`f25069c369c449ce0efbfe57acf877f950b1dfea`

with `fetch-depth: 0`.

The subsequent exact-SHA assertion passed.

---

## 2. Executable checks

All required exact-head checks passed.

### Checkout

- exact frozen v23 checkout: **PASS**
- SHA assertion: **PASS**

### Build gates

- `npm ci`: **PASS**
- `npm run typecheck`: **PASS**
- `npm run validate`: **PASS**
- `npm run build`: **PASS**

### Focused presentation bundle

Executed:

- `global-presentation-mapping-producer-v23.test.ts`
- `presentation-source-integrity-v9.test.ts`
- `project-owned-static-media-production.test.ts`
- `presentation-locale-accessibility-parity-v7.test.ts`
- `presentation-locale-accessibility-v9.test.ts`
- `presentation-full-roster-a11y-c2-117.test.ts`
- `product-presentation-semantic-ids.test.ts`
- `presentation-stale-semantic-id-validator-v6.test.ts`
- `presentation-production-reachability-c2-119.test.ts`
- `seasonal-static-media-production.test.ts`

Result:

- tests: **36**
- pass: **36**
- fail: **0**
- skipped: **0**
- cancelled: **0**

---

## 3. Palace presentation firewall

Executable comparison used:

base:

`f81788f046eafdafc8f9fbdc542793becfc6794c`

producer:

`f25069c369c449ce0efbfe57acf877f950b1dfea`

It extracted Palace presentation slots from both `content/presentation.json` versions and compared them structurally.

Result:

**Palace presentation firewall: unchanged**

No Palace presentation slot changed in v23.

---

## 4. Asset path integrity

The workflow recursively collected all local `src` entries from frozen v23 `content/presentation.json` and checked filesystem existence after build checkout.

Result:

**Presentation asset paths OK: 98**

Missing presentation asset paths:

**0**

No external source was required to satisfy the v23 presentation mappings.

---

## 5. Accessibility and semantic identity

The focused test bundle passed:

- RU/EN accessibility parity;
- full-roster accessibility coverage;
- product semantic presentation IDs;
- stale semantic-ID validation;
- source integrity;
- project-owned static media checks;
- production reachability.

This executable run confirms the v23 reuse mappings do not depend only on the prior static Git audit.

---

## 6. Initial QA infrastructure correction

The first workflow run was:

- run ID: **37203128270**
- job ID: **111438707083**

It did **not** reach project tests.

Reason:

the self-hosted Windows runner does not have the `pwsh` executable.

Important:

- `actions/checkout@v4` itself successfully checked out the exact frozen v23 SHA in that run;
- the failure occurred only in the QA workflow's shell declaration;
- no producer file was changed;
- no product test failed.

The QA workflow was corrected to use the runner's default Windows PowerShell.

Run 2 then completed all required checks green.

Run 1 is therefore a superseded QA-infrastructure failure, not a v23 product failure.

---

## 7. Frozen-producer disposition

Exact producer:

`f25069c369c449ce0efbfe57acf877f950b1dfea`

is executable-QA green for the v24 required scope:

- typecheck;
- validate;
- build;
- focused v23 mapping test;
- presentation/source inventory integrity;
- RU/EN accessibility parity;
- semantic presentation ID validation;
- Palace firewall;
- local asset path integrity.

No production change is required from Chat 6.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
