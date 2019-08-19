import * as React from 'react';
import './CWGrid.css';
import CWLetterBox from './CWLetterBox';
import Coords from './../types/Coords';
import { CharacterGrid, CharacterGridPoint } from './../types/CharacterGrid';

function getLinearSequence(start: number, finish: number) {
  let arr: Array<number> = [];

  if (start == finish) {
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
  onGridSelection: (coordsArray: Array<Coords>) => void;
  characterGrid: CharacterGrid;
}

interface CWGridState {
  selecting: boolean;
  startPoint: Coords;
  endPoint: Coords;
  currentlySelected: Array<Coords>;
}

class CWGrid extends React.Component<CWGridProps, CWGridState> {
  readonly state: CWGridState = {
    selecting: false,
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 0, y: 0 },
    currentlySelected: []
  };

  //TODO limit to range of grid
  findSelectedPoints(start: Coords, end: Coords) {
    let arr: Array<Coords> = [];

    //same point
    if (end.x == start.x && end.y == start.y) {
      arr.push({ x: start.x, y: start.y });
    }
    //x-axis same
    else if (end.x == start.x) {
      let yPoints = getLinearSequence(end.y, start.y);
      yPoints.forEach(yPoint => arr.push({ x: start.x, y: yPoint }));
    }
    //y-axis same
    else if (start.y == end.y) {
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

  handleMouseUp = () => {
    console.log('mouse up');
    this.setState({ selecting: false });
    this.props.onGridSelection(this.state.currentlySelected);
  };

  onCWLetterBoxMouseDown = (coords: Coords) => {
    this.setState({
      selecting: true,
      startPoint: coords,
      currentlySelected: [coords]
    });
  };

  onCWLetterBoxMouseEnter = (endPoint: Coords) => {
    if (this.state.selecting) {
      let arr = this.findSelectedPoints(this.state.startPoint, endPoint);
      this.setState({ currentlySelected: arr });
    }
  };

  render() {
    return (
      <div className="CWGridWrapper">
        <div className="CWGrid" onMouseUp={this.handleMouseUp}>
          {this.props.characterGrid.grid.map((row, rIndex) => (
            <div className="CWGridRow" key={rIndex}>
              {row.map((cgp: CharacterGridPoint, cIndex) => {
                let _selected = false;
                if (
                  this.state.currentlySelected.some((coord: Coords) => {
                    return cgp.coords.x == coord.x && cgp.coords.y == coord.y;
                  })
                ) {
                  _selected = true;
                }

                return (
                  <CWLetterBox
                    character={cgp.character}
                    coords={cgp.coords}
                    validated={false}
                    selected={_selected}
                    onMouseDown={this.onCWLetterBoxMouseDown}
                    onMouseEnter={this.onCWLetterBoxMouseEnter}
                    key={cgp.index}
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
