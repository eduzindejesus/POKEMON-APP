export const fetchPokemonByName = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error('Pokemon not found');
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    };
  };