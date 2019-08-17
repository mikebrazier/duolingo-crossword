import { EN_LANG, ES_LANG, CWLang } from './CWLang';
import { CWWord, wordsAreEqual } from './CWWord';

//for handling API responses
export interface CWRawGameData {
  source_language: string;
  word: string;
  character_grid: Array<Array<string>>;
  word_locations: Object;
  target_language: string;
}

export function parseResponse(dataString: string): CWRawGameData {
  return JSON.parse(dataString);
}

export interface CWGameData {
  sourceLanguage: CWLang;
  sourceWord: string;
  characterGrid: Array<Array<String>>;
  targetLocations: Array<{ fullWord: string; word: CWWord }>;
  targetLanguage: CWLang;
}

/**
 * Class for cw game.
 *
 *	Represents a Cross Word game
 *
 *
 * @class      CWGame (name)
 */
export class CWGame {
  private currentAnswerCorrect: boolean | undefined; //indicates correctness of last checked answer
  private selectedWord: CWWord; //holds currently selected word

  constructor(
    readonly gameData: CWGameData,
    private foundWords: Array<CWWord>
  ) {
    this.selectedWord = [];
  }

  private addWordFound(word: CWWord) {
    this.foundWords.push(word);
  }

  private setCurrentAnswerCorrect(v: boolean | undefined) {
    this.currentAnswerCorrect = v;
  }

  public wordIsValid(searchWord: CWWord): boolean {
    //there are no valid words
    if (this.gameData.targetLocations.length < 1) return false;

    //for each valid word
    for (let i = 0; i < this.gameData.targetLocations.length; ++i) {
      let validWord = this.gameData.targetLocations[i].word;
      //return true if they are equal
      if (wordsAreEqual(searchWord, validWord)) return true;
    }

    //if not found, return false
    return false;
  }

  public setSelectedWord(word: CWWord) {
    this.selectedWord = word;
  }

  public getWordsFound() {
    return this.foundWords;
  }

  public getWordsRemaining() {
    return this.gameData.targetLocations.length - this.foundWords.length;
  }

  public getSelectedWord() {
    return this.selectedWord;
  }

  public checkSelectedWord() {
    //if the word is valid
    if (this.wordIsValid(this.selectedWord)) {
      //but has already been found
      if (
        this.foundWords.some(foundWord =>
          wordsAreEqual(foundWord, this.selectedWord)
        )
      ) {
        //set the current answer correct as undefined
        this.setCurrentAnswerCorrect(undefined);
      }
      //if the word has not yet been found
      else {
        this.setCurrentAnswerCorrect(true);
        this.addWordFound(this.selectedWord);
      }
    }
    //word is invalid
    else {
      this.setCurrentAnswerCorrect(false);
    }

    this.setSelectedWord([]); //clear current selection
  }

  public getCheckedWordCorrect() {
    return this.currentAnswerCorrect;
  }

  public resetGame() {
    this.setSelectedWord([]);
    this.foundWords = [];
    this.setCurrentAnswerCorrect(undefined);
  }

  static fromCWRawGameData(rawData: CWRawGameData) {
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

    return new CWGame(gameData, []);
  }
}
