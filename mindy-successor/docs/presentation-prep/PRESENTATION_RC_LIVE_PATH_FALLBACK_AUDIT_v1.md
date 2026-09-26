# Presentation RC Live-Path Fallback Audit v1

Scope: **only** the exact merged PR24 one-Save path.

No unused catalog slot is included.

Classification vocabulary:

- `DIRECT_SHIPPED_MEDIA` — the visible boundary resolves to current shipped media for its semantic slot/context;
- `STATIC_FALLBACK` — the semantic slot relies on a shipped static fallback chain;
- `TEXT_SAFE_FALLBACK` — text is the only safe current terminal;
- `FUTURE_GIF_TARGET` — a future GIF is planned, but current shipped static media is already safe.

## Exact path

1. Lumber result — direct shipped Lumber static media.
2. Career milestone — future GIF target; current Lumber static media is safe.
3. Foreman opening — future GIF target; current Lumber static media is safe.
4. Arcana School result — direct School static media.
5. `base.school/lesson` blocking scene — direct shipped workshop static media.
6. Normal lodging / Night context — direct town static media.
7. Foreman Night — future GIF target; current Lumber static media is safe.
8. Forest entry — direct Forest static media.
9. Forest logging-road — same direct generic Forest route presentation.
10. Lumber Forest-return scene — direct Forest static media.
11. Real 50th Lumber shift result — direct Lumber static media.
12. Hard Work committed — static semantic fallback through town.
13. Hard Work completed — same static semantic fallback.
14. New Run — direct town static media.

## Result

- direct shipped media: 9 boundaries;
- static fallback: 2 boundaries;
- future GIF target: 3 boundaries;
- text-only safe fallback: 0 boundaries.

Every boundary still has a text-safe terminal policy, but none in the merged one-Save path is forced to text-only presentation.

The three future GIF rows are non-blocking because each currently resolves to a shipped static asset.
