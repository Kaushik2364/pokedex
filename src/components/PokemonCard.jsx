// src/components/PokemonCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, HeartOff } from 'lucide-react';

function PokemonCard({ pokemon, isFavorite, toggleFavorite }) {
  if (!pokemon || !pokemon.name) return null;

  return (
    <div className="relative">
      {/* Favorite toggle button */}
      <button
        className="absolute top-3 left-3 z-20"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(pokemon.name);
        }}
        aria-label="Toggle Favorite"
      >
        {isFavorite ? (
          <Heart className="text-red-500 fill-red-500" />
        ) : (
          <HeartOff className="text-gray-400 hover:text-red-400" />
        )}
      </button>

      {/* Card clickable link to detail page */}
      <Link
        to={`/pokemon/${pokemon.name}`}
        className="block bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col items-center justify-between min-h-[280px]"
      >
        {/* Image */}
        {pokemon.image ? (
          <img
            src={pokemon.image}
            alt={pokemon.name}
            loading="lazy"
            className="w-24 h-24 object-contain mb-4"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mb-4 text-xs text-gray-500 rounded">
            No Image
          </div>
        )}

        {/* Name */}
        <h2 className="text-lg font-semibold capitalize text-gray-800 dark:text-white mb-2">
          {pokemon.name}
        </h2>

        {/* Types */}
        <div className="flex flex-wrap justify-center gap-2">
          {pokemon.types?.map((type) => (
            <span
              key={type}
              className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default PokemonCard;
