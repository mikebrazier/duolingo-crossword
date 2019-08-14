import Coords from './Coords';

export interface CharacterGridPoint {
  character: string;
  coords: Coords;
  validated: boolean;
  selected: boolean;
  index: number;
}

export class CharacterGrid {
  grid: Array<Array<CharacterGridPoint>>;
  constructor(cg: Array<Array<string>>) {
    this.grid = new Array<Array<CharacterGridPoint>>();
    let index = 0;
    for (let i = 0; i < cg.length; ++i) {
      this.grid.push([]);
      for (let j = 0; j < cg[i].length; ++j) {
        this.grid[i].push({
          character: cg[i][j],
          coords: { x: j, y: i },
          validated: false,
          selected: false,
          index: index
        });
        ++index;
      }
    }
  }
}
