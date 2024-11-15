import { useState } from "react";
import { Typography, AppBar, Toolbar, Container, Box, Grid, Paper, Button, TextField } from "@mui/material";
import { blue, pink, yellow, green, purple, red } from "@mui/material/colors";
import "@fontsource/press-start-2p"; 
import "@fontsource/roboto";           
function App() {
  const [pokemon, setPokemon] = useState(null);

  // Função para buscar o Pokémon
  const fetchPokemonByName = async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setPokemon(data);
  };

  return (
    <Container>
      <AppBar position="static" sx={{ backgroundColor: purple[500] }}>
        <Toolbar>
          <Typography variant="h6">Pokémon Search</Typography>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontFamily: "'Press Start 2P', cursive", color: yellow[500] }}>
                Search Your Pokémon
              </Typography>
              <TextField
                label="Pokémon Name"
                variant="outlined"
                fullWidth
                onChange={(e) => fetchPokemonByName(e.target.value)}
              />
              <Box mt={2}>
                {pokemon && (
                  <Box>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <Typography variant="h6">{pokemon.name}</Typography>
                    <Typography>Height: {pokemon.height} decimeters</Typography>
                    <Typography>Weight: {pokemon.weight} hectograms</Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
