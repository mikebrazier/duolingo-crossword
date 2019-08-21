/** @file CWDefaultGameData.tsx
 *  @brief Constant, default game data to be held in memory for initializing AppState
 *
 *  @author Mike Brazier
 */

import { CWRawGameData, parseCWRawGameData } from './../types/CWGame';

/***************************************
 * Constants
 ***************************************/

//array contains CWRawGameData, which is a type for the parsed JSON
//received from the Duolingo server
const defaultGamesDataArray: Array<CWRawGameData> = [
  {
    source_language: 'en',
    word: 'man',
    character_grid: [
      ['i', 'q', 'í', 'l', 'n', 'n', 'm', 'ó'],
      ['f', 't', 'v', 'ñ', 'b', 'm', 'h', 'a'],
      ['h', 'j', 'é', 't', 'e', 't', 'o', 'z'],
      ['x', 'á', 'o', 'i', 'e', 'ñ', 'm', 'é'],
      ['q', 'é', 'i', 'ó', 'q', 's', 'b', 's'],
      ['c', 'u', 'm', 'y', 'v', 'l', 'r', 'x'],
      ['ü', 'í', 'ó', 'm', 'o', 't', 'e', 'k'],
      ['a', 'g', 'r', 'n', 'n', 'ó', 's', 'm']
    ],
    word_locations: { '6,1,6,2,6,3,6,4,6,5,6,6': 'hombre' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'woman',
    character_grid: [
      ['v', 'á', 'q', 't', 'b', 'f', 'q'],
      ['y', 'x', 'i', 'a', 'ü', 'v', 'a'],
      ['r', 'd', 'y', 'í', 't', 'n', 'a'],
      ['f', 'v', 'ó', 'w', 'l', 'a', 'v'],
      ['b', 'u', 'ú', 'j', 'q', 'h', 'á'],
      ['c', 'o', 'm', 'u', 'j', 'e', 'r'],
      ['h', 'o', 'd', 'ú', 'w', 'd', 'ü']
    ],
    word_locations: { '2,5,3,5,4,5,5,5,6,5': 'mujer' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'boy',
    character_grid: [
      ['x', 'c', 'e', 'x', 'c', 'i', 'o'],
      ['e', 'z', 'q', 'r', 'h', 'w', 'y'],
      ['ñ', 'é', 'ñ', 'w', 'i', 'n', 'á'],
      ['o', 'l', 'a', 'á', 'c', 'i', 'n'],
      ['r', 'v', 'ñ', 's', 'o', 'ñ', 'w'],
      ['k', 'm', 'w', 'a', 'ü', 'o', 'w'],
      ['ó', 'r', 'ú', 'b', 'l', 'g', 'ú']
    ],
    word_locations: {
      '5,2,5,3,5,4,5,5': 'niño',
      '4,0,4,1,4,2,4,3,4,4': 'chico'
    },
    target_language: 'es'
  },
  {
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
  },
  {
    source_language: 'en',
    word: 'am',
    character_grid: [
      ['d', 'c', 'e', 'h', 'p'],
      ['f', 'e', 'ü', 'p', 't'],
      ['s', 's', 'ó', 'í', 'l'],
      ['o', 's', 'í', 'ñ', 'a'],
      ['y', 'g', 'i', 'o', 'n']
    ],
    word_locations: { '0,2,0,3,0,4': 'soy' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'she',
    character_grid: [
      ['z', 'n', 'w', 'f', 'm', 'é'],
      ['d', 'ó', 'q', 'w', 'n', 'e'],
      ['z', 'á', 'v', 'e', 'ó', 'l'],
      ['r', 'c', 'z', 'z', 'm', 'l'],
      ['ü', 'm', 'á', 'ü', 'n', 'a'],
      ['e', 'a', 'e', 'x', 'ñ', 'h']
    ],
    word_locations: { '5,1,5,2,5,3,5,4': 'ella' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'apple',
    character_grid: [
      ['ú', 'k', 'ü', 'b', 'í', 'n', 'z', 'd', 'o'],
      ['u', 'á', 'n', 'g', 'e', 'y', 'z', 'o', 'ñ'],
      ['o', 'é', 'ú', 'á', 'v', 'e', 'x', 'u', 'm'],
      ['c', 'w', 'd', 'z', 't', 'k', 'm', 'l', 'a'],
      ['u', 'b', 'o', 'w', 'í', 'a', 'u', 'q', 'n'],
      ['g', 's', 'm', 'e', 'c', 'n', 'k', 'ú', 'z'],
      ['a', 'o', 'v', 't', 'p', 'ú', 'é', 'k', 'a'],
      ['f', 'j', 'i', 'j', 'n', 'i', 'b', 'ó', 'n'],
      ['s', 'q', 'l', 'j', 'j', 'f', 'q', 'g', 'a']
    ],
    word_locations: { '8,2,8,3,8,4,8,5,8,6,8,7,8,8': 'manzana' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'eat',
    character_grid: [
      ['i', 'a', 'c', 'j', 'r', 'w'],
      ['k', 'b', 'n', 'o', 'u', 'v'],
      ['v', 'x', 'z', 'f', 'm', 'a'],
      ['u', 'l', 'o', 'p', 'e', 'o'],
      ['l', 'ú', 'é', 'q', 'j', 'e'],
      ['a', 'h', 'ú', 'l', 'k', 'w']
    ],
    word_locations: { '2,0,3,1,4,2,5,3': 'como' },
    target_language: 'es'
  },
  {
    source_language: 'en',
    word: 'bread',
    character_grid: [
      ['ü', 'á', 'p', 'a', 'n'],
      ['k', 'a', 'k', 'm', 'l'],
      ['a', 'x', 'q', 'e', 'h'],
      ['p', 's', 'a', 'j', 'í'],
      ['á', 'q', 'l', 'j', 'l']
    ],
    word_locations: { '2,0,3,0,4,0': 'pan' },
    target_language: 'es'
  }
];

//the Duolingo JSON format must be parsed into CWGameData type
const defaultGamesArray = defaultGamesDataArray.map(v => parseCWRawGameData(v));

export default defaultGamesArray;
