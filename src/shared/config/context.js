import { createContext, useState } from "react";
export const Context = createContext();

export const Provider = (props) => {
  const [savedEula, setSavedEula] = useState([
    {
      name: "test",
      id: "123",
      description: "testing",
      tag: "test",
      status: "Draft",
    },
  ]);
  const [currentEula, setCurrentEula] = useState({});

  return (
    <Context.Provider
      value={{
        savedEula,
        currentEula,
        setSavedEula,
        setCurrentEula,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
