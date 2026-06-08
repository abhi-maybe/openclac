import { useParams, Link } from 'react-router-dom';
import { CalculatorCard } from '@/components';
import { getCalculatorsByCategory } from '@/engine';
import { getCategoryInfo, CATEGORIES, type Category } from '@/types';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const catId = category as Category;
  const catInfo = CATEGORIES.find((c) => c.id === catId);

  if (!catInfo) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl">📂</p>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">Category not found</h2>
        <Link to="/" className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-700">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const calcs = getCalculatorsByCategory(catId);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">{catInfo.name}</span>
      </nav>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{catInfo.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{catInfo.name}</h1>
            <p className="mt-1 text-gray-500">{catInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Calculator grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calcs.map((calc) => (
          <CalculatorCard key={calc.id} calculator={calc} />
        ))}
      </div>

      {/* Other categories */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Other Categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== catId).map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all hover:shadow-sm ${c.color}`}
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
