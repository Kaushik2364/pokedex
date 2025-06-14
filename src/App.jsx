// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage'; // ✅ Add this
import { useTheme } from './context/ThemeContext';

function App() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <header className="flex items-center justify-between p-4 shadow-md bg-gray-100 dark:bg-gray-800">
        <h1 className="text-xl font-bold">
          <Link to="/">Pokedex</Link>
        </h1>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          {/* <Link to="/favorites" className="hover:underline">Favorites</Link> */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-2 py-1 rounded bg-gray-300 dark:bg-gray-600"
          >
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<DetailPage />} /> {/* ✅ Safe now */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
