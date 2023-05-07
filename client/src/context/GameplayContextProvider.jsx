import { createContext, useState } from "react";

const GameplayContext = createContext({});

export const GameplayContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    return (
        <GameplayContext.Provider value={{ userData, setUserData }}>
            {children}
        </GameplayContext.Provider>
    )
}

export default GameplayContext;
