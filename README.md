# Pokédex Explorer

A modern, responsive Pokédex application built with React and Tailwind CSS, using data from the [PokeAPI](https://pokeapi.co/). Browse, search, and explore Pokémon with rich detail views, theme switching, and localStorage-powered favourites.

## 🚀 Live Demo
[🔗 Click here to view the live app](https://pokedex-seven-gules-87.vercel.app/)

## ✨ Features

- 🔍 Pokémon List View with search & filter by type
- 📄 Detail View with stats, types, abilities, and evolution chain
- 💖 Add/remove favourites (persisted via localStorage)
- 🌗 Dark / Light theme toggle
- ♻️ Infinite scroll or pagination


## 🛠️ Technologies Used

- [React 18+](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PokeAPI](https://pokeapi.co/)
- Context API (for theme handling)
- Custom React Hooks
- Local Storage API
- Lazy loading
- Error boundaries

## 🏗️ Project Structure

src
components
   - ErrorBOundary.jsx
   - FilterTags.jsx
   - Header.jsx
   - PokemonCard.jsx
   - SearchBar.jsx
context
   - ThemeContext.jsx
hooks
   - useLocalStorage.js
pages
   - DetailPage.jsx
   - Favorites.jsx
   - Home.jsx
App.css
App.jsx
index.css
main.jsx
index.html
tailwind.config.js
postcss.config.js
README.md