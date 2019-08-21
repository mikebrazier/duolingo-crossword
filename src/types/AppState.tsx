/** @file AppState.tsx
 *  @brief Type definition for Application state
 *
 *  @author Mike Brazier
 */

import { CWGame } from './../types/CWGame';

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

export const initialState = emptyAppState;
