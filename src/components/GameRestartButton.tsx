import * as React from 'react';

const GameRestartButtonStyle = {
  backgroundPosition: '-373px -153px',
  height: '18px',
  width: '18px',
  backgroundImage:
    'url(//d35aaqx5ub95lt.cloudfront.net/images/icon-sprite8.svg)',
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer'
};

interface GameRestartButtonProps {
  onClick: () => void;
}

const GameRestartButton: React.FC<GameRestartButtonProps> = props => {
  return (
    <a
      className="GameRestartButton"
      onClick={props.onClick}
      style={GameRestartButtonStyle}
    ></a>
  );
};

export default GameRestartButton;
