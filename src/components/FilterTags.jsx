// src/components/FilterTags.jsx
import React from 'react';

const types = [
  'All', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic',
  'Ice', 'Dragon', 'Dark', 'Fairy', 'Normal', 'Fighting',
  'Flying', 'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel'
];

function FilterTags({ typeFilter, setTypeFilter }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center my-4">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setTypeFilter(type.toLowerCase())}
          className={`px-3 py-1 rounded-full border text-sm transition-all ${
            typeFilter === type.toLowerCase()
              ? 'bg-blue-500 text-white'
              : 'bg-white dark:bg-gray-800 text-black dark:text-white border-gray-400'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default FilterTags;
