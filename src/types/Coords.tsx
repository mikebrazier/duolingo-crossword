/** @file Coords.tsx
 *  @brief Type for representing 2d x,y coordinates
 *
 *  @author Mike Brazier
 */

/***************************************
 * Types
 ***************************************/
export interface Coords {
  x: number;
  y: number;
}

/***************************************
 * Functions
 ***************************************/
export function coordsEqual(a: Coords, b: Coords) {
  return a.x === b.x && a.y === b.y;
}

export default Coords;
