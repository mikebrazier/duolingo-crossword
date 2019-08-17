import { CWGame, CWRawGameData } from './CWGame';
import { CWWord, wordsAreEqual } from './CWWord';
import { cloneDeep } from 'lodash';

const rawGameData: CWRawGameData = {
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

const TestGame = CWGame.fromCWRawGameData(rawGameData);

describe('CWGame', () => {
  it('should throw error on ill-formatted data', () => {
    let badData: any = cloneDeep(rawGameData);
    badData.word_locations['1'] = 'coordinatesMustBeTwoDimensional';
    let badGameData: CWRawGameData = badData;
    let makeBadGame = () => {
      CWGame.fromCWRawGameData(badGameData);
    };
    expect(makeBadGame).toThrow('invalid game data');
  });

  it('should not throw error on not ill-formatted data', () => {
    let makeGoodGame = () => {
      CWGame.fromCWRawGameData(rawGameData);
    };
    expect(makeGoodGame).not.toThrow('invalid game data');
  });

  it('should return false when no valid words', () => {
    let noValidWords: CWRawGameData = cloneDeep(rawGameData);
    noValidWords.word_locations = [];
    let noValidWordsGame = CWGame.fromCWRawGameData(noValidWords);
    expect(noValidWordsGame.wordIsValid(CWGameValidWord1)).toBeFalsy();
  });

  it('should return false when words are not same length', () => {
    let duplicateCoords: CWWord = cloneDeep(CWGameValidWord1);
    duplicateCoords.push(duplicateCoords[0]);
    expect(TestGame.wordIsValid(duplicateCoords)).toBeFalsy();
  });

  it('should return true when word is valid', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    expect(game.wordIsValid(CWGameValidWord1)).toBeTruthy();
  });

  it('should set selected word', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    game.setSelectedWord(CWGameValidWord1);
    expect(game.getSelectedWord()).toEqual(CWGameValidWord1);
  });

  it('should update found words on valid word', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    expect(game.getWordsFound().length).toBeFalsy();
    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found
    expect(game.getCheckedWordCorrect()).toBeTruthy();
    expect(
      wordsAreEqual(CWGameValidWord1, game.getWordsFound()[0])
    ).toBeTruthy();
  });

  it('should set incorrect on invalid word', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    expect(game.getWordsFound().length).toBeFalsy();
    let invalidWord = cloneDeep(CWGameValidWord1);
    invalidWord.pop();
    game.setSelectedWord(invalidWord);
    game.checkSelectedWord();
    expect(game.getCheckedWordCorrect()).toBeFalsy();
    expect(game.getWordsFound().length == 0).toBeTruthy();
  });

  it('should not set selected word if already found', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found
    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found
    expect(game.getCheckedWordCorrect() == undefined).toBeTruthy();
    expect(game.getWordsFound().length == 1).toBeTruthy();
  });

  it('should have no words remaining on found', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found
    game.setSelectedWord(CWGameValidWord2);
    game.checkSelectedWord(); //word now found
    expect(game.getWordsRemaining() == 0).toBeTruthy();
  });

  it('should reset to initial game state', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);
    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found
    game.setSelectedWord(CWGameValidWord2);
    game.checkSelectedWord(); //word now found
    game.resetGame();
    expect(game.getSelectedWord().length == 0).toBeTruthy();
    expect(game.getCheckedWordCorrect() == undefined).toBeTruthy();
    expect(game.getWordsFound().length == 0).toBeTruthy();
  });

  it('should clear selected word on check', () => {
    let game = CWGame.fromCWRawGameData(rawGameData);

    game.setSelectedWord(CWGameValidWord1);
    game.checkSelectedWord(); //word now found

    expect(game.getSelectedWord().length == 0).toBeTruthy();
  });
});
