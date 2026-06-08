import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalculatorForm } from '@/components';
import { getCalculatorById } from '@/engine';
import { getCategoryInfo } from '@/types';

export function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const calculator = getCalculatorById(id || '');

  const defaultValues = useMemo(() => {
    if (!calculator) return {};
    const defaults: Record<string, number | string> = {};
    calculator.inputs.forEach((input) => {
      if (input.defaultValue !== undefined) {
        defaults[input.id] = input.defaultValue;
      } else if (input.type === 'select' && input.options && input.options.length > 0) {
        defaults[input.id] = input.options[0].value;
      } else if (input.type === 'radio' && input.options && input.options.length > 0) {
        defaults[input.id] = input.options[0].value;
      } else {
        defaults[input.id] = '';
      }
    });
    return defaults;
  }, [calculator]);

  const [values, setValues] = useState<Record<string, number | string>>(defaultValues);

  const results = useMemo(() => {
    if (!calculator) return null;
    try {
      return calculator.calculate(values);
    } catch {
      return null;
    }
  }, [calculator, values]);

  if (!calculator) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl">🔍</p>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Calculator not found</h2>
        <p className="mt-2 text-gray-500">The calculator you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const cat = getCategoryInfo(calculator.category);

  function handleChange(id: string, value: string) {
    setValues((prev) => ({
      ...prev,
      [id]: value === '' ? '' : isNaN(Number(value)) ? value : Number(value),
    }));
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <Link to={`/category/${calculator.category}`} className="hover:text-gray-700">
          {cat.name}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{calculator.name}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full border px-3 py-1 text-sm font-medium ${cat.color}`}>
            {cat.icon} {cat.name}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">{calculator.name}</h1>
        <p className="mt-2 max-w-2xl text-gray-500">{calculator.description}</p>
      </div>

      {/* Calculator */}
      <CalculatorForm
        inputs={calculator.inputs}
        values={values}
        onChange={handleChange}
        results={results}
      />

      {/* Formula / Info */}
      {calculator.formula && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Formula</h3>
          <p className="mt-2 font-mono text-sm text-gray-700">{calculator.formula}</p>
        </div>
      )}

      {/* Tags */}
      {calculator.tags && calculator.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {calculator.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
