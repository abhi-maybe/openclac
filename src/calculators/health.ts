import type { Calculator } from '@/types';

export const healthCalculators: Calculator[] = [
  {
    id: 'bmi',
    name: 'BMI Calculator',
    category: 'health',
    description: 'Calculate Body Mass Index and find your weight category',
    inputs: [
      { id: 'unit', label: 'Unit System', type: 'radio', defaultValue: 'metric', options: [
        { label: 'Metric (kg/cm)', value: 'metric' }, { label: 'Imperial (lbs/in)', value: 'imperial' },
      ]},
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', defaultValue: 70, min: 1, required: true },
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', defaultValue: 175, min: 1, required: true },
    ],
    calculate: ({ unit, weight, height }) => {
      let w = Number(weight);
      let h = Number(height);
      if (unit === 'imperial') {
        w = w * 0.453592; // lbs to kg
        h = h * 2.54; // inches to cm
      }
      const hm = h / 100;
      const bmi = w / (hm * hm);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      // Healthy weight range
      const healthyMin = 18.5 * hm * hm;
      const healthyMax = 24.9 * hm * hm;
      const convFactor = unit === 'imperial' ? 2.20462 : 1;
      return [
        { label: 'Your BMI', value: bmi, precision: 1 },
        { label: 'Category', value: category },
        { label: 'Healthy Weight Range', value: `${(healthyMin * convFactor).toFixed(1)} – ${(healthyMax * convFactor).toFixed(1)} ${unit === 'imperial' ? 'lbs' : 'kg'}` },
      ];
    },
    tags: ['bmi', 'body mass index', 'weight', 'health'],
  },
  {
    id: 'calorie',
    name: 'Calorie Calculator',
    category: 'health',
    description: 'Calculate daily calorie needs based on activity level and goals',
    inputs: [
      { id: 'gender', label: 'Biological Sex', type: 'radio', defaultValue: 'male', options: [
        { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' },
      ]},
      { id: 'age', label: 'Age', type: 'number', unit: 'years', defaultValue: 30, min: 15, max: 120, required: true },
      { id: 'weight', label: 'Weight', type: 'number', unit: 'kg', defaultValue: 70, min: 20, required: true },
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', defaultValue: 175, min: 100, required: true },
      { id: 'activity', label: 'Activity Level', type: 'select', defaultValue: 1.55, options: [
        { label: 'Sedentary (little/no exercise)', value: 1.2 },
        { label: 'Lightly active (1-3 days/week)', value: 1.375 },
        { label: 'Moderately active (3-5 days/week)', value: 1.55 },
        { label: 'Very active (6-7 days/week)', value: 1.725 },
        { label: 'Extra active (athlete)', value: 1.9 },
      ]},
    ],
    calculate: ({ gender, age, weight, height, activity }) => {
      const a = Number(age);
      const w = Number(weight);
      const h = Number(height);
      const act = Number(activity);
      // Mifflin-St Jeor Equation
      const bmr = gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
      const tdee = bmr * act;
      return [
        { label: 'Basal Metabolic Rate (BMR)', value: Math.round(bmr), unit: 'kcal/day' },
        { label: 'Daily Calories (TDEE)', value: Math.round(tdee), unit: 'kcal/day' },
        { label: 'Weight Loss (−500)', value: Math.round(tdee - 500), unit: 'kcal/day' },
        { label: 'Weight Gain (+500)', value: Math.round(tdee + 500), unit: 'kcal/day' },
      ];
    },
    tags: ['calorie', 'tdee', 'bmr', 'diet', 'weight loss', 'mifflin'],
  },
  {
    id: 'ideal-weight',
    name: 'Ideal Body Weight Calculator',
    category: 'health',
    description: 'Estimate ideal weight using multiple medical formulas',
    inputs: [
      { id: 'gender', label: 'Biological Sex', type: 'radio', defaultValue: 'male', options: [
        { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' },
      ]},
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', defaultValue: 175, min: 100, required: true },
    ],
    calculate: ({ gender, height }) => {
      const h = Number(height);
      const inches = h / 2.54;
      const base = 50 + 2.3 * (inches - 60); // Devine
      const robinson = gender === 'male' ? 52 + 1.9 * (inches - 60) : 49 + 1.7 * (inches - 60);
      const miller = gender === 'male' ? 56.2 + 1.41 * (inches - 60) : 53.1 + 1.36 * (inches - 60);
      const hamwi = gender === 'male' ? 48 + 2.7 * (inches - 60) : 45.5 + 2.2 * (inches - 60);
      return [
        { label: 'Devine Formula', value: base, unit: 'kg', precision: 1 },
        { label: 'Robinson Formula', value: robinson, unit: 'kg', precision: 1 },
        { label: 'Miller Formula', value: miller, unit: 'kg', precision: 1 },
        { label: 'Hamwi Formula', value: hamwi, unit: 'kg', precision: 1 },
      ];
    },
    tags: ['ideal weight', 'healthy weight', 'body weight', 'devine', 'robinson'],
  },
  {
    id: 'body-fat',
    name: 'Body Fat Calculator (US Navy)',
    category: 'health',
    description: 'Estimate body fat percentage using the US Navy method',
    inputs: [
      { id: 'gender', label: 'Biological Sex', type: 'radio', defaultValue: 'male', options: [
        { label: 'Male', value: 'male' }, { label: 'Female', value: 'female' },
      ]},
      { id: 'height', label: 'Height', type: 'number', unit: 'cm', defaultValue: 175, min: 100, required: true },
      { id: 'neck', label: 'Neck Circumference', type: 'number', unit: 'cm', defaultValue: 37, min: 20, required: true, hint: 'Measure just below the Adam\'s apple' },
      { id: 'waist', label: 'Waist Circumference', type: 'number', unit: 'cm', defaultValue: 82, min: 30, required: true, hint: 'Measure at the navel level' },
      { id: 'hip', label: 'Hip Circumference', type: 'number', unit: 'cm', defaultValue: 95, min: 30, hint: 'Females only — measure at widest point' },
    ],
    calculate: ({ gender, height, neck, waist, hip }) => {
      const h = Number(height);
      const n = Number(neck);
      const w = Number(waist);
      const hp = Number(hip);
      let bf: number;
      if (gender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
      }
      let category = '';
      if (gender === 'male') {
        if (bf < 6) category = 'Essential fat';
        else if (bf < 14) category = 'Athletes';
        else if (bf < 18) category = 'Fitness';
        else if (bf < 25) category = 'Average';
        else category = 'Obese';
      } else {
        if (bf < 14) category = 'Essential fat';
        else if (bf < 21) category = 'Athletes';
        else if (bf < 25) category = 'Fitness';
        else if (bf < 32) category = 'Average';
        else category = 'Obese';
      }
      return [
        { label: 'Body Fat Percentage', value: bf, unit: '%', precision: 1 },
        { label: 'Category', value: category },
        { label: 'Fat Mass', value: bf / 100 * Number(gender === 'male' ? 70 : 60), unit: 'kg', precision: 1 },
      ];
    },
    tags: ['body fat', 'navy method', 'body composition', 'lean mass'],
  },
  {
    id: 'water-intake',
    name: 'Daily Water Intake',
    category: 'health',
    description: 'Calculate recommended daily water intake based on weight and activity',
    inputs: [
      { id: 'weight', label: 'Body Weight', type: 'number', unit: 'kg', defaultValue: 70, min: 20, required: true },
      { id: 'activity', label: 'Activity Level', type: 'radio', defaultValue: 'moderate', options: [
        { label: 'Sedentary', value: 'sedentary' }, { label: 'Light', value: 'light' },
        { label: 'Moderate', value: 'moderate' }, { label: 'Active', value: 'active' },
      ]},
      { id: 'climate', label: 'Climate', type: 'radio', defaultValue: 'normal', options: [
        { label: 'Cold', value: 'cold' }, { label: 'Normal', value: 'normal' }, { label: 'Hot', value: 'hot' },
      ]},
    ],
    calculate: ({ weight, activity, climate }) => {
      const w = Number(weight);
      const base = w * 33; // ml per kg baseline
      const activityMult: Record<string, number> = { sedentary: 1, light: 1.1, moderate: 1.25, active: 1.5 };
      const climateMult: Record<string, number> = { cold: 0.9, normal: 1, hot: 1.2 };
      const ml = base * (activityMult[activity as string] ?? 1) * (climateMult[climate as string] ?? 1);
      return [
        { label: 'Daily Water Intake', value: Math.round(ml), unit: 'ml' },
        { label: 'In Glasses (250ml)', value: Math.round(ml / 250), unit: 'glasses' },
        { label: 'In Liters', value: (ml / 1000).toFixed(1), unit: 'L' },
        { label: 'In oz (US)', value: Math.round(ml / 29.5735), unit: 'oz' },
      ];
    },
    tags: ['water', 'hydration', 'daily intake', 'glasses'],
  },
];
