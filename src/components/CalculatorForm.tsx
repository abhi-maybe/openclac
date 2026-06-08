import type { CalculatorInput as CalcInput, CalculatorResult } from '@/types';
import { CalculatorInputField } from './CalculatorInputField';
import { ResultDisplay } from './ResultDisplay';

interface CalculatorFormProps {
  inputs: CalcInput[];
  values: Record<string, number | string>;
  onChange: (id: string, value: string) => void;
  results: CalculatorResult | CalculatorResult[] | null;
}

export function CalculatorForm({ inputs, values, onChange, results }: CalculatorFormProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Inputs */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Input Values
        </h3>
        <div className="space-y-4">
          {inputs.map((input) => (
            <CalculatorInputField
              key={input.id}
              input={input}
              value={values[input.id] ?? input.defaultValue ?? ''}
              onChange={(val) => onChange(input.id, val)}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Results
        </h3>
        {results ? (
          <ResultDisplay results={results} />
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white p-8 text-center">
            <p className="text-sm text-gray-400">
              Enter values to see results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
