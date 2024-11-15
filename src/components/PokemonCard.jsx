import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function PokemonCard({ pokemon }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {pokemon.types.map(type => type.type.name).join(', ')}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
