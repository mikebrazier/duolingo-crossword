import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameAnswerIndicator from './components/GameAnswerIndicator';
import CWContainer from './containers/CWContainer';
import GameProgressContainer from './containers/GameProgressContainer';

const character_grid = [
  ['i', 'q', 'í', 'l', 'n', 'n', 'm', 'ó'],
  ['f', 't', 'v', 'ñ', 'b', 'm', 'h', 'a'],
  ['h', 'j', 'é', 't', 'e', 't', 'o', 'z'],
  ['x', 'á', 'o', 'i', 'e', 'ñ', 'm', 'é'],
  ['q', 'é', 'i', 'ó', 'q', 's', 'b', 's'],
  ['c', 'u', 'm', 'y', 'v', 'l', 'r', 'x'],
  ['ü', 'í', 'ó', 'm', 'o', 't', 'e', 'k'],
  ['a', 'g', 'r', 'n', 'n', 'ó', 's', 'm']
];

interface AppProps {}

interface AppState {
  answerCheckEnabled: boolean;
  showAnswer: boolean;
  answerCoorect: boolean;
}

class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = {
    answerCheckEnabled: false,
    showAnswer: false,
    answerCoorect: false
  };

  constructor(props: AppProps) {
    super(props);
    this.onAnswerSelection = this.onAnswerSelection.bind(this);
    this.onAnswered = this.onAnswered.bind(this);
  }

  onAnswerSelection(selected: boolean) {
    this.setState({ answerCheckEnabled: selected });
  }

  onAnswered(answerCorrect: boolean) {
    this.setState({ answerCoorect: answerCorrect });
  }

  onCheckAnswer() {}

  onContinue() {}

  render() {
    return (
      <div className="App">
        <div className="Header">
          <div className="HeaderContentWrapper">
            <GameProgressContainer />
          </div>
        </div>
        <div className="AppBody">
          <div className="GameContainer">
            <CWContainer />
          </div>
        </div>
        <div className="Footer">
          <GameAnswerIndicator />
        </div>
      </div>
    );
  }
}

export default App;
