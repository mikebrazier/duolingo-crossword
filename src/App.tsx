//dependencies
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
//assets
import logo from './logo.svg';
import './App.css';
//containers
import GameAnswerIndicator from './components/GameAnswerIndicator';
import CWContainer from './containers/CWContainer';
import GameProgressContainer from './containers/GameProgressContainer';
//types
import { AppState, initialState } from './types/AppState';
import defaultGamesArray from './types/CWDefaultGameData';
import { CWGameData, getWordsRemaining } from './types/CWGame';
import { loadState } from './types/LocalStorage';
//actions
import { receiveGameData, loadAppState } from './actions/';
//api
import { fetchGames } from './api/duolingoAPI';

/**
 * Props & State Defs
 */
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

/**
 * connect() fcns
 */

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
  gameDataLoaded: state.games.length > 0 ? true : false,
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

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps => ({
  receiveGameData: (gD: Array<CWGameData>) => dispatch(receiveGameData(gD)),
  loadAppState: (aS: AppState) => dispatch(loadAppState(aS))
});

/**
 * App Component
 */

class App extends React.Component<AppProps, AppInternalState> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    //purposefully induce a delay on page load, to demonstrate a load-screen
    setTimeout(() => {
      //load state from local storage
      let loadedState = loadState();

      if (loadedState === undefined) {
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

  AppContent() {
    return (
      <>
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
      </>
    );
  }

  AppLoading() {
    return (
      <div className="Loading">
        <img src="/images/loading.gif" />
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
