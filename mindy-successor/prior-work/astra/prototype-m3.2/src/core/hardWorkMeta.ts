import {
  ordinaryHardWorkCareers,
  stats,
  type OrdinaryHardWorkCareer,
  type Stat
} from './schema.ts';

export type HardWorkStatBonus = Readonly<{
  stat: Stat;
  amount: 5;
}>;

export type HardWorkPackageDefinition = Readonly<{
  career: OrdinaryHardWorkCareer;
  statBonuses: readonly HardWorkStatBonus[];
  lustBonus?: number;
}>;

export type HardWorkPackageSelection = readonly OrdinaryHardWorkCareer[];

export type HardWorkCreationSnapshot = Readonly<{
  stats: Readonly<Record<Stat, number>>;
  lust: number;
  packagesApplied: boolean;
}>;

export type HardWorkCreationApplication = Readonly<{
  stats: Record<Stat, number>;
  lust: number;
  packagesApplied: true;
  newlyApplied: boolean;
  appliedPackages: OrdinaryHardWorkCareer[];
}>;

const ordinaryCareerSet = new Set<string>(ordinaryHardWorkCareers);
const progressionStatSet = new Set<string>(stats);
const firstFiveCareerSet = new Set<string>(ordinaryHardWorkCareers.slice(0, 5));

function assertOrdinaryCareer(value: string): asserts value is OrdinaryHardWorkCareer {
  if (!ordinaryCareerSet.has(value)) throw new Error(`Unknown ordinary Hard Work career: ${value}`);
}

function cloneStats(input: Readonly<Record<Stat, number>>): Record<Stat, number> {
  return Object.fromEntries(stats.map(stat => [stat, input[stat]])) as Record<Stat, number>;
}

export function validateHardWorkPackageDefinitions(
  definitions: readonly HardWorkPackageDefinition[]
): void {
  if (definitions.length !== ordinaryHardWorkCareers.length) {
    throw new Error(`Hard Work package definitions must cover exactly ${ordinaryHardWorkCareers.length} ordinary careers.`);
  }

  const seen = new Set<OrdinaryHardWorkCareer>();
  let lustPackageCount = 0;

  for (const definition of definitions) {
    assertOrdinaryCareer(definition.career);
    if (seen.has(definition.career)) {
      throw new Error(`Duplicate Hard Work package definition: ${definition.career}`);
    }
    seen.add(definition.career);

    const statBonusCount = definition.statBonuses.length;
    if (firstFiveCareerSet.has(definition.career)) {
      if (statBonusCount !== 1) {
        throw new Error(`First-five Hard Work package ${definition.career} must contain exactly one +5 progression-stat bonus.`);
      }
    } else if (statBonusCount !== 2) {
      throw new Error(`Later-five Hard Work package ${definition.career} must contain exactly two +5 progression-stat bonuses.`);
    }

    const seenStats = new Set<Stat>();
    for (const bonus of definition.statBonuses) {
      if (!progressionStatSet.has(bonus.stat)) {
        throw new Error(`Unknown progression stat in Hard Work package ${definition.career}: ${bonus.stat}`);
      }
      if (bonus.amount !== 5) {
        throw new Error(`Hard Work progression-stat bonus must be exactly +5: ${definition.career}.${bonus.stat}`);
      }
      if (seenStats.has(bonus.stat)) {
        throw new Error(`Duplicate progression stat in Hard Work package ${definition.career}: ${bonus.stat}`);
      }
      seenStats.add(bonus.stat);
    }

    if (definition.lustBonus !== undefined) {
      if (!Number.isInteger(definition.lustBonus) || definition.lustBonus < 3) {
        throw new Error(`Hard Work Lust bonus must be an integer >= +3: ${definition.career}`);
      }
      lustPackageCount++;
    }
  }

  for (const career of ordinaryHardWorkCareers) {
    if (!seen.has(career)) throw new Error(`Missing Hard Work package definition: ${career}`);
  }
  if (lustPackageCount < 1) {
    throw new Error('At least one ordinary Hard Work package must contain a Lust bonus >= +3.');
  }
}

