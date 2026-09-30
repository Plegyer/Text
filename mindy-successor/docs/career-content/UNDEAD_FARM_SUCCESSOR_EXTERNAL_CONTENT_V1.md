# Undead Farm Successor / External Content v1

Status: C3-20 presentation-only content handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32f48d15708a543ee26b90b78761da63b3363da2`.
Fixture: `prior-work/astra/prototype-m3.2/content/undead-farm-successor-external-content-v1.fixture.json`.

## Scope

Current production has no Farm successor state and no external anomaly route.

C3-20 therefore prepares RU/EN narrative hooks only on the existing Undead Farm seasonal shift identities. The content may foreshadow responsibility or a repeated anomaly, but it does not create:
- trust;
- ownership;
- management;
- a world fact;
- an Activity route;
- a resolver return event;
- an ending.

## Existing durable context

Current typed durable identities:
- career stage `reliable-helper`;
- career fact `first-shift-complete`.

These establish only that the heroine is a recognized worker after the first shift.

They do not establish:
- successor eligibility;
- owner trust;
- management authority;
- anomaly knowledge;
- external-route eligibility.

## Autumn — responsibility without succession state

Candidate key:
`presentation.undead-farm.depth.autumn.responsibility.text`.

RU:
`К концу осенней смены часть ящиков уже ждёт следующего этапа, и в рабочем журнале остаётся место для решения: что отправить в хранение первым, а что оставить на повторную проверку. Ты выбираешь порядок внутри текущей работы, но это ещё не управление фермой и не право распоряжаться ею.`

EN:
`By the end of the autumn shift, some crates are already waiting for the next step, and the work ledger leaves one practical decision open: what goes into storage first and what stays for another check. You choose the order within the current job, but that is not management of the farm or ownership of it.`

This is responsibility flavor only.

## Winter — process responsibility without ownership

Candidate key:
`presentation.undead-farm.depth.winter.process-responsibility.text`.

RU:
`Зимой тебе всё чаще доверяют закончить участок работы без постоянной подсказки: сверить записи, закрыть помещение, отметить, что требует ремонта. Это похоже на растущую ответственность над процессом, но не создаёт отдельного доверия, доли или наследования.`

EN:
`In winter, you are more often trusted to finish a section of work without constant instruction: check the records, close the room, mark what needs repair. It feels like growing responsibility for the process, but it does not create a separate trust score, ownership share, or succession state.`

No NPC relationship or trust counter is implied.

## Spring — anomaly hint without world fact

Candidate key:
`presentation.undead-farm.depth.spring.anomaly-hint.text`.

RU:
`У одной из грядок рост идёт неравномерно: одинаковые побеги тянутся в разные стороны, хотя вода и свет те же. Ты отмечаешь место для повторной проверки и продолжаешь обычную смену; странность пока остаётся наблюдением, а не открытым внешним маршрутом.`

EN:
`One bed grows unevenly: identical shoots lean in different directions even though the water and light are the same. You mark the spot for another check and continue the ordinary shift; for now the oddity remains an observation, not an opened external route.`

This does not write an anomaly fact.

## Summer — repeated pattern without Activity hook

Candidate key:
`presentation.undead-farm.depth.summer.pattern-hint.text`.

RU:
`Во время летнего ухода похожая реакция появляется ещё на одном участке, слишком далеко от первого, чтобы списать всё на одну лужу или тень. Ты можешь заметить повторяющийся рисунок, но текущая работа не даёт ни источника аномалии, ни внешней точки, куда за ним отправляться.`

EN:
`During summer maintenance, a similar reaction appears on another plot, too far from the first to blame on the same puddle or patch of shade. You can notice the repeated pattern, but the current job provides neither the source of the anomaly nor an external place to pursue it.`

This explicitly avoids claiming an Activity destination or world fact.

## Existing preservation capability

Current global item identity:
- `field_preservation_kit`;
- capability `preserve_specimen`.

It is not used by this bundle because there is still no Undead Farm specimen consumer.

C3-20 does not convert an anomaly hint into a sample or inventory change.

## Missing successor contracts

A real successor route still needs exact production identities for:
- relationship/trust;
- management/accounting producer;
- successor choice/effect;
- successor ending.

C3-20 does not name a farm owner/manager NPC or create a trust score.

## Missing external-route contracts

A real external route still needs:
- Farm anomaly world fact;
- Activity/external source identity;
- return-to-Farm resolver event;
- external-route ending identity.

No existing Forest identity is reused for this purpose.

## Consumer boundary

These strings are presentation-only handoff candidates.

No selector is added. If a future integration uses them, the selector must rely only on approved existing state and must not:
- add RNG;
- write Save state;
- create hidden facts;
- alter shift results;
- infer successor/external eligibility from prose alone.

Fallback remains the current C3-19/current source seasonal text.

## Exact non-scope

No changes to:
- career stages/transitions;
- wage/stat effects;
- relationship system;
- item use;
- School;
- Activity system;
- world facts;
- Merchant hooks;
- endings/rewards;
- media;
- shared runtime/UI;
- Save/RNG.

## C3-20 disposition

Ready:
- two successor-flavor RU/EN hooks;
- two external-anomaly RU/EN hooks;
- exact attachment to current seasonal shift IDs;
- explicit missing-contract matrix.

Blocked as mechanics until exact IDs exist:
- successor progression;
- trust/ownership;
- specimen route;
- external Activity chain;
- return-to-Farm progression;
- outcome eligibility.
