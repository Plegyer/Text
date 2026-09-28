# GIF Exporter Reproducibility Smoke v1

Current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`.

Purpose: define the smallest CI/dev smoke proving deterministic-equivalent exporter behavior without overclaiming cross-platform byte identity.

## Source fixture

Use only repository-local project-owned source:

Semantic ID:
`job/lumber/shift/spring/default`

Sequence:
`lumber-spring-work-loop-a`

Source manifest:
`content/presentation-drafts/project-owned-animation-source-manifest-v3.json`

Ordered frames:
- `assets/presentation-frames/lumber-spring-work-loop-a-frame-01.svg`
- `...-02.svg`
- `...-03.svg`
- `...-04.svg`

## Fixed smoke parameters

- width: 640;
- height: 360;
- frames: 4;
- delay: 600 ms each;
- total loop: 2400 ms;
- palette ceiling: 256;
- loop count: 0 / infinite;
- candidate key: `lumber-spring-loop-a`.

## Smoke sequence

1. run exporter dry-run and capture normalized plan;
2. export candidate A to a local approved temporary path;
3. export the same sequence again with identical arguments to a second temporary path;
4. validate both GIFs with `validate-project-owned-gif.mjs`;
5. compare metadata;
6. compare SHA-256 when running on the same pinned environment;
7. delete smoke outputs after the check unless Lead explicitly promotes one through media QA.

## Required deterministic properties

Both outputs must have identical:
- semantic presentationId;
- source sequence;
- candidate key;
- source frame order;
- 640×360 dimensions;
- frame count 4;
- per-frame delay 600 ms;
- total duration 2400 ms;
- infinite loop flag;
- valid GIF87a/GIF89a signature.

## Byte identity rule

Same pinned environment:
- byte-identical output and identical SHA-256 are required.

Different OS/architecture:
- do not claim byte identity unless actually demonstrated;
- deterministic-equivalent output is acceptable only if dimensions, frame count, delays, total duration, loop setting and source ordering match exactly and each platform is internally byte-stable.

## Failure conditions

Smoke fails on:
- missing/changed source frame;
- unknown semantic/sequence;
- external resource use;
- invalid GIF signature;
- dimension/frame/timing mismatch;
- missing infinite-loop metadata;
- nonzero variation across repeated same-environment exports;
- output path outside approved local GIF/temp scope.

## CI/dev role

This smoke validates authoring reproducibility only.

It does not:
- activate root presentation mappings;
- add localization;
- alter gameplay;
- create a production pool claim.
