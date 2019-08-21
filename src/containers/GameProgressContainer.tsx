/** @file GameProgressContainer.tsx
 *  @brief Component container containing progress bar and gamereset button for page header
 *
 *  @author Mike Brazier
 */

import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getProgress } from './../types/CWGame';
import { AppState } from './../types/AppState';
import { resetGame } from '../actions/';
import GameRestartButton from './../components/GameRestartButton';
import GameProgressBar from './../components/GameProgressBar';
import './GameProgressContainer.css';

/***************************************
 * Props, State, & Connect-related fcns
 ***************************************/

export interface OwnProps {}

interface StateProps {
  progress: number;
}

interface DispatchProps {
  resetGame: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => {
  return {
    progress: getProgress(
      state.games[state.gameIndex].gameData,
      state.games[state.gameIndex].state
    )
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  resetGame: () => dispatch(resetGame())
});

/***************************************
 * Component
 ***************************************/
class GameProgressContainer extends React.Component<Props> {
  render() {
    return (
      <div className="GameProgressContainer">
        <GameRestartButton onClick={this.props.resetGame} />
        <GameProgressBar progress={this.props.progress} />
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
)(GameProgressContainer);
