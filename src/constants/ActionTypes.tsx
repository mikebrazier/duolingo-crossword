import { CWWord } from './../types/CWWord';
import { CWGameData } from './../types/CWGame';
import { AppState } from './../types/AppState';
export const WORD_SELECTION = 'WORD_SELECTION';
export const CHECK_SELECTION = 'CHECK_SELECTION';
export const CONTINUE_GAME = 'CONTINUE_GAME';
export const GAME_RESET = 'GAME_RESET';
export const RECEIVE_GAME_DATA = 'RECEIVE_GAME_DATA';
export const LOAD_APP_STATE = 'LOAD_APP_STATE';

export interface WordSelectionAction {
  type: typeof WORD_SELECTION;
  payload: CWWord;
}

export interface CheckSelectionAction {
  type: typeof CHECK_SELECTION;
}

export interface ContinueAction {
  type: typeof CONTINUE_GAME;
}

export interface GameResetAction {
  type: typeof GAME_RESET;
}

export interface ReceiveGameDataAction {
  type: typeof RECEIVE_GAME_DATA;
  payload: Array<CWGameData>;
}

export interface LoadAppStateAction {
  type: typeof LOAD_APP_STATE;
  payload: AppState;
}

export type ActionTypes =
  | WordSelectionAction
  | CheckSelectionAction
  | ContinueAction
  | GameResetAction
  | ReceiveGameDataAction
  | LoadAppStateAction;
