import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from './../types/AppState';
import { continueGame, checkSelection } from '../actions/';

import './GameAnswerIndicator.css';

/**
 * Props & Connect-related functions
 */

export interface OwnProps {}

interface StateProps {
  buttonEnabled: boolean;
  showAnswer: boolean;
  answerCorrect: boolean;
}

interface DispatchProps {
  onCheckAnswer: () => void;
  onContinue: () => void;
}

type GameAnswerIndicatorProps = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  buttonEnabled:
    //the current answer has not been checked
    (state.games[state.gameIndex].state.selectedWord.length > 0 &&
      state.games[state.gameIndex].state.currentAnswerCorrect === undefined) ||
    (state.games[state.gameIndex].state.currentAnswerCorrect === true ||
      state.games[state.gameIndex].state.currentAnswerCorrect === false)
      ? true
      : false,
  showAnswer:
    state.games[state.gameIndex].state.currentAnswerCorrect != undefined
      ? true
      : false,
  answerCorrect:
    state.games[state.gameIndex].state.currentAnswerCorrect == true
      ? true
      : false
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  onCheckAnswer: () => dispatch(checkSelection()),
  onContinue: () => dispatch(continueGame())
});

class GameAnswerIndicator extends React.Component<GameAnswerIndicatorProps> {
  constructor(props: GameAnswerIndicatorProps) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick() {
    if (this.props.buttonEnabled) {
      if (this.props.showAnswer) {
        this.props.onContinue();
      } else {
        this.props.onCheckAnswer();
      }
    }
  }

  render() {
    let answerCorrect = this.props.answerCorrect;
    let buttonText = '';
    if (
      !this.props.buttonEnabled ||
      (this.props.buttonEnabled && !this.props.showAnswer)
    )
      buttonText = 'Check Answer';
    if (this.props.showAnswer) buttonText = 'Continue';
    return (
      <>
        <div
          className={`GameAnswerIndicatorWrapper 
          ${this.props.showAnswer ? 'showAnswer' : ''}
          ${answerCorrect ? 'answerCorrect' : 'answerWrong'}`}
        >
          <div className="GameAnswerIndicator">
            <div
              className={`GameAnswerMessage
              ${this.props.showAnswer ? 'showAnswer' : ''}`}
            >
              <div className="GameAnswerCircle">
                <span
                  className={`GameAnswerCircleCheckCross
                  ${answerCorrect ? 'answerCorrect' : 'answerWrong'}`}
                />
              </div>
              <div className="GameAnswerIndicatorContent">
                <div
                  className={`GameAnswerCorrectMessage
                  ${answerCorrect ? 'answerCorrect' : 'answerWrong'}`}
                >
                  <h2>
                    {answerCorrect ? 'Good find!' : "Oops!  That's inncorrect."}
                  </h2>
                </div>
              </div>
            </div>
            <div className="GameContinueButtonWrapper">
              <button
                className={`GameContinueButton
                ${this.props.buttonEnabled ? 'enabled' : ''}
                ${this.props.showAnswer ? 'showAnswer' : ''}
                ${answerCorrect ? 'answerCorrect' : 'answerWrong'}`}
                onClick={this.onButtonClick}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(GameAnswerIndicator);
