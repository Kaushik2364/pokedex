// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          PokéDex
        </Link>

        {/* Navigation Placeholder */}
        <nav className="flex gap-4 items-center">
          <Link
            to="/"
            className="text-gray-800 dark:text-gray-200 text-sm hover:underline"
          >
            Home
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

