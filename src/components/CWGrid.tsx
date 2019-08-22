/** @file CWGrid.tsx
 *  @brief Presentational Component for Crossword Grid
 *
 *  NOTE: Within render(){} each grid letter is determined to be "selected" or "found'
 *  by comparing the given letter against every letter within the current selection & found words arrays
 *  This alg. could be modified by creating a lookup table with a hash function which calculates
 *  a hash based off the CWLetter coordinates & character.  Prior to render, each letter within
 *  foundWords and currentlySelected could be hashed, and the lookup table could be updated accordingly.
 *  Additionally, updating the lookup table would only need to be done for each foundWord, once, and
 *  when the selectedWord array changed.  This would reduce the amount of times a letter would be determined
 *  to be found to only once.  Within render(), every CWLetter in the grid could then be hashed,
 *  and in constant time, determined to be "found" or selected".
 *
 *  CAVEAT: CWGrid is meant to be controlled.  In effect, retain as little state as possible.
 *  This makes switching in-and-out new prop values on the parent-side relatively trivial.
 *  This conversly increases the complexity of implementing the hash table method mentioned
 *  previously WITHIN the CWGrid component.  Consider the case where previously found words are removed
 *  from the foundWords props array, and are replaced with newly found words: CWGrid would have to retain
 *  an internal state for previously validated words, determine which words are no-longer validated,
 *  set each letter's validated property to false, and update the lookup table with the newly found words.
 *  This would also need to occur for each selected word.
 *
 *  Alternatively, the grid could be purely a presentational component, making no determinations
 *  as to what letters should be, or are, selected or validated.  In this way, the logic for determining
 *  selections/validations could be entirely managed by a parent component.
 *
 *  Ultimately, however, implementing such logic may carry more overhead in work than is worth
 *  the benefit in reduced render time.
 *
 *  Using React's profiler in Chrome on my Retina, 15-inch, Mid 2015 Macbook, CWGrid average about
 *  2-3ms to render the entire component, or ~333 fps.  This provided ample time for a smooth user-experience.
 *
 *  @author Mike Brazier
 */

import * as React from 'react';
import './CWGrid.css';
import CWLetterBox from './CWLetterBox';
import { Coords, coordsEqual } from './../types/Coords';
import { CWWord, CWLetter } from './../types/CWWord';
import { CharacterGrid } from './../types/CharacterGrid';

/***************************************
 * Helper Functions
 ***************************************/

/**
 * Gets a linear sequence between two numbers.
 * Will evaluate whichever argument is the greater/lesser
 * and return an arr of numbers between the two
 *
 * @param      {number}  start   The start
 * @param      {number}  finish  The finish
 */
function getLinearSequence(start: number, finish: number) {
  let arr: Array<number> = [];

  if (start === finish) {
    arr.push(start);
  } else {
    if (start > finish) {
      for (let i = start; i >= finish; --i) {
        arr.push(i);
      }
    } else {
      for (let i = start; i <= finish; ++i) {
        arr.push(i);
      }
    }
  }
  return arr;
}

/***************************************
 * Properties & State
 ***************************************/

export interface CWGridProps {
  onGridSelection: (word: CWWord) => void;
  onGridSelecting: (word: CWWord) => void;
  wordSelectEnabled: boolean;
  characterGrid: CharacterGrid;
  foundWords: Array<CWWord>;
  currentlySelected: CWWord;
}

interface CWGridState {
  selecting: boolean;
  startPoint: Coords;
  endPoint: Coords;
}

/***************************************
 * Component
 ***************************************/

