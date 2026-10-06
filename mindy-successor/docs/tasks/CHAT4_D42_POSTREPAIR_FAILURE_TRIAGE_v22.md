# Chat 4 — D42 Post-Repair Failure Triage v22

Status: **READY_FOR_CHAT2_REPAIR**  
Owner: Chat 4  
Branch: `chat4/d42-postrepair-failure-triage-v22`

Target under review:

`chat2/assembly-d42-night-current-main-20261004-v1@8e3f854a2607d103d1b22bd5da564089efedfc15`

Latest full CI:

- run: `37446088333`
- job: `112211176076`
- tests: **1087**
- pass: **1085**
- fail: **2**

No production runtime was modified by Chat 4.  
No full CI was run by Chat 4.

## 1. Exact remaining failures

### Failure 331

`C2-179 every published Guard event override maps to one exact frozen production event`

File:

`tests/guard-presentation-v16-c2-169-179.test.ts`

Current assertions:

```ts
const expected=new Set(
  catalog.events
    .filter(event=>event.sourceDomain==='guard')
    .flatMap(event=>event.variants.map(variant=>presentationIdForEvent(catalog,event.id,variant.id)))
);
assert.equal(expected.size,29); // PASS

const published=Object.keys(presentation.slots??{})
  .filter(id=>id.startsWith('job/guard/event/'));
assert.equal(published.length,29); // FAIL: actual 28
```

The CI stack points to the second assertion, line 249.

### Failure 332

`C2-180 every published Guard event override comes from one real frozen production event`

File:

`tests/guard-production-presentation-reachability-c2-180.test.ts`

Current behavior:

- all 29 `sourceDomain==='guard'` event presentation IDs are found in the live presentation registry;
- every one has a static override;
- `expected.size===29` passes;
- only the final cross-namespace comparison fails because
  `job/guard/event/*` contains 28 entries.

The CI failure is therefore not missing catalog backing and not missing static presentation backing.

---

## 2. Why v20 changed 28 -> 29

The v20 full-suite triage saw the pre-repair Guard test fail on the **first** count assertion:

`expected.size`

D42 adds:

`guard.night.case-debrief`

with:

```json
{
  "sourceDomain": "guard"
}
```

Therefore the catalog-derived Guard-source presentation ID set legitimately grows from 28 to **29**.

That v20 conclusion was correct for `expected.size`.

The mistake was applying the same +1 to the later assertion:

`published.length`

even though the failing run had stopped at the first assertion and had not yet proved that the `job/guard/event/*` namespace itself grew.

Repair commit `2012629ec4f3bc2e7db610dfefc1287fc5f51465` changed both values:

- `expected.size: 28 -> 29`
- `published.length: 28 -> 29`

Repair commit `a79826276ff75ed6b00ccf2446dffb282c6b142a` likewise changed the second Guard suite's catalog count to 29 while leaving its later equality:

`published.length === expected.size`

That equality is what is now exposed as stale.

---

## 3. The D42 routing contract

D42 intentionally gives Night-gap events dedicated semantic presentation IDs before generic career/relationship routing.

From `src/core/presentation.ts`:

```ts
NIGHT_CONTENT_GAP_PRESENTATION_IDS = {
  'guard.night.case-debrief':
    'night/guard/guard-night-case-debrief',

  'guard.night.partner':
    'relationship/guard-partner/guard-night-partner/default'
}
```

And `presentationIdForEvent` checks this D42 mapping first:

```ts
const nightContentGapId=presentationIdForNightContentGapChoice(eventId);
if(nightContentGapId)return nightContentGapId;
```

Only after that does generic career routing produce:

`job/<career>/event/...`

Therefore:

- the new case-debrief event **is** a Guard-source event;
- but its presentation ID is deliberately
  `night/guard/guard-night-case-debrief`;
- it must **not** increase the count of
  `job/guard/event/*`.

The Partner Night event has:

`sourceDomain: 'guard.partner'`

and intentionally maps to:

`relationship/guard-partner/guard-night-partner/default`.

So D42 adds two Guard-related presentation slots overall while adding zero slots to the old `job/guard/event/*` namespace.

---

## 4. Exact production evidence

Both accepted D42 Guard presentation slots exist on the target SHA.

