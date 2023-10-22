import React, { useEffect, useState } from "react";
// import "./ocg-component.scss";
import CommonRow from "../Common-Row";
import {
  handicapTemplate,
  mutualGoalTemplete,
} from "../../Constants/template-constants";
const OCGComponent = ({ OCG, match, id, code }) => {
  const customArrayOrder = ["1", "5", "3", "2", "4"];
  const [orderedArray, setOrderedArray] = useState([]);

  useEffect(() => {
    if (Object.values(OCG).length) {
      customArrayOrder.forEach((orderID) => {
        const object = Object.values(OCG).find((item) => item.ID === orderID);
        if (object) {
          setOrderedArray((prev) => [...prev, object]);
        } else if (orderID === "3") {
          setOrderedArray((prev) => [...prev, handicapTemplate]);
        } else if (orderID === "4") {
          setOrderedArray((prev) => [...prev, mutualGoalTemplete]);
        }
      });
    }
  }, [OCG]);

  return (
    <>
      {Object.values(OCG).length &&
        orderedArray.map((item) => {
          return (
            <>
              {Object.values(item.OC).map((item) => (
                <CommonRow
                  header={item.N}
                  content={item.O}
                  match={match}
                  id={id}
                  code={code}
                ></CommonRow>
              ))}
            </>
          );
        })}
    </>
  );
};

export default React.memo(OCGComponent);
