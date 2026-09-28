# Secret Debt Integration Handoff v1

Status: selective handoff for queue items 293–303.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

Do not merge the long-lived worker branch wholesale.

# CURRENT_IDENTITIES

Inventory:
`docs/poverty-prep/SECRET_DEBT_CURRENT_MAIN_PRODUCTION_INVENTORY_V1.md`.

Current exact production Secret Debt identities:
- events: **0**;
- forced-Night events: **0**;
- results: **0**;
- endings: **0**;
- presentation IDs: **0**;
- localization keys: **0**;
- Journal-ref mappings: **0**.

Existing generic debt is explicitly separate:
- metric `debt`;
- action `repay`;
- action `rent-room`;
- UI key `ui.bag.debtLabel`.

Those are not hidden-career Secret Debt production identities.

# SAFE_LOCALIZATION

Files:
- `docs/poverty-prep/SECRET_DEBT_RU_SOURCE_COPY_POLISH_V1.md`;
- `docs/poverty-prep/SECRET_DEBT_EN_PARITY_REVIEW_V1.md`;
- `prior-work/astra/prototype-m3.2/content/secret-debt-localization-v1.fixture.json`.

Disposition:
**CONTENT_BLOCKED**.

Safe localization payload:
**0 keys**.

Reason:
there is no exact production gameplay identity to anchor RU/EN text.

No ordinary-poverty, generic-debt or relationship-Night key is repurposed.

# JOURNAL_READY

Journal mechanism itself is shipped by PR #54:
- stable `eventChoice` refs;
- localized title/text at render time.

Secret Debt expectation file:
`prior-work/astra/prototype-m3.2/content/secret-debt-journal-localization-v1.fixture.json`.

Disposition:
**mechanism ready, Secret Debt mappings blocked**.

Mapping count:
**0**.

Once exact Secret Debt event/choice IDs ship, the existing journal mechanism can consume their localization without locale-specific gameplay IDs.

# PRESENTATION_READY

File:
`prior-work/astra/prototype-m3.2/content/secret-debt-presentation-identity-map-v1.fixture.json`.

Current mapping count:
**0**.

There is no exact current Secret Debt event/result/ending identity from which to derive a semantic presentation ID.

No guessed presentation IDs are emitted.

# FORCED_NIGHT_STATUS

File:
`docs/poverty-prep/SECRET_DEBT_FORCED_NIGHT_IDENTITY_AUDIT_V1.md`.

Current Secret Debt forced-Night identities:
**0**.

Existing Night-policy ownership remains:
- ordinary poverty context events;
- `lumber-night.foreman-professional`.

Generic NightFlow supports forced hooks, but current Product/content does not select the Secret Debt intercept point or policy.

# NATURAL_PATH_STATUS

File:
`docs/poverty-prep/SECRET_DEBT_NATURAL_PATH_MATRIX_V1.md`.

Current exact Secret Debt natural-path rows:
**0**.

The matrix intentionally refuses to invent:
- offer chance;
- principal/debt amount;
- activation delay;
- forced-Night penalty;
- job-lock implementation;
- outcome threshold/reward.

# OWNERSHIP_FIREWALL

File:
`docs/poverty-prep/SECRET_DEBT_OWNERSHIP_FIREWALL_V1.md`.

Separate owners remain:
1. ordinary poverty;
2. Secret Debt hidden/forced route;
3. Palace meta career;
4. voluntary relationship Night content;
5. generic debt economy primitives.

No cross-owner promotion/ID reuse is allowed.

# PALACE_EXCLUDED

File:
`docs/poverty-prep/SECRET_DEBT_PALACE_EXCLUSION_AUDIT_V1.md`.

Exact evidence:
- current ordinary work roster has 10 profession IDs;
- Secret Debt is not among them;
- authoritative Product lock requires all 10 ordinary Hard Work completions;
- Secret Debt / hidden careers do not count;
- current production has no Secret Debt Hard Work ending or Palace credit path.

Therefore Secret Debt remains excluded from Palace 10/10.

# PRODUCTION_PATCH

File:
`prior-work/astra/prototype-m3.2/content/secret-debt-production-patch-v1.fixture.json`.

Status:
**CONTENT_BLOCKED**.

Payload:
- 0 identities;
- 0 strings;
- 0 additive keys;
- 0 identical keys.

This is the required safe result because current main does not yet contain production Secret Debt content identities.

# Exact selective-copy files

Copy for current audit/handoff only:
1. `SECRET_DEBT_CURRENT_MAIN_PRODUCTION_INVENTORY_V1.md`;
2. `SECRET_DEBT_FORCED_NIGHT_IDENTITY_AUDIT_V1.md`;
3. `SECRET_DEBT_RU_SOURCE_COPY_POLISH_V1.md`;
4. `SECRET_DEBT_EN_PARITY_REVIEW_V1.md`;
5. `secret-debt-localization-v1.fixture.json`;
6. `SECRET_DEBT_NATURAL_PATH_MATRIX_V1.md`;
7. `SECRET_DEBT_OWNERSHIP_FIREWALL_V1.md`;
8. `SECRET_DEBT_PALACE_EXCLUSION_AUDIT_V1.md`;
9. `secret-debt-presentation-identity-map-v1.fixture.json`;
10. `secret-debt-journal-localization-v1.fixture.json`;
11. `secret-debt-production-patch-v1.fixture.json`.

There is currently no localization patch to apply to root content.

# Remaining blockers

Before a non-empty production patch can exist, current main needs exact approved identities for:
- offer/refuse/accept scenes;
- delayed activation;
- bound-career work;
- forced Night;
- outcome/result/ending paths.

It also needs Product/runtime decisions for the still-open numeric and cross-system behavior documented by the existing production handoff.

# Locked boundaries

Ordinary poverty remains recoverable and separate.

Palace remains all 10 ordinary Hard Work careers only.

Secret Debt remains an additional hidden route/career, not an ordinary job.

No current Night, relationship or generic debt ID may be silently reused as Secret Debt.

# Handoff conclusion

Items 293–303 consolidate to:

- **CURRENT_IDENTITIES** — none in current production;
- **SAFE_LOCALIZATION** — blocked, 0 keys;
- **JOURNAL_READY** — mechanism ready, mappings blocked;
- **PRESENTATION_READY** — blocked by missing exact identities;
- **PALACE_EXCLUDED** — verified;
- **CONTENT_BLOCKED** — correct production-patch status.

No invented gameplay IDs were introduced.
