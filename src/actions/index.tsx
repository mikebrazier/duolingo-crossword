/** @file actions/index.tsx
 *  @brief Redux action creators for game actions
 *
 *  @author Mike Brazier
 */

import {
  ActionTypes,
  WORD_SELECTION,
  CHECK_SELECTION,
  CONTINUE_GAME,
  GAME_RESET,
  RECEIVE_GAME_DATA,
  LOAD_APP_STATE
} from '../constants/ActionTypes';
import { CWWord } from './../types/CWWord';
import { CWGameData } from './../types/CWGame';
import { AppState } from './../types/AppState';

/***************************************
 * Action Creators
 ***************************************/

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

export function receiveGameData(gD: Array<CWGameData>): ActionTypes {
  return {
    type: RECEIVE_GAME_DATA,
    payload: gD
  };
}

export function loadAppState(aS: AppState): ActionTypes {
  return {
    type: LOAD_APP_STATE,
    payload: aS
  };
}
