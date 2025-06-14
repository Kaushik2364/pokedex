// src/components/SearchBar.jsx
import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[300px] px-4 py-2 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default SearchBar;
