# Foreman Semantic Label Collision Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`
Fixture: `content/relationship-foreman-semantic-labels-v1.fixture.json`

## Summary

| Classification | Count |
|---|---:|
| ADDITIVE | 8 |
| IDENTICAL | 0 |
| REUSE_EXISTING | 0 |
| CONFLICT | 0 |
| **Total** | **8** |

## Full classification

| Key | Classification | Existing key / reason |
|---|---|---|
| `relationship.lumber.foreman.choice.route.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.choice.route.value.professional.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.counter.night_meetings.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.fact.night-followup-complete.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.stage.professional.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.stage.route-professional.label` | ADDITIVE | absent from root |
| `relationship.lumber.foreman.stage.unknown.label` | ADDITIVE | absent from root |

## Interpretation

Exact current root has no `relationship.lumber.foreman.*` semantic-label namespace.

Where a RU+EN value happens to match another presentation string exactly, that does not make the gameplay identity interchangeable. A REUSE_EXISTING classification is only a translation-value observation; generic relationship semantic lookup still needs an identity-specific key or an explicit semantic mapping.

No same-key conflict exists on the audited baseline.

## Merge rule

Lead must repeat this comparison on the exact integration head.

- ADDITIVE: safe presentation candidate.
- IDENTICAL: keep current root entry.
- REUSE_EXISTING: reuse only if semantic identity is intentionally mapped.
- CONFLICT: explicit review required; never overwrite silently.

## Boundary

No relationship state, transition, NightFlow, Save, or RNG changes.
