import React, { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MovieContextProps {
  children: ReactNode;
}

interface Movie {
  id: number;
  title: string;
}

interface MovieContextDefault {
  movies: Movie[];
  addMovies: (title: string) => void;
  deleteMovies: (id: number) => void;
}

const movieContextDefaultData: MovieContextDefault = {
  movies: [
    { id: 1, title: 'The Conjuring (2013)' },
    { id: 2, title: 'The Godfather (1972)' },
  ],
  addMovies: (title: string) => {},
  deleteMovies: (id: number) => {},
};
export const MovieContext = createContext<MovieContextDefault>(movieContextDefaultData);

const MovieContextProvider = ({ children }: MovieContextProps) => {
  const [movies, setMovies] = useState<Movie[]>(movieContextDefaultData.movies);

  const nums: number[] = movies.map((item) => item.id);

  const addMovies = (title: string) => setMovies([...movies, { id: Math.max(...nums) + 1, title }]);

  const deleteMovies = (id: number) => setMovies(movies.filter((item) => item.id != id));

  const movieContextDynamicData = { movies, addMovies, deleteMovies };

  return <MovieContext.Provider value={movieContextDynamicData}>{children}</MovieContext.Provider>;
};

export default MovieContextProvider;
