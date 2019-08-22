/** @file CWWord.tsx
 *  @brief Types & Functions for representing crossword letters and words
 *
 *  @author Mike Brazier
 */
import { isEqual } from 'lodash';
import Coords from './Coords';

/***************************************
 * Types
 ***************************************/
//it is important to associate a letter
//with its grid coordinates, as incorrect views may otherwise map
//characters to incorrect coordinates
export type CWLetter = {
  coord: Coords;
  c: string;
};

//coordinates word type alias
export type CWWord = Array<CWLetter>;

/***************************************
 * Functions
 ***************************************/

/* unused 
function sortsByCoordsThenLetter(word: CWWord) {
  return word.sort((a: CWLetter, b: CWLetter) => {
    if (a.coord.x < b.coord.x) {
      return -1;
    } else if (a.coord.x > b.coord.x) {
      return 1;
    }
    if (a.coord.y < b.coord.y) {
      return -1;
    } else if (a.coord.y > b.coord.y) {
      return 1;
    } else {
      if (a.c[0] < b.c[0]) {
        return -1;
      } else if (a.c[0] > b.c[0]) {
        return 1;
      } else {
        return 0;
      }
    }
  });
}
*/

/**
 * Compares if words are equal, uses sortsByCoordsThenLetter
 *
 * @param      {CWWord}   wordA   The word a
 * @param      {CWWord}   wordB   The word b
 * @return     {boolean}  { description_of_the_return_value }
 */
export function wordsAreEqual(wordA: CWWord, wordB: CWWord): boolean {
  //words must be same length
  if (wordA.length !== wordB.length) return false;

  //for every CWLetter
  for (let i = 0; i < wordA.length; ++i) {
    if (!isEqual(wordA[i], wordB[i])) return false;
  }

  return true;
}
