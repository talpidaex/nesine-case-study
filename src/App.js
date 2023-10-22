import React, { useEffect, useState } from "react";
import useFetch from "./Hooks/useFetch";
import MatchInformation from "./Components/Match-Information";
import OCGComponent from "./Components/OCG-Component";
import "./App.scss";
import OrderCart from "./Components/Order-Cart";
import { Provider } from "./Store/Provider";

export default function App() {
  const { lazyData, getDataWithPage, fetchData, data } = useFetch();
  const [loadedElements, setLoadedElements] = useState(15);


  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Kullanıcı sayfanın sonuna yaklaştı ve 100 eleman daha gelsin!
      setLoadedElements((prevLoadedElements) => prevLoadedElements + 100);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    getDataWithPage(loadedElements);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [loadedElements, data]);

  return (
    <Provider>
      <div className="project-container">
        {lazyData &&
          lazyData.map((bet) => (
            <div className="container">
              <MatchInformation match={bet} />
              <OCGComponent
                OCG={bet.OCG}
                match={bet.N}
                id={bet.NID}
                code={bet.C}
              />
            </div>
          ))}
        <OrderCart />
      </div>
    </Provider>
  );
}
