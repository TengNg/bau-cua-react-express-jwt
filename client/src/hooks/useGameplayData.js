import GameplayContext from "../context/GameplayContextProvider";
import { useContext } from "react";

const useGameplayData = () => {
    return useContext(GameplayContext);
}

export default useGameplayData;
