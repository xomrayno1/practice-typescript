import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Chip, PropTypes } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MovieContext } from '../contexts/MovieContext';
import { ThemeContext } from '../contexts/ThemeContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieInput: {
      marginRight: '5px',
    },
    movieChip: {
      fontSize: '2rem',
      padding: '30px 10px',
      margin: '5px',
    },
  })
);
const Movies = () => {
  //styles
  const classes = useStyles();

  //state
  const [movie, setMovie] = useState('');

  //context
  const { theme } = useContext(ThemeContext);
  const chipTheme = theme as Exclude<PropTypes.Color, 'inherit'>;
  const { movies, addMovies, deleteMovies } = useContext(MovieContext);

  const onMovieInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(event.target.value as string);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" my={5}>
        <TextField
          label="Your favourite movie..."
          variant="outlined"
          className={classes.movieInput}
          onChange={onMovieInputChange}
          value={movie}
        />
        <Button
          color="primary"
          onClick={() => {
            addMovies(movie);
            setMovie('');
          }}
          variant="contained"
        >
          Add
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap" my={5}>
        {movies.map((movie) => (
          <Chip
            key={movie.id}
            label={movie.title}
            clickable
            color={chipTheme}
            className={classes.movieChip}
            onDelete={deleteMovies.bind(this, movie.id)}
            //onDelete={() => deleteMovies(movie.id) }
          />
        ))}
      </Box>
    </>
  );
};

export default Movies;
