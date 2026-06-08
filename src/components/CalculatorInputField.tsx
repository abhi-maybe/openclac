import type { CalculatorInput } from '@/types';

interface CalculatorInputFieldProps {
  input: CalculatorInput;
  value: string | number;
  onChange: (value: string) => void;
}

export function CalculatorInputField({ input, value, onChange }: CalculatorInputFieldProps) {
  const baseClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-all placeholder:text-gray-400 focus:border-primary-400 focus:bg-primary-50/30';

  return (
    <div className="group">
      <label
        htmlFor={input.id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-gray-700"
      >
        <span>{input.label}</span>
        {input.unit && (
          <span className="text-xs font-normal text-gray-400">({input.unit})</span>
        )}
      </label>

      {input.type === 'number' && (
        <input
          id={input.id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={input.placeholder ?? `Enter ${input.label.toLowerCase()}`}
          min={input.min}
          max={input.max}
          step={input.step ?? 'any'}
          required={input.required}
          className={baseClass}
        />
      )}

      {input.type === 'select' && (
        <select
          id={input.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={input.required}
          className={`${baseClass} cursor-pointer`}
        >
          {input.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {input.type === 'radio' && input.options && (
        <div className="flex flex-wrap gap-2">
          {input.options.map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
                String(value) === String(opt.value)
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={input.id}
                value={opt.value}
                checked={String(value) === String(opt.value)}
                onChange={() => onChange(String(opt.value))}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}

      {input.hint && (
        <p className="mt-1 text-xs text-gray-400">{input.hint}</p>
      )}
    </div>
  );
}
