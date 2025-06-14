// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Favorites() {
  const [favorites] = useLocalStorage('favorites', []);
  const [pokemonList, setPokemonList] = useState([]);

  const fetchFavoriteDetails = async () => {
    const detailed = await Promise.all(
      favorites.map(async (name) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        return {
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          types: data.types.map((t) => t.type.name),
        };
      })
    );
    setPokemonList(detailed);
  };

  const removeFromFavorites = (name) => {
    const updated = favorites.filter((n) => n !== name);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setPokemonList(pokemonList.filter((p) => p.name !== name));
  };

  useEffect(() => {
    if (favorites.length > 0) {
      fetchFavoriteDetails();
    } else {
      setPokemonList([]);
    }
  }, [favorites]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Favorite Pokémon</h2>
      {pokemonList.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center">
          {pokemonList.map((p) => (
            <PokemonCard
              key={p.name}
              pokemon={p}
              isFavorite={true}
              toggleFavorite={removeFromFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
