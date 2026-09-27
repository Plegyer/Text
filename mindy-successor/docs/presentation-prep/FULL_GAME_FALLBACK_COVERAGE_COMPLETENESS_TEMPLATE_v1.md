# Full-Game Fallback Coverage Completeness Template v1

Purpose: provide a reusable completeness check for any authored presentation surface before final media exists.

This template applies to:
- careers;
- School;
- poverty / Secret Debt;
- Night;
- Activity;
- Palace;
- endings;
- Meta transitions.

A scene can pass fallback completeness without having a final GIF.

---

## Surface identity

**Owning subsystem**
`<career | school | poverty | night | activity | palace | ending | meta>`

**Source gameplay/content ID**
`<exact authored ID>`

**Semantic presentationId**
`<exact canonical slash ID>`

Check:
- [ ] semantic ID exists;
- [ ] ID is canonical;
- [ ] ID is not filename-derived;
- [ ] source gameplay/content identity still exists.

If semantic identity is not ready, mark:
`INCOMPLETE_CONTENT_IDENTITY`

---

## 1. Primary media status

**GIF / dynamic primary**
`PRESENT | OPTIONAL_MISSING | NOT_PLANNED`

Check:
- [ ] missing GIF is non-fatal;
- [ ] primary media is not required for gameplay;
- [ ] animation completion does not unlock commands.

A missing GIF alone is not a completeness failure.

---

## 2. Static fallback

**Static fallback reference**
`<asset | semantic fallback | NONE>`

Check:
- [ ] fallback exists, or a documented semantic fallback exists;
- [ ] fallback graph is cycle-free;
- [ ] fallback remains valid when primary media is unavailable;
- [ ] fallback remains valid after replacement rollback.

Status:
`PASS | MISSING_STATIC_BUT_TEXT_SAFE | FAIL`

---

## 3. Text fallback

**Text / accessible meaning**
`<approved text meaning>`

Check:
- [ ] scene remains understandable with no animation;
- [ ] choice/outcome meaning remains clear;
- [ ] result/ending meaning is not encoded only in visuals;
- [ ] no frame timing is required to interpret gameplay state.

Status:
`PASS | NOT_REQUIRED_WITH_REASON | FAIL`

---

## 4. Animations-off path

**Expected animations-off terminal**
`<static asset | semantic fallback | text-only terminal>`

Check:
- [ ] same semantic presentationId;
- [ ] same available gameplay controls;
- [ ] same choices/actions;
- [ ] same save identity owner;
- [ ] no mechanic changes.

Status:
`PASS | FAIL`

---

## 5. Accessibility alt text

**Alt/accessibility text**
`<context-correct text>`

Check:
- [ ] context is correct for this semantic ID;
- [ ] shared media does not force misleading generic alt;
- [ ] important information is available without motion;
- [ ] wording does not expose stale/superseded content.

Status:
`PASS | PENDING_CONTENT_TEXT | FAIL`

---

## 6. Replacement readiness

**Replacement scope**
`PER_SLOT | SHARED_REUSE_GROUP | NOT_PLANNED`

Check:
- [ ] exact semantic ID is known;
- [ ] media kind validation is defined;
- [ ] static/text fallback is preserved;
- [ ] invalid/stale override rejects before persistence;
- [ ] replacement does not carry gameplay fields.

Status:
`READY | NOT_NEEDED | BLOCKED_ON_CONTENT_IDENTITY`

---

## 7. Rollback readiness

**Rollback target**
`<shipped static / semantic fallback / text terminal>`

Check:
- [ ] removing the override restores a known-good presentation;
- [ ] unrelated mappings remain intact;
- [ ] no orphan entry remains active;
- [ ] save/gameplay state remains unchanged.

Status:
`READY | NOT_NEEDED | FAIL`

---

## 8. Save/reload identity

**Save identity owner**
`lastAction | pendingScene | NightFlow | Activity | endingState | RunResult | NewRunLocation | <approved owner>`

Check:
- [ ] owner is gameplay state;
- [ ] media filename does not define reload identity;
- [ ] frame/time/playback state is not persisted;
- [ ] missing presentation metadata remains compatibility-safe where applicable.

Status:
`PASS | FAIL`

---

## 9. Reuse safety

If media is reused:

**reuseGroup**
`<group or NONE>`

Check:
- [ ] this semantic ID remains distinct;
- [ ] text/choices remain context-correct;
- [ ] alt text is context-correct;
- [ ] fallback remains independent;
- [ ] one mapping can be rolled back without corrupting others where intended.

Status:
`PASS | NOT_REUSED | FAIL`

---

## 10. Surface completeness result

Choose one:

### COMPLETE
Semantic identity exists and the surface has a valid static/semantic/text fallback path independent from GIF availability.

### COMPLETE_WITH_OPTIONAL_MEDIA_OPEN
Fallback is complete; optional GIF/static polish is still missing.

### PLACEHOLDER_SAFE_CONTENT_OPEN
Fallback is usable for implementation, but final semantic identity or authored text still depends on content decisions.

### BLOCKING_IDENTITY_GAP
Required authored gameplay/content surface exists but no valid semantic presentation identity is assigned.

### BLOCKING_FALLBACK_GAP
Semantic identity exists but no usable static/semantic/text fallback remains.

---

## System-specific notes

### Careers
Check work/result/event/relationship/Night/ending surfaces independently.

### School
Check paid lesson result separately from blocking event/public-result scenes.

### Poverty / Secret Debt
Check lodging, ordinary street event, lender offer, activation, hidden work, forced Night and outcomes as distinct identities.

### Activity
Check route, challenge and result surfaces independently. Generic Forest route fallback may remain valid while specific content is still authored.

### Palace
Do not mark a Palace surface complete until authoritative Palace gameplay/content identity exists.

### Endings
Dedicated ending art is optional if semantic ending identity and static/text fallback are valid.

---

## Batch completeness summary

| Surface | presentationId | Primary GIF | Static | Text | Anim-off | Alt | Replace | Rollback | Save owner | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <surface> | <id> | <status> | <status> | <status> | <status> | <status> | <status> | <status> | <owner> | <result> |

A full-game content package is presentation-complete only when every required authored visible surface is either:
- `COMPLETE`, or
- `COMPLETE_WITH_OPTIONAL_MEDIA_OPEN`.

`PLACEHOLDER_SAFE_CONTENT_OPEN` is acceptable during implementation but not final content sign-off.
