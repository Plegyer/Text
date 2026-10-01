# Replacement / Editor Invariance v3

Status: C2-93 COMPLETE
Owner: Chat 2 / Presentation & Media

Replacement invariance now covers:
- **102** queue-v9 semantic bindings;
- **8** School teacher media identities.

For semantic replacements, the validator replaces only presentation static source and proves:
- requested semantic ID is unchanged;
- selected slot ID is unchanged;
- gameplay definitions remain deep-equal;
- event IDs remain unchanged;
- a freshly serialized life Save remains byte-for-byte unchanged.

For teacher media replacement, the exact media ID remains stable while source changes presentation-only.

The editor implementation continues to persist through the separate `portal-life.presentation.v1` channel rather than the life Save writer.

No Save schema, gameplay identity or RNG path is modified.
