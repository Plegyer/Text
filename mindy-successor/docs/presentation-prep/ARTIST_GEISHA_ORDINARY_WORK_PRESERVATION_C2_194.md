# C2-194 — Artist/Geisha ordinary seasonal Work preservation audit

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline: `chat2/artist-geisha-presentation-v18@94d12e8b95b07f137a8a8dfba5f39c9cd4ee444a`

## Preserved shipped slots

The ordinary Artist House presentation set remains exactly:
- `job/artist-geisha/result/default`
- `job/artist-geisha/shift/spring/default`
- `job/artist-geisha/shift/summer/default`
- `job/artist-geisha/shift/autumn/default`
- `job/artist-geisha/shift/winter/default`
- `ending/artist-geisha/hard-work`

No advanced Artist/Geisha performance, festival, relationship, item, night, readiness or cross-system presentation slot is shipped on this baseline.

## Static source integrity

All five ordinary project-owned static sources exist in-repository:
- `assets/presentation/career-artist-geisha-result.svg`
- `assets/presentation/career-artist-geisha-shift-spring.svg`
- `assets/presentation/career-artist-geisha-shift-summer.svg`
- `assets/presentation/career-artist-geisha-shift-autumn.svg`
- `assets/presentation/career-artist-geisha-shift-winter.svg`

The Hard Work surface currently reuses the ordinary result source, preserving shipped behavior.

## RU/EN accessibility preservation

Current localization has RU and EN values for alt and caption pairs covering:
- ordinary result;
- Spring ordinary Work;
- Summer ordinary Work;
- Autumn ordinary Work;
- Winter ordinary Work;
- Hard Work ending.

C2-203 will turn this preservation rule into focused regression coverage for the later advanced binding.

## Ordinary-Work semantic boundary

The four seasonal IDs remain ordinary `artist-geisha.shift` Work only. They may depict routine rehearsal, ordinary performance preparation, guest-facing duties and the season already selected by gameplay.

They must not be reused as semantic substitutes for:
- advanced performance/festival/contest status;
- mentor/rival/patron relationship stages;
- Master Artist / Patron Network / Court Invitation readiness;
- specialized School result;
- Artist-local night/salon state;
- formal-attire/instrument/invitation capability;
- Palace access;
- ending eligibility.

Future advanced cards must use separate exact frozen-runtime identities instead of swapping an ordinary seasonal visual to imply progression.

## Winter source-loop boundary

Three project-owned winter rehearsal source sequences exist in the animation source manifest, but each still has `gifPath: null`.

Therefore:
- the shipped winter slot remains static-safe;
- the source frames are preparation inputs, not a production motion binding;
- no fabricated GIF path is published by C2-194.

## Career separation

Ordinary Artist House Work remains visually and semantically distinct from:
- Satyr Maid service/work presentation;
- voluntary Prostitute presentation;
- Palace/court access presentation.

Shared social, guest-facing, clothing or evening motifs do not merge those careers.

## Firewall

This audit changes no Work availability, cost, wage, seasonal stat effect, career progression, Save/RNG, School/NightFlow/Activity mechanics, economy, ending eligibility/reward or Meta.

Advanced performance/festival/status binding remains deferred until exact frozen Artist/Geisha runtime identities exist.
