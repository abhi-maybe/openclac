import { Link } from 'react-router-dom';
import { SearchBar, CalculatorCard } from '@/components';
import { CATEGORIES } from '@/types';
import { getAllCalculators, getCalculatorsByCategory } from '@/engine';

export function HomePage() {
  const allCalcs = getAllCalculators();
  const popular = allCalcs.filter((c) =>
    ['mortgage', 'bmi', 'compound-interest', 'percentage', 'temperature', 'age', 'loan', 'calorie'].includes(c.id)
  );

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="flex flex-col items-center py-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
          <span>🧮</span>
          <span>{allCalcs.length}+ calculators · Free forever · No ads</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Every calculator you need.
          <br />
          <span className="text-primary-600">Free & open source.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-500">
          Self-hostable, ad-free, and privacy-respecting. From mortgages to BMI, physics to cooking — all the tools you use daily, in one clean interface.
        </p>
        <div className="mt-8 w-full max-w-xl">
          <SearchBar size="lg" />
        </div>
      </section>

      {/* Popular Calculators */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-900">🔥 Popular Calculators</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-900">Browse by Category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = getCalculatorsByCategory(cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all hover:shadow-md ${cat.color}`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-500">{cat.description}</p>
                  <p className="mt-1 text-xs font-medium text-gray-400">
                    {count} calculator{count !== 1 ? 's' : ''}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All calculators */}
      <section>
        <h2 className="mb-5 text-xl font-bold text-gray-900">All Calculators</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allCalcs.map((calc) => (
            <CalculatorCard key={calc.id} calculator={calc} />
          ))}
        </div>
      </section>
    </div>
  );
}