export function validateHardWorkPackageSelection(
  selection: readonly string[],
  earnedHardWork: readonly string[]
): OrdinaryHardWorkCareer[] {
  const earned = new Set<OrdinaryHardWorkCareer>();
  for (const career of earnedHardWork) {
    if (ordinaryCareerSet.has(career)) earned.add(career as OrdinaryHardWorkCareer);
  }

  const selected = new Set<OrdinaryHardWorkCareer>();
  const result: OrdinaryHardWorkCareer[] = [];
  for (const career of selection) {
    assertOrdinaryCareer(career);
    if (selected.has(career)) throw new Error(`Duplicate active Hard Work package: ${career}`);
    if (!earned.has(career)) throw new Error(`Hard Work package is not earned: ${career}`);
    selected.add(career);
    result.push(career);
  }
  return result;
}

export function hasInheritedHardWorkCareerAccess(
  career: OrdinaryHardWorkCareer,
  earnedHardWork: readonly string[]
): boolean {
  return earnedHardWork.includes(career);
}

export function ordinaryCareerAvailableWithHardWork(input: Readonly<{
  career: OrdinaryHardWorkCareer;
  normalGateSatisfied: boolean;
  ordinaryCareersDomainLocked: boolean;
  earnedHardWork: readonly string[];
}>): boolean {
  if (input.ordinaryCareersDomainLocked) return false;
  if (hasInheritedHardWorkCareerAccess(input.career, input.earnedHardWork)) return true;
  return input.normalGateSatisfied;
}

export function allOrdinaryHardWorkEarned(earnedHardWork: readonly string[]): boolean {
  const earned = new Set(earnedHardWork);
  return ordinaryHardWorkCareers.every(career => earned.has(career));
}

export function allHardWorkPackagesActive(activePackages: readonly string[]): boolean {
  const active = new Set(activePackages);
  return ordinaryHardWorkCareers.every(career => active.has(career));
}

export function palaceNewStartQualified(input: Readonly<{
  earnedHardWork: readonly string[];
  activePackages: readonly string[];
}>): boolean {
  return allOrdinaryHardWorkEarned(input.earnedHardWork)
    && allHardWorkPackagesActive(input.activePackages);
}

export function applyHardWorkPackagesAtCreation(input: Readonly<{
  definitions: readonly HardWorkPackageDefinition[];
  earnedHardWork: readonly string[];
  activePackages: readonly string[];
  snapshot: HardWorkCreationSnapshot;
  progressionStatCap: number;
  lustCap?: number;
}>): HardWorkCreationApplication {
  validateHardWorkPackageDefinitions(input.definitions);
  const activePackages = validateHardWorkPackageSelection(input.activePackages, input.earnedHardWork);
  const statsResult = cloneStats(input.snapshot.stats);
  const lustCap = input.lustCap ?? 100;

  if (!Number.isInteger(input.progressionStatCap) || input.progressionStatCap < 1) {
    throw new Error('Progression-stat cap must be a positive integer.');
  }
  if (!Number.isInteger(lustCap) || lustCap < 1) {
    throw new Error('Lust cap must be a positive integer.');
  }

  if (input.snapshot.packagesApplied) {
    return {
      stats: statsResult,
      lust: input.snapshot.lust,
      packagesApplied: true,
      newlyApplied: false,
      appliedPackages: [...activePackages]
    };
  }

  const byCareer = new Map(input.definitions.map(definition => [definition.career, definition] as const));
  let lust = input.snapshot.lust;

  for (const career of activePackages) {
    const definition = byCareer.get(career);
    if (!definition) throw new Error(`Missing Hard Work package definition during application: ${career}`);

    for (const bonus of definition.statBonuses) {
      statsResult[bonus.stat] = Math.min(input.progressionStatCap, statsResult[bonus.stat] + bonus.amount);
    }
    if (definition.lustBonus !== undefined) {
      lust = Math.min(lustCap, lust + definition.lustBonus);
    }
  }

  return {
    stats: statsResult,
    lust,
    packagesApplied: true,
    newlyApplied: true,
    appliedPackages: [...activePackages]
  };
}
