# Chat 6 — Palace Media Production Plan v20

Status: **READY_FOR_PRODUCT_LOCK**  
Owner: Chat 6  
Branch: `chat6/palace-media-production-plan-v20`

Frozen content base:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

Source manifest:

`mindy-successor/research/palace_missing_media_v1.csv`

Scope: research/planning only.

No mechanics changes.  
No gate/reward/economy changes.  
No presentation-engine changes.  
No final Prince name/species/appearance canon.  
No full CI.

---

## 1. Product recommendation

### Minimum 1.0 asset count: exactly **4 static SVG assets**

Produce one reusable 16:9 Palace asset for each currently missing media group:

1. **P1 — Threshold Archive**
2. **P1 — Custodian Audience**
3. **P1 — Return Home Threshold**
4. **P2 — Service Interior**

No additional variants are required for 1.0.

The existing presentation architecture already allows one static asset to be reused across multiple semantic slots. The current Palace content has 19 mapped presentation slots, but those 19 slots collapse cleanly into four visual families.

### Why four is the minimum

Fewer than four would force at least one of these materially different canonical concepts to share misleading imagery:

- ordinary Palace administration;
- protected evidence/archive work;
- a formal audience with the human Custodian;
- an inter-world departure.

Those concepts carry different D45 red lines. Keeping one dedicated visual per group is the smallest set that improves fidelity without creating new presentation mechanics.

### Not required for 1.0

Do **not** require:

- animation;
- GIF pools;
- season variants;
- multiple camera angles;
- separate success/failure Prince images;
- separate images for each confrontation phase;
- separate images for each ending;
- a visible original-world city/location;
- a visual explanation of Threshold physics.

Animated or alternate variants can be post-1.0 polish.

---

## 2. Existing project-owned media inventory audit

Audit base:

`chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

### Inventory totals

Existing project-owned media files inspected:

- root `assets/`: **13 SVG**
- `assets/presentation/`: **103 files**
  - **97 SVG**
  - **6 GIF**
- `assets/presentation-frames/`: **36 SVG**

Total inspected media files:

**152**

### Current Palace-specific inventory

Dedicated Palace art at the frozen v19 base:

**0**

v19 therefore intentionally uses neutral existing fallbacks:

- `assets/stage-room.svg`
- `assets/stage-town.svg`

### Existing production convention

The main stage uses:

`--stage-aspect: 16 / 9`

Current media rendering uses:

`object-fit: contain`

Representative existing scene art:

- `assets/stage-town.svg` → `viewBox="0 0 1200 675"`
- `assets/stage-room.svg` → `viewBox="0 0 1200 675"`
- many production presentation SVGs also use 16:9;
- older ending art may use `960 × 540`, also 16:9.

Therefore the Palace 1.0 art plan should standardize on:

**SVG, 1200 × 675 viewBox, 16:9.**

---

## 3. Exact file naming

Create these four files only for the minimum 1.0 Palace set:

1. `assets/presentation/palace-threshold-archive.svg`
2. `assets/presentation/palace-custodian-audience.svg`
3. `assets/presentation/palace-return-home-threshold.svg`
4. `assets/presentation/palace-service-interior.svg`

Names are:

- lowercase;
- hyphen-separated;
- Palace-prefixed;
- semantic rather than phase-numbered;
- reusable across multiple slots.

Do not encode a final Prince personal name, species, dynasty, room name, or architectural proper noun in filenames.

---

## 4. Priority and production order

Recommended production order:

### 1. P1 — Custodian Audience

File:

`assets/presentation/palace-custodian-audience.svg`

Reason:

- covers all four confrontation phases;
- covers the most narratively sensitive Palace sequence;
- establishes that Prince confrontation is procedural/evidentiary, not combat.

### 2. P1 — Threshold Archive

File:

`assets/presentation/palace-threshold-archive.svg`

Reason:

- supports duty 12/15 reveal escalation;
- supports Inner Truth;
- visually distinguishes protected evidence from ordinary Palace work.

### 3. P1 — Return Home Threshold

File:

`assets/presentation/palace-return-home-threshold.svg`

Reason:

- supports the True ending;
- has the highest risk of accidentally violating D45 if visually overexplained.

### 4. P2 — Service Interior

File:

`assets/presentation/palace-service-interior.svg`

Reason:

- most replaceable by existing neutral `stage-room.svg`;
- improves continuity and institutional identity, but is not necessary to understand D45.

If only three assets land before 1.0, ship the three P1 assets and keep the current Service Interior fallback.

---

## 5. Asset A — Threshold Archive

### File

`assets/presentation/palace-threshold-archive.svg`

### Minimum visual brief

A protected archival/records interior with:

- multiple record shelves, desks, cases, ledgers, sealed containers or indexed storage;
- visible signs of controlled provenance and cross-referencing;
- more than one work area or source cluster, so the image does not imply one single omniscient book/file;
- restrained Palace institutional design;
- no supernatural throne-room staging.

The visual should communicate:

**protected evidence + distributed records + controlled access**

rather than:

**magic vault containing the final answer**.

### Reuse targets

Use for:

- duty 12 — Crossroads;
- duty 15 — Outcome Ready;
- Inner Truth finalize;
- Inner Truth ending.

### Canon red lines

Must not depict:

- the original cause of the heroine's displacement;
- a diagram that fully explains Threshold mechanics;
- a single master record that contains all truth;
- a creator identity for the Threshold;
- a dynasty crest that implies an unapproved family canon;
- proof that the Palace caused the heroine's arrival;
- a portal as permanently open;
- another world as demonstrably fake or simulated.

### Composition

Recommended:

- records/evidence as main visual subject;
- no single glowing object as the sole focal truth source;
- at least two visually distinct evidence clusters;
- controlled doorway, barrier, desk, seal or archival boundary can imply access discipline;
- human figures optional, but not required.

### Current fallback if missed

Acceptable 1.0 fallback:

`assets/stage-room.svg`

This fallback is already wired in v19 with explicit neutral accessibility copy.

---

## 6. Asset B — Custodian Audience

### File

`assets/presentation/palace-custodian-audience.svg`

### Minimum visual brief

A formal Palace evidence-review/audience setting.

The image may include:

- a human Prince/Custodian figure;
- a desk or table;
- records between the parties;
- controlled institutional surroundings;
- balanced spatial composition suggesting an argument/review.

The key visual statement must be:

**formal authority reviewing evidence**

not:

**boss battle**.

### Reuse targets

Use for:

- `palace.confront-prince` opening;
- phase 1 — Audit the Record;
- phase 2 — Name the Contradiction;
- phase 3 — Define the Boundary;
- phase 4 — Reconstruct the Return Claim;
- defeat aftermath if a future slot uses the same surface.

### Prince depiction policy

The image may show a human office-holder, but must avoid locking unnecessary canon.

Recommended minimum depiction:

- adult human silhouette or readable human figure;
- formal but not divine clothing;
- neutral-to-controlled posture;
- no weapon-forward pose;
- no romantic intimacy;
- no species-defining nonhuman anatomy;
- no unique family crest;
- no explicit age beyond adult;
- no named personal regalia.

If Product does not want even this amount of appearance canon, use an over-shoulder / partial-profile / distant composition where the office is clear but facial specifics remain nonbinding.

### Canon red lines

Must not depict Prince as:

- deity;
- angel/demon;
- avatar of the Palace;
- supernatural giant;
- combat boss;
- armed opponent about to attack;
- romantic route endpoint;
- physically defeated, injured, dead or deposed.

Success in D45 is epistemic/procedural.

### Current fallback if missed

Acceptable 1.0 fallback:

`assets/stage-room.svg`

The v19 alt/caption already states that the dedicated Prince design is absent and the neutral interior adds no supernatural qualities.

---

## 7. Asset C — Return Home Threshold

### File

`assets/presentation/palace-return-home-threshold.svg`

### Minimum visual brief

A restrained crossing/departure image.

The image should communicate:

- a real boundary or passage;
- movement from one valid world toward another;
- departure rather than destruction;
- personal crossing rather than universal rewrite.

A strong minimum composition:

- heroine or small human silhouette facing/crossing a bounded luminous or spatial discontinuity;
- Palace/successor-world space remains visibly intact behind;
- destination can be suggestive but not detailed enough to lock the original world's geography.

### Reuse target

Use for:

- `ending/palace/return-home`

No separate animation is required for 1.0.

### Canon red lines

Must not depict:

- successor world dissolving;
- Palace collapsing because she leaves;
- people turning into illusions;
- simulation code;
- dream imagery implying awakening;
- Prince opening the Threshold by divine force;
- a known scientific/magical mechanism not established in D45;
- the original displacement cause;
- a destination landmark that creates new original-world canon;
- a world merge;
- timeline rewrite.

The image must allow the interpretation:

**she leaves a real world; that world continues.**

### Current fallback if missed

Acceptable 1.0 fallback:

`assets/stage-town.svg`

This is less ideal than the P1 asset but canon-safe and already supported by v19 accessibility copy.

---

## 8. Asset D — Service Interior

### File

`assets/presentation/palace-service-interior.svg`

### Minimum visual brief

A practical Palace administrative interior with:

- desks;
- ledgers;
- route slips;
- storage;
- controlled doors/passages;
- visible work surfaces;
- a sense that multiple departments exchange information.

This is the visual home for the Palace as an institution before the deeper reveal.

### Reuse targets

Use for:

- duty 2 — Working Rhythm;
- duty 5 — Trusted Service;
- duty 8 — Palace Network;
- Service Life finalize;
- Court Power finalize;
- Service Life ending;
- Court Power ending.

### Canon red lines

Must not depict:

- throne-room dominance as the default Palace identity;
- supernatural architecture that gives away the Threshold;
- a visible portal;
- hidden lore in readable props;
- a new family/dynasty name;
- a personal Prince portrait;
- a single secret object explaining the Palace;
- romance-coded private chamber imagery.

### Current fallback if missed

Acceptable 1.0 fallback:

`assets/stage-room.svg`

This is the safest asset to defer because the current fallback already communicates a neutral interior.

---

## 9. Exact presentation-slot mapping

After art production, v19's current static overrides should be changed only by replacing the `src` path and associated alt key as appropriate.

No new slot type is required.

### Palace Service Interior

Map:

`assets/presentation/palace-service-interior.svg`

to:

- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `ending/palace/service-life`
- `ending/palace/court-power`

### Threshold Archive

Map:

`assets/presentation/palace-threshold-archive.svg`

to:

- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `ending/palace/inner-truth`

### Custodian Audience

Map:

`assets/presentation/palace-custodian-audience.svg`

to:

- `location/town/palace/confront-prince/default`
- `job/palace/event/palace-prince-confrontation-phase-01-audit-record/default`
- `job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default`
- `job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default`
- `job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default`

### Return Home Threshold

Map:

`assets/presentation/palace-return-home-threshold.svg`

to:

- `ending/palace/return-home`

### Invitation

Keep existing neutral town reuse for 1.0:

- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`

