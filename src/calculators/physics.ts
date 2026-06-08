import type { Calculator } from '@/types';

export const physicsCalculators: Calculator[] = [
  {
    id: 'kinetic-energy',
    name: 'Kinetic Energy Calculator',
    category: 'physics',
    description: 'Calculate kinetic energy from mass and velocity (KE = ½mv²)',
    inputs: [
      { id: 'mass', label: 'Mass', type: 'number', unit: 'kg', defaultValue: 10, min: 0, required: true },
      { id: 'velocity', label: 'Velocity', type: 'number', unit: 'm/s', defaultValue: 20, required: true },
    ],
    calculate: ({ mass, velocity }) => {
      const m = Number(mass);
      const v = Number(velocity);
      const ke = 0.5 * m * v * v;
      return [
        { label: 'Kinetic Energy', value: ke, unit: 'J', precision: 2 },
        { label: 'In kilojoules', value: ke / 1000, unit: 'kJ', precision: 4 },
        { label: 'In calories', value: ke / 4.184, unit: 'cal', precision: 2 },
      ];
    },
    tags: ['kinetic energy', 'motion', 'velocity', 'physics'],
  },
  {
    id: 'free-fall',
    name: 'Free Fall Calculator',
    category: 'physics',
    description: 'Calculate fall time, final velocity, and impact energy',
    inputs: [
      { id: 'height', label: 'Height', type: 'number', unit: 'm', defaultValue: 100, min: 0, required: true },
      { id: 'gravity', label: 'Gravity', type: 'number', unit: 'm/s²', defaultValue: 9.81, min: 0.1, step: 0.01, hint: 'Earth: 9.81, Moon: 1.62, Mars: 3.72' },
      { id: 'initialVelocity', label: 'Initial Velocity', type: 'number', unit: 'm/s', defaultValue: 0, hint: 'Positive = downward' },
      { id: 'mass', label: 'Mass (optional)', type: 'number', unit: 'kg', defaultValue: 0, hint: 'For energy calculation' },
    ],
    calculate: ({ height, gravity, initialVelocity, mass }) => {
      const h = Number(height);
      const g = Number(gravity);
      const v0 = Number(initialVelocity);
      const m = Number(mass);
      // v² = v0² + 2gh
      const vf = Math.sqrt(v0 * v0 + 2 * g * h);
      // t = (vf - v0) / g
      const time = g > 0 ? (vf - v0) / g : 0;
      const results = [
        { label: 'Fall Time', value: time, unit: 'seconds', precision: 3 },
        { label: 'Final Velocity', value: vf, unit: 'm/s', precision: 2 },
        { label: 'Final Velocity', value: vf * 3.6, unit: 'km/h', precision: 2 },
      ];
      if (m > 0) {
        results.push({ label: 'Impact Energy', value: 0.5 * m * vf * vf, unit: 'J', precision: 2 });
      }
      return results;
    },
    tags: ['free fall', 'gravity', 'terminal velocity', 'impact', 'drop'],
  },
  {
    id: 'wave',
    name: 'Wave Speed Calculator',
    category: 'physics',
    description: 'Calculate wave speed, frequency, wavelength, and period',
    inputs: [
      { id: 'known', label: 'Known Values', type: 'select', defaultValue: 'freq_wavelength', options: [
        { label: 'Frequency & Wavelength', value: 'freq_wavelength' },
        { label: 'Frequency & Speed', value: 'freq_speed' },
        { label: 'Wavelength & Speed', value: 'wavelength_speed' },
      ]},
      { id: 'val1', label: 'Value 1', type: 'number', defaultValue: 500, required: true },
      { id: 'val2', label: 'Value 2', type: 'number', defaultValue: 0.686, required: true },
    ],
    calculate: ({ known, val1, val2 }) => {
      const v1 = Number(val1);
      const v2 = Number(val2);
      let speed: number, freq: number, wavelength: number;
      switch (known) {
        case 'freq_wavelength':
          freq = v1; wavelength = v2; speed = freq * wavelength; break;
        case 'freq_speed':
          freq = v1; speed = v2; wavelength = speed / freq; break;
        case 'wavelength_speed':
          wavelength = v1; speed = v2; freq = speed / wavelength; break;
        default:
          freq = 0; wavelength = 0; speed = 0;
      }
      return [
        { label: 'Wave Speed', value: speed, unit: 'm/s', precision: 2 },
        { label: 'Frequency', value: freq, unit: 'Hz', precision: 2 },
        { label: 'Wavelength', value: wavelength, unit: 'm', precision: 4 },
        { label: 'Period', value: freq > 0 ? 1 / freq : 0, unit: 's', precision: 6 },
      ];
    },
    tags: ['wave', 'frequency', 'wavelength', 'speed of sound', 'oscillation'],
  },
  {
    id: 'ohms-law',
    name: "Ohm's Law Calculator",
    category: 'physics',
    description: 'Calculate voltage, current, resistance, and power',
    inputs: [
      { id: 'voltage', label: 'Voltage', type: 'number', unit: 'V', defaultValue: 12, hint: 'Leave empty to calculate' },
      { id: 'current', label: 'Current', type: 'number', unit: 'A', defaultValue: 2, hint: 'Leave empty to calculate' },
      { id: 'resistance', label: 'Resistance', type: 'number', unit: 'Ω', defaultValue: 0, hint: 'Leave empty to calculate' },
    ],
    calculate: ({ voltage, current, resistance }) => {
      let V = Number(voltage);
      let I = Number(current);
      let R = Number(resistance);
      // Fill in missing value
      if (R === 0 && V > 0 && I > 0) R = V / I;
      else if (I === 0 && V > 0 && R > 0) I = V / R;
      else if (V === 0 && I > 0 && R > 0) V = I * R;
      const P = V * I;
      return [
        { label: 'Voltage', value: V, unit: 'V', precision: 2 },
        { label: 'Current', value: I, unit: 'A', precision: 4 },
        { label: 'Resistance', value: R, unit: 'Ω', precision: 4 },
        { label: 'Power', value: P, unit: 'W', precision: 2 },
      ];
    },
    tags: ['ohms law', 'voltage', 'current', 'resistance', 'power', 'electrical'],
  },
  {
    id: 'speed-distance-time',
    name: 'Speed / Distance / Time',
    category: 'physics',
    description: 'Calculate speed, distance, or time from the other two values',
    inputs: [
      { id: 'mode', label: 'Calculate', type: 'select', defaultValue: 'speed', options: [
        { label: 'Speed', value: 'speed' }, { label: 'Distance', value: 'distance' }, { label: 'Time', value: 'time' },
      ]},
      { id: 'val1', label: 'Value 1', type: 'number', defaultValue: 100, required: true },
      { id: 'val2', label: 'Value 2', type: 'number', defaultValue: 2, required: true },
    ],
    calculate: ({ mode, val1, val2 }) => {
      const v1 = Number(val1);
      const v2 = Number(val2);
      switch (mode) {
        case 'speed': {
          const speed = v1 / v2;
          return [
            { label: 'Speed', value: speed, unit: 'km/h', precision: 2 },
            { label: 'Speed', value: speed / 3.6, unit: 'm/s', precision: 2 },
            { label: 'Speed', value: speed * 0.621371, unit: 'mph', precision: 2 },
          ];
        }
        case 'distance': {
          const dist = v1 * v2;
          return [
            { label: 'Distance', value: dist, unit: 'km', precision: 2 },
            { label: 'Distance', value: dist * 1000, unit: 'm', precision: 0 },
            { label: 'Distance', value: dist * 0.621371, unit: 'miles', precision: 2 },
          ];
        }
        case 'time': {
          const time = v1 / v2;
          const hours = Math.floor(time);
          const minutes = Math.round((time - hours) * 60);
          return [
            { label: 'Time', value: time, unit: 'hours', precision: 4 },
            { label: 'Time', value: `${hours}h ${minutes}m` },
            { label: 'Time', value: time * 60, unit: 'minutes', precision: 1 },
          ];
        }
        default:
          return [{ label: 'Error', value: 'Invalid mode' }];
      }
    },
    tags: ['speed', 'distance', 'time', 'velocity', 'velocity calculator'],
  },
];
