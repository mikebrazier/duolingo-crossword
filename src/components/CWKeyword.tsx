/** @file CWKeyword.tsx
 *  @brief Presentational Component for the search keyword in a crossword
 *
 *  @author Mike Brazier
 */

import * as React from 'react';

/***************************************
 * Inline Styling
 ***************************************/

const CWPromptKeywordStyle = {
  marginTop: '24px',
  marginBottom: '24px',
  flexGrow: 1,
  textTransform: 'capitalize' as 'capitalize'
};

/***************************************
 * Props
 ***************************************/

interface CWPromptKeywordProps {
  keyword: string;
}

/***************************************
 * Component
 ***************************************/

const CWPromptKeyword: React.FC<CWPromptKeywordProps> = props => {
  return (
    <h2 className="CWPromptKeyword" style={CWPromptKeywordStyle}>
      {props.keyword}
    </h2>
  );
};

export default CWPromptKeyword;
