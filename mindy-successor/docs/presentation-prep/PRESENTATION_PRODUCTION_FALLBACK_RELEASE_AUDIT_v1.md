# Presentation Production Fallback Release Audit v1

Current main presentation baseline is PR22-compatible. This audit classifies **presentation fallback availability**, not gameplay readiness.

## Current static-backed

### Lumber

Current Lumber shift/result/milestone media is static-backed by shipped Lumber stage assets.

The four seasonal shift GIFs and accepted-hand GIF remain optional future replacements; they are not required for a valid current presentation.

### School

All eight paid School lesson slots are static-backed by:

`stage.school -> assets/stage-school.svg`

School Night study does not currently require a dedicated semantic media slot; it remains safe in the shared central context.

### Night

Normal lodging/shared Night context is static-backed by town presentation.

The professional Foreman Night scene is static-backed by shipped Lumber media. Its planned GIF is optional.

### Forest route surface

The shipped Forest Activity route/result surface is static-backed by:

`stage.hunt -> assets/stage-forest.svg`

PR22 route-option state does not remove this fallback. Logging road and Old Boundary can safely use the generic Forest route presentation until route-specific presentation families are authored.

### Endings

Lumber ending slots currently have no required direct media file, but their presentation fallback chain terminates at:

`location/town/default -> stage.town -> assets/stage-town.svg`

They are therefore classified as **static-backed through semantic fallback**, not text-only and not missing.

## Text-only safe

No currently required target presentation slot is forced to text-only operation.

Text fallback remains a valid terminal safety mechanism, but it is not the only current presentation for the audited Lumber / School / Night / Forest / ending surface.

## Future GIF only

**None.**

Seven optional GIF targets are planned, but every one has a current shipped static fallback:

- four Lumber seasonal shifts;
- accepted-hand milestone;
- Foreman professional;
- Foreman professional Night.

Therefore these are **future GIF backlog**, not `future-GIF-only` release dependencies.

## Missing and blocking

**None demonstrated in the current presentation layer.**

Current remaining Product Acceptance blockers are gameplay/content authoring gaps. They must not be mislabeled as presentation fallback failures.

Examples:

- Old Boundary Token acquisition/retain-consume policy;
- hunter-trail and deeper Forest challenge/season authoring;
- School management/accounting public result.

These may need future distinct presentation authoring when content is finalized, but current fallback infrastructure is not blocking the gameplay work.

## Release conclusion

For the currently shipped target surface:

- current static-backed: PASS;
- text-only-only slots: none required;
- future-GIF-only slots: none;
- missing/blocking presentation fallback: none.

Future route/challenge-specific presentation families and GIF replacements remain non-blocking authoring/polish work.
