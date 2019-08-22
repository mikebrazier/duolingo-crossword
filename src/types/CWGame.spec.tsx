import * as CWGame from './CWGame';
import { CWWord, wordsAreEqual } from './CWWord';
import { cloneDeep } from 'lodash';

const rawGameData: CWGame.CWRawGameData = {
  source_language: 'en',
  word: 'girl',
  character_grid: [
    ['o', 's', 'ó', 'x', 'h', 'ñ', 'h'],
    ['ü', 'r', 'g', 'o', 'l', 'ú', 'b'],
    ['a', 't', 'c', 'h', 'i', 'c', 'a'],
    ['u', 'ú', 'r', 'w', 'á', 't', 'é'],
    ['p', 'n', 'v', 'r', 'q', 'm', 'l'],
    ['f', 'd', 't', 'e', 'a', 'ó', 'l'],
    ['u', 't', 'n', 'i', 'ñ', 'a', 's']
  ],
  word_locations: {
    '2,2,3,2,4,2,5,2,6,2': 'chica',
    '2,6,3,6,4,6,5,6': 'niña'
  },
  target_language: 'es'
};
const CWGameValidWord1: CWWord = [
  { coord: { x: 2, y: 2 }, c: 'c' },
  { coord: { x: 3, y: 2 }, c: 'h' },
  { coord: { x: 4, y: 2 }, c: 'i' },
  { coord: { x: 5, y: 2 }, c: 'c' },
  { coord: { x: 6, y: 2 }, c: 'a' }
];

const CWGameValidWord2: CWWord = [
  { coord: { x: 2, y: 6 }, c: 'n' },
  { coord: { x: 3, y: 6 }, c: 'i' },
  { coord: { x: 4, y: 6 }, c: 'ñ' },
  { coord: { x: 5, y: 6 }, c: 'a' }
];
let TestGameData = CWGame.parseCWRawGameData(rawGameData);
let TestGame = CWGame.makeCWGame(TestGameData);

beforeEach(() => {
  TestGame.state = CWGame.newGameState();
});

describe('parseCWRawGameData', () => {
  it('should throw error on ill-formatted data', () => {
    let badData: any = cloneDeep(rawGameData);
    badData.word_locations['1'] = 'coordinatesMustBeTwoDimensional';
    let badGameData: CWGame.CWRawGameData = badData;
    let makeBadGame = () => {
      CWGame.parseCWRawGameData(badGameData);
    };
    expect(makeBadGame).toThrow('invalid game data');
  });

  it('should not throw error on not ill-formatted data', () => {
    let makeGoodGame = () => {
      CWGame.parseCWRawGameData(rawGameData);
    };
    expect(makeGoodGame).not.toThrow('invalid game data');
  });
});

describe('wordIsValid', () => {
  it('should return false when no valid words', () => {
    let noValidWords: CWGame.CWRawGameData = cloneDeep(rawGameData);
    noValidWords.word_locations = [];
    let noValidWordsGame = CWGame.makeCWGame(
      CWGame.parseCWRawGameData(noValidWords)
    );
    expect(
      CWGame.wordIsValid(noValidWordsGame.gameData, CWGameValidWord1)
    ).toBeFalsy();
  });

  it('should return false when words are not same length', () => {
    let duplicateCoords: CWWord = cloneDeep(CWGameValidWord1);
    duplicateCoords.push(duplicateCoords[0]);
    expect(CWGame.wordIsValid(TestGame.gameData, duplicateCoords)).toBeFalsy();
  });

  it('should return true when word is valid', () => {
    expect(
      CWGame.wordIsValid(TestGame.gameData, CWGameValidWord1)
    ).toBeTruthy();
  });
});

describe('CWGame', () => {
  it('should set selected word', () => {
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    expect(TestGame.state.selectedWord).toEqual(CWGameValidWord1);
  });

  it('should set currentAnswerCorrect on valid word', () => {
    expect(TestGame.state.foundWords.length).toBeFalsy();
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    expect(TestGame.state.currentAnswerCorrect).toBeTruthy();
  });

  it('should set currentAnswerCorrect on reversed word', () => {
    expect(TestGame.state.foundWords.length).toBeFalsy();
    CWGame.setSelectedWord(
      TestGame.state,
      cloneDeep(CWGameValidWord1).reverse()
    );
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    expect(TestGame.state.currentAnswerCorrect).toBeTruthy();
  });

  it('should update found words on valid word', () => {
    expect(TestGame.state.foundWords.length).toBeFalsy();
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    expect(TestGame.state.currentAnswerCorrect).toBeTruthy();
    expect(
      wordsAreEqual(CWGameValidWord1, TestGame.state.foundWords[0])
    ).toBeTruthy();
  });

  it('should set incorrect on invalid word', () => {
    expect(TestGame.state.foundWords.length).toBeFalsy();
    let invalidWord = cloneDeep(CWGameValidWord1);
    invalidWord.pop();
    CWGame.setSelectedWord(TestGame.state, invalidWord);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state);
    expect(TestGame.state.currentAnswerCorrect).toBeFalsy();
    expect(TestGame.state.foundWords.length == 0).toBeTruthy();
  });

  it('should not set selected word if already found', () => {
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    expect(TestGame.state.currentAnswerCorrect == undefined).toBeTruthy();
    expect(TestGame.state.foundWords.length == 1).toBeTruthy();
  });

  it('should have no words remaining on found', () => {
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord2);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    expect(
      CWGame.getWordsRemaining(TestGame.gameData, TestGame.state) == 0
    ).toBeTruthy();
  });

  it('should reset to initial TestGame state', () => {
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord1);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    CWGame.setSelectedWord(TestGame.state, CWGameValidWord2);
    CWGame.checkSelectedWord(TestGame.gameData, TestGame.state); //word now found
    TestGame.state = CWGame.newGameState();
    expect(TestGame.state.selectedWord.length == 0).toBeTruthy();
    expect(TestGame.state.currentAnswerCorrect == undefined).toBeTruthy();
    expect(TestGame.state.foundWords.length == 0).toBeTruthy();
  });
});
