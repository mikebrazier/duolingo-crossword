import * as React from 'react';
import './GameProgressBar.css';

const GameProgressBarWrapperStyle = {
  flexGrow: 1,
  margin: '0 0 0 40px',
  position: 'absolute' as 'absolute',
  left: 0,
  right: 0
};

const GameProgressBarStyle = {
  borderRadius: '98px',
  height: '16px',
  background: '#e5e5e5',
  position: 'absolute' as 'absolute',
  zIndex: 0,
  right: 0,
  left: 0,
  margin: '0 0 0 40px'
};

const GameProgressBarStylePercent = {
  background: '#78c800',
  minWidth: '16px',
  position: 'relative' as 'relative',
  transition: 'all .5s',
  zIndex: 1,
  opacity: 1,
  width: '50%',
  height: '100%',
  borderRadius: '98px'
};

function GameProgressBar() {
  return (
    <div
      style={{
        position: 'relative' as 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        className="GameProgressBarWrapper"
        style={GameProgressBarWrapperStyle}
      >
        <div className="GameProgressBar" style={GameProgressBarStyle}>
          <div
            className="GameProgressBarPercent"
            style={GameProgressBarStylePercent}
          />
        </div>
      </div>
    </div>
  );
}

export default GameProgressBar;
