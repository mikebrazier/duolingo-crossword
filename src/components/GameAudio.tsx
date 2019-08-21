/** @file GameAudio.tsx
 *  @brief Component for trigger audio alerts for correct/wrong answers, and game complete
 * *
 *  @author Mike Brazier
 */

import React from 'react';
import { AppState } from './../types/AppState';
import { getWordsRemaining } from './../types/CWGame';
import { connect } from 'react-redux';

/***************************************
 * Properties & Connect Fcns
 ***************************************/

interface StateProps {
  gameComplete: boolean;
  currentAnswerCorrect: boolean | undefined;
}

type GameAudioProps = StateProps;

const mapStateToProps = (state: AppState): StateProps => ({
  currentAnswerCorrect: state.games[state.gameIndex].state.currentAnswerCorrect,
  //when the last game has been reached, and there are no more words remaining
  gameComplete:
    state.gameIndex === state.games.length - 1 &&
    !getWordsRemaining(
      state.games[state.gameIndex].gameData,
      state.games[state.gameIndex].state
    )
      ? true
      : false
});

/***************************************
 * Component
 ***************************************/

class GameAudio extends React.Component<GameAudioProps> {
  answerCorrectAudio = new Audio('/assets/audio/right_answer.mp3');
  answerWrongAudio = new Audio('/assets/audio/wrong_answer.mp3');
  gameCompleteAudio = new Audio('/assets/audio/lesson_complete.mp3');

  componentDidUpdate(prevProps: GameAudioProps): void {
    //when game state switches from current answer undefined to incorrect
    if (
      prevProps.currentAnswerCorrect === undefined &&
      this.props.currentAnswerCorrect === false
    ) {
      this.answerWrongAudio.play();
    }
    //when game state switches from current answer undefined to correct
    if (
      prevProps.currentAnswerCorrect === undefined &&
      this.props.currentAnswerCorrect === true
    ) {
      this.answerCorrectAudio.play();
    }

    //when game state switches from game incomplete to game complete
    if (prevProps.gameComplete === false && this.props.gameComplete === true) {
      //set timeout, to allow delay while final answer correct sound plays
      setTimeout(() => this.gameCompleteAudio.play(), 1000);
    }
  }
  render() {
    return <></>;
  }
}

export default connect(mapStateToProps)(GameAudio);
