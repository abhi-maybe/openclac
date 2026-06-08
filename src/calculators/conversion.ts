import type { Calculator } from '@/types';

export const conversionCalculators: Calculator[] = [
  {
    id: 'temperature',
    name: 'Temperature Converter',
    category: 'conversion',
    description: 'Convert between Celsius, Fahrenheit, Kelvin, and Rankine',
    inputs: [
      { id: 'value', label: 'Temperature', type: 'number', defaultValue: 100, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'celsius', options: [
        { label: 'Celsius (°C)', value: 'celsius' }, { label: 'Fahrenheit (°F)', value: 'fahrenheit' },
        { label: 'Kelvin (K)', value: 'kelvin' }, { label: 'Rankine (°R)', value: 'rankine' },
      ]},
    ],
    calculate: ({ value, from }) => {
      const v = Number(value);
      let celsius: number;
      switch (from) {
        case 'celsius': celsius = v; break;
        case 'fahrenheit': celsius = (v - 32) * 5 / 9; break;
        case 'kelvin': celsius = v - 273.15; break;
        case 'rankine': celsius = (v - 491.67) * 5 / 9; break;
        default: celsius = v;
      }
      return [
        { label: 'Celsius', value: celsius, unit: '°C', precision: 2 },
        { label: 'Fahrenheit', value: celsius * 9 / 5 + 32, unit: '°F', precision: 2 },
        { label: 'Kelvin', value: celsius + 273.15, unit: 'K', precision: 2 },
        { label: 'Rankine', value: (celsius + 273.15) * 9 / 5, unit: '°R', precision: 2 },
      ];
    },
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'converter'],
  },
  {
    id: 'length',
    name: 'Length Converter',
    category: 'conversion',
    description: 'Convert between meters, feet, inches, miles, kilometers, and more',
    inputs: [
      { id: 'value', label: 'Value', type: 'number', defaultValue: 1, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'meters', options: [
        { label: 'Meters (m)', value: 'meters' }, { label: 'Kilometers (km)', value: 'kilometers' },
        { label: 'Miles (mi)', value: 'miles' }, { label: 'Feet (ft)', value: 'feet' },
        { label: 'Inches (in)', value: 'inches' }, { label: 'Yards (yd)', value: 'yards' },
        { label: 'Centimeters (cm)', value: 'centimeters' }, { label: 'Millimeters (mm)', value: 'millimeters' },
      ]},
    ],
    calculate: ({ value, from }) => {
      const v = Number(value);
      const toMeters: Record<string, number> = {
        meters: 1, kilometers: 1000, miles: 1609.344, feet: 0.3048,
        inches: 0.0254, yards: 0.9144, centimeters: 0.01, millimeters: 0.001,
      };
      const m = v * (toMeters[from as string] || 1);
      return [
        { label: 'Meters', value: m, unit: 'm', precision: 4 },
        { label: 'Kilometers', value: m / 1000, unit: 'km', precision: 6 },
        { label: 'Miles', value: m / 1609.344, unit: 'mi', precision: 6 },
        { label: 'Feet', value: m / 0.3048, unit: 'ft', precision: 4 },
        { label: 'Inches', value: m / 0.0254, unit: 'in', precision: 4 },
        { label: 'Yards', value: m / 0.9144, unit: 'yd', precision: 4 },
      ];
    },
    tags: ['length', 'distance', 'meter', 'feet', 'inch', 'mile', 'converter'],
  },
  {
    id: 'weight',
    name: 'Weight / Mass Converter',
    category: 'conversion',
    description: 'Convert between kilograms, pounds, ounces, stones, and grams',
    inputs: [
      { id: 'value', label: 'Value', type: 'number', defaultValue: 1, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'kilograms', options: [
        { label: 'Kilograms (kg)', value: 'kilograms' }, { label: 'Pounds (lbs)', value: 'pounds' },
        { label: 'Ounces (oz)', value: 'ounces' }, { label: 'Stones (st)', value: 'stones' },
        { label: 'Grams (g)', value: 'grams' }, { label: 'Metric Tons (t)', value: 'tons' },
      ]},
    ],
    calculate: ({ value, from }) => {
      const v = Number(value);
      const toKg: Record<string, number> = {
        kilograms: 1, pounds: 0.453592, ounces: 0.0283495,
        stones: 6.35029, grams: 0.001, tons: 1000,
      };
      const kg = v * (toKg[from as string] || 1);
      return [
        { label: 'Kilograms', value: kg, unit: 'kg', precision: 4 },
        { label: 'Pounds', value: kg / 0.453592, unit: 'lbs', precision: 4 },
        { label: 'Ounces', value: kg / 0.0283495, unit: 'oz', precision: 4 },
        { label: 'Stones', value: kg / 6.35029, unit: 'st', precision: 4 },
        { label: 'Grams', value: kg * 1000, unit: 'g', precision: 2 },
        { label: 'Metric Tons', value: kg / 1000, unit: 't', precision: 6 },
      ];
    },
    tags: ['weight', 'mass', 'kg', 'pounds', 'oz', 'converter'],
  },
  {
    id: 'speed',
    name: 'Speed Converter',
    category: 'conversion',
    description: 'Convert between km/h, mph, m/s, knots, and Mach',
    inputs: [
      { id: 'value', label: 'Speed', type: 'number', defaultValue: 100, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'kmh', options: [
        { label: 'km/h', value: 'kmh' }, { label: 'mph', value: 'mph' },
        { label: 'm/s', value: 'ms' }, { label: 'Knots', value: 'knots' },
        { label: 'Mach', value: 'mach' },
      ]},
    ],
    calculate: ({ value, from }) => {
      const v = Number(value);
      const toMs: Record<string, number> = {
        kmh: 1 / 3.6, mph: 0.44704, ms: 1, knots: 0.514444, mach: 343,
      };
      const ms = v * (toMs[from as string] || 1);
      return [
        { label: 'm/s', value: ms, unit: 'm/s', precision: 4 },
        { label: 'km/h', value: ms * 3.6, unit: 'km/h', precision: 4 },
        { label: 'mph', value: ms / 0.44704, unit: 'mph', precision: 4 },
        { label: 'Knots', value: ms / 0.514444, unit: 'kn', precision: 4 },
        { label: 'Mach', value: ms / 343, precision: 6 },
      ];
    },
    tags: ['speed', 'velocity', 'kmh', 'mph', 'knots', 'mach', 'converter'],
  },
  {
    id: 'data-storage',
    name: 'Data Storage Converter',
    category: 'conversion',
    description: 'Convert between bytes, KB, MB, GB, TB, and PB',
    inputs: [
      { id: 'value', label: 'Value', type: 'number', defaultValue: 1, required: true },
      { id: 'from', label: 'From', type: 'select', defaultValue: 'gb', options: [
        { label: 'Bytes (B)', value: 'b' }, { label: 'Kilobytes (KB)', value: 'kb' },
        { label: 'Megabytes (MB)', value: 'mb' }, { label: 'Gigabytes (GB)', value: 'gb' },
        { label: 'Terabytes (TB)', value: 'tb' }, { label: 'Petabytes (PB)', value: 'pb' },
      ]},
      { id: 'standard', label: 'Standard', type: 'radio', defaultValue: 'si', options: [
        { label: 'SI (1 KB = 1000 B)', value: 'si' }, { label: 'Binary (1 KiB = 1024 B)', value: 'binary' },
      ]},
    ],
    calculate: ({ value, from, standard }) => {
      const v = Number(value);
      const base = standard === 'binary' ? 1024 : 1000;
      const units = ['b', 'kb', 'mb', 'gb', 'tb', 'pb'];
      const idx = units.indexOf(from as string);
      const bytes = v * Math.pow(base, idx);
      const labels = standard === 'binary'
        ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
        : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      return units.map((u, i) => ({
        label: labels[i],
        value: bytes / Math.pow(base, i),
        precision: i === 0 ? 0 : 4,
      }));
    },
    tags: ['data', 'storage', 'bytes', 'megabyte', 'gigabyte', 'terabyte'],
  },
];
