export interface Coords {
  x: number;
  y: number;
}

export function coordsEqual(a: Coords, b: Coords) {
  return a.x === b.x && a.y === b.y;
}

export default Coords;
