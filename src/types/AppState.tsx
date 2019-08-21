/** @file AppState.tsx
 *  @brief Type definition for Application state
 *
 *  @author Mike Brazier
 */

import { CWGame, getWordsRemaining } from './../types/CWGame';

/***************************************
 * Types
 ***************************************/

export interface AppState {
  games: Array<CWGame>;
  gameIndex: number;
}

/***************************************
 * Constants
 ***************************************/
export const emptyAppState: AppState = {
  gameIndex: 0,
  games: []
};

/***************************************
 * Functions
 ***************************************/

/**
 * Returns if the last game is complete.  This can
 * be used to check if the app is complete.
 *
 * Does NOT check if all game states within games array
 * have no remaining words to find.  Rather, it simply
 * checks if the app is on its last games, and that
 * game has no words remaining.
 *
 * Using this to evaluate app complete assumes that
 * the app must be progressed through linearly, where
 * users must complete the current challenge before
 * accessining the next challenge.  Thus being on the last
 * game implies that all previous games have been solved.
 *
 * @param      {AppState}  state   The state
 */
export function appLastGameComplete(state: AppState) {
  let complete: boolean = false;

  //assert that the app has loaded games
  if (state.games.length > 0) {
    //state is on last game, and it has no words remaining
    state.gameIndex === state.games.length - 1 &&
    !getWordsRemaining(
      state.games[state.gameIndex].gameData,
      state.games[state.gameIndex].state
    )
      ? (complete = true)
      : (complete = false);
  }

  return complete;
}

export const initialState = emptyAppState;
