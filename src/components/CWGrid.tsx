import * as React from 'react';
import './CWGrid.css';
import CWLetterBox from './CWLetterBox';
import { Coords, coordsEqual } from './../types/Coords';
import { CWWord, CWLetter } from './../types/CWWord';
import { CharacterGrid } from './../types/CharacterGrid';

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

class CWGrid extends React.Component<CWGridProps, CWGridState> {
  readonly state: CWGridState = {
    selecting: false,
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 }
  };

  //TODO limit to range of grid
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

  findSelectedWord(startPoint: Coords, endPoint: Coords) {
    let points = this.findSelectedPoints(startPoint, endPoint);
    let arr: CWWord = [];
    points.forEach(coord => {
      let cwLetter = this.props.characterGrid.getCWLetterFromGridPoint(coord);
      if (cwLetter != null) arr.push(cwLetter);
    });
    return arr;
  }

  getLetterFromPoint(coords: Coords) {}

  handleMouseLeave = () => {
    if (this.state.selecting) {
      this.setState({ selecting: false });
    }
  };

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
          className="CWGrid"
          onMouseUp={this.handleMouseUp}
          onPointerUp={this.handleMouseUp}
          onClick={this.handleMouseUp}
          onPointerCancel={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          {this.props.characterGrid.grid.map((row, rIndex) => (
            <div className="CWGridRow" key={rIndex}>
              {row.map((cw: CWLetter, cIndex) => {
                let _selected = false;
                let _validated = false;
                if (
                  this.props.currentlySelected.some((letter: CWLetter) => {
                    let coord = letter.coord;
                    return coordsEqual(cw.coord, coord);
                  })
                ) {
                  _selected = true;
                }

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
