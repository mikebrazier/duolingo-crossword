import * as React from 'react';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

const character_grid = [
  ['i', 'q', 'í', 'l', 'n', 'n', 'm', 'ó'],
  ['f', 't', 'v', 'ñ', 'b', 'm', 'h', 'a'],
  ['h', 'j', 'é', 't', 'e', 't', 'o', 'z'],
  ['x', 'á', 'o', 'i', 'e', 'ñ', 'm', 'é'],
  ['q', 'é', 'i', 'ó', 'q', 's', 'b', 's'],
  ['c', 'u', 'm', 'y', 'v', 'l', 'r', 'x'],
  ['ü', 'í', 'ó', 'm', 'o', 't', 'e', 'k'],
  ['a', 'g', 'r', 'n', 'n', 'ó', 's', 'm']
];

const CWGridStyle = {
  maxHeight: '500px',
  maxWidth: '500px',
  minHeight: '500px',
  minWidth: '500px',
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column' as 'column',
  flexGrow: 1
};

const CWGridRowStyle = {
  display: 'flex',
  flexGrow: 1
};

const CWLetterBoxStyle = {
  cursor: 'pointer' as 'pointer',
  fontSize: '19px',
  lineHeight: '27px',
  textAlign: 'center' as 'center',
  borderWidth: '2px 2px 4px',
  borderStyle: 'solid',
  borderRadius: '16px',
  borderColor: '#e5e5e5',
  flexGrow: 1,
  position: 'relative' as 'relative',
  margin: '2px'
};

const CWLetterBoxCharStyle = {
  position: 'absolute' as 'absolute',
  width: '100%',
  height: '100%',
  textAlign: 'centpper' as 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#4b4b4b'
};

function CWGrid() {
  return (
    <div className="CWGrid" style={CWGridStyle}>
      {character_grid.map((row, rIndex) => (
        <div className="CWGridRow" key="rIndex" style={CWGridRowStyle}>
          {row.map((character, cIndex) => (
            <div className="CWLetterBox" key="index" style={CWLetterBoxStyle}>
              <div className="CWLetterBoxChar" style={CWLetterBoxCharStyle}>
                <div>{character}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CWGrid;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
