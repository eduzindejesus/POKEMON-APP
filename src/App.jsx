import React, { useState } from "react";
import { Typography, AppBar, Toolbar, Container, Box, Paper, TextField, Grid, Card, CardContent, CardMedia, Button, Alert } from "@mui/material";
import { purple, yellow } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import "@fontsource/press-start-2p";
import "@fontsource/roboto";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null); 

  const fetchPokemonByName = async (name) => {
    if (!name) {
      setError(null);
      setPokemon(null);
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      const data = await response.json();
      setPokemon({
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
      });
      setPokemons([{
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
      }]);
      setError(null); // Limpar erro em caso de sucesso
    } catch (error) {
      setError("Pokémon não encontrado. Tente novamente.");
    }
  };

  // Função para buscar mais Pokémons
  const fetchMorePokemons = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    
    // Buscando a lista de Pokémons com offset e limit
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${nextPage * 9}&limit=9`);
    const data = await response.json();
    
    // Buscando detalhes de cada Pokémon (nome, imagem, altura, peso)
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
    <Container maxWidth="lg">
      {/* Cabeçalho */}
      <AppBar position="static" sx={{ backgroundColor: purple[500], boxShadow: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif' }}>
            Poké Pesquisa
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Título e Barra de Pesquisa */}
      <Box mt={4} textAlign="center">
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: "'Press Start 2P', cursive", 
            color: yellow[500], 
            textAlign: "center", 
            fontSize: '2rem', 
            marginBottom: 3 
          }}
        >
          Busque pelo Pokémon
        </Typography>

        <TextField
          label="Nome do Pokémon"
          variant="outlined"
          fullWidth
          onChange={(e) => fetchPokemonByName(e.target.value.toLowerCase())}
          sx={{ marginTop: 2, maxWidth: 400, marginBottom: 4, borderRadius: 2, boxShadow: 2 }}
        />

        {/* Exibição de erro */}
        {error && (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Cards de Pokémons */}
      <Box mt={4}>
        <Grid container spacing={3}>
          {pokemons
            .sort((a, b) => a.name.localeCompare(b.name)) 
            .map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
                <Card 
                  sx={{ 
                    backgroundColor: alpha(purple[500], 0.1), 
                    borderRadius: 2, 
                    boxShadow: 3, 
                    transition: 'transform 0.3s', 
                    '&:hover': { 
                      transform: 'scale(1.05)', 
                      boxShadow: 5 
                    },
                    height: '450px' 
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"  
                    image={pokemon.image}
                    alt={pokemon.name}
                  />
                  <CardContent sx={{ textAlign: 'center', overflow: 'hidden' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                      {pokemon.name}
                    </Typography>
                    <Typography>Altura: {pokemon.height} m</Typography>
                    <Typography>Peso: {pokemon.weight} kg</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Botão "Ver Mais" */}
      <Box mt={4} textAlign="center">
        <Button 
          variant="contained" 
          sx={{ backgroundColor: purple[700], '&:hover': { backgroundColor: purple[800] } }} 
          onClick={fetchMorePokemons}
        >
          Ver Mais
        </Button>
      </Box>
    </Container>
  );
}

export default App;
