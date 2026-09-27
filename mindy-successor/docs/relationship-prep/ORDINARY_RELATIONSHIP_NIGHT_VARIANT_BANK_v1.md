# Ordinary Relationship Night Variant Bank v1

Date: 2026-09-27  
Status: **REUSABLE CONTENT PATTERNS / NON-CANONICAL**  
Scope: voluntary ordinary relationship Night only

These patterns are authored for existing Night contracts, not assigned to canonical NPCs. Every unnamed partner/contact below is a role placeholder. Using a pattern in production requires an already-approved relationship identity and legal existing state/conditions.

Russian is source authoring language; English is a full second locale. The text does not create mechanics.

## Shared rules

- A relationship Night is voluntary and uses the Night slot.
- It does not spend daytime Energy.
- It has no universal next-day Energy penalty.
- Any money, item, stat, next-day modifier, counter, fact, or stage change must be explicit in the owning content definition; this bank supplies none.
- Housing may gate availability or select a public/private presentation variant.
- A refusal is a valid safe exit and does not imply route punishment.
- Forced Secret Debt NightFlow is outside this bank.
- New NPC identities remain `CONTENT_DRAFT / PRODUCT_NOT_LOCKED`.

## Pattern 1 — professional conversation

Pattern ID: `relationship-night.professional-conversation`

**RU — title:** Разговор после дела  
**RU — body:** Рабочий день уже закончился, и разговор наконец не нужно втискивать между поручениями. Вы ненадолго задерживаетесь, сравниваете заметки о сегодняшних проблемах и спорите только о том, какой способ был бы проще завтра.  
**RU — continue:** «Давай разберём ещё один момент».  
**RU — decline:** «На сегодня хватит. Продолжим в другой раз».

**EN — title:** A conversation after the work is done  
**EN — body:** The workday is over, so the conversation no longer has to fit between errands. You stay a little longer, compare notes on today’s problems, and argue only about which approach would make tomorrow easier.  
**EN — continue:** “Let’s go over one more thing.”  
**EN — decline:** “That’s enough for tonight. We can continue another time.”

Safe use: mentor, colleague, guild contact, teacher-adjacent professional contact. It does not imply romance or a new career result.

## Pattern 2 — public walk

Pattern ID: `relationship-night.public-walk`

**RU — title:** Дойти вместе  
**RU — body:** Вместо закрытой комнаты вы выбираете освещённую улицу. По дороге легче говорить о мелочах: кто сегодня опоздал, где снова перекосило вывеску и почему вечерний рынок всегда кажется шумнее дневного.  
**RU — continue:** «Пройдёмся ещё немного».  
**RU — decline:** «Мне пора сворачивать к ночлегу».

**EN — title:** Walking together  
**EN — body:** Instead of a closed room, you choose a well-lit street. Small things are easier to talk about on the way: who was late today, which sign is crooked again, and why the evening market always seems louder than the daytime one.  
**EN — continue:** “Let’s walk a little farther.”  
**EN — decline:** “I should turn toward my lodging.”

Safe use: public replacement when privacy is unavailable or unwanted. It is especially suitable for cheap-lodging or street-adjacent presentation without implying that the partner enters the player’s lodging.

## Pattern 3 — shared meal and conversation

Pattern ID: `relationship-night.shared-meal`

**RU — title:** Ужин без повестки  
**RU — body:** Еда оказывается простой, зато разговор впервые никуда не торопится. Сначала вы обсуждаете работу, потом городские слухи, а потом замечаете, что тарелки давно пусты и никто не спешит вставать.  
**RU — continue:** «Останусь ещё ненадолго».  
**RU — decline:** «Спасибо за компанию. На этом закончим вечер».

**EN — title:** Dinner without an agenda  
**EN — body:** The food is simple, but for once the conversation is in no hurry. You begin with work, drift into city gossip, and eventually notice that the plates have been empty for some time and neither of you has rushed to stand up.  
**EN — continue:** “I’ll stay a little longer.”  
**EN — decline:** “Thanks for the company. I’ll call it a night here.”

Safe use: public inn, canteen, rented common room, or other approved public venue. This text does not itself charge money or grant a resource effect.

## Pattern 4 — practical help

Pattern ID: `relationship-night.practical-help`

**RU — title:** Помочь до темноты  
**RU — body:** Вечер уходит не на откровения, а на маленькую задачу, которую удобнее закончить вдвоём: разобрать бумаги, перебрать инструменты, донести коробку или привести в порядок рабочее место. Разговор возникает сам между делом.  
**RU — continue:** «Давай закончим вместе».  
**RU — decline:** «Сегодня не возьмусь, но могу вернуться к этому позже».

**EN — title:** Helping before night settles in  
**EN — body:** The evening goes not to confessions but to a small task that is easier with two people: sorting papers, checking tools, carrying a box, or putting a workspace in order. Conversation happens naturally while the work gets done.  
**EN — continue:** “Let’s finish it together.”  
**EN — decline:** “I can’t take this on tonight, but I can come back to it later.”

