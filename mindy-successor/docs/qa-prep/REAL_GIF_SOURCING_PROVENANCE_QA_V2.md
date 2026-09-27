# Real GIF sourcing / provenance QA v2

Status: COMPLETE / NO_PRODUCTION_IMPORT_APPROVED

Reviewed Chat 2 stream:
- branch: `chat2/presentation-replacement-next`;
- item 172: `docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`;
- item 173: `docs/presentation-prep/FIRST_REAL_GIF_SOURCE_DISCOVERY_BATCH_v1.md`;
- item 174 blocker: `docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`;
- item 175 inventory: `docs/presentation-prep/IMPORTED_GIF_TECHNICAL_INVENTORY_v1.md`.

At review time:
- item 174 imported 0 production GIF files;
- item 175 is intentionally empty;
- item 176 preflight, item 177 real-pool patch and item 178 localization fixture were not yet present.

## QA provenance rule

A production GIF is acceptable only when the exact asset has evidence for all of:
1. identifiable original/source page;
2. identifiable creator/source when available;
3. explicit license or project permission;
4. license terms that permit repository redistribution for the intended distribution model;
5. any commercial-use restriction resolved;
6. any attribution/share-alike obligation captured and satisfiable;
7. permission for intended modification/optimization when applicable;
8. semantic fit to the existing presentation identity;
9. a real repository copy which passes technical preflight.

A search result, hosting page, direct download URL or “free GIF” label is not license evidence.

Uncertain or contradictory rights => `DO_NOT_SHIP`.

## Item 172 policy review

GREEN.

The source policy correctly distinguishes:
- project-owned/commissioned assets with recorded permission;
- CC0;
- verified public domain;
- CC BY with attribution;
- CC BY-SA only after its obligations are deliberately accepted;
- file-by-file Wikimedia Commons verification.

It correctly rejects generic sourcing from Giphy/Tenor/social reposts/meme aggregators and unclear “royalty-free/free GIF” claims as production provenance.

This satisfies the QA rule that generic GIF-host availability is never treated as a redistribution license.

## Item 173 candidate review

Target semantic identity:
`job/lumber/shift/spring/default`.

Chat 2 reviewed five candidate files and deliberately declined to form a pool.

### A — Cepillo carpintero.gif

Recorded source:
https://commons.wikimedia.org/wiki/File:Cepillo_carpintero.gif

Rights evidence:
- own work;
- MdeVicente;
- CC0 1.0.

QA rights classification:
`RIGHTS_CLEAR`.

QA semantic classification:
`REJECT_SEMANTIC_FIT`.

The file is a woodworking-tool depiction and is reported as a 0.1-second GIF rather than a useful character/work-cycle loop. Rights clarity alone does not make it suitable for the Lumber shift pool.

### B — Escofina.gif

Recorded source:
https://commons.wikimedia.org/wiki/File:Escofina.gif

Rights evidence:
- own work;
- MdeVicente;
- CC0 1.0.

QA rights classification:
`RIGHTS_CLEAR`.

QA semantic classification:
`REJECT_SEMANTIC_FIT`.

It is likewise effectively a static tool depiction rather than a meaningful repeatable Lumber work loop.

### C — Animiertes Prinzip mechan-Hobelmaschine.gif

Recorded source:
https://commons.wikimedia.org/wiki/File:Animiertes_Prinzip_mechan-Hobelmaschine.gif

The file page carries a public-domain declaration, while the file metadata also contains the statement:
`Created with AniMake. Commercial use forbidden.`

QA classification:
`DO_NOT_SHIP_RIGHTS_CONFLICT`.

The contradictory rights signals must be resolved by an authoritative rights owner/source before any production import. QA must not choose the more permissive statement merely to unblock content.

The mechanical-diagram subject also does not fit the authored Lumber shift.

### D — Animiertes Prinzip mechan-Hobelmaschine-3D.gif

Recorded source:
https://commons.wikimedia.org/wiki/File:Animiertes_Prinzip_mechan-Hobelmaschine-3D.gif

A public-domain claim is recorded at the file page.

QA rights classification:
`RIGHTS_EVIDENCE_PRESENT`.

QA semantic classification:
`REJECT_SEMANTIC_FIT`.

The technical mechanism diagram is not an appropriate character/worksite Lumber shift candidate.

### E — Hauling.gif

Recorded source:
https://commons.wikimedia.org/wiki/File:Hauling.gif

The file is described as historical log hauling with U.S. public-domain evidence, but the source page warns that the work may not be public domain outside the United States and explicitly references jurisdictions including Canada.

QA classification:
`DO_NOT_AUTONOMOUSLY_SHIP_JURISDICTION_UNCERTAIN`.

The thematic fit is closer, but rights uncertainty blocks repository redistribution under the adopted policy.

## 3–5 pool requirement

The product requirement is not “find at least one legal GIF.”

One production semantic event needs:
- 3–5 real, compatible repository GIF assets;
- all candidates individually rights-clear;
- all candidates semantically compatible enough to represent variation of the same gameplay/presentation event;
- no placeholders or test-only bytes.

Result of reviewed sourcing batch:
- reviewed: 5;
- rights-clear enough for consideration: some;
- semantically compatible work loops: 0;
- complete production pool: 0.

Therefore no candidate set is eligible for a production multi-GIF pool.

## Import/blocker review

Chat 2 item 174 correctly chose its explicit blocker path rather than importing weak or uncertain candidates.

`FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md` states:
- no production GIF imported;
- no fake 3–5 pool assembled;
- existing static fallback remains authoritative.

Chat 2 item 175 correctly reports an empty imported technical inventory rather than counting remote URLs or proposed filenames as assets.

## Required provenance record for any future import

Before QA can mark an imported candidate `SHIP_OK`, the repository evidence must include:
- repo path;
- source page;
- original/direct source location;
- creator;
- license name/version or explicit permission;
- license evidence/reference;
- redistribution conclusion;
- attribution text/obligation;
- ShareAlike obligation if any;
- modification/optimization permission;
- modification note;
- byte size;
- GIF87a/GIF89a signature;
- dimensions/frame metadata;
- intended current semantic presentationId;
- semantic-fit rationale.

A later removal or change of the remote hosting page does not invalidate a properly recorded rights grant, but the project must preserve sufficient provenance evidence at import time.

## Verdict

`NO_PRODUCTION_IMPORT_APPROVED`.

Current real-GIF production remains `BLOCKED_BY_REAL_ASSETS`, not blocked by the PR42 runtime.

Reopen this gate only when at least three compatible rights-clear real GIFs exist for one current semantic presentation identity.
