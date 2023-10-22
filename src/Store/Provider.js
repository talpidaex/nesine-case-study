import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(undefined);

export const Provider = ({ children, value }) => {
  const [selectedMatch, setSelectedMatch] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let temp = 1;
    selectedMatch.forEach((item) => {
      temp = Number(item.content) * temp;
    });
    if (!selectedMatch.length) {
      setTotal(0);
    } else {
      setTotal(temp.toFixed(2));
    }
  }, [selectedMatch]);

  const handleStoreActions = {
    selectedMatch,
    select: (selection) =>
      setSelectedMatch((prev) => {
        const alreadyExist = prev.find((item) => item.id === selection.id);
        
        if (alreadyExist) {
          if (alreadyExist.content !== selection.content) {
            /** Oran güncellenmeli */
            const alreadyExistID = prev.findIndex((item) => item.id === selection.id);
            const updatedObj = { ...prev[alreadyExistID] };
            updatedObj.content = selection.content;
            prev[alreadyExistID] = updatedObj;
            return [...prev];
          }
          return prev.filter((item) => item.id !== alreadyExist.id);
        }
        return [...prev, selection];
      }),
    total,
  };
  return (
    <Context.Provider value={handleStoreActions}>{children}</Context.Provider>
  );
};

export const useProviderContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useProviderContext bir Provider içinde kullanılmalıdır!");
  }
  return context;
};
