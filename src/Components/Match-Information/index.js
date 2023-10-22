import React from "react";
import "./match-information.scss";

const MatchInformation = ({ match }) => {
  const {
    C: year,
    D: dateTime,
    DAY: day,
    LN: league,
    N: teams,
    T: time,
  } = match;

  return (
    <div className="match-container">
      <div>{`${dateTime} ${day} ${league}`}</div>
      <div className="content">
        <span className="year">{year}</span>
        <span>{time}</span>
        <span>{teams}</span>
      </div>
    </div>
  );
};

export default React.memo(MatchInformation);
