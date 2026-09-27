# Presentation Stale-Content Rejection Checklist v1

Purpose: reject media work that targets content identities which have changed, been superseded, or are no longer canonical.

Run this checklist before accepting a new GIF/static asset, replacement package, or batch update.

## 1. Source gameplay/content ID still exists

Check:
- [ ] source gameplay/content ID exists in current authoritative content;
- [ ] event/variant/route/outcome ID still exists;
- [ ] source content has not moved to a different authoritative domain;
- [ ] the referenced content was not deleted or replaced.

Reject when:
- source ID no longer exists;
- only a historical draft contains the ID;
- the media brief references a superseded content packet.

## 2. Semantic presentationId is still canonical

Check:
- [ ] semantic `presentationId` exists or is still the approved pending identity;
- [ ] no later canonical ID replaced it;
- [ ] slash taxonomy is unchanged;
- [ ] no dotted alias is being used;
- [ ] no underscore/kebab alias drift occurred;
- [ ] no collision was introduced by later authored content.

Reject when:
- media targets an old alias;
- presentationId was renamed with approval but the asset package still targets the old value;
- a previously provisional ID was never finalized.

## 3. Choices / effects did not materially change

Compare current authored content to the media brief.

Check whether any later change altered:
- visible choices;
- visible outcome meaning;
- route identity;
- relationship context;
- Night context;
- ending meaning;
- public-result provider;
- scene ownership.

If the scene remains the same identity and only internal balance numbers changed, media may still be valid.

Reject or re-brief when the visible authored meaning materially changed.

## 4. Superseded content is not receiving new assets

Check:
- [ ] content packet is current;
- [ ] task/decision authority is current;
- [ ] no newer authoring packet explicitly supersedes the referenced one;
- [ ] no historical pre-fix test/doc is being treated as current truth.

Reject media work for:
- obsolete variants;
- abandoned routes;
- removed events;
- superseded endings;
- pre-fix presentation flows no longer present in shipped content.

## 5. Fallback remains valid

Check:
- [ ] static fallback still exists;
- [ ] semantic fallback target still exists;
- [ ] fallback chain is cycle-free;
- [ ] text fallback still describes the current scene correctly;
- [ ] animations-off remains valid.

Reject or repair before import when:
- fallback asset was removed;
- fallback semantic ID was renamed;
- old text now describes a superseded choice/outcome.

## 6. Replacement package targets current identity

For override/replacement bundles, verify:
- [ ] package version is supported;
- [ ] every target semantic ID is current;
- [ ] no orphan/stale entry exists;
- [ ] package ordering/canonicalization matches current contract;
- [ ] replacement media kind still matches policy;
- [ ] rollback target still exists.

Reject before persistence when any target is stale.

## 7. Reuse-group validity

If the media is reused across several semantic IDs:
- [ ] every mapped semantic ID still exists;
- [ ] contexts are still visually compatible;
- [ ] alt/accessibility text remains correct per mapping;
- [ ] one mapping was not split into a materially different authored scene;
- [ ] replacement scope still matches the approved reuse intent.

A previously safe shared GIF may become stale for one mapping if that scene’s content changed.

## 8. Save identity owner remains correct

Verify the authored scene still belongs to the same gameplay owner:
- `lastAction`;
- `pendingScene`;
- `NightFlow`;
- `Activity`;
- `endingState`;
- `RunResult`;
- `NewRunLocation`;
- other explicitly approved owner.

Reject if the media brief assumes stale ownership and would cause presentation identity to be restored from the wrong state.

## 9. No filename-derived migration

Never “fix” stale content by:
- renaming a file and assuming the semantic ID follows;
- mapping an old filename to the nearest new scene;
- guessing a replacement based on similar slug text.

Stale content requires an explicit semantic remap approved by current content authority.

## 10. Diff evidence

Before acceptance, record:

```text
sourceAuthorityBefore=<brief authority>
sourceAuthorityCurrent=<current authority>
sourceGameplayIdBefore=<id>
sourceGameplayIdCurrent=<id>
presentationIdBefore=<id>
presentationIdCurrent=<id>
visibleMeaningChanged=<yes/no>
fallbackChanged=<yes/no>
replacementTargetChanged=<yes/no>
decision=<ACCEPT | REBRIEF | REJECT_STALE>
```

## 11. Decision classes

### ACCEPT
Content identity and semantic target are still current.

### REBRIEF
Source identity remains valid, but visible authored meaning changed enough that the asset brief must be updated.

### REJECT_STALE
Source or semantic identity is superseded/removed and the package must not be imported.

## 12. Pre-import acceptance

Media work may proceed only when:
1. source gameplay/content ID still exists;
2. semantic presentationId is canonical;
3. visible scene meaning still matches the brief;
4. source authority is not superseded;
5. fallback remains valid;
6. replacement package targets current identity;
7. reuse group remains context-correct;
8. save owner remains correct.

If any identity check fails, reject before persistence rather than silently remapping the asset.
