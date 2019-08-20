import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CWPrompt from './../components/CWPrompt';
import CWKeyword from './../components/CWKeyword';
import CWGrid from './../components/CWGrid';
import * as CWGame from './../types/CWGame';
import { CWWord, CWLetter } from './../types/CWWord';
import Coords from './../types/Coords';
import { CharacterGrid } from './../types/CharacterGrid';
import { AppState } from './../types/AppState';
import { selectWord } from '../actions/';

/**
 * Props & Connect-related functions
 */

export interface OwnProps {}

interface StateProps {
  currentGame: CWGame.CWGame;
  wordSelectEnabled: boolean;
  currentlySelected: CWWord;
  gameIndex: number;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type CWContainerProps = StateProps & DispatchProps & OwnProps;

interface CWContainerState {
  characterGrid: CharacterGrid;
  currentlySelected: CWWord;
  gameIndex: number;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  currentGame: state.games[state.gameIndex],
  currentlySelected: state.games[state.gameIndex].state.selectedWord,
  wordSelectEnabled:
    state.games[state.gameIndex].state.currentAnswerCorrect == undefined
      ? true
      : false,
  gameIndex: state.gameIndex
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  dispatch: dispatch
});

/**
 * Componenet
 */

class CWContainer extends React.Component<CWContainerProps, CWContainerState> {
  readonly state: CWContainerState = {
    characterGrid: new CharacterGrid([]), //provides view-related
    currentlySelected: new Array<CWLetter>(),
    gameIndex: 0
  };

  constructor(props: CWContainerProps) {
    super(props);
    this.onGridSelection = this.onGridSelection.bind(this);
    this.onGridSelecting = this.onGridSelecting.bind(this);
  }

  componentDidMount() {
    this.setState({
      characterGrid: new CharacterGrid(
        this.props.currentGame.gameData.characterGrid
      ),
      gameIndex: this.props.gameIndex
    });
  }

  static getDerivedStateFromProps(props: CWContainerProps, state: AppState) {
    //create a new character grid representation on new game
    if (props.gameIndex != state.gameIndex) {
      return {
        characterGrid: new CharacterGrid(
          props.currentGame.gameData.characterGrid
        )
      };
    }
    return null;
  }

  onGridSelecting(word: CWWord) {
    //while the app's state has not evaluated a user selection as true or false,
    //allow selections to be made
    this.props.dispatch(selectWord(word));
  }

  onGridSelection(word: CWWord) {
    //otherwise dispatch the selection
    this.props.dispatch(selectWord(word));
  }

  render() {
    return (
      <div className="CWContainer">
        <CWPrompt
          sourceLanguage={this.props.currentGame.gameData.sourceLanguage}
          targetLanguage={this.props.currentGame.gameData.targetLanguage}
        />
        <CWKeyword keyword={this.props.currentGame.gameData.sourceWord} />
        <CWGrid
          onGridSelecting={this.onGridSelecting}
          onGridSelection={this.onGridSelection}
          wordSelectEnabled={this.props.wordSelectEnabled}
          characterGrid={this.state.characterGrid}
          foundWords={this.props.currentGame.state.foundWords}
          currentlySelected={this.props.currentGame.state.selectedWord}
        />
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(CWContainer);
