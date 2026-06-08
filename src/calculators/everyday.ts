import type { Calculator } from '@/types';

export const everydayCalculators: Calculator[] = [
  {
    id: 'age',
    name: 'Age Calculator',
    category: 'everyday',
    description: 'Calculate exact age in years, months, days, and more',
    inputs: [
      { id: 'birthDate', label: 'Date of Birth', type: 'text', placeholder: 'YYYY-MM-DD', defaultValue: '1995-06-15', required: true, hint: 'Format: YYYY-MM-DD' },
      { id: 'toDate', label: 'Calculate To', type: 'text', placeholder: 'YYYY-MM-DD', defaultValue: new Date().toISOString().slice(0, 10), hint: 'Leave empty for today' },
    ],
    calculate: ({ birthDate, toDate }) => {
      const birth = new Date(String(birthDate));
      const target = toDate ? new Date(String(toDate)) : new Date();
      if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
        return [{ label: 'Error', value: 'Invalid date format. Use YYYY-MM-DD' }];
      }
      let years = target.getFullYear() - birth.getFullYear();
      let months = target.getMonth() - birth.getMonth();
      let days = target.getDate() - birth.getDate();
      if (days < 0) { months--; const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0); days += prevMonth.getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = totalDays * 24;
      const totalMinutes = totalHours * 60;
      return [
        { label: 'Age', value: `${years} years, ${months} months, ${days} days` },
        { label: 'Total Days', value: totalDays.toLocaleString() },
        { label: 'Total Weeks', value: totalWeeks.toLocaleString() },
        { label: 'Total Hours', value: totalHours.toLocaleString() },
        { label: 'Total Minutes', value: totalMinutes.toLocaleString() },
        { label: 'Next Birthday', value: (() => {
          const next = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
          if (next <= target) next.setFullYear(next.getFullYear() + 1);
          const daysUntil = Math.ceil((next.getTime() - target.getTime()) / 86400000);
          return `${daysUntil} days`;
        })() },
      ];
    },
    tags: ['age', 'birthday', 'date', 'how old', 'days alive'],
  },
  {
    id: 'date-difference',
    name: 'Date Difference Calculator',
    category: 'everyday',
    description: 'Calculate the number of days between two dates',
    inputs: [
      { id: 'startDate', label: 'Start Date', type: 'text', placeholder: 'YYYY-MM-DD', defaultValue: '2024-01-01', required: true },
      { id: 'endDate', label: 'End Date', type: 'text', placeholder: 'YYYY-MM-DD', defaultValue: '2024-12-31', required: true },
    ],
    calculate: ({ startDate, endDate }) => {
      const start = new Date(String(startDate));
      const end = new Date(String(endDate));
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return [{ label: 'Error', value: 'Invalid date format' }];
      }
      const diffMs = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.floor(diffMs / 86400000);
      const diffWeeks = Math.floor(diffDays / 7);
      const diffMonths = Math.floor(diffDays / 30.44);
      const remainingDays = diffDays % 7;
      return [
        { label: 'Total Days', value: diffDays },
        { label: 'Weeks', value: `${diffWeeks} weeks, ${remainingDays} days` },
        { label: 'Approx. Months', value: diffMonths },
        { label: 'Hours', value: (diffDays * 24).toLocaleString() },
        { label: 'Minutes', value: (diffDays * 24 * 60).toLocaleString() },
      ];
    },
    tags: ['date', 'difference', 'days between', 'countdown', 'duration'],
  },
  {
    id: 'cooking',
    name: 'Cooking Unit Converter',
    category: 'everyday',
    description: 'Convert between cups, tablespoons, teaspoons, ml, and more',
    inputs: [
      { id: 'value', label: 'Amount', type: 'number', defaultValue: 1, min: 0, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'cups', options: [
        { label: 'Cups (US)', value: 'cups' }, { label: 'Tablespoons', value: 'tbsp' },
        { label: 'Teaspoons', value: 'tsp' }, { label: 'Milliliters', value: 'ml' },
        { label: 'Liters', value: 'liters' }, { label: 'Fluid Ounces', value: 'floz' },
        { label: 'Pints', value: 'pints' }, { label: 'Quarts', value: 'quarts' },
        { label: 'Gallons', value: 'gallons' },
      ]},
    ],
    calculate: ({ value, from }) => {
      const v = Number(value);
      const toMl: Record<string, number> = {
        cups: 236.588, tbsp: 14.7868, tsp: 4.92892, ml: 1,
        liters: 1000, floz: 29.5735, pints: 473.176, quarts: 946.353, gallons: 3785.41,
      };
      const ml = v * (toMl[from as string] || 1);
      return [
        { label: 'Cups', value: ml / 236.588, precision: 3 },
        { label: 'Tablespoons', value: ml / 14.7868, precision: 2 },
        { label: 'Teaspoons', value: ml / 4.92892, precision: 2 },
        { label: 'Milliliters', value: ml, precision: 2 },
        { label: 'Fluid Ounces', value: ml / 29.5735, precision: 3 },
        { label: 'Liters', value: ml / 1000, precision: 4 },
      ];
    },
    tags: ['cooking', 'recipe', 'cups', 'tablespoons', 'ml', 'measurement'],
  },
  {
    id: 'dog-age',
    name: 'Dog Age Calculator',
    category: 'everyday',
    description: 'Convert dog years to human years based on breed size',
    inputs: [
      { id: 'dogAge', label: "Dog's Age", type: 'number', unit: 'years', defaultValue: 3, min: 0, max: 30, required: true },
      { id: 'size', label: 'Dog Size', type: 'radio', defaultValue: 'medium', options: [
        { label: 'Small (< 20 lbs)', value: 'small' }, { label: 'Medium (20-50 lbs)', value: 'medium' },
        { label: 'Large (50-90 lbs)', value: 'large' }, { label: 'Giant (> 90 lbs)', value: 'giant' },
      ]},
    ],
    calculate: ({ dogAge, size }) => {
      const age = Number(dogAge);
      // Modern formula (UBC research)
      let humanAge: number;
      if (age <= 0) humanAge = 0;
      else if (age <= 1) humanAge = age * 15;
      else if (age <= 2) humanAge = 15 + (age - 1) * 9;
      else {
        const base = 24;
        const multiplier: Record<string, number> = { small: 4, medium: 5, large: 6, giant: 7 };
        humanAge = base + (age - 2) * (multiplier[size as string] || 5);
      }
      let lifeStage = '';
      if (age < 1) lifeStage = 'Puppy';
      else if (age < 3) lifeStage = 'Young Adult';
      else if (age < 7) lifeStage = 'Adult';
      else if (age < 11) lifeStage = 'Senior';
      else lifeStage = 'Geriatric';
      return [
        { label: 'Human Equivalent Age', value: Math.round(humanAge), unit: 'years' },
        { label: 'Life Stage', value: lifeStage },
      ];
    },
    tags: ['dog', 'pet', 'dog years', 'human years', 'age'],
  },
  {
    id: 'countdown',
    name: 'Countdown Timer Calculator',
    category: 'everyday',
    description: 'Count days, hours, minutes until a specific date/time',
    inputs: [
      { id: 'targetDate', label: 'Target Date', type: 'text', placeholder: 'YYYY-MM-DD', defaultValue: '2027-01-01', required: true, hint: 'Format: YYYY-MM-DD' },
    ],
    calculate: ({ targetDate }) => {
      const target = new Date(String(targetDate));
      const now = new Date();
      if (isNaN(target.getTime())) return [{ label: 'Error', value: 'Invalid date' }];
      const diff = target.getTime() - now.getTime();
      if (diff < 0) {
        const past = Math.abs(diff);
        const d = Math.floor(past / 86400000);
        return [
          { label: 'Status', value: 'This date has passed!' },
          { label: 'Days Since', value: d },
        ];
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const weeks = Math.floor(days / 7);
      const months = Math.floor(days / 30.44);
      return [
        { label: 'Countdown', value: `${days}d ${hours}h ${minutes}m ${seconds}s` },
        { label: 'Total Days', value: days },
        { label: 'Weeks', value: weeks },
        { label: 'Approx. Months', value: months },
        { label: 'Total Hours', value: Math.floor(diff / 3600000).toLocaleString() },
      ];
    },
    tags: ['countdown', 'timer', 'days until', 'event', 'new year'],
  },
  {
    id: 'password-strength',
    name: 'Password Strength & Generator',
    category: 'everyday',
    description: 'Estimate password entropy and time to crack',
    inputs: [
      { id: 'length', label: 'Password Length', type: 'number', defaultValue: 16, min: 4, max: 128, required: true },
      { id: 'hasUpper', label: 'Uppercase (A-Z)', type: 'radio', defaultValue: 'yes', options: [
        { label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' },
      ]},
      { id: 'hasLower', label: 'Lowercase (a-z)', type: 'radio', defaultValue: 'yes', options: [
        { label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' },
      ]},
      { id: 'hasNumbers', label: 'Numbers (0-9)', type: 'radio', defaultValue: 'yes', options: [
        { label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' },
      ]},
      { id: 'hasSymbols', label: 'Symbols (!@#$...)', type: 'radio', defaultValue: 'yes', options: [
        { label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' },
      ]},
    ],
    calculate: ({ length, hasUpper, hasLower, hasNumbers, hasSymbols }) => {
      const len = Number(length);
      let pool = 0;
      if (hasUpper === 'yes') pool += 26;
      if (hasLower === 'yes') pool += 26;
      if (hasNumbers === 'yes') pool += 10;
      if (hasSymbols === 'yes') pool += 33;
      if (pool === 0) return [{ label: 'Error', value: 'Select at least one character type' }];
      const entropy = len * Math.log2(pool);
      const combinations = Math.pow(pool, len);
      // Assume 10 billion guesses per second (modern GPU cluster)
      const guessesPerSec = 1e10;
      const seconds = combinations / guessesPerSec / 2; // average case
      let crackTime: string;
      if (seconds < 1) crackTime = 'Instantly';
      else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`;
      else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`;
      else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`;
      else if (seconds < 86400 * 365) crackTime = `${Math.round(seconds / 86400)} days`;
      else if (seconds < 86400 * 365 * 1000) crackTime = `${Math.round(seconds / (86400 * 365))} years`;
      else if (seconds < 86400 * 365 * 1e6) crackTime = `${(seconds / (86400 * 365 * 1000)).toFixed(0)} thousand years`;
      else if (seconds < 86400 * 365 * 1e9) crackTime = `${(seconds / (86400 * 365 * 1e6)).toFixed(0)} million years`;
      else crackTime = 'Billions+ years';
      let strength = '';
      if (entropy < 28) strength = '⚠️ Very Weak';
      else if (entropy < 36) strength = '🟡 Weak';
      else if (entropy < 60) strength = '🟢 Fair';
      else if (entropy < 80) strength = '💪 Strong';
      else strength = '🛡️ Very Strong';
      return [
        { label: 'Strength', value: strength },
        { label: 'Entropy', value: entropy.toFixed(1), unit: 'bits' },
        { label: 'Character Pool Size', value: pool },
        { label: 'Possible Combinations', value: combinations.toExponential(2) },
        { label: 'Time to Crack (10B guesses/s)', value: crackTime },
      ];
    },
    tags: ['password', 'security', 'entropy', 'crack', 'generator'],
  },
];
