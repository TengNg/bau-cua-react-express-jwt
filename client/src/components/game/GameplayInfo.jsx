import React from 'react'
import Board from './Board'
import UserInfo from './UserInfo'
import Menu from './Menu'

export default function GameplayInfo({ isDataLoaded }) {
    return (
        <div className='w-[100%] h-[100vh] flex flex-col justify-center items-center gap-4 relative bg-gray-200'>
            {isDataLoaded ? (
                <>
                    <UserInfo />
                    <Board />
                    <Menu />

                    <div className='absolute flex justify-center items-center top-[2rem] left-[2rem] gap-7'>
                        <div className='w-[100px]'>
                            <button
                                className='border-black border-[4px] w-[100px] h-[50px] shadow-[4px_5px_0_0_black] select-none hover:shadow-none hover:ml-[4px] hover:shadow-gray-600 hover:text-gray-600 hover:border-gray-600 transition-all font-bold'
                            >Back</button>
                        </div>
                        <div className='w-[100px]'>
                            <button
                                className='border-black border-[4px] w-[100px] h-[50px] shadow-[4px_5px_0_0_black] select-none hover:shadow-none hover:ml-[4px] hover:shadow-gray-600 hover:text-gray-600 hover:border-gray-600 transition-all font-bold'
                            >Settings</button>
                        </div>
                    </div>

                </>
            ) : <h1>Loading...</h1>}
        </div>
    )
}
