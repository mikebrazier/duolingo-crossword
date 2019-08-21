/** @file GameRestartButton.tsx
 *  @brief Component for triggering a reset of the application state
 *
 *  @author Mike Brazier
 */

import * as React from 'react';

/***************************************
 * Inline style
 ***************************************/

const GameRestartButtonStyle = {
  backgroundPosition: '-373px -153px',
  height: '18px',
  width: '18px',
  backgroundImage: 'url(/assets/images/duolingoGraphics.svg)',
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'pointer',
  border: 'none'
};

/***************************************
 * Props
 ***************************************/

interface GameRestartButtonProps {
  onClick: () => void;
}

/***************************************
 * Component
 ***************************************/
const GameRestartButton: React.FC<GameRestartButtonProps> = props => {
  return (
    <button
      className="GameRestartButton"
      onClick={props.onClick}
      style={GameRestartButtonStyle}
    ></button>
  );
};

export default GameRestartButton;
