# Future GIF Drop-In Package v1

Status: future asset/polish package only. No actual GIFs are included.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/future-gif-drop-in-package.fixture.json`

## Package purpose

The current production presentation layer is fully usable with shipped static media. This package defines only the minimal metadata needed to add optional GIF replacements later.

Each package row contains:

- stable semantic `presentationId`;
- expected media kind = `gif`;
- portable logical filename suggestion;
- required shipped static fallback media ID;
- required text fallback;
- preflight status.

## No source-path coupling

The logical filename suggestion is a portable package-relative name such as:

`media/lumber/shift-spring.gif`

It is **not**:

- an absolute filesystem path;
- a repository source path;
- a user home-directory path;
- a gameplay/catalog identity;
- a replacement for semantic `presentationId`.

The application or import workflow may materialize the logical file into managed storage later.

## Seven optional GIF targets

The package contains exactly seven rows:

- four seasonal Lumber shifts;
- first-shift career milestone;
- Foreman professional relationship scene;
- Foreman professional Night scene.

All seven already have shipped static presentation media and text fallback. Their absence is therefore non-blocking.

## Preflight

A future asset may be activated only when:

1. its semantic `presentationId` is known;
2. media kind is GIF;
3. the logical filename is portable and ends in `.gif`;
4. static fallback remains valid;
5. text fallback remains non-empty;
6. import changes presentation only;
7. save/reload identity remains gameplay/semantic-ID driven.

Until the GIF file exists and passes preflight, the static fallback remains active.

## Non-mechanical boundary

This package cannot alter:

- event/course/activity/ending IDs;
- conditions/effects;
- RNG;
- Energy/money/resources;
- action availability;
- progression;
- save state other than optional semantic presentation identity already supported by production.

No gameplay change is required to add or remove one of these future GIFs.
