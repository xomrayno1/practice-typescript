import { TopMovieActionType } from './types';

export interface TopMovie {
  imdbID: string;
  Title: string;
  Watched: boolean;
}

export type TopMovieState = TopMovie[];

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

type TopMovieAction =
  // |
   {
      type: typeof GET_TOP_MOVIES; // TopMovieActionType
      payload: TopMovie[];
    }
  // | {
  //     type: typeof TOGGLE_TOP_MOVIE_WATCHED; // TopMovieActionType
  //     payload: string;
  //   };

export const topMovieReducer = (state: TopMovieState, action: TopMovieAction) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TOP_MOVIES:
      return payload;
    // case TOGGLE_TOP_MOVIE_WATCHED:
    //   return state.map((topMovie) =>
    //     topMovie.imdbID === payload ? { ...topMovie, Watched: !topMovie.Watched } : { ...topMovie }
    //   );
    default:
      return state;
  }
};
