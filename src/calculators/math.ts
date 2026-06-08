import type { Calculator } from '@/types';

export const mathCalculators: Calculator[] = [
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    category: 'math',
    description: 'Calculate percentages, percentage change, and percentage of a value',
    inputs: [
      { id: 'mode', label: 'Calculation Type', type: 'select', defaultValue: 'percentOf', options: [
        { label: 'What is X% of Y?', value: 'percentOf' },
        { label: 'X is what % of Y?', value: 'whatPercent' },
        { label: 'Percentage change from X to Y', value: 'change' },
      ]},
      { id: 'valueA', label: 'Value A', type: 'number', defaultValue: 20, required: true },
      { id: 'valueB', label: 'Value B', type: 'number', defaultValue: 150, required: true },
    ],
    calculate: ({ mode, valueA, valueB }) => {
      const a = Number(valueA);
      const b = Number(valueB);
      switch (mode) {
        case 'percentOf':
          return [{ label: 'Result', value: (a / 100) * b, precision: 4 }];
        case 'whatPercent':
          return [{ label: 'Result', value: b === 0 ? 0 : (a / b) * 100, unit: '%', precision: 4 }];
        case 'change': {
          const change = b - a;
          const pctChange = a === 0 ? 0 : (change / a) * 100;
          return [
            { label: 'Change', value: change, precision: 4 },
            { label: 'Percentage Change', value: pctChange, unit: '%', precision: 2 },
          ];
        }
        default:
          return [{ label: 'Result', value: 0 }];
      }
    },
    tags: ['percentage', 'percent', 'percent change', 'ratio'],
  },
  {
    id: 'fraction',
    name: 'Fraction Calculator',
    category: 'math',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step results',
    inputs: [
      { id: 'num1', label: 'Numerator 1', type: 'number', defaultValue: 3, required: true },
      { id: 'den1', label: 'Denominator 1', type: 'number', defaultValue: 4, min: 1, required: true },
      { id: 'operation', label: 'Operation', type: 'radio', defaultValue: '+', options: [
        { label: '+ (Add)', value: '+' }, { label: '− (Subtract)', value: '-' },
        { label: '× (Multiply)', value: '*' }, { label: '÷ (Divide)', value: '/' },
      ]},
      { id: 'num2', label: 'Numerator 2', type: 'number', defaultValue: 2, required: true },
      { id: 'den2', label: 'Denominator 2', type: 'number', defaultValue: 3, min: 1, required: true },
    ],
    calculate: ({ num1, den1, operation, num2, den2 }) => {
      const n1 = Number(num1), d1 = Number(den1), n2 = Number(num2), d2 = Number(den2);
      let rn: number, rd: number;
      switch (operation) {
        case '+': rn = n1 * d2 + n2 * d1; rd = d1 * d2; break;
        case '-': rn = n1 * d2 - n2 * d1; rd = d1 * d2; break;
        case '*': rn = n1 * n2; rd = d1 * d2; break;
        case '/': rn = n1 * d2; rd = d1 * n2; break;
        default: rn = 0; rd = 1;
      }
      if (rd < 0) { rn = -rn; rd = -rd; }
      const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
      const g = gcd(rn, rd);
      const simplified = `${rn / g} / ${rd / g}`;
      const decimal = rn / rd;
      return [
        { label: 'Simplified Fraction', value: simplified },
        { label: 'Decimal Value', value: decimal, precision: 6 },
      ];
    },
    tags: ['fraction', 'simplify', 'arithmetic', 'numerator', 'denominator'],
  },
  {
    id: 'statistics',
    name: 'Statistics Calculator',
    category: 'math',
    description: 'Calculate mean, median, mode, standard deviation, and variance',
    inputs: [
      { id: 'data', label: 'Data Values', type: 'text', placeholder: 'e.g. 2, 4, 6, 8, 10, 10, 12', defaultValue: '2, 4, 6, 8, 10, 10, 12', required: true, hint: 'Comma-separated numbers' },
    ],
    calculate: ({ data }) => {
      const nums = String(data).split(/[,\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
      if (nums.length === 0) return [{ label: 'Error', value: 'No valid numbers provided' }];
      const n = nums.length;
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / n;
      const median = n % 2 === 0 ? (nums[n / 2 - 1] + nums[n / 2]) / 2 : nums[Math.floor(n / 2)];
      const modeMap = new Map<number, number>();
      nums.forEach(v => modeMap.set(v, (modeMap.get(v) || 0) + 1));
      const maxFreq = Math.max(...modeMap.values());
      const modes = [...modeMap.entries()].filter(([, f]) => f === maxFreq).map(([v]) => v);
      const variance = nums.reduce((acc, v) => acc + (v - mean) ** 2, 0) / n;
      const stdDev = Math.sqrt(variance);
      const sampleVariance = n > 1 ? nums.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
      return [
        { label: 'Count', value: n },
        { label: 'Sum', value: sum, precision: 4 },
        { label: 'Mean (Average)', value: mean, precision: 4 },
        { label: 'Median', value: median, precision: 4 },
        { label: 'Mode', value: modes.join(', ') },
        { label: 'Standard Deviation (σ)', value: stdDev, precision: 4 },
        { label: 'Variance (σ²)', value: variance, precision: 4 },
        { label: 'Min', value: nums[0] },
        { label: 'Max', value: nums[n - 1] },
      ];
    },
    tags: ['statistics', 'mean', 'median', 'mode', 'standard deviation', 'variance'],
  },
  {
    id: 'circle',
    name: 'Circle Calculator',
    category: 'math',
    description: 'Calculate circumference, area, and diameter from any known value',
    inputs: [
      { id: 'known', label: 'Known Value', type: 'select', defaultValue: 'radius', options: [
        { label: 'Radius', value: 'radius' }, { label: 'Diameter', value: 'diameter' },
        { label: 'Circumference', value: 'circumference' }, { label: 'Area', value: 'area' },
      ]},
      { id: 'value', label: 'Value', type: 'number', defaultValue: 10, min: 0, required: true },
    ],
    calculate: ({ known, value }) => {
      const v = Number(value);
      let r: number;
      switch (known) {
        case 'radius': r = v; break;
        case 'diameter': r = v / 2; break;
        case 'circumference': r = v / (2 * Math.PI); break;
        case 'area': r = Math.sqrt(v / Math.PI); break;
        default: r = v;
      }
      return [
        { label: 'Radius', value: r, precision: 4 },
        { label: 'Diameter', value: r * 2, precision: 4 },
        { label: 'Circumference', value: 2 * Math.PI * r, precision: 4 },
        { label: 'Area', value: Math.PI * r * r, precision: 4 },
      ];
    },
    tags: ['circle', 'area', 'circumference', 'radius', 'diameter', 'pi'],
  },
  {
    id: 'triangle',
    name: 'Triangle Calculator',
    category: 'math',
    description: 'Calculate area, perimeter, and sides of a right triangle',
    inputs: [
      { id: 'sideA', label: 'Side A (base)', type: 'number', defaultValue: 3, min: 0, required: true },
      { id: 'sideB', label: 'Side B (height)', type: 'number', defaultValue: 4, min: 0, required: true },
    ],
    calculate: ({ sideA, sideB }) => {
      const a = Number(sideA);
      const b = Number(sideB);
      const c = Math.sqrt(a * a + b * b);
      const area = (a * b) / 2;
      const perimeter = a + b + c;
      const angleA = Math.atan(a / b) * (180 / Math.PI);
      const angleB = Math.atan(b / a) * (180 / Math.PI);
      return [
        { label: 'Hypotenuse (c)', value: c, precision: 4 },
        { label: 'Area', value: area, precision: 4 },
        { label: 'Perimeter', value: perimeter, precision: 4 },
        { label: 'Angle α', value: angleA, unit: '°', precision: 2 },
        { label: 'Angle β', value: angleB, unit: '°', precision: 2 },
      ];
    },
    tags: ['triangle', 'pythagorean', 'hypotenuse', 'right triangle', 'area'],
  },
  {
    id: 'average',
    name: 'Average Calculator',
    category: 'math',
    description: 'Calculate arithmetic, geometric, and weighted averages',
    inputs: [
      { id: 'numbers', label: 'Numbers', type: 'text', placeholder: 'e.g. 10, 20, 30, 40', defaultValue: '10, 20, 30, 40', required: true },
      { id: 'mode', label: 'Average Type', type: 'radio', defaultValue: 'arithmetic', options: [
        { label: 'Arithmetic', value: 'arithmetic' }, { label: 'Geometric', value: 'geometric' }, { label: 'Harmonic', value: 'harmonic' },
      ]},
    ],
    calculate: ({ numbers, mode }) => {
      const nums = String(numbers).split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);
      if (nums.length === 0) return [{ label: 'Error', value: 'No valid numbers' }];
      const n = nums.length;
      const sum = nums.reduce((a, b) => a + b, 0);
      const arithmetic = sum / n;
      const geometric = Math.pow(nums.reduce((a, b) => a * b, 1), 1 / n);
      const harmonic = n / nums.reduce((a, b) => a + 1 / b, 0);
      return [
        { label: 'Arithmetic Mean', value: arithmetic, precision: 4 },
        { label: 'Geometric Mean', value: geometric, precision: 4 },
        { label: 'Harmonic Mean', value: harmonic, precision: 4 },
        { label: 'Count', value: n },
        { label: 'Sum', value: sum, precision: 4 },
      ];
    },
    tags: ['average', 'mean', 'arithmetic', 'geometric', 'harmonic'],
  },
  {
    id: 'exponent',
    name: 'Exponent & Root Calculator',
    category: 'math',
    description: 'Calculate powers, roots, and logarithms',
    inputs: [
      { id: 'base', label: 'Base', type: 'number', defaultValue: 2, required: true },
      { id: 'exponent', label: 'Exponent', type: 'number', defaultValue: 10, required: true },
    ],
    calculate: ({ base, exponent }) => {
      const b = Number(base);
      const e = Number(exponent);
      const power = Math.pow(b, e);
      const root = Math.pow(b, 1 / e);
      const logBase = e > 0 && b > 0 ? Math.log(e) / Math.log(b) : 0;
      return [
        { label: `${b}^${e}`, value: power, precision: 6 },
        { label: `${e}th root of ${b}`, value: root, precision: 6 },
        { label: `log₂(${e})`, value: Math.log2(e), precision: 6 },
        { label: `ln(${e})`, value: Math.log(e), precision: 6 },
        { label: `log₁₀(${e})`, value: Math.log10(e), precision: 6 },
      ];
    },
    tags: ['exponent', 'power', 'root', 'logarithm', 'square root'],
  },
];
