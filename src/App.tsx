import React from 'react';
import logo from './logo.svg';
import './App.css';
import CWGrid from './components/CWGrid';
import GameProgressBar from './components/GameProgressBar';
import GameAnswerIndicator from './components/GameAnswerIndicator';
import CWPrompt from './components/CWPrompt';
import CWKeyword from './components/CWKeyword';

const AppStyle = {
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column' as 'column',
  height: '100%',
  width: '100%'
};

const HeaderStyle = {
  minHeight: '140px',
  background: 'blue'
};

const AppBodyStyle = {
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center' as 'center',
  flexDirection: 'column' as 'column',
  alignItems: 'center' as 'center'
};

const GameContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'stretch'
};

const CWGridWrapperStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const FooterStyle = {
  minHeight: '140px',
  background: 'red'
};

const App: React.FC = () => {
  return (
    <div className="App" style={AppStyle}>
      <div className="Header" style={HeaderStyle}>
        <GameProgressBar />
      </div>
      <div className="AppBody" style={AppBodyStyle}>
        <div className="GameContainer" style={GameContainerStyle}>
          <CWPrompt />
          <CWKeyword />
          <div className="CWGridWrapper" style={CWGridWrapperStyle}>
            <CWGrid />
          </div>
        </div>
      </div>
      <div className="Footer" style={FooterStyle}>
        <GameAnswerIndicator />
      </div>
    </div>
  );
};

export default App;
