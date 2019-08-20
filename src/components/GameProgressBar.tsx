import * as React from 'react';
import './GameProgressBar.css';

interface GameProgressBarProps {
  progress: number;
}

const GameProgressBar: React.FC<GameProgressBarProps> = props => {
  let progress = props.progress;
  if (progress < 0) progress = 0;
  if (progress > 100) progress = 0;

  let width = progress.toString() + '%';
  return (
    <div
      style={{
        position: 'relative' as 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div className="GameProgressBarWrapper">
        <div className="GameProgressBar">
          <div className="GameProgressBarPercent" style={{ width: width }} />
        </div>
      </div>
    </div>
  );
};

export default GameProgressBar;
