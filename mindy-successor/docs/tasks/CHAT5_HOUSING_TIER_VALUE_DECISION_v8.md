# Chat 5 — Housing tier value decision v8

Status: **READY FOR LEADER / PRODUCT DECISION — NOT RUNTIME AUTHORITY**
Owner: Chat 5
Branch: `chat5/housing-tier-value-decision-v8`
Research baseline: current `main = 5231aab1be6ad90aad4f1efd4cb48701b456159d`

Source audit:
`mindy-successor/docs/tasks/LEADER_HOUSING_SEMANTIC_AUDIT_v1.md`

No production runtime, UI, prices, or content packs are changed by this packet.

## 1. Problem statement

Live lodging:

| Tier | Cost | Current functional value |
| --- | ---: | --- |
| normal | 100 | no additional Energy/stat/access over cheap |
| cheap | 50 | same School Night Study access as normal |
| street | 0 | next-day Energy -1 and Grooming -1 |

The current audit establishes a strict dominance gap:

**cheap provides essentially the same functional lodging value as normal for half the price.**

At current live wages this is not a small inefficiency:
- fresh starter wages are roughly in the mid-teens per shift;
- three Day-1 starter-career shifts produce only about one cheap-room payment;
- the extra 50 required for normal can exceed an entire fresh three-shift day's residual economy.

The fix must therefore give normal a visible directed value, not merely add flavor.

## 2. Non-negotiable invariants

Any housing differentiation must preserve:

- normal price = 100;
- cheap price = 50;
- street price = 0;
- street Energy -1 / Grooming -1;
- School Night Study remains available on **normal OR cheap** unless separately locked later;
- public/workplace Night choices remain available when their fiction and existing gates allow them;
- no global rule such as "relationship Night requires a room";
- no original-game rent escalation;
- no Secret Debt forced Night cancellation;
- Secret Debt forced next-day Energy -1 remains effective;
- D30 Keystone identities/numbers remain unchanged;
- Palace qualification remains unchanged;
- no housing tier grants ordinary-career progression by itself.

---

# OPTION A — explicit private-space access allowlist

## A1. Exact mechanical effect

Normal lodging grants a Night-local capability:

`privateSpace = true`

Cheap and street do not.

The capability is **not** inferred from:
- relationship domain;
- romance status;
- Night choice category;
- sourceDomain.

Only an explicitly authored choice/event may require it.

Conceptually:

`requiresPrivateSpace: true`

Such a choice is available only after the player has paid for `lodging.normal` for the current Night.

This is an allowlist, not a global filter.

## A2. Existing surfaces that remain unchanged

Do **not** retroactively gate current work/public/professional Night content such as:

- Lumber Foreman professional follow-up;
- Satyr Maid staff debrief;
- Undead Farm process notes / keeper process review;
- Tavern house notes;
- Artist-Geisha rehearsal/salon/mentor review;
- current School Night Study;
- professional client/admin flows;
- ordinary relationship scenes that can occur at work/public/professional locations.

The current authored text explicitly makes many of these workplace/public/professional.

Housing must not rewrite their fiction.

The existing normal-only
`poverty-closure-production-v14.normal-tight-budget`
may remain normal-only but is not sufficient by itself because its choice has no mechanical effect.

## A3. New surfaces that consume private space

Recommended initial seed:

**three new optional private-space choices across three different relationship families**, authored by the owning career producers.

Seed targets:

1. **Satyr Maid recurring guest**
   - after the existing voluntary after-hours contact is established;
   - optional "host a private conversation" branch;
   - relationship/context effect only;
   - ordinary work and existing public/professional continuation remain available without it.

2. **Tavern recurring traveler**
   - after trusted professional contact;
   - optional private correspondence / confidential conversation branch;
   - may add a narrow relationship/information fact;
   - no career stage or Hard Work requirement depends on it.

3. **Prostitute recurring client relationship**
   - only after the relationship mode has already been chosen voluntarily;
   - optional private debrief/personal conversation;
   - no extra client wage;
   - no ordinary career or client-flow gate depends on it.

These are **new authored branches**, not instructions to reinterpret existing current scenes as room-bound.

Future producers may add more private-space choices only through the explicit allowlist mechanism.

