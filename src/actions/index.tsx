import {
  ActionTypes,
  WORD_SELECTION,
  CHECK_SELECTION,
  CONTINUE_GAME,
  GAME_RESET
} from '../constants/ActionTypes';
import { CWWord } from './../types/CWWord';

export function selectWord(word: CWWord): ActionTypes {
  return {
    type: WORD_SELECTION,
    payload: word
  };
}

export function checkSelection(): ActionTypes {
  return {
    type: CHECK_SELECTION
  };
}

export function continueGame(): ActionTypes {
  return {
    type: CONTINUE_GAME
  };
}

export function resetGame(): ActionTypes {
  return {
    type: GAME_RESET
  };
}