Use:

`assets/stage-town.svg`

Reason:

the invitation happens before the Palace's deeper visual identity is known; a neutral town image is both canon-safe and narratively appropriate.

Therefore the four new assets replace **17** of the 19 Palace v19 slot fallbacks.

The two invitation slots remain intentionally on the existing town asset.

---

## 10. Aspect ratio, dimensions and crop requirements

### Required master format

For all four assets:

- format: **SVG**
- viewBox: **0 0 1200 675**
- aspect: **16:9**
- no external web references;
- no embedded remote fonts;
- no text essential to understanding the image.

### Why 1200 × 675

This matches existing core scene assets such as:

- `stage-town.svg`
- `stage-room.svg`

and exactly matches the runtime stage ratio.

### Runtime crop behavior

Current runtime:

- stage aspect: 16:9;
- media: `object-fit: contain`.

Therefore:

- the full asset remains visible;
- no alternate crop export is needed for 1.0;
- do not design critical meaning outside the 16:9 master.

### Safe composition zone

Even though runtime does not crop the art, UI overlays can cover parts of the scene.

Keep essential visual information:

- away from the top ~15–18% where stage title/gradient may sit;
- away from extreme outer ~8% margins;
- preferably within central ~70% width and middle/lower ~70% height.

For Custodian Audience specifically:

- do not put the Prince's only readable face detail directly under the title overlay;
- keep evidence/table interaction near the center.

For Threshold Archive:

- distribute evidence across center-left/center-right;
- do not hide the only meaningful record in a corner.

For Return Home:

- keep both the departing figure and the intact world-behind signal clearly readable in the central field.

### Mobile

The stage remains 16:9 at small viewport widths.

No separate mobile artwork is required.

---

## 11. Accessibility requirements

### Runtime requirement

Each presentation static override must provide:

- non-empty `alt`;
- localized `altKey`.

The visible image must never be required to understand:

- a gate;
- a choice consequence;
- a hidden fact;
- the correct confrontation answer.

All necessary narrative information remains in text.

### Alt-text rules

Alt text should describe:

- what is visibly present;
- the scene function;
- relevant non-misleading context.

Alt text must not:

- reveal facts before the authored reveal;
- explain hidden mechanics;
- state ambiguous claims as fact;
- add Prince appearance canon not visible/locked;
- describe a failure/success outcome not shown.

Target length:

- preferably 80–180 characters per language;
- hard runtime schema limit remains 300 characters.

### Caption rules

The current presentation schema has no dedicated runtime caption field.

Therefore RU/EN caption strings are production/accessibility copy reserves and should be kept in localization for any current/future caption surface without adding a new engine.