## A4. Price justification

Normal costs +50 relative to cheap for that Night.

Under this model, the player pays that premium **only on Nights where private authored access matters**.

That creates a legible decision:

- cheap = budget lodging + School Night Study + public/workplace Night;
- normal = all cheap-compatible functions plus explicitly private authored choices;
- street = no privacy, harsher recovery, but still supports public/workplace content where already valid.

The model does not require normal to be the rational default every night.

That is a strength, not a weakness.

The goal is to remove strict dominance, not reverse it.

## A5. School Night Study

Unchanged.

All existing Night Study choices continue to accept:

`normal OR cheap`.

Private-space access must not be silently added to School Night Study.

If a future School scene genuinely requires private space, it needs its own explicit Product/authored allowlist entry.

## A6. Public/workplace Night choices

Unchanged.

No housing condition is added merely because a choice:
- occurs at Night;
- belongs to a relationship;
- is emotionally meaningful.

Street remains eligible for public/workplace Night choices where current fiction allows them.

## A7. Relationship routes

Private-space choices must be **optional side branches**.

Required rule:

> Lack of normal lodging may delay or remove a private variant, but may not block ordinary career progression or force a relationship route to terminate unless that exact private branch is itself the optional content being declined.

Each seeded relationship must retain:
- a public/professional continuation;
- or a clean "not tonight / continue normally" path.

Normal therefore adds intimacy/privacy opportunity, not a hidden mandatory relationship tax.

## A8. Save/runtime state

Minimal.

No new permanent housing progression state is required.

The capability can be derived from current Night lodging:

`run.housingState.current === 'normal'`

or from the already-resolved Night lodging snapshot.

Persist only the ordinary authored relationship/world facts produced by the private choice.

No:
- room streak counter;
- room upgrade progression;
- permanent private-room unlock;
- new Meta ownership field.

## A9. UI

Lodging cards should make the difference visible before purchase.

Normal:
> Private room — enables authored private-space choices tonight.

Cheap:
> Budget lodging — supports sleep and School Night Study; private-room choices unavailable.

Street:
> No private space; existing public/workplace Night choices may still be available. Applies current recovery penalties.

When a private choice is relevant but unavailable, UI may show a disabled/preview row:
> Requires a private room tonight.

Do not expose private choices globally if their relationship/story prerequisites are unmet.

## A10. D30 Keystone interaction

### Earned Reserve Match
Can indirectly make the 100-room premium easier to afford.

It does not:
- grant privateSpace;
- waive lodging cost;
- increase allowlist reach directly.

### Work Rhythm
No direct interaction.

Private-space choice consumes a Night slot where authored NightFlow says it does; +1 next-day Energy does not create another Night choice.

### Network Retainer
25/day can subsidize only half of the 50 normal-vs-cheap premium.

It does not itself buy or unlock the room.

While Secret Debt-bound it pauses under D32 anyway.

### Future No Rent Keystone
If a future No Rent effect makes normal lodging free, private-space access would become free for that run.

That is acceptable **only because No Rent is Keystone-class broad housing power**.

It must not be reclassified downward merely because private-space access exists.

## A11. Secret Debt precedence

Forced Secret Debt Night wins.

Current D19 forced Night:
- intercepts after lodging;
- suppresses voluntary Night menu;
- consumes the Night.

Therefore:
- paying for normal does not reveal/enable private choices on that forced Night;
- normal never cancels forced work;
- next-day Energy -1 still applies.

No special exception is needed.

## A12. Abuse/dominance risks

Primary risk:
**content creep**.

If producers mark every desirable relationship choice as private:
- normal becomes effectively mandatory;
- cheap becomes a fake option.

Containment rule:

> Private-space allowlist may contain only choices whose fiction truly depends on private lodging and whose absence does not block ordinary progression.

Secondary risk:
No Rent + normal may make private access costless, but that is acceptable Keystone-level housing power.

## A13. Minimal producer scope

Shared:
- one explicit private-space condition/capability;
- lodging UI copy;
- Night-choice lock reason.

Content:
- three initial optional private-space branches;
- one each in Satyr Maid / Tavern / Prostitute relationship-owned packs.

No inventory system.
No new Energy rules.
No migration counter.

