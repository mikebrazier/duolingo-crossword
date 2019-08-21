import * as React from 'react';

const CWPromptKeywordStyle = {
  marginTop: '24px',
  marginBottom: '24px',
  flexGrow: 1,
  textTransform: 'capitalize' as 'capitalize'
};

interface CWPromptKeywordProps {
  keyword: string;
}

const CWPromptKeyword: React.FC<CWPromptKeywordProps> = props => {
  return (
    <h2 className="CWPromptKeyword" style={CWPromptKeywordStyle}>
      {props.keyword}
    </h2>
  );
};

export default CWPromptKeyword;