Captions should:

- clarify what the art intentionally does **not** establish where useful;
- remain short;
- not duplicate full narrative prose.

No new presentation engine is authorized to expose captions.

---

## 12. Required RU/EN localization keys

Recommended stable keys for the four final assets:

### Service Interior

- `presentation.static.palace.service-interior.alt`
- `presentation.static.palace.service-interior.caption`

### Threshold Archive

- `presentation.static.palace.threshold-archive.alt`
- `presentation.static.palace.threshold-archive.caption`

### Custodian Audience

- `presentation.static.palace.custodian-audience.alt`
- `presentation.static.palace.custodian-audience.caption`

### Return Home Threshold

- `presentation.static.palace.return-home-threshold.alt`
- `presentation.static.palace.return-home-threshold.caption`

Current generic v19 Palace alt/caption keys may remain as fallbacks during asset integration, but Product should prefer these asset-specific keys when final art lands.

### Suggested RU/EN copy intent

#### Service Interior alt

RU intent:

«Рабочий дворцовый интерьер со столами, записями и контролируемыми проходами; сцена показывает администрацию, а не скрытую магическую функцию.»

EN intent:

“Working Palace interior with desks, records, and controlled passages; the scene presents administration, not a hidden magical function.”

#### Threshold Archive alt

RU intent:

«Защищённый архив с несколькими группами записей и местами проверки источников; изображение не объясняет причину переходов.»

EN intent:

“Protected archive with multiple record groups and provenance work areas; the image does not explain the cause of the crossings.”

#### Custodian Audience alt

RU intent:

«Формальная встреча с человеческим Хранителем за столом с записями; сцена изображает проверку доказательств, а не бой.»

EN intent:

“Formal meeting with the human Custodian over a table of records; the scene depicts evidence review, not combat.”

#### Return Home Threshold alt

RU intent:

«Человек пересекает ограниченный межмировой Порог, оставляя позади целый и продолжающий существовать мир.»

EN intent:

“A person crosses a bounded inter-world Threshold while the intact world behind them remains and continues.”

Final copy should be reviewed against the final image before merge so alt text describes what is actually visible.

---

## 13. Reuse and variant plan

### 1.0 rule

Each visual family gets one reusable master.

No phase-specific visual variants.

### Service Interior reuse

One master supports 7 slots.

Narrative progression changes through text, not art variants.

This is intentional: the player learns new meaning in familiar institutional space.

### Threshold Archive reuse

One master supports 4 slots.

Do not create separate “mystery”, “truth”, and “ending” Archive art for 1.0.

The text supplies the epistemic progression.

### Custodian Audience reuse

One master supports 5 slots.

The same room/table composition reinforces that:

- this is one sustained evidentiary confrontation;
- progress is argumentative/epistemic;
- there is no escalating combat spectacle.

### Return Home reuse

One master supports 1 slot.

No need for a pool or animation.

### Post-1.0 optional variants

If art bandwidth exists later, the preferred additions are:

1. Return Home motion/transition variant;
2. Archive close-detail variant;
3. Custodian phase-4 evidence/reconstruction variant;
4. Palace service/network alternate angle.

These are polish only and should not be part of 1.0 acceptance.

---

## 14. Current fallback policy

If a final asset misses 1.0, the game must use the already-authorized v19 neutral fallback rather than substituting unrelated career art.

### Service Interior missing

Use:

`assets/stage-room.svg`

Status:

**acceptable for 1.0**

### Threshold Archive missing

Use:

`assets/stage-room.svg`

Status:

**acceptable but undesirable**

Reason:

text carries the canon and v19 accessibility copy explicitly avoids claiming a dedicated Archive visual.

### Custodian Audience missing

Use:

`assets/stage-room.svg`

Status:

**acceptable but undesirable**

Reason:

the neutral room avoids locking Prince appearance or implying combat.

### Return Home Threshold missing

Use:

`assets/stage-town.svg`

Status:

**acceptable but lowest-fidelity fallback**

Reason:

it is canon-safe and does not invent portal mechanics, but it lacks a visual departure beat.

### Do not use as emergency substitutes

Do not repurpose:

- combat/sparring art;
- assassin art;
- flirt/romance art;
- school art;
- forest portal-like imagery;
- a career-specific ending illustration;
- goblin imagery;
- unrelated animated pools.

A neutral fallback is better than a thematically misleading asset.

---

## 15. Global D45 visual red lines

No Palace 1.0 art may imply any of the following.

### World ontology

Forbidden:

