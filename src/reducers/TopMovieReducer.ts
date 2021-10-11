import { TopMovieActionType } from './types';

export interface TopMovie {
  imdbID: string;
  Title: string;
  Watched: boolean;
}

export type TopMovieState = TopMovie[];

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

interface GetTopMoviesAction {
  type: typeof GET_TOP_MOVIES;
  payload: TopMovie[];
}

interface ToggleTopMovieWatchedAction {
  type: typeof TOGGLE_TOP_MOVIE_WATCHED;
  payload: string
}

type TopMovieAction = GetTopMoviesAction | ToggleTopMovieWatchedAction;
// |
//   {
//     type: typeof GET_TOP_MOVIES; // TopMovieActionType
//     payload: TopMovie[];
//   };
// // | {
// //     type: typeof TOGGLE_TOP_MOVIE_WATCHED; // TopMovieActionType
// //     payload: string;
// //   };

const topMovieReducer = (state: TopMovieState, action: TopMovieAction) => {
  //cái action là cho phép payload TopMovie[] hoặc string
  //nhưng cái output chỉ là TopMovie[] nếu mà sẽ dụng payload như này const { type, payload } = action;
  //trình biên dịch hiểu lầm cái #1 trả về string ? (ko bik đúng sai nữa =)))
  //const { type, payload } = action;
  switch (action.type) {
    case GET_TOP_MOVIES:
      return action.payload; //#1 // nếu để string nó sẽ báo là phải return về 1 TopMovieState
    case TOGGLE_TOP_MOVIE_WATCHED:
      return state.map((topMovie) =>
        topMovie.imdbID === action.payload ? { ...topMovie, Watched: !topMovie.Watched } : { ...topMovie }
      );
    //return []
    default:
      return state;
  }
};

export default topMovieReducer;
