# C2-204 — Artist/Geisha final production presentation reachability

Status: FINAL CANDIDATE BUILD / EXACT-HEAD CI RECORDED IN PR
Owner: Chat 2 / Presentation & Media

## Frozen runtime authority

Runtime PR: #234 `chat1/artist-geisha-complete-v16`

Exact frozen runtime head:
- `955f4accf7e25c42e0384ddb9f76e5612f41dd00`

Runtime required workflow:
- `mindy-successor check` #978 / id `36985517198`: SUCCESS

Runtime catalog:
- 67 packs
- 252 events
- 39 actions
- 22 endings

Runtime tests:
- 915 / 915 pass
- 0 fail

The Chat 2 final branch is rebuilt directly on this exact frozen runtime. PR #228 remains preparation/history only and is not the production integration base.

## Exact frozen Artist presentation authority

Career:
- 8 exact stages:
  - `novice`
  - `performer`
  - `recognized-artist`
  - `veteran`
  - `master-artist`
  - `patron-network`
  - `court-invitation`
  - `outcome-ready`

Professional relationship:
- exact id: `artist-geisha.mentor`
- 5 exact stages:
  - `introduced`
  - `professional-trust`
  - `conflict-open`
  - `utility-ready`
  - `route-resolved`

Exact Artist items/capabilities:
- `artist_formal_attire` / `artist_formal_presence`
- `artist_performance_kit` / `artist_performance_ready`
- `artist_invitation_token` / `artist_handle_invitation`

Exact Night choices:
- `artist-geisha.night.rehearsal`
- `artist-geisha.night.salon`
- `artist-geisha.night.mentor-review`

Exact advanced readiness presentation facts:
- `veteran-ready`
- `master-artist-ready`
- `patron-network-ready`
- `court-invitation-ready`
- `outcome-ready`

Live Artist events:
- 29 events with `sourceDomain: "artist-geisha"`
- 31 exact event-variant presentation surfaces

School boundary:
- no `artist-geisha.school.*` event exists in the frozen runtime
- the five existing School hooks remain producer-threshold/public-fact null
- Chat 2 publishes no invented School event presentation ID

Activity boundary:
- frozen contract publishes no Artist-specific Activity consumer
- Chat 2 publishes no Artist Activity presentation dependency

Ending boundary:
- only public Artist ending: `ending.artist-geisha.hard-work`
- no public Master Artist / Patron Network / Court Invitation ending ID
- Court Invitation never implies Palace access

## Final semantic surface count

The final regression builds one exact frozen Artist presentation set of **61 semantic surfaces**:

- 1 ordinary result
- 4 ordinary seasonal Work
- 1 existing Hard Work ending
- 8 career stages
- 5 mentor relationship stages
- 3 item/capability surfaces
- 3 exact Artist Night choices
- 5 advanced readiness surfaces
- 31 live event-variant surfaces

All advanced semantic surfaces are backed by exact frozen runtime identities and fall back to the shipped project-owned Artist result static source unless they already have a more specific shipped static override.

## Night presentation consumer

The existing Night UI recognizes only the three exact frozen Artist Night choice IDs.

For those exact choices it:
- publishes a deterministic Artist semantic presentation ID;
- supplies presentation-specific RU/EN aria naming;
- uses the existing NightFlow command and phases unchanged;
- resolves through the required Artist static fallback when animations are off or optional motion is unavailable.

No NightFlow rule, lodging rule, time cost, next-day Energy rule, or School-night competition mechanic is changed by Chat 2.

## Production reachability gate

`artist-geisha-production-presentation-reachability-c2-204.test.ts` verifies:

- all 8 exact career stages are live-backed;
- all 5 exact mentor stages are live-backed;
- all 3 exact item capabilities are live-backed;
- all 3 exact Night choices are live-backed;
- all 5 readiness facts are live-backed;
- all 29 Artist events and all 31 variants have exact production presentation IDs;
- exactly 61 Artist semantic surfaces are expected and reachable;
- all 61 resolve to project-owned static media with animations disabled;
- the shipped result / four seasons / Hard Work retain RU/EN alt and caption parity;
- presentation resolution leaves a representative Save unchanged;
- one real natural Year-3 `artist-geisha.shift` reaches:
  - `job/artist-geisha/result/default`
  - `artist-geisha.career.first-shift` exact event presentation;
- missing optional motion falls through to Artist static media;
- existing Lumber / Satyr Maid / Undead Farm / Tavern / Hunter / Guard / Merchant / Forest / town consumers remain present;
- Artist and Merchant semantic namespaces have zero exact collision.

## Ownership firewall

C2-204 changes presentation/media/accessibility only.

It does not change:
- gameplay conditions/effects/rewards;
- career transitions or readiness mechanics;
- relationship mechanics;
- inventory/capability behavior;
- School producer authority;
- NightFlow mechanics;
- Activity mechanics;
- Save/RNG;
- economy;
- ending eligibility/rewards;
- Meta;
- Palace access;
- generic patron or contest systems.

Exact final branch head, workflow run, validator counts and test counts are recorded in the final PR body/comment after exact-head CI completes so the frozen candidate SHA is not moved by evidence-only edits.
