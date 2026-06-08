import type { Calculator } from '@/types';

export const financialCalculators: Calculator[] = [
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    category: 'financial',
    description: 'Calculate monthly mortgage payments, total interest, and amortization schedule',
    inputs: [
      { id: 'homePrice', label: 'Home Price', type: 'number', unit: '$', defaultValue: 400000, min: 0, required: true },
      { id: 'downPayment', label: 'Down Payment', type: 'number', unit: '%', defaultValue: 20, min: 0, max: 100, step: 0.5, required: true },
      { id: 'loanTerm', label: 'Loan Term', type: 'select', defaultValue: 30, options: [
        { label: '30 years', value: 30 }, { label: '20 years', value: 20 }, { label: '15 years', value: 15 }, { label: '10 years', value: 10 },
      ]},
      { id: 'interestRate', label: 'Interest Rate', type: 'number', unit: '%', defaultValue: 6.5, min: 0, max: 30, step: 0.01, required: true },
    ],
    calculate: ({ homePrice, downPayment, loanTerm, interestRate }) => {
      const price = Number(homePrice);
      const dp = Number(downPayment) / 100;
      const term = Number(loanTerm) as number;
      const rate = Number(interestRate) / 100;
      const principal = price * (1 - dp);
      const monthlyRate = rate / 12;
      const n = term * 12;
      const monthly = monthlyRate === 0 ? principal / n : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      const totalPaid = monthly * n;
      const totalInterest = totalPaid - principal;
      return [
        { label: 'Monthly Payment', value: monthly, unit: '$', precision: 2 },
        { label: 'Loan Amount', value: principal, unit: '$', precision: 0 },
        { label: 'Total Interest', value: totalInterest, unit: '$', precision: 0 },
        { label: 'Total Cost', value: totalPaid, unit: '$', precision: 0 },
      ];
    },
    tags: ['mortgage', 'home loan', 'house payment', 'amortization'],
  },
  {
    id: 'loan',
    name: 'Loan Calculator',
    category: 'financial',
    description: 'Calculate monthly payments and total cost for any type of loan',
    inputs: [
      { id: 'amount', label: 'Loan Amount', type: 'number', unit: '$', defaultValue: 25000, min: 0, required: true },
      { id: 'rate', label: 'Annual Interest Rate', type: 'number', unit: '%', defaultValue: 5.5, min: 0, max: 50, step: 0.01, required: true },
      { id: 'term', label: 'Loan Term', type: 'number', unit: 'years', defaultValue: 5, min: 0.5, max: 30, step: 0.5, required: true },
    ],
    calculate: ({ amount, rate, term }) => {
      const P = Number(amount);
      const r = Number(rate) / 100 / 12;
      const n = Number(term) * 12;
      const monthly = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      return [
        { label: 'Monthly Payment', value: monthly, unit: '$', precision: 2 },
        { label: 'Total Interest', value: total - P, unit: '$', precision: 2 },
        { label: 'Total Cost', value: total, unit: '$', precision: 2 },
      ];
    },
    tags: ['loan', 'personal loan', 'auto loan', 'monthly payment'],
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'financial',
    description: 'See how your investments grow over time with compound interest',
    inputs: [
      { id: 'principal', label: 'Initial Investment', type: 'number', unit: '$', defaultValue: 10000, min: 0, required: true },
      { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', unit: '$', defaultValue: 500, min: 0 },
      { id: 'annualRate', label: 'Annual Return Rate', type: 'number', unit: '%', defaultValue: 7, min: 0, max: 50, step: 0.1, required: true },
      { id: 'years', label: 'Investment Period', type: 'number', unit: 'years', defaultValue: 20, min: 1, max: 50, required: true },
      { id: 'compoundFrequency', label: 'Compounding', type: 'select', defaultValue: 12, options: [
        { label: 'Monthly', value: 12 }, { label: 'Quarterly', value: 4 }, { label: 'Annually', value: 1 }, { label: 'Daily', value: 365 },
      ]},
    ],
    calculate: ({ principal, monthlyContribution, annualRate, years, compoundFrequency }) => {
      const P = Number(principal);
      const PMT = Number(monthlyContribution);
      const r = Number(annualRate) / 100;
      const t = Number(years);
      const n = Number(compoundFrequency);
      // Future value of lump sum
      const fvPrincipal = P * Math.pow(1 + r / n, n * t);
      // Future value of annuity (monthly contributions, converted to compound frequency)
      const periodicPMT = PMT * (12 / n);
      const fvAnnuity = r === 0 ? periodicPMT * n * t : periodicPMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
      const totalValue = fvPrincipal + fvAnnuity;
      const totalContributed = P + PMT * 12 * t;
      const totalInterest = totalValue - totalContributed;
      return [
        { label: 'Final Balance', value: totalValue, unit: '$', precision: 2 },
        { label: 'Total Contributed', value: totalContributed, unit: '$', precision: 0 },
        { label: 'Total Interest Earned', value: totalInterest, unit: '$', precision: 2 },
      ];
    },
    tags: ['compound interest', 'investment', 'savings', 'growth'],
  },
  {
    id: 'retirement',
    name: 'Retirement Savings Calculator',
    category: 'financial',
    description: 'Estimate how much you need to save for retirement',
    inputs: [
      { id: 'currentAge', label: 'Current Age', type: 'number', defaultValue: 30, min: 18, max: 100 },
      { id: 'retireAge', label: 'Retirement Age', type: 'number', defaultValue: 65, min: 30, max: 100 },
      { id: 'currentSavings', label: 'Current Savings', type: 'number', unit: '$', defaultValue: 50000, min: 0 },
      { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', unit: '$', defaultValue: 1000, min: 0 },
      { id: 'annualReturn', label: 'Expected Annual Return', type: 'number', unit: '%', defaultValue: 7, min: 0, max: 30, step: 0.1 },
      { id: 'annualSpending', label: 'Annual Spending in Retirement', type: 'number', unit: '$', defaultValue: 60000, min: 0 },
      { id: 'yearsInRetirement', label: 'Years in Retirement', type: 'number', unit: 'years', defaultValue: 25, min: 1, max: 50 },
    ],
    calculate: ({ currentAge, retireAge, currentSavings, monthlyContribution, annualReturn, annualSpending, yearsInRetirement }) => {
      const age = Number(currentAge);
      const retire = Number(retireAge);
      const savings = Number(currentSavings);
      const contrib = Number(monthlyContribution);
      const ret = Number(annualReturn) / 100;
      const spend = Number(annualSpending);
      const retireYears = Number(yearsInRetirement);
      const yearsToRetire = Math.max(retire - age, 1);
      // Accumulation phase
      let balance = savings;
      for (let y = 0; y < yearsToRetire; y++) {
        balance = balance * (1 + ret) + contrib * 12;
      }
      // Required nest egg (4% rule approximation)
      const requiredNest = spend / 0.04;
      const surplus = balance - requiredNest;
      return [
        { label: 'Projected Savings at Retirement', value: balance, unit: '$', precision: 0 },
        { label: 'Recommended Nest Egg (4% Rule)', value: requiredNest, unit: '$', precision: 0 },
        { label: surplus >= 0 ? 'Surplus' : 'Shortfall', value: Math.abs(surplus), unit: '$', precision: 0 },
      ];
    },
    tags: ['retirement', '401k', 'savings', 'pension', 'financial planning'],
  },
  {
    id: 'roi',
    name: 'ROI Calculator',
    category: 'financial',
    description: 'Calculate return on investment percentage and net profit',
    inputs: [
      { id: 'initialInvestment', label: 'Initial Investment', type: 'number', unit: '$', defaultValue: 10000, min: 0, required: true },
      { id: 'finalValue', label: 'Final Value', type: 'number', unit: '$', defaultValue: 15000, min: 0, required: true },
      { id: 'investmentPeriod', label: 'Investment Period', type: 'number', unit: 'years', defaultValue: 3, min: 0.1, step: 0.1 },
    ],
    calculate: ({ initialInvestment, finalValue, investmentPeriod }) => {
      const initial = Number(initialInvestment);
      const final = Number(finalValue);
      const years = Number(investmentPeriod);
      const netProfit = final - initial;
      const roi = (netProfit / initial) * 100;
      const annualizedROI = (Math.pow(final / initial, 1 / years) - 1) * 100;
      return [
        { label: 'ROI', value: roi, unit: '%', precision: 2 },
        { label: 'Net Profit', value: netProfit, unit: '$', precision: 2 },
        { label: 'Annualized ROI', value: annualizedROI, unit: '%', precision: 2 },
      ];
    },
    tags: ['roi', 'return on investment', 'profit', 'investment return'],
  },
  {
    id: 'tip',
    name: 'Tip Calculator',
    category: 'financial',
    description: 'Calculate tip amount and split the bill between friends',
    inputs: [
      { id: 'billAmount', label: 'Bill Amount', type: 'number', unit: '$', defaultValue: 85, min: 0, required: true },
      { id: 'tipPercent', label: 'Tip Percentage', type: 'radio', defaultValue: 18, options: [
        { label: '10%', value: 10 }, { label: '15%', value: 15 }, { label: '18%', value: 18 }, { label: '20%', value: 20 }, { label: '25%', value: 25 },
      ]},
      { id: 'numberOfPeople', label: 'Number of People', type: 'number', defaultValue: 2, min: 1, max: 100, step: 1 },
    ],
    calculate: ({ billAmount, tipPercent, numberOfPeople }) => {
      const bill = Number(billAmount);
      const tip = Number(tipPercent) / 100;
      const people = Number(numberOfPeople);
      const tipAmount = bill * tip;
      const total = bill + tipAmount;
      const perPerson = total / people;
      return [
        { label: 'Tip Amount', value: tipAmount, unit: '$', precision: 2 },
        { label: 'Total Bill', value: total, unit: '$', precision: 2 },
        { label: 'Per Person', value: perPerson, unit: '$', precision: 2 },
      ];
    },
    tags: ['tip', 'bill split', 'restaurant', 'gratuity'],
  },
  {
    id: 'vat',
    name: 'VAT / Sales Tax Calculator',
    category: 'financial',
    description: 'Add or remove VAT/sales tax from a price',
    inputs: [
      { id: 'amount', label: 'Amount', type: 'number', unit: '$', defaultValue: 100, min: 0, required: true },
      { id: 'taxRate', label: 'Tax Rate', type: 'number', unit: '%', defaultValue: 20, min: 0, max: 100, step: 0.01, required: true },
      { id: 'mode', label: 'Calculation', type: 'radio', defaultValue: 'add', options: [
        { label: 'Add Tax', value: 'add' }, { label: 'Remove Tax', value: 'remove' },
      ]},
    ],
    calculate: ({ amount, taxRate, mode }) => {
      const amt = Number(amount);
      const rate = Number(taxRate) / 100;
      if (mode === 'add') {
        const tax = amt * rate;
        return [
          { label: 'Tax Amount', value: tax, unit: '$', precision: 2 },
          { label: 'Total (incl. Tax)', value: amt + tax, unit: '$', precision: 2 },
        ];
      } else {
        const original = amt / (1 + rate);
        const tax = amt - original;
        return [
          { label: 'Price (excl. Tax)', value: original, unit: '$', precision: 2 },
          { label: 'Tax Amount', value: tax, unit: '$', precision: 2 },
        ];
      }
    },
    tags: ['vat', 'sales tax', 'gst', 'tax inclusive', 'tax exclusive'],
  },
];
