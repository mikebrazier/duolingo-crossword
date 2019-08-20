import Coords from './Coords';
import { CWLetter } from './CWWord';

export class CharacterGrid {
  grid: Array<Array<CWLetter>>;
  constructor(cg: Array<Array<string>>) {
    this.grid = new Array<Array<CWLetter>>();
    let index = 0;
    for (let i = 0; i < cg.length; ++i) {
      this.grid.push([]);
      for (let j = 0; j < cg[i].length; ++j) {
        this.grid[i].push({
          c: cg[i][j],
          coord: { x: j, y: i }
        });
        ++index;
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
