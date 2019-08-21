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
  GAME_RESET,
  RECEIVE_GAME_DATA,
  LOAD_APP_STATE
} from './../constants/ActionTypes';
import { AppState, initialState } from './../types/AppState';
import { saveState, loadState } from './../types/LocalStorage';

function saveAppState(appState: AppState) {
  let newAppState: AppState = cloneDeep(appState);

  newAppState.games.forEach(game => {
    let newState: CWGame.CWGameState = CWGame.newGameState();
    newState.foundWords = game.state.foundWords;
  });

  let result = saveState(newAppState);
}

export function CWAppReducer(
  state = initialState,
  action: ActionTypes
): AppState {
  switch (action.type) {
    case WORD_SELECTION: {
      let newGameState = cloneDeep(state.games[state.gameIndex].state);
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
      let newGameState = cloneDeep(state.games[state.gameIndex].state);
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
      let newGameState = cloneDeep(state.games[state.gameIndex].state);
      //always clear the selected word on continue
      CWGame.clearSelectedWord(newGameState);
      //advance to next game if all words found
      let newGameIndex = state.gameIndex;
      if (
        CWGame.getWordsRemaining(
          state.games[state.gameIndex].gameData,
          state.games[state.gameIndex].state
        ) == 0
      ) {
        //if not last game, increment index
        if (state.gameIndex != state.games.length - 1) {
          ++newGameIndex;
        }
      }
      //define the new app state
      let newAppState: AppState = {
        games: [
          ...state.games.slice(0, state.gameIndex),
          {
            state: newGameState,
            gameData: state.games[state.gameIndex].gameData
          },
          ...state.games.slice(state.gameIndex + 1)
        ],
        gameIndex: newGameIndex
      };
      //save to local storage
      saveAppState(newAppState);

      return newAppState;
    }
    //on reset
    case GAME_RESET: {
      //deep copy all the games
      let newGames = cloneDeep(state.games);
      //clear the state for each game
      newGames.forEach(game => (game.state = CWGame.newGameState()));
      //create new app state with updates games array
      let newAppState: AppState = {
        games: newGames,
        gameIndex: 0
      };
      //save to local storage
      saveAppState(newAppState);
      //return
      return newAppState;
    }
    case RECEIVE_GAME_DATA: {
      return {
        games: action.payload.map(gD => {
          return CWGame.makeCWGame(gD);
        }),
        gameIndex: 0
      };
    }
    case LOAD_APP_STATE: {
      return action.payload;
    }
    default:
      return state;
  }
}
