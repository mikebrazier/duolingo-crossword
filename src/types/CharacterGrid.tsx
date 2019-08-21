/** @file CharacterGrid.tsx
 *  @brief Class for representing an array of rows, each being an array of CWLetters
 *
 *  @author Mike Brazier
 */

import Coords from './Coords';
import { CWLetter } from './CWWord';

export class CharacterGrid {
  grid: Array<Array<CWLetter>>;

  constructor(cg: Array<Array<string>>) {
    this.grid = new Array<Array<CWLetter>>();
    for (let i = 0; i < cg.length; ++i) {
      this.grid.push([]);
      for (let j = 0; j < cg[i].length; ++j) {
        this.grid[i].push({
          c: cg[i][j],
          coord: { x: j, y: i }
        });
      }
    }
  }

  getCWLetterFromGridPoint(coord: Coords): CWLetter | null {
    for (let i = 0; i < this.grid.length; ++i) {
      for (let j = 0; j < this.grid[i].length; ++j) {
        if (
          this.grid[i][j].coord.x === coord.x &&
          this.grid[i][j].coord.y === coord.y
        )
          return this.grid[i][j];
      }
    }

    return null;
  }
}
