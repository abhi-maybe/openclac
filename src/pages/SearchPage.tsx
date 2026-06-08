import { useSearchParams, Link } from 'react-router-dom';
import { CalculatorCard, SearchBar } from '@/components';
import { searchCalculators } from '@/engine';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = searchCalculators(query);

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Search</span>
      </nav>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        <div className="mt-4 max-w-xl">
          <SearchBar size="lg" />
        </div>
      </div>

      {query ? (
        <>
          <p className="text-sm text-gray-500">
            {results.length} result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
          </p>
          {results.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((calc) => (
                <CalculatorCard key={calc.id} calculator={calc} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-3 text-gray-500">No calculators match your search.</p>
              <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700">
                Browse all calculators →
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-400">Type a query to search calculators.</p>
      )}
    </div>
  );
}
