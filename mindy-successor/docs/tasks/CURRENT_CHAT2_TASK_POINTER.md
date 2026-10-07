# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - STRONG META UI COMPOSITION NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact production base:
`c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`

## Closed before this task

D39 runtime:
- accepted source: `68f762ae6e87083e37badc418f9c903f7617419a`
- run: `37648362110` SUCCESS

D39 live consumers:
- accepted source: `c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`
- Leader exact-source run: `37657002423` SUCCESS
- npm ci / typecheck / validate / build / focused D39 live-consumer bundle: PASS

Do not redo D39 runtime or D39 live consumers.

## This task only

Apply locked Stage 2 step 6:
**Strong Meta player-facing UI + modal accessible-name closure.**

Do NOT apply D48 yet.
Do NOT run Stage2 full CI yet.

## Frozen UI authority

Producer branch:
`chat6/strong-meta-ui-closure-v42`

Exact implementation state:
`fac645878ebd726f50fd1364ac72414796755a2d`

Implementation boundary before v42/v43 code:
`ce6753d482968581b0c2945f4b7c05b41a5d6e58`

Frozen implementation delta contains only:
- `src/ui/app.ts`
- `content/localization.json`
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

Do NOT use later report-only Chat6 commits as production authority.

## Critical merge rule

**Semantic union only. Never wholesale replace `src/ui/app.ts` or `content/localization.json`.**

Current target already contains later/current behavior that old Chat6 producer did not own, including:
- Palace v15-v19 UI composition;
- D39 condition labels;
- Secret Debt/D51;
- Night/Activity;
- current Strong Meta registry v4 and D39 reward IDs;
- current localization overlays.

Preserve all of it.

## v42 Strong Meta selector requirements

UI/wiring only. Use existing accepted engine/runtime seams:
- existing Strong Meta ownership;
- existing `preferredSelection`;
- existing `setStrongMetaKeystone` command;
- existing `setStrongMetaSpecialist` command;
- existing registry classes/capacities.

Do not change engine mechanics, save schema, reward ownership, registry semantics or snapshot lifecycle.

Locked behavior:
- max 1 Keystone;
- max 2 Specialists;
- only owned + active registry rewards are selectable;
- owned/imported rewards do NOT auto-select;
- changing Keystone uses existing command/engine validation;
- at Specialist capacity, unselected Specialists are disabled, selected ones remain removable;
- `palace.true.cap-200` is a normal Specialist and consumes one Specialist slot;
- D39 Palace Specialists remain normal Specialists under the same capacity;
- Source Method / automatic inherited knowledge is NEVER selectable and consumes no slot;
- ordinary Hard Work stays outside Strong Meta slots;
- current-run Strong Meta snapshot remains immutable after creation;
- selector is creation-time UI only and disappears after `finishCreation`.

## v43 modal accessibility requirements

Replace raw generic modal naming behavior with localized/human-readable accessible names.

Preserve modal routing and mechanics.

Required behavior:
- ordinary panels resolve through existing localized visible-heading keys;
- editor uses localized menu label;
- catalog uses localized `ui.menu.catalogInspector`;
- unknown panel fallback is localized generic `Раздел` / `Panel`;
- never expose raw internal panel id as normal aria-label.

## Localization merge

Merge only the v42/v43 UI/accessibility keys by key.

Do not replace current localization file.
Do not remove D39 live-consumer, Palace v19, Secret Debt/D51, or any later rows.

## Tests

Carry/adapt only as needed for current-main compatibility:
- `tests/strong-meta-player-ui-v42.test.ts`
- `tests/modal-aria-localization-v43.test.ts`
- `tests/strong-meta-ui-localization-v42-v43.test.ts`

Do not weaken capacity, ownership, automatic-knowledge, snapshot, or accessibility assertions.

## Verification

Run on exact resulting head if available:
1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused:
   - `tests/strong-meta-player-ui-v42.test.ts`
   - `tests/strong-meta-ui-localization-v42-v43.test.ts`
   - `tests/modal-aria-localization-v43.test.ts`
   - `tests/strong-meta-engine-integration-v7.test.ts`
   - `tests/strong-meta-registry-v7.test.ts`
   - `tests/strong-meta-d30-runtime-v7.test.ts`
   - D39 live-consumer focused smoke
   - Palace v15-v19 UI smoke

Do not run Stage2 full CI yet.

## Stop marker

Stop at:
`STRONG_META_UI_READY_FOR_D48`

Report exact head, changed files, selector/slot proof, automatic-knowledge exclusion, accessible-name proof, and verification result.
