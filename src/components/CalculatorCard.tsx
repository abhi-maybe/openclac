import { Link } from 'react-router-dom';
import type { Calculator } from '@/types';
import { getCategoryInfo } from '@/types';

interface CalculatorCardProps {
  calculator: Calculator;
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const cat = getCategoryInfo(calculator.category);

  return (
    <Link
      to={`/calc/${calculator.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600">
            {calculator.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-500">
            {calculator.description}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cat.color}`}
        >
          {cat.icon}
        </span>
      </div>
    </Link>
  );
}
