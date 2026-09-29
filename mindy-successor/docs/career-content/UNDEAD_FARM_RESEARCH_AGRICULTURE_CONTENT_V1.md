# Undead Farm Research / Agriculture Content v1

Status: C3-19 content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/undead-farm-research-agriculture-content-v1.fixture.json`.

## Scope

This bundle deepens the four existing seasonal `undead-farm.shift` scene identities with agriculture, Magic and Reason flavor.

Existing identities consumed:
- action `undead-farm.shift`;
- scenes `spring.default`, `summer.default`, `autumn.default`, `winter.default`;
- existing seasonal presentation IDs;
- existing `magic` / `reason` shift axes;
- existing global item capability `preserve_specimen` only as a documented adjacent dependency.

No research route state, specimen resource, School fact, experiment event, Activity hook, threshold, reward or ending is added.

## Spring — unstable growth observation

Candidate key:
`action.undead-farm.shift.scene.spring.default.text`.

RU:
`Весной почва тяжёлая от воды, а новые ростки ведут себя не совсем как обычные растения. Ты закрепляешь грядки, проверяешь метки на контейнерах и отмечаешь, какие побеги реагируют на магический фон сильнее остальных. Это наблюдение внутри обычной смены, а не отдельный исследовательский результат.`

EN:
`In spring, the ground is heavy with water and the new shoots do not behave quite like ordinary plants. You brace the beds, check the marks on the containers, and note which growth reacts more strongly to the magical background. It is observation within an ordinary shift, not a separate research result.`

This uses the current spring agriculture identity and Magic flavor without creating a specimen/fact.

## Summer — maintenance and magical control

Candidate key:
`action.undead-farm.shift.scene.summer.default.text`.

RU:
`Летом всё растёт быстрее, чем успевают освобождаться проходы. Ты прочищаешь каналы, следишь, чтобы неживые работники не сбились с участка, и мягко гасишь слишком резкую магическую реакцию там, где она мешает уходу за растениями.`

EN:
`In summer, everything grows faster than the paths can stay clear. You open the channels, make sure the undead workers do not drift off their assigned plots, and gently damp an overactive magical reaction where it gets in the way of ordinary crop care.`

No magic-success state or worker relationship is written.

## Autumn — harvest sorting and records

Candidate key:
`action.undead-farm.shift.scene.autumn.default.text`.

RU:
`Осенью урожай нужно не только собрать, но и правильно разобрать. Ты отделяешь обычные партии от странных, сверяешь бирки и складываешь ящики так, чтобы позже было понятно, что созрело хорошо, а что потребует отдельного внимания.`

EN:
`In autumn, the harvest has to be sorted as carefully as it is gathered. You separate ordinary batches from the strange ones, check the tags, and stack the crates so it will be clear later what ripened well and what needs separate attention.`

This supports the current Reason axis without inventing inventory/resource IDs.

## Winter — storage / preservation / analysis flavor

Candidate key:
`action.undead-farm.shift.scene.winter.default.text`.

RU:
`Зимой работа уходит под крышу: ремонт, хранение и проверка самых странных запасов. Ты сравниваешь старые пометки, следишь за целостностью сосудов и осторожно работаешь рядом с материалом, который лучше сначала понять, чем сразу пытаться использовать.`

EN:
`In winter, the work moves indoors: repairs, storage, and checks on the strangest supplies. You compare old notes, inspect the containers, and work carefully around material that is better understood before anyone tries to use it.`

This is research-adjacent language only. It does not create an experiment or research result.

## Preservation capability boundary

Current production already defines:
- item `field_preservation_kit`;
- capability `preserve_specimen`.

But current Undead Farm does not consume that capability.

C3-19 therefore does not say that:
- a specimen was obtained;
- the kit was used;
- a sample is stored;
- a School continuation is available.

The capability is recorded as an integration dependency for future approved research content only.

## Localization consumer seam

Candidate keys use the existing action-scene namespace:
`action.<actionId>.scene.<sceneId>.text`.

Current multi-scene seasonal action rendering does not automatically consume those keys through the narrow single-default-scene localization path.

Shared consumer work remains Chat 1 / Lead ownership.

Safe fallback:
the current source English scene text remains valid.

## Exact non-scope

No changes to:
- action effects;
- wage/stat weights;
- seasonal stat effects;
- career stages/transitions;
- item catalog;
- School facts;
- research state;
- Activity results;
- relationships;
- endings;
- media;
- shared runtime/UI;
- Save/RNG.

## C3-19 disposition

Ready:
- four RU/EN agriculture/research/magic scene texts on current exact seasonal identities;
- explicit preservation-capability boundary;
- localization handoff.

Blocked until exact gameplay identities exist:
- specimen acquisition;
- experiment/research chain;
- School-triggered Farm continuation;
- new production resources;
- Research ending.
