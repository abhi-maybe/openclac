import type { Calculator, Category } from '@/types';
import { financialCalculators } from '@/calculators/financial';
import { healthCalculators } from '@/calculators/health';
import { mathCalculators } from '@/calculators/math';
import { physicsCalculators } from '@/calculators/physics';
import { engineeringCalculators } from '@/calculators/engineering';
import { conversionCalculators } from '@/calculators/conversion';
import { everydayCalculators } from '@/calculators/everyday';

const allCalculators: Calculator[] = [
  ...financialCalculators,
  ...healthCalculators,
  ...mathCalculators,
  ...physicsCalculators,
  ...engineeringCalculators,
  ...conversionCalculators,
  ...everydayCalculators,
];

export function getAllCalculators(): Calculator[] {
  return allCalculators;
}

export function getCalculatorById(id: string): Calculator | undefined {
  return allCalculators.find((c) => c.id === id);
}

export function getCalculatorsByCategory(category: Category): Calculator[] {
  return allCalculators.filter((c) => c.category === category);
}

export function searchCalculators(query: string): Calculator[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allCalculators.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}
