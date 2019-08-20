import {
  CWGame,
  parseCWRawGameData,
  makeCWGame,
  newGameState
} from './../types/CWGame';
import defaultGamesArray from './../constants/CWDefaultGameData';
import { parseResponse } from './../api/duolingoCWAPI';

export interface AppState {
  games: Array<CWGame>;
  gameIndex: number;
}

export const initialState: AppState = {
  games: defaultGamesArray,
  gameIndex: 0
};
