/** @file CWLetterBox.tsx
 *  @brief Presentational Component a letter within a crossword grid
 * *
 *  @author Mike Brazier
 */

import * as React from 'react';
import Coords from './../types/Coords';
import './CWLetterBox.css';

/***************************************
 * Properties & State
 ***************************************/

export interface CWLetterBoxProps {
  character: string;
  selected: boolean;
  validated: boolean;
  coords: Coords;
  onMouseDown: (coords: Coords) => void;
  onMouseEnter: (coords: Coords) => void;
}

/***************************************
 * Component
 ***************************************/

const CWLetterBox: React.FC<CWLetterBoxProps> = props => {
  return (
    <div
      className={`CWLetterBox ${props.selected ? 'selected' : ''}
        ${props.validated ? 'validated' : ''}`}
      onMouseDown={() => {
        props.onMouseDown(props.coords);
      }}
      onMouseEnter={() => {
        props.onMouseEnter(props.coords);
      }}
    >
      <div className="CWLetterBoxChar">
        <div>{props.character}</div>
      </div>
    </div>
  );
};

export default CWLetterBox;
