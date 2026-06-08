export type InputType = 'number' | 'select' | 'radio' | 'text';

export interface InputOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  placeholder?: string;
  unit?: string;
  defaultValue?: string | number;
  options?: InputOption[];
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
  required?: boolean;
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
  precision?: number;
  subResults?: CalculatorResult[];
  condition?: string;
}

export interface Calculator {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription?: string;
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, number | string>) => CalculatorResult | CalculatorResult[];
  formula?: string;
  tags?: string[];
}

export type Category =
  | 'financial'
  | 'health'
  | 'math'
  | 'physics'
  | 'engineering'
  | 'conversion'
  | 'everyday';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'financial', name: 'Financial', description: 'Mortgages, loans, investments, and savings', icon: '💰', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'health', name: 'Health & Fitness', description: 'BMI, calories, body composition, and wellness', icon: '❤️', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'math', name: 'Mathematics', description: 'Fractions, statistics, geometry, and algebra', icon: '📐', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'physics', name: 'Physics', description: 'Mechanics, energy, waves, and relativity', icon: '⚛️', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'engineering', name: 'Engineering', description: 'Electrical, structural, and fluid mechanics', icon: '⚙️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'conversion', name: 'Conversion', description: 'Units, currencies, data sizes, and measurements', icon: '🔄', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'everyday', name: 'Everyday Life', description: 'Dates, time, cooking, and practical utilities', icon: '🏠', color: 'bg-orange-50 text-orange-700 border-orange-200' },
];

export function getCategoryInfo(id: Category): CategoryInfo {
  return CATEGORIES.find((c) => c.id === id)!;
}