Safe use: relationship texture only. A real item transfer, quest advance, payment, or work counter must be separately authored and approved.

## Pattern 5 — polite decline

Pattern ID: `relationship-night.polite-decline`

**RU — title:** Не сегодня  
**RU — prompt:** Контакт предлагает продолжить вечер без давления и оставляет решение тебе.  
**RU — player:** «Спасибо, но сегодня я хочу побыть одна».  
**RU — response:** «Хорошо. Тогда спокойной ночи. Увидимся, когда обоим будет удобно».

**EN — title:** Not tonight  
**EN — prompt:** The contact offers to continue the evening without pressure and leaves the choice to you.  
**EN — player:** “Thank you, but I want some time to myself tonight.”  
**EN — response:** “All right. Have a quiet night. We’ll see each other when it works for both of us.”

Safe use: universal refusal pattern for voluntary ordinary relationships. It should not silently impose lost trust, a next-day penalty, or route closure.

## Pattern 6 — professional-only boundary

Pattern ID: `relationship-night.professional-only`

**RU — title:** Чёткая граница  
**RU — player:** «Мне приятно общаться, но я хочу оставить наши отношения профессиональными».  
**RU — response:** «Понял. Тогда никаких догадок — только ясная договорённость». Разговор спокойно возвращается к общим делам.

**EN — title:** A clear boundary  
**EN — player:** “I enjoy talking with you, but I want to keep our relationship professional.”  
**EN — response:** “Understood. Then no guessing—just a clear agreement.” The conversation calmly returns to shared business.

Safe use: professional-only branch or explicit boundary response. It is not a failure scene.

## Housing-sensitive presentation variants

Housing variants change scene framing and availability, not the core gameplay transaction. A production event may use `housingTier` conditions to select among them.

### Normal housing — private conversation available

Variant ID: `relationship-night.housing.normal-private`

**RU:** В комнате достаточно тихо, чтобы разговор не приходилось обрывать из-за чужих голосов. Дверь можно закрыть, но сама сцена остаётся добровольным разговором; приватность не означает автоматического сближения.  
**EN:** The room is quiet enough that other voices do not keep interrupting. The door can be closed, but the scene remains a voluntary conversation; privacy does not imply automatic intimacy.

### Cheap lodging — common-space substitution

Variant ID: `relationship-night.housing.cheap-common-space`

**RU:** В дешёвом ночлеге стены слишком тонкие для приватного разговора, поэтому вы остаётесь в общей комнате, пока там не стало совсем людно. Тема разговора подстраивается под публичное место.  
**EN:** The cheap lodging has walls too thin for a private conversation, so you stay in the common room until it becomes too crowded. The subject of the conversation adjusts to the public setting.

### Cheap lodging — move outside

Variant ID: `relationship-night.housing.cheap-public-walk`

**RU:** Вместо попытки найти уединение вы выходите пройтись по ближайшим освещённым улицам. Вечер остаётся совместным, но не требует приватного пространства.  
**EN:** Rather than trying to find privacy, you step out for a walk along the nearby lit streets. The evening is still shared without requiring a private space.

### Street — public-only contact

Variant ID: `relationship-night.housing.street-public`

**RU:** У тебя нет комнаты, куда можно пригласить собеседника, поэтому встреча остаётся в публичном месте: у позднего киоска, на освещённой площади или по дороге к безопасному месту ночлега.  
**EN:** You have no room to invite the other person into, so the meeting stays in public: by a late stall, on a lit square, or along the route toward a safe place to sleep.

This variant does not erase the street lodging’s own separately authored next-day consequences and does not add a relationship penalty.

### Privacy-required scene unavailable

Variant ID: `relationship-night.housing.privacy-required-unavailable`

**RU — availability copy:** Для этого разговора нужно спокойное приватное место. Сегодня подходящего места нет.  
**EN — availability copy:** This conversation needs a quiet private place. There is no suitable place tonight.

Safe use: only when Product/content explicitly marks the particular scene as privacy-required. Do not apply this rule to every relationship Night.

## Presentation notes

Each productionized pattern should retain one locale-neutral semantic `presentationId`. Repetition may later use a 3–5 GIF candidate pool beneath that identity, but candidate selection remains presentation-only and must not change the selected relationship scene, housing gate, choice, effects, RNG, or Save identity.

Static/text fallback is always acceptable. Placeholder GIF paths are not shipped assets.

## What this bank intentionally does not define

This bank does not define:

- canonical NPC names or assignments;
- relationship stages or transition IDs;
- relationship counters or thresholds;
- money costs;
- item transfer;
- stat changes;
- School public results;
- Activity results;
- next-day Energy modifiers;
- endings or Meta rewards.

Those belong to an approved production definition or Product decision, not reusable prose.
