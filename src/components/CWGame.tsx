import * as React from 'react';
import CWGrid from './CWGrid';
import Coords from './../types/Coords';
import { CharacterGrid } from './../types/CharacterGrid';

export interface CWGameProps {
  characterGridData: Array<Array<string>>;
}

interface CWGameState {
  characterGrid: CharacterGrid;
}

class CWGame extends React.Component<CWGameProps, CWGameState> {
  readonly state: CWGameState = {
    characterGrid: new CharacterGrid([])
  };

  componentDidMount() {
    this.setState({
      characterGrid: new CharacterGrid(this.props.characterGridData)
    });
  }

  enableAnswerCheck() {}

  render() {
    return (
      <CWGrid
        onAnswerSelected={this.enableAnswerCheck}
        characterGrid={this.state.characterGrid}
      />
    );
  }
}

export default CWGame;
