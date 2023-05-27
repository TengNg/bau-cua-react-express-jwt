import React from 'react'
// import Wrapper from '../components/Wrapper'
import useLocalStorage from '../hooks/useLocalStorage'
import startingData from '../data/local-sandbox-starting-data.json'
import GameplayInfo from '../components/game/GameplayInfo'

const key = 'LOCAL_SANDBOX_KEY'

export default function LocalGameplay() {
    const [data, setData] = useLocalStorage(key, startingData);

    return (
        <>
            <GameplayInfo
                isDataLoaded={true}
                isLocalGameplay={true}
                userData={data}
                setUserData={setData}
            />
        </>
    )
}

