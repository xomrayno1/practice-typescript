import axios from 'axios';
import React, { ReactNode, useReducer } from 'react';
import { createContext } from 'react';
import { TopMovie, topMovieReducer, TopMovieState } from '../reducers/TopMovieReducer';
import { TopMovieActionType } from '../reducers/types';
import topMovieInfo from '../api/getTopMovies';

const topMovieDefault: TopMovieState = [];

interface TopMovieContextDefault {
  topMovies: TopMovie[];
  getTopMovies: () => Promise<void>;
  // toggleWatched: (imbdID: string) => void;
}

export const TopMovieContext = createContext<TopMovieContextDefault>({
  topMovies: topMovieDefault,
  getTopMovies: () => Promise.resolve(void 0),
  // toggleWatched: (imbdID: string) => {},
});

interface TopMovieContextProps {
  children: ReactNode;
}

const TopMovieContextProvider = ({ children }: TopMovieContextProps) => {
  const [topMovies, dispatch] = useReducer(topMovieReducer, topMovieDefault);

  const getTopMovies = async () => {
    const topMovies = await Promise.all(topMovieInfo);
    dispatch({
      type: TopMovieActionType.GET_TOP_MOVIES,
      payload: topMovies.map((item) => ({ ...(item.data as TopMovie), Watched: false })),
    });
  };

  //toggle watched
  // const toggleWatched = (imbdID: string) =>
  //   dispatch({ type: TopMovieActionType.TOGGLE_TOP_MOVIE_WATCHED, payload: imbdID });

  const topMovieContextData = {
    topMovies,
    getTopMovies,
    // toggleWatched,
  };

  return (
    <TopMovieContext.Provider value={topMovieContextData}>{children}</TopMovieContext.Provider>
  );
};

export default TopMovieContextProvider;
