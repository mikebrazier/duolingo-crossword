/** @file CWLetterBox.tsx
 *  @brief Presentational Component for Crossword user challenge text
 * *
 *  @author Mike Brazier
 */

import * as React from 'react';
import { CWLang, getLanguageString } from './../types/CWLang';
import './CWPrompt.css';

/***************************************
 * Inline Style
 ***************************************/
const CWPromptStyle = {
  flexGrow: 1
};

/***************************************
 * Properties
 ***************************************/
interface CWPromptProps {
  sourceLanguage: CWLang;
  targetLanguage: CWLang;
}

/***************************************
 * Component
 ***************************************/

const CWPrompt: React.FC<CWPromptProps> = props => {
  return (
    <div className="CWPrompt" style={CWPromptStyle}>
      <h1>
        {' '}
        Find all the translations from {getLanguageString(
          props.sourceLanguage
        )}{' '}
        to {getLanguageString(props.targetLanguage)} for the word{' '}
      </h1>
    </div>
  );
};

export default CWPrompt;
