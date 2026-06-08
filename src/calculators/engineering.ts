import type { Calculator } from '@/types';

export const engineeringCalculators: Calculator[] = [
  {
    id: 'resistor',
    name: 'Resistor Color Code',
    category: 'engineering',
    description: 'Decode resistor values from color bands',
    inputs: [
      { id: 'band1', label: 'Band 1', type: 'select', defaultValue: '1', options: [
        { label: 'Black (0)', value: '0' }, { label: 'Brown (1)', value: '1' }, { label: 'Red (2)', value: '2' },
        { label: 'Orange (3)', value: '3' }, { label: 'Yellow (4)', value: '4' }, { label: 'Green (5)', value: '5' },
        { label: 'Blue (6)', value: '6' }, { label: 'Violet (7)', value: '7' }, { label: 'Gray (8)', value: '8' },
        { label: 'White (9)', value: '9' },
      ]},
      { id: 'band2', label: 'Band 2', type: 'select', defaultValue: '0', options: [
        { label: 'Black (0)', value: '0' }, { label: 'Brown (1)', value: '1' }, { label: 'Red (2)', value: '2' },
        { label: 'Orange (3)', value: '3' }, { label: 'Yellow (4)', value: '4' }, { label: 'Green (5)', value: '5' },
        { label: 'Blue (6)', value: '6' }, { label: 'Violet (7)', value: '7' }, { label: 'Gray (8)', value: '8' },
        { label: 'White (9)', value: '9' },
      ]},
      { id: 'multiplier', label: 'Multiplier', type: 'select', defaultValue: '1', options: [
        { label: 'Black (×1)', value: '1' }, { label: 'Brown (×10)', value: '10' }, { label: 'Red (×100)', value: '100' },
        { label: 'Orange (×1K)', value: '1000' }, { label: 'Yellow (×10K)', value: '10000' }, { label: 'Green (×100K)', value: '100000' },
        { label: 'Blue (×1M)', value: '1000000' }, { label: 'Gold (×0.1)', value: '0.1' }, { label: 'Silver (×0.01)', value: '0.01' },
      ]},
      { id: 'tolerance', label: 'Tolerance', type: 'select', defaultValue: '5', options: [
        { label: 'Brown (±1%)', value: '1' }, { label: 'Red (±2%)', value: '2' }, { label: 'Gold (±5%)', value: '5' },
        { label: 'Silver (±10%)', value: '10' }, { label: 'None (±20%)', value: '20' },
      ]},
    ],
    calculate: ({ band1, band2, multiplier, tolerance }) => {
      const b1 = Number(band1);
      const b2 = Number(band2);
      const mult = Number(multiplier);
      const tol = Number(tolerance);
      const value = (b1 * 10 + b2) * mult;
      const min = value * (1 - tol / 100);
      const max = value * (1 + tol / 100);
      let display: string;
      if (value >= 1e6) display = `${(value / 1e6).toFixed(2)} MΩ`;
      else if (value >= 1e3) display = `${(value / 1e3).toFixed(2)} kΩ`;
      else display = `${value} Ω`;
      return [
        { label: 'Resistance', value: display },
        { label: 'Min Value', value: min >= 1e6 ? `${(min / 1e6).toFixed(2)} MΩ` : min >= 1e3 ? `${(min / 1e3).toFixed(2)} kΩ` : `${min.toFixed(0)} Ω` },
        { label: 'Max Value', value: max >= 1e6 ? `${(max / 1e6).toFixed(2)} MΩ` : max >= 1e3 ? `${(max / 1e3).toFixed(2)} kΩ` : `${max.toFixed(0)} Ω` },
        { label: 'Tolerance', value: `±${tol}%` },
      ];
    },
    tags: ['resistor', 'color code', 'electronics', 'ohm', 'circuit'],
  },
  {
    id: 'voltage-divider',
    name: 'Voltage Divider Calculator',
    category: 'engineering',
    description: 'Calculate output voltage of a resistive voltage divider',
    inputs: [
      { id: 'vin', label: 'Input Voltage', type: 'number', unit: 'V', defaultValue: 12, required: true },
      { id: 'r1', label: 'R1 (Upper Resistor)', type: 'number', unit: 'Ω', defaultValue: 10000, min: 0.01, required: true },
      { id: 'r2', label: 'R2 (Lower Resistor)', type: 'number', unit: 'Ω', defaultValue: 10000, min: 0.01, required: true },
    ],
    calculate: ({ vin, r1, r2 }) => {
      const V = Number(vin);
      const R1 = Number(r1);
      const R2 = Number(r2);
      const vout = V * (R2 / (R1 + R2));
      const ratio = R2 / (R1 + R2);
      const current = V / (R1 + R2);
      const power = current * current * R1 + current * current * R2;
      return [
        { label: 'Output Voltage', value: vout, unit: 'V', precision: 4 },
        { label: 'Voltage Ratio', value: ratio, precision: 4 },
        { label: 'Current', value: current * 1000, unit: 'mA', precision: 4 },
        { label: 'Total Power Dissipated', value: power * 1000, unit: 'mW', precision: 4 },
      ];
    },
    tags: ['voltage divider', 'electronics', 'circuit', 'resistor network'],
  },
  {
    id: 'pipe-flow',
    name: 'Pipe Flow Calculator',
    category: 'engineering',
    description: 'Calculate flow rate, velocity, and pressure drop in pipes',
    inputs: [
      { id: 'diameter', label: 'Pipe Diameter', type: 'number', unit: 'mm', defaultValue: 100, min: 1, required: true },
      { id: 'velocity', label: 'Flow Velocity', type: 'number', unit: 'm/s', defaultValue: 1.5, min: 0.01, required: true },
      { id: 'density', label: 'Fluid Density', type: 'number', unit: 'kg/m³', defaultValue: 998, min: 1, hint: 'Water ≈ 998 kg/m³' },
    ],
    calculate: ({ diameter, velocity, density }) => {
      const d = Number(diameter) / 1000; // to meters
      const v = Number(velocity);
      const rho = Number(density);
      const area = Math.PI * (d / 2) ** 2;
      const flowRate = area * v; // m³/s
      const flowLps = flowRate * 1000; // liters per second
      const reynolds = (rho * v * d) / 0.001; // assuming water viscosity
      return [
        { label: 'Flow Rate', value: flowLps, unit: 'L/s', precision: 4 },
        { label: 'Flow Rate', value: flowLps * 60, unit: 'L/min', precision: 2 },
        { label: 'Flow Rate', value: flowRate * 3600, unit: 'm³/h', precision: 4 },
        { label: 'Cross-Section Area', value: area * 10000, unit: 'cm²', precision: 2 },
        { label: 'Reynolds Number', value: Math.round(reynolds) },
        { label: 'Flow Type', value: reynolds < 2300 ? 'Laminar' : reynolds < 4000 ? 'Transitional' : 'Turbulent' },
      ];
    },
    tags: ['pipe flow', 'hydraulics', 'fluid dynamics', 'reynolds', 'flow rate'],
  },
  {
    id: 'gear-ratio',
    name: 'Gear Ratio Calculator',
    category: 'engineering',
    description: 'Calculate gear ratio, speed, and torque relationships',
    inputs: [
      { id: 'drivingTeeth', label: 'Driving Gear Teeth', type: 'number', defaultValue: 20, min: 1, required: true },
      { id: 'drivenTeeth', label: 'Driven Gear Teeth', type: 'number', defaultValue: 40, min: 1, required: true },
      { id: 'inputRPM', label: 'Input RPM', type: 'number', unit: 'RPM', defaultValue: 1500, min: 0 },
      { id: 'inputTorque', label: 'Input Torque', type: 'number', unit: 'N·m', defaultValue: 10, min: 0 },
    ],
    calculate: ({ drivingTeeth, drivenTeeth, inputRPM, inputTorque }) => {
      const z1 = Number(drivingTeeth);
      const z2 = Number(drivenTeeth);
      const rpm = Number(inputRPM);
      const torque = Number(inputTorque);
      const ratio = z2 / z1;
      const outputRPM = rpm / ratio;
      const outputTorque = torque * ratio * 0.95; // 95% efficiency estimate
      return [
        { label: 'Gear Ratio', value: ratio, precision: 3 },
        { label: 'Output RPM', value: outputRPM, unit: 'RPM', precision: 1 },
        { label: 'Output Torque', value: outputTorque, unit: 'N·m', precision: 2 },
        { label: 'Mechanical Advantage', value: ratio, precision: 3 },
        { label: 'Type', value: ratio > 1 ? 'Speed reduction (torque increase)' : ratio < 1 ? 'Speed increase (torque reduction)' : 'Direct drive (1:1)' },
      ];
    },
    tags: ['gear ratio', 'mechanical', 'torque', 'rpm', 'transmission'],
  },
];
