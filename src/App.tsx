/** @file App.tsx
 *  @brief Main App component for entire page
 *
 *  @author Mike Brazier
 */

//dependencies
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
//assets
import './App.css';
//components & containers
import GameAnswerIndicator from './components/GameAnswerIndicator';
import GameAudio from './components/GameAudio';
import CWContainer from './containers/CWContainer';
import GameProgressContainer from './containers/GameProgressContainer';
//types
import { AppState, appLastGameComplete } from './types/AppState';
import defaultGamesArray from './types/CWDefaultGameData';
import { CWGameData, getWordsRemaining } from './types/CWGame';
import { loadState } from './types/LocalStorage';
//actions
import { receiveGameData, loadAppState } from './actions/';
//api
import { fetchGames } from './api/duolingoAPI';

/***************************************
 * Props, State, & Connect-related fcns
 ***************************************/

interface AppInternalState {}

interface OwnProps {}

interface StateProps {
  gameDataLoaded: boolean;
  gameComplete: boolean;
}

interface DispatchProps {
  receiveGameData: (gD: Array<CWGameData>) => void;
  loadAppState: (aS: AppState) => void;
}

type AppProps = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  gameDataLoaded: state.games.length > 0 ? true : false,
  //when the last game has been reached, and there are no more words remaining
  gameComplete: appLastGameComplete(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  receiveGameData: (gD: Array<CWGameData>) => dispatch(receiveGameData(gD)),
  loadAppState: (aS: AppState) => dispatch(loadAppState(aS))
});

/***************************************
 * App Component
 ***************************************/

class App extends React.Component<AppProps, AppInternalState> {
  /**
   * After mount, load the previous state from LocalStorage,
   * or configure App with game data from Network Fetch API or
   * memory on request failure
   *
   * A timeout is artificially set to show a brief 'loading' component
   * the timeout is for demonstration purposes, and smooth UI
   */
  componentDidMount() {
    //purposefully induce a delay on page load, to demonstrate a load-screen
    setTimeout(() => {
      //load state from local storage
      let loadedState = loadState();
      //if failed
      if (loadedState === undefined) {
        //issue a network request
        fetchGames().then(
          //on gameData successfully fetched
          gameData => {
            console.log('successfully fetched data from Duolingo!');
            this.props.receiveGameData(gameData);
          },
          //on fetch failure
          reason => {
            console.log('failed to fetch data from Duolingo API', reason);
            console.log('loading default gameData served with app!');
            //set game data from memory
            this.props.receiveGameData(defaultGamesArray);
          }
        );
      } else {
        console.log(
          'successfully loaded previous app state from local storage!'
        );
        this.props.loadAppState(loadedState);
      }
    }, 3000);
  }

  GameComplete() {
    return (
      <div className="GameComplete">
        <img
          style={{ marginBottom: '20px' }}
          alt=""
          src="/assets/images/gameComplete.svg"
        />
        <h1 style={{ marginBottom: '20px' }}> Lesson Complete! </h1>
      </div>
    );
  }

  CrosswordGame() {
    return (
      <div className="GameContainer">
        <CWContainer />
      </div>
    );
  }

  AppContent() {
    return (
      <>
        <div className="Header">
          <div className="HeaderContentWrapper">
            <GameProgressContainer />
          </div>
        </div>
        <div className="AppBody">
          {this.props.gameComplete ? this.GameComplete() : this.CrosswordGame()}
        </div>
        <div className="Footer">
          <GameAnswerIndicator />
        </div>
        <GameAudio />
      </>
    );
  }

  AppLoading() {
    return (
      <div className="Loading">
        <img alt="" src="/assets/images/loading.gif" />
        <br />
        <h2>Loading</h2>
      </div>
    );
  }

  render() {
    let showApp = false;
    if (this.props.gameDataLoaded) showApp = true;

    return (
      <div className="App">
        {showApp ? this.AppContent() : this.AppLoading()}
      </div>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(App);
