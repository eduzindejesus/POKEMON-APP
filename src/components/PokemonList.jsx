import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, CircularProgress } from '@mui/material';

const PokemonList = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (!pokemons || pokemons.length === 0) {
    return <Typography variant="h6" align="center">No Pokémon found.</Typography>;
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      {pokemons.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              alt={pokemon.name}
              height="200"
              image={pokemon.image}
            />
            <CardContent>
              <Typography variant="h6">{pokemon.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                ID: {pokemon.id}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonList;
