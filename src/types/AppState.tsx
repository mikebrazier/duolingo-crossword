import {
  CWGame,
  parseCWRawGameData,
  makeCWGame,
  newGameState
} from './../types/CWGame';

export interface AppState {
  games: Array<CWGame>;
  gameIndex: number;
}

export const emptyAppState: AppState = {
  gameIndex: 0,
  games: []
};

export const initialState = emptyAppState;
