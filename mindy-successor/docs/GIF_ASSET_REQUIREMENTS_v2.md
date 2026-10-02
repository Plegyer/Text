# GIF Asset Requirements v2 — Adult-Core Revision

## Purpose

This revision treats adult/sex presentation as a **core content class**, not as a rare exceptional layer. It extends v1 without changing runtime mechanics, content rules, event IDs, or presentation code.

Current planning inventory: **357 GIF requirements**. **196 (54.9%) are adult-only**. This ratio is an asset-planning target based on current direction; it is not a claim that Git already exposes an adult runtime route for every row.

## Core adult rule

- Adult work variants are recurring presentation content when a work event can route through Lust/sexuality into a consensual sex scene.
- Night intimacy uses a reusable but sufficiently varied pool rather than one generic GIF.
- Relationship progression has dedicated adult variants where intimacy is a normal continuation of a consenting adult route.
- Ending families have a separate adult requirement when the ending presentation is expected to resolve through sex/intimacy.
- These recurring adult layers are **v1-required**, not post-v1 polish.
- Explicit rows remain `adult_only=true` and use neutral production descriptions.
- Coercive / non-consensual Secret Debt NightFlow remains adult-only but **must not depict or eroticize the sexual act**. Its assets show routing, control, transition, aftermath, or consequences only.

## Runtime-ID discipline

Git remains authority for gameplay IDs. Existing verified production consumers stay exact. Any newly required adult presentation with no current Git ID is marked exactly `PENDING_RUNTIME_ID`.

Do not invent gameplay IDs to make the manifest look complete. Bind a row only after the runtime/content layer defines the consumer.

## Reuse rules

Reuse is expected, but not to the point where recurring adult content becomes visually repetitive.

- Work adult layer: 4 variants per ordinary career.
- Night adult layer: 4 variants per ordinary career.
- Relationship adult layer: 3 variants per ordinary career.
- Prostitute has an additional specialized recurring explicit pool.
- Ending families receive separate one-shot adult assets.
- Palace receives a late-game consensual adult layer.
- Secret Debt receives a distinct non-explicit adult-only coercion-context layer.

## Naming

Same filename contract as v1: lowercase ASCII, semantic kebab-case, `.gif`, and lettered variants.

## Presentation format

Current stage target remains `landscape-16:9`. Runtime support for GIF pools/static fallback is unchanged.

## Status

Every row in v2 starts at `NEEDED`.
