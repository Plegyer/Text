# Post-PR54 Forest Journal Ref Audit v3

Status: exact audit of current Forest result/reaction resolved choices against merged PR #54 journal/lastAction refs.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Pack:
`forest-result-content-v1`.

## Current reaction choices

| Reaction event | Outcome | Exact activityResult trigger | Choice | Title key | Choice text key |
| --- | --- | --- | --- | --- | --- |
| `forest-result-content-v1.success` | `success` | `activityResult(lumber.forest, success, lumber.forest.success)` | `return` | `event.forest-result-content-v1.success.title` | `event.forest-result-content-v1.success.choice.return.text` |
| `forest-result-content-v1.escape` | `escape` | `activityResult(lumber.forest, escape, lumber.forest.escape)` | `return` | `event.forest-result-content-v1.escape.title` | `event.forest-result-content-v1.escape.choice.return.text` |
| `forest-result-content-v1.failure` | `failure` | `activityResult(lumber.forest, failure, lumber.forest.failure)` | `return` | `event.forest-result-content-v1.failure.title` | `event.forest-result-content-v1.failure.choice.return.text` |

## Exact result identities

- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

PR #54 does not rename, recompute or replace these result identities.

## No replay / mutation

On choice resolution:
1. authoritative choice effects resolve once;
2. stable `eventChoice` ref is written to Journal refs and lastAction;
3. RU/EN rendering later uses localization keys derived from the ref.

Changing locale or reopening Journal must not:
- replay the choice;
- add/remove world facts;
- advance RNG;
- create another reaction;
- change Activity result identity;
- change Save identity.

## Conclusion

All 3 current Forest reaction choices map cleanly through the PR #54 stable-ref consumer while exact Forest result continuation remains unchanged.