## A14. Acceptance tests

1. normal exposes an allowlisted private choice when all non-housing prerequisites pass;
2. cheap does not expose/enable that private choice;
3. street does not expose/enable it;
4. School Night Study remains valid on normal and cheap;
5. existing public/workplace Night choices remain unchanged on cheap;
6. existing public/workplace Night choices are not globally blocked on street;
7. declining/not having private access does not break ordinary career progression;
8. save/reload after lodging preserves the correct current-Night private-space state;
9. save/reload after taking a private choice persists only its authored facts/choices;
10. Secret Debt forced Night suppresses private choice even after normal lodging is paid;
11. D30 rewards do not directly grant privateSpace;
12. Palace D23 and Hard Work state are unchanged.

---

# OPTION B — bounded storage / preparation utility

## B1. Exact mechanical effect

Normal lodging provides one run-local **secure preparation slot**.

The player may place one owned item into that slot while at normal lodging.

Rules:
- slot capacity = **1 item stack/identity**;
- stashed item cannot be used while stashed;
- it can be retrieved only on a later normal-lodging Night;
- authored item-loss/removal effects explicitly tagged as external loss cannot target the stashed item;
- the slot itself grants no stat, money, Energy, access or success bonus.

Cheap/street have no secure slot.

## B2. Existing/new surfaces consuming it

Current live game has inventory and route items, but very little current pressure from:
- carry capacity;
- theft/loss;
- item upkeep.

Therefore the storage mechanic has **low immediate value** unless new authored consumers are added.

To become meaningful it would require:
- explicit item-loss/risk surfaces;
- Activity/contract prep scenes where choosing what to carry matters;
- or a future inventory/carry constraint.

That makes this option structurally honest but currently under-supported.

## B3. Price justification

At present:
**insufficient by itself**.

Paying +50/night for item protection is not compelling when current content rarely threatens carried items.

Adding artificial theft merely to justify normal would violate the goal of not making cheaper tiers worse.

## B4. School Night Study

Unchanged.

A stashed School-related item cannot be used while stashed unless a future authored rule says otherwise.

No School discount.

## B5. Public/workplace Night / relationships

Unchanged.

Storage must never become a relationship gate.

## B6. Save/runtime state

Requires new run-local state:
- `securedItemId`;
- stack/count semantics if inventory stacks;
- transfer validation;
- save/reload/migration rules.

This is more state than Option A.

## B7. D30 interaction

Mostly orthogonal.

- Reserve Match/Retainer may help afford normal.
- Work Rhythm does not alter storage.
- no Keystone should add a second secure slot without a new decision.

## B8. Secret Debt precedence

A previously stored item remains stored.

But forced Night:
- prevents voluntary storage/retrieval that Night if interaction lives in voluntary Night;
- cannot be cancelled by having a secured item.

## B9. Abuse/dominance risks

Risks:
- duping items across stash/inventory on reload;
- hiding items from intended consumption rather than only external loss;
- making one-slot storage mandatory if high-value loss events become common;
- adding artificial loss pressure simply to justify the system.

## B10. Minimal producer scope

Not minimal.

Requires:
- shared inventory-state extension;
- storage UI;
- item move semantics;
- tagged external-loss effects;
- authored content that makes protection matter;
- migration/regression coverage.

## B11. Acceptance tests

1. one item may be stashed only in normal;
2. second item is rejected;
3. stashed item is unavailable for ordinary item requirements;
4. retrieval requires normal;
5. tagged external loss skips secured item;
6. ordinary explicit consumption cannot be bypassed by stashing unless the action cannot be taken;
7. save/reload cannot duplicate/delete item;
8. forced Night blocks same-Night stash interaction;
9. School/public Night unchanged;
10. Secret Debt/Palace unaffected.

---

# OPTION C — narrowly bounded rest / recovery utility

## C1. Exact mechanical effect

A **qualifying normal sleep** is:

- paid `lodging.normal`;
- followed by the ordinary `night.sleep` voluntary choice;
- not replaced by School Night Study;
- not replaced by relationship/professional Night;
- not replaced by forced Night.

Every **5 qualifying normal sleeps** grants:

**+1 usable Energy on the next calendar day**.

