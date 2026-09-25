# Media Presentation Contract v0

Дата: 2026-09-25.

Статус: **PRODUCT/CONTENT CONTRACT DRAFT**.

Покрывает: LIFE-17, LIFE-18.

## 1. Главный принцип

Механика не зависит от конкретного изображения/GIF/видео.

Gameplay content ссылается на стабильный `presentationId`.

Presentation layer отдельно разрешает:
- текст;
- image;
- GIF;
- video;
- fallback.

Замена media не меняет conditions/effects/state.

## 2. Stable IDs

Рекомендуемые namespaces:

```text
location/<locationId>/<state>
job/<jobId>/shift/<variant>
job/<jobId>/event/<eventId>/<variant>
job/<jobId>/ending/<endingId>
school/<trackId>/<eventId>/<variant>
relationship/<npcId>/<eventId>/<variant>
night/<eventId>/<variant>
activity/<activityId>/<locationOrEncounter>/<variant>
ending/<endingId>
meta/<eventId>
```

Season не обязан быть отдельным уровнем ID, если variant сам содержит сезон.
Но для массовой замены допустим:
`.../<season>/<variant>`.

## 3. Presentation entry

```text
PresentationEntry
  id
  textBlocks?
  media[]
  fallbackId?
  tags[]
  accessibility
```

Media:
```text
kind: image | gif | video
src
alt
poster?
loop?
autoplayPolicy?
```

Никаких gameplay effects внутри presentation file.

## 4. Variant resolution

Mechanics сначала выбирает:
- event;
- resolved variant;
- choices.

Только потом UI получает соответствующий `presentationId`.

Media swap не имеет права:
- перебрасывать RNG;
- повторно применять effects;
- менять availability;
- менять chosen variant.

Это сохраняет сильную сторону M3.2.

## 5. Fallback

Каждая обязательная сцена должна иметь fallback.

При отсутствии asset:
1. variant-specific fallback;
2. event fallback;
3. neutral location image;
4. text-only rendering.

Missing optional art не ломает run.

## 6. Work animation

Ordinary shift может показывать:
- reusable animation;
- season-specific background;
- stage-specific media.

После reactive event central stage заменяется event presentation без смены механического flow.

## 7. Video/GIF

Требования:
- пользователь может отключить/снизить анимацию;
- video имеет poster/fallback;
- ключевая информация не существует только в видео;
- alt/subtitle metadata.

## 8. Custom overrides

Пользовательские overrides:
- могут менять text/media;
- не меняют ID;
- не меняют mechanics;
- versioned separately.

Unknown target rejected or shown as orphan in editor.

## 9. Save compatibility

Save хранит:
- mechanical eventId;
- resolved variantId;
- при необходимости presentation revision snapshot только если без него нельзя восстановить pending scene.

Не хранить бинарные media assets в save.

После update:
- pending variant должен всё ещё иметь fallback;
- presentation replacement не должен invalidating save.

## 10. Editor scope

Editor должен позволять:
- найти presentation slot по ID;
- заменить text;
- заменить media;
- preview;
- validate path/format;
- export/import override pack.

Не позволять менять conditions/effects через presentation editor.

## 11. Media budget

Не требовать unique art для каждой content unit.

Можно переиспользовать:
- location backgrounds;
- work loops;
- character base poses;
- seasonal overlays.

Unique media priority:
1. endings;
2. major milestones;
3. major relationship beats;
4. Activity objective scenes;
5. recurring work variants lower priority.

## 12. Acceptance

LIFE-18 закрывается, когда:

1. одна механическая shift scene имеет заменяемый media slot;
2. reactive event заменяет media в том же central stage;
3. GIF/video replacement не меняет state;
4. missing media falls back safely;
5. save/reload pending event восстанавливает правильный variant;
6. custom override меняет presentation без core/content edit;
7. invalid override rejected.
