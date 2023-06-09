import React, { useState } from 'react'
import Board from './Board'
import UserInfo from './UserInfo'
import SettingsMenu from './SettingsMenu'

import { useNavigate, useLocation } from 'react-router-dom'

export default function GameplayInfo({ userData, setUserData, isDataLoaded, isLocalGameplay }) {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return (
        <>
            {isDataLoaded ? (
                <>
                    <div className='absolute flex justify-center items-center top-[2rem] left-[2rem] gap-7'>
                        <div className='w-[100px] h-[50px]'>
                            <button
                                className='button--style button--hover'
                                onClick={() => navigate(from, { replace: true })}
                            >Back</button>
                        </div>
                        <div className='w-[100px] h-[50px]'>
                            <button
                                className={`button--style button--hover ${settingsOpen ? 'button--clicked' : ''}`}
                                onClick={() => setSettingsOpen(true)}
                            >Settings</button>
                        </div>
                    </div>

                    <UserInfo
                        userData={userData}
                        setUserData={setUserData}
                        isLocalGameplay={isLocalGameplay}
                    />

                    <Board
                        userData={userData}
                        setUserData={setUserData}
                    />

                    <SettingsMenu
                        userData={userData}
                        setUserData={setUserData}
                        settingsOpen={settingsOpen}
                        setSettingsOpen={setSettingsOpen}
                    />
                </>
            ) : <h1>Loading...</h1>}
        </>
    )
}
