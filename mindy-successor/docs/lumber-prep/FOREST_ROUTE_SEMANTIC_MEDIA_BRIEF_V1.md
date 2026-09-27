# Forest Route Semantic Media Brief v1

Status: presentation-only visual brief for the two existing shipped Forest route identities.

Existing gameplay routes only:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Existing semantic presentation IDs only:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

No new route, condition, reward, token rule, Hunter semantic, challenge mechanic, RNG behavior or save-state field is created.

## Shared production expectations

Current safe static fallback:
`assets/stage-forest.svg`.

Until real route-specific media exists:
- the static Forest asset remains valid;
- no placeholder GIF path should be root-loaded as production;
- missing bespoke media must fall back cleanly;
- route media selection is presentation-only;
- locale switches must keep the same visual candidate and change only localized alt/caption text;
- media choice must not change Activity result, route state, progress, endurance or RNG.

Future animated pools should contain 3–5 semantically compatible candidates per route.

---

# Logging road

Semantic presentation ID:
`activity/forest/route/logging-road`.

## Visual identity

Primary read:
a route made legible by recent human work.

Visual anchors:
- wheel ruts;
- cut branches;
- worked clearings;
- timber stacks;
- chalk/axe work marks;
- transition from engineered road into narrower forest track.

Avoid:
- mystical symbols;
- Hunter-specific trail signs;
- old-boundary stones;
- supernatural effects;
- combat or danger cues not present in gameplay.

## Static fallback

Use:
`assets/stage-forest.svg`.

Expected alt direction:
neutral Forest route framing, not a claim that specific logging-road art is visible.

The fallback must not be mislabeled as a bespoke logging-road image.

## Future GIF opportunities

### Candidate: `forest-route-logging-wheel-ruts`

Brief:
slow lateral or forward movement along muddy wheel ruts with trimmed branches at the edges.

Useful for:
wheel-ruts scene.

No gameplay meaning:
rut depth or mud motion does not imply an endurance penalty.

### Candidate: `forest-route-logging-timber-stack`

Brief:
subtle motion across a clearing with stacked cut timber, bark and chips in the foreground.

Useful for:
timber-stack scene.

No gameplay meaning:
stack size does not imply reward, inventory or Lumber shift count.

### Candidate: `forest-route-logging-work-marks`

Brief:
close view of weathered chalk marks and axe cuts on roadside trunks, with light movement through branches.

Useful for:
work-marks scene.

No gameplay meaning:
marks do not unlock a route or establish a fact.

### Candidate: `forest-route-logging-narrowing`

Brief:
the broad worked road gradually narrows into a forest track as vegetation closes around it.

Useful for:
narrowing scene.

No gameplay meaning:
the narrowing does not close the route or alter progress.

## Composition notes

Prefer:
- readable path direction;
- ordinary forestry traces;
- grounded materials;
- moderate environmental motion.

Avoid excessive camera shake or busy movement that competes with dialogue text.

---

# Old boundary

Semantic presentation ID:
`activity/forest/route/old-boundary`.

## Visual identity

Primary read:
an older line through the Forest that is legible through repeated physical markers.

Visual anchors:
- moss-covered boundary stones;
- weathered cuts on trunks;
- narrow stony line;
- repeated marker-gap-marker rhythm;
- less-worked forest beyond the clearest signs.

Avoid:
- showing the Old Boundary Token unless a future approved asset specifically requires it;
- depicting the token being consumed, inserted, surrendered or transformed;
- Hunter iconography;
- explicit ritual/magical effects;
- declaring who created the markers;
- showing a reward or destination not established by gameplay.

## Static fallback

Use:
`assets/stage-forest.svg`.

Expected alt direction:
neutral Forest-route framing.

The fallback must not imply that old-boundary stones are visible in the generic static image.

## Future GIF opportunities

### Candidate: `forest-route-boundary-moss-stones`

Brief:
moss-covered stones emerging one after another through low forest growth.

Useful for:
stones scene.

No gameplay meaning:
visibility of stones does not change the existing capability gate.

### Candidate: `forest-route-boundary-old-marks`

Brief:
weathered cuts on several tree trunks, revealed as the view shifts along the line.

Useful for:
old-marks scene.

No gameplay meaning:
marks do not establish Hunter ownership, School knowledge or lore truth.

### Candidate: `forest-route-boundary-stony-line`

Brief:
a narrow stony strip between trees, with repeated marker spacing visible in depth.

Useful for:
clearing scene.

No gameplay meaning:
the visual boundary does not define token use.

### Candidate: `forest-route-boundary-beyond-markers`

Brief:
the camera passes the clearest markers into a less-worked section of forest while keeping older traces faintly visible.

Useful for:
beyond-markers scene.

No gameplay meaning:
passing a marker in presentation does not consume an item or trigger a deeper route outcome.

## Composition notes

Prefer:
- ambiguity;
- aged physical evidence;
- repeated marker rhythm;
- subdued environmental motion;
- a visible distinction from the newer logging road.

Avoid turning the route into overt fantasy lore before Product defines the deeper meaning.

---

# Locale and accessibility expectations

For both semantic presentation IDs:
- candidate identity is locale-neutral;
- the same asset is used in RU and EN;
- alt/caption localizes separately;
- alt describes visible content;
- caption may add restrained atmosphere;
- neither alt nor caption states a mechanic, threshold, reward or hidden lore truth.

Item 206 supplies the paired RU+EN alt/caption source for these two semantic presentation identities.

# Acceptance boundary

A future media integration is safe when:
1. the authoritative route is already selected;
2. the route state maps to the existing semantic presentation ID;
3. the media resolver selects only within that route’s presentation pool;
4. the selection cannot affect gameplay RNG or outcome;
5. save/reload does not duplicate or change Activity mechanics;
6. static fallback remains valid when no animated asset is available.

This brief is production guidance for presentation only.
