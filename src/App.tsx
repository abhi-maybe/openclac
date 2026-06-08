import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calc/:id" element={<CalculatorPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  );
}
