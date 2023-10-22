import React, { useEffect } from "react";
import "./order-cart.scss";
import { useProviderContext } from "../../Store/Provider";
const OrderCart = () => {
  const { total, selectedMatch } = useProviderContext();

  return (
    <div className="order-cart-container">
      {selectedMatch.map((item) => (
        <>
          <div className="selected-match">
            <span>MBS : 4</span>
            <span>Kod : {item.code}</span>
            <span>Maç : {item.match}</span>
            <span className="bets">Oran : {item.content}</span>
          </div>
          <div className="line" />
        </>
      ))}

      <div className="total">Toplam Tutar : {total} </div>
    </div>
  );
};

export default React.memo(OrderCart);
