import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-gray-900 hover:text-primary-600"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-lg text-white">
            =
          </span>
          <span>
            Open<span className="text-primary-600">Clac</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {!isHome && (
            <div className="hidden sm:block">
              <SearchBar />
            </div>
          )}
          <Link
            to="/about"
            className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
}