### Professional case debrief

`night/guard/guard-night-case-debrief`

Static source:

`assets/presentation/career-guard-result.svg`

Alt key:

`presentation.static.guard.night.case-debrief.alt`

### Guard Partner

`relationship/guard-partner/guard-night-partner/default`

Static source:

`assets/presentation/career-guard-result.svg`

Alt key:

`presentation.static.guard.night.partner.alt`

The full-suite Guard aggregate presentation test is green:

- test 330:
  `C2-179 integrated 65 Guard surfaces have RU EN alt-caption parity and animation-off static safety`
  — **PASS**

The repaired assertion correctly observes **67 total Guard-related slots**, i.e. the previous 65 plus the two D42 Night surfaces.

The D42 contract tests are also green in the same run:

- test 451 — exact 12 accepted Night surfaces/effects: **PASS**
- test 452 — exact three normal-only private branches: **PASS**
- test 453 — save/reload + exactly-once calendar across all 12: **PASS**
- test 457 — D42 presentation and RU/EN localization bindings: **PASS**

There is no evidence of a missing D42 Guard production surface.

---

## 5. Classification

Both remaining failures are:

**TEST-ONLY STALE CROSS-NAMESPACE EXPECTATIONS**

They are not:

- missing Guard event content;
- missing Guard Night choice;
- missing presentation slot;
- missing static fallback;
- missing localization;
- runtime regression;
- content-loader regression;
- sourceDomain regression.

The correct counts are simultaneously:

- all `sourceDomain==='guard'` presentation IDs: **29**
- old generic `job/guard/event/*` namespace: **28**
- all Guard-related presentation slots matched by the broad Guard suite: **67**

These counts measure different sets and must not be forced equal.

---

## 6. Smallest safe repair

### File 1

`tests/guard-presentation-v16-c2-169-179.test.ts`

Keep:

```ts
assert.equal(expected.size,29);
```

Restore the generic job-event namespace count:

```ts
assert.equal(published.length,28);
```

Recommended hardening:

```ts
assert.ok(expected.has('night/guard/guard-night-case-debrief'));
assert.equal(published.length,28);
for(const id of published)assert.ok(expected.has(id),id+' exact catalog backing');
```

This explicitly documents why 29 total Guard-source event IDs do not mean 29 generic job-event slots.

### File 2

`tests/guard-production-presentation-reachability-c2-180.test.ts`

Keep:

```ts
assert.equal(expected.size,29);
```

Replace:

```ts
assert.equal(published.length,expected.size);
```

with:

```ts
assert.equal(published.length,28);
assert.ok(expected.has('night/guard/guard-night-case-debrief'));
```

Retain:

```ts
for(const id of published)assert.ok(expected.has(id),id+' catalog-backed');
```

The earlier loop already proves every one of the 29 sourceDomain Guard presentation IDs is live and has a static override, including the D42 Night ID.

---

## 7. Production-change disposition

**No production code change is needed.**

**No production content change is needed.**

Do not modify:

- `guard-night-gap-v10.json`;
- `content/presentation.json`;
- `src/core/presentation.ts`;
- D42 Night IDs;
- sourceDomain values;
- Night conditions/effects;
- NightFlow;
- localization;
- Guard career/relationship mechanics.

Changing `guard.night.case-debrief` to force it into `job/guard/event/*` would violate the accepted D42 semantic presentation routing and would be the wrong repair.

---

## 8. Suggested Chat 2 verification

After the two test-only corrections:

1. run the two Guard suites;
2. run `tests/night-content-gap-v10.test.ts`;
3. run the normal presentation/source-integrity focused bundle;
4. run typecheck / validate / build if required by the Chat 2 repair gate;
5. only Chat 2 decides/runs the next full CI.

Chat 4 does not run full CI in this triage lane.

---

## Final disposition

The repaired production branch is correct.

The v20 repair correctly changed the catalog-derived Guard-source set to 29, but incorrectly assumed the old generic `job/guard/event/*` namespace must also become 29.

D42 deliberately routes its new Guard case-debrief into the dedicated Night namespace, so the generic job-event namespace remains exactly 28.

Smallest repair: **two test-only assertion corrections; zero production changes.**

**READY_FOR_CHAT2_REPAIR**
