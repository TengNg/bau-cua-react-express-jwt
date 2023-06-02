import React, { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import startingData from '../data/local-sandbox-starting-data.json'
import GameplayInfo from '../components/game/GameplayInfo'
import Wrapper from '../components/Wrapper'
import PlayWithFriends from '../components/game/PlayWithFriends'

const key = 'LOCAL_SANDBOX_KEY'
const modes = [
    { id: 1, name: "Solo" },
    { id: 2, name: "Play with friends" },
];

export default function LocalSandbox() {
    const [data, setData] = useLocalStorage(key, startingData);
    const [mode, setMode] = useState(modes[1]);

    return (
        <Wrapper>

            {
                mode.id === 2
                && <PlayWithFriends />
            }

            {
                mode.id === 1
                && <GameplayInfo
                    isDataLoaded={true}
                    isLocalGameplay={true}
                    userData={data}
                    setUserData={setData}
                />
            }

            <div className='absolute right-[3rem] bottom-[3rem] flex gap-4 p-4'>

                <div className='w-[12rem] h-[4rem]'>
                    <button
                        className={`button--style ${mode.id === 1 ? 'button--clicked' : ''}`}
                        onClick={() => setMode(modes[0])}
                    >{modes[0].name}</button>
                </div>

                <div className='w-[12rem] h-[4rem]'>
                    <button
                        className={`button--style ${mode.id === 2 ? 'button--clicked' : ''}`}
                        onClick={() => setMode(modes[1])}
                    >{modes[1].name}</button>
                </div>
            </div>
        </Wrapper>
    )
}

