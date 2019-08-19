import * as React from 'react';
import './GameAnswerIndicator.css';

export interface GameAnswerIndicatorProps {
  buttonEnabled: boolean;
  showAnswer: boolean;
  answerCorrect: boolean;
  onCheckAnswer: () => void;
  onContinue: () => void;
}

interface GameAnswerIndicatorState {}

class GameAnswerIndicator extends React.Component<
  GameAnswerIndicatorProps,
  GameAnswerIndicatorState
> {
  render() {
    let answerCorrect = this.props.answerCorrect;
    return (
      <div
        className={`GameAnswerIndicatorWrapper 
          ${answerCorrect ? 'answerCorrect' : 'answerWrong'}`}
      >
        <div className="GameAnswerIndicator">
          <div
            className={`GameAnswerMessage
         ${this.props.showAnswer ? 'showAnswer' : ''}`}
          >
            <div className="GameAnswerCircle">
              <span className="GameAnswerCircleCheck" />
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
              onClick={this.props.onCheckAnswer}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameAnswerIndicator;
