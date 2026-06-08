# 🧮 OpenClac

**Free, open-source, self-hostable calculator platform.** No ads. No tracking. Just math.

47+ calculators across 7 categories — Financial, Health, Math, Physics, Engineering, Conversion, and Everyday Life.

![License](https://img.shields.io/badge/license-MIT-blue)
![Calculators](https://img.shields.io/badge/calculators-47+-green)

## ✨ Features

- 🚫 **Zero ads** — No popups, banners, or tracking scripts
- 🏠 **Self-hostable** — Deploy with Docker in seconds
- ⚡ **Instant calculations** — Everything runs client-side
- 📱 **Mobile-first** — Clean, responsive design
- 🔧 **Extensible** — Add calculators with simple TypeScript definitions
- 💚 **Open source** — MIT licensed

## 🚀 Quick Start

### Docker (Recommended)

```bash
git clone https://github.com/openclac/openclac.git
cd openclac
docker compose up -d
```

Open `http://localhost:3000`

### Docker (Single Command)

```bash
docker run -p 3000:80 openclac
```

### Local Development

```bash
npm install
npm run dev
```

## 📦 What's Included

| Category | Calculators |
|----------|------------|
| 💰 Financial | Mortgage, Loan, Compound Interest, Retirement, ROI, Tip, VAT |
| ❤️ Health | BMI, Calorie, Ideal Weight, Body Fat, Water Intake |
| 📐 Math | Percentage, Fraction, Statistics, Circle, Triangle, Average, Exponent |
| ⚛️ Physics | Kinetic Energy, Free Fall, Wave Speed, Ohm's Law, Speed/Distance/Time |
| ⚙️ Engineering | Resistor Color Code, Voltage Divider, Pipe Flow, Gear Ratio |
| 🔄 Conversion | Temperature, Length, Weight, Speed, Data Storage |
| 🏠 Everyday | Age, Date Difference, Cooking, Dog Age, Countdown, Password Strength |

## 🔧 Adding a Calculator

Each calculator is a TypeScript object. Create a file in `src/calculators/`:

```typescript
import type { Calculator } from '@/types';

export const myCalculators: Calculator[] = [
  {
    id: 'double',
    name: 'Double Calculator',
    category: 'math',
    description: 'Doubles any number',
    inputs: [
      { id: 'number', label: 'Number', type: 'number', defaultValue: 5, required: true },
    ],
    calculate: ({ number }) => [
      { label: 'Result', value: Number(number) * 2, precision: 2 },
    ],
    tags: ['double', 'multiply'],
  },
];
```

Register it in `src/calculators/index.ts` and `src/engine/registry.ts`.

### Input Types

- `number` — Numeric input with optional min/max/step
- `select` — Dropdown with options
- `radio` — Radio button group
- `text` — Free-form text input

### Calculator Object

| Field | Required | Description |
|-------|----------|-------------|
| `id` | ✅ | Unique URL-safe identifier |
| `name` | ✅ | Display name |
| `category` | ✅ | One of: `financial`, `health`, `math`, `physics`, `engineering`, `conversion`, `everyday` |
| `description` | ✅ | Short description (shown in cards) |
| `inputs` | ✅ | Array of input definitions |
| `calculate` | ✅ | Function that receives input values and returns results |
| `tags` | ❌ | Array of searchable tags |
| `formula` | ❌ | Formula display string |

## 🏗️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS 4** — Styling
- **React Router** — Client-side routing
- **Nginx** — Production serving (Docker)

## 📄 License

MIT — use it however you want.
