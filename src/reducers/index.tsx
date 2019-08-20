import { createStore } from 'redux';
import { cloneDeep } from 'lodash';
import * as CWGame from './../types/CWGame';
import {
  selectWord,
  checkSelection,
  continueGame,
  resetGame
} from './../actions';
import {
  ActionTypes,
  WORD_SELECTION,
  CHECK_SELECTION,
  CONTINUE_GAME,
  GAME_RESET
} from './../constants/ActionTypes';
import { AppState, initialState } from './../types/AppState';

export function CWAppReducer(
  state = initialState,
  action: ActionTypes
): AppState {
  let newGameState = cloneDeep(state.games[state.gameIndex].state);
  switch (action.type) {
    case WORD_SELECTION: {
      CWGame.setSelectedWord(newGameState, action.payload);
      return {
        games: [
          ...state.games.slice(0, state.gameIndex),
          {
            state: newGameState,
            gameData: state.games[state.gameIndex].gameData
          },
          ...state.games.slice(state.gameIndex + 1)
        ],
        gameIndex: state.gameIndex
      };
    }
    case CHECK_SELECTION: {
      CWGame.checkSelectedWord(
        state.games[state.gameIndex].gameData,
        newGameState
      );
      return {
        games: [
          ...state.games.slice(0, state.gameIndex),
          {
            state: newGameState,
            gameData: state.games[state.gameIndex].gameData
          },
          ...state.games.slice(state.gameIndex + 1)
        ],
        gameIndex: state.gameIndex
      };
    }
    case CONTINUE_GAME: {
      //always clear the selected word on continue
      CWGame.clearSelectedWord(newGameState);

      //advance to next game once all words found
      let gameIndex = state.gameIndex;
      if (
        CWGame.getWordsRemaining(
          state.games[state.gameIndex].gameData,
          newGameState
        ) == 0
      ) {
        //if not last game
        if (state.gameIndex != state.games.length - 1) {
          ++gameIndex;
        }
      }
      return {
        games: [
          ...state.games.slice(0, state.gameIndex),
          {
            state: newGameState,
            gameData: state.games[state.gameIndex].gameData
          },
          ...state.games.slice(state.gameIndex + 1)
        ],
        gameIndex: gameIndex
      };
    }
    case GAME_RESET: {
      let newGames = cloneDeep(state.games);
      newGames.forEach(game => (game.state = CWGame.newGameState()));
      return {
        games: newGames,
        gameIndex: 0
      };
    }
    default:
      return state;
  }
}
