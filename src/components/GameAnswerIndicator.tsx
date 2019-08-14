import * as React from 'react';
import './GameAnswerIndicator.css';
const GameAnswerIndicatorStyle = {};

function GameAnswerIndicator() {
  return (
    <div className="GameAnswerIndicator" style={GameAnswerIndicatorStyle}>
      <div className="GameAnswerCircle">
        <span className="GameAnswerCircleCheck" />
      </div>
      <div className="GameAnswerIndicatorContent">
        <div className="GameAnswerCorrectMessage">
          <h2>You are correct </h2>
        </div>
      </div>
      <div className="GameContinueButtonWrapper">
        <button className="GameContinueButton">Continue</button>
      </div>
    </div>
  );
}

export default GameAnswerIndicator;