Rules:
- qualifying sleeps need not be consecutive;
- progress counter resets by 5 after each reward;
- maximum **12 Deep Rest rewards per run**;
- no reward after the 12th;
- cheap/street sleep do not add progress;
- forced Night neither advances progress nor grants the reward.

## C2. Why 5 sleeps / max 12

Normal costs 50 more than cheap.

Five qualifying normal sleeps therefore cost at least:

**250 extra money**

relative to five cheap sleeps.

One extra Energy can produce at most one extra 1-Energy action.

Current ordinary wage at stat cap 100 is still only roughly 75–115 depending on career.

Therefore using every Deep Rest point purely for one extra paid shift:
- cannot repay its 250-money lodging premium;
- does not create a positive-money loop.

It may still be valuable for:
- School scheduling;
- Activity scheduling;
- multi-career throughput.

That is the intended directed rest value.

Maximum 12 rewards means:
- at least 60 paid normal sleeps to exhaust;
- at least 3000 extra money paid versus cheap;
- at most 12 extra Energy over the 160-day run.

This is below D32 Work Rhythm's maximum 20 extra Energy and far below an unconditional +1/day Keystone.

## C3. Price justification

Normal becomes a premium recovery choice for players who:
- regularly choose sleep;
- have enough money;
- value schedule flexibility.

Cheap remains strictly more money-efficient.

The player can alternate:
- cheap on study/relationship nights;
- normal when building Deep Rest progress.

That creates a real but non-mandatory decision.

## C4. School Night Study

Night Study remains available on normal and cheap.

However:
- a Night Study choice is **not** a qualifying normal sleep;
- therefore it does not advance Deep Rest progress.

This prevents normal from simultaneously giving:
- Night Study;
- and sleep recovery credit
for the same Night.

## C5. Public/workplace Night / relationships

Unchanged.

Any voluntary Night choice other than ordinary sleep simply does not count toward Deep Rest.

It is never blocked by the recovery system.

## C6. Save/runtime state

Requires run-local:
- `deepRestProgress: 0..4`;
- `deepRestRewardsUsed: 0..12`;
- pending next-day +1 modifier when the fifth qualifying sleep commits.

Save/reload must preserve all three exactly.

## C7. D30 interactions

### Reserve Match / Retainer
May help afford normal, but do not alter Deep Rest rate/cap.

### Work Rhythm
Can coincide on a Deep Rest reward day.

Ordering:
- base Energy;
- Work Rhythm +1 if armed;
- Deep Rest +1 if earned;
- then Secret Debt forced next-day -1 if bound.

Because Deep Rest is expensive and capped at 12, this composition does not recreate unconditional +1/day.

Still, it creates the highest cross-system QA burden of the three housing options.

## C8. Secret Debt precedence

Forced Night prevents ordinary sleep.

Therefore:
- no Deep Rest progress is earned on a forced Secret Debt Night.

If a Deep Rest +1 was already earned from the prior Night and the route becomes bound before that morning:
- the +1 may resolve;
- forced Secret Debt -1 still applies afterward;
- bound state remains one Energy lower than the same unbound modifier set.

Housing never cancels D19.

## C9. Abuse/dominance risks

- players may optimize around 4/5 progress and buy normal only for milestone Nights;
- Work Rhythm + Deep Rest can occasionally stack +2 before D19 penalty;
- long rich runs may treat the progress bar as mandatory optimization;
- if wage scale rises substantially later, 250 money per Energy may become less expensive relative to work.

The 12/run cap contains the worst case.

## C10. Minimal producer scope

Medium shared-system scope:
- Night sleep result hook;
- two run-local counters;
- next-day modifier;
- lodging UI progress display;
- Energy-source UI;
- tests.

No new authored relationship content required.

## C11. Acceptance tests

1. normal + sleep increments progress once;
2. cheap/street + sleep do not;
3. normal + School Night Study does not;
4. normal + relationship/workplace Night does not;
5. fifth qualifying sleep grants exactly next-day +1 and resets progress;
6. cap of 12 rewards is enforced;
7. reward cannot duplicate on reload;
8. progress persists over non-normal Nights without resetting;
9. forced Secret Debt Night grants no progress;
10. already-earned +1 resolves before D19 forced -1;
11. Work Rhythm composition is additive but D19 remains one lower than same unbound state;
12. no Hard Work/Palace state changes.

