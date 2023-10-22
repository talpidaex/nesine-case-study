import React from "react";
import "./common-row.scss";
import { useProviderContext } from "../../Store/Provider";
const CommonRow = ({ header, content, match, id, code }) => {
  const { selectedMatch, select } = useProviderContext();

  const handleSelectedStyles  = () => {
    const found = selectedMatch.find((item) => item.id === id && item.content === content)
    if(found) return 'selected'; 
    return null;
  }

  return (
    <div className="common-row">
      <div className="header">{header}</div>
      <div
        className={`content ${handleSelectedStyles()}`}
        onClick={() => select({ id, match, code, content })}
      >
        {content}
      </div>
    </div>
  );
};

export default React.memo(CommonRow);
