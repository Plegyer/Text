# Real Media License / Provenance Audit v1

Status: **AUDIT COMPLETE / IMPORT SET EMPTY**

Queue item: 182.

Policy authority:

`docs/presentation-prep/PRODUCTION_GIF_SOURCE_POLICY_AND_ALLOWLIST_v1.md`

Import authority:

`docs/presentation-prep/FIRST_REAL_GIF_IMPORT_BLOCKER_v1.md`

## Audit population

Real production GIF files imported by item 174:

**0**

Therefore there are no imported real assets requiring a `SHIP_OK`, `NEEDS_ATTRIBUTION`, `DO_NOT_SHIP`, or `UNKNOWN` classification in this audit.

| Imported repo asset | Source/provenance | License/permission | Classification |
| --- | --- | --- | --- |
| _none_ | _n/a_ | _n/a_ | _n/a_ |

## Why the set is empty

Item 173 did not find three compatible rights-clear assets for one Lumber semantic pool.

The permitted item-174 blocker path was therefore used instead of importing:
- weak semantic fits;
- effectively static GIF containers;
- rights-conflicted files;
- jurisdictionally uncertain public-domain files.

Item 180 later found one potentially useful CC0 rain animation for the ordinary-poverty cold-rain surface, but:
- it was not part of item 174;
- it was not imported;
- it does not provide the minimum three compatible candidates by itself;
- it is above the preferred repository size budget and would need optimization/visual review before future adoption.

Thus it is discovery evidence, not an imported production asset.

## Non-imported discovery evidence

The following external candidates were reviewed but are **outside the imported-asset audit population**:

### First discovery batch

- `Cepillo carpintero.gif` — CC0; rejected as an effectively static/weak Lumber-loop fit.
- `Escofina.gif` — CC0; rejected as an effectively static/weak Lumber-loop fit.
- `Animiertes Prinzip mechan-Hobelmaschine.gif` — page PD claim but embedded commercial-use prohibition; blocked.
- `Animiertes Prinzip mechan-Hobelmaschine-3D.gif` — page PD claim; rejected for semantic mismatch.
- `Hauling.gif` — public-domain evidence with explicit jurisdiction caveat; not autonomously imported.

### Second discovery batch

- `Rain 2.gif` — CC0; potentially compatible atmospheric rain reference, not imported.
- `Rain.gif` — author-released public domain; rejected because modern automobiles conflict with fantasy setting.
- Storm Jocelyn satellite GIF — mixed/more complex provenance plus strong semantic mismatch; not imported.
- digital-rain GIF family — CC0 but semantically unrelated; rejected.

These entries must not be converted into `SHIP_OK` rows unless a future import decision independently rechecks the exact source, file bytes, semantic fit, optimization, and provenance.

## Classification rule for future imports

When real GIFs are eventually imported, classify each physical asset as follows.

### SHIP_OK

Use only when:
- exact source is recorded;
- redistribution/adaptation terms are compatible;
- required attribution is satisfied;
- no unresolved rights conflict exists;
- semantic owner/reuse is approved;
- technical preflight is green.

### NEEDS_ATTRIBUTION

Use when:
- redistribution is allowed;
- source is otherwise acceptable;
- attribution/license notice is mandatory and still needs production placement/verification.

This is not production-active until attribution handling is complete.

### DO_NOT_SHIP

Use when:
- license forbids intended use/adaptation;
- rights evidence conflicts;
- source cannot be verified;
- asset would violate the source policy;
- semantic misuse itself makes adoption unacceptable.

### UNKNOWN

Use when:
- rights/provenance cannot yet be established.

Unknown always blocks production activation.

## Current conclusion

Imported GIF assets audited: **0**.

`SHIP_OK`: **0**.

`NEEDS_ATTRIBUTION`: **0**.

`DO_NOT_SHIP`: **0 imported assets**.

`UNKNOWN`: **0 imported assets**.

This zero-row audit is the expected consequence of the conservative import blocker, not a claim that external discovery candidates were approved.
