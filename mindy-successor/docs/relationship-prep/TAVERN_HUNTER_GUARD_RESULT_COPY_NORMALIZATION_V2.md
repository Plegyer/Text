# Tavern / Hunter / Guard Result Copy Normalization v2

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: text normalization for existing seasonal result scenes.

Goals:
- similar scene length across RU and EN;
- concrete career tone;
- no runtime or implementation terminology in player-facing copy;
- no new mechanics, rewards, relationships, facts, items, or route semantics.

## Tavern — `tavern.shift`

### spring.default
RU: Весной в таверне становится больше новых лиц. Смена проходит между заказами, короткими разговорами и попытками быстро понять, кому что нужно.
EN: Spring brings more unfamiliar faces into the tavern. The shift moves between orders, short conversations, and quickly working out what each guest needs.

### summer.default
RU: Летом столы освобождаются ненадолго и тут же занимают новые гости. Хорошая смена зависит от темпа, памяти и умения не путать просьбы.
EN: In summer tables stay empty only briefly before new guests take them. A good shift depends on pace, memory, and keeping requests from getting mixed up.

### autumn.default
RU: Осенью поток гостей идёт волнами: то зал почти пуст, то все приходят сразу. Приходится менять порядок задач, не теряя качества обслуживания.
EN: Autumn traffic comes in waves: the room is nearly empty one moment and crowded the next. You keep rearranging priorities without letting service slip.

### winter.default
RU: Зимой люди дольше сидят у тёплых столов. Смена спокойнее по темпу, но требует больше внимания к постоянным гостям и мелким деталям.
EN: In winter people linger longer around warm tables. The pace is calmer, but the shift asks for more attention to regulars and small details.

## Hunter — `hunter.shift`

### spring.default
RU: Весенняя работа проходит по знакомым окрестным маршрутам. Земля ещё сырая, следы читаются хорошо, а главное — вернуться вовремя с ясным результатом.
EN: The spring job follows familiar local routes. The ground is still damp, tracks are easy to read, and the goal is to return on time with a clear result.

### summer.default
RU: Летом приходится выбирать короче маршрут и внимательнее следить за темпом. Обычная работа ценит точность и выносливость больше, чем дальность.
EN: In summer you choose shorter routes and watch the pace more carefully. Ordinary work rewards accuracy and endurance more than distance.

### autumn.default
RU: Осенью следов больше, а погода меняется быстрее. Хорошая смена зависит от наблюдательности, выбора маршрута и своевременного возвращения.
EN: Autumn brings more tracks and faster-changing weather. A good shift depends on observation, route choice, and returning at the right time.

### winter.default
RU: Зимой работа требует осторожного маршрута и раннего возвращения. Холод и короткий день делают подготовку важнее лишней спешки.
EN: Winter work calls for a careful route and an early return. Cold and short daylight make preparation more important than unnecessary haste.

## Guard — `guard.shift`

### spring.default
RU: Весенний патруль проходит по улицам, которые снова становятся оживлёнными. Работа состоит из обычных проверок, коротких разговоров и внимания к порядку.
EN: The spring patrol moves through streets becoming busy again. The work is ordinary checks, short conversations, and attention to keeping order.

### summer.default
RU: Летом людей на улицах больше и маршруты плотнее. Смена требует ровного темпа, терпения и спокойной реакции на мелкие проблемы.
EN: Summer puts more people on the streets and makes the routes busier. The shift calls for steady pacing, patience, and calm responses to small problems.

### autumn.default
RU: Осенью к патрулю добавляется больше организационной суеты. Приходится внимательнее следить за проходами, очередями и понятностью правил.
EN: Autumn adds more organizational pressure to the patrol. You pay closer attention to routes, queues, and keeping the rules clear.

### winter.default
RU: Зимой смена становится медленнее и осторожнее. Скользкие улицы и ранняя темнота требуют больше внимания к маршруту и меньше спешки.
EN: Winter makes the shift slower and more cautious. Slippery streets and early darkness require more attention to the route and less haste.

## Integration boundary

All normalized text remains mapped to the existing action IDs and seasonal scene IDs. This document changes copy only.
