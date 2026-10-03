import rawCatalog from '../../content/hard-work-package-catalog-v1.fixture.json' with {type:'json'};

import {
  validateHardWorkPackageDefinitions,
  type HardWorkPackageDefinition
} from './hardWorkMeta.ts';

const definitions=rawCatalog.packages as unknown as HardWorkPackageDefinition[];
validateHardWorkPackageDefinitions(definitions);

export const hardWorkPackageDefinitions=definitions as readonly HardWorkPackageDefinition[];
export const hardWorkPackageSelectionPolicy=rawCatalog.selectionPolicy;
export const hardWorkPackageSupersedes=rawCatalog.supersedes;
