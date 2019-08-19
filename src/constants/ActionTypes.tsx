import Coords from './../types/Coords';

export const WORD_SELECTION = 'WORD_SELECTION';
export const CHECK_SELECTION = 'CHECK_SELECTION';
export const CONTINUE_GAME = 'CONTINUE_GAME';
export const GAME_RESET = 'GAME_RESET';

interface WordSelectionAction {
  type: typeof WORD_SELECTION;
  payload: Array<Coords>;
}

interface CheckSelectionAction {
  type: typeof CHECK_SELECTION;
}

interface ContinueAction {
  type: typeof CONTINUE_GAME;
}

interface GameResetAction {
  type: typeof GAME_RESET;
}

export type ActionTypes =
  | WordSelectionAction
  | CheckSelectionAction
  | ContinueAction
  | GameResetAction;
