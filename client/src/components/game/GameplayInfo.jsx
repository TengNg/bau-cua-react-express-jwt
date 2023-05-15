import React, { useState } from 'react'
import Board from './Board'
import UserInfo from './UserInfo'
import SettingsMenu from './SettingsMenu'

import { useNavigate, useLocation } from 'react-router-dom'

export default function GameplayInfo({ isDataLoaded }) {
    const [settingsOpen, setSettingsOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return (
        <div className='w-[100%] h-[100vh] flex--center flex-col gap-4 relative bg-gray-400'>
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

                    <UserInfo />
                    <Board />
                    <SettingsMenu
                        settingsOpen={settingsOpen}
                        setSettingsOpen={setSettingsOpen}
                    />
                </>
            ) : <h1>Loading...</h1>}
        </div>
    )
}
