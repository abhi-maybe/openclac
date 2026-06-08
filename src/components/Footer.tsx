import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-semibold text-gray-700">OpenClac</span>
            <span>·</span>
            <span>Free & Open Source</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <Link to="/about" className="text-sm text-gray-500 hover:text-gray-700">
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-gray-400">
            No ads · No tracking · Self-hostable
          </p>
        </div>
      </div>
    </footer>
  );
}
