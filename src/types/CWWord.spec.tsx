import { wordsAreEqual, CWWord } from './CWWord';
import { cloneDeep } from 'lodash';

const CWGameValidWord1: CWWord = [
  { coord: { x: 2, y: 2 }, c: 'c' },
  { coord: { x: 3, y: 2 }, c: 'h' },
  { coord: { x: 4, y: 2 }, c: 'i' },
  { coord: { x: 5, y: 2 }, c: 'c' },
  { coord: { x: 6, y: 2 }, c: 'a' }
];

describe('wordsAreEqual', () => {
  it('should return true when words are equal', () => {
    expect(wordsAreEqual(CWGameValidWord1, CWGameValidWord1)).toBeTruthy();
  });

  it('should return false when words are unequal', () => {
    let copy = cloneDeep(CWGameValidWord1);
    copy.push(copy[0]);
    expect(wordsAreEqual(copy, CWGameValidWord1)).toBeFalsy();
  });
});
