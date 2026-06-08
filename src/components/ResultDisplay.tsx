import type { CalculatorResult } from '@/types';
import { formatNumber, formatCurrency, formatPercent } from '@/engine/utils';

interface ResultDisplayProps {
  results: CalculatorResult | CalculatorResult[];
}

function renderSingleResult(result: CalculatorResult, isPrimary: boolean) {
  const formattedValue = formatResultValue(result);
  const hasSubResults = result.subResults && result.subResults.length > 0;

  return (
    <div key={result.label} className={isPrimary ? '' : 'mt-3'}>
      <div
        className={`rounded-2xl border p-5 ${
          isPrimary
            ? 'border-primary-200 bg-primary-50'
            : 'border-gray-200 bg-white'
        }`}
      >
        <p className={`text-xs font-medium uppercase tracking-wider ${
          isPrimary ? 'text-primary-600' : 'text-gray-500'
        }`}>
          {result.label}
        </p>
        <p className={`mt-1.5 font-bold ${
          isPrimary ? 'text-3xl text-primary-900' : 'text-xl text-gray-900'
        }`}>
          {formattedValue}
          {result.unit && (
            <span className={`ml-1.5 font-normal ${
              isPrimary ? 'text-lg text-primary-600' : 'text-sm text-gray-500'
            }`}>
              {result.unit}
            </span>
          )}
        </p>

        {hasSubResults && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            {result.subResults!.map((sub) => renderSingleResult(sub, false))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatResultValue(result: CalculatorResult): string {
  if (typeof result.value === 'string') return result.value;

  if (result.precision !== undefined) {
    return formatNumber(result.value, { precision: result.precision });
  }

  // Auto-detect format based on label hints
  const label = result.label.toLowerCase();
  if (label.includes('cost') || label.includes('payment') || label.includes('price') || label.includes('interest') && label.includes('$')) {
    return formatCurrency(result.value);
  }

  return formatNumber(result.value);
}

export function ResultDisplay({ results }: ResultDisplayProps) {
  const resultArray = Array.isArray(results) ? results : [results];

  return (
    <div className="space-y-3">
      {resultArray.map((result, i) => renderSingleResult(result, i === 0))}
    </div>
  );
}
