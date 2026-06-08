import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components';
import { HomePage } from './pages/HomePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import './index.css';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/calc/:id', element: <CalculatorPage /> },
        { path: '/category/:category', element: <CategoryPage /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/about', element: <AboutPage /> },
      ],
    },
  ],
  { basename: '/openclac' }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
