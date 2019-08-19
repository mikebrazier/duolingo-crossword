import * as React from 'react';
import CWPrompt from './CWPrompt';
import CWKeyword from './CWKeyword';
import CWGrid from './CWGrid';
import Coords from './../types/Coords';
import { CharacterGrid } from './../types/CharacterGrid';

export interface CWGameProps {
  characterGridData: Array<Array<string>>;
  onAnswerSelection: (selected: boolean) => void;
  onAnswered: (answerCorrect: boolean) => void;
}

interface CWGameState {
  characterGrid: CharacterGrid;
  answer: Array<Coords>;
  answered: boolean;
  answerCoorect: boolean;
}

class CWGame extends React.Component<CWGameProps, CWGameState> {
  readonly state: CWGameState = {
    characterGrid: new CharacterGrid([]),
    answer: new Array<Coords>(),
    answered: false,
    answerCoorect: false
  };

  constructor(props: CWGameProps) {
    super(props);
    this.onGridSelection = this.onGridSelection.bind(this);
  }

  componentDidMount() {
    this.setState({
      characterGrid: new CharacterGrid(this.props.characterGridData)
    });
  }

  onGridSelection(coordsArray: Array<Coords>) {
    this.setState({
      answer: coordsArray
    });
    this.props.onAnswerSelection(true);
  }

  render() {
    return (
      <div className="CWGame">
        <CWPrompt />
        <CWKeyword />
        <CWGrid
          onGridSelection={this.onGridSelection}
          characterGrid={this.state.characterGrid}
        />
      </div>
    );
  }
}

export default CWGame;
