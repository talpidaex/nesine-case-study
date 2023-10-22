import React, { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [lazyData, setLazyData] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetch(process.env.API_BETS);
      const result = await data.json();
      setData(result);
    } catch (error) {
      throw new Error(`fetch process error : ${error}`);
    }
  };

  const getDataWithPage = (page) => {
    if (data) {
      const filteredData = data.slice(0, page);
      setLazyData(filteredData);
    }
  };

  return {
    data,
    fetchData,
    lazyData,
    getDataWithPage,
  };
};

export default useFetch;
