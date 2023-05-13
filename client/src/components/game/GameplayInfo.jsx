import React, { useState } from 'react'
import Board from './Board'
import UserInfo from './UserInfo'
import SettingsMenu from './Menu'

import { useNavigate, useLocation } from 'react-router-dom'

export default function GameplayInfo({ isDataLoaded }) {
    const [settingsOpen, setSettingsOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    return (
        <div className='w-[100%] h-[100vh] flex flex-col justify-center items-center gap-4 relative bg-gray-400'>
            {isDataLoaded ? (
                <>
                    <UserInfo />
                    <Board />
                    <SettingsMenu
                        settingsOpen={settingsOpen}
                        setSettingsOpen={setSettingsOpen}
                    />

                    <div className='absolute flex justify-center items-center top-[2rem] left-[2rem] gap-7'>
                        <div className='w-[100px] h-[50px]'>
                            <button
                                className='border-black border-[4px] w-[100%] h-[100%] shadow-[4px_5px_0_0_black] select-none hover:shadow-none hover:m-[2px_0_0_4px] hover:shadow-gray-600 hover:text-gray-600 hover:border-gray-600 transition-all font-bold'
                                onClick={() => navigate(from, { replace: true })}
                            >Back</button>
                        </div>
                        <div className='w-[100px] h-[50px]'>
                            <button
                                className={`border-black border-[4px] w-[100%] h-[100%] shadow-[4px_5px_0_0_black] select-none hover:shadow-none hover:m-[2px_0_0_4px] hover:shadow-gray-600 hover:text-gray-600 hover:border-gray-600 transition-all font-bold ${settingsOpen ? 'ml-[4px] mt-[2px] shadow-none text-gray-600 border-gray-600' : ''}`}
                                onClick={() => setSettingsOpen(true)}
                            >Settings</button>
                        </div>
                    </div>

                </>
            ) : <h1>Loading...</h1>}
        </div>
    )
}
