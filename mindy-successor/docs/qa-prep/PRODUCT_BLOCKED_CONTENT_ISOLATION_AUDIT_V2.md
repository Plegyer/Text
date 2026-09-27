# Product-Blocked Content Isolation Audit v2

Status: QA / Product isolation
Queue item: Chat 4 item 148
Baseline: current main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

## Audit method

Current main loads 17 root JSON packs from `content/packs/`. The root production pack directory, current `definitions.json`, and the current School/poverty/media worker candidates reviewed in items 139–147 were checked for accidental promotion of Product-blocked material.

Presence of an authoring document, localization draft or existing generic seam does not equal a Product decision.

## Secret Debt mechanics/rewards

Current root production pack directory has no Secret Debt pack. A text scan of all 17 loaded root packs found no `secret-debt`, `secret debt` or `lender` identity.

Chat3 item-140 ordinary-poverty localization delta was separately checked and contains no Secret Debt/lender content. Its 14 mapped event IDs all belong to the shipped PR37 ordinary-poverty packs.

Verdict: **ISOLATED / NOT PROMOTED**.

Authored bilingual Secret Debt material may remain in prep/staging, but mechanics, eligibility thresholds, outcomes and Meta rewards remain Product-blocked.

## School management/accounting public result

The current root School packs do not introduce a public School management/accounting result. A root-pack scan found no School `management` or `accounting` result identity.

The word `management` does exist elsewhere in current Lumber cross-system content/facts. That is not evidence that the unresolved School management/accounting public result has been selected.

Chat5 item-150 exact-course routing fixture explicitly leaves `managementPublicResultSelected: false`.

Verdict: **ISOLATED / NOT SELECTED**.

Localization copy must not invent a result label, reward or route conclusion for this unresolved School result.

## School Arcana/Forest public result

`arcana` legitimately exists as an ordinary School course identity/text family on main. That must not be confused with selecting an unresolved Arcana/Forest public result.

No current root School pack scan showed a School Forest public-result identity. Chat5 item-150 explicitly leaves `arcanaForestPublicResultSelected: false`.

Verdict: **ISOLATED / NOT SELECTED**.

RU+EN course localization may ship without implying any Arcana/Forest result semantics.

## Hunter / Old Boundary unresolved route semantics

Current main already contains legitimate baseline identities:

- ordinary career action `hunter.shift`;
- Forest Activity option `forest.route.old-boundary`;
- item `old_boundary_token` with capability `enter_old_boundary`.

Therefore the isolation rule is **not** “these IDs must be absent.”

The blocked surface is new route-specific meaning/content that would decide unresolved Hunter Trail / Old Boundary semantics: new outcome ownership, special reward, route resolution, lore truth, ending qualification or other Product meaning not already locked.

The reviewed Chat2 real-asset patch is empty and therefore adds no route semantics. Its Forest coverage explicitly avoids inventing Hunter/Old Boundary meaning. Chat3 poverty localization is unrelated. Chat5 School localization is unrelated.

Verdict: **EXISTING GENERIC SEAM PRESERVED; NEW SEMANTICS NOT PROMOTED**.

A localized label for the existing option is presentation, not a Product decision.

## Palace unresolved content

A scan of current root production packs and current `definitions.json` found no `palace` identity.

None of the reviewed School localization, poverty localization or real-GIF candidates adds Palace gameplay/content.

Verdict: **ISOLATED / NOT PROMOTED**.

Palace authoring elsewhere in docs/staging must remain non-production until Product locks the required semantics.

## Cross-check of current candidate integrations

### School localization candidate

Allowed:

- School panel/course RU+EN text;
- current production generic event localization after exact ID remapping;
- QA fixtures/tests.

Not allowed:

- worker-only exact-course event promotion;
- teacher/course routing promotion from a localization PR;
- management/accounting result selection;
- Arcana/Forest result selection.

Current Chat5 item 150 remains `STAGING_EVIDENCE_ONLY`.

### Ordinary poverty localization candidate

Allowed:

- RU+EN keys for the 14 actual PR37 ordinary-poverty events;
- existing media alt localization.

Not allowed:

- Secret Debt IDs, lender mechanics, outcomes or rewards.

Current reviewed delta passes this isolation check.

### Real-GIF candidate

There are zero real GIF blobs and the real-asset-only patch has zero slots. Therefore media integration currently cannot promote any blocked semantic route.

Future art must attach only to an existing approved semantic presentation ID. A visual asset may not create gameplay meaning by implication.

## Locked invariants unaffected

This audit accepts no reopening of:

- Lumber Hard Work eligibility: only `completed_shifts >= 50`;
- Lumber Hard Work reward: `hardWork:lumber`;
- Forest continuation: exact `activityResult`;
- locale as presentation/text only;
- gameplay RNG/Save/media candidate identity independent of locale;
- real multi-GIF pools requiring 3–5 real repo GIFs.

## Verdict

**PASS — PRODUCT-BLOCKED CONTENT REMAINS ISOLATED in the reviewed current integration candidates.**

This verdict does not approve the blocked content itself. It only confirms that the reviewed localization/media work does not select or ship those unresolved semantics.
