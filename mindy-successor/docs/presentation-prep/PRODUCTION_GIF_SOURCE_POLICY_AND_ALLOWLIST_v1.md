# Production GIF Source Policy and Allowlist v1

Status: **PRODUCTION POLICY**

Purpose: define which media sources Chat 2 may autonomously use when sourcing real GIF assets for repository redistribution.

This is a conservative project policy, not legal advice.

## Core rule

A GIF may be imported for shipped production only when all of the following are true:

1. the exact source/provenance is verifiable;
2. the exact license or permission terms are identifiable;
3. repository redistribution is permitted;
4. commercial-use ambiguity does not exist;
5. required attribution/share-alike obligations are recorded and can be satisfied;
6. the content semantically fits an existing production presentation identity;
7. the file is technically validated before activation.

Unknown or ambiguous rights => **DO NOT IMPORT FOR PRODUCTION**.

## Autonomous allowlist

### A. Project-owned / commissioned for this project

Allowed when:
- creator/source is known;
- project has redistribution/use permission;
- permission record is retained in the provenance ledger.

Classification:
**ALLOW / preferred**.

### B. CC0

Allowed when the source explicitly marks the exact file/work as CC0.

Creative Commons states that CC0 is intended to waive copyright and related rights as fully as possible and permits unrestricted copying, modification and redistribution.

Authority:
- https://creativecommons.org/public-domain/

Classification:
**ALLOW / preferred**.

### C. Public Domain / Public Domain Mark

Allowed when the exact file page provides a credible public-domain basis or Public Domain Mark and the provenance claim is reviewable.

Authority:
- https://creativecommons.org/public-domain/

Classification:
**ALLOW**, but record:
- source page;
- public-domain rationale;
- author/date when available;
- any jurisdiction-specific caveat shown by the source.

### D. CC BY

Allowed when the exact file is licensed under CC BY and the project can preserve the required attribution.

Creative Commons describes CC BY as allowing redistribution/adaptation, including commercial use, provided attribution is given.

Authority:
- https://creativecommons.org/share-your-work/use-remix/cc-licenses/
- https://creativecommons.org/cc-licenses/

Classification:
**ALLOW WITH ATTRIBUTION**.

The provenance ledger must capture:
- creator;
- source URL/reference;
- license version;
- attribution text;
- whether the asset was modified.

### E. CC BY-SA

Allowed only when Lead accepts the ShareAlike obligation for the actual imported/adapted media.

Creative Commons states that CC BY-SA allows commercial redistribution/adaptation with attribution, while adaptations must use the same or a compatible license.

Authority:
- https://creativecommons.org/share-your-work/use-remix/cc-licenses/
- https://creativecommons.org/cc-licenses/

Classification:
**CONDITIONAL ALLOW / NEEDS SHAREALIKE REVIEW**.

Chat 2 may identify these candidates, but should not silently classify them as uncomplicated `SHIP_OK`.

### F. Wikimedia Commons as a discovery host

Wikimedia Commons may be used as a source-discovery host **only after verifying the individual file description page**.

Wikimedia explicitly notes that:
- files can have different licenses;
- the individual file page supplies copyright/license information;
- reusers must follow the specific license requirements.

Authority:
- https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia
- https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/licenses

Classification:
**DISCOVERY SOURCE, NOT A BLANKET LICENSE**.

A Commons-hosted file is allowed only if its specific file-level license independently passes this policy.

## Not autonomously approved

### CC BY-ND

Not automatically approved for GIF production when any editing, cropping, recompression, optimization or derivative preparation may be needed.

Creative Commons permits redistribution of the unadapted work but does not permit distributing adapted forms.

Classification:
**NEEDS LEGAL/PRODUCT REVIEW**.

### CC BY-NC / CC BY-NC-SA / CC BY-NC-ND

Not approved for autonomous production import because the NonCommercial restriction is incompatible with assuming unrestricted future project distribution.

Classification:
**DO NOT AUTONOMOUSLY IMPORT**.

### Custom licenses

Only allowed when the exact terms explicitly permit the project's repository redistribution and intended use, and the permission is clear enough to record.

Classification:
**NEEDS EXPLICIT REVIEW unless already approved by Lead**.

### "Free to download", "royalty-free", "free GIF", "no copyright intended"

These phrases are not sufficient license evidence.

Classification:
**DO NOT IMPORT WITHOUT ACTUAL LICENSE/PERMISSION**.

## Forbidden/uncertain source patterns

Do not autonomously source shipped assets from:
- Giphy search/result pages;
- Tenor search/result pages;
- Pinterest;
- social media reposts;
- meme aggregators;
- generic "free GIF" download sites without file-level license provenance;
- search-engine image caches;
- hotlinked/external URLs where the project would not own a repository copy;
- files whose uploader is known but original creator/license is not;
- AI/generated assets whose rights/provenance terms cannot be documented for project use;
- assets containing third-party trademarks/characters/personality rights that introduce material rights uncertainty.

No generic Giphy/Tenor scraping.

## Attribution handling

For CC BY / approved CC BY-SA assets, record at minimum:
- title/name if supplied;
- creator;
- canonical source page;
- license name/version;
- license URL;
- modification note;
- attribution text required for distribution.

If the project lacks a reliable place to satisfy attribution, the asset is not `SHIP_OK`.

## Modification/optimization rule

Technical optimization is still a modification question for licensing purposes.

Before cropping, editing, recoloring, frame removal, compositing or material GIF optimization:
- confirm the license permits adaptation;
- preserve provenance;
- record what changed.

CC0/public-domain/project-owned assets are preferred because this keeps production replacement and optimization simpler.

## Decision table

| Source/license | Autonomous discovery | Autonomous repo import | Production classification |
| --- | --- | --- | --- |
| Project-owned/commissioned with permission | YES | YES | ALLOW |
| CC0 | YES | YES | ALLOW |
| verified Public Domain | YES | YES | ALLOW |
| CC BY | YES | YES, with attribution record | ALLOW WITH ATTRIBUTION |
| CC BY-SA | YES | only after ShareAlike acceptance | CONDITIONAL |
| CC BY-ND | YES | NO by default | NEEDS REVIEW |
| any CC-NC variant | YES for research | NO | DO NOT SHIP autonomously |
| Wikimedia Commons host | YES | only per-file license | FILE-BY-FILE |
| Giphy/Tenor generic results | NO for production sourcing | NO | FORBIDDEN |
| unknown/custom unclear rights | YES for evidence gathering only | NO | UNKNOWN / BLOCK |

## Provenance evidence required before import

Every imported candidate must have:
- exact source page;
- direct downloadable file URL or source repository location;
- license name/version;
- source text/evidence supporting that license;
- creator/author if available;
- attribution requirement;
- whether derivative/optimization is allowed;
- semantic fit note;
- redistribution conclusion.

## Production default

When in doubt, block the asset.

It is better to ship static fallback than to import a visually convenient GIF with unclear rights.
