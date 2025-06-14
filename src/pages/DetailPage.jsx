// src/pages/DetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

function DetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState([]);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [error, setError] = useState(false);

  const isFavorite = favorites.includes(name);
  const toggleFavorite = () => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);

        const speciesRes = await fetch(data.species.url);
        const species = await speciesRes.json();

        const evoRes = await fetch(species.evolution_chain.url);
        const evoData = await evoRes.json();

        const chain = [];
        let current = evoData.chain;
        while (current) {
          chain.push(current.species.name);
          current = current.evolves_to?.[0];
        }

        setEvolution(chain);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
        setError(true);
      }
    };

    fetchData();
  }, [name]);

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        ❌ Failed to load Pokémon details.
        <br />
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return <p className="p-4 text-gray-500">Loading Pokémon details...</p>;
  }

  const { types, abilities, height, weight, stats, name: pokeName, sprites } = pokemon;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={sprites?.other?.['official-artwork']?.front_default || sprites?.front_default}
          alt={pokeName}
          className="w-52 h-52 object-contain drop-shadow-xl"
        />

        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold capitalize">{pokeName}</h2>
            <button onClick={toggleFavorite} className="text-2xl">
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Types:</h3>
            <div className="flex gap-2">
              {types.map((t) => (
                <span
                  key={t.type.name}
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize
                    ${t.type.name === 'grass' ? 'bg-green-200 text-green-800' :
                      t.type.name === 'poison' ? 'bg-purple-200 text-purple-800' :
                      t.type.name === 'fire' ? 'bg-red-200 text-red-800' :
                      t.type.name === 'water' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-300 text-gray-800'}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Abilities:</h3>
            <ul className="list-disc ml-6 text-sm text-gray-700 dark:text-gray-300">
              {abilities.map((a) => (
                <li key={a.ability.name}>{a.ability.name}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-10 text-sm">
            <div>
              <h3 className="font-semibold">Height:</h3>
              <p>{height}</p>
            </div>
            <div>
              <h3 className="font-semibold">Weight:</h3>
              <p>{weight}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Stats:</h3>
            <ul className="grid grid-cols-2 gap-x-6 text-sm">
              {stats.map((s) => (
                <li key={s.stat.name}>
                  <strong className="capitalize">{s.stat.name}</strong>: {s.base_stat}
                </li>
              ))}
            </ul>
          </div>

          {evolution.length > 0 && (
            <div>
              <h3 className="font-semibold mb-1">Evolution Chain:</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {evolution.join(' → ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
