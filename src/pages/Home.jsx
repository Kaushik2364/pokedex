// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import FilterTags from '../components/FilterTags';
import PokemonCard from '../components/PokemonCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LIMIT = 20;

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const observerRef = useRef();

  const fetchPokemon = useCallback(async () => {
    setLoading(true);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`);
    const data = await res.json();

    const details = await Promise.all(
      data.results.map(async (p) => {
        const res = await fetch(p.url);
        const d = await res.json();

        return {
          name: d.name,
          image: d.sprites.other['official-artwork'].front_default,
          types: d.types.map((t) => t.type.name),
        };
      })
    );

    setPokemonList((prev) => {
      const existingNames = new Set(prev.map((p) => p.name));
      const uniqueNew = details.filter((p) => !existingNames.has(p.name));
      return [...prev, ...uniqueNew];
    });

    setLoading(false);
  }, [offset]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading]);

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const filtered = pokemonList.filter((p) => {
    if (!p || !p.name || !p.types || !Array.isArray(p.types)) return false;

    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || p.types.includes(typeFilter);

    return matchesSearch && matchesType;
  });

  const displayed = filtered.filter((p) =>
    showFavoritesOnly ? favorites.includes(p.name) : true
  );

  return (
    <div className="px-4 max-w-5xl mx-auto py-8">

      {/* 🔍 Search bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Pokémon..."
          className="w-full max-w-lg px-5 py-3 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ❤️ Favorites Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          {showFavoritesOnly ? 'Show All Pokémon' : 'Favorites ❤️'}
        </button>
      </div>

      {/* 🏷️ Filter tags */}
      <FilterTags typeFilter={typeFilter} setTypeFilter={setTypeFilter} />

      {/* 🧩 Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {displayed.map((p, index) => (
          <PokemonCard
            key={`${p.name}-${index}`}
            pokemon={p}
            isFavorite={favorites.includes(p.name)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* ⏳ Loading indicator */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading more Pokémon...</p>}
      <div ref={observerRef} className="h-8" />
    </div>
  );
}

export default Home;
