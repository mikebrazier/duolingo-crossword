/** @file CWContainer.tsx
 *  @brief Component container with React-Redux connections for crossword challenge
 *
 *  @author Mike Brazier
 */

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import CWPrompt from './../components/CWPrompt';
import CWKeyword from './../components/CWKeyword';
import CWGrid from './../components/CWGrid';
import * as CWGame from './../types/CWGame';
import { CWWord, CWLetter } from './../types/CWWord';
import { CharacterGrid } from './../types/CharacterGrid';
import { AppState } from './../types/AppState';
import { selectWord } from '../actions/';

/***************************************
 * Props, State, & Connect-related fcns
 ***************************************/

export interface OwnProps {}

interface StateProps {
  currentGame: CWGame.CWGame;
  wordSelectEnabled: boolean;
  currentlySelected: CWWord;
  gameIndex: number; //used to determine if the current game has changed
}

interface DispatchProps {
  dispatch: Dispatch;
}

type CWContainerProps = StateProps & DispatchProps & OwnProps;

interface CWContainerState {
  characterGrid: CharacterGrid;
  currentlySelected: CWWord;
  gameIndex: number; //used to determine if the current game has changed
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  currentGame: state.games[state.gameIndex],
  currentlySelected: state.games[state.gameIndex].state.selectedWord,
  wordSelectEnabled:
    state.games[state.gameIndex].state.currentAnswerCorrect === undefined
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

/***************************************
 * Component
 ***************************************/

class CWContainer extends React.Component<CWContainerProps, CWContainerState> {
  readonly state: CWContainerState = {
    characterGrid: new CharacterGrid([]),
    currentlySelected: new Array<CWLetter>(),
    gameIndex: 0
  };

  constructor(props: CWContainerProps) {
    super(props);
    this.onGridSelection = this.onGridSelection.bind(this);
  }

  componentDidMount() {
    this.setState({
      characterGrid: new CharacterGrid(
        this.props.currentGame.gameData.characterGrid
      ),
      gameIndex: this.props.gameIndex
    });
  }

  /**
   * Changes between AppState's gameIndex require a new CharacterGrid to be
   * initialized with the current game's data
   *
   * gameIndex must be held in the components internal state to be identify
   * when the game has changed.  Once occured, update the state with the new
   * index and CharacterGrid
   *
   * @param      {CWContainerProps}  props   The properties
   * @param      {AppState}          state   The state
   * @return     {CWContainerState}  The derived state from properties.
   */
  static getDerivedStateFromProps(
    props: CWContainerProps,
    state: AppState
  ): CWContainerState | null {
    //create a new character grid representation on new game
    if (props.gameIndex !== state.gameIndex) {
      return {
        characterGrid: new CharacterGrid(
          props.currentGame.gameData.characterGrid
        ),
        gameIndex: props.gameIndex,
        currentlySelected: props.currentGame.state.selectedWord
      };
    }
    return null;
  }

  onGridSelection(word: CWWord) {
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
          onGridSelecting={this.onGridSelection}
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

/***************************************
 * connect export
 ***************************************/

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(CWContainer);
