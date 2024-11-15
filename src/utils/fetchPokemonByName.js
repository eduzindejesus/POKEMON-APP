export const fetchPokemonByName = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error('Pokémon not found');
    }
    return await response.json();
  };