---

# 4. Comparative evaluation

| Criterion | A. Private-space allowlist | B. Secure preparation slot | C. Bounded Deep Rest |
| --- | --- | --- | --- |
| Gives normal real value now | **Yes, once seeded with private choices** | Weak without new item-risk content | Yes |
| Keeps cheap viable | **Yes** | Yes | Yes |
| Keeps street viable | **Yes** | Yes | Yes |
| Avoids broad economy inflation | **Best** | Best | Moderate |
| Avoids Energy inflation | **Yes** | Yes | No, but bounded |
| Uses existing systems cleanly | **Yes** | Weak | Yes/medium |
| Requires new authored content | 3 seed branches | Significant item-risk/prep content | None |
| Shared runtime state burden | **Very low** | High | Medium |
| Save migration burden | **Very low** | High | Medium |
| D30 interaction complexity | **Low** | Low | Highest |
| Secret Debt precedence clarity | **Excellent** | Good | Good, needs ordering tests |
| Legibility to player | **Excellent** | Medium | Excellent |
| Risk of normal becoming mandatory | Content-dependent | Low today | Moderate for optimizers |

---

# 5. Recommendation

## Recommend Option A — explicit private-space access allowlist

Reason:

1. It fixes the actual semantic gap:
   normal buys **privacy**, not just a larger number.

2. It does not distort the already-harsh live economy:
   no free money;
   no universal Energy;
   no hidden stat protection.

3. It preserves cheap as the natural budget lodging:
   cheap keeps School Night Study and public/workplace Night.

4. It preserves street as harsh but playable:
   street still allows public/workplace choices where authored.

5. It has the cleanest D19 behavior:
   Secret Debt forced Night simply suppresses the voluntary private menu like every other voluntary Night.

6. It requires almost no new persistent state.

7. It is easy to explain before purchase:
   **100 = private room/access; 50 = budget room; 0 = street pressure.**

## Exact recommended initial scope

If Product accepts Option A, lock:

- `normal` exposes explicit `requiresPrivateSpace` choices;
- `cheap` and `street` do not;
- existing School Night Study remains normal OR cheap;
- existing public/workplace Night choices are not retroactively gated;
- launch with **3 optional private-space authored branches** across:
  - Satyr Maid recurring guest;
  - Tavern recurring traveler;
  - Prostitute recurring-client relationship;
- none of the three may gate ordinary career progression or Hard Work;
- forced Secret Debt Night always overrides private-space availability.

This is sufficient to make normal mechanically non-dominated without turning it into the universal best lodging.

---

# 6. Secondary recommendation if Product prefers a system-only fix

If Product does not want new authored private branches, choose Option C with the exact bounded rule:

**every 5 qualifying normal sleeps => next-day +1 Energy, max 12 rewards/run.**

Do not approve a stronger unconditional normal-room +1/day rule.

Option B should be deferred until inventory/storage pressure exists for independent gameplay reasons.

---

# 7. Product decision text candidates

## Preferred lock text — Option A

> Normal lodging provides private-space capability for explicitly allowlisted authored Night/relationship choices. Cheap lodging retains existing School Night Study and public/workplace Night access but does not provide private-space capability. Street remains eligible for existing public/workplace Night choices where their own conditions allow them. Housing tier does not globally gate relationship content. Initial production should seed three optional private-space relationship branches in Satyr Maid, Tavern and Prostitute content. These branches may not gate ordinary career progression or Hard Work. Secret Debt forced Night always overrides voluntary private-space choices.

## Alternate lock text — Option C

> A qualifying normal-room sleep advances Deep Rest. Every five qualifying normal sleeps grants +1 usable Energy on the following day, up to 12 times per run. School Night Study, relationship/professional Night choices and forced Nights do not count as qualifying sleep. Cheap and street grant no Deep Rest progress. Any Secret Debt forced next-day Energy -1 applies after the already-earned Deep Rest modifier and remains a real one-Energy loss. Lodging prices are unchanged.

Both texts remain proposals until Leader/Product records one as authority.
