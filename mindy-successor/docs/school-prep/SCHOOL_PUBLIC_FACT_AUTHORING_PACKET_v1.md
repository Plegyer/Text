# School Public Fact Authoring Packet v1

Status: authoring contract only.
Scope: future School-owned milestones that may publish durable cross-system facts.
This packet deliberately does not choose final thresholds, final public fact IDs, certificate names, or milestone fiction.

## 1. Ownership

School owns:
- per-track counters such as `lessons_completed` and `night_study_sessions`;
- School-private facts;
- School milestones;
- School certificates;
- School choices.

External domains such as Lumber must not read or mutate those private values directly.

A cross-system School result may be published only through the accepted durable public boundary:
- current mechanism: `run.progression.worldFacts`;
- current condition: `worldFact`;
- current effect: `addWorldFact`;
- current reaction fact: `worldFactAdded`;
- future alternative: an explicitly typed domain-public equivalent preserving the same ownership boundary.

## 2. Authoring slots

Two known future authoring slots exist.

### Management/accounting slot

Purpose:
- publish a School-owned public result that a management/accounting Lumber route may consume.

Still OPEN:
- final public fact ID;
- exact `lessons_completed` threshold;
- exact stat threshold(s);
- project requirement;
- exam requirement;
- certificate requirement/name/effect;
- authored milestone scene.

### Arcana/forest knowledge slot

Purpose:
- publish a School-owned public result that Forest/Lumber content may consume.

Still OPEN:
- final public fact ID;
- exact `lessons_completed` threshold;
- exact Magic/Reason/other stat threshold(s);
- project requirement;
- exam requirement;
- certificate requirement/name/effect;
- exact Forest clue dependency;
- authored milestone scene.

No value from legacy `metrics.lessons` or the old `lessons >= 3` prototype exam gate is authoritative for either slot.

## 3. Publication transaction

A future authored School milestone that publishes a durable public fact must follow this semantic transaction:

`School-owned authoritative state -> milestone eligibility -> exactly-once publication -> Resolver boundary`.

Requirements:
1. evaluate against the complete authoritative School/character state;
2. do not evaluate on partial per-stat writes;
3. add the public fact exactly once;
4. persist the public fact before/with reaction resolution;
5. emit `worldFactAdded` exactly once when the fact first becomes public;
6. downstream domains react to the public fact and may not rewrite the School-owned milestone/counter;
7. reloading the same completed transaction must not emit or add the fact again.

## 4. Exactly-once identity

The authoring layer must provide a stable transaction/proof identity for a publication event.

Conceptual fields:
- `sourceDomain = school`;
- `trackId`;
- authored milestone/publication definition ID;
- public fact ID;
- stable transaction/proof ID;
- applied/completed marker.

The exact shared-schema representation is Lead-owned. This packet requires semantic idempotency, not a particular field layout.

Replay behavior:
- same transaction ID after reload -> no second counter mutation, no duplicate world fact, no second `worldFactAdded`;
- already-present public fact with completed proof -> treat as applied;
- malformed mismatch between proof and authored publication definition -> reject rather than guessing.

## 5. Reload stability

Stable checkpoints may occur:
- before authored milestone eligibility;
- after School-owned progress changes but before publication;
- after publication but before a downstream scene is resolved;
- with the downstream `worldFactAdded` reaction scene pending;
- after downstream reaction completion.

Reload must preserve:
- School-owned counters/facts;
- whether publication has already committed;
- the public fact;
- any pending Resolver scene snapshot;
- transaction/proof identity.

Reload must not:
- republish the public fact;
- reroll a pending deterministic reaction;
- increment School counters again;
- reopen a completed milestone solely because the save was parsed again.

## 6. Resolver boundary

Publication happens before the downstream Resolver observes the public result.

The same completed publication boundary provides:
- durable `worldFacts` state containing the fact;
- a single `worldFactAdded` reaction fact for first publication.

A Lumber/career/relationship event may therefore react immediately, without requiring:
- a Lumber shift;
- a manual job visit;
- another School lesson;
- another Night choice.

## 7. Negative ownership rules

Forbidden:
- Lumber reading `school.track.*.counters.lessons_completed` directly;
- Lumber reading `night_study_sessions` directly;
- Lumber writing School counters;
- School directly advancing a Lumber career stage merely because a School threshold was met;
- a public fact being inferred on every load instead of committed once;
- a public fact ID being chosen from a draft placeholder without authorial approval.

## 8. Authoring template

Future authored entries should fill this shape only after content approval:

```text
authoringId: <stable School milestone/publication ID>
trackId: <school.track.*>
privateEligibility:
  lessons_completed: <OPEN until authored>
  night_study_sessions: <OPEN/optional>
  stats: <OPEN>
  projects/exams: <OPEN>
privateResult:
  milestone/certificate/fact: <OPEN>
publicFactId: <OPEN>
publicationPolicy: exactly-once
resolverFact: worldFactAdded
reloadPolicy: preserve committed publication and pending reaction
```

Until those OPEN fields are authored, no implementation or test should substitute guessed production values.
