# First Real GIF Source Discovery Batch v1

Status: **DISCOVERY COMPLETE / NO IMPORTABLE 3–5 POOL**

Target family: highest-priority ordinary-career work from item 164.

Primary semantic target considered:

`job/lumber/shift/spring/default`

Reuse target, only if a visual were truly season-neutral:

- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

Policy authority:

`docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`

## Discovery sources searched

Primary discovery host:
- Wikimedia Commons, file-by-file license verification only.

License/reference authorities:
- Creative Commons CC0/public-domain guidance:
  https://creativecommons.org/public-domain/
- Creative Commons license guidance:
  https://creativecommons.org/share-your-work/use-remix/cc-licenses/
- Wikimedia Commons reuse guidance:
  https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia

No Giphy/Tenor/social-media scraping was used.

## Candidate review

### Candidate A — `Cepillo carpintero.gif`

Source page:
https://commons.wikimedia.org/wiki/File:Cepillo_carpintero.gif

Direct file:
https://upload.wikimedia.org/wikipedia/commons/7/7a/Cepillo_carpintero.gif

Source/provenance shown on file page:
- description: carpenter's/wood plane;
- source: own work;
- author: MdeVicente;
- license: CC0 1.0;
- media type: image/gif;
- dimensions: 1000 × 561;
- file size: 212,513 bytes;
- duration reported by Commons: 0.1 second.

Rights conclusion:
**REDISTRIBUTION PERMITTED / CC0**.

Semantic-fit conclusion:
**REJECT FOR LUMBER MULTI-GIF POOL**.

Reason:
the file is a tool depiction with a 0.1-second reported duration, not a useful repeatable character/work-action loop. It would function as effectively static imagery and does not satisfy the producer brief's work-cycle variation goal.

### Candidate B — `Escofina.gif`

Source page:
https://commons.wikimedia.org/wiki/File:Escofina.gif

Direct file:
https://upload.wikimedia.org/wikipedia/commons/4/47/Escofina.gif

Source/provenance shown on file page:
- description: wood rasp;
- source: own work;
- author: MdeVicente;
- license: CC0 1.0;
- media type: image/gif;
- dimensions: 1000 × 181;
- file size: 63,923 bytes;
- duration reported by Commons: 0.1 second.

Rights conclusion:
**REDISTRIBUTION PERMITTED / CC0**.

Semantic-fit conclusion:
**REJECT FOR LUMBER MULTI-GIF POOL**.

Reason:
like Candidate A, this is essentially a static tool image stored as GIF, not a production-quality loop showing a neutral lumber work beat.

### Candidate C — `Animiertes Prinzip mechan-Hobelmaschine.gif`

Source page:
https://commons.wikimedia.org/wiki/File:Animiertes_Prinzip_mechan-Hobelmaschine.gif

Direct file:
https://upload.wikimedia.org/wikipedia/commons/2/20/Animiertes_Prinzip_mechan-Hobelmaschine.gif

Source/provenance shown on file page:
- creator: Silberwolf;
- page-level permission: creator put it in the public domain;
- media: looped GIF;
- dimensions: 612 × 356;
- file size: about 390 KB;
- frames: 81;
- subject: mechanically propelled shaper mechanism.

Critical conflict:
the Commons metadata exposes a GIF file comment:
`Created with AniMake. Commercial use forbidden.`

Rights conclusion:
**DO NOT SHIP / RIGHTS SIGNAL CONFLICT**.

Even though the Commons page carries a public-domain declaration, the embedded file comment contradicts unrestricted commercial reuse. Item 172 policy requires blocking on conflicting/uncertain evidence rather than selecting the more convenient interpretation.

Semantic-fit conclusion:
also poor: an industrial/mechanical shaper mechanism is not the authored fantasy/manual Lumber shift.

### Candidate D — `Animiertes Prinzip mechan-Hobelmaschine-3D.gif`

Source page:
https://commons.wikimedia.org/wiki/File:Animiertes_Prinzip_mechan-Hobelmaschine-3D.gif

Direct file:
https://upload.wikimedia.org/wikipedia/commons/5/5f/Animiertes_Prinzip_mechan-Hobelmaschine-3D.gif

Source/provenance shown on file page:
- creator/source: Silberwolf;
- page-level permission: public domain;
- media: looped GIF;
- dimensions: 440 × 338;
- file size: about 394 KB;
- frames: 81;
- subject: 3D mechanical shaper-drive principle.

Rights conclusion:
**PUBLIC-DOMAIN CLAIM PRESENT**, but this candidate is not selected for import in this batch.

Semantic-fit conclusion:
**REJECT**.

Reason:
the visual is a technical mechanism diagram, not a character/worksite lumber activity. It would make the semantic presentation less accurate even if the rights claim were acceptable.

### Candidate E — `Hauling.gif`

Source page:
https://commons.wikimedia.org/wiki/File:Hauling.gif

Direct file:
https://upload.wikimedia.org/wikipedia/commons/e/ef/Hauling.gif

Source/provenance shown on file page:
- description: big wheels hauling logs, circa 1900;
- author: unknown;
- media type: image/gif;
- dimensions: 480 × 390;
- file size: about 234 KB;
- Commons page includes U.S. public-domain claims.

Rights caveat:
the page explicitly warns the image may not be public domain outside the United States and specifically names Canada among jurisdictions where the situation may differ.

Rights conclusion:
**DO NOT AUTONOMOUSLY IMPORT / JURISDICTIONAL UNCERTAINTY**.

Semantic-fit conclusion:
historical log hauling is thematically closer than the mechanism diagrams, but it is not sufficient to override the rights uncertainty, and the page does not establish a useful multi-frame work loop.

## Batch result

Candidates reviewed: **5**.

Candidates with clean enough rights for autonomous reuse:
- A — CC0;
- B — CC0;
- D — page-level public-domain claim, but semantic mismatch.

Candidates rejected on rights uncertainty/conflict:
- C — embedded commercial-use prohibition conflicts with page PD claim;
- E — explicit non-U.S./Canada public-domain warning.

Candidates that meet the actual Lumber shift loop brief:
**0**.

Compatible assets available for one honest 3–5 candidate production pool:
**0**.

## Decision

Do **not** import any of these files as the first shipped Lumber multi-GIF pool.

The project already has a correct static fallback. Replacing it with unrelated technical diagrams or effectively static GIF containers would increase file count without increasing presentation quality.

Item 174 should therefore take its permitted blocker path unless a new project-owned/CC0 source with at least three semantically compatible real work loops becomes available before import execution.

## What would clear the blocker

Any one of these would be sufficient to reopen import:
1. three project-owned Lumber work-loop GIFs from the item-164 producer brief;
2. three CC0/public-domain character/worksite loops with clear global redistribution status;
3. three explicitly licensed redistribution-compatible loops whose attribution/permission obligations Lead accepts.

Until then, no production pool should be fabricated from weak-fit source material.
