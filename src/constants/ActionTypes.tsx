import { CWWord } from './../types/CWWord';
export const WORD_SELECTION = 'WORD_SELECTION';
export const CHECK_SELECTION = 'CHECK_SELECTION';
export const CONTINUE_GAME = 'CONTINUE_GAME';
export const GAME_RESET = 'GAME_RESET';

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

export type ActionTypes =
  | WordSelectionAction
  | CheckSelectionAction
  | ContinueAction
  | GameResetAction;
