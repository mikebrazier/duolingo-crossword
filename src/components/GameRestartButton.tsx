import * as React from 'react';

const GameRestartButtonStyle = {
  backgroundPosition: '-373px -153px',
  height: '18px',
  width: '18px',
  backgroundImage:
    'url(//d35aaqx5ub95lt.cloudfront.net/images/icon-sprite8.svg)',
  display: 'inline-block',
  verticalAlign: 'middle'
};

function GameRestartButton() {
  return (
    <a
      className="GameRestartButton"
      href="/"
      style={GameRestartButtonStyle}
    ></a>
  );
}

export default GameRestartButton;
