# GIF Central Stage Contract v1

Дата: 2026-09-25.

Статус: **LOCKED PRODUCT / PRESENTATION CONSTRAINT**.

Основание:
- у проекта нет собственного production pipeline сложных анимаций;
- пользователь выбрал GIF как основной способ оживить центральную сцену;
- gameplay должен оставаться media-replaceable и не зависеть от конкретного asset.

## 1. Главный экран

В центре игрового экрана находится **одно постоянное media-окно**.

Оно не пересоздаёт отдельный layout для:
- работы;
- карьерного события;
- relationship dialogue;
- School;
- Night;
- Activity result;
- ending.

Меняется содержимое центрального окна.

Типовая последовательность:

```text
hub GIF / static image
-> Work GIF
-> reactive career GIF
-> relationship GIF
-> result GIF
-> hub GIF
```

Текст, choices и resource deltas меняются рядом с тем же окном.

## 2. Primary media format

Production baseline:
**animated GIF**.

GIF:
- loop by default while current presentation remains active;
- stops/replaces when presentationId changes;
- can be reused across several events;
- never owns gameplay timing.

Gameplay does not wait for GIF loop completion.

No animation frame may apply a stat/resource effect.

## 3. Fallback

Priority:

1. requested GIF;
2. static image for same presentation;
3. parent/event fallback image or GIF;
4. neutral location image;
5. text-only central stage.

Missing GIF must never block:
- event resolution;
- save/load;
- ending;
- Activity return.

## 4. What we explicitly do NOT require

Not required for first production scope:
- skeletal character animation;
- sprite sheets;
- frame-by-frame custom animation pipeline;
- runtime character compositing;
- lip sync;
- cinematic timeline editor;
- unique animation for every content node.

If later assets become available, they can replace a GIF slot without changing mechanics.

## 5. Reuse policy

GIF reuse is expected.

Good reuse:
- one generic Lumber work loop reused across ordinary shifts;
- seasonal Lumber GIFs only where available;
- one tavern service loop for several repeatable variants;
- one neutral dialogue motion for several minor beats;
- one School loop per track;
- one Night/location GIF shared by multiple events.

Unique GIF priority:
1. endings;
2. major career milestones;
3. major relationship milestones;
4. major Activity encounters/results;
5. ordinary repeatable shifts last.

## 6. Stable presentation IDs

Mechanics emit stable `presentationId`.

Examples:

```text
location/town/default
job/lumber/shift/spring/default
job/lumber/event/foreman-trust/default
school/arcana/lesson/default
relationship/foreman/trust/default
night/street/default
activity/forest/encounter/ruins
ending/lumber/forewoman
```

Presentation data maps ID -> GIF/static fallback.

Mechanics never branch on file name.

## 7. Scene replacement

When a reactive event appears after an Energy-paid action:

```text
Work costs 1 Energy
-> Work result presentation shown
-> Resolver finds free career event
-> same central window swaps to career-event GIF
-> player resolves dialogue
-> same window swaps to next queued scene or result/hub
```

No second Energy cost is associated with the media swap.

## 8. Sizing

The UI must reserve a fixed central aspect box so different GIF dimensions do not move surrounding controls.

Baseline requirements:
- preserve aspect ratio;
- contain/crop according to presentation metadata;
- no layout jump when asset changes;
- no giant native-resolution expansion;
- loading placeholder uses same box dimensions.

Exact pixel resolution remains visual-production work.

## 9. Accessibility / performance

Required:
- user can disable animated playback;
- when animation disabled, show first frame/static fallback;
- alt text exists for meaningful scene information;
- essential story information always exists in text, not only GIF;
- preload only near-needed assets; do not load entire GIF library at startup.

## 10. Editor

Presentation editor needs:
- presentationId selector;
- GIF file/path replacement;
- static fallback replacement;
- preview in the same central-stage box;
- validation that asset is local/allowed format.

Editor cannot modify mechanics.

## 11. Save behavior

Save stores:
- mechanical event/variant;
- resolved presentationId if needed for pending scene determinism.

Save does NOT store:
- GIF bytes;
- current GIF frame;
- animation elapsed time.

Reloading a pending scene restarts its GIF loop but preserves the same mechanical scene/variant.

## 12. Acceptance

Presentation shell passes when:

1. hub renders one central media box;
2. Work replaces its media with a work GIF;
3. a reactive event replaces the same box without new Energy cost;
4. relationship scene replaces it again;
5. returning to hub restores hub presentation;
6. missing GIF falls back safely;
7. save/reload pending event restores same presentationId;
8. animation-disable mode remains playable;
9. mechanics are identical with GIF removed.
