# Exporter Dependency License Packet v1

Proposed exact development-only dependencies:

- `sharp@0.35.4`;
- `gifenc@1.0.3`.

No dependency/package file is changed by this packet.

## sharp 0.35.4

Role:
local project-owned SVG rasterization to fixed RGBA for authoring-time GIF export.

License:
**Apache License 2.0**.

Approval/notice implications:
- retain upstream license/copyright notices as required;
- add the dependency to the project's third-party/development-tool notice process if the repository policy maintains a notice inventory;
- do not imply that Apache-2.0 applies to project artwork/content;
- review transitive/platform packages introduced into `package-lock.json`, including the libvips/platform distribution surface used by sharp.

Distribution boundary:
the proposed use is a **devDependency** for media authoring, not application runtime code.

## gifenc 1.0.3

Role:
quantization/palette mapping and animated GIF encoding from in-memory project-owned raster frames.

License:
**MIT**.

Approval/notice implications:
- retain the MIT copyright/license notice according to normal third-party dependency practice;
- add to any repository third-party/development-tool notice inventory;
- do not change the license of project-authored frame SVGs or exported project-owned GIFs.

Distribution boundary:
dev-only authoring dependency.

## Package-lock review

If approved, Lead should generate the lockfile through npm:

```bash
npm install --save-dev --save-exact sharp@0.35.4 gifenc@1.0.3
```

Review must cover:
- root exact versions;
- sharp native/platform optional packages;
- transitive licenses/notices;
- unexpected lifecycle/install packages;
- registry integrity entries produced by npm.

Do not hand-author integrity hashes.

## Artwork/provenance boundary

Dependency licenses govern the exporter software.

They do not grant or replace rights for media input.

Exporter input remains:
- repository-local;
- project-authored/project-owned SVG frame sources;
- no external downloaded art.

Future GIF provenance should record:
- source sequence;
- source frame paths/hashes;
- exporter script revision;
- exact dependency/lockfile revision.

## License-risk summary

| Dependency | License | Proposed scope | Review |
| --- | --- | --- | --- |
| `sharp@0.35.4` | Apache-2.0 | dev-only rasterizer | notice + transitive/native package review |
| `gifenc@1.0.3` | MIT | dev-only encoder | notice + exact pin |

## Approval boundary

This packet is documentation only.

It does not:
- install packages;
- modify `package.json`;
- modify `package-lock.json`;
- authorize runtime imports;
- activate any production GIF pool.

Lead must explicitly approve the exact dev-only dependency addition.