- dream reveal;
- simulation interface;
- code/glitch world;
- world fading as “unreal”;
- successor world collapsing after Return Home.

### Heroine status

Forbidden:

- chosen-one halo/crown symbolism;
- godhood;
- cosmic ruler imagery;
- visual prophecy naming her as destined.

### Prince

Forbidden:

- deity/avatar presentation;
- monster/boss form;
- supernatural transformation;
- combat defeat;
- injury/death;
- forced abdication;
- mandatory romantic framing.

### Threshold

Forbidden:

- explicit machine diagram that resolves the mechanism;
- image proving who built it;
- image proving why the heroine was displaced;
- image proving Palace caused the displacement;
- image proving Return Home destroys or merges worlds.

### Palace

Forbidden:

- one artifact/book that literally contains all truth;
- throne-room-first visual identity for ordinary service;
- hidden eleventh-profession symbolism;
- mandatory romance symbolism;
- visual item gate;
- visual School/Activity requirement.

---

## 16. Acceptance checklist — per asset

Every final Palace asset must pass all items below.

### Technical

- [ ] file exists under `assets/presentation/`;
- [ ] exact approved filename;
- [ ] SVG;
- [ ] `viewBox="0 0 1200 675"`;
- [ ] 16:9;
- [ ] opens with no external resource dependency;
- [ ] no remote URL;
- [ ] no essential baked text;
- [ ] remains legible against stage background;
- [ ] important content survives stage-title overlay;
- [ ] presentation `src` resolves to the file;
- [ ] animations-disabled path still works because asset is static;
- [ ] no presentation-engine changes required.

### Accessibility

- [ ] non-empty fallback `alt`;
- [ ] localized `altKey`;
- [ ] RU alt present;
- [ ] EN alt present;
- [ ] RU caption reserve present;
- [ ] EN caption reserve present;
- [ ] alt describes visible content;
- [ ] alt does not add hidden lore;
- [ ] story remains fully understandable without image.

### Canon

- [ ] D45 ambiguity preserved;
- [ ] no displacement-origin answer;
- [ ] successor world remains real;
- [ ] no chosen-one/godhood framing;
- [ ] no combat-boss Prince framing;
- [ ] no mandatory romance implication;
- [ ] no new gate/reward/economy implication;
- [ ] no new Prince name/species canon;
- [ ] no hidden readable prop that changes canon.

---

## 17. Acceptance checklist — complete 1.0 set

The minimum Palace visual production set is accepted when:

- [ ] exactly four approved master SVGs exist;
- [ ] 17 non-invitation Palace v19 slots are remapped to those four assets;
- [ ] two invitation slots remain on neutral town media unless Product separately commissions invitation art;
- [ ] all four final asset-specific alt keys have RU/EN;
- [ ] all four final caption keys have RU/EN;
- [ ] no old Palace slot becomes text-only;
- [ ] fallbacks remain valid if any one new asset fails to load;
- [ ] no mechanics/content IDs change;
- [ ] no new presentation schema/engine capability is added;
- [ ] static review confirms the Prince remains human/non-combat;
- [ ] static review confirms Return Home leaves the successor world intact;
- [ ] static review confirms Archive art does not solve the displacement cause.

---

## 18. Product lock decisions requested

Product can lock the following without further gameplay design.

### Recommended lock A — asset count

**4 static SVGs for minimum 1.0.**

### Recommended lock B — format

**1200 × 675 SVG, 16:9, object-fit contain.**

### Recommended lock C — reuse model

- Service Interior → 7 slots
- Threshold Archive → 4 slots
- Custodian Audience → 5 slots
- Return Home Threshold → 1 slot
- Invitation remains existing Town fallback → 2 slots

### Recommended lock D — Prince visual specificity

Use a human adult office-holder, but keep personal appearance minimally specific unless Product separately locks a final character design.

### Recommended lock E — fallback policy

Neutral existing project-owned fallbacks remain shippable for 1.0 if any Palace art misses cutoff.

No art asset is allowed to become a gameplay gate or delay the already-frozen v18/v19 mechanical/content assembly.

---

## 19. Implementation handoff after Product lock

Once Product locks this plan, the art/media producer only needs to:

1. create the four SVG files;
2. add the eight RU/EN asset-specific alt/caption localization keys;
3. update the 17 relevant `content/presentation.json` static `src` and `altKey` entries;
4. leave the two invitation slots unchanged;
5. run presentation-schema/static path checks;
6. visually review all four assets at desktop and narrow viewport widths.

No TypeScript, schema, quest, condition, reward, economy, or Palace runtime change is required.

---

**READY_FOR_PRODUCT_LOCK**
