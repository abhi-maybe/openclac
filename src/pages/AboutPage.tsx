import { Link } from 'react-router-dom';
import { getAllCalculators } from '@/engine';

export function AboutPage() {
  const count = getAllCalculators().length;

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About OpenClac</h1>
        <p className="mt-4 text-lg text-gray-600">
          OpenClac is a free, open-source calculator platform built for people who want
          clean, ad-free tools they can self-host.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Why OpenClac?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { icon: '🚫', title: 'No Ads', desc: 'Zero advertisements, popups, or tracking scripts. Ever.' },
            { icon: '🏠', title: 'Self-Hostable', desc: 'Run it on your server with Docker. You own your data.' },
            { icon: '⚡', title: 'Instant Results', desc: 'All calculations run in your browser. No server roundtrips.' },
            { icon: '📱', title: 'Mobile-First', desc: 'Clean, responsive design that works perfectly on any device.' },
            { icon: '🔧', title: 'Extensible', desc: 'Add new calculators by writing a simple TypeScript definition.' },
            { icon: '💚', title: 'Open Source', desc: 'MIT licensed. Fork it, modify it, contribute back.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-2 font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Quick Start</h2>
        <div className="rounded-xl bg-gray-900 p-5 font-mono text-sm text-gray-100">
          <p className="text-gray-400"># Clone and run with Docker</p>
          <p className="mt-2">
            <span className="text-green-400">$</span> git clone https://github.com/openclac/openclac.git
          </p>
          <p>
            <span className="text-green-400">$</span> cd openclac
          </p>
          <p>
            <span className="text-green-400">$</span> docker compose up -d
          </p>
          <p className="mt-2 text-gray-400"># Open http://localhost:3000</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Adding a Calculator</h2>
        <p className="text-gray-600">
          Each calculator is a simple TypeScript object with inputs and a <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">calculate</code> function. Drop a new file in <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm">src/calculators/</code> and register it — that's it.
        </p>
        <div className="rounded-xl bg-gray-900 p-5 font-mono text-xs text-gray-100 overflow-x-auto">
          <pre>{`{
  id: 'my-calculator',
  name: 'My Calculator',
  category: 'math',
  description: 'Does something cool',
  inputs: [
    { id: 'x', label: 'Value X', type: 'number', defaultValue: 10 },
  ],
  calculate: ({ x }) => [
    { label: 'Result', value: Number(x) * 2, precision: 2 },
  ],
}`}</pre>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Tech Stack</h2>
        <ul className="space-y-2 text-gray-600">
          <li><strong className="text-gray-800">React 18</strong> — UI framework</li>
          <li><strong className="text-gray-800">TypeScript</strong> — Type-safe calculator definitions</li>
          <li><strong className="text-gray-800">Vite</strong> — Lightning-fast build tool</li>
          <li><strong className="text-gray-800">Tailwind CSS 4</strong> — Utility-first styling</li>
          <li><strong className="text-gray-800">React Router</strong> — SPA routing</li>
          <li><strong className="text-gray-800">Nginx</strong> — Production serving via Docker</li>
        </ul>
      </section>

      <div className="rounded-2xl bg-primary-50 p-8 text-center">
        <p className="text-lg font-semibold text-primary-900">{count} calculators and counting</p>
        <p className="mt-2 text-primary-700">
          Contribute on GitHub · Request a calculator · Star the repo ⭐
        </p>
      </div>
    </div>
  );
}
