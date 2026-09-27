# Full-Game presentationId Authoring Template v1

Use this template for future authored scenes across careers, School, poverty, Night, Activity, Palace and endings.

Do not fill OPEN content identities until Product/content authoring exists.

---

## Authoring record

### 1. Gameplay source

**System / domain**
`<career | school | poverty | night | activity | palace | ending | meta>`

**Gameplay source type**
`<action | result | event | variant | route | challenge | ending | transition>`

**Gameplay source ID**
`<exact authored gameplay ID>`

**Variant / route / outcome ID**
`<exact authored child identity, if applicable>`

Do not derive this from a media filename.

### 2. Semantic presentation identity

**presentationId**
`<slash-taxonomy semantic ID>`

Requirements:
- lowercase;
- stable;
- content-driven;
- no filename/path;
- no animation state;
- no mechanics payload.

If gameplay identity is still OPEN, write:
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

### 3. Primary GIF target

**GIF target**
`<managed logical media reference or NONE>`

**Media kind**
`gif | image | none`

**Is primary required for correctness?**
`NO` unless Product explicitly defines otherwise.

### 4. Static fallback

**Static fallback media**
`<managed static media reference or semantic fallback ID>`

**Fallback slot**
`<presentationId or NONE>`

Must remain valid when:
- GIF is missing;
- animations are disabled;
- replacement is rolled back.

### 5. Text fallback

**Text fallback**
`<approved authored summary / accessibility meaning>`

The text fallback must communicate the essential scene/outcome without depending on animation timing.

### 6. Reuse group

**reuseGroup**
`<production-only media reuse key>`

Examples of category shapes:
- manual-work-loop;
- indoor-service-loop;
- street-night-setting;
- classroom-setting;
- forest-route-setting;
- relationship-professional;
- ending-result.

Reuse group is media metadata only.

It must not become gameplay identity.

### 7. Variant dimensions

Mark only dimensions that are actually authored.

- season: `none | spring | summer | autumn | winter`
- career stage: `none | <authored stage>`
- relationship context: `none | <authored context>`
- Night context: `none | <authored context>`
- route/challenge: `none | <authored identity>`
- result/ending: `none | <authored outcome>`

Do not create a variant merely because the template has a field for it.

### 8. Animation-off behavior

**animationsOff**
`<static candidate / semantic fallback / text terminal>`

Required invariant:
same semantic `presentationId`, same gameplay controls, same mechanics.

### 9. Save identity owner

Choose the actual gameplay owner:

- `lastAction`
- `pendingScene`
- `NightFlow`
- `Activity`
- `endingState`
- `RunResult`
- `NewRunLocation`
- another explicitly authored gameplay owner

**saveIdentityOwner**
`<one value>`

Presentation media itself never owns persistence.

### 10. Replacement policy

**replaceable**
`yes | no`

If yes:
- replacement keyed by semantic `presentationId`;
- validate media kind;
- preserve static/text fallback;
- preview animations on/off;
- save/reload smoke;
- rollback smoke;
- zero gameplay mutation.

### 11. Accessibility

**alt / accessible meaning**
`<approved text>`

Must not rely on:
- frame timing;
- loop count;
- speed;
- transient visual-only clues.

### 12. Content readiness

**contentStatus**
`AUTHORED | PRODUCT_DECISION_PENDING | CONTENT_AUTHORING_PENDING`

If not AUTHORED:
- do not finalize unique lore-specific media;
- do not invent event IDs;
- do not invent thresholds/providers/rewards.

---

## System examples — shapes only

These are namespace examples, not authorization to create OPEN content.

### Career
`job/<career>/shift/<variant>`
`job/<career>/result/<variant>`
`job/<career>/event/<event>/<variant>`

### School
Existing paid lessons:
`school/<track>/lesson/default`

New public-result IDs:
assign only after provider/result content is authored.

### Poverty / Night
Use authored lodging/event identities.
Do not collapse street sleep, lender offer and debt activation into one ID merely because they share media.

### Activity
Existing:
`activity/forest/route/default`
`activity/forest/return/<outcome>`

Future route/challenge IDs:
assign only after authored route/challenge identity exists.

### Palace
Assign only after Palace assignment/event content is authored.

### Endings
`ending/<domain>/<ending>`

Do not bind ending identity to a filename.

### Meta / New Run
Use a semantic transition/context identity only when Product actually authors a distinct visible transition.

---

## Authoring acceptance checklist

A record is ready for production only when:

1. gameplay source identity is exact;
2. semantic presentationId is collision-free;
3. primary media is optional or safely degradable;
4. static fallback is valid;
5. text fallback is meaningful;
6. reuse group does not replace semantic identity;
7. animation-off behavior is defined;
8. save identity owner is gameplay state;
9. replacement/rollback behavior is safe;
10. no OPEN content was invented.
