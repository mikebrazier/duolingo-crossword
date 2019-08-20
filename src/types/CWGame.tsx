import { EN_LANG, ES_LANG, CWLang } from './CWLang';
import { CWLetter, CWWord, wordsAreEqual } from './CWWord';

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
  characterGrid: Array<Array<String>>;
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
          if (coordChars.length % 2 != 0) {
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

function addWordFound(state: CWGameState, word: CWWord) {
  state.foundWords.push(word);
}

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

export function setSelectedWord(state: CWGameState, word: CWWord) {
  !wordAlreadyFound(state, word)
    ? (state.selectedWord = word)
    : (state.selectedWord = []);
  state.currentAnswerCorrect = undefined;
}

export function clearSelectedWord(state: CWGameState) {
  state.selectedWord = [];
  state.currentAnswerCorrect = undefined;
}

export function checkSelectedWord(gameData: CWGameData, state: CWGameState) {
  //if the word is valid
  if (wordIsValid(gameData, state.selectedWord)) {
    //but has already been found
    if (
      state.foundWords.some(foundWord =>
        wordsAreEqual(foundWord, state.selectedWord)
      )
    ) {
      //set the current answer correct as undefined
      state.currentAnswerCorrect = undefined;
    }
    //if the word has not yet been found
    else {
      state.currentAnswerCorrect = true;
      addWordFound(state, state.selectedWord);
    }
  }
  //word is invalid
  else {
    state.currentAnswerCorrect = false;
  }

  state.selectedWord = []; //clear current selection
}

/**
 * Checks if CWWord is valid within CWgameData.targetLocations
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

export function getWordsRemaining(gameData: CWGameData, state: CWGameState) {
  return gameData.targetLocations.length - state.foundWords.length;
}

export function getProgress(gameData: CWGameData, state: CWGameState) {
  if (gameData.targetLocations.length === 0) return 100;
  return 100 * (state.foundWords.length / gameData.targetLocations.length);
}
