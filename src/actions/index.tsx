import {
  ActionTypes,
  WORD_SELECTION,
  CHECK_SELECTION,
  CONTINUE_GAME,
  GAME_RESET
} from '../constants/ActionTypes';

import Coords from './../types/Coords';

export function selectWord(coords: Array<Coords>): ActionTypes {
  return {
    type: WORD_SELECTION,
    payload: coords
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
