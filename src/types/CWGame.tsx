/** @file CWGame.tsx
 *  @brief Stateless representation of a Crossword game
 *
 *  @author Mike Brazier
 */

import { CWLang } from './CWLang';
import { CWLetter, CWWord, wordsAreEqual } from './CWWord';

/***************************************
 * Types
 ***************************************/

//for handling API responses
export interface CWRawGameData {
  source_language: string;
  word: string;
  character_grid: Array<Array<string>>;
  word_locations: Object;
  target_language: string;
}

export interface CWGameData {
  sourceLanguage: CWLang;
  sourceWord: string;
  characterGrid: Array<Array<string>>;
  targetLocations: Array<{ fullWord: string; word: CWWord }>;
  targetLanguage: CWLang;
}

export interface CWGameState {
  currentAnswerCorrect: boolean | undefined;
  selectedWord: CWWord;
  foundWords: Array<CWWord>;
}

export interface CWGame {
  state: CWGameState;
  gameData: CWGameData;
}

/***************************************
 * Functions
 ***************************************/

/**
 * CWRawGame data must be formatted to CWWord types
 *
 * Although it is assumed the received data is valid,
 * a simple check is done when creating the targetLocations
 * to validate that every target word has a pair of x,y coordinates
 * for each letter within it.
 *
 * @param      {CWRawGameData}  rawData  The raw data
 */
export function parseCWRawGameData(rawData: CWRawGameData) {
  let gameData: CWGameData;

  try {
    gameData = {
      sourceLanguage: rawData.source_language as CWLang,
      sourceWord: rawData.word,
      characterGrid: rawData.character_grid,
      targetLocations: Object.entries(rawData.word_locations).map(
        (value: [string, any]) => {
          let coordinateString = value[0];
          let word = value[1] as string;
          let coordChars = coordinateString.split(',');
          let wordLocations: CWWord = [];

          //assert there are even number of x-y coordinates
          if (coordChars.length % 2 !== 0) {
            throw new Error('invalid game data');
          }

          //add character & coordinates to wordLocations as CWWord
          let j = 0;
          for (let i = 0; i < word.length; ++i) {
            wordLocations.push({
              coord: {
                x: Number.parseInt(coordChars[j]),
                y: Number.parseInt(coordChars[j + 1])
              },
              c: word.charAt(i)
            });
            j += 2;
          }

          return { fullWord: word, word: wordLocations };
        }
      ),
      targetLanguage: rawData.target_language as CWLang
    };
  } catch (e) {
    throw e;
  }

  return gameData;
}

/**
 * Makes a cw game.
 *
 * Does NOT make clones of selectedWord or foundWords arguments.
 *
 * @param      {CWGameData}   data    The data
 * @param      {<type>}       ans     The current answer being correct
 * @param      {CWWord}       sW      The currently selectedWord
 * @param      {ArrayCWWord}  fW      The already foundWords
 * @return     {CWGame}       { description_of_the_return_value }
 */
export function makeCWGame(
  data: CWGameData,
  ans = undefined,
  sW?: CWWord,
  fW?: Array<CWWord>
): CWGame {
  return {
    state: {
      currentAnswerCorrect: ans,
      selectedWord: sW ? sW : new Array<CWLetter>(),
      foundWords: fW ? fW : new Array<CWWord>()
    },
    gameData: data
  };
}

/**
 * Adds a word found.  Modifies state
 *
 * @param      {CWGameState}  state   The state
 * @param      {CWWord}       word    The word
 */
function addWordFound(state: CWGameState, word: CWWord) {
  state.foundWords.push(word);
}

/**
 * Checks if a given word has been found within the state.foundWords
 *
 * @param      {CWGameState}  state   The state
 * @param      {CWWord}       word    The word
 */
export function wordAlreadyFound(state: CWGameState, word: CWWord) {
  return state.foundWords.some(foundWord => wordsAreEqual(foundWord, word));
}

export function newGameState() {
  return {
    foundWords: [],
    selectedWord: [],
    currentAnswerCorrect: undefined
  };
}

/**
 * Sets the selected word.  Modifies state.
 *
 * @param      {CWGameState}  state   The state
 * @param      {CWWord}       word    The word
 */
export function setSelectedWord(state: CWGameState, word: CWWord) {
  !wordAlreadyFound(state, word)
    ? (state.selectedWord = word)
    : (state.selectedWord = []);
  state.currentAnswerCorrect = undefined;
}

/**
 * Clears selected word.  Modifies state.
 *
 * @param      {CWGameState}  state   The state
 */
export function clearSelectedWord(state: CWGameState) {
  state.selectedWord = [];
  state.currentAnswerCorrect = undefined;
}

/**
 * Checks if the currently selected word in state is valid and not found.
 * Modifies state.
 *
 * @param      {CWGameData}   gameData  The game data
 * @param      {CWGameState}  state     The state
 */
export function checkSelectedWord(gameData: CWGameData, state: CWGameState) {
  //try to validate word in its current order
  let wordValid = wordIsValid(gameData, state.selectedWord);
  //reverse the order to see if the word was backwards
  if (!wordValid)
    wordValid = wordIsValid(gameData, state.selectedWord.reverse());

  //if the word is valid
  if (wordValid) {
    state.currentAnswerCorrect = true;
    addWordFound(state, state.selectedWord);
  }
  //word is invalid
  else {
    state.currentAnswerCorrect = false;
  }
}

/**
 * Checks if CWWord is valid within CWgameData.targetLocations
 * Does not modify any of its arguments.
 *
 * Used by checkSelectedWord, exported only for testing.
 * Not to be used.
 *
 * @param      {CWGameData}   gameData        The game data
 * @param      {CWWord}   searchWord  The search word
 * @return     {boolean}  { description_of_the_return_value }
 */
export function wordIsValid(gameData: CWGameData, searchWord: CWWord): boolean {
  //there are no valid words
  if (gameData.targetLocations.length < 1) return false;

  //for each valid word
  for (let i = 0; i < gameData.targetLocations.length; ++i) {
    let validWord = gameData.targetLocations[i].word;
    //return true if they are equal
    if (wordsAreEqual(searchWord, validWord)) return true;
  }

  //if not found, return false
  return false;
}

/**
 * Gets the words remaining.  Does not modify state.
 *
 * @param      {CWGameData}   gameData  The game data
 * @param      {CWGameState}  state     The state
 */
export function getWordsRemaining(gameData: CWGameData, state: CWGameState) {
  return gameData.targetLocations.length - state.foundWords.length;
}

/**
 * Returns a number 0 through 100 representing the games progress.
 * Does not modify state.
 *
 * @param      {CWGameData}   gameData  The game data
 * @param      {CWGameState}  state     The state
 */
export function getProgress(gameData: CWGameData, state: CWGameState) {
  if (gameData.targetLocations.length === 0) return 100;
  return 100 * (state.foundWords.length / gameData.targetLocations.length);
}
