import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCalculators } from '@/engine';

export function SearchBar({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState(searchCalculators(''));
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setResults(searchCalculators(query));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setFocused(false);
      inputRef.current?.blur();
    }
  }

  function handleSelect(id: string) {
    navigate(`/calc/${id}`);
    setQuery('');
    setFocused(false);
  }

  const isLg = size === 'lg';

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 ${isLg ? 'h-5 w-5' : 'h-4 w-4'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            className={`w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 transition-all placeholder:text-gray-400 focus:border-primary-400 focus:bg-white ${
              isLg
                ? 'py-3.5 text-base shadow-sm focus:shadow-md'
                : 'py-2 text-sm'
            }`}
          />
        </div>
      </form>

      {/* Dropdown results */}
      {focused && results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="max-h-80 overflow-y-auto py-1">
            {results.slice(0, 8).map((calc) => (
              <button
                key={calc.id}
                onClick={() => handleSelect(calc.id)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{calc.name}</p>
                  <p className="truncate text-xs text-gray-500">{calc.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 capitalize">
                  {calc.category}
                </span>
              </button>
            ))}
          </div>
          {results.length > 8 && (
            <button
              onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
              className="w-full border-t border-gray-100 px-4 py-2 text-center text-sm font-medium text-primary-600 transition-colors hover:bg-gray-50"
            >
              See all {results.length} results →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
