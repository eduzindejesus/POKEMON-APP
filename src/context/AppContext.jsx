import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPokemonByName = async (name) => {
    if (!name) {
      setError(null);
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      const data = await response.json();
      setPokemons([{
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
      }]);
      setError(null);
    } catch (error) {
      setError('Pokémon não encontrado. Tente novamente.');
    }
  };

  const fetchMorePokemons = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${nextPage * 9}&limit=9`);
    const data = await response.json();
    
    const newPokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonDetailsResponse = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsResponse.json();
        return {
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          image: pokemonDetails.sprites.front_default,
        };
      })
    );

    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
  };

  return (
    <AppContext.Provider
      value={{
        pokemons,
        error,
        fetchPokemonByName,
        fetchMorePokemons,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