class CWGrid extends React.Component<CWGridProps, CWGridState> {
  readonly state: CWGridState = {
    selecting: false,
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 }
  };

  /**
   * Given two coordinates, find an array of points containing the
   * line or diagonal between them.
   *
   * Given a Crossword only has valid words along diagonal or straight lines,
   * a user who has selected a start letter and is making their word selection
   * should only be shown, and allowed to select, valid words.
   *
   * If start & end do not form a straight or diagonal line, a new endpoint
   * will calculated that respects the direction and magnitude of endpoint in
   * relation to start.
   *
   * @param      {Coords}  start   The start
   * @param      {Coords}  end     The end
   */
  findSelectedPoints(start: Coords, end: Coords) {
    let arr: Array<Coords> = [];

    //same point
    if (end.x === start.x && end.y === start.y) {
      arr.push({ x: start.x, y: start.y });
    }
    //x-axis same
    else if (end.x === start.x) {
      let yPoints = getLinearSequence(end.y, start.y);
      yPoints.forEach(yPoint => arr.push({ x: start.x, y: yPoint }));
    }
    //y-axis same
    else if (start.y === end.y) {
      let xPoints = getLinearSequence(end.x, start.x);
      xPoints.forEach(xPoint => arr.push({ x: xPoint, y: start.y }));
    }
    //both different
    else {
      let xdiff = end.x - start.x;
      let ydiff = end.y - start.y;

      let magnitude: number;

      let xMag = Math.abs(xdiff);
      let yMag = Math.abs(ydiff);
      xMag > yMag ? (magnitude = xMag) : (magnitude = yMag);

      let xnew = start.x + Math.sign(xdiff) * magnitude;
      let ynew = start.y + Math.sign(ydiff) * magnitude;

      let xPoints = getLinearSequence(start.x, xnew);
      let yPoints = getLinearSequence(start.y, ynew);

      xPoints.forEach((xPoint, index) =>
        arr.push({ x: xPoint, y: yPoints[index] })
      );
    }
    return arr;
  }

  /**
   * Given two coordinate points, create an array of CWLetters within
   * the crossword which represents the best user selection.
   *
   * @param      {Coords}  startPoint  The start point
   * @param      {Coords}  endPoint    The end point
   */
  findSelectedWord(startPoint: Coords, endPoint: Coords) {
    let points = this.findSelectedPoints(startPoint, endPoint);
    let arr: CWWord = [];
    points.forEach(coord => {
      let cwLetter = this.props.characterGrid.getCWLetterFromGridPoint(coord);
      if (cwLetter != null) arr.push(cwLetter);
    });
    return arr;
  }

  /**
   * When the mouse has left the grid area, end the current selection.
   * (Effectively selecting the most recently selected edge letter as the endpoint)
   */
  handleMouseLeave = () => {
    if (this.state.selecting) {
      this.setState({ selecting: false });
    }
  };

  /**
   * onMouseUp, end the selection, and call the GridSelection callback from props
   *
   * @return     {<type>}  { description_of_the_return_value }
   */
  handleMouseUp = () => {
    if (!this.props.wordSelectEnabled) return;
    if (this.state.selecting) {
      let arr = this.findSelectedWord(
        this.state.startPoint,
        this.state.endPoint
      );
      this.props.onGridSelection(arr);
    }
    this.setState({ selecting: false });
  };

  /**
   * Begin a selection, setting the current selection to the coordinate
   *
   * @return     {<type>}  { description_of_the_return_value }
   */
  onCWLetterBoxMouseDown = (coords: Coords) => {
    if (!this.props.wordSelectEnabled) return;
    let cwLetter = this.props.characterGrid.getCWLetterFromGridPoint(coords);
    this.setState({
      selecting: true,
      startPoint: coords,
      endPoint: coords
    });
    this.props.onGridSelecting(cwLetter != null ? [cwLetter] : []);
  };

  /**
   * While selecting, set the new endpoint to the most-recently entered
   * grid letter, find the best diagonal or line, and call the GridSelecting
   * callback
   *
   * @return     {<type>}  { description_of_the_return_value }
   */
  onCWLetterBoxMouseEnter = (endPoint: Coords) => {
    if (!this.props.wordSelectEnabled) return;
    if (this.state.selecting) {
      let arr = this.findSelectedWord(this.state.startPoint, endPoint);
      this.props.onGridSelecting(arr);
      this.setState({ endPoint: endPoint });
    }
  };

  render() {
    return (
      <div className="CWGridWrapper">
        <div
          className={`CWGrid  ${
            this.props.wordSelectEnabled
              ? 'wordSelectEnabled'
              : 'wordSelectDisabled'
          }`}
          onMouseUp={this.handleMouseUp}
          onPointerUp={this.handleMouseUp}
          onClick={this.handleMouseUp}
          onPointerCancel={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          {// for each row
          this.props.characterGrid.grid.map((row, rIndex) => (
            <div className="CWGridRow" key={rIndex}>
              {//for each letter in row
              row.map((cw: CWLetter, cIndex) => {
                let _selected = false;
                let _validated = false;

                //determine if the current letter is within calculated
                //best line/diagonal selection

                //NOTE: see optimization discussion in file header
                if (
                  this.props.currentlySelected.some((letter: CWLetter) => {
                    let coord = letter.coord;
                    return coordsEqual(cw.coord, coord);
                  })
                ) {
                  _selected = true;
                }

                //NOTE: see optimization discussion in file header
                for (let i = 0; i < this.props.foundWords.length; ++i) {
                  let word = this.props.foundWords[i];
                  if (
                    word.some((letter: CWLetter) => {
                      let coord = letter.coord;
                      return coordsEqual(cw.coord, coord);
                    })
                  )
                    _validated = true;
                }

                return (
                  <CWLetterBox
                    character={cw.c}
                    coords={cw.coord}
                    selected={_selected}
                    validated={_validated}
                    onMouseDown={this.onCWLetterBoxMouseDown}
                    onMouseEnter={this.onCWLetterBoxMouseEnter}
                    key={cIndex}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CWGrid;
