# C2-202 — Artist/Geisha advanced readiness presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Exact readiness facts

Current runtime contract publishes distinct Artist-local readiness facts:
- `veteran-ready`
- `master-artist-ready`
- `patron-network-ready`
- `court-invitation-ready`
- `outcome-ready`

Prepared semantic identity:
- `job/artist-geisha/state/<fact>`

A readiness surface is created only when the live Artist runtime text actually contains the exact backing fact.

Every readiness surface falls back to:
- `job/artist-geisha/result/default`

## Distinct advanced routes

### Master Artist
`master-artist-ready` communicates advanced performance/craft preparation only.

It must not visually imply:
- Patron Network;
- Court Invitation;
- Palace access;
- a public ending;
- automatic career commitment.

### Patron Network
`patron-network-ready` communicates Artist-local professional/social-network readiness.

It must not imply:
- a generic patron system;
- universal reputation;
- romance requirement;
- ownership of other careers' social networks;
- automatic ending commitment.

### Court Invitation
`court-invitation-ready` communicates Artist-local invitation/contact readiness only.

It must be visually distinct from both Master Artist and Patron Network and must never imply:
- Palace 10/10 unlock;
- Palace access;
- court office;
- legal privilege;
- a completed ending.

The runtime contract explicitly states that Court Invitation never satisfies or bypasses Palace unlock.

## Coexistence

Late-route readiness may coexist. Presentation must not suggest that one visible readiness card invalidates the others unless runtime state explicitly does so.

`outcome-ready` is a career-state/readiness surface, not an ending card.

## Mentor contract follow-through

The published runtime contract also fixes the recurring professional relationship identity:
- `artist-geisha.mentor`

Exact stages:
- `introduced`
- `professional-trust`
- `conflict-open`
- `utility-ready`
- `route-resolved`

C2-196 preparation is now represented by catalog-backed semantic slots:
- `relationship/artist-geisha-mentor/stage/<stage>`

Those slots materialize only if the live catalog contains the exact relationship and exact stage.

The relationship remains professional and romance-independent.

## Ending firewall

The only authorized public Artist/Geisha ending remains:
- `ending.artist-geisha.hard-work`

No Master Artist, Patron Network, Court Invitation or outcome-ready presentation surface creates a new ending ID, reward, eligibility rule or Meta mutation.

## Final binding rule

C2-204 must re-audit all readiness facts and mentor stages against the exact frozen runtime.

Stale/renamed/absent facts or stages must not retain a production override.

C2-202 changes no career progression, relationship behavior, gameplay conditions/effects/rewards, Palace rules, Save/RNG, economy, School/NightFlow/Activity mechanics, ending eligibility/reward or Meta.